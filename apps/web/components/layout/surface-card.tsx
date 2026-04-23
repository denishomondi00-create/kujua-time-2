import { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export function SurfaceCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn("kt-card p-5", className)}>{children}</div>
}
