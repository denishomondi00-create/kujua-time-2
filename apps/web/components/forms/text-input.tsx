import { InputHTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("kt-input", props.className)} />
}
