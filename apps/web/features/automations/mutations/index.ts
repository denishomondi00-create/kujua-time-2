'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AUTOMATIONS_QUERY_KEYS, createAutomation, testAutomation, toggleAutomation, updateAutomation } from '@/features/automations/utils'
import type { AutomationCreateInput, AutomationUpdateInput } from '@/features/automations/schemas'

function invalidateAutomations(queryClient: ReturnType<typeof useQueryClient>, automationId?: string) {
  queryClient.invalidateQueries({ queryKey: AUTOMATIONS_QUERY_KEYS.all })
  if (automationId) {
    queryClient.invalidateQueries({ queryKey: AUTOMATIONS_QUERY_KEYS.detail(automationId) })
  }
}

export function useCreateAutomationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AutomationCreateInput) => createAutomation(input),
    onSuccess: () => invalidateAutomations(queryClient),
  })
}

export function useUpdateAutomationMutation(automationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AutomationUpdateInput) => updateAutomation(automationId, input),
    onSuccess: () => invalidateAutomations(queryClient, automationId),
  })
}

export function useToggleAutomationMutation(automationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => toggleAutomation(automationId),
    onSuccess: () => invalidateAutomations(queryClient, automationId),
  })
}

export function useTestAutomationMutation(automationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => testAutomation(automationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: AUTOMATIONS_QUERY_KEYS.logs }),
  })
}
