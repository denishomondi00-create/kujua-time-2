"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function PageTracking() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    console.info('[PageTracking]', pathname)
  }, [pathname])

  return null
}
