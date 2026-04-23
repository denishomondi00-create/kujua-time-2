import type { TemplateVariables } from '../types';

export const PAYMENT_RECEIPT_TEMPLATE = {
  slug: 'payment-receipt',
  name: 'Payment Receipt',
  description: 'Sent when a payment is successfully processed.',
  category: 'payment' as const,
  triggerEvent: 'payment.succeeded',
  defaultTiming: undefined,

  renderSubject(vars: TemplateVariables): string {
    return `Payment Receipt — ${vars.amount} ${vars.currency}`;
  },

  renderBody(vars: TemplateVariables): string {
    return [
      `Hi ${vars.clientName},`,
      '',
      `Your payment of ${vars.amount} ${vars.currency} has been received.`,
      '',
      `Service: ${vars.eventTypeName}`,
      `Date: ${vars.bookingDate}`,
      `Reference: ${vars.bookingReference}`,
      '',
      `Thank you for your payment!`,
      `— ${vars.businessName}`,
    ].filter(Boolean).join('\n');
  },
};
