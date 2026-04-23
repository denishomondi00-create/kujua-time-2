/**
 * Distributed lock for booking slot reservation.
 * Prevents race conditions during concurrent booking attempts
 * for the same time slot.
 *
 * Key pattern: lock:slot:{eventTypeId}:{startAt}
 */
import type Redis from 'ioredis';
import { randomUUID } from 'crypto';

const SLOT_LOCK_PREFIX = 'lock:slot';
const DEFAULT_LOCK_TTL_MS = 15_000; // 15 seconds

export interface SlotLockResult {
  acquired: boolean;
  lockId: string;
}

export async function acquireSlotLock(
  redis: Redis,
  eventTypeId: string,
  startAt: string,
  ttlMs = DEFAULT_LOCK_TTL_MS,
): Promise<SlotLockResult> {
  const lockKey = `${SLOT_LOCK_PREFIX}:${eventTypeId}:${startAt}`;
  const lockId = randomUUID();

  const result = await redis.set(lockKey, lockId, 'PX', ttlMs, 'NX');

  return {
    acquired: result === 'OK',
    lockId,
  };
}

export async function releaseSlotLock(
  redis: Redis,
  eventTypeId: string,
  startAt: string,
  lockId: string,
): Promise<boolean> {
  const lockKey = `${SLOT_LOCK_PREFIX}:${eventTypeId}:${startAt}`;

  // Only release if we still own the lock (Lua script for atomicity)
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
