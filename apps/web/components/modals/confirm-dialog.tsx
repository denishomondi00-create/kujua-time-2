"use client"

import { ReactNode } from "react"

import { ModalShell } from "@/components/modals/modal-shell"

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onClose,
  tone = "default",
  extra,
}: {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onClose: () => void
  tone?: "default" | "danger"
  extra?: ReactNode
}) {
  return (
    <ModalShell open={open} onClose={onClose}>
      <div className="space-y-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-[var(--kt-muted-foreground)]">{description}</p>
        </div>
        {extra}
        <div className="flex justify-end gap-3">
          <button type="button" className="kt-button kt-button-secondary" onClick={onClose}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className="kt-button text-white"
            style={{ background: tone === "danger" ? "var(--kt-danger)" : "var(--kt-accent)" }}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </ModalShell>
  )
}
