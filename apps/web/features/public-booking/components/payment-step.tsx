"use client"

import { SubmitButton } from "@/components/forms/submit-button"
import {
  useConfirmFreeBookingMutation,
  useConfirmPaidBookingMutation,
  useCreatePaymentCheckoutMutation,
} from "@/features/public-booking/mutations"
import type {
  BookingHold,
  ConfirmedBooking,
  PublicBookingPageModel,
} from "@/features/public-booking/schemas/public-booking.schemas"
import { formatMoney, isZeroMoney } from "@/lib/utils/currency"

export function PaymentStep({
  model,
  hold,
  onConfirmed,
}: {
  model: PublicBookingPageModel
  hold: BookingHold
  onConfirmed: (value: ConfirmedBooking) => void
}) {
  const pricing = model.eventType.pricing
  const createCheckout = useCreatePaymentCheckoutMutation()
  const confirmFree = useConfirmFreeBookingMutation()
  const confirmPaid = useConfirmPaidBookingMutation()

  async function handleFreeConfirm() {
    const booking = await confirmFree.mutateAsync({ holdId: hold.id })
    onConfirmed(booking)
  }

  async function handlePaidConfirm() {
    const checkout = await createCheckout.mutateAsync({ holdId: hold.id })
    if (checkout.checkoutUrl) {
      window.location.href = checkout.checkoutUrl
      return
    }

    const booking = await confirmPaid.mutateAsync({
      paymentAttemptId: checkout.paymentAttemptId,
    })
    onConfirmed(booking)
  }

  const amountLabel = isZeroMoney(pricing.amountMinor)
    ? "Free"
    : formatMoney(pricing.amountMinor, pricing.currency)

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-normal">{model.eventType.name}</h3>
            <p className="mt-1 text-sm text-[var(--kt-muted-foreground)]">
              {model.eventType.meetingSummary}
            </p>
          </div>
          <div className="sm:text-right">
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--kt-muted-foreground)]">Due now</div>
            <div className="text-2xl font-semibold">{amountLabel}</div>
          </div>
        </div>
      </div>

      {createCheckout.isError || confirmFree.isError || confirmPaid.isError ? (
        <p className="text-sm font-medium text-rose-600">
          This booking could not be confirmed. Please try again or choose another time.
        </p>
      ) : null}

      <div className="flex justify-end">
        {isZeroMoney(pricing.amountMinor) || pricing.paymentMode === "free" ? (
          <SubmitButton
            type="button"
            className="w-full sm:w-auto"
            isLoading={confirmFree.isPending}
            onClick={handleFreeConfirm}
          >
            Confirm booking
          </SubmitButton>
        ) : (
          <SubmitButton
            type="button"
            className="w-full sm:w-auto"
            isLoading={createCheckout.isPending || confirmPaid.isPending}
            onClick={handlePaidConfirm}
          >
            Confirm booking
          </SubmitButton>
        )}
      </div>
    </div>
  )
}
