import { useState } from "react";

interface ConductComplaintProps {
  transactionId?: string;
  recipientName?: string;
  onBack?: () => void;
  onSubmit?: () => void;
}

const SUBTYPES = [
  "Damaged currency/item",
  "Inappropriate behaviour",
  "Threatening language",
  "Fraudulent misrepresentation",
  "Other",
];

export default function ConductComplaint({
  transactionId,
  recipientName,
  onBack,
  onSubmit,
}: ConductComplaintProps) {
  const [step, setStep] = useState(1);
  const [subtype, setSubtype] = useState("");
  const [description, setDescription] = useState("");
  const [evidenceAdded, setEvidenceAdded] = useState(false);

  const canProceedStep2 = subtype !== "" && description.trim().length >= 30;

  function handleIssueSelect(type: "payment" | "conduct") {
    if (type === "payment") {
      onBack?.();
    } else {
      setStep(2);
    }
  }

  function handleSubmit() {
    onSubmit?.();
  }

  const descTruncated =
    description.length > 100 ? description.slice(0, 100) + "…" : description;

  return (
    <div
      className="relative flex flex-col"
      style={{
        width: 390,
        minHeight: 844,
        background: "rgba(5,11,45,1)",
        fontFamily: "var(--font-body, system-ui, sans-serif)",
        color: "#fff",
        overflowY: "auto",
      }}
    >
      {/* Progress bar */}
      <div className="flex gap-2 px-6 pt-14 pb-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="flex-1 h-1 rounded-full"
            style={{
              background:
                s <= step
                  ? "linear-gradient(135deg,#0066FF,#3FE7FF)"
                  : "rgba(175,197,255,0.15)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-4 pb-2">
        <button
          onClick={step === 1 ? onBack : () => setStep(step - 1)}
          className="flex items-center justify-center rounded-full"
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
        <div>
          <p className="text-xs" style={{ color: "rgba(175,197,255,0.5)" }}>
            Step {step} of 3
          </p>
          <h1
            className="text-lg font-semibold leading-tight"
            style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
          >
            {step === 1 && "File a Report"}
            {step === 2 && "Describe the Issue"}
            {step === 3 && "Review & Submit"}
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pt-4 pb-10">
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <p className="text-sm" style={{ color: "rgba(175,197,255,0.6)" }}>
              What type of issue would you like to report?
            </p>

            {/* Payment Issue card */}
            <button
              onClick={() => handleIssueSelect("payment")}
              className="flex items-center gap-4 rounded-[--radius-2xl] p-5 text-left w-full"
              style={{
                background: "rgba(175,197,255,0.06)",
                border: "1px solid rgba(175,197,255,0.12)",
                borderRadius: 20,
              }}
            >
              <div
                className="flex items-center justify-center rounded-2xl flex-shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(0,102,255,0.15)",
                  border: "1px solid rgba(0,102,255,0.3)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="3"
                    stroke="#0066FF"
                    strokeWidth="1.7"
                  />
                  <path d="M2 10H22" stroke="#0066FF" strokeWidth="1.7" />
                  <rect x="5" y="14" width="4" height="2" rx="1" fill="#0066FF" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base">Payment Issue</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(175,197,255,0.5)" }}>
                  Wrong amount, failed transfer, or billing dispute
                </p>
              </div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M6.5 4L11.5 9L6.5 14"
                  stroke="#AFC5FF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Conduct / Quality Issue card */}
            <button
              onClick={() => handleIssueSelect("conduct")}
              className="flex items-center gap-4 rounded-[--radius-2xl] p-5 text-left w-full"
              style={{
                background: "rgba(175,197,255,0.06)",
                border: "1px solid rgba(175,197,255,0.12)",
                borderRadius: 20,
              }}
            >
              <div
                className="flex items-center justify-center rounded-2xl flex-shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(245,183,0,0.12)",
                  border: "1px solid rgba(245,183,0,0.3)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3L20 7V13C20 17.4 16.5 21.1 12 22C7.5 21.1 4 17.4 4 13V7L12 3Z"
                    stroke="#F5B700"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9V13"
                    stroke="#F5B700"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1" fill="#F5B700" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base">Conduct / Quality Issue</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(175,197,255,0.5)" }}>
                  Behaviour, language, or misrepresentation concern
                </p>
              </div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M6.5 4L11.5 9L6.5 14"
                  stroke="#AFC5FF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            {/* Sub-type chips */}
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: "rgba(175,197,255,0.7)" }}>
                What best describes the issue?
              </p>
              <div className="flex flex-wrap gap-2">
                {SUBTYPES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSubtype(st)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={{
                      background:
                        subtype === st
                          ? "linear-gradient(135deg,#0066FF,#3FE7FF)"
                          : "rgba(175,197,255,0.06)",
                      border:
                        subtype === st
                          ? "1px solid transparent"
                          : "1px solid rgba(175,197,255,0.12)",
                      color: subtype === st ? "#fff" : "rgba(175,197,255,0.7)",
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Description textarea */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "rgba(175,197,255,0.7)" }}>
                Describe what happened{" "}
                <span style={{ color: "rgba(175,197,255,0.4)", fontWeight: 400 }}>
                  (min 30 characters)
                </span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe the conduct issue in your own words. Be specific about what occurred."
                className="w-full p-4 text-sm resize-none outline-none"
                style={{
                  background: "rgba(175,197,255,0.06)",
                  border:
                    description.length > 0 && description.length < 30
                      ? "1px solid rgba(245,183,0,0.5)"
                      : "1px solid rgba(175,197,255,0.12)",
                  borderRadius: 16,
                  color: "#fff",
                }}
              />
              <p
                className="text-xs mt-1 text-right"
                style={{
                  color:
                    description.length < 30
                      ? "rgba(245,183,0,0.7)"
                      : "rgba(34,197,94,0.8)",
                }}
              >
                {description.length} / 30 minimum
              </p>
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
                  background: evidenceAdded
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(175,197,255,0.08)",
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
                  {evidenceAdded
                    ? "1 file added ✓"
                    : "Add photo or video evidence (optional)"}
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
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5">
                  <path
                    d="M9 2L15.5 5.5V10.5C15.5 13.8 12.7 16.8 9 17.5C5.3 16.8 2.5 13.8 2.5 10.5V5.5L9 2Z"
                    stroke="#F5B700"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(245,183,0,0.9)" }}>
                  Your report and any evidence are stored privately and reviewed only by ChangeAIPay
                  staff. Evidence is never displayed publicly, never attached to profiles, and{" "}
                  <span className="font-semibold">no facial recognition is used.</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!canProceedStep2}
              className="w-full h-14 font-semibold text-base rounded-[--radius-2xl] mt-2"
              style={{
                background: canProceedStep2
                  ? "linear-gradient(135deg,#0066FF,#3FE7FF)"
                  : "rgba(175,197,255,0.1)",
                borderRadius: 20,
                color: canProceedStep2 ? "#fff" : "rgba(175,197,255,0.3)",
                cursor: canProceedStep2 ? "pointer" : "not-allowed",
              }}
            >
              Continue to Review
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            {/* Summary card */}
            <div
              className="p-5 rounded-2xl flex flex-col gap-3"
              style={{
                background: "rgba(175,197,255,0.06)",
                border: "1px solid rgba(175,197,255,0.12)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "rgba(175,197,255,0.4)" }}
              >
                Report Summary
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "rgba(175,197,255,0.6)" }}>
                    Issue type
                  </span>
                  <span className="text-sm font-medium">{subtype || "—"}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm flex-shrink-0" style={{ color: "rgba(175,197,255,0.6)" }}>
                    Description
                  </span>
                  <span className="text-sm font-medium text-right">{descTruncated || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: "rgba(175,197,255,0.6)" }}>
                    Evidence
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: evidenceAdded ? "#22C55E" : "rgba(175,197,255,0.4)" }}
                  >
                    {evidenceAdded ? "1 file attached" : "None"}
                  </span>
                </div>
                {transactionId && (
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: "rgba(175,197,255,0.6)" }}>
                      Transaction
                    </span>
                    <span className="text-sm font-medium" style={{ color: "rgba(175,197,255,0.5)" }}>
                      #{transactionId}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy reassurance */}
            <div
              className="p-4 rounded-2xl"
              style={{
                background: "rgba(175,197,255,0.04)",
                border: "1px solid rgba(175,197,255,0.08)",
              }}
            >
              <p className="text-xs leading-relaxed" style={{ color: "rgba(175,197,255,0.5)" }}>
                This report is private to you and ChangeAIPay support only. The other party sees
                only that a conduct report was submitted — not its content.
              </p>
            </div>

            {/* Status note */}
            <div
              className="p-4 rounded-2xl"
              style={{
                background: "rgba(245,183,0,0.08)",
                border: "1px solid rgba(245,183,0,0.25)",
              }}
            >
              <p className="text-xs leading-relaxed" style={{ color: "rgba(245,183,0,0.9)" }}>
                You will receive a notification when review is complete. Typical review: 3–5
                business days.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full h-14 font-semibold text-base mt-2"
              style={{
                background: "linear-gradient(135deg,#0066FF,#3FE7FF)",
                borderRadius: 20,
                color: "#fff",
              }}
            >
              Submit Conduct Report
            </button>
          </>
        )}
      </div>
    </div>
  );
}
