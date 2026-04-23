import 'server-only'

import { cookies } from 'next/headers'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

function buildUrl(path: string) {
  if (!API_BASE_URL) return path
  return new URL(path, API_BASE_URL).toString()
}

export async function getDashboardOverviewServer() {
  const cookieStore = await cookies()
  const response = await fetch(buildUrl('/v1/reports/overview'), {
    cache: 'no-store',
    headers: { cookie: cookieStore.toString() },
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to load dashboard overview.')
  }

  return response.json()
}
