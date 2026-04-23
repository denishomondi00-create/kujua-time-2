import {
  BarChart3,
  CalendarDays,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  Workflow,
} from "lucide-react"

import { NavLink } from "@/components/navigation/nav-link"
import { WorkspaceSwitcher } from "@/components/navigation/workspace-switcher"

const items = [
  { href: "/app", label: "Home", icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: "/app/calendar", label: "Calendar", icon: <CalendarDays className="h-4 w-4" /> },
  { href: "/app/bookings", label: "Bookings", icon: <CalendarDays className="h-4 w-4" /> },
  { href: "/app/clients", label: "Clients", icon: <Users className="h-4 w-4" /> },
  { href: "/app/event-types", label: "Event Types", icon: <FileText className="h-4 w-4" /> },
  { href: "/app/payments", label: "Payments", icon: <CreditCard className="h-4 w-4" /> },
  { href: "/app/automations", label: "Automations", icon: <Workflow className="h-4 w-4" /> },
  { href: "/app/reports", label: "Reports", icon: <BarChart3 className="h-4 w-4" /> },
  { href: "/app/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
]

export function AppSidebar() {
  return (
    <div className="sticky top-0 flex h-screen w-[var(--kt-sidebar-width)] flex-col gap-6 px-4 py-5">
      <div className="px-2">
        <div className="text-xs uppercase tracking-[0.16em] text-[var(--kt-muted-foreground)]">
          Kujua Time
        </div>
        <div className="mt-1 text-xl font-semibold">Operations Console</div>
      </div>
      <WorkspaceSwitcher />
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
      <div className="rounded-3xl border border-[var(--kt-border)] bg-[var(--kt-panel)] p-4 text-sm">
        <div className="font-semibold">Public booking rule</div>
        <p className="mt-2 text-[var(--kt-muted-foreground)]">
          Route files read from feature server helpers first. Client interactivity stays in feature queries and mutations.
        </p>
      </div>
    </div>
  )
}
