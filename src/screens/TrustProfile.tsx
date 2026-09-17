interface TrustProfileProps {
  recipientName?: string;
  memberSince?: string;
  kycVerified?: boolean;
  resolvedIssues?: number;
  issuesLast12Months?: number;
  onBack?: () => void;
  onContinue?: () => void;
}

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function TrustProfile({
  recipientName,
  memberSince,
  kycVerified = false,
  resolvedIssues = 0,
  issuesLast12Months = 0,
  onBack,
  onContinue,
}: TrustProfileProps) {
  const initials = getInitials(recipientName);
  const displayName = recipientName || "Unknown User";

  let conductNode: React.ReactNode;
  if (resolvedIssues === 0) {
    conductNode = (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-full self-start"
        style={{
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.25)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#22C55E" strokeWidth="1.3" />
          <path d="M4 7L6 9L10 5" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-medium" style={{ color: "#22C55E" }}>
          No conduct history on this account
        </span>
      </div>
    );
  } else if (issuesLast12Months === 0) {
    conductNode = (
      <div
        className="p-3 rounded-2xl"
        style={{
          background: "rgba(175,197,255,0.06)",
          border: "1px solid rgba(175,197,255,0.12)",
        }}
      >
        <p className="text-sm" style={{ color: "rgba(175,197,255,0.7)" }}>
          <span className="font-semibold text-white">{resolvedIssues}</span> resolved conduct
          issue{resolvedIssues !== 1 ? "s" : ""} total.{" "}
          <span style={{ color: "#22C55E" }}>None in the past 12 months.</span>
        </p>
      </div>
    );
  } else {
    conductNode = (
      <div
        className="p-3 rounded-2xl"
        style={{
          background: "rgba(245,183,0,0.08)",
          border: "1px solid rgba(245,183,0,0.25)",
        }}
      >
        <div className="flex gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="6.5" stroke="#F5B700" strokeWidth="1.3" />
            <path d="M8 5V8.5" stroke="#F5B700" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.7" fill="#F5B700" />
          </svg>
          <p className="text-sm" style={{ color: "rgba(245,183,0,0.9)" }}>
            <span className="font-semibold">{issuesLast12Months}</span> resolved conduct
            issue{issuesLast12Months !== 1 ? "s" : ""} in the past 12 months.
          </p>
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
      <div className="flex items-center justify-between px-6 pt-14 pb-2">
        <h1
          className="text-lg font-semibold"
          style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
        >
          Recipient Trust Profile
        </h1>
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 44,
            height: 44,
            background: "rgba(175,197,255,0.06)",
            border: "1px solid rgba(175,197,255,0.12)",
          }}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
              stroke="#AFC5FF"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-5 px-6 pt-4 pb-10">
        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div
            className="flex items-center justify-center rounded-full text-2xl font-bold"
            style={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg,rgba(0,102,255,0.25),rgba(63,231,255,0.15))",
              border: "2px solid rgba(63,231,255,0.25)",
              color: "#3FE7FF",
              fontFamily: "var(--font-display, system-ui, sans-serif)",
            }}
          >
            {initials}
          </div>
          <div className="text-center">
            <p
              className="text-xl font-semibold"
              style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
            >
              {displayName}
            </p>
            {memberSince ? (
              <p className="text-sm mt-1" style={{ color: "rgba(175,197,255,0.5)" }}>
                {kycVerified ? "Verified member" : "Member"} since {memberSince}
              </p>
            ) : (
              <p className="text-sm mt-1" style={{ color: "rgba(175,197,255,0.35)" }}>
                Member since date not available
              </p>
            )}
          </div>

          {/* KYC badge */}
          {kycVerified ? (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L12 3.5V7.5C12 10.2 9.8 12.9 7 13.5C4.2 12.9 2 10.2 2 7.5V3.5L7 1Z"
                  stroke="#22C55E"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 7L6.5 8.5L9.5 5.5"
                  stroke="#22C55E"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-semibold" style={{ color: "#22C55E" }}>
                Identity Verified
              </span>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(175,197,255,0.06)",
                border: "1px solid rgba(175,197,255,0.15)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1L12 3.5V7.5C12 10.2 9.8 12.9 7 13.5C4.2 12.9 2 10.2 2 7.5V3.5L7 1Z"
                  stroke="rgba(175,197,255,0.35)"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-medium" style={{ color: "rgba(175,197,255,0.4)" }}>
                Identity Not Verified
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(175,197,255,0.08)" }} />

        {/* Conduct history */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "rgba(175,197,255,0.4)" }}
          >
            Conduct History
          </p>
          {conductNode}
        </div>

        {/* Disclaimer */}
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "rgba(175,197,255,0.04)",
            border: "1px solid rgba(175,197,255,0.08)",
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: "rgba(175,197,255,0.45)" }}>
            Conduct history shows only resolved ChangeAIPay cases — not allegations, unresolved
            reports, or external data.{" "}
            <span className="font-semibold" style={{ color: "rgba(175,197,255,0.6)" }}>
              This is not an AI risk score.
            </span>
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onContinue}
          className="w-full h-14 font-semibold text-base mt-2"
          style={{
            background: "linear-gradient(135deg,#0066FF,#3FE7FF)",
            borderRadius: 20,
            color: "#fff",
          }}
        >
          Continue with Payment
        </button>

        <button
          onClick={onBack}
          className="w-full h-12 font-medium text-sm"
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(175,197,255,0.45)",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
