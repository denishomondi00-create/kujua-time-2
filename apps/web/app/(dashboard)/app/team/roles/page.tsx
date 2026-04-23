import type { Metadata } from 'next'

    export const metadata: Metadata = {
      title: 'Team roles',
      description: 'Define permission boundaries for booking management, payments, invoices, automations, and settings.',
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
            <p className="kujua-eyebrow" style={{ marginBottom: 14 }}>Permissions model</p>
            <h2 style={{ marginBottom: 12 }}>Team roles</h2>
            <p style={{ fontSize: '1rem', maxWidth: 760 }}>Define permission boundaries for booking management, payments, invoices, automations, and settings.</p>
          </section>

<section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
  {['Administrator', 'Manager', 'Scheduler', 'Finance operator', 'Viewer'].map((role) => (
    <article key={role} style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 20 }}>
      <h3 style={{ marginBottom: 10 }}>{role}</h3>
      <p>Use this space to define RBAC policies and route-level permissions for team workflows.</p>
    </article>
  ))}
</section>

        </div>
      )
    }
