import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Team',
      description: 'Invite staff, manage ownership, and prepare for role-based scheduling, routing, and team analytics.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Workspace members</p>
            <h2 style={{ marginBottom: 12 }}>Team</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Invite staff, manage ownership, and prepare for role-based scheduling, routing, and team analytics.</p>
          </section>

<section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
    <a href="/app/team/invites" className="btn-primary">Invite member</a>
    <a href="/app/team/roles" className="btn-secondary">View roles</a>
  </div>
  <p style={{ margin: 0 }}>No additional team members yet.</p>
</section>

        </div>
      )
    }
