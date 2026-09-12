import { useState } from 'react'

interface DeviceEntry {
  id: string
  name: string
  model: string
  os: string
  lastSeen: string
  trusted: boolean
  current?: boolean
  type: 'phone' | 'tablet' | 'laptop' | 'desktop'
}

const INITIAL_DEVICES: DeviceEntry[] = []

function DeviceIcon({ type, trusted }: { type: DeviceEntry['type']; trusted: boolean }) {
  const color = trusted ? '#3FE7FF' : '#FF4D5A'
  if (type === 'phone') return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="3.5" y="1" width="8" height="13" rx="2" stroke={color} strokeWidth="1.1" />
      <circle cx="7.5" cy="11.5" r="0.8" fill={color} />
    </svg>
  )
  if (type === 'tablet') return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="2" y="1" width="11" height="13" rx="2" stroke={color} strokeWidth="1.1" />
      <circle cx="7.5" cy="12" r="0.7" fill={color} />
    </svg>
  )
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect x="1.5" y="2" width="12" height="8.5" rx="1.5" stroke={color} strokeWidth="1.1" />
      <path d="M5 13h5M7.5 10.5V13" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

interface DevicesProps {
  onBack?: () => void
  onAddDevice?: () => void
  onSuspiciousLogin?: () => void
}

export default function Devices({ onBack, onAddDevice, onSuspiciousLogin }: DevicesProps) {
  const [devices, setDevices] = useState<DeviceEntry[]>(INITIAL_DEVICES)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [trustingId, setTrustingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const removeDevice = (id: string) => {
    setRemovingId(id)
    setTimeout(() => {
      setDevices(prev => prev.filter(d => d.id !== id))
      setRemovingId(null)
    }, 900)
  }

  const trustDevice = (id: string) => {
    setTrustingId(id)
    setTimeout(() => {
      setDevices(prev => prev.map(d => d.id === id ? { ...d, trusted: true } : d))
      setTrustingId(null)
    }, 800)
  }

  const untrustedCount = devices.filter(d => !d.trusted).length

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Devices</p>
        <button onClick={onAddDevice}
          className="h-9 px-4 rounded-full font-body text-xs font-semibold text-white flex items-center gap-1.5 transition-all active:scale-[0.96]"
          style={{ background: 'var(--gradient-primary)' }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 2v7M2 5.5h7" stroke="white" strokeWidth="1.3" strokeLinecap="round" /></svg>
          Add Device
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Untrusted alert */}
        {untrustedCount > 0 && (
          <button onClick={onSuspiciousLogin}
            className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl] w-full text-left transition-all hover:opacity-90"
            style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.25)' }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(255,77,90,0.12)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1.5L1 12.5h12L7 1.5Z" stroke="#FF4D5A" strokeWidth="1.1" strokeLinejoin="round" />
                <path d="M7 5.5v3.5" stroke="#FF4D5A" strokeWidth="1.1" strokeLinecap="round" />
                <circle cx="7" cy="10.5" r="0.6" fill="#FF4D5A" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold" style={{ color: '#FF4D5A' }}>
                {untrustedCount} unrecognized device{untrustedCount > 1 ? 's' : ''}
              </p>
              <p className="font-body text-[10px] text-text-muted">Review suspicious login activity</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-1">
              <path d="M5 3l4 4-4 4" stroke="rgba(255,77,90,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Device list */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            {devices.length} device{devices.length !== 1 ? 's' : ''} with access
          </p>
          <div className="flex flex-col gap-2.5">
            {devices.map(device => {
              const expanded = expandedId === device.id
              return (
                <div key={device.id} className="rounded-[--radius-2xl] overflow-hidden transition-all"
                  style={{ background: 'rgba(175,197,255,0.03)', border: `1px solid ${!device.trusted ? 'rgba(255,77,90,0.25)' : device.current ? 'rgba(63,231,255,0.2)' : 'rgba(175,197,255,0.09)'}` }}>
                  <button onClick={() => setExpandedId(expanded ? null : device.id)}
                    className="flex items-center gap-3 px-4 py-4 w-full text-left">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: device.trusted ? 'rgba(63,231,255,0.08)' : 'rgba(255,77,90,0.1)', border: `1px solid ${device.trusted ? 'rgba(63,231,255,0.18)' : 'rgba(255,77,90,0.25)'}` }}>
                      <DeviceIcon type={device.type} trusted={device.trusted} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-body text-sm font-semibold text-text">{device.name}</p>
                        {device.current && <span className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(63,231,255,0.12)', color: '#3FE7FF' }}>This device</span>}
                        {!device.trusted && <span className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,77,90,0.12)', color: '#FF4D5A' }}>Unrecognized</span>}
                      </div>
                      <p className="font-body text-[10px] text-text-muted">{device.model} · {device.lastSeen}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      className="shrink-0 transition-transform duration-[200ms]"
                      style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0)' }}>
                      <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {expanded && (
                    <div className="px-4 pb-4 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(175,197,255,0.07)' }}>
                      <div className="flex gap-1.5 flex-wrap pt-2">
                        <span className="font-body text-[10px] px-2 py-1 rounded-lg" style={{ background: 'rgba(175,197,255,0.06)', color: 'rgba(175,197,255,0.6)' }}>{device.os}</span>
                        <span className="font-body text-[10px] px-2 py-1 rounded-lg" style={{ background: 'rgba(175,197,255,0.06)', color: 'rgba(175,197,255,0.6)' }}>Last seen: {device.lastSeen}</span>
                      </div>
                      <div className="flex gap-2 pt-1">
                        {!device.trusted && (
                          <button onClick={() => trustDevice(device.id)} disabled={trustingId === device.id}
                            className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold text-white transition-all disabled:opacity-40"
                            style={{ background: 'var(--gradient-primary)' }}>
                            {trustingId === device.id ? 'Trusting…' : 'Trust Device'}
                          </button>
                        )}
                        {!device.current && (
                          <button onClick={() => removeDevice(device.id)} disabled={removingId === device.id}
                            className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold transition-all disabled:opacity-40"
                            style={{ background: 'rgba(255,77,90,0.08)', color: '#FF4D5A', border: '1px solid rgba(255,77,90,0.2)' }}>
                            {removingId === device.id ? 'Removing…' : 'Remove Device'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Sign out all */}
        {devices.filter(d => !d.current).length > 0 && (
          <div>
            <button
              onClick={() => setDevices(prev => prev.filter(d => d.current))}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
              style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.18)', color: '#FF4D5A' }}>
              Sign Out of All Other Devices
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
