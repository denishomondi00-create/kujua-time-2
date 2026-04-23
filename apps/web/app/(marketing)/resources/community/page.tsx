import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the broader Kujua Time community for shared learning and product conversations.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Community</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Join the broader Kujua Time community for shared learning and product conversations.</p>
      </div>
    </section>
  )
}
