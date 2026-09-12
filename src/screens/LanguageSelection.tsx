import { useState, useMemo } from 'react'

interface LangOption {
  code: string
  englishName: string
  nativeName: string
  region: string
  flag: string
  rtl?: boolean
  preview: { greeting: string; balance: string; send: string; date: string }
}

const LANGUAGES: LangOption[] = [
  // English
  { code: 'en-US', englishName: 'English', nativeName: 'English', region: 'United States', flag: '🇺🇸', preview: { greeting: 'Good morning, Maya', balance: 'Total Balance', send: 'Send Money', date: 'Aug 31, 2026' } },
  { code: 'en-GB', englishName: 'English', nativeName: 'English', region: 'United Kingdom', flag: '🇬🇧', preview: { greeting: 'Good morning, Maya', balance: 'Total Balance', send: 'Send Money', date: '31 Aug 2026' } },
  { code: 'en-AU', englishName: 'English', nativeName: 'English', region: 'Australia', flag: '🇦🇺', preview: { greeting: 'Good morning, Maya', balance: 'Total Balance', send: 'Send Money', date: '31 Aug 2026' } },
  // European
  { code: 'es',    englishName: 'Spanish',    nativeName: 'Español',    region: 'España', flag: '🇪🇸', preview: { greeting: 'Buenos días, Maya', balance: 'Saldo Total', send: 'Enviar Dinero', date: '31 ago. 2026' } },
  { code: 'es-419',englishName: 'Spanish',    nativeName: 'Español',    region: 'América Latina', flag: '🌎', preview: { greeting: 'Buenos días, Maya', balance: 'Saldo Total', send: 'Enviar', date: '31 ago. 2026' } },
  { code: 'fr',    englishName: 'French',     nativeName: 'Français',   region: 'France', flag: '🇫🇷', preview: { greeting: 'Bonjour, Maya', balance: 'Solde Total', send: 'Envoyer', date: '31 août 2026' } },
  { code: 'de',    englishName: 'German',     nativeName: 'Deutsch',    region: 'Deutschland', flag: '🇩🇪', preview: { greeting: 'Guten Morgen, Maya', balance: 'Gesamtguthaben', send: 'Geld senden', date: '31. Aug. 2026' } },
  { code: 'it',    englishName: 'Italian',    nativeName: 'Italiano',   region: 'Italia', flag: '🇮🇹', preview: { greeting: 'Buongiorno, Maya', balance: 'Saldo Totale', send: 'Invia Denaro', date: '31 ago 2026' } },
  { code: 'pt',    englishName: 'Portuguese', nativeName: 'Português',  region: 'Brasil', flag: '🇧🇷', preview: { greeting: 'Bom dia, Maya', balance: 'Saldo Total', send: 'Enviar Dinheiro', date: '31 de ago. de 2026' } },
  { code: 'nl',    englishName: 'Dutch',      nativeName: 'Nederlands', region: 'Nederland', flag: '🇳🇱', preview: { greeting: 'Goedemorgen, Maya', balance: 'Totaal Saldo', send: 'Geld sturen', date: '31 aug. 2026' } },
  { code: 'pl',    englishName: 'Polish',     nativeName: 'Polski',     region: 'Polska', flag: '🇵🇱', preview: { greeting: 'Dzień dobry, Maya', balance: 'Całkowite saldo', send: 'Wyślij pieniądze', date: '31 sie 2026' } },
  { code: 'ru',    englishName: 'Russian',    nativeName: 'Русский',    region: 'Россия', flag: '🇷🇺', preview: { greeting: 'Доброе утро, Maya', balance: 'Общий баланс', send: 'Отправить', date: '31 авг. 2026' } },
  { code: 'tr',    englishName: 'Turkish',    nativeName: 'Türkçe',     region: 'Türkiye', flag: '🇹🇷', preview: { greeting: 'Günaydın, Maya', balance: 'Toplam Bakiye', send: 'Para Gönder', date: '31 Ağu 2026' } },
  // Middle East / South Asia
  { code: 'ar',    englishName: 'Arabic',     nativeName: 'العربية',    region: 'العربية', flag: '🇸🇦', rtl: true, preview: { greeting: 'صباح الخير، Maya', balance: 'الرصيد الكلي', send: 'إرسال الأموال', date: '٣١ أغسطس ٢٠٢٦' } },
  { code: 'fa',    englishName: 'Persian',    nativeName: 'فارسی',      region: 'ایران', flag: '🇮🇷', rtl: true, preview: { greeting: 'صبح بخیر، Maya', balance: 'موجودی کل', send: 'ارسال پول', date: '٩ شهریور ١۴٠۵' } },
  { code: 'hi',    englishName: 'Hindi',      nativeName: 'हिन्दी',      region: 'भारत', flag: '🇮🇳', preview: { greeting: 'सुप्रभात, Maya', balance: 'कुल शेष राशि', send: 'पैसे भेजें', date: '३१ अगस्त २०२६' } },
  { code: 'ur',    englishName: 'Urdu',       nativeName: 'اردو',        region: 'پاکستان', flag: '🇵🇰', rtl: true, preview: { greeting: 'صبح بخیر، Maya', balance: 'کل بیلنس', send: 'پیسے بھیجیں', date: '۳۱ اگست ۲۰۲۶' } },
  { code: 'bn',    englishName: 'Bengali',    nativeName: 'বাংলা',       region: 'বাংলাদেশ', flag: '🇧🇩', preview: { greeting: 'শুভ সকাল, Maya', balance: 'মোট ব্যালেন্স', send: 'টাকা পাঠান', date: '৩১ আগ ২০২৬' } },
  // East Asia
  { code: 'zh-CN', englishName: 'Chinese',    nativeName: '中文',        region: '简体中文', flag: '🇨🇳', preview: { greeting: '早上好，Maya', balance: '总余额', send: '转账', date: '2026年8月31日' } },
  { code: 'zh-TW', englishName: 'Chinese',    nativeName: '中文',        region: '繁體中文', flag: '🇹🇼', preview: { greeting: '早安，Maya', balance: '總餘額', send: '轉帳', date: '2026年8月31日' } },
  { code: 'ja',    englishName: 'Japanese',   nativeName: '日本語',      region: '日本', flag: '🇯🇵', preview: { greeting: 'おはようございます、Maya', balance: '総残高', send: '送金', date: '2026年8月31日' } },
  { code: 'ko',    englishName: 'Korean',     nativeName: '한국어',       region: '한국', flag: '🇰🇷', preview: { greeting: '좋은 아침이에요, Maya', balance: '총 잔액', send: '송금', date: '2026년 8월 31일' } },
  { code: 'vi',    englishName: 'Vietnamese', nativeName: 'Tiếng Việt',  region: 'Việt Nam', flag: '🇻🇳', preview: { greeting: 'Chào buổi sáng, Maya', balance: 'Số dư tổng', send: 'Gửi tiền', date: '31 thg 8, 2026' } },
  { code: 'th',    englishName: 'Thai',       nativeName: 'ภาษาไทย',    region: 'ประเทศไทย', flag: '🇹🇭', preview: { greeting: 'อรุณสวัสดิ์ Maya', balance: 'ยอดรวม', send: 'โอนเงิน', date: '31 ส.ค. 2026' } },
  { code: 'id',    englishName: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'Indonesia', flag: '🇮🇩', preview: { greeting: 'Selamat pagi, Maya', balance: 'Total Saldo', send: 'Kirim Uang', date: '31 Agu 2026' } },
  { code: 'ms',    englishName: 'Malay',      nativeName: 'Bahasa Melayu', region: 'Malaysia', flag: '🇲🇾', preview: { greeting: 'Selamat pagi, Maya', balance: 'Jumlah Baki', send: 'Hantar Wang', date: '31 Ogos 2026' } },
  // Africa
  { code: 'sw',    englishName: 'Swahili',    nativeName: 'Kiswahili',   region: 'Afrika Mashariki', flag: '🇰🇪', preview: { greeting: 'Habari za asubuhi, Maya', balance: 'Jumla ya Akaunti', send: 'Tuma Pesa', date: '31 Ago 2026' } },
  { code: 'ha',    englishName: 'Hausa',      nativeName: 'Hausa',       region: 'Yammacin Afirka', flag: '🇳🇬', preview: { greeting: 'Ina kwana, Maya', balance: 'Jimlar Lissafi', send: 'Aika Kudi', date: "Aug 31, 2026" } },
]

