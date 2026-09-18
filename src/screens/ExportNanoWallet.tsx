import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'

// Demo private key — deterministic, looks like a real Nano seed (64 hex chars)
// In production this would be derived from the user's encrypted keystore, never hardcoded
const DEMO_SEED = 'A7F3C9D2E8B14056F2918C3D7A5E6B0F4C8D2A9E3B7F1C5D4A8E2B6F0C9D3A7'
const NANO_ADDRESS = 'nano_3changeaipay1user8maya9patel7wallet4x2k9q1p5z6n8m3v7'

type AuthStep = 'warning' | 'pin' | 'biometric' | 'confirm' | 'revealed'

const PIN_HINT = '• • • • • •'

export default function ExportNanoWallet({ onBack }: { onBack?: () => void }) {
  const [step, setStep] = useState<AuthStep>('warning')
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [bioLoading, setBioLoading] = useState(false)
  const [bioError, setBioError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const handlePinSubmit = () => {
    if (pin.length < 6) { setPinError(true); return }
    // Demo: accept any 6-digit PIN
    setPinError(false)
    setStep('biometric')
  }

  const handleBiometric = () => {
    setBioLoading(true)
    setBioError(false)
    // Simulate biometric check — succeeds after 1.2s
    setTimeout(() => {
      setBioLoading(false)
      setStep('confirm')
    }, 1200)
  }

  const handleReveal = () => setRevealed(true)
  setStep  // suppress unused-var lint

  const copySeed = () => {
    navigator.clipboard.writeText(DEMO_SEED).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  // ── Warning gate ────────────────────────────────────────────
  if (step === 'warning') {
    return (
      <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
        <AuthHeader title="Export Wallet" onBack={onBack} />

        <div className="mt-6 flex flex-col gap-5">
          {/* Skull-level warning card */}
          <div
            className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-3"
            style={{ background: 'rgba(255,77,90,0.06)', border: '1.5px solid rgba(255,77,90,0.35)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,77,90,0.12)', border: '1px solid rgba(255,77,90,0.3)' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2a6 6 0 0 0-6 6c0 2.1 1 3.9 2.6 5H7v1.5A1.5 1.5 0 0 0 8.5 16h3a1.5 1.5 0 0 0 1.5-1.5V13h.4A5.99 5.99 0 0 0 10 2Z" stroke="#FF4D5A" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M8.5 13v-2M11.5 13v-2" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-display text-base font-extrabold" style={{ color: '#FF4D5A' }}>
                Advanced — Read carefully
              </p>
            </div>
            <p className="font-body text-sm text-text-2 leading-relaxed">
              This reveals the <strong className="text-text">private key</strong> behind your ChangeAIPay balance. <strong className="text-[#FF4D5A]">Anyone with this key can access and move your funds permanently</strong> — there is no recovery if it is leaked.
            </p>
            <p className="font-body text-sm text-text-2 leading-relaxed">
              Most users never need this. It exists so you can take full self-custody if you choose to.
            </p>
          </div>

          {/* What this is for */}
          <div
            className="rounded-[--radius-2xl] px-5 py-4 flex flex-col gap-3"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">When you might need this</p>
            {[
              'Moving to a self-custody wallet (Natrium, Nault, etc.)',
              'Keeping an offline backup in a secure physical location',
              'Verifying ownership of your Nano address independently',
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.15)' }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l1.5 1.5 3.5-3" stroke="rgba(175,197,255,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-body text-xs text-text-2 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Never do */}
          <div
            className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-3"
            style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.25)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
              <path d="M7 1.5L13 12H1L7 1.5Z" stroke="#F5B700" strokeWidth="1.1" strokeLinejoin="round" />
              <path d="M7 5.5v3M7 10v.5" stroke="#F5B700" strokeWidth="1.1" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[11px] text-text-2 leading-relaxed">
              <strong className="text-[#F5B700]">Never screenshot, email, or store your key digitally.</strong> Save it only on paper or in a dedicated hardware wallet.
            </p>
          </div>

          <button
            onClick={() => setStep('pin')}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: 'rgba(255,77,90,0.12)', color: '#FF4D5A', border: '1.5px solid rgba(255,77,90,0.35)' }}
          >
            I understand — continue to verification
          </button>
        </div>
      </div>
    )
  }

  // ── PIN entry ───────────────────────────────────────────────
  if (step === 'pin') {
    const dots = pin.length
    return (
      <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
        <AuthHeader title="Verify Identity" onBack={() => setStep('warning')} step={1} totalSteps={2} />

        <div className="mt-8 flex flex-col items-center gap-8">
          <div className="text-center">
            <p className="font-body text-sm text-text-muted mb-1">Enter your PIN to continue</p>
            <div className="flex gap-3 justify-center mt-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full transition-all duration-150"
                  style={{ background: i < dots ? '#0066FF' : 'rgba(175,197,255,0.2)', boxShadow: i < dots ? '0 0 8px rgba(0,102,255,0.5)' : 'none' }}
                />
              ))}
            </div>
            {pinError && <p className="font-body text-xs mt-3" style={{ color: '#FF4D5A' }}>Incorrect PIN — try again</p>}
          </div>

          {/* Numpad */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
            {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k, i) => {
              if (k === '') return <div key={i} />
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (k === '⌫') { setPin(p => p.slice(0, -1)); setPinError(false) }
                    else if (pin.length < 6) setPin(p => p + k)
                  }}
                  className="h-16 rounded-[--radius-2xl] font-display text-xl font-bold text-text flex items-center justify-center transition-all active:scale-90"
                  style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
                >
                  {k}
                </button>
              )
            })}
          </div>

          <button
            onClick={handlePinSubmit}
            disabled={pin.length < 6}
            className="w-full max-w-[280px] h-13 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center transition-all active:scale-[0.98]"
            style={{ background: pin.length >= 6 ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.08)', color: pin.length >= 6 ? 'white' : 'rgba(175,197,255,0.3)' }}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  // ── Biometric ───────────────────────────────────────────────
  if (step === 'biometric') {
    return (
      <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
        <AuthHeader title="Verify Identity" onBack={() => setStep('pin')} step={2} totalSteps={2} />

        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-4">
          <button
            onClick={handleBiometric}
            disabled={bioLoading}
            className="w-24 h-24 rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{
              background: bioLoading ? 'rgba(0,102,255,0.15)' : 'rgba(63,231,255,0.1)',
              border: `2px solid ${bioLoading ? 'rgba(0,102,255,0.4)' : 'rgba(63,231,255,0.3)'}`,
              boxShadow: bioLoading ? '0 0 32px rgba(0,102,255,0.25)' : '0 0 24px rgba(63,231,255,0.15)',
            }}
          >
            {bioLoading ? (
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : (
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M18 6C11.4 6 6 11.4 6 18c0 3.3 1.3 6.3 3.5 8.5" stroke="#3FE7FF" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M18 6c6.6 0 12 5.4 12 12 0 3.3-1.3 6.3-3.5 8.5" stroke="#3FE7FF" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M18 12c3.3 0 6 2.7 6 6 0 1.7-.7 3.2-1.8 4.3" stroke="rgba(63,231,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 12c-3.3 0-6 2.7-6 6 0 1.7.7 3.2 1.8 4.3" stroke="rgba(63,231,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="18" cy="18" r="2.5" fill="#3FE7FF" />
              </svg>
            )}
          </button>

          <div>
            <p className="font-display text-lg font-bold text-text">
              {bioLoading ? 'Verifying…' : 'Tap to use Face ID'}
            </p>
            <p className="font-body text-sm text-text-muted mt-1">
              Biometric confirmation required to reveal your private key
            </p>
          </div>

          {bioError && (
            <p className="font-body text-xs" style={{ color: '#FF4D5A' }}>Biometric failed — tap to try again</p>
          )}
        </div>
      </div>
    )
  }

  // ── Final confirmation ──────────────────────────────────────
  if (step === 'confirm') {
    return (
      <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
        <AuthHeader title="One Last Step" onBack={() => setStep('biometric')} />

        <div className="mt-8 flex flex-col gap-5">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(245,183,0,0.1)', border: '1.5px solid rgba(245,183,0,0.35)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="5" y="12" width="18" height="14" rx="2.5" stroke="#F5B700" strokeWidth="1.5" />
                <path d="M9 12V8a5 5 0 0 1 10 0v4" stroke="#F5B700" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="14" cy="18.5" r="2" fill="#F5B700" />
                <path d="M14 20.5v2" stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-display text-xl font-extrabold text-text">Ready to reveal</p>
            <p className="font-body text-sm text-text-muted mt-2 leading-relaxed px-4">
              Your private key will appear on screen. Make sure no one can see your display.
            </p>
          </div>

          <div
            className="rounded-[--radius-2xl] px-5 py-4 flex flex-col gap-2"
            style={{ background: 'rgba(255,77,90,0.05)', border: '1px solid rgba(255,77,90,0.2)' }}
          >
            {[
              'You are alone or in a private location',
              'Screen recording / sharing is off',
              'You will not screenshot this key',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                  style={{ background: 'rgba(255,77,90,0.1)', border: '1px solid rgba(255,77,90,0.25)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF4D5A' }} />
                </div>
                <p className="font-body text-xs text-text-2">{item}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleReveal}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 24px rgba(0,102,255,0.35)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="2.5" stroke="white" strokeWidth="1.2" />
              <path d="M1.5 7C2.8 4 4.8 2.5 7 2.5s4.2 1.5 5.5 4.5C11.2 10 9.2 11.5 7 11.5S2.8 10 1.5 7Z" stroke="white" strokeWidth="1.2" />
            </svg>
            Reveal private key
          </button>
        </div>
      </div>
    )
  }

  // ── Revealed ────────────────────────────────────────────────
  return (
    <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
      <AuthHeader title="Private Key" onBack={onBack} />

      <div className="mt-6 flex flex-col gap-5">
        {/* Critical warning */}
        <div
          className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-3"
          style={{ background: 'rgba(255,77,90,0.07)', border: '1px solid rgba(255,77,90,0.35)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 1.5L13 12H1L7 1.5Z" stroke="#FF4D5A" strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M7 5v3.5M7 10v.5" stroke="#FF4D5A" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[11px] text-text-2 leading-relaxed">
            <strong className="text-[#FF4D5A]">Never screenshot or share this key.</strong> Write it on paper only. Store it offline in a secure location.
          </p>
        </div>

        {/* Key display */}
        <div
          className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
          style={{ background: 'rgba(0,10,40,0.95)', border: '1.5px solid rgba(63,231,255,0.2)', boxShadow: '0 0 32px rgba(0,102,255,0.15)' }}
        >
          <div>
            <p className="font-body text-[9px] font-semibold uppercase tracking-wider text-text-muted mb-2">Nano seed / private key</p>
            <p
              className="font-mono text-sm font-bold text-text leading-relaxed break-all"
              style={{ color: '#3FE7FF', letterSpacing: '0.04em' }}
            >
              {DEMO_SEED}
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(63,231,255,0.1)' }} className="pt-3">
            <p className="font-body text-[9px] font-semibold uppercase tracking-wider text-text-muted mb-1.5">Derived Nano address</p>
            <p className="font-mono text-[10px] text-text-2 break-all">{NANO_ADDRESS}</p>
          </div>

          <button
            onClick={copySeed}
            className="w-full h-10 rounded-[--radius-xl] font-body text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(63,231,255,0.08)',
              color: copied ? '#22C55E' : '#3FE7FF',
              border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(63,231,255,0.2)'}`,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              {copied
                ? <path d="M2 6l2.5 2.5 5.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                : <><rect x="4" y="4" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1" /><path d="M4 8H2.8A.8.8 0 0 1 2 7.2V2.8A.8.8 0 0 1 2.8 2h4.4A.8.8 0 0 1 8 2.8V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></>
              }
            </svg>
            {copied ? 'Copied to clipboard' : 'Copy key'}
          </button>
        </div>

        {/* What to do next */}
        <div
          className="rounded-[--radius-2xl] px-5 py-4 flex flex-col gap-2.5"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Recommended next steps</p>
          {[
            'Write the key on paper — never type it into another app',
            'Store the paper in a fireproof safe or safety deposit box',
            'Import into Natrium, Nault, or a hardware wallet to verify',
            'Delete this screen from your recent apps when done',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="font-mono text-[10px] font-bold mt-0.5 shrink-0" style={{ color: 'rgba(175,197,255,0.3)' }}>{i + 1}</span>
              <p className="font-body text-xs text-text-2 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <p className="font-body text-[10px] text-text-muted text-center px-4 leading-relaxed">
          Your ChangeAIPay account remains active. Exporting the key does not change your in-app balance or settings.
        </p>
      </div>
    </div>
  )
}
