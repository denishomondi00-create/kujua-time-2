import {
  bookingActionSchema,
  bookingDetailSchema,
  bookingListResponseSchema,
  bookingQuerySchema,
  bookingRescheduleSchema,
  type BookingPaymentStatus,
  type BookingQuery,
  type BookingStatus,
  type BookingActionInput,
  type BookingDetail,
  type BookingListResponse,
  type BookingRescheduleInput,
} from '@/features/bookings/schemas'
import { unwrapApiPayload } from '@/lib/api-client/payload'

export const BOOKING_STATUS_OPTIONS: Array<{ value: BookingStatus; label: string }> = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'pending_approval', label: 'Pending approval' },
  { value: 'completed', label: 'Completed' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'no_show', label: 'No-show' },
]

export const BOOKING_QUERY_KEYS = {
  all: ['bookings'] as const,
  list: (query: BookingQuery) => ['bookings', 'list', query] as const,
  detail: (bookingId: string) => ['bookings', 'detail', bookingId] as const,
} as const

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function buildUrl(path: string) {
  return new URL(path, API_BASE_URL).toString()
}

function buildQueryString(query: Record<string, string | number | undefined>) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === '') continue
    params.set(key, String(value))
  }

  const serialized = params.toString()
  return serialized ? `?${serialized}` : ''
}

async function requestJson<T>(path: string, init?: RequestInit) {
  const response = await fetch(buildUrl(path), {
    ...init,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  const payload = unwrapApiPayload<T>(await response.json())

  if (!response.ok) {
    throw new Error(typeof payload?.message === 'string' ? payload.message : 'Booking request failed.')
  }

  return payload as T
}

export function formatBookingDateRange(startAt: string, endAt: string, timezone: string) {
  const start = new Date(startAt)
  const end = new Date(endAt)

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: timezone,
  }).format(start) + ' – ' + new Intl.DateTimeFormat('en-US', {
    timeStyle: 'short',
    timeZone: timezone,
  }).format(end)
}

export function formatBookingAmount(amount: number | null | undefined, currency = 'USD') {
  if (amount === null || amount === undefined) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getBookingStatusTone(status: BookingStatus | BookingPaymentStatus) {
  switch (status) {
    case 'upcoming':
    case 'paid':
      return { background: 'var(--kujua-success-bg)', color: 'var(--kujua-success)' }
    case 'pending_approval':
    case 'partial':
      return { background: 'var(--kujua-warning-bg)', color: 'var(--kujua-warning)' }
    case 'completed':
      return { background: 'rgba(91, 138, 114, 0.12)', color: 'var(--kujua-secondary-sage)' }
    case 'canceled':
    case 'refunded':
      return { background: 'rgba(194, 101, 101, 0.12)', color: 'var(--kujua-secondary-rose)' }
    case 'no_show':
    case 'unpaid':
    default:
      return { background: 'var(--kujua-gray-100)', color: 'var(--kujua-gray-700)' }
  }
}

export async function listBookings(query: Partial<BookingQuery> = {}) {
  const parsed = bookingQuerySchema.partial().parse(query)
  const qs = buildQueryString({
    page: parsed.page,
    pageSize: parsed.pageSize,
    search: parsed.search,
    status: parsed.status,
  })

  const payload = await requestJson<BookingListResponse>(`/v1/bookings${qs}`, {
    method: 'GET',
  })

  return bookingListResponseSchema.parse(payload)
}

export async function getBookingDetail(bookingId: string) {
  const payload = await requestJson<BookingDetail>(`/v1/bookings/${bookingId}`, {
    method: 'GET',
  })

  return bookingDetailSchema.parse(payload)
}

export async function cancelBooking(bookingId: string, input: BookingActionInput = {}) {
  const body = bookingActionSchema.parse(input)
  return requestJson(`/v1/bookings/${bookingId}/cancel`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function approveBooking(bookingId: string, input: BookingActionInput = {}) {
  const body = bookingActionSchema.parse(input)
  return requestJson(`/v1/bookings/${bookingId}/approve`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function completeBooking(bookingId: string, input: BookingActionInput = {}) {
  const body = bookingActionSchema.parse(input)
  return requestJson(`/v1/bookings/${bookingId}/complete`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function markBookingNoShow(bookingId: string, input: BookingActionInput = {}) {
  const body = bookingActionSchema.parse(input)
  return requestJson(`/v1/bookings/${bookingId}/no-show`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function rescheduleBooking(bookingId: string, input: BookingRescheduleInput) {
  const body = bookingRescheduleSchema.parse(input)
  return requestJson(`/v1/bookings/${bookingId}/reschedule`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
