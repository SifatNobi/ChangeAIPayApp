import { useState } from "react";

interface DeveloperSettingsProps {
  onBack?: () => void;
}

const DEMO_PK = "cap_live_pk_4f8a2c1b9e3d7f6a0b";
const DEMO_SK = "cap_live_sk_9x2k7m1p4q8r3n5t6u";

function randomHex18() {
  return Array.from({ length: 18 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
}

export default function DeveloperSettings({ onBack }: DeveloperSettingsProps) {
  const [env, setEnv] = useState<"sandbox" | "live">("sandbox");
  const [pkValue, setPkValue] = useState(DEMO_PK);
  const [skValue, setSkValue] = useState(DEMO_SK);
  const [pkRevealed, setPkRevealed] = useState(false);
  const [skRevealed, setSkRevealed] = useState(false);
  const [pkRegen, setPkRegen] = useState(false);
  const [skRegen, setSkRegen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [testEventState, setTestEventState] = useState<"idle" | "success">("idle");

  function handleRegenPk() {
    if (!pkRegen) { setPkRegen(true); return; }
    setPkValue("cap_live_pk_" + randomHex18());
    setPkRegen(false);
    setPkRevealed(false);
  }

  function handleRegenSk() {
    if (!skRegen) { setSkRegen(true); return; }
    setSkValue("cap_live_sk_" + randomHex18());
    setSkRegen(false);
    setSkRevealed(false);
  }

  function handleSendTest() {
    setTestEventState("success");
    setTimeout(() => setTestEventState("idle"), 3000);
  }

  function maskKey(key: string) {
    const prefix = key.split("_").slice(0, 3).join("_") + "_";
    return prefix + "••••••••••••••••";
  }

  const cardStyle: React.CSSProperties = {
    background: "rgba(175,197,255,0.04)",
    border: "1px solid rgba(175,197,255,0.09)",
    borderRadius: 16,
    padding: "20px",
    marginBottom: 16,
  };

  const sectionLabel: React.CSSProperties = {
    fontFamily: "var(--font-display, system-ui, sans-serif)",
    fontWeight: 700,
    fontSize: 13,
    color: "rgba(175,197,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
  };

  const btnStyle: React.CSSProperties = {
    minHeight: 36,
    minWidth: 44,
    padding: "6px 14px",
    borderRadius: 8,
    border: "1px solid rgba(175,197,255,0.2)",
    background: "rgba(175,197,255,0.06)",
    color: "#AFC5FF",
    fontSize: 12,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

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
          Developer Settings
        </span>
      </div>

      <div style={{ padding: "0 20px 40px" }}>
        {/* Environment toggle */}
        <div style={cardStyle}>
          <div style={sectionLabel}>Environment</div>
          <div style={{ display: "flex", gap: 8, marginBottom: env === "live" ? 12 : 0 }}>
            {(["sandbox", "live"] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEnv(e)}
                style={{
                  flex: 1,
                  minHeight: 44,
                  borderRadius: 10,
                  border: env === e ? "1px solid rgba(0,102,255,0.5)" : "1px solid rgba(175,197,255,0.09)",
                  background: env === e ? "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)" : "rgba(175,197,255,0.04)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {e.charAt(0).toUpperCase() + e.slice(1)}
              </button>
            ))}
          </div>
          {env === "live" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                background: "rgba(245,183,0,0.08)",
                border: "1px solid rgba(245,183,0,0.25)",
                borderRadius: 10,
                marginTop: 12,
              }}
            >
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontSize: 12, color: "#F5B700" }}>
                Live mode will charge real payment methods.
              </span>
            </div>
          )}
        </div>

        {/* API Keys */}
        <div style={cardStyle}>
          <div style={sectionLabel}>API Keys</div>
          {/* Caution */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              background: "rgba(239,68,68,0.07)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 14 }}>🔒</span>
            <span style={{ fontSize: 12, color: "#FC8181" }}>Never share your secret key.</span>
          </div>

          {/* Publishable Key */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "rgba(175,197,255,0.6)", marginBottom: 6 }}>
              Publishable Key
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: 11,
                  color: "#AFC5FF",
                  background: "rgba(175,197,255,0.04)",
                  border: "1px solid rgba(175,197,255,0.09)",
                  borderRadius: 8,
                  padding: "10px",
                  wordBreak: "break-all",
                }}
              >
                {pkRevealed ? pkValue : maskKey(pkValue)}
              </div>
            </div>
            {pkRegen && (
              <div
                style={{
                  fontSize: 12,
                  color: "#F5B700",
                  padding: "8px 10px",
                  background: "rgba(245,183,0,0.07)",
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                This will invalidate your current key. Confirm?
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button style={btnStyle} onClick={() => setPkRevealed((v) => !v)}>
                {pkRevealed ? "Hide" : "Reveal"}
              </button>
              <button
                style={{
                  ...btnStyle,
                  color: pkRegen ? "#F5B700" : "#AFC5FF",
                  borderColor: pkRegen ? "rgba(245,183,0,0.4)" : "rgba(175,197,255,0.2)",
                }}
                onClick={handleRegenPk}
              >
                {pkRegen ? "Confirm Regenerate" : "Regenerate"}
              </button>
              {pkRegen && (
                <button style={btnStyle} onClick={() => setPkRegen(false)}>
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Secret Key */}
          <div>
            <div style={{ fontSize: 12, color: "rgba(175,197,255,0.6)", marginBottom: 6 }}>
              Secret Key
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: 11,
                  color: "#FC8181",
                  background: "rgba(175,197,255,0.04)",
                  border: "1px solid rgba(175,197,255,0.09)",
                  borderRadius: 8,
                  padding: "10px",
                  wordBreak: "break-all",
                }}
              >
                {skRevealed ? skValue : maskKey(skValue)}
              </div>
            </div>
            {skRegen && (
              <div
                style={{
                  fontSize: 12,
                  color: "#F5B700",
                  padding: "8px 10px",
                  background: "rgba(245,183,0,0.07)",
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                This will invalidate your current secret key. Confirm?
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button style={btnStyle} onClick={() => setSkRevealed((v) => !v)}>
                {skRevealed ? "Hide" : "Reveal"}
              </button>
              <button
                style={{
                  ...btnStyle,
                  color: skRegen ? "#F5B700" : "#AFC5FF",
                  borderColor: skRegen ? "rgba(245,183,0,0.4)" : "rgba(175,197,255,0.2)",
                }}
                onClick={handleRegenSk}
              >
                {skRegen ? "Confirm Regenerate" : "Regenerate"}
              </button>
              {skRegen && (
                <button style={btnStyle} onClick={() => setSkRegen(false)}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Webhook */}
        <div style={cardStyle}>
          <div style={sectionLabel}>Webhook Endpoint</div>
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => { setWebhookUrl(e.target.value); setWebhookSaved(false); }}
            placeholder="https://your-server.com/webhook"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "12px 14px",
              background: "rgba(175,197,255,0.04)",
              border: "1px solid rgba(175,197,255,0.09)",
              borderRadius: 10,
              color: "#fff",
              fontSize: 13,
              fontFamily: "var(--font-mono, monospace)",
              outline: "none",
              marginBottom: 12,
            }}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              style={{
                ...btnStyle,
                background: "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
                border: "none",
                color: "#fff",
                fontWeight: 700,
                padding: "10px 20px",
                minHeight: 44,
                borderRadius: 10,
              }}
              onClick={() => setWebhookSaved(true)}
            >
              {webhookSaved ? "Saved ✓" : "Save"}
            </button>
            <button
              style={{ ...btnStyle, minHeight: 44, padding: "10px 16px" }}
              onClick={handleSendTest}
            >
              Send test event
            </button>
          </div>
          {testEventState === "success" && (
            <div
              style={{
                marginTop: 10,
                padding: "8px 14px",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: 8,
                color: "#22C55E",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Test event delivered ✓
            </div>
          )}
        </div>

        {/* SDK & Docs */}
        <div
          style={{
            ...cardStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "default",
            marginBottom: 0,
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>SDK & Documentation</div>
            <div style={{ fontSize: 12, color: "rgba(175,197,255,0.5)" }}>
              Guides, API reference, SDKs
            </div>
          </div>
          <span style={{ fontSize: 20, color: "rgba(175,197,255,0.4)" }}>↗</span>
        </div>
      </div>
    </div>
  );
}
