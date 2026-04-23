import type { TemplateVariables } from '../types';

export const BOOKING_REMINDER_2H_TEMPLATE = {
  slug: 'booking-reminder-2h',
  name: '2-Hour Booking Reminder',
  description: 'Sent 2 hours before a scheduled booking.',
  category: 'booking' as const,
  triggerEvent: 'booking.created',
  defaultTiming: { delayMinutes: -120 },

  renderSubject(vars: TemplateVariables): string {
    return `Starting soon: ${vars.eventTypeName} in 2 hours`;
  },

  renderBody(vars: TemplateVariables): string {
    return [
      `Hi ${vars.clientName},`,
      '',
      `Your ${vars.eventTypeName} session starts in 2 hours.`,
      '',
      `Time: ${vars.bookingTime}`,
      `Reference: ${vars.bookingReference}`,
      '',
      `See you shortly!`,
      `— ${vars.businessName}`,
    ].filter(Boolean).join('\n');
  },
};
