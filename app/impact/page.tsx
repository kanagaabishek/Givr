"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar, TopNav } from "@/components/Nav";
import { CountUpVal } from "@/components/Primitives";
import Icon from "@/components/Icons";
import { DONORS_WALL, TEAM, PARTNERS } from "@/lib/data";

export default function ImpactPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const markers = [
    { x: 28, y: 52, label: "Malawi", tone: "teal" },
    { x: 62, y: 48, label: "Kenya", tone: "amber" },
    { x: 78, y: 56, label: "Philippines", tone: "teal" },
    { x: 70, y: 42, label: "India", tone: "rose" },
    { x: 60, y: 50, label: "Uganda", tone: "amber" },
    { x: 88, y: 64, label: "Fiji", tone: "teal" },
    { x: 18, y: 60, label: "Brazil", tone: "amber" },
    { x: 22, y: 38, label: "Guatemala", tone: "teal" },
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "var(--bg)" }}>
      <StatusBar />
      <TopNav page="impact" />

      <div className="page-enter" style={{ paddingBottom: 32 }}>
        {/* Hero stat banner */}
        <section style={{ padding: "20px", background: "var(--ink)", color: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: 999, background: "var(--accent)", opacity: .25, filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: -50, left: -50, width: 180, height: 180, borderRadius: 999, background: "var(--accent-2)", opacity: .15, filter: "blur(30px)" }} />
          <span className="eyebrow" style={{ color: "var(--accent-2)" }}>Our impact, since 2018</span>
          <h1 className="display" style={{ fontSize: 36, margin: "8px 0 18px", color: "white", letterSpacing: "-0.03em", lineHeight: 1.0 }}>
            Real numbers,<br />real lives.
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, position: "relative", zIndex: 2 }}>
            {[
              { v: 18420000, label: "Raised", prefix: "$" },
              { v: 1284390, label: "Lives reached" },
              { v: 117, label: "Programs funded" },
              { v: 41, label: "Countries" },
            ].map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 16, border: "1px solid rgba(255,255,255,.08)" }}>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", color: "white", fontVariantNumeric: "tabular-nums" }}>
                  {s.prefix || ""}<CountUpVal value={s.v} compact />
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 20, marginBottom: 0, fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>
            Independently audited every year.
          </p>
        </section>

        {/* World map */}
        <section style={{ padding: "28px 20px 8px" }}>
          <span className="eyebrow">Live programs</span>
          <h2 className="display" style={{ fontSize: 24, margin: "6px 0 14px", letterSpacing: "-0.025em" }}>Where Givrs are giving</h2>

          <div className="card" style={{ padding: 14, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "1.9 / 1", background: "var(--bg-soft)", borderRadius: 10, overflow: "hidden" }}>
              <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
                <defs>
                  <pattern id="dots" width="1.4" height="1.4" patternUnits="userSpaceOnUse">
                    <circle cx=".5" cy=".5" r=".25" fill="currentColor" />
                  </pattern>
                </defs>
                <g style={{ color: "var(--muted-2)" as React.CSSProperties["color"], opacity: .5 }}>
                  <path d="M14 16 L26 14 L30 18 L28 24 L22 28 L16 26 Z" fill="url(#dots)" />
                  <path d="M30 20 L36 18 L40 22 L38 32 L34 36 L30 32 Z" fill="url(#dots)" />
                  <path d="M44 14 L62 12 L70 18 L66 26 L52 24 Z" fill="url(#dots)" />
                  <path d="M50 28 L58 26 L62 32 L58 38 L52 38 Z" fill="url(#dots)" />
                  <path d="M64 18 L74 16 L80 22 L76 30 L68 28 Z" fill="url(#dots)" />
                  <path d="M76 28 L88 26 L92 32 L86 40 L78 38 Z" fill="url(#dots)" />
                  <path d="M16 32 L24 32 L26 38 L22 44 L18 42 Z" fill="url(#dots)" />
                </g>
              </svg>
              {markers.map((m, i) => (
                <div key={i} style={{ position: "absolute", left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}>
                  <span style={{
                    display: "block", width: 10, height: 10, borderRadius: 999,
                    background: m.tone === "teal" ? "var(--teal-500)" : m.tone === "amber" ? "var(--amber-500)" : "var(--rose-500)",
                    boxShadow: `0 0 0 3px ${m.tone === "teal" ? "rgba(20,184,166,.18)" : m.tone === "amber" ? "rgba(245,158,11,.18)" : "rgba(244,63,94,.18)"}`,
                    animation: `pulse 1.8s infinite ${i * 0.2}s`,
                  }} />
                </div>
              ))}
            </div>
            <div className="row" style={{ marginTop: 12, gap: 14, fontSize: 11, color: "var(--muted)", justifyContent: "center" }}>
              <span><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "var(--teal-500)", marginRight: 5, verticalAlign: "middle" }} />Health & water</span>
              <span><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "var(--amber-500)", marginRight: 5, verticalAlign: "middle" }} />Education</span>
              <span><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "var(--rose-500)", marginRight: 5, verticalAlign: "middle" }} />Maternal</span>
            </div>
          </div>
        </section>

        {/* Donor wall */}
        <section style={{ padding: "28px 20px 8px" }}>
          <div className="row row--between" style={{ alignItems: "flex-end", marginBottom: 14 }}>
            <div>
              <span className="eyebrow">Donor wall</span>
              <h2 className="display" style={{ fontSize: 22, margin: "6px 0 0", letterSpacing: "-0.025em" }}>Thank you, all of you.</h2>
            </div>
            <span className="muted" style={{ fontSize: 11 }}>{DONORS_WALL.length}+ active</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
            {DONORS_WALL.slice(0, 30).map((d, i) => (
              <div key={i} title={d} style={{
                aspectRatio: "1 / 1", borderRadius: 10,
                background: i % 5 === 0 ? "var(--accent-soft)" : "var(--bg-soft)",
                display: "grid", placeItems: "center",
                fontSize: 11, fontWeight: 600,
                color: i % 5 === 0 ? "var(--accent-ink)" : "var(--ink-3)",
              }}>
                {d.split(" ").map(s => s[0]).slice(0, 2).join("")}
              </div>
            ))}
          </div>
          <button className="btn btn--ghost" style={{ width: "100%", marginTop: 14 }}>See full donor wall</button>
        </section>

        {/* Team */}
        <section style={{ padding: "28px 20px 8px" }}>
          <span className="eyebrow">Who we are</span>
          <h2 className="display" style={{ fontSize: 22, margin: "6px 0 14px", letterSpacing: "-0.025em" }}>Small team. Tight ship.</h2>
          <div className="col" style={{ gap: 10 }}>
            {TEAM.map((t, i) => (
              <div key={i} className="row" style={{ background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: 14, padding: 14, gap: 12, alignItems: "center" }}>
                <div className="avatar avatar--lg">{t.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{t.role}</div>
                </div>
                <Icon name="chevronRight" size={15} stroke={2} style={{ color: "var(--muted)" }} />
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section style={{ padding: "28px 20px 8px" }}>
          <span className="eyebrow">Backed by</span>
          <h2 className="display" style={{ fontSize: 22, margin: "6px 0 14px", letterSpacing: "-0.025em" }}>Foundation partners</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {PARTNERS.map((p, i) => (
              <div key={i} style={{
                padding: 16, border: "1px solid var(--line)", borderRadius: 12,
                textAlign: "center", fontSize: 13, fontWeight: 600, color: "var(--ink-3)",
                fontFamily: p.style === "serif" ? "Bricolage Grotesque, serif" : p.style === "mono" ? "JetBrains Mono, monospace" : "Plus Jakarta Sans, sans-serif",
                fontStyle: p.style === "serif" ? "italic" : "normal",
                letterSpacing: p.style === "mono" ? "-0.04em" : "-0.01em",
              }}>
                {p.name}
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section style={{ padding: "28px 20px 32px" }}>
          <div className="card" style={{ padding: 22, background: "var(--accent-soft)", borderColor: "transparent", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: 999, background: "var(--accent)", opacity: .15 }} />
            <span className="eyebrow" style={{ color: "var(--accent-ink)" }}>Field notes, monthly</span>
            <h3 className="display" style={{ fontSize: 22, margin: "8px 0 10px", color: "var(--accent-ink)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              Real letters from real fieldworkers.
            </h3>
            <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--accent-ink)", opacity: .85, lineHeight: 1.5 }}>
              No pleas, no asks — just stories. One short note per month.
            </p>
            {!subscribed ? (
              <div style={{ display: "flex", gap: 8, background: "var(--bg-alt)", borderRadius: 12, padding: 6, position: "relative", zIndex: 2 }}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  style={{ flex: 1, border: "none", outline: "none", padding: "10px 12px", background: "transparent", color: "var(--ink)", fontSize: 14 }}
                />
                <button className="btn btn--primary" onClick={() => email && setSubscribed(true)} style={{ padding: "10px 14px", borderRadius: 8 }}>
                  Subscribe
                </button>
              </div>
            ) : (
              <div className="row" style={{ background: "var(--bg-alt)", borderRadius: 12, padding: "12px 14px", gap: 10 }}>
                <Icon name="check" size={18} stroke={2.5} style={{ color: "var(--accent)" }} />
                <span style={{ fontSize: 13.5, fontWeight: 600 }}>You&apos;re in. First note arrives next Tuesday.</span>
              </div>
            )}
          </div>
        </section>

        <div style={{ padding: "0 20px 12px", textAlign: "center" }}>
          <div className="row" style={{ justifyContent: "center", gap: 18, color: "var(--muted)", fontSize: 11.5 }}>
            <a>Privacy</a><a>Terms</a><a>Press</a><a>Contact</a>
          </div>
          <div className="muted" style={{ fontSize: 11, marginTop: 8 }}>© 2026 Givr · Registered nonprofit · EIN 88-1023491</div>
        </div>
      </div>
    </div>
  );
}
