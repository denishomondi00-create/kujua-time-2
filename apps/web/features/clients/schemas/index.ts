import { z } from 'zod'

export const clientStageSchema = z.enum(['lead', 'client', 'inactive', 'vip'])

export const clientListQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional().default(''),
  stage: clientStageSchema.optional(),
})

export const clientNoteSchema = z.object({
  content: z.string().trim().min(1, 'Note cannot be empty.').max(5_000, 'Note is too long.'),
})

export const clientSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  stage: clientStageSchema,
  isBlocked: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  totalBookings: z.number().int().nonnegative().default(0),
  totalRevenue: z.number().nonnegative().default(0),
  currency: z.string().default('USD'),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const clientTimelineItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  occurredAt: z.string(),
  description: z.string().optional(),
})

export const clientDetailSchema = clientSchema.extend({
  notes: z.array(z.object({
    id: z.string(),
    content: z.string(),
    createdAt: z.string(),
    createdByName: z.string().optional(),
  })).default([]),
  timeline: z.array(clientTimelineItemSchema).default([]),
  invoicesCount: z.number().int().nonnegative().default(0),
  paymentsCount: z.number().int().nonnegative().default(0),
})

export const clientListResponseSchema = z.object({
  items: z.array(clientSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
})

export const createClientSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().optional(),
  stage: clientStageSchema.default('lead'),
  tags: z.array(z.string()).default([]),
})

export const updateClientSchema = createClientSchema.partial()

export type ClientStage = z.infer<typeof clientStageSchema>
export type ClientListQuery = z.infer<typeof clientListQuerySchema>
export type Client = z.infer<typeof clientSchema>
export type ClientDetail = z.infer<typeof clientDetailSchema>
export type ClientListResponse = z.infer<typeof clientListResponseSchema>
export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>
export type ClientNoteInput = z.infer<typeof clientNoteSchema>
