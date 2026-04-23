/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Version
 *
 * Stamped at build time by Vite's define plugin.
 * Falls back to the hard-coded string during development.
 * ───────────────────────────────────────────────────────────── */

declare const __KUJUA_EMBED_VERSION__: string

export const EMBED_VERSION: string =
  typeof __KUJUA_EMBED_VERSION__ !== 'undefined'
    ? __KUJUA_EMBED_VERSION__
    : '0.1.0-dev'

export const SDK_NAMESPACE = 'KujuaTime' as const

export const POST_MESSAGE_NS = 'kujua-time' as const
