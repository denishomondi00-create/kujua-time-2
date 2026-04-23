/**
 * Redis client factory.
 * Redis is used for TWO categories only:
 * 1. BullMQ backing store
 * 2. Hot-path cache, locks, and rate limiting
 */
import Redis from 'ioredis';

export interface RedisConfig {
  url?: string;
  host?: string;
  port?: number;
  password?: string;
  maxRetriesPerRequest?: number | null;
  enableReadyCheck?: boolean;
  db?: number;
}

export function createRedisClient(config: RedisConfig): Redis {
  if (config.url) {
    return new Redis(config.url, {
      maxRetriesPerRequest: config.maxRetriesPerRequest ?? 3,
      enableReadyCheck: config.enableReadyCheck ?? true,
      retryStrategy: (times: number) => Math.min(times * 200, 5000),
    });
  }

  return new Redis({
    host: config.host ?? 'localhost',
    port: config.port ?? 6379,
    password: config.password,
    db: config.db ?? 0,
    maxRetriesPerRequest: config.maxRetriesPerRequest ?? 3,
    enableReadyCheck: config.enableReadyCheck ?? true,
    retryStrategy: (times: number) => Math.min(times * 200, 5000),
  });
}

/**
 * Create a Redis client for BullMQ.
 * BullMQ requires maxRetriesPerRequest: null.
 */
export function createBullMQRedisClient(config: RedisConfig): Redis {
  return createRedisClient({
    ...config,
    maxRetriesPerRequest: null,
  });
}
