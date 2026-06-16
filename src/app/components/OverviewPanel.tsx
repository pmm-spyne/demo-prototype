import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Sparkles, TrendingDown, DollarSign, Camera, Eye, Lock, Check,
  Zap, Wand2, Send, Megaphone, ArrowRight, Clock,
} from "lucide-react";
import type { StudioTier } from "../types/demoConfig";

export interface OverviewPanelProps {
  dealerName?: string;
  tier: StudioTier;
  onUpgrade: () => void;
  /** Demo affordance — simulate the trial lapsing into the degraded console. */
  onExpire?: () => void;
  /** Days remaining in the 30-day Studio OS trial. */
  trialDaysLeft: number;
  /** Buckets resolved so far (0–5) — drives the activation progress bar. */
  completedCount: number;
  totalSteps: number;
  /** Days-to-frontline before Studio OS vs. now. */
  dtfBaseline: number;
  dtfCurrent: number;
  /** Monthly dollar value, broken out + total. */
  holdingSavedMonthly: number;
  photographySavedMonthly: number;
  totalValueMonthly: number;
  /** VDP engagement uplift % (Studio Frame). */
  vdpUplift: number;
  /** True while Studio Promote is gated behind Pro. */
  promoteLocked: boolean;
}

function useCountUp(target: number, deps: unknown[] = []) {
  const [val, setVal] = useState(0);
  const obj = useRef({ n: 0 });
  useEffect(() => {
    gsap.killTweensOf(obj.current);
    gsap.to(obj.current, {
      n: target,
      duration: 1.1,
      ease: "power3.out",
      onUpdate: () => setVal(obj.current.n),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...deps]);
  return val;
}

function ValueCard({
  icon, label, value, sub, accent,
}: {
  icon: React.ReactNode; label: string; value: string; sub: string; accent: string;
}) {
  return (
    <div data-fade className="flex-1 rounded-[14px] border border-black/8 bg-white px-[18px] py-[16px] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-[8px] mb-[10px]">
        <span className="size-[30px] rounded-[9px] flex items-center justify-center" style={{ background: `${accent}16`, color: accent }}>
          {icon}
        </span>
        <p className="text-[11px] font-semibold text-black/55 uppercase tracking-[0.4px] font-['Inter:Semi_Bold',sans-serif]">
          {label}
        </p>
      </div>
      <p className="text-[28px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-none">
        {value}
      </p>
      <p className="mt-[6px] text-[11.5px] text-black/50 font-['Inter:Regular',sans-serif] leading-snug">
        {sub}
      </p>
    </div>
  );
}

interface ProductRow {
  icon: React.ReactNode;
  name: string;
  metric: string;
  caption: string;
  accent: string;
  locked?: boolean;
}

export function OverviewPanel({
  dealerName, tier, onUpgrade, onExpire, trialDaysLeft,
  completedCount, totalSteps,
  dtfBaseline, dtfCurrent,
  holdingSavedMonthly, photographySavedMonthly, totalValueMonthly,
  vdpUplift, promoteLocked,
}: OverviewPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const totalValue = useCountUp(totalValueMonthly);
  const tatSaved = Math.max(0, dtfBaseline - dtfCurrent);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>("[data-fade]");
    if (!items.length) return;
    gsap.fromTo(items, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" });
  }, []);

  const products: ProductRow[] = [
    { icon: <Zap size={16} strokeWidth={2.2} />,      name: "Studio Instant", metric: "0 → 4 min", caption: "Day-0 listings live before the shoot",    accent: "#7F6AF2" },
    { icon: <Camera size={16} strokeWidth={2.2} />,   name: "Studio Create",  metric: "+4.9 score", caption: "Lot photos elevated to studio grade",      accent: "#E91E63" },
    { icon: <Send size={16} strokeWidth={2.2} />,     name: "Studio Publish", metric: "6 channels", caption: "Listings live across every marketplace",   accent: "#4600F2" },
    { icon: <Megaphone size={16} strokeWidth={2.2} />, name: "Studio Promote", metric: promoteLocked ? "Pro" : "−17d on lot", caption: promoteLocked ? "Age-triggered promotions — unlock with Pro" : "Aged units moved with auto promotions", accent: "#DC2626", locked: promoteLocked },
  ];

  const benefits = [
    "Every new acquisition listed on Day 0 — no dark listings",
    "Consistent, studio-grade media across all rooftops",
    "One-click syndication keeps marketplaces always in sync",
    "Holding cost trending down week over week",
    "Shopper engagement captured on every VDP",
  ];

  return (
    <div ref={rootRef} className="flex flex-col gap-[16px]">
      {/* Trial banner */}
      <div
        data-fade
        className="flex items-center justify-between gap-[16px] rounded-[12px] px-[16px] py-[11px] border"
        style={{ background: "rgba(70,0,242,0.05)", borderColor: "rgba(70,0,242,0.16)" }}
      >
        <div className="flex items-center gap-[10px] min-w-0">
          <span className="size-[30px] rounded-full bg-[#4600F2] flex items-center justify-center text-white shrink-0">
            <Clock size={15} strokeWidth={2.4} />
          </span>
          <p className="text-[12.5px] text-[#402387] font-['Inter:Regular',sans-serif] leading-snug">
            <span className="font-bold font-['Inter:Bold',sans-serif]">{trialDaysLeft} days left</span> in your free Studio OS trial.
            {tier === "lite" ? " Upgrade to Pro to keep Studio Promote running." : " You're on Studio OS Pro."}
          </p>
        </div>
        <div className="flex items-center gap-[12px] shrink-0">
          {onExpire && (
            <button
              type="button"
              onClick={onExpire}
              className="text-[11.5px] font-semibold text-black/40 hover:text-[#DC2626] underline underline-offset-2 font-['Inter:Semi_Bold',sans-serif] transition-colors"
            >
              Preview trial end
            </button>
          )}
          {tier === "lite" && (
            <button
              type="button"
              onClick={onUpgrade}
              className="inline-flex items-center gap-[6px] h-[34px] px-[14px] rounded-[8px] text-[12px] font-bold text-white font-['Inter:Bold',sans-serif] transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)", boxShadow: "0 6px 18px rgba(182,81,215,0.35)" }}
            >
              <Sparkles size={13} strokeWidth={2.6} /> Upgrade to Pro
            </button>
          )}
        </div>
      </div>

      {/* Value hero */}
      <div
        data-fade
        className="relative overflow-hidden rounded-[18px] px-[26px] py-[22px] text-white"
        style={{
          background: "linear-gradient(135deg, #1E1240 0%, #4600F2 60%, #B651D7 100%)",
          boxShadow: "0 18px 48px rgba(70,0,242,0.28), inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        <Sparkles size={140} className="absolute -top-[20px] -right-[10px] text-white/8" strokeWidth={1.2} />
        <div className="relative flex items-end justify-between gap-[20px] flex-wrap">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-[5px] px-[8px] py-[2px] rounded-full bg-white/15 text-[9px] font-bold uppercase tracking-[1.2px] mb-[10px] font-['Inter:Bold',sans-serif]">
              <Sparkles size={9} strokeWidth={2.6} /> Value created
            </p>
            <p className="text-[12px] text-white/75 font-['Inter:Regular',sans-serif] mb-[2px]">
              Monthly value Studio OS is recovering for {dealerName || "your dealership"}
            </p>
            <p className="text-[48px] font-bold font-['Inter:Bold',sans-serif] leading-none tabular-nums">
              ${Math.round(totalValue).toLocaleString()}
            </p>
            <p className="mt-[8px] text-[12px] text-white/70 font-['Inter:Regular',sans-serif]">
              ${holdingSavedMonthly.toLocaleString()}/mo holding cost · ${photographySavedMonthly.toLocaleString()}/mo photography · faster turns
            </p>
          </div>
          {/* Activation progress */}
          <div className="shrink-0">
            <p className="text-[9px] font-bold uppercase tracking-[1.1px] text-white/70 font-['Inter:Bold',sans-serif] mb-[6px] text-right">
              Studio OS activated
            </p>
            <div className="flex items-center gap-[8px] justify-end">
              <span className="text-[22px] font-bold font-['Inter:Bold',sans-serif] tabular-nums">{completedCount}/{totalSteps}</span>
              <span className="text-[11px] text-white/70 font-['Inter:Regular',sans-serif]">products live</span>
            </div>
            <div className="mt-[8px] w-[160px] h-[6px] rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-700"
                style={{ width: `${(completedCount / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Value cards */}
      <div className="flex gap-[14px]">
        <ValueCard
          icon={<TrendingDown size={16} strokeWidth={2.2} />}
          label="Time to live"
          value={`−${tatSaved} days`}
          sub={`${dtfBaseline}d → ${dtfCurrent}d to frontline`}
          accent="#4600F2"
        />
        <ValueCard
          icon={<DollarSign size={16} strokeWidth={2.2} />}
          label="Holding cost saved"
          value={`$${holdingSavedMonthly.toLocaleString()}`}
          sub="per month, recovered from faster turns"
          accent="#059669"
        />
        <ValueCard
          icon={<Camera size={16} strokeWidth={2.2} />}
          label="Photography saved"
          value={`$${photographySavedMonthly.toLocaleString()}`}
          sub="per month vs. your prior process"
          accent="#7C3AED"
        />
        <ValueCard
          icon={<Eye size={16} strokeWidth={2.2} />}
          label="VDP engagement"
          value={`+${vdpUplift}%`}
          sub="shopper interaction on Studio Frame"
          accent="#DC2626"
        />
      </div>

      {/* Value by product + benefits */}
      <div className="flex gap-[14px] items-stretch">
        <div data-fade className="flex-1 rounded-[14px] border border-black/8 bg-white p-[18px]">
          <p className="text-[10px] font-bold uppercase tracking-[1.2px] text-black/40 mb-[14px] font-['Inter:Bold',sans-serif]">
            Value by product
          </p>
          <div className="flex flex-col gap-[10px]">
            {products.map((p) => (
              <div key={p.name} className="flex items-center gap-[12px]">
                <span className="size-[34px] rounded-[10px] flex items-center justify-center shrink-0" style={{ background: `${p.accent}16`, color: p.accent }}>
                  {p.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-[6px]">
                    <p className="text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">{p.name}</p>
                    {p.locked && (
                      <span className="inline-flex items-center gap-[3px] px-[6px] py-[1px] rounded-full text-[9px] font-bold uppercase tracking-[0.5px] text-white font-['Inter:Bold',sans-serif]" style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)" }}>
                        <Lock size={8} strokeWidth={3} /> Pro
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-black/50 font-['Inter:Regular',sans-serif] truncate">{p.caption}</p>
                </div>
                <span
                  className="text-[13px] font-bold font-['Inter:Bold',sans-serif] shrink-0"
                  style={{ color: p.locked ? "#B651D7" : p.accent }}
                >
                  {p.metric}
                </span>
              </div>
            ))}
          </div>
          {promoteLocked && (
            <button
              type="button"
              onClick={onUpgrade}
              className="mt-[16px] w-full inline-flex items-center justify-center gap-[7px] h-[40px] rounded-[10px] text-[13px] font-bold text-white font-['Inter:Bold',sans-serif] transition-transform hover:scale-[1.01]"
              style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)", boxShadow: "0 8px 22px rgba(182,81,215,0.32)" }}
            >
              <Sparkles size={14} strokeWidth={2.6} /> Unlock Studio Promote with Pro <ArrowRight size={14} />
            </button>
          )}
        </div>

        <div data-fade className="w-[320px] shrink-0 rounded-[14px] border border-black/8 bg-white p-[18px]">
          <p className="text-[10px] font-bold uppercase tracking-[1.2px] text-black/40 mb-[14px] font-['Inter:Bold',sans-serif]">
            What Studio OS is doing for you
          </p>
          <ul className="flex flex-col gap-[11px]">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-[10px]">
                <span className="size-[18px] rounded-full bg-[rgba(16,185,129,0.14)] text-[#059669] flex items-center justify-center shrink-0 mt-[1px]">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span className="text-[12.5px] text-[#1F2937] leading-[1.5] font-['Inter:Medium',sans-serif] font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
