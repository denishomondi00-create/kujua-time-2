import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

/**
 * IndexesBootstrap
 *
 * Ensures all required indexes exist on application startup.
 * Separates index definitions by category per the architecture:
 *   - TTL indexes for temporary data
 *   - Unique indexes for identity and dedup
 *   - Reporting indexes for read-heavy aggregation
 *   - Search indexes for text and prefix lookups
 *
 * Runs once on module init. Safe to run repeatedly (createIndex is idempotent).
 */
@Injectable()
export class IndexesBootstrap implements OnModuleInit {
  private readonly logger = new Logger(IndexesBootstrap.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    this.logger.log('Bootstrapping MongoDB indexes...');

    try {
      await Promise.all([
        this.createTTLIndexes(),
        this.createUniqueIndexes(),
        this.createReportingIndexes(),
        this.createSearchIndexes(),
      ]);
      this.logger.log('All indexes bootstrapped successfully.');
    } catch (error) {
      this.logger.error(`Index bootstrap failed: ${(error as Error).message}`);
      // Non-fatal: app can still run with degraded query performance
    }
  }

  /**
   * TTL indexes for auto-expiring temporary documents.
   * Per architecture: booking_holds, password_reset_tokens,
   * email_verification_tokens, oauth_state_tokens,
   * idempotency_keys, ephemeral_checkout_sessions.
   *
   * Never TTL: bookings, clients, payments, invoices, audit_logs.
   */
  private async createTTLIndexes() {
    const db = this.connection.db;
    if (!db) return;

    const ttlSpecs: Array<{ collection: string; field: string; expireAfterSeconds: number }> = [
      { collection: 'booking_holds', field: 'expiresAt', expireAfterSeconds: 0 },
      { collection: 'password_reset_tokens', field: 'expiresAt', expireAfterSeconds: 0 },
      { collection: 'email_verification_tokens', field: 'expiresAt', expireAfterSeconds: 0 },
      { collection: 'oauth_state_tokens', field: 'expiresAt', expireAfterSeconds: 0 },
      { collection: 'idempotency_keys', field: 'createdAt', expireAfterSeconds: 86_400 }, // 24h
      { collection: 'ephemeral_checkout_sessions', field: 'expiresAt', expireAfterSeconds: 0 },
    ];

    for (const spec of ttlSpecs) {
      try {
        await db.collection(spec.collection).createIndex(
          { [spec.field]: 1 },
          { expireAfterSeconds: spec.expireAfterSeconds, background: true },
        );
      } catch (error) {
        this.logger.warn(`TTL index on ${spec.collection}.${spec.field}: ${(error as Error).message}`);
      }
    }

    this.logger.debug(`TTL indexes: ${ttlSpecs.length} processed`);
  }

  /**
   * Unique indexes for identity dedup and business constraints.
   */
  private async createUniqueIndexes() {
    const db = this.connection.db;
    if (!db) return;

    const uniqueSpecs: Array<{ collection: string; keys: Record<string, 1 | -1>; options?: Record<string, any> }> = [
      { collection: 'users', keys: { email: 1 } },
      { collection: 'workspaces', keys: { slug: 1 } },
      { collection: 'workspace_members', keys: { workspaceId: 1, userId: 1 } },
      { collection: 'connected_calendars', keys: { workspaceId: 1, providerAccountId: 1 } },
      { collection: 'event_types', keys: { workspaceId: 1, slug: 1 } },
      { collection: 'booking_pages', keys: { workspaceSlug: 1 } },
      { collection: 'idempotency_keys', keys: { key: 1 } },
      { collection: 'api_keys', keys: { hashedKey: 1 } },
      {
        collection: 'clients',
        keys: { workspaceId: 1, email: 1 },
        options: { partialFilterExpression: { email: { $exists: true, $ne: null } } },
      },
    ];

    for (const spec of uniqueSpecs) {
      try {
        await db.collection(spec.collection).createIndex(spec.keys, {
          unique: true,
          background: true,
          ...spec.options,
        });
      } catch (error) {
        this.logger.warn(
          `Unique index on ${spec.collection}: ${(error as Error).message}`,
        );
      }
    }

    this.logger.debug(`Unique indexes: ${uniqueSpecs.length} processed`);
  }

