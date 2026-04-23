import { ReactNode } from "react"

export function EmptyStateShell({
  title,
  description,
  action,
  icon,
}: {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}) {
  return (
    <div className="kt-card flex flex-col items-center justify-center gap-4 p-8 text-center">
      {icon ? (
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--kt-muted)] text-[var(--kt-accent)]">
          {icon}
        </div>
      ) : null}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="max-w-md text-sm text-[var(--kt-muted-foreground)]">{description}</p>
      </div>
      {action}
    </div>
  )
}
