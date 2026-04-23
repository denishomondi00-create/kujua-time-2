/**
 * Google Calendar push notification channel management.
 * Used later for real-time calendar sync via webhooks.
 */
import { getCalendarClient } from './events-client';
import type { GoogleOAuthConfig } from './oauth';
import { randomUUID } from 'crypto';

export interface WatchChannelResult {
  channelId: string;
  resourceId: string;
  expiration: Date;
}

/**
 * Register a watch channel for push notifications on a calendar.
 * Google will POST to the webhook URL when events change.
 */
export async function watchGoogleCalendar(
  config: GoogleOAuthConfig,
  accessToken: string,
  calendarId: string,
  webhookUrl: string,
): Promise<WatchChannelResult> {
  const cal = getCalendarClient(config, accessToken);
  const channelId = randomUUID();

  const { data } = await cal.events.watch({
    calendarId,
    requestBody: {
      id: channelId,
      type: 'web_hook',
      address: webhookUrl,
      params: { ttl: '604800' }, // 7 days
    },
  });

  return {
    channelId,
    resourceId: data.resourceId!,
    expiration: new Date(Number(data.expiration!)),
  };
}

/**
 * Stop receiving push notifications for a channel.
 */
export async function stopGoogleWatch(
  config: GoogleOAuthConfig,
  accessToken: string,
  channelId: string,
  resourceId: string,
): Promise<void> {
  const cal = getCalendarClient(config, accessToken);
  await cal.channels.stop({
    requestBody: { id: channelId, resourceId },
  });
}
