import type { TemplateVariables } from '../types';

export const BOOKING_CONFIRMATION_TEMPLATE = {
  slug: 'booking-confirmation',
  name: 'Booking Confirmation',
  description: 'Sent immediately when a booking is confirmed.',
  category: 'booking' as const,
  triggerEvent: 'booking.created',
  defaultTiming: undefined,

  renderSubject(vars: TemplateVariables): string {
    return `Booking Confirmed — ${vars.eventTypeName} with ${vars.businessName}`;
  },

  renderBody(vars: TemplateVariables): string {
    return [
      `Hi ${vars.clientName},`,
      '',
      `Your booking for ${vars.eventTypeName} has been confirmed.`,
      '',
      `Date: ${vars.bookingDate}`,
      `Time: ${vars.bookingTime}`,
      `Reference: ${vars.bookingReference}`,
      '',
      vars.rescheduleLink ? `Need to reschedule? ${vars.rescheduleLink}` : '',
      vars.cancelLink ? `Need to cancel? ${vars.cancelLink}` : '',
      '',
      `Looking forward to meeting you!`,
      `— ${vars.businessName}`,
    ].filter(Boolean).join('\n');
  },
};
