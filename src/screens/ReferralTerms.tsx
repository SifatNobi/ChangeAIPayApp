interface ReferralTermsProps {
  onBack?: () => void
  onInvite?: () => void
}

const SECTIONS = [
  {
    title: 'What is an Active Connection?',
    color: '#3FE7FF',
    items: [
      'Completed full onboarding including identity verification (KYC)',
      'Made at least one qualifying first action: a real send, receive, or deposit',
      'Signing up alone does NOT count — your referral must be an active user',
      'Pending connections are shown in your Circle but do not count toward milestones',
    ],
  },
  {
    title: 'How Change works',
    color: '#F5B700',
    items: [
      'Change is a loyalty currency — it has no cash value',
      'Change cannot be withdrawn, transferred, or converted to account balance',
      'Change can be spent on: Boosts, temporary Premium access, badges, and merchant offers',
      'Change balance has no expiry, but individual Boosts or Premium activations do',
    ],
  },
  {
    title: "What isn't this?",
    color: '#9945FF',
    items: [
      'This is not multi-level marketing — only your direct referrals count',
      "Your connections' referrals do not count toward your milestones",
      'No one in your circle earns rewards on your behalf',
      'There are no recruitment bonuses, downlines, or commission structures',
    ],
  },
  {
    title: 'Milestone eligibility',
    color: '#0066FF',
    items: [
      'Milestones are based on cumulative Active Connections, never pending',
      'ChangeAIPay may verify Active Connection status at any time',
      'Accounts showing inauthentic referral patterns may be reviewed',
      'ChangeAIPay reserves the right to modify milestone rewards with notice',
    ],
  },
  {
    title: 'Status tiers',
    color: '#FC7E2F',
    items: [
      'First Spark: 1 Active Connection',
      'Connector: 3 Active Connections',
      'Amplifier: 5 Active Connections',
      'Change Maker: 10 Active Connections',
      'Catalyst: 25 Active Connections',
      'Legend: 50 Active Connections',
    ],
  },
]

export default function ReferralTerms({ onBack, onInvite }: ReferralTermsProps) {
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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Eligibility & Terms</p>
          <p className="font-body text-[10px] text-text-muted">Change Circle Program</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Plain language notice */}
        <div className="px-4 py-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(63,231,255,0.05)', border: '1.5px solid rgba(63,231,255,0.2)' }}>
          <p className="font-body text-xs font-semibold text-text mb-1">Written in plain language</p>
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            We have written these terms to be genuinely readable. If anything is unclear, contact Support — we will explain it directly.
          </p>
        </div>

        {SECTIONS.map(s => (
          <div key={s.title} className="rounded-[--radius-2xl] overflow-hidden"
            style={{ background: `${s.color}06`, border: `1.5px solid ${s.color}22` }}>
            <div className="px-4 pt-4 pb-2">
              <p className="font-display text-sm font-extrabold" style={{ color: s.color }}>{s.title}</p>
            </div>
            <div className="px-4 pb-4 flex flex-col gap-2">
              {s.items.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: `${s.color}80` }} />
                  <p className="font-body text-xs text-text-muted leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Final note */}
        <div className="px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Last updated: September 2026. ChangeAIPay may update these terms. We will notify active users of material changes through the app.
          </p>
        </div>

        <button onClick={onInvite}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}>
          Invite Someone
        </button>
      </div>
    </div>
  )
}
