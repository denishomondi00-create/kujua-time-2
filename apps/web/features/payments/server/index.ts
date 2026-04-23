import 'server-only'

import { cookies } from 'next/headers'

import type { PaymentListQuery } from '@/features/payments/schemas'

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

export async function getPaymentsListServer(query: Partial<PaymentListQuery> = {}) {
  const cookieStore = await cookies()
  const qs = buildQueryString({
    page: query.page,
    pageSize: query.pageSize,
    status: query.status,
    provider: query.provider,
    search: query.search,
  })

  const response = await fetch(buildUrl(`/v1/payments${qs}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load payments.')
  }

  return response.json()
}

export async function getPaymentDetailServer(paymentId: string) {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl(`/v1/payments/${paymentId}`), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load payment details.')
  }

  return response.json()
}

export async function getPaymentPayoutsServer() {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl('/v1/payments/payouts'), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load payouts.')
  }

  return response.json()
}
