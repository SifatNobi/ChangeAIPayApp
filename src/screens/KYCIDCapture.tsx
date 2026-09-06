import { useState, useEffect } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import type { IDSelectionData } from './KYCIDSelection'

interface KYCIDCaptureProps {
  idType: IDSelectionData['idType']
  onComplete: (images: { front: true; back?: true }) => void
  onBack: () => void
  onLimitReached?: () => void
}

type CapturePhase = 'aligning' | 'detecting' | 'captured' | 'confirmed'
type Side = 'front' | 'back'

/* ── Quality issue types ──────────────────────────────────────── */
type QualityIssue = 'blurry' | 'glare' | 'partial_edges' | 'wrong_doc' | null

interface QualityConfig {
  text: string
  fix: string
  severity: 'warn' | 'error'
}

const QUALITY_ISSUES: Record<NonNullable<QualityIssue>, QualityConfig> = {
  blurry: {
    text: 'Image too blurry',
    fix: 'Hold your phone completely still and wait for focus',
    severity: 'warn',
  },
  glare: {
    text: 'Glare detected on document',
    fix: 'Tilt the document slightly or move away from the light source',
    severity: 'warn',
  },
  partial_edges: {
    text: 'Document edges not fully visible',
    fix: 'Move back slightly so all four corners are in frame',
    severity: 'warn',
  },
  wrong_doc: {
    text: 'Document type mismatch',
    fix: 'This does not match the selected document type — check your ID',
    severity: 'error',
  },
}

