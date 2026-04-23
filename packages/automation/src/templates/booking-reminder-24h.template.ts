import type { TemplateVariables } from '../types';

export const BOOKING_REMINDER_24H_TEMPLATE = {
  slug: 'booking-reminder-24h',
  name: '24-Hour Booking Reminder',
  description: 'Sent 24 hours before a scheduled booking.',
  category: 'booking' as const,
  triggerEvent: 'booking.created',
  defaultTiming: { delayMinutes: -1440 },

  renderSubject(vars: TemplateVariables): string {
    return `Reminder: ${vars.eventTypeName} tomorrow with ${vars.businessName}`;
  },

  renderBody(vars: TemplateVariables): string {
    return [
      `Hi ${vars.clientName},`,
      '',
      `This is a friendly reminder that your ${vars.eventTypeName} session is tomorrow.`,
      '',
      `Date: ${vars.bookingDate}`,
      `Time: ${vars.bookingTime}`,
      `Reference: ${vars.bookingReference}`,
      '',
      vars.rescheduleLink ? `Need to reschedule? ${vars.rescheduleLink}` : '',
      '',
      `See you soon!`,
      `— ${vars.businessName}`,
    ].filter(Boolean).join('\n');
  },
};
