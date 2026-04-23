import 'server-only'

import { cookies } from 'next/headers'

import type { ClientListQuery } from '@/features/clients/schemas'
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

export async function getClientsListServer(query: Partial<ClientListQuery> = {}) {
  const cookieStore = await cookies()
  const qs = buildQueryString({
    page: query.page,
    pageSize: query.pageSize,
    search: query.search,
    stage: query.stage,
  })

  const response = await fetch(buildUrl(`/v1/clients${qs}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load clients.')
  }

  return unwrapApiPayload(await response.json())
}

export async function getClientDetailServer(clientId: string) {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl(`/v1/clients/${clientId}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load client details.')
  }

  return unwrapApiPayload(await response.json())
}
