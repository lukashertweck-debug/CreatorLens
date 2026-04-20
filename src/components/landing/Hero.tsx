"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) router.push(`/login?email=${encodeURIComponent(email)}`);
  }

  return (
    <section style={{ padding: "120px 5vw 100px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="animate-fadein"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--lime)",
            color: "var(--ink)",
            borderRadius: 20,
            padding: "5px 14px",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.3px",
            marginBottom: "2.5rem",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink)", display: "inline-block" }} />
          AI-powered content strategy
        </div>

        <h1
          className="animate-fadein-1"
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(52px, 8vw, 100px)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-2px",
            maxWidth: 820,
            marginBottom: "1.5rem",
          }}
        >
          Know exactly<br />
          <em style={{ fontStyle: "italic", fontWeight: 700 }}>what to post.</em>
        </h1>

        <p
          className="animate-fadein-2"
          style={{
            fontSize: "clamp(17px, 2vw, 20px)",
            color: "var(--ink-muted)",
            maxWidth: 480,
            lineHeight: 1.6,
            marginBottom: "2.5rem",
            fontWeight: 300,
          }}
        >
          CreatorLens analyzes your content, scans your competitors, and hands you a ready-to-execute topic plan — in 30 seconds.
        </p>

        <form
          onSubmit={handleSubmit}
          className="animate-fadein-3"
          style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "13px 18px",
              fontSize: 15,
              fontFamily: "var(--sans)",
              background: "white",
              color: "var(--ink)",
              outline: "none",
              width: 280,
            }}
          />
          <button
            type="submit"
            style={{
              background: "var(--ink)",
              color: "var(--bg)",
              border: "none",
              borderRadius: 8,
              padding: "13px 24px",
              fontSize: 15,
              fontWeight: 500,
              fontFamily: "var(--sans)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Start for free →
          </button>
        </form>

        <p className="animate-fadein-4" style={{ marginTop: "1rem", fontSize: 13, color: "var(--ink-muted)" }}>
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
