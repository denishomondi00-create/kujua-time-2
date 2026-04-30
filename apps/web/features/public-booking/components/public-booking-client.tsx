"use client"

import { CalendarDays, CalendarSync, CheckCircle2, ClipboardList, CreditCard } from "lucide-react"

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

const STEPS = [
  { key: "slot", label: "Date & time", icon: CalendarDays },
  { key: "details", label: "Your details", icon: ClipboardList },
  { key: "payment", label: "Confirm", icon: CreditCard },
] as const

type ActiveStep = "slot" | "details" | "payment" | "confirmed"

function StepProgress({ active }: { active: ActiveStep }) {
  const activeIdx = STEPS.findIndex((s) => s.key === active)
  const isDone = active === "confirmed"

  return (
    <div className="flex items-center gap-1">
      {STEPS.map((step, idx) => {
        const isCompleted = isDone || idx < activeIdx
        const isCurrent = !isDone && idx === activeIdx
        const Icon = step.icon

        return (
          <div key={step.key} className="flex items-center gap-1">
            <div className="flex items-center gap-1.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition"
                style={{
                  background: isCompleted || isCurrent ? "var(--kt-accent)" : "var(--kt-muted)",
                  color: isCompleted || isCurrent ? "#fff" : "var(--kt-muted-foreground)",
                }}
              >
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
              </div>
              <span
                className="hidden text-xs font-medium sm:inline"
                style={{
                  color: isCurrent ? "var(--kt-foreground)" : "var(--kt-muted-foreground)",
                }}
              >
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 ? (
              <div
                className="mx-1 h-px w-6 shrink-0 transition"
                style={{ background: isCompleted ? "var(--kt-accent)" : "var(--kt-border)" }}
              />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

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
            <h2 className="text-lg font-semibold tracking-normal">Reschedule your booking</h2>
            <p className="text-sm text-[var(--kt-muted-foreground)]">Choose a new time for this session.</p>
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
            <h2 className="text-lg font-semibold tracking-normal">Cancel your booking</h2>
            <p className="text-sm text-[var(--kt-muted-foreground)]">Cancel this session and free the time on the calendar.</p>
          </div>
        </div>
        <CancelFlow token={token} />
      </SurfaceCard>
    )
  }

  const stepTitle = {
    slot: "Choose a date & time",
    details: "Enter your details",
    payment: "Confirm your booking",
    confirmed: "You're all booked!",
  }[machine.step]

  return (
    <div className="space-y-5">
      <SurfaceCard className="space-y-5 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            {machine.step !== "confirmed" ? (
              <StepProgress active={machine.step} />
            ) : (
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--kt-success)]">
                <CheckCircle2 className="h-4 w-4" />
                Booking confirmed
              </div>
            )}
            <h2 className="text-xl font-semibold tracking-normal">{stepTitle}</h2>
          </div>
          {machine.step === "slot" ? (
            <TimezoneSelect
              value={machine.timezone}
              onChange={(value) => {
                machine.setSelectedSlot(null)
                machine.setTimezone(value)
              }}
              extraTimezones={[model.workspace.timezone]}
            />
          ) : null}
        </div>

        {machine.step === "slot" ? (
          <SlotPicker
            publicEventId={model.eventType.id}
            date={machine.date}
            initialDate={model.availabilitySnapshot.date}
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
              machine.goToPayment()
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
