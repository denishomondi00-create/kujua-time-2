/**
 * Sends transactional and automation emails
 * Queue name: notifications.email
 */
import { Queue, QueueOptions } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export const NOTIFICATIONS_EMAIL_QUEUE_NAME = 'notifications.email';

export function createNotificationsEmailQueue(
  connection: ConnectionOptions,
  opts?: Partial<QueueOptions>,
): Queue {
  return new Queue('notifications.email', {
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
