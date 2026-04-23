"use client"

import { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

export function SubmitButton({
  children,
  isLoading,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
  return (
    <button
      {...props}
      className={cn("kt-button kt-button-primary disabled:cursor-not-allowed disabled:opacity-70", props.className)}
      disabled={props.disabled || isLoading}
    >
      {isLoading ? "Working..." : children}
    </button>
  )
}
