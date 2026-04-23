import { ReactNode } from "react"

export function CardList({
  items,
}: {
  items: Array<{ id: string; title: string; description?: string; meta?: ReactNode }>
}) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item.id} className="kt-card flex items-start justify-between gap-4 p-4">
          <div className="space-y-1">
            <div className="font-semibold">{item.title}</div>
            {item.description ? <p className="text-sm text-[var(--kt-muted-foreground)]">{item.description}</p> : null}
          </div>
          {item.meta}
        </div>
      ))}
    </div>
  )
}
