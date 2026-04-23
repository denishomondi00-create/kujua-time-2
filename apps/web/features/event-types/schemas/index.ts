import { z } from 'zod'

export const meetingLocationTypeSchema = z.enum([
  'in_person',
  'zoom',
  'google_meet',
  'phone',
  'whatsapp',
  'custom',
])

export const eventTypeStatusSchema = z.enum(['draft', 'published', 'archived'])

export const eventTypeListQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional().default(''),
  status: eventTypeStatusSchema.optional(),
})

export const eventTypePaymentSchema = z.object({
  required: z.boolean().default(false),
  mode: z.enum(['free', 'deposit', 'full']).default('free'),
  amount: z.number().nonnegative().optional().nullable(),
  currency: z.string().default('USD'),
})

export const eventTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  durationMinutes: z.number().int().positive(),
  status: eventTypeStatusSchema,
  color: z.string().optional().nullable(),
  payment: eventTypePaymentSchema,
  locations: z.array(meetingLocationTypeSchema).default([]),
  requiresApproval: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const eventTypeListResponseSchema = z.object({
  items: z.array(eventTypeSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
})

export const eventTypeCreateSchema = z.object({
  name: z.string().trim().min(1, 'Event name is required.'),
  slug: z.string().trim().min(1, 'Event slug is required.'),
  description: z.string().trim().max(5_000).optional().or(z.literal('')),
  durationMinutes: z.number().int().positive('Duration must be greater than zero.'),
  color: z.string().trim().optional().or(z.literal('')),
  requiresApproval: z.boolean().default(false),
  locations: z.array(meetingLocationTypeSchema).min(1, 'Select at least one meeting location.'),
  payment: eventTypePaymentSchema,
})

export const eventTypeUpdateSchema = eventTypeCreateSchema.partial()

export const eventTypePreviewSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  durationLabel: z.string(),
  locations: z.array(z.string()),
  paymentLabel: z.string(),
  approvalLabel: z.string(),
})

export type MeetingLocationType = z.infer<typeof meetingLocationTypeSchema>
export type EventTypeStatus = z.infer<typeof eventTypeStatusSchema>
export type EventType = z.infer<typeof eventTypeSchema>
export type EventTypeListResponse = z.infer<typeof eventTypeListResponseSchema>
export type EventTypeListQuery = z.infer<typeof eventTypeListQuerySchema>
export type EventTypeCreateInput = z.infer<typeof eventTypeCreateSchema>
export type EventTypeUpdateInput = z.infer<typeof eventTypeUpdateSchema>
export type EventTypePreview = z.infer<typeof eventTypePreviewSchema>
