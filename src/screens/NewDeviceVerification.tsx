import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { OTPInput } from '@/components/Input'

interface NewDeviceVerificationProps {
  deviceType?: string
  location?: string
  onConfirm: () => void
  onDeny: () => void
  onBack: () => void
}

type State = 'idle' | 'loading' | 'error' | 'success'

function DeviceIcon({ type }: { type: string }) {
  const isPhone = type.toLowerCase().includes('phone') || type.toLowerCase().includes('mobile')
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {isPhone ? (
        <>
          <rect x="7" y="2" width="14" height="24" rx="3"
            stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" />
          <circle cx="14" cy="22" r="1.5" fill="rgba(175,197,255,0.5)" />
          <line x1="11" y1="5.5" x2="17" y2="5.5"
            stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <rect x="3" y="5" width="22" height="15" rx="2.5"
            stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" />
          <line x1="10" y1="20" x2="18" y2="20"
            stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="12" y1="20" x2="16" y2="23"
            stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export default function NewDeviceVerification({
  deviceType = 'Unknown Device',
  location = 'London, UK',
  onConfirm,
  onDeny,
  onBack,
}: NewDeviceVerificationProps) {
  const [otp, setOtp] = useState('')
  const [state, setState] = useState<State>('idle')
  const [otpError, setOtpError] = useState('')

  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

  const handleVerify = async () => {
    setOtpError('')
    if (otp.length < 6) {
      setOtpError('Enter the 6-digit code')
      return
    }
    setState('loading')
    await new Promise(r => setTimeout(r, 1200))
    if (otp === '111111') {
      setState('error')
      setOtpError('Incorrect code. Check your email and try again.')
      return
    }
    setState('success')
    setTimeout(onConfirm, 800)
  }

  return (
    <div className="flex flex-col bg-bg px-5 pt-4 pb-10" style={{ minHeight: 785 }}>
      <AuthHeader onBack={onBack} title="New Device" step={1} totalSteps={2} />

      <div className="flex flex-col flex-1 mt-6 gap-6">
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold text-text">
            New device detected
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            We noticed a login attempt from a device we have not seen before.
            Please verify it is you before we allow access.
          </p>
        </div>

        {/* Device info card */}
        <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-[--radius-xl] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)' }}
            >
              <DeviceIcon type={deviceType} />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-body text-sm font-semibold text-text">{deviceType}</p>
              <p className="font-mono text-xs text-text-muted">Unrecognized device</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Location', value: location },
              { label: 'Time', value: `${timeStr}, ${dateStr}` },
            ].map(row => (
              <div key={row.label}
                className="rounded-[--radius-lg] bg-bg px-3 py-2.5 flex flex-col gap-0.5">
                <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">
                  {row.label}
                </p>
                <p className="font-mono text-xs text-text-2">{row.value}</p>
              </div>
            ))}
          </div>

          <div
            className="rounded-[--radius-lg] px-3 py-2.5 flex items-center gap-2"
            style={{ background: 'rgba(245,183,0,0.08)', border: '1px solid rgba(245,183,0,0.2)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5L1 12h12L7 1.5Z"
                stroke="#F5B700" strokeWidth="1.3" strokeLinejoin="round" />
              <line x1="7" y1="5.5" x2="7" y2="8.5"
                stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="7" cy="10.5" r="0.7" fill="#F5B700" />
            </svg>
            <p className="font-body text-xs text-warning">
              If this was not you, deny access immediately.
            </p>
          </div>
        </div>

        {/* OTP input */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="font-body text-sm font-medium text-text">
              Enter the verification code
            </p>
            <p className="font-body text-xs text-text-muted">
              We sent a 6-digit code to your registered email.
            </p>
          </div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            error={!!otpError}
          />
          {otpError && (
            <p className="font-body text-xs text-error animate-fade-in">{otpError}</p>
          )}
          <p className="font-body text-[11px] text-text-muted">
            Demo: any code confirms · <span className="font-mono">111111</span> = wrong code
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        <Button
          variant="primary" fullWidth
          loading={state === 'loading'}
          disabled={otp.length < 6 || state === 'loading' || state === 'success'}
          onClick={handleVerify}
        >
          {state === 'success' ? "Verified ✓" : "This Was Me — Verify"}
        </Button>
        <Button variant="danger" fullWidth onClick={onDeny}>
          This Was Not Me — Deny Access
        </Button>
      </div>
    </div>
  )
}
