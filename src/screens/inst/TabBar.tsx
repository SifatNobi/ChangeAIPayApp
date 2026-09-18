import type { InstTab } from "./types"

const TABS: { id: InstTab; label: string; path: string }[] = [
  {
    id: "dashboard",
    label: "Home",
    path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  },
  {
    id: "overview",
    label: "Overview",
    path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    id: "monitor",
    label: "Monitor",
    path: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    id: "exceptions",
    label: "Alerts",
    path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  {
    id: "history",
    label: "Ledger",
    path: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "risk",
    label: "Risk",
    path: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
]

interface TabBarProps {
  active: InstTab
  onNavigate?: (tab: InstTab) => void
}

export function TabBar({ active, onNavigate }: TabBarProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 76,
        background: "rgba(4,11,28,0.92)",
        borderTop: "1px solid rgba(175,197,255,0.09)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 4px 8px",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active
        return (
          <div
            key={tab.id}
            onClick={() => onNavigate?.(tab.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              cursor: "pointer",
              padding: "8px 10px 4px",
              borderRadius: 12,
              background: isActive ? "linear-gradient(135deg, rgba(0,102,255,0.25) 0%, rgba(63,231,255,0.15) 100%)" : "transparent",
              border: isActive ? "1px solid rgba(63,231,255,0.2)" : "1px solid transparent",
              minWidth: 50,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isActive ? "#3FE7FF" : "rgba(175,197,255,0.35)"}
              strokeWidth={isActive ? 2 : 1.6}
            >
              <path d={tab.path} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div
              style={{
                fontSize: 9,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#3FE7FF" : "rgba(175,197,255,0.35)",
                letterSpacing: "0.02em",
              }}
            >
              {tab.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
