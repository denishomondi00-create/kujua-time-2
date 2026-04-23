/**
 * Google Calendar incremental sync.
 *
 * Rules from architecture:
 * - Initial full sync at connection time
 * - Persist syncToken
 * - Use incremental sync after first full sync
 * - Reconcile deleted and canceled events
 * - If Google returns 410 GONE, clear local mirror and run full re-sync
 */
import { calendar_v3 } from 'googleapis';
import { getCalendarClient, } from './events-client';
import { mapGoogleEventToInternal } from './availability-mapper';
import type { GoogleOAuthConfig } from './oauth';
import type { CalendarEvent, SyncResult } from '../../ports/calendaring-provider.port';

export async function fullSyncGoogle(
  config: GoogleOAuthConfig,
  accessToken: string,
  calendarId: string,
  timeMin?: Date,
): Promise<SyncResult> {
  const cal = getCalendarClient(config, accessToken);
  const events: CalendarEvent[] = [];
  let pageToken: string | undefined;

  do {
    const { data } = await cal.events.list({
      calendarId,
      singleEvents: true,
      showDeleted: true,
      timeMin: (timeMin ?? new Date(Date.now() - 90 * 24 * 3600 * 1000)).toISOString(),
      maxResults: 250,
      pageToken,
    });

    for (const item of data.items ?? []) {
      const mapped = mapGoogleEventToInternal(item);
      if (mapped) events.push(mapped);
    }

    pageToken = data.nextPageToken ?? undefined;

    if (!data.nextPageToken && data.nextSyncToken) {
      return {
        created: events.filter((e) => e.status !== 'cancelled'),
        updated: [],
        deleted: events.filter((e) => e.status === 'cancelled').map((e) => e.providerEventId),
        nextSyncToken: data.nextSyncToken,
        requiresFullSync: false,
      };
    }
  } while (pageToken);

  return {
    created: events.filter((e) => e.status !== 'cancelled'),
    updated: [],
    deleted: events.filter((e) => e.status === 'cancelled').map((e) => e.providerEventId),
    requiresFullSync: false,
  };
}

export async function incrementalSyncGoogle(
  config: GoogleOAuthConfig,
  accessToken: string,
  calendarId: string,
  syncToken: string,
): Promise<SyncResult> {
  const cal = getCalendarClient(config, accessToken);

  try {
    const created: CalendarEvent[] = [];
    const updated: CalendarEvent[] = [];
    const deleted: string[] = [];
    let pageToken: string | undefined;
    let nextSyncToken: string | undefined;

    do {
      const { data } = await cal.events.list({
        calendarId,
        syncToken,
        showDeleted: true,
        maxResults: 250,
        pageToken,
      });

      for (const item of data.items ?? []) {
        if (item.status === 'cancelled') {
          deleted.push(item.id!);
        } else {
          const mapped = mapGoogleEventToInternal(item);
          if (mapped) {
            // Treat all non-deleted changes as updates for simplicity.
            // The caller can upsert to handle both create and update.
            updated.push(mapped);
          }
        }
      }

      pageToken = data.nextPageToken ?? undefined;
      if (data.nextSyncToken) nextSyncToken = data.nextSyncToken;
    } while (pageToken);

    return { created, updated, deleted, nextSyncToken, requiresFullSync: false };
  } catch (error: any) {
    // 410 GONE: syncToken is invalid, need full re-sync
    if (error.code === 410 || error.response?.status === 410) {
      return {
        created: [],
        updated: [],
        deleted: [],
        requiresFullSync: true,
      };
    }
    throw error;
  }
}
