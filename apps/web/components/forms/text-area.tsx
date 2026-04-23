import { TextareaHTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("kt-textarea", props.className)} />
}
