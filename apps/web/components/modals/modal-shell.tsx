"use client"

import { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export function ModalShell({
  open,
  onClose,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="absolute inset-0" onClick={onClose} />
      <div className={cn("relative w-full max-w-lg rounded-[1.75rem] bg-[var(--kt-panel)] p-6 shadow-[var(--kt-shadow-lg)]", className)}>
        {children}
      </div>
    </div>
  )
}
