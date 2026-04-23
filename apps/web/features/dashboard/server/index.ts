import 'server-only'

import { cookies } from 'next/headers'
import { unwrapApiPayload } from '@/lib/api-client/payload'
import { normalizeDashboardOverview } from '@/features/dashboard/utils'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function buildUrl(path: string) {
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

  return normalizeDashboardOverview(unwrapApiPayload(await response.json()))
}
