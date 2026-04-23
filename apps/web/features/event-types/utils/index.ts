import {
  eventTypeCreateSchema,
  eventTypeListQuerySchema,
  eventTypeListResponseSchema,
  eventTypePreviewSchema,
  eventTypeSchema,
  eventTypeUpdateSchema,
  type EventType,
  type EventTypeCreateInput,
  type EventTypeListQuery,
  type EventTypeListResponse,
  type EventTypePreview,
  type EventTypeStatus,
  type EventTypeUpdateInput,
  type MeetingLocationType,
} from '@/features/event-types/schemas'

export const EVENT_TYPE_STATUS_OPTIONS: Array<{ value: EventTypeStatus; label: string }> = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

export const MEETING_LOCATION_OPTIONS: Array<{ value: MeetingLocationType; label: string }> = [
  { value: 'in_person', label: 'In person' },
  { value: 'zoom', label: 'Zoom' },
  { value: 'google_meet', label: 'Google Meet' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'custom', label: 'Custom link' },
]

export const EVENT_TYPE_QUERY_KEYS = {
  all: ['event-types'] as const,
  list: (query: EventTypeListQuery) => ['event-types', 'list', query] as const,
  detail: (eventTypeId: string) => ['event-types', 'detail', eventTypeId] as const,
  preview: (eventTypeId: string) => ['event-types', 'preview', eventTypeId] as const,
} as const

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

function buildUrl(path: string) {
  if (!API_BASE_URL) return path
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

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(typeof payload?.message === 'string' ? payload.message : 'Event type request failed.')
  }

  return payload as T
}

export function formatEventTypePayment(eventType: Pick<EventType, 'payment'>) {
  if (!eventType.payment.required || eventType.payment.mode === 'free') return 'Free'
  if (eventType.payment.amount === null || eventType.payment.amount === undefined) return 'Paid'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: eventType.payment.currency,
    maximumFractionDigits: 2,
  }).format(eventType.payment.amount)
}

export function getEventTypeStatusTone(status: EventTypeStatus) {
  switch (status) {
    case 'published':
      return { background: 'var(--kujua-success-bg)', color: 'var(--kujua-success)' }
    case 'draft':
      return { background: 'var(--kujua-warning-bg)', color: 'var(--kujua-warning)' }
    case 'archived':
    default:
      return { background: 'var(--kujua-gray-100)', color: 'var(--kujua-gray-700)' }
  }
}

export async function listEventTypes(query: Partial<EventTypeListQuery> = {}) {
  const parsed = eventTypeListQuerySchema.partial().parse(query)
  const qs = buildQueryString({
    page: parsed.page,
    pageSize: parsed.pageSize,
    search: parsed.search,
    status: parsed.status,
  })

  const payload = await requestJson<EventTypeListResponse>(`/v1/event-types${qs}`, { method: 'GET' })
  return eventTypeListResponseSchema.parse(payload)
}

export async function getEventTypeDetail(eventTypeId: string) {
  const payload = await requestJson<EventType>(`/v1/event-types/${eventTypeId}`, { method: 'GET' })
  return eventTypeSchema.parse(payload)
}

export async function createEventType(input: EventTypeCreateInput) {
  return requestJson<EventType>('/v1/event-types', {
    method: 'POST',
    body: JSON.stringify(eventTypeCreateSchema.parse(input)),
  })
}

export async function updateEventType(eventTypeId: string, input: EventTypeUpdateInput) {
  return requestJson<EventType>(`/v1/event-types/${eventTypeId}`, {
    method: 'PATCH',
    body: JSON.stringify(eventTypeUpdateSchema.parse(input)),
  })
}

export async function duplicateEventType(eventTypeId: string) {
  return requestJson<EventType>(`/v1/event-types/${eventTypeId}/duplicate`, { method: 'POST' })
}

export async function archiveEventType(eventTypeId: string) {
  return requestJson<EventType>(`/v1/event-types/${eventTypeId}/archive`, { method: 'POST' })
}

export async function deleteEventType(eventTypeId: string) {
  return requestJson<void>(`/v1/event-types/${eventTypeId}`, { method: 'DELETE' })
}

export async function getEventTypePreview(eventTypeId: string) {
  const payload = await requestJson<EventTypePreview>(`/v1/event-types/${eventTypeId}/preview`, { method: 'GET' })
  return eventTypePreviewSchema.parse(payload)
}
