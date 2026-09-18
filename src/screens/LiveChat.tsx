import { useState, useRef, useEffect } from 'react'
import Pulse from '@/components/Pulse'
import finaSrc from '@/imports/Fina.png.jpeg'
import ainaSrc from '@/imports/Aina.png.jpeg'

type Sender = 'ai' | 'user' | 'system' | 'agent'

interface ChatMessage {
  id: string
  sender: Sender
  text: string
  time: string
  agentName?: string
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1', sender: 'system',
    text: "You're connected to Fina, your ChangeAIPay AI assistant. Describe your issue and Fina will help — or escalate to a human agent if needed.",
    time: '2:14 PM',
  },
  {
    id: '2', sender: 'ai',
    text: "Hi! I'm Fina. What can I help you with today?",
    time: '2:14 PM',
  },
]

const QUICK_REPLIES = [
  "My payment was declined",
  "I need to verify my identity",
  "Transaction dispute",
  "Account locked",
]

const AI_RESPONSES: Record<string, string> = {
  default: "I understand. Let me pull up the details for that and check what might be going on. Can you give me the approximate date and amount of the transaction you're referring to?",
  declined: "Payments can be declined for a few reasons — insufficient balance, fraud detection, or an unsupported recipient. I can look into this directly. Which payment was declined, and approximately when?",
  verify: "Identity verification happens in Profile → Verification. You'll need a government-issued ID and a selfie. The process usually takes under five minutes. Would you like me to walk you through the steps?",
  dispute: "For a transaction dispute, I'll need the transaction date, merchant name, and the amount. I can flag it for our disputes team right now. What are the details?",
  locked: "I can see your account status. If your account was locked by our security system, I can initiate a review. First, can you confirm the email address on your account?",
}

function getResponse(msg: string): string {
  const l = msg.toLowerCase()
  if (l.includes('decline') || l.includes('declined')) return AI_RESPONSES.declined
  if (l.includes('verif') || l.includes('kyc')) return AI_RESPONSES.verify
  if (l.includes('dispute') || l.includes('chargeback')) return AI_RESPONSES.dispute
  if (l.includes('lock') || l.includes('locked') || l.includes('access')) return AI_RESPONSES.locked
  return AI_RESPONSES.default
}

interface LiveChatProps {
  onBack?: () => void
  aiAssistant?: 'fina' | 'aina'
}

