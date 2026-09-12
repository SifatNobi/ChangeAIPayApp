import { TRADES } from "./data"

interface InstTimelineProps {
  tradeId?: string
  onBack?: () => void
}

interface TimelineStep {
  label: string
  time: string
  status: string
  error?: string
}

const steps: TimelineStep[] = []

const failedSteps: TimelineStep[] = []

function formatValue(v: number) {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`
  return `$${v.toLocaleString()}`
}

export default function InstTimeline({ tradeId, onBack }: InstTimelineProps) {
  const trade = tradeId ? TRADES.find((t) => t.id === tradeId) ?? TRADES[0] : TRADES[0]
  const isFailed = trade.status === "Failed" || trade.status === "Partial"
  const timelineSteps = isFailed ? failedSteps : steps

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
          <div>
            <div
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Settlement Timeline
            </div>
            <div style={{ fontSize: 12, color: "rgba(175,197,255,0.5)" }}>{trade.settlementDate}</div>
          </div>
        </div>

        {/* Trade summary strip */}
        <div
          style={{
            margin: "0 20px 28px",
            background: "rgba(175,197,255,0.03)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 14,
            padding: "14px 16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: "rgba(175,197,255,0.6)",
                  marginBottom: 4,
                }}
              >
                {trade.id}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>
                {trade.asset} · {trade.counterparty}
              </div>
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {formatValue(trade.value)}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: "0 20px 24px" }}>
          {timelineSteps.map((step, i) => {
            const isDone = step.status === "done"
            const isActive = step.status === "active"
            const isError = step.status === "error"
            const isPending = step.status === "pending"

            const nodeColor = isDone
              ? "#22C55E"
              : isActive
              ? "#0066FF"
              : isError
              ? "#FF4D5A"
              : "rgba(175,197,255,0.2)"

            const nodeStroke = isActive ? "#3FE7FF" : isError ? "#FF4D5A" : nodeColor

            return (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                {/* Node + connector */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isDone ? "#22C55E22" : isActive ? "rgba(0,102,255,0.2)" : isError ? "rgba(255,77,90,0.15)" : "rgba(175,197,255,0.05)",
                      border: `2px solid ${nodeStroke}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: isActive ? "0 0 12px rgba(63,231,255,0.35)" : "none",
                      zIndex: 1,
                    }}
                  >
                    {isDone && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {isActive && (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: "#3FE7FF",
                        }}
                      />
                    )}
                    {isError && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF4D5A" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                        <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  {i < timelineSteps.length - 1 && (
                    <div
                      style={{
                        width: 2,
                        flex: 1,
                        minHeight: 36,
                        background: isDone ? "rgba(34,197,94,0.3)" : "rgba(175,197,255,0.1)",
                        marginTop: 2,
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: i < timelineSteps.length - 1 ? 24 : 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginTop: 3,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Hanken Grotesk, sans-serif",
                        fontSize: 14,
                        fontWeight: isDone || isActive ? 600 : 400,
                        color: isDone
                          ? "#fff"
                          : isActive
                          ? "#3FE7FF"
                          : isError
                          ? "#FF4D5A"
                          : "rgba(175,197,255,0.35)",
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 12,
                        color: isDone ? "rgba(175,197,255,0.5)" : "rgba(175,197,255,0.25)",
                        marginLeft: 12,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.time}
                    </div>
                  </div>
                  {isActive && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 12,
                        color: "rgba(63,231,255,0.7)",
                        background: "rgba(63,231,255,0.06)",
                        border: "1px solid rgba(63,231,255,0.15)",
                        borderRadius: 8,
                        padding: "6px 10px",
                        display: "inline-block",
                      }}
                    >
                      {''}
                    </div>
                  )}
                  {step.error && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 12,
                        color: "rgba(255,77,90,0.8)",
                        background: "rgba(255,77,90,0.07)",
                        border: "1px solid rgba(255,77,90,0.2)",
                        borderRadius: 8,
                        padding: "6px 10px",
                      }}
                    >
                      {step.error}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ETA */}
        {!isFailed && (
          <div
            style={{
              margin: "0 20px 32px",
              background: "rgba(63,231,255,0.06)",
              border: "1px solid rgba(63,231,255,0.15)",
              borderRadius: 14,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 12, color: "rgba(63,231,255,0.6)", marginBottom: 4 }}>Estimated Completion</div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: 700,
                color: "#3FE7FF",
              }}
            >
              {''}
            </div>
            <div style={{ fontSize: 12, color: "rgba(175,197,255,0.4)", marginTop: 4 }}>
              {''}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
