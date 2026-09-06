import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { TextInput } from '@/components/Input'

interface ForgotPasswordProps {
  onSent: (contact: string) => void
  onBack: () => void
}

type FPState = 'idle' | 'loading' | 'sent' | 'rateLimited'

export default function ForgotPassword({ onSent, onBack }: ForgotPasswordProps) {
  const [contact, setContact] = useState('')
  const [state, setState] = useState<FPState>('idle')
  const [error, setError] = useState('')
  const [sendCount, setSendCount] = useState(0)
  const [cooldown, setCooldown] = useState(0)

  const handleSend = async () => {
    setError('')
    if (!contact.trim()) {
      setError('Please enter your email or phone number')
      return
    }
    if (sendCount >= 3) {
      setState('rateLimited')
      return
    }

    setState('loading')
    await new Promise(r => setTimeout(r, 1400))

    setSendCount(c => c + 1)
    setState('sent')
  }

  const handleResend = async () => {
    if (sendCount >= 3) {
      setState('rateLimited')
      return
    }
    setState('loading')
    await new Promise(r => setTimeout(r, 1200))
    setSendCount(c => c + 1)
    setState('sent')
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg px-5 pt-4 pb-10">
      <AuthHeader onBack={onBack} title="Reset Password" />

      <div className="flex flex-col flex-1 mt-8">
        {state === 'sent' ? (
          /* Confirmation state */
          <div className="flex flex-col flex-1 items-center justify-center gap-6 text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center animate-success">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M4 8l12 9 12-9" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="4" y="8" width="24" height="18" rx="3" stroke="#3FE7FF" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display text-2xl font-extrabold text-text">Check your inbox</h2>
              <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
                We sent a reset link to{' '}
                <span className="font-semibold text-text">{contact}</span>.
                It expires in 15 minutes.
              </p>
            </div>

            <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-3 text-left">
              {[
                { step: '1', text: 'Open the email or SMS from ChangeAIPay' },
                { step: '2', text: 'Tap the reset link (valid 15 minutes)' },
                { step: '3', text: 'Create your new password' },
              ].map(s => (
                <div key={s.step} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs font-bold text-accent">{s.step}</span>
                  </div>
                  <p className="font-body text-sm text-text-2">{s.step === '3' ? s.text : s.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1 mt-2">
              <p className="font-body text-sm text-text-muted">
                {"Didn't receive it?"}
              </p>
              <button
                onClick={handleResend}
                disabled={sendCount >= 3}
                className={`font-body text-sm font-semibold transition-colors focus-ring rounded
                  ${sendCount >= 3 ? 'text-text-muted cursor-default' : 'text-accent hover:underline underline-offset-2'}`}
              >
                {sendCount >= 3 ? 'Maximum resends reached' : 'Resend reset link'}
              </button>
            </div>
          </div>
        ) : state === 'rateLimited' ? (
          /* Rate limited */
          <div className="flex flex-col flex-1 items-center justify-center gap-6 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 10v8M16 22v2" stroke="#F5B700" strokeWidth="2" strokeLinecap="round" />
                <path d="M13.5 4.5l-11 19A3 3 0 0 0 5 28h22a3 3 0 0 0 2.5-4.5l-11-19a3 3 0 0 0-5 0Z"
                  stroke="#F5B700" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-xl font-extrabold text-text mb-2">Too Many Requests</h2>
              <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
                You have reached the maximum number of reset requests. Please wait 30 minutes before trying again.
              </p>
            </div>
          </div>
        ) : (
          /* Input state */
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-display text-2xl font-extrabold text-text mb-2">
                Forgot your password?
              </h1>
              <p className="font-body text-sm text-text-2 leading-relaxed">
                No problem. Enter the email address or phone number linked to your account and we will send you a reset link.
              </p>
            </div>

            <TextInput
              label="Email or Phone Number"
              placeholder="maya@example.com"
              value={contact}
              onChange={e => { setContact(e.target.value); setError('') }}
              error={error}
              autoComplete="email"
            />

            <div className="rounded-[--radius-xl] bg-primary/6 border border-primary/15 px-4 py-3">
              <p className="font-body text-xs text-text-2 leading-relaxed">
                For security, reset links expire after 15 minutes. Only the most recent link will work.
              </p>
            </div>
          </div>
        )}
      </div>

      {state !== 'sent' && state !== 'rateLimited' && (
        <div className="flex flex-col gap-3 mt-8">
          <Button
            variant="primary"
            fullWidth
            loading={state === 'loading'}
            onClick={handleSend}
          >
            Send Reset Link
          </Button>
          <Button variant="ghost" fullWidth onClick={onBack}>
            Back to Login
          </Button>
        </div>
      )}

      {(state === 'sent' || state === 'rateLimited') && (
        <Button variant="ghost" fullWidth onClick={onBack} className="mt-8">
          Back to Login
        </Button>
      )}
    </div>
  )
}
