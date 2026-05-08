"use client";
import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icons";
import { Program, fmtCurrency, pct } from "@/lib/data";
import { useRouter } from "next/navigation";

export const useCountUp = (target: number, duration = 1400) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf: number;
    let start: number | undefined;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
};

export const CountUpVal = ({ value, compact }: { value: number; compact?: boolean }) => {
  const n = useCountUp(value, 1600);
  if (compact && value >= 1000000) return <>{(n / 1000000).toFixed(1)}M</>;
  if (compact && value >= 1000) return <>{(n / 1000).toFixed(0)}K</>;
  return <>{n.toLocaleString("en-US")}</>;
};

export const Counter = ({ value, label, prefix = "", delta }: { value: number; label: string; prefix?: string; delta?: string }) => {
  const n = useCountUp(value);
  return (
    <div className="counter">
      <div className="counter__num">{prefix}{n.toLocaleString("en-US")}</div>
      <div className="counter__lbl">{label}</div>
      {delta && (
        <div className="counter__delta">
          <Icon name="arrowRight" size={10} stroke={2.4} style={{ transform: "rotate(-45deg)" }} />
          {delta}
        </div>
      )}
    </div>
  );
};

export const Progress = ({ value, max, animateInView = true, height = 6 }: {
  value: number; max: number; animateInView?: boolean; height?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const target = Math.min(100, (value / max) * 100);

  useEffect(() => {
    if (!animateInView) { setW(target); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setW(target);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, animateInView]);

  return (
    <div className="progress" ref={ref} style={{ height }}>
      <div className="progress__fill" style={{ width: w + "%" }} />
    </div>
  );
};

const toneMap: Record<string, [string, string]> = {
  teal: ["#0d9488", "#5eead4"],
  amber: ["#d97706", "#fde68a"],
  rose: ["#e11d48", "#fda4af"],
  indigo: ["#4f46e5", "#a5b4fc"],
};

export const ProgramTile = ({ icon = "leaf", tone = "teal", label, height = 140, full }: {
  icon?: string; tone?: string; label?: string; height?: number; full?: boolean;
}) => {
  const [a, b] = toneMap[tone] || toneMap.teal;
  const patternId = `p-${tone}-${label || "t"}`;
  return (
    <div style={{
      height: full ? "100%" : height,
      width: "100%",
      position: "relative",
      overflow: "hidden",
      background: `linear-gradient(135deg, ${a}, ${b})`,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 200 140" preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, opacity: .35 }}>
        <defs>
          <pattern id={patternId} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        <circle cx="160" cy="40" r="50" fill="white" opacity=".18" />
        <circle cx="40" cy="120" r="35" fill="white" opacity=".10" />
      </svg>
      {label !== undefined && (
        <div style={{
          position: "absolute", top: 12, left: 12, color: "white",
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px", background: "rgba(255,255,255,.18)",
          backdropFilter: "blur(6px)", borderRadius: 999,
          fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em",
        }}>
          <Icon name={icon} size={12} stroke={2.2} />
          {label}
        </div>
      )}
    </div>
  );
};

export const Skeleton = ({ w = "100%", h = 14, r = 8 }: { w?: string | number; h?: number; r?: number }) => (
  <div className="skel" style={{ width: w, height: h, borderRadius: r }} />
);

export const SkeletonCard = () => (
  <div className="card" style={{ padding: 0 }}>
    <Skeleton w="100%" h={120} r={0} />
    <div style={{ padding: 14 }}>
      <Skeleton w="80%" h={14} />
      <div style={{ height: 8 }} />
      <Skeleton w="60%" h={10} />
      <div style={{ height: 14 }} />
      <Skeleton w="100%" h={6} />
    </div>
  </div>
);

export const ProgressCard = ({ p }: { p: Program }) => {
  const router = useRouter();
  const percent = pct(p.raised, p.goal);
  return (
    <button
      onClick={() => router.push(`/programs/${p.id}`)}
      className="card card--lift"
      style={{ padding: 0, textAlign: "left", cursor: "pointer", color: "inherit", display: "block", width: "100%", border: "none" }}
    >
      <ProgramTile icon={p.icon} tone={p.tone} label={p.category} height={132} />
      <div style={{ padding: 14 }}>
        <div className="row row--between" style={{ marginBottom: 8, gap: 8 }}>
          <span className="muted" style={{ fontSize: 11, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="pin" size={11} stroke={2.2} /> {p.location}
          </span>
          <span className="muted" style={{ fontSize: 11, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Icon name="clock" size={11} stroke={2.2} /> {p.days}d left
          </span>
        </div>
        <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25 }}>{p.title}</h3>
        <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.45 }}>{p.short}</p>
        <div style={{ marginTop: 14 }}>
          <div className="row row--between" style={{ marginBottom: 6, alignItems: "baseline" }}>
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>{fmtCurrency(p.raised)}</span>
            <span className="muted" style={{ fontSize: 11 }}>raised of {fmtCurrency(p.goal)}</span>
          </div>
          <Progress value={p.raised} max={p.goal} />
          <div className="row row--between" style={{ marginTop: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)" }}>{percent}% funded</span>
            <span className="muted" style={{ fontSize: 11 }}>{p.donors.toLocaleString()} donors</span>
          </div>
        </div>
      </div>
    </button>
  );
};
