'use client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { DASHBOARD_QUERY_KEYS, getDashboardOverview } from '@/features/dashboard/utils'

export function dashboardOverviewQueryOptions() {
  return queryOptions({
    queryKey: DASHBOARD_QUERY_KEYS.overview,
    queryFn: getDashboardOverview,
    staleTime: 60_000,
  })
}

export function useDashboardOverviewQuery() {
  return useQuery(dashboardOverviewQueryOptions())
}
