import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, JobsOptions } from 'bullmq';
import { QUEUE_NAMES } from './bullmq.module';

/**
 * QueueRegistry
 *
 * Centralized access to all BullMQ queues.
 * Modules call queueRegistry.enqueue() instead of injecting individual queues.
 * Keeps queue names and job contracts in one place per architecture rules.
 */
@Injectable()
export class QueueRegistry {
  private readonly logger = new Logger(QueueRegistry.name);
  private readonly queues = new Map<string, Queue>();

  constructor(
    @InjectQueue(QUEUE_NAMES.AUTOMATION_DISPATCH) automationDispatch: Queue,
    @InjectQueue(QUEUE_NAMES.AUTOMATION_EXECUTE) automationExecute: Queue,
    @InjectQueue(QUEUE_NAMES.NOTIFICATIONS_EMAIL) notificationsEmail: Queue,
    @InjectQueue(QUEUE_NAMES.NOTIFICATIONS_SMS) notificationsSms: Queue,
    @InjectQueue(QUEUE_NAMES.NOTIFICATIONS_WHATSAPP) notificationsWhatsapp: Queue,
    @InjectQueue(QUEUE_NAMES.CALENDAR_SYNC) calendarSync: Queue,
    @InjectQueue(QUEUE_NAMES.PAYMENTS_RECONCILE) paymentsReconcile: Queue,
    @InjectQueue(QUEUE_NAMES.INVOICES_GENERATE) invoicesGenerate: Queue,
    @InjectQueue(QUEUE_NAMES.WEBHOOKS_DELIVER) webhooksDeliver: Queue,
    @InjectQueue(QUEUE_NAMES.ANALYTICS_PROJECT) analyticsProject: Queue,
    @InjectQueue(QUEUE_NAMES.CLEANUP_EXPIRY) cleanupExpiry: Queue,
  ) {
    this.queues.set(QUEUE_NAMES.AUTOMATION_DISPATCH, automationDispatch);
    this.queues.set(QUEUE_NAMES.AUTOMATION_EXECUTE, automationExecute);
    this.queues.set(QUEUE_NAMES.NOTIFICATIONS_EMAIL, notificationsEmail);
    this.queues.set(QUEUE_NAMES.NOTIFICATIONS_SMS, notificationsSms);
    this.queues.set(QUEUE_NAMES.NOTIFICATIONS_WHATSAPP, notificationsWhatsapp);
    this.queues.set(QUEUE_NAMES.CALENDAR_SYNC, calendarSync);
    this.queues.set(QUEUE_NAMES.PAYMENTS_RECONCILE, paymentsReconcile);
    this.queues.set(QUEUE_NAMES.INVOICES_GENERATE, invoicesGenerate);
    this.queues.set(QUEUE_NAMES.WEBHOOKS_DELIVER, webhooksDeliver);
    this.queues.set(QUEUE_NAMES.ANALYTICS_PROJECT, analyticsProject);
    this.queues.set(QUEUE_NAMES.CLEANUP_EXPIRY, cleanupExpiry);
  }

  /**
   * Enqueue a job to the specified queue.
   */
  async enqueue<T = any>(
    queueName: string,
    jobName: string,
    data: T,
    options?: JobsOptions,
  ) {
    const queue = this.queues.get(queueName);
    if (!queue) {
      throw new Error(`Queue "${queueName}" not registered.`);
    }

    const defaultOptions: JobsOptions = {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2_000 },
      removeOnComplete: { count: 1000, age: 86_400 },
      removeOnFail: { count: 5000 },
    };

    const job = await queue.add(jobName, data, { ...defaultOptions, ...options });
    this.logger.debug(`Enqueued ${queueName}/${jobName} → job ${job.id}`);
    return job;
  }

  /**
   * Enqueue a delayed job (e.g. 24h reminder, 2h reminder).
   */
  async enqueueDelayed<T = any>(
    queueName: string,
    jobName: string,
    data: T,
    delayMs: number,
    options?: JobsOptions,
  ) {
    return this.enqueue(queueName, jobName, data, { ...options, delay: delayMs });
  }

  // ─── Convenience methods for common automation jobs ──────────────────

  /** Dispatch domain event to automation engine. */
  async dispatchAutomation(payload: {
    eventName: string;
    workspaceId: string;
    entityId: string;
    entityType: string;
    data: Record<string, any>;
    occurredAt: string;
  }) {
    return this.enqueue(
      QUEUE_NAMES.AUTOMATION_DISPATCH,
      'dispatch',
      payload,
      { jobId: `dispatch:${payload.eventName}:${payload.entityId}:${Date.now()}` },
    );
  }

  /** Send an email notification. */
  async sendEmail(payload: {
    to: string;
    templateId: string;
    variables: Record<string, any>;
    workspaceId: string;
    bookingId?: string;
  }) {
    return this.enqueue(QUEUE_NAMES.NOTIFICATIONS_EMAIL, 'send-email', payload);
  }

  /** Queue a calendar sync job. */
  async syncCalendar(payload: {
    connectedCalendarId: string;
    workspaceId: string;
    mode: 'incremental' | 'full';
  }) {
    return this.enqueue(
      QUEUE_NAMES.CALENDAR_SYNC,
      'sync',
      payload,
      { jobId: `cal-sync:${payload.connectedCalendarId}` },
    );
  }

  /** Deliver an outgoing webhook. */
  async deliverWebhook(payload: {
    webhookId: string;
    workspaceId: string;
    event: string;
    data: Record<string, any>;
  }) {
    return this.enqueue(QUEUE_NAMES.WEBHOOKS_DELIVER, 'deliver', payload, {
      attempts: 5,
      backoff: { type: 'exponential', delay: 5_000 },
    });
  }

  /** Reconcile a payment after provider webhook. */
  async reconcilePayment(payload: {
    provider: 'stripe' | 'paystack';
    providerEventId: string;
    providerRef: string;
    workspaceId: string;
  }) {
    return this.enqueue(
      QUEUE_NAMES.PAYMENTS_RECONCILE,
      'reconcile',
      payload,
      { jobId: `pay-reconcile:${payload.providerRef}` },
    );
  }

  /** Generate an invoice PDF. */
  async generateInvoice(payload: {
    invoiceId: string;
    workspaceId: string;
  }) {
    return this.enqueue(QUEUE_NAMES.INVOICES_GENERATE, 'generate', payload);
  }

  /**
   * Get a queue instance for advanced operations (e.g. scheduler registration).
   */
  getQueue(queueName: string): Queue {
    const queue = this.queues.get(queueName);
    if (!queue) throw new Error(`Queue "${queueName}" not registered.`);
    return queue;
  }
}
