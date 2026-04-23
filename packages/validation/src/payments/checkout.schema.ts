import { z } from 'zod';

export const checkoutSchema = z.object({
  bookingHoldId: z.string().min(1),
  provider: z.enum(['stripe', 'paystack']),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export const refundSchema = z.object({
  paymentId: z.string().min(1),
  amount: z.number().positive().optional(),
  reason: z.string().max(500).optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type RefundInput = z.infer<typeof refundSchema>;
