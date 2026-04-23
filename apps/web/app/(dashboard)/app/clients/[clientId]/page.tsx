import type { Metadata } from 'next'

import { ClientNotesPanel, ClientProfileCard, ClientTimeline } from '@/features/clients/components'
import { getClientDetailServer } from '@/features/clients/server'
import { requireAuthenticatedUser } from '@/features/auth/server'

export const metadata: Metadata = {
  title: 'Client details',
  description: 'Review client profile details, notes, timeline, and relationship history.',
}

export default async function ClientDetailPage({
  params,
}: {
  params: { clientId: string }
}) {
  await requireAuthenticatedUser()
  const client = await getClientDetailServer(params.clientId)

  return (
    <div className="client-detail-grid" style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 16 }}>
      <ClientProfileCard client={client} />
      <div style={{ display: 'grid', gap: 16 }}>
        <ClientNotesPanel client={client} />
        <ClientTimeline client={client} />
      </div>
      <style>{`
        @media (max-width: 980px) {
          .client-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
