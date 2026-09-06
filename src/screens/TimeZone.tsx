import { useState, useMemo, useEffect } from 'react'

interface TZOption {
  id: string
  label: string
  region: string
  offset: string
  offsetMinutes: number
  cities: string
  flag: string
}

const TIME_ZONES: TZOption[] = [
  { id: 'Pacific/Honolulu',      label: 'Hawaii',            region: 'Americas',        offset: 'UTC−10', offsetMinutes: -600, cities: 'Honolulu',                          flag: '🇺🇸' },
  { id: 'America/Anchorage',     label: 'Alaska',            region: 'Americas',        offset: 'UTC−9',  offsetMinutes: -540, cities: 'Anchorage',                         flag: '🇺🇸' },
  { id: 'America/Los_Angeles',   label: 'Pacific Time',      region: 'Americas',        offset: 'UTC−7',  offsetMinutes: -420, cities: 'Los Angeles, San Francisco, Seattle',flag: '🇺🇸' },
  { id: 'America/Denver',        label: 'Mountain Time',     region: 'Americas',        offset: 'UTC−6',  offsetMinutes: -360, cities: 'Denver, Phoenix',                   flag: '🇺🇸' },
  { id: 'America/Chicago',       label: 'Central Time',      region: 'Americas',        offset: 'UTC−5',  offsetMinutes: -300, cities: 'Chicago, Dallas, Houston',          flag: '🇺🇸' },
  { id: 'America/New_York',      label: 'Eastern Time',      region: 'Americas',        offset: 'UTC−4',  offsetMinutes: -240, cities: 'New York, Miami, Toronto',          flag: '🇺🇸' },
  { id: 'America/Sao_Paulo',     label: 'Brasilia Time',     region: 'Americas',        offset: 'UTC−3',  offsetMinutes: -180, cities: 'São Paulo, Rio de Janeiro',         flag: '🇧🇷' },
  { id: 'America/Argentina/Buenos_Aires', label: 'Argentina Time', region: 'Americas', offset: 'UTC−3',  offsetMinutes: -180, cities: 'Buenos Aires, Córdoba',             flag: '🇦🇷' },
  { id: 'America/Mexico_City',   label: 'Mexico Central',    region: 'Americas',        offset: 'UTC−6',  offsetMinutes: -360, cities: 'Mexico City, Guadalajara',          flag: '🇲🇽' },
  { id: 'America/Halifax',       label: 'Atlantic Time',     region: 'Americas',        offset: 'UTC−3',  offsetMinutes: -180, cities: 'Halifax',                           flag: '🇨🇦' },
  { id: 'Atlantic/Reykjavik',    label: 'Iceland',           region: 'Europe / Africa', offset: 'UTC+0',  offsetMinutes: 0,    cities: 'Reykjavik',                         flag: '🇮🇸' },
  { id: 'Europe/London',         label: 'London',            region: 'Europe / Africa', offset: 'UTC+1',  offsetMinutes: 60,   cities: 'London, Dublin, Lisbon',            flag: '🇬🇧' },
  { id: 'Europe/Paris',          label: 'Central European',  region: 'Europe / Africa', offset: 'UTC+2',  offsetMinutes: 120,  cities: 'Paris, Berlin, Madrid, Rome',       flag: '🇪🇺' },
  { id: 'Europe/Helsinki',       label: 'Eastern European',  region: 'Europe / Africa', offset: 'UTC+3',  offsetMinutes: 180,  cities: 'Helsinki, Kyiv, Athens',            flag: '🇫🇮' },
  { id: 'Europe/Moscow',         label: 'Moscow Time',       region: 'Europe / Africa', offset: 'UTC+3',  offsetMinutes: 180,  cities: 'Moscow, St. Petersburg',            flag: '🇷🇺' },
  { id: 'Africa/Cairo',          label: 'Egypt',             region: 'Europe / Africa', offset: 'UTC+2',  offsetMinutes: 120,  cities: 'Cairo',                             flag: '🇪🇬' },
  { id: 'Africa/Nairobi',        label: 'East Africa',       region: 'Europe / Africa', offset: 'UTC+3',  offsetMinutes: 180,  cities: 'Nairobi, Addis Ababa',             flag: '🇰🇪' },
  { id: 'Africa/Lagos',          label: 'West Africa',       region: 'Europe / Africa', offset: 'UTC+1',  offsetMinutes: 60,   cities: 'Lagos, Abuja, Accra',               flag: '🇳🇬' },
  { id: 'Asia/Dubai',            label: 'Gulf Time',         region: 'Asia',            offset: 'UTC+4',  offsetMinutes: 240,  cities: 'Dubai, Abu Dhabi, Muscat',          flag: '🇦🇪' },
  { id: 'Asia/Karachi',          label: 'Pakistan',          region: 'Asia',            offset: 'UTC+5',  offsetMinutes: 300,  cities: 'Karachi, Islamabad, Lahore',        flag: '🇵🇰' },
  { id: 'Asia/Kolkata',          label: 'India Standard',    region: 'Asia',            offset: 'UTC+5:30', offsetMinutes: 330, cities: 'Mumbai, Delhi, Bengaluru',         flag: '🇮🇳' },
  { id: 'Asia/Dhaka',            label: 'Bangladesh',        region: 'Asia',            offset: 'UTC+6',  offsetMinutes: 360,  cities: 'Dhaka, Chittagong',                 flag: '🇧🇩' },
  { id: 'Asia/Bangkok',          label: 'Indochina',         region: 'Asia',            offset: 'UTC+7',  offsetMinutes: 420,  cities: 'Bangkok, Hanoi, Jakarta',           flag: '🇹🇭' },
  { id: 'Asia/Kuala_Lumpur',     label: 'Malaysia / SG',     region: 'Asia',            offset: 'UTC+8',  offsetMinutes: 480,  cities: 'Kuala Lumpur, Singapore',           flag: '🇲🇾' },
  { id: 'Asia/Shanghai',         label: 'China Standard',    region: 'Asia',            offset: 'UTC+8',  offsetMinutes: 480,  cities: 'Shanghai, Beijing, Shenzhen',       flag: '🇨🇳' },
  { id: 'Asia/Taipei',           label: 'Taiwan',            region: 'Asia',            offset: 'UTC+8',  offsetMinutes: 480,  cities: 'Taipei',                            flag: '🇹🇼' },
  { id: 'Asia/Manila',           label: 'Philippines',       region: 'Asia',            offset: 'UTC+8',  offsetMinutes: 480,  cities: 'Manila, Cebu',                      flag: '🇵🇭' },
  { id: 'Asia/Seoul',            label: 'Korea Standard',    region: 'Asia',            offset: 'UTC+9',  offsetMinutes: 540,  cities: 'Seoul, Busan',                      flag: '🇰🇷' },
  { id: 'Asia/Tokyo',            label: 'Japan Standard',    region: 'Asia',            offset: 'UTC+9',  offsetMinutes: 540,  cities: 'Tokyo, Osaka, Sapporo',             flag: '🇯🇵' },
  { id: 'Australia/Sydney',      label: 'Australia Eastern', region: 'Pacific',         offset: 'UTC+10', offsetMinutes: 600,  cities: 'Sydney, Melbourne, Brisbane',       flag: '🇦🇺' },
  { id: 'Australia/Perth',       label: 'Australia Western', region: 'Pacific',         offset: 'UTC+8',  offsetMinutes: 480,  cities: 'Perth',                             flag: '🇦🇺' },
  { id: 'Pacific/Auckland',      label: 'New Zealand',       region: 'Pacific',         offset: 'UTC+12', offsetMinutes: 720,  cities: 'Auckland, Wellington',              flag: '🇳🇿' },
]

