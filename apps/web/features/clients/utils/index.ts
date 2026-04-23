import {
  clientDetailSchema,
  clientListQuerySchema,
  clientListResponseSchema,
  clientNoteSchema,
  createClientSchema,
  updateClientSchema,
  type Client,
  type ClientDetail,
  type ClientListQuery,
  type ClientListResponse,
  type ClientNoteInput,
  type ClientStage,
  type CreateClientInput,
  type UpdateClientInput,
} from '@/features/clients/schemas'
import { unwrapApiPayload } from '@/lib/api-client/payload'

export const CLIENT_STAGE_OPTIONS: Array<{ value: ClientStage; label: string }> = [
  { value: 'lead', label: 'Lead' },
  { value: 'client', label: 'Client' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'vip', label: 'VIP' },
]

export const CLIENT_QUERY_KEYS = {
  all: ['clients'] as const,
  list: (query: ClientListQuery) => ['clients', 'list', query] as const,
  detail: (clientId: string) => ['clients', 'detail', clientId] as const,
} as const

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function buildUrl(path: string) {
  return new URL(path, API_BASE_URL).toString()
}

function buildQueryString(query: Record<string, string | number | undefined>) {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === '') continue
    params.set(key, String(value))
  }

  const serialized = params.toString()
  return serialized ? `?${serialized}` : ''
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
    throw new Error(typeof payload?.message === 'string' ? payload.message : 'Client request failed.')
  }

  return payload as T
}

export function formatClientRevenue(totalRevenue: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(totalRevenue)
}

export function getClientStageTone(stage: ClientStage) {
  switch (stage) {
    case 'lead':
      return { background: 'var(--kujua-info-bg)', color: 'var(--kujua-info)' }
    case 'client':
      return { background: 'var(--kujua-success-bg)', color: 'var(--kujua-success)' }
    case 'inactive':
      return { background: 'var(--kujua-gray-100)', color: 'var(--kujua-gray-700)' }
    case 'vip':
      return { background: 'var(--kujua-ai-bg)', color: 'var(--kujua-ai-accent)' }
  }
}

export async function listClients(query: Partial<ClientListQuery> = {}) {
  const parsed = clientListQuerySchema.partial().parse(query)
  const qs = buildQueryString({
    page: parsed.page,
    pageSize: parsed.pageSize,
    search: parsed.search,
    stage: parsed.stage,
  })

  const payload = await requestJson<ClientListResponse>(`/v1/clients${qs}`, { method: 'GET' })
  return clientListResponseSchema.parse(payload)
}

export async function getClientDetail(clientId: string) {
  const payload = await requestJson<ClientDetail>(`/v1/clients/${clientId}`, { method: 'GET' })
  return clientDetailSchema.parse(payload)
}

export async function createClient(input: CreateClientInput) {
  return requestJson<Client>('/v1/clients', {
    method: 'POST',
    body: JSON.stringify(createClientSchema.parse(input)),
  })
}

export async function updateClient(clientId: string, input: UpdateClientInput) {
  return requestJson<Client>(`/v1/clients/${clientId}`, {
    method: 'PATCH',
    body: JSON.stringify(updateClientSchema.parse(input)),
  })
}

export async function blockClient(clientId: string) {
  return requestJson(`/v1/clients/${clientId}/block`, { method: 'POST' })
}

export async function unblockClient(clientId: string) {
  return requestJson(`/v1/clients/${clientId}/unblock`, { method: 'POST' })
}

export async function createClientNote(clientId: string, input: ClientNoteInput) {
  return requestJson(`/v1/clients/${clientId}/notes`, {
    method: 'POST',
    body: JSON.stringify(clientNoteSchema.parse(input)),
  })
}

export async function exportClients() {
  return requestJson<{ url: string }>('/v1/clients/export', { method: 'GET' })
}
