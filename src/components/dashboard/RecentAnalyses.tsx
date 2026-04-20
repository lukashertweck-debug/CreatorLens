const analyses = [
  { platform: "IG", platformLabel: "IG", bg: "#f4c5e0", color: "#8B2A5E", handle: "@thechartistsmc", niche: "Finance", ago: "2 days ago", score: 74, trend: "+8", trendType: "pos" },
  { platform: "TT", platformLabel: "TT", bg: "#d4f0fb", color: "#0a5f7a", handle: "@thechartistsmc", niche: "Finance", ago: "5 days ago", score: 61, trend: "+3", trendType: "pos" },
  { platform: "YT", platformLabel: "YT", bg: "#fce8e8", color: "#a32d2d", handle: "@thechartistsmc", niche: "Finance", ago: "12 days ago", score: 48, trend: "-2", trendType: "neg" },
];

const scoreColor = (s: number) => s >= 70 ? "var(--green)" : s >= 55 ? "var(--amber)" : "var(--red)";

export default function RecentAnalyses() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, marginBottom: "1.5rem" }}>
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Recent analyses</div>
        <span style={{ fontSize: 12, color: "var(--ink-muted)", cursor: "pointer", textDecoration: "underline" }}>View all</span>
      </div>
      <div style={{ padding: "0 1.5rem" }}>
        {analyses.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 0", borderBottom: i < analyses.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: a.bg, color: a.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              {a.platformLabel}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{a.handle}</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>{a.niche} · Analyzed {a.ago}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 900, letterSpacing: "-1px", color: scoreColor(a.score) }}>{a.score}</div>
              <div style={{ fontSize: 11, color: a.trendType === "pos" ? "var(--green)" : "var(--red)" }}>↑ {a.trend}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
