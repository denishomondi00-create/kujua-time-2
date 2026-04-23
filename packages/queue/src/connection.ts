/**
 * Shared BullMQ connection factory.
 * Queue names and job payloads live here — NOT duplicated across apps.
 */
import { ConnectionOptions } from 'bullmq';

export interface QueueConnectionConfig {
  host?: string;
  port?: number;
  password?: string;
  url?: string;
}

export function buildConnectionOptions(config: QueueConnectionConfig): ConnectionOptions {
  if (config.url) {
    // Parse URL into host/port/password for BullMQ compatibility
    const url = new URL(config.url);
    return {
      host: url.hostname,
      port: Number(url.port) || 6379,
      password: url.password || undefined,
      maxRetriesPerRequest: null, // Required by BullMQ
    };
  }

  return {
    host: config.host ?? 'localhost',
    port: config.port ?? 6379,
    password: config.password,
    maxRetriesPerRequest: null,
  };
}
