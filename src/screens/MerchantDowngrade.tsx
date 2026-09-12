import { useState } from 'react'
import { MERCHANT_TIERS, calcStandardFees, fmt, type TierName } from '@/data/merchantTiers'

type DowngradeTarget = TierName | 'pay-as-you-go'

interface MerchantDowngradeProps {
  onBack?: () => void
  onConfirm?: () => void
  fromTier?: TierName
  annualVolume?: number
}

export default function MerchantDowngrade({
  onBack,
  onConfirm,
  fromTier = 'Scale',
  annualVolume = 472800,
}: MerchantDowngradeProps) {
  const fromIdx = MERCHANT_TIERS.findIndex(t => t.name === fromTier)
  const lowerTiers = MERCHANT_TIERS.slice(0, fromIdx)
  const from = MERCHANT_TIERS[fromIdx]!

  const [target, setTarget] = useState<DowngradeTarget>(
    lowerTiers.length > 0 ? lowerTiers[lowerTiers.length - 1].name : 'pay-as-you-go'
  )
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)

  const isPayAsYouGo = target === 'pay-as-you-go'
  const toTier = isPayAsYouGo ? null : MERCHANT_TIERS.find(t => t.name === target)!
  const standardFee = isPayAsYouGo ? from.standardFee : toTier!.standardFee
  const stdFeesPerYear = calcStandardFees(annualVolume, standardFee)

  const handleConfirm = () => {
    setConfirming(true)
    setTimeout(() => {
      setConfirming(false)
      setDone(true)
      setTimeout(() => onConfirm?.(), 1400)
    }, 1200)
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center bg-bg px-8" style={{ minHeight: 785 }}>
        <div className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-5"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14l8 8 10-10" stroke="rgba(175,197,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-xl font-extrabold text-text text-center mb-2">
          {isPayAsYouGo ? 'Reverted to pay-as-you-go' : `Downgraded to ${target}`}
        </p>
        <p className="font-body text-sm text-text-muted text-center leading-relaxed">
          Your change takes effect on your next billing date. You can re-subscribe anytime.
        </p>
      </div>
    )
  }

  const OPTIONS: { value: DowngradeTarget; label: string; sub: string }[] = [
    ...lowerTiers.map(t => ({
      value: t.name as DowngradeTarget,
      label: `${t.name} — ${fmt(t.annualPrice)}/yr`,
      sub: `${t.apvRange} · ${t.standardFee}% → 0% with subscription`,
    })),
    {
      value: 'pay-as-you-go' as DowngradeTarget,
      label: 'Cancel subscription — pay-as-you-go',
      sub: `${from.standardFee}% platform fee applies per transaction`,
    },
  ]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Change Plan</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Current plan */}
        <div className="px-4 py-3.5 rounded-[--radius-xl] flex items-center gap-3"
          style={{ background: from.bgColor, border: `1px solid ${from.borderColor}` }}>
          <div className="flex-1">
            <p className="font-body text-[10px] text-text-muted">Current plan</p>
            <p className="font-display text-sm font-extrabold" style={{ color: from.color }}>{from.name}</p>
          </div>
          <p className="font-mono text-sm font-bold text-text">{fmt(from.annualPrice)}/yr</p>
        </div>

        {/* Options */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Switch to
          </p>
          <div className="flex flex-col gap-2">
            {OPTIONS.map(opt => {
              const isSelected = target === opt.value
              const isPayGoOpt = opt.value === 'pay-as-you-go'
              const optTier = isPayGoOpt ? null : MERCHANT_TIERS.find(t => t.name === opt.value)
              const borderCol = optTier ? optTier.borderColor : 'rgba(175,197,255,0.12)'
              const bgCol = optTier ? optTier.bgColor : 'rgba(175,197,255,0.04)'
              const textCol = optTier ? optTier.color : 'rgba(175,197,255,0.7)'
              return (
                <button key={String(opt.value)} onClick={() => setTarget(opt.value)}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl] text-left transition-all w-full"
                  style={{
                    background: isSelected ? bgCol : 'rgba(175,197,255,0.02)',
                    border: `1px solid ${isSelected ? borderCol : 'rgba(175,197,255,0.09)'}`,
                  }}>
                  <div className="w-4 h-4 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
                    style={{
                      background: isSelected ? (optTier ? `${optTier.color}20` : 'rgba(175,197,255,0.12)') : 'rgba(175,197,255,0.08)',
                      border: `1.5px solid ${isSelected ? textCol : 'rgba(175,197,255,0.2)'}`,
                    }}>
                    {isSelected && <div className="w-2 h-2 rounded-full" style={{ background: textCol }} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold" style={{ color: isSelected ? textCol : 'var(--color-text)' }}>
                      {opt.label}
                    </p>
                    <p className="font-body text-[10px] text-text-muted mt-0.5">{opt.sub}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* What this means */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            What this means for you
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {isPayAsYouGo ? (
              <>
                <div className="flex items-center px-4 py-3.5 gap-3"
                  style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(175,197,255,0.06)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="4" stroke="rgba(175,197,255,0.4)" strokeWidth="1" />
                      <path d="M5 3v2.5l1.5 1" stroke="rgba(175,197,255,0.4)" strokeWidth="0.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-body text-xs text-text-muted flex-1">
                    Effective on your next billing date — keep current plan until then.
                  </p>
                </div>
                <div className="flex items-center px-4 py-3.5 gap-3"
                  style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(245,183,0,0.1)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1.5L1 8.5h8L5 1.5z" stroke="#F5B700" strokeWidth="0.9" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-body text-xs flex-1">
                    <span className="text-text font-semibold">{from.standardFee}% platform fee</span>
                    <span className="text-text-muted"> will apply to every transaction at your volume.</span>
                  </p>
                </div>
                <div className="px-4 py-3.5">
                  <p className="font-body text-xs text-text-muted">
                    At {fmt(annualVolume)}/yr volume, that's{' '}
                    <span className="text-text font-semibold">{fmt(stdFeesPerYear)}/yr</span> in platform fees.
                    You can re-subscribe anytime to get back to $0.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center px-4 py-3.5 gap-3"
                  style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
                  <p className="font-body text-xs text-text-muted flex-1">Platform fee</p>
                  <p className="font-mono text-xs font-bold text-text">$0 (subscribed)</p>
                </div>
                <div className="flex items-center px-4 py-3.5 gap-3"
                  style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
                  <p className="font-body text-xs text-text-muted flex-1">New annual price</p>
                  <p className="font-mono text-xs font-bold text-text">{fmt(toTier!.annualPrice)}/yr</p>
                </div>
                <div className="px-4 py-3.5">
                  <p className="font-body text-xs text-text-muted">
                    Standard fee if unsubscribed at this tier would be{' '}
                    <span className="text-text">{toTier!.standardFee}% = {fmt(calcStandardFees(annualVolume, toTier!.standardFee))}/yr</span>.
                    You're still saving by subscribing.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleConfirm}
          disabled={confirming}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: isPayAsYouGo ? 'rgba(175,197,255,0.08)' : (toTier ? toTier.bgColor : 'rgba(175,197,255,0.08)'),
            color: isPayAsYouGo ? 'rgba(175,197,255,0.7)' : (toTier ? toTier.color : 'rgba(175,197,255,0.7)'),
            border: `1px solid ${isPayAsYouGo ? 'rgba(175,197,255,0.14)' : (toTier ? toTier.borderColor : 'rgba(175,197,255,0.14)')}`,
          }}>
          {confirming ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : isPayAsYouGo ? 'Cancel subscription & switch to pay-as-you-go' : `Confirm downgrade to ${target}`}
        </button>

        <button onClick={onBack}
          className="w-full h-11 font-body text-sm text-text-muted rounded-[--radius-xl] transition-colors hover:text-text">
          Keep {from.name} — no change
        </button>
      </div>
    </div>
  )
}
