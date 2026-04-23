/**
 * Rate limiter for authenticated user requests.
 * Key pattern: rate:user:{userId}:{window}
 */
import type Redis from 'ioredis';

const PREFIX = 'rate:user';

export interface RateLimitCheck {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export async function checkUserRateLimit(
  redis: Redis,
  userId: string,
  windowSeconds: number,
  maxRequests: number,
): Promise<RateLimitCheck> {
  const window = Math.floor(Date.now() / (windowSeconds * 1000));
  const key = `${PREFIX}:${userId}:${window}`;

  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, windowSeconds);
  }

  const resetAt = new Date((window + 1) * windowSeconds * 1000);

  return {
    allowed: current <= maxRequests,
    remaining: Math.max(0, maxRequests - current),
    resetAt,
  };
}
