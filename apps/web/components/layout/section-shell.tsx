import { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export function SectionShell({
  title,
  description,
  children,
  className,
}: {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("space-y-4", className)}>
      {title ? (
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          {description ? <p className="text-sm text-[var(--kt-muted-foreground)]">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </section>
  )
}
