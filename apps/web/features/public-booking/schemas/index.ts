import { z } from 'zod'

export const publicSlotSchema = z.object({
  startAt: z.string(),
  endAt: z.string(),
  timezone: z.string(),
  available: z.boolean().default(true),
  label: z.string().optional(),
})

export const publicBookingPageModelSchema = z.object({
  workspace: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    logoUrl: z.string().url().optional().nullable(),
    accentColor: z.string().optional().nullable(),
  }),
  eventType: z.object({
    id: z.string(),
    name: z.string(),
    summary: z.string(),
    durationMinutes: z.number().int().positive(),
    paymentRequired: z.boolean().default(false),
    paymentLabel: z.string(),
    meetingLocations: z.array(z.string()).default([]),
    intakeFields: z.array(z.object({
      id: z.string(),
      label: z.string(),
      type: z.enum(['short_text', 'long_text', 'email', 'phone', 'number', 'select', 'multi_select', 'checkbox', 'date']),
      required: z.boolean().default(false),
      options: z.array(z.string()).default([]),
      helpText: z.string().optional().nullable(),
      placeholder: z.string().optional().nullable(),
    })).default([]),
  }),
  initialSlots: z.array(publicSlotSchema).default([]),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
  policies: z.object({
    cancellation: z.string().optional().nullable(),
    reschedule: z.string().optional().nullable(),
  }).default({}),
})

export const publicBookingHoldSchema = z.object({
  id: z.string(),
  expiresAt: z.string(),
  slot: publicSlotSchema,
})

export const publicBookingLookupSchema = z.object({
  token: z.string(),
  status: z.enum(['confirmed', 'canceled', 'pending_payment']),
  clientName: z.string(),
  clientEmail: z.string().email(),
  eventName: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  timezone: z.string(),
})

export const createHoldInputSchema = z.object({
  publicEventId: z.string().min(1),
  slot: publicSlotSchema,
})

export const updateHoldInputSchema = z.object({
  clientName: z.string().trim().min(1, 'Name is required.'),
  clientEmail: z.string().trim().email('Enter a valid email address.'),
  clientPhone: z.string().trim().optional(),
  meetingLocation: z.string().trim().optional(),
  formValues: z.record(z.string(), z.unknown()).default({}),
})

export const createCheckoutInputSchema = z.object({
  holdId: z.string().min(1),
  provider: z.enum(['stripe', 'paystack']).optional(),
})

export const confirmFreeBookingInputSchema = z.object({
  holdId: z.string().min(1),
})

export const confirmPaidBookingInputSchema = z.object({
  paymentAttemptId: z.string().min(1),
})

export const reschedulePublicBookingInputSchema = z.object({
  slot: publicSlotSchema,
})

export const cancelPublicBookingInputSchema = z.object({
  reason: z.string().trim().max(500).optional(),
})

export type PublicSlot = z.infer<typeof publicSlotSchema>
export type PublicBookingPageModel = z.infer<typeof publicBookingPageModelSchema>
export type PublicBookingHold = z.infer<typeof publicBookingHoldSchema>
export type PublicBookingLookup = z.infer<typeof publicBookingLookupSchema>
export type CreateHoldInput = z.infer<typeof createHoldInputSchema>
export type UpdateHoldInput = z.infer<typeof updateHoldInputSchema>
export type CreateCheckoutInput = z.infer<typeof createCheckoutInputSchema>
export type ConfirmFreeBookingInput = z.infer<typeof confirmFreeBookingInputSchema>
export type ConfirmPaidBookingInput = z.infer<typeof confirmPaidBookingInputSchema>
export type ReschedulePublicBookingInput = z.infer<typeof reschedulePublicBookingInputSchema>
export type CancelPublicBookingInput = z.infer<typeof cancelPublicBookingInputSchema>
