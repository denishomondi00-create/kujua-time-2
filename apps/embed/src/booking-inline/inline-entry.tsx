/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Inline entry
 *
 * Public entry point for the inline embed mode.
 * The booking widget is rendered directly inside a target
 * container on the host page, flowing naturally with content.
 *
 * @example
 * ```html
 * <div id="booking-root"></div>
 * <script>
 *   KujuaTime.init({
 *     mode: 'inline',
 *     target: '#booking-root',
 *     workspaceSlug: 'acme-coaching',
 *     path: 'discovery-call',
 *   })
 * </script>
 * ```
 * ───────────────────────────────────────────────────────────── */

import type { KujuaTimeInitOptions, KujuaTimeInstance } from '../sdk/types'
import { isValidSlug } from '../sdk/api'
import { createInlineRoot } from './inline-root'

/**
 * Initialise the Kujua Time booking widget in inline mode.
 */
export function initInline(options: KujuaTimeInitOptions): KujuaTimeInstance {
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

  if (!options.target) {
    throw new Error(
      '[KujuaTime] Inline mode requires a "target" CSS selector, ' +
      'e.g. target: "#booking-root".'
    )
  }

  // ── Delegate ──────────────────────────────────────────

  return createInlineRoot(options)
}
