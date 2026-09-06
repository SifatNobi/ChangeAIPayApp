import { useState, useMemo } from 'react'

interface CurrencyOption {
  code: string
  name: string
  symbol: string
  flag: string
  region: string
  exampleBalance: string
  exampleAmount: string
}

const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar',          symbol: '$',   flag: '🇺🇸', region: 'United States',   exampleBalance: '$12,450.00',    exampleAmount: '$250.00'   },
  { code: 'EUR', name: 'Euro',               symbol: '€',   flag: '🇪🇺', region: 'Euro Area',        exampleBalance: '€11,520.00',   exampleAmount: '€231.00'   },
  { code: 'GBP', name: 'British Pound',      symbol: '£',   flag: '🇬🇧', region: 'United Kingdom',   exampleBalance: '£9,850.00',    exampleAmount: '£197.00'   },
  { code: 'JPY', name: 'Japanese Yen',       symbol: '¥',   flag: '🇯🇵', region: 'Japan',            exampleBalance: '¥1,892,400',   exampleAmount: '¥38,000'   },
  { code: 'CNY', name: 'Chinese Yuan',       symbol: '¥',   flag: '🇨🇳', region: 'China',            exampleBalance: '¥89,204.00',   exampleAmount: '¥1,793.00' },
  { code: 'KRW', name: 'South Korean Won',   symbol: '₩',   flag: '🇰🇷', region: 'South Korea',      exampleBalance: '₩16,506,000',  exampleAmount: '₩331,600'  },
  { code: 'INR', name: 'Indian Rupee',       symbol: '₹',   flag: '🇮🇳', region: 'India',            exampleBalance: '₹10,34,268',   exampleAmount: '₹20,763'   },
  { code: 'AUD', name: 'Australian Dollar',  symbol: 'A$',  flag: '🇦🇺', region: 'Australia',        exampleBalance: 'A$18,904.00',  exampleAmount: 'A$379.00'  },
  { code: 'CAD', name: 'Canadian Dollar',    symbol: 'C$',  flag: '🇨🇦', region: 'Canada',           exampleBalance: 'C$16,992.00',  exampleAmount: 'C$341.00'  },
  { code: 'CHF', name: 'Swiss Franc',        symbol: 'Fr',  flag: '🇨🇭', region: 'Switzerland',      exampleBalance: 'Fr 11,160.00', exampleAmount: 'Fr 224.00' },
  { code: 'SGD', name: 'Singapore Dollar',   symbol: 'S$',  flag: '🇸🇬', region: 'Singapore',        exampleBalance: 'S$16,798.00',  exampleAmount: 'S$337.00'  },
  { code: 'HKD', name: 'Hong Kong Dollar',   symbol: 'HK$', flag: '🇭🇰', region: 'Hong Kong',        exampleBalance: 'HK$97,620.00', exampleAmount: 'HK$1,960'  },
  { code: 'MYR', name: 'Malaysian Ringgit',  symbol: 'RM',  flag: '🇲🇾', region: 'Malaysia',         exampleBalance: 'RM 58,514.00', exampleAmount: 'RM 1,175'  },
  { code: 'IDR', name: 'Indonesian Rupiah',  symbol: 'Rp',  flag: '🇮🇩', region: 'Indonesia',        exampleBalance: 'Rp 200.172.000', exampleAmount: 'Rp 4.018.000' },
  { code: 'THB', name: 'Thai Baht',          symbol: '฿',   flag: '🇹🇭', region: 'Thailand',         exampleBalance: '฿456,000',     exampleAmount: '฿9,160'    },
  { code: 'PHP', name: 'Philippine Peso',    symbol: '₱',   flag: '🇵🇭', region: 'Philippines',      exampleBalance: '₱718,800',     exampleAmount: '₱14,450'   },
  { code: 'BRL', name: 'Brazilian Real',     symbol: 'R$',  flag: '🇧🇷', region: 'Brazil',           exampleBalance: 'R$ 63.728,00', exampleAmount: 'R$ 1.280'  },
  { code: 'MXN', name: 'Mexican Peso',       symbol: 'MX$', flag: '🇲🇽', region: 'Mexico',           exampleBalance: 'MX$216.600',   exampleAmount: 'MX$4.348'  },
  { code: 'AED', name: 'UAE Dirham',         symbol: 'د.إ', flag: '🇦🇪', region: 'UAE',              exampleBalance: '45.712 د.إ',   exampleAmount: '918 د.إ'   },
  { code: 'SAR', name: 'Saudi Riyal',        symbol: '﷼',   flag: '🇸🇦', region: 'Saudi Arabia',     exampleBalance: '46.688 ﷼',     exampleAmount: '938 ﷼'     },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R',   flag: '🇿🇦', region: 'South Africa',     exampleBalance: 'R 228.900',    exampleAmount: 'R 4.596'   },
  { code: 'NGN', name: 'Nigerian Naira',     symbol: '₦',   flag: '🇳🇬', region: 'Nigeria',          exampleBalance: '₦19.800.000',  exampleAmount: '₦397.500'  },
  { code: 'KES', name: 'Kenyan Shilling',    symbol: 'KSh', flag: '🇰🇪', region: 'Kenya',            exampleBalance: 'KSh 1.621.500', exampleAmount: 'KSh 32.563' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', region: 'New Zealand',      exampleBalance: 'NZ$20.604',    exampleAmount: 'NZ$414'    },
  { code: 'NOK', name: 'Norwegian Krone',    symbol: 'kr',  flag: '🇳🇴', region: 'Norway',           exampleBalance: 'kr 134.940',   exampleAmount: 'kr 2.710'  },
  { code: 'SEK', name: 'Swedish Krona',      symbol: 'kr',  flag: '🇸🇪', region: 'Sweden',           exampleBalance: 'kr 132.948',   exampleAmount: 'kr 2.670'  },
  { code: 'DKK', name: 'Danish Krone',       symbol: 'kr',  flag: '🇩🇰', region: 'Denmark',          exampleBalance: 'kr 85.956',    exampleAmount: 'kr 1.726'  },
  { code: 'PLN', name: 'Polish Zloty',       symbol: 'zł',  flag: '🇵🇱', region: 'Poland',           exampleBalance: '50.472 zł',    exampleAmount: '1.014 zł'  },
  { code: 'TRY', name: 'Turkish Lira',       symbol: '₺',   flag: '🇹🇷', region: 'Turkey',           exampleBalance: '₺404.220',     exampleAmount: '₺8.118'    },
]

