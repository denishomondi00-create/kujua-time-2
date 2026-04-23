/**
 * Checks health of all calendar connections and triggers re-sync for stale ones.
 * Schedule: every 2 hours
 */
import { Queue } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { CALENDAR_SYNC_QUEUE_NAME } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('calendar-health-scheduler');

export async function registerCalendarHealthScheduler(connection: ConnectionOptions): Promise<void> {
  const queue = new Queue(CALENDAR_SYNC_QUEUE_NAME, { connection });

  await queue.upsertJobScheduler(
    'calendar:health-check',
    { pattern: '0 */2 * * *' },
    {
      name: 'calendar:health-check',
      data: { task: 'health-check' },
    },
  );

  logger.info('Calendar health check scheduler registered (every 2h)');
  await queue.close();
}
