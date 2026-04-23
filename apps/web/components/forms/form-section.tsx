import { ReactNode } from "react"

export function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description ? <p className="text-sm text-[var(--kt-muted-foreground)]">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
