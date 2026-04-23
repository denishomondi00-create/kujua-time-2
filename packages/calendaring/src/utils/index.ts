/**
 * Calendar utility helpers.
 */

/** Check if a token is expired or about to expire (5 min buffer) */
export function isTokenExpired(expiresAt: Date, bufferMs = 5 * 60 * 1000): boolean {
  return new Date(expiresAt).getTime() - bufferMs < Date.now();
}

/** Calculate backoff delay for sync retries */
export function syncRetryDelay(consecutiveErrors: number): number {
  // Exponential backoff: 1min, 2min, 4min, 8min, max 30min
  const baseMs = 60_000;
  return Math.min(baseMs * Math.pow(2, consecutiveErrors), 30 * 60_000);
}
