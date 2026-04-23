/**
 * Date and timezone helpers for the scheduling engine.
 *
 * All bookings are stored in UTC. Slot computation converts
 * between user timezone and UTC using these helpers.
 */

/**
 * Get the current moment as an ISO string.
 */
export function nowISO(): string {
  return new Date().toISOString();
}

/**
 * Get the start of a given day in a specific timezone, returned as UTC Date.
 */
export function startOfDayInTz(dateStr: string, tz: string): Date {
  const localized = new Date(
    new Date(dateStr).toLocaleString('en-US', { timeZone: tz }),
  );
  localized.setHours(0, 0, 0, 0);

  // Convert back to UTC using the offset
  const utcDate = new Date(dateStr);
  const offset = utcDate.getTime() - localized.getTime();
  return new Date(localized.getTime() + offset);
}

/**
 * Get the end of a given day in a specific timezone, returned as UTC Date.
 */
export function endOfDayInTz(dateStr: string, tz: string): Date {
  const start = startOfDayInTz(dateStr, tz);
  return new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
}

/**
 * Add minutes to a date.
 */
export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000);
}

/**
 * Add hours to a date.
 */
export function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 3_600_000);
}

/**
 * Add days to a date.
 */
export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 86_400_000);
}

/**
 * Check if two time ranges overlap.
 * Used by the slot engine for conflict detection.
 */
export function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Format a Date as YYYY-MM-DD string.
 */
export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parse a date string safely. Returns null for invalid input.
 */
export function safeParse(input: string): Date | null {
  const d = new Date(input);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Get the difference between two dates in milliseconds.
 */
export function diffMs(a: Date, b: Date): number {
  return Math.abs(a.getTime() - b.getTime());
}

/**
 * Check if a date is in the past.
 */
export function isPast(date: Date): boolean {
  return date.getTime() < Date.now();
}

/**
 * Check if a date is within a booking window (min notice, max advance).
 */
export function isWithinBookingWindow(
  slotStart: Date,
  minNoticeMinutes: number,
  maxAdvanceDays: number,
): boolean {
  const now = new Date();
  const earliest = addMinutes(now, minNoticeMinutes);
  const latest = addDays(now, maxAdvanceDays);
  return slotStart >= earliest && slotStart <= latest;
}
