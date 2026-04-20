"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const plan = searchParams.get("plan");
  const authError = searchParams.get("error");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setLoading(true);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback${plan ? `?next=/dashboard?plan=${plan}` : ""}`;

    const { error: authErr } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    setLoading(false);
    if (authErr) {
      setError(authErr.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ width: "100%", maxWidth: 420, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 900, marginBottom: "0.5rem" }}>
          CreatorLens
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: "2.5rem" }}>
          {sent ? "Check your email" : "Sign in or create your account to continue."}
        </p>

        {authError && (
          <div style={{ fontSize: 13, color: "var(--red)", marginBottom: "1rem", padding: "10px 14px", background: "var(--red-bg)", borderRadius: 8 }}>
            Authentication failed. Please try again.
          </div>
        )}

        {sent ? (
          <div style={{ border: "1px solid var(--border)", borderRadius: 16, padding: "2rem", background: "white", textAlign: "left" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Magic link sent ✓</div>
            <p style={{ fontSize: 14, color: "var(--ink-muted)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              We&apos;ve sent a sign-in link to <strong>{email}</strong>. Click it to access your dashboard.
            </p>
            <button
              onClick={() => setSent(false)}
              style={{ fontSize: 13, color: "var(--ink-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              style={{
                border: "1px solid var(--border-md)",
                borderRadius: 8,
                padding: "13px 16px",
                fontSize: 15,
                fontFamily: "var(--sans)",
                background: "white",
                color: "var(--ink)",
                outline: "none",
              }}
            />
            {error && <p style={{ fontSize: 13, color: "var(--red)", margin: 0 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "var(--ink)",
                color: "var(--bg)",
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
              {loading ? "Sending..." : "Continue →"}
            </button>
          </form>
        )}

        <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: "1rem" }}>
          No spam · Unsubscribe anytime
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
