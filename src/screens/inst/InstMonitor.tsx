import { useState, useMemo } from "react"
import type { InstTab, SettlementStatus } from "./types"
import { TRADES } from "./data"
import { TabBar } from "./TabBar"

interface InstMonitorProps {
  onNavigate?: (tab: InstTab) => void
  onTradeTap?: (tradeId: string) => void
}

const statusColors: Record<string, string> = {
  Pending: "#F5B700",
  Matched: "#3FE7FF",
  Settled: "#22C55E",
  Failed: "#FF4D5A",
  Partial: "#FC7E2F",
}

const STATUSES: (SettlementStatus | "All")[] = ["All", "Pending", "Matched", "Settled", "Failed", "Partial"]
const SORT_OPTIONS = ["Newest First", "By Settlement Date", "By Counterparty"]

function formatValue(v: number) {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  return `$${v.toLocaleString()}`
}

export default function InstMonitor({ onNavigate, onTradeTap }: InstMonitorProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<SettlementStatus | "All">("All")
  const [sortIdx, setSortIdx] = useState(0)

  const filtered = useMemo(() => {
    let list = TRADES.filter((t) => {
      const q = search.toLowerCase()
      const matchSearch = !q || t.id.toLowerCase().includes(q) || t.counterparty.toLowerCase().includes(q)
      const matchStatus = statusFilter === "All" || t.status === statusFilter
      return matchSearch && matchStatus
    })

    if (sortIdx === 0) {
      list = [...list].sort((a, b) => b.id.localeCompare(a.id))
    } else if (sortIdx === 1) {
      list = [...list].sort((a, b) => a.settlementDate.localeCompare(b.settlementDate))
    } else {
      list = [...list].sort((a, b) => a.counterparty.localeCompare(b.counterparty))
    }

    return list
  }, [search, statusFilter, sortIdx])

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
        <div style={{ padding: "56px 20px 20px" }}>
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 4,
            }}
          >
            Settlement Monitor
          </div>
          <div style={{ fontSize: 13, color: "rgba(175,197,255,0.5)" }}>
            {filtered.length} trade{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: "0 20px 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(175,197,255,0.04)",
              border: "1px solid rgba(175,197,255,0.12)",
              borderRadius: 12,
              padding: "10px 14px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.4)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Trade ID or counterparty…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 14,
              }}
            />
          </div>
        </div>

        {/* Status filter chips */}
        <div style={{ paddingLeft: 20, marginBottom: 12 }}>
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

        {/* Sort */}
        <div style={{ padding: "0 20px 16px" }}>
          <div
            onClick={() => setSortIdx((sortIdx + 1) % SORT_OPTIONS.length)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(175,197,255,0.04)",
              border: "1px solid rgba(175,197,255,0.1)",
              borderRadius: 8,
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(175,197,255,0.5)" strokeWidth="2">
              <path d="M3 6h18M7 12h10m-6 6h2" strokeLinecap="round" />
            </svg>
            <span style={{ fontSize: 12, color: "rgba(175,197,255,0.6)" }}>{SORT_OPTIONS[sortIdx]}</span>
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
            <div
              style={{
                padding: 32,
                textAlign: "center",
                color: "rgba(175,197,255,0.35)",
                fontSize: 14,
              }}
            >
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
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(175,197,255,0.6)" }}>
                      {trade.id.replace("TRD-20260908-", "#")}
                    </div>
                    <div style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>{trade.asset}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(175,197,255,0.75)", marginBottom: 2 }}>
                    {trade.counterparty}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(175,197,255,0.35)" }}>{trade.settlementDate}</div>
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

      <TabBar active="monitor" onNavigate={onNavigate} />
    </div>
  )
}
