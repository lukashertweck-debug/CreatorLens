const steps = [
  { n: "1", title: "Describe your account", desc: "Enter your platform, niche, and paste a few recent post descriptions. No API keys needed." },
  { n: "2", title: "Add your competitors", desc: "Drop in up to 3 competitor handles. We search and analyze their public content in real time." },
  { n: "3", title: "Get your action plan", desc: "Receive a full breakdown with scores, gaps, and a ranked topic checklist ready to execute." },
];

const bars = [
  { label: "Posting consistency", pct: 82 },
  { label: "Hook strength", pct: 61 },
  { label: "Niche depth", pct: 78 },
];

const chips = [
  { label: "Day-in-the-life content", hot: true },
  { label: "Behind-the-scenes", hot: true },
  { label: "Income breakdowns", hot: false },
  { label: "Tool reviews", hot: false },
  { label: "Common mistakes", hot: false },
];

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-cols-1 md:grid-cols-2">
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 24, height: 1, background: "var(--ink-muted)" }} />
              How it works
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.1, maxWidth: 560 }}>
              Three inputs.<br />One unfair advantage.
            </h2>
            <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
              {steps.map(s => (
                <div key={s.n} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 13, fontWeight: 700, background: "var(--lime)", color: "var(--ink)", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    {s.n}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 500, marginBottom: 4, letterSpacing: "-0.2px" }}>{s.title}</h4>
                    <p style={{ fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }} className="hidden md:block">
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "1.5rem" }}>Content Score</div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 64, fontWeight: 900, letterSpacing: "-3px", lineHeight: 1 }}>74</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>
                out of 100<br />
                <span style={{ color: "#3B6D11", fontWeight: 500 }}>↑ +12 this week</span>
              </div>
            </div>
            {bars.map(b => (
              <div key={b.label}>
                <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
                  <span>{b.label}</span><span>{b.pct}%</span>
                </div>
                <div style={{ height: 5, background: "var(--border)", borderRadius: 3, marginBottom: 14, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${b.pct}%`, borderRadius: 3, background: "var(--lime)" }} />
                </div>
              </div>
            ))}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "1.5rem" }}>
              {chips.map(c => (
                <div
                  key={c.label}
                  style={{
                    border: `1px solid ${c.hot ? "var(--lime)" : "var(--border)"}`,
                    borderRadius: 20,
                    padding: "5px 12px",
                    fontSize: 12,
                    color: c.hot ? "var(--ink)" : "var(--ink-muted)",
                    background: c.hot ? "var(--lime)" : "transparent",
                    fontWeight: c.hot ? 500 : 400,
                  }}
                >
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
