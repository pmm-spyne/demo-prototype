import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Sparkles, ArrowRight, Camera, Clock, DollarSign,
  TrendingUp, ChevronDown, ChevronUp, Info,
} from "lucide-react";
import { SpyneMark } from "./AppShell";
import {
  DEFAULT_DEMO_CONFIG, calcOpportunity,
  type DemoConfig,
} from "../types/demoConfig";

// ─── Discovery questions (AE prompts — left panel) ────────────────────────

const DISCOVERY_QUESTIONS = [
  "Which IMS are you currently integrated with?",
  "How many rooftops do you operate?",
  "How long does it take to get a vehicle from trade-in to live online today?",
  "What % of your current inventory has photos uploaded?",
  "Which platforms do you currently publish listings to?",
  "Do you have an in-house photographer or use a third-party?",
  "What's your current average days-on-lot (time to sale)?",
];

const IMS_OPTIONS = [
  "Vincue", "VinSolutions", "DealerSocket", "CDK Global",
  "Reynolds & Reynolds", "vAuto", "Tekion", "Other",
];

// ─── Slider ───────────────────────────────────────────────────────────────

function Slider({
  label, value, min, max, step = 1, format, benchmark, onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
  benchmark?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="bg-white rounded-[12px] border border-black/8 p-[16px]">
      <div className="flex items-center justify-between mb-[10px]">
        <span className="text-[11px] font-semibold text-black/55 uppercase tracking-[0.5px] font-['Inter:Semi_Bold',sans-serif]">
          {label}
        </span>
        <span className="text-[18px] font-bold text-[#4600F2] font-['Inter:Bold',sans-serif]">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-[4px] rounded-full appearance-none cursor-pointer accent-[#4600F2]"
        style={{
          background: `linear-gradient(to right, #4600F2 ${pct}%, #E5E7EB ${pct}%)`,
        }}
      />
      {benchmark && (
        <p className="mt-[6px] text-[10px] text-black/40 font-['Inter:Regular',sans-serif]">
          {benchmark}
        </p>
      )}
    </div>
  );
}

// ─── Number field (inline edit) ────────────────────────────────────────────

function InlineField({
  label, prefix, suffix, value, onChange, hint,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <div className="bg-white rounded-[12px] border border-black/8 p-[16px] flex items-center gap-[12px]">
      <div className="flex-1">
        <div className="flex items-center gap-[5px] mb-[6px]">
          <span className="text-[11px] font-semibold text-black/55 uppercase tracking-[0.5px] font-['Inter:Semi_Bold',sans-serif]">
            {label}
          </span>
          {hint && (
            <span className="group relative inline-flex">
              <Info size={11} className="text-black/30" />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-[6px] hidden group-hover:block bg-[#0a0a0a] text-white text-[10px] px-[6px] py-[3px] rounded whitespace-nowrap z-10 pointer-events-none">
                {hint}
              </span>
            </span>
          )}
        </div>
        <div className="flex items-center h-[32px] bg-[#F4F0FF] rounded-[8px] px-[10px] border border-[rgba(70,0,242,0.2)] focus-within:border-[#4600F2]">
          {prefix && <span className="text-[13px] text-[#4600F2] font-semibold mr-[2px]">{prefix}</span>}
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value) || 0)}
            className="flex-1 bg-transparent outline-none text-[15px] font-bold text-[#4600F2] font-['Inter:Bold',sans-serif] min-w-0"
          />
          {suffix && <span className="text-[11px] text-[#4600F2]/70 font-medium ml-[2px]">{suffix}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Impact card ───────────────────────────────────────────────────────────

function ImpactCard({
  icon, label, value, sub, accent, positive,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: string;
  positive?: boolean;
}) {
  return (
    <div
      className="flex-1 rounded-[14px] p-[16px] border"
      style={{ borderColor: `${accent}30`, background: `${accent}08` }}
    >
      <div className="flex items-center gap-[8px] mb-[10px]">
        <div
          className="size-[28px] rounded-[8px] flex items-center justify-center shrink-0"
          style={{ background: `${accent}18`, color: accent }}
        >
          {icon}
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.5px] text-black/50 font-['Inter:Semi_Bold',sans-serif]">
          {label}
        </p>
      </div>
      <p
        className="text-[22px] font-bold font-['Inter:Bold',sans-serif] leading-none"
        style={{ color: accent }}
      >
        {positive ? "+" : "-"}
        {value}
        <span className="text-[11px] font-medium text-black/40 ml-[4px]">/mo</span>
      </p>
      <p className="mt-[4px] text-[11px] text-black/55 font-['Inter:Regular',sans-serif] leading-[14px]">
        {sub}
      </p>
    </div>
  );
}

// ─── Main screen ───────────────────────────────────────────────────────────

interface Props {
  onLaunch: (config: DemoConfig) => void;
}

export function DemoSetupScreen({ onLaunch }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_DEMO_CONFIG);
  const [showDetails, setShowDetails] = useState(false);

  const set = <K extends keyof DemoConfig>(key: K, value: DemoConfig[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const opp = calcOpportunity(config);

  // GSAP entrance
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-fade]");
    gsap.fromTo(
      items,
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out" }
    );
  }, []);

  const canLaunch = config.dealershipName.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F5F3FF] flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-black/8 h-[52px] flex items-center justify-between px-[28px] shrink-0">
        <div className="flex items-center gap-[10px]">
          <SpyneMark />
          <span className="font-bold text-[#402387] text-[18px] leading-none font-['Inter:Bold',sans-serif]">
            Studio AI
          </span>
          <span className="ml-[6px] px-[8px] py-[2px] rounded-full bg-[rgba(70,0,242,0.08)] text-[10px] font-bold text-[#4600F2] uppercase tracking-[0.6px] font-['Inter:Bold',sans-serif]">
            Demo Setup
          </span>
        </div>
        <p className="text-[12px] text-black/40 font-['Inter:Regular',sans-serif]">
          Fill in prospect details, then launch the personalised demo
        </p>
      </div>

      <div ref={containerRef} className="flex flex-1 min-h-0 overflow-hidden">
        {/* ── LEFT: Discovery panel ─────────────────────────────────── */}
        <div className="w-[300px] shrink-0 bg-white border-r border-black/8 flex flex-col overflow-auto">
          <div className="px-[20px] py-[18px] border-b border-black/8">
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-[#4600F2] font-['Inter:Bold',sans-serif] mb-[12px]">
              Discovery
            </p>

            {/* AE name */}
            <div className="mb-[10px]" data-fade>
              <label className="block text-[10px] uppercase tracking-[0.6px] font-bold text-black/45 mb-[4px] font-['Inter:Bold',sans-serif]">
                AE Name
              </label>
              <input
                type="text"
                placeholder="Enter AE name"
                value={config.aeName}
                onChange={(e) => set("aeName", e.target.value)}
                className="w-full h-[36px] px-[10px] rounded-[8px] border border-black/15 bg-[#FAFAFA] text-[13px] text-[#0a0a0a] outline-none focus:border-[#4600F2] font-['Inter:Regular',sans-serif] placeholder:text-black/30"
              />
            </div>

            {/* Dealership name */}
            <div className="mb-[10px]" data-fade>
              <label className="block text-[10px] uppercase tracking-[0.6px] font-bold text-black/45 mb-[4px] font-['Inter:Bold',sans-serif]">
                Dealership Name <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Valley Toyota"
                value={config.dealershipName}
                onChange={(e) => set("dealershipName", e.target.value)}
                className="w-full h-[36px] px-[10px] rounded-[8px] border border-black/15 bg-[#FAFAFA] text-[13px] text-[#0a0a0a] outline-none focus:border-[#4600F2] font-['Inter:Regular',sans-serif] placeholder:text-black/30"
              />
            </div>

            {/* IMS */}
            <div data-fade>
              <label className="block text-[10px] uppercase tracking-[0.6px] font-bold text-black/45 mb-[4px] font-['Inter:Bold',sans-serif]">
                IMS Provider
              </label>
              <div className="flex flex-wrap gap-[6px]">
                {IMS_OPTIONS.map((ims) => (
                  <button
                    key={ims}
                    type="button"
                    onClick={() => set("imsProvider", ims)}
                    className={`h-[26px] px-[8px] rounded-full text-[10px] font-semibold border transition-colors font-['Inter:Semi_Bold',sans-serif] ${
                      config.imsProvider === ims
                        ? "bg-[#4600F2] text-white border-[#4600F2]"
                        : "bg-white text-black/60 border-black/15 hover:border-[#4600F2]/40"
                    }`}
                  >
                    {ims}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Discovery questions */}
          <div className="px-[20px] py-[16px] flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-black/40 mb-[10px] font-['Inter:Bold',sans-serif]">
              Discovery Questions
            </p>
            <ol className="space-y-[10px]">
              {DISCOVERY_QUESTIONS.map((q, i) => (
                <li key={i} data-fade className="flex gap-[8px]">
                  <span className="shrink-0 size-[18px] rounded-full bg-[rgba(70,0,242,0.08)] text-[10px] font-bold text-[#4600F2] flex items-center justify-center mt-[1px] font-['Inter:Bold',sans-serif]">
                    {i + 1}
                  </span>
                  <p className="text-[11px] text-black/70 font-['Inter:Regular',sans-serif] leading-[15px]">
                    {q}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── RIGHT: Opportunity model ───────────────────────────────── */}
        <div className="flex-1 overflow-auto">
          <div className="px-[28px] py-[20px] max-w-[900px]">

            {/* Summary bar */}
            <div data-fade className="mb-[20px]">
              <p className="text-[13px] text-black/60 font-['Inter:Regular',sans-serif]">
                <span className="font-bold text-[#0a0a0a]">{config.totalInventory} total vehicles</span>
                {config.dealershipName && (
                  <> · <span className="font-semibold text-[#4600F2]">{config.dealershipName}</span></>
                )}
                {" "}·{" "}
                Estimated monthly gap:{" "}
                <span className="font-bold text-[#EF4444]">
                  ${opp.totalMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </p>
            </div>

            {/* Sliders grid */}
            <div data-fade className="grid grid-cols-2 gap-[12px] mb-[16px]">
              <Slider
                label="Total inventory units"
                value={config.totalInventory}
                min={50}
                max={600}
                step={10}
                format={(v) => `${v}`}
                benchmark="Model baseline: total vehicles on lot"
                onChange={(v) => set("totalInventory", v)}
              />
              <Slider
                label="Monthly sales volume"
                value={config.monthlySalesVolume}
                min={20}
                max={400}
                step={5}
                format={(v) => `${v} units`}
                benchmark="Used to calculate holding cost formula"
                onChange={(v) => set("monthlySalesVolume", v)}
              />
              <Slider
                label="Trade-to-live days (today)"
                value={config.currentDaysToFrontline}
                min={1}
                max={30}
                step={1}
                format={(v) => `${v} days`}
                benchmark="Gold standard: < 3 days · Studio AI target: 1 day"
                onChange={(v) => set("currentDaysToFrontline", v)}
              />
              <Slider
                label="% inventory without photos"
                value={config.pctWithoutPhotos}
                min={0}
                max={80}
                step={1}
                format={(v) => `${v}%`}
                benchmark="Estimate if unknown — industry avg is 30–40%. Each unlisted unit costs ~$200/wk in missed leads."
                onChange={(v) => set("pctWithoutPhotos", v)}
              />
            </div>

            {/* Inline number fields */}
            <div data-fade className="grid grid-cols-2 gap-[12px] mb-[20px]">
              <InlineField
                label="Holding cost / day"
                prefix="$"
                suffix="/ car / day"
                value={config.holdingCostPerDay}
                hint="Industry range: $40–$50. Use $46 for a 100-unit/mo store."
                onChange={(v) => set("holdingCostPerDay", v)}
              />
              <div className="bg-white rounded-[12px] border border-black/8 p-[16px] flex items-center gap-[12px] opacity-40 select-none pointer-events-none">
                <div className="flex-1">
                  <div className="flex items-center gap-[5px] mb-[6px]">
                    <span className="text-[11px] font-semibold text-black/55 uppercase tracking-[0.5px] font-['Inter:Semi_Bold',sans-serif]">
                      Avg front-end gross
                    </span>
                  </div>
                  <p className="text-[11px] text-black/40 font-['Inter:Regular',sans-serif]">
                    Optional — expand financial details below to set
                  </p>
                </div>
              </div>
            </div>

            {/* Show computed stages toggle */}
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              className="inline-flex items-center gap-[6px] text-[12px] font-semibold text-black/55 hover:text-[#4600F2] transition-colors mb-[16px] font-['Inter:Semi_Bold',sans-serif]"
            >
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showDetails ? "Hide" : "Show"} financial details
            </button>

            {showDetails && (
              <>
                <div data-fade className="mb-[12px] rounded-[12px] border border-black/8 bg-white overflow-hidden text-[12px]">
                  <div className="px-[16px] py-[10px] bg-[#F4F0FF] border-b border-black/8 flex items-center gap-[8px]">
                    <span className="font-bold text-[#4600F2] font-['Inter:Bold',sans-serif]">How the monthly gap is calculated</span>
                  </div>
                  {[
                    {
                      label: "Invisible inventory",
                      detail: `${opp.vehiclesNoPhotos} vehicles × $220/wk × 4 weeks`,
                      value: opp.invisibleMonthly,
                      color: "#EF4444",
                    },
                    {
                      label: "Frontline gap (vs. 1-day target)",
                      detail: `${opp.frontlineGapDays} extra days × $${config.holdingCostPerDay} × ${config.monthlySalesVolume} units`,
                      value: opp.frontlineMonthly,
                      color: "#F59E0B",
                    },
                    {
                      label: "Aged inventory (45+ day stock)",
                      detail: `${opp.agedVehicles} vehicles × $${config.holdingCostPerDay}/day × 30 days`,
                      value: opp.agedMonthly,
                      color: "#4600F2",
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-[16px] py-[10px] border-b border-black/5 last:border-0">
                      <div>
                        <p className="font-semibold text-[#0a0a0a] font-['Inter:Semi_Bold',sans-serif]">{row.label}</p>
                        <p className="text-black/45 font-['Inter:Regular',sans-serif] mt-[1px]">{row.detail}</p>
                      </div>
                      <span className="font-bold font-['Inter:Bold',sans-serif]" style={{ color: row.color }}>
                        ${row.value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-[16px] py-[10px] bg-[#F4F0FF]">
                    <span className="font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">Total monthly opportunity</span>
                    <span className="font-bold text-[#4600F2] text-[15px] font-['Inter:Bold',sans-serif]">
                      ${opp.totalMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div data-fade className="mb-[16px]">
                  <InlineField
                    label="Avg front-end gross (optional)"
                    prefix="$"
                    suffix="/ vehicle"
                    value={config.avgFrontGross}
                    hint={`Break-even day: ${opp.breakEvenDay} days at this gross + holding cost. Defaults to $3,500 if not shared.`}
                    onChange={(v) => set("avgFrontGross", v)}
                  />
                </div>
              </>
            )}

            {/* Impact cards */}
            <div data-fade className="flex gap-[12px] mb-[24px]">
              <ImpactCard
                icon={<Camera size={14} strokeWidth={2.5} />}
                label="Invisible inventory cost"
                value={`$${Math.round(opp.invisibleMonthly / 1000)}K`}
                sub={`${opp.vehiclesNoPhotos} vehicles without photos — ~$220/wk each in missed leads`}
                accent="#EF4444"
              />
              <ImpactCard
                icon={<Clock size={14} strokeWidth={2.5} />}
                label="Frontline gap cost"
                value={`$${Math.round(opp.frontlineMonthly / 1000)}K`}
                sub={`${opp.frontlineGapDays} days above gold standard × $${config.holdingCostPerDay}/day × ${config.monthlySalesVolume} units`}
                accent="#F59E0B"
              />
              <ImpactCard
                icon={<DollarSign size={14} strokeWidth={2.5} />}
                label="Aged inventory exposure"
                value={`$${Math.round(opp.agedMonthly / 1000)}K`}
                sub={`~${opp.agedVehicles} vehicles 45+ days · break-even at day ${opp.breakEvenDay}`}
                accent="#4600F2"
              />
            </div>

            {/* What Studio AI closes */}
            <div data-fade className="rounded-[14px] border border-[rgba(70,0,242,0.2)] bg-[rgba(70,0,242,0.04)] px-[20px] py-[16px] mb-[24px] flex items-center justify-between gap-[20px]">
              <div>
                <p className="text-[11px] uppercase tracking-[1px] font-bold text-[#4600F2] mb-[4px] font-['Inter:Bold',sans-serif]">
                  What Studio AI closes
                </p>
                <p className="text-[14px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">
                  Studio AI fills {opp.vehiclesNoPhotos} photo gaps overnight.
                  Frontline drops from {config.currentDaysToFrontline} days → 1 day.
                  Smart Campaigns auto-target {opp.agedVehicles} aged units.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[11px] uppercase tracking-[0.6px] font-semibold text-black/45 font-['Inter:Semi_Bold',sans-serif]">Monthly reclaim</p>
                <p className="text-[28px] font-bold text-[#4600F2] font-['Inter:Bold',sans-serif] leading-none">
                  ${opp.totalMonthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Launch CTA */}
            <div data-fade>
              {!canLaunch && (
                <p className="text-[11px] text-[#EF4444] mb-[8px] font-['Inter:Regular',sans-serif]">
                  Enter a dealership name to launch the demo.
                </p>
              )}
              <button
                type="button"
                disabled={!canLaunch}
                onClick={() => onLaunch(config)}
                className="w-full h-[52px] rounded-[12px] text-white text-[15px] font-semibold font-['Inter:Semi_Bold',sans-serif] inline-flex items-center justify-center gap-[10px] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: canLaunch
                    ? "linear-gradient(90deg, #FF5C7A 0%, #B651D7 50%, #4600F2 100%)"
                    : "#ccc",
                  boxShadow: canLaunch ? "0 8px 20px rgba(70,0,242,0.28)" : "none",
                }}
              >
                <Sparkles size={16} strokeWidth={2.5} />
                Launch Demo for {config.dealershipName || "…"}
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
              <p className="mt-[10px] text-center text-[11px] text-black/35 font-['Inter:Regular',sans-serif]">
                The demo will be pre-loaded with{" "}
                <span className="font-semibold text-black/55">{config.dealershipName || "this dealership"}'s</span>
                {" "}numbers and benchmarks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
