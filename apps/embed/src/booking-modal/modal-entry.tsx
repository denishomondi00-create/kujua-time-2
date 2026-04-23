/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Modal entry
 *
 * Public entry point for the modal embed mode.
 * Validates init options and delegates to createModalRoot.
 * ───────────────────────────────────────────────────────────── */

import type { KujuaTimeInitOptions, KujuaTimeInstance } from '../sdk/types'
import { isValidSlug } from '../sdk/api'
import { createModalRoot } from './modal-root'

/**
 * Initialise the Kujua Time booking widget in modal mode.
 *
 * The modal appears as a centred overlay on desktop and a
 * bottom sheet on mobile. It auto-opens on init and can be
 * reopened via instance.open().
 *
 * @example
 * ```js
 * const widget = KujuaTime.init({
 *   mode: 'modal',
 *   workspaceSlug: 'acme-coaching',
 *   path: 'discovery-call',
 *   theme: { accentColor: '#0D4E5C' },
 *   onBooked: (booking) => console.log('Booked!', booking),
 * })
 *
 * // Later:
 * widget.destroy()
 * ```
 */
export function initModal(options: KujuaTimeInitOptions): KujuaTimeInstance {
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

  return createModalRoot(options)
}
