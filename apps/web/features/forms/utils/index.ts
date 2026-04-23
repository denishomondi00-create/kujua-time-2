import {
  formCreateSchema,
  formListQuerySchema,
  formListResponseSchema,
  formResponsesListSchema,
  formSchema,
  formUpdateSchema,
  type FormCreateInput,
  type FormListQuery,
  type FormListResponse,
  type FormResponsesList,
  type FormUpdateInput,
  type FormFieldType,
  type IntakeForm,
} from '@/features/forms/schemas'
import { unwrapApiPayload } from '@/lib/api-client/payload'

export const FORM_FIELD_TYPE_OPTIONS: Array<{ value: FormFieldType; label: string }> = [
  { value: 'short_text', label: 'Short text' },
  { value: 'long_text', label: 'Long text' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Select' },
  { value: 'multi_select', label: 'Multi-select' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
]

export const FORMS_QUERY_KEYS = {
  all: ['forms'] as const,
  list: (query: FormListQuery) => ['forms', 'list', query] as const,
  detail: (formId: string) => ['forms', 'detail', formId] as const,
  responses: (formId: string) => ['forms', 'responses', formId] as const,
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
    throw new Error(typeof payload?.message === 'string' ? payload.message : 'Form request failed.')
  }

  return payload as T
}

export async function listForms(query: Partial<FormListQuery> = {}) {
  const parsed = formListQuerySchema.partial().parse(query)
  const qs = buildQueryString({
    page: parsed.page,
    pageSize: parsed.pageSize,
    search: parsed.search,
  })

  const payload = await requestJson<FormListResponse>(`/v1/forms${qs}`, { method: 'GET' })
  return formListResponseSchema.parse(payload)
}

export async function getFormDetail(formId: string) {
  const payload = await requestJson<IntakeForm>(`/v1/forms/${formId}`, { method: 'GET' })
  return formSchema.parse(payload)
}

export async function createForm(input: FormCreateInput) {
  return requestJson<IntakeForm>('/v1/forms', {
    method: 'POST',
    body: JSON.stringify(formCreateSchema.parse(input)),
  })
}

export async function updateForm(formId: string, input: FormUpdateInput) {
  return requestJson<IntakeForm>(`/v1/forms/${formId}`, {
    method: 'PATCH',
    body: JSON.stringify(formUpdateSchema.parse(input)),
  })
}

export async function deleteForm(formId: string) {
  return requestJson<void>(`/v1/forms/${formId}`, { method: 'DELETE' })
}

export async function getFormResponses(formId: string, page = 1, pageSize = 20) {
  const payload = await requestJson<FormResponsesList>(`/v1/form-responses?formId=${encodeURIComponent(formId)}&page=${page}&pageSize=${pageSize}`, { method: 'GET' })
  return formResponsesListSchema.parse(payload)
}
