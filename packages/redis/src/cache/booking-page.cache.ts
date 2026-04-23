/**
 * Cache for public booking page data.
 * Key pattern: cache:booking-page:{slug}
 */
import type Redis from 'ioredis';

const PREFIX = 'cache:booking-page';
const DEFAULT_TTL = 300; // 5 minutes

export async function getBookingPageCache(
  redis: Redis,
  slug: string,
): Promise<Record<string, unknown> | null> {
  const data = await redis.get(`${PREFIX}:${slug}`);
  return data ? JSON.parse(data) : null;
}

export async function setBookingPageCache(
  redis: Redis,
  slug: string,
  value: Record<string, unknown>,
  ttl = DEFAULT_TTL,
): Promise<void> {
  await redis.set(`${PREFIX}:${slug}`, JSON.stringify(value), 'EX', ttl);
}

export async function invalidateBookingPageCache(
  redis: Redis,
  slug: string,
): Promise<void> {
  await redis.del(`${PREFIX}:${slug}`);
}
