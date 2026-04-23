import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education',
  description: 'Support consultations, office hours, admissions calls, recurring tutoring, and training sessions from one structured scheduling layer.',
}

export default function Page() {
  return (
    <section className="kujua-section">
      <div className="kujua-container" style={{ maxWidth: '760px', textAlign: 'center' }}>
        <span className="kujua-eyebrow">Education</span>
        <h1 style={{ marginTop: '16px', marginBottom: '20px' }}>Scheduling for schools, tutors, and training programmes</h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--kujua-gray-600)' }}>
          Support consultations, office hours, admissions calls, recurring tutoring, and training sessions from one structured scheduling layer.
        </p>
      </div>
    </section>
  )
}
