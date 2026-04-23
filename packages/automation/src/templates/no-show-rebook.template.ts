import type { TemplateVariables } from '../types';

export const NO_SHOW_REBOOK_TEMPLATE = {
  slug: 'no-show-rebook',
  name: 'No-Show Rebook Prompt',
  description: 'Sent after a client is marked as a no-show to encourage rebooking.',
  category: 'followup' as const,
  triggerEvent: 'booking.no_show',
  defaultTiming: { delayMinutes: 60 },

  renderSubject(vars: TemplateVariables): string {
    return `We missed you — rebook your ${vars.eventTypeName} session`;
  },

  renderBody(vars: TemplateVariables): string {
    return [
      `Hi ${vars.clientName},`,
      '',
      `We noticed you weren\u2019t able to make your ${vars.eventTypeName} session today.`,
      `No worries — things happen!`,
      '',
      vars.bookingLink ? `You can rebook at a time that works: ${vars.bookingLink}` : '',
      '',
      `We\u2019d love to see you next time.`,
      `— ${vars.businessName}`,
    ].filter(Boolean).join('\n');
  },
};
