interface Metric {
  label: string;
  value: string;
  change: string;
  changeType: "pos" | "neg" | "neutral";
}

const metrics: Metric[] = [
  { label: "Avg. score", value: "74", change: "↑ +6 this month", changeType: "pos" },
  { label: "Analyses run", value: "12", change: "↑ 3 this week", changeType: "pos" },
  { label: "Competitors tracked", value: "7", change: "Across 3 accounts", changeType: "neutral" },
  { label: "Topics completed", value: "5/8", change: "63% done this month", changeType: "pos" },
];

const changeColor = { pos: "var(--green)", neg: "var(--red)", neutral: "var(--ink-muted)" };

export default function MetricCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }} className="grid-cols-2 lg:grid-cols-4">
      {metrics.map(m => (
        <div key={m.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--ink-muted)", marginBottom: 8 }}>
            {m.label}
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1, marginBottom: 4 }}>
            {m.value}
          </div>
          <div style={{ fontSize: 12, color: changeColor[m.changeType] }}>
            {m.change}
          </div>
        </div>
      ))}
    </div>
  );
}
