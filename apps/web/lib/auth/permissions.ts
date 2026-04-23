export type WorkspaceRole = "owner" | "admin" | "manager" | "member" | "viewer"

const PERMISSIONS: Record<string, WorkspaceRole[]> = {
  bookings: ["owner", "admin", "manager", "member"] satisfies WorkspaceRole[],
  clients: ["owner", "admin", "manager", "member"] satisfies WorkspaceRole[],
  payments: ["owner", "admin", "manager"] satisfies WorkspaceRole[],
  automations: ["owner", "admin", "manager"] satisfies WorkspaceRole[],
  settings: ["owner", "admin"] satisfies WorkspaceRole[],
  team: ["owner", "admin"] satisfies WorkspaceRole[],
}

export type PermissionKey = keyof typeof PERMISSIONS

export function hasPermission(roles: string[] | undefined, permission: PermissionKey) {
  if (!roles?.length) return false
  const allowed = PERMISSIONS[permission]
  return roles.some((role) => allowed.includes(role as WorkspaceRole))
}

export function assertPermission(roles: string[] | undefined, permission: PermissionKey) {
  if (!hasPermission(roles, permission)) {
    throw new Error(`Missing permission: ${permission}`)
  }
}
