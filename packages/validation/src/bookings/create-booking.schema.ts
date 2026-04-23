import { z } from 'zod';

export const createBookingSchema = z.object({
  eventTypeId: z.string().min(1),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  timezone: z.string().min(1),
  clientName: z.string().min(1).max(200).trim(),
  clientEmail: z.string().email().toLowerCase().trim(),
  clientPhone: z.string().optional(),
  meetingLocation: z.object({
    type: z.enum(['in_person', 'zoom', 'google_meet', 'phone', 'whatsapp', 'custom']),
    value: z.string().optional(),
    instructions: z.string().optional(),
  }).optional(),
  formResponses: z.record(z.unknown()).optional(),
  notes: z.string().max(2000).optional(),
  source: z.enum(['booking_page', 'embed', 'api', 'manual']).default('booking_page'),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
