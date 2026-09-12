import { useState } from 'react'

interface FlaggedTx {
  id: string
  merchant: string
  amount: string
  reason: string
  severity: 'High' | 'Medium' | 'Low'
  status: 'Held' | 'Under Review' | 'Flagged' | 'Resolved' | 'Approved'
  time: string
}

const TRANSACTIONS: FlaggedTx[] = []

const SEVERITY_COLORS: Record<string, string> = {
  High: '#FF4D5A',
  Medium: '#F5B700',
  Low: '#3FE7FF',
}

const STATUS_COLORS: Record<string, string> = {
  Held: '#FF4D5A',
  'Under Review': '#F5B700',
  Flagged: '#FC7E2F',
  Resolved: '#22C55E',
  Approved: 'rgba(175,197,255,0.5)',
}

type Filter = 'All' | 'Held' | 'Under Review' | 'Resolved'
const FILTERS: Filter[] = ['All', 'Held', 'Under Review', 'Resolved']

interface RiskFraudCenterProps {
  onBack?: () => void
  onTransactionDetail?: (id: string) => void
}

export default function RiskFraudCenter({ onBack, onTransactionDetail }: RiskFraudCenterProps) {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = filter === 'All' ? TRANSACTIONS : TRANSACTIONS.filter(t => t.status === filter)

  const heldCount = TRANSACTIONS.filter(t => t.status === 'Held').length
  const reviewCount = TRANSACTIONS.filter(t => t.status === 'Under Review').length

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: 'rgba(5,11,45,1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '56px 20px 12px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 18, fontWeight: 800, color: '#fff' }}>Risk & Fraud Center</p>
      </div>

      {/* Summary strip */}
      <div style={{ display: 'flex', gap: 10, padding: '0 20px 16px', flexShrink: 0 }}>
        {[
          { label: 'Held', value: heldCount, color: '#FF4D5A' },
          { label: 'Under Review', value: reviewCount, color: '#F5B700' },
          { label: 'Total Flagged', value: TRANSACTIONS.length, color: 'rgba(175,197,255,0.6)' },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              padding: '12px 10px',
              borderRadius: 14,
              background: 'rgba(175,197,255,0.03)',
              border: '1px solid rgba(175,197,255,0.09)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 20, fontWeight: 800, color: stat.color, fontFamily: 'var(--font-mono, monospace)' }}>{stat.value}</p>
            <p style={{ fontSize: 10, color: 'rgba(175,197,255,0.45)', marginTop: 2 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 14px', flexShrink: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              height: 32,
              padding: '0 14px',
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: filter === f ? 'linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)' : 'rgba(175,197,255,0.05)',
              border: filter === f ? 'none' : '1px solid rgba(175,197,255,0.09)',
              color: filter === f ? '#fff' : 'rgba(175,197,255,0.6)',
              cursor: 'pointer',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          padding: '0 20px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {filtered.map(tx => (
          <button
            key={tx.id}
            onClick={() => onTransactionDetail?.(tx.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              borderRadius: 16,
              background: 'rgba(175,197,255,0.03)',
              border: '1px solid rgba(175,197,255,0.09)',
              textAlign: 'left',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            {/* Left: severity + info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: SEVERITY_COLORS[tx.severity],
                    background: `${SEVERITY_COLORS[tx.severity]}18`,
                    padding: '2px 7px',
                    borderRadius: 100,
                  }}
                >
                  {tx.severity}
                </span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{tx.merchant}</p>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(175,197,255,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.reason}</p>
              <p style={{ fontSize: 10, color: 'rgba(175,197,255,0.3)', marginTop: 2 }}>{tx.time}</p>
            </div>

            {/* Right: amount + status */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono, monospace)', marginBottom: 3 }}>{tx.amount}</p>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: STATUS_COLORS[tx.status],
                  background: `${STATUS_COLORS[tx.status]}15`,
                  padding: '2px 7px',
                  borderRadius: 100,
                }}
              >
                {tx.status}
              </span>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(175,197,255,0.4)', fontSize: 13 }}>
            No transactions match this filter
          </div>
        )}
      </div>
    </div>
  )
}
