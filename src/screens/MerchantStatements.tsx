import { useState } from "react";

interface MerchantStatementsProps {
  onBack?: () => void;
  onDownload?: (month: string) => void;
}

const STATEMENTS: { month: string; total: string; txCount: number; status: string }[] = [];

type DownloadState = "idle" | "loading" | "done";

export default function MerchantStatements({ onBack, onDownload }: MerchantStatementsProps) {
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadState>>({});

  function handleDownload(month: string) {
    setDownloadStates((prev) => ({ ...prev, [month]: "loading" }));
    onDownload?.(month);
    setTimeout(() => {
      setDownloadStates((prev) => ({ ...prev, [month]: "done" }));
    }, 1500);
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
          Statements
        </span>
      </div>

      <div style={{ padding: "0 20px 40px" }}>
        {STATEMENTS.map((stmt, i) => {
          const dlState: DownloadState = downloadStates[stmt.month] || "idle";
          return (
            <div
              key={stmt.month}
              style={{
                background: "rgba(175,197,255,0.03)",
                border: "1px solid rgba(175,197,255,0.09)",
                borderRadius: 14,
                padding: "16px",
                marginBottom: i < STATEMENTS.length - 1 ? 10 : 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-display, system-ui, sans-serif)",
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  {stmt.month}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#3FE7FF",
                    }}
                  >
                    {stmt.total}
                  </span>
                  <span style={{ fontSize: 12, color: "rgba(175,197,255,0.5)" }}>
                    {stmt.txCount} transactions
                  </span>
                </div>
              </div>

              <button
                onClick={() => dlState === "idle" && handleDownload(stmt.month)}
                disabled={dlState === "loading" || dlState === "done"}
                style={{
                  minWidth: 44,
                  minHeight: 44,
                  padding: "8px 14px",
                  borderRadius: 10,
                  border:
                    dlState === "done"
                      ? "1px solid rgba(34,197,94,0.4)"
                      : "1px solid rgba(175,197,255,0.15)",
                  background:
                    dlState === "done"
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(175,197,255,0.06)",
                  color:
                    dlState === "done"
                      ? "#22C55E"
                      : dlState === "loading"
                      ? "rgba(175,197,255,0.5)"
                      : "#AFC5FF",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: dlState === "idle" ? "pointer" : "default",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {dlState === "loading" && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      border: "2px solid rgba(175,197,255,0.3)",
                      borderTop: "2px solid #AFC5FF",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                )}
                {dlState === "idle" && "Download PDF"}
                {dlState === "loading" && "Downloading…"}
                {dlState === "done" && "Downloaded ✓"}
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
