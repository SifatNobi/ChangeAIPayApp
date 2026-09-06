import { useState, useEffect, useCallback } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { OTPInput } from '@/components/Input'

interface OTPVerificationProps {
  contact: string
  onVerified: () => void
  onBack: () => void
}

type OTPState = 'idle' | 'loading' | 'success' | 'wrongCode' | 'expired'

const RESEND_COOLDOWN = 60

export default function OTPVerification({ contact, onVerified, onBack }: OTPVerificationProps) {
  const [code, setCode] = useState('')
  const [state, setState] = useState<OTPState>('idle')
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN)
  const [resendCount, setResendCount] = useState(0)

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleVerify = useCallback(async (val: string) => {
    if (val.length < 6) return
    setState('loading')
    await new Promise(r => setTimeout(r, 1000))
    // Demo: code "000000" = expired, anything else succeeds
    if (val === '000000') {
      setState('expired')
    } else if (val === '111111') {
      setState('wrongCode')
    } else {
      setState('success')
      await new Promise(r => setTimeout(r, 700))
      onVerified()
    }
  }, [onVerified])

  const handleChange = (val: string) => {
    setCode(val)
    if (state === 'wrongCode' || state === 'expired') setState('idle')
    if (val.length === 6) handleVerify(val)
  }

  const handleResend = async () => {
    if (countdown > 0) return
    setCode('')
    setState('idle')
    setResendCount(c => c + 1)
    setCountdown(RESEND_COOLDOWN)
  }

  const isError = state === 'wrongCode' || state === 'expired'

  return (
    <div className="flex flex-col min-h-screen bg-bg px-5 pt-4 pb-10">
      <AuthHeader onBack={onBack} title="Verify Your Identity" step={2} totalSteps={5} />

      <div className="flex flex-col flex-1 mt-8 animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-[--radius-3xl] bg-surface border border-[color:var(--color-border)] flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="6" y="4" width="24" height="28" rx="4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" />
              <rect x="12" y="10" width="12" height="3" rx="1.5" fill="rgba(63,231,255,0.3)" />
              <rect x="12" y="16" width="8" height="3" rx="1.5" fill="rgba(175,197,255,0.2)" />
              <circle cx="27" cy="27" r="7" fill="#101C4D" stroke="rgba(63,231,255,0.5)" strokeWidth="1.5" />
              <path d="M24 27l2 2 4-4" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1 className="font-display text-2xl font-extrabold text-text text-center mb-2">
          Enter Verification Code
        </h1>
        <p className="font-body text-sm text-text-2 text-center mb-8">
          We sent a 6-digit code to{' '}
          <span className="font-semibold text-text">{contact}</span>
        </p>

        {/* OTP input */}
        <div className="flex justify-center mb-6">
          <div className={isError ? 'animate-error-shake' : ''}>
            <OTPInput
              length={6}
              value={code}
              onChange={handleChange}
              error={isError}
            />
          </div>
        </div>

        {/* State feedback */}
        <div className="min-h-[28px] flex items-center justify-center mb-8">
          {state === 'loading' && (
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent"
                style={{ animation: 'spin 0.9s linear infinite' }} />
              <p className="font-body text-xs text-text-2">Verifying…</p>
            </div>
          )}
          {state === 'wrongCode' && (
            <p className="font-body text-sm text-error animate-fade-in">
              Incorrect code. Please check and try again.
            </p>
          )}
          {state === 'expired' && (
            <p className="font-body text-sm text-error animate-fade-in">
              This code has expired. Please request a new one.
            </p>
          )}
          {state === 'success' && (
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="#00D26A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-body text-sm text-success">Verified!</p>
            </div>
          )}
        </div>

        {/* Resend */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-body text-sm text-text-muted">
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : "Didn't receive a code?"}
          </p>
          <button
            onClick={handleResend}
            disabled={countdown > 0}
            className={`font-body text-sm font-semibold transition-colors focus-ring rounded ${
              countdown > 0 ? 'text-text-muted cursor-default' : 'text-accent hover:underline underline-offset-2'
            }`}
          >
            {countdown > 0 ? `Wait ${countdown}s` : 'Resend Code'}
          </button>
          {resendCount > 0 && countdown === RESEND_COOLDOWN && (
            <p className="font-body text-xs text-success animate-fade-in">
              A new code has been sent
            </p>
          )}
        </div>

        {/* Rate limit warning */}
        {resendCount >= 3 && (
          <div className="mt-4 rounded-[--radius-xl] bg-warning/8 border border-warning/20 px-4 py-3 animate-fade-in">
            <p className="font-body text-xs text-warning text-center">
              Too many requests. Please wait before requesting another code.
            </p>
          </div>
        )}
      </div>

      <Button
        variant="primary"
        fullWidth
        loading={state === 'loading'}
        disabled={code.length < 6 || state === 'loading' || state === 'success'}
        onClick={() => handleVerify(code)}
      >
        Verify
      </Button>
    </div>
  )
}
