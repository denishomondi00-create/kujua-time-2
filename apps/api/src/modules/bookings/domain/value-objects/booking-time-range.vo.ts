export interface BookingTimeRange {
  startAt: Date;
  endAt: Date;
}

export function createTimeRange(startAt: string | Date, endAt: string | Date): BookingTimeRange {
  const start = new Date(startAt);
  const end = new Date(endAt);
  if (end <= start) throw new Error('End time must be after start time.');
  return { startAt: start, endAt: end };
}

export function overlaps(a: BookingTimeRange, b: BookingTimeRange): boolean {
  return a.startAt < b.endAt && a.endAt > b.startAt;
}

export function durationMinutes(range: BookingTimeRange): number {
  return (range.endAt.getTime() - range.startAt.getTime()) / 60_000;
}
