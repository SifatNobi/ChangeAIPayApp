import { useState } from 'react'
import Button from '@/components/Button'
import { Card } from '@/components/Card'

interface WelcomeProps {
  onGoogle?: () => void
  onApple?: () => void
  onEmail?: () => void
  onLogin?: () => void
}

/* ── Hero illustration — global payment flow, restrained ────── */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 340 200"
      fill="none"
      className="w-full max-w-sm mx-auto"
      aria-hidden="true"
    >
      {/* Globe outline — low-opacity wireframe, not a full render */}
      <ellipse cx="170" cy="100" rx="72" ry="72" stroke="rgba(175,197,255,0.12)" strokeWidth="1" />
      <ellipse cx="170" cy="100" rx="40" ry="72" stroke="rgba(175,197,255,0.08)" strokeWidth="1" />
      <line x1="98" y1="100" x2="242" y2="100" stroke="rgba(175,197,255,0.08)" strokeWidth="1" />
      <line x1="108" y1="72" x2="232" y2="72" stroke="rgba(175,197,255,0.06)" strokeWidth="1" />
      <line x1="108" y1="128" x2="232" y2="128" stroke="rgba(175,197,255,0.06)" strokeWidth="1" />

      {/* Payment flow lines — animated sweep */}
      <path
        d="M52 145 Q120 60 170 100 Q220 140 288 55"
        stroke="rgba(0,102,255,0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="4 3"
      />
      <path
        d="M44 78 Q100 130 170 100 Q240 70 296 120"
        stroke="rgba(63,231,255,0.25)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="3 4"
      />

      {/* Node dots — cities/endpoints */}
      {[
        { cx: 52, cy: 145 }, { cx: 288, cy: 55 },
        { cx: 44, cy: 78 }, { cx: 296, cy: 120 },
        { cx: 170, cy: 100 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r={i === 4 ? 6 : 4} fill={i === 4 ? '#0066FF' : 'rgba(63,231,255,0.5)'} />
          {i === 4 && (
            <circle cx={p.cx} cy={p.cy} r="10" stroke="rgba(63,231,255,0.2)" strokeWidth="1" fill="none" />
          )}
        </g>
      ))}

      {/* Zero fee badge — the dominant element, large, off-centre right */}
      <rect x="226" y="66" width="88" height="50" rx="14" fill="rgba(0,102,255,0.12)" stroke="rgba(0,102,255,0.25)" strokeWidth="1" />
      <text x="270" y="87" textAnchor="middle" fill="url(#hgradient)" fontSize="22" fontFamily="Hanken Grotesk, sans-serif" fontWeight="800">$0</text>
      <text x="270" y="103" textAnchor="middle" fill="rgba(175,197,255,0.7)" fontSize="9" fontFamily="Inter, sans-serif">Transfer fee</text>

      {/* Small currency symbols floating */}
      <text x="30" y="56" fill="rgba(175,197,255,0.2)" fontSize="11" fontFamily="Inter, sans-serif">€</text>
      <text x="308" y="150" fill="rgba(175,197,255,0.2)" fontSize="11" fontFamily="Inter, sans-serif">£</text>
      <text x="18" y="118" fill="rgba(175,197,255,0.15)" fontSize="9" fontFamily="Inter, sans-serif">¥</text>
      <text x="318" y="86" fill="rgba(175,197,255,0.15)" fontSize="9" fontFamily="Inter, sans-serif">₹</text>

      <defs>
        <linearGradient id="hgradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#3FE7FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Star rating ─────────────────────────────────────────────── */
function StarRating({ rating = 4.9, count = '50k+' }: { rating?: number; count?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.6l-3.2 1.7.6-3.6L2 5.3l3.6-.5L7 1.5Z"
              fill={i < Math.floor(rating) ? '#F5B700' : 'rgba(245,183,0,0.25)'}
            />
          </svg>
        ))}
      </div>
      <p className="font-mono text-xs text-text-2">
        {rating} · {count} reviews
      </p>
    </div>
  )
}

/* ── Product of month badge ──────────────────────────────────── */
function ProductBadge() {
  return (
    <div className="flex items-center gap-2 px-3 h-7 rounded-full bg-warning/10 border border-warning/25">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1l1.5 3h3l-2.5 2 1 3L6 7.5 3 9l1-3L1.5 4h3L6 1Z" fill="#F5B700" />
      </svg>
      <span className="font-body text-xs font-semibold text-warning">Product of the Month</span>
    </div>
  )
}

