import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().max(30).optional(),
  lifecycleStage: z.enum(['lead', 'client', 'inactive', 'vip']).default('lead'),
  tags: z.array(z.string().max(50)).max(20).default([]),
  source: z.enum(['booking', 'manual', 'form', 'import']).default('manual'),
  metadata: z.record(z.unknown()).optional(),
});

export const updateClientSchema = createClientSchema.partial();

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
