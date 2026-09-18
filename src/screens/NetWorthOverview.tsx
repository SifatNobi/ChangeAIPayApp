import { useState } from 'react'

interface ManualAsset {
  id: string
  category: 'cash' | 'crypto' | 'investment' | 'physical' | 'debt'
  name: string
  value: number
  isLiability: boolean
}

interface NetWorthOverviewProps {
  onBack?: () => void
  onAddAsset?: () => void
  onSelectAsset?: (id: string) => void
  onViewHealthMeter?: () => void
  financialHealthScore?: number | null
}

const CATEGORY_LABELS: Record<string, string> = {
  cash: 'Cash / Bank',
  crypto: 'Crypto',
  investment: 'Investments',
  physical: 'Physical Assets',
  debt: 'Debts / Liabilities',
}

const CATEGORY_COLORS: Record<string, string> = {
  cash: '#22C55E',
  crypto: '#3FE7FF',
  investment: '#0066FF',
  physical: '#F5B700',
  debt: '#FF4D6A',
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function CategoryRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid rgba(175,197,255,0.06)' }}>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="font-body text-xs" style={{ color: 'rgba(175,197,255,0.7)' }}>{label}</span>
      </div>
      <span className="font-body text-xs font-semibold text-white">{fmt(value)}</span>
    </div>
  )
}

