export type Permission =
  | 'bookings:read' | 'bookings:write' | 'bookings:delete'
  | 'clients:read' | 'clients:write' | 'clients:delete'
  | 'event_types:read' | 'event_types:write' | 'event_types:delete'
  | 'forms:read' | 'forms:write'
  | 'payments:read' | 'payments:write' | 'payments:refund'
  | 'invoices:read' | 'invoices:write'
  | 'automations:read' | 'automations:write'
  | 'team:read' | 'team:manage'
  | 'settings:read' | 'settings:write'
  | 'reports:read' | 'reports:export'
  | 'webhooks:manage'
  | 'admin:full';

type Role = 'owner' | 'admin' | 'member' | 'viewer';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  viewer: ['bookings:read', 'clients:read', 'event_types:read', 'forms:read', 'payments:read', 'invoices:read', 'reports:read'],
  member: [
    'bookings:read', 'bookings:write', 'clients:read', 'clients:write',
    'event_types:read', 'event_types:write', 'forms:read', 'forms:write',
    'payments:read', 'invoices:read', 'invoices:write',
    'automations:read', 'reports:read',
  ],
  admin: [
    'bookings:read', 'bookings:write', 'bookings:delete',
    'clients:read', 'clients:write', 'clients:delete',
    'event_types:read', 'event_types:write', 'event_types:delete',
    'forms:read', 'forms:write',
    'payments:read', 'payments:write', 'payments:refund',
    'invoices:read', 'invoices:write',
    'automations:read', 'automations:write',
    'team:read', 'team:manage',
    'settings:read', 'settings:write',
    'reports:read', 'reports:export',
    'webhooks:manage',
  ],
  owner: ['admin:full'],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  if (role === 'owner') return true;
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getPermissions(role: Role): Permission[] {
  if (role === 'owner') {
    return Object.values(ROLE_PERMISSIONS).flat().filter((v, i, a) => a.indexOf(v) === i);
  }
  return ROLE_PERMISSIONS[role] ?? [];
}
