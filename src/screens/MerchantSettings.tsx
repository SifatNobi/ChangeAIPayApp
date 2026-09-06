import { useState } from 'react'

type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD'
type Language = 'English' | 'Spanish' | 'French' | 'Portuguese'

const DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface DayHours {
  open: boolean
  start: string
  end: string
}

const DEFAULT_HOURS: Record<Day, DayHours> = {
  Mon: { open: true, start: '09:00', end: '18:00' },
  Tue: { open: true, start: '09:00', end: '18:00' },
  Wed: { open: true, start: '09:00', end: '18:00' },
  Thu: { open: true, start: '09:00', end: '18:00' },
  Fri: { open: true, start: '09:00', end: '17:00' },
  Sat: { open: false, start: '10:00', end: '14:00' },
  Sun: { open: false, start: '10:00', end: '14:00' },
}

interface NotifPref {
  label: string
  sub: string
  key: string
}

const NOTIF_PREFS: NotifPref[] = [
  { label: 'New payment received', sub: 'Immediate push notification', key: 'newPayment' },
  { label: 'Payout processed', sub: 'When funds hit your bank', key: 'payout' },
  { label: 'Invoice viewed', sub: 'When a customer opens an invoice', key: 'invoiceView' },
  { label: 'Invoice paid', sub: 'When a customer pays', key: 'invoicePaid' },
  { label: 'Daily summary', sub: 'Revenue recap at 6 PM', key: 'dailySummary' },
  { label: 'Team activity', sub: 'When a team member takes action', key: 'teamActivity' },
]

const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
const LANGUAGES: Language[] = ['English', 'Spanish', 'French', 'Portuguese']

interface ToggleMiniProps {
  on: boolean
  onChange: (v: boolean) => void
}

function ToggleMini({ on, onChange }: ToggleMiniProps) {
  return (
    <button onClick={() => onChange(!on)}
      className="relative shrink-0 transition-all"
      style={{
        width: 40, height: 22, borderRadius: 11,
        background: on ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.1)',
        border: `1px solid ${on ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.15)'}`,
      }}>
      <div className="absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-all"
        style={{ left: on ? 'calc(100% - 20px)' : '2px' }} />
    </button>
  )
}

interface MerchantSettingsProps {
  onBack?: () => void
}

export default function MerchantSettings({ onBack }: MerchantSettingsProps) {
  const [hours, setHours] = useState<Record<Day, DayHours>>(DEFAULT_HOURS)
  const [notifs, setNotifs] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIF_PREFS.map(p => [p.key, true]))
  )
  const [currency, setCurrency] = useState<Currency>('USD')
  const [language, setLanguage] = useState<Language>('English')
  const [saved, setSaved] = useState(false)

  const toggleDay = (day: Day) => {
    setHours(prev => ({ ...prev, [day]: { ...prev[day], open: !prev[day].open } }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Settings</p>
        <button onClick={handleSave}
          className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
          style={{
            background: saved ? 'rgba(34,197,94,0.12)' : 'var(--gradient-primary)',
            color: saved ? '#22C55E' : 'white',
            border: saved ? '1px solid rgba(34,197,94,0.25)' : 'none',
          }}>
          {saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Business hours */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Business Hours
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {DAYS.map((day, i) => {
              const dh = hours[day]
              return (
                <div key={day}
                  style={{ borderBottom: i < DAYS.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <p className="font-body text-xs font-semibold text-text w-8">{day}</p>
                    <ToggleMini on={dh.open} onChange={() => toggleDay(day)} />
                    {dh.open ? (
                      <div className="flex items-center gap-2 flex-1 ml-1">
                        <input
                          type="time"
                          value={dh.start}
                          onChange={e => setHours(prev => ({ ...prev, [day]: { ...prev[day], start: e.target.value } }))}
                          className="font-mono text-xs text-text bg-transparent outline-none border-b"
                          style={{ borderColor: 'rgba(175,197,255,0.15)', width: 70 }}
                        />
                        <span className="font-body text-[10px] text-text-muted">–</span>
                        <input
                          type="time"
                          value={dh.end}
                          onChange={e => setHours(prev => ({ ...prev, [day]: { ...prev[day], end: e.target.value } }))}
                          className="font-mono text-xs text-text bg-transparent outline-none border-b"
                          style={{ borderColor: 'rgba(175,197,255,0.15)', width: 70 }}
                        />
                      </div>
                    ) : (
                      <p className="font-body text-xs text-text-muted ml-1 flex-1">Closed</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Notification preferences */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Notification Preferences
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {NOTIF_PREFS.map((pref, i) => (
              <div key={pref.key} className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: i < NOTIF_PREFS.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-text">{pref.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{pref.sub}</p>
                </div>
                <ToggleMini on={notifs[pref.key]} onChange={v => setNotifs(prev => ({ ...prev, [pref.key]: v }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Display */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Display
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {/* Currency */}
            <div className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: '1px solid rgba(175,197,255,0.06)' }}>
              <div className="flex-1">
                <p className="font-body text-sm font-medium text-text">Display Currency</p>
                <p className="font-body text-[10px] text-text-muted">How amounts appear in the app</p>
              </div>
              <div className="flex gap-1.5">
                {CURRENCIES.map(c => (
                  <button key={c} onClick={() => setCurrency(c)}
                    className="w-9 h-8 rounded-[--radius-xl] font-body text-[10px] font-semibold transition-all"
                    style={{
                      background: currency === c ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.05)',
                      color: currency === c ? '#4D9FFF' : 'rgba(175,197,255,0.4)',
                      border: `1px solid ${currency === c ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.09)'}`,
                    }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="flex-1">
                <p className="font-body text-sm font-medium text-text">Language</p>
                <p className="font-body text-[10px] text-text-muted">App display language</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {LANGUAGES.map(l => (
                  <button key={l} onClick={() => setLanguage(l)}
                    className="px-3 h-7 rounded-full font-body text-[10px] font-semibold transition-all"
                    style={{
                      background: language === l ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.05)',
                      color: language === l ? '#4D9FFF' : 'rgba(175,197,255,0.4)',
                      border: `1px solid ${language === l ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.09)'}`,
                    }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
