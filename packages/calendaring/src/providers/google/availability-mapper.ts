/**
 * Maps Google Calendar event objects to internal CalendarEvent shape.
 * Used for busy-time mirroring in the slot engine.
 */
import { calendar_v3 } from 'googleapis';
import type { CalendarEvent } from '../../ports/calendaring-provider.port';

export function mapGoogleEventToInternal(
  item: calendar_v3.Schema$Event,
): CalendarEvent | null {
  // Skip events without time data
  if (!item.id) return null;

  const isAllDay = !!(item.start?.date && !item.start?.dateTime);

  let startAt: Date;
  let endAt: Date;

  if (isAllDay) {
    startAt = new Date(item.start!.date!);
    endAt = new Date(item.end!.date!);
  } else if (item.start?.dateTime && item.end?.dateTime) {
    startAt = new Date(item.start.dateTime);
    endAt = new Date(item.end.dateTime);
  } else {
    return null;
  }

  return {
    providerEventId: item.id,
    summary: item.summary ?? undefined,
    startAt,
    endAt,
    isAllDay,
    status: mapStatus(item.status),
    transparency: item.transparency === 'transparent' ? 'transparent' : 'opaque',
  };
}

function mapStatus(
  status?: string | null,
): 'confirmed' | 'tentative' | 'cancelled' {
  switch (status) {
    case 'cancelled':
      return 'cancelled';
    case 'tentative':
      return 'tentative';
    default:
      return 'confirmed';
  }
}
