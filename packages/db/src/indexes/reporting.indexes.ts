/**
 * Reporting and analytics indexes for efficient dashboard queries.
 */
import { Connection } from 'mongoose';
import { getNativeDb } from './native-db';

export async function ensureReportingIndexes(conn: Connection): Promise<void> {
  const db = getNativeDb(conn);

  // Bookings: time-range queries for reports
  await db.collection('bookings').createIndex(
    { workspaceId: 1, startAt: 1 },
    { name: 'report_bookings_by_time' },
  );

  await db.collection('bookings').createIndex(
    { workspaceId: 1, status: 1, startAt: 1 },
    { name: 'report_bookings_by_status_time' },
  );

  await db.collection('bookings').createIndex(
    { workspaceId: 1, eventTypeId: 1, startAt: 1 },
    { name: 'report_bookings_by_event_type' },
  );

  // Payments: revenue reports
  await db.collection('payments').createIndex(
    { workspaceId: 1, status: 1, createdAt: -1 },
    { name: 'report_payments_by_status' },
  );

  await db.collection('payments').createIndex(
    { workspaceId: 1, paidAt: 1 },
    { name: 'report_revenue_by_date', sparse: true },
  );

  // Clients: lifecycle and activity
  await db.collection('clients').createIndex(
    { workspaceId: 1, lastBookingAt: -1 },
    { name: 'report_clients_by_activity' },
  );

  await db.collection('clients').createIndex(
    { workspaceId: 1, totalRevenue: -1 },
    { name: 'report_clients_by_revenue' },
  );

  // Automation executions: performance reports
  await db.collection('automation_executions').createIndex(
    { workspaceId: 1, status: 1, createdAt: -1 },
    { name: 'report_automation_executions' },
  );

  // Notification logs: delivery reports
  await db.collection('notification_logs').createIndex(
    { workspaceId: 1, channel: 1, createdAt: -1 },
    { name: 'report_notifications_by_channel' },
  );

  // Invoices: billing reports
  await db.collection('invoices').createIndex(
    { workspaceId: 1, status: 1, issuedAt: -1 },
    { name: 'report_invoices_by_status' },
  );
}
