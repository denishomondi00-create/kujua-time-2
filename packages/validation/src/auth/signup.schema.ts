import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).max(128),
  timezone: z.string().default('Africa/Nairobi'),
});

export type SignupInput = z.infer<typeof signupSchema>;
