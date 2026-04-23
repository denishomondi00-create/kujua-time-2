'use client'

import { queryOptions, useQuery } from '@tanstack/react-query'

import { REPORTS_QUERY_KEYS, getBookingsReport, getNoShowReport, getReportsOverview, getRevenueReport } from '@/features/reports/utils'

export function reportsOverviewQueryOptions() {
  return queryOptions({
    queryKey: REPORTS_QUERY_KEYS.overview,
    queryFn: getReportsOverview,
    staleTime: 60_000,
  })
}

export function useReportsOverviewQuery() {
  return useQuery(reportsOverviewQueryOptions())
}

export function bookingsReportQueryOptions() {
  return queryOptions({
    queryKey: REPORTS_QUERY_KEYS.bookings,
    queryFn: getBookingsReport,
    staleTime: 60_000,
  })
}

export function useBookingsReportQuery() {
  return useQuery(bookingsReportQueryOptions())
}

export function revenueReportQueryOptions() {
  return queryOptions({
    queryKey: REPORTS_QUERY_KEYS.revenue,
    queryFn: getRevenueReport,
    staleTime: 60_000,
  })
}

export function useRevenueReportQuery() {
  return useQuery(revenueReportQueryOptions())
}

export function noShowReportQueryOptions() {
  return queryOptions({
    queryKey: REPORTS_QUERY_KEYS.noShows,
    queryFn: getNoShowReport,
    staleTime: 60_000,
  })
}

export function useNoShowReportQuery() {
  return useQuery(noShowReportQueryOptions())
}
