import { format, isToday, isTomorrow, parseISO } from 'date-fns'

export function toDate(value: string | Date) {
  return value instanceof Date ? value : parseISO(value)
}

export function formatDateTime(value: string | Date, pattern = "EEE, MMM d • h:mm a") {
  return format(toDate(value), pattern)
}

export function formatDateLabel(value: string | Date) {
  const date = toDate(value)
  if (isToday(date)) return `Today, ${format(date, "MMM d")}`
  if (isTomorrow(date)) return `Tomorrow, ${format(date, "MMM d")}`
  return format(date, "EEEE, MMM d")
}

export function formatTimeRange(startAt: string | Date, endAt: string | Date) {
  return `${formatDateTime(startAt, "h:mm a")} – ${formatDateTime(endAt, "h:mm a")}`
}

export function isoDateOnly(value: Date = new Date()) {
  return format(value, "yyyy-MM-dd")
}
