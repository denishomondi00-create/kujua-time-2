/**
 * Cache for computed availability slots.
 * Key pattern: cache:availability:{workspaceId}:{eventTypeId}:{date}:{tz}
 * Invalidated when calendar sync detects changes.
 */
import type Redis from 'ioredis';

const PREFIX = 'cache:availability';
const DEFAULT_TTL = 120; // 2 minutes — slots are time-sensitive

export function buildAvailabilityKey(
  workspaceId: string,
  eventTypeId: string,
  date: string,
  tz: string,
): string {
  return `${PREFIX}:${workspaceId}:${eventTypeId}:${date}:${tz}`;
}

export async function getAvailabilityCache(
  redis: Redis,
  workspaceId: string,
  eventTypeId: string,
  date: string,
  tz: string,
): Promise<unknown[] | null> {
  const key = buildAvailabilityKey(workspaceId, eventTypeId, date, tz);
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setAvailabilityCache(
  redis: Redis,
  workspaceId: string,
  eventTypeId: string,
  date: string,
  tz: string,
  slots: unknown[],
  ttl = DEFAULT_TTL,
): Promise<void> {
  const key = buildAvailabilityKey(workspaceId, eventTypeId, date, tz);
  await redis.set(key, JSON.stringify(slots), 'EX', ttl);
}

export async function invalidateAvailabilityCache(
  redis: Redis,
  workspaceId: string,
  eventTypeId?: string,
): Promise<void> {
  const pattern = eventTypeId
    ? `${PREFIX}:${workspaceId}:${eventTypeId}:*`
    : `${PREFIX}:${workspaceId}:*`;

  let cursor = '0';
  do {
    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
    cursor = nextCursor;
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } while (cursor !== '0');
}
