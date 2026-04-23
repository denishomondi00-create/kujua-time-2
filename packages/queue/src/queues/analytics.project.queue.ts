/**
 * Updates analytics read models and report snapshots
 * Queue name: analytics.project
 */
import { Queue, QueueOptions } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export const ANALYTICS_PROJECT_QUEUE_NAME = 'analytics.project';

export function createAnalyticsProjectQueue(
  connection: ConnectionOptions,
  opts?: Partial<QueueOptions>,
): Queue {
  return new Queue('analytics.project', {
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
