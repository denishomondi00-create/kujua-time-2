import { unwrapApiPayload } from '@/lib/api-client/payload'

export type DashboardMetric = {
  label: string
  value: number
  changePercentage?: number | null
  helper?: string
}

export type QuickAction = {
  label: string
  description: string
  href: string
}

export type DashboardOverview = {
  metrics: {
    todaysBookings: DashboardMetric
    upcomingBookings: DashboardMetric
    unpaidBookings: DashboardMetric
    recentClients: DashboardMetric
    conversionSummary?: DashboardMetric | null
    noShowRate?: DashboardMetric | null
  }
  quickActions: QuickAction[]
  guidance: string[]
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
    const message = isRecord(payload) && typeof payload.message === 'string' ? payload.message : 'Unable to load dashboard data.'
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

function asStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback

  const items = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
  return items.length > 0 ? items : fallback
}

function normalizeQuickActions(value: unknown) {
  if (!Array.isArray(value)) return DEFAULT_QUICK_ACTIONS

  const actions = value
    .map((item) => {
      const record = asRecord(item)
      const label = asString(record.label, '')
      const description = asString(record.description, '')
      const href = asString(record.href, '')

      if (!label || !description || !href) return null

      return { label, description, href }
    })
    .filter((item): item is QuickAction => item !== null)

  return actions.length > 0 ? actions : DEFAULT_QUICK_ACTIONS
}

function normalizeMetric(
  value: unknown,
  fallback: {
    label: string
    value?: number
    changePercentage?: number | null
    helper?: string
  },
): DashboardMetric {
  const record = asRecord(value)

  return {
    label: asString(record.label, fallback.label),
    value: asNumber(record.value, fallback.value ?? 0),
    changePercentage:
      record.changePercentage === null
        ? null
        : record.changePercentage === undefined
          ? fallback.changePercentage
          : asNumber(record.changePercentage, fallback.changePercentage ?? 0),
    helper: asString(record.helper, fallback.helper ?? ''),
  }
}

export function normalizeDashboardOverview(raw: unknown): DashboardOverview {
  const source = asRecord(raw)
  const payload = asRecord(source.payload)
  const metrics = asRecord(source.metrics)
  const payloadMetrics = asRecord(payload.metrics)

  return {
    metrics: {
      todaysBookings: normalizeMetric(metrics.todaysBookings ?? payloadMetrics.todaysBookings, {
        label: source.totalBookings !== undefined || payload.totalBookings !== undefined ? 'Total bookings' : "Today's bookings",
        value: asNumber(source.totalBookings ?? payload.totalBookings, 0),
        helper:
          source.totalBookings !== undefined || payload.totalBookings !== undefined
            ? 'Latest report snapshot total.'
            : 'Bookings scheduled for today.',
      }),
      upcomingBookings: normalizeMetric(metrics.upcomingBookings ?? payloadMetrics.upcomingBookings, {
        label: 'Upcoming bookings',
        value: asNumber(source.upcomingBookings ?? payload.upcomingBookings, 0),
        helper: 'Upcoming appointments on the calendar.',
      }),
      unpaidBookings: normalizeMetric(metrics.unpaidBookings ?? payloadMetrics.unpaidBookings, {
        label: 'Unpaid bookings',
        value: asNumber(source.unpaidBookings ?? payload.unpaidBookings, 0),
        helper: 'Bookings that still need payment follow-up.',
      }),
      recentClients: normalizeMetric(metrics.recentClients ?? payloadMetrics.recentClients, {
        label: 'Recent clients',
        value: asNumber(source.recentClients ?? payload.recentClients, 0),
        helper: 'Clients added or active in the latest period.',
      }),
      conversionSummary: normalizeMetric(metrics.conversionSummary ?? payloadMetrics.conversionSummary, {
        label: 'Conversion rate',
        value: asNumber(source.conversionRate ?? payload.conversionRate, 0),
        helper: 'Share of booking starts that turned into completed bookings.',
      }),
      noShowRate: normalizeMetric(metrics.noShowRate ?? payloadMetrics.noShowRate, {
        label: 'No-show rate',
        value: asNumber(source.noShowRate ?? payload.noShowRate, 0),
        helper: 'Percentage of bookings marked as no-shows.',
      }),
    },
    quickActions: normalizeQuickActions(source.quickActions ?? payload.quickActions),
    guidance: asStringArray(source.guidance ?? payload.guidance, DEFAULT_GUIDANCE),
  }
}

export function formatMetricValue(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatPercentage(value?: number | null) {
  if (value === null || value === undefined) return '—'
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export async function getDashboardOverview() {
  return normalizeDashboardOverview(await requestJson('/v1/reports/overview'))
}

export const DASHBOARD_QUERY_KEYS = {
  overview: ['dashboard', 'overview'] as const,
} as const

export const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { label: 'Create event type', description: 'Publish a new offer and start sharing it.', href: '/app/event-types/new' },
  { label: 'Copy booking link', description: 'Open your event library and share a live link.', href: '/app/event-types' },
  { label: 'Create invoice', description: 'Issue a one-off invoice outside the booking flow.', href: '/app/invoices/new' },
  { label: 'Add client note', description: 'Capture context and follow-up items for a client.', href: '/app/clients' },
  { label: 'Block client', description: 'Restrict abuse or invalid repeat bookings.', href: '/app/clients' },
]

export const DEFAULT_GUIDANCE = [
  'Connect Google Calendar before publishing your first event type.',
  'Require full payment or a deposit for higher-value appointments.',
  'Attach intake forms to event types that need context before the meeting.',
  'Enable reminders before sharing public booking links.',
]
