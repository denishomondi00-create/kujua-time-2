"use client"

import { useMemo } from "react"

import { LoadingState } from "@/components/feedback/loading-state"
import { AlertBanner } from "@/components/feedback/alert-banner"
import { useCreateBookingHoldMutation } from "@/features/public-booking/mutations"
import { usePublicSlotsQuery } from "@/features/public-booking/queries"
import type { BookingHold, PublicSlot } from "@/features/public-booking/schemas/public-booking.schemas"
import { formatDateLabel } from "@/lib/utils/dates"

export function SlotPicker({
  publicEventId,
  date,
  timezone,
  initialSlots,
  selectedSlot,
  onDateChange,
  onSelectedSlotChange,
  onHoldCreated,
}: {
  publicEventId: string
  date: string
  timezone: string
  initialSlots: PublicSlot[]
  selectedSlot: PublicSlot | null
  onDateChange: (value: string) => void
  onSelectedSlotChange: (slot: PublicSlot) => void
  onHoldCreated: (hold: BookingHold) => void
}) {
  const slotsQuery = usePublicSlotsQuery({
    publicEventId,
    date,
    timezone,
  })
  const createHold = useCreateBookingHoldMutation()

  const slots = useMemo(
    () => (slotsQuery.data?.length ? slotsQuery.data : initialSlots),
    [initialSlots, slotsQuery.data],
  )

  async function continueToDetails() {
    if (!selectedSlot) return

    const hold = await createHold.mutateAsync({
      publicEventId,
      timezone,
      startAt: selectedSlot.startAt,
      endAt: selectedSlot.endAt,
    })

    onHoldCreated(hold)
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block space-y-2">
          <span className="text-sm font-semibold">Date</span>
          <input
            type="date"
            className="kt-input"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </label>
        <div className="text-sm text-[var(--kt-muted-foreground)]">
          Showing availability for <span className="font-semibold text-[var(--kt-foreground)]">{formatDateLabel(date)}</span>
        </div>
      </div>

      {slotsQuery.isFetching ? <LoadingState label="Refreshing availability…" /> : null}
      {slotsQuery.isError ? (
        <AlertBanner variant="warning" title="Using fallback slot data">
          The page can still continue because the public booking shell already rendered a first availability snapshot.
        </AlertBanner>
      ) : null}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {slots.map((slot) => (
          <button
            key={slot.startAt}
            type="button"
            disabled={!slot.available}
            onClick={() => onSelectedSlotChange(slot)}
            className="rounded-2xl border px-4 py-3 text-left text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              borderColor:
                selectedSlot?.startAt === slot.startAt ? "var(--kt-accent)" : "var(--kt-border)",
              background:
                selectedSlot?.startAt === slot.startAt
                  ? "color-mix(in srgb, var(--kt-accent) 8%, white)"
                  : "var(--kt-panel)",
            }}
          >
            <div>{slot.label}</div>
            <div className="mt-1 text-xs text-[var(--kt-muted-foreground)]">
              {slot.available ? "Available" : "Unavailable"}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="kt-button kt-button-primary"
          disabled={!selectedSlot || createHold.isPending}
          onClick={continueToDetails}
        >
          {createHold.isPending ? "Holding slot..." : "Continue"}
        </button>
      </div>
    </section>
  )
}
