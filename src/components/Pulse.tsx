import { useEffect, useState } from 'react'

interface PulseProps {
  trigger?: boolean
  width?: number
  height?: number
  color?: string
  className?: string
}

export default function Pulse({
  trigger = true,
  width = 200,
  height = 50,
  color = '#3FE7FF',
  className = '',
}: PulseProps) {
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (trigger) setKey(k => k + 1)
  }, [trigger])

  const pathLength = 600
  // ECG heartbeat waveform path
  const d = `M0,25 L50,25 L58,18 L62,32 L67,4 L72,42 L77,22 L82,25 L200,25`

  return (
    <svg
      key={key}
      width={width}
      height={height}
      viewBox={`0 0 200 50`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Glow duplicate */}
      <path
        d={d}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.25"
        filter="url(#pulse-blur)"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength}
        className="animate-pulse-draw"
      />
      {/* Main line */}
      <path
        d={d}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength}
        className="animate-pulse-draw"
      />
      <defs>
        <filter id="pulse-blur" x="-20%" y="-80%" width="140%" height="260%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
    </svg>
  )
}

/* Inline Pulse dot indicator — used in AI typing states */
export function PulseDots({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-1 ${className}`} aria-label="Thinking">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-accent"
          style={{
            animation: `dots-typing 1.2s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
    </span>
  )
}
