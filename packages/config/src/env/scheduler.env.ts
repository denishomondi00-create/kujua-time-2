import { z } from 'zod';

export const schedulerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  SENTRY_DSN: z.string().optional(),
});

export type SchedulerEnv = z.infer<typeof schedulerEnvSchema>;

export function parseSchedulerEnv(raw?: Record<string, string | undefined>): SchedulerEnv {
  return schedulerEnvSchema.parse(raw ?? process.env);
}
