import { useState, useRef, useEffect } from 'react'
import Pulse from '@/components/Pulse'
import ainaSrc from '@/imports/Aina.png.jpeg'

type Role = 'user' | 'aina'

interface DataRow { label: string; value: string }

interface Message {
  id: string
  role: Role
  text: string
  time: string
  dataRows?: DataRow[]
}

const INITIAL_MESSAGES: Message[] = []

const QUICK_PROMPTS = [
  "How's my revenue this month?",
  'Show me my top customers',
  'When should I schedule my payout?',
  'Flag any unusual activity',
]

const AINA_RESPONSES: Record<string, string> = {
  "show me my top customers": "Your top three customers this month by spend: Office Supplies Co ($2,480), Sunrise Café ($1,860), and Peak Media Ltd ($1,560). Together they represent 15% of total revenue. Office Supplies Co is overdue for their next order by 2 days — worth a follow-up.",
  "when should i schedule my payout?": "Based on your current balance of $543.50 and historical cash needs, I'd recommend scheduling a payout today before the 4 PM cut-off. That puts funds in Chase ••4821 by Thursday, which aligns with your typical end-of-week operating expenses.",
  "flag any unusual activity": "Two things worth reviewing: (1) A refund of $45 on order #ORD-4201 was processed today — first refund in 34 days. (2) Your Wednesday revenue of $890 is 56% below your weekly average — this has happened three Wednesdays in a row. I'd suggest testing a midweek promotion.",
}

function getAinaResponse(input: string): string {
  const key = input.toLowerCase().trim()
  for (const [k, v] of Object.entries(AINA_RESPONSES)) {
    if (key.includes(k.split(' ')[0]) || key === k) return v
  }
  return "I've noted that. Let me pull the relevant data from your account and prepare a response. One moment."
}

