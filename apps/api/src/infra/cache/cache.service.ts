import { Injectable, Inject, Logger } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants';
import type { Redis } from 'ioredis';

/**
 * CacheService
 *
 * Typed wrapper around Redis for hot-path caching.
 * Key groups per architecture:
 *   cache:booking-page:{slug}
 *   cache:event-type:{id}
 *   cache:availability:{workspaceId}:{eventTypeId}:{date}:{tz}
 *   cache:workspace-branding:{workspaceId}
 *
 * Does NOT own BullMQ queues — those use their own Redis connection.
 */
@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  // ─── Generic cache operations ────────────────────────────────────────

  async get<T = string>(key: string): Promise<T | null> {
    try {
      const raw = await this.redis.get(key);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await this.redis.set(key, serialized, 'EX', ttlSeconds);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async delByPattern(pattern: string): Promise<number> {
    let deleted = 0;
    let cursor = '0';

    do {
      const [nextCursor, keys] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = nextCursor;
      if (keys.length > 0) {
        await this.redis.del(...keys);
        deleted += keys.length;
      }
    } while (cursor !== '0');

    return deleted;
  }

  // ─── Domain-specific cache helpers ───────────────────────────────────

  /** Cache booking page data (public pages are read-heavy). */
  async getBookingPage<T>(slug: string): Promise<T | null> {
    return this.get<T>(`cache:booking-page:${slug}`);
  }

  async setBookingPage(slug: string, data: unknown, ttlSeconds = 300): Promise<void> {
    await this.set(`cache:booking-page:${slug}`, data, ttlSeconds);
  }

  async invalidateBookingPage(slug: string): Promise<void> {
    await this.del(`cache:booking-page:${slug}`);
  }

  /** Cache event type for slot computation hot path. */
  async getEventType<T>(eventTypeId: string): Promise<T | null> {
    return this.get<T>(`cache:event-type:${eventTypeId}`);
  }

  async setEventType(eventTypeId: string, data: unknown, ttlSeconds = 300): Promise<void> {
    await this.set(`cache:event-type:${eventTypeId}`, data, ttlSeconds);
  }

  async invalidateEventType(eventTypeId: string): Promise<void> {
    await this.del(`cache:event-type:${eventTypeId}`);
  }

  /** Cache computed availability slots. Short TTL — invalidated on calendar sync. */
  async getAvailability<T>(
    workspaceId: string,
    eventTypeId: string,
    date: string,
    tz: string,
  ): Promise<T | null> {
    return this.get<T>(`cache:availability:${workspaceId}:${eventTypeId}:${date}:${tz}`);
  }

  async setAvailability(
    workspaceId: string,
    eventTypeId: string,
    date: string,
    tz: string,
    data: unknown,
    ttlSeconds = 60,
  ): Promise<void> {
    await this.set(`cache:availability:${workspaceId}:${eventTypeId}:${date}:${tz}`, data, ttlSeconds);
  }

  async invalidateAvailability(workspaceId: string, eventTypeId?: string): Promise<number> {
    const pattern = eventTypeId
      ? `cache:availability:${workspaceId}:${eventTypeId}:*`
      : `cache:availability:${workspaceId}:*`;
    return this.delByPattern(pattern);
  }

  /** Cache workspace branding (loaded on every public page). */
  async getWorkspaceBranding<T>(workspaceId: string): Promise<T | null> {
    return this.get<T>(`cache:workspace-branding:${workspaceId}`);
  }

  async setWorkspaceBranding(workspaceId: string, data: unknown, ttlSeconds = 600): Promise<void> {
    await this.set(`cache:workspace-branding:${workspaceId}`, data, ttlSeconds);
  }

  async invalidateWorkspaceBranding(workspaceId: string): Promise<void> {
    await this.del(`cache:workspace-branding:${workspaceId}`);
  }

  // ─── Distributed locks ───────────────────────────────────────────────

  /**
   * Acquire a short-lived lock.
   * Used for: slot locks during booking checkout, calendar sync dedup.
   */
  async acquireLock(key: string, ttlSeconds = 15): Promise<boolean> {
    const result = await this.redis.set(`lock:${key}`, '1', 'EX', ttlSeconds, 'NX');
    return result === 'OK';
  }

  async releaseLock(key: string): Promise<void> {
    await this.del(`lock:${key}`);
  }

  // ─── Rate limiting ───────────────────────────────────────────────────

  /**
   * Sliding window rate limit check.
   * Returns { allowed: boolean, remaining: number }.
   */
  async checkRateLimit(
    key: string,
    maxRequests: number,
    windowSeconds: number,
  ): Promise<{ allowed: boolean; remaining: number }> {
    const redisKey = `rate:${key}`;
    const current = await this.redis.incr(redisKey);

    if (current === 1) {
      await this.redis.expire(redisKey, windowSeconds);
    }

    const remaining = Math.max(0, maxRequests - current);
    return { allowed: current <= maxRequests, remaining };
  }

  // ─── Idempotency ────────────────────────────────────────────────────

  /**
   * Check and set idempotency key. Returns null if key is new,
   * or the cached response if the key already exists.
   */
  async checkIdempotency<T>(provider: string, key: string): Promise<T | null> {
    return this.get<T>(`idempo:${provider}:${key}`);
  }

  async setIdempotency(provider: string, key: string, response: unknown, ttlSeconds = 86_400): Promise<void> {
    await this.set(`idempo:${provider}:${key}`, response, ttlSeconds);
  }
}
