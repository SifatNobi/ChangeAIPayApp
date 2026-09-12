import { useState, useEffect, useRef } from 'react'
import { Header, BottomNav } from '@/components/Nav'
import { WalletCard, TransactionRow } from '@/components/Card'
import Pulse from '@/components/Pulse'

interface RefreshStateProps {
  accountType?: 'personal' | 'business'
  userName?: string
  onNavigate: (tab: string) => void
  onBack?: () => void
  onNotifications?: () => void
}

type Phase = 'rest' | 'pulling' | 'triggered' | 'refreshing' | 'done'

const MOCK_TX = [
  { icon: <span className="text-lg">🥗</span>, merchant: 'Pret A Manger', category: 'Food', amount: '$8.50', date: 'Today', status: 'completed' as const, positive: false },
  { icon: <span className="text-lg">💰</span>, merchant: 'Incoming Transfer', category: 'Income', amount: '$500.00', date: 'Today', status: 'completed' as const, positive: true },
  { icon: <span className="text-lg">🎬</span>, merchant: 'Netflix', category: 'Entertainment', amount: '$15.99', date: 'Yesterday', status: 'completed' as const, positive: false },
]

/* ── Arc pull indicator ───────────────────────────────────────── */
function PullArc({ progress, phase }: { progress: number; phase: Phase }) {
  const r = 18
  const circ = 2 * Math.PI * r
  const pct = Math.min(progress, 1)
  const dashOffset = circ * (1 - pct)
  const triggered = phase === 'triggered' || phase === 'refreshing'
  const color = triggered ? '#3FE7FF' : '#AFC5FF'

  return (
    <div
      className="flex items-center justify-center transition-all duration-[200ms]"
      style={{ opacity: phase === 'rest' ? 0 : 1 }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44">
        {/* Track */}
        <circle cx="22" cy="22" r={r} stroke="rgba(175,197,255,0.1)" strokeWidth="2.5" fill="none" />
        {/* Progress arc */}
        <circle
          cx="22" cy="22" r={r}
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
          style={{ transition: 'stroke-dashoffset 0.1s, stroke 0.2s' }}
        />
        {/* Arrow or spinner */}
        {phase === 'refreshing' ? (
          <g style={{ animation: 'spin 0.8s linear infinite', transformOrigin: '22px 22px' }}>
            <path d="M22 12v5M22 27v5M12 22h5M27 22h5"
              stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.4" />
            <path d="M15.5 15.5l3.5 3.5M25 25l3.5 3.5M15.5 28.5l3.5-3.5M25 19l3.5-3.5"
              stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.2" />
            <circle cx="22" cy="22" r="3" fill={color} fillOpacity="0.9" />
          </g>
        ) : (
          <path
            d={triggered
              ? 'M17 24l5-5 5 5'
              : 'M17 20l5 5 5-5'}
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'all 0.2s' }}
          />
        )}
      </svg>
    </div>
  )
}

