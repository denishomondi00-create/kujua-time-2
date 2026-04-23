/**
 * Retries unpublished domain events that may have been missed by the primary dispatcher.
 * Schedule: every 10 minutes
 */
import { Queue } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { AUTOMATION_DISPATCH_QUEUE_NAME } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('retry-stuck-scheduler');

export async function registerRetryStuckEventsScheduler(connection: ConnectionOptions): Promise<void> {
  const queue = new Queue(AUTOMATION_DISPATCH_QUEUE_NAME, { connection });

  await queue.upsertJobScheduler(
    'automation:retry-stuck',
    { pattern: '*/10 * * * *' },
    { name: 'automation:retry-stuck', data: { task: 'retry-stuck-events' } },
  );

  logger.info('Retry stuck events scheduler registered (every 10min)');
  await queue.close();
}
