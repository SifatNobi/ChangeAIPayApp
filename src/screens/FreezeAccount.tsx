import { useState } from "react";

interface FreezeAccountProps {
  isFrozen?: boolean;
  onBack?: () => void;
  onFreeze?: () => void;
  onUnfreeze?: () => void;
}

export default function FreezeAccount({
  isFrozen = false,
  onBack,
  onFreeze,
  onUnfreeze,
}: FreezeAccountProps) {
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [pin, setPin] = useState("");

  const handlePinDigit = (digit: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + digit);
    }
  };

  const handlePinDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handlePinConfirm = () => {
    if (pin.length === 4) {
      setPin("");
      setShowPinEntry(false);
      onUnfreeze?.();
    }
  };

  const cardBase: React.CSSProperties = {
    background: "rgba(175,197,255,0.05)",
    border: "1px solid rgba(175,197,255,0.12)",
    borderRadius: 16,
    padding: "20px",
  };

  const amberCard: React.CSSProperties = {
    background: "rgba(245,183,0,0.08)",
    border: "1px solid rgba(245,183,0,0.25)",
    borderRadius: 16,
    padding: "20px",
  };

  const redCard: React.CSSProperties = {
    background: "rgba(255,77,90,0.1)",
    border: "1px solid rgba(255,77,90,0.4)",
    borderRadius: 16,
    padding: "20px",
  };

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: "rgba(5,11,45,1)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -80,
          width: 320,
          height: 320,
          background: "radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "56px 20px 24px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(175,197,255,0.08)",
            border: "1px solid rgba(175,197,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="rgba(175,197,255,0.9)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.3px" }}>
          Freeze Account
        </span>
      </div>

      <div style={{ flex: 1, padding: "0 20px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
        {!isFrozen ? (
          <>
            {/* Warning card */}
            <div style={amberCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(245,183,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M9 2L16.5 15H1.5L9 2Z"
                      stroke="rgba(245,183,0,0.9)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M9 7V10" stroke="rgba(245,183,0,0.9)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="9" cy="12.5" r="0.75" fill="rgba(245,183,0,0.9)" />
                  </svg>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(245,183,0,0.95)" }}>
                  What freezing your account does
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "block", text: "Blocks all outgoing transfers and Send actions", blocked: true },
                  { icon: "check", text: "Does NOT block incoming payments", blocked: false },
                  { icon: "check", text: "Does NOT block viewing your balance or transaction history", blocked: false },
                  { icon: "card", text: "This will also cover your LightCard once it ships", blocked: true },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: item.blocked ? "rgba(255,77,90,0.15)" : "rgba(63,231,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {item.blocked ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="rgba(255,77,90,0.9)" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4.2 7.2L8 3" stroke="rgba(63,231,255,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        lineHeight: "1.5",
                        color: item.blocked ? "rgba(255,255,255,0.75)" : "rgba(175,197,255,0.8)",
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div style={cardBase}>
              <p style={{ fontSize: 13, color: "rgba(175,197,255,0.6)", lineHeight: "1.6", margin: 0 }}>
                You can unfreeze your account at any time. A PIN or biometric confirmation will be required to unfreeze.
              </p>
            </div>

            <div style={{ flex: 1 }} />

            {/* CTA */}
            <button
              onClick={onFreeze}
              style={{
                width: "100%",
                height: 56,
                borderRadius: 16,
                background: "rgba(255,77,90,0.15)",
                border: "1px solid rgba(255,77,90,0.4)",
                color: "rgba(255,100,110,1)",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "-0.2px",
              }}
            >
              Freeze My Account
            </button>
          </>
        ) : (
          <>
            {/* Frozen status badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "10px 20px",
                background: "rgba(255,77,90,0.1)",
                border: "1px solid rgba(255,77,90,0.35)",
                borderRadius: 50,
                alignSelf: "flex-start",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="rgba(255,77,90,0.9)" strokeWidth="1.5" />
                <path d="M7 4V7.5" stroke="rgba(255,77,90,0.9)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="7" cy="9.5" r="0.75" fill="rgba(255,77,90,0.9)" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,100,110,1)" }}>
                Account Frozen
              </span>
            </div>

            {/* Frozen summary card */}
            <div style={redCard}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 8 }}>
                Your account is frozen
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(175,197,255,0.7)", lineHeight: "1.5" }}>
                Outgoing transfers are blocked. Incoming payments and viewing your balance remain available.
              </p>
            </div>

            {/* Available actions */}
            <div style={cardBase}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(175,197,255,0.6)", marginBottom: 10, marginTop: 0 }}>
                Still available while frozen
              </p>
              {[
                "View balance and transaction history",
                "Receive incoming payments",
                "Contact support",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 8 : 0 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(63,231,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4.2 7.2L8 3" stroke="rgba(63,231,255,0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(175,197,255,0.75)" }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {!showPinEntry ? (
              <button
                onClick={() => setShowPinEntry(true)}
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 16,
                  background: "rgba(63,231,255,0.08)",
                  border: "1px solid rgba(63,231,255,0.3)",
                  color: "rgba(63,231,255,1)",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "-0.2px",
                }}
              >
                Unfreeze Account
              </button>
            ) : (
              <div
                style={{
                  background: "rgba(175,197,255,0.05)",
                  border: "1px solid rgba(175,197,255,0.12)",
                  borderRadius: 20,
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                  Enter your PIN to unfreeze
                </p>

                {/* PIN dots */}
                <div style={{ display: "flex", gap: 16 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: pin.length > i ? "rgba(63,231,255,0.9)" : "rgba(175,197,255,0.15)",
                        border: "1px solid rgba(175,197,255,0.25)",
                        transition: "background 0.15s ease",
                      }}
                    />
                  ))}
                </div>

                {/* Keypad */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, width: "100%" }}>
                  {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((digit, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (digit === "⌫") handlePinDelete();
                        else if (digit !== "") handlePinDigit(digit);
                      }}
                      disabled={digit === ""}
                      style={{
                        height: 52,
                        borderRadius: 12,
                        background: digit === "" ? "transparent" : "rgba(175,197,255,0.08)",
                        border: digit === "" ? "none" : "1px solid rgba(175,197,255,0.12)",
                        color: "rgba(255,255,255,0.9)",
                        fontSize: digit === "⌫" ? 18 : 20,
                        fontWeight: 500,
                        cursor: digit === "" ? "default" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {digit}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, width: "100%" }}>
                  <button
                    onClick={() => { setShowPinEntry(false); setPin(""); }}
                    style={{
                      flex: 1,
                      height: 48,
                      borderRadius: 12,
                      background: "rgba(175,197,255,0.05)",
                      border: "1px solid rgba(175,197,255,0.12)",
                      color: "rgba(175,197,255,0.7)",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePinConfirm}
                    disabled={pin.length < 4}
                    style={{
                      flex: 2,
                      height: 48,
                      borderRadius: 12,
                      background: pin.length === 4 ? "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)" : "rgba(175,197,255,0.08)",
                      border: "none",
                      color: pin.length === 4 ? "#fff" : "rgba(175,197,255,0.3)",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: pin.length === 4 ? "pointer" : "default",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
