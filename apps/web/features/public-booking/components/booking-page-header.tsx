import { Clock3, Globe2, MapPin } from "lucide-react"

import type { PublicBookingPageModel } from "@/features/public-booking/schemas/public-booking.schemas"

export function BookingPageHeader({ model }: { model: PublicBookingPageModel }) {
  return (
    <section className="kt-card overflow-hidden">
      <div
        className="px-4 py-6 text-white sm:px-6 sm:py-10"
        style={{
          background: `linear-gradient(135deg, ${model.theme.accentColor}, ${model.theme.accentSoft})`,
        }}
      >
        <div className="space-y-3">
          <div className="kt-pill w-fit border-white/15 bg-white/10 text-white">
            {model.workspace.name}
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-normal text-white sm:text-4xl">{model.eventType.name}</h1>
            <p className="max-w-3xl text-sm text-white/85 sm:text-base">{model.eventType.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/90">
            <span className="kt-pill max-w-full border-white/20 bg-white/10 text-white">
              <Clock3 className="h-4 w-4" />
              <span>{model.eventType.durationMinutes} minutes</span>
            </span>
            <span className="kt-pill max-w-full border-white/20 bg-white/10 text-white">
              <MapPin className="h-4 w-4" />
              <span className="min-w-0 break-words">{model.eventType.locationLabel}</span>
            </span>
            <span className="kt-pill max-w-full border-white/20 bg-white/10 text-white">
              <Globe2 className="h-4 w-4" />
              <span className="min-w-0 break-words">{model.workspace.timezone}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
