import { useState, useEffect } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'

interface KYCLivenessProps {
  onComplete: () => void
  onBack: () => void
  onLimitReached?: () => void
  maxAttempts?: number
}

type LivenessStep = {
  id: string
  instruction: string
  duration: number
}

const STEPS: LivenessStep[] = [
  { id: 'center',  instruction: 'Look straight at the camera',  duration: 2200 },
  { id: 'blink',   instruction: 'Blink slowly, twice',          duration: 2500 },
  { id: 'left',    instruction: 'Turn your head slightly left',  duration: 2200 },
  { id: 'right',   instruction: 'Turn your head slightly right', duration: 2200 },
  { id: 'smile',   instruction: 'Give a small natural smile',    duration: 1800 },
]

type Phase = 'intro' | 'running' | 'processing' | 'done'

/* ── Real-time feedback types ────────────────────────────────── */
type FeedbackType = 'not_centered' | 'too_dark' | 'too_close' | 'too_far' | null

interface FeedbackConfig {
  text: string
  fix: string
}

const FEEDBACK: Record<NonNullable<FeedbackType>, FeedbackConfig> = {
  not_centered: { text: 'Face not centered',     fix: 'Move your face into the oval guide'         },
  too_dark:     { text: 'Lighting too dark',      fix: 'Find a brighter area or face a light source' },
  too_close:    { text: 'Too close to camera',    fix: 'Hold your phone slightly further away'       },
  too_far:      { text: 'Too far from camera',    fix: 'Move a little closer to the camera'          },
}

