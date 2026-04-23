// Evaluator
export { matchRules } from './evaluator/rule-matcher';
export type { StoredAutomationRule } from './evaluator/rule-matcher';
export { evaluateCondition, evaluateAllConditions } from './evaluator/condition-evaluator';
export type { Condition, Operator } from './evaluator/condition-evaluator';
export { checkRateLimit } from './evaluator/rate-limit-checker';
export type { RateLimitConfig, ExecutionCounts, RateLimitResult } from './evaluator/rate-limit-checker';

// Templates
export { BOOKING_CONFIRMATION_TEMPLATE } from './templates/booking-confirmation.template';
export { BOOKING_REMINDER_24H_TEMPLATE } from './templates/booking-reminder-24h.template';
export { BOOKING_REMINDER_2H_TEMPLATE } from './templates/booking-reminder-2h.template';
export { PAYMENT_RECEIPT_TEMPLATE } from './templates/payment-receipt.template';
export { NO_SHOW_REBOOK_TEMPLATE } from './templates/no-show-rebook.template';

// Actions
export { executeSendEmail } from './actions/send-email.action';
export { executeSendSms } from './actions/send-sms.action';
export { executeSendWhatsapp } from './actions/send-whatsapp.action';
export { executeAddTag } from './actions/add-tag.action';
export { executeCreateInvoice } from './actions/create-invoice.action';
export { executeCallWebhook } from './actions/call-webhook.action';

// Types
export * from './types';
