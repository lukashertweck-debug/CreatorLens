"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) router.push(`/login?email=${encodeURIComponent(email)}`);
  }

  return (
    <section style={{ textAlign: "center", padding: "120px 5vw", background: "var(--ink)", color: "var(--bg)" }}>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 900, letterSpacing: "-3px", lineHeight: 1.0, maxWidth: 800, margin: "0 auto 2rem" }}>
        Stop guessing.<br /><em style={{ fontStyle: "italic" }}>Start growing.</em>
      </h2>
      <p style={{ fontSize: 18, color: "rgba(249,248,245,0.6)", fontWeight: 300, maxWidth: 420, margin: "0 auto" }}>
        Join 14,000+ creators who know exactly what to post every single week.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)", color: "var(--bg)", borderRadius: 8, padding: "13px 18px", fontSize: 15, fontFamily: "var(--sans)", outline: "none", width: 280 }}
        />
        <button
          type="submit"
          style={{ background: "var(--lime)", color: "var(--ink)", border: "none", borderRadius: 8, padding: "13px 24px", fontSize: 15, fontWeight: 500, fontFamily: "var(--sans)", cursor: "pointer" }}
        >
          Start for free →
        </button>
      </form>
      <p style={{ fontSize: 13, color: "rgba(249,248,245,0.4)", marginTop: "1rem" }}>
        No credit card required · Cancel anytime
      </p>
    </section>
  );
}
