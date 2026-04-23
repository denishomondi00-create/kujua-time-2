import { z } from 'zod'

export const formFieldTypeSchema = z.enum([
  'short_text',
  'long_text',
  'email',
  'phone',
  'number',
  'select',
  'multi_select',
  'checkbox',
  'date',
])

export const formFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: formFieldTypeSchema,
  required: z.boolean().default(false),
  helpText: z.string().optional().nullable(),
  options: z.array(z.string()).default([]),
  placeholder: z.string().optional().nullable(),
})

export const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  fields: z.array(formFieldSchema).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const formListResponseSchema = z.object({
  items: z.array(formSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
})

export const formResponseSchema = z.object({
  id: z.string(),
  formId: z.string(),
  submittedAt: z.string(),
  values: z.record(z.string(), z.unknown()),
})

export const formResponsesListSchema = z.object({
  items: z.array(formResponseSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
})

export const formListQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional().default(''),
})

export const formCreateSchema = z.object({
  name: z.string().trim().min(1, 'Form name is required.'),
  description: z.string().trim().max(5_000).optional().or(z.literal('')),
  fields: z.array(formFieldSchema.omit({ id: true }).extend({ id: z.string().optional() })).min(1, 'Add at least one field.'),
})

export const formUpdateSchema = formCreateSchema.partial()

export type FormFieldType = z.infer<typeof formFieldTypeSchema>
export type FormField = z.infer<typeof formFieldSchema>
export type IntakeForm = z.infer<typeof formSchema>
export type FormListResponse = z.infer<typeof formListResponseSchema>
export type FormResponse = z.infer<typeof formResponseSchema>
export type FormResponsesList = z.infer<typeof formResponsesListSchema>
export type FormListQuery = z.infer<typeof formListQuerySchema>
export type FormCreateInput = z.infer<typeof formCreateSchema>
export type FormUpdateInput = z.infer<typeof formUpdateSchema>
