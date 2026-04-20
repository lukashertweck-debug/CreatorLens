"use client";

import { useRouter } from "next/navigation";

const plans = [
  {
    key: "starter",
    name: "Starter",
    price: "€9",
    period: "per month",
    features: [
      "5 analyses per month",
      "Up to 2 competitors per report",
      "Topic checklist (8 topics)",
      "Content score + breakdown",
      "Instagram & TikTok",
    ],
    featured: false,
  },
  {
    key: "pro",
    name: "Pro",
    price: "€29",
    period: "per month",
    features: [
      "Unlimited analyses",
      "Up to 3 competitors per report",
      "All platforms supported",
      "Monthly content calendar",
      "Priority support",
      "Export to PDF",
    ],
    featured: true,
    badge: "Most popular",
  },
  {
    key: "agency",
    name: "Agency",
    price: "€79",
    period: "per month",
    features: [
      "Everything in Pro",
      "Manage 10 client accounts",
      "White-label reports",
      "Team seats (up to 5)",
      "API access",
      "Dedicated account manager",
    ],
    featured: false,
  },
];

export default function Pricing() {
  const router = useRouter();

  function handlePlan(key: string) {
    router.push(`/login?plan=${key}`);
  }

  return (
    <section id="pricing" style={{ padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(38px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05 }}>
            Simple pricing.<br /><em style={{ fontStyle: "italic" }}>Serious results.</em>
          </h2>
          <p style={{ fontSize: 16, color: "var(--ink-muted)", marginTop: "1rem", fontWeight: 300 }}>
            Start free, upgrade when you&apos;re growing.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="grid-cols-1 md:grid-cols-3">
          {plans.map(p => (
            <div
              key={p.key}
              style={{
                border: `1px solid ${p.featured ? "var(--ink)" : "var(--border)"}`,
                borderRadius: 16,
                padding: "2rem",
                background: p.featured ? "var(--ink)" : "white",
                color: p.featured ? "var(--bg)" : "var(--ink)",
                position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(14,14,11,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {p.badge && (
                <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "var(--lime)", color: "var(--ink)", fontSize: 11, fontWeight: 500, letterSpacing: "0.5px", padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>
                  {p.badge}
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "1.5rem", color: p.featured ? "rgba(249,248,245,0.6)" : "var(--ink)" }}>
                {p.name}
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 52, fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, marginBottom: 4 }}>
                {p.price}
              </div>
              <div style={{ fontSize: 13, color: p.featured ? "rgba(249,248,245,0.5)" : "var(--ink-muted)", marginBottom: "2rem" }}>
                {p.period}
              </div>
              <hr style={{ border: "none", borderTop: `1px solid ${p.featured ? "rgba(249,248,245,0.15)" : "var(--border)"}`, marginBottom: "1.5rem" }} />
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: "2rem" }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 12, color: p.featured ? "var(--lime)" : "var(--lime-dark)", background: p.featured ? "rgba(200,255,0,0.1)" : "rgba(200,255,0,0.15)", width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlan(p.key)}
                style={{
                  width: "100%",
                  border: p.featured ? "1.5px solid rgba(249,248,245,0.3)" : "1.5px solid var(--ink)",
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "var(--sans)",
                  cursor: "pointer",
                  background: p.featured ? "var(--bg)" : "transparent",
                  color: "var(--ink)",
                  transition: "all .2s",
                }}
                onMouseEnter={e => {
                  if (p.featured) { e.currentTarget.style.background = "var(--lime)"; e.currentTarget.style.borderColor = "var(--lime)"; }
                  else { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--bg)"; }
                }}
                onMouseLeave={e => {
                  if (p.featured) { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "rgba(249,248,245,0.3)"; }
                  else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }
                }}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
