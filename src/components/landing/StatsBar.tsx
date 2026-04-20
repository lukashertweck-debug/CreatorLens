export default function StatsBar() {
  const stats = [
    { num: "14,200", suffix: "+", label: "creators analyzed" },
    { num: "94", suffix: "%", label: "report accuracy score" },
    { num: "3", suffix: "×", label: "faster content planning" },
  ];

  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "60px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }} className="grid-cols-1 md:grid-cols-3">
        {stats.map(s => (
          <div key={s.label}>
            <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, marginBottom: 8 }}>
              {s.num}<span style={{ color: "var(--lime-dark)" }}>{s.suffix}</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--ink-muted)", fontWeight: 400 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
