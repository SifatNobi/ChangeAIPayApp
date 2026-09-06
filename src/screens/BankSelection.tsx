import { useState, useMemo } from 'react'

interface Bank {
  id: string
  name: string
  abbr: string
  color: string
  bg: string
  popular?: boolean
  supported: boolean
}

interface BankSelectionProps {
  onSelectBank?: (bank: Bank) => void
  onManualEntry?: () => void
  onBack?: () => void
}

const BANKS: Bank[] = [
  { id: 'chase',      name: 'Chase',           abbr: 'JP',  color: '#fff',    bg: '#117ACA', popular: true,  supported: true },
  { id: 'bofa',       name: 'Bank of America', abbr: 'BA',  color: '#fff',    bg: '#C0392B', popular: true,  supported: true },
  { id: 'wells',      name: 'Wells Fargo',     abbr: 'WF',  color: '#fff',    bg: '#D4292D', popular: true,  supported: true },
  { id: 'citi',       name: 'Citibank',        abbr: 'CI',  color: '#fff',    bg: '#0563AF', popular: true,  supported: true },
  { id: 'usbank',     name: 'U.S. Bank',       abbr: 'US',  color: '#fff',    bg: '#2E5FA3', popular: true,  supported: true },
  { id: 'capone',     name: 'Capital One',     abbr: 'C1',  color: '#fff',    bg: '#C62B38', popular: true,  supported: true },
  { id: 'td',         name: 'TD Bank',         abbr: 'TD',  color: '#fff',    bg: '#2E7D32', popular: false, supported: true },
  { id: 'pnc',        name: 'PNC Bank',        abbr: 'PN',  color: '#fff',    bg: '#F06C00', popular: false, supported: true },
  { id: 'truist',     name: 'Truist',          abbr: 'TR',  color: '#fff',    bg: '#5A2D82', popular: false, supported: true },
  { id: 'ally',       name: 'Ally Bank',       abbr: 'AL',  color: '#fff',    bg: '#5A16D5', popular: false, supported: true },
  { id: 'marcus',     name: 'Marcus / Goldman', abbr: 'GS', color: '#fff',    bg: '#1A1A1A', popular: false, supported: true },
  { id: 'barclays',   name: 'Barclays',        abbr: 'BC',  color: '#fff',    bg: '#00AEEF', popular: false, supported: true },
  { id: 'hsbc',       name: 'HSBC',            abbr: 'HS',  color: '#fff',    bg: '#DB0011', popular: false, supported: true },
  { id: 'navy',       name: 'Navy Federal',    abbr: 'NF',  color: '#fff',    bg: '#003865', popular: false, supported: true },
  { id: 'schwab',     name: 'Charles Schwab',  abbr: 'CS',  color: '#fff',    bg: '#00A0DC', popular: false, supported: true },
  { id: 'discover',   name: 'Discover',        abbr: 'DI',  color: '#fff',    bg: '#F76F20', popular: false, supported: true },
]

function BankLogo({ bank, size = 40 }: { bank: Bank; size?: number }) {
  return (
    <div
      className="rounded-xl flex items-center justify-center shrink-0 font-body font-bold"
      style={{
        width: size, height: size,
        background: bank.bg,
        color: bank.color,
        fontSize: size * 0.28,
        letterSpacing: '-0.02em',
        boxShadow: `0 2px 8px ${bank.bg}44`,
      }}
    >
      {bank.abbr}
    </div>
  )
}

export default function BankSelection({ onSelectBank, onManualEntry, onBack }: BankSelectionProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return BANKS
    const q = query.toLowerCase()
    return BANKS.filter(b => b.name.toLowerCase().includes(q) || b.abbr.toLowerCase().includes(q))
  }, [query])

  const popular = filtered.filter(b => b.popular && !query.trim())
  const all = query.trim() ? filtered : filtered.filter(b => !b.popular)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi shrink-0"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div>
          <p className="font-display text-base font-extrabold text-text leading-tight">Link a Bank</p>
          <p className="font-body text-xs text-text-muted">Select your bank to get started</p>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div
          className="flex items-center gap-3 h-12 px-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.15)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" />
            <path d="M10.5 10.5l3 3" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search your bank…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
            autoComplete="off"
          />
          {query && (
            <button onClick={() => setQuery('')} className="w-5 h-5 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-1" style={{ scrollbarWidth: 'none' }}>
        {/* Popular */}
        {popular.length > 0 && (
          <>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Popular</p>
            {popular.map(bank => (
              <BankRow key={bank.id} bank={bank} onSelect={onSelectBank} />
            ))}
            {all.length > 0 && (
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mt-4 mb-2">All Banks</p>
            )}
          </>
        )}

        {/* All / filtered */}
        {all.map(bank => (
          <BankRow key={bank.id} bank={bank} onSelect={onSelectBank} />
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="10" width="32" height="22" rx="3" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" />
              <path d="M4 18h32" stroke="rgba(175,197,255,0.2)" strokeWidth="1.3" />
              <circle cx="28" cy="28" r="8" fill="#050B2D" stroke="rgba(175,197,255,0.2)" strokeWidth="1.3" />
              <path d="M24 28h8M28 24v8" stroke="rgba(175,197,255,0.3)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-text-2">No banks matched "{query}"</p>
              <p className="font-body text-xs text-text-muted mt-1">Try the manual entry option below</p>
            </div>
          </div>
        )}

        {/* Manual entry */}
        <div className="mt-4 pt-4 border-t border-[color:var(--color-border)]">
          <button
            onClick={onManualEntry}
            className="w-full flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] transition-all duration-[180ms] active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px dashed rgba(175,197,255,0.2)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.15)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h8M2 12h5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-body text-sm font-semibold text-text-2">Manual entry</p>
              <p className="font-body text-xs text-text-muted">Routing + account number</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function BankRow({ bank, onSelect }: { bank: Bank; onSelect?: (b: Bank) => void }) {
  return (
    <button
      onClick={() => onSelect?.(bank)}
      className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] w-full text-left transition-all duration-[180ms] active:scale-[0.98]"
      style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}
    >
      <BankLogo bank={bank} size={40} />
      <div className="flex-1">
        <p className="font-body text-sm font-semibold text-text">{bank.name}</p>
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.25)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
