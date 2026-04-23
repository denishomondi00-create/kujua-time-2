export type CalendarProvider = 'google' | 'outlook';

export interface ConnectedCalendarInfo {
  workspaceId: string;
  userId: string;
  provider: CalendarProvider;
  providerAccountId: string;
  calendarId: string;
  calendarName: string;
  primary: boolean;
  syncEnabled: boolean;
  twoWaySync: boolean;
}

export interface CalendarSyncState {
  connectedCalendarId: string;
  syncToken?: string;
  lastSyncAt?: string;
  lastSyncStatus: 'success' | 'failed' | 'in_progress' | 'never';
  errorMessage?: string;
  fullSyncRequired: boolean;
}

export interface ExternalBusyWindow {
  start: string;
  end: string;
  calendarId: string;
  externalEventId: string;
  summary?: string;
}
