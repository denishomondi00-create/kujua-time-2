"use client"

import { useCallback, useState } from "react"

import { copyText } from "@/lib/utils/clipboard"

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (value: string) => {
    const success = await copyText(value)
    setCopied(success)
    if (success) {
      window.setTimeout(() => setCopied(false), 1800)
    }

    return success
  }, [])

  return { copied, copy }
}
