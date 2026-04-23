import 'server-only'

import { cookies } from 'next/headers'

import type { FormListQuery } from '@/features/forms/schemas'
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

export async function getFormsListServer(query: Partial<FormListQuery> = {}) {
  const cookieStore = await cookies()
  const qs = buildQueryString({
    page: query.page,
    pageSize: query.pageSize,
    search: query.search,
  })

  const response = await fetch(buildUrl(`/v1/forms${qs}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load forms.')
  }

  return unwrapApiPayload(await response.json())
}

export async function getFormDetailServer(formId: string) {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl(`/v1/forms/${formId}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load form details.')
  }

  return unwrapApiPayload(await response.json())
}

export async function getFormResponsesServer(formId: string, page = 1, pageSize = 20) {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl(`/v1/form-responses?formId=${encodeURIComponent(formId)}&page=${page}&pageSize=${pageSize}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load form responses.')
  }

  return unwrapApiPayload(await response.json())
}
