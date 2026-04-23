import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"
import { ReactNode } from "react"

import { cn } from "@/lib/utils/cn"

const styles = {
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50 text-blue-900",
  },
  success: {
    icon: CheckCircle2,
    className: "border-emerald-200 bg-emerald-50 text-emerald-900",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-200 bg-amber-50 text-amber-900",
  },
  danger: {
    icon: XCircle,
    className: "border-rose-200 bg-rose-50 text-rose-900",
  },
}

export function AlertBanner({
  variant = "info",
  title,
  children,
}: {
  variant?: keyof typeof styles
  title?: string
  children: ReactNode
}) {
  const { icon: Icon, className } = styles[variant]

  return (
    <div className={cn("rounded-2xl border p-4", className)}>
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="space-y-1 text-sm">
          {title ? <div className="font-semibold">{title}</div> : null}
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}
