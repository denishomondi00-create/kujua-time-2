/**
 * Projects analytics read-models and daily rollups.
 * Processor for: analytics.project
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { ANALYTICS_PROJECT_QUEUE_NAME } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('analytics-project');

export function registerAnalyticsProjectProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  const worker = new Worker(
    ANALYTICS_PROJECT_QUEUE_NAME,
    async (job: Job) => {
      const task = (job.data as any).task;

      if (task === 'daily-rollup') {
        return handleDailyRollup();
      }

      logger.info('Processing analytics projection', { jobId: job.id, task });
    },
    { connection, concurrency },
  );

  return [worker];
}

async function handleDailyRollup(): Promise<void> {
  logger.info('Running daily analytics rollup');

  const mongoose = (await import('mongoose')).default;
  const Booking = mongoose.model('Booking');
  const Payment = mongoose.model('Payment');
  const ReportSnapshot = mongoose.model('ReportSnapshot');

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Aggregate bookings
  const bookingStats = await Booking.aggregate([
    { $match: { createdAt: { $gte: yesterday, $lt: today } } },
    {
      $group: {
        _id: '$workspaceId',
        total: { $sum: 1 },
        confirmed: { $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] } },
        canceled: { $sum: { $cond: [{ $eq: ['$status', 'canceled'] }, 1, 0] } },
        noShows: { $sum: { $cond: [{ $eq: ['$status', 'no_show'] }, 1, 0] } },
      },
    },
  ]);

  for (const stat of bookingStats) {
    await ReportSnapshot.updateOne(
      { workspaceId: stat._id, date: yesterday.toISOString().split('T')[0], type: 'daily-bookings' },
      { $set: { data: stat, generatedAt: new Date() } },
      { upsert: true },
    );
  }

  logger.info(`Daily rollup complete: ${bookingStats.length} workspaces processed`);
}
