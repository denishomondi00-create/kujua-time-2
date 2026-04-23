/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – SDK init
 *
 * The public KujuaTime.init() function. Routes to the correct
 * embed mode (modal, inline, or floating) based on the
 * options.mode parameter.
 *
 * Usage on any website:
 *
 *   <script src="https://cdn.kujuatime.com/embed.js"></script>
 *   <script>
 *     const widget = KujuaTime.init({
 *       mode: 'modal',
 *       workspaceSlug: 'acme-coaching',
 *       path: 'discovery-call',
 *       theme: { accentColor: '#0D4E5C' },
 *       onBooked: (booking) => console.log(booking),
 *     })
 *   </script>
 * ───────────────────────────────────────────────────────────── */

import type { KujuaTimeInitOptions, KujuaTimeInstance } from './types'
import { EMBED_VERSION, SDK_NAMESPACE } from './version'
import { isBrowser, onReady } from '../shared/utils'
import { initModal } from '../booking-modal/modal-entry'
import { initInline } from '../booking-inline/inline-entry'
import { initFloating } from '../floating-button/button-entry'

// Track active instances to prevent double-init collisions
const activeInstances = new Map<string, KujuaTimeInstance>()

/**
 * Initialise a Kujua Time booking widget.
 *
 * @returns A KujuaTimeInstance with destroy(), open(), close(),
 *          and updateTheme() methods.
 */
function init(options: KujuaTimeInitOptions): KujuaTimeInstance {
  if (!isBrowser()) {
    throw new Error('[KujuaTime] init() must be called in a browser environment.')
  }

  if (!options || !options.mode) {
    throw new Error(
      '[KujuaTime] "mode" is required. Use "modal", "inline", or "floating".'
    )
  }

  // Prevent duplicate widgets for the same workspace + path
  const key = `${options.workspaceSlug}::${options.path ?? ''}`
  const existing = activeInstances.get(key)
  if (existing) {
    console.warn(
      `[KujuaTime] Widget already active for "${key}". Destroying previous instance.`
    )
    existing.destroy()
    activeInstances.delete(key)
  }

  let instance: KujuaTimeInstance

  switch (options.mode) {
    case 'modal':
      instance = initModal(options)
      break
    case 'inline':
      instance = initInline(options)
      break
    case 'floating':
      instance = initFloating(options)
      break
    default:
      throw new Error(
        `[KujuaTime] Unknown mode: "${(options as any).mode}". ` +
        'Use "modal", "inline", or "floating".'
      )
  }

  // Wrap destroy to clean up tracking
  const originalDestroy = instance.destroy
  instance.destroy = () => {
    activeInstances.delete(key)
    originalDestroy()
  }

  activeInstances.set(key, instance)

  return instance
}

/**
 * Destroy all active widget instances.
 */
function destroyAll(): void {
  for (const [key, instance] of activeInstances) {
    instance.destroy()
  }
  activeInstances.clear()
}

/**
 * Get the embed SDK version.
 */
function getVersion(): string {
  return EMBED_VERSION
}

// ── Public SDK surface ──────────────────────────────────

export const KujuaTime = {
  init,
  destroyAll,
  version: getVersion,
  /** @internal – active instance count for debugging */
  _activeCount: () => activeInstances.size,
} as const

export type { KujuaTimeInitOptions, KujuaTimeInstance } from './types'

// ── Auto-register on window ─────────────────────────────

if (isBrowser()) {
  ;(window as any)[SDK_NAMESPACE] = KujuaTime
}
