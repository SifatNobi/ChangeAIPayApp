interface RecurringBillingHubProps {
  onBack?: () => void;
  onCreatePlan?: () => void;
  onPlanDetail?: (id: string) => void;
}

const PLANS: { id: string; name: string; price: string; frequency: string; subscribers: number; status: string; revenue: string }[] = [];

const FREQ_COLORS: Record<string, string> = {
  Monthly: "#0066FF",
  Yearly: "#8B5CF6",
  Weekly: "#0891B2",
};

export default function RecurringBillingHub({ onBack, onCreatePlan, onPlanDetail }: RecurringBillingHubProps) {
  const activePlans = PLANS.filter((p) => p.status === "Active").length;
  const totalSubs = PLANS.reduce((a, p) => a + p.subscribers, 0);

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
            fontSize: 20,
          }}
        >
          Recurring Billing
        </span>
      </div>

      {/* Summary strip */}
      <div style={{ padding: "0 20px 20px" }}>
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          {[
            { label: "Active Plans", value: String(activePlans) },
            { label: "Subscribers", value: String(totalSubs) },
            { label: "Est. Monthly", value: "$0.00/mo" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                background: "rgba(175,197,255,0.04)",
                border: "1px solid rgba(175,197,255,0.09)",
                borderRadius: 14,
                padding: "14px 10px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#3FE7FF",
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: "rgba(175,197,255,0.55)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan list */}
      <div style={{ padding: "0 20px", flex: 1 }}>
        {PLANS.map((plan, i) => (
          <button
            key={plan.id}
            onClick={() => onPlanDetail?.(plan.id)}
            style={{
              width: "100%",
              background: "rgba(175,197,255,0.03)",
              border: "1px solid rgba(175,197,255,0.09)",
              borderRadius: 14,
              padding: "16px",
              marginBottom: i < PLANS.length - 1 ? 10 : 0,
              cursor: "pointer",
              textAlign: "left",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              minHeight: 44,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display, system-ui, sans-serif)",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#fff",
                  }}
                >
                  {plan.name}
                </span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: (FREQ_COLORS[plan.frequency] || "#0066FF") + "22",
                    border: `1px solid ${FREQ_COLORS[plan.frequency] || "#0066FF"}44`,
                    color: FREQ_COLORS[plan.frequency] || "#0066FF",
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {plan.frequency}
                </span>
                <span
                  style={{
                    padding: "2px 8px",
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
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {plan.status}
                </span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "rgba(175,197,255,0.6)" }}>
                  {plan.subscribers} subscriber{plan.subscribers !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#3FE7FF",
                  marginBottom: 2,
                }}
              >
                {plan.revenue}
              </div>
              <span style={{ fontSize: 16, color: "rgba(175,197,255,0.3)" }}>›</span>
            </div>
          </button>
        ))}
      </div>

      {/* Create Plan CTA */}
      <div style={{ padding: "24px 20px 40px" }}>
        <button
          onClick={onCreatePlan}
          style={{
            width: "100%",
            minHeight: 54,
            background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
            border: "none",
            borderRadius: 14,
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
            fontFamily: "var(--font-display, system-ui, sans-serif)",
          }}
        >
          + Create Plan
        </button>
      </div>
    </div>
  );
}
