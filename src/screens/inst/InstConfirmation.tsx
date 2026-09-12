import { useState } from "react"
import { TRADES } from "./data"

interface InstConfirmationProps {
  tradeId?: string
  onDone?: () => void
  onDownload?: () => void
}

function formatValue(v: number) {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(3)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`
  return `$${v.toLocaleString()}`
}

export default function InstConfirmation({ tradeId, onDone, onDownload }: InstConfirmationProps) {
  const [toast, setToast] = useState(false)

  const trade = tradeId ? TRADES.find((t) => t.id === tradeId) ?? TRADES[0] : TRADES[0]
  const confRef = `CONF-20260908-${trade.id.replace("TRD-20260908-", "")}`

  const handleDownload = () => {
    setToast(true)
    onDownload?.()
    setTimeout(() => setToast(false), 1500)
  }

  const details = [
    { label: "Trade ID", value: trade.id, mono: true },
    { label: "Amount", value: formatValue(trade.value), mono: true },
    { label: "Counterparty", value: trade.counterparty, mono: false },
    { label: "Settlement Method", value: trade.method, mono: false },
    { label: "Timestamp", value: "2026-09-08 10:47:32 UTC", mono: true },
  ]

  return (
    <div
      style={{
        width: 390,
        height: 844,
        background: "linear-gradient(180deg, #040B1C 0%, #071428 50%, #040B1C 100%)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes instPulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.18); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        @keyframes instPulseInner {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        @keyframes instFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.3)",
            color: "#22C55E",
            padding: "10px 20px",
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 500,
            zIndex: 100,
            whiteSpace: "nowrap",
          }}
        >
          Downloading…
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Success pulse area */}
        <div
          style={{
            paddingTop: 60,
            paddingBottom: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: "relative",
              width: 140,
              height: 140,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Pulse ring 1 */}
            <div
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,102,255,0.15) 0%, rgba(63,231,255,0.05) 70%, transparent 100%)",
                animation: "instPulseRing 2.4s ease-in-out infinite",
              }}
            />
            {/* Pulse ring 2 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid rgba(63,231,255,0.3)",
                animation: "instPulseRing 2.4s ease-in-out infinite 0.6s",
              }}
            />
            {/* Main circle */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(0,102,255,0.25) 0%, rgba(63,231,255,0.2) 100%)",
                border: "2px solid rgba(63,231,255,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "instPulseInner 2.4s ease-in-out infinite",
                boxShadow: "0 0 40px rgba(63,231,255,0.2), 0 0 80px rgba(0,102,255,0.1)",
              }}
            >
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#3FE7FF" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
              marginTop: 24,
              marginBottom: 8,
              animation: "instFadeUp 0.5s ease-out 0.2s both",
            }}
          >
            Settlement Complete
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              color: "rgba(175,197,255,0.55)",
              marginBottom: 4,
              animation: "instFadeUp 0.5s ease-out 0.35s both",
            }}
          >
            {confRef}
          </div>
          <div
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              color: "#22C55E",
              fontSize: 12,
              fontWeight: 500,
              padding: "4px 14px",
              borderRadius: 20,
              animation: "instFadeUp 0.5s ease-out 0.5s both",
            }}
          >
            Nano Instant · DVP Confirmed
          </div>
        </div>

        {/* Detail card */}
        <div
          style={{
            margin: "0 20px 20px",
            background: "rgba(175,197,255,0.02)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {details.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                borderBottom: i < details.length - 1 ? "1px solid rgba(175,197,255,0.06)" : "none",
              }}
            >
              <div style={{ fontSize: 13, color: "rgba(175,197,255,0.5)" }}>{row.label}</div>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: row.mono ? "monospace" : "Inter, sans-serif",
                  color: "#fff",
                  fontWeight: 500,
                  textAlign: "right",
                  maxWidth: 220,
                }}
              >
                {row.value}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ padding: "0 20px 40px", display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={handleDownload}
            style={{
              height: 52,
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Hanken Grotesk, sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Confirmation Receipt
          </button>
          <button
            onClick={onDone}
            style={{
              height: 52,
              borderRadius: 14,
              border: "1px solid rgba(175,197,255,0.15)",
              background: "rgba(175,197,255,0.04)",
              color: "rgba(175,197,255,0.8)",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
