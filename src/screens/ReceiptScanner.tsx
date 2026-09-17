import { useState, useEffect } from "react";

interface ReceiptScannerProps {
  onBack?: () => void;
  onCaptured?: () => void;
}

export default function ReceiptScanner({ onBack, onCaptured }: ReceiptScannerProps) {
  const [detected, setDetected] = useState(false);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDetected(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  function handleCapture() {
    setCapturing(true);
    setTimeout(() => {
      onCaptured?.();
    }, 400);
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
          top: -120,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(0,102,255,0.15)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: -60,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(63,231,255,0.1)",
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
          Scan Receipt
        </h1>
        <div style={{ width: 40 }} />
      </div>

      {/* Viewfinder area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 320,
            height: 420,
          }}
        >
          {/* Dark camera surface */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.55)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Simulated camera noise texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)",
              }}
            />
            {/* Detection scan line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: 1,
                background: detected
                  ? "rgba(34,197,94,0.5)"
                  : "rgba(251,191,36,0.4)",
                transition: "background 0.4s",
                boxShadow: detected
                  ? "0 0 8px rgba(34,197,94,0.6)"
                  : "0 0 8px rgba(251,191,36,0.5)",
              }}
            />
          </div>

          {/* Corner bracket — top-left */}
          <svg
            style={{ position: "absolute", top: -2, left: -2 }}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M4 20V8C4 5.79 5.79 4 8 4H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Corner bracket — top-right */}
          <svg
            style={{ position: "absolute", top: -2, right: -2 }}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M12 4H24C26.21 4 28 5.79 28 8V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Corner bracket — bottom-left */}
          <svg
            style={{ position: "absolute", bottom: -2, left: -2 }}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M4 12V24C4 26.21 5.79 28 8 28H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Corner bracket — bottom-right */}
          <svg
            style={{ position: "absolute", bottom: -2, right: -2 }}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path d="M28 12V24C28 26.21 26.21 28 24 28H12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Frame guidance text */}
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 13,
            marginTop: 16,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          Position receipt within frame
        </p>

        {/* Detection status pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 20,
            background: detected
              ? "rgba(34,197,94,0.15)"
              : "rgba(251,191,36,0.15)",
            border: `1px solid ${detected ? "rgba(34,197,94,0.35)" : "rgba(251,191,36,0.35)"}`,
            transition: "all 0.4s",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: detected ? "#22c55e" : "#fbbf24",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: detected ? "#22c55e" : "#fbbf24",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {detected ? "Receipt detected ✓" : "Auto-detecting edges..."}
          </span>
        </div>
      </div>

      {/* Bottom actions */}
      <div
        style={{
          padding: "16px 20px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* AI note */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
            <circle cx="7" cy="7" r="6.5" stroke="rgba(255,255,255,0.35)" />
            <path d="M7 6V10M7 4.5V5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, margin: 0, lineHeight: 1.5 }}>
            AI assists with field extraction — always review before saving
          </p>
        </div>

        {/* Primary CTA */}
        <button
          onClick={handleCapture}
          disabled={capturing}
          style={{
            width: "100%",
            padding: "16px 0",
            borderRadius: 14,
            border: "none",
            background: capturing
              ? "rgba(0,102,255,0.5)"
              : "linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%)",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            cursor: capturing ? "default" : "pointer",
            letterSpacing: "-0.01em",
            transition: "opacity 0.2s",
          }}
        >
          {capturing ? "Capturing..." : "Capture"}
        </button>

        {/* Secondary CTA */}
        <button
          onClick={() => onCaptured?.()}
          disabled={capturing}
          style={{
            width: "100%",
            padding: "15px 0",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.85)",
            fontSize: 15,
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "-0.01em",
          }}
        >
          Choose from library
        </button>
      </div>
    </div>
  );
}
