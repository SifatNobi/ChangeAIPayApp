import { useState } from "react"
import { COUNTERPARTIES, TRADES } from "./data"

interface InstCounterpartyProps {
  counterpartyId?: string
  onBack?: () => void
  onViewTrades?: (cpId: string) => void
}

const ratingColors: Record<string, string> = {
  AAA: "#22C55E",
  AA: "#3FE7FF",
  A: "#0066FF",
  BBB: "#F5B700",
  BB: "#FF4D5A",
}

const statusColors: Record<string, string> = {
  Pending: "#F5B700",
  Matched: "#3FE7FF",
  Settled: "#22C55E",
  Failed: "#FF4D5A",
  Partial: "#FC7E2F",
}

function formatVolume(v: number) {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(0)}M`
  return `$${v.toLocaleString()}`
}

export default function InstCounterparty({ counterpartyId, onBack, onViewTrades }: InstCounterpartyProps) {
  const [toast, setToast] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [ssiForm, setSsiForm] = useState({ account: "", routing: "", bank: "" })

  const cp = counterpartyId
    ? COUNTERPARTIES.find((c) => c.id === counterpartyId) ?? COUNTERPARTIES[0]
    : COUNTERPARTIES[0]

  const recentTrades = TRADES.filter((t) => t.counterparty === cp.name).slice(0, 5)
  const displayTrades = recentTrades.length > 0 ? recentTrades : TRADES.slice(0, 5)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const ratingColor = ratingColors[cp.riskRating] ?? "#3FE7FF"

  const stats = [
    { label: "Fail Rate", value: `${cp.failRate}%`, color: cp.failRate > 2 ? "#FF4D5A" : "#22C55E" },
    { label: "Active Trades", value: cp.activeTrades.toString(), color: "#3FE7FF" },
    { label: "YTD Volume", value: formatVolume(cp.ytdVolume), color: "#fff" },
    { label: "SSI Status", value: "On File ✓", color: "#22C55E" },
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
          {toast}
        </div>
      )}

      {/* SSI Modal */}
      {showModal && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(4,11,28,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 200,
          }}
        >
          <div
            style={{
              width: "100%",
              background: "#0A1628",
              border: "1px solid rgba(175,197,255,0.12)",
              borderRadius: "20px 20px 0 0",
              padding: "24px 20px 40px",
            }}
          >
            <div
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 6,
              }}
            >
              Update SSI
            </div>
            <div style={{ fontSize: 13, color: "rgba(175,197,255,0.5)", marginBottom: 20 }}>
              Settlement Standing Instructions for {cp.name}
            </div>
            {[
              { key: "bank", label: "Bank Name", placeholder: "e.g. Deutsche Bank Frankfurt" },
              { key: "account", label: "Account Number", placeholder: "e.g. DE89 3704 0044 0532 0130 00" },
              { key: "routing", label: "Routing / BIC Code", placeholder: "e.g. DEUTDEDB" },
            ].map(({ key, label, placeholder }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: "rgba(175,197,255,0.5)", marginBottom: 6 }}>{label}</div>
                <input
                  value={ssiForm[key as keyof typeof ssiForm]}
                  onChange={(e) => setSsiForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{
                    width: "100%",
                    background: "rgba(175,197,255,0.04)",
                    border: "1px solid rgba(175,197,255,0.12)",
                    borderRadius: 10,
                    padding: "11px 14px",
                    color: "#fff",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 12,
                  border: "1px solid rgba(175,197,255,0.15)",
                  background: "rgba(175,197,255,0.04)",
                  color: "rgba(175,197,255,0.7)",
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowModal(false)
                  showToast("SSI updated successfully")
                }}
                style={{
                  flex: 2,
                  height: 48,
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "Hanken Grotesk, sans-serif",
                }}
              >
                Save SSI
              </button>
            </div>
          </div>
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
              fontSize: 18,
              fontWeight: 700,
              color: "#fff",
              flex: 1,
              minWidth: 0,
            }}
          >
            {cp.name}
          </div>
        </div>

        {/* Profile card */}
        <div
          style={{
            margin: "0 20px 16px",
            background: "rgba(175,197,255,0.02)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 16,
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div
                style={{
                  fontFamily: "Hanken Grotesk, sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                {cp.name}
              </div>
              <div style={{ fontSize: 12, color: "rgba(175,197,255,0.45)" }}>
                Partner since {new Date(cp.since).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
              </div>
            </div>
            <div
              style={{
                background: `${ratingColor}18`,
                border: `1.5px solid ${ratingColor}50`,
                color: ratingColor,
                fontFamily: "monospace",
                fontSize: 16,
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: 10,
              }}
            >
              {cp.riskRating}
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(175,197,255,0.03)",
                  border: "1px solid rgba(175,197,255,0.07)",
                  borderRadius: 10,
                  padding: "10px 12px",
                }}
              >
                <div style={{ fontSize: 11, color: "rgba(175,197,255,0.45)", marginBottom: 4 }}>{s.label}</div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 16,
                    fontWeight: 700,
                    color: s.color,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent settlements */}
        <div style={{ padding: "0 20px", marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Recent Settlements
          </div>
          <div
            style={{
              background: "rgba(175,197,255,0.02)",
              border: "1px solid rgba(175,197,255,0.09)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {displayTrades.map((t, i) => (
              <div
                key={t.id}
                style={{
                  padding: "11px 14px",
                  borderBottom: i < displayTrades.length - 1 ? "1px solid rgba(175,197,255,0.06)" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(175,197,255,0.55)", marginBottom: 2 }}>
                    {t.id.replace("TRD-20260908-", "#")} · {t.asset}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(175,197,255,0.35)" }}>{t.settlementDate}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <div
                    style={{
                      background: `${statusColors[t.status]}18`,
                      border: `1px solid ${statusColors[t.status]}3A`,
                      color: statusColors[t.status],
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "2px 7px",
                      borderRadius: 20,
                    }}
                  >
                    {t.status}
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(175,197,255,0.5)" }}>
                    ${(t.value / 1_000_000).toFixed(1)}M
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ padding: "0 20px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => onViewTrades?.(cp.id)}
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
            View All Trades
          </button>
          <button
            onClick={() => showToast("Flagged for compliance review")}
            style={{
              height: 50,
              borderRadius: 14,
              border: "1px solid rgba(245,183,0,0.3)",
              background: "rgba(245,183,0,0.07)",
              color: "#F5B700",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Flag for Review
          </button>
          <button
            onClick={() => setShowModal(true)}
            style={{
              height: 50,
              borderRadius: 14,
              border: "1px solid rgba(175,197,255,0.15)",
              background: "rgba(175,197,255,0.04)",
              color: "rgba(175,197,255,0.75)",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Update SSI
          </button>
        </div>
      </div>
    </div>
  )
}
