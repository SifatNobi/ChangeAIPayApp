import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'

type LinkMode = 'login' | 'manual'

interface LinkBankProps {
  bankName?: string
  bankAbbr?: string
  bankColor?: string
  initialMode?: LinkMode
  onContinue?: () => void
  onBack?: () => void
}

export default function LinkBank({
  bankName = 'Chase',
  bankAbbr = 'JP',
  bankColor = '#117ACA',
  initialMode = 'login',
  onContinue,
  onBack,
}: LinkBankProps) {
  const [mode, setMode] = useState<LinkMode>(initialMode)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [routing, setRouting] = useState('')
  const [account, setAccount] = useState('')
  const [accountConf, setAccountConf] = useState('')
  const [loading, setLoading] = useState(false)

  const loginValid = username.trim().length > 0 && password.length >= 4
  const manualValid = routing.length === 9 && account.length >= 8 && account === accountConf

  const canContinue = mode === 'login' ? loginValid : manualValid

  const handleSubmit = () => {
    if (!canContinue) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onContinue?.() }, 900)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader title={`Link ${bankName}`} onBack={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Bank identity */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-body font-bold text-white shrink-0"
            style={{ background: bankColor, fontSize: 13, boxShadow: `0 4px 14px ${bankColor}55` }}
          >
            {bankAbbr}
          </div>
          <div>
            <p className="font-body text-base font-semibold text-text">{bankName}</p>
            <p className="font-body text-xs text-text-muted">Secure connection via ChangeAIPay Bank Link</p>
          </div>
        </div>

        {/* Mode toggle */}
        <div
          className="flex p-1 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          {(['login', 'manual'] as LinkMode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 h-9 rounded-[--radius-xl] font-body text-sm font-semibold transition-all duration-[200ms]"
              style={{
                background: mode === m ? 'rgba(0,102,255,0.2)' : 'transparent',
                color: mode === m ? '#AFC5FF' : 'rgba(175,197,255,0.4)',
                border: mode === m ? '1px solid rgba(0,102,255,0.3)' : '1px solid transparent',
              }}
            >
              {m === 'login' ? 'Bank Login' : 'Manual Entry'}
            </button>
          ))}
        </div>

        {/* Login flow */}
        {mode === 'login' && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
                {bankName} username / email
              </label>
              <div
                className="flex items-center h-12 px-4 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.15)' }}
              >
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter your bank username"
                  autoComplete="username"
                  className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Password</label>
              <div
                className="flex items-center h-12 px-4 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.15)' }}
              >
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your bank password"
                  autoComplete="current-password"
                  className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
                />
                <button onClick={() => setShowPw(s => !s)} className="ml-2 opacity-50 hover:opacity-80 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    {showPw
                      ? <><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="rgba(175,197,255,0.8)" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" stroke="rgba(175,197,255,0.8)" strokeWidth="1.2"/></>
                      : <><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="rgba(175,197,255,0.8)" strokeWidth="1.2"/><path d="M2 2l12 12" stroke="rgba(175,197,255,0.8)" strokeWidth="1.2" strokeLinecap="round"/></>
                    }
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manual entry */}
        {mode === 'manual' && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
                Routing number
              </label>
              <div
                className="flex items-center h-12 px-4 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.04)', border: `1px solid ${routing.length > 0 && routing.length !== 9 ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.15)'}` }}
              >
                <input
                  type="number"
                  value={routing}
                  onChange={e => setRouting(e.target.value.slice(0, 9))}
                  placeholder="9-digit routing number"
                  className="flex-1 bg-transparent font-mono text-sm text-text placeholder-text-muted outline-none"
                />
                {routing.length === 9 && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3.5 6-6" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Account number</label>
              <div
                className="flex items-center h-12 px-4 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.15)' }}
              >
                <input
                  type="number"
                  value={account}
                  onChange={e => setAccount(e.target.value.slice(0, 17))}
                  placeholder="Account number"
                  className="flex-1 bg-transparent font-mono text-sm text-text placeholder-text-muted outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Confirm account number</label>
              <div
                className="flex items-center h-12 px-4 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.04)', border: `1px solid ${accountConf.length > 0 && accountConf !== account ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.15)'}` }}
              >
                <input
                  type="number"
                  value={accountConf}
                  onChange={e => setAccountConf(e.target.value.slice(0, 17))}
                  placeholder="Re-enter account number"
                  className="flex-1 bg-transparent font-mono text-sm text-text placeholder-text-muted outline-none"
                />
              </div>
              {accountConf.length > 0 && accountConf !== account && (
                <p className="font-body text-xs text-error mt-0.5">Account numbers don't match</p>
              )}
            </div>
          </div>
        )}

        {/* Consent card */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.15)' }}
        >
          <p className="font-body text-xs font-semibold text-accent">What ChangeAIPay can see</p>
          {[
            { icon: '✓', text: 'Account balance and transaction history', allow: true },
            { icon: '✓', text: 'Initiate transfers you explicitly authorise', allow: true },
            { icon: '✗', text: 'Your bank login credentials (never stored)', allow: false },
            { icon: '✗', text: 'Transfer money without your confirmation', allow: false },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className={`font-mono text-xs font-bold shrink-0 mt-0.5 ${item.allow ? 'text-success' : 'text-error'}`}>
                {item.icon}
              </span>
              <p className="font-body text-xs text-text-2 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Security trust-line */}
        <div className="flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L2 3v4.5C2 10 4 11.5 7 12c3-.5 5-2 5-4.5V3L7 1Z"
              stroke="rgba(175,197,255,0.35)" strokeWidth="1" strokeLinejoin="round" />
            <path d="M4.5 7l2 2 3-3" stroke="rgba(175,197,255,0.45)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Bank-grade 256-bit encryption. Your credentials are transmitted directly and never stored on ChangeAIPay servers. Connection powered by a regulated open-banking aggregator.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-8">
        <button
          disabled={!canContinue || loading}
          onClick={handleSubmit}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" style={{ animation: 'spin 0.8s linear infinite' }} />
              Connecting securely…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L2 3v4.5C2 10 4 11.5 7 12c3-.5 5-2 5-4.5V3L7 1Z" stroke="white" strokeWidth="1.2" />
                <path d="M4.5 7l2 2 3-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {mode === 'login' ? 'Connect Securely' : 'Verify Account'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
