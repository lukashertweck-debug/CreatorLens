const competitors = [
  { initials: "WS", bg: "#d4f0fb", color: "#0a5f7a", handle: "@wallstreetwatcher", stat: "IG · 312k followers · Posts daily", gap: "Gap: Uses \"reaction to news\" format you don't" },
  { initials: "TF", bg: "#ffe8c4", color: "#7a4a0a", handle: "@tradingfocused", stat: "IG · 88k followers · Posts 4×/week", gap: "Gap: Storytelling hooks outperform your data posts" },
  { initials: "MF", bg: "#e8d4fb", color: "#5a0a7a", handle: "@modernfinanceguy", stat: "TT · 1.2M followers · Posts 2×/day", gap: "Gap: Trending audio + finance = 3× your reach" },
];

export default function CompetitorOverview() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>Competitor overview</div>
        <span style={{ fontSize: 12, color: "var(--ink-muted)", cursor: "pointer", textDecoration: "underline" }}>Manage</span>
      </div>
      <div style={{ padding: "0 1.5rem" }}>
        {competitors.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < competitors.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
              {c.initials}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{c.handle}</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>{c.stat}</div>
              <div style={{ fontSize: 11, color: "var(--red)", fontWeight: 500, marginTop: 4 }}>{c.gap}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
