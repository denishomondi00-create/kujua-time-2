/**
 * Core automation domain types.
 */

export type DomainEventName =
  | 'booking.created'
  | 'booking.approved'
  | 'booking.canceled'
  | 'booking.rescheduled'
  | 'booking.completed'
  | 'booking.no_show'
  | 'payment.initiated'
  | 'payment.succeeded'
  | 'payment.failed'
  | 'payment.refunded'
  | 'invoice.created'
  | 'form.submitted'
  | 'client.created'
  | 'client.updated'
  | 'package.low_balance'
  | 'waitlist.promoted'
  | 'calendar.sync_requested'
  | 'calendar.sync_completed';

export type AutomationActionType =
  | 'send_email'
  | 'send_sms'
  | 'send_whatsapp'
  | 'add_tag'
  | 'remove_tag'
  | 'create_invoice'
  | 'update_client_field'
  | 'send_internal_notification'
  | 'call_webhook'
  | 'enqueue_followup'
  | 'promote_waitlist';

export interface AutomationContext {
  workspaceId: string;
  eventName: DomainEventName;
  payload: Record<string, unknown>;
  automationRuleId: string;
  executionId: string;
}

export interface ActionResult {
  actionType: AutomationActionType;
  status: 'success' | 'failed' | 'skipped';
  error?: string;
  executedAt: Date;
}

export interface AutomationRuleMatch {
  ruleId: string;
  ruleName: string;
  actions: Array<{
    type: AutomationActionType;
    config: Record<string, unknown>;
  }>;
  timing?: {
    delayMinutes?: number;
  };
}

export interface TemplateVariables {
  clientName?: string;
  clientEmail?: string;
  businessName?: string;
  eventTypeName?: string;
  bookingDate?: string;
  bookingTime?: string;
  bookingReference?: string;
  amount?: string;
  currency?: string;
  bookingLink?: string;
  rescheduleLink?: string;
  cancelLink?: string;
  [key: string]: string | undefined;
}
