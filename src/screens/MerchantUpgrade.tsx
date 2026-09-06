import { useState } from 'react'
import { MERCHANT_TIERS, calcStandardFees, calcAnnualSavings, fmt, type TierName } from '@/data/merchantTiers'

interface MerchantUpgradeProps {
  onBack?: () => void
  onConfirm?: () => void
  fromTier?: TierName
  toTier?: TierName
  annualVolume?: number
  daysIntoYear?: number
}

export default function MerchantUpgrade({
  onBack,
  onConfirm,
  fromTier = 'Growth',
  toTier = 'Scale',
  annualVolume = 472800,
  daysIntoYear = 127,
}: MerchantUpgradeProps) {
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)

  const from = MERCHANT_TIERS.find(t => t.name === fromTier)!
  const to = MERCHANT_TIERS.find(t => t.name === toTier)!

  const daysRemaining = 365 - daysIntoYear
  const proratedCredit = Math.round((from.annualPrice / 365) * daysRemaining)
  const proratedNew = Math.round((to.annualPrice / 365) * daysRemaining)
  const dueToday = Math.max(0, proratedNew - proratedCredit)

  const newSavings = calcAnnualSavings(annualVolume, to)
  const oldSavings = calcAnnualSavings(annualVolume, from)
  const additionalSavings = newSavings - oldSavings

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      setConfirming(false)
      setDone(true)
      setTimeout(() => onConfirm?.(), 1400)
    }, 1400)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center bg-bg px-8" style={{ minHeight: 785 }}>
        <div className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-5"
          style={{ background: to.bgColor, border: `1px solid ${to.borderColor}`, boxShadow: `0 0 32px ${to.glowColor}` }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16l8 8 12-12" stroke={to.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-xl font-extrabold text-text text-center mb-2">Upgraded to {to.name}</p>
        <p className="font-body text-sm text-text-muted text-center leading-relaxed">
          Your plan has been updated. Enjoy {to.standardFee}% → 0% platform fee savings.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Upgrade Plan</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* From → To graphic */}
        <div className="flex items-center gap-3">
          <div className="flex-1 px-4 py-3.5 rounded-[--radius-xl] text-center"
            style={{ background: from.bgColor, border: `1px solid ${from.borderColor}` }}>
            <p className="font-body text-[10px] text-text-muted mb-0.5">Current</p>
            <p className="font-display text-base font-extrabold" style={{ color: from.color }}>{from.name}</p>
            <p className="font-mono text-xs text-text-muted mt-0.5">{fmt(from.annualPrice)}/yr</p>
          </div>

          <div className="flex flex-col items-center gap-1 shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="rgba(34,197,94,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex-1 px-4 py-3.5 rounded-[--radius-xl] text-center"
            style={{
              background: to.bgColor,
              border: `1px solid ${to.borderColor}`,
              boxShadow: `0 4px 16px ${to.glowColor}`,
            }}>
            <p className="font-body text-[10px] text-text-muted mb-0.5">Upgrading to</p>
            <p className="font-display text-base font-extrabold" style={{ color: to.color }}>{to.name}</p>
            <p className="font-mono text-xs text-text-muted mt-0.5">{fmt(to.annualPrice)}/yr</p>
          </div>
        </div>

        {/* Prorated cost */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            Prorated cost ({daysRemaining} days remaining)
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {[
              { label: `${from.name} remaining credit`, value: fmt(proratedCredit), color: '#22C55E' },
              { label: `${to.name} prorated cost`, value: fmt(proratedNew), color: '#F87171' },
            ].map((row, i) => (
              <div key={i} className="flex items-center px-4 py-3.5 justify-between"
                style={{ borderBottom: i === 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                <p className="font-body text-xs text-text-muted">{row.label}</p>
                <p className="font-mono text-xs font-bold" style={{ color: row.color }}>{row.value}</p>
              </div>
            ))}
            <div className="flex items-center px-4 py-3.5 justify-between"
              style={{ background: 'rgba(175,197,255,0.03)', borderTop: '1px solid rgba(175,197,255,0.09)' }}>
              <p className="font-body text-sm font-semibold text-text">Due today</p>
              <p className="font-display text-lg font-extrabold text-text">{fmt(dueToday)}</p>
            </div>
          </div>
          <p className="font-body text-[10px] text-text-muted mt-1.5 px-1">
            Credit calculated on {daysIntoYear} days used of your current annual billing cycle.
          </p>
        </div>

        {/* Savings comparison */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            Updated savings at your volume ({fmt(annualVolume)}/yr)
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {[
              { label: `${from.name} annual savings`, value: fmt(Math.max(0, oldSavings)), color: 'rgba(175,197,255,0.6)' },
              { label: `${to.name} annual savings`, value: fmt(Math.max(0, newSavings)), color: '#22C55E' },
              { label: 'Additional savings/yr', value: `+${fmt(additionalSavings)}`, color: '#22C55E' },
            ].map((row, i, arr) => (
              <div key={i} className="flex items-center px-4 py-3.5 justify-between"
                style={{
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none',
                  background: i === arr.length - 1 ? 'rgba(34,197,94,0.03)' : 'transparent',
                }}>
                <p className="font-body text-xs text-text-muted">{row.label}</p>
                <p className="font-mono text-xs font-bold" style={{ color: row.color }}>{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* New features */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            What you get with {to.name}
          </p>
          <div className="flex flex-col gap-1.5">
            {to.features.filter(f => !from.features.includes(f)).map((feat, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-[--radius-xl]"
                style={{ background: to.bgColor, border: `1px solid ${to.borderColor}` }}>
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${to.color}20` }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3.5" stroke={to.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-body text-xs text-text">{feat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleConfirm}
          disabled={confirming}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${to.color}, ${to.glowColor.replace('0.3', '0.7')})` }}>
          {confirming ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : `Confirm Upgrade — ${fmt(dueToday)} today`}
        </button>

        <button onClick={onBack}
          className="w-full h-11 font-body text-sm text-text-muted rounded-[--radius-xl] transition-colors hover:text-text">
          Keep {from.name}
        </button>
      </div>
    </div>
  )
}
