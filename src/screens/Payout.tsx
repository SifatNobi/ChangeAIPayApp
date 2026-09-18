import { useState } from 'react'

function deriveBlockHash(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) { h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0 }
  const s0 = Math.abs(h)
  const chars = '0123456789ABCDEF'
  let hash = ''
  let s = s0
  for (let i = 0; i < 64; i++) { s = (s * 1664525 + 1013904223) >>> 0; hash += chars[s % 16] }
  return hash
}

function NanoVerifyRow({ seed }: { seed: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const blockHash = deriveBlockHash(seed)
  const shortHash = `${blockHash.slice(0, 8)}…${blockHash.slice(-8)}`
  const explorerUrl = `https://nanolooker.com/block/${blockHash}`
  const copy = () => {
    navigator.clipboard.writeText(blockHash).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div
      className="rounded-[--radius-2xl] overflow-hidden transition-all"
      style={{ border: '1px solid rgba(63,231,255,0.18)', background: 'rgba(0,20,60,0.6)' }}
    >
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(63,231,255,0.12)', border: '1px solid rgba(63,231,255,0.25)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10V2l8 8V2" stroke="#3FE7FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-body text-xs font-semibold text-text">Verify on Nano Network</span>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }}>
          <path d="M3 5l4 4 4-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(63,231,255,0.1)' }}>
          <div className="pt-3">
            <p className="font-body text-[9px] font-semibold uppercase tracking-wider text-text-muted mb-2">Block hash</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-[10px] text-text-2 flex-1 break-all leading-relaxed">{shortHash}</p>
              <button onClick={copy} className="h-6 px-2.5 rounded-full font-body text-[9px] font-semibold shrink-0 transition-all"
                style={{ background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(63,231,255,0.1)', color: copied ? '#22C55E' : '#3FE7FF', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(63,231,255,0.2)'}` }}>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <a href={explorerUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 font-body text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ color: '#3FE7FF' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M8 1h3v3M11 1L6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            View on NanoLooker block explorer
          </a>
          <p className="font-body text-[9px] text-text-muted leading-relaxed">
            Merchant payouts settle on the Nano network. This hash is immutable proof of the on-chain transfer.
          </p>
        </div>
      )}
    </div>
  )
}

type PayoutTab = 'schedule' | 'history'
type PayoutSchedule = 'daily' | 'weekly' | 'manual'

interface PayoutEntry {
  id: string
  amount: string
  date: string
  bank: string
  status: 'completed' | 'pending' | 'processing'
}

const PAYOUT_HISTORY: PayoutEntry[] = [
  { id: '1', amount: '$1,200.00', date: 'Sep 1, 2026', bank: 'Chase ••4821', status: 'completed' },
  { id: '2', amount: '$840.50', date: 'Aug 25, 2026', bank: 'Chase ••4821', status: 'completed' },
  { id: '3', amount: '$2,100.00', date: 'Aug 18, 2026', bank: 'Chase ••4821', status: 'completed' },
  { id: '4', amount: '$530.75', date: 'Aug 11, 2026', bank: 'Chase ••4821', status: 'completed' },
]

const STATUS_CFG = {
  completed: { label: 'Paid', color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  pending: { label: 'Pending', color: '#F5B700', bg: 'rgba(245,183,0,0.1)' },
  processing: { label: 'Processing', color: '#3FE7FF', bg: 'rgba(63,231,255,0.1)' },
}

interface PayoutProps {
  onBack?: () => void
  onLinkBank?: () => void
}

export default function Payout({ onBack, onLinkBank }: PayoutProps) {
  const [activeTab, setActiveTab] = useState<PayoutTab>('schedule')
  const [schedule, setSchedule] = useState<PayoutSchedule>('weekly')
  const [requesting, setRequesting] = useState(false)
  const [requested, setRequested] = useState(false)

  const handleManualPayout = () => {
    setRequesting(true)
    setTimeout(() => {
      setRequesting(false)
      setRequested(true)
    }, 1600)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Payouts</p>
      </div>

      {/* Tab bar */}
      <div
        className="flex mx-5 mb-1 p-1 rounded-[--radius-xl] gap-1"
        style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
      >
        {(['schedule', 'history'] as PayoutTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 h-8 rounded-[--radius-lg] font-body text-xs font-semibold transition-all capitalize"
            style={{
              background: activeTab === tab ? 'var(--color-accent)' : 'transparent',
              color: activeTab === tab ? 'white' : 'rgba(175,197,255,0.5)',
            }}
          >
            {tab === 'schedule' ? 'Schedule' : 'History'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {activeTab === 'schedule' ? (
          <>
            {/* Balance available */}
            <div
              className="rounded-[--radius-2xl] px-5 py-5"
              style={{
                background: 'linear-gradient(135deg, rgba(0,40,100,0.95) 0%, rgba(13,26,74,0.98) 100%)',
                border: '1px solid rgba(0,102,255,0.25)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            >
              <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1">Available for payout</p>
              <p className="font-display text-3xl font-extrabold text-white">$543.50</p>
              <p className="font-body text-xs text-text-muted mt-1">Updated just now</p>

              <div
                className="mt-4 pt-4 flex items-center gap-3"
                style={{ borderTop: '1px solid rgba(175,197,255,0.1)' }}
              >
                <div
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                  style={{ background: 'rgba(34,197,94,0.12)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#22C55E" strokeWidth="1.1" />
                    <path d="M1.5 6h11" stroke="#22C55E" strokeWidth="1.1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs font-semibold text-text">Chase Business ••4821</p>
                  <p className="font-body text-[10px] text-text-muted">Default payout account</p>
                </div>
                <button
                  onClick={onLinkBank}
                  className="font-body text-xs font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Change
                </button>
              </div>
            </div>

            {/* Next payout */}
            <div
              className="flex items-center gap-3 px-4 py-4 rounded-[--radius-xl]"
              style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <div
                className="w-10 h-10 rounded-[13px] flex items-center justify-center shrink-0"
                style={{ background: 'rgba(34,197,94,0.12)' }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3v9M5 8l4-5 4 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 15h12" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-text">Next payout</p>
                <p className="font-body text-[10px] text-text-muted">Wednesday, Sep 3 — est. arrival Fri Sep 5</p>
              </div>
              <p className="font-mono text-sm font-bold ml-auto" style={{ color: '#22C55E' }}>$543.50</p>
            </div>

            {/* Payout schedule */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Payout Schedule</p>
              <div className="flex flex-col gap-2">
                {([
                  { id: 'daily' as const, label: 'Daily', sub: 'Funds sent every business day' },
                  { id: 'weekly' as const, label: 'Weekly', sub: 'Every Wednesday — funds arrive Friday' },
                  { id: 'manual' as const, label: 'Manual', sub: "Request payout whenever you're ready" },
                ]).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setSchedule(opt.id)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] text-left transition-all"
                    style={{
                      background: schedule === opt.id ? 'rgba(0,102,255,0.08)' : 'rgba(175,197,255,0.02)',
                      border: `1px solid ${schedule === opt.id ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.09)'}`,
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        border: `2px solid ${schedule === opt.id ? 'var(--color-accent)' : 'rgba(175,197,255,0.2)'}`,
                        background: schedule === opt.id ? 'var(--color-accent)' : 'transparent',
                      }}
                    >
                      {schedule === opt.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-xs font-semibold text-text">{opt.label}</p>
                      <p className="font-body text-[10px] text-text-muted">{opt.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual payout CTA */}
            {requested ? (
              <div
                className="flex items-center gap-3 px-4 py-4 rounded-[--radius-xl]"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-xs font-semibold" style={{ color: '#22C55E' }}>
                  Payout requested — arriving within 1–2 business days
                </p>
              </div>
            ) : (
              <button
                onClick={handleManualPayout}
                disabled={requesting}
                className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                style={{ background: requesting ? 'rgba(0,102,255,0.5)' : 'var(--gradient-primary)' }}
              >
                {requesting ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    Request Manual Payout
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            )}

            {/* Notes */}
            <div
              className="flex items-start gap-2.5 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.18)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
                <circle cx="6" cy="6" r="5" stroke="#F5B700" strokeWidth="1" />
                <path d="M6 5v3M6 3.5v.5" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <p className="font-body text-[10px] text-text-muted leading-relaxed">
                Payouts are processed on business days only. Weekends and federal holidays extend the timeline by 1–2 days.
              </p>
            </div>
          {/* Nano verification */}
          <NanoVerifyRow seed="PAYOUT-MERCHANT-2026-0001" />
          </>
        ) : (
          /* History tab */
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
              Payout History
            </p>
            <div
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
            >
              {PAYOUT_HISTORY.map((entry, i) => {
                const cfg = STATUS_CFG[entry.status]
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 px-4 py-4"
                    style={{ borderBottom: i < PAYOUT_HISTORY.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}
                  >
                    <div
                      className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(34,197,94,0.1)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v7M5 7l3-4 3 4" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 13h10" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-semibold text-text">{entry.bank}</p>
                      <p className="font-body text-[10px] text-text-muted">{entry.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-mono text-xs font-bold text-text">{entry.amount}</p>
                      <p
                        className="font-body text-[10px] font-semibold"
                        style={{ color: cfg.color }}
                      >
                        {cfg.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Lifetime summary */}
            <div
              className="mt-3 px-4 py-4 rounded-[--radius-xl] flex items-center"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}
            >
              <div>
                <p className="font-body text-xs text-text-muted">Total paid out</p>
                <p className="font-mono text-base font-extrabold text-text">$4,671.25</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-body text-xs text-text-muted">Payouts this month</p>
                <p className="font-mono text-sm font-bold text-text">$2,040.50</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
