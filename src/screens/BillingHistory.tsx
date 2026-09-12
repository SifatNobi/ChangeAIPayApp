import { useState } from 'react'

type BillingStatus = 'paid' | 'failed' | 'refunded' | 'pending'

interface BillingEntry {
  id: string
  date: string
  plan: string
  planColor: string
  amount: number
  status: BillingStatus
  invoiceId: string
  cycle: 'monthly' | 'annual'
}

const STATUS_CFG: Record<BillingStatus, { label: string; color: string; bg: string }> = {
  paid:     { label: 'Paid',     color: '#22C55E', bg: 'rgba(34,197,94,0.1)'   },
  failed:   { label: 'Failed',   color: '#FF4D5A', bg: 'rgba(255,77,90,0.1)'  },
  refunded: { label: 'Refunded', color: '#F5B700', bg: 'rgba(245,183,0,0.1)'  },
  pending:  { label: 'Pending',  color: '#AFC5FF', bg: 'rgba(175,197,255,0.1)' },
}

const PLAN_COLORS: Record<string, string> = { Free: 'rgba(175,197,255,0.4)', Edge: '#3FE7FF', Prime: '#0066FF', Apex: '#F5B700' }

const HISTORY: BillingEntry[] = []

interface BillingHistoryProps {
  onBack?: () => void
  onViewInvoice?: (invoiceId: string, entry: BillingEntry) => void
}

export default function BillingHistory({ onBack, onViewInvoice }: BillingHistoryProps) {
  const [filter, setFilter] = useState<BillingStatus | 'all'>('all')

  const filtered = filter === 'all' ? HISTORY : HISTORY.filter(e => e.status === filter)
  const totalPaid = HISTORY.filter(e => e.status === 'paid').reduce((s, e) => s + e.amount, 0)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Billing History</p>
          <p className="font-body text-[10px] text-text-muted">${totalPaid.toFixed(2)} total paid in 2026</p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {(['all', 'paid', 'failed', 'refunded', 'pending'] as const).map(f => {
            const active = filter === f
            const cfg = f !== 'all' ? STATUS_CFG[f] : null
            return (
              <button key={f} onClick={() => setFilter(f)}
                className="shrink-0 h-8 px-3.5 rounded-full font-body text-xs font-semibold capitalize whitespace-nowrap transition-all"
                style={{ background: active ? (cfg ? cfg.bg : 'rgba(175,197,255,0.12)') : 'rgba(175,197,255,0.05)', border: `1px solid ${active ? (cfg ? `${cfg.color}44` : 'rgba(175,197,255,0.3)') : 'rgba(175,197,255,0.1)'}`, color: active ? (cfg ? cfg.color : 'rgba(175,197,255,0.85)') : 'rgba(175,197,255,0.45)' }}>
                {f}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-2" style={{ scrollbarWidth: 'none' }}>
        {filtered.map(entry => {
          const st = STATUS_CFG[entry.status]
          return (
            <button key={entry.id} onClick={() => onViewInvoice?.(entry.invoiceId, entry)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] text-left transition-all hover:bg-surface-hi active:scale-[0.98]"
              style={{ background: 'rgba(175,197,255,0.03)', border: `1px solid ${entry.status === 'failed' ? 'rgba(255,77,90,0.22)' : 'rgba(175,197,255,0.09)'}` }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${entry.planColor}12`, border: `1px solid ${entry.planColor}28` }}>
                <p className="font-display text-xs font-extrabold" style={{ color: entry.planColor }}>{entry.plan[0]}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-body text-sm font-semibold text-text">{entry.plan} · {entry.cycle}</p>
                  <span className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                </div>
                <p className="font-body text-[10px] text-text-muted">{entry.date} · {entry.invoiceId}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-sm font-bold text-text">${entry.amount.toFixed(2)}</p>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto mt-1">
                  <path d="M4 2.5l3.5 3.5L4 9.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
