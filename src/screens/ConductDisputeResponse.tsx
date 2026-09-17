import { useState } from "react";

interface ConductDisputeResponseProps {
  onBack?: () => void;
  onSubmit?: () => void;
  complaintType?: string;
}

export default function ConductDisputeResponse({
  onBack,
  onSubmit,
  complaintType,
}: ConductDisputeResponseProps) {
  const [response, setResponse] = useState("");
  const [evidenceAdded, setEvidenceAdded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    setSubmitted(true);
    onSubmit?.();
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center px-6"
        style={{
          width: 390,
          minHeight: 844,
          background: "rgba(5,11,45,1)",
          color: "#fff",
          fontFamily: "var(--font-body, system-ui, sans-serif)",
        }}
      >
        {/* Success icon */}
        <div
          className="flex items-center justify-center rounded-full mb-6"
          style={{
            width: 80,
            height: 80,
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M8 18L15 25L28 11"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2
          className="text-xl font-semibold text-center mb-3"
          style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
        >
          Response Submitted
        </h2>
        <p
          className="text-sm text-center leading-relaxed"
          style={{ color: "rgba(175,197,255,0.6)", maxWidth: 300 }}
        >
          ChangeAIPay will review both accounts and notify you of the outcome.
        </p>

        <button
          onClick={onBack}
          className="w-full h-14 font-semibold text-base mt-10"
          style={{
            background: "rgba(175,197,255,0.08)",
            border: "1px solid rgba(175,197,255,0.15)",
            borderRadius: 20,
            color: "rgba(175,197,255,0.85)",
          }}
        >
          Back to Home
        </button>
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
          Respond to Conduct Report
        </h1>
      </div>

      <div className="flex flex-col gap-4 px-6 pt-4 pb-10">
        {/* Neutral notice */}
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
              A conduct report has been submitted about a transaction you were involved in. You have
              the right to provide your account of what happened.
            </p>
          </div>
        </div>

        {/* What they are NOT shown */}
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "rgba(175,197,255,0.04)",
            border: "1px solid rgba(175,197,255,0.08)",
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
              <path
                d="M9 2L15.5 5.5V10.5C15.5 13.8 12.7 16.8 9 17.5C5.3 16.8 2.5 13.8 2.5 10.5V5.5L9 2Z"
                stroke="#AFC5FF"
                strokeWidth="1.4"
                strokeOpacity="0.5"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(175,197,255,0.5)" }}>
              <span className="font-semibold" style={{ color: "rgba(175,197,255,0.7)" }}>
                Note:
              </span>{" "}
              The report content and any evidence are not disclosed to you — this protects both
              parties during the review process.
            </p>
          </div>
        </div>

        {complaintType && (
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "rgba(175,197,255,0.4)" }}>
              Report category:
            </span>
            <span
              className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                background: "rgba(175,197,255,0.08)",
                border: "1px solid rgba(175,197,255,0.15)",
                color: "rgba(175,197,255,0.7)",
              }}
            >
              {complaintType}
            </span>
          </div>
        )}

        {/* Response textarea */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "rgba(175,197,255,0.7)" }}
          >
            Your response{" "}
            <span style={{ color: "rgba(175,197,255,0.4)", fontWeight: 400 }}>
              (optional but recommended)
            </span>
          </label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={6}
            placeholder="Describe your account of what happened during this transaction."
            className="w-full p-4 text-sm resize-none outline-none"
            style={{
              background: "rgba(175,197,255,0.06)",
              border: "1px solid rgba(175,197,255,0.12)",
              borderRadius: 16,
              color: "#fff",
            }}
          />
        </div>

        {/* Evidence upload */}
        <button
          onClick={() => setEvidenceAdded(true)}
          className="flex items-center gap-3 p-4 rounded-2xl w-full text-left"
          style={{
            background: "rgba(175,197,255,0.06)",
            border: "1px solid rgba(175,197,255,0.12)",
          }}
        >
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: 40,
              height: 40,
              background: evidenceAdded ? "rgba(34,197,94,0.12)" : "rgba(175,197,255,0.08)",
              border: evidenceAdded
                ? "1px solid rgba(34,197,94,0.3)"
                : "1px solid rgba(175,197,255,0.12)",
            }}
          >
            {evidenceAdded ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10L8 14L16 6"
                  stroke="#22C55E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 4V16M4 10H16"
                  stroke="#AFC5FF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">
              {evidenceAdded ? "1 file added ✓" : "Add photo or video evidence (optional)"}
            </p>
            {!evidenceAdded && (
              <p className="text-xs mt-0.5" style={{ color: "rgba(175,197,255,0.4)" }}>
                Tap to attach a file
              </p>
            )}
          </div>
        </button>

        {/* Privacy note */}
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
              <path
                d="M9 2L15.5 5.5V10.5C15.5 13.8 12.7 16.8 9 17.5C5.3 16.8 2.5 13.8 2.5 10.5V5.5L9 2Z"
                stroke="#F5B700"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(245,183,0,0.9)" }}>
              Your response and any evidence are stored privately and reviewed only by ChangeAIPay
              staff. Evidence is never displayed publicly, never attached to profiles, and{" "}
              <span className="font-semibold">no facial recognition is used.</span>
            </p>
          </div>
        </div>

        {/* Submit CTA */}
        <button
          onClick={handleSubmit}
          className="w-full h-14 font-semibold text-base mt-2"
          style={{
            background: "linear-gradient(135deg,#0066FF,#3FE7FF)",
            borderRadius: 20,
            color: "#fff",
          }}
        >
          Submit My Response
        </button>
      </div>
    </div>
  );
}
