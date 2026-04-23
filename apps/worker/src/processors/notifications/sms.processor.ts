/**
 * Sends SMS via configured provider.
 * Processor for: notifications.sms
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { NOTIFICATIONS_SMS_QUEUE_NAME, type SmsJobData } from '@kujua-time/queue';
import { NoopSmsProvider } from '@kujua-time/messaging';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('sms-processor');

export function registerSmsProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  const smsProvider = new NoopSmsProvider();

  const worker = new Worker<SmsJobData>(
    NOTIFICATIONS_SMS_QUEUE_NAME,
    async (job: Job<SmsJobData>) => {
      const { to, body } = job.data;
      logger.info(`Sending SMS to ${to}`, { jobId: job.id });

      const result = await smsProvider.send({ to, body });
      return { messageId: result.messageId };
    },
    { connection, concurrency },
  );

  return [worker];
}