/* ── Quality feedback banner ──────────────────────────────────── */
function QualityBanner({ issue }: { issue: QualityIssue }) {
  if (!issue) return null
  const config = QUALITY_ISSUES[issue]
  const isError = config.severity === 'error'

  return (
    <div
      className="mx-5 mt-3 px-4 py-3 rounded-[--radius-xl] flex items-start gap-3 animate-fade-in"
      style={{
        background: isError ? 'rgba(255,59,48,0.08)' : 'rgba(245,183,0,0.08)',
        border: `1px solid ${isError ? 'rgba(255,59,48,0.3)' : 'rgba(245,183,0,0.3)'}`,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
        {isError ? (
          <>
            <circle cx="8" cy="8" r="6.5" stroke="#FF3B30" strokeWidth="1.3" />
            <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#FF3B30" strokeWidth="1.3" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M8 2L1 14h14L8 2Z" stroke="#F5B700" strokeWidth="1.3" strokeLinejoin="round" />
            <line x1="8" y1="7" x2="8" y2="10" stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="8" cy="12" r="0.7" fill="#F5B700" />
          </>
        )}
      </svg>
      <div className="flex flex-col gap-0.5">
        <p className={`font-body text-xs font-semibold ${isError ? 'text-error' : 'text-warning'}`}>
          {config.text}
        </p>
        <p className="font-body text-xs text-text-muted leading-relaxed">{config.fix}</p>
      </div>
    </div>
  )
}

/* ── Document frame overlay ───────────────────────────────────── */
function DocumentFrame({ phase, issue }: { phase: CapturePhase; issue: QualityIssue }) {
  const isIssue   = issue !== null
  const isCaptured = phase === 'captured' || phase === 'confirmed'

  const borderColor = isCaptured && !isIssue
    ? 'rgba(0,210,106,0.7)'
    : isIssue
      ? issue === 'wrong_doc' ? 'rgba(255,59,48,0.65)' : 'rgba(245,183,0,0.65)'
      : phase === 'detecting'
        ? 'rgba(63,231,255,0.65)'
        : 'rgba(175,197,255,0.35)'

  return (
    <svg viewBox="0 0 320 200" fill="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Darkened mask areas */}
      <rect x="0"   y="0"   width="320" height="28"  fill="rgba(5,11,45,0.72)" />
      <rect x="0"   y="172" width="320" height="28"  fill="rgba(5,11,45,0.72)" />
      <rect x="0"   y="28"  width="20"  height="144" fill="rgba(5,11,45,0.72)" />
      <rect x="300" y="28"  width="20"  height="144" fill="rgba(5,11,45,0.72)" />

      {/* Guide rect */}
      <rect x="20" y="28" width="280" height="144" rx="8"
        stroke={borderColor} strokeWidth="1.5"
        strokeDasharray={phase === 'aligning' && !isIssue ? '6 5' : 'none'}
        fill={isCaptured && !isIssue ? 'rgba(0,210,106,0.04)' : isIssue ? 'rgba(245,183,0,0.03)' : 'none'}
        style={{ transition: 'stroke 350ms ease, fill 350ms ease' }}
      />

      {/* Corner brackets */}
      {([[20,28,1,1],[300,28,-1,1],[20,172,1,-1],[300,172,-1,-1]] as [number,number,number,number][]).map(([x,y,sx,sy], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x+sx*22} y2={y}
            stroke={borderColor} strokeWidth="3" strokeLinecap="round"
            style={{ transition: 'stroke 350ms ease' }} />
          <line x1={x} y1={y} x2={x} y2={y+sy*22}
            stroke={borderColor} strokeWidth="3" strokeLinecap="round"
            style={{ transition: 'stroke 350ms ease' }} />
        </g>
      ))}

      {/* Scan shimmer when detecting */}
      {phase === 'detecting' && !isIssue && (
        <rect x="20" y="28" width="280" height="144" rx="8"
          fill="rgba(63,231,255,0.04)"
          style={{ animation: 'kyc-scan 1.5s ease-in-out infinite' }} />
      )}

      {/* Partial-edges red corners */}
      {issue === 'partial_edges' && (
        <>
          <line x1="300" y1="28" x2="300" y2="48" stroke="rgba(245,183,0,0.6)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
          <line x1="300" y1="28" x2="280" y2="28" stroke="rgba(245,183,0,0.6)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
          <line x1="300" y1="172" x2="300" y2="152" stroke="rgba(245,183,0,0.6)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
          <line x1="300" y1="172" x2="280" y2="172" stroke="rgba(245,183,0,0.6)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
        </>
      )}

      {/* Glare overlay */}
      {issue === 'glare' && (
        <ellipse cx="220" cy="80" rx="40" ry="30"
          fill="rgba(255,255,200,0.12)"
          style={{ filter: 'blur(6px)' }} />
      )}

      {/* Captured success mark */}
      {isCaptured && !isIssue && (
        <>
          <circle cx="160" cy="100" r="22" fill="rgba(0,210,106,0.12)" stroke="rgba(0,210,106,0.4)" strokeWidth="1.5" />
          <path d="M150 100l7 7 13-14" stroke="rgba(0,210,106,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      <style>{`
        @keyframes kyc-scan { 0%,100%{opacity:0} 50%{opacity:1} }
      `}</style>
    </svg>
  )
}

/* ── Simulated quality-check sequence ───────────────────────────
   Sequence: aligning → show random quality issue for 1.5s → resolve → detecting → captured
─────────────────────────────────────────────────────────────── */
const DEMO_ISSUES: QualityIssue[] = ['blurry', 'partial_edges', 'glare', null]

export default function KYCIDCapture({
  idType,
  onComplete,
  onBack,
  onLimitReached,
}: KYCIDCaptureProps) {
  const needsBack = idType === 'drivers_license'

  const [side, setSide]         = useState<Side>('front')
  const [phase, setPhase]       = useState<CapturePhase>('aligning')
  const [issue, setIssue]       = useState<QualityIssue>(null)
  const [frontDone, setFrontDone] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const MAX_ATTEMPTS = 5

  /* Auto edge-detection after 2s of aligning */
  useEffect(() => {
    if (phase !== 'aligning') return
    const t = setTimeout(() => {
      /* Demo: cycle through a quality issue on odd attempts */
      const demoIssue = attemptCount % 2 === 0 ? DEMO_ISSUES[attemptCount % 3] : null
      if (demoIssue) {
        setIssue(demoIssue)
        /* Auto-resolve after 2s */
        const t2 = setTimeout(() => {
          setIssue(null)
          setPhase('detecting')
        }, 2000)
        return () => clearTimeout(t2)
      } else {
        setPhase('detecting')
      }
    }, 2000)
    return () => clearTimeout(t)
  }, [phase, side, attemptCount])

  /* Auto capture after 1s of detecting */
  useEffect(() => {
    if (phase !== 'detecting') return
    const t = setTimeout(() => setPhase('captured'), 900)
    return () => clearTimeout(t)
  }, [phase])

  const handleRetake = () => {
    const next = attemptCount + 1
    if (next >= MAX_ATTEMPTS && onLimitReached) {
      onLimitReached()
      return
    }
    setAttemptCount(next)
    setIssue(null)
    setPhase('aligning')
  }

  const handleConfirm = () => {
    if (issue !== null) return
    setPhase('confirmed')
    if (side === 'front' && needsBack) {
      setTimeout(() => { setSide('back'); setPhase('aligning'); setAttemptCount(0) }, 600)
      setFrontDone(true)
    } else {
      setTimeout(() => onComplete({ front: true, ...(needsBack ? { back: true } : {}) }), 600)
    }
  }

  const instructionMap: Partial<Record<CapturePhase, string>> = {
    aligning:  'Align your ID within the frame',
    detecting: 'Hold still — detecting edges…',
    captured:  'Check the image is sharp and clear',
    confirmed: 'Captured!',
  }

  const remainingAttempts = MAX_ATTEMPTS - attemptCount
  const confirmBlocked = issue !== null || (phase !== 'captured' && phase !== 'confirmed')

  return (
    <div className="flex flex-col bg-[#050B2D]" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader onBack={onBack} title={`Capture ID — ${side === 'front' ? 'Front' : 'Back'}`} step={4} totalSteps={6} />
      </div>

      {/* Attempt counter */}
      <div className="flex items-center justify-between px-5 mt-2">
        {needsBack && (
          <div className="flex items-center gap-2">
            {(['front', 'back'] as Side[]).map(s => (
              <div key={s}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: s === side ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.06)',
                  border: `1px solid ${s === side ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                {s === 'front' && frontDone && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 4-4" stroke="#00D26A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span className="font-body text-xs font-semibold capitalize"
                  style={{ color: s === side ? '#AFC5FF' : 'rgba(175,197,255,0.4)' }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        )}
        {!needsBack && <div />}

        {/* Attempts remaining pill */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: remainingAttempts <= 2 ? 'rgba(255,59,48,0.08)' : 'rgba(175,197,255,0.06)',
            border: `1px solid ${remainingAttempts <= 2 ? 'rgba(255,59,48,0.2)' : 'rgba(175,197,255,0.1)'}`,
          }}
        >
          <span className="font-body text-[10px] font-semibold"
            style={{ color: remainingAttempts <= 2 ? '#FF3B30' : 'rgba(175,197,255,0.55)' }}>
            {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} left
          </span>
        </div>
      </div>

      {/* Camera viewport */}
      <div
        className="mx-5 mt-3 rounded-[--radius-2xl] overflow-hidden relative"
        style={{ height: 220, background: '#0A0A12' }}
      >
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #111825 0%, #06090F 100%)' }} />

        <DocumentFrame phase={phase} issue={issue} />

        {/* Instruction pill */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center px-4 pointer-events-none">
          <div className="px-3 py-2 rounded-full"
            style={{ background: 'rgba(5,11,45,0.82)', border: '1px solid rgba(175,197,255,0.12)' }}>
            <p className="font-body text-xs text-text-2 text-center">{instructionMap[phase]}</p>
          </div>
        </div>
      </div>

      {/* Quality feedback banner */}
      <QualityBanner issue={issue} />

      {/* Tips */}
      {!issue && (
        <div className="px-5 mt-4 flex flex-col gap-3">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">Capture tips</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: '💡', text: 'Even lighting' },
              { icon: '📐', text: 'Hold flat & still' },
              { icon: '🚫', text: 'No glare or blur' },
            ].map(t => (
              <div key={t.text}
                className="rounded-[--radius-xl] bg-surface border border-[color:var(--color-border)] px-3 py-3 flex flex-col items-center gap-1.5 text-center">
                <span className="text-lg leading-none">{t.icon}</span>
                <p className="font-body text-[10px] text-text-muted">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 px-5 mt-auto pt-6 pb-10">
        {(phase === 'captured' || phase === 'confirmed') ? (
          <>
            <Button variant="primary" fullWidth
              onClick={handleConfirm}
              disabled={confirmBlocked || phase === 'confirmed'}
            >
              {needsBack && side === 'front' ? 'Confirm & Capture Back' : 'Confirm & Continue'}
            </Button>
            <Button variant="secondary" fullWidth
              onClick={handleRetake}
              disabled={phase === 'confirmed'}
            >
              Retake
            </Button>
          </>
        ) : (
          <Button variant="secondary" fullWidth
            disabled={!!issue}
            onClick={() => { setIssue(null); setPhase('captured') }}
          >
            {issue ? 'Resolve issue above to capture' : phase === 'aligning' ? 'Capture Manually' : 'Capture Now'}
          </Button>
        )}
      </div>
    </div>
  )
}
