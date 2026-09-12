import { useState, useRef, useEffect } from 'react'
import Pulse from '@/components/Pulse'
import finaSrc from '@/imports/Fina.png.jpeg'

interface Message {
  id: string
  role: 'user' | 'fina'
  text: string
  time: string
  saved?: boolean
}

const INITIAL_MESSAGES: Message[] = []

const SUGGESTIONS = [
  "Am I on track for goals?",
  "Analyze my spending",
  "Schedule a transfer",
  "What's coming up?",
]

interface FinaChatProps {
  onBack?: () => void
  onHistory?: () => void
  onVoice?: () => void
}

export default function FinaChat({ onBack, onHistory, onVoice }: FinaChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [pulseTrigger, setPulseTrigger] = useState(false)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isThinking])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: Message = { id: `u${Date.now()}`, role: 'user', text: trimmed, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsThinking(true)
    setPulseTrigger(false)
    setTimeout(() => setPulseTrigger(true), 60)

    setTimeout(() => {
      setIsThinking(false)
      const reply: Message = {
        id: `f${Date.now()}`,
        role: 'fina',
        text: "Great question! Let me pull that up for you right now.",
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, reply])
    }, 2200)
  }

  const toggleSave = (id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col bg-bg" style={{ height: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(175,197,255,0.08)', background: 'rgba(5,11,45,0.95)', backdropFilter: 'blur(20px)' }}>
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Fina avatar */}
        <div className="relative shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden"
            style={{ border: '2px solid rgba(0,102,255,0.5)', boxShadow: '0 0 12px rgba(63,231,255,0.4)', background: 'linear-gradient(135deg, #0066FF, #3FE7FF)' }}>
            <img src={finaSrc} alt="Fina" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-bg"
            style={{ background: '#22C55E' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-extrabold text-text tracking-tight">Fina</p>
          <p className="font-body text-[10px] text-text-muted">AI Financial Assistant · always available</p>
        </div>
        <button onClick={onVoice}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="6.5" y="1.5" width="5" height="9" rx="2.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
            <path d="M3 8.5a6 6 0 0 0 12 0" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="9" y1="14.5" x2="9" y2="16.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="16.5" x2="12" y2="16.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
        <button onClick={onHistory}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
            <path d="M8 5v3l2 2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Message list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {/* AI disclosure — shown at top of every session */}
        <div className="flex items-center justify-center py-1">
          <p className="font-body text-[9px] text-center px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(63,231,255,0.06)', border: '1px solid rgba(63,231,255,0.12)', color: 'rgba(175,197,255,0.4)' }}>
            You are chatting with Fina, an AI assistant — not a human advisor
          </p>
        </div>
        {messages.map((msg, i) => (
          <div key={msg.id} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {/* Show Fina avatar for first of a run */}
            {msg.role === 'fina' && (i === 0 || messages[i - 1].role === 'user') && (
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0"
                  style={{ border: '1px solid rgba(0,102,255,0.45)', boxShadow: '0 0 8px rgba(63,231,255,0.25)', background: 'linear-gradient(135deg, #0066FF, #3FE7FF)' }}>
                  <img src={finaSrc} alt="Fina" className="w-full h-full object-cover" />
                </div>
                <p className="font-body text-[10px] font-semibold" style={{ color: '#3FE7FF' }}>Fina</p>
              </div>
            )}
            <div className="flex items-end gap-2 max-w-[82%]">
              {/* Bubble */}
              <div
                className="px-4 py-3 relative"
                style={{
                  borderRadius: msg.role === 'fina' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  background: msg.role === 'fina'
                    ? 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))'
                    : 'var(--gradient-primary)',
                  border: msg.role === 'fina' ? '1px solid rgba(0,102,255,0.25)' : 'none',
                  boxShadow: msg.role === 'user' ? '0 4px 16px rgba(0,102,255,0.35)' : '0 2px 12px rgba(0,0,0,0.3)',
                }}
              >
                <p className="font-body text-sm text-white leading-relaxed" style={{ color: 'rgba(255,255,255,0.95)' }}>
                  {msg.text}
                </p>
              </div>
              {/* Save button for Fina messages */}
              {msg.role === 'fina' && (
                <button onClick={() => toggleSave(msg.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-full transition-all shrink-0"
                  style={{ background: savedIds.has(msg.id) ? 'rgba(63,231,255,0.15)' : 'rgba(175,197,255,0.06)', border: `1px solid ${savedIds.has(msg.id) ? 'rgba(63,231,255,0.35)' : 'rgba(175,197,255,0.12)'}` }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 1h6a.5.5 0 0 1 .5.5v7.7l-3.5-2-3.5 2V1.5A.5.5 0 0 1 2 1Z"
                      fill={savedIds.has(msg.id) ? '#3FE7FF' : 'none'}
                      stroke={savedIds.has(msg.id) ? '#3FE7FF' : 'rgba(175,197,255,0.5)'}
                      strokeWidth="1" />
                  </svg>
                </button>
              )}
            </div>
            <p className="font-body text-[9px] text-text-muted px-1">{msg.time}</p>
          </div>
        ))}

        {/* Pulse typing indicator */}
        {isThinking && (
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'var(--gradient-primary)' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="3" r="1.4" fill="white" />
                  <path d="M2 8.5C2 6.6 3.3 5 5 5s3 1.6 3 3.5" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <p className="font-body text-[10px] font-semibold" style={{ color: '#3FE7FF' }}>Fina is thinking…</p>
            </div>
            <div className="px-4 py-3 flex items-center gap-3"
              style={{ borderRadius: '4px 16px 16px 16px', background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.25)' }}>
              <Pulse trigger={pulseTrigger} width={100} height={28} color="#3FE7FF" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      <div className="px-4 pb-2 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => sendMessage(s)}
              className="shrink-0 h-8 px-3 rounded-full font-body text-xs font-semibold transition-all duration-[150ms] whitespace-nowrap hover:border-[rgba(0,102,255,0.45)]"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.65)' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="px-4 pb-5 shrink-0">
        <div className="flex items-end gap-2 px-3 py-2 rounded-[--radius-2xl]"
          style={{ background: 'rgba(13,26,74,0.9)', border: '1px solid rgba(0,102,255,0.25)', backdropFilter: 'blur(20px)' }}>
          {/* Attachment */}
          <button className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 transition-all hover:bg-surface-hi">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 9V5a5 5 0 1 1 10 0v5a3.5 3.5 0 1 1-7 0V5.5a2 2 0 0 1 4 0V10" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Text input */}
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
            placeholder="Ask Fina anything…"
            rows={1}
            className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none resize-none py-1 leading-relaxed"
            style={{ maxHeight: 96 }}
          />
          {/* Voice */}
          <button onClick={onVoice} className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 transition-all hover:bg-surface-hi">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" />
              <path d="M3 7.5a5 5 0 0 0 10 0" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="8" y1="12.5" x2="8" y2="14.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          {/* Send */}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isThinking}
            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 transition-all duration-[150ms] disabled:opacity-30"
            style={{ background: input.trim() ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.08)', boxShadow: input.trim() ? '0 4px 12px rgba(0,102,255,0.4)' : 'none' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 7l5-5 5 5M6.5 2v10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="font-body text-[10px] text-center mt-2 leading-relaxed px-2"
          style={{ color: 'rgba(175,197,255,0.35)' }}>
          Fina provides general guidance only. Always confirm important financial decisions with a qualified professional or contact support.
        </p>
      </div>
    </div>
  )
}
