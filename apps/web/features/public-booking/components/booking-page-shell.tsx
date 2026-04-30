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
      <div className="kt-container px-3 py-4 sm:px-6 sm:py-8">
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <PublicBookingBrandLink />
          <div className="text-left text-sm text-[var(--kt-muted-foreground)] sm:text-right">
            <div className="font-semibold text-[var(--kt-foreground)]">{model.workspace.name}</div>
            {model.workspace.tagline ? <div>{model.workspace.tagline}</div> : null}
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          <BookingPageHeader model={model} />

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px]">
            <div className="min-w-0 space-y-5 sm:space-y-6">{interaction}</div>

            <div className="min-w-0 space-y-5 sm:space-y-6">
              <EventSummaryCard model={model} />

              {model.trust.bullets.length ? (
                <SurfaceCard className="space-y-4 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-[var(--kt-success)]" />
                    <div>
                      <h3 className="text-lg font-semibold tracking-normal">Before you book</h3>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-[var(--kt-muted-foreground)]">
                    {model.trust.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--kt-success)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </SurfaceCard>
              ) : null}

              {model.trust.faq.length ? (
                <SurfaceCard className="space-y-4 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-[var(--kt-accent-soft)]" />
                    <div>
                      <h3 className="text-lg font-semibold tracking-normal">FAQ</h3>
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
              ) : null}

              {model.trust.policies.length ? (
                <SurfaceCard className="space-y-4 p-4 sm:p-5">
                  <h3 className="text-lg font-semibold tracking-normal">Policies</h3>
                  <div className="space-y-3">
                    {model.trust.policies.map((policy) => (
                      <div key={policy.title} className="rounded-2xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-4">
                        <div className="font-semibold">{policy.title}</div>
                        <p className="mt-1 text-sm text-[var(--kt-muted-foreground)]">{policy.summary}</p>
                      </div>
                    ))}
                  </div>
                </SurfaceCard>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
