/**
 * Google Calendar Events API client.
 * Wraps read/write operations on a connected Google Calendar.
 */
import { google, calendar_v3 } from 'googleapis';
import { createOAuth2Client, GoogleOAuthConfig } from './oauth';

export function getCalendarClient(
  config: GoogleOAuthConfig,
  accessToken: string,
): calendar_v3.Calendar {
  const oauth2Client = createOAuth2Client(config);
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.calendar({ version: 'v3', auth: oauth2Client });
}

export async function listGoogleCalendars(
  config: GoogleOAuthConfig,
  accessToken: string,
): Promise<Array<{ calendarId: string; name: string; isPrimary: boolean }>> {
  const cal = getCalendarClient(config, accessToken);
  const { data } = await cal.calendarList.list({ minAccessRole: 'reader' });

  return (data.items ?? []).map((item) => ({
    calendarId: item.id!,
    name: item.summary ?? item.id!,
    isPrimary: item.primary === true,
  }));
}

export async function createGoogleEvent(
  config: GoogleOAuthConfig,
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
): Promise<{ providerEventId: string }> {
  const cal = getCalendarClient(config, accessToken);

  const { data } = await cal.events.insert({
    calendarId,
    requestBody: {
      summary: event.summary,
      description: event.description,
      location: event.location,
      start: { dateTime: event.startAt.toISOString() },
      end: { dateTime: event.endAt.toISOString() },
      attendees: event.attendees?.map((a) => ({ email: a.email })),
    },
  });

  return { providerEventId: data.id! };
}

export async function deleteGoogleEvent(
  config: GoogleOAuthConfig,
  accessToken: string,
  calendarId: string,
  eventId: string,
): Promise<void> {
  const cal = getCalendarClient(config, accessToken);
  await cal.events.delete({ calendarId, eventId });
}
