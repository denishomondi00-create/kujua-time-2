"use client"

import { useRouter } from "next/navigation"
import { Bell, LoaderCircle, LogOut, Search } from "lucide-react"

import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { useLogoutMutation } from "@/features/auth/mutations"
import { AUTH_REDIRECTS, getAuthErrorMessage } from "@/features/auth/utils"

export function AppTopbar({
  title,
  description,
}: {
  title?: string
  description?: string
}) {
  const router = useRouter()
  const logoutMutation = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      router.replace(AUTH_REDIRECTS.logoutFallback)
      router.refresh()
    } catch (error) {
      console.error(getAuthErrorMessage(error))
    }
  }

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
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--kt-border)] bg-[var(--kt-panel)] px-4 text-sm font-medium transition hover:bg-[var(--kt-surface)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {logoutMutation.isPending ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}
