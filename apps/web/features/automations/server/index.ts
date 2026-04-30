import 'server-only'

import { cookies } from 'next/headers'
import { unwrapApiPayload } from '@/lib/api-client/payload'
import {
  automationListResponseSchema,
  automationLogsResponseSchema,
  automationSchema,
  automationTemplatesResponseSchema,
} from '@/features/automations/schemas'

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

export async function getAutomationsListServer() {
  return automationListResponseSchema.parse(await read('/v1/automations'))
}

export async function getAutomationDetailServer(automationId: string) {
  return automationSchema.parse(await read(`/v1/automations/${automationId}`))
}

export async function getAutomationTemplatesServer() {
  return automationTemplatesResponseSchema.parse(await read('/v1/automations/templates'))
}

export async function getAutomationLogsServer() {
  return automationLogsResponseSchema.parse(await read('/v1/automations/logs'))
}
