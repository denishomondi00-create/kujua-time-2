import { z } from 'zod';

const formFieldSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(200),
  type: z.enum(['text', 'textarea', 'email', 'phone', 'select', 'multiselect', 'checkbox', 'radio', 'number', 'date']),
  required: z.boolean().default(false),
  placeholder: z.string().max(200).optional(),
  options: z.array(z.string().max(200)).optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
  }).optional(),
  order: z.number().int().min(0),
});

export const createFormSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  description: z.string().max(1000).optional(),
  fields: z.array(formFieldSchema).min(1).max(50),
});

export const updateFormSchema = createFormSchema.partial();

export type CreateFormInput = z.infer<typeof createFormSchema>;
export type UpdateFormInput = z.infer<typeof updateFormSchema>;
