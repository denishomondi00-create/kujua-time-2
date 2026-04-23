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

const ACCESS_COOKIE = "kt_access_token"
const REFRESH_COOKIE = "kt_refresh_token"
const WORKSPACE_COOKIE = "kt_workspace_id"

export async function getServerSession(): Promise<Session> {
  const store = await cookies()
  return {
    accessToken: store.get(ACCESS_COOKIE)?.value,
    refreshToken: store.get(REFRESH_COOKIE)?.value,
    user: store.get(ACCESS_COOKIE)?.value
      ? {
          id: "current-user",
          email: "workspace@kujuatime.dev",
          workspaceId: store.get(WORKSPACE_COOKIE)?.value,
          roles: ["owner"],
        }
      : undefined,
  }
}

export function getBrowserAccessToken() {
  if (typeof document === "undefined") return undefined
  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${ACCESS_COOKIE}=`))
    ?.split("=")[1]
}

export function isAuthenticated(session?: Session | null) {
  return Boolean(session?.accessToken)
}
