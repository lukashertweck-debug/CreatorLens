"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Props {
  userEmail: string;
  plan: string;
  isAdmin: boolean;
  activePage?: string;
}

const navItems = [
  {
    section: "Main",
    links: [
      { label: "Dashboard", page: "dashboard", icon: <svg viewBox="0 0 16 16" fill="none" width={16} height={16}><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4"/></svg> },
      { label: "Analyses", page: "analyses", icon: <svg viewBox="0 0 16 16" fill="none" width={16} height={16}><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
      { label: "Topic Calendar", page: "calendar", icon: <svg viewBox="0 0 16 16" fill="none" width={16} height={16}><path d="M2 4h12M2 8h8M2 12h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    ],
  },
  {
    section: "Insights",
    links: [
      { label: "Competitors", page: "competitors", icon: <svg viewBox="0 0 16 16" fill="none" width={16} height={16}><path d="M2 13L5 9l3 2 3-5 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
      { label: "Accounts", page: "accounts", icon: <svg viewBox="0 0 16 16" fill="none" width={16} height={16}><circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2.5 13.5c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
      { label: "Reports", page: "reports", icon: <svg viewBox="0 0 16 16" fill="none" width={16} height={16}><rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M5 8h6M5 5.5h3M5 10.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
    ],
  },
];

export default function Sidebar({ userEmail, plan, isAdmin, activePage = "dashboard" }: Props) {
  const router = useRouter();
  const initials = userEmail.split("@")[0].slice(0, 2).toUpperCase();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <div style={{
      width: "var(--sidebar-w)",
      minHeight: "100vh",
      flexShrink: 0,
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      padding: "1.25rem 0",
      position: "sticky",
      top: 0,
      height: "100vh",
    }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 900, padding: "0 1.25rem 1.5rem", letterSpacing: "-0.5px" }}>
        CreatorLens
      </div>

      {navItems.map(group => (
        <div key={group.section}>
          <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "var(--ink-muted)", padding: "0 1.25rem", marginBottom: 6, marginTop: "1rem" }}>
            {group.section}
          </div>
          {group.links.map(link => {
            const active = activePage === link.page;
            return (
              <a
                key={link.label}
                href="#"
                onClick={e => { e.preventDefault(); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 1.25rem",
                  fontSize: 14,
                  color: active ? "var(--ink)" : "var(--ink-muted)",
                  background: active ? "var(--bg)" : "transparent",
                  borderLeft: `2px solid ${active ? "var(--lime-dark)" : "transparent"}`,
                  fontWeight: active ? 500 : 400,
                  textDecoration: "none",
                  transition: "all .15s",
                }}
              >
                <span style={{ opacity: active ? 1 : 0.6, display: "flex" }}>{link.icon}</span>
                {link.label}
              </a>
            );
          })}
        </div>
      ))}

      <div style={{ marginTop: "auto", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
        <a
          href="#"
          onClick={e => { e.preventDefault(); }}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 1.25rem", fontSize: 14, color: "var(--ink-muted)", textDecoration: "none" }}
        >
          <svg viewBox="0 0 16 16" fill="none" width={16} height={16} style={{ opacity: 0.6 }}><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          Settings
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 1.25rem" }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--ink)", flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
              {initials}
              {isAdmin && (
                <span style={{ display: "inline-block", background: "var(--lime)", color: "var(--ink)", fontSize: 9, fontWeight: 700, letterSpacing: "0.5px", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>
                  Admin
                </span>
              )}
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-muted)" }}>
              {isAdmin ? "Owner · All access" : `${plan.charAt(0).toUpperCase() + plan.slice(1)} plan`}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-muted)", fontSize: 11, padding: 0 }}
          >
            ↩
          </button>
        </div>
      </div>
    </div>
  );
}
