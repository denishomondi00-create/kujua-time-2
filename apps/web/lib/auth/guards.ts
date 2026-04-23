import { redirect } from "next/navigation"

import { getServerSession, isAuthenticated } from "@/lib/auth/session"
import { hasPermission, type PermissionKey } from "@/lib/auth/permissions"

export async function requireSession() {
  const session = await getServerSession()
  if (!isAuthenticated(session)) {
    redirect("/login")
  }

  return session
}

export async function requirePermission(permission: PermissionKey) {
  const session = await requireSession()
  if (!hasPermission(session.user?.roles, permission)) {
    redirect("/app")
  }

  return session
}
