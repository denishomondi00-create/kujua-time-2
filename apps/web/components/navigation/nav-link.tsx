"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

export function NavLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon?: ReactNode
}) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
        active
          ? "bg-[color:color-mix(in_srgb,var(--kt-accent)_10%,white)] text-[var(--kt-accent)]"
          : "text-[var(--kt-muted-foreground)] hover:bg-[var(--kt-muted)] hover:text-[var(--kt-foreground)]",
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span>{label}</span>
    </Link>
  )
}
