/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Widget loader
 *
 * This is the main entry point for the embed bundle.
 * When loaded via <script src="...embed.js">, it:
 *
 *   1. Imports base widget styles
 *   2. Registers KujuaTime on window
 *   3. Processes any queued init calls from the snippet
 *   4. Fires a 'kujua-time:loaded' custom event
 *
 * ── Recommended install snippet ────────────────────────────
 *
 *   <script>
 *     window.KujuaTime = window.KujuaTime || { _q: [] };
 *     window.KujuaTime.init = window.KujuaTime.init ||
 *       function() { window.KujuaTime._q.push(arguments); };
 *   </script>
 *   <script src="https://cdn.kujuatime.com/embed.js" async></script>
 *
 * This pattern lets hosts call KujuaTime.init() before the
 * script loads. Once loaded, queued calls are replayed.
 * ───────────────────────────────────────────────────────────── */

import './styles/widget.css'
import { KujuaTime } from './sdk/init'
import { SDK_NAMESPACE, EMBED_VERSION } from './sdk/version'
import { isBrowser, onReady } from './shared/utils'

// ── Replay queued calls ─────────────────────────────────

function replayQueue() {
  const existingStub = (window as any)[SDK_NAMESPACE]

  if (existingStub && Array.isArray(existingStub._q)) {
    const queue = existingStub._q as IArguments[]

    // Replace stub with real SDK
    ;(window as any)[SDK_NAMESPACE] = KujuaTime

    // Replay queued init calls
    for (const args of queue) {
      try {
        KujuaTime.init(args[0] as any)
      } catch (err) {
        console.error('[KujuaTime] Failed to replay queued init call:', err)
      }
    }
  } else {
    // No queue – just register
    ;(window as any)[SDK_NAMESPACE] = KujuaTime
  }
}

// ── Auto-init from data attributes ──────────────────────

function autoInitFromScript() {
  const scriptEl = document.querySelector<HTMLScriptElement>(
    'script[data-kujua-workspace]'
  )
  if (!scriptEl) return

  const workspaceSlug = scriptEl.dataset.kujuaWorkspace
  if (!workspaceSlug) return

  const mode = (scriptEl.dataset.kujuaMode as any) || 'floating'
  const path = scriptEl.dataset.kujuaPath || undefined
  const target = scriptEl.dataset.kujuaTarget || undefined
  const accentColor = scriptEl.dataset.kujuaAccent || undefined

  KujuaTime.init({
    mode,
    workspaceSlug,
    path,
    target,
    theme: accentColor ? { accentColor } : undefined,
  })
}

// ── Bootstrap ───────────────────────────────────────────

if (isBrowser()) {
  onReady(() => {
    replayQueue()
    autoInitFromScript()

    // Dispatch loaded event for host pages that need to know
    window.dispatchEvent(
      new CustomEvent('kujua-time:loaded', {
        detail: { version: EMBED_VERSION },
      }),
    )

    if (typeof console !== 'undefined' && console.log) {
      console.log(
        `%c⏱ Kujua Time Embed v${EMBED_VERSION}`,
        'color: #0D4E5C; font-weight: bold;',
      )
    }
  })
}

// ── Named exports for ES module consumers ───────────────

export { KujuaTime }
export type { KujuaTimeInitOptions, KujuaTimeInstance } from './sdk/types'
