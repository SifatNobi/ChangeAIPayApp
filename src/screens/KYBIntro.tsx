import ainaSrc from '@/imports/Aina.png.jpeg'

interface KYBIntroProps {
  businessName?: string
  onStart?: () => void
  onBack?: () => void
}

const REQUIREMENTS = [
  { icon: '🏢', label: 'Business details',         sub: 'Legal name, structure, EIN/tax ID, industry' },
  { icon: '📍', label: 'Business address',          sub: 'Registered and operating address' },
  { icon: '👥', label: 'Stakeholder information',   sub: 'Beneficial owners holding 25%+ and authorized officers' },
  { icon: '📄', label: 'Supporting documents',      sub: 'Registration documents, proof of address, stakeholder IDs' },
]

const DATA_POINTS = [
  'Encrypted in transit and at rest — AES-256',
  'Accessed only for verification and regulatory compliance',
  'Never sold to third parties',
  'Retained per applicable financial regulations',
]

export default function KYBIntro({ businessName = 'Your Business', onStart, onBack }: KYBIntroProps) {
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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Business Verification</p>
          <p className="font-body text-[10px] text-text-muted">Know Your Business (KYB)</p>
        </div>
        {/* Step indicator */}
        <div className="flex gap-1">
          {[0,1,2,3].map(i => (
            <div key={i} className="h-1.5 rounded-full" style={{ width: i === 0 ? 16 : 6, background: i === 0 ? 'var(--color-accent)' : 'rgba(175,197,255,0.18)' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Aina intro card */}
        <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.92), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.28)' }}>
          <div className="flex items-start gap-3">
            {/* Aina avatar */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 overflow-hidden"
                style={{ borderRadius: '16px 16px 16px 4px', border: '1.5px solid rgba(63,231,255,0.4)', boxShadow: '0 0 18px rgba(0,102,255,0.5)' }}>
                <img src={ainaSrc} alt="Aina" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 flex items-center justify-center"
                style={{ background: '#22C55E', borderColor: 'rgba(5,11,45,0.95)' }} />
            </div>
            <div className="flex-1">
              <p className="font-body text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#3FE7FF' }}>Aina · Business Assistant</p>
              <p className="font-display text-sm font-extrabold text-white leading-snug">
                Before you can accept payments or transfers, we need to verify {businessName}.
              </p>
            </div>
          </div>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            Business verification (KYB) is a regulatory requirement for all merchant accounts. It protects you, your customers, and the financial system. Here is exactly what we need and why.
          </p>
        </div>

        {/* What's needed */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">What we'll need</p>
          <div className="flex flex-col gap-2">
            {REQUIREMENTS.map(r => (
              <div key={r.label} className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
                <span className="text-xl shrink-0">{r.icon}</span>
                <div>
                  <p className="font-body text-xs font-semibold text-text">{r.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{r.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-[--radius-xl] px-4 py-4 flex items-start gap-3"
          style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.22)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="6.5" stroke="#F5B700" strokeWidth="1" />
            <path d="M8 5v3.5l2 1.5" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <p className="font-body text-xs font-semibold text-text">Usually 1–3 business days</p>
            <p className="font-body text-[10px] text-text-muted mt-0.5 leading-relaxed">
              Business verification takes longer than individual KYC because it involves cross-referencing business registries and beneficial ownership records. Complex cases may take up to 5 business days. We'll notify you at each stage.
            </p>
          </div>
        </div>

        {/* Data handling */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">How we handle your data</p>
          <div className="flex flex-col gap-1.5">
            {DATA_POINTS.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
                  <path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-[11px] text-text-muted">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onStart}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}>
          Start Verification
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <p className="font-body text-[10px] text-center text-text-muted">
          You can pause and return at any time — your progress is saved automatically.
        </p>
      </div>
    </div>
  )
}
