export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "2.5rem 5vw", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 700 }}>CreatorLens</div>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", padding: 0, margin: 0 }}>
        {["Privacy", "Terms", "Contact"].map(l => (
          <li key={l}><a href="#" style={{ textDecoration: "none", color: "var(--ink-muted)", fontSize: 13 }}>{l}</a></li>
        ))}
      </ul>
      <span style={{ fontSize: 12, color: "var(--ink-muted)" }}>© 2026 CreatorLens. All rights reserved.</span>
    </footer>
  );
}
