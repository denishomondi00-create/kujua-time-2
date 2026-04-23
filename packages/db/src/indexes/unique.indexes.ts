/**
 * Unique index definitions across all collections.
 * Run at bootstrap to enforce data integrity constraints.
 */
import { Connection } from 'mongoose';

export async function ensureUniqueIndexes(conn: Connection): Promise<void> {
  const db = conn.db;

  // Identity
  await db.collection('users').createIndex(
    { email: 1 },
    { unique: true, name: 'unique_user_email' },
  );

  // Workspace
  await db.collection('workspaces').createIndex(
    { slug: 1 },
    { unique: true, name: 'unique_workspace_slug' },
  );

  await db.collection('workspace_members').createIndex(
    { workspaceId: 1, userId: 1 },
    { unique: true, name: 'unique_workspace_member' },
  );

  await db.collection('api_keys').createIndex(
    { keyHash: 1 },
    { unique: true, name: 'unique_api_key_hash' },
  );

  // Scheduling
  await db.collection('booking_pages').createIndex(
    { workspaceId: 1, slug: 1 },
    { unique: true, name: 'unique_booking_page_slug' },
  );

  await db.collection('event_types').createIndex(
    { workspaceId: 1, slug: 1 },
    { unique: true, name: 'unique_event_type_slug' },
  );

  await db.collection('bookings').createIndex(
    { reference: 1 },
    { unique: true, name: 'unique_booking_reference' },
  );

  await db.collection('bookings').createIndex(
    { publicBookingToken: 1 },
    { unique: true, sparse: true, name: 'unique_booking_public_token' },
  );

  // CRM
  await db.collection('clients').createIndex(
    { workspaceId: 1, email: 1 },
    { unique: true, name: 'unique_client_email_per_workspace' },
  );

  await db.collection('client_tags').createIndex(
    { workspaceId: 1, name: 1 },
    { unique: true, name: 'unique_client_tag_per_workspace' },
  );

  // Calendar
  await db.collection('connected_calendars').createIndex(
    { userId: 1, provider: 1, calendarId: 1 },
    { unique: true, name: 'unique_connected_calendar' },
  );

  await db.collection('calendar_sync_states').createIndex(
    { connectedCalendarId: 1 },
    { unique: true, name: 'unique_sync_state_per_calendar' },
  );

  await db.collection('external_calendar_events').createIndex(
    { connectedCalendarId: 1, providerEventId: 1 },
    { unique: true, name: 'unique_external_event' },
  );

  // Payments
  await db.collection('payments').createIndex(
    { providerPaymentId: 1 },
    { unique: true, name: 'unique_provider_payment_id' },
  );

  await db.collection('invoices').createIndex(
    { workspaceId: 1, invoiceNumber: 1 },
    { unique: true, name: 'unique_invoice_number_per_workspace' },
  );

  // System
  await db.collection('idempotency_keys').createIndex(
    { key: 1 },
    { unique: true, name: 'unique_idempotency_key' },
  );

  await db.collection('feature_flags').createIndex(
    { key: 1 },
    { unique: true, name: 'unique_feature_flag_key' },
  );

  await db.collection('automation_templates').createIndex(
    { slug: 1 },
    { unique: true, name: 'unique_automation_template_slug' },
  );
}
