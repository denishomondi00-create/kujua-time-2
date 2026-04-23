export function DocsNav() {
  const items = [
    ['Home', '/'],
    ['Getting Started', '/getting-started'],
    ['Architecture', '/architecture'],
    ['API', '/api']
  ];

  return (
    <nav className="card">
      <strong>Kujua Time Docs</strong>
      <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
        {items.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
