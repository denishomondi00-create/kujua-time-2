import { ReactNode } from "react"

import { EmptyStateShell } from "@/components/layout/empty-state-shell"

export function EmptyState({
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
  return <EmptyStateShell title={title} description={description} action={action} icon={icon} />
}
