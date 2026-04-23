import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Calendar provider port.
 * Google Calendar is the launch provider.
 * Architecture rules:
 *   - Initial full sync at connection time
 *   - Persist syncToken, use incremental sync after
 *   - On 410 GONE, clear sync state and run full re-sync
 *   - bookings is Kujua Time source of truth
 *   - external_calendar_events is only a busy-time mirror
 */
export const CALENDAR_PROVIDER = Symbol('CALENDAR_PROVIDER');

export interface CalendarProvider {
  readonly provider: 'google' | 'outlook';

  getAuthUrl(params: {
    redirectUri: string;
    state: string;
    scopes?: string[];
  }): string;

  exchangeCode(params: {
    code: string;
    redirectUri: string;
  }): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
    accountEmail: string;
    accountId: string;
  }>;

  refreshAccessToken(refreshToken: string): Promise<{
    accessToken: string;
    expiresAt: Date;
  }>;

  listCalendars(accessToken: string): Promise<Array<{
    id: string;
    name: string;
    primary: boolean;
    accessRole: string;
  }>>;

  listEvents(params: {
    accessToken: string;
    calendarId: string;
    syncToken?: string;
    timeMin?: string;
    timeMax?: string;
    maxResults?: number;
  }): Promise<{
    events: Array<{
      id: string;
      status: 'confirmed' | 'tentative' | 'cancelled';
      summary?: string;
      startAt: string;
      endAt: string;
      isAllDay: boolean;
    }>;
    nextSyncToken?: string;
    nextPageToken?: string;
  }>;

  createEvent(params: {
    accessToken: string;
    calendarId: string;
    event: {
      summary: string;
      description?: string;
      startAt: string;
      endAt: string;
      timeZone: string;
      attendees?: Array<{ email: string }>;
      location?: string;
      conferenceData?: any;
    };
  }): Promise<{ eventId: string }>;

  deleteEvent(params: {
    accessToken: string;
    calendarId: string;
    eventId: string;
  }): Promise<void>;
}

/**
 * Stub calendar provider for development.
 */
class DevCalendarProvider implements CalendarProvider {
  readonly provider = 'google' as const;

  getAuthUrl(params: { redirectUri: string; state: string }) {
    return `http://localhost:3000/dev-oauth?redirect_uri=${params.redirectUri}&state=${params.state}`;
  }

  async exchangeCode(_params: any) {
    return {
      accessToken: 'dev-access-token',
      refreshToken: 'dev-refresh-token',
      expiresAt: new Date(Date.now() + 3600_000),
      accountEmail: 'dev@example.com',
      accountId: 'dev-account-id',
    };
  }

  async refreshAccessToken(_refreshToken: string) {
    return { accessToken: 'dev-refreshed-token', expiresAt: new Date(Date.now() + 3600_000) };
  }

  async listCalendars(_accessToken: string) {
    return [
      { id: 'primary', name: 'Dev Calendar', primary: true, accessRole: 'owner' },
    ];
  }

  async listEvents(_params: any) {
    return { events: [], nextSyncToken: `dev-sync-${Date.now()}` };
  }

  async createEvent(_params: any) {
    return { eventId: `dev-event-${Date.now()}` };
  }

  async deleteEvent(_params: any) {
    console.log('[DEV CALENDAR] Event deleted');
  }
}

@Global()
@Module({
  providers: [
    {
      provide: CALENDAR_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService): CalendarProvider => {
        const clientId = config.get<string>('GOOGLE_CALENDAR_CLIENT_ID');

        if (clientId) {
          // When packages/calendaring Google adapter is wired:
          // return new GoogleCalendarAdapter({
          //   clientId,
          //   clientSecret: config.get('GOOGLE_CALENDAR_CLIENT_SECRET'),
          // });
        }

        return new DevCalendarProvider();
      },
    },
  ],
  exports: [CALENDAR_PROVIDER],
})
export class CalendaringModule {}
