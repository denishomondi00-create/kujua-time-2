/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Theme isolator
 *
 * Provides shadow DOM isolation so that the host site's CSS
 * does not bleed into the widget, and the widget's styles
 * do not leak outward.
 *
 * The iframe approach already provides natural isolation;
 * this module adds an optional shadow-root wrapper for cases
 * where the floating button or lightweight UI runs directly
 * in the host DOM.
 * ───────────────────────────────────────────────────────────── */

import type { ResolvedTheme } from '../sdk/types'
import { buildThemeCssVars } from './tokens'

/**
 * Attach a shadow root to a host element and inject theme vars.
 *
 * Returns the shadow root so callers can append their content.
 */
export function attachIsolatedRoot(
  hostElement: HTMLElement,
  theme: ResolvedTheme,
  extraCss?: string,
): ShadowRoot {
  const shadow = hostElement.attachShadow({ mode: 'open' })

  const style = document.createElement('style')
  style.textContent = buildIsolationCss(theme, extraCss)
  shadow.appendChild(style)

  return shadow
}

/**
 * Update theme variables on an existing shadow root.
 */
export function updateIsolatedTheme(
  shadow: ShadowRoot,
  theme: ResolvedTheme,
  extraCss?: string,
): void {
  const existing = shadow.querySelector('style[data-kt-theme]')
  const style = existing ?? document.createElement('style')
  style.setAttribute('data-kt-theme', 'true')
  style.textContent = buildIsolationCss(theme, extraCss)

  if (!existing) {
    shadow.prepend(style)
  }
}

/**
 * Build the full isolation CSS block including resets.
 */
function buildIsolationCss(theme: ResolvedTheme, extraCss?: string): string {
  const themeVars = buildThemeCssVars(theme)

  return `
    ${themeVars}

    :host {
      all: initial;
      display: block;
      font-family: var(--kt-font-body);
      color: var(--kt-foreground, #1A1D20);
      line-height: 1.6;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    ${extraCss ?? ''}
  `
}

/**
 * Create an inline <style> element with theme variables
 * for injection into a standalone iframe head.
 */
export function createThemeStyleElement(
  doc: Document,
  theme: ResolvedTheme,
): HTMLStyleElement {
  const style = doc.createElement('style')
  style.setAttribute('data-kt-theme', 'true')
  style.textContent = buildThemeCssVars(theme)
  return style
}