export default function NetWorthOverview({ onBack, onAddAsset, onSelectAsset, onViewHealthMeter, financialHealthScore = null }: NetWorthOverviewProps) {
  const [assets] = useState<ManualAsset[]>([])

  const totalAssets = assets.filter(a => !a.isLiability).reduce((s, a) => s + a.value, 0)
  const totalLiabilities = assets.filter(a => a.isLiability).reduce((s, a) => s + a.value, 0)
  const netWorth = totalAssets - totalLiabilities

  const assetCategories: Array<'cash' | 'crypto' | 'investment' | 'physical'> = ['cash', 'crypto', 'investment', 'physical']

  function catTotal(cat: string) {
    return assets.filter(a => a.category === cat).reduce((s, a) => s + a.value, 0)
  }

  return (
    <div
      className="relative flex flex-col w-[390px] h-[844px] overflow-hidden"
      style={{ background: 'rgba(5,11,45,1)', fontFamily: 'var(--font-body, sans-serif)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(63,231,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex items-center justify-between px-5 pt-14 pb-4">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="rgba(175,197,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-display text-base font-bold text-white">Net Worth</h1>
        <button
          onClick={onAddAsset}
          className="h-9 px-4 rounded-full font-body text-xs font-semibold text-white flex items-center gap-1"
          style={{ background: 'rgba(0,102,255,0.25)', border: '1px solid rgba(0,102,255,0.4)' }}
        >
          <span style={{ fontSize: 15, lineHeight: 1 }}>+</span> Add
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6">
        <div
          className="rounded-[--radius-2xl] p-5 mb-4"
          style={{
            background: 'rgba(175,197,255,0.06)',
            border: '1.5px solid rgba(63,231,255,0.25)',
            boxShadow: '0 0 32px rgba(63,231,255,0.06)',
          }}
        >
          <p className="font-body text-xs mb-1" style={{ color: 'rgba(175,197,255,0.5)' }}>Total Net Worth</p>
          <p className="font-display text-4xl font-extrabold text-white mb-1">{fmt(netWorth)}</p>
          <p className="font-body text-xs" style={{ color: 'rgba(175,197,255,0.4)' }}>Assets — Liabilities</p>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 rounded-xl p-3" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <p className="font-body text-[10px] mb-0.5" style={{ color: 'rgba(34,197,94,0.7)' }}>Assets</p>
              <p className="font-body text-sm font-bold" style={{ color: '#22C55E' }}>{fmt(totalAssets)}</p>
            </div>
            <div className="flex-1 rounded-xl p-3" style={{ background: 'rgba(255,77,106,0.08)', border: '1px solid rgba(255,77,106,0.2)' }}>
              <p className="font-body text-[10px] mb-0.5" style={{ color: 'rgba(255,77,106,0.7)' }}>Liabilities</p>
              <p className="font-body text-sm font-bold" style={{ color: '#FF4D6A' }}>{fmt(totalLiabilities)}</p>
            </div>
          </div>
        </div>

        {/* ── Financial Health compact widget ── */}
        <button
          onClick={onViewHealthMeter}
          className="w-full text-left rounded-[--radius-2xl] px-4 py-3.5 mb-4 flex items-center gap-3 active:scale-[0.99] transition-transform"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="rgba(34,197,94,0.5)" strokeWidth="1.3" strokeDasharray="3 2" />
              <path d="M5.5 9l2.5 2.5 4.5-5" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-xs font-semibold text-white">Financial Health Score</p>
            {financialHealthScore === null || financialHealthScore === undefined ? (
              <p className="font-body text-[11px] mt-0.5" style={{ color: 'rgba(175,197,255,0.4)' }}>
                Not enough data yet · <span style={{ color: 'rgba(63,231,255,0.7)' }}>Tap to set up</span>
              </p>
            ) : (
              <p className="font-body text-[11px] mt-0.5" style={{ color: 'rgba(175,197,255,0.5)' }}>
                <span
                  className="font-mono font-bold"
                  style={{
                    color: financialHealthScore >= 80 ? '#22C55E' : financialHealthScore >= 50 ? '#F5B700' : '#FF4D6A',
                  }}
                >
                  {financialHealthScore}
                </span>
                {' '}· <span style={{ color: 'rgba(63,231,255,0.7)' }}>View breakdown</span>
              </p>
            )}
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className="rounded-[--radius-2xl] px-4 pt-3 pb-2 mb-4"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
        >
          <p className="font-body text-xs font-semibold mb-1" style={{ color: 'rgba(175,197,255,0.5)' }}>Breakdown</p>
          {assetCategories.map(cat => (
            <CategoryRow key={cat} label={CATEGORY_LABELS[cat]} value={catTotal(cat)} color={CATEGORY_COLORS[cat]} />
          ))}
          <CategoryRow label={CATEGORY_LABELS['debt']} value={catTotal('debt')} color={CATEGORY_COLORS['debt']} />
        </div>

        {assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="7" width="22" height="16" rx="3" stroke="rgba(175,197,255,0.35)" strokeWidth="1.4" />
                <path d="M8 12h4M8 16h8" stroke="rgba(175,197,255,0.3)" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="20" cy="16" r="3" stroke="#3FE7FF" strokeWidth="1.3" />
              </svg>
            </div>
            <p className="font-body text-xs text-center leading-relaxed" style={{ color: 'rgba(175,197,255,0.5)', maxWidth: 250 }}>
              Start tracking your net worth — add your first asset or liability
            </p>
            <button
              onClick={onAddAsset}
              className="h-12 px-8 rounded-[--radius-2xl] font-body text-sm font-semibold text-white"
              style={{ background: 'var(--gradient-primary, linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%))' }}
            >
              Add First Asset
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {assets.map(asset => (
              <button
                key={asset.id}
                onClick={() => onSelectAsset?.(asset.id)}
                className="w-full text-left rounded-[--radius-2xl] px-4 py-3 flex items-center gap-3 active:scale-[0.99] transition-transform"
                style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: (CATEGORY_COLORS[asset.category] + '18'), border: `1px solid ${CATEGORY_COLORS[asset.category]}30` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[asset.category] }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-semibold text-white truncate">{asset.name}</p>
                  <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(175,197,255,0.4)' }}>{CATEGORY_LABELS[asset.category]}</p>
                </div>
                <p className="font-body text-sm font-bold shrink-0" style={{ color: asset.isLiability ? '#FF4D6A' : '#22C55E' }}>
                  {asset.isLiability ? '-' : '+'}{fmt(asset.value)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="relative z-10 mx-5 mb-8 px-4 py-3 rounded-[--radius-2xl]"
        style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
      >
        <p className="font-body text-[10px] text-center leading-relaxed" style={{ color: 'rgba(175,197,255,0.3)' }}>
          All figures are based on manually entered data. ChangeAIPay does not execute trades or hold these assets on your behalf.
        </p>
      </div>
    </div>
  )
}
