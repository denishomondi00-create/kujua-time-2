import 'server-only'

import { cookies } from 'next/headers'

import type { ClientListQuery } from '@/features/clients/schemas'

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

  return response.json()
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

  return response.json()
}
