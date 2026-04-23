export type { CalendarEvent, SyncResult, CalendaringProvider } from '../ports/calendaring-provider.port';

export interface CalendarSyncJobPayload {
  connectedCalendarId: string;
  workspaceId: string;
  forceFullSync?: boolean;
}
