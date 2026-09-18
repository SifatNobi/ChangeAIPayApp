import { useState } from 'react'

interface Statement {
  id: string
  month: string
  year: number
  dateRange: string
  sizeKB: number
  transactions: number
  openingBalance: number
  closingBalance: number
}

const STATEMENTS: Statement[] = []

const YEARS = [2026, 2025]

interface StatementsProps {
  onBack?: () => void
}

export default function Statements({ onBack }: StatementsProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set())

  const filtered = STATEMENTS.filter(s => s.year === selectedYear)

  const handleDownload = (id: string) => {
    if (downloading) return
    setDownloading(id)
    setTimeout(() => {
      setDownloading(null)
      setDownloaded(prev => new Set(prev).add(id))
    }, 1200)
  }

  const fmt = (n: number) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Statements</p>
        <div className="flex gap-1.5">
          {YEARS.map(y => (
            <button key={y} onClick={() => setSelectedYear(y)}
              className="h-8 px-3.5 rounded-full font-body text-xs font-semibold transition-all"
              style={{ background: selectedYear === y ? 'rgba(0,102,255,0.14)' : 'rgba(175,197,255,0.06)', border: `1px solid ${selectedYear === y ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.12)'}`, color: selectedYear === y ? '#7CAFFF' : 'rgba(175,197,255,0.5)' }}>
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {/* Count info */}
        <p className="font-body text-xs text-text-muted">{filtered.length} statement{filtered.length !== 1 ? 's' : ''} · {selectedYear}</p>

        {filtered.map(s => {
          const isDL = downloading === s.id
          const done = downloaded.has(s.id)
          const delta = s.closingBalance - s.openingBalance
          const positive = delta >= 0

          return (
            <div key={s.id} className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
              {/* Top row */}
              <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.22)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="#0066FF" strokeWidth="1.1" />
                    <path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="#0066FF" strokeWidth="0.9" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{s.month} {s.year}</p>
                  <p className="font-body text-[10px] text-text-muted">{s.dateRange}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-semibold" style={{ color: positive ? '#22C55E' : '#FF4D5A' }}>
                    {positive ? '+' : ''}{fmt(delta)}
                  </p>
                  <p className="font-body text-[10px] text-text-muted">net change</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex px-4 pb-3 gap-4">
                <div>
                  <p className="font-body text-[9px] text-text-muted uppercase tracking-wider">Opening</p>
                  <p className="font-mono text-xs text-text">{fmt(s.openingBalance)}</p>
                </div>
                <div>
                  <p className="font-body text-[9px] text-text-muted uppercase tracking-wider">Closing</p>
                  <p className="font-mono text-xs text-text">{fmt(s.closingBalance)}</p>
                </div>
                <div>
                  <p className="font-body text-[9px] text-text-muted uppercase tracking-wider">Transactions</p>
                  <p className="font-mono text-xs text-text">{s.transactions}</p>
                </div>
                <div className="ml-auto self-end">
                  <p className="font-body text-[9px] text-text-muted">{s.sizeKB} KB</p>
                </div>
              </div>

              {/* Download bar */}
              <div className="px-4 pb-4">
                <button onClick={() => handleDownload(s.id)} disabled={isDL}
                  className="w-full h-10 rounded-[--radius-xl] flex items-center justify-center gap-2 font-body text-xs font-semibold transition-all active:scale-[0.97] disabled:opacity-60"
                  style={{ background: done ? 'rgba(34,197,94,0.08)' : 'rgba(0,102,255,0.08)', border: `1px solid ${done ? 'rgba(34,197,94,0.25)' : 'rgba(0,102,255,0.22)'}`, color: done ? '#22C55E' : '#7CAFFF' }}>
                  {isDL ? (
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="rgba(0,102,255,0.25)" strokeWidth="1.5" />
                      <path d="M7 1.5a5.5 5.5 0 0 1 5.5 5.5" stroke="#7CAFFF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : done ? (
                    <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3.5 3.5 5.5-5.5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg> Downloaded</>
                  ) : (
                    <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v7M3.5 6.5l3 3 3-3" stroke="#7CAFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 11h9" stroke="#7CAFFF" strokeWidth="1.1" strokeLinecap="round" /></svg> Download PDF</>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
