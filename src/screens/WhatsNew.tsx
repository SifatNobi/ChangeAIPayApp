import { useState, useRef, type PointerEvent } from 'react'
import Button from '@/components/Button'

interface WhatsNewProps {
  onContinue: () => void
  onSkip: () => void
}

/* ── Per-slide illustrations ─────────────────────────────────── */
function AIIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Brain / neural net motif */}
      <circle cx="100" cy="70" r="38" stroke="rgba(0,102,255,0.25)" strokeWidth="1.5" />
      <circle cx="100" cy="70" r="22" stroke="rgba(63,231,255,0.2)" strokeWidth="1" />
      {/* Nodes */}
      {[[65,50],[100,42],[135,50],[148,70],[135,90],[100,98],[65,90],[52,70]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="rgba(0,102,255,0.55)" />
      ))}
      {/* Connectors */}
      {[[65,50,100,42],[100,42,135,50],[135,50,148,70],[148,70,135,90],
        [135,90,100,98],[100,98,65,90],[65,90,52,70],[52,70,65,50]].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="rgba(175,197,255,0.18)" strokeWidth="1" />
      ))}
      {/* Center pulse dot */}
      <circle cx="100" cy="70" r="6" fill="rgba(63,231,255,0.5)" />
      <circle cx="100" cy="70" r="10" fill="rgba(63,231,255,0.12)" />
      {/* Fina / Aina label glyphs */}
      <rect x="62" y="110" width="34" height="16" rx="8"
        fill="rgba(0,102,255,0.15)" stroke="rgba(0,102,255,0.3)" strokeWidth="1" />
      <rect x="104" y="110" width="34" height="16" rx="8"
        fill="rgba(63,231,255,0.1)" stroke="rgba(63,231,255,0.25)" strokeWidth="1" />
      <rect x="71" y="115" width="16" height="6" rx="3" fill="rgba(175,197,255,0.4)" />
      <rect x="113" y="115" width="16" height="6" rx="3" fill="rgba(63,231,255,0.45)" />
    </svg>
  )
}

function ZeroFeeIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Globe wireframe */}
      <ellipse cx="100" cy="68" rx="44" ry="44"
        stroke="rgba(175,197,255,0.14)" strokeWidth="1" />
      <ellipse cx="100" cy="68" rx="24" ry="44"
        stroke="rgba(175,197,255,0.08)" strokeWidth="1" />
      <line x1="56" y1="68" x2="144" y2="68"
        stroke="rgba(175,197,255,0.08)" strokeWidth="1" />
      <line x1="62" y1="48" x2="138" y2="48"
        stroke="rgba(175,197,255,0.06)" strokeWidth="1" />
      <line x1="62" y1="88" x2="138" y2="88"
        stroke="rgba(175,197,255,0.06)" strokeWidth="1" />
      {/* $0 badge */}
      <rect x="79" y="54" width="42" height="28" rx="8"
        fill="rgba(0,20,60,0.9)" stroke="rgba(0,102,255,0.45)" strokeWidth="1.5" />
      <text x="100" y="72" textAnchor="middle"
        fontFamily="'Hanken Grotesk', sans-serif" fontSize="14" fontWeight="800"
        fill="white">
        $0
      </text>
      {/* Route arcs */}
      <path d="M34 112 Q80 40 100 68 Q120 96 166 28"
        stroke="rgba(0,102,255,0.3)" strokeWidth="1.5"
        strokeLinecap="round" strokeDasharray="4 3" />
      {/* Dot nodes on arc */}
      <circle cx="34" cy="112" r="3" fill="rgba(0,102,255,0.55)" />
      <circle cx="166" cy="28" r="3" fill="rgba(63,231,255,0.55)" />
    </svg>
  )
}

function SecurityIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Shield */}
      <path d="M100 20L54 40v42c0 28 20 44 46 48 26-4 46-20 46-48V40L100 20Z"
        stroke="rgba(0,102,255,0.35)" strokeWidth="1.5" strokeLinejoin="round"
        fill="rgba(0,102,255,0.06)" />
      {/* Inner shield */}
      <path d="M100 32L68 46v32c0 20 14 32 32 35 18-3 32-15 32-35V46L100 32Z"
        stroke="rgba(63,231,255,0.2)" strokeWidth="1" strokeLinejoin="round"
        fill="rgba(0,102,255,0.04)" />
      {/* Checkmark */}
      <path d="M84 78l12 12 22-22"
        stroke="rgba(0,210,106,0.85)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* Orbit dots */}
      {[[-44,0],[44,0],[0,-44],[0,44]].map(([dx,dy], i) => (
        <circle key={i} cx={100+dx} cy={80+dy} r="3"
          fill="rgba(175,197,255,0.25)" />
      ))}
      <circle cx="100" cy="80" r="48"
        stroke="rgba(175,197,255,0.07)" strokeWidth="1"
        strokeDasharray="3 5" />
    </svg>
  )
}

function InstantIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Lightning bolt */}
      <path d="M108 18L72 76h36L100 122l52-70H116L108 18Z"
        fill="rgba(0,102,255,0.12)" stroke="rgba(63,231,255,0.45)"
        strokeWidth="1.5" strokeLinejoin="round" />
      {/* Speed lines */}
      <line x1="30" y1="55" x2="58" y2="55"
        stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="68" x2="60" y2="68"
        stroke="rgba(175,197,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="81" x2="58" y2="81"
        stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="142" y1="55" x2="170" y2="55"
        stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="140" y1="68" x2="176" y2="68"
        stroke="rgba(175,197,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="142" y1="81" x2="170" y2="81"
        stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Slide data ──────────────────────────────────────────────── */
interface Slide {
  key: string
  title: string
  body: string
  illustration: React.ReactNode
  accent: string
}

const SLIDES: Slide[] = [
  {
    key: 'ai',
    title: 'Smarter AI Coaches',
    body: "Fina and Aina now learn from your habits to give you advice that's always one step ahead.",
    illustration: <AIIllustration />,
    accent: '#0066FF',
  },
  {
    key: 'fees',
    title: 'Zero Fees, Everywhere',
    body: 'Send money to 180+ countries with absolutely no transaction fees — forever.',
    illustration: <ZeroFeeIllustration />,
    accent: '#3FE7FF',
  },
  {
    key: 'security',
    title: 'Always Protected',
    body: 'Behavioral biometrics and AI fraud detection run silently in the background, 24/7.',
    illustration: <SecurityIllustration />,
    accent: '#00D26A',
  },
  {
    key: 'instant',
    title: 'Instant Everything',
    body: 'Payments, top-ups, and transfers now settle in under two seconds, day or night.',
    illustration: <InstantIllustration />,
    accent: '#AFC5FF',
  },
]

/* ── Screen ──────────────────────────────────────────────────── */
export default function WhatsNew({ onContinue, onSkip }: WhatsNewProps) {
  const [idx, setIdx] = useState(0)
  const dragStartX = useRef<number | null>(null)
  const total = SLIDES.length
  const slide = SLIDES[idx]
  const isLast = idx === total - 1

  /* ── Pointer swipe ── */
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const dx = e.clientX - dragStartX.current
    dragStartX.current = null
    if (dx < -40 && idx < total - 1) setIdx(i => i + 1)
    if (dx >  40 && idx > 0)         setIdx(i => i - 1)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Skip */}
      <div className="flex justify-end px-5 pt-4 pb-2">
        <button
          onClick={onSkip}
          className="font-body text-sm text-text-muted focus-ring rounded px-2 py-1 min-h-[44px] min-w-[44px] flex items-center"
        >
          Skip
        </button>
      </div>

      {/* Swipe area */}
      <div
        className="flex-1 flex flex-col px-6"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        style={{ touchAction: 'pan-y', cursor: 'grab' }}
      >
        {/* Illustration */}
        <div
          className="flex items-center justify-center"
          style={{ height: 180 }}
        >
          <div
            key={slide.key}
            className="w-full animate-fade-in"
            style={{ height: 160, animationDuration: '220ms' }}
          >
            {slide.illustration}
          </div>
        </div>

        {/* Text */}
        <div
          key={slide.key + '-text'}
          className="flex flex-col gap-3 text-center px-4 animate-slide-up"
          style={{ animationDuration: '250ms' }}
        >
          <div
            className="w-10 h-1 rounded-full mx-auto"
            style={{ background: slide.accent }}
          />
          <h2 className="font-display text-[26px] font-extrabold text-text tracking-tight">
            {slide.title}
          </h2>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            {slide.body}
          </p>
        </div>

        {/* Page dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setIdx(i)}
              className="transition-all duration-[250ms]"
              aria-label={`Slide ${i + 1}`}
              style={{
                width:  i === idx ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === idx ? slide.accent : 'rgba(175,197,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-10 pt-6 flex flex-col gap-3">
        <Button variant="primary" fullWidth onClick={isLast ? onContinue : () => setIdx(i => i + 1)}>
          {isLast ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  )
}
