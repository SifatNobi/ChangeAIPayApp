import { useState, useEffect } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'

interface EnableBiometricsProps {
  onEnable: () => void
  onSkip: () => void
  onBack: () => void
}

type BiometricType = 'faceId' | 'fingerprint'

/* ── Face ID illustration ────────────────────────────────────── */
function FaceIdIllustration() {
  return (
    <svg width="140" height="120" viewBox="0 0 140 120" fill="none" aria-hidden="true">
      <circle cx="70" cy="60" r="48" fill="rgba(16,28,77,0.8)" stroke="rgba(175,197,255,0.08)" strokeWidth="1" />
      {/* Corner scan brackets */}
      <path d="M40 36h-8v8" stroke="rgba(63,231,255,0.7)" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 36h8v8" stroke="rgba(63,231,255,0.7)" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 84h-8v-8" stroke="rgba(63,231,255,0.7)" strokeWidth="2" strokeLinecap="round" />
      <path d="M100 84h8v-8" stroke="rgba(63,231,255,0.7)" strokeWidth="2" strokeLinecap="round" />
      {/* Face outline */}
      <ellipse cx="70" cy="60" rx="22" ry="26" stroke="rgba(175,197,255,0.35)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      {/* Eyes */}
      <circle cx="62" cy="56" r="3.5" fill="rgba(63,231,255,0.4)" />
      <circle cx="78" cy="56" r="3.5" fill="rgba(63,231,255,0.4)" />
      {/* Smile */}
      <path d="M62 68 Q70 74 78 68" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Dot-matrix scan pattern */}
      {[55, 60, 65, 70, 75, 80, 85].map(y =>
        [50, 55, 60, 65, 70, 75, 80, 85, 90].map(x => {
          const inFace = Math.sqrt(Math.pow(x - 70, 2) / (22 * 22) + Math.pow(y - 60, 2) / (26 * 26)) < 0.9
          return inFace ? (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.8"
              fill="rgba(63,231,255,0.15)" />
          ) : null
        })
      )}
    </svg>
  )
}

