import { z } from 'zod'

export const paymentStatusSchema = z.enum([
  'pending',
  'succeeded',
  'failed',
  'refunded',
  'partially_refunded',
])

export const paymentProviderSchema = z.enum(['stripe', 'paystack', 'manual'])

export const paymentSchema = z.object({
  id: z.string(),
  bookingId: z.string().optional().nullable(),
  clientId: z.string().optional().nullable(),
  clientName: z.string().optional().nullable(),
  provider: paymentProviderSchema,
  status: paymentStatusSchema,
  amount: z.number().nonnegative(),
  currency: z.string(),
  reference: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const paymentListResponseSchema = z.object({
  items: z.array(paymentSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
})

export const paymentPayoutSchema = z.object({
  id: z.string(),
  provider: paymentProviderSchema,
  amount: z.number().nonnegative(),
  currency: z.string(),
  payoutDate: z.string(),
  status: z.enum(['pending', 'paid', 'failed']),
})

export const paymentPayoutsResponseSchema = z.object({
  items: z.array(paymentPayoutSchema),
  total: z.number().int().nonnegative(),
})

export const paymentProviderConnectionSchema = z.object({
  provider: paymentProviderSchema,
  connected: z.boolean(),
})

export const paymentProvidersResponseSchema = z.object({
  items: z.array(paymentProviderConnectionSchema),
})

export const paymentListQuerySchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  status: paymentStatusSchema.optional(),
  provider: paymentProviderSchema.optional(),
  search: z.string().trim().optional().default(''),
})

export const refundPaymentSchema = z.object({
  amount: z.number().positive().optional(),
  reason: z.string().trim().max(500).optional(),
})

export type PaymentStatus = z.infer<typeof paymentStatusSchema>
export type PaymentProvider = z.infer<typeof paymentProviderSchema>
export type Payment = z.infer<typeof paymentSchema>
export type PaymentListResponse = z.infer<typeof paymentListResponseSchema>
export type PaymentPayout = z.infer<typeof paymentPayoutSchema>
export type PaymentPayoutsResponse = z.infer<typeof paymentPayoutsResponseSchema>
export type PaymentProviderConnection = z.infer<typeof paymentProviderConnectionSchema>
export type PaymentProvidersResponse = z.infer<typeof paymentProvidersResponseSchema>
export type PaymentListQuery = z.infer<typeof paymentListQuerySchema>
export type RefundPaymentInput = z.infer<typeof refundPaymentSchema>
