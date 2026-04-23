import { InputHTMLAttributes } from "react"

export function CheckboxInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} type="checkbox" className="h-4 w-4 rounded border-[var(--kt-border)]" />
}
