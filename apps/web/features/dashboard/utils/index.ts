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
    throw new Error(typeof payload?.message === 'string' ? payload.message : 'Unable to load dashboard data.')
  }

  return payload as T
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
  return requestJson<DashboardOverview>('/v1/reports/overview')
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
