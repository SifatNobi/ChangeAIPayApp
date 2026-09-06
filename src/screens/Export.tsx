import { useState } from 'react'

interface ExportProps {
  onExport?: (opts: ExportOptions) => void
  onBack?: () => void
}

interface ExportOptions {
  range: DateRange
  format: 'pdf' | 'csv'
  delivery: 'email' | 'download'
  customStart?: string
  customEnd?: string
}

type DateRange = '7d' | '30d' | '90d' | 'custom'

const RANGES: { id: DateRange; label: string; sub: string }[] = [
  { id: '7d',     label: 'Last 7 days',    sub: 'Aug 24 – Aug 31, 2026'  },
  { id: '30d',    label: 'Last 30 days',   sub: 'Aug 1 – Aug 31, 2026'   },
  { id: '90d',    label: 'Last 90 days',   sub: 'Jun 2 – Aug 31, 2026'   },
  { id: 'custom', label: 'Custom range',   sub: 'Pick start and end date' },
]

export default function Export({ onExport, onBack }: ExportProps) {
  const [range, setRange]       = useState<DateRange>('30d')
  const [format, setFormat]     = useState<'pdf' | 'csv'>('pdf')
  const [delivery, setDelivery] = useState<'email' | 'download'>('download')
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd]     = useState('')
  const [loading, setLoading]   = useState(false)

  const isValid = range !== 'custom' || (customStart.length > 0 && customEnd.length > 0)

  const handleExport = () => {
    if (!isValid || loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onExport?.({ range, format, delivery, customStart, customEnd })
    }, 700)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Export Transactions</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Date range */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Date Range</p>
          <div className="flex flex-col gap-2">
            {RANGES.map(r => (
              <button
                key={r.id}
                onClick={() => setRange(r.id)}
                className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] transition-all duration-[180ms] active:scale-[0.99]"
                style={{
                  background: range === r.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)',
                  border: `1px solid ${range === r.id ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: range === r.id ? '#0066FF' : 'rgba(175,197,255,0.3)' }}
                >
                  {range === r.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-body text-sm font-semibold text-text">{r.label}</p>
                  <p className="font-body text-xs text-text-muted">{r.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {range === 'custom' && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="font-body text-xs text-text-muted mb-1.5">Start date</p>
                <input
                  type="date"
                  value={customStart}
                  onChange={e => setCustomStart(e.target.value)}
                  className="w-full h-11 rounded-[--radius-xl] px-3 font-body text-sm text-text bg-surface border border-[color:var(--color-border)] outline-none focus:border-accent"
                />
              </div>
              <div>
                <p className="font-body text-xs text-text-muted mb-1.5">End date</p>
                <input
                  type="date"
                  value={customEnd}
                  onChange={e => setCustomEnd(e.target.value)}
                  className="w-full h-11 rounded-[--radius-xl] px-3 font-body text-sm text-text bg-surface border border-[color:var(--color-border)] outline-none focus:border-accent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Format */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Format</p>
          <div className="grid grid-cols-2 gap-3">
            {(['pdf', 'csv'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className="h-16 rounded-[--radius-xl] flex flex-col items-center justify-center gap-1 transition-all duration-[180ms]"
                style={{
                  background: format === f ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.04)',
                  border: `1px solid ${format === f ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                <p className="font-display text-base font-extrabold" style={{ color: format === f ? '#AFC5FF' : 'rgba(175,197,255,0.4)' }}>
                  {f.toUpperCase()}
                </p>
                <p className="font-body text-[10px] text-text-muted">
                  {f === 'pdf' ? 'Formatted document' : 'Spreadsheet data'}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Delivery</p>
          <div className="flex flex-col gap-2">
            {([
              { id: 'download' as const, label: 'Download',      sub: 'Save to device'              },
              { id: 'email'    as const, label: 'Send by Email',  sub: 'Sent to your registered email' },
            ]).map(d => (
              <button
                key={d.id}
                onClick={() => setDelivery(d.id)}
                className="flex items-center gap-3 h-12 px-4 rounded-[--radius-xl] transition-all duration-[180ms]"
                style={{
                  background: delivery === d.id ? 'rgba(0,102,255,0.08)' : 'rgba(175,197,255,0.04)',
                  border: `1px solid ${delivery === d.id ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: delivery === d.id ? '#0066FF' : 'rgba(175,197,255,0.3)' }}
                >
                  {delivery === d.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                </div>
                <div className="text-left">
                  <p className="font-body text-sm font-semibold text-text">{d.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{d.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleExport}
          disabled={!isValid || loading}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-40"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {loading ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M8 2a6 6 0 1 1-4.24 1.76" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Preparing…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 9v2.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V9" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M7 1v7M4.5 5.5L7 8l2.5-2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export {format.toUpperCase()}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
