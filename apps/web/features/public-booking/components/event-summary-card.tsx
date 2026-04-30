import { CreditCard } from "lucide-react"

import { KeyValueList } from "@/components/data-display/key-value-list"
import { SurfaceCard } from "@/components/layout/surface-card"
import type { PublicBookingPageModel } from "@/features/public-booking/schemas/public-booking.schemas"
import { formatMoney, isZeroMoney } from "@/lib/utils/currency"

export function EventSummaryCard({ model }: { model: PublicBookingPageModel }) {
  const pricing = model.eventType.pricing
  const pricingLabel = isZeroMoney(pricing.amountMinor)
    ? "Free"
    : formatMoney(pricing.amountMinor, pricing.currency)

  return (
    <SurfaceCard className="space-y-5 p-4 sm:p-5">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-normal">Booking summary</h2>
        <p className="text-sm text-[var(--kt-muted-foreground)]">{model.eventType.meetingSummary}</p>
      </div>

      <KeyValueList
        items={[
          { label: "Event type", value: model.eventType.name },
          { label: "Duration", value: `${model.eventType.durationMinutes} minutes` },
          { label: "Meeting location", value: model.eventType.locationLabel },
          { label: "Payment", value: pricingLabel },
        ]}
      />

      <div className="rounded-2xl border border-[var(--kt-border)] bg-[var(--kt-muted)] p-4">
        <div className="flex items-start gap-3">
          <CreditCard className="mt-0.5 h-5 w-5 text-[var(--kt-accent)]" />
          <div className="text-sm text-[var(--kt-muted-foreground)]">
            {isZeroMoney(pricing.amountMinor) || pricing.paymentMode === "free"
              ? "No payment is due for this booking."
              : `${pricingLabel} is due to confirm this booking.`}
          </div>
        </div>
      </div>
    </SurfaceCard>
  )
}
