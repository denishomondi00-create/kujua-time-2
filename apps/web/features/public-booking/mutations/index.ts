'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { publicBookingQueryKeys } from '@/features/public-booking/queries/public-booking.queries'
import {
  bookingHoldSchema,
  confirmedBookingSchema,
  paymentCheckoutSchema,
  publicBookingLookupSchema,
  updateHoldDetailsSchema,
  createHoldInputSchema,
  type BookingHold,
  type ConfirmedBooking,
  type CreateHoldInput,
  type UpdateHoldDetailsInput,
  type PaymentCheckout,
} from '@/features/public-booking/schemas/public-booking.schemas'
import { publicApiClient } from '@/lib/api-client/public-client'

async function resolveConfirmedBooking(token: string): Promise<ConfirmedBooking> {
  const response = await publicApiClient.request(`/v1/public/bookings/${token}`)
  const lookup = publicBookingLookupSchema.parse(response)
  return confirmedBookingSchema.parse(lookup.booking)
}

export function useCreateBookingHoldMutation() {
  return useMutation({
    mutationFn: async (input: CreateHoldInput): Promise<BookingHold> => {
      const response = await publicApiClient.request('/v1/public/booking-holds', {
        method: 'POST',
        body: createHoldInputSchema.parse(input),
      })
      return bookingHoldSchema.parse(response)
    },
  })
}

export function useUpdateBookingHoldMutation(holdId: string) {
  return useMutation({
    mutationFn: async (input: UpdateHoldDetailsInput): Promise<BookingHold> => {
      const response = await publicApiClient.request(`/v1/public/booking-holds/${holdId}`, {
        method: 'PATCH',
        body: updateHoldDetailsSchema.parse(input),
      })
      return bookingHoldSchema.parse(response)
    },
  })
}

export function useCreatePaymentCheckoutMutation() {
  return useMutation({
    mutationFn: async ({ holdId }: { holdId: string }): Promise<PaymentCheckout> => {
      const response = await publicApiClient.request('/v1/public/payments/checkout', {
        method: 'POST',
        body: { holdId },
      })
      return paymentCheckoutSchema.parse(response)
    },
  })
}

export function useCreateCheckoutMutation() {
  return useCreatePaymentCheckoutMutation()
}

export function useConfirmFreeBookingMutation() {
  return useMutation({
    mutationFn: async ({ holdId }: { holdId: string }) => {
      const response = await publicApiClient.request<{ publicBookingToken?: string; token?: string }>('/v1/public/bookings/confirm-free', {
        method: 'POST',
        body: { holdId },
      })
      const token = response.publicBookingToken ?? response.token
      if (!token) throw new Error('Missing public booking token from free confirmation response.')
      return resolveConfirmedBooking(token)
    },
  })
}

export function useConfirmPaidBookingMutation() {
  return useMutation({
    mutationFn: async ({ paymentAttemptId }: { paymentAttemptId: string }) => {
      const response = await publicApiClient.request<{ publicBookingToken?: string; token?: string }>('/v1/public/bookings/confirm-paid', {
        method: 'POST',
        body: { paymentAttemptId },
      })
      const token = response.publicBookingToken ?? response.token
      if (!token) throw new Error('Missing public booking token from paid confirmation response.')
      return resolveConfirmedBooking(token)
    },
  })
}

export function useReschedulePublicBookingMutation(token: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ startAt, endAt, timezone }: { startAt: string; endAt: string; timezone: string }) => {
      await publicApiClient.request(`/v1/public/bookings/${token}/reschedule`, {
        method: 'POST',
        body: { startAt, endAt, timezone },
      })
      return resolveConfirmedBooking(token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: publicBookingQueryKeys.bookingLookup(token) }),
  })
}

export function useRescheduleBookingMutation(token: string) {
  return useReschedulePublicBookingMutation(token)
}

export function useCancelPublicBookingMutation(token: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ reason }: { reason?: string } = {}) => {
      return publicApiClient.request(`/v1/public/bookings/${token}/cancel`, {
        method: 'POST',
        body: { reason },
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: publicBookingQueryKeys.bookingLookup(token) }),
  })
}

export function useCancelBookingMutation(token: string) {
  return useCancelPublicBookingMutation(token)
}
