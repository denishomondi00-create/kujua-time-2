export function appUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000"
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function apiUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:4000"
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function buildPublicBookingPath(workspaceSlug: string, pathSegments?: string[]) {
  const suffix = pathSegments?.length ? `/${pathSegments.join("/")}` : ""
  return `/book/${workspaceSlug}${suffix}`
}

export function buildPublicBookingApiPath(workspaceSlug: string, pathSegments?: string[]) {
  const suffix = pathSegments?.length ? `/${pathSegments.join("/")}` : ""
  return `/v1/public/booking-pages/${workspaceSlug}${suffix}`
}

export function buildBookingRescheduleUrl(workspaceSlug: string, pathSegments: string[] | undefined, token: string) {
  const path = buildPublicBookingPath(workspaceSlug, pathSegments)
  return `${path}?mode=reschedule&token=${encodeURIComponent(token)}`
}

export function buildBookingCancelUrl(workspaceSlug: string, pathSegments: string[] | undefined, token: string) {
  const path = buildPublicBookingPath(workspaceSlug, pathSegments)
  return `${path}?mode=cancel&token=${encodeURIComponent(token)}`
}