/* ── Fee comparison module ───────────────────────────────────── */
const AMOUNTS = [100, 500, 1_000, 2_500, 5_000, 10_000]
const TRADITIONAL_RATE = 0.0349  // ~3.49% avg (banks + remittance services)

function FeeComparison() {
  const [selectedIdx, setSelectedIdx] = useState(2) // $1,000 default

  const amount = AMOUNTS[selectedIdx]
  const traditionalFee = Math.round(amount * TRADITIONAL_RATE * 100) / 100
  const savings = traditionalFee
  const received = amount - traditionalFee

  const fmt = (n: number) =>
    n >= 1000
      ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
      : `$${n}`

  const fmtFull = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
      {/* Amount selector */}
      <div className="p-5 pb-0">
        <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-3">
          Select transfer amount
        </p>
        <div className="grid grid-cols-3 gap-2">
          {AMOUNTS.map((amt, i) => (
            <button
              key={amt}
              onClick={() => setSelectedIdx(i)}
              className={`h-10 rounded-[--radius-lg] font-display text-sm font-bold transition-all duration-[250ms] focus-ring
                ${selectedIdx === i
                  ? 'text-white shadow-[var(--shadow-primary)]'
                  : 'bg-surface-hi text-text-2 hover:text-text hover:bg-[rgba(0,102,255,0.1)]'
                }`}
              style={selectedIdx === i ? { background: 'var(--gradient-primary)' } : undefined}
              aria-pressed={selectedIdx === i}
            >
              {fmt(amt)}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison rows */}
      <div className="p-5 flex flex-col gap-0 mt-4">
        {/* You send */}
        <div className="flex items-center justify-between py-3 border-b border-[color:var(--color-border)]">
          <p className="font-body text-sm text-text-2">You send</p>
          <p className="font-display text-lg font-extrabold text-text animate-counter" key={amount}>
            {fmtFull(amount)}
          </p>
        </div>

        {/* Traditional fees */}
        <div className="flex items-start justify-between py-3 border-b border-[color:var(--color-border)]">
          <div>
            <p className="font-body text-sm text-text-2">Traditional provider fees</p>
            <p className="font-body text-xs text-text-muted">~3.49% average</p>
          </div>
          <div className="text-right">
            <p
              className="font-display text-lg font-extrabold text-error animate-counter"
              key={`fee-${amount}`}
            >
              −{fmtFull(traditionalFee)}
            </p>
            <p className="font-body text-xs text-text-muted">lost to fees</p>
          </div>
        </div>

        {/* ChangeAIPay fee */}
        <div className="flex items-start justify-between py-3 border-b border-[color:var(--color-border)]">
          <div>
            <p className="font-body text-sm text-text-2">ChangeAIPay fee</p>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-extrabold text-success">
              $0.00
            </p>
            <p className="font-body text-xs text-success">always free</p>
          </div>
        </div>

        {/* Savings highlight */}
        <div
          className="flex items-center justify-between mt-4 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(0,210,106,0.06)', border: '1px solid rgba(0,210,106,0.18)' }}
        >
          <p className="font-body text-sm font-semibold text-text">You keep</p>
          <div className="text-right">
            <p
              className="font-display text-xl font-extrabold text-success animate-counter"
              key={`save-${amount}`}
            >
              +{fmtFull(savings)}
            </p>
            <p className="font-body text-xs text-success">vs. traditional</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-5 pb-5">
        <p className="font-body text-[10px] text-text-muted leading-relaxed">
          Estimated comparison based on the selected transfer amount. Actual fees and savings vary
          depending on provider, country, payment method and transaction type.
        </p>
      </div>
    </div>
  )
}

/* ── Value cards ─────────────────────────────────────────────── */
const valueProps = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#3FE7FF" strokeWidth="1.5" />
        <path d="M11 6v10M7 8.5h6.5a2 2 0 0 1 0 4H8.5a2 2 0 0 0 0 4H15" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="6" x2="14" y2="6" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Zero unnecessary fees',
    body: 'Send money anywhere in the world with no hidden transaction fees. Ever.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 16l3-3 3 3 4-5 4 4" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="8" r="3" stroke="#3FE7FF" strokeWidth="1.5" />
        <path d="M2 20h18" stroke="rgba(175,197,255,0.3)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: 'AI-powered intelligence',
    body: 'Fina and Aina analyse your finances in real time, so you always know what to do next.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="8" height="12" rx="3" stroke="#3FE7FF" strokeWidth="1.5" />
        <rect x="12" y="5" width="8" height="12" rx="3" stroke="#3FE7FF" strokeWidth="1.5" />
        <path d="M10 11h2" stroke="rgba(175,197,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'One app for everything',
    body: 'Personal accounts, business accounts, payments, and AI insights — all in one place.',
  },
]

