import { ReactNode } from "react"

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        {eyebrow ? <div className="kt-pill w-fit">{eyebrow}</div> : null}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold">{title}</h1>
          {description ? <p className="max-w-3xl text-sm text-[var(--kt-muted-foreground)]">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}
