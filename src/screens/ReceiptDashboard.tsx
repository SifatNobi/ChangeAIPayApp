import { useState } from "react";

interface Receipt {
  id: string;
  vendor: string;
  date: string;
  total: string;
  category: string;
}

interface ReceiptDashboardProps {
  receipts?: Receipt[];
  onBack?: () => void;
  onScanReceipt?: () => void;
  onSelectReceipt?: (id: string) => void;
}

const FILTER_LABELS = ["All", "Meals", "Travel", "Office", "Personal", "Other"];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Meals: { bg: "rgba(249,115,22,0.18)", text: "#fb923c" },
  Travel: { bg: "rgba(99,102,241,0.18)", text: "#a5b4fc" },
  Office: { bg: "rgba(20,184,166,0.18)", text: "#5eead4" },
  Personal: { bg: "rgba(236,72,153,0.18)", text: "#f472b6" },
  Other: { bg: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.5)" },
};

function parseDollar(val: string): number {
  const n = parseFloat(val.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

export default function ReceiptDashboard({
  receipts = [],
  onBack,
  onScanReceipt,
  onSelectReceipt,
}: ReceiptDashboardProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredReceipts =
    activeFilter === "All"
      ? receipts
      : receipts.filter((r) => r.category === activeFilter);

  const runningTotal = filteredReceipts.reduce(
    (sum, r) => sum + parseDollar(r.total),
    0
  );

  const isEmpty = receipts.length === 0;

  return (
    <div
      style={{
        minHeight: 844,
        background: "rgba(5,11,45,1)",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        width: 390,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient blobs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "rgba(0,102,255,0.13)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(63,231,255,0.08)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "56px 20px 16px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: "center",
            color: "#fff",
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Receipts
        </h1>
        <button
          onClick={onScanReceipt}
          style={{
            background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
            border: "none",
            borderRadius: 12,
            width: 64,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            gap: 4,
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.4" />
            <circle cx="7" cy="7" r="2.2" fill="white" />
          </svg>
          Scan
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {isEmpty ? (
          /* Empty state */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 560,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 20,
                padding: "40px 32px",
                textAlign: "center",
                backdropFilter: "blur(12px)",
                maxWidth: 300,
              }}
            >
              {/* Icon placeholder */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "rgba(0,102,255,0.15)",
                  border: "1px solid rgba(0,102,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="6" y="4" width="16" height="20" rx="2.5" stroke="rgba(63,231,255,0.8)" strokeWidth="1.5" />
                  <path d="M10 9H18M10 13H18M10 17H14" stroke="rgba(63,231,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  fontWeight: 600,
                  margin: "0 0 8px",
                  lineHeight: 1.4,
                }}
              >
                No receipts yet
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 13,
                  margin: "0 0 24px",
                  lineHeight: 1.6,
                }}
              >
                Tap Scan to capture your first receipt.
              </p>
              <button
                onClick={onScanReceipt}
                style={{
                  background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px 28px",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                }}
              >
                Scan Receipt
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Filter chips */}
            <div
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                paddingBottom: 4,
                marginBottom: 16,
                scrollbarWidth: "none",
              }}
            >
              {FILTER_LABELS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    flexShrink: 0,
                    padding: "7px 16px",
                    borderRadius: 20,
                    border:
                      activeFilter === f
                        ? "1.5px solid rgba(63,231,255,0.6)"
                        : "1px solid rgba(255,255,255,0.12)",
                    background:
                      activeFilter === f
                        ? "rgba(0,102,255,0.25)"
                        : "rgba(255,255,255,0.05)",
                    color: activeFilter === f ? "#3FE7FF" : "rgba(255,255,255,0.55)",
                    fontSize: 13,
                    fontWeight: activeFilter === f ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Running total */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 14,
                padding: "16px 18px",
                marginBottom: 16,
                backdropFilter: "blur(12px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
                  {activeFilter === "All" ? "Total Spent" : `${activeFilter} Total`}
                </p>
                <p style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
                  ${runningTotal.toFixed(2)}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: "0 0 4px" }}>Receipts</p>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, fontWeight: 600, margin: 0 }}>
                  {filteredReceipts.length}
                </p>
              </div>
            </div>

            {/* Receipt list */}
            {filteredReceipts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 13,
                }}
              >
                No receipts in this category
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filteredReceipts.map((receipt) => {
                  const colors =
                    CATEGORY_COLORS[receipt.category] ?? CATEGORY_COLORS["Other"];
                  return (
                    <button
                      key={receipt.id}
                      onClick={() => onSelectReceipt?.(receipt.id)}
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: 14,
                        padding: "14px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        textAlign: "left",
                        backdropFilter: "blur(12px)",
                        width: "100%",
                        transition: "background 0.15s",
                      }}
                    >
                      {/* Category dot */}
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: colors.bg,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <rect x="3.5" y="2.5" width="11" height="13" rx="1.8" stroke={colors.text} strokeWidth="1.3" />
                          <path d="M6 6H12M6 9H12M6 12H9" stroke={colors.text} strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            color: "#fff",
                            fontSize: 14,
                            fontWeight: 600,
                            margin: "0 0 3px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {receipt.vendor}
                        </p>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>
                          {receipt.date}
                        </p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p
                          style={{
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 700,
                            margin: "0 0 4px",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          ${parseDollar(receipt.total).toFixed(2)}
                        </p>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "2px 8px",
                            borderRadius: 20,
                            background: colors.bg,
                            color: colors.text,
                            fontSize: 10,
                            fontWeight: 600,
                          }}
                        >
                          {receipt.category}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            <div style={{ height: 24 }} />
          </>
        )}
      </div>
    </div>
  );
}
