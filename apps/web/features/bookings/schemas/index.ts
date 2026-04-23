import { z } from 'zod'

export const bookingStatusSchema = z.enum([
  'upcoming',
  'pending_approval',
  'completed',
  'canceled',
  'no_show',
])

export const bookingPaymentStatusSchema = z.enum([
  'unpaid',
  'partial',
  'paid',
  'refunded',
])

export const bookingQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional().default(''),
  status: bookingStatusSchema.optional(),
})

export const bookingListItemSchema = z.object({
  id: z.string(),
  reference: z.string(),
  clientName: z.string(),
  clientEmail: z.string().email().optional().or(z.literal('')),
  eventTypeName: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  timezone: z.string(),
  status: bookingStatusSchema,
  paymentStatus: bookingPaymentStatusSchema,
  amount: z.number().nullable().optional(),
  currency: z.string().default('USD'),
})

export const bookingTimelineItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string(),
  occurredAt: z.string(),
  description: z.string().optional(),
})

export const bookingDetailSchema = bookingListItemSchema.extend({
  notes: z.string().nullable().optional(),
  meetingLocation: z.string().nullable().optional(),
  formResponses: z.record(z.string(), z.unknown()).optional(),
  timeline: z.array(bookingTimelineItemSchema).default([]),
})

export const bookingListResponseSchema = z.object({
  items: z.array(bookingListItemSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
})

export const bookingActionSchema = z.object({
  reason: z.string().trim().max(500).optional(),
})

export const bookingRescheduleSchema = z.object({
  startAt: z.string().min(1, 'Choose a new start time.'),
  endAt: z.string().min(1, 'Choose a new end time.'),
  timezone: z.string().min(1, 'Timezone is required.'),
  reason: z.string().trim().max(500).optional(),
})

export type BookingStatus = z.infer<typeof bookingStatusSchema>
export type BookingPaymentStatus = z.infer<typeof bookingPaymentStatusSchema>
export type BookingListItem = z.infer<typeof bookingListItemSchema>
export type BookingDetail = z.infer<typeof bookingDetailSchema>
export type BookingListResponse = z.infer<typeof bookingListResponseSchema>
export type BookingQuery = z.infer<typeof bookingQuerySchema>
export type BookingActionInput = z.infer<typeof bookingActionSchema>
export type BookingRescheduleInput = z.infer<typeof bookingRescheduleSchema>
