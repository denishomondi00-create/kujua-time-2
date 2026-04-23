import { z } from 'zod';

export const createEventTypeSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),
  duration: z.number().int().min(5).max(480),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  isActive: z.boolean().default(true),
  requiresApproval: z.boolean().default(false),
  requiresPayment: z.boolean().default(false),
  price: z.number().min(0).optional(),
  currency: z.string().length(3).default('KES'),
  depositAmount: z.number().min(0).optional(),
  bufferBefore: z.number().int().min(0).max(120).default(0),
  bufferAfter: z.number().int().min(0).max(120).default(0),
  minNotice: z.number().int().min(0).default(60),
  maxBookingWindow: z.number().int().min(1).default(60),
  meetingLocations: z.array(z.object({
    type: z.enum(['in_person', 'zoom', 'google_meet', 'phone', 'whatsapp', 'custom']),
    value: z.string().optional(),
    instructions: z.string().optional(),
  })).default([]),
  formId: z.string().optional(),
});

export const updateEventTypeSchema = createEventTypeSchema.partial();

export type CreateEventTypeInput = z.infer<typeof createEventTypeSchema>;
export type UpdateEventTypeInput = z.infer<typeof updateEventTypeSchema>;
