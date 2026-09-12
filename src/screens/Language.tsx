import { useState } from 'react'

interface LangOption {
  code: string
  name: string
  nativeName: string
  region: string
  flag: string
  preview: { greeting: string; balance: string; send: string }
}

const LANGUAGES: LangOption[] = [
  { code: 'en-US', name: 'English',    nativeName: 'English',    region: 'United States', flag: '🇺🇸', preview: { greeting: 'Good morning, Maya',         balance: 'Total Balance',           send: 'Send Money'      } },
  { code: 'en-GB', name: 'English',    nativeName: 'English',    region: 'United Kingdom',flag: '🇬🇧', preview: { greeting: 'Good morning, Maya',         balance: 'Total Balance',           send: 'Send Money'      } },
  { code: 'es',    name: 'Spanish',    nativeName: 'Español',    region: 'Español',       flag: '🇪🇸', preview: { greeting: 'Buenos días, Maya',          balance: 'Saldo Total',             send: 'Enviar Dinero'   } },
  { code: 'fr',    name: 'French',     nativeName: 'Français',   region: 'Français',      flag: '🇫🇷', preview: { greeting: 'Bonjour, Maya',             balance: 'Solde Total',             send: 'Envoyer'         } },
  { code: 'de',    name: 'German',     nativeName: 'Deutsch',    region: 'Deutsch',       flag: '🇩🇪', preview: { greeting: 'Guten Morgen, Maya',        balance: 'Gesamtguthaben',          send: 'Geld senden'     } },
  { code: 'pt',    name: 'Portuguese', nativeName: 'Português',  region: 'Português',     flag: '🇧🇷', preview: { greeting: 'Bom dia, Maya',             balance: 'Saldo Total',             send: 'Enviar Dinheiro' } },
  { code: 'ja',    name: 'Japanese',   nativeName: '日本語',      region: '日本語',         flag: '🇯🇵', preview: { greeting: 'おはようございます、Maya',      balance: '総残高',                  send: '送金'            } },
  { code: 'zh',    name: 'Chinese',    nativeName: '中文',        region: '简体中文',       flag: '🇨🇳', preview: { greeting: '早上好，Maya',               balance: '总余额',                  send: '转账'            } },
  { code: 'ko',    name: 'Korean',     nativeName: '한국어',       region: '한국어',         flag: '🇰🇷', preview: { greeting: '좋은 아침이에요, Maya',        balance: '총 잔액',                 send: '송금'            } },
  { code: 'ar',    name: 'Arabic',     nativeName: 'العربية',     region: 'العربية',       flag: '🇸🇦', preview: { greeting: 'صباح الخير، Maya',          balance: 'الرصيد الكلي',           send: 'إرسال الأموال'  } },
  { code: 'hi',    name: 'Hindi',      nativeName: 'हिन्दी',       region: 'हिन्दी',         flag: '🇮🇳', preview: { greeting: 'सुप्रभात, Maya',             balance: 'कुल शेष राशि',            send: 'पैसे भेजें'      } },
]

interface LanguageProps {
  onBack?: () => void
  onApply?: (code: string) => void
}

export default function Language({ onBack, onApply }: LanguageProps) {
  const [selected, setSelected] = useState('en-US')
  const [applied, setApplied] = useState('en-US')
  const [search, setSearch] = useState('')
  const [applying, setApplying] = useState(false)
  const [applied2, setApplied2] = useState(false)

  const filtered = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
    l.region.toLowerCase().includes(search.toLowerCase())
  )

  const preview = LANGUAGES.find(l => l.code === selected)

  const handleApply = () => {
    if (selected === applied) return
    setApplying(true)
    setTimeout(() => {
      setApplied(selected)
      setApplied2(true)
      setApplying(false)
      onApply?.(selected)
      setTimeout(() => setApplied2(false), 2000)
    }, 1000)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Language</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Search */}
        <div className="flex items-center gap-2.5 px-3.5 h-11 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
            <path d="M10 10l2.5 2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search language…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none"
          />
        </div>

        {/* Language list */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            {filtered.length} language{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {filtered.map((lang, i) => {
              const isSelected = selected === lang.code
              const isCurrent = applied === lang.code
              return (
                <button key={lang.code} onClick={() => { setSelected(lang.code); setApplied2(false) }}
                  className="flex items-center gap-3 px-4 py-3.5 w-full text-left transition-all hover:bg-surface-hi"
                  style={{ background: isSelected ? 'rgba(0,102,255,0.06)' : i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                  <span className="text-xl shrink-0">{lang.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-body text-sm font-semibold text-text">{lang.nativeName}</p>
                      {lang.nativeName !== lang.name && (
                        <p className="font-body text-[10px] text-text-muted">{lang.name}</p>
                      )}
                    </div>
                    <p className="font-body text-[10px] text-text-muted">{lang.region}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isCurrent && (
                      <span className="font-body text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}>Active</span>
                    )}
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: isSelected ? '#0066FF' : 'rgba(175,197,255,0.25)' }}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Preview */}
        {preview && (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Preview</p>
            <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{preview.flag}</span>
                <div>
                  <p className="font-body text-[10px] text-text-muted">App will appear in</p>
                  <p className="font-display text-sm font-extrabold text-text">{preview.nativeName}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { key: 'greeting', label: 'Home greeting' },
                  { key: 'balance',  label: 'Balance label' },
                  { key: 'send',     label: 'Send button'   },
                ].map(row => (
                  <div key={row.key} className="flex items-center justify-between">
                    <p className="font-body text-[10px] text-text-muted">{row.label}</p>
                    <p className="font-body text-xs font-semibold text-text">{preview.preview[row.key as keyof typeof preview.preview]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Apply */}
        {applied2 ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Language applied</p>
          </div>
        ) : (
          <button onClick={handleApply} disabled={applying || selected === applied}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
            style={{ background: 'var(--gradient-primary)' }}>
            {applying ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {selected === applied ? "Language Applied" : "Apply Language"}
            </>}
          </button>
        )}
      </div>
    </div>
  )
}
