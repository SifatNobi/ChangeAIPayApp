import { useState, useCallback } from 'react'

interface NanoExportKeyProps {
  onBack?: () => void
}

type Stage = 'auth' | 'warning' | 'revealed'

// Deterministic mock private key — real Nano private keys are 64 hex chars
const MOCK_PRIVATE_KEY =
  '3A7F2C9E1B4D8F6A0E5C3B7D9F2A4E8C1B6D0F3A7E2C5B9D4F1A8E3C6B0D7F2A'

export default function NanoExportKey({ onBack }: NanoExportKeyProps) {
  const [stage, setStage] = useState<Stage>('auth')
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [biometricDone, setBiometricDone] = useState(false)
  const [biometricLoading, setBiometricLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [keyCopied, setKeyCopied] = useState(false)
  const [keyVisible, setKeyVisible] = useState(false)

  // Simulate biometric prompt
  const handleBiometric = useCallback(() => {
    setBiometricLoading(true)
    setTimeout(() => {
      setBiometricLoading(false)
      setBiometricDone(true)
    }, 1200)
  }, [])

  const handlePinSubmit = useCallback(() => {
    if (pin.length < 4) {
      setPinError('Enter your PIN to continue')
      return
    }
    // In production: verify PIN against stored hash
    // Here we accept any 4+ digit entry for demo
    if (!/^\d{4,6}$/.test(pin)) {
      setPinError('PIN must be 4–6 digits')
      return
    }
    setPinError('')
    setStage('warning')
  }, [pin])

  const handleCopyKey = useCallback(() => {
    navigator.clipboard.writeText(MOCK_PRIVATE_KEY).catch(() => {})
    setKeyCopied(true)
    setTimeout(() => setKeyCopied(false), 2500)
  }, [])

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>

      {/* Ambient — red tint to signal danger zone */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255,77,90,0.06) 0%, transparent 65%)',
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">
          Export Nano Wallet Key
        </p>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* ── STAGE: AUTH ── */}
        {stage === 'auth' && (
          <>
            {/* Explanation */}
            <div
              className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-3"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,77,90,0.1)', border: '1px solid rgba(255,77,90,0.25)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="#FF4D5A" strokeWidth="1.2" />
                    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="8" cy="11" r="1" fill="#FF4D5A" />
                  </svg>
                </div>
                <p className="font-display text-sm font-extrabold text-text">Advanced — read carefully</p>
              </div>
              <p className="font-body text-sm text-text-2 leading-relaxed">
                This reveals the <span className="font-semibold text-text">private key</span> behind your ChangeAIPay balance on the Nano network. Anyone who has this key can access and move your funds — permanently and irreversibly.
              </p>
              <p className="font-body text-sm text-text-2 leading-relaxed">
                <span className="font-semibold text-warning">Most users never need this.</span> It exists for users who want true self-custody — importing their key into an external Nano wallet like Natrium or Nault.
              </p>
            </div>

            {/* Biometric gate */}
            <div className="flex flex-col gap-3">
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
                Step 1 — Verify with biometrics
              </p>
              <button
                onClick={handleBiometric}
                disabled={biometricDone || biometricLoading}
                className="flex items-center gap-3 px-4 py-4 rounded-[--radius-xl] transition-all active:scale-[0.98] disabled:opacity-60"
                style={{
                  background: biometricDone ? 'rgba(34,197,94,0.07)' : 'rgba(175,197,255,0.04)',
                  border: `1px solid ${biometricDone ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.15)'}`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-[13px] flex items-center justify-center shrink-0"
                  style={{
                    background: biometricDone ? 'rgba(34,197,94,0.12)' : 'rgba(63,231,255,0.08)',
                    border: `1px solid ${biometricDone ? 'rgba(34,197,94,0.3)' : 'rgba(63,231,255,0.2)'}`,
                  }}
                >
                  {biometricLoading ? (
                    <div className="w-4 h-4 rounded-full border-2 border-[#3FE7FF]/30 border-t-[#3FE7FF] animate-spin" />
                  ) : biometricDone ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 6C3 3.8 4.8 2 8 2s5 1.8 5 4" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="8" cy="9" r="2.5" stroke="#3FE7FF" strokeWidth="1.2" />
                      <path d="M5 13c.9 1.5 1.8 2 3 2s2.1-.5 3-2" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-body text-sm font-semibold text-text">
                    {biometricDone ? 'Biometric verified' : biometricLoading ? 'Verifying…' : 'Tap to use Face ID / Biometrics'}
                  </p>
                  <p className="font-body text-[10px] text-text-muted">Required to proceed</p>
                </div>
              </button>
            </div>

            {/* PIN gate */}
            <div className="flex flex-col gap-3">
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
                Step 2 — Enter your PIN
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={e => { setPin(e.target.value.replace(/\D/g, '')); setPinError('') }}
                  placeholder="••••••"
                  className="h-14 px-4 rounded-[--radius-xl] font-display text-2xl text-center text-text placeholder-text-muted outline-none tracking-[0.4em]"
                  style={{
                    background: 'rgba(175,197,255,0.04)',
                    border: `1px solid ${pinError ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.15)'}`,
                    letterSpacing: pin ? '0.4em' : undefined,
                  }}
                />
                {pinError && (
                  <p className="font-body text-[10px] text-center" style={{ color: '#FF4D5A' }}>{pinError}</p>
                )}
              </div>
            </div>

            <button
              onClick={handlePinSubmit}
              disabled={!biometricDone || pin.length < 4}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-35"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* ── STAGE: WARNING ── */}
        {stage === 'warning' && (
          <>
            {/* Strong warning card */}
            <div
              className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
              style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.3)' }}
            >
              <div className="flex items-center gap-2.5">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <path d="M10 2L1.5 17h17L10 2Z" stroke="#FF4D5A" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M10 8v4.5M10 14.5v.5" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="font-display text-sm font-extrabold" style={{ color: '#FF4D5A' }}>
                  Before you proceed
                </p>
              </div>

              {[
                'Never screenshot or photograph this key.',
                'Never store it in a notes app, email, or cloud service.',
                'Never share it with anyone — including ChangeAIPay support.',
                'Write it on paper and store it somewhere physically secure, or use a hardware wallet.',
              ].map((warning, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(255,77,90,0.15)', border: '1px solid rgba(255,77,90,0.3)' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-body text-sm text-text-2 leading-relaxed">{warning}</p>
                </div>
              ))}
            </div>

            {/* Confirmation checkbox */}
            <button
              onClick={() => setConfirmed(c => !c)}
              className="flex items-start gap-3 px-4 py-4 rounded-[--radius-xl] text-left transition-all"
              style={{
                background: confirmed ? 'rgba(34,197,94,0.06)' : 'rgba(175,197,255,0.03)',
                border: `1px solid ${confirmed ? 'rgba(34,197,94,0.25)' : 'rgba(175,197,255,0.12)'}`,
              }}
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all"
                style={{
                  background: confirmed ? '#22C55E' : 'transparent',
                  border: `2px solid ${confirmed ? '#22C55E' : 'rgba(175,197,255,0.3)'}`,
                }}
              >
                {confirmed && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <p className="font-body text-sm text-text-2 leading-relaxed">
                I understand this key gives full access to my funds. I will store it securely offline and never share it digitally.
              </p>
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setStage('auth')}
                className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 transition-all active:scale-[0.98]"
                style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
              >
                Go Back
              </button>
              <button
                onClick={() => { if (confirmed) setStage('revealed') }}
                disabled={!confirmed}
                className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-30"
                style={{ background: 'rgba(255,77,90,0.8)' }}
              >
                Reveal Key
              </button>
            </div>
          </>
        )}

        {/* ── STAGE: REVEALED ── */}
        {stage === 'revealed' && (
          <>
            {/* Persistent danger reminder */}
            <div
              className="flex items-center gap-2.5 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.25)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <path d="M7 1.5L.5 12.5h13L7 1.5Z" stroke="#FF4D5A" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M7 5.5v3M7 10v.5" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <p className="font-body text-xs leading-relaxed" style={{ color: 'rgba(255,100,110,0.9)' }}>
                <span className="font-bold">Never screenshot this screen.</span> Write the key on paper only.
              </p>
            </div>

            {/* Key display */}
            <div
              className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              <div className="flex items-center justify-between">
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Private Key (Nano)
                </p>
                <button
                  onClick={() => setKeyVisible(v => !v)}
                  className="font-body text-xs font-semibold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {keyVisible ? 'Hide' : 'Show'}
                </button>
              </div>

              {keyVisible ? (
                <p
                  className="font-mono text-xs text-text leading-relaxed break-all select-all"
                  style={{ wordBreak: 'break-all' }}
                >
                  {MOCK_PRIVATE_KEY}
                </p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ background: 'rgba(175,197,255,0.15)' }}
                    />
                  ))}
                </div>
              )}

              {keyVisible && (
                <button
                  onClick={handleCopyKey}
                  className="flex items-center justify-center gap-2 h-10 rounded-[--radius-xl] font-body text-xs font-semibold transition-all active:scale-[0.97]"
                  style={{
                    background: keyCopied ? 'rgba(34,197,94,0.1)' : 'rgba(175,197,255,0.07)',
                    border: `1px solid ${keyCopied ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.15)'}`,
                    color: keyCopied ? '#22C55E' : 'rgba(175,197,255,0.7)',
                  }}
                >
                  {keyCopied ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l2.5 3 5.5-5.5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Copied to clipboard
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="2" y="4" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1" />
                        <path d="M4 4V3a0.8 0.8 0 0 1 0.8-0.8h4.4a0.8 0.8 0 0 1 0.8 0.8v4.4a0.8 0.8 0 0 1-0.8 0.8H8" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      Copy key
                    </>
                  )}
                </button>
              )}
            </div>

            {/* What to do with it */}
            <div
              className="rounded-[--radius-xl] px-4 py-4 flex flex-col gap-2"
              style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.12)' }}
            >
              <p className="font-body text-xs font-semibold text-[#3FE7FF]">Using this key</p>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Import this key into a self-custody Nano wallet such as <span className="text-text-2 font-medium">Natrium</span> or <span className="text-text-2 font-medium">Nault</span> to manage your funds directly on the Nano network, independent of ChangeAIPay.
              </p>
            </div>

            <button
              onClick={onBack}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 transition-all active:scale-[0.98]"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>
  )
}
