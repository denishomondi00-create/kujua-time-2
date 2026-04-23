import { NextRequest, NextResponse } from "next/server"

const DASHBOARD_PREFIX = "/app"
const AUTH_ROUTES = new Set(["/login", "/signup"])

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get("kt_access_token")?.value
  const workspaceId = request.cookies.get("kt_workspace_id")?.value

  if (pathname.startsWith(DASHBOARD_PREFIX) && !accessToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (accessToken && AUTH_ROUTES.has(pathname)) {
    return NextResponse.redirect(new URL("/app", request.url))
  }

  const requestHeaders = new Headers(request.headers)
  if (workspaceId) {
    requestHeaders.set("x-workspace-id", workspaceId)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup"],
}