  /**
   * Reporting indexes for dashboard queries, aggregation pipelines, and listing pages.
   */
  private async createReportingIndexes() {
    const db = this.connection.db;
    if (!db) return;

    const reportingSpecs: Array<{ collection: string; keys: Record<string, 1 | -1> }> = [
      // Bookings queries
      { collection: 'bookings', keys: { workspaceId: 1, status: 1, startAt: -1 } },
      { collection: 'bookings', keys: { workspaceId: 1, eventTypeId: 1, startAt: -1 } },
      { collection: 'bookings', keys: { workspaceId: 1, clientId: 1, startAt: -1 } },
      { collection: 'bookings', keys: { publicToken: 1 } },

      // Payments
      { collection: 'payments', keys: { workspaceId: 1, status: 1, createdAt: -1 } },
      { collection: 'payments', keys: { bookingId: 1 } },
      { collection: 'payment_attempts', keys: { providerRef: 1 } },

      // Invoices
      { collection: 'invoices', keys: { workspaceId: 1, status: 1, createdAt: -1 } },
      { collection: 'invoices', keys: { clientId: 1, createdAt: -1 } },

      // Clients
      { collection: 'clients', keys: { workspaceId: 1, createdAt: -1 } },
      { collection: 'clients', keys: { workspaceId: 1, lifecycleStage: 1 } },

      // Domain events outbox
      { collection: 'domain_events', keys: { published: 1, createdAt: 1 } },

      // Automation executions
      { collection: 'automation_executions', keys: { workspaceId: 1, status: 1, createdAt: -1 } },
      { collection: 'automation_executions', keys: { automationRuleId: 1, createdAt: -1 } },

      // Notification logs
      { collection: 'notification_logs', keys: { workspaceId: 1, channel: 1, createdAt: -1 } },

      // Audit logs
      { collection: 'audit_logs', keys: { workspaceId: 1, action: 1, createdAt: -1 } },
      { collection: 'audit_logs', keys: { userId: 1, createdAt: -1 } },

      // Calendar sync
      { collection: 'external_calendar_events', keys: { connectedCalendarId: 1, startAt: 1, endAt: 1 } },
      { collection: 'calendar_sync_states', keys: { connectedCalendarId: 1 } },

      // Outgoing webhooks
      { collection: 'outgoing_webhooks', keys: { workspaceId: 1, event: 1, createdAt: -1 } },
    ];

    for (const spec of reportingSpecs) {
      try {
        await db.collection(spec.collection).createIndex(spec.keys, { background: true });
      } catch (error) {
        this.logger.warn(
          `Reporting index on ${spec.collection}: ${(error as Error).message}`,
        );
      }
    }

    this.logger.debug(`Reporting indexes: ${reportingSpecs.length} processed`);
  }

  /**
   * Search indexes for text search and prefix lookups.
   */
  private async createSearchIndexes() {
    const db = this.connection.db;
    if (!db) return;

    const searchSpecs: Array<{
      collection: string;
      keys: Record<string, 1 | -1 | 'text'>;
      options?: Record<string, any>;
    }> = [
      {
        collection: 'clients',
        keys: { name: 'text', email: 'text', phone: 'text' },
        options: { weights: { name: 10, email: 5, phone: 3 }, name: 'clients_text_search' },
      },
      {
        collection: 'bookings',
        keys: { title: 'text' },
        options: { name: 'bookings_text_search' },
      },
    ];

    for (const spec of searchSpecs) {
      try {
        await db.collection(spec.collection).createIndex(spec.keys as any, {
          background: true,
          ...spec.options,
        });
      } catch (error) {
        this.logger.warn(
          `Search index on ${spec.collection}: ${(error as Error).message}`,
        );
      }
    }

    this.logger.debug(`Search indexes: ${searchSpecs.length} processed`);
  }
}
