/**
 * TTL index definitions.
 * Only applied to collections that hold temporary data.
 * NEVER apply TTL to: bookings, clients, payments, invoices,
 * automation executions, audit logs, notification logs.
 */
import { Connection } from 'mongoose';
import { getNativeDb } from './native-db';

export async function ensureTTLIndexes(conn: Connection): Promise<void> {
  const db = getNativeDb(conn);

  // booking_holds: expire uncompleted holds
  await db.collection('booking_holds').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: 'ttl_booking_holds_expiry' },
  );

  // password_reset_tokens
  await db.collection('password_reset_tokens').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: 'ttl_password_reset_tokens_expiry' },
  );

  // email_verification_tokens
  await db.collection('email_verification_tokens').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: 'ttl_email_verification_tokens_expiry' },
  );

  // oauth_state_tokens
  await db.collection('oauth_state_tokens').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: 'ttl_oauth_state_tokens_expiry' },
  );

  // idempotency_keys
  await db.collection('idempotency_keys').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: 'ttl_idempotency_keys_expiry' },
  );

  // ephemeral_checkout_sessions
  await db.collection('ephemeral_checkout_sessions').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: 'ttl_checkout_sessions_expiry' },
  );

  // sessions
  await db.collection('sessions').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: 'ttl_sessions_expiry' },
  );

  // rate_limit_counters
  await db.collection('rate_limit_counters').createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0, name: 'ttl_rate_limit_counters_expiry' },
  );
}
