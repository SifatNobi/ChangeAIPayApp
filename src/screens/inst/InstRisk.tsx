import ainaSrc from '@/imports/Aina.png.jpeg'
import type { InstTab } from "./types"
import { TabBar } from "./TabBar"

interface InstRiskProps {
  onNavigate?: (tab: InstTab) => void
  onInsightTap?: (tradeId: string) => void
  onCounterpartyTap?: (cpId: string) => void
}

interface Insight {
  icon: string
  text: string
  sub: string
  borderColor: string
  type: string
  ref: string | null
}

const insights: Insight[] = []

// SVG arc for risk gauge
function RiskArc({ score }: { score: number }) {
  const r = 60
  const cx = 90
  const cy = 90
  const startAngle = -210
  const endAngle = 30
  const totalArc = endAngle - startAngle
  const fillArc = totalArc * (score / 100)

  function polarToCart(angle: number) {
    const rad = ((angle - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  const s = polarToCart(startAngle)
  const e = polarToCart(endAngle)
  const f = polarToCart(startAngle + fillArc)
  const largeArc = fillArc > 180 ? 1 : 0
  const totalLargeArc = totalArc > 180 ? 1 : 0

  return (
    <svg width="180" height="120" viewBox="0 0 180 120">
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#3FE7FF" />
        </linearGradient>
      </defs>
      {/* Track */}
      <path
        d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${totalLargeArc} 1 ${e.x} ${e.y}`}
        fill="none"
        stroke="rgba(175,197,255,0.1)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Fill */}
      <path
        d={`M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${f.x} ${f.y}`}
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Labels */}
      <text x="90" y="78" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" fontFamily="monospace">
        {score}
      </text>
      <text x="90" y="96" textAnchor="middle" fill="rgba(175,197,255,0.5)" fontSize="10" fontFamily="Inter, sans-serif">
        Medium Risk
      </text>
    </svg>
  )
}

export default function InstRisk({ onNavigate, onInsightTap, onCounterpartyTap }: InstRiskProps) {
  const handleInsightTap = (insight: (typeof insights)[0]) => {
    if (insight.type === "trade" && insight.ref) {
      onInsightTap?.(insight.ref)
    } else if (insight.type === "counterparty" && insight.ref) {
      onCounterpartyTap?.(insight.ref)
    }
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
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: "56px 20px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              AI Risk & Insights
            </div>
            <div style={{ fontSize: 13, color: "rgba(175,197,255,0.5)" }}>Powered by Aina</div>
          </div>
          {/* Aina avatar chip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, rgba(0,102,255,0.2) 0%, rgba(63,231,255,0.15) 100%)",
              border: "1px solid rgba(63,231,255,0.25)",
              borderRadius: 24,
              padding: "6px 12px",
            }}
          >
            <img
              src={ainaSrc}
              alt="Aina"
              style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(63,231,255,0.3)" }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#3FE7FF" }}>Aina</span>
          </div>
        </div>

        {/* Risk score card */}
        <div
          style={{
            margin: "0 20px 24px",
            background: "rgba(175,197,255,0.02)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 16,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(175,197,255,0.6)",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Overall Portfolio Risk
          </div>
          <RiskArc score={0} />
          <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
            {[
              { label: "Low", color: "#22C55E" },
              { label: "Medium", color: "#3FE7FF" },
              { label: "High", color: "#FF4D5A" },
            ].map((level) => (
              <div key={level.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: level.color }} />
                <span
                  style={{
                    fontSize: 12,
                    color: level.label === "Medium" ? "#3FE7FF" : "rgba(175,197,255,0.45)",
                    fontWeight: level.label === "Medium" ? 600 : 400,
                  }}
                >
                  {level.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div style={{ padding: "0 20px" }}>
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Proactive Insights
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {insights.map((ins, i) => (
              <div
                key={i}
                onClick={() => handleInsightTap(ins)}
                style={{
                  background: "rgba(175,197,255,0.02)",
                  border: "1px solid rgba(175,197,255,0.09)",
                  borderLeft: `3px solid ${ins.borderColor}`,
                  borderRadius: 14,
                  padding: "14px 16px",
                  cursor: ins.ref ? "pointer" : "default",
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>{ins.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 500, marginBottom: 4, lineHeight: 1.4 }}>
                    {ins.text}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(175,197,255,0.45)", lineHeight: 1.3 }}>{ins.sub}</div>
                </div>
                {ins.ref && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(175,197,255,0.35)"
                    strokeWidth="2"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  >
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <TabBar active="risk" onNavigate={onNavigate} />
    </div>
  )
}