/* ── Fingerprint illustration ────────────────────────────────── */
function FingerprintIllustration() {
  return (
    <svg width="140" height="120" viewBox="0 0 140 120" fill="none" aria-hidden="true">
      <circle cx="70" cy="60" r="48" fill="rgba(16,28,77,0.8)" stroke="rgba(175,197,255,0.08)" strokeWidth="1" />
      {/* Fingerprint arcs */}
      <path d="M70 30c-16.57 0-30 13.43-30 30" stroke="rgba(63,231,255,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M70 36c-13.25 0-24 10.75-24 24" stroke="rgba(63,231,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M70 42c-9.94 0-18 8.06-18 18" stroke="rgba(63,231,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M70 48c-6.63 0-12 5.37-12 12" stroke="rgba(63,231,255,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M70 30c16.57 0 30 13.43 30 30" stroke="rgba(63,231,255,0.7)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M70 36c13.25 0 24 10.75 24 24" stroke="rgba(63,231,255,0.6)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M70 42c9.94 0 18 8.06 18 18" stroke="rgba(63,231,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M70 48c6.63 0 12 5.37 12 12" stroke="rgba(63,231,255,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Vertical lines bottom */}
      <line x1="55" y1="60" x2="55" y2="80" stroke="rgba(63,231,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="62" y1="60" x2="62" y2="85" stroke="rgba(63,231,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="70" y1="60" x2="70" y2="86" stroke="rgba(63,231,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="78" y1="60" x2="78" y2="85" stroke="rgba(63,231,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="85" y1="60" x2="85" y2="80" stroke="rgba(63,231,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Center dot */}
      <circle cx="70" cy="60" r="4" fill="rgba(63,231,255,0.4)" />
    </svg>
  )
}

export default function EnableBiometrics({ onEnable, onSkip, onBack }: EnableBiometricsProps) {
  const [type, setType] = useState<BiometricType>('faceId')
  const [showNativeSheet, setShowNativeSheet] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [consented, setConsented] = useState(false)

  const handleEnable = () => { if (consented) setShowNativeSheet(true) }

  useEffect(() => {
    if (!showNativeSheet) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowNativeSheet(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showNativeSheet])

  const handleNativeConfirm = async () => {
    setShowNativeSheet(false)
    setEnrolling(true)
    await new Promise(r => setTimeout(r, 1200))
    setEnrolling(false)
    onEnable()
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-bg px-5 pt-4 pb-10">
        <AuthHeader onBack={onBack} step={4} totalSteps={5} />

        <div className="flex flex-col flex-1 mt-6">
          {/* Type toggle */}
          <div className="flex gap-2 mb-8 self-center">
            {(['faceId', 'fingerprint'] as BiometricType[]).map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`h-9 px-4 rounded-full font-body text-sm font-medium transition-all duration-[250ms] focus-ring
                  ${type === t ? 'bg-primary text-white' : 'bg-surface text-text-2 border border-[color:var(--color-border)] hover:text-text'}`}
              >
                {t === 'faceId' ? 'Face ID' : 'Fingerprint'}
              </button>
            ))}
          </div>

          <div key={type} className="flex flex-col items-center gap-8 animate-fade-in">
            {/* Illustration */}
            <div className="w-36 h-32 rounded-[--radius-3xl] bg-surface border border-[color:var(--color-border)] flex items-center justify-center">
              {type === 'faceId' ? <FaceIdIllustration /> : <FingerprintIllustration />}
            </div>

            <div className="text-center flex flex-col gap-2">
              <h1 className="font-display text-2xl font-extrabold text-text">
                {type === 'faceId' ? 'Enable Face ID' : 'Enable Fingerprint'}
              </h1>
              <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
                {type === 'faceId'
                  ? "Use your face to log in instantly and confirm payments. Faster than any password."
                  : "Touch the sensor to log in and confirm payments in under a second."}
              </p>
            </div>

            {/* Consent disclosure card */}
            <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-4">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Before you enable — what we collect</p>
              {[
                {
                  icon: '📐',
                  label: type === 'faceId' ? 'Face geometry template' : 'Fingerprint template',
                  detail: type === 'faceId'
                    ? 'Your device generates a mathematical representation of your facial geometry. The original image is immediately discarded.'
                    : 'Your device generates a mathematical representation of your fingerprint ridge pattern. The original image is immediately discarded.',
                },
                {
                  icon: '🔒',
                  label: 'Stored only on your device',
                  detail: type === 'faceId'
                    ? 'The template is stored in your device\'s Secure Enclave (Apple) or StrongBox (Android) — a hardware-isolated security chip. ChangeAIPay never receives, stores, or transmits this data.'
                    : 'The template is stored in your device\'s hardware security module only. ChangeAIPay never receives, stores, or transmits this data.',
                },
                {
                  icon: '📅',
                  label: 'Retained until you revoke',
                  detail: 'The biometric template remains on your device until you disable biometric login in Settings, or until you delete your account. We have no copy to delete on our end.',
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-body text-sm font-semibold text-text">{item.label}</p>
                    <p className="font-body text-xs text-text-2 leading-relaxed mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
              <div className="pt-1 border-t border-[color:var(--color-border)]">
                <p className="font-body text-xs text-text-muted leading-relaxed">
                  For full details on biometric data handling and your deletion rights, see our{' '}
                  <button
                    onClick={() => window.open('https://changeaipay.com/legal/biometric-retention', '_blank')}
                    className="text-accent underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    Biometric Data Retention Policy
                  </button>.
                </p>
              </div>
            </div>

            {/* Explicit consent checkbox */}
            <button
              onClick={() => setConsented(c => !c)}
              className="flex items-start gap-3 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              aria-pressed={consented}
            >
              <div
                className="mt-0.5 w-5 h-5 rounded shrink-0 flex items-center justify-center transition-colors"
                style={{
                  background: consented ? 'var(--color-accent)' : 'transparent',
                  border: `1.5px solid ${consented ? 'var(--color-accent)' : 'rgba(175,197,255,0.35)'}`,
                }}
              >
                {consented && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
                    <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <p className="font-body text-xs text-text-2 leading-relaxed">
                I understand that a {type === 'faceId' ? 'facial geometry template' : 'fingerprint template'} will be created and stored in my device's secure hardware. I consent to this data being used solely to authenticate me in ChangeAIPay, and I can revoke this at any time in Settings.
              </p>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <Button variant="primary" fullWidth loading={enrolling} onClick={handleEnable} disabled={!consented || enrolling}>
            {enrolling ? 'Enabling…' : `Enable ${type === 'faceId' ? 'Face ID' : 'Fingerprint'}`}
          </Button>
          <Button variant="ghost" fullWidth onClick={onSkip}>
            Not Now
          </Button>
        </div>
      </div>

      {/* Simulated native biometric enrollment sheet */}
      {showNativeSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-10 px-4 animate-fade-in"
          role="dialog" aria-modal="true" aria-label="Biometric enrollment confirmation"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowNativeSheet(false) }}>
          <div className="w-full max-w-sm rounded-[--radius-3xl] bg-[#1C1C1E] border border-white/12 overflow-hidden animate-slide-up">
            <div className="px-6 pt-8 pb-6 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-[--radius-xl] bg-surface flex items-center justify-center">
                {type === 'faceId' ? <FaceIdIllustration /> : <FingerprintIllustration />}
              </div>
              <p className="font-body text-base font-semibold text-white">
                Use {type === 'faceId' ? 'Face ID' : 'Fingerprint'} for ChangeAIPay?
              </p>
              <p className="font-body text-sm text-[rgba(255,255,255,0.55)] leading-relaxed">
                {type === 'faceId'
                  ? 'Look at your device to authenticate.'
                  : 'Place your finger on the sensor to authenticate.'}
              </p>
            </div>
            <div className="border-t border-white/10">
              <button onClick={() => setShowNativeSheet(false)}
                className="w-full py-4 font-body text-base text-[#0A84FF] hover:bg-white/5 transition-colors border-b border-white/10">
                Cancel
              </button>
              <button onClick={handleNativeConfirm}
                className="w-full py-4 font-body text-base font-semibold text-[#0A84FF] hover:bg-white/5 transition-colors">
                {type === 'faceId' ? 'Scan Face' : 'Scan Fingerprint'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
