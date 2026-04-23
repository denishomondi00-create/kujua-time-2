export function baseLayout(content: string, branding?: { accentColor?: string; businessName?: string; logoUrl?: string }): string {
  const accent = branding?.accentColor ?? '#4c6ef5';
  const name = branding?.businessName ?? 'Kujua Time';
  const logo = branding?.logoUrl ? `<img src="${branding.logoUrl}" alt="${name}" style="max-height:48px;margin-bottom:16px;" />` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#212529;background:#f8f9fa}
.container{max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:8px;margin-top:24px}
.header{text-align:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid ${accent}}
.footer{text-align:center;padding:24px;color:#868e96;font-size:13px}
a{color:${accent}}</style></head>
<body><div class="container"><div class="header">${logo}<h2 style="margin:0;color:${accent}">${name}</h2></div>${content}</div>
<div class="footer"><p>Powered by Kujua Time</p></div></body></html>`;
}
