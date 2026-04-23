/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Floating button entry
 *
 * Entry point for the floating action button mode.
 * Places a branded "Book Now" button in the bottom-right
 * corner; clicking opens the booking modal.
 *
 * @example
 * ```html
 * <script>
 *   KujuaTime.init({
 *     mode: 'floating',
 *     workspaceSlug: 'acme-coaching',
 *     path: 'discovery-call',
 *     theme: { accentColor: '#E87A3E' },
 *     onBooked: (booking) => {
 *       analytics.track('booking_completed', booking)
 *     },
 *   })
 * </script>
 * ```
 * ───────────────────────────────────────────────────────────── */

import type { KujuaTimeInitOptions, KujuaTimeInstance } from '../sdk/types'
import { isValidSlug } from '../sdk/api'
import { createFloatingRoot } from './button-root'

/**
 * Initialise the Kujua Time booking widget with a floating button.
 */
export function initFloating(options: KujuaTimeInitOptions): KujuaTimeInstance {
  // ── Validate ──────────────────────────────────────────

  if (!options.workspaceSlug) {
    throw new Error('[KujuaTime] "workspaceSlug" is required.')
  }

  if (!isValidSlug(options.workspaceSlug)) {
    throw new Error(
      `[KujuaTime] Invalid workspace slug: "${options.workspaceSlug}". ` +
      'Slugs must be lowercase alphanumeric with optional hyphens.'
    )
  }

  // ── Delegate ──────────────────────────────────────────

  return createFloatingRoot(options)
}
