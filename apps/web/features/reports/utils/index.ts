export type OverviewReport = {
  totalBookings: number
  revenue: number
  noShowRate: number
  conversionRate: number
  currency: string
}

export type TimeSeriesPoint = {
  label: string
  value: number
}

export type BreakdownRow = {
  label: string
  value: number
  amount?: number
}

export type BookingsReport = {
  series: TimeSeriesPoint[]
  byStatus: BreakdownRow[]
}

export type RevenueReport = {
  series: TimeSeriesPoint[]
  bySource: BreakdownRow[]
  currency: string
}

export type NoShowReport = {
  series: TimeSeriesPoint[]
  byEventType: BreakdownRow[]
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

function buildUrl(path: string) {
  if (!API_BASE_URL) return path
  return new URL(path, API_BASE_URL).toString()
}

async function requestJson<T>(path: string, init?: RequestInit) {
  const response = await fetch(buildUrl(path), {
    ...init,
    credentials: 'include',
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(typeof payload?.message === 'string' ? payload.message : 'Report request failed.')
  }

  return payload as T
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`
}

export async function getReportsOverview() {
  return requestJson<OverviewReport>('/v1/reports/overview')
}

export async function getBookingsReport() {
  return requestJson<BookingsReport>('/v1/reports/bookings')
}

export async function getRevenueReport() {
  return requestJson<RevenueReport>('/v1/reports/revenue')
}

export async function getNoShowReport() {
  return requestJson<NoShowReport>('/v1/reports/no-shows')
}

export async function exportReports() {
  return requestJson<{ url: string }>('/v1/reports/export', { method: 'POST' })
}

export const REPORTS_QUERY_KEYS = {
  overview: ['reports', 'overview'] as const,
  bookings: ['reports', 'bookings'] as const,
  revenue: ['reports', 'revenue'] as const,
  noShows: ['reports', 'no-shows'] as const,
} as const
