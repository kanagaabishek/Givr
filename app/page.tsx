"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar, TopNav } from "@/components/Nav";
import { Counter, ProgressCard, ProgramTile } from "@/components/Primitives";
import Icon from "@/components/Icons";
import { PROGRAMS, TESTIMONIALS, fmtCurrency } from "@/lib/data";

export default function HomePage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [liveRaised, setLiveRaised] = useState(2418720);
  const [liveDonors, setLiveDonors] = useState(38217);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 280);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setLiveRaised(v => v + Math.floor(Math.random() * 50 + 10));
      if (Math.random() > 0.6) setLiveDonors(v => v + 1);
    }, 2400);
    return () => clearInterval(i);
  }, []);

  return (
    <div ref={viewportRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "var(--bg)" }}>
      <StatusBar />
      <TopNav page="home" />

      <div className="page-enter">
        {/* HERO */}
        <section style={{ padding: "16px 20px 28px", position: "relative" }}>
          <div className="row" style={{ justifyContent: "space-between", marginBottom: 24 }}>
            <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span className="live-dot" /> 17 giving right now
            </span>
            <span className="muted" style={{ fontSize: 11 }}>Spring 2026</span>
          </div>

          <h1 className="display" style={{ fontSize: 44, lineHeight: 0.98, margin: "0 0 16px", letterSpacing: "-0.04em" }}>
            Small gifts.
            <br />
            <span style={{ color: "var(--accent)" }}>Big, traceable</span>
            <br />
            change.
          </h1>
          <p style={{ margin: "0 0 22px", maxWidth: 340, fontSize: 16, lineHeight: 1.55, color: "var(--ink-3)" }}>
            Givr connects you to vetted nonprofits in 41 countries — and shows you exactly where every dollar goes.
          </p>

          <button
            className="btn btn--primary btn--xl"
            style={{ width: "100%", position: "relative", overflow: "hidden" }}
            onClick={() => router.push("/donate")}
          >
            <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 10 }}>
              <Icon name="heart" size={18} stroke={2.2} />
              Start giving
            </span>
            <span aria-hidden style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,.25) 50%, transparent 70%)",
              animation: "ctashine 2.6s ease-in-out infinite",
              transform: "translateX(-100%)",
            }} />
          </button>

          <div className="row" style={{ marginTop: 14, gap: 8, justifyContent: "center", color: "var(--muted)", fontSize: 12 }}>
            <Icon name="lock" size={12} stroke={2} />
            Tax-receipt instant · 100% traceable · 47-country reach
          </div>
        </section>

        {/* LIVE COUNTERS */}
        <section style={{ padding: "0 20px 28px" }}>
          <div className="row" style={{ marginBottom: 12, gap: 8 }}>
            <span className="live-dot" />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em" }}>Live, this year</span>
          </div>
          <div className="counter-row">
            <Counter value={liveRaised} prefix="$" label="Raised" delta="+$3.2k today" />
            <Counter value={liveDonors} label="Givrs" delta="+34 today" />
            <Counter value={1284390} label="Lives" />
          </div>
        </section>

        {/* FEATURED PROGRAMS */}
        <section style={{ paddingBottom: 8 }}>
          <div style={{ padding: "0 20px" }}>
            <div className="section__head">
              <div>
                <span className="eyebrow">Featured</span>
                <h2 className="display" style={{ fontSize: 26, margin: "4px 0 0" }}>Pick a cause</h2>
              </div>
              <a onClick={() => router.push("/programs")}>See all <Icon name="arrowRight" size={12} stroke={2.2} /></a>
            </div>
          </div>
          <div className="hscroll no-scrollbar">
            {PROGRAMS.slice(0, 4).map(p => (
              <div key={p.id} style={{ width: 260 }}>
                <ProgressCard p={p} />
              </div>
            ))}
          </div>
        </section>

        {/* IMPACT STORY */}
        <section style={{ padding: "20px 20px 8px" }}>
          <div className="card" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
            <ProgramTile icon="droplet" tone="teal" label="Moment · Malawi" height={180} />
            <div style={{ padding: 18 }}>
              <p className="display" style={{ fontSize: 20, margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.025em" }}>
                &ldquo;First time my daughter saw water come from a tap. She didn&apos;t speak for a minute.&rdquo;
              </p>
              <div className="row" style={{ marginTop: 14, gap: 10 }}>
                <div className="avatar">EM</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Esther M., field reporter</div>
                  <div className="muted" style={{ fontSize: 11 }}>Mzimba, Malawi · 2 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: "20px 0 8px" }}>
          <div style={{ padding: "0 20px" }}>
            <div className="section__head">
              <div>
                <span className="eyebrow">From our donors</span>
                <h2 className="display" style={{ fontSize: 22, margin: "4px 0 0" }}>Why people stay</h2>
              </div>
            </div>
          </div>
          <div className="hscroll no-scrollbar">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="card" style={{ width: 280, padding: 18 }}>
                <Icon name="quote" size={20} stroke={2} style={{ color: "var(--accent)", marginBottom: 8 }} />
                <p style={{ margin: "0 0 14px", fontSize: 14, lineHeight: 1.5, color: "var(--ink-2)" }}>{t.text}</p>
                <div className="row" style={{ gap: 10 }}>
                  <div className="avatar">{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRANSPARENCY */}
        <section style={{ padding: "20px" }}>
          <div className="card" style={{ padding: 18, background: "var(--bg-soft)", borderColor: "transparent" }}>
            <div className="row row--between" style={{ alignItems: "start" }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Where it goes</div>
                <h3 className="display" style={{ fontSize: 18, margin: "0 0 12px", letterSpacing: "-0.02em" }}>92¢ of every dollar</h3>
              </div>
              <Icon name="info" size={16} stroke={2} style={{ color: "var(--muted)" }} />
            </div>
            <div style={{ display: "flex", height: 10, borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ width: "92%", background: "var(--accent)" }} />
              <div style={{ width: "5%", background: "var(--accent-2)" }} />
              <div style={{ width: "3%", background: "var(--muted-2)" }} />
            </div>
            <div className="row" style={{ gap: 16, fontSize: 11 }}>
              <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--accent)", marginRight: 5, verticalAlign: "middle" }} />Programs 92%</span>
              <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--accent-2)", marginRight: 5, verticalAlign: "middle" }} />Ops 5%</span>
              <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--muted-2)", marginRight: 5, verticalAlign: "middle" }} />Fees 3%</span>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section style={{ padding: "0 20px 32px" }}>
          <div className="card" style={{
            padding: 22, position: "relative", overflow: "hidden",
            background: "var(--ink)", color: "var(--bg-alt)", borderColor: "var(--ink)"
          }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: 999, background: "var(--accent)", opacity: .35, filter: "blur(20px)" }} />
            <h3 className="display" style={{ fontSize: 22, margin: "0 0 10px", color: "white", letterSpacing: "-0.025em" }}>Give monthly, change steadily.</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>
              $15/mo lights a classroom. Cancel anytime, no guilt-mail, ever.
            </p>
            <button className="btn btn--primary" onClick={() => router.push("/donate")}>
              Become a Givr <Icon name="arrowRight" size={14} stroke={2.2} />
            </button>
          </div>
        </section>
      </div>

      {scrolled && (
        <div className="sticky-donate">
          <span className="sticky-donate__pulse" />
          <span style={{ flex: 1 }}>{fmtCurrency(liveRaised)} raised today</span>
          <button className="sticky-donate__btn" onClick={() => router.push("/donate")}>
            Donate <Icon name="arrowRight" size={11} stroke={2.4} />
          </button>
        </div>
      )}
    </div>
  );
}
