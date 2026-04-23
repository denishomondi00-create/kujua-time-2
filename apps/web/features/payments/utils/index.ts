import {
  paymentListQuerySchema,
  paymentListResponseSchema,
  paymentPayoutsResponseSchema,
  paymentProvidersResponseSchema,
  paymentSchema,
  refundPaymentSchema,
  type Payment,
  type PaymentListQuery,
  type PaymentListResponse,
  type PaymentPayoutsResponse,
  type PaymentProvidersResponse,
  type PaymentProvider,
  type PaymentStatus,
  type RefundPaymentInput,
} from '@/features/payments/schemas'
import { unwrapApiPayload } from '@/lib/api-client/payload'

export const PAYMENT_STATUS_OPTIONS: Array<{ value: PaymentStatus; label: string }> = [
  { value: 'pending', label: 'Pending' },
  { value: 'succeeded', label: 'Succeeded' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'partially_refunded', label: 'Partially refunded' },
]

export const PAYMENT_PROVIDER_OPTIONS: Array<{ value: PaymentProvider; label: string }> = [
  { value: 'stripe', label: 'Stripe' },
  { value: 'paystack', label: 'Paystack' },
  { value: 'manual', label: 'Manual' },
]

export const PAYMENTS_QUERY_KEYS = {
  all: ['payments'] as const,
  list: (query: PaymentListQuery) => ['payments', 'list', query] as const,
  detail: (paymentId: string) => ['payments', 'detail', paymentId] as const,
  payouts: ['payments', 'payouts'] as const,
  providers: ['payments', 'providers'] as const,
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
    throw new Error(typeof payload?.message === 'string' ? payload.message : 'Payment request failed.')
  }

  return payload as T
}

export function formatPaymentAmount(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getPaymentStatusTone(status: PaymentStatus) {
  switch (status) {
    case 'succeeded':
      return { background: 'var(--kujua-success-bg)', color: 'var(--kujua-success)' }
    case 'pending':
      return { background: 'var(--kujua-warning-bg)', color: 'var(--kujua-warning)' }
    case 'failed':
    case 'refunded':
    case 'partially_refunded':
    default:
      return { background: 'var(--kujua-error-bg)', color: 'var(--kujua-error)' }
  }
}

export async function listPayments(query: Partial<PaymentListQuery> = {}) {
  const parsed = paymentListQuerySchema.partial().parse(query)
  const qs = buildQueryString({
    page: parsed.page,
    pageSize: parsed.pageSize,
    status: parsed.status,
    provider: parsed.provider,
    search: parsed.search,
  })

  const payload = await requestJson<PaymentListResponse>(`/v1/payments${qs}`, { method: 'GET' })
  return paymentListResponseSchema.parse(payload)
}

export async function getPaymentDetail(paymentId: string) {
  const payload = await requestJson<Payment>(`/v1/payments/${paymentId}`, { method: 'GET' })
  return paymentSchema.parse(payload)
}

export async function getPaymentPayouts() {
  const payload = await requestJson<PaymentPayoutsResponse>('/v1/payments/payouts', { method: 'GET' })
  return paymentPayoutsResponseSchema.parse(payload)
}

export async function getPaymentProviders() {
  const payload = await requestJson<PaymentProvidersResponse>('/v1/payments/providers', { method: 'GET' })
  return paymentProvidersResponseSchema.parse(payload)
}

export async function refundPayment(paymentId: string, input: RefundPaymentInput) {
  return requestJson(`/v1/payments/refunds/${paymentId}`, {
    method: 'POST',
    body: JSON.stringify(refundPaymentSchema.parse(input)),
  })
}
