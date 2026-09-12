import { useState } from "react"
import { TRADES } from "./data"

interface InstTradeDetailProps {
  tradeId?: string
  onBack?: () => void
  onViewTimeline?: (tradeId: string) => void
  onFlagException?: (tradeId: string) => void
}

const statusColors: Record<string, string> = {
  Pending: "#F5B700",
  Matched: "#3FE7FF",
  Settled: "#22C55E",
  Failed: "#FF4D5A",
  Partial: "#FC7E2F",
}

function formatValue(v: number) {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(3)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`
  return `$${v.toLocaleString()}`
}

export default function InstTradeDetail({ tradeId, onBack, onViewTimeline, onFlagException }: InstTradeDetailProps) {
  const [toast, setToast] = useState(false)

  const trade = tradeId ? TRADES.find((t) => t.id === tradeId) ?? TRADES[0] : TRADES[0]

  const rows = [
    { label: "Trade ID", value: trade.id, mono: true },
    { label: "Counterparty", value: trade.counterparty, mono: false },
    { label: "Asset / Instrument", value: trade.asset, mono: true },
    { label: "Asset Class", value: trade.assetClass, mono: false },
    { label: "Quantity", value: trade.quantity.toLocaleString(), mono: true },
    { label: "Price", value: `$${trade.price.toLocaleString()}`, mono: true },
    { label: "Value", value: formatValue(trade.value), mono: true },
    { label: "Trade Date", value: trade.tradeDate, mono: true },
    { label: "Settlement Date", value: trade.settlementDate, mono: true },
    { label: "Settlement Method", value: trade.method, mono: false },
  ]

  const handleDownload = () => {
    setToast(true)
    setTimeout(() => setToast(false), 1500)
  }

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
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.35)",
            color: "#22C55E",
            padding: "10px 20px",
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 500,
            zIndex: 100,
          }}
        >
          Downloading…
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div style={{ padding: "56px 20px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div
            onClick={onBack}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(175,197,255,0.06)",
              border: "1px solid rgba(175,197,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.8)" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Trade Detail
          </div>
        </div>

        {/* Status hero */}
        <div style={{ padding: "0 20px 24px", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              background: `${statusColors[trade.status]}18`,
              border: `1.5px solid ${statusColors[trade.status]}55`,
              borderRadius: 20,
              padding: "16px 40px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "rgba(175,197,255,0.5)",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Status
            </div>
            <div
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: statusColors[trade.status],
              }}
            >
              {trade.status}
            </div>
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
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 16px",
                borderBottom: i < rows.length - 1 ? "1px solid rgba(175,197,255,0.06)" : "none",
              }}
            >
              <div style={{ fontSize: 13, color: "rgba(175,197,255,0.5)" }}>{row.label}</div>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: row.mono ? "monospace" : "inherit",
                  color: "#fff",
                  fontWeight: 500,
                  maxWidth: 200,
                  textAlign: "right",
                }}
              >
                {row.value}
              </div>
            </div>
          ))}
          {/* DVP row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "11px 16px",
            }}
          >
            <div style={{ fontSize: 13, color: "rgba(175,197,255,0.5)" }}>DVP</div>
            <div
              style={{
                background: trade.dvp ? "rgba(34,197,94,0.12)" : "rgba(255,77,90,0.12)",
                border: `1px solid ${trade.dvp ? "rgba(34,197,94,0.3)" : "rgba(255,77,90,0.3)"}`,
                color: trade.dvp ? "#22C55E" : "#FF4D5A",
                fontSize: 12,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
              }}
            >
              {trade.dvp ? "Yes" : "No"}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ padding: "0 20px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => onViewTimeline?.(trade.id)}
            style={{
              height: 50,
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Hanken Grotesk, sans-serif",
            }}
          >
            View Timeline
          </button>
          <button
            onClick={() => onFlagException?.(trade.id)}
            style={{
              height: 50,
              borderRadius: 14,
              border: "1px solid rgba(255,77,90,0.35)",
              background: "rgba(255,77,90,0.08)",
              color: "#FF4D5A",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Hanken Grotesk, sans-serif",
            }}
          >
            Flag Exception
          </button>
          <button
            onClick={handleDownload}
            style={{
              height: 50,
              borderRadius: 14,
              border: "1px solid rgba(175,197,255,0.15)",
              background: "rgba(175,197,255,0.04)",
              color: "rgba(175,197,255,0.8)",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Hanken Grotesk, sans-serif",
            }}
          >
            Download Confirmation
          </button>
        </div>
      </div>
    </div>
  )
}
