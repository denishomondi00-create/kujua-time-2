/**
 * Rate limiter for public booking endpoints.
 * Prevents abuse of the slot-checking and booking creation APIs.
 * Key pattern: rate:public-booking:{ip}:{window}
 */
import type Redis from 'ioredis';

const PREFIX = 'rate:public-booking';

export interface PublicRateLimitCheck {
  allowed: boolean;
  remaining: number;
  retryAfterMs?: number;
}

export async function checkPublicBookingRateLimit(
  redis: Redis,
  ipAddress: string,
  windowSeconds = 60,
  maxRequests = 30,
): Promise<PublicRateLimitCheck> {
  const window = Math.floor(Date.now() / (windowSeconds * 1000));
  const key = `${PREFIX}:${ipAddress}:${window}`;

  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, windowSeconds);
  }

  if (current > maxRequests) {
    const ttl = await redis.ttl(key);
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: ttl > 0 ? ttl * 1000 : windowSeconds * 1000,
    };
  }

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - current),
  };
}
