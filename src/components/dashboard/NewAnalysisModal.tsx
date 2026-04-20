"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
}

type Step = "account" | "competitors" | "results";

const MOCK_RESULTS = {
  score: 74,
  change: "+12 this week",
  bars: [
    { label: "Posting consistency", pct: 82 },
    { label: "Hook strength", pct: 61 },
    { label: "Niche depth", pct: 78 },
  ],
  topics: [
    { topic: "Day-in-the-life content", sub: "High demand, low competition", pri: "high" },
    { topic: "Behind-the-scenes process", sub: "Builds trust + saves", pri: "high" },
    { topic: "Biggest mistake I made", sub: "Emotional hook, high shares", pri: "high" },
    { topic: "Tool breakdown (60s)", sub: "Competitor gap — none do this short", pri: "high" },
    { topic: "Monthly income breakdown", sub: "High curiosity, repeat views", pri: "med" },
    { topic: "Reacting to trending news", sub: "Top competitor format you're missing", pri: "med" },
    { topic: "Beginner mistakes in your niche", sub: "High search volume", pri: "med" },
    { topic: "My morning routine", sub: "Lifestyle content converts followers", pri: "low" },
  ],
};

const priBg = { high: "var(--red-bg)", med: "var(--amber-bg)", low: "var(--lime-bg)" };
const priColor = { high: "var(--red)", med: "var(--amber)", low: "var(--lime-dark)" };

export default function NewAnalysisModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>("account");
  const [platform, setPlatform] = useState("Instagram");
  const [niche, setNiche] = useState("");
  const [posts, setPosts] = useState("");
  const [competitors, setCompetitors] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  function updateCompetitor(i: number, val: string) {
    setCompetitors(prev => prev.map((c, idx) => idx === i ? val : c));
  }

  function handleAnalyze() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("results"); }, 2200);
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(14,14,11,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "90vh", overflow: "auto", position: "relative" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 900 }}>
              {step === "results" ? "Your content analysis" : "New analysis"}
            </div>
            {step !== "results" && (
              <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 2 }}>
                Step {step === "account" ? 1 : 2} of 2
              </div>
            )}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--ink-muted)", lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {step === "account" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Platform</label>
                <select
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  style={{ width: "100%", border: "1px solid var(--border-md)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "var(--sans)", outline: "none", background: "white" }}
                >
                  {["Instagram", "TikTok", "YouTube", "LinkedIn", "Twitter / X"].map(p => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Your niche</label>
                <input
                  type="text"
                  placeholder="e.g. Personal finance, fitness, travel"
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                  style={{ width: "100%", border: "1px solid var(--border-md)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "var(--sans)", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Paste 3–5 recent post descriptions</label>
                <textarea
                  placeholder="Post 1: How I went from 0 to 10k followers in 6 months..."
                  value={posts}
                  onChange={e => setPosts(e.target.value)}
                  rows={5}
                  style={{ width: "100%", border: "1px solid var(--border-md)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "var(--sans)", outline: "none", resize: "vertical" }}
                />
              </div>
              <button
                onClick={() => setStep("competitors")}
                disabled={!niche || !posts}
                style={{ background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 500, fontFamily: "var(--sans)", cursor: (!niche || !posts) ? "not-allowed" : "pointer", opacity: (!niche || !posts) ? 0.5 : 1 }}
              >
                Next: Add competitors →
              </button>
            </div>
          )}

          {step === "competitors" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 4 }}>
                Add up to 3 competitor handles. We&apos;ll scan their content in real time.
              </p>
              {competitors.map((c, i) => (
                <div key={i}>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Competitor {i + 1} {i > 0 && <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}>(optional)</span>}</label>
                  <input
                    type="text"
                    placeholder={`@handle`}
                    value={c}
                    onChange={e => updateCompetitor(i, e.target.value)}
                    style={{ width: "100%", border: "1px solid var(--border-md)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "var(--sans)", outline: "none" }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => setStep("account")} style={{ flex: 1, background: "transparent", color: "var(--ink)", border: "1.5px solid var(--border-md)", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 500, fontFamily: "var(--sans)", cursor: "pointer" }}>
                  ← Back
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !competitors[0]}
                  style={{ flex: 2, background: "var(--lime)", color: "var(--ink)", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 500, fontFamily: "var(--sans)", cursor: (!competitors[0] || loading) ? "not-allowed" : "pointer", opacity: (!competitors[0] || loading) ? 0.6 : 1 }}
                >
                  {loading ? "Analyzing... ⚡" : "Run analysis →"}
                </button>
              </div>
            </div>
          )}

          {step === "results" && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 64, fontWeight: 900, letterSpacing: "-3px", lineHeight: 1 }}>{MOCK_RESULTS.score}</div>
                <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                  out of 100<br />
                  <span style={{ color: "var(--green)", fontWeight: 500 }}>↑ {MOCK_RESULTS.change}</span>
                </div>
              </div>

              {MOCK_RESULTS.bars.map(b => (
                <div key={b.label}>
                  <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 5, display: "flex", justifyContent: "space-between" }}>
                    <span>{b.label}</span><span>{b.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: "var(--border)", borderRadius: 3, marginBottom: 12, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${b.pct}%`, borderRadius: 3, background: "var(--lime)" }} />
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: "0.75rem" }}>Your 8 topic priorities this month</div>
                {MOCK_RESULTS.topics.map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < MOCK_RESULTS.topics.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{t.topic}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-muted)", marginTop: 2 }}>{t.sub}</div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 20, textTransform: "uppercase", flexShrink: 0, background: priBg[t.pri as keyof typeof priBg], color: priColor[t.pri as keyof typeof priColor] }}>
                      {t.pri}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                style={{ marginTop: "1.5rem", width: "100%", background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: 8, padding: 12, fontSize: 14, fontWeight: 500, fontFamily: "var(--sans)", cursor: "pointer" }}
              >
                Save to dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
