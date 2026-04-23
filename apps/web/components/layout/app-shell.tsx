import { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export function AppShell({
  sidebar,
  header,
  children,
  className,
}: {
  sidebar?: ReactNode
  header?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div className="min-h-screen bg-[var(--kt-surface)] text-[var(--kt-foreground)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        {sidebar ? <aside className="hidden border-r border-[var(--kt-border)] lg:block">{sidebar}</aside> : null}
        <div className={cn("flex min-h-screen min-w-0 flex-1 flex-col", className)}>
          {header ? (
            <header className="sticky top-0 z-30 border-b border-[var(--kt-border)] bg-[color:color-mix(in_srgb,var(--kt-panel)_92%,transparent)] backdrop-blur">
              {header}
            </header>
          ) : null}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}
