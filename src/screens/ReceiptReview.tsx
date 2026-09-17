import { useState } from "react";

interface ReceiptData {
  vendor: string;
  date: string;
  total: string;
  tax: string;
  category: string;
  paymentMethod: string;
}

interface ReceiptReviewProps {
  onBack?: () => void;
  onSave?: (receipt: ReceiptData) => void;
}

const CATEGORIES = ["Meals", "Travel", "Office", "Personal", "Other"];
const PAYMENT_METHODS = ["Card", "Cash", "Bank Transfer", "Other"];

export default function ReceiptReview({ onBack, onSave }: ReceiptReviewProps) {
  const [vendor, setVendor] = useState("");
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");
  const [tax, setTax] = useState("");
  const [category, setCategory] = useState("Other");
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [saving, setSaving] = useState(false);

  const canSave = vendor.trim().length > 0 && total.trim().length > 0;

  function handleSave() {
    if (!canSave) return;
    setSaving(true);
    setTimeout(() => {
      onSave?.({ vendor, date, total, tax, category, paymentMethod });
      setSaving(false);
    }, 300);
  }

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
          right: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(0,102,255,0.12)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: -60,
          width: 220,
          height: 220,
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
          Review Receipt
        </h1>
        <div style={{ width: 40 }} />
      </div>

      {/* AI warning banner */}
      <div
        style={{
          margin: "0 20px 16px",
          background: "rgba(251,191,36,0.1)",
          border: "1px solid rgba(251,191,36,0.25)",
          borderRadius: 10,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
          <path d="M7 1.5L12.5 11.5H1.5L7 1.5Z" stroke="#fbbf24" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M7 5.5V8M7 9.5V10" stroke="#fbbf24" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span style={{ color: "#fbbf24", fontSize: 12, fontWeight: 500 }}>
          AI-assisted — please verify all fields
        </span>
      </div>

      {/* Scrollable form area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Vendor */}
        <FieldCard label="Vendor Name" required>
          <input
            type="text"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            placeholder="e.g. Starbucks"
            style={inputStyle}
          />
        </FieldCard>

        {/* Date */}
        <FieldCard label="Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ ...inputStyle, colorScheme: "dark" }}
          />
        </FieldCard>

        {/* Total */}
        <FieldCard label="Total Amount" required>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.4)",
                fontSize: 15,
                pointerEvents: "none",
              }}
            >
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="0.00"
              style={{ ...inputStyle, paddingLeft: 28 }}
            />
          </div>
        </FieldCard>

        {/* Tax */}
        <FieldCard label="Tax Amount" sublabel="optional">
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.4)",
                fontSize: 15,
                pointerEvents: "none",
              }}
            >
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              placeholder="0.00"
              style={{ ...inputStyle, paddingLeft: 28 }}
            />
          </div>
        </FieldCard>

        {/* Category */}
        <FieldCard label="Category">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.map((c) => (
              <ChipButton key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
            ))}
          </div>
        </FieldCard>

        {/* Payment Method */}
        <FieldCard label="Payment Method">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PAYMENT_METHODS.map((m) => (
              <ChipButton key={m} label={m} active={paymentMethod === m} onClick={() => setPaymentMethod(m)} />
            ))}
          </div>
        </FieldCard>

        {/* Disclaimer */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 16,
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, margin: 0, lineHeight: 1.6 }}>
            NOT FULLY VERIFIABLE IN FIGMA MAKE: AI extraction accuracy requires backend OCR — you are reviewing manually entered data
          </p>
        </div>
      </div>

      {/* Save CTA */}
      <div
        style={{
          padding: "12px 20px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <button
          onClick={handleSave}
          disabled={!canSave || saving}
          style={{
            width: "100%",
            padding: "16px 0",
            borderRadius: 14,
            border: "none",
            background:
              canSave && !saving
                ? "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)"
                : "rgba(255,255,255,0.1)",
            color: canSave && !saving ? "#fff" : "rgba(255,255,255,0.3)",
            fontSize: 16,
            fontWeight: 600,
            cursor: canSave && !saving ? "pointer" : "not-allowed",
            letterSpacing: "-0.01em",
            transition: "all 0.2s",
          }}
        >
          {saving ? "Saving..." : "Save Receipt"}
        </button>
        {!canSave && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textAlign: "center", marginTop: 8, marginBottom: 0 }}>
            Vendor and total amount are required
          </p>
        )}
      </div>
    </div>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  color: "#fff",
  fontSize: 15,
  padding: "12px 14px",
  boxSizing: "border-box",
};

function FieldCard({
  label,
  sublabel,
  required,
  children,
}: {
  label: string;
  sublabel?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 14,
        marginBottom: 12,
        overflow: "hidden",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          padding: "10px 14px 4px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </span>
        {required && (
          <span style={{ color: "#3FE7FF", fontSize: 11 }}>*</span>
        )}
        {sublabel && (
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>{sublabel}</span>
        )}
      </div>
      <div style={{ padding: "0 0 2px" }}>{children}</div>
    </div>
  );
}

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 14px",
        borderRadius: 20,
        border: active ? "1.5px solid rgba(63,231,255,0.6)" : "1px solid rgba(255,255,255,0.12)",
        background: active ? "rgba(0,102,255,0.25)" : "rgba(255,255,255,0.05)",
        color: active ? "#3FE7FF" : "rgba(255,255,255,0.6)",
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
