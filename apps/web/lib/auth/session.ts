import { cookies } from "next/headers"

export type SessionUser = {
  id: string
  email: string
  workspaceId?: string
  roles: string[]
}

export type Session = {
  accessToken?: string
  refreshToken?: string
  user?: SessionUser
}

const ACCESS_COOKIES = ["access_token", "kt_access_token"] as const
const REFRESH_COOKIES = ["refresh_token", "kt_refresh_token"] as const
const WORKSPACE_COOKIES = ["workspace_id", "kt_workspace_id"] as const

function getFirstCookieValue(
  store: Pick<ReturnType<typeof cookies> extends Promise<infer T> ? T : never, "get">,
  names: readonly string[],
) {
  for (const name of names) {
    const value = store.get(name)?.value
    if (value) return value
  }

  return undefined
}

function getBrowserCookieValue(names: readonly string[]) {
  if (typeof document === "undefined") return undefined

  const entries = document.cookie.split("; ")

  for (const name of names) {
    const value = entries.find((entry) => entry.startsWith(`${name}=`))?.split("=")[1]
    if (value) return value
  }

  return undefined
}

export async function getServerSession(): Promise<Session> {
  const store = await cookies()
  const accessToken = getFirstCookieValue(store, ACCESS_COOKIES)
  const refreshToken = getFirstCookieValue(store, REFRESH_COOKIES)
  const workspaceId = getFirstCookieValue(store, WORKSPACE_COOKIES)

  return {
    accessToken,
    refreshToken,
    user: accessToken
      ? {
          id: "current-user",
          email: "workspace@kujuatime.dev",
          workspaceId,
          roles: ["owner"],
        }
      : undefined,
  }
}

export function getBrowserAccessToken() {
  return getBrowserCookieValue(ACCESS_COOKIES)
}

export function isAuthenticated(session?: Session | null) {
  return Boolean(session?.accessToken)
}
