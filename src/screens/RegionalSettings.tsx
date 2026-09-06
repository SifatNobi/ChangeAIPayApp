import { useState } from 'react'

type NumberFormat = 'us' | 'eu' | 'in' | 'ch'
type DateFormat = 'mdy' | 'dmy' | 'ymd'
type TimeFormat = '12h' | '24h'
type FirstDay = 'sunday' | 'monday'
type Units = 'metric' | 'imperial'

interface FormatOption<T extends string> {
  value: T
  label: string
  example: string
  note?: string
}

const NUMBER_FORMATS: FormatOption<NumberFormat>[] = [
  { value: 'us', label: 'United States', example: '1,234,567.89',  note: 'Period decimal · comma thousands' },
  { value: 'eu', label: 'European',      example: '1.234.567,89',  note: 'Comma decimal · period thousands' },
  { value: 'in', label: 'Indian',        example: '12,34,567.89',  note: 'Period decimal · lakh grouping' },
  { value: 'ch', label: 'Swiss / French',example: '1 234 567,89',  note: 'Comma decimal · space thousands' },
]

const DATE_FORMATS: FormatOption<DateFormat>[] = [
  { value: 'mdy', label: 'Month / Day / Year', example: '08/31/2026',  note: 'Aug 31, 2026' },
  { value: 'dmy', label: 'Day / Month / Year', example: '31/08/2026',  note: '31 Aug 2026' },
  { value: 'ymd', label: 'Year / Month / Day', example: '2026/08/31',  note: 'ISO 8601 — used in Japan, Korea, China' },
]

const TIME_FORMATS: FormatOption<TimeFormat>[] = [
  { value: '12h', label: '12-hour', example: '3:42 PM / 11:09 AM' },
  { value: '24h', label: '24-hour', example: '15:42 / 11:09' },
]

const FIRST_DAYS: FormatOption<FirstDay>[] = [
  { value: 'sunday',  label: 'Sunday first',  example: 'Sun · Mon · Tue · Wed · Thu · Fri · Sat' },
  { value: 'monday',  label: 'Monday first',  example: 'Mon · Tue · Wed · Thu · Fri · Sat · Sun' },
]

const UNIT_OPTIONS: FormatOption<Units>[] = [
  { value: 'metric',   label: 'Metric',   example: 'km · kg · °C · L',  note: 'Used globally' },
  { value: 'imperial', label: 'Imperial', example: 'mi · lb · °F · gal', note: 'Used in US, UK (partial)' },
]

interface RegionalSettingsProps {
  onBack?: () => void
  onSave?: (prefs: { numberFormat: NumberFormat; dateFormat: DateFormat; timeFormat: TimeFormat; firstDay: FirstDay; units: Units }) => void
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-2.5">
      <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">{title}</p>
      {subtitle && <p className="font-body text-[10px] text-text-muted mt-0.5">{subtitle}</p>}
    </div>
  )
}

function OptionRow<T extends string>({ option, selected, onSelect }: { option: FormatOption<T>; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-3.5 w-full text-left transition-all"
      style={{ background: selected ? 'rgba(0,102,255,0.06)' : 'transparent' }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-semibold text-text">{option.label}</p>
        <p className="font-mono text-[11px] mt-0.5" style={{ color: 'rgba(77,159,255,0.75)' }}>{option.example}</p>
        {option.note && (
          <p className="font-body text-[10px] text-text-muted mt-0.5">{option.note}</p>
        )}
      </div>
      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
        style={{ borderColor: selected ? '#0066FF' : 'rgba(175,197,255,0.2)' }}>
        {selected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0066FF' }} />}
      </div>
    </button>
  )
}

function OptionGroup<T extends string>({ options, value, onChange }: { options: FormatOption<T>[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="rounded-[--radius-2xl] overflow-hidden"
      style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.01)' }}>
      {options.map((opt, i) => (
        <div key={opt.value} style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
          <OptionRow option={opt} selected={value === opt.value} onSelect={() => onChange(opt.value)} />
        </div>
      ))}
    </div>
  )
}

export default function RegionalSettings({ onBack, onSave }: RegionalSettingsProps) {
  const [numberFormat, setNumberFormat] = useState<NumberFormat>('us')
  const [dateFormat, setDateFormat] = useState<DateFormat>('mdy')
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('12h')
  const [firstDay, setFirstDay] = useState<FirstDay>('sunday')
  const [units, setUnits] = useState<Units>('metric')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const nf = NUMBER_FORMATS.find(f => f.value === numberFormat)!
  const df = DATE_FORMATS.find(f => f.value === dateFormat)!
  const tf = TIME_FORMATS.find(f => f.value === timeFormat)!

  const handleSave = () => {
    if (saving) return
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      onSave?.({ numberFormat, dateFormat, timeFormat, firstDay, units })
      setTimeout(() => setSaved(false), 2400)
    }, 800)
  }

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Regional Settings</p>
          <p className="font-body text-[10px] text-text-muted">Formatting and measurement preferences</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Live preview strip */}
        <div
          className="px-4 py-3.5 rounded-[--radius-2xl]"
          style={{
            background: 'linear-gradient(135deg, rgba(0,30,80,0.7) 0%, rgba(10,20,50,0.85) 100%)',
            border: '1px solid rgba(0,102,255,0.18)',
            boxShadow: '0 0 16px rgba(0,102,255,0.08)',
          }}
        >
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'rgba(77,159,255,0.7)' }}>
            Live preview
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Number', value: nf.example },
              { label: 'Date',   value: df.example },
              { label: 'Time',   value: tf.example.split(' / ')[0] },
            ].map(item => (
              <div key={item.label} className="px-2.5 py-2 rounded-[--radius-xl] text-center"
                style={{ background: 'rgba(175,197,255,0.04)' }}>
                <p className="font-body text-[9px] text-text-muted mb-0.5">{item.label}</p>
                <p className="font-mono text-[11px] font-bold text-text leading-tight">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Number format */}
        <div>
          <SectionHeader title="Number format" subtitle="Decimal and thousands separators" />
          <OptionGroup options={NUMBER_FORMATS} value={numberFormat} onChange={setNumberFormat} />
        </div>

        {/* Date format */}
        <div>
          <SectionHeader title="Date format" subtitle="Order of day, month, and year" />
          <OptionGroup options={DATE_FORMATS} value={dateFormat} onChange={setDateFormat} />
        </div>

        {/* Time format */}
        <div>
          <SectionHeader title="Time format" />
          <OptionGroup options={TIME_FORMATS} value={timeFormat} onChange={setTimeFormat} />
        </div>

        {/* First day of week */}
        <div>
          <SectionHeader title="First day of week" subtitle="Affects calendar and statement views" />
          <OptionGroup options={FIRST_DAYS} value={firstDay} onChange={setFirstDay} />
        </div>

        {/* Units */}
        <div>
          <SectionHeader title="Measurement units" subtitle="Used where distance or weight is relevant" />
          <OptionGroup options={UNIT_OPTIONS} value={units} onChange={setUnits} />
        </div>

        {/* Save */}
        {saved ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Preferences saved</p>
          </div>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
            style={{ background: 'var(--gradient-primary)' }}>
            {saving ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Save preferences
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
