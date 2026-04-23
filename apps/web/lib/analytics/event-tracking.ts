"use client"

import { createTrackingProvider } from "@/lib/analytics/providers"

const provider = createTrackingProvider()

export function trackEvent(name: string, payload?: Record<string, unknown>) {
  provider.event(name, payload)
}
