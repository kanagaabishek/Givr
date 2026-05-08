"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { StatusBar } from "@/components/Nav";
import { Progress, ProgramTile } from "@/components/Primitives";
import Icon from "@/components/Icons";
import { PROGRAMS, fmtCurrency, pct } from "@/lib/data";

export default function ProgramDetailPage() {
  const router = useRouter();
  const params = useParams();
  const p = PROGRAMS.find(x => x.id === params.id) || PROGRAMS[0];
  const [tab, setTab] = useState("story");
  const [shared, setShared] = useState(false);
  const percent = pct(p.raised, p.goal);

  const updates = [
    { date: "2 days ago", title: "Borehole #4 hit clean water", body: "Drilling crew at Eswazini reached aquifer at 38m. Test results: zero contamination. Hand-pump goes in next week." },
    { date: "1 wk ago", title: "Community committee formed", body: "11 villagers (7 women) elected to maintain wells and collect a small monthly upkeep fee." },
    { date: "3 wks ago", title: "Funding milestone: 50%", body: "Crossed half-funded thanks to 412 new donors this month. Ordering supplies for next 6 wells." },
  ];

  const recentDonors = [
    { name: "Anonymous", amount: 25, when: "12 min ago" },
    { name: "Diego A.", amount: 100, when: "2 hr ago" },
    { name: "The Larsen family", amount: 250, when: "5 hr ago" },
    { name: "Anonymous", amount: 15, when: "8 hr ago" },
    { name: "Maya R.", amount: 50, when: "yesterday" },
    { name: "Open Earth Lab", amount: 1000, when: "yesterday" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)" }}>
      <StatusBar />

      {/* Sticky compact nav */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px", borderBottom: "1px solid var(--line-soft)",
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(8px)", zIndex: 22, flexShrink: 0,
      }}>
        <button onClick={() => router.back()} style={{ background: "var(--bg-soft)", border: "none", borderRadius: 10, width: 34, height: 34, display: "grid", placeItems: "center", color: "var(--ink)" }}>
          <Icon name="chevronLeft" size={18} />
        </button>
        <div style={{ flex: 1, fontSize: 11, color: "var(--muted)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
          <span>Programs</span> / <span style={{ color: "var(--ink-3)" }}>{p.category}</span> / <span style={{ color: "var(--ink)", fontWeight: 600 }}>{p.title}</span>
        </div>
        <button
          onClick={() => { setShared(true); setTimeout(() => setShared(false), 1800); }}
          style={{ background: "var(--bg-soft)", border: "none", borderRadius: 10, width: 34, height: 34, display: "grid", placeItems: "center", color: "var(--ink)", position: "relative" }}
        >
          <Icon name="share" size={16} />
          {shared && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              background: "var(--ink)", color: "var(--bg-alt)",
              padding: "8px 12px", borderRadius: 10, fontSize: 11, fontWeight: 500, whiteSpace: "nowrap",
              boxShadow: "var(--shadow-md)",
            }}>
              Link copied <Icon name="check" size={11} stroke={2.5} style={{ verticalAlign: "-2px", marginLeft: 4, color: "var(--accent-2)" }} />
            </div>
          )}
        </button>
        <button style={{ background: "var(--bg-soft)", border: "none", borderRadius: 10, width: 34, height: 34, display: "grid", placeItems: "center", color: "var(--ink)" }}>
          <Icon name="bookmark" size={16} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }} className="page-enter">
        {/* Hero */}
        <div style={{ position: "relative", height: 240 }}>
          <ProgramTile icon={p.icon} tone={p.tone} label={p.category} full />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,.5))" }} />
          <div style={{ position: "absolute", left: 18, right: 18, bottom: 14, color: "white" }}>
            <div className="row" style={{ gap: 8, marginBottom: 6, fontSize: 11, opacity: .9 }}>
              <Icon name="pin" size={12} stroke={2} /> {p.location}
              <span style={{ opacity: .6 }}>·</span>
              <Icon name="clock" size={12} stroke={2} /> {p.days} days left
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{ padding: "20px 20px 4px" }}>
          <h1 className="display" style={{ fontSize: 28, margin: "0 0 10px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>{p.title}</h1>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--ink-3)" }}>{p.short}</p>
        </div>

        {/* Funding card */}
        <div style={{ padding: "16px 20px 0" }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="row row--between" style={{ alignItems: "baseline", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{fmtCurrency(p.raised)}</div>
                <div className="muted" style={{ fontSize: 12 }}>raised of {fmtCurrency(p.goal)} goal</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.02em" }}>{percent}%</div>
                <div className="muted" style={{ fontSize: 11 }}>funded</div>
              </div>
            </div>
            <Progress value={p.raised} max={p.goal} height={8} />
            <div className="row row--between" style={{ marginTop: 10, fontSize: 12 }}>
              <span><strong>{p.donors.toLocaleString()}</strong> <span className="muted">donors</span></span>
              <span><strong>{p.days}</strong> <span className="muted">days left</span></span>
              <span><strong>{fmtCurrency(p.goal - p.raised)}</strong> <span className="muted">to go</span></span>
            </div>
          </div>
        </div>

        {/* Impact breakdown */}
        <div style={{ padding: "20px" }}>
          <span className="eyebrow">Your gift, in real terms</span>
          <div className="col" style={{ gap: 8, marginTop: 10 }}>
            {[
              { amt: 25, label: "feeds a family for a week" },
              { amt: 50, label: "drills 1 meter of a new well" },
              { amt: 100, label: "covers a child's clean-water year" },
              { amt: 250, label: "supplies a village hand-pump" },
            ].map((row, i) => (
              <div key={i} className="row" style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 14px", gap: 14, alignItems: "center" }}>
                <div style={{ minWidth: 56, textAlign: "right", fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", color: "var(--accent-ink)" }}>${row.amt}</div>
                <div style={{ width: 1, alignSelf: "stretch", background: "var(--line)" }} />
                <div style={{ flex: 1, fontSize: 13.5, lineHeight: 1.4 }}>{row.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ padding: "0 20px 20px" }}>
          <div className="tabs">
            {["story", "updates", "donors"].map(t => (
              <button key={t} className={`tabs__tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
                {t === "story" ? "Story" : t === "updates" ? `Updates · ${updates.length}` : `Donors · ${p.donors.toLocaleString()}`}
              </button>
            ))}
          </div>

          <div style={{ paddingTop: 18 }}>
            {tab === "story" && (
              <div style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)" }}>
                <p style={{ marginTop: 0 }}>{p.story || "We've been working alongside this community for years; this campaign is the next chapter."}</p>
                <p>Funds disburse in three tranches against verified milestones — drilling, installation, and 12-month follow-up.</p>
                <div className="card" style={{ padding: 14, marginTop: 14, background: "var(--accent-soft)", borderColor: "transparent" }}>
                  <div className="row" style={{ gap: 10, alignItems: "start" }}>
                    <Icon name="target" size={18} stroke={2} style={{ color: "var(--accent)" }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>Milestone tracker</div>
                      <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>4 of 7 wells drilled. Next milestone unlocks at $96,000.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {tab === "updates" && (
              <div className="col" style={{ gap: 14 }}>
                {updates.map((u, i) => (
                  <div key={i} className="card" style={{ padding: 16 }}>
                    <div className="row row--between" style={{ marginBottom: 6 }}>
                      <span className="tag">{u.date}</span>
                      {i === 0 && <span className="tag tag--amber">New</span>}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, letterSpacing: "-0.01em" }}>{u.title}</div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--ink-3)" }}>{u.body}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === "donors" && (
              <div className="col" style={{ gap: 0 }}>
                {recentDonors.map((d, i) => (
                  <div key={i} className="row" style={{ padding: "12px 0", borderBottom: i < recentDonors.length - 1 ? "1px solid var(--line-soft)" : "none", gap: 12 }}>
                    <div className="avatar">{d.name === "Anonymous" ? "A" : d.name.split(" ").map(s => s[0]).slice(0, 2).join("")}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
                      <div className="muted" style={{ fontSize: 11 }}>{d.when}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>${d.amount}</div>
                  </div>
                ))}
                <button className="btn btn--ghost" style={{ marginTop: 14 }}>See all {p.donors.toLocaleString()} donors</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky donate bar */}
      <div className="cta-bar">
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>1 gift = 1 day of clean water</div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em" }}>
            {fmtCurrency(p.goal - p.raised)} <span className="muted" style={{ fontWeight: 500, fontSize: 11 }}>to finish this</span>
          </div>
        </div>
        <button className="btn btn--primary btn--lg" onClick={() => router.push("/donate")}>
          Give to this <Icon name="heart" size={14} stroke={2.2} />
        </button>
      </div>
    </div>
  );
}