/* ── Feedback banner ─────────────────────────────────────────── */
function FeedbackBanner({ feedback }: { feedback: FeedbackType }) {
  if (!feedback) return null
  const config = FEEDBACK[feedback]
  return (
    <div
      className="mx-5 mt-3 px-4 py-3 rounded-[--radius-xl] flex items-start gap-3 animate-fade-in"
      style={{ background: 'rgba(245,183,0,0.08)', border: '1px solid rgba(245,183,0,0.28)' }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
        <path d="M8 2L1 14h14L8 2Z" stroke="#F5B700" strokeWidth="1.3" strokeLinejoin="round" />
        <line x1="8" y1="7" x2="8" y2="10" stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="8" cy="12" r="0.7" fill="#F5B700" />
      </svg>
      <div className="flex flex-col gap-0.5">
        <p className="font-body text-xs font-semibold text-warning">{config.text}</p>
        <p className="font-body text-xs text-text-muted leading-relaxed">{config.fix}</p>
      </div>
    </div>
  )
}

/* ── Oval face guide ─────────────────────────────────────────── */
function FaceOval({
  stepIdx,
  phase,
  feedback,
}: {
  stepIdx: number
  phase: Phase
  feedback: FeedbackType
}) {
  const active = phase === 'running'
  const done   = phase === 'processing' || phase === 'done'
  const hasFeedback = feedback !== null

  const strokeColor = done
    ? 'rgba(0,210,106,0.7)'
    : hasFeedback
      ? 'rgba(245,183,0,0.6)'
      : active
        ? 'rgba(63,231,255,0.65)'
        : 'rgba(175,197,255,0.25)'

  return (
    <svg viewBox="0 0 260 300" fill="none" className="w-full h-full" aria-hidden="true">
      <defs>
        <mask id="liveness-mask2">
          <rect width="260" height="300" fill="white" />
          <ellipse cx="130" cy="148" rx="88" ry="108" fill="black" />
        </mask>
      </defs>

      <rect width="260" height="300" fill="rgba(5,11,45,0.55)" mask="url(#liveness-mask2)" />

      {/* Oval border */}
      <ellipse cx="130" cy="148" rx="88" ry="108"
        stroke={strokeColor} strokeWidth="2"
        fill={hasFeedback ? 'rgba(245,183,0,0.02)' : done ? 'rgba(0,210,106,0.04)' : 'rgba(63,231,255,0.02)'}
        strokeDasharray={phase === 'intro' ? '8 6' : 'none'}
        style={{ transition: 'stroke 400ms ease, fill 400ms ease' }} />

      {/* Step progress dots on oval */}
      {active && STEPS.map((_, i) => {
        const angle = (i / STEPS.length) * 2 * Math.PI - Math.PI / 2
        const cx = 130 + 94 * Math.cos(angle)
        const cy = 148 + 116 * Math.sin(angle)
        return (
          <circle key={i} cx={cx} cy={cy} r={3}
            fill={i < stepIdx ? 'rgba(63,231,255,0.7)' : 'rgba(175,197,255,0.15)'}
            style={{ transition: 'fill 300ms ease' }} />
        )
      })}

      {/* Done overlay */}
      {done && (
        <>
          <circle cx="130" cy="148" r="28" fill="rgba(0,210,106,0.12)"
            stroke="rgba(0,210,106,0.35)" strokeWidth="1.5" />
          <path d="M118 148l8 9 16-18"
            stroke="rgba(0,210,106,0.9)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {/* Head-turn directional arrows */}
      {active && !hasFeedback && STEPS[stepIdx]?.id === 'left' && (
        <path d="M116 148l-18 0m0 0l6-6m-6 6l6 6"
          stroke="rgba(63,231,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {active && !hasFeedback && STEPS[stepIdx]?.id === 'right' && (
        <path d="M144 148l18 0m0 0l-6-6m6 6l-6 6"
          stroke="rgba(63,231,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {active && !hasFeedback && STEPS[stepIdx]?.id === 'blink' && (
        <>
          <line x1="116" y1="132" x2="124" y2="132" stroke="rgba(63,231,255,0.5)" strokeWidth="2" strokeLinecap="round" />
          <line x1="136" y1="132" x2="144" y2="132" stroke="rgba(63,231,255,0.5)" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Feedback: not_centered — arrow pointing toward oval */}
      {hasFeedback && feedback === 'not_centered' && (
        <>
          <path d="M50 148 l18 0 m0 0 l-6-6 m6 6 l-6 6"
            stroke="rgba(245,183,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M210 148 l-18 0 m0 0 l6-6 m-6 6 l6 6"
            stroke="rgba(245,183,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {/* Feedback: too_dark — dimmed overlay hint */}
      {hasFeedback && feedback === 'too_dark' && (
        <rect width="260" height="300" fill="rgba(0,0,0,0.15)" />
      )}

      {/* Face silhouette hint in intro */}
      {phase === 'intro' && (
        <>
          <circle cx="130" cy="120" r="18" fill="rgba(175,197,255,0.05)" />
          <path d="M100 188c0-17 13-30 30-30s30 13 30 30" fill="rgba(175,197,255,0.04)" />
        </>
      )}
    </svg>
  )
}

/* ── Demo feedback injection schedule ───────────────────────────
   Injects brief real-time feedback at specific step transitions
   to demonstrate the system without blocking the flow.
─────────────────────────────────────────────────────────────── */
const DEMO_FEEDBACK: Record<number, FeedbackType> = {
  0: 'not_centered',  // briefly shown at step 0 start
  2: 'too_dark',      // briefly at step 2
}

export default function KYCLiveness({
  onComplete,
  onBack,
  onLimitReached,
  maxAttempts = 3,
}: KYCLivenessProps) {
  const [phase,    setPhase]    = useState<Phase>('intro')
  const [stepIdx,  setStepIdx]  = useState(0)
  const [feedback, setFeedback] = useState<FeedbackType>(null)
  const [attempt,  setAttempt]  = useState(1)

  /* Auto-advance through steps */
  useEffect(() => {
    if (phase !== 'running') return
    if (stepIdx >= STEPS.length) {
      setFeedback(null)
      setPhase('processing')
      setTimeout(() => setPhase('done'), 1400)
      setTimeout(onComplete, 2400)
      return
    }

    /* Inject demo feedback briefly at certain steps */
    const demoFb = DEMO_FEEDBACK[stepIdx]
    if (demoFb && attempt === 1) {
      setFeedback(demoFb)
      const clearFb = setTimeout(() => setFeedback(null), 1400)
      const advance = setTimeout(() => {
        setFeedback(null)
        setStepIdx(i => i + 1)
      }, STEPS[stepIdx].duration)
      return () => { clearTimeout(clearFb); clearTimeout(advance) }
    }

    const t = setTimeout(() => setStepIdx(i => i + 1), STEPS[stepIdx].duration)
    return () => clearTimeout(t)
  }, [phase, stepIdx, attempt, onComplete])

  const handleStart = () => {
    setFeedback(null)
    setPhase('running')
    setStepIdx(0)
  }

  const handleRetry = () => {
    if (attempt >= maxAttempts) {
      onLimitReached?.()
      return
    }
    setAttempt(a => a + 1)
    setPhase('intro')
    setStepIdx(0)
    setFeedback(null)
  }

  const instruction =
    phase === 'intro'        ? 'Position your face inside the oval'
    : phase === 'running'    ? (STEPS[stepIdx]?.instruction ?? '…')
    : phase === 'processing' ? 'Processing your scan…'
    : 'Scan complete'

  const remainingAttempts = maxAttempts - attempt

  return (
    <div className="flex flex-col bg-[#050B2D]" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader onBack={onBack} title="Liveness Check" step={5} totalSteps={6} />
      </div>

      {/* Attempt counter + reassurance row */}
      <div className="flex items-center justify-between px-5 mt-2">
        <div
          className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
          style={{
            background: remainingAttempts <= 1 ? 'rgba(255,59,48,0.08)' : 'rgba(0,102,255,0.07)',
            border: `1px solid ${remainingAttempts <= 1 ? 'rgba(255,59,48,0.2)' : 'rgba(0,102,255,0.15)'}`,
          }}
        >
          <span className="font-body text-[10px] font-semibold"
            style={{ color: remainingAttempts <= 1 ? '#FF3B30' : '#AFC5FF' }}>
            Attempt {attempt} of {maxAttempts}
          </span>
        </div>
        <div
          className="px-3 py-1.5 rounded-full flex items-center gap-1.5"
          style={{ background: 'rgba(0,102,255,0.07)', border: '1px solid rgba(0,102,255,0.15)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1L1.5 2.8v4c0 2.1 1.6 3.2 3.5 3.5 1.9-.3 3.5-1.4 3.5-3.5v-4L5 1Z"
              stroke="#AFC5FF" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          <span className="font-body text-[10px] font-semibold text-text-muted">Encrypted</span>
        </div>
      </div>

      {/* Camera viewport */}
      <div
        className="mx-5 mt-3 rounded-[--radius-2xl] overflow-hidden relative"
        style={{ height: 290, background: '#06090F' }}
      >
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 65% at 50% 48%, #131d28 0%, #050B18 100%)' }} />
        <div className="absolute inset-0">
          <FaceOval stepIdx={stepIdx} phase={phase} feedback={feedback} />
        </div>

        {/* Instruction pill */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 pointer-events-none">
          <div className="px-4 py-2 rounded-full"
            style={{ background: 'rgba(5,11,45,0.85)', border: '1px solid rgba(175,197,255,0.14)' }}>
            <p className="font-body text-sm font-medium text-center"
              style={{
                color: phase === 'done' ? '#00D26A'
                  : feedback ? '#F5B700'
                  : 'white',
                transition: 'color 300ms',
              }}>
              {feedback ? FEEDBACK[feedback].text : instruction}
            </p>
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      <FeedbackBanner feedback={feedback} />

      {/* Step progress strip */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex-1 h-1 rounded-full transition-all duration-[400ms]"
              style={{
                background:
                  phase === 'processing' || phase === 'done' || i < stepIdx
                    ? 'rgba(63,231,255,0.65)'
                    : i === stepIdx && phase === 'running'
                      ? 'rgba(63,231,255,0.28)'
                      : 'rgba(175,197,255,0.1)',
              }} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="font-body text-xs text-text-muted">
            {phase === 'running' ? `Step ${Math.min(stepIdx + 1, STEPS.length)} of ${STEPS.length}` : ''}
          </p>
          {phase === 'processing' && <p className="font-body text-xs text-accent animate-fade-in">Analysing…</p>}
          {phase === 'done'       && <p className="font-body text-xs text-success animate-fade-in">Verified ✓</p>}
        </div>
      </div>

      {/* Tips — intro only */}
      {phase === 'intro' && (
        <div className="px-5 mt-4 flex flex-col gap-2.5 animate-fade-in">
          {[
            { label: 'Lighting', tip: 'Face a light source — avoid bright windows behind you.' },
            { label: 'Distance', tip: 'Keep your face 30–50 cm from the screen.' },
            { label: 'Coverage', tip: 'Remove glasses, hats, or anything covering your face.' },
          ].map(({ label, tip }) => (
            <div key={label} className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                  <circle cx="3.5" cy="3.5" r="2" fill="#AFC5FF" fillOpacity="0.5" />
                </svg>
              </div>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                <span className="text-text-2 font-medium">{label}:</span> {tip}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CTA area */}
      <div className="px-5 mt-auto pb-10 pt-6">
        {phase === 'intro' && (
          <Button variant="primary" fullWidth onClick={handleStart}>
            {attempt > 1 ? `Try Again (Attempt ${attempt} of ${maxAttempts})` : 'Begin Liveness Check'}
          </Button>
        )}
        {(phase === 'running' || phase === 'processing') && (
          <div
            className="h-12 rounded-[--radius-xl] flex items-center justify-center"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
          >
            <p className="font-body text-sm text-text-muted">Follow the on-screen prompts…</p>
          </div>
        )}
        {phase === 'done' && (
          <div className="flex flex-col gap-3">
            <div
              className="h-12 rounded-[--radius-xl] flex items-center justify-center gap-2"
              style={{ background: 'rgba(0,210,106,0.08)', border: '1px solid rgba(0,210,106,0.2)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l4 4 6-6" stroke="#00D26A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-sm font-semibold text-success">Liveness confirmed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
