/**
 * Cleans up booking holds that have expired but were not TTL-deleted.
 * Also cleans stale checkout sessions.
 * Schedule: every 5 minutes for holds, every 15 minutes for checkouts
 */
import { Queue } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { CLEANUP_EXPIRY_QUEUE_NAME } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('cleanup-holds-scheduler');

export async function registerCleanupExpiredHoldsScheduler(connection: ConnectionOptions): Promise<void> {
  const queue = new Queue(CLEANUP_EXPIRY_QUEUE_NAME, { connection });

  await queue.upsertJobScheduler(
    'cleanup:expired-holds',
    { pattern: '*/5 * * * *' },
    { name: 'cleanup:expired-holds', data: { task: 'expired-holds' } },
  );

  await queue.upsertJobScheduler(
    'cleanup:stale-checkouts',
    { pattern: '*/15 * * * *' },
    { name: 'cleanup:stale-checkouts', data: { task: 'stale-checkouts' } },
  );

  logger.info('Cleanup schedulers registered (holds: 5min, checkouts: 15min)');
  await queue.close();
}
