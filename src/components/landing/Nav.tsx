"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(249,248,245,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 5vw",
        height: 60,
      }}
    >
      <div style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>
        CreatorLens
      </div>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
        <li><a href="#features" style={{ textDecoration: "none", color: "var(--ink-muted)", fontSize: 14, transition: "color .2s" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-muted)")}>Features</a></li>
        <li><a href="#how" style={{ textDecoration: "none", color: "var(--ink-muted)", fontSize: 14, transition: "color .2s" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-muted)")}>How it works</a></li>
        <li><a href="#pricing" style={{ textDecoration: "none", color: "var(--ink-muted)", fontSize: 14, transition: "color .2s" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-muted)")}>Pricing</a></li>
      </ul>
      <Link
        href="#pricing"
        style={{
          background: "var(--ink)",
          color: "var(--bg)",
          border: "none",
          borderRadius: 6,
          padding: "9px 20px",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          textDecoration: "none",
          display: "inline-block",
          transition: "opacity .2s",
        }}
      >
        Get started →
      </Link>
    </nav>
  );
}
