export interface NotificationTemplate {
  id: string;
  name: string;
  channel: 'email' | 'sms' | 'whatsapp';
  subjectTemplate?: string;
  bodyTemplate: string;
  variables: string[];
}

export const BUILT_IN_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'booking-confirmation', name: 'Booking Confirmation', channel: 'email',
    subjectTemplate: 'Booking Confirmed — {{eventTypeName}}',
    bodyTemplate: 'Hi {{clientName}}, your booking for {{eventTypeName}} on {{bookingDate}} at {{bookingTime}} has been confirmed. Reference: {{bookingReference}}',
    variables: ['clientName', 'eventTypeName', 'bookingDate', 'bookingTime', 'bookingReference'],
  },
  {
    id: 'booking-reminder', name: 'Booking Reminder', channel: 'email',
    subjectTemplate: 'Reminder: {{eventTypeName}} in {{hoursUntil}}',
    bodyTemplate: 'Hi {{clientName}}, your {{eventTypeName}} is coming up on {{bookingDate}} at {{bookingTime}}.',
    variables: ['clientName', 'eventTypeName', 'bookingDate', 'bookingTime', 'hoursUntil'],
  },
  {
    id: 'payment-receipt', name: 'Payment Receipt', channel: 'email',
    subjectTemplate: 'Payment Receipt — {{currency}} {{amount}}',
    bodyTemplate: 'Hi {{clientName}}, we received your payment of {{currency}} {{amount}} for {{eventTypeName}}.',
    variables: ['clientName', 'amount', 'currency', 'eventTypeName'],
  },
  {
    id: 'cancellation-confirmation', name: 'Cancellation Confirmation', channel: 'email',
    subjectTemplate: 'Booking Cancelled — {{eventTypeName}}',
    bodyTemplate: 'Hi {{clientName}}, your booking for {{eventTypeName}} on {{bookingDate}} has been cancelled.',
    variables: ['clientName', 'eventTypeName', 'bookingDate'],
  },
  {
    id: 'no-show-followup', name: 'No-Show Follow-up', channel: 'email',
    subjectTemplate: 'We missed you — {{eventTypeName}}',
    bodyTemplate: 'Hi {{clientName}}, it looks like you missed your {{eventTypeName}} session. Would you like to rebook? {{bookingLink}}',
    variables: ['clientName', 'eventTypeName', 'bookingLink'],
  },
];

export function findTemplate(id: string): NotificationTemplate | undefined {
  return BUILT_IN_TEMPLATES.find((t) => t.id === id);
}
