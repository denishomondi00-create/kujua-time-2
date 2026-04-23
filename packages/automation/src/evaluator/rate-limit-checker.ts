/**
 * Checks whether an automation rule has exceeded its configured rate limits.
 * Uses execution count data from the caller (typically the worker).
 */

export interface RateLimitConfig {
  maxPerHour?: number;
  maxPerDay?: number;
}

export interface ExecutionCounts {
  lastHourCount: number;
  lastDayCount: number;
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: string;
}

export function checkRateLimit(
  config: RateLimitConfig | undefined,
  counts: ExecutionCounts,
): RateLimitResult {
  if (!config) {
    return { allowed: true };
  }

  if (config.maxPerHour !== undefined && counts.lastHourCount >= config.maxPerHour) {
    return {
      allowed: false,
      reason: `Hourly limit exceeded: ${counts.lastHourCount}/${config.maxPerHour}`,
    };
  }

  if (config.maxPerDay !== undefined && counts.lastDayCount >= config.maxPerDay) {
    return {
      allowed: false,
      reason: `Daily limit exceeded: ${counts.lastDayCount}/${config.maxPerDay}`,
    };
  }

  return { allowed: true };
}
