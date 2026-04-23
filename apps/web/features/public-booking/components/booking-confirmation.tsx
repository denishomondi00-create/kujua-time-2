import { CheckCircle2 } from "lucide-react"

import { SurfaceCard } from "@/components/layout/surface-card"
import type { ConfirmedBooking } from "@/features/public-booking/schemas/public-booking.schemas"
import { formatDateTime } from "@/lib/utils/dates"

export function BookingConfirmation({
  booking,
}: {
  booking: ConfirmedBooking
}) {
  return (
    <SurfaceCard className="space-y-5">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-6 w-6 text-[var(--kt-success)]" />
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Booking confirmed</h2>
          <p className="text-sm text-[var(--kt-muted-foreground)]">
            The backend can now trigger reminders, client record creation, and follow-up workflows from the confirmed write path.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--kt-border)] bg-[var(--kt-muted)] p-4">
        <div className="text-sm font-semibold">{booking.eventName}</div>
        <div className="mt-1 text-sm text-[var(--kt-muted-foreground)]">
          {formatDateTime(booking.startAt)} to {formatDateTime(booking.endAt, "h:mm a")}
        </div>
        <div className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--kt-muted-foreground)]">
          Public booking token
        </div>
        <div className="mt-1 break-all text-sm font-medium">{booking.publicBookingToken}</div>
      </div>
    </SurfaceCard>
  )
}
