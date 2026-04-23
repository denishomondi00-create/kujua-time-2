import 'server-only'

import { cookies } from 'next/headers'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

function buildUrl(path: string) {
  if (!API_BASE_URL) return path
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

  return response.json()
}

export function getReportsOverviewServer() {
  return read('/v1/reports/overview')
}

export function getBookingsReportServer() {
  return read('/v1/reports/bookings')
}

export function getRevenueReportServer() {
  return read('/v1/reports/revenue')
}

export function getNoShowReportServer() {
  return read('/v1/reports/no-shows')
}
