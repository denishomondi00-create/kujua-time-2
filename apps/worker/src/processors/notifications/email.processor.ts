/**
 * Sends emails via configured provider (Postmark or Resend).
 * Processor for: notifications.email
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { NOTIFICATIONS_EMAIL_QUEUE_NAME, type EmailJobData } from '@kujua-time/queue';
import type { EmailProvider } from '@kujua-time/messaging';
import { ResendAdapter } from '@kujua-time/messaging';
import { PostmarkAdapter } from '@kujua-time/messaging';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('email-processor');

function createEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER ?? 'resend';
  if (provider === 'postmark' && process.env.POSTMARK_SERVER_TOKEN) {
    return new PostmarkAdapter(process.env.POSTMARK_SERVER_TOKEN);
  }
  if (process.env.RESEND_API_KEY) {
    return new ResendAdapter(process.env.RESEND_API_KEY);
  }
  throw new Error('No email provider configured');
}

export function registerEmailProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  let emailProvider: EmailProvider;

  const worker = new Worker<EmailJobData>(
    NOTIFICATIONS_EMAIL_QUEUE_NAME,
    async (job: Job<EmailJobData>) => {
      if (!emailProvider) emailProvider = createEmailProvider();

      const { to, subject, body, replyTo } = job.data;
      const from = process.env.EMAIL_FROM ?? 'noreply@kujuatime.com';

      logger.info(`Sending email to ${to}`, { subject, jobId: job.id });

      const result = await emailProvider.send({
        from, to, subject, html: body, replyTo,
        tag: 'transactional',
      });

      // Log notification delivery
      try {
        const mongoose = (await import('mongoose')).default;
        const NotificationLog = mongoose.model('NotificationLog');
        await NotificationLog.create({
          workspaceId: job.data.workspaceId,
          channel: 'email',
          category: 'booking-confirmations',
          recipient: to,
          subject,
          status: 'sent',
          providerMessageId: result.messageId,
          sentAt: new Date(),
          automationExecutionId: job.data.automationExecutionId,
        });
      } catch (logErr: any) {
        logger.warn('Failed to write notification log', { error: logErr.message });
      }

      return { messageId: result.messageId };
    },
    {
      connection,
      concurrency,
      limiter: { max: 10, duration: 1000 }, // 10 emails/sec
    },
  );

  return [worker];
}
