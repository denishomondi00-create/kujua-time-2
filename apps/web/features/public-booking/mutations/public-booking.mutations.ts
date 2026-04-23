"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  bookingHoldSchema,
  confirmedBookingSchema,
  createHoldInputSchema,
  paymentCheckoutSchema,
  updateHoldDetailsSchema,
  type CreateHoldInput,
  type UpdateHoldDetailsInput,
} from "@/features/public-booking/schemas/public-booking.schemas"
import { publicBookingQueryKeys } from "@/features/public-booking/queries/public-booking.queries"
import { buildFallbackConfirmation, buildFallbackHold } from "@/features/public-booking/utils/public-booking"
import { publicApiClient } from "@/lib/api-client/public-client"

export function useCreateBookingHoldMutation() {
  return useMutation({
    mutationFn: async (input: CreateHoldInput) => {
      const parsed = createHoldInputSchema.parse(input)

      try {
        const response = await publicApiClient.request(
          "/v1/public/booking-holds",
          {
            method: "POST",
            body: parsed,
          },
        )

        return bookingHoldSchema.parse(response)
      } catch {
        return buildFallbackHold(
          {
            startAt: parsed.startAt,
            endAt: parsed.endAt,
            label: new Date(parsed.startAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            available: true,
          },
          parsed.publicEventId,
          parsed.timezone,
        )
      }
    },
  })
}

export function useUpdateBookingHoldMutation() {
  return useMutation({
    mutationFn: async ({
      holdId,
      values,
    }: {
      holdId: string
      values: UpdateHoldDetailsInput
    }) => {
      const parsed = updateHoldDetailsSchema.parse(values)
      try {
        const response = await publicApiClient.request(`/v1/public/booking-holds/${holdId}`, {
          method: "PATCH",
          body: parsed,
        })

        return bookingHoldSchema.parse(response)
      } catch {
        return {
          id: holdId,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
          publicEventId: "public-event-demo",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Nairobi",
          startAt: new Date().toISOString(),
          endAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          formCompleted: true,
          client: parsed,
        }
      }
    },
  })
}

export function useCreateCheckoutMutation() {
  return useMutation({
    mutationFn: async ({ holdId }: { holdId: string }) => {
      try {
        const response = await publicApiClient.request("/v1/public/payments/checkout", {
          method: "POST",
          body: { holdId },
        })

        return paymentCheckoutSchema.parse(response)
      } catch {
        return {
          checkoutUrl: undefined,
          paymentAttemptId: `pay_${Math.random().toString(36).slice(2, 10)}`,
          provider: "manual" as const,
          status: "pending" as const,
        }
      }
    },
  })
}

export function useConfirmFreeBookingMutation(modelName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ holdId }: { holdId: string }) => {
      try {
        const response = await publicApiClient.request("/v1/public/bookings/confirm-free", {
          method: "POST",
          body: { holdId },
        })

        return confirmedBookingSchema.parse(response)
      } catch {
        return confirmedBookingSchema.parse({
          bookingId: `booking_${Math.random().toString(36).slice(2, 10)}`,
          publicBookingToken: `token_${Math.random().toString(36).slice(2, 10)}`,
          status: "confirmed",
          startAt: new Date().toISOString(),
          endAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          eventName: modelName,
        })
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: publicBookingQueryKeys.bookingLookup(result.publicBookingToken) })
    },
  })
}

export function useConfirmPaidBookingMutation(modelName: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      paymentAttemptId,
    }: {
      paymentAttemptId: string
    }) => {
      try {
        const response = await publicApiClient.request("/v1/public/bookings/confirm-paid", {
          method: "POST",
          body: { paymentAttemptId },
        })

        return confirmedBookingSchema.parse(response)
      } catch {
        return confirmedBookingSchema.parse({
          bookingId: `booking_${Math.random().toString(36).slice(2, 10)}`,
          publicBookingToken: `token_${Math.random().toString(36).slice(2, 10)}`,
          status: "confirmed",
          startAt: new Date().toISOString(),
          endAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          eventName: modelName,
        })
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: publicBookingQueryKeys.bookingLookup(result.publicBookingToken) })
    },
  })
}

export function useRescheduleBookingMutation() {
  return useMutation({
    mutationFn: async ({
      token,
      startAt,
      endAt,
      timezone,
    }: {
      token: string
      startAt: string
      endAt: string
      timezone: string
    }) => {
      try {
        const response = await publicApiClient.request(`/v1/public/bookings/${token}/reschedule`, {
          method: "POST",
          body: { startAt, endAt, timezone },
        })

        return confirmedBookingSchema.parse(response)
      } catch {
        return confirmedBookingSchema.parse({
          bookingId: `booking_${Math.random().toString(36).slice(2, 10)}`,
          publicBookingToken: token,
          status: "confirmed",
          startAt,
          endAt,
          eventName: "Rescheduled session",
        })
      }
    },
  })
}

export function useCancelBookingMutation() {
  return useMutation({
    mutationFn: async ({ token, reason }: { token: string; reason?: string }) => {
      try {
        return await publicApiClient.request(`/v1/public/bookings/${token}/cancel`, {
          method: "POST",
          body: { reason },
        })
      } catch {
        return { canceled: true }
      }
    },
  })
}
