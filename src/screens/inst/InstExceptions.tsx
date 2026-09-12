import { useState } from "react"
import type { InstTab, ExceptionSeverity } from "./types"
import { EXCEPTIONS } from "./data"
import { TabBar } from "./TabBar"

interface InstExceptionsProps {
  onNavigate?: (tab: InstTab) => void
  onExceptionTap?: (exId: string) => void
}

const severityColors: Record<ExceptionSeverity, string> = {
  Critical: "#FF4D5A",
  High: "#FC7E2F",
  Medium: "#F5B700",
}

const FILTERS: (ExceptionSeverity | "All")[] = ["All", "Critical", "High", "Medium"]

export default function InstExceptions({ onNavigate }: InstExceptionsProps) {
  const [severityFilter, setSeverityFilter] = useState<ExceptionSeverity | "All">("All")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [statuses, setStatuses] = useState<Record<string, string>>(
    () => Object.fromEntries(EXCEPTIONS.map((e) => [e.id, e.status]))
  )

  const filtered = EXCEPTIONS.filter(
    (e) => severityFilter === "All" || e.severity === severityFilter
  )

  const handleAction = (exId: string, action: string) => {
    if (action === "Mark Resolved") {
      setStatuses((prev) => ({ ...prev, [exId]: "Resolved" }))
      setExpanded(null)
    } else if (action === "Escalate") {
      setStatuses((prev) => ({ ...prev, [exId]: "Escalated" }))
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
        <div style={{ padding: "56px 20px 20px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
              }}
            >
              Exception Center
            </div>
          </div>
          <div
            style={{
              background: "rgba(255,77,90,0.15)",
              border: "1px solid rgba(255,77,90,0.3)",
              color: "#FF4D5A",
              fontSize: 13,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 20,
              fontFamily: "monospace",
            }}
          >
            {filtered.filter((e) => statuses[e.id] !== "Resolved").length} open
          </div>
        </div>

        {/* Filter chips */}
        <div style={{ paddingLeft: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingRight: 20 }}>
            {FILTERS.map((f) => {
              const active = severityFilter === f
              const color = f === "All" ? "#3FE7FF" : severityColors[f as ExceptionSeverity]
              return (
                <div
                  key={f}
                  onClick={() => setSeverityFilter(f)}
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
                  {f}
                </div>
              )
            })}
          </div>
        </div>

        {/* Exception list */}
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((ex) => {
            const isExpanded = expanded === ex.id
            const currentStatus = statuses[ex.id] ?? ex.status
            const isResolved = currentStatus === "Resolved"
            const color = severityColors[ex.severity]

            return (
              <div
                key={ex.id}
                style={{
                  background: "rgba(175,197,255,0.02)",
                  border: `1px solid ${isResolved ? "rgba(34,197,94,0.2)" : "rgba(175,197,255,0.09)"}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  borderLeft: `3px solid ${isResolved ? "#22C55E" : color}`,
                }}
              >
                {/* Row header */}
                <div
                  onClick={() => !isResolved && setExpanded(isExpanded ? null : ex.id)}
                  style={{
                    padding: "12px 14px",
                    cursor: isResolved ? "default" : "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  {/* Severity badge */}
                  <div
                    style={{
                      background: `${isResolved ? "#22C55E" : color}18`,
                      border: `1px solid ${isResolved ? "#22C55E" : color}44`,
                      color: isResolved ? "#22C55E" : color,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {isResolved ? "Resolved" : currentStatus === "Escalated" ? "Escalated" : ex.severity}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: "#fff", fontWeight: 500, marginBottom: 3 }}>{ex.reason}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(175,197,255,0.5)", marginBottom: 2 }}>
                      {ex.tradeId} · {ex.counterparty}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ fontSize: 11, color: "rgba(175,197,255,0.35)" }}>Age: {ex.age}</div>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {ex.assignedTo}
                  </div>
                </div>

                {/* Expanded actions */}
                {isExpanded && !isResolved && (
                  <div
                    style={{
                      borderTop: "1px solid rgba(175,197,255,0.08)",
                      padding: "12px 14px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    {["Retry Settlement", "Escalate", "Contact Counterparty", "Mark Resolved"].map((action) => {
                      const isDanger = action === "Mark Resolved"
                      const isWarn = action === "Escalate"
                      return (
                        <button
                          key={action}
                          onClick={() => handleAction(ex.id, action)}
                          style={{
                            height: 38,
                            borderRadius: 10,
                            border: isDanger
                              ? "1px solid rgba(34,197,94,0.35)"
                              : isWarn
                              ? "1px solid rgba(245,183,0,0.35)"
                              : "1px solid rgba(175,197,255,0.15)",
                            background: isDanger
                              ? "rgba(34,197,94,0.1)"
                              : isWarn
                              ? "rgba(245,183,0,0.1)"
                              : "rgba(175,197,255,0.05)",
                            color: isDanger ? "#22C55E" : isWarn ? "#F5B700" : "rgba(175,197,255,0.75)",
                            fontSize: 12,
                            fontWeight: 500,
                            cursor: "pointer",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {action}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <TabBar active="exceptions" onNavigate={onNavigate} />
    </div>
  )
}