const REGIONS = ['Americas', 'Europe / Africa', 'Asia', 'Pacific']

function formatLocalTime(offsetMinutes: number): string {
  const now = new Date()
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000
  const zoneMs = utcMs + offsetMinutes * 60000
  const d = new Date(zoneMs)
  const h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${m} ${ampm}`
}

interface TimeZoneProps {
  onBack?: () => void
  onApply?: (tzId: string) => void
  currentTZ?: string
}

export default function TimeZone({ onBack, onApply, currentTZ = 'America/New_York' }: TimeZoneProps) {
  const [autoDetect, setAutoDetect] = useState(false)
  const [selected, setSelected] = useState(currentTZ)
  const [applied, setApplied] = useState(currentTZ)
  const [search, setSearch] = useState('')
  const [applying, setApplying] = useState(false)
  const [justApplied, setJustApplied] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 15000)
    return () => clearInterval(id)
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return TIME_ZONES
    return TIME_ZONES.filter(tz =>
      tz.label.toLowerCase().includes(q) ||
      tz.cities.toLowerCase().includes(q) ||
      tz.offset.toLowerCase().includes(q) ||
      tz.region.toLowerCase().includes(q) ||
      tz.id.toLowerCase().includes(q)
    )
  }, [search])

  const grouped = useMemo(() => {
    if (search) return [{ region: '', tzs: filtered }]
    return REGIONS.map(r => ({
      region: r,
      tzs: TIME_ZONES.filter(tz => tz.region === r),
    }))
  }, [filtered, search])

  const preview = TIME_ZONES.find(tz => tz.id === selected)
  const appliedTZ = TIME_ZONES.find(tz => tz.id === applied)

  const handleAutoDetect = () => {
    setAutoDetect(v => {
      if (!v) {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
        const match = TIME_ZONES.find(tz => tz.id === detected) ?? TIME_ZONES.find(tz => tz.id === 'America/New_York')!
        setSelected(match.id)
      }
      return !v
    })
  }

  const handleApply = () => {
    if (selected === applied || applying) return
    setApplying(true)
    setTimeout(() => {
      setApplied(selected)
      setApplying(false)
      setJustApplied(true)
      onApply?.(selected)
      setTimeout(() => setJustApplied(false), 2400)
    }, 900)
  }

  void tick // reference to force re-render on tick

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Time Zone</p>
          <p className="font-body text-[10px] text-text-muted">
            {appliedTZ?.label ?? 'Eastern Time'} · {appliedTZ?.offset ?? 'UTC−4'}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Auto-detect toggle */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-2xl]"
          style={{
            background: autoDetect ? 'rgba(34,197,94,0.05)' : 'rgba(175,197,255,0.03)',
            border: `1px solid ${autoDetect ? 'rgba(34,197,94,0.18)' : 'rgba(175,197,255,0.09)'}`,
          }}
        >
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">Auto-detect</p>
            <p className="font-body text-[10px] text-text-muted mt-0.5">
              {autoDetect ? "Using your device's location" : 'Set your time zone manually below'}
            </p>
          </div>
          <button
            onClick={handleAutoDetect}
            className="w-11 h-6 rounded-full relative shrink-0 transition-colors"
            style={{ background: autoDetect ? '#22C55E' : 'rgba(175,197,255,0.15)' }}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
              style={{ left: autoDetect ? 'calc(100% - 22px)' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            />
          </button>
        </div>

        {/* Preview card */}
        {preview && (
          <div
            className="px-4 py-4 rounded-[--radius-2xl]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,30,80,0.7) 0%, rgba(10,20,50,0.85) 100%)',
              border: '1px solid rgba(0,102,255,0.2)',
              boxShadow: '0 0 20px rgba(0,102,255,0.08)',
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'rgba(77,159,255,0.7)' }}>
                  Selected zone
                </p>
                <p className="font-display text-base font-extrabold text-text">
                  {preview.flag} {preview.label}
                </p>
                <p className="font-body text-[11px] text-text-muted mt-0.5">{preview.cities}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xl font-bold text-text">{formatLocalTime(preview.offsetMinutes)}</p>
                <p className="font-body text-[10px] text-text-muted mt-0.5">now · {preview.offset}</p>
              </div>
            </div>

            {/* What it affects */}
            <div className="mt-3 pt-3 flex flex-col gap-1.5" style={{ borderTop: '1px solid rgba(175,197,255,0.08)' }}>
              <p className="font-body text-[10px] font-semibold text-text-muted">Affects</p>
              <div className="flex flex-wrap gap-1.5">
                {['Transaction timestamps', 'Statement generation', 'Scheduled payments', 'Date headers'].map(item => (
                  <span key={item} className="px-2 py-0.5 rounded-full font-body text-[10px]"
                    style={{ background: 'rgba(175,197,255,0.05)', color: 'rgba(175,197,255,0.6)', border: '1px solid rgba(175,197,255,0.1)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {selected === applied && (
              <div className="mt-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 5px #22C55E' }} />
                <p className="font-body text-[10px]" style={{ color: '#22C55E' }}>Currently active</p>
              </div>
            )}
          </div>
        )}

        {/* Search */}
        {!autoDetect && (
          <div className="flex items-center gap-2.5 px-3.5 h-11 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
              <path d="M10 10l2.5 2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search city, zone, or offset…"
              className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="w-5 h-5 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Zone list */}
        {!autoDetect && grouped.map((group, gi) => (
          <div key={gi}>
            {group.region && (
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2.5 px-0.5">
                {group.region}
              </p>
            )}
            <div className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.01)' }}>
              {group.tzs.map((tz, i) => {
                const isSel = selected === tz.id
                const isCur = applied === tz.id
                const localTime = formatLocalTime(tz.offsetMinutes)
                return (
                  <button key={tz.id} onClick={() => { setSelected(tz.id); setJustApplied(false) }}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left transition-all"
                    style={{
                      background: isSel ? 'rgba(0,102,255,0.07)' : 'transparent',
                      borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none',
                    }}>
                    <span className="text-base shrink-0">{tz.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-body text-sm font-semibold text-text">{tz.label}</p>
                        <span className="font-mono text-[10px]" style={{ color: 'rgba(77,159,255,0.6)' }}>{tz.offset}</span>
                      </div>
                      <p className="font-body text-[10px] text-text-muted truncate">{tz.cities}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <p className="font-mono text-[11px] font-semibold" style={{ color: 'rgba(175,197,255,0.5)' }}>{localTime}</p>
                      {isCur && (
                        <span className="font-body text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>Active</span>
                      )}
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                        style={{ borderColor: isSel ? '#0066FF' : 'rgba(175,197,255,0.2)' }}>
                        {isSel && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0066FF' }} />}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {!autoDetect && filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="font-body text-sm text-text-muted">No zones match "{search}"</p>
          </div>
        )}

        {/* Apply */}
        {justApplied ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Time zone applied</p>
          </div>
        ) : (
          <button
            onClick={handleApply}
            disabled={applying || selected === applied}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
            style={{ background: 'var(--gradient-primary)' }}>
            {applying ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {selected === applied ? 'Time zone applied' : `Apply — ${preview?.label ?? ''}`}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
