import { useState } from "react";

interface MistakenPaymentRequestProps {
  transactionId?: string;
  recipientName?: string;
  amount?: string;
  onBack?: () => void;
  onSubmit?: () => void;
}

export default function MistakenPaymentRequest({
  transactionId,
  recipientName,
  amount,
  onBack,
  onSubmit,
}: MistakenPaymentRequestProps) {
  const [status, setStatus] = useState<"form" | "submitted">("form");
  const [description, setDescription] = useState("");

  const displayName = recipientName || "Unknown recipient";
  const displayAmount = amount || "—";

  function handleSend() {
    setStatus("submitted");
    onSubmit?.();
  }

  const today = new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (status === "submitted") {
    return (
      <div
        className="flex flex-col"
        style={{
          width: 390,
          minHeight: 844,
          background: "rgba(5,11,45,1)",
          color: "#fff",
          fontFamily: "var(--font-body, system-ui, sans-serif)",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="px-6 pt-14 pb-2">
          <h1
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
          >
            Return Request Sent
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(175,197,255,0.5)" }}>
            Mistaken payment to {displayName}
          </p>
        </div>

        <div className="flex flex-col gap-4 px-6 pt-4 pb-10">
          {/* Status tracker */}
          <div
            className="p-5 rounded-2xl"
            style={{
              background: "rgba(175,197,255,0.06)",
              border: "1px solid rgba(175,197,255,0.12)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ color: "rgba(175,197,255,0.4)" }}
            >
              Request Status
            </p>

            {/* Step 1: Requested */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "linear-gradient(135deg,#0066FF,#3FE7FF)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M4 9L7.5 12.5L14 5.5"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  className="w-0.5 mt-1"
                  style={{ height: 32, background: "rgba(175,197,255,0.12)" }}
                />
              </div>
              <div className="pt-1.5">
                <p className="text-sm font-semibold">Requested</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(175,197,255,0.4)" }}>
                  Return request sent
                </p>
              </div>
            </div>

            {/* Step 2: Awaiting Response */}
            <div className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(245,183,0,0.12)",
                    border: "2px solid rgba(245,183,0,0.5)",
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{ width: 10, height: 10, background: "#F5B700" }}
                  />
                </div>
                <div
                  className="w-0.5 mt-1"
                  style={{ height: 32, background: "rgba(175,197,255,0.12)" }}
                />
              </div>
              <div className="pt-1.5">
                <p className="text-sm font-semibold" style={{ color: "#F5B700" }}>
                  Awaiting Response
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(175,197,255,0.4)" }}>
                  Waiting for {displayName}
                </p>
              </div>
            </div>

            {/* Step 3: Resolved */}
            <div className="flex gap-4 items-start">
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(175,197,255,0.06)",
                  border: "1px solid rgba(175,197,255,0.12)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="rgba(175,197,255,0.25)" strokeWidth="1.4" />
                </svg>
              </div>
              <div className="pt-1.5">
                <p className="text-sm font-semibold" style={{ color: "rgba(175,197,255,0.3)" }}>
                  Resolved
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(175,197,255,0.25)" }}>
                  Pending
                </p>
              </div>
            </div>
          </div>

          {/* Recipient note */}
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "rgba(175,197,255,0.04)",
              border: "1px solid rgba(175,197,255,0.08)",
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: "rgba(175,197,255,0.5)" }}>
              The recipient has been notified and can return funds with one tap. You will be
              notified of their response.
            </p>
          </div>

          {/* Expiry note */}
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "rgba(245,183,0,0.08)",
              border: "1px solid rgba(245,183,0,0.25)",
            }}
          >
            <p className="text-xs leading-relaxed" style={{ color: "rgba(245,183,0,0.9)" }}>
              If the recipient does not respond within 14 days, the request will expire.
              ChangeAIPay cannot compel a return.
            </p>
          </div>

          <button
            onClick={onBack}
            className="w-full h-14 font-semibold text-base mt-2"
            style={{
              background: "rgba(175,197,255,0.08)",
              border: "1px solid rgba(175,197,255,0.15)",
              borderRadius: 20,
              color: "rgba(175,197,255,0.85)",
            }}
          >
            Back to Transaction
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col"
      style={{
        width: 390,
        minHeight: 844,
        background: "rgba(5,11,45,1)",
        color: "#fff",
        fontFamily: "var(--font-body, system-ui, sans-serif)",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-14 pb-2">
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: "rgba(175,197,255,0.06)",
            border: "1px solid rgba(175,197,255,0.12)",
          }}
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="#AFC5FF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1
          className="text-lg font-semibold leading-tight"
          style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
        >
          Mistaken Payment Request
        </h1>
      </div>

      <div className="flex flex-col gap-4 px-6 pt-4 pb-10">
        {/* Transaction card */}
        <div
          className="p-5 rounded-2xl"
          style={{
            background: "rgba(175,197,255,0.06)",
            border: "1px solid rgba(175,197,255,0.12)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "rgba(175,197,255,0.4)" }}
          >
            Transaction
          </p>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-full text-sm font-bold"
                style={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg,#0066FF33,#3FE7FF22)",
                  border: "1px solid rgba(63,231,255,0.2)",
                  color: "#3FE7FF",
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold">{displayName}</p>
                <p className="text-xs" style={{ color: "rgba(175,197,255,0.4)" }}>
                  {today}
                </p>
              </div>
            </div>
            <p
              className="text-lg font-bold"
              style={{
                background: "linear-gradient(135deg,#0066FF,#3FE7FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {displayAmount}
            </p>
          </div>
          {transactionId && (
            <p className="text-xs mt-1" style={{ color: "rgba(175,197,255,0.3)" }}>
              Ref: #{transactionId}
            </p>
          )}
        </div>

        {/* Legal disclaimer */}
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "rgba(245,183,0,0.08)",
            border: "1px solid rgba(245,183,0,0.25)",
          }}
        >
          <div className="flex gap-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="flex-shrink-0 mt-0.5"
            >
              <circle cx="9" cy="9" r="7.5" stroke="#F5B700" strokeWidth="1.4" />
              <path d="M9 5.5V9.5" stroke="#F5B700" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="12" r="0.8" fill="#F5B700" />
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(245,183,0,0.9)" }}>
              ChangeAIPay cannot force the return of funds. This sends a formal request to{" "}
              <span className="font-semibold">{displayName}</span> asking them to voluntarily return
              the payment. Their response is entirely their own choice.
            </p>
          </div>
        </div>

        {/* Optional description */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "rgba(175,197,255,0.7)" }}
          >
            Why was this sent in error?{" "}
            <span style={{ color: "rgba(175,197,255,0.4)", fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Briefly explain why you are requesting a return. This may help the recipient respond."
            className="w-full p-4 text-sm resize-none outline-none"
            style={{
              background: "rgba(175,197,255,0.06)",
              border: "1px solid rgba(175,197,255,0.12)",
              borderRadius: 16,
              color: "#fff",
            }}
          />
        </div>

        <button
          onClick={handleSend}
          className="w-full h-14 font-semibold text-base mt-2"
          style={{
            background: "linear-gradient(135deg,#0066FF,#3FE7FF)",
            borderRadius: 20,
            color: "#fff",
          }}
        >
          Send Return Request
        </button>
      </div>
    </div>
  );
}
