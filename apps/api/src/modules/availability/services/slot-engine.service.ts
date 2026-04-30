import { Injectable } from '@nestjs/common';

export interface Slot {
  startAt: string;
  endAt: string;
  label: string;
  available: boolean;
}

type AvailabilityWindow = { start: string; end: string };

@Injectable()
export class SlotEngineService {
  /**
   * Compute valid slots on demand for a given event type, date, and timezone.
   * Factors in: weekly hours, exceptions, existing bookings, buffers, min notice, max window.
   */
  async computeSlots(params: {
    workspaceId: string;
    eventTypeId: string;
    date: string;
    timezone: string;
    durationMinutes: number;
    rules: any;
    exceptions: any[];
    existingBookings: Array<{ startAt: string; endAt: string }>;
    externalBusyWindows?: Array<{ startAt: string; endAt: string }>;
  }): Promise<Slot[]> {
    const date = params.date || new Date().toISOString().slice(0, 10);
    const rule = params.rules ?? {};
    const exception = params.exceptions?.find((item) => item.date === date);
    if (exception?.unavailable) return [];

    const maxBookingDaysAhead = Number(rule.maxBookingDaysAhead ?? 60);
    const minNoticeMinutes = Number(rule.minNoticeMinutes ?? 0);
    const now = new Date();
    const dayStart = this.dateAtTime(date, '00:00');
    const maxDate = new Date(now.getTime() + maxBookingDaysAhead * 24 * 60 * 60 * 1000);
    if (dayStart > maxDate) return [];

    const windows: AvailabilityWindow[] = exception?.overrideHours?.length
      ? exception.overrideHours
      : this.getWeeklyWindows(date, rule.weeklyHours);
    const busyWindows = [
      ...(params.existingBookings ?? []),
      ...(params.externalBusyWindows ?? []),
    ].map((window) => ({
      startAt: new Date(window.startAt),
      endAt: new Date(window.endAt),
    }));
    const durationMinutes = Math.max(1, params.durationMinutes);
    const stepMinutes = durationMinutes;
    const earliestStart = new Date(now.getTime() + minNoticeMinutes * 60 * 1000);

    return windows.flatMap((window) => {
      const windowStart = this.dateAtTime(date, window.start);
      const windowEnd = this.dateAtTime(date, window.end);
      const slots: Slot[] = [];

      for (
        let startAt = windowStart;
        startAt.getTime() + durationMinutes * 60 * 1000 <= windowEnd.getTime();
        startAt = new Date(startAt.getTime() + stepMinutes * 60 * 1000)
      ) {
        const endAt = new Date(startAt.getTime() + durationMinutes * 60 * 1000);
        const available = startAt >= earliestStart && !busyWindows.some((busy) => (
          startAt < busy.endAt && endAt > busy.startAt
        ));

        slots.push({
          startAt: startAt.toISOString(),
          endAt: endAt.toISOString(),
          label: startAt.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            timeZone: params.timezone,
          }),
          available,
        });
      }

      return slots;
    });
  }

  private getWeeklyWindows(date: string, weeklyHours?: Record<string, AvailabilityWindow[]>): AvailabilityWindow[] {
    const day = new Date(`${date}T00:00:00`).getDay();
    const names = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const configured = weeklyHours?.[names[day]] ?? weeklyHours?.[String(day)];

    if (configured?.length) return configured;
    if (day === 0 || day === 6) return [];
    return [{ start: '09:00', end: '17:00' }];
  }

  private dateAtTime(date: string, time: string) {
    const [hours = '0', minutes = '0'] = time.split(':');
    return new Date(`${date}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`);
  }
}
