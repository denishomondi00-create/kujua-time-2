'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { BOOKING_QUERY_KEYS, approveBooking, cancelBooking, completeBooking, markBookingNoShow, rescheduleBooking } from '@/features/bookings/utils'
import type { BookingActionInput, BookingRescheduleInput } from '@/features/bookings/schemas'

function invalidateBookings(queryClient: ReturnType<typeof useQueryClient>, bookingId?: string) {
  queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.all })
  if (bookingId) {
    queryClient.invalidateQueries({ queryKey: BOOKING_QUERY_KEYS.detail(bookingId) })
  }
}

export function useCancelBookingMutation(bookingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: BookingActionInput) => cancelBooking(bookingId, input),
    onSuccess: () => invalidateBookings(queryClient, bookingId),
  })
}

export function useApproveBookingMutation(bookingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: BookingActionInput) => approveBooking(bookingId, input),
    onSuccess: () => invalidateBookings(queryClient, bookingId),
  })
}

export function useCompleteBookingMutation(bookingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: BookingActionInput) => completeBooking(bookingId, input),
    onSuccess: () => invalidateBookings(queryClient, bookingId),
  })
}

export function useNoShowBookingMutation(bookingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: BookingActionInput) => markBookingNoShow(bookingId, input),
    onSuccess: () => invalidateBookings(queryClient, bookingId),
  })
}

export function useRescheduleBookingMutation(bookingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: BookingRescheduleInput) => rescheduleBooking(bookingId, input),
    onSuccess: () => invalidateBookings(queryClient, bookingId),
  })
}
