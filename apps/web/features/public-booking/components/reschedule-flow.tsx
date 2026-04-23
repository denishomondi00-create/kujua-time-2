"use client"

import { useMemo, useState } from "react"

import { AlertBanner } from "@/components/feedback/alert-banner"
import { LoadingState } from "@/components/feedback/loading-state"
import { SubmitButton } from "@/components/forms/submit-button"
import { useRescheduleBookingMutation } from "@/features/public-booking/mutations"
import { usePublicBookingLookupQuery } from "@/features/public-booking/queries"
import type { ConfirmedBooking, PublicBookingPageModel } from "@/features/public-booking/schemas/public-booking.schemas"

export function RescheduleFlow({
  model,
  token,
  onCompleted,
}: {
  model: PublicBookingPageModel
  token: string
  onCompleted: (value: ConfirmedBooking) => void
}) {
  const lookup = usePublicBookingLookupQuery(token)
  const reschedule = useRescheduleBookingMutation(token)
  const [selectedStartAt, setSelectedStartAt] = useState<string | null>(null)

  const selectedSlot = useMemo(
    () => lookup.data?.slotOptions.find((slot) => slot.startAt === selectedStartAt) ?? null,
    [lookup.data?.slotOptions, selectedStartAt],
  )

  if (lookup.isLoading) {
    return <LoadingState label="Loading booking details..." />
  }

  if (!lookup.data) {
    return (
      <AlertBanner variant="warning" title="Reschedule link unavailable">
        The booking token could not be resolved.
      </AlertBanner>
    )
  }

  async function handleReschedule() {
    if (!selectedSlot) return
    const booking = await reschedule.mutateAsync({
      startAt: selectedSlot.startAt,
      endAt: selectedSlot.endAt,
      timezone: model.workspace.timezone,
    })
    onCompleted(booking)
  }

  return (
    <div className="space-y-4">
      <AlertBanner title="Reschedule flow">
        This flow is client-only after the server page shell resolves token mode from the URL.
      </AlertBanner>

      <div className="grid gap-3 md:grid-cols-2">
        {lookup.data.slotOptions.map((slot) => (
          <button
            key={slot.startAt}
            type="button"
            className="rounded-2xl border px-4 py-3 text-left"
            style={{
              borderColor: selectedStartAt === slot.startAt ? "var(--kt-accent)" : "var(--kt-border)",
            }}
            onClick={() => setSelectedStartAt(slot.startAt)}
          >
            <div className="font-medium">{slot.label}</div>
            <div className="mt-1 text-xs text-[var(--kt-muted-foreground)]">Available replacement slot</div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <SubmitButton
          type="button"
          isLoading={reschedule.isPending}
          disabled={!selectedSlot}
          onClick={handleReschedule}
        >
          Confirm reschedule
        </SubmitButton>
      </div>
    </div>
  )
}
