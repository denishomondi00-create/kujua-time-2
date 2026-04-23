'use client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { AUTOMATIONS_QUERY_KEYS, getAutomationDetail, listAutomationLogs, listAutomationTemplates, listAutomations } from '@/features/automations/utils'

export function automationsListQueryOptions() {
  return queryOptions({
    queryKey: AUTOMATIONS_QUERY_KEYS.list,
    queryFn: listAutomations,
  })
}

export function useAutomationsQuery() {
  return useQuery(automationsListQueryOptions())
}

export function automationDetailQueryOptions(automationId: string) {
  return queryOptions({
    queryKey: AUTOMATIONS_QUERY_KEYS.detail(automationId),
    queryFn: () => getAutomationDetail(automationId),
    enabled: Boolean(automationId),
  })
}

export function useAutomationDetailQuery(automationId: string) {
  return useQuery(automationDetailQueryOptions(automationId))
}

export function automationTemplatesQueryOptions() {
  return queryOptions({
    queryKey: AUTOMATIONS_QUERY_KEYS.templates,
    queryFn: listAutomationTemplates,
  })
}

export function useAutomationTemplatesQuery() {
  return useQuery(automationTemplatesQueryOptions())
}

export function automationLogsQueryOptions() {
  return queryOptions({
    queryKey: AUTOMATIONS_QUERY_KEYS.logs,
    queryFn: listAutomationLogs,
  })
}

export function useAutomationLogsQuery() {
  return useQuery(automationLogsQueryOptions())
}
