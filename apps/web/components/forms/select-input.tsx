import { SelectHTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("kt-select", props.className)} />
}
