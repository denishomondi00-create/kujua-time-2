"use client"

import { useMemo, useState } from "react"

import type {
  BookingHold,
  ConfirmedBooking,
  PublicBookingPageModel,
  PublicSlot,
} from "@/features/public-booking/schemas/public-booking.schemas"
import { getBrowserTimezone } from "@/lib/utils/timezone"

type Step = "slot" | "details" | "payment" | "confirmed"

export function usePublicBookingMachine(initialModel: PublicBookingPageModel) {
  const [step, setStep] = useState<Step>("slot")
  const [date, setDate] = useState(initialModel.availabilitySnapshot.date)
  const [timezone, setTimezone] = useState(
    initialModel.availabilitySnapshot.timezone || getBrowserTimezone(),
  )
  const [selectedSlot, setSelectedSlot] = useState<PublicSlot | null>(
    initialModel.availabilitySnapshot.slots[0] ?? null,
  )
  const [hold, setHold] = useState<BookingHold | null>(null)
  const [confirmation, setConfirmation] = useState<ConfirmedBooking | null>(null)

  const requiresPayment = useMemo(
    () => initialModel.eventType.pricing.paymentMode !== "free" && initialModel.eventType.pricing.amountMinor > 0,
    [initialModel.eventType.pricing.amountMinor, initialModel.eventType.pricing.paymentMode],
  )

  return {
    step,
    date,
    timezone,
    selectedSlot,
    hold,
    confirmation,
    requiresPayment,
    setDate,
    setTimezone,
    setSelectedSlot,
    setHold,
    setConfirmation,
    goToDetails() {
      setStep("details")
    },
    goToPayment() {
      setStep("payment")
    },
    goToConfirmed() {
      setStep("confirmed")
    },
    reset() {
      setStep("slot")
      setHold(null)
      setConfirmation(null)
    },
  }
}
