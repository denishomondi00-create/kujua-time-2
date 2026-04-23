import { ReactNode } from "react"

import { SurfaceCard } from "@/components/layout/surface-card"

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string
  value: string
  hint?: string
  icon?: ReactNode
}) {
  return (
    <SurfaceCard className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-sm text-[var(--kt-muted-foreground)]">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>
        {icon ? <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--kt-muted)]">{icon}</div> : null}
      </div>
      {hint ? <div className="text-sm text-[var(--kt-muted-foreground)]">{hint}</div> : null}
    </SurfaceCard>
  )
}
