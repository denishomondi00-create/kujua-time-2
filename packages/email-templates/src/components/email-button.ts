export function emailButton(text: string, href: string, color = '#4c6ef5'): string {
  return `<a href="${href}" style="display:inline-block;padding:12px 24px;background:${color};color:#fff;text-decoration:none;border-radius:6px;font-weight:600;margin:8px 0">${text}</a>`;
}
