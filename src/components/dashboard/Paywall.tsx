"use client";

import { useState } from "react";

const plans = [
  { key: "starter", name: "Starter", price: "€9/mo", desc: "5 analyses/month · 2 competitors" },
  { key: "pro", name: "Pro ⭐", price: "€29/mo", desc: "Unlimited · All platforms · Calendar" },
  { key: "agency", name: "Agency", price: "€79/mo", desc: "10 accounts · White-label · API" },
];

export default function Paywall() {
  const [selected, setSelected] = useState("starter");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selected }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 999,
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ width: "100%", maxWidth: 460, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 900, marginBottom: "0.5rem" }}>
          CreatorLens
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: "2rem" }}>
          Choose a plan to unlock your dashboard.
        </p>

        <div style={{ border: "1px solid var(--border-md)", borderRadius: 16, padding: "2rem", background: "white", textAlign: "left" }}>
          <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 900, marginBottom: 6 }}>Unlock full access</div>
          <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            Analyze unlimited accounts, scan competitors in real time, and get a personalized topic checklist every month.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
            {plans.map(p => (
              <div
                key={p.key}
                onClick={() => setSelected(p.key)}
                style={{
                  border: `${selected === p.key ? "1.5px" : "1px"} solid ${selected === p.key ? "var(--ink)" : "var(--border-md)"}`,
                  borderRadius: 10,
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "border-color .15s",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>{p.desc}</div>
                </div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 900 }}>{p.price}</div>
              </div>
            ))}
          </div>

          {error && <p style={{ fontSize: 13, color: "var(--red)", marginBottom: "0.75rem" }}>{error}</p>}

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              width: "100%",
              background: "var(--lime)",
              color: "var(--ink)",
              border: "none",
              borderRadius: 8,
              padding: 13,
              fontSize: 15,
              fontWeight: 500,
              fontFamily: "var(--sans)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Redirecting to Stripe..." : "Pay with Stripe →"}
          </button>
          <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 10, textAlign: "center" }}>
            Secured by Stripe · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}
