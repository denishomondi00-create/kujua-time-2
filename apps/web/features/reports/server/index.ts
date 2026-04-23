import 'server-only'

import { cookies } from 'next/headers'
import { unwrapApiPayload } from '@/lib/api-client/payload'
import {
  normalizeBookingsReport,
  normalizeNoShowReport,
  normalizeOverviewReport,
  normalizeRevenueReport,
} from '@/features/reports/utils'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function buildUrl(path: string) {
  return new URL(path, API_BASE_URL).toString()
}

async function read(path: string) {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl(path), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load reports.')
  }

  return unwrapApiPayload(await response.json())
}

export function getReportsOverviewServer() {
  return read('/v1/reports/overview').then(normalizeOverviewReport)
}

export function getBookingsReportServer() {
  return read('/v1/reports/bookings').then(normalizeBookingsReport)
}

export function getRevenueReportServer() {
  return read('/v1/reports/revenue').then(normalizeRevenueReport)
}

export function getNoShowReportServer() {
  return read('/v1/reports/no-shows').then(normalizeNoShowReport)
}
