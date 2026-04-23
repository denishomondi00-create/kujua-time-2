import { ReactNode } from "react"

export function DetailList({
  items,
}: {
  items: Array<{ label: string; value: ReactNode }>
}) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-4">
          <div className="text-xs uppercase tracking-[0.14em] text-[var(--kt-muted-foreground)]">{item.label}</div>
          <div className="mt-1 text-sm font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  )
}
