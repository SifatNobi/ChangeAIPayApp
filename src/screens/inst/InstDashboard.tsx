import { useState } from "react"
import type { InstTab } from "./types"
import { TRADES } from "./data"
import { TabBar } from "./TabBar"

interface InstDashboardProps {
  onNavigate?: (tab: InstTab) => void
  onTradeTap?: (tradeId: string) => void
  onCounterpartyTap?: (cpId: string) => void
}

const statusColors: Record<string, string> = {
  Pending: "#F5B700",
  Matched: "#3FE7FF",
  Settled: "#22C55E",
  Failed: "#FF4D5A",
  Partial: "#FC7E2F",
}

const kpis = [
  { label: "Settlement Volume (30d)", value: "$0", trend: "", up: true },
  { label: "Pending Settlements", value: "0", trend: "", up: true },
  { label: "Open Exceptions", value: "0", trend: "", up: false },
  { label: "Active Counterparties", value: "0", trend: "", up: true },
  { label: "Success Rate", value: "0%", trend: "", up: true },
]

const quickNavItems: { id: InstTab; icon: string; label: string }[] = [
  {
    id: "overview",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    label: "Overview",
  },
  {
    id: "monitor",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    label: "Monitor",
  },
  {
    id: "exceptions",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    label: "Exceptions",
  },
  {
    id: "history",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "History",
  },
  {
    id: "risk",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    label: "Risk & AI",
  },
]

export default function InstDashboard({ onNavigate, onTradeTap }: InstDashboardProps) {
  const recentTrades = TRADES.slice(0, 5)

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
      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ padding: "56px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Hanken Grotesk, sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                Institutional Payments
              </div>
              <div style={{ fontSize: 12, color: "rgba(175,197,255,0.55)" }}>Capital Markets Settlement</div>
            </div>
          </div>
        </div>

        {/* KPI row — horizontal scroll */}
        <div style={{ paddingLeft: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingRight: 20, paddingBottom: 4 }}>
            {kpis.map((kpi, i) => (
              <div
                key={i}
                style={{
                  minWidth: 148,
                  background: "rgba(175,197,255,0.03)",
                  border: "1px solid rgba(175,197,255,0.09)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 11, color: "rgba(175,197,255,0.5)", marginBottom: 8, lineHeight: 1.3 }}>
                  {kpi.label}
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 6,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {kpi.value}
                </div>
                <div style={{ fontSize: 11, color: kpi.up ? "#22C55E" : "#FF4D5A" }}>{kpi.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ padding: "0 20px", marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Recent Activity
            </div>
            <div
              style={{ fontSize: 12, color: "#3FE7FF", cursor: "pointer" }}
              onClick={() => onNavigate?.("monitor")}
            >
              View all
            </div>
          </div>
          <div
            style={{
              background: "rgba(175,197,255,0.02)",
              border: "1px solid rgba(175,197,255,0.09)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {recentTrades.map((trade, i) => (
              <div
                key={trade.id}
                onClick={() => onTradeTap?.(trade.id)}
                style={{
                  padding: "12px 16px",
                  borderBottom: i < recentTrades.length - 1 ? "1px solid rgba(175,197,255,0.06)" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "rgba(175,197,255,0.7)",
                      marginBottom: 2,
                    }}
                  >
                    {trade.id}
                  </div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {trade.counterparty}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(175,197,255,0.4)", marginTop: 1 }}>
                    {trade.asset} · {trade.settlementDate}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <div
                    style={{
                      background: `${statusColors[trade.status]}22`,
                      border: `1px solid ${statusColors[trade.status]}44`,
                      color: statusColors[trade.status],
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {trade.status}
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(175,197,255,0.6)" }}>
                    ${(trade.value / 1_000_000).toFixed(2)}M
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Nav */}
        <div style={{ padding: "0 20px", marginBottom: 12 }}>
          <div
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              marginBottom: 12,
            }}
          >
            Quick Access
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {quickNavItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                style={{
                  background: "rgba(175,197,255,0.03)",
                  border: "1px solid rgba(175,197,255,0.09)",
                  borderRadius: 12,
                  padding: "12px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3FE7FF" strokeWidth="1.8">
                  <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ fontSize: 10, color: "rgba(175,197,255,0.6)", textAlign: "center", lineHeight: 1.2 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TabBar active="dashboard" onNavigate={onNavigate} />
    </div>
  )
}
