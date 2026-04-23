import { ReactNode } from "react"

import { InlineError } from "@/components/feedback/inline-error"

export function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string | null
  children: ReactNode
}) {
  return (
    <label className="block space-y-2">
      <span className="kt-label">{label}</span>
      {children}
      {hint ? <p className="text-xs text-[var(--kt-muted-foreground)]">{hint}</p> : null}
      <InlineError message={error} />
    </label>
  )
}
