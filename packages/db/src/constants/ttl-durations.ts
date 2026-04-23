/**
 * TTL durations in seconds for temporary collections.
 */
export const TTL_DURATIONS = {
  BOOKING_HOLD: 10 * 60,               // 10 minutes
  PASSWORD_RESET_TOKEN: 60 * 60,       // 1 hour
  EMAIL_VERIFICATION_TOKEN: 24 * 3600, // 24 hours
  OAUTH_STATE_TOKEN: 10 * 60,          // 10 minutes
  IDEMPOTENCY_KEY: 24 * 3600,          // 24 hours
  CHECKOUT_SESSION: 30 * 60,           // 30 minutes
  SESSION_TOKEN: 30 * 24 * 3600,       // 30 days
  RATE_LIMIT_WINDOW: 3600,             // 1 hour
} as const;
