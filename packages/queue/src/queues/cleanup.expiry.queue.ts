/**
 * Cleans up expired holds, stale sync states, etc.
 * Queue name: cleanup.expiry
 */
import { Queue, QueueOptions } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export const CLEANUP_EXPIRY_QUEUE_NAME = 'cleanup.expiry';

export function createCleanupExpiryQueue(
  connection: ConnectionOptions,
  opts?: Partial<QueueOptions>,
): Queue {
  return new Queue('cleanup.expiry', {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2_000 },
      removeOnComplete: { count: 1000, age: 86_400 },
      removeOnFail: { count: 5000 },
    },
    ...opts,
  });
}
