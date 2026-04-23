"use client"

import { CalendarSync, CreditCard, FileEdit } from "lucide-react"

import { AlertBanner } from "@/components/feedback/alert-banner"
import { SurfaceCard } from "@/components/layout/surface-card"
import { BookingConfirmation } from "@/features/public-booking/components/booking-confirmation"
import { CancelFlow } from "@/features/public-booking/components/cancel-flow"
import { IntakeForm } from "@/features/public-booking/components/intake-form"
import { PaymentStep } from "@/features/public-booking/components/payment-step"
import { RescheduleFlow } from "@/features/public-booking/components/reschedule-flow"
import { SlotPicker } from "@/features/public-booking/components/slot-picker"
import { TimezoneSelect } from "@/features/public-booking/components/timezone-select"
import { usePublicBookingMachine } from "@/features/public-booking/hooks"
import type { PublicBookingPageModel } from "@/features/public-booking/schemas/public-booking.schemas"

export function PublicBookingClient({
  model,
  mode = "book",
  token,
}: {
  model: PublicBookingPageModel
  mode?: "book" | "reschedule" | "cancel"
  token?: string
}) {
  const machine = usePublicBookingMachine(model)

  if (mode === "reschedule" && token) {
    return (
      <SurfaceCard className="space-y-5">
        <div className="flex items-center gap-3">
          <CalendarSync className="h-5 w-5 text-[var(--kt-accent)]" />
          <div>
            <h2 className="text-lg font-semibold">Reschedule your booking</h2>
            <p className="text-sm text-[var(--kt-muted-foreground)]">This interaction is hydrated only after the public shell has rendered.</p>
          </div>
        </div>
        <RescheduleFlow
          model={model}
          token={token}
          onCompleted={(booking) => {
            machine.setConfirmation(booking)
            machine.goToConfirmed()
          }}
        />
        {machine.confirmation ? <BookingConfirmation booking={machine.confirmation} /> : null}
      </SurfaceCard>
    )
  }

  if (mode === "cancel" && token) {
    return (
      <SurfaceCard className="space-y-5">
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-[var(--kt-danger)]" />
          <div>
            <h2 className="text-lg font-semibold">Cancel your booking</h2>
            <p className="text-sm text-[var(--kt-muted-foreground)]">Cancellation stays in a targeted client island instead of hydrating the whole page.</p>
          </div>
        </div>
        <CancelFlow token={token} />
      </SurfaceCard>
    )
  }

  return (
    <div className="space-y-5">
      <AlertBanner title="Rendering model">
        Server components own branding, metadata, trust content, meeting summary, and the first slot snapshot. This panel is the single client entry point for booking interaction.
      </AlertBanner>

      <SurfaceCard className="space-y-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--kt-muted-foreground)]">
              <FileEdit className="h-4 w-4" />
              Step {machine.step === "slot" ? "1" : machine.step === "details" ? "2" : machine.step === "payment" ? "3" : "4"} of 4
            </div>
            <h2 className="text-xl font-semibold">Complete your booking</h2>
          </div>
          <TimezoneSelect
            value={machine.timezone}
            onChange={machine.setTimezone}
            extraTimezones={[model.workspace.timezone]}
          />
        </div>

        {machine.step === "slot" ? (
          <SlotPicker
            publicEventId={model.eventType.id}
            date={machine.date}
            timezone={machine.timezone}
            initialSlots={model.availabilitySnapshot.slots}
            selectedSlot={machine.selectedSlot}
            onDateChange={machine.setDate}
            onSelectedSlotChange={machine.setSelectedSlot}
            onHoldCreated={(hold) => {
              machine.setHold(hold)
              machine.goToDetails()
            }}
          />
        ) : null}

        {machine.step === "details" && machine.hold ? (
          <IntakeForm
            hold={machine.hold}
            onCompleted={(hold) => {
              machine.setHold(hold)
              if (machine.requiresPayment) {
                machine.goToPayment()
              } else {
                machine.goToPayment()
              }
            }}
          />
        ) : null}

        {machine.step === "payment" && machine.hold ? (
          <PaymentStep
            model={model}
            hold={machine.hold}
            onConfirmed={(booking) => {
              machine.setConfirmation(booking)
              machine.goToConfirmed()
            }}
          />
        ) : null}

        {machine.step === "confirmed" && machine.confirmation ? (
          <BookingConfirmation booking={machine.confirmation} />
        ) : null}
      </SurfaceCard>
    </div>
  )
}
