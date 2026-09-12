import { useState, useEffect } from 'react'
import finaSrc from '@/imports/Fina.png.jpeg'

type VoiceState = 'listening' | 'thinking' | 'speaking' | 'idle'

interface VoiceModeProps {
  onEnd?: () => void
  onSwitchToText?: () => void
}

// Waveform path — the Pulse ECG signature as a living audio waveform
// Multiple bars per state; when active, amplitude varies per heartbeat
const WAVEFORM_PATH = `M0,50 L20,50 L28,32 L34,62 L40,14 L46,74 L52,24 L58,55 L64,50 L80,50 L88,36 L94,60 L100,22 L106,72 L112,30 L118,50 L140,50 L148,38 L154,58 L160,28 L166,68 L172,35 L178,52 L184,50 L200,50`

interface TranscriptLine {
  id: string
  role: 'user' | 'fina'
  text: string
}

const INITIAL_TRANSCRIPT: TranscriptLine[] = [
  { id: 't1', role: 'fina', text: "Hi Maya! I'm listening. What would you like to know?" },
  { id: 't2', role: 'user', text: "How much have I saved this month?" },
  { id: 't3', role: 'fina', text: "You've saved $350 this month — $200 from your paycheck split and $150 in manual contributions to your Emergency Fund. That puts you ahead of your monthly average by $47." },
]

function WaveformViz({ state }: { state: VoiceState }) {
  // CSS animation class varies by state
  const isActive = state === 'listening' || state === 'speaking'
  const isThinking = state === 'thinking'

  return (
    <div className="relative flex items-center justify-center" style={{ width: 280, height: 80 }}>
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: isThinking
            ? 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(175,197,255,0.08) 0%, transparent 70%)'
            : isActive
            ? 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(63,231,255,0.15) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(63,231,255,0.05) 0%, transparent 70%)',
          transition: 'background 600ms ease',
        }}
      />
      <svg
        width="280"
        height="80"
        viewBox="0 0 200 100"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="waveGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#3FE7FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Glow layer */}
        <path
          d={WAVEFORM_PATH}
          stroke={isThinking ? 'rgba(175,197,255,0.3)' : '#3FE7FF'}
          strokeWidth="4"
          strokeOpacity={isActive ? 0.3 : 0.1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#waveGlow)"
          style={{ transition: 'stroke-opacity 400ms ease' }}
        />
        {/* Main line */}
        <path
          d={WAVEFORM_PATH}
          stroke={isThinking ? 'rgba(175,197,255,0.5)' : 'url(#waveGrad)'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: isActive ? 'none' : '4 8',
            opacity: isActive ? 1 : isThinking ? 0.6 : 0.3,
            transition: 'opacity 400ms ease',
            animation: isActive ? 'voice-pulse 1.2s ease-in-out infinite' : isThinking ? 'voice-idle 2s ease-in-out infinite' : 'none',
          }}
        />
        {/* Center dot — active indicator */}
        <circle
          cx="100"
          cy="50"
          r={isActive ? 4 : 2.5}
          fill={isActive ? '#3FE7FF' : 'rgba(175,197,255,0.3)'}
          style={{
            filter: isActive ? 'drop-shadow(0 0 6px #3FE7FF)' : 'none',
            transition: 'all 300ms ease',
          }}
        />
      </svg>
    </div>
  )
}

