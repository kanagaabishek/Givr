"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBar } from "@/components/Nav";
import { Progress, ProgramTile } from "@/components/Primitives";
import Icon from "@/components/Icons";
import { PROGRAMS, fmtCurrency, pct } from "@/lib/data";

const Field = ({ label, value, onChange, placeholder, type = "text", icon }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string; icon?: string;
}) => (
  <label style={{ display: "block" }}>
    <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-alt)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 14px" }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: "var(--ink)", fontSize: 15, fontWeight: 500 }}
      />
      {icon && <Icon name={icon} size={15} stroke={1.9} style={{ color: "var(--muted)" }} />}
    </div>
  </label>
);

function DonateSuccess({ amount, program, recurring, onHome }: {
  amount: number; program: typeof PROGRAMS[0]; recurring: boolean; onHome: () => void;
}) {
  const [pieces] = useState(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    color: ["var(--accent)", "var(--accent-2)", "#fde68a", "var(--teal-400)"][i % 4],
    rot: Math.random() * 360,
  })));

  return (
    <div style={{ flex: 1, overflowY: "auto", background: "var(--bg)", position: "relative" }} className="page-enter">
      <StatusBar />
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 5 }}>
        {pieces.map(p => (
          <span key={p.id} className="confetti-piece" style={{ left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}s`, transform: `rotate(${p.rot}deg)` }} />
        ))}
      </div>

      <div style={{ padding: "60px 24px 28px", textAlign: "center", position: "relative", zIndex: 6 }}>
        <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 18px" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "var(--accent-soft)", animation: "ripple 1.6s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: 8, borderRadius: 999, background: "var(--accent-soft)", animation: "ripple 1.6s ease-out infinite .4s" }} />
          <div style={{ position: "absolute", inset: 16, borderRadius: 999, background: "var(--accent)", display: "grid", placeItems: "center", color: "white" }}>
            <Icon name="check" size={36} stroke={3} />
          </div>
        </div>

        <h1 className="display" style={{ fontSize: 32, margin: "0 0 10px", letterSpacing: "-0.03em" }}>Thank you. Truly.</h1>
        <p style={{ margin: "0 0 24px", fontSize: 15, lineHeight: 1.55, color: "var(--ink-3)" }}>
          {recurring
            ? <><strong>${amount.toFixed(0)}/mo</strong> will reach <strong>{program.title}</strong> tomorrow.</>
            : <><strong>${amount.toFixed(0)}</strong> just joined <strong>{program.title}</strong>.</>
          }
        </p>

        <div className="card" style={{ padding: 18, textAlign: "left", marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Receipt</div>
          <div className="row row--between" style={{ marginBottom: 8 }}><span className="muted" style={{ fontSize: 13 }}>Reference</span><span className="mono" style={{ fontSize: 12 }}>GVR-2026-04829</span></div>
          <div className="row row--between" style={{ marginBottom: 8 }}><span className="muted" style={{ fontSize: 13 }}>Amount</span><span style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>${amount.toFixed(2)}</span></div>
          <div className="row row--between" style={{ marginBottom: 8 }}><span className="muted" style={{ fontSize: 13 }}>Program</span><span style={{ fontWeight: 600, fontSize: 13 }}>{program.title}</span></div>
          <div className="row row--between"><span className="muted" style={{ fontSize: 13 }}>Tax-deductible</span><span style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)" }}>Yes ✓</span></div>
        </div>

        <div className="row" style={{ gap: 8 }}>
          <button className="btn btn--ghost" style={{ flex: 1 }}><Icon name="share" size={14} /> Share</button>
          <button className="btn btn--primary" style={{ flex: 1.4 }} onClick={onHome}>Back to Givr</button>
        </div>

        <p className="muted" style={{ marginTop: 18, fontSize: 11.5, lineHeight: 1.5 }}>
          You&apos;ll get your first field update from {program.title} within 14 days.
        </p>
      </div>
    </div>
  );
}

export default function DonatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(true);
  const [coverFees, setCoverFees] = useState(true);
  const [program, setProgram] = useState(PROGRAMS[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const presets = [10, 25, 50, 100, 250];
  const finalAmount = custom ? parseFloat(custom) || 0 : amount;
  const totalAmount = coverFees ? +(finalAmount * 1.029 + 0.30).toFixed(2) : finalAmount;
  const selected = PROGRAMS.find(p => p.id === program) || PROGRAMS[0];

  const impactText = (a: number) => {
    if (a < 25) return "Buys school supplies for 1 child.";
    if (a < 50) return "Feeds a family for a week.";
    if (a < 100) return "Drills 1 meter of a new well.";
    if (a < 250) return "Lights a classroom for a month.";
    return "Sponsors an entire village checkup day.";
  };

  const canNext = () => {
    if (step === 1) return finalAmount > 0;
    if (step === 2) return !!program;
    if (step === 3) return !!(name && email && card.length >= 12 && exp && cvc);
    return true;
  };

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1400);
  };

  if (done) return <DonateSuccess amount={totalAmount} program={selected} recurring={recurring} onHome={() => router.push("/")} />;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg)" }}>
      <StatusBar />

      {/* Stepper */}
      <div style={{ padding: "12px 16px 14px", borderBottom: "1px solid var(--line-soft)", background: "var(--bg)", flexShrink: 0, zIndex: 18 }}>
        <div className="row" style={{ marginBottom: 12 }}>
          <button
            onClick={() => step === 1 ? router.push("/") : setStep(s => s - 1)}
            style={{ background: "var(--bg-soft)", border: "none", borderRadius: 10, width: 32, height: 32, display: "grid", placeItems: "center", color: "var(--ink)" }}
          >
            <Icon name="chevronLeft" size={16} />
          </button>
          <div style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 600 }}>Step {step} of 3</div>
          <button
            onClick={() => router.push("/")}
            style={{ background: "var(--bg-soft)", border: "none", borderRadius: 10, width: 32, height: 32, display: "grid", placeItems: "center", color: "var(--ink)" }}
          >
            <Icon name="close" size={16} />
          </button>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: i <= step ? "var(--accent)" : "var(--bg-soft)",
              transition: "background .3s ease",
            }} />
          ))}
        </div>
        <div className="row" style={{ marginTop: 8, fontSize: 11, color: "var(--muted)", justifyContent: "space-between" }}>
          <span style={{ color: step >= 1 ? "var(--ink-3)" : "var(--muted-2)", fontWeight: step === 1 ? 600 : 500 }}>Amount</span>
          <span style={{ color: step >= 2 ? "var(--ink-3)" : "var(--muted-2)", fontWeight: step === 2 ? 600 : 500 }}>Program</span>
          <span style={{ color: step >= 3 ? "var(--ink-3)" : "var(--muted-2)", fontWeight: step === 3 ? 600 : 500 }}>Payment</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div className="page-enter" style={{ padding: "20px 20px 24px" }} key={step}>
          {step === 1 && (
            <div>
              <h1 className="display" style={{ fontSize: 30, margin: "0 0 6px", letterSpacing: "-0.03em" }}>How much<br />would you like to give?</h1>
              <p className="muted" style={{ margin: "0 0 20px", fontSize: 13.5 }}>Pick a preset or enter your own.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
                {presets.map(v => (
                  <button key={v} onClick={() => { setAmount(v); setCustom(""); }} style={{
                    padding: "16px 8px", borderRadius: 14, fontWeight: 700, fontSize: 17,
                    border: "1.5px solid",
                    borderColor: amount === v && !custom ? "var(--accent)" : "var(--line)",
                    background: amount === v && !custom ? "var(--accent-soft)" : "var(--bg-alt)",
                    color: amount === v && !custom ? "var(--accent-ink)" : "var(--ink)",
                    cursor: "pointer", transition: "all .15s ease", letterSpacing: "-0.02em",
                  }}>
                    ${v}
                  </button>
                ))}
                <button onClick={() => { setCustom(custom || "75"); setAmount(0); }} style={{
                  padding: "16px 8px", borderRadius: 14, fontWeight: 600, fontSize: 14,
                  border: "1.5px solid", borderColor: custom ? "var(--accent)" : "var(--line)",
                  background: custom ? "var(--accent-soft)" : "var(--bg-alt)",
                  color: custom ? "var(--accent-ink)" : "var(--ink)",
                  cursor: "pointer",
                }}>
                  Custom
                </button>
              </div>

              {custom !== "" && (
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--accent)", borderRadius: 14, padding: "12px 16px", marginBottom: 12, background: "var(--bg-alt)" }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "var(--muted)", marginRight: 6 }}>$</span>
                  <input
                    type="number"
                    value={custom}
                    onChange={e => setCustom(e.target.value)}
                    autoFocus
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 24, fontWeight: 700, background: "transparent", color: "var(--ink)", letterSpacing: "-0.02em", width: "100%" }}
                  />
                  <span className="muted" style={{ fontSize: 12 }}>USD</span>
                </div>
              )}

              <div className="card" style={{ padding: 14, marginBottom: 16, background: "var(--accent-soft)", borderColor: "transparent" }}>
                <div className="row" style={{ gap: 10, alignItems: "start" }}>
                  <Icon name="sparkle" size={18} stroke={2} style={{ color: "var(--accent)", marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5, color: "var(--accent-ink)" }}>${finalAmount.toFixed(0)} → {impactText(finalAmount)}</div>
                    <div style={{ fontSize: 11.5, marginTop: 3, color: "var(--accent-ink)", opacity: .85 }}>Updated live as you change the amount.</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 12 }}>
                <button onClick={() => setRecurring(!recurring)} style={{ width: "100%", padding: 16, background: "transparent", border: "none", display: "flex", alignItems: "center", gap: 14, textAlign: "left", color: "inherit" }}>
                  <span className={`toggle ${recurring ? "on" : ""}`} aria-hidden />
                  <span style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, display: "block" }}>Make this monthly</span>
                    <span style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, display: "block" }}>Cancel anytime. Most Givrs give monthly.</span>
                  </span>
                  {recurring && <span className="tag">+3.4× impact</span>}
                </button>
              </div>

              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => setCoverFees(!coverFees)} style={{ width: "100%", padding: 16, background: "transparent", border: "none", display: "flex", alignItems: "center", gap: 14, textAlign: "left", color: "inherit" }}>
                  <span className={`toggle ${coverFees ? "on" : ""}`} aria-hidden />
                  <span style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, display: "block" }}>Cover the {coverFees ? `$${(totalAmount - finalAmount).toFixed(2)}` : "~3%"} processing fee</span>
                    <span style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, display: "block" }}>So 100% of your gift reaches the field.</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="display" style={{ fontSize: 30, margin: "0 0 6px", letterSpacing: "-0.03em" }}>Choose where<br />it goes.</h1>
              <p className="muted" style={{ margin: "0 0 20px", fontSize: 13.5 }}>Or split across causes — we&apos;ll route it transparently.</p>

              <button onClick={() => setProgram("split")} style={{
                width: "100%", padding: 16, marginBottom: 12,
                border: "1.5px dashed", borderColor: program === "split" ? "var(--accent)" : "var(--line)",
                background: program === "split" ? "var(--accent-soft)" : "var(--bg-alt)",
                borderRadius: 14, textAlign: "left", display: "flex", gap: 12, alignItems: "center", color: "inherit", cursor: "pointer",
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--bg-soft)", display: "grid", placeItems: "center" }}>
                  <Icon name="grid" size={20} stroke={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Where it&apos;s needed most</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>Givr&apos;s team allocates monthly across active programs.</div>
                </div>
                {program === "split" && <Icon name="check" size={18} stroke={2.5} style={{ color: "var(--accent)" }} />}
              </button>

              <div className="col" style={{ gap: 10 }}>
                {PROGRAMS.slice(0, 5).map(p => (
                  <button key={p.id} onClick={() => setProgram(p.id)} style={{
                    padding: 12, border: "1.5px solid",
                    borderColor: program === p.id ? "var(--accent)" : "var(--line)",
                    background: program === p.id ? "var(--accent-soft)" : "var(--bg-alt)",
                    borderRadius: 14, textAlign: "left", display: "flex", gap: 12, alignItems: "center", color: "inherit", cursor: "pointer",
                  }}>
                    <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                      <ProgramTile icon={p.icon} tone={p.tone} full />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 2 }}>{p.title}</div>
                      <div className="muted" style={{ fontSize: 11, marginBottom: 6 }}>{p.location} · {pct(p.raised, p.goal)}% funded</div>
                      <Progress value={p.raised} max={p.goal} height={4} animateInView={false} />
                    </div>
                    {program === p.id && <Icon name="check" size={18} stroke={2.5} style={{ color: "var(--accent)" }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="display" style={{ fontSize: 30, margin: "0 0 6px", letterSpacing: "-0.03em" }}>Just a few details.</h1>
              <p className="muted" style={{ margin: "0 0 20px", fontSize: 13.5 }}>Receipt instantly to your email.</p>

              <div className="row" style={{ gap: 8, marginBottom: 14 }}>
                <button className="btn btn--ghost" style={{ flex: 1, padding: "12px", borderRadius: 12 }}>
                  <Icon name="apple" size={16} stroke={2} /> Pay
                </button>
                <button className="btn btn--ghost" style={{ flex: 1, padding: "12px", borderRadius: 12 }}>
                  <span style={{ fontWeight: 700, color: "#5f6368" }}>G</span><span style={{ fontWeight: 600, fontSize: 13 }}>Pay</span>
                </button>
              </div>
              <div className="row" style={{ gap: 10, marginBottom: 14, color: "var(--muted)", fontSize: 11 }}>
                <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
                or pay with card
                <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
              </div>

              <div className="col" style={{ gap: 10 }}>
                <Field label="Full name" value={name} onChange={setName} placeholder="Amara Ngozi" />
                <Field label="Email for receipt" value={email} onChange={setEmail} placeholder="amara@example.com" type="email" />
                <Field label="Card number" value={card} onChange={v => setCard(v.replace(/[^\d ]/g, ""))} placeholder="1234 1234 1234 1234" icon="card" />
                <div className="row" style={{ gap: 10 }}>
                  <div style={{ flex: 1 }}><Field label="Expiry" value={exp} onChange={setExp} placeholder="MM/YY" /></div>
                  <div style={{ flex: 1 }}><Field label="CVC" value={cvc} onChange={setCvc} placeholder="123" icon="lock" /></div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16, padding: "12px 14px", background: "var(--bg-soft)", borderRadius: 12, fontSize: 12, color: "var(--muted)" }}>
                <Icon name="lock" size={14} stroke={2} />
                Encrypted end-to-end. We never store card data.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="cta-bar">
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>{recurring ? "Monthly" : "One-time"} · {selected.title.length > 22 ? selected.title.slice(0, 22) + "…" : selected.title}</div>
          <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
            ${totalAmount.toFixed(2)} {recurring && <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500 }}>/ month</span>}
          </div>
        </div>
        <button
          className="btn btn--primary btn--lg"
          disabled={!canNext() || submitting}
          onClick={() => step < 3 ? setStep(s => s + 1) : submit()}
          style={{ opacity: canNext() ? 1 : 0.5 }}
        >
          {submitting ? "Processing…" : step < 3 ? <><span>Continue</span> <Icon name="arrowRight" size={14} stroke={2.4} /></> : <><span>Give now</span> <Icon name="heart" size={14} stroke={2.4} /></>}
        </button>
      </div>
    </div>
  );
}
