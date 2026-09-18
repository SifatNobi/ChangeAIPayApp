import { useState } from "react";

interface CreateBillingPlanProps {
  onBack?: () => void;
  onCreate?: (plan: {
    name: string;
    description: string;
    price: string;
    frequency: string;
    trial: string;
  }) => void;
}

type Frequency = "Weekly" | "Monthly" | "Yearly";
type TrialMode = "none" | "set";

export default function CreateBillingPlan({ onBack, onCreate }: CreateBillingPlanProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [trialMode, setTrialMode] = useState<TrialMode>("none");
  const [trialDays, setTrialDays] = useState("14");

  const isValid = name.trim() !== "" && price.trim() !== "";

  function handleSubmit() {
    if (!isValid) return;
    onCreate?.({
      name: name.trim(),
      description: description.trim(),
      price: price.trim(),
      frequency,
      trial: trialMode === "set" ? trialDays + " days" : "None",
    });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    background: "rgba(175,197,255,0.04)",
    border: "1px solid rgba(175,197,255,0.12)",
    borderRadius: 12,
    color: "#fff",
    fontSize: 15,
    outline: "none",
    fontFamily: "var(--font-body, system-ui, sans-serif)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    color: "rgba(175,197,255,0.6)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 8,
    display: "block",
  };

  const pillBtn = (active: boolean): React.CSSProperties => ({
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    border: active ? "1px solid rgba(0,102,255,0.5)" : "1px solid rgba(175,197,255,0.09)",
    background: active
      ? "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)"
      : "rgba(175,197,255,0.04)",
    color: "#fff",
    fontWeight: active ? 700 : 500,
    fontSize: 14,
    cursor: "pointer",
  });

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
      <div style={{ display: "flex", alignItems: "center", padding: "56px 20px 24px", gap: 12 }}>
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
          Create Billing Plan
        </span>
      </div>

      <div style={{ padding: "0 20px 40px", display: "flex", flexDirection: "column", gap: 22 }}>
        {/* Plan name */}
        <div>
          <label style={labelStyle}>Plan Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Monthly Support Plan"
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle}>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what subscribers get..."
            rows={3}
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: 80,
            }}
          />
        </div>

        {/* Price */}
        <div>
          <label style={labelStyle}>Price per Cycle *</label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(175,197,255,0.6)",
                fontSize: 16,
                fontWeight: 700,
                pointerEvents: "none",
              }}
            >
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              style={{ ...inputStyle, paddingLeft: 30 }}
            />
          </div>
        </div>

        {/* Frequency */}
        <div>
          <label style={labelStyle}>Billing Frequency</label>
          <div style={{ display: "flex", gap: 8 }}>
            {(["Weekly", "Monthly", "Yearly"] as Frequency[]).map((f) => (
              <button key={f} onClick={() => setFrequency(f)} style={pillBtn(frequency === f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Trial period */}
        <div>
          <label style={labelStyle}>Trial Period</label>
          <div style={{ display: "flex", gap: 8, marginBottom: trialMode === "set" ? 12 : 0 }}>
            {(["none", "set"] as TrialMode[]).map((m) => (
              <button key={m} onClick={() => setTrialMode(m)} style={pillBtn(trialMode === m)}>
                {m === "none" ? "No Trial" : "Set Trial"}
              </button>
            ))}
          </div>
          {trialMode === "set" && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input
                type="number"
                min="1"
                max="365"
                value={trialDays}
                onChange={(e) => setTrialDays(e.target.value)}
                style={{ ...inputStyle, width: 100 }}
              />
              <span style={{ color: "rgba(175,197,255,0.7)", fontSize: 14 }}>days free trial</span>
            </div>
          )}
        </div>

        {/* Summary preview */}
        {name && price && (
          <div
            style={{
              background: "rgba(0,102,255,0.07)",
              border: "1px solid rgba(0,102,255,0.2)",
              borderRadius: 14,
              padding: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display, system-ui, sans-serif)",
                fontWeight: 700,
                fontSize: 13,
                color: "rgba(175,197,255,0.6)",
                marginBottom: 10,
                textTransform: "uppercase",
                letterSpacing: 0.7,
              }}
            >
              Preview
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{name}</div>
            <div style={{ color: "#3FE7FF", fontFamily: "var(--font-mono, monospace)", fontWeight: 700, fontSize: 16 }}>
              ${price} / {frequency.toLowerCase()}
            </div>
            {trialMode === "set" && (
              <div style={{ fontSize: 12, color: "rgba(175,197,255,0.5)", marginTop: 4 }}>
                {trialDays}-day free trial
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          style={{
            width: "100%",
            minHeight: 54,
            background: isValid
              ? "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)"
              : "rgba(175,197,255,0.08)",
            border: "none",
            borderRadius: 14,
            color: isValid ? "#fff" : "rgba(175,197,255,0.35)",
            fontWeight: 700,
            fontSize: 16,
            cursor: isValid ? "pointer" : "not-allowed",
            fontFamily: "var(--font-display, system-ui, sans-serif)",
            transition: "opacity 0.2s",
          }}
        >
          Create Plan
        </button>
      </div>
    </div>
  );
}
