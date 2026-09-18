interface TransactionHoldExplainedProps {
  onBack?: () => void;
  onAppeal?: () => void;
  holdReason?: string;
  holdAmount?: string;
  holdDate?: string;
  appealDeadline?: string;
}

export default function TransactionHoldExplained({
  onBack,
  onAppeal,
  holdReason,
  holdAmount,
  holdDate,
  appealDeadline,
}: TransactionHoldExplainedProps) {
  const refNumber = holdDate
    ? holdDate.replace(/[^0-9]/g, "").slice(0, 10)
    : "—";

  const defaultReason =
    "This transaction triggered a routine compliance check. Common reasons include: transaction amount, unusual pattern for your account, or destination account flags.";

  const STEPS = [
    "Our team reviews the details — typically within 1 business day.",
    "We may contact you for additional information.",
    "You will be notified of the decision by push notification and email.",
  ];

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
          Your Transaction is on Hold
        </h1>
      </div>

      <div className="flex flex-col gap-4 px-6 pt-4 pb-10">
        {/* Status badge */}
        <div className="flex">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(245,183,0,0.12)",
              border: "1px solid rgba(245,183,0,0.3)",
            }}
          >
            <div
              className="rounded-full"
              style={{ width: 8, height: 8, background: "#F5B700" }}
            />
            <span className="text-sm font-semibold" style={{ color: "#F5B700" }}>
              On Hold
            </span>
          </div>
        </div>

        {/* Hold details card */}
        <div
          className="p-5 rounded-2xl"
          style={{
            background: "rgba(175,197,255,0.06)",
            border: "1px solid rgba(175,197,255,0.12)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-4"
            style={{ color: "rgba(175,197,255,0.4)" }}
          >
            Hold Details
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "rgba(175,197,255,0.5)" }}>
                Amount
              </span>
              <span
                className="text-base font-bold"
                style={{
                  background: "linear-gradient(135deg,#0066FF,#3FE7FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {holdAmount || "—"}
              </span>
            </div>
            <div
              style={{ height: 1, background: "rgba(175,197,255,0.06)" }}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "rgba(175,197,255,0.5)" }}>
                Date
              </span>
              <span className="text-sm font-medium">{holdDate || "—"}</span>
            </div>
            <div
              style={{ height: 1, background: "rgba(175,197,255,0.06)" }}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "rgba(175,197,255,0.5)" }}>
                Reference
              </span>
              <span
                className="text-sm font-medium font-mono"
                style={{ color: "rgba(175,197,255,0.6)" }}
              >
                #{refNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Reason */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "rgba(175,197,255,0.4)" }}
          >
            Reason
          </p>
          <div
            className="p-4 rounded-2xl"
            style={{
              background: "rgba(175,197,255,0.04)",
              border: "1px solid rgba(175,197,255,0.08)",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "rgba(175,197,255,0.7)" }}>
              {holdReason || defaultReason}
            </p>
          </div>
        </div>

        {/* What happens next */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "rgba(175,197,255,0.4)" }}
          >
            What Happens Next
          </p>
          <div
            className="p-5 rounded-2xl flex flex-col gap-4"
            style={{
              background: "rgba(175,197,255,0.06)",
              border: "1px solid rgba(175,197,255,0.12)",
            }}
          >
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0 text-xs font-bold"
                  style={{
                    width: 28,
                    height: 28,
                    background: "linear-gradient(135deg,rgba(0,102,255,0.2),rgba(63,231,255,0.15))",
                    border: "1px solid rgba(63,231,255,0.2)",
                    color: "#3FE7FF",
                  }}
                >
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed pt-0.5" style={{ color: "rgba(175,197,255,0.7)" }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Appeal section */}
        <div
          className="p-5 rounded-2xl"
          style={{
            background: "rgba(175,197,255,0.04)",
            border: "1px solid rgba(175,197,255,0.08)",
          }}
        >
          <p className="text-sm font-semibold mb-1">Believe this hold is incorrect?</p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(175,197,255,0.5)" }}>
            If you believe this hold is incorrect, you can appeal.
            {appealDeadline && (
              <span style={{ color: "rgba(245,183,0,0.8)" }}>
                {" "}Appeal by: {appealDeadline}.
              </span>
            )}
          </p>
          <button
            onClick={onAppeal}
            className="w-full h-12 font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg,#0066FF,#3FE7FF)",
              borderRadius: 14,
              color: "#fff",
            }}
          >
            Submit Appeal
          </button>
          <p className="text-xs text-center mt-3" style={{ color: "rgba(175,197,255,0.35)" }}>
            We commit to responding to all appeals within 2 business days.
          </p>
        </div>

        {/* Support note */}
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "rgba(175,197,255,0.03)",
            border: "1px solid rgba(175,197,255,0.06)",
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: "rgba(175,197,255,0.4)" }}>
            Need to speak with someone? Contact support directly from the{" "}
            <span
              className="font-semibold"
              style={{ color: "rgba(63,231,255,0.7)" }}
            >
              Help Center.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
