/**
 * Sends WhatsApp messages via configured provider.
 * Processor for: notifications.whatsapp
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { NOTIFICATIONS_WHATSAPP_QUEUE_NAME, type WhatsappJobData } from '@kujua-time/queue';
import { NoopWhatsAppProvider } from '@kujua-time/messaging';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('whatsapp-processor');

export function registerWhatsappProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  const provider = new NoopWhatsAppProvider();

  const worker = new Worker<WhatsappJobData>(
    NOTIFICATIONS_WHATSAPP_QUEUE_NAME,
    async (job: Job<WhatsappJobData>) => {
      const { to, templateName, variables } = job.data;
      logger.info(`Sending WhatsApp to ${to}`, { template: templateName, jobId: job.id });

      const result = await provider.send({ to, templateName, variables });
      return { messageId: result.messageId };
    },
    { connection, concurrency },
  );

  return [worker];
}
