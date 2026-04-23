/**
 * Port interface for calendar providers.
 * Google Calendar implements this at launch.
 * Outlook/Microsoft 365 will implement later.
 */
export interface CalendarEvent {
  providerEventId: string;
  summary?: string;
  startAt: Date;
  endAt: Date;
  isAllDay: boolean;
  status: 'confirmed' | 'tentative' | 'cancelled';
  transparency: 'opaque' | 'transparent';
}

export interface SyncResult {
  created: CalendarEvent[];
  updated: CalendarEvent[];
  deleted: string[];
  nextSyncToken?: string;
  requiresFullSync: boolean;
}

export interface CalendaringProvider {
  /** Start OAuth flow and return authorization URL */
  getAuthUrl(state: string, redirectUri: string): string;

  /** Exchange authorization code for tokens */
  exchangeCode(code: string, redirectUri: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
    accountId: string;
    email: string;
  }>;

  /** Refresh expired access token */
  refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    expiresAt: Date;
  }>;

  /** List calendars for the connected account */
  listCalendars(accessToken: string): Promise<Array<{
    calendarId: string;
    name: string;
    isPrimary: boolean;
  }>>;

  /** Run full sync — fetch all events from a calendar */
  fullSync(
    accessToken: string,
    calendarId: string,
    timeMin?: Date,
  ): Promise<SyncResult>;

  /** Run incremental sync using a sync token */
  incrementalSync(
    accessToken: string,
    calendarId: string,
    syncToken: string,
  ): Promise<SyncResult>;

  /** Create event on external calendar */
  createEvent(
    accessToken: string,
    calendarId: string,
    event: {
      summary: string;
      startAt: Date;
      endAt: Date;
      description?: string;
      location?: string;
      attendees?: Array<{ email: string }>;
    },
  ): Promise<{ providerEventId: string }>;

  /** Delete event from external calendar */
  deleteEvent(
    accessToken: string,
    calendarId: string,
    providerEventId: string,
  ): Promise<void>;
}
