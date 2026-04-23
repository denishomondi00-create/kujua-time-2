import { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export function SplitPanel({
  left,
  right,
  className,
}: {
  left: ReactNode
  right: ReactNode
  className?: string
}) {
  return (
    <div className={cn("kt-grid-shell", className)}>
      <div className="min-w-0">{left}</div>
      <div className="min-w-0">{right}</div>
    </div>
  )
}