const SCRIPT_GROUPS: { label: string; codes: string[] }[] = [
  { label: 'Latin script',      codes: ['en-US','en-GB','en-AU','es','es-419','fr','de','it','pt','nl','pl','tr','vi','id','ms','sw','ha'] },
  { label: 'Cyrillic',          codes: ['ru'] },
  { label: 'Arabic / RTL',      codes: ['ar','fa','ur'] },
  { label: 'Devanagari',        codes: ['hi'] },
  { label: 'Bengali',           codes: ['bn'] },
  { label: 'CJK & East Asian',  codes: ['zh-CN','zh-TW','ja','ko','th'] },
]

interface LanguageSelectionProps {
  onBack?: () => void
  onApply?: (code: string) => void
  currentCode?: string
}

export default function LanguageSelection({ onBack, onApply, currentCode = 'en-US' }: LanguageSelectionProps) {
  const [selected, setSelected] = useState(currentCode)
  const [applied, setApplied] = useState(currentCode)
  const [search, setSearch] = useState('')
  const [applying, setApplying] = useState(false)
  const [justApplied, setJustApplied] = useState(false)
  const [groupBy, setGroupBy] = useState<'script' | 'az'>('az')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return LANGUAGES
    return LANGUAGES.filter(l =>
      l.nativeName.toLowerCase().includes(q) ||
      l.englishName.toLowerCase().includes(q) ||
      l.region.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    )
  }, [search])

  const grouped = useMemo(() => {
    if (groupBy === 'az' || search) {
      return [{ label: '', langs: filtered }]
    }
    return SCRIPT_GROUPS.map(g => ({
      label: g.label,
      langs: LANGUAGES.filter(l => g.codes.includes(l.code)),
    })).filter(g => g.langs.length > 0)
  }, [filtered, groupBy, search])

  const preview = LANGUAGES.find(l => l.code === selected)

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Language</p>
          <p className="font-body text-[10px] text-text-muted">
            {LANGUAGES.find(l => l.code === applied)?.nativeName ?? 'English'} — active
          </p>
        </div>
        {/* Group toggle */}
        <div className="flex rounded-full overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.12)' }}>
          {(['az', 'script'] as const).map(mode => (
            <button key={mode}
              onClick={() => setGroupBy(mode)}
              className="px-3 h-8 font-body text-[11px] font-semibold transition-all"
              style={{
                background: groupBy === mode ? 'rgba(0,102,255,0.18)' : 'transparent',
                color: groupBy === mode ? '#4D9FFF' : 'rgba(175,197,255,0.45)',
              }}>
              {mode === 'az' ? 'A–Z' : 'Script'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

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
            placeholder="Search language or region…"
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

        {/* Live preview card */}
        {preview && (
          <div
            className="px-4 py-4 rounded-[--radius-2xl]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,30,80,0.7) 0%, rgba(10,20,50,0.85) 100%)',
              border: '1px solid rgba(0,102,255,0.2)',
              boxShadow: '0 0 20px rgba(0,102,255,0.1)',
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xl">{preview.flag}</span>
              <div className="flex-1">
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(77,159,255,0.7)' }}>
                  Live preview
                </p>
                <p className="font-display text-sm font-extrabold text-text">
                  {preview.nativeName}
                  {preview.englishName !== preview.nativeName && (
                    <span className="font-body text-[11px] font-normal text-text-muted ml-1.5">{preview.englishName}</span>
                  )}
                  {preview.rtl && (
                    <span className="ml-2 px-1.5 py-0.5 rounded font-body text-[9px] font-bold"
                      style={{ background: 'rgba(245,183,0,0.1)', color: '#F5B700' }}>RTL</span>
                  )}
                </p>
              </div>
              {selected === applied && (
                <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold"
                  style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
                  Active
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2" dir={preview.rtl ? 'rtl' : 'ltr'}>
              {[
                { label: 'Greeting', value: preview.preview.greeting },
                { label: 'Label',    value: preview.preview.balance },
                { label: 'Action',   value: preview.preview.send },
                { label: 'Date',     value: preview.preview.date },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between gap-4">
                  <p className="font-body text-[10px] text-text-muted shrink-0">{row.label}</p>
                  <p className="font-body text-xs font-semibold text-text truncate">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Language list(s) */}
        {grouped.map((group, gi) => (
          <div key={gi}>
            {group.label && (
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2.5 px-0.5">
                {group.label}
              </p>
            )}
            <div className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.01)' }}>
              {group.langs.map((lang, i) => {
                const isSel = selected === lang.code
                const isCur = applied === lang.code
                return (
                  <button key={lang.code} onClick={() => { setSelected(lang.code); setJustApplied(false) }}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left transition-all"
                    style={{
                      background: isSel ? 'rgba(0,102,255,0.07)' : 'transparent',
                      borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none',
                    }}>
                    <span className="text-lg shrink-0 w-8 text-center">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-body text-sm font-semibold text-text">{lang.nativeName}</p>
                        {lang.rtl && (
                          <span className="font-body text-[9px] px-1 py-0.5 rounded"
                            style={{ background: 'rgba(245,183,0,0.08)', color: 'rgba(245,183,0,0.7)' }}>RTL</span>
                        )}
                      </div>
                      <p className="font-body text-[10px] text-text-muted truncate">{lang.region}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
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

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="font-body text-sm text-text-muted">No languages match "{search}"</p>
          </div>
        )}

        {/* Apply */}
        {justApplied ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2 transition-all"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Language applied</p>
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
                {selected === applied ? 'Language applied' : 'Apply language'}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
