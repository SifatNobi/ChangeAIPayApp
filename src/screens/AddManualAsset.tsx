import { useState } from 'react'

interface AddManualAssetProps {
  onBack?: () => void
  onAdded?: (asset: { category: string; name: string; value: number; isLiability: boolean; interestRate?: number }) => void
}

type AssetType = 'asset' | 'liability'

const ASSET_CATEGORIES = [
  { id: 'cash', label: 'Cash' },
  { id: 'bond', label: 'Bond / Fixed Income' },
  { id: 'stock', label: 'Stock / ETF' },
  { id: 'physical', label: 'Physical Asset' },
]

const LIABILITY_CATEGORIES = [
  { id: 'debt', label: 'Debt / Loan' },
  { id: 'credit_card', label: 'Credit Card' },
  { id: 'mortgage', label: 'Mortgage' },
  { id: 'other_liability', label: 'Other Liability' },
]

const INTEREST_RATE_CATS = new Set(['bond', 'debt', 'mortgage', 'credit_card'])

export default function AddManualAsset({ onBack, onAdded }: AddManualAssetProps) {
  const [assetType, setAssetType] = useState<AssetType>('asset')
  const [category, setCategory] = useState<string>('')
  const [name, setName] = useState('')
  const [valueStr, setValueStr] = useState('')
  const [interestRate, setInterestRate] = useState('')

  const categories = assetType === 'asset' ? ASSET_CATEGORIES : LIABILITY_CATEGORIES
  const showInterest = INTEREST_RATE_CATS.has(category)
  const value = parseFloat(valueStr) || 0
  const canSubmit = name.trim().length > 0 && value > 0 && category.length > 0

  function handleTypeSwitch(t: AssetType) {
    setAssetType(t)
    setCategory('')
  }

  function handleSubmit() {
    if (!canSubmit) return
    onAdded?.({
      category,
      name: name.trim(),
      value,
      isLiability: assetType === 'liability',
      interestRate: interestRate ? parseFloat(interestRate) : undefined,
    })
  }

  return (
    <div
      className="relative flex flex-col w-[390px] h-[844px] overflow-hidden"
      style={{ background: 'rgba(5,11,45,1)', fontFamily: 'var(--font-body, sans-serif)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,102,255,0.13) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="rgba(175,197,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-display text-base font-bold text-white">Add Asset / Liability</h1>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col gap-5 mt-2">
          <div>
            <p className="font-body text-xs font-semibold mb-2" style={{ color: 'rgba(175,197,255,0.6)' }}>Asset or Liability?</p>
            <div
              className="flex rounded-[--radius-2xl] p-1"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              {(['asset', 'liability'] as AssetType[]).map(t => (
                <button
                  key={t}
                  onClick={() => handleTypeSwitch(t)}
                  className="flex-1 h-10 rounded-[--radius-2xl] font-body text-sm font-semibold capitalize transition-all"
                  style={{
                    background: assetType === t ? 'var(--gradient-primary, linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%))' : 'transparent',
                    color: assetType === t ? '#fff' : 'rgba(175,197,255,0.5)',
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-body text-xs font-semibold mb-2" style={{ color: 'rgba(175,197,255,0.6)' }}>Category</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className="h-11 rounded-[--radius-2xl] font-body text-xs font-semibold transition-all"
                  style={{
                    background: category === cat.id ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.05)',
                    border: category === cat.id ? '1px solid rgba(0,102,255,0.5)' : '1px solid rgba(175,197,255,0.1)',
                    color: category === cat.id ? '#3FE7FF' : 'rgba(175,197,255,0.6)',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-body text-xs font-semibold" style={{ color: 'rgba(175,197,255,0.6)' }}>
              Name <span style={{ color: '#3FE7FF' }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={assetType === 'asset' ? "e.g. Chase Checking" : "e.g. Student Loan"}
              className="w-full px-4 rounded-[--radius-2xl] font-body text-sm text-white outline-none"
              style={{
                background: 'rgba(175,197,255,0.06)',
                border: '1px solid rgba(175,197,255,0.12)',
                height: 52,
                caretColor: '#3FE7FF',
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-body text-xs font-semibold" style={{ color: 'rgba(175,197,255,0.6)' }}>
              Value (USD) <span style={{ color: '#3FE7FF' }}>*</span>
            </label>
            <div className="relative">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 font-body text-sm font-semibold"
                style={{ color: 'rgba(175,197,255,0.4)' }}
              >$</span>
              <input
                type="number"
                inputMode="decimal"
                value={valueStr}
                onChange={e => setValueStr(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 rounded-[--radius-2xl] font-body text-sm text-white outline-none"
                style={{
                  background: 'rgba(175,197,255,0.06)',
                  border: '1px solid rgba(175,197,255,0.12)',
                  height: 52,
                  caretColor: '#3FE7FF',
                }}
              />
            </div>
          </div>

          {showInterest && (
            <div className="flex flex-col gap-2">
              <label className="font-body text-xs font-semibold" style={{ color: 'rgba(175,197,255,0.6)' }}>
                Interest rate % (annual) <span style={{ color: 'rgba(175,197,255,0.3)' }}>(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  value={interestRate}
                  onChange={e => setInterestRate(e.target.value)}
                  placeholder="e.g. 4.5"
                  className="w-full pl-4 pr-8 rounded-[--radius-2xl] font-body text-sm text-white outline-none"
                  style={{
                    background: 'rgba(175,197,255,0.06)',
                    border: '1px solid rgba(175,197,255,0.12)',
                    height: 52,
                    caretColor: '#3FE7FF',
                  }}
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm"
                  style={{ color: 'rgba(175,197,255,0.4)' }}
                >%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 px-5 pb-8">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-opacity"
          style={{
            background: 'var(--gradient-primary, linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%))',
            opacity: canSubmit ? 1 : 0.35,
          }}
        >
          Add to Net Worth
        </button>
      </div>
    </div>
  )
}