export default function LiveChat({ onBack, aiAssistant = 'fina' }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [humanJoined, setHumanJoined] = useState(false)
  const [handoffRequested, setHandoffRequested] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const aiName = aiAssistant === 'aina' ? 'Aina' : 'Fina'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  const sendMessage = (text: string) => {
    if (!text.trim() || thinking) return
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setThinking(true)

    const delay = 1400 + Math.random() * 800
    setTimeout(() => {
      setThinking(false)
      const response = humanJoined
        ? "Thanks for that information. I'm looking into it now and will update you shortly — please give me a moment."
        : getResponse(text)
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: humanJoined ? 'agent' : 'ai',
        text: response,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        agentName: humanJoined ? 'Maya · Support' : undefined,
      }
      setMessages(prev => [...prev, aiMsg])
    }, delay)
  }

  const requestHuman = () => {
    if (handoffRequested) return
    setHandoffRequested(true)
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      const handoffMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'system',
        text: "Connecting you to a human agent... Est. wait: under 2 minutes.",
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, handoffMsg])
      setTimeout(() => {
        setHumanJoined(true)
        const joinMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'system',
          text: "Maya from the support team has joined the chat. You can continue the conversation normally.",
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        }
        setMessages(prev => [...prev, joinMsg])
        const agentMsg: ChatMessage = {
          id: (Date.now() + 2).toString(),
          sender: 'agent',
          text: "Hi there! I'm Maya from ChangeAIPay support. I've reviewed the conversation so far — happy to take it from here. What else can I help you with?",
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          agentName: 'Maya · Support',
        }
        setTimeout(() => {
          setMessages(prev => [...prev, agentMsg])
        }, 600)
      }, 3000)
    }, 1200)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ height: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden relative"
          style={{ border: `1.5px solid ${humanJoined ? 'rgba(34,197,94,0.4)' : aiAssistant === 'aina' ? 'rgba(63,231,255,0.4)' : 'rgba(63,231,255,0.3)'}` }}>
          {humanJoined ? (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.08))' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="6" r="3" stroke="#22C55E" strokeWidth="1.1" />
                <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </div>
          ) : (
            <img src={aiAssistant === 'aina' ? ainaSrc : finaSrc} alt={aiName} className="w-full h-full object-cover" />
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
            style={{ background: '#22C55E', border: '1.5px solid var(--color-bg)' }} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-body text-sm font-semibold text-text">
            {humanJoined ? 'Maya · Support' : `${aiName} · AI Support`}
          </p>
          <p className="font-body text-[10px]" style={{ color: '#22C55E' }}>
            {thinking ? 'Typing...' : 'Online'}
          </p>
        </div>

        {!humanJoined && !handoffRequested && (
          <button onClick={requestHuman}
            className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all shrink-0"
            style={{ background: 'rgba(175,197,255,0.06)', color: 'rgba(175,197,255,0.6)', border: '1px solid rgba(175,197,255,0.12)' }}>
            Get agent
          </button>
        )}
        {handoffRequested && !humanJoined && (
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F5B700' }} />
            <p className="font-body text-[10px]" style={{ color: '#F5B700' }}>Connecting</p>
          </div>
        )}
      </div>

      {/* Human joined banner */}
      {humanJoined && (
        <div className="mx-5 mt-3 flex items-center gap-2 px-3 py-2 rounded-[--radius-xl] shrink-0"
          style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}>
          <div className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }} />
          <p className="font-body text-[10px]" style={{ color: '#22C55E' }}>
            Human agent active · Maya is reviewing your full conversation
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {messages.map(msg => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="max-w-[85%] px-3 py-2 rounded-[--radius-xl]"
                  style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}>
                  <p className="font-body text-[10px] text-text-muted text-center leading-relaxed">{msg.text}</p>
                </div>
              </div>
            )
          }

          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[80%] flex flex-col gap-1 items-end">
                  <div className="px-4 py-3 rounded-[20px_20px_4px_20px]"
                    style={{ background: 'linear-gradient(135deg, #0066FF, #4D9FFF)', boxShadow: '0 2px 12px rgba(0,102,255,0.2)' }}>
                    <p className="font-body text-sm text-white leading-relaxed">{msg.text}</p>
                  </div>
                  <p className="font-body text-[9px] text-text-muted">{msg.time}</p>
                </div>
              </div>
            )
          }

          if (msg.sender === 'agent') {
            return (
              <div key={msg.id} className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="4.5" r="2" stroke="#22C55E" strokeWidth="1" />
                    <path d="M1.5 10.5c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5" stroke="#22C55E" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1 flex flex-col gap-1 max-w-[78%]">
                  {msg.agentName && (
                    <p className="font-body text-[9px] font-semibold" style={{ color: '#22C55E' }}>{msg.agentName}</p>
                  )}
                  <div className="px-4 py-3 rounded-[4px_20px_20px_20px]"
                    style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <p className="font-body text-sm text-text leading-relaxed">{msg.text}</p>
                  </div>
                  <p className="font-body text-[9px] text-text-muted">{msg.time}</p>
                </div>
              </div>
            )
          }

          // AI message
          return (
            <div key={msg.id} className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                style={{
                  background: aiAssistant === 'aina' ? 'rgba(0,102,255,0.1)' : 'rgba(153,69,255,0.1)',
                  border: `1px solid ${aiAssistant === 'aina' ? 'rgba(63,231,255,0.2)' : 'rgba(153,69,255,0.2)'}`,
                }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke={aiAssistant === 'aina' ? '#3FE7FF' : '#9945FF'} strokeWidth="0.9" />
                  <path d="M4 6h4M4 8h2.5" stroke={aiAssistant === 'aina' ? '#3FE7FF' : '#9945FF'} strokeWidth="0.9" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 flex flex-col gap-1 max-w-[78%]">
                <p className="font-body text-[9px] font-semibold"
                  style={{ color: aiAssistant === 'aina' ? '#3FE7FF' : '#9945FF' }}>
                  {aiName}
                </p>
                <div className="px-4 py-3 rounded-[4px_20px_20px_20px]"
                  style={{
                    background: aiAssistant === 'aina' ? 'rgba(0,30,80,0.5)' : 'rgba(30,10,60,0.5)',
                    border: `1px solid ${aiAssistant === 'aina' ? 'rgba(63,231,255,0.12)' : 'rgba(153,69,255,0.12)'}`,
                  }}>
                  <p className="font-body text-sm text-text leading-relaxed">{msg.text}</p>
                </div>
                <p className="font-body text-[9px] text-text-muted">{msg.time}</p>
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {thinking && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
              style={{
                background: humanJoined ? 'rgba(34,197,94,0.12)' : aiAssistant === 'aina' ? 'rgba(0,102,255,0.1)' : 'rgba(153,69,255,0.1)',
                border: `1px solid ${humanJoined ? 'rgba(34,197,94,0.2)' : aiAssistant === 'aina' ? 'rgba(63,231,255,0.2)' : 'rgba(153,69,255,0.2)'}`,
              }}>
              {humanJoined ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="4.5" r="2" stroke="#22C55E" strokeWidth="1" />
                  <path d="M1.5 10.5c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5" stroke="#22C55E" strokeWidth="1" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke={aiAssistant === 'aina' ? '#3FE7FF' : '#9945FF'} strokeWidth="0.9" />
                  <path d="M4 6h4M4 8h2.5" stroke={aiAssistant === 'aina' ? '#3FE7FF' : '#9945FF'} strokeWidth="0.9" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div className="px-4 py-3 rounded-[4px_20px_20px_20px] flex items-center"
              style={{
                background: humanJoined ? 'rgba(34,197,94,0.06)' : aiAssistant === 'aina' ? 'rgba(0,30,80,0.5)' : 'rgba(30,10,60,0.5)',
                border: `1px solid ${humanJoined ? 'rgba(34,197,94,0.15)' : aiAssistant === 'aina' ? 'rgba(63,231,255,0.12)' : 'rgba(153,69,255,0.12)'}`,
              }}>
              <Pulse trigger={thinking} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick replies (before first user message) */}
      {messages.length <= 2 && !thinking && (
        <div className="px-5 pb-2 flex gap-2 overflow-x-auto shrink-0" style={{ scrollbarWidth: 'none' }}>
          {QUICK_REPLIES.map((r, i) => (
            <button key={i} onClick={() => sendMessage(r)}
              className="px-3 h-8 rounded-full font-body text-xs whitespace-nowrap shrink-0 transition-all"
              style={{ background: 'rgba(175,197,255,0.06)', color: 'rgba(175,197,255,0.65)', border: '1px solid rgba(175,197,255,0.12)' }}>
              {r}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-5 pb-6 pt-2 shrink-0">
        <div className="flex items-center gap-3 h-12 px-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || thinking}
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
            style={{
              background: input.trim() && !thinking ? 'linear-gradient(135deg, #0066FF, #4D9FFF)' : 'rgba(175,197,255,0.08)',
              opacity: input.trim() && !thinking ? 1 : 0.5,
            }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
