import { Bell, Search } from "lucide-react"

import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"

export function AppTopbar({
  title,
  description,
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="kt-container flex min-h-[var(--kt-topbar-height)] items-center justify-between gap-4 py-3">
      <div className="min-w-0 space-y-2">
        <BreadcrumbNav items={[{ href: "/app", label: "App" }, { label: title ?? "Dashboard" }]} />
        {title ? (
          <div className="min-w-0">
            <div className="truncate text-lg font-semibold">{title}</div>
            {description ? <div className="truncate text-sm text-[var(--kt-muted-foreground)]">{description}</div> : null}
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-[var(--kt-border)] bg-[var(--kt-panel)]">
          <Search className="h-4 w-4" />
        </button>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-[var(--kt-border)] bg-[var(--kt-panel)]">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
