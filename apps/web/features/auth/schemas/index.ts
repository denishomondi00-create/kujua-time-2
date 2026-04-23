import { z } from 'zod'

export const authEmailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required.')
  .email('Enter a valid email address.')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long.')
  .max(128, 'Password cannot exceed 128 characters.')

export const loginSchema = z.object({
  email: authEmailSchema,
  password: passwordSchema,
  remember: z.boolean().optional().default(false),
})

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, 'First name is required.'),
    lastName: z.string().trim().min(1, 'Last name is required.'),
    businessName: z.string().trim().min(2, 'Business name is required.'),
    email: authEmailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm your password.'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: authEmailSchema,
})

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, 'Reset token is required.'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm your password.'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export const verifyEmailSchema = z.object({
  token: z.string().trim().min(1, 'Verification token is required.'),
})

export const authWorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  plan: z.string().optional(),
})

export const authUserSchema = z.object({
  id: z.string(),
  email: authEmailSchema,
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fullName: z.string().optional(),
  avatarUrl: z.string().url().optional().nullable(),
  emailVerifiedAt: z.string().optional().nullable(),
})

export const authSessionSchema = z.object({
  isAuthenticated: z.boolean(),
  user: authUserSchema.nullable(),
  workspace: authWorkspaceSchema.nullable(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>
export type AuthSession = z.infer<typeof authSessionSchema>
export type AuthUser = z.infer<typeof authUserSchema>
