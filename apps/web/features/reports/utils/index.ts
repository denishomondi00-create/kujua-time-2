import { unwrapApiPayload } from '@/lib/api-client/payload'

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

type UnknownRecord = Record<string, unknown>

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function buildUrl(path: string) {
  return new URL(path, API_BASE_URL).toString()
}

async function requestJson<T>(path: string, init?: RequestInit) {
  const response = await fetch(buildUrl(path), {
    ...init,
    credentials: 'include',
  })

  const payload = unwrapApiPayload<T>(await response.json())

  if (!response.ok) {
    const message = isRecord(payload) && typeof payload.message === 'string' ? payload.message : 'Report request failed.'
    throw new Error(message)
  }

  return payload as T
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null
}

function asRecord(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {}
}

function asPayloadRecord(value: unknown): UnknownRecord {
  const record = asRecord(value)
  return isRecord(record.payload) ? record.payload : record
}

function asNumber(value: unknown, fallback = 0) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }

  return fallback
}

function asString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

function normalizeSeries(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .map((point) => {
      const record = asRecord(point)
      const label = asString(record.label ?? record.date ?? record.name, '')
      if (!label) return null

      return {
        label,
        value: asNumber(record.value ?? record.total ?? record.count, 0),
      }
    })
    .filter((point): point is TimeSeriesPoint => point !== null)
}

function normalizeBreakdown(value: unknown) {
  if (!Array.isArray(value)) return []

  return value
    .flatMap((row) => {
      const record = asRecord(row)
      const label = asString(record.label ?? record.name ?? record.status ?? record.source ?? record.eventType, '')
      if (!label) return []

      return [{
        label,
        value: asNumber(record.value ?? record.total ?? record.count, 0),
        amount:
          record.amount === undefined && record.revenue === undefined && record.totalRevenue === undefined
            ? undefined
            : asNumber(record.amount ?? record.revenue ?? record.totalRevenue, 0),
      }]
    })
}

export function normalizeOverviewReport(raw: unknown): OverviewReport {
  const source = asRecord(raw)
  const payload = asPayloadRecord(raw)

  return {
    totalBookings: asNumber(source.totalBookings ?? payload.totalBookings ?? payload.bookings, 0),
    revenue: asNumber(source.revenue ?? payload.revenue ?? payload.totalRevenue, 0),
    noShowRate: asNumber(source.noShowRate ?? payload.noShowRate, 0),
    conversionRate: asNumber(source.conversionRate ?? payload.conversionRate, 0),
    currency: asString(source.currency ?? payload.currency, 'USD'),
  }
}

export function normalizeBookingsReport(raw: unknown): BookingsReport {
  const source = asRecord(raw)
  const payload = asPayloadRecord(raw)

  return {
    series: normalizeSeries(source.series ?? payload.series ?? payload.timeline ?? payload.points),
    byStatus: normalizeBreakdown(source.byStatus ?? payload.byStatus ?? payload.statusBreakdown ?? payload.statuses),
  }
}

export function normalizeRevenueReport(raw: unknown): RevenueReport {
  const source = asRecord(raw)
  const payload = asPayloadRecord(raw)

  return {
    series: normalizeSeries(source.series ?? payload.series ?? payload.timeline ?? payload.points),
    bySource: normalizeBreakdown(source.bySource ?? payload.bySource ?? payload.sourceBreakdown ?? payload.sources),
    currency: asString(source.currency ?? payload.currency, 'USD'),
  }
}

export function normalizeNoShowReport(raw: unknown): NoShowReport {
  const source = asRecord(raw)
  const payload = asPayloadRecord(raw)

  return {
    series: normalizeSeries(source.series ?? payload.series ?? payload.timeline ?? payload.points),
    byEventType: normalizeBreakdown(source.byEventType ?? payload.byEventType ?? payload.eventTypeBreakdown ?? payload.eventTypes),
  }
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

export function formatPercent(value?: number | null) {
  if (value === null || value === undefined) return '—'
  return `${value.toFixed(1)}%`
}

export async function getReportsOverview() {
  return normalizeOverviewReport(await requestJson('/v1/reports/overview'))
}

export async function getBookingsReport() {
  return normalizeBookingsReport(await requestJson('/v1/reports/bookings'))
}

export async function getRevenueReport() {
  return normalizeRevenueReport(await requestJson('/v1/reports/revenue'))
}

export async function getNoShowReport() {
  return normalizeNoShowReport(await requestJson('/v1/reports/no-shows'))
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
