import { useState } from 'react'
import finaSrc from '@/imports/Fina.png.jpeg'
import ainaSrc from '@/imports/Aina.png.jpeg'
import Button from '@/components/Button'
import AuthHeader from '@/components/AuthHeader'

interface AccountTypeProps {
  onSelect: (type: 'personal' | 'business') => void
  onBack: () => void
}

const personalBenefits = [
  'Zero-fee international transfers',
  'Fina AI — your personal finance coach',
  'Savings goals & smart budgeting',
  'Multi-currency wallet',
  'Instant peer-to-peer payments',
]

const businessBenefits = [
  'Merchant payment gateway',
  'Aina AI — executive financial analytics',
  'Multi-user team access',
  'Invoicing & receivables automation',
  'Advanced cash flow forecasting',
]

export default function AccountType({ onSelect, onBack }: AccountTypeProps) {
  const [hovered, setHovered] = useState<'personal' | 'business' | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-bg px-5 pt-4 pb-10">
      <AuthHeader onBack={onBack} />

      <div className="mt-4 mb-6">
        <h1 className="font-display text-2xl font-extrabold text-text">
          How will you use<br />ChangeAIPay?
        </h1>
        <p className="font-body text-sm text-text-2 mt-2">
          Your choice determines which AI assistant and feature set you get.
        </p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {/* ── Personal — dominant focal card ──────────────────── */}
        {/* Larger, more prominent, the default choice for most users */}
        <button
          className="w-full text-left focus-ring rounded-[--radius-3xl] transition-all duration-[280ms] group"
          onMouseEnter={() => setHovered('personal')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect('personal')}
          aria-label="Select personal account"
        >
          <div
            className="rounded-[--radius-3xl] border overflow-hidden transition-all duration-[280ms]"
            style={{
              background: hovered === 'personal'
                ? 'linear-gradient(145deg, #0D1A4A, rgba(0,102,255,0.15))'
                : '#101C4D',
              borderColor: hovered === 'personal' ? 'rgba(63,231,255,0.35)' : 'rgba(175,197,255,0.12)',
              boxShadow: hovered === 'personal' ? 'var(--shadow-primary)' : 'none',
            }}
          >
            {/* Header band */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-1">For individuals</p>
                  <h2 className="font-display text-2xl font-extrabold text-text">Personal</h2>
                </div>
                {/* Fina — warm, larger avatar since this is the focal card */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent/30 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0066FF, #3FE7FF)' }}>
                  <img src={finaSrc} alt="Fina, your personal AI" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="font-body text-sm text-text-2 leading-relaxed">
                Manage your money with Fina, your personal AI coach. Send money globally, build savings goals, and take control of your financial life.
              </p>
            </div>

            {/* Benefits list */}
            <div className="px-6 pb-6 flex flex-col gap-2.5">
              {personalBenefits.map(b => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/12 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="font-body text-sm text-text-2">{b}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="px-5 pb-5">
              <div
                className="w-full h-12 rounded-[--radius-xl] flex items-center justify-center transition-all duration-[250ms]"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <span className="font-body text-sm font-bold text-white">Start as Personal →</span>
              </div>
            </div>
          </div>
        </button>

        {/* ── Business — secondary card, compact ──────────────── */}
        {/* Deliberately lighter visual weight — same information density but less prominent */}
        <button
          className="w-full text-left focus-ring rounded-[--radius-2xl] transition-all duration-[280ms]"
          onMouseEnter={() => setHovered('business')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelect('business')}
          aria-label="Select business account"
        >
          <div
            className="rounded-[--radius-2xl] border p-5 transition-all duration-[280ms]"
            style={{
              background: hovered === 'business' ? 'rgba(0,102,255,0.08)' : 'rgba(16,28,77,0.6)',
              borderColor: hovered === 'business' ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)',
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-primary/25 shrink-0"
                style={{ background: 'linear-gradient(135deg, #0D1A4A, #0066FF)' }}>
                <img src={ainaSrc} alt="Aina, your business AI" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-text-muted uppercase tracking-widest">For businesses</p>
                <p className="font-display text-lg font-bold text-text">Business Account</p>
                <p className="font-body text-xs text-text-2 mt-0.5">
                  Merchant tools, Aina AI analytics, team access
                </p>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-text-muted shrink-0">
                <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Compact benefits */}
            <div className="mt-4 flex flex-wrap gap-2">
              {businessBenefits.slice(0, 3).map(b => (
                <span key={b} className="px-2.5 h-6 rounded-full bg-surface border border-[color:var(--color-border)] font-body text-xs text-text-2 flex items-center">
                  {b}
                </span>
              ))}
              <span className="px-2.5 h-6 rounded-full bg-surface border border-[color:var(--color-border)] font-body text-xs text-text-muted flex items-center">
                +{businessBenefits.length - 3} more
              </span>
            </div>

            {/* Business CTA */}
            <div className="mt-4">
              <div
                className="w-full h-11 rounded-[--radius-xl] flex items-center justify-center transition-all duration-[250ms]"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <span className="font-body text-sm font-bold text-white">Start as Business →</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      <p className="font-body text-xs text-center text-text-muted mt-6">
        You can add a second account type after signing up
      </p>
    </div>
  )
}
