import 'server-only'

import { cookies } from 'next/headers'
import { unwrapApiPayload } from '@/lib/api-client/payload'

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
    throw new Error('Unable to load automation data.')
  }

  return unwrapApiPayload(await response.json())
}

export function getAutomationsListServer() {
  return read('/v1/automations')
}

export function getAutomationDetailServer(automationId: string) {
  return read(`/v1/automations/${automationId}`)
}

export function getAutomationTemplatesServer() {
  return read('/v1/automations/templates')
}

export function getAutomationLogsServer() {
  return read('/v1/automations/logs')
}
