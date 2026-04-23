import { z } from 'zod'

export const automationTriggerSchema = z.enum([
  'booking.created',
  'booking.approved',
  'booking.canceled',
  'booking.rescheduled',
  'booking.completed',
  'booking.no_show',
  'payment.succeeded',
  'payment.failed',
  'payment.refunded',
  'invoice.created',
  'form.submitted',
  'client.created',
])

export const automationActionTypeSchema = z.enum([
  'send_email',
  'send_sms',
  'send_whatsapp',
  'add_tag',
  'remove_tag',
  'create_invoice',
  'call_webhook',
])

export const automationActionSchema = z.object({
  id: z.string(),
  type: automationActionTypeSchema,
  label: z.string(),
  config: z.record(z.string(), z.unknown()).default({}),
})

export const automationSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean().default(true),
  triggerEvent: automationTriggerSchema,
  actions: z.array(automationActionSchema).default([]),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const automationTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  triggerEvent: automationTriggerSchema,
  actions: z.array(automationActionSchema).default([]),
})

export const automationLogSchema = z.object({
  id: z.string(),
  automationId: z.string(),
  status: z.enum(['pending', 'running', 'completed', 'failed']),
  startedAt: z.string().optional().nullable(),
  completedAt: z.string().optional().nullable(),
  errorMessage: z.string().optional().nullable(),
})

export const automationListResponseSchema = z.object({
  items: z.array(automationSchema),
  total: z.number().int().nonnegative(),
})

export const automationTemplatesResponseSchema = z.object({
  items: z.array(automationTemplateSchema),
  total: z.number().int().nonnegative(),
})

export const automationLogsResponseSchema = z.object({
  items: z.array(automationLogSchema),
  total: z.number().int().nonnegative(),
})

export const automationCreateSchema = z.object({
  name: z.string().trim().min(1, 'Automation name is required.'),
  enabled: z.boolean().default(true),
  triggerEvent: automationTriggerSchema,
  actions: z.array(automationActionSchema.omit({ id: true }).extend({ id: z.string().optional() })).min(1, 'Add at least one action.'),
})

export const automationUpdateSchema = automationCreateSchema.partial()

export type AutomationTrigger = z.infer<typeof automationTriggerSchema>
export type AutomationActionType = z.infer<typeof automationActionTypeSchema>
export type AutomationAction = z.infer<typeof automationActionSchema>
export type Automation = z.infer<typeof automationSchema>
export type AutomationTemplate = z.infer<typeof automationTemplateSchema>
export type AutomationLog = z.infer<typeof automationLogSchema>
export type AutomationListResponse = z.infer<typeof automationListResponseSchema>
export type AutomationLogsResponse = z.infer<typeof automationLogsResponseSchema>
export type AutomationCreateInput = z.infer<typeof automationCreateSchema>
export type AutomationUpdateInput = z.infer<typeof automationUpdateSchema>
