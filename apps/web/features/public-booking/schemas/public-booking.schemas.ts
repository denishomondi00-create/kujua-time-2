import { z } from "zod"

export const publicSlotSchema = z.object({
  startAt: z.string(),
  endAt: z.string(),
  label: z.string(),
  available: z.boolean().default(true),
})

export const publicEventPricingSchema = z.object({
  currency: z.string().default("USD"),
  amountMinor: z.number().default(0),
  paymentMode: z.enum(["free", "full", "deposit"]).default("free"),
  depositAmountMinor: z.number().optional(),
})

export const publicEventModelSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().optional().default(""),
  durationMinutes: z.number().default(30),
  meetingSummary: z.string().default("Meeting link shared after confirmation."),
  locationLabel: z.string().default("Online"),
  pricing: publicEventPricingSchema,
})

export const bookingPageThemeSchema = z.object({
  accentColor: z.string().default("#0d4e5c"),
  accentSoft: z.string().default("#e87a3e"),
  coverImageUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  radius: z.string().default("1.5rem"),
  themeClassName: z.string().default("theme-teal"),
})

export const bookingTrustContentSchema = z.object({
  bullets: z.array(z.string()).default([]),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ).default([]),
  policies: z.array(
    z.object({
      title: z.string(),
      summary: z.string(),
    }),
  ).default([]),
})

export const publicWorkspaceSchema = z.object({
  id: z.string().default("workspace-demo"),
  slug: z.string(),
  name: z.string(),
  tagline: z.string().default("Branded scheduling and client workflows."),
  timezone: z.string().default("Africa/Nairobi"),
})

export const publicBookingPageModelSchema = z.object({
  workspace: publicWorkspaceSchema,
  theme: bookingPageThemeSchema,
  eventType: publicEventModelSchema,
  availabilitySnapshot: z.object({
    date: z.string(),
    timezone: z.string(),
    slots: z.array(publicSlotSchema).default([]),
  }),
  trust: bookingTrustContentSchema,
})

export const createHoldInputSchema = z.object({
  publicEventId: z.string(),
  timezone: z.string(),
  startAt: z.string(),
  endAt: z.string(),
})

export const bookingHoldSchema = z.object({
  id: z.string(),
  expiresAt: z.string(),
  publicEventId: z.string(),
  timezone: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  formCompleted: z.boolean().default(false),
  client: z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    notes: z.string().optional(),
  }).default({}),
})

export const updateHoldDetailsSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  answers: z.record(z.string(), z.unknown()).optional(),
})

export const paymentCheckoutSchema = z.object({
  checkoutUrl: z.string().url().optional(),
  paymentAttemptId: z.string(),
  provider: z.enum(["stripe", "paystack", "manual"]),
  status: z.enum(["pending", "processing", "succeeded"]).default("pending"),
})

export const confirmedBookingSchema = z.object({
  bookingId: z.string(),
  publicBookingToken: z.string(),
  status: z.enum(["confirmed", "pending_payment", "canceled"]).default("confirmed"),
  startAt: z.string(),
  endAt: z.string(),
  eventName: z.string(),
  clientName: z.string().optional(),
  clientEmail: z.string().optional(),
})

export const publicBookingLookupSchema = z.object({
  token: z.string(),
  booking: confirmedBookingSchema,
  slotOptions: z.array(publicSlotSchema).default([]),
})

export type PublicBookingPageModel = z.infer<typeof publicBookingPageModelSchema>
export type PublicSlot = z.infer<typeof publicSlotSchema>
export type BookingHold = z.infer<typeof bookingHoldSchema>
export type UpdateHoldDetailsInput = z.infer<typeof updateHoldDetailsSchema>
export type CreateHoldInput = z.infer<typeof createHoldInputSchema>
export type PaymentCheckout = z.infer<typeof paymentCheckoutSchema>
export type ConfirmedBooking = z.infer<typeof confirmedBookingSchema>
export type PublicBookingLookup = z.infer<typeof publicBookingLookupSchema>
