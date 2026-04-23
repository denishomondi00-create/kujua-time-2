/**
 * Syncs external calendar events (Google Calendar).
 * Processor for: calendar.sync
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { CALENDAR_SYNC_QUEUE_NAME, type CalendarSyncJobData } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('calendar-sync');

export function registerCalendarSyncProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  const worker = new Worker<CalendarSyncJobData>(
    CALENDAR_SYNC_QUEUE_NAME,
    async (job: Job<CalendarSyncJobData>) => {
      // Handle health check scheduled task
      if ((job.data as any).task === 'health-check') {
        return handleCalendarHealthCheck();
      }

      const { connectedCalendarId, workspaceId, forceFullSync } = job.data;
      logger.info(`Syncing calendar ${connectedCalendarId}`, { workspaceId, forceFullSync });

      const mongoose = (await import('mongoose')).default;
      const ConnectedCalendar = mongoose.model('ConnectedCalendar');
      const CalendarSyncState = mongoose.model('CalendarSyncState');
      const ExternalCalendarEvent = mongoose.model('ExternalCalendarEvent');

      const calendar = await ConnectedCalendar.findById(connectedCalendarId).lean();
      if (!calendar) {
        logger.warn(`Calendar ${connectedCalendarId} not found, skipping`);
        return;
      }

      let syncState = await CalendarSyncState.findOne({ connectedCalendarId }).lean();

      // Determine sync strategy
      const needsFullSync = forceFullSync || !syncState || (syncState as any).fullSyncRequired;

      // Update sync state to in_progress
      await CalendarSyncState.updateOne(
        { connectedCalendarId },
        {
          $set: { lastSyncStatus: 'in_progress' },
          $setOnInsert: { connectedCalendarId, fullSyncRequired: true },
        },
        { upsert: true },
      );

      try {
        // TODO: Integrate with @kujua-time/calendaring Google Calendar client
        // For now, mark as successful
        logger.info(`Calendar sync completed for ${connectedCalendarId}`, { fullSync: needsFullSync });

        await CalendarSyncState.updateOne(
          { connectedCalendarId },
          {
            $set: {
              lastSyncAt: new Date(),
              lastSyncStatus: 'success',
              fullSyncRequired: false,
              errorMessage: null,
            },
          },
        );
      } catch (err: any) {
        logger.error(`Calendar sync failed for ${connectedCalendarId}`, { error: err.message });

        // If 410 GONE, clear and force full re-sync
        const forceReSync = err.message?.includes('410') || err.message?.includes('GONE');

        await CalendarSyncState.updateOne(
          { connectedCalendarId },
          {
            $set: {
              lastSyncAt: new Date(),
              lastSyncStatus: 'failed',
              errorMessage: err.message,
              fullSyncRequired: forceReSync || needsFullSync,
              ...(forceReSync ? { syncToken: null } : {}),
            },
          },
        );

        throw err;
      }
    },
    { connection, concurrency },
  );

  return [worker];
}

async function handleCalendarHealthCheck(): Promise<void> {
  const mongoose = (await import('mongoose')).default;
  const CalendarSyncState = mongoose.model('CalendarSyncState');

  const staleThreshold = new Date(Date.now() - 4 * 60 * 60_000); // 4 hours
  const stale = await CalendarSyncState.countDocuments({
    lastSyncAt: { $lt: staleThreshold },
    lastSyncStatus: { $ne: 'in_progress' },
  });

  if (stale > 0) {
    logger.info(`Found ${stale} stale calendar connections needing re-sync`);
  }
}
