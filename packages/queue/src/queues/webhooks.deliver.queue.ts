/**
 * Delivers outgoing user-configured webhooks
 * Queue name: webhooks.deliver
 */
import { Queue, QueueOptions } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export const WEBHOOKS_DELIVER_QUEUE_NAME = 'webhooks.deliver';

export function createWebhooksDeliverQueue(
  connection: ConnectionOptions,
  opts?: Partial<QueueOptions>,
): Queue {
  return new Queue('webhooks.deliver', {
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
