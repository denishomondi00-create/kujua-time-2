import {
  automationCreateSchema,
  automationListResponseSchema,
  automationLogsResponseSchema,
  automationSchema,
  automationTemplatesResponseSchema,
  automationUpdateSchema,
  type Automation,
  type AutomationActionType,
  type AutomationCreateInput,
  type AutomationListResponse,
  type AutomationLogsResponse,
  type AutomationTemplate,
  type AutomationTrigger,
  type AutomationUpdateInput,
} from '@/features/automations/schemas'
import { unwrapApiPayload } from '@/lib/api-client/payload'

export const AUTOMATION_TRIGGER_OPTIONS: Array<{ value: AutomationTrigger; label: string }> = [
  { value: 'booking.created', label: 'Booking created' },
  { value: 'booking.approved', label: 'Booking approved' },
  { value: 'booking.canceled', label: 'Booking canceled' },
  { value: 'booking.rescheduled', label: 'Booking rescheduled' },
  { value: 'booking.completed', label: 'Booking completed' },
  { value: 'booking.no_show', label: 'Booking no-show' },
  { value: 'payment.succeeded', label: 'Payment succeeded' },
  { value: 'payment.failed', label: 'Payment failed' },
  { value: 'payment.refunded', label: 'Payment refunded' },
  { value: 'invoice.created', label: 'Invoice created' },
  { value: 'form.submitted', label: 'Form submitted' },
  { value: 'client.created', label: 'Client created' },
]

export const AUTOMATION_ACTION_OPTIONS: Array<{ value: AutomationActionType; label: string }> = [
  { value: 'send_email', label: 'Send email' },
  { value: 'send_sms', label: 'Send SMS' },
  { value: 'send_whatsapp', label: 'Send WhatsApp' },
  { value: 'add_tag', label: 'Add tag' },
  { value: 'remove_tag', label: 'Remove tag' },
  { value: 'create_invoice', label: 'Create invoice' },
  { value: 'call_webhook', label: 'Call webhook' },
]

export const AUTOMATIONS_QUERY_KEYS = {
  all: ['automations'] as const,
  list: ['automations', 'list'] as const,
  detail: (automationId: string) => ['automations', 'detail', automationId] as const,
  templates: ['automations', 'templates'] as const,
  logs: ['automations', 'logs'] as const,
} as const

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function buildUrl(path: string) {
  return new URL(path, API_BASE_URL).toString()
}

async function requestJson<T>(path: string, init?: RequestInit) {
  const response = await fetch(buildUrl(path), {
    ...init,
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })

  const payload = unwrapApiPayload<T>(await response.json())

  if (!response.ok) {
    throw new Error(typeof payload?.message === 'string' ? payload.message : 'Automation request failed.')
  }

  return payload as T
}

export function getAutomationStatusTone(enabled: boolean) {
  return enabled
    ? { background: 'var(--kujua-success-bg)', color: 'var(--kujua-success)' }
    : { background: 'var(--kujua-gray-100)', color: 'var(--kujua-gray-700)' }
}

export async function listAutomations() {
  const payload = await requestJson<AutomationListResponse>('/v1/automations', { method: 'GET' })
  return automationListResponseSchema.parse(payload)
}

export async function getAutomationDetail(automationId: string) {
  const payload = await requestJson<Automation>(`/v1/automations/${automationId}`, { method: 'GET' })
  return automationSchema.parse(payload)
}

export async function listAutomationTemplates() {
  const payload = await requestJson<{ items: AutomationTemplate[]; total: number }>('/v1/automations/templates', { method: 'GET' })
  return automationTemplatesResponseSchema.parse(payload)
}

export async function listAutomationLogs() {
  const payload = await requestJson<AutomationLogsResponse>('/v1/automations/logs', { method: 'GET' })
  return automationLogsResponseSchema.parse(payload)
}

export async function createAutomation(input: AutomationCreateInput) {
  return requestJson<Automation>('/v1/automations', {
    method: 'POST',
    body: JSON.stringify(automationCreateSchema.parse(input)),
  })
}

export async function updateAutomation(automationId: string, input: AutomationUpdateInput) {
  return requestJson<Automation>(`/v1/automations/${automationId}`, {
    method: 'PATCH',
    body: JSON.stringify(automationUpdateSchema.parse(input)),
  })
}

export async function toggleAutomation(automationId: string) {
  return requestJson<Automation>(`/v1/automations/${automationId}/toggle`, {
    method: 'POST',
  })
}

export async function testAutomation(automationId: string) {
  return requestJson<{ success: true; message: string }>(`/v1/automations/test`, {
    method: 'POST',
    body: JSON.stringify({ automationId }),
  })
}
