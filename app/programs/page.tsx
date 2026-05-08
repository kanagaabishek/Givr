"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar, TopNav } from "@/components/Nav";
import { ProgressCard, SkeletonCard } from "@/components/Primitives";
import Icon from "@/components/Icons";
import { PROGRAMS, CATEGORIES, pct } from "@/lib/data";

export default function ProgramsPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("urgent");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 720);
    return () => clearTimeout(t);
  }, [cat]);

  useEffect(() => { setLoading(false); }, []);

  const list = PROGRAMS
    .filter(p => cat === "all" || p.category === cat)
    .filter(p => q === "" || (p.title + p.location + p.short).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      if (sort === "urgent") return a.days - b.days;
      if (sort === "closest") return pct(b.raised, b.goal) - pct(a.raised, a.goal);
      return 0;
    });

  return (
    <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "var(--bg)" }}>
      <StatusBar />
      <TopNav page="programs" />

      <div className="page-enter" style={{ padding: "16px 20px 40px" }}>
        <div className="row row--between" style={{ marginBottom: 6 }}>
          <span className="eyebrow">Programs</span>
          <span className="muted" style={{ fontSize: 11 }}>{PROGRAMS.length} active · 41 countries</span>
        </div>
        <h1 className="display" style={{ fontSize: 32, margin: "0 0 18px", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
          Find a cause<br />you&apos;ll stay with.
        </h1>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: 14,
          padding: "12px 14px", marginBottom: 12,
        }}>
          <Icon name="search" size={17} stroke={1.9} style={{ color: "var(--muted)" }} />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search by name, country, theme..."
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, background: "transparent", color: "var(--ink)" }}
          />
          {q && (
            <button onClick={() => setQ("")} style={{ border: "none", background: "transparent", color: "var(--muted)" }}>
              <Icon name="close" size={15} />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="hscroll no-scrollbar" style={{ paddingTop: 0, paddingBottom: 16, marginBottom: 0 }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`chip ${cat === c.id ? "is-active" : ""}`}
              onClick={() => setCat(c.id)}
            >
              <Icon name={c.icon} size={13} stroke={2} />
              {c.label}
            </button>
          ))}
        </div>

        {/* Sort row */}
        <div className="row row--between" style={{ marginBottom: 14 }}>
          <span className="muted" style={{ fontSize: 12 }}>{loading ? "..." : `${list.length} ${list.length === 1 ? "result" : "results"}`}</span>
          <button
            style={{ background: "transparent", border: "none", display: "inline-flex", gap: 6, alignItems: "center", fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}
            onClick={() => setSort(s => s === "urgent" ? "closest" : "urgent")}
          >
            <Icon name="filter" size={13} stroke={2.1} />
            {sort === "urgent" ? "Most urgent" : "Closest to goal"}
            <Icon name="chevronDown" size={11} stroke={2.4} />
          </button>
        </div>

        {loading ? (
          <div className="col" style={{ gap: 14 }}>
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : list.length === 0 ? (
          <div className="card" style={{ padding: 28, textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--bg-soft)", margin: "0 auto 14px", display: "grid", placeItems: "center" }}>
              <Icon name="search" size={22} stroke={1.7} style={{ color: "var(--muted)" }} />
            </div>
            <h3 className="display" style={{ margin: "0 0 6px", fontSize: 18 }}>No programs match yet</h3>
            <p className="muted" style={{ margin: "0 0 14px", fontSize: 13, lineHeight: 1.5 }}>
              Try clearing filters, or suggest a new cause.
            </p>
            <div className="row" style={{ gap: 8, justifyContent: "center" }}>
              <button className="btn btn--ghost" onClick={() => { setQ(""); setCat("all"); }}>Clear filters</button>
              <button className="btn btn--primary">Suggest a cause</button>
            </div>
          </div>
        ) : (
          <div className="col" style={{ gap: 14 }}>
            {list.map(p => <ProgressCard key={p.id} p={p} />)}
          </div>
        )}

        {!loading && list.length > 0 && (
          <div className="card" style={{ marginTop: 20, padding: 18, background: "var(--bg-soft)", borderColor: "transparent" }}>
            <div className="row" style={{ gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--accent-soft)", color: "var(--accent-ink)", display: "grid", placeItems: "center" }}>
                <Icon name="handshake" size={20} stroke={1.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Run a nonprofit?</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>Apply for a Givr profile — review takes 5 days.</div>
              </div>
              <Icon name="chevronRight" size={16} stroke={2} style={{ color: "var(--muted)" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
