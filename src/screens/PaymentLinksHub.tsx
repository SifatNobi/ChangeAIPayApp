import { useState } from 'react'

interface PaymentLink {
  id: string
  name: string
  amount: string
  type: string
  uses: string
  status: 'Active' | 'Expired' | 'Completed'
  collected: string
  completions: number
  views: number
  created: string
}

const LINKS: PaymentLink[] = []

const STATUS_COLORS: Record<string, string> = {
  Active: '#22C55E',
  Expired: 'rgba(175,197,255,0.4)',
  Completed: '#0066FF',
}

type Filter = 'All' | 'Active' | 'Expired' | 'Completed'
const FILTERS: Filter[] = ['All', 'Active', 'Expired', 'Completed']

interface PaymentLinksHubProps {
  onBack?: () => void
  onCreateLink?: () => void
  onLinkDetail?: (id: string) => void
}

export default function PaymentLinksHub({ onBack, onCreateLink, onLinkDetail }: PaymentLinksHubProps) {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = filter === 'All' ? LINKS : LINKS.filter(l => l.status === filter)

  return (
    <div
      className="flex flex-col"
      style={{ width: 390, minHeight: 844, background: 'rgba(5,11,45,1)', fontFamily: 'inherit', position: 'relative' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-3 shrink-0">
        <button
          onClick={onBack}
          style={{ width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 18, fontWeight: 800, color: '#fff', flex: 1 }}>Payment Links</p>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-5 pb-4 shrink-0" style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
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
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {filtered.map(link => (
          <button
            key={link.id}
            onClick={() => onLinkDetail?.(link.id)}
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
            {/* Icon */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'rgba(0,102,255,0.12)',
                border: '1px solid rgba(0,102,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 9a4 4 0 005.66 0l2-2a4 4 0 00-5.66-5.66L7.5 2.83" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11 9a4 4 0 00-5.66 0l-2 2a4 4 0 005.66 5.66l1.49-1.49" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.name}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: 'rgba(175,197,255,0.5)' }}>{link.amount}</span>
                <span style={{ fontSize: 10, color: 'rgba(175,197,255,0.3)' }}>·</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: STATUS_COLORS[link.status],
                    background: `${STATUS_COLORS[link.status]}15`,
                    padding: '1px 7px',
                    borderRadius: 100,
                  }}
                >
                  {link.status}
                </span>
              </div>
            </div>

            {/* Collected */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono, monospace)' }}>{link.collected}</p>
              <p style={{ fontSize: 10, color: 'rgba(175,197,255,0.4)' }}>collected</p>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(175,197,255,0.4)', fontSize: 13 }}>
            No {filter.toLowerCase()} links
          </div>
        )}
      </div>

      {/* Create Link button */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
        }}
      >
        <button
          onClick={onCreateLink}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)',
            border: 'none',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 0.2,
          }}
        >
          + Create Link
        </button>
      </div>
    </div>
  )
}
