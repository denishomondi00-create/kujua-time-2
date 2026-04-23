'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CLIENT_QUERY_KEYS, blockClient, createClient, createClientNote, exportClients, unblockClient, updateClient } from '@/features/clients/utils'
import type { ClientNoteInput, CreateClientInput, UpdateClientInput } from '@/features/clients/schemas'

function invalidateClients(queryClient: ReturnType<typeof useQueryClient>, clientId?: string) {
  queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.all })
  if (clientId) {
    queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.detail(clientId) })
  }
}

export function useCreateClientMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateClientInput) => createClient(input),
    onSuccess: () => invalidateClients(queryClient),
  })
}

export function useUpdateClientMutation(clientId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateClientInput) => updateClient(clientId, input),
    onSuccess: () => invalidateClients(queryClient, clientId),
  })
}

export function useBlockClientMutation(clientId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => blockClient(clientId),
    onSuccess: () => invalidateClients(queryClient, clientId),
  })
}

export function useUnblockClientMutation(clientId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => unblockClient(clientId),
    onSuccess: () => invalidateClients(queryClient, clientId),
  })
}

export function useCreateClientNoteMutation(clientId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: ClientNoteInput) => createClientNote(clientId, input),
    onSuccess: () => invalidateClients(queryClient, clientId),
  })
}

export function useClientExportMutation() {
  return useMutation({
    mutationFn: exportClients,
  })
}
