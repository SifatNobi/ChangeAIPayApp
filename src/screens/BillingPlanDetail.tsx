import { useState } from "react";

interface BillingPlanDetailProps {
  planId?: string;
  onBack?: () => void;
  onEdit?: () => void;
  onPause?: () => void;
  onCancel?: () => void;
}

const PLANS: Record<string, { name: string; price: string; frequency: string; status: string; created: string }> = {
  bp1: { name: "Monthly Support Plan", price: "$49.99/mo", frequency: "Monthly", status: "Active", created: "Mar 1, 2026" },
  bp2: { name: "Annual Membership", price: "$299.00/yr", frequency: "Yearly", status: "Active", created: "Jan 15, 2026" },
  bp3: { name: "Weekly Maintenance", price: "$19.99/wk", frequency: "Weekly", status: "Active", created: "Jun 1, 2026" },
  bp4: { name: "Premium Newsletter", price: "$9.99/mo", frequency: "Monthly", status: "Paused", created: "Feb 10, 2026" },
  bp5: { name: "Starter Pack (Trial)", price: "$0.00 → $24.99/mo", frequency: "Monthly", status: "Active", created: "Jul 1, 2026" },
};

interface Subscriber { id: string; name: string; nextCharge: string; since: string; paid: string }

const SUBS_BP1: Subscriber[] = [];

export default function BillingPlanDetail({
  planId = "bp1",
  onBack,
  onEdit,
  onPause,
  onCancel,
}: BillingPlanDetailProps) {
  const [cancelledSubs] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("cap_cancelled_subs") || "[]");
    } catch {
      return [];
    }
  });

  const plan = PLANS[planId] || PLANS["bp1"];
  const visibleSubs = SUBS_BP1.filter((s) => !cancelledSubs.includes(s.id));

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
      <div style={{ display: "flex", alignItems: "center", padding: "56px 20px 20px", gap: 12 }}>
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
            fontSize: 18,
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {plan.name}
        </span>
      </div>

      <div style={{ padding: "0 20px 40px" }}>
        {/* Plan info card */}
        <div
          style={{
            background: "rgba(175,197,255,0.04)",
            border: "1px solid rgba(175,197,255,0.09)",
            borderRadius: 16,
            padding: "20px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Price</span>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                fontSize: 15,
                color: "#3FE7FF",
              }}
            >
              {plan.price}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Frequency</span>
            <span style={{ fontSize: 13, color: "#fff" }}>{plan.frequency}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Status</span>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: 999,
                background:
                  plan.status === "Active"
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(245,183,0,0.12)",
                border:
                  plan.status === "Active"
                    ? "1px solid rgba(34,197,94,0.3)"
                    : "1px solid rgba(245,183,0,0.3)",
                color: plan.status === "Active" ? "#22C55E" : "#F5B700",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {plan.status}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "rgba(175,197,255,0.6)", fontSize: 13 }}>Created</span>
            <span style={{ fontSize: 13, color: "#fff" }}>{plan.created}</span>
          </div>
        </div>

        {/* Subscribers */}
        <div
          style={{
            fontFamily: "var(--font-display, system-ui, sans-serif)",
            fontWeight: 700,
            fontSize: 13,
            color: "rgba(175,197,255,0.6)",
            textTransform: "uppercase",
            letterSpacing: 0.8,
            marginBottom: 12,
          }}
        >
          Subscribers ({visibleSubs.length})
        </div>

        {visibleSubs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "32px 20px",
              color: "rgba(175,197,255,0.4)",
              fontSize: 14,
              background: "rgba(175,197,255,0.02)",
              borderRadius: 14,
              border: "1px solid rgba(175,197,255,0.06)",
              marginBottom: 20,
            }}
          >
            No active subscribers
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>
            {visibleSubs.map((sub, i) => (
              <div
                key={sub.id}
                style={{
                  background: "rgba(175,197,255,0.03)",
                  border: "1px solid rgba(175,197,255,0.09)",
                  borderRadius: 12,
                  padding: "14px 16px",
                  marginBottom: i < visibleSubs.length - 1 ? 8 : 0,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{sub.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(175,197,255,0.5)" }}>
                      Since {sub.since} · Next: {sub.nextCharge}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#3FE7FF",
                      }}
                    >
                      {sub.paid}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(175,197,255,0.4)", marginTop: 2 }}>
                      total paid
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={onEdit}
            style={{
              width: "100%",
              minHeight: 50,
              background: "transparent",
              border: "1px solid rgba(175,197,255,0.25)",
              borderRadius: 12,
              color: "#AFC5FF",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Edit Plan
          </button>
          <button
            onClick={onPause}
            style={{
              width: "100%",
              minHeight: 50,
              background: "transparent",
              border: "1px solid rgba(245,183,0,0.35)",
              borderRadius: 12,
              color: "#F5B700",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Pause Plan
          </button>
          <button
            onClick={onCancel}
            style={{
              width: "100%",
              minHeight: 50,
              background: "transparent",
              border: "1px solid rgba(239,68,68,0.35)",
              borderRadius: 12,
              color: "#F87171",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Cancel Plan
          </button>
        </div>
      </div>
    </div>
  );
}
