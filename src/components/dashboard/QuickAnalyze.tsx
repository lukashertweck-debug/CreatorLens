"use client";

interface Props {
  onNewAnalysis: () => void;
}

export default function QuickAnalyze({ onNewAnalysis }: Props) {
  return (
    <div style={{
      background: "var(--ink)",
      color: "var(--bg)",
      borderRadius: 16,
      padding: "1.75rem",
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1.5rem",
      flexWrap: "wrap",
    }}>
      <div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 4 }}>
          Ready for your next report?
        </h3>
        <p style={{ fontSize: 14, color: "rgba(249,248,245,0.55)" }}>
          Drop in your latest posts and competitors — results in 30 seconds.
        </p>
      </div>
      <button
        onClick={onNewAnalysis}
        style={{
          background: "var(--lime)",
          color: "var(--ink)",
          border: "none",
          borderRadius: 8,
          padding: "11px 20px",
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "var(--sans)",
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Run new analysis →
      </button>
    </div>
  );
}
