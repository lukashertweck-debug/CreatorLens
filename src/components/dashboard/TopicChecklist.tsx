"use client";

import { useState } from "react";

const INITIAL_TOPICS = [
  { topic: "Day-in-the-life trader content", sub: "High demand, low competition", pri: "high", done: true },
  { topic: "My biggest trading loss story", sub: "Emotional hooks drive saves", pri: "high", done: true },
  { topic: "Explaining SMC in 60 seconds", sub: "Competitor gap — none do this short", pri: "high", done: false },
  { topic: "GER40 vs NAS100 breakdown", sub: "Your cross-asset edge = unique angle", pri: "high", done: true },
  { topic: "Morning routine before London open", sub: "Lifestyle content converts followers", pri: "med", done: true },
  { topic: "Tool review: TradingView setup", sub: "Evergreen, drives affiliate potential", pri: "med", done: false },
  { topic: "Reacting to major economic news", sub: "Top competitor format you're missing", pri: "med", done: true },
  { topic: "Common SMC mistakes beginners make", sub: "High search volume niche topic", pri: "low", done: false },
];

const priBg = { high: "var(--red-bg)", med: "var(--amber-bg)", low: "var(--lime-bg)" };
const priColor = { high: "var(--red)", med: "var(--amber)", low: "var(--lime-dark)" };

export default function TopicChecklist() {
  const [topics, setTopics] = useState(INITIAL_TOPICS);
  const doneCount = topics.filter(t => t.done).length;

  function toggle(i: number) {
    setTopics(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
  }

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, alignSelf: "start", position: "sticky", top: "2rem" }}>
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>This month&apos;s topics</div>
        <span style={{ fontSize: 11, color: "var(--ink-muted)" }}>{doneCount} / {topics.length} done</span>
      </div>
      <div style={{ padding: "0.5rem 1.5rem" }}>
        {topics.map((t, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: i < topics.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}
          >
            <div style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: t.done ? "none" : "1px solid var(--border-md)",
              background: t.done ? "var(--ink)" : "transparent",
              flexShrink: 0,
              marginTop: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {t.done && <span style={{ color: "white", fontSize: 10, lineHeight: 1 }}>✓</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, textDecoration: t.done ? "line-through" : "none", color: t.done ? "var(--ink-muted)" : "var(--ink)" }}>
                {t.topic}
              </div>
              <div style={{ fontSize: 11, color: "var(--ink-muted)", marginTop: 2 }}>{t.sub}</div>
            </div>
            <span style={{
              fontSize: 10,
              fontWeight: 500,
              padding: "2px 7px",
              borderRadius: 20,
              textTransform: "uppercase",
              flexShrink: 0,
              marginTop: 2,
              background: priBg[t.pri as keyof typeof priBg],
              color: priColor[t.pri as keyof typeof priColor],
            }}>
              {t.pri}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
