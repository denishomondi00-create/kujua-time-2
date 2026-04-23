/**
 * Canonical collection name constants.
 * Always reference these instead of hardcoding strings.
 */
export const COLLECTIONS = {
  // Identity
  USERS: 'users',
  SESSIONS: 'sessions',
  PASSWORD_RESET_TOKENS: 'password_reset_tokens',
  EMAIL_VERIFICATION_TOKENS: 'email_verification_tokens',
  OAUTH_STATE_TOKENS: 'oauth_state_tokens',

  // Workspace
  WORKSPACES: 'workspaces',
  WORKSPACE_MEMBERS: 'workspace_members',
  WORKSPACE_BRANDING: 'workspace_branding',
  API_KEYS: 'api_keys',

  // Scheduling
  BOOKING_PAGES: 'booking_pages',
  EVENT_TYPES: 'event_types',
  AVAILABILITY_RULES: 'availability_rules',
  AVAILABILITY_EXCEPTIONS: 'availability_exceptions',
  BOOKING_HOLDS: 'booking_holds',
  BOOKINGS: 'bookings',
  BOOKING_ATTENDEES: 'booking_attendees',
  MEETING_LOCATIONS: 'meeting_locations',

  // CRM
  CLIENTS: 'clients',
  CLIENT_NOTES: 'client_notes',
  CLIENT_TAGS: 'client_tags',
  FORMS: 'forms',
  FORM_RESPONSES: 'form_responses',
  FILES: 'files',

  // Calendar
  CONNECTED_CALENDARS: 'connected_calendars',
  CALENDAR_SYNC_STATES: 'calendar_sync_states',
  EXTERNAL_CALENDAR_EVENTS: 'external_calendar_events',

  // Payments
  PAYMENT_INTENTS_INTERNAL: 'payment_intents_internal',
  PAYMENTS: 'payments',
  INVOICES: 'invoices',
  PACKAGE_PASSES: 'package_passes',
  PACKAGE_TRANSACTIONS: 'package_transactions',
  EPHEMERAL_CHECKOUT_SESSIONS: 'ephemeral_checkout_sessions',

  // Automation
  AUTOMATION_RULES: 'automation_rules',
  AUTOMATION_TEMPLATES: 'automation_templates',
  AUTOMATION_EXECUTIONS: 'automation_executions',
  DOMAIN_EVENTS: 'domain_events',
  OUTGOING_WEBHOOKS: 'outgoing_webhooks',
  NOTIFICATION_LOGS: 'notification_logs',

  // System
  AUDIT_LOGS: 'audit_logs',
  IDEMPOTENCY_KEYS: 'idempotency_keys',
  RATE_LIMIT_COUNTERS: 'rate_limit_counters',
  FEATURE_FLAGS: 'feature_flags',
  REPORT_SNAPSHOTS: 'report_snapshots',
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
