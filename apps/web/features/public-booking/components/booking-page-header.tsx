import { Clock3, Globe2, MapPin } from "lucide-react"

import type { PublicBookingPageModel } from "@/features/public-booking/schemas/public-booking.schemas"

export function BookingPageHeader({ model }: { model: PublicBookingPageModel }) {
  return (
    <section className="kt-card overflow-hidden">
      <div
        className="px-6 py-10 text-white"
        style={{
          background: `linear-gradient(135deg, ${model.theme.accentColor}, ${model.theme.accentSoft})`,
        }}
      >
        <div className="space-y-3">
          <div className="kt-pill w-fit border-white/15 bg-white/10 text-white">
            {model.workspace.name}
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{model.eventType.name}</h1>
            <p className="max-w-3xl text-sm text-white/85 sm:text-base">{model.eventType.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/90">
            <span className="kt-pill border-white/20 bg-white/10 text-white">
              <Clock3 className="h-4 w-4" />
              {model.eventType.durationMinutes} minutes
            </span>
            <span className="kt-pill border-white/20 bg-white/10 text-white">
              <MapPin className="h-4 w-4" />
              {model.eventType.locationLabel}
            </span>
            <span className="kt-pill border-white/20 bg-white/10 text-white">
              <Globe2 className="h-4 w-4" />
              {model.workspace.timezone}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
