import { useState, useMemo } from "react"
import type { InstTab, AssetClass, SettlementStatus } from "./types"
import { TRADES } from "./data"
import { TabBar } from "./TabBar"

interface InstHistoryProps {
  onNavigate?: (tab: InstTab) => void
  onTradeTap?: (tradeId: string) => void
  onExport?: () => void
}

const statusColors: Record<string, string> = {
  Pending: "#F5B700",
  Matched: "#3FE7FF",
  Settled: "#22C55E",
  Failed: "#FF4D5A",
  Partial: "#FC7E2F",
}

const DATE_RANGES = ["Today", "7D", "30D", "90D"]
const ASSET_CLASSES: (AssetClass | "All")[] = ["All", "Equities", "Fixed Income", "FX", "Digital Assets"]
const STATUSES: (SettlementStatus | "All")[] = ["All", "Settled", "Pending", "Matched", "Failed", "Partial"]

const today = new Date("2026-09-08")

function isWithinRange(dateStr: string, range: string): boolean {
  const d = new Date(dateStr)
  const diff = (today.getTime() - d.getTime()) / 86400000
  if (range === "Today") return diff < 1
  if (range === "7D") return diff <= 7
  if (range === "30D") return diff <= 30
  if (range === "90D") return diff <= 90
  return true
}

function formatValue(v: number) {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  return `$${v.toLocaleString()}`
}

export default function InstHistory({ onNavigate, onTradeTap, onExport }: InstHistoryProps) {
  const [dateRange, setDateRange] = useState("30D")
  const [assetClass, setAssetClass] = useState<AssetClass | "All">("All")
  const [statusFilter, setStatusFilter] = useState<SettlementStatus | "All">("All")

  const filtered = useMemo(() => {
    return TRADES.filter((t) => {
      const inRange = isWithinRange(t.tradeDate, dateRange)
      const matchAsset = assetClass === "All" || t.assetClass === assetClass
      const matchStatus = statusFilter === "All" || t.status === statusFilter
      return inRange && matchAsset && matchStatus
    })
  }, [dateRange, assetClass, statusFilter])

  const totalValue = filtered.reduce((sum, t) => sum + t.value, 0)

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
        <div style={{ padding: "56px 20px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
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
              Settlement Ledger
            </div>
            <div style={{ fontSize: 13, color: "rgba(175,197,255,0.5)" }}>Historical trade records</div>
          </div>
          <button
            onClick={onExport}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(175,197,255,0.06)",
              border: "1px solid rgba(175,197,255,0.15)",
              borderRadius: 10,
              padding: "8px 14px",
              color: "rgba(175,197,255,0.8)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export
          </button>
        </div>

        {/* Date range chips */}
        <div style={{ paddingLeft: 20, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingRight: 20 }}>
            {DATE_RANGES.map((r) => (
              <div
                key={r}
                onClick={() => setDateRange(r)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: dateRange === r ? 600 : 400,
                  cursor: "pointer",
                  flexShrink: 0,
                  background: dateRange === r ? "rgba(63,231,255,0.15)" : "rgba(175,197,255,0.04)",
                  border: dateRange === r ? "1px solid rgba(63,231,255,0.4)" : "1px solid rgba(175,197,255,0.1)",
                  color: dateRange === r ? "#3FE7FF" : "rgba(175,197,255,0.5)",
                }}
              >
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Asset class chips */}
        <div style={{ paddingLeft: 20, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingRight: 20 }}>
            {ASSET_CLASSES.map((ac) => (
              <div
                key={ac}
                onClick={() => setAssetClass(ac)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: assetClass === ac ? 600 : 400,
                  cursor: "pointer",
                  flexShrink: 0,
                  background: assetClass === ac ? "rgba(0,102,255,0.15)" : "rgba(175,197,255,0.04)",
                  border: assetClass === ac ? "1px solid rgba(0,102,255,0.4)" : "1px solid rgba(175,197,255,0.1)",
                  color: assetClass === ac ? "#6B8CFF" : "rgba(175,197,255,0.5)",
                }}
              >
                {ac}
              </div>
            ))}
          </div>
        </div>

        {/* Status chips */}
        <div style={{ paddingLeft: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingRight: 20 }}>
            {STATUSES.map((s) => {
              const active = statusFilter === s
              const color = s === "All" ? "#3FE7FF" : statusColors[s]
              return (
                <div
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: active ? 600 : 400,
                    cursor: "pointer",
                    flexShrink: 0,
                    background: active ? `${color}20` : "rgba(175,197,255,0.04)",
                    border: active ? `1px solid ${color}44` : "1px solid rgba(175,197,255,0.1)",
                    color: active ? color : "rgba(175,197,255,0.5)",
                  }}
                >
                  {s}
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary row */}
        <div
          style={{
            margin: "0 20px 16px",
            background: "rgba(175,197,255,0.03)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 13, color: "rgba(175,197,255,0.6)" }}>
            {filtered.length} trade{filtered.length !== 1 ? "s" : ""}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: "#fff" }}>
            {formatValue(totalValue)}
          </div>
        </div>

        {/* Trade list */}
        <div
          style={{
            margin: "0 20px",
            background: "rgba(175,197,255,0.02)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "rgba(175,197,255,0.35)", fontSize: 14 }}>
              No trades match your filters
            </div>
          ) : (
            filtered.map((trade, i) => (
              <div
                key={trade.id}
                onClick={() => onTradeTap?.(trade.id)}
                style={{
                  padding: "12px 16px",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(175,197,255,0.06)" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(175,197,255,0.55)" }}>
                      {trade.id.replace("TRD-20260908-", "#")}
                    </div>
                    <div style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{trade.asset}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(175,197,255,0.7)", marginBottom: 2 }}>
                    {trade.counterparty}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(175,197,255,0.35)" }}>
                    {trade.tradeDate} · {trade.assetClass}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                  <div
                    style={{
                      background: `${statusColors[trade.status]}20`,
                      border: `1px solid ${statusColors[trade.status]}40`,
                      color: statusColors[trade.status],
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {trade.status}
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(175,197,255,0.65)" }}>
                    {formatValue(trade.value)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <TabBar active="history" onNavigate={onNavigate} />
    </div>
  )
}
