'use client'

import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { FORMS_QUERY_KEYS, getFormDetail, getFormResponses, listForms } from '@/features/forms/utils'
import type { FormListQuery } from '@/features/forms/schemas'

export function formsListQueryOptions(query: Partial<FormListQuery> = {}) {
  return queryOptions({
    queryKey: FORMS_QUERY_KEYS.list({
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
      search: query.search ?? '',
    }),
    queryFn: () => listForms(query),
    placeholderData: keepPreviousData,
  })
}

export function useFormsQuery(query: Partial<FormListQuery> = {}) {
  return useQuery(formsListQueryOptions(query))
}

export function formDetailQueryOptions(formId: string) {
  return queryOptions({
    queryKey: FORMS_QUERY_KEYS.detail(formId),
    queryFn: () => getFormDetail(formId),
    enabled: Boolean(formId),
  })
}

export function useFormDetailQuery(formId: string) {
  return useQuery(formDetailQueryOptions(formId))
}

export function formResponsesQueryOptions(formId: string, page = 1, pageSize = 20) {
  return queryOptions({
    queryKey: [...FORMS_QUERY_KEYS.responses(formId), page, pageSize] as const,
    queryFn: () => getFormResponses(formId, page, pageSize),
    enabled: Boolean(formId),
    placeholderData: keepPreviousData,
  })
}

export function useFormResponsesQuery(formId: string, page = 1, pageSize = 20) {
  return useQuery(formResponsesQueryOptions(formId, page, pageSize))
}
