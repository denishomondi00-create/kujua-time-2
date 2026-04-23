'use client'

import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'

import { listBookings, getBookingDetail, BOOKING_QUERY_KEYS } from '@/features/bookings/utils'
import type { BookingQuery } from '@/features/bookings/schemas'

export function bookingsListQueryOptions(query: Partial<BookingQuery> = {}) {
  return queryOptions({
    queryKey: BOOKING_QUERY_KEYS.list({
      page: query.page ?? 1,
      pageSize: query.pageSize ?? 20,
      search: query.search ?? '',
      status: query.status,
    }),
    queryFn: () => listBookings(query),
    placeholderData: keepPreviousData,
  })
}

export function useBookingsQuery(query: Partial<BookingQuery> = {}) {
  return useQuery(bookingsListQueryOptions(query))
}

export function bookingDetailQueryOptions(bookingId: string) {
  return queryOptions({
    queryKey: BOOKING_QUERY_KEYS.detail(bookingId),
    queryFn: () => getBookingDetail(bookingId),
    enabled: Boolean(bookingId),
  })
}

export function useBookingDetailQuery(bookingId: string) {
  return useQuery(bookingDetailQueryOptions(bookingId))
}
