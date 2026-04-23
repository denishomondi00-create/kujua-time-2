/**
 * Distributed lock for calendar sync operations.
 * Prevents concurrent syncs for the same connected calendar.
 *
 * Key pattern: lock:calendar-sync:{connectedCalendarId}
 */
import type Redis from 'ioredis';
import { randomUUID } from 'crypto';

const SYNC_LOCK_PREFIX = 'lock:calendar-sync';
const DEFAULT_LOCK_TTL_MS = 120_000; // 2 minutes (syncs can take time)

export async function acquireCalendarSyncLock(
  redis: Redis,
  connectedCalendarId: string,
  ttlMs = DEFAULT_LOCK_TTL_MS,
): Promise<{ acquired: boolean; lockId: string }> {
  const lockKey = `${SYNC_LOCK_PREFIX}:${connectedCalendarId}`;
  const lockId = randomUUID();

  const result = await redis.set(lockKey, lockId, 'PX', ttlMs, 'NX');

  return { acquired: result === 'OK', lockId };
}

export async function releaseCalendarSyncLock(
  redis: Redis,
  connectedCalendarId: string,
  lockId: string,
): Promise<boolean> {
  const lockKey = `${SYNC_LOCK_PREFIX}:${connectedCalendarId}`;

  const script = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;

  const result = await redis.eval(script, 1, lockKey, lockId);
  return result === 1;
}
