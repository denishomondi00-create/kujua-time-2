/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Theme tokens
 *
 * Default design tokens that match the CSS custom properties
 * defined in apps/web/app/globals.css. The embed widget uses
 * these as baseline values which can be overridden by the host
 * through KujuaTime.init({ theme: { ... } }).
 * ───────────────────────────────────────────────────────────── */

import type { ResolvedTheme, EmbedThemeOverrides } from '../sdk/types'

export const DEFAULT_THEME: Readonly<ResolvedTheme> = {
  accentColor: '#0D4E5C',    // --kujua-primary-teal
  accentSoft: '#E87A3E',     // --kujua-primary-amber
  radius: '1.5rem',          // --kujua-radius-xl ≈ 24px (softer cards)
  fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
}

/** CSS custom properties injected into iframe or shadow root */
export const CSS_VAR_MAP = {
  accentColor: '--kt-accent',
  accentSoft: '--kt-accent-soft',
  radius: '--kt-radius',
  fontFamily: '--kt-font-body',
} as const

/** Additional tokens injected alongside the overrides */
export const STATIC_CSS_VARS: Record<string, string> = {
  '--kt-foreground': '#1A1D20',
  '--kt-muted-foreground': '#6B737A',
  '--kt-panel': '#FFFFFF',
  '--kt-muted': '#F4F6F8',
  '--kt-border': '#E2E6EA',
  '--kt-success': '#2D8C6A',
  '--kt-danger': '#D9534F',
  '--kt-warning': '#E8A23E',
  '--kt-info': '#3A7CA5',
  '--kt-shadow-sm': '0 1px 3px rgba(13,78,92,0.06), 0 1px 2px rgba(13,78,92,0.04)',
  '--kt-shadow-md': '0 4px 6px rgba(13,78,92,0.07), 0 2px 4px rgba(13,78,92,0.04)',
  '--kt-shadow-lg': '0 10px 15px rgba(13,78,92,0.10), 0 4px 6px rgba(13,78,92,0.05)',
  '--kt-transition-fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  '--kt-transition-base': '200ms cubic-bezier(0.4, 0, 0.2, 1)',
}

/**
 * Resolve a full theme by merging host overrides onto defaults.
 */
export function resolveTheme(overrides?: EmbedThemeOverrides): ResolvedTheme {
  return {
    accentColor: overrides?.accentColor ?? DEFAULT_THEME.accentColor,
    accentSoft: overrides?.accentSoft ?? DEFAULT_THEME.accentSoft,
    radius: overrides?.radius ?? DEFAULT_THEME.radius,
    fontFamily: overrides?.fontFamily ?? DEFAULT_THEME.fontFamily,
  }
}

/**
 * Build a CSS string of custom property declarations for injection.
 */
export function buildThemeCssVars(theme: ResolvedTheme): string {
  const dynamicVars = Object.entries(CSS_VAR_MAP)
    .map(([key, cssVar]) => `${cssVar}: ${theme[key as keyof ResolvedTheme]};`)
    .join('\n  ')

  const staticVars = Object.entries(STATIC_CSS_VARS)
    .map(([prop, val]) => `${prop}: ${val};`)
    .join('\n  ')

  return `:host, :root {\n  ${dynamicVars}\n  ${staticVars}\n}`
}
