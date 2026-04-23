/**
 * Text search and lookup indexes for user-facing search features.
 */
import { Connection } from 'mongoose';

export async function ensureSearchIndexes(conn: Connection): Promise<void> {
  const db = conn.db;

  // Client search by name and email
  await db.collection('clients').createIndex(
    { firstName: 'text', lastName: 'text', email: 'text' },
    { name: 'search_clients_text', weights: { email: 3, firstName: 2, lastName: 2 } },
  );

  // Booking search by reference and client info
  await db.collection('bookings').createIndex(
    { reference: 'text', clientName: 'text', clientEmail: 'text' },
    { name: 'search_bookings_text' },
  );

  // Event type search by name
  await db.collection('event_types').createIndex(
    { name: 'text', description: 'text' },
    { name: 'search_event_types_text' },
  );

  // Audit log lookup
  await db.collection('audit_logs').createIndex(
    { workspaceId: 1, resource: 1, action: 1, createdAt: -1 },
    { name: 'search_audit_by_resource_action' },
  );

  // Domain event dispatch lookup
  await db.collection('domain_events').createIndex(
    { published: 1, createdAt: 1 },
    { name: 'search_unpublished_domain_events' },
  );

  // Outgoing webhook retry lookup
  await db.collection('outgoing_webhooks').createIndex(
    { status: 1, attempts: 1, createdAt: 1 },
    { name: 'search_pending_webhooks' },
  );
}
