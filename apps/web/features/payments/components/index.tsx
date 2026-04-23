import { formatPaymentAmount, getPaymentStatusTone } from '@/features/payments/utils'
import type { Payment, PaymentPayout, PaymentStatus } from '@/features/payments/schemas'

function StatusPill({ status }: { status: PaymentStatus }) {
  const tone = getPaymentStatusTone(status)

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, background: tone.background, color: tone.color }}>
      {status.replace('_', ' ')}
    </span>
  )
}

export function PaymentsTable({ items }: { items: Payment[] }) {
  return (
    <div style={{ overflowX: 'auto', background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
        <thead>
          <tr style={{ background: 'var(--kujua-gray-50)' }}>
            {['Reference', 'Client', 'Provider', 'Status', 'Amount', 'Updated'].map((column) => (
              <th key={column} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kujua-gray-400)' }}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((payment) => (
            <tr key={payment.id} style={{ borderTop: '1px solid var(--kujua-gray-100)' }}>
              <td style={{ padding: '16px 18px', fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{payment.reference}</td>
              <td style={{ padding: '16px 18px' }}>{payment.clientName ?? '—'}</td>
              <td style={{ padding: '16px 18px' }}>{payment.provider}</td>
              <td style={{ padding: '16px 18px' }}><StatusPill status={payment.status} /></td>
              <td style={{ padding: '16px 18px' }}>{formatPaymentAmount(payment.amount, payment.currency)}</td>
              <td style={{ padding: '16px 18px' }}>{new Date(payment.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PaymentsEmptyState() {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 24, padding: 28 }}>
      <h3 style={{ marginBottom: 10 }}>No payments yet</h3>
      <p style={{ marginBottom: 20 }}>
        Once bookings collect deposits or full payment, transactions and reconciliation data will appear here.
      </p>
    </section>
  )
}

export function PaymentSummaryCard({ payment }: { payment: Payment }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Payment summary</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        {[
          ['Reference', payment.reference],
          ['Status', payment.status.replace('_', ' ')],
          ['Provider', payment.provider],
          ['Amount', formatPaymentAmount(payment.amount, payment.currency)],
          ['Client', payment.clientName ?? '—'],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 12, borderBottom: '1px solid var(--kujua-gray-100)' }}>
            <span style={{ color: 'var(--kujua-gray-600)' }}>{label}</span>
            <span style={{ color: 'var(--kujua-charcoal)', fontWeight: 600 }}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function PayoutSummaryPanel({ payouts }: { payouts: PaymentPayout[] }) {
  return (
    <section style={{ background: 'var(--kujua-white)', border: '1px solid var(--kujua-gray-200)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ marginBottom: 16 }}>Payout summary</h3>
      {payouts.length === 0 ? (
        <p style={{ margin: 0 }}>Payout data will appear here when providers begin settling funds.</p>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {payouts.map((payout) => (
            <div key={payout.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingBottom: 12, borderBottom: '1px solid var(--kujua-gray-100)' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{payout.provider}</div>
                <div style={{ fontSize: '0.875rem' }}>{new Date(payout.payoutDate).toLocaleDateString()}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700, color: 'var(--kujua-charcoal)' }}>{formatPaymentAmount(payout.amount, payout.currency)}</div>
                <div style={{ fontSize: '0.875rem' }}>{payout.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
