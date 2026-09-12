import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'

interface SetPINProps {
  onComplete: () => void
  onBack: () => void
  onSkip: () => void
}

type Phase = 'create' | 'confirm'

/* ── Numeric keypad ───────────────────────────────────────────── */
const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
]

function Keypad({ onKey }: { onKey: (k: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mx-auto">
      {KEYS.flat().map((k, i) => (
        k === '' ? (
          <div key={i} />
        ) : (
          <button
            key={i}
            onClick={() => onKey(k)}
            className={`h-16 rounded-[--radius-2xl] font-display text-xl font-bold text-text
              flex items-center justify-center transition-all duration-[200ms]
              focus-ring active:scale-95
              ${k === '⌫'
                ? 'bg-surface border border-[color:var(--color-border)] hover:bg-surface-hi text-text-2'
                : 'bg-surface border border-[color:var(--color-border)] hover:bg-surface-hi hover:border-primary/30'
              }`}
            aria-label={k === '⌫' ? 'Delete' : k}
          >
            {k === '⌫' ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M14 6H8L4 10l4 4h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M11.5 8.5l-3 3M8.5 8.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : k}
          </button>
        )
      ))}
    </div>
  )
}

/* ── PIN dot display ──────────────────────────────────────────── */
function PINDots({ filled, error }: { filled: number; error: boolean }) {
  return (
    <div className={`flex gap-4 justify-center ${error ? 'animate-error-shake' : ''}`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full border-2 transition-all duration-[200ms]
            ${i < filled
              ? error
                ? 'bg-error border-error scale-110'
                : 'bg-accent border-accent scale-110'
              : 'bg-transparent border-[color:var(--color-border)]'
            }`}
        />
      ))}
    </div>
  )
}

export default function SetPIN({ onComplete, onBack, onSkip }: SetPINProps) {
  const [phase, setPhase] = useState<Phase>('create')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const currentValue = phase === 'create' ? pin : confirmPin
  const setter = phase === 'create' ? setPin : setConfirmPin

  const triggerError = (msg: string) => {
    setError(msg)
    setShake(true)
    setTimeout(() => {
      setShake(false)
      setter('')
      if (msg.includes("match")) {
        setPin('')
        setPhase('create')
      }
    }, 600)
  }

  const handleKey = (k: string) => {
    setError('')
    if (k === '⌫') {
      setter(v => v.slice(0, -1))
      return
    }
    if (currentValue.length >= 6) return
    const next = currentValue + k

    setter(next)

    if (next.length === 6) {
      if (phase === 'create') {
        // Check for weak PINs
        if (/^(.)\1{5}$/.test(next) || next === '123456' || next === '000000') {
          triggerError('This PIN is too easy to guess. Choose a less predictable combination.')
          return
        }
        setTimeout(() => {
          setPhase('confirm')
          setConfirmPin('')
        }, 200)
      } else {
        // Confirm phase
        if (next !== pin) {
          triggerError("PINs don't match. Please start over.")
        } else {
          // Success — wait briefly then proceed
          setTimeout(() => onComplete(), 400)
        }
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg px-5 pt-4 pb-10">
      <AuthHeader onBack={onBack} step={3} totalSteps={5} />

      <div className="flex flex-col flex-1 mt-8">
        <div className="text-center mb-10">
          <h1 className="font-display text-2xl font-extrabold text-text mb-2">
            {phase === 'create' ? 'Set Your PIN' : 'Confirm Your PIN'}
          </h1>
          <p className="font-body text-sm text-text-2">
            {phase === 'create'
              ? 'Choose a 6-digit PIN to protect your account'
              : 'Enter the same PIN again to confirm'}
          </p>
        </div>

        {/* Dots */}
        <div className="mb-8">
          <PINDots filled={currentValue.length} error={shake} />
          <div className="min-h-[24px] mt-4 text-center">
            {error && (
              <p className="font-body text-sm text-error animate-fade-in">{error}</p>
            )}
          </div>
        </div>

        {/* Keypad */}
        <Keypad onKey={handleKey} />

        {/* Face ID hint */}
        <p className="font-body text-xs text-text-muted text-center mt-6">
          You can also set up Face ID or fingerprint after this step
        </p>
      </div>

      <Button variant="text" onClick={onSkip} className="mx-auto">
        Skip PIN setup
      </Button>
    </div>
  )
}
