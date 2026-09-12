import { useState } from "react";

interface DisputeStatusProps {
  onBack?: () => void;
  disputeId?: string;
}

const DISPUTE = {
  id: "",
  amount: "$0.00",
  reason: "",
  filed: "",
  deadline: "",
  status: "Under Review" as "Under Review" | "Resolved",
  party: "consumer",
};

const TIMELINE_STEPS = [
  { label: "Filed", date: "" },
  { label: "Under Review", date: "" },
  { label: "Decision Pending", date: "" },
  { label: "Resolved", date: "" },
];

const STATUS_INDEX: Record<string, number> = {
  Filed: 0,
  "Under Review": 1,
  "Decision Pending": 2,
  Resolved: 3,
};

export default function DisputeStatus({ onBack }: DisputeStatusProps) {
  const currentStep = STATUS_INDEX[DISPUTE.status] ?? 1;

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: "rgba(5,11,45,1)",
        fontFamily: "var(--font-body, system-ui, sans-serif)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "56px 20px 16px",
          gap: 12,
        }}
      >
        <button
          onClick={onBack}
          style={{
            minWidth: 44,
            minHeight: 44,
            background: "rgba(175,197,255,0.05)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 12,
            color: "#AFC5FF",
            fontSize: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
        <span
          style={{
            fontFamily: "var(--font-display, system-ui, sans-serif)",
            fontWeight: 700,
            fontSize: 20,
            color: "#fff",
          }}
        >
          Dispute Status
        </span>
      </div>

      {/* Status chip */}
      <div style={{ display: "flex", justifyContent: "center", padding: "24px 20px 8px" }}>
        <div
          style={{
            padding: "12px 32px",
            borderRadius: 999,
            background:
              DISPUTE.status === "Resolved"
                ? "rgba(34,197,94,0.15)"
                : "rgba(245,183,0,0.15)",
            border:
              DISPUTE.status === "Resolved"
                ? "1px solid rgba(34,197,94,0.4)"
                : "1px solid rgba(245,183,0,0.4)",
            color: DISPUTE.status === "Resolved" ? "#22C55E" : "#F5B700",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 0.3,
          }}
        >
          {DISPUTE.status}
        </div>
      </div>

      {/* Summary card */}
      <div style={{ padding: "20px 20px 0" }}>
        <div
          style={{
            background: "rgba(175,197,255,0.04)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 16,
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Dispute ID</span>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 13,
                color: "#AFC5FF",
              }}
            >
              {DISPUTE.id}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Amount</span>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                fontSize: 16,
                color: "#fff",
              }}
            >
              {DISPUTE.amount}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Reason</span>
            <span style={{ fontSize: 13, color: "#fff", textAlign: "right", maxWidth: 200 }}>
              {DISPUTE.reason}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Filed</span>
            <span style={{ fontSize: 13, color: "#fff" }}>{DISPUTE.filed}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Deadline</span>
            <span style={{ fontSize: 13, color: "#F5B700" }}>{DISPUTE.deadline}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: "24px 20px 0" }}>
        <div
          style={{
            fontFamily: "var(--font-display, system-ui, sans-serif)",
            fontWeight: 700,
            fontSize: 15,
            color: "rgba(175,197,255,0.8)",
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: 0.8,
          }}
        >
          Timeline
        </div>
        <div style={{ position: "relative", paddingLeft: 36 }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 15,
              top: 12,
              bottom: 12,
              width: 2,
              background: "rgba(175,197,255,0.1)",
            }}
          />
          {TIMELINE_STEPS.map((step, i) => {
            const filled = i <= currentStep;
            const current = i === currentStep;
            return (
              <div
                key={step.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  marginBottom: i < TIMELINE_STEPS.length - 1 ? 28 : 0,
                  position: "relative",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: -29,
                    top: 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: filled
                      ? "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)"
                      : "rgba(175,197,255,0.1)",
                    border: current ? "2px solid #3FE7FF" : "none",
                    boxShadow: current ? "0 0 8px rgba(63,231,255,0.5)" : "none",
                    zIndex: 1,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: current ? 700 : 500,
                      fontSize: 14,
                      color: filled ? "#fff" : "rgba(175,197,255,0.4)",
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: filled ? "rgba(175,197,255,0.6)" : "rgba(175,197,255,0.3)",
                      marginTop: 2,
                    }}
                  >
                    {step.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info card */}
      <div style={{ padding: "24px 20px 40px" }}>
        <div
          style={{
            background: "rgba(0,102,255,0.08)",
            border: "1px solid rgba(0,102,255,0.2)",
            borderRadius: 14,
            padding: "16px",
            display: "flex",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20, flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontSize: 13, color: "rgba(175,197,255,0.8)", margin: 0, lineHeight: 1.5 }}>
            Expected resolution: Within 10 business days of filing. You will be notified by email
            and push notification.
          </p>
        </div>
      </div>
    </div>
  );
}
