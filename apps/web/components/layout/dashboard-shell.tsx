import { ReactNode } from "react"

import { AppShell } from "@/components/layout/app-shell"
import { AppSidebar } from "@/components/navigation/app-sidebar"
import { AppTopbar } from "@/components/navigation/app-topbar"

export function DashboardShell({
  children,
  title,
  description,
}: {
  children: ReactNode
  title?: string
  description?: string
}) {
  return (
    <AppShell
      sidebar={<AppSidebar />}
      header={<AppTopbar title={title} description={description} />}
    >
      <div className="kt-container py-6">{children}</div>
    </AppShell>
  )
}
