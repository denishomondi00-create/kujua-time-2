import 'server-only'

import { cookies } from 'next/headers'

import type { EventTypeListQuery } from '@/features/event-types/schemas'
import { unwrapApiPayload } from '@/lib/api-client/payload'

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

export async function getEventTypesListServer(query: Partial<EventTypeListQuery> = {}) {
  const cookieStore = await cookies()
  const qs = buildQueryString({
    page: query.page,
    pageSize: query.pageSize,
    search: query.search,
    status: query.status,
  })

  const response = await fetch(buildUrl(`/v1/event-types${qs}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load event types.')
  }

  return unwrapApiPayload(await response.json())
}

export async function getEventTypeDetailServer(eventTypeId: string) {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl(`/v1/event-types/${eventTypeId}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load event type details.')
  }

  return unwrapApiPayload(await response.json())
}

export async function getEventTypePreviewServer(eventTypeId: string) {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl(`/v1/event-types/${eventTypeId}/preview`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load event type preview.')
  }

  return unwrapApiPayload(await response.json())
}
