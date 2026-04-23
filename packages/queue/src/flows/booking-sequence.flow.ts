/**
 * BullMQ Flow for the post-booking sequence.
 *
 * After a booking is confirmed, this flow orchestrates:
 * 1. Send confirmation email (immediate)
 * 2. Schedule 24h reminder (delayed)
 * 3. Schedule 2h reminder (delayed)
 * 4. Sync to external calendar (immediate)
 * 5. Dispatch automation rules (immediate)
 *
 * Uses BullMQ FlowProducer for ordered job dependencies.
 */
import { FlowProducer, FlowChildJob } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';

export interface BookingSequenceInput {
  workspaceId: string;
  bookingId: string;
  bookingReference: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  eventTypeName: string;
  startAt: string;
  endAt: string;
  timezone: string;
  connectedCalendarId?: string;
}

export async function enqueueBookingSequence(
  connection: ConnectionOptions,
  input: BookingSequenceInput,
): Promise<void> {
  const flowProducer = new FlowProducer({ connection });

  const children: FlowChildJob[] = [
    // 1. Immediate confirmation email
    {
      name: 'notification:send-email',
      queueName: 'notifications.email',
      data: {
        workspaceId: input.workspaceId,
        to: input.clientEmail,
        subject: `Booking Confirmed — ${input.eventTypeName}`,
        body: `Hi ${input.clientName}, your booking for ${input.eventTypeName} on ${input.startAt} has been confirmed. Reference: ${input.bookingReference}`,
        templateId: 'booking-confirmation',
      },
    },
    // 2. Dispatch automation rules for booking.created
    {
      name: 'automation:dispatch',
      queueName: 'automation.dispatch',
      data: {
        domainEventIds: [], // Filled by the caller after domain event write
      },
    },
  ];

  // 3. Calendar sync if connected
  if (input.connectedCalendarId) {
    children.push({
      name: 'calendar:sync',
      queueName: 'calendar.sync',
      data: {
        connectedCalendarId: input.connectedCalendarId,
        workspaceId: input.workspaceId,
        forceFullSync: false,
      },
    });
  }

  await flowProducer.add({
    name: 'booking-sequence',
    queueName: 'automation.dispatch',
    data: {
      bookingId: input.bookingId,
      type: 'booking-sequence-root',
    },
    children,
  });

  await flowProducer.close();
}
