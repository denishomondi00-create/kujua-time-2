/**
 * Redis-backed idempotency store.
 * Used for payment webhook processing and booking confirmation
 * to prevent duplicate processing.
 *
 * Key pattern: idempo:{provider}:{key}
 */
import type Redis from 'ioredis';

const PREFIX = 'idempo';
const DEFAULT_TTL = 86400; // 24 hours

export interface IdempotencyEntry {
  result: Record<string, unknown>;
  createdAt: string;
}

export async function getIdempotencyEntry(
  redis: Redis,
  provider: string,
  key: string,
): Promise<IdempotencyEntry | null> {
  const data = await redis.get(`${PREFIX}:${provider}:${key}`);
  return data ? JSON.parse(data) : null;
}

export async function setIdempotencyEntry(
  redis: Redis,
  provider: string,
  key: string,
  result: Record<string, unknown>,
  ttl = DEFAULT_TTL,
): Promise<boolean> {
  const entry: IdempotencyEntry = {
    result,
    createdAt: new Date().toISOString(),
  };

  // NX: only set if not exists (first-write wins)
  const res = await redis.set(
    `${PREFIX}:${provider}:${key}`,
    JSON.stringify(entry),
    'EX',
    ttl,
    'NX',
  );

  return res === 'OK';
}

export async function deleteIdempotencyEntry(
  redis: Redis,
  provider: string,
  key: string,
): Promise<void> {
  await redis.del(`${PREFIX}:${provider}:${key}`);
}
