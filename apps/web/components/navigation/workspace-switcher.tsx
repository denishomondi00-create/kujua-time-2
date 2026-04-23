"use client"

import { ChevronDown } from "lucide-react"

import { useWorkspace } from "@/components/providers/workspace-provider"

export function WorkspaceSwitcher() {
  const { workspaceSlug } = useWorkspace()

  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-2xl border border-[var(--kt-border)] bg-[var(--kt-panel)] px-3 py-2 text-left"
    >
      <div>
        <div className="text-xs uppercase tracking-[0.14em] text-[var(--kt-muted-foreground)]">
          Workspace
        </div>
        <div className="font-semibold text-[var(--kt-foreground)]">
          {workspaceSlug ?? "Kujua Time"}
        </div>
      </div>
      <ChevronDown className="h-4 w-4 text-[var(--kt-muted-foreground)]" />
    </button>
  )
}
