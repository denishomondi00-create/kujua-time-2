"use client"

import { queryOptions, useQuery } from "@tanstack/react-query"

import {
  publicBookingLookupSchema,
  publicSlotSchema,
  type PublicBookingLookup,
  type PublicSlot,
} from "@/features/public-booking/schemas/public-booking.schemas"
import { publicApiClient } from "@/lib/api-client/public-client"

export const publicBookingQueryKeys = {
  slots: (publicEventId: string, date: string, timezone: string) =>
    ["public-booking", "slots", publicEventId, date, timezone] as const,
  bookingLookup: (token: string) => ["public-booking", "lookup", token] as const,
  paymentStatus: (paymentAttemptId: string) =>
    ["public-booking", "payment-status", paymentAttemptId] as const,
}

export function publicSlotsQueryOptions({
  publicEventId,
  date,
  timezone,
}: {
  publicEventId: string
  date: string
  timezone: string
}) {
  return queryOptions({
    queryKey: publicBookingQueryKeys.slots(publicEventId, date, timezone),
    queryFn: async () => {
      const response = await publicApiClient.request<PublicSlot[]>(
        `/v1/public/event-types/${publicEventId}/slots?date=${encodeURIComponent(date)}&tz=${encodeURIComponent(timezone)}`,
      )

      return response.map((slot) => publicSlotSchema.parse(slot))
    },
    placeholderData: (previous) => previous,
  })
}

export function usePublicSlotsQuery(input: {
  publicEventId: string
  date: string
  timezone: string
}) {
  return useQuery(publicSlotsQueryOptions(input))
}

export function bookingLookupQueryOptions(token: string) {
  return queryOptions({
    queryKey: publicBookingQueryKeys.bookingLookup(token),
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await publicApiClient.request<PublicBookingLookup>(
        `/v1/public/bookings/${token}`,
      )

      return publicBookingLookupSchema.parse(response)
    },
  })
}

export function usePublicBookingLookupQuery(token?: string) {
  return useQuery({
    ...bookingLookupQueryOptions(token ?? ""),
    enabled: Boolean(token),
  })
}

export function usePublicPaymentStatusQuery(paymentAttemptId?: string) {
  return useQuery({
    queryKey: paymentAttemptId
      ? publicBookingQueryKeys.paymentStatus(paymentAttemptId)
      : ["public-booking", "payment-status", "idle"],
    enabled: Boolean(paymentAttemptId),
    queryFn: async () => {
      return publicApiClient.request<{ status: "pending" | "processing" | "succeeded"; booking?: { publicBookingToken: string } }>(
        `/v1/public/payments/status/${paymentAttemptId}`,
      )
    },
    refetchInterval: (query) =>
      query.state.data?.status === "succeeded" ? false : 3_000,
  })
}
