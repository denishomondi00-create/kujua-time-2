'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { FORMS_QUERY_KEYS, createForm, deleteForm, updateForm } from '@/features/forms/utils'
import type { FormCreateInput, FormUpdateInput } from '@/features/forms/schemas'

function invalidateForms(queryClient: ReturnType<typeof useQueryClient>, formId?: string) {
  queryClient.invalidateQueries({ queryKey: FORMS_QUERY_KEYS.all })
  if (formId) {
    queryClient.invalidateQueries({ queryKey: FORMS_QUERY_KEYS.detail(formId) })
    queryClient.invalidateQueries({ queryKey: FORMS_QUERY_KEYS.responses(formId) })
  }
}

export function useCreateFormMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: FormCreateInput) => createForm(input),
    onSuccess: () => invalidateForms(queryClient),
  })
}

export function useUpdateFormMutation(formId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: FormUpdateInput) => updateForm(formId, input),
    onSuccess: () => invalidateForms(queryClient, formId),
  })
}

export function useDeleteFormMutation(formId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteForm(formId),
    onSuccess: () => invalidateForms(queryClient),
  })
}
