import { useState } from 'react'

interface CalEvent {
  id: string
  date: string
  label: string
  type: 'billing' | 'subscription' | 'goal' | 'reminder'
  amount?: string
}

interface FinancialCalendarProps {
  onBack?: () => void
  onAddReminder?: () => void
}

const TYPE_COLOR: Record<CalEvent['type'], string> = {
  billing: '#3FE7FF',
  subscription: '#0066FF',
  goal: '#22C55E',
  reminder: '#F5B700',
}

const TYPE_LABEL: Record<CalEvent['type'], string> = {
  billing: 'Billing',
  subscription: 'Subscription',
  goal: 'Goal',
  reminder: 'Reminder',
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function isoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function formatDisplayDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${MONTH_NAMES[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`
}

export default function FinancialCalendar({ onBack, onAddReminder }: FinancialCalendarProps) {
  const [events] = useState<CalEvent[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()

  // Build calendar grid cells (Mon = 0 ... Sun = 6)
  const firstDayOfMonth = new Date(year, month, 1)
  // getDay(): 0=Sun,1=Mon...6=Sat → convert to Mon-based index
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7

  const cells: (number | null)[] = []
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1
    cells.push(dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null)
  }

  // Events map: ISO date → CalEvent[]
  const eventsByDate: Record<string, CalEvent[]> = {}
  for (const ev of events) {
    if (!eventsByDate[ev.date]) eventsByDate[ev.date] = []
    eventsByDate[ev.date].push(ev)
  }

  const today = new Date()
  const todayIso = isoDate(today.getFullYear(), today.getMonth(), today.getDate())
  const selectedIso = selectedDate
    ? isoDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    : null

  // Upcoming events = all events sorted by date
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date))

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1))

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Header */}
      <div
        className="px-5 pt-4 pb-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(175,197,255,0.12)' }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full focus-ring"
          style={{ background: 'rgba(175,197,255,0.06)' }}
          aria-label="Back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="font-display text-base font-semibold text-text-1">Financial Calendar</h1>
        <button
          onClick={onAddReminder}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold focus-ring"
          style={{ background: 'var(--gradient-primary)', color: '#fff' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Reminder
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Month selector */}
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full focus-ring"
            style={{ background: 'rgba(175,197,255,0.06)' }}
            aria-label="Previous month"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="font-display text-sm font-semibold text-text-1">
            {MONTH_NAMES[month]} {year}
          </span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full focus-ring"
            style={{ background: 'rgba(175,197,255,0.06)' }}
            aria-label="Next month"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Calendar grid */}
        <div className="px-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_HEADERS.map(d => (
              <div key={d} className="text-center font-body text-xs text-text-muted py-1">
                {d}
              </div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, idx) => {
              if (day === null) return <div key={idx} />
              const iso = isoDate(year, month, day)
              const dayEvents = eventsByDate[iso] || []
              const isToday = iso === todayIso
              const isSelected = iso === selectedIso
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(new Date(year, month, day))}
                  className="flex flex-col items-center py-1 rounded-lg focus-ring"
                  style={{
                    background: isSelected
                      ? 'var(--gradient-primary)'
                      : isToday
                      ? 'rgba(175,197,255,0.1)'
                      : 'transparent',
                  }}
                >
                  <span
                    className="font-body text-sm"
                    style={{
                      color: isSelected ? '#fff' : isToday ? '#3FE7FF' : 'rgba(175,197,255,0.8)',
                      fontWeight: isToday || isSelected ? '600' : '400',
                    }}
                  >
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {dayEvents.slice(0, 3).map((ev, i) => (
                        <span
                          key={i}
                          className="w-1 h-1 rounded-full"
                          style={{ background: TYPE_COLOR[ev.type] }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Upcoming section */}
        <div className="px-5 mt-6">
          <h2 className="font-display text-sm font-semibold text-text-2 mb-3 uppercase tracking-wider">
            Upcoming
          </h2>

          {upcoming.length === 0 ? (
            <div
              className="rounded-2xl px-5 py-6 text-center"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: 'rgba(175,197,255,0.08)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="font-body text-sm font-medium text-text-2 mb-1">No upcoming events</p>
              <p className="font-body text-xs text-text-muted">Add a reminder to get started.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map(ev => (
                <div
                  key={ev.id}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3"
                  style={{
                    background: 'rgba(175,197,255,0.06)',
                    border: '1px solid rgba(175,197,255,0.12)',
                    borderLeft: `3px solid ${TYPE_COLOR[ev.type]}`,
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-text-1 truncate">{ev.label}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="font-body text-xs px-1.5 py-0.5 rounded"
                        style={{ background: `${TYPE_COLOR[ev.type]}20`, color: TYPE_COLOR[ev.type] }}
                      >
                        {TYPE_LABEL[ev.type]}
                      </span>
                      <span className="font-body text-xs text-text-muted">{formatDisplayDate(ev.date)}</span>
                    </div>
                  </div>
                  {ev.amount && (
                    <span className="font-display text-sm font-semibold text-text-1 shrink-0">
                      {ev.amount}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
