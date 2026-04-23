export type TrackingProvider = {
  page: (path: string) => void
  event: (name: string, payload?: Record<string, unknown>) => void
}

export function createTrackingProvider(): TrackingProvider {
  return {
    page(path) {
      if (process.env.NODE_ENV !== "production") {
        console.debug("[analytics:page]", path)
      }
    },
    event(name, payload) {
      if (process.env.NODE_ENV !== "production") {
        console.debug("[analytics:event]", name, payload)
      }
    },
  }
}
