/* ─────────────────────────────────────────────────────────────
 * @kujua-time/embed – Inline theme
 *
 * Minimal CSS for the inline embed. The inline mode mounts an
 * iframe directly inside a host element, so styles are much
 * simpler than the modal variant – no overlay, no backdrop.
 * ───────────────────────────────────────────────────────────── */

export const INLINE_CSS = `
  .kt-inline-container {
    position: relative;
    width: 100%;
    min-height: 200px;
    overflow: hidden;
    border-radius: 16px;
    background: #ffffff;
    box-shadow:
      0 1px 3px rgba(13, 78, 92, 0.06),
      0 4px 12px rgba(13, 78, 92, 0.06);
  }

  .kt-inline-container--loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }

  .kt-inline-iframe {
    display: block;
    width: 100%;
    border: none;
    border-radius: 16px;
    transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .kt-inline-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 48px 24px;
    color: #6B737A;
    font-family: 'Outfit', 'Inter', system-ui, sans-serif;
    font-size: 14px;
  }

  .kt-inline-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #E2E6EA;
    border-top-color: #0D4E5C;
    border-radius: 50%;
    animation: kt-spin 0.8s linear infinite;
  }

  @keyframes kt-spin {
    to { transform: rotate(360deg); }
  }

  .kt-inline-error {
    padding: 24px;
    text-align: center;
    color: #D9534F;
    font-family: 'Outfit', 'Inter', system-ui, sans-serif;
    font-size: 14px;
  }
`

export const INLINE_STYLE_ID = 'kt-inline-styles'
