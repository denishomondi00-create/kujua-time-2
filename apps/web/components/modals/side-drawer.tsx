"use client"

import { ReactNode } from "react"

export function SideDrawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/35">
      <button type="button" className="flex-1" onClick={onClose} aria-label="Close drawer" />
      <div className="h-full w-full max-w-xl overflow-y-auto border-l border-[var(--kt-border)] bg-[var(--kt-panel)] p-6 shadow-[var(--kt-shadow-lg)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button type="button" className="kt-button kt-button-secondary" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
