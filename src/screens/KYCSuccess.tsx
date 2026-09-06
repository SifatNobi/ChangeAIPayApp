import Button from '@/components/Button'
import { EncryptionBanner } from '@/components/States'

interface KYCSuccessProps {
  name?: string
  onContinue: () => void
}

const UNLOCKED = [
  { icon: '💸', label: 'Send & receive money globally', sublabel: 'Zero fees to 180+ countries' },
  { icon: '💳', label: 'Full card access',               sublabel: 'Virtual and physical card' },
  { icon: '🤖', label: 'Full AI features',               sublabel: 'Fina and Aina at your service' },
  { icon: '📊', label: 'Unlimited transactions',         sublabel: 'No monthly cap' },
]

export default function KYCSuccess({ name = 'Maya', onContinue }: KYCSuccessProps) {
  const firstName = name.split(' ')[0]

  return (
    <div className="flex flex-col bg-bg px-5 pt-8 pb-10" style={{ minHeight: 785 }}>
      <div className="flex flex-col flex-1 items-center gap-8">
        {/* Standard success mark — not Pulse */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center animate-success"
            style={{
              background: 'rgba(0,210,106,0.1)',
              border: '2px solid rgba(0,210,106,0.3)',
              boxShadow: '0 0 40px rgba(0,210,106,0.12)',
            }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path d="M10 22l9 9 16-18"
                stroke="#00D26A" strokeWidth="3.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="text-center flex flex-col gap-1.5">
            <div
              className="font-body text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mx-auto"
              style={{ background: 'rgba(0,210,106,0.1)', color: '#00D26A', border: '1px solid rgba(0,210,106,0.25)' }}
            >
              Identity Verified
            </div>
            <h1 className="font-display text-[28px] font-extrabold text-text leading-tight mt-1">
              {firstName}, you are verified!
            </h1>
            <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
              Your identity has been confirmed. Full account access is now unlocked.
            </p>
          </div>
        </div>

        {/* Unlocked features */}
        <div className="w-full flex flex-col gap-2">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">Now unlocked</p>
          {UNLOCKED.map(item => (
            <div key={item.label}
              className="flex items-center gap-3 rounded-[--radius-xl] bg-surface border border-[color:var(--color-border)] px-4 py-3.5">
              <span className="text-xl leading-none shrink-0">{item.icon}</span>
              <div className="flex flex-col gap-0.5">
                <p className="font-body text-sm font-semibold text-text">{item.label}</p>
                <p className="font-body text-xs text-text-muted">{item.sublabel}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-auto"
                style={{ background: 'rgba(0,210,106,0.12)' }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5 4-4" stroke="#00D26A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Verification reference */}
        <div
          className="w-full rounded-[--radius-xl] px-4 py-3 flex items-center justify-between"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div className="flex flex-col gap-0.5">
            <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">Verification ID</p>
            <p className="font-mono text-xs text-text-2">KYC-{Date.now().toString(36).toUpperCase().slice(-8)}</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L2 3.5v5c0 3 2.2 4.6 5 5 2.8-.4 5-2 5-5v-5L7 1Z"
              stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M4.5 7l2 2 3-3" stroke="rgba(0,210,106,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <EncryptionBanner />
        <Button variant="primary" fullWidth onClick={onContinue}>
          Continue to Home
        </Button>
      </div>
    </div>
  )
}
