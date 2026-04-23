import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog & Updates',
  description: 'Follow product updates, release notes, and roadmap-visible improvements.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Changelog & Updates</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Follow product updates, release notes, and roadmap-visible improvements.</p>
      </div>
    </section>
  )
}
