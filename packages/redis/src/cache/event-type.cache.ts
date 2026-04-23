/**
 * Cache for event type data used in slot computation.
 * Key pattern: cache:event-type:{id}
 */
import type Redis from 'ioredis';

const PREFIX = 'cache:event-type';
const DEFAULT_TTL = 300;

export async function getEventTypeCache(
  redis: Redis,
  eventTypeId: string,
): Promise<Record<string, unknown> | null> {
  const data = await redis.get(`${PREFIX}:${eventTypeId}`);
  return data ? JSON.parse(data) : null;
}

export async function setEventTypeCache(
  redis: Redis,
  eventTypeId: string,
  value: Record<string, unknown>,
  ttl = DEFAULT_TTL,
): Promise<void> {
  await redis.set(`${PREFIX}:${eventTypeId}`, JSON.stringify(value), 'EX', ttl);
}

export async function invalidateEventTypeCache(
  redis: Redis,
  eventTypeId: string,
): Promise<void> {
  await redis.del(`${PREFIX}:${eventTypeId}`);
}
