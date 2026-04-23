"use client"

import { useState } from "react"

import { AlertBanner } from "@/components/feedback/alert-banner"
import { SubmitButton } from "@/components/forms/submit-button"
import { TextArea } from "@/components/forms/text-area"
import { useCancelBookingMutation } from "@/features/public-booking/mutations"

export function CancelFlow({
  token,
}: {
  token: string
}) {
  const [reason, setReason] = useState("")
  const [done, setDone] = useState(false)
  const cancelBooking = useCancelBookingMutation(token)

  async function handleCancel() {
    await cancelBooking.mutateAsync({ reason })
    setDone(true)
  }

  if (done) {
    return (
      <AlertBanner variant="success" title="Booking canceled">
        The API can now release capacity, write a domain event, and trigger cancellation notifications from the backend.
      </AlertBanner>
    )
  }

  return (
    <div className="space-y-4">
      <AlertBanner variant="warning" title="Cancel booking">
        This action should hit the public cancel endpoint and keep heavy work in the backend.
      </AlertBanner>

      <div className="rounded-3xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-5">
        <label className="block space-y-2">
          <span className="text-sm font-semibold">Reason</span>
          <TextArea
            placeholder="Optional context for the cancellation."
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </label>
      </div>

      <div className="flex justify-end">
        <SubmitButton
          type="button"
          isLoading={cancelBooking.isPending}
          onClick={handleCancel}
        >
          Cancel booking
        </SubmitButton>
      </div>
    </div>
  )
}
