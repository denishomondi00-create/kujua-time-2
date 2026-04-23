/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Theme parser
 *
 * Extracts and normalises theme overrides from multiple
 * sources: init options, data-* attributes on the script tag,
 * and URL query parameters for iframe-side parsing.
 * ───────────────────────────────────────────────────────────── */

import type { EmbedThemeOverrides } from '../sdk/types'

/**
 * Parse theme overrides from data-* attributes on an HTML element.
 *
 * Supports:
 *   data-accent-color="#0D4E5C"
 *   data-accent-soft="#E87A3E"
 *   data-radius="1rem"
 *   data-font-family="Inter, sans-serif"
 */
export function parseFromDataAttributes(el: HTMLElement): EmbedThemeOverrides {
  return stripUndefined({
    accentColor: el.dataset.accentColor || undefined,
    accentSoft: el.dataset.accentSoft || undefined,
    radius: el.dataset.radius || undefined,
    fontFamily: el.dataset.fontFamily || undefined,
  })
}

/**
 * Parse theme overrides from URL search parameters.
 *
 * This runs inside the iframe to receive theme values from the host.
 * Mirrors the param names used in sdk/api.ts → buildIframeUrl().
 */
export function parseFromUrlParams(search: string): EmbedThemeOverrides {
  const params = new URLSearchParams(search)

  const accent = params.get('accent')
  const accentSoft = params.get('accentSoft')
  const radius = params.get('radius')
  const font = params.get('font')

  return stripUndefined({
    accentColor: accent ? normaliseColor(accent) : undefined,
    accentSoft: accentSoft ? normaliseColor(accentSoft) : undefined,
    radius: radius || undefined,
    fontFamily: font || undefined,
  })
}

/**
 * Merge multiple override sources with later sources winning.
 */
export function mergeOverrides(
  ...sources: Array<EmbedThemeOverrides | undefined>
): EmbedThemeOverrides {
  const merged: EmbedThemeOverrides = {}

  for (const source of sources) {
    if (!source) continue
    if (source.accentColor) merged.accentColor = source.accentColor
    if (source.accentSoft) merged.accentSoft = source.accentSoft
    if (source.radius) merged.radius = source.radius
    if (source.fontFamily) merged.fontFamily = source.fontFamily
  }

  return merged
}

/**
 * Validate a CSS colour string (hex only for safety).
 */
export function isValidColor(value: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value)
}

// ── Internal helpers ───────────────────────────────────────

function normaliseColor(raw: string): string {
  const cleaned = raw.replace(/^#/, '')
  if (/^[0-9a-fA-F]{3,8}$/.test(cleaned)) {
    return `#${cleaned}`
  }
  return raw
}

function stripUndefined(obj: Record<string, string | undefined>): EmbedThemeOverrides {
  const result: Record<string, string> = {}
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined && val !== '') {
      result[key] = val
    }
  }
  return result
}
