"use client"

import { AlertBanner } from "@/components/feedback/alert-banner"
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
      <AlertBanner title="Payment step">
        Payment collection should stay in a client island. Providers like Stripe or Paystack can mount here without hydrating the full page shell.
      </AlertBanner>

      <div className="rounded-3xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{model.eventType.name}</h3>
            <p className="mt-1 text-sm text-[var(--kt-muted-foreground)]">
              {model.eventType.meetingSummary}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--kt-muted-foreground)]">Due now</div>
            <div className="text-2xl font-semibold">{amountLabel}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {isZeroMoney(pricing.amountMinor) || pricing.paymentMode === "free" ? (
          <SubmitButton
            type="button"
            isLoading={confirmFree.isPending}
            onClick={handleFreeConfirm}
          >
            Confirm booking
          </SubmitButton>
        ) : (
          <SubmitButton
            type="button"
            isLoading={createCheckout.isPending || confirmPaid.isPending}
            onClick={handlePaidConfirm}
          >
            Proceed to payment
          </SubmitButton>
        )}
      </div>
    </div>
  )
}
