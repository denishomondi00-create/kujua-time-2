/**
 * Cleans up expired booking holds and stale checkout sessions.
 * Processor for: cleanup.expiry
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { CLEANUP_EXPIRY_QUEUE_NAME } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('cleanup-expiry');

export function registerCleanupExpiryProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  const worker = new Worker(
    CLEANUP_EXPIRY_QUEUE_NAME,
    async (job: Job) => {
      const task = (job.data as any).task;

      if (task === 'expired-holds') {
        return cleanupExpiredHolds();
      }

      if (task === 'stale-checkouts') {
        return cleanupStaleCheckouts();
      }

      logger.warn(`Unknown cleanup task: ${task}`);
    },
    { connection, concurrency },
  );

  return [worker];
}

async function cleanupExpiredHolds(): Promise<void> {
  const mongoose = (await import('mongoose')).default;
  const BookingHold = mongoose.model('BookingHold');

  const result = await BookingHold.deleteMany({
    expiresAt: { $lt: new Date() },
    status: { $ne: 'consumed' },
  });

  if (result.deletedCount > 0) {
    logger.info(`Cleaned up ${result.deletedCount} expired booking holds`);
  }
}

async function cleanupStaleCheckouts(): Promise<void> {
  const mongoose = (await import('mongoose')).default;
  const EphemeralCheckout = mongoose.model('EphemeralCheckoutSession');

  const staleThreshold = new Date(Date.now() - 30 * 60_000); // 30 minutes

  const result = await EphemeralCheckout.deleteMany({
    createdAt: { $lt: staleThreshold },
    status: { $ne: 'completed' },
  });

  if (result.deletedCount > 0) {
    logger.info(`Cleaned up ${result.deletedCount} stale checkout sessions`);
  }
}