/* ── Google icon ─────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.638-.057-1.252-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18L12.048 13.56c-.806.54-1.836.86-3.048.86-2.344 0-4.328-1.584-5.036-3.712H.957v2.332C2.438 15.983 5.482 18 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  )
}

/* ── Apple icon ──────────────────────────────────────────────── */
function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path d="M12.75 9.563c-.012-1.918 1.563-2.85 1.637-2.9-1.8-1.613-3.6-.9-4.5-.9-1.8 0-2.7.9-3.6.9-.9 0-2.1-1.013-3.375-.9C1.35 5.963 0 7.563 0 9.563c0 3.6 3.15 7.65 4.5 7.65.9 0 1.8-.9 2.7-.9.9 0 1.8.9 2.7.9 1.35 0 4.5-3.825 4.5-7.65h-1.65Z" fill="currentColor"/>
      <path d="M10.65 0c.225 1.35-.675 2.7-1.575 3.375-.9.675-2.025.675-2.25-.675.225-1.35 1.35-2.7 2.25-3.15.675-.45 1.575-.45 1.575.45Z" fill="currentColor"/>
    </svg>
  )
}

export default function Welcome({ onGoogle, onApple, onEmail, onLogin }: WelcomeProps) {
  return (
    <div className="flex flex-col bg-bg min-h-screen">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-10 pb-6">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="mb-8">
          {/* Social proof row — sits above the dominant headline */}
          <div className="flex items-center justify-between mb-6">
            <StarRating />
            <ProductBadge />
          </div>

          {/* Dominant headline — asymmetric, large focal element */}
          <div className="relative">
            {/* The focal element: "$0 fees" dominates */}
            <div className="mb-2">
              <h1 className="font-display leading-none font-extrabold text-text">
                <span className="text-[64px] block text-gradient-primary leading-none">$0</span>
                <span className="text-3xl block mt-1 text-text">Transfer Fees.</span>
                <span className="text-3xl block text-text-2">Worldwide.</span>
              </h1>
            </div>
            <p className="font-body text-sm text-text-2 mt-4 max-w-[260px] leading-relaxed">
              AI-powered payments, zero unnecessary costs. Send money anywhere on the planet — without paying for the privilege.
            </p>
          </div>

          {/* Illustration — supporting, not competing with the headline */}
          <div className="mt-6 -mx-2">
            <HeroIllustration />
          </div>
        </div>

        {/* ── Fee comparison module ─────────────────────────── */}
        <div className="mb-8">
          <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-3">
            See what you save
          </p>
          <FeeComparison />
        </div>

        {/* ── Value props ────────────────────────────────────── */}
        <div className="flex flex-col gap-3 mb-10">
          {valueProps.map((v, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-4"
            >
              <div className="w-10 h-10 rounded-[--radius-lg] bg-surface-hi flex items-center justify-center shrink-0 mt-0.5">
                {v.icon}
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-text">{v.title}</p>
                <p className="font-body text-xs text-text-2 mt-0.5 leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Auth actions — sticky at bottom ──────────────────── */}
      <div
        className="px-5 pb-[max(env(safe-area-inset-bottom,0px),24px)] pt-4 border-t border-[color:var(--color-border)]"
        style={{ background: 'rgba(5,11,45,0.97)', backdropFilter: 'blur(12px)' }}
      >
        <div className="flex flex-col gap-3">
          {/* Google */}
          <button
            onClick={onGoogle}
            className="w-full h-13 rounded-[--radius-lg] bg-white flex items-center justify-center gap-3 font-body text-sm font-semibold text-[#1a1a1a] hover:bg-gray-50 active:scale-[0.98] transition-all duration-[250ms] focus-ring"
            aria-label="Continue with Google"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Apple */}
          <button
            onClick={onApple}
            className="w-full h-13 rounded-[--radius-lg] bg-[#1a1a1a] border border-white/15 flex items-center justify-center gap-3 font-body text-sm font-semibold text-white hover:bg-[#242424] active:scale-[0.98] transition-all duration-[250ms] focus-ring"
            aria-label="Continue with Apple"
          >
            <AppleIcon />
            Continue with Apple
          </button>

          {/* Email */}
          <Button variant="ghost" fullWidth onClick={onEmail}>
            Sign up with Email
          </Button>

          {/* Login link */}
          <p className="font-body text-sm text-center text-text-muted">
            Already have an account?{' '}
            <button
              onClick={onLogin}
              className="text-accent font-semibold hover:underline underline-offset-2 focus-ring rounded"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
