import { z } from 'zod';

export const cancelBookingSchema = z.object({
  reason: z.string().max(1000).optional(),
  notifyClient: z.boolean().default(true),
});

export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;

export const rescheduleBookingSchema = z.object({
  newStartAt: z.string().datetime(),
  newEndAt: z.string().datetime(),
  reason: z.string().max(1000).optional(),
  notifyClient: z.boolean().default(true),
});

export type RescheduleBookingInput = z.infer<typeof rescheduleBookingSchema>;
