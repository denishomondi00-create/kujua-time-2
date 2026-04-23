import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Team invites',
      description: 'Create and manage staff invitations, expiration windows, and onboarding status tracking.',
    }

    export default function Page() {
      return (
        <div style={{ display: 'grid', gap: 24 }}>
          <section
            style={{
              background: 'var(--kujua-white)',
              border: '1px solid var(--kujua-gray-200)',
              borderRadius: 24,
              padding: '28px',
              boxShadow: 'var(--kujua-shadow-sm)',
            }}
          >
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Onboarding</p>
            <h2 style={{ marginBottom: 12 }}>Team invites</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Create and manage staff invitations, expiration windows, and onboarding status tracking.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
  <p style={{ marginBottom: 16 }}>Send invite-only access for staff accounts and monitor activation progress here.</p>
  <button type="button" className="btn-primary">Create invite</button>
</section>

        </div>
      )
    }
