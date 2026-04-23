"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function usePersistedState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    const raw = window.localStorage.getItem(key)
    if (!raw) return
    try {
      setValue(JSON.parse(raw) as T)
    } catch {
      window.localStorage.removeItem(key)
    }
  }, [key])

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
