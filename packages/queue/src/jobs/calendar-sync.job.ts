/**
 * Job payload contracts for calendar sync queue.
 */

export interface CalendarSyncJobData {
  connectedCalendarId: string;
  workspaceId: string;
  forceFullSync?: boolean;
}

export const CALENDAR_SYNC_JOB_NAMES = {
  SYNC: 'calendar:sync',
  HEALTH_CHECK: 'calendar:health-check',
} as const;
