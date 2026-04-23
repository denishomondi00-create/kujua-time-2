'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EVENT_TYPE_QUERY_KEYS, archiveEventType, createEventType, deleteEventType, duplicateEventType, updateEventType } from '@/features/event-types/utils'
import type { EventTypeCreateInput, EventTypeUpdateInput } from '@/features/event-types/schemas'

function invalidateEventTypes(queryClient: ReturnType<typeof useQueryClient>, eventTypeId?: string) {
  queryClient.invalidateQueries({ queryKey: EVENT_TYPE_QUERY_KEYS.all })
  if (eventTypeId) {
    queryClient.invalidateQueries({ queryKey: EVENT_TYPE_QUERY_KEYS.detail(eventTypeId) })
    queryClient.invalidateQueries({ queryKey: EVENT_TYPE_QUERY_KEYS.preview(eventTypeId) })
  }
}

export function useCreateEventTypeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: EventTypeCreateInput) => createEventType(input),
    onSuccess: () => invalidateEventTypes(queryClient),
  })
}

export function useUpdateEventTypeMutation(eventTypeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: EventTypeUpdateInput) => updateEventType(eventTypeId, input),
    onSuccess: () => invalidateEventTypes(queryClient, eventTypeId),
  })
}

export function useDuplicateEventTypeMutation(eventTypeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => duplicateEventType(eventTypeId),
    onSuccess: () => invalidateEventTypes(queryClient),
  })
}

export function useArchiveEventTypeMutation(eventTypeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => archiveEventType(eventTypeId),
    onSuccess: () => invalidateEventTypes(queryClient, eventTypeId),
  })
}

export function useDeleteEventTypeMutation(eventTypeId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteEventType(eventTypeId),
    onSuccess: () => invalidateEventTypes(queryClient),
  })
}
