import { useState } from 'react'
import { MERCHANT_TIERS, calcStandardFees, calcAnnualSavings, fmt, type TierName } from '@/data/merchantTiers'

type CheckoutStep = 'summary' | 'auth' | 'processing' | 'success'

interface MerchantCheckoutProps {
  onBack?: () => void
  onSuccess?: () => void
  tierName?: TierName
  annualVolume?: number
}

const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']

export default function MerchantCheckout({
  onBack,
  onSuccess,
  tierName = 'Scale',
  annualVolume = 472800,
}: MerchantCheckoutProps) {
  const tier = MERCHANT_TIERS.find(t => t.name === tierName) ?? MERCHANT_TIERS[2]
  const stdFees = calcStandardFees(annualVolume, tier.standardFee)
  const savings = calcAnnualSavings(annualVolume, tier)

  const [step, setStep] = useState<CheckoutStep>('summary')
  const [authMethod, setAuthMethod] = useState<'pin' | 'biometric'>('pin')
  const [pin, setPin] = useState('')
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual')
  const [cardLast4] = useState('4521')

  const handlePinDigit = (d: string) => {
    if (pin.length >= 6) return
    const next = pin + d
    setPin(next)
    if (next.length === 6) setTimeout(() => setStep('processing'), 300)
  }

  const handleBiometric = () => {
    setStep('processing')
    setTimeout(() => setStep('success'), 1400)
  }

  if (step === 'processing') {
    setTimeout(() => setStep('success'), 1500)
    return (
      <div className="flex flex-col items-center justify-center bg-bg" style={{ minHeight: 785 }}>
        <div className="w-16 h-16 rounded-[18px] flex items-center justify-center mb-4"
          style={{ background: tier.bgColor, border: `1px solid ${tier.borderColor}` }}>
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: `${tier.color}40`, borderTopColor: tier.color }} />
        </div>
        <p className="font-body text-sm font-semibold text-text">Processing subscription...</p>
        <p className="font-body text-xs text-text-muted mt-1">This only takes a moment.</p>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center bg-bg px-8" style={{ minHeight: 785 }}>
        <div className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-5"
          style={{
            background: tier.bgColor,
            border: `1px solid ${tier.borderColor}`,
            boxShadow: `0 0 32px ${tier.glowColor}`,
          }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16l8 8 12-12" stroke={tier.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-xl font-extrabold text-text text-center mb-2">
          {tier.name} plan activated
        </p>
        <p className="font-body text-sm text-text-muted text-center leading-relaxed mb-2">
          Your platform fee is now <span className="text-white font-semibold">$0</span> on all transactions.
        </p>
        {savings > 0 && (
          <div className="px-4 py-2 rounded-full mt-1 mb-6"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <p className="font-body text-xs font-semibold" style={{ color: '#22C55E' }}>
              You'll save {fmt(savings)} this year vs. pay-as-you-go
            </p>
          </div>
        )}
        <button
          onClick={onSuccess}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}>
          Go to dashboard
        </button>
      </div>
    )
  }

  if (step === 'auth') {
    return (
      <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
        <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
          <button onClick={() => setStep('summary')}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Confirm subscription</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
          {/* Mini summary */}
          <div className="px-4 py-3 rounded-[--radius-xl] flex items-center gap-3"
            style={{ background: tier.bgColor, border: `1px solid ${tier.borderColor}` }}>
            <div>
              <p className="font-body text-xs text-text-muted">Subscribing to</p>
              <p className="font-display text-sm font-extrabold text-text">{tier.name}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="font-mono text-base font-bold" style={{ color: tier.color }}>
                {billing === 'annual' ? fmt(tier.annualPrice) + '/yr' : '$' + tier.monthlyEquiv.toFixed(2) + '/mo'}
              </p>
              <p className="font-body text-[10px] text-text-muted">Chase ×{cardLast4}</p>
            </div>
          </div>

          {/* Auth method toggle */}
          <div className="flex gap-2">
            {(['pin', 'biometric'] as const).map(m => (
              <button key={m} onClick={() => setAuthMethod(m)}
                className="flex-1 h-10 rounded-full font-body text-xs font-semibold transition-all"
                style={{
                  background: authMethod === m ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)',
                  color: authMethod === m ? '#4D9FFF' : 'rgba(175,197,255,0.4)',
                  border: `1px solid ${authMethod === m ? 'rgba(0,102,255,0.22)' : 'rgba(175,197,255,0.09)'}`,
                }}>
                {m === 'pin' ? 'Enter PIN' : 'Face ID'}
              </button>
            ))}
          </div>

          {authMethod === 'pin' && (
            <>
              <div className="flex justify-center gap-4 mt-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}
                    className="w-3.5 h-3.5 rounded-full transition-all"
                    style={{
                      background: i < pin.length ? tier.color : 'rgba(175,197,255,0.15)',
                      boxShadow: i < pin.length ? `0 0 8px ${tier.glowColor}` : 'none',
                      transform: i < pin.length ? 'scale(1.15)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
              <p className="font-body text-xs text-center text-text-muted">Enter your PIN to confirm</p>
              <div className="grid grid-cols-3 gap-3 px-6">
                {KEYPAD.map((key, i) => (
                  <button key={i} disabled={!key}
                    onClick={() => {
                      if (key === '⌫') setPin(p => p.slice(0, -1))
                      else if (key) handlePinDigit(key)
                    }}
                    className="h-14 rounded-[--radius-xl] font-display text-lg font-bold transition-all active:scale-95"
                    style={{
                      background: key ? 'rgba(175,197,255,0.05)' : 'transparent',
                      color: key === '⌫' ? 'rgba(175,197,255,0.5)' : 'var(--color-text)',
                      border: key ? '1px solid rgba(175,197,255,0.09)' : 'none',
                    }}>
                    {key}
                  </button>
                ))}
              </div>
            </>
          )}

          {authMethod === 'biometric' && (
            <div className="flex flex-col items-center gap-5 py-6">
              <button onClick={handleBiometric}
                className="w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{
                  background: tier.bgColor,
                  border: `2px solid ${tier.borderColor}`,
                  boxShadow: `0 0 30px ${tier.glowColor}`,
                }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 8C12.477 8 8 12.477 8 18s4.477 10 10 10 10-4.477 10-10S23.523 8 18 8z" stroke={tier.color} strokeWidth="1.5" />
                  <path d="M13 18c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke={tier.color} strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="2" fill={tier.color} />
                </svg>
              </button>
              <p className="font-body text-sm text-text-muted text-center">Use Face ID to confirm your {tier.name} subscription</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Summary step
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Checkout</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Tier hero */}
        <div
          className="px-4 py-5 rounded-[--radius-2xl]"
          style={{
            background: `linear-gradient(135deg, ${tier.bgColor} 0%, rgba(0,10,40,0.7) 100%)`,
            border: `1px solid ${tier.borderColor}`,
            boxShadow: `0 4px 24px ${tier.glowColor}`,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-display text-xl font-extrabold text-text">{tier.name}</p>
              <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(175,197,255,0.5)' }}>{tier.apvRange}</p>
            </div>
            <div className="px-3 py-1.5 rounded-full"
              style={{ background: tier.bgColor, border: `1px solid ${tier.borderColor}` }}>
              <p className="font-body text-[10px] font-bold uppercase tracking-wider" style={{ color: tier.color }}>
                0% platform fee
              </p>
            </div>
          </div>

          {/* Billing toggle */}
          <div className="flex gap-2 mb-4">
            {['annual', 'monthly'].map(b => (
              <button key={b} onClick={() => setBilling(b as 'annual' | 'monthly')}
                className="flex-1 h-9 rounded-full font-body text-xs font-semibold transition-all"
                style={{
                  background: billing === b ? 'rgba(255,255,255,0.1)' : 'rgba(175,197,255,0.04)',
                  color: billing === b ? 'white' : 'rgba(175,197,255,0.4)',
                  border: `1px solid ${billing === b ? 'rgba(255,255,255,0.15)' : 'rgba(175,197,255,0.09)'}`,
                }}>
                {b === 'annual' ? 'Annual' : 'Monthly'}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-2">
            <p className="font-display text-3xl font-extrabold text-text">
              {billing === 'annual' ? `$${tier.annualPrice}` : `$${tier.monthlyEquiv.toFixed(2)}`}
            </p>
            <p className="font-body text-sm text-text-muted mb-1">
              {billing === 'annual' ? '/year' : '/month'}
            </p>
          </div>
          {billing === 'annual' && (
            <p className="font-body text-[10px] text-text-muted mt-0.5">
              ≈ ${tier.monthlyEquiv.toFixed(2)}/mo equivalent
            </p>
          )}
        </div>

        {/* Savings summary */}
        {savings > 0 && (
          <div className="px-4 py-3 rounded-[--radius-xl]"
            style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.16)' }}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="font-body text-xs text-text-muted">Standard fees at your volume ({tier.standardFee}%)</p>
              <p className="font-mono text-xs font-bold" style={{ color: '#F87171' }}>−{fmt(stdFees)}</p>
            </div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="font-body text-xs text-text-muted">{tier.name} subscription</p>
              <p className="font-mono text-xs font-bold text-text">−{fmt(tier.annualPrice)}</p>
            </div>
            <div className="h-px w-full my-1.5" style={{ background: 'rgba(34,197,94,0.2)' }} />
            <div className="flex items-center justify-between">
              <p className="font-body text-xs font-semibold text-text">Annual savings</p>
              <p className="font-display text-base font-extrabold" style={{ color: '#22C55E' }}>+{fmt(savings)}</p>
            </div>
          </div>
        )}

        {/* Payment method */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Payment method</p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-10 h-7 rounded-[5px] flex items-center justify-center shrink-0"
                style={{ background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.12)' }}>
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <rect x="1" y="1" width="16" height="12" rx="2" stroke="rgba(175,197,255,0.5)" strokeWidth="1" />
                  <path d="M1 5h16" stroke="rgba(175,197,255,0.5)" strokeWidth="1" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-medium text-text">Chase Business ×{cardLast4}</p>
                <p className="font-body text-[10px] text-text-muted">Expires 09/28</p>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 5px rgba(34,197,94,0.5)' }} />
            </div>
          </div>
        </div>

        {/* Platform fee disclosure */}
        <div className="px-3 py-2.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.07)' }}>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            <span className="text-text">FX spread: {tier.fxSpread}%</span> on currency conversions — separate from the 0% platform fee. The 0% platform fee applies to ChangeAIPay's own platform fee only; third-party processor costs, payment-network fees, refunds, and chargebacks remain separate pass-through costs where applicable.
          </p>
        </div>

        {/* Terms note */}
        <p className="font-body text-[10px] text-text-muted text-center leading-relaxed px-2">
          By subscribing you agree to the ChangeAIPay Merchant Terms. Cancel anytime before your renewal date for a full refund.
        </p>

        {/* CTA */}
        <button
          onClick={() => setStep('auth')}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
          style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.glowColor.replace('0.3', '0.8')})` }}>
          Confirm &amp; Subscribe
        </button>
      </div>
    </div>
  )
}
