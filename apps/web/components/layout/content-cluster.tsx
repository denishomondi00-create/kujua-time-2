import { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export function ContentCluster({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn("flex flex-col gap-6", className)}>{children}</div>
}
