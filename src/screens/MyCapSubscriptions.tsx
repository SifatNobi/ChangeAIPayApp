import { useState } from "react";

interface MyCapSubscriptionsProps {
  onBack?: () => void;
}

const SUBSCRIPTIONS: { id: string; merchant: string; plan: string; price: string; nextCharge: string; since: string }[] = [];

export default function MyCapSubscriptions({ onBack }: MyCapSubscriptionsProps) {
  const [cancelledSubs, setCancelledSubs] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("cap_cancelled_subs") || "[]");
    } catch {
      return [];
    }
  });
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  function handleConfirmCancel(id: string) {
    const newArr = [...cancelledSubs, id];
    setCancelledSubs(newArr);
    localStorage.setItem("cap_cancelled_subs", JSON.stringify(newArr));
    setConfirmingId(null);
  }

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
      <div style={{ display: "flex", alignItems: "center", padding: "56px 20px 8px", gap: 12 }}>
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
          My Subscriptions
        </span>
      </div>

      <div
        style={{
          padding: "4px 20px 20px",
          fontSize: 13,
          color: "rgba(175,197,255,0.55)",
        }}
      >
        Active recurring charges from ChangeAIPay merchants
      </div>

      <div style={{ padding: "0 20px 40px" }}>
        {SUBSCRIPTIONS.map((sub, i) => {
          const isCancelled = cancelledSubs.includes(sub.id);
          const isConfirming = confirmingId === sub.id;

          return (
            <div
              key={sub.id}
              style={{
                background: isCancelled
                  ? "rgba(175,197,255,0.015)"
                  : "rgba(175,197,255,0.04)",
                border: isCancelled
                  ? "1px solid rgba(175,197,255,0.05)"
                  : "1px solid rgba(175,197,255,0.09)",
                borderRadius: 14,
                padding: "16px",
                marginBottom: i < SUBSCRIPTIONS.length - 1 ? 10 : 0,
                opacity: isCancelled ? 0.55 : 1,
                transition: "opacity 0.3s, background 0.3s",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display, system-ui, sans-serif)",
                      fontWeight: 700,
                      fontSize: 15,
                      color: isCancelled ? "rgba(255,255,255,0.45)" : "#fff",
                      marginBottom: 3,
                    }}
                  >
                    {sub.merchant}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: isCancelled ? "rgba(175,197,255,0.3)" : "rgba(175,197,255,0.6)",
                      marginBottom: 6,
                    }}
                  >
                    {sub.plan}
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontWeight: 700,
                        fontSize: 14,
                        color: isCancelled ? "rgba(175,197,255,0.3)" : "#3FE7FF",
                      }}
                    >
                      {sub.price}
                    </span>
                    {!isCancelled && (
                      <span style={{ fontSize: 12, color: "rgba(175,197,255,0.5)" }}>
                        Next: {sub.nextCharge}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(175,197,255,0.35)", marginTop: 3 }}>
                    Since {sub.since}
                  </div>
                </div>

                <div style={{ flexShrink: 0, display: "flex", alignItems: "flex-start" }}>
                  {isCancelled ? (
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: 999,
                        background: "rgba(175,197,255,0.06)",
                        border: "1px solid rgba(175,197,255,0.12)",
                        color: "rgba(175,197,255,0.45)",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Cancelled
                    </span>
                  ) : (
                    <button
                      onClick={() => setConfirmingId(isConfirming ? null : sub.id)}
                      style={{
                        minWidth: 44,
                        minHeight: 44,
                        padding: "6px 14px",
                        borderRadius: 10,
                        border: "1px solid rgba(239,68,68,0.3)",
                        background: "rgba(239,68,68,0.07)",
                        color: "#F87171",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Inline confirmation */}
              {isConfirming && !isCancelled && (
                <div
                  style={{
                    marginTop: 14,
                    padding: "14px",
                    background: "rgba(239,68,68,0.07)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 10,
                  }}
                >
                  <p
                    style={{
                      margin: "0 0 12px",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: 600,
                    }}
                  >
                    Cancel this subscription?
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => handleConfirmCancel(sub.id)}
                      style={{
                        flex: 1,
                        minHeight: 44,
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.35)",
                        borderRadius: 10,
                        color: "#F87171",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Yes, cancel
                    </button>
                    <button
                      onClick={() => setConfirmingId(null)}
                      style={{
                        flex: 1,
                        minHeight: 44,
                        background: "rgba(175,197,255,0.06)",
                        border: "1px solid rgba(175,197,255,0.15)",
                        borderRadius: 10,
                        color: "#AFC5FF",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Keep it
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
