import { useState } from 'react'

type DocKind = 'annual_summary' | 'crypto_gains' | 'interest' | 'form'

interface TaxDoc {
  id: string
  title: string
  description: string
  year: number
  kind: DocKind
  sizeKB: number
  form?: string
  cryptoTxCount?: number
  netGain?: number
}

const KIND_CONFIG: Record<DocKind, { label: string; color: string; icon: React.ReactNode }> = {
  annual_summary: {
    label: 'Annual Summary',
    color: '#3FE7FF',
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="#3FE7FF" strokeWidth="1.1" /><path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="#3FE7FF" strokeWidth="0.9" strokeLinecap="round" /></svg>,
  },
  crypto_gains: {
    label: 'Crypto Gains/Losses',
    color: '#F5B700',
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#F5B700" strokeWidth="1.1" /><path d="M5 9l4-4M5 5h4v4" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  interest: {
    label: 'Interest Earned',
    color: '#22C55E',
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-3 2.5 2.5L12 4" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  form: {
    label: 'IRS Form',
    color: '#9945FF',
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2.5" y="1" width="9" height="12" rx="1.5" stroke="#9945FF" strokeWidth="1.1" /><path d="M5 4.5h4M5 7h4M5 9.5h2.5" stroke="#9945FF" strokeWidth="0.9" strokeLinecap="round" /></svg>,
  },
}

const TAX_DOCS: TaxDoc[] = []

const YEARS = [2025, 2024]

interface TaxDocumentsProps {
  onBack?: () => void
}

export default function TaxDocuments({ onBack }: TaxDocumentsProps) {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set())

  const filtered = TAX_DOCS.filter(d => d.year === selectedYear)

  const handleDownload = (id: string) => {
    if (downloading) return
    setDownloading(id)
    setTimeout(() => {
      setDownloading(null)
      setDownloaded(prev => new Set(prev).add(id))
    }, 1300)
  }

  const fmtAmt = (n: number) => {
    const abs = Math.abs(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return `${n < 0 ? '-' : '+'}$${abs}`
  }

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Tax Documents</p>
          <p className="font-body text-[10px] text-text-muted">Download for tax filing</p>
        </div>
        <div className="flex gap-1.5">
          {YEARS.map(y => (
            <button key={y} onClick={() => setSelectedYear(y)}
              className="h-8 px-3.5 rounded-full font-body text-xs font-semibold transition-all"
              style={{ background: selectedYear === y ? 'rgba(245,183,0,0.12)' : 'rgba(175,197,255,0.06)', border: `1px solid ${selectedYear === y ? 'rgba(245,183,0,0.35)' : 'rgba(175,197,255,0.12)'}`, color: selectedYear === y ? '#F5B700' : 'rgba(175,197,255,0.5)' }}>
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>

        {/* Crypto reporting notice */}
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
            <path d="M7 1.5L1 12.5h12L7 1.5Z" stroke="#F5B700" strokeWidth="1" strokeLinejoin="round" />
            <path d="M7 5.5v3" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" />
            <circle cx="7" cy="10" r="0.55" fill="#F5B700" />
          </svg>
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            Crypto gains/losses are sourced from your transaction history and may be required for tax filing. Consult a tax advisor for guidance.
          </p>
        </div>

        {filtered.map(doc => {
          const cfg = KIND_CONFIG[doc.kind]
          const isDL = downloading === doc.id
          const done = downloaded.has(doc.id)

          return (
            <div key={doc.id} className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
              <div className="px-4 pt-4 pb-3 flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${cfg.color}12`, border: `1px solid ${cfg.color}30` }}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="font-body text-sm font-semibold text-text">{doc.title}</p>
                    {doc.form && (
                      <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: `${cfg.color}12`, color: cfg.color, border: `1px solid ${cfg.color}25` }}>
                        {doc.form}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-[10px] text-text-muted leading-relaxed">{doc.description}</p>
                  {doc.kind === 'crypto_gains' && doc.netGain !== undefined && (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{ background: doc.netGain >= 0 ? 'rgba(34,197,94,0.1)' : 'rgba(255,77,90,0.1)' }}>
                        <p className="font-mono text-[11px] font-bold" style={{ color: doc.netGain >= 0 ? '#22C55E' : '#FF4D5A' }}>
                          {fmtAmt(doc.netGain)} net
                        </p>
                      </div>
                      <p className="font-body text-[10px] text-text-muted">{doc.cryptoTxCount} trades</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-4 pb-4 flex items-center gap-3">
                <p className="font-body text-[10px] text-text-muted">{doc.sizeKB} KB · PDF</p>
                <button onClick={() => handleDownload(doc.id)} disabled={isDL}
                  className="ml-auto h-9 px-4 rounded-[--radius-xl] flex items-center gap-2 font-body text-xs font-semibold transition-all active:scale-[0.97] disabled:opacity-60"
                  style={{ background: done ? 'rgba(34,197,94,0.08)' : `${cfg.color}12`, border: `1px solid ${done ? 'rgba(34,197,94,0.25)' : `${cfg.color}2A`}`, color: done ? '#22C55E' : cfg.color }}>
                  {isDL ? (
                    <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle cx="6.5" cy="6.5" r="5" stroke="rgba(175,197,255,0.2)" strokeWidth="1.3" />
                      <path d="M6.5 1.5a5 5 0 0 1 5 5" stroke={cfg.color} strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  ) : done ? (
                    <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg> Downloaded</>
                  ) : (
                    <><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v6M3.5 6l2.5 2.5 2.5-2.5" stroke={cfg.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 10h8" stroke={cfg.color} strokeWidth="1" strokeLinecap="round" /></svg> Download</>
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