interface CurrencySelectionProps {
  onBack?: () => void
  onApply?: (code: string) => void
  currentCode?: string
}

export default function CurrencySelection({ onBack, onApply, currentCode = 'USD' }: CurrencySelectionProps) {
  const [selected, setSelected] = useState(currentCode)
  const [applied, setApplied] = useState(currentCode)
  const [search, setSearch] = useState('')
  const [applying, setApplying] = useState(false)
  const [justApplied, setJustApplied] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return CURRENCIES
    return CURRENCIES.filter(c =>
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q)
    )
  }, [search])

  const preview = CURRENCIES.find(c => c.code === selected)
  const appliedCurrency = CURRENCIES.find(c => c.code === applied)

  const handleApply = () => {
    if (selected === applied || applying) return
    setApplying(true)
    setTimeout(() => {
      setApplied(selected)
      setApplying(false)
      setJustApplied(true)
      onApply?.(selected)
      setTimeout(() => setJustApplied(false), 2400)
    }, 900)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Display Currency</p>
          <p className="font-body text-[10px] text-text-muted">
            {appliedCurrency?.code} ({appliedCurrency?.symbol}) — active
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Distinction note */}
        <div className="flex items-start gap-3 px-3.5 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.15)' }}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: 'rgba(245,183,0,0.12)', border: '1px solid rgba(245,183,0,0.2)' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 2v4" stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="5" cy="7.5" r="0.8" fill="#F5B700" />
            </svg>
          </div>
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            <span className="text-text font-semibold">Display only.</span> This controls how balances and reports are shown on screen. It does not change the currency your account holds or the currency used in actual transactions.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2.5 px-3.5 h-11 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
            <path d="M10 10l2.5 2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search currency, code, or region…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="w-5 h-5 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Preview card */}
        {preview && (
          <div
            className="px-4 py-4 rounded-[--radius-2xl]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,30,80,0.7) 0%, rgba(10,20,50,0.85) 100%)',
              border: '1px solid rgba(0,102,255,0.2)',
              boxShadow: '0 0 20px rgba(0,102,255,0.1)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{preview.flag}</span>
              <div className="flex-1">
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(77,159,255,0.7)' }}>
                  Display preview
                </p>
                <p className="font-display text-sm font-extrabold text-text">
                  {preview.name}
                  <span className="font-mono text-xs font-bold ml-2" style={{ color: 'rgba(77,159,255,0.8)' }}>{preview.code}</span>
                </p>
              </div>
              {selected === applied && (
                <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold"
                  style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
                  Active
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-2.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.04)' }}>
                <p className="font-body text-[10px] text-text-muted">Balance shown as</p>
                <p className="font-mono text-sm font-bold text-text">{preview.exampleBalance}</p>
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.04)' }}>
                <p className="font-body text-[10px] text-text-muted">Transaction shown as</p>
                <p className="font-mono text-sm font-bold text-text">{preview.exampleAmount}</p>
              </div>
            </div>
          </div>
        )}

        {/* Currency list */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2.5">
            {filtered.length} {filtered.length === 1 ? 'currency' : 'currencies'}
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.01)' }}>
            {filtered.map((c, i) => {
              const isSel = selected === c.code
              const isCur = applied === c.code
              return (
                <button key={c.code} onClick={() => { setSelected(c.code); setJustApplied(false) }}
                  className="flex items-center gap-3 px-4 py-3 w-full text-left transition-all"
                  style={{
                    background: isSel ? 'rgba(0,102,255,0.07)' : 'transparent',
                    borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none',
                  }}>
                  <span className="text-base shrink-0 w-8 text-center">{c.flag}</span>
                  <div
                    className="w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 font-mono text-xs font-bold"
                    style={{ background: isSel ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.05)', color: isSel ? '#4D9FFF' : 'rgba(175,197,255,0.5)' }}>
                    {c.symbol.length <= 2 ? c.symbol : c.code.slice(0,1)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-text truncate">{c.name}</p>
                    <p className="font-mono text-[10px] text-text-muted">{c.code} · {c.region}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isCur && (
                      <span className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>Active</span>
                    )}
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                      style={{ borderColor: isSel ? '#0066FF' : 'rgba(175,197,255,0.2)' }}>
                      {isSel && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0066FF' }} />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="font-body text-sm text-text-muted">No currencies match "{search}"</p>
          </div>
        )}

        {/* Apply */}
        {justApplied ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Display currency applied</p>
          </div>
        ) : (
          <button
            onClick={handleApply}
            disabled={applying || selected === applied}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
            style={{ background: 'var(--gradient-primary)' }}>
            {applying ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {selected === applied ? 'Currency applied' : `Apply ${selected}`}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
