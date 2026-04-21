"use client";

import { useState } from "react";
import type { ContentAnalysis } from "@/types/analysis";

interface Props {
  onClose: () => void;
  onSaved?: (analysis: { platform: string; handle: string; niche?: string; score: number; result: ContentAnalysis }) => void;
}

type Step = "account" | "competitors" | "loading" | "results";

const priBg: Record<string, string> = { high: "var(--red-bg)", medium: "var(--amber-bg)", low: "var(--lime-bg)" };
const priColor: Record<string, string> = { high: "var(--red)", medium: "var(--amber)", low: "var(--lime-dark)" };

export default function NewAnalysisModal({ onClose, onSaved }: Props) {
  const [step, setStep] = useState<Step>("account");
  const [platform, setPlatform] = useState("instagram");
  const [handle, setHandle] = useState("");
  const [niche, setNiche] = useState("");
  const [posts, setPosts] = useState("");
  const [competitors, setCompetitors] = useState(["", "", ""]);
  const [progressMsg, setProgressMsg] = useState("Starting analysis…");
  const [result, setResult] = useState<ContentAnalysis | null>(null);
  const [resultHandle, setResultHandle] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateCompetitor(i: number, val: string) {
    setCompetitors(prev => prev.map((c, idx) => (idx === i ? val : c)));
  }

  async function handleAnalyze() {
    setStep("loading");
    setProgressMsg("Starting analysis…");
    setError("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          handle,
          niche: niche || undefined,
          manualPosts: posts || undefined,
          competitors: competitors.filter(Boolean),
        }),
      });

      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";

        for (const chunk of lines) {
          const dataLine = chunk.replace(/^data: /, "");
          if (!dataLine) continue;
          try {
            const parsed = JSON.parse(dataLine);
            if (parsed.event === "progress") {
              setProgressMsg(parsed.message);
            } else if (parsed.event === "complete") {
              setResult(parsed.result as ContentAnalysis);
              setResultHandle(parsed.handle);
              setStep("results");
            } else if (parsed.event === "error") {
              setError(parsed.message ?? "Analysis failed");
              setStep("account");
            }
          } catch {
            // ignore malformed chunks
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("account");
    }
  }

  async function handleSave() {
    if (!result) return;
    setSaving(true);
    try {
      await fetch("/api/analyses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, handle: resultHandle, niche: niche || undefined, score: result.score, result }),
      });
      onSaved?.({ platform, handle: resultHandle, niche: niche || undefined, score: result.score, result });
    } finally {
      setSaving(false);
      onClose();
    }
  }

  const breakdown = result?.scoreBreakdown;
  const bars = breakdown
    ? [
        { label: "Posting consistency", pct: breakdown.postingConsistency },
        { label: "Hook strength", pct: breakdown.hookStrength },
        { label: "Niche depth", pct: breakdown.nicheDepth },
        { label: "Engagement rate", pct: breakdown.engagementRate },
        { label: "Content variety", pct: breakdown.contentVariety },
      ]
    : [];

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(14,14,11,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
      onClick={e => { if (e.target === e.currentTarget && step !== "loading") onClose(); }}
    >
      <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 560, maxHeight: "90vh", overflow: "auto", position: "relative" }}>
        {/* Header */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 900 }}>
              {step === "results" ? "Your content analysis" : "New analysis"}
            </div>
            {step === "account" && <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 2 }}>Step 1 of 2</div>}
            {step === "competitors" && <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 2 }}>Step 2 of 2</div>}
          </div>
          {step !== "loading" && (
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "var(--ink-muted)", lineHeight: 1 }}>×</button>
          )}
        </div>

        <div style={{ padding: "1.5rem" }}>
          {/* Step 1: Account */}
          {step === "account" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {error && (
                <div style={{ background: "var(--red-bg)", color: "var(--red)", borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
                  {error}
                </div>
              )}
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Platform</label>
                <select
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  style={{ width: "100%", border: "1px solid var(--border-md)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "var(--sans)", outline: "none", background: "white" }}
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>Your handle</label>
                <input
                  type="text"
                  placeholder="@yourhandle"
                  value={handle}
                  onChange={e => setHandle(e.target.value)}
                  style={{ width: "100%", border: "1px solid var(--border-md)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "var(--sans)", outline: "none" }}
                />
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
                <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 4 }}>
                  Paste recent post captions <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}>(optional — used if live fetch fails)</span>
                </label>
                <textarea
                  placeholder={"Post 1: How I went from 0 to 10k followers…\n\nPost 2: My morning routine for productivity…"}
                  value={posts}
                  onChange={e => setPosts(e.target.value)}
                  rows={4}
                  style={{ width: "100%", border: "1px solid var(--border-md)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "var(--sans)", outline: "none", resize: "vertical" }}
                />
              </div>
              <button
                onClick={() => setStep("competitors")}
                disabled={!handle}
                style={{ background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 500, fontFamily: "var(--sans)", cursor: !handle ? "not-allowed" : "pointer", opacity: !handle ? 0.5 : 1 }}
              >
                Next: Add competitors →
              </button>
            </div>
          )}

          {/* Step 2: Competitors */}
          {step === "competitors" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 4 }}>
                Add up to 3 competitor handles. We&apos;ll use them to find content gaps and opportunities.
              </p>
              {competitors.map((c, i) => (
                <div key={i}>
                  <label style={{ fontSize: 13, fontWeight: 500, display: "block", marginBottom: 6 }}>
                    Competitor {i + 1}{" "}
                    {i > 0 && <span style={{ color: "var(--ink-muted)", fontWeight: 400 }}>(optional)</span>}
                  </label>
                  <input
                    type="text"
                    placeholder="@handle"
                    value={c}
                    onChange={e => updateCompetitor(i, e.target.value)}
                    style={{ width: "100%", border: "1px solid var(--border-md)", borderRadius: 8, padding: "11px 14px", fontSize: 14, fontFamily: "var(--sans)", outline: "none" }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button
                  onClick={() => setStep("account")}
                  style={{ flex: 1, background: "transparent", color: "var(--ink)", border: "1.5px solid var(--border-md)", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 500, fontFamily: "var(--sans)", cursor: "pointer" }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleAnalyze}
                  style={{ flex: 2, background: "var(--lime)", color: "var(--ink)", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 500, fontFamily: "var(--sans)", cursor: "pointer" }}
                >
                  Run analysis →
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {step === "loading" && (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: 40, marginBottom: "1rem" }}>⚡</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Analysing your content…</div>
              <div style={{ fontSize: 14, color: "var(--ink-muted)" }}>{progressMsg}</div>
              <div style={{ marginTop: "1.5rem", height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--lime)", borderRadius: 2, animation: "progress-bar 8s ease-in-out infinite" }} />
              </div>
              <style>{`@keyframes progress-bar { 0%{width:5%} 40%{width:60%} 80%{width:85%} 100%{width:90%} }`}</style>
            </div>
          )}

          {/* Results */}
          {step === "results" && result && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 64, fontWeight: 900, letterSpacing: "-3px", lineHeight: 1 }}>{result.score}</div>
                <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                  out of 100<br />
                  <span style={{ fontSize: 11, background: "var(--lime-bg)", color: "var(--lime-dark)", padding: "2px 8px", borderRadius: 20 }}>
                    {result.dataSource === "scraped" ? "Live data" : result.dataSource === "manual" ? "Manual data" : "AI-inferred"}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: "1rem", lineHeight: 1.5 }}>{result.summary}</p>

              {bars.map(b => (
                <div key={b.label}>
                  <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 5, display: "flex", justifyContent: "space-between" }}>
                    <span>{b.label}</span><span>{b.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: "var(--border)", borderRadius: 3, marginBottom: 12, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${b.pct}%`, borderRadius: 3, background: "var(--lime)" }} />
                  </div>
                </div>
              ))}

              {result.strengths.length > 0 && (
                <div style={{ marginTop: "1.25rem" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>What you&apos;re doing right</div>
                  {result.strengths.map((s, i) => (
                    <div key={i} style={{ fontSize: 13, color: "var(--ink-muted)", padding: "4px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--lime-dark)" }}>✓</span> {s}
                    </div>
                  ))}
                </div>
              )}

              {result.improvements.length > 0 && (
                <div style={{ marginTop: "1.25rem", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Improvements</div>
                  {result.improvements.map((imp, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{imp.issue}</div>
                      <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>→ {imp.action}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: "0.75rem" }}>8-week content calendar</div>
                {result.contentCalendar.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: i < result.contentCalendar.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ fontSize: 11, color: "var(--ink-muted)", width: 40, flexShrink: 0, paddingTop: 1 }}>Wk {item.week}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{item.topic}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-muted)", marginTop: 2 }}>
                        {item.format} · &ldquo;{item.hook}&rdquo;
                      </div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 20, textTransform: "uppercase", flexShrink: 0, background: priBg[item.priority] ?? "var(--border)", color: priColor[item.priority] ?? "var(--ink)" }}>
                      {item.priority}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{ marginTop: "1.5rem", width: "100%", background: "var(--ink)", color: "var(--bg)", border: "none", borderRadius: 8, padding: 12, fontSize: 14, fontWeight: 500, fontFamily: "var(--sans)", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving…" : "Save to dashboard"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
