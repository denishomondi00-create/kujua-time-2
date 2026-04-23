'use client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { AUTH_QUERY_KEYS, getAuthSession } from '@/features/auth/utils'

export function authSessionQueryOptions() {
  return queryOptions({
    queryKey: AUTH_QUERY_KEYS.session,
    queryFn: () => getAuthSession(),
    staleTime: 60_000,
  })
}

export function useAuthSessionQuery() {
  return useQuery(authSessionQueryOptions())
}
