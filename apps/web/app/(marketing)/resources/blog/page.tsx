import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kujua Time Blog',
  description: 'Articles about scheduling, payments, reminders, and operating service businesses more effectively.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Kujua Time Blog</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>Articles about scheduling, payments, reminders, and operating service businesses more effectively.</p>
      </div>
    </section>
  )
}
