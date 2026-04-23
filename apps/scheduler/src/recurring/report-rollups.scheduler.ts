/**
 * Generates daily report snapshots for all active workspaces.
 * Schedule: 2 AM daily
 */
import { Queue } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { ANALYTICS_PROJECT_QUEUE_NAME } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('report-rollups-scheduler');

export async function registerReportRollupsScheduler(connection: ConnectionOptions): Promise<void> {
  const queue = new Queue(ANALYTICS_PROJECT_QUEUE_NAME, { connection });

  await queue.upsertJobScheduler(
    'reports:daily-rollup',
    { pattern: '0 2 * * *' },
    { name: 'reports:daily-rollup', data: { task: 'daily-rollup' } },
  );

  logger.info('Daily report rollup scheduler registered (2 AM)');
  await queue.close();
}
