const testimonials = [
  {
    quote: "I used to spend hours figuring out what to post. CreatorLens gave me a 3-month content plan in the time it took me to make a coffee.",
    initials: "SL",
    name: "Sophie L.",
    handle: "@sophiecreates · 84k followers",
  },
  {
    quote: "The competitor gap analysis is scary good. I found out exactly why one account was beating me — and fixed it in two weeks.",
    initials: "MK",
    name: "Marcus K.",
    handle: "@marcusfinance · 210k followers",
  },
  {
    quote: "I run 6 client accounts. The Agency plan basically replaced half my strategy workflow. ROI was obvious in the first week.",
    initials: "AR",
    name: "Anya R.",
    handle: "Social media agency, Berlin",
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-1.5px", marginBottom: "3rem" }}>
          Creators who stopped guessing.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="grid-cols-1 md:grid-cols-3">
          {testimonials.map(t => (
            <div key={t.name} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem", background: "white" }}>
              <p style={{ fontSize: 15, lineHeight: 1.65, marginBottom: "1.5rem", fontStyle: "italic", color: "#2a2a24" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--ink)", flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>{t.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
