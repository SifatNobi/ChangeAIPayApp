import type { InstTab } from "./types"
import { TabBar } from "./TabBar"

interface InstOverviewProps {
  onNavigate?: (tab: InstTab) => void
}

interface AssetClass {
  name: string
  volume: string
  trades: number
  avgSettlement: string
  nanoPercent: number
  breakdown: { label: string; pct: number; color: string }[]
}

const assetClasses: AssetClass[] = []

const chartData = [
  { day: "Mon", value: 0 },
  { day: "Tue", value: 0 },
  { day: "Wed", value: 0 },
  { day: "Thu", value: 0 },
  { day: "Fri", value: 0 },
  { day: "Sat", value: 0 },
  { day: "Sun", value: 0 },
]

const maxChartVal = Math.max(...chartData.map((d) => d.value))

export default function InstOverview({ onNavigate }: InstOverviewProps) {
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
        <div style={{ padding: "56px 20px 24px" }}>
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 4,
            }}
          >
            Settlement Overview
          </div>
          <div style={{ fontSize: 13, color: "rgba(175,197,255,0.5)" }}>Asset class breakdown & volume trends</div>
        </div>

        {/* Asset class cards */}
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {assetClasses.map((ac) => (
            <div
              key={ac.name}
              style={{
                background: "rgba(175,197,255,0.02)",
                border: "1px solid rgba(175,197,255,0.09)",
                borderRadius: 16,
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div
                    style={{
                      fontFamily: "Hanken Grotesk, sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {ac.name}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(175,197,255,0.5)" }}>
                    {ac.trades.toLocaleString()} trades · avg {ac.avgSettlement}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {ac.volume}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#3FE7FF",
                      background: "rgba(63,231,255,0.1)",
                      border: "1px solid rgba(63,231,255,0.2)",
                      borderRadius: 20,
                      padding: "2px 8px",
                      marginTop: 4,
                    }}
                  >
                    {ac.nanoPercent}% Nano
                  </div>
                </div>
              </div>

              {/* Split bar */}
              <div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 3,
                    overflow: "hidden",
                    display: "flex",
                    marginBottom: 8,
                  }}
                >
                  {ac.breakdown.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        width: `${b.pct}%`,
                        background: b.color,
                        borderRadius: i === 0 ? "3px 0 0 3px" : i === ac.breakdown.length - 1 ? "0 3px 3px 0" : 0,
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {ac.breakdown.map((b, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: b.color }} />
                      <div style={{ fontSize: 11, color: "rgba(175,197,255,0.55)" }}>
                        {b.label} {b.pct}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 7-day bar chart */}
        <div style={{ padding: "0 20px 20px" }}>
          <div
            style={{
              background: "rgba(175,197,255,0.02)",
              border: "1px solid rgba(175,197,255,0.09)",
              borderRadius: 16,
              padding: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              Settlement Volume — 7 Day
            </div>
            <div style={{ fontSize: 12, color: "rgba(175,197,255,0.45)", marginBottom: 16 }}>
              Daily volume in $M
            </div>
            <svg width="100%" height="100" viewBox="0 0 350 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3FE7FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {chartData.map((d, i) => {
                const barH = (d.value / maxChartVal) * 80
                const x = i * 50 + 10
                return (
                  <g key={d.day}>
                    <rect
                      x={x}
                      y={90 - barH}
                      width={28}
                      height={barH}
                      rx={4}
                      fill="url(#barGrad)"
                    />
                  </g>
                )
              })}
            </svg>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: 8 }}>
              {chartData.map((d) => (
                <div key={d.day} style={{ fontSize: 10, color: "rgba(175,197,255,0.45)", textAlign: "center" }}>
                  <div>{d.day}</div>
                  <div style={{ fontFamily: "monospace", color: "rgba(175,197,255,0.7)", marginTop: 2 }}>
                    ${d.value}M
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TabBar active="overview" onNavigate={onNavigate} />
    </div>
  )
}
