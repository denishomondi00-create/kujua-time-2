/**
 * Multi-step post-session follow-up flow.
 * Triggered after a booking is marked as completed.
 * Sends: feedback request → rebook prompt (if no new booking within 7 days).
 */
import { FlowProducer, FlowChildJob } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export interface BookingFollowupInput {
  workspaceId: string;
  bookingId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  eventTypeName: string;
  bookingLink: string;
}

export async function enqueueBookingFollowup(
  connection: ConnectionOptions,
  input: BookingFollowupInput,
): Promise<void> {
  const flowProducer = new FlowProducer({ connection });

  const children: FlowChildJob[] = [
    // Immediate: Post-session feedback request
    {
      name: 'notification:send-email',
      queueName: 'notifications.email',
      data: {
        workspaceId: input.workspaceId,
        to: input.clientEmail,
        subject: `How was your ${input.eventTypeName} session?`,
        body: `Hi ${input.clientName}, we hope you enjoyed your ${input.eventTypeName} session. We'd love to hear your feedback!`,
        templateId: 'post-session-feedback',
      },
    },
    // Delayed: Rebook prompt after 7 days
    {
      name: 'notification:send-email',
      queueName: 'notifications.email',
      data: {
        workspaceId: input.workspaceId,
        to: input.clientEmail,
        subject: `Ready for another ${input.eventTypeName}?`,
        body: `Hi ${input.clientName}, it's been a while! Would you like to book another ${input.eventTypeName} session? ${input.bookingLink}`,
        templateId: 'rebook-prompt',
      },
      opts: { delay: 7 * 24 * 60 * 60_000 }, // 7 days
    },
  ];

  await flowProducer.add({
    name: 'booking-followup',
    queueName: 'automation.dispatch',
    data: { bookingId: input.bookingId, type: 'booking-followup-root' },
    children,
  });

  await flowProducer.close();
}
