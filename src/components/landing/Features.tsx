"use client";

const features = [
  {
    num: "01",
    name: "Account Analysis",
    desc: "Paste your recent posts and get an instant content score — strengths, blind spots, and what's holding back your growth.",
  },
  {
    num: "02",
    name: "Competitor Breakdown",
    desc: "We search your competitors in real time and decode exactly what they post, how often, and what gaps you can exploit.",
  },
  {
    num: "03",
    name: "Topic Checklist",
    desc: "Walk away with 8 prioritized topics to post about this month — each one backed by competitor data and niche demand.",
  },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "block", width: 24, height: 1, background: "var(--ink-muted)" }} />
            What you get
          </div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.1, maxWidth: 560 }}>
            Everything you need to outgrow your competition.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }} className="grid-cols-1 md:grid-cols-3">
          {features.map(f => (
            <div
              key={f.num}
              style={{ background: "var(--bg)", padding: "2.5rem 2rem", transition: "background 0.2s", cursor: "default" }}
              onMouseEnter={e => (e.currentTarget.style.background = "white")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--bg)")}
            >
              <div style={{ fontFamily: "var(--serif)", fontSize: 48, fontWeight: 900, color: "var(--lime)", lineHeight: 1, marginBottom: "1.5rem", letterSpacing: "-2px" }}>{f.num}</div>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: "0.75rem", letterSpacing: "-0.3px" }}>{f.name}</div>
              <p style={{ fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
