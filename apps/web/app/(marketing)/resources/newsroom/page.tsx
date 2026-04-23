import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'Press updates, announcements, and public product news from Kujua Time.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Newsroom</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Press updates, announcements, and public product news from Kujua Time.</p>
      </div>
    </section>
  )
}
