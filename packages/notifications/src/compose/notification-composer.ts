/**
 * Composes notification content from event data and template variables.
 */

export interface NotificationComposition {
  channel: 'email' | 'sms' | 'whatsapp';
  recipient: string;
  subject?: string;
  body: string;
  html?: string;
  templateId?: string;
  variables: Record<string, string>;
}

export function composeBookingConfirmation(vars: {
  clientName: string; clientEmail: string; eventTypeName: string;
  bookingDate: string; bookingTime: string; bookingReference: string;
  businessName: string; rescheduleLink?: string; cancelLink?: string;
}): NotificationComposition {
  return {
    channel: 'email',
    recipient: vars.clientEmail,
    subject: `Booking Confirmed — ${vars.eventTypeName}`,
    body: `Hi ${vars.clientName}, your booking for ${vars.eventTypeName} on ${vars.bookingDate} at ${vars.bookingTime} has been confirmed. Reference: ${vars.bookingReference}`,
    templateId: 'booking-confirmation',
    variables: vars,
  };
}

export function composeBookingReminder(vars: {
  clientName: string; clientEmail: string; eventTypeName: string;
  bookingDate: string; bookingTime: string; hoursUntil: string;
}): NotificationComposition {
  return {
    channel: 'email',
    recipient: vars.clientEmail,
    subject: `Reminder: ${vars.eventTypeName} in ${vars.hoursUntil}`,
    body: `Hi ${vars.clientName}, this is a reminder that your ${vars.eventTypeName} session is coming up on ${vars.bookingDate} at ${vars.bookingTime}.`,
    templateId: 'booking-reminder',
    variables: vars,
  };
}

export function composePaymentReceipt(vars: {
  clientName: string; clientEmail: string; amount: string;
  currency: string; eventTypeName: string; bookingReference: string;
}): NotificationComposition {
  return {
    channel: 'email',
    recipient: vars.clientEmail,
    subject: `Payment Receipt — ${vars.currency} ${vars.amount}`,
    body: `Hi ${vars.clientName}, we received your payment of ${vars.currency} ${vars.amount} for ${vars.eventTypeName}. Reference: ${vars.bookingReference}.`,
    templateId: 'payment-receipt',
    variables: vars,
  };
}