export default function VoiceMode({ onEnd, onSwitchToText }: VoiceModeProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>('listening')
  const [muted, setMuted] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [duration, setDuration] = useState(0)
  const [transcript] = useState<TranscriptLine[]>(INITIAL_TRANSCRIPT)

  // Simulate state cycling for demo
  useEffect(() => {
    const cycle = [
      { state: 'listening' as VoiceState, ms: 2500 },
      { state: 'thinking' as VoiceState,  ms: 1800 },
      { state: 'speaking' as VoiceState,  ms: 3200 },
      { state: 'idle' as VoiceState,      ms: 1000 },
    ]
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const step = () => {
      setVoiceState(cycle[i].state)
      timer = setTimeout(() => { i = (i + 1) % cycle.length; step() }, cycle[i].ms)
    }
    step()
    return () => clearTimeout(timer)
  }, [])

  // Call timer
  useEffect(() => {
    const t = setInterval(() => setDuration(d => d + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const STATE_LABELS: Record<VoiceState, string> = {
    listening: 'Listening…',
    thinking:  'Fina is thinking…',
    speaking:  'Fina is speaking…',
    idle:      'Tap to speak',
  }

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ height: 785 }}>
      {/* CSS for waveform animation */}
      <style>{`
        @keyframes voice-pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.18); }
        }
        @keyframes voice-idle {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Full-bleed ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,102,255,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 70%, rgba(63,231,255,0.06) 0%, transparent 60%)' }} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-2 relative z-10">
        <button onClick={onSwitchToText}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold transition-all hover:bg-surface-hi"
          style={{ border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 4h9M1.5 8h9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          Text
        </button>
        <div className="flex-1 flex flex-col items-center">
          <p className="font-display text-sm font-extrabold text-text tracking-tight">Voice Mode</p>
          <p className="font-mono text-[10px]" style={{ color: 'rgba(63,231,255,0.6)' }}>{formatTime(duration)}</p>
        </div>
        <button
          onClick={() => setShowTranscript(p => !p)}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold transition-all hover:bg-surface-hi"
          style={{ border: `1px solid ${showTranscript ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.15)'}`, background: showTranscript ? 'rgba(0,102,255,0.12)' : 'transparent', color: showTranscript ? '#AFC5FF' : 'rgba(175,197,255,0.5)' }}>
          Transcript
        </button>
      </div>

      {/* Fina avatar */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8 relative z-10 px-6">
        {/* Central identity */}
        <div className="flex flex-col items-center gap-5">
          {/* Pulsing avatar rings */}
          <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
            {/* Outer ring — only shows when active */}
            {(voiceState === 'listening' || voiceState === 'speaking') && (
              <div className="absolute inset-0 rounded-full"
                style={{ border: '1.5px solid rgba(63,231,255,0.2)', animation: 'ping 1.5s ease-out infinite' }} />
            )}
            <div className="absolute rounded-full"
              style={{ inset: 8, border: '1.5px solid rgba(63,231,255,0.15)', boxShadow: '0 0 20px rgba(63,231,255,0.1)' }} />
            {/* Inner circle — Fina avatar */}
            <div
              className="relative z-10 w-20 h-20 rounded-full overflow-hidden"
              style={{
                boxShadow: voiceState === 'listening' || voiceState === 'speaking'
                  ? '0 0 40px rgba(63,231,255,0.5), 0 0 80px rgba(0,102,255,0.3)'
                  : '0 0 20px rgba(0,102,255,0.3)',
                transition: 'box-shadow 400ms ease',
                border: '2px solid rgba(63,231,255,0.4)',
              }}>
              <img src={finaSrc} alt="Fina" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* State label */}
          <div className="flex flex-col items-center gap-1">
            <p className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Fina</p>
            <p className="font-body text-sm transition-all duration-[300ms]"
              style={{ color: voiceState === 'thinking' ? 'rgba(175,197,255,0.5)' : '#3FE7FF' }}>
              {STATE_LABELS[voiceState]}
            </p>
          </div>
        </div>

        {/* THE WAVEFORM — Pulse's most literal expression */}
        <div className="flex flex-col items-center gap-3">
          <WaveformViz state={voiceState} />
        </div>

        {/* Transcript panel (slide-up overlay) */}
        {showTranscript && (
          <div
            className="absolute left-0 right-0 rounded-t-[--radius-3xl] overflow-hidden animate-slide-up"
            style={{ bottom: 120, maxHeight: 280, background: 'rgba(13,26,74,0.96)', border: '1px solid rgba(175,197,255,0.15)', backdropFilter: 'blur(24px)' }}>
            <div className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(175,197,255,0.08)' }}>
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Live Transcript</p>
              <button onClick={() => setShowTranscript(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-hi">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-3 flex flex-col gap-3" style={{ maxHeight: 220, scrollbarWidth: 'none' }}>
              {transcript.map(line => (
                <div key={line.id} className={`flex flex-col gap-0.5 ${line.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <p className="font-body text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: line.role === 'fina' ? '#3FE7FF' : 'rgba(175,197,255,0.4)' }}>
                    {line.role === 'fina' ? 'Fina' : 'You'}
                  </p>
                  <div className="max-w-[85%] px-3 py-2 rounded-[12px]"
                    style={{
                      background: line.role === 'fina' ? 'rgba(0,30,80,0.8)' : 'rgba(0,102,255,0.2)',
                      border: line.role === 'fina' ? '1px solid rgba(0,102,255,0.2)' : 'none',
                    }}>
                    <p className="font-body text-xs text-text leading-relaxed">{line.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="px-8 pb-12 flex items-center justify-center gap-8 relative z-10">
        {/* Mute */}
        <button
          onClick={() => setMuted(p => !p)}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-[200ms] active:scale-[0.94]"
          style={{
            background: muted ? 'rgba(255,77,90,0.15)' : 'rgba(175,197,255,0.08)',
            border: `1px solid ${muted ? 'rgba(255,77,90,0.4)' : 'rgba(175,197,255,0.2)'}`,
          }}>
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="7" y="3" width="6" height="10" rx="3" stroke="#FF4D5A" strokeWidth="1.3" />
              <path d="M4 9.5A6 6 0 0 0 16 9.5" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="7" y="3" width="6" height="10" rx="3" stroke="rgba(175,197,255,0.65)" strokeWidth="1.3" />
              <path d="M4 9.5A6 6 0 0 0 16 9.5" stroke="rgba(175,197,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="10" y1="15.5" x2="10" y2="17.5" stroke="rgba(175,197,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          )}
        </button>

        {/* End call — center CTA */}
        <button
          onClick={onEnd}
          className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-[200ms] active:scale-[0.94]"
          style={{ background: 'linear-gradient(135deg, #C00020, #7A0010)', boxShadow: '0 8px 28px rgba(192,0,32,0.45)' }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M4 16.5c0-1.2.7-2.3 1.8-2.7l3.1-1.2a1.5 1.5 0 0 1 1.7.5l1.3 1.8c2-.9 3.8-2.6 4.7-4.7l-1.8-1.3a1.5 1.5 0 0 1-.5-1.7l1.2-3.1A2.9 2.9 0 0 1 18.3 2H20a4 4 0 0 1 4 4c0 9.9-8 18-18 18a4 4 0 0 1-4-4L4 16.5Z"
              fill="white" />
            <line x1="8" y1="2" x2="22" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Switch to text */}
        <button
          onClick={onSwitchToText}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-[200ms] active:scale-[0.94]"
          style={{ background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.2)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="3.5" width="16" height="12" rx="2.5" stroke="rgba(175,197,255,0.65)" strokeWidth="1.3" />
            <path d="M6 8.5h8M6 11.5h5" stroke="rgba(175,197,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Muted indicator banner */}
      {muted && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-7 px-4 rounded-full flex items-center gap-2 animate-fade-in"
          style={{ background: 'rgba(255,77,90,0.18)', border: '1px solid rgba(255,77,90,0.35)', backdropFilter: 'blur(12px)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D5A]" style={{ animation: 'ping 1s ease-out infinite' }} />
          <p className="font-body text-xs font-semibold" style={{ color: '#FF4D5A' }}>Muted</p>
        </div>
      )}
    </div>
  )
}
