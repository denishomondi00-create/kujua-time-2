import { ReactNode } from "react"
import { ShieldCheck, Sparkles } from "lucide-react"

import { PublicBookingBrandLink } from "@/components/navigation/public-booking-brand-link"
import { SurfaceCard } from "@/components/layout/surface-card"
import { BookingPageHeader } from "@/features/public-booking/components/booking-page-header"
import { EventSummaryCard } from "@/features/public-booking/components/event-summary-card"
import type { PublicBookingPageModel } from "@/features/public-booking/schemas/public-booking.schemas"

export function BookingPageShell({
  model,
  interaction,
}: {
  model: PublicBookingPageModel
  interaction: ReactNode
}) {
  return (
    <div className={`min-h-screen kt-surface-gradient ${model.theme.themeClassName}`}>
      <div className="kt-container py-6 sm:py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <PublicBookingBrandLink />
          <div className="text-right text-sm text-[var(--kt-muted-foreground)]">
            <div className="font-semibold text-[var(--kt-foreground)]">{model.workspace.name}</div>
            <div>{model.workspace.tagline}</div>
          </div>
        </div>

        <div className="space-y-6">
          <BookingPageHeader model={model} />

          <div className="kt-grid-shell items-start">
            <div className="min-w-0 space-y-6">{interaction}</div>

            <div className="min-w-0 space-y-6">
              <EventSummaryCard model={model} />

              <SurfaceCard className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-[var(--kt-success)]" />
                  <div>
                    <h3 className="text-lg font-semibold">Trust and policies</h3>
                    <p className="text-sm text-[var(--kt-muted-foreground)]">
                      These sections stay server-rendered for fast first paint and SEO-friendly public pages.
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-[var(--kt-muted-foreground)]">
                  {model.trust.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--kt-success)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </SurfaceCard>

              <SurfaceCard className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[var(--kt-accent-soft)]" />
                  <div>
                    <h3 className="text-lg font-semibold">FAQ</h3>
                    <p className="text-sm text-[var(--kt-muted-foreground)]">
                      Public content can stay cached separately from interactive slot and payment requests.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {model.trust.faq.map((item) => (
                    <div key={item.question} className="rounded-2xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-4">
                      <div className="font-semibold">{item.question}</div>
                      <p className="mt-1 text-sm text-[var(--kt-muted-foreground)]">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>

              <SurfaceCard className="space-y-4">
                <h3 className="text-lg font-semibold">Policies</h3>
                <div className="space-y-3">
                  {model.trust.policies.map((policy) => (
                    <div key={policy.title} className="rounded-2xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-4">
                      <div className="font-semibold">{policy.title}</div>
                      <p className="mt-1 text-sm text-[var(--kt-muted-foreground)]">{policy.summary}</p>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