function AinaBubble({ msg }: { msg: Message }) {
  return (
    <div className="flex items-end gap-2.5 mb-4">
      <img
        src={ainaSrc}
        alt="Aina"
        className="w-8 h-8 rounded-[10px] object-cover shrink-0 self-end"
        style={{
          border: '1.5px solid rgba(0,102,255,0.5)',
          boxShadow: '0 0 0 2px rgba(0,102,255,0.15), 0 0 10px rgba(0,102,255,0.35)',
        }}
      />
      <div className="max-w-[78%] flex flex-col gap-1.5">
        <div
          className="px-4 py-3"
          style={{
            background: 'linear-gradient(135deg, rgba(0,30,90,0.95) 0%, rgba(10,22,70,0.98) 100%)',
            border: '1px solid rgba(0,102,255,0.22)',
            borderRadius: '16px 16px 16px 4px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
          }}
        >
          <p className="font-body text-xs text-text leading-relaxed">{msg.text}</p>
          {msg.dataRows && msg.dataRows.length > 0 && (
            <div
              className="mt-2.5 pt-2.5 flex gap-2"
              style={{ borderTop: '1px solid rgba(175,197,255,0.1)' }}
            >
              {msg.dataRows.map((row, i) => (
                <div key={i} className="flex-1 text-center">
                  <p className="font-mono text-[11px] font-bold text-white">{row.value}</p>
                  <p className="font-body text-[9px] text-text-muted mt-0.5">{row.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="font-body text-[9px] text-text-muted pl-1">{msg.time}</p>
      </div>
    </div>
  )
}

function UserBubble({ msg }: { msg: Message }) {
  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-[72%] flex flex-col items-end gap-1">
        <div
          className="px-4 py-3"
          style={{
            background: 'var(--gradient-primary)',
            borderRadius: '16px 4px 16px 16px',
            boxShadow: '0 4px 14px rgba(0,102,255,0.3)',
          }}
        >
          <p className="font-body text-xs text-white leading-relaxed">{msg.text}</p>
        </div>
        <p className="font-body text-[9px] text-text-muted pr-1">{msg.time}</p>
      </div>
    </div>
  )
}

interface AinaChatProps {
  onBack?: () => void
  onHistory?: () => void
  onVoice?: () => void
}

export default function AinaChat({ onBack, onHistory, onVoice }: AinaChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [showQuickPrompts, setShowQuickPrompts] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, thinking])

  const now = () => {
    const d = new Date()
    const h = d.getHours() % 12 || 12
    const m = d.getMinutes().toString().padStart(2, '0')
    const ap = d.getHours() < 12 ? 'AM' : 'PM'
    return `${h}:${m} ${ap}`
  }

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: trimmed,
      time: now(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setShowQuickPrompts(false)
    setThinking(true)

    const delay = 1400 + Math.random() * 600
    setTimeout(() => {
      setThinking(false)
      const ainaMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'aina',
        text: getAinaResponse(trimmed),
        time: now(),
      }
      setMessages(prev => [...prev, ainaMsg])
    }, delay)
  }

  const handleSend = () => sendMessage(input)
  const handleQuickPrompt = (p: string) => sendMessage(p)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col bg-bg" style={{ height: 785 }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-4 pb-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(175,197,255,0.08)' }}
      >
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-3 flex-1">
          <div className="relative shrink-0">
            <img
              src={ainaSrc}
              alt="Aina"
              className="w-10 h-10 rounded-[13px] object-cover"
              style={{
                border: '1.5px solid rgba(0,102,255,0.6)',
                boxShadow: '0 0 0 3px rgba(0,102,255,0.12), 0 0 16px rgba(0,102,255,0.4)',
              }}
            />
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
              style={{ background: '#22C55E', border: '1.5px solid var(--color-bg)', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }}
            />
          </div>
          <div>
            <p className="font-display text-sm font-extrabold text-text tracking-tight">Aina</p>
            <p className="font-body text-[10px]" style={{ color: thinking ? '#3FE7FF' : 'rgba(175,197,255,0.55)' }}>
              {thinking ? 'Analysing…' : 'Business AI · Online'}
            </p>
          </div>
        </div>

        <button
          onClick={onVoice}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="6.5" y="1.5" width="5" height="8" rx="2.5" stroke="rgba(175,197,255,0.55)" strokeWidth="1.3" />
            <path d="M3.5 8.5a5.5 5.5 0 0 0 11 0M9 15v2" stroke="rgba(175,197,255,0.55)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={onHistory}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" />
            <path d="M9 5v4.5l2.5 2.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pt-4"
        style={{ scrollbarWidth: 'none', paddingBottom: showQuickPrompts ? 188 : 76 }}
      >
        {/* AI disclosure — shown at top of every session */}
        <div className="flex items-center justify-center py-1 mb-2">
          <p className="font-body text-[9px] text-center px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.15)', color: 'rgba(175,197,255,0.4)' }}>
            You are chatting with Aina, an AI assistant — not a human advisor
          </p>
        </div>
        {messages.map(msg =>
          msg.role === 'aina'
            ? <AinaBubble key={msg.id} msg={msg} />
            : <UserBubble key={msg.id} msg={msg} />
        )}

        {/* Pulse thinking indicator */}
        {thinking && (
          <div className="flex items-end gap-2.5 mb-4">
            <img
              src={ainaSrc}
              alt="Aina"
              className="w-8 h-8 rounded-[10px] object-cover shrink-0"
              style={{ border: '1.5px solid rgba(0,102,255,0.5)', boxShadow: '0 0 10px rgba(0,102,255,0.35)' }}
            />
            <div
              className="px-4 py-2.5"
              style={{
                background: 'linear-gradient(135deg, rgba(0,30,90,0.95), rgba(10,22,70,0.98))',
                border: '1px solid rgba(0,102,255,0.22)',
                borderRadius: '16px 16px 16px 4px',
              }}
            >
              <Pulse trigger={thinking} />
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      {showQuickPrompts && (
        <div className="px-4 pb-2 flex flex-col gap-1.5 shrink-0">
          {QUICK_PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => handleQuickPrompt(p)}
              className="w-full px-3 py-2.5 text-left rounded-[--radius-xl] font-body text-xs transition-all active:scale-[0.99]"
              style={{
                background: 'rgba(0,30,80,0.8)',
                border: '1px solid rgba(0,102,255,0.2)',
                color: 'rgba(175,197,255,0.8)',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div
        className="px-4 pt-2 pb-4 shrink-0"
        style={{ borderTop: '1px solid rgba(175,197,255,0.07)' }}
      >
        <div
          className="flex items-center gap-2 px-3 rounded-[20px]"
          style={{
            background: 'rgba(175,197,255,0.05)',
            border: '1px solid rgba(175,197,255,0.14)',
            minHeight: 44,
          }}
        >
          {/* Attachment */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-surface shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8a6 6 0 0 1-6 6 4 4 0 0 1-4-4V4.5a2.5 2.5 0 0 1 5 0v5a1 1 0 0 1-2 0v-4" stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>

          {/* Quick prompts toggle */}
          <button
            onClick={() => setShowQuickPrompts(p => !p)}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all shrink-0"
            style={{ background: showQuickPrompts ? 'rgba(0,102,255,0.15)' : 'transparent' }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 4h11M2 7.5h7M2 11h5" stroke={showQuickPrompts ? '#3FE7FF' : 'rgba(175,197,255,0.45)'} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>

          <input
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none py-2.5"
            placeholder="Ask Aina anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={thinking}
          />

          {/* Voice */}
          <button
            onClick={onVoice}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-surface shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" />
              <path d="M3 7.5a5 5 0 0 0 10 0M8 13.5v1.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || thinking}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all shrink-0"
            style={{
              background: input.trim() && !thinking ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.08)',
              boxShadow: input.trim() && !thinking ? '0 2px 10px rgba(0,102,255,0.35)' : 'none',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M8 4l3 3-3 3"
                stroke={input.trim() && !thinking ? 'white' : 'rgba(175,197,255,0.3)'}
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p className="font-body text-[10px] text-center mt-2 leading-relaxed px-2"
          style={{ color: 'rgba(175,197,255,0.35)' }}>
          Aina provides general business guidance only. Always confirm important financial decisions with a qualified professional or contact support.
        </p>
      </div>
    </div>
  )
}