export default function RefreshState({
  accountType = 'personal',
  userName = 'Maya Patel',
  onNavigate,
  onBack,
  onNotifications,
}: RefreshStateProps) {
  const [phase, setPhase] = useState<Phase>('rest')
  const [pullY, setPullY] = useState(0)
  const [pulseTrigger, setPulseTrigger] = useState(false)
  const [balance, setBalance] = useState('$2,847.50')
  const [lastUpdated, setLastUpdated] = useState('Just now')
  const [demoAuto, setDemoAuto] = useState(false)
  const pointerStartY = useRef<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const TRIGGER_THRESHOLD = 72

  /* Auto-demo cycle */
  useEffect(() => {
    if (!demoAuto) return
    let t: ReturnType<typeof setTimeout>
    const run = async () => {
      setPhase('pulling')
      for (let i = 0; i <= 100; i += 4) {
        await new Promise(r => { t = setTimeout(r, 16) })
        setPullY(i * 0.8)
        if (i >= 90) setPhase('triggered')
      }
      setPhase('refreshing')
      setPulseTrigger(true)
      await new Promise(r => { t = setTimeout(r, 1800) })
      setPulseTrigger(false)
      setBalance('$2,891.50')
      setLastUpdated('Just now')
      setPhase('done')
      await new Promise(r => { t = setTimeout(r, 600) })
      setPullY(0)
      setPhase('rest')
      setDemoAuto(false)
    }
    run()
    return () => clearTimeout(t)
  }, [demoAuto])

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current
    if (el && el.scrollTop === 0) {
      pointerStartY.current = e.clientY
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerStartY.current === null) return
    const delta = Math.max(0, e.clientY - pointerStartY.current)
    const damped = Math.min(delta * 0.55, 90)
    setPullY(damped)
    setPhase(damped >= TRIGGER_THRESHOLD * 0.55 ? 'triggered' : 'pulling')
  }

  const handlePointerUp = async () => {
    if (pointerStartY.current === null) return
    pointerStartY.current = null
    if (phase === 'triggered') {
      setPhase('refreshing')
      setPulseTrigger(true)
      await new Promise(r => setTimeout(r, 1800))
      setPulseTrigger(false)
      setBalance('$2,891.50')
      setLastUpdated('Just now')
      setPhase('done')
      setTimeout(() => { setPullY(0); setPhase('rest') }, 600)
    } else {
      setPullY(0)
      setPhase('rest')
    }
  }

  const isRefreshing = phase === 'refreshing'
  const progress = Math.min(pullY / (TRIGGER_THRESHOLD * 0.55), 1)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={3} onNotification={onNotifications} />

      {/* Pull container */}
      <div
        ref={scrollRef}
        className="overflow-y-auto pb-24 flex-1 relative"
        style={{ scrollbarWidth: 'none', touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Pull indicator pinned above content */}
        <div
          className="flex flex-col items-center justify-center pointer-events-none"
          style={{
            height: pullY > 0 ? pullY : isRefreshing ? 60 : 0,
            transition: phase === 'rest' || phase === 'done' ? 'height 0.35s cubic-bezier(0.4,0,0.2,1)' : 'none',
            overflow: 'hidden',
          }}
        >
          <PullArc progress={progress} phase={phase} />
          <p
            className="font-body text-[10px] mt-1 transition-all duration-[200ms]"
            style={{ color: phase === 'triggered' || isRefreshing ? '#3FE7FF' : 'rgba(175,197,255,0.5)' }}
          >
            {isRefreshing ? 'Updating balance…' : phase === 'triggered' ? 'Release to refresh' : 'Pull to refresh'}
          </p>
        </div>

        {/* Pulse overlay during refresh */}
        {isRefreshing && (
          <div
            className="sticky top-0 z-30 flex items-center justify-center py-3 pointer-events-none animate-fade-in"
            style={{ background: 'rgba(5,11,45,0.6)', backdropFilter: 'blur(8px)' }}
          >
            <Pulse trigger={pulseTrigger} width={220} height={36} color="#3FE7FF" />
          </div>
        )}

        {/* Screen content — shifted down by pull amount */}
        <div
          style={{
            transform: `translateY(${phase === 'rest' || phase === 'done' ? 0 : Math.min(pullY * 0.3, 20)}px)`,
            transition: phase === 'rest' || phase === 'done' ? 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          <div className="px-5 pt-2 flex flex-col gap-4">
            {/* Back row */}
            <div className="flex items-center gap-2">
              <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div>
                <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Refresh State</h1>
                <p className="font-body text-[10px] text-text-muted">Pull the list or tap Demo to preview</p>
              </div>
            </div>

            {/* Wallet card */}
            <div className="relative">
              <WalletCard name={userName} balance={isRefreshing ? '••••••' : balance} accountType={accountType} />
              {/* Last updated badge */}
              <div
                className="absolute bottom-3 left-4 flex items-center gap-1 px-2 py-0.5 rounded-full transition-all duration-[300ms]"
                style={{ background: 'rgba(5,11,45,0.6)' }}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isRefreshing ? 'bg-accent animate-pulse' : 'bg-success'}`} />
                <p className="font-body text-[9px] text-white/70">
                  {isRefreshing ? 'Refreshing…' : `Updated ${lastUpdated}`}
                </p>
              </div>
            </div>

            {/* Recent transactions */}
            <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] px-4 overflow-hidden">
              {isRefreshing
                ? [0, 1, 2].map(i => (
                    <div key={i} className="flex items-center gap-3 py-3.5 border-b border-[color:var(--color-border)] last:border-0">
                      <div className="w-9 h-9 rounded-full bg-surface animate-shimmer shrink-0" />
                      <div className="flex-1 flex flex-col gap-1.5">
                        <div className="h-3 w-24 rounded-full bg-surface animate-shimmer" />
                        <div className="h-2.5 w-16 rounded-full bg-surface animate-shimmer" />
                      </div>
                      <div className="h-3 w-14 rounded-full bg-surface animate-shimmer" />
                    </div>
                  ))
                : MOCK_TX.map((tx, i) => <TransactionRow key={i} {...tx} />)
              }
            </div>

            {/* Done confirmation */}
            {phase === 'done' && (
              <div
                className="flex items-center justify-center gap-2 h-10 rounded-[--radius-xl] animate-fade-in"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5l3 3 5-5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-xs font-semibold text-success">Balance updated</p>
              </div>
            )}

            {/* Demo button */}
            <button
              onClick={() => !demoAuto && setDemoAuto(true)}
              disabled={demoAuto || isRefreshing}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-50"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <span className="text-white">
                {demoAuto || isRefreshing ? 'Refreshing…' : 'Demo Pull-to-Refresh'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
