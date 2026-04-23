/**
 * Sends WhatsApp template messages
 * Queue name: notifications.whatsapp
 */
import { Queue, QueueOptions } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export const NOTIFICATIONS_WHATSAPP_QUEUE_NAME = 'notifications.whatsapp';

export function createNotificationsWhatsappQueue(
  connection: ConnectionOptions,
  opts?: Partial<QueueOptions>,
): Queue {
  return new Queue('notifications.whatsapp', {
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
