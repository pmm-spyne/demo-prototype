import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BarChart, Bar, XAxis, Cell, LabelList,
  Tooltip as RechartsTip, ResponsiveContainer,
} from "recharts";
import { Clock, DollarSign, Activity } from "lucide-react";
import { calcOpportunity, type DemoConfig } from "../../types/demoConfig";

// ── Step arrays (mirrored from Demo2.tsx — keep in sync) ─────────────────────
const DTF_STEPS   = [14,  12,  10,  8,   6,   5  ];
const SCORE_STEPS = [4.2, 5.3, 6.4, 7.5, 8.4, 9.1];
const HC_STEPS    = [52_500, 48_200, 43_600, 37_300, 27_900, 10_000];

const X_LABELS   = ["Start", "S1", "S2", "S3", "S4", "S5"];
const STEP_NAMES = ["Baseline", "Smart Shoot", "SmartMatch", "CGI Upgrade", "Syndication", "Campaigns"];

export type StepBucketKey = "raw" | "nophoto" | "cgi" | "unsyndicated" | "aging";
const BUCKET_ORDER: StepBucketKey[] = ["raw", "nophoto", "cgi", "unsyndicated", "aging"];

// ── Data helpers ──────────────────────────────────────────────────────────────
function dealerScaledValues(cfg: DemoConfig) {
  const { currentDaysToFrontline } = calcOpportunity(cfg);
  const dtfShift = currentDaysToFrontline - DTF_STEPS[0];
  const hcScale  = Math.max(0.2, (cfg.holdingCostPerDay * cfg.monthlySalesVolume) / (46 * 100));
  return {
    dtf: DTF_STEPS.map((v, i) => (i === 0 ? currentDaysToFrontline : Math.max(1, v + dtfShift))),
    hc : HC_STEPS.map(v => Math.round(v * hcScale)),
  };
}

// ── Portal calculation tooltip ────────────────────────────────────────────────
interface CalcLine { label: string; value: string; isResult?: boolean }

function CalcPortal({ rect, title, lines }: { rect: DOMRect; title: string; lines: CalcLine[] }) {
  const W = 232;
  const left = Math.max(8, Math.min(window.innerWidth - W - 8, rect.left + rect.width / 2 - W / 2));
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.top - 10,
        left,
        width: W,
        transform: "translateY(-100%)",
        zIndex: 99999,
        pointerEvents: "none",
      }}
      className="bg-[#111827] rounded-[10px] p-[12px] shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
    >
      <p className="text-[9px] font-bold uppercase tracking-[1.3px] text-white/35 mb-[8px] font-['Inter:Bold',sans-serif]">
        {title}
      </p>
      <div className="space-y-[5px]">
        {lines.map((l, i) => (
          <div key={i} className="flex items-start justify-between gap-[10px]">
            <span className="text-[11px] text-white/55 font-['Inter:Regular',sans-serif] leading-snug">
              {l.label}
            </span>
            <span
              className={`text-[11px] font-semibold leading-snug shrink-0 font-['Inter:Semi_Bold',sans-serif] ${
                l.isResult ? "text-[#34D399]" : "text-white/90"
              }`}
            >
              {l.value}
            </span>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({
  icon, label, delta, sub, title, lines, accent, children,
}: {
  icon: React.ReactNode;
  label: string;
  delta: string;
  sub: string;
  title: string;
  lines: CalcLine[];
  accent: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  return (
    <div
      ref={ref}
      className="flex-1 rounded-[10px] p-[10px] cursor-default select-none"
      style={{ background: "#F3F4F6" }}
      onMouseEnter={() => ref.current && setRect(ref.current.getBoundingClientRect())}
      onMouseLeave={() => setRect(null)}
    >
      {rect && <CalcPortal rect={rect} title={title} lines={lines} />}
      <div className="flex items-center justify-between mb-[7px]">
        <span
          className="size-[20px] rounded-[5px] flex items-center justify-center"
          style={{ background: `${accent}1E`, color: accent }}
        >
          {icon}
        </span>
        {/* Info icon — visual hint that calc details are available on hover */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-black/25">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 5.4v3.2M6 3.8v.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-[15px] font-bold text-[#0a0a0a] leading-none font-['Inter:Bold',sans-serif]">
        {delta}
      </p>
      <p className="mt-[3px] text-[8.5px] font-bold uppercase tracking-[0.4px] text-black/35 font-['Inter:Bold',sans-serif]">
        {label}
      </p>
      <p className="mt-[2px] text-[10px] text-black/45 font-['Inter:Regular',sans-serif] leading-tight">
        {sub}
      </p>
      {children}
    </div>
  );
}

// ── Mini bar chart ────────────────────────────────────────────────────────────
function MiniBarChart({
  title, data, labelFmt, tooltipContent, height = 76,
}: {
  title: string;
  data: { label: string; value: number; fill: string }[];
  labelFmt: (v: number) => string;
  tooltipContent: (props: any) => React.ReactElement | null;
  height?: number;
}) {
  return (
    <div className="flex-1 rounded-[10px] p-[10px] pb-[4px]" style={{ background: "#F3F4F6" }}>
      <p className="text-[8.5px] font-bold uppercase tracking-[0.5px] text-black/35 mb-[4px] font-['Inter:Bold',sans-serif]">
        {title}
      </p>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 16, right: 2, bottom: 0, left: 2 }} barCategoryGap="28%">
          <XAxis
            dataKey="label"
            tick={{ fontSize: 8.5, fill: "#9CA3AF", fontFamily: "Inter" }}
            axisLine={false}
            tickLine={false}
          />
          <RechartsTip
            content={tooltipContent}
            cursor={{ fill: "rgba(0,0,0,0.04)", radius: 4 } as any}
            wrapperStyle={{ zIndex: 9999 }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="value"
              position="top"
              formatter={labelFmt}
              style={{ fontSize: 9, fontWeight: 700, fill: "#374151", fontFamily: "Inter" }}
            />
            {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export interface StepMetricsPanelProps {
  bucketKey: StepBucketKey;
  completedSteps: number;
  demoConfig: DemoConfig;
  accent: string;
  /** When true (success state), charts render taller and cards are confirmed actuals */
  successMode?: boolean;
}

export function StepMetricsPanel({ bucketKey, completedSteps: _completedSteps, demoConfig, accent, successMode = false }: StepMetricsPanelProps) {
  const bucketIdx = BUCKET_ORDER.indexOf(bucketKey);
  if (bucketIdx > 2) return null; // Steps 4 and 5 handled separately

  const afterIdx   = bucketIdx + 1;
  const pointCount = afterIdx + 1; // baseline + steps up to and including projected

  const { dtf, hc } = dealerScaledValues(demoConfig);

  // Deltas for THIS step
  const ttmBefore  = dtf[bucketIdx];
  const ttmAfter   = dtf[afterIdx];
  const ttmDelta   = ttmBefore - ttmAfter;

  const hcBefore   = hc[bucketIdx];
  const hcAfter    = hc[afterIdx];
  const hcDelta    = hcBefore - hcAfter;

  const scoreBefore = SCORE_STEPS[bucketIdx];
  const scoreAfter  = SCORE_STEPS[afterIdx];
  const scoreDelta  = +(scoreAfter - scoreBefore).toFixed(1);

  const chartH = successMode ? 120 : 76;

  // Chart data — past steps are neutral grey, current projected bar is accented
  const ttmData = dtf.slice(0, pointCount).map((v, i) => ({
    label: X_LABELS[i],
    value: v,
    fill: i === afterIdx ? accent : "#CBD5E1",
  }));

  const hcData = hc.slice(0, pointCount).map((v, i) => ({
    label: X_LABELS[i],
    value: +(v / 1000).toFixed(1),
    rawHc: v,
    fill: i === afterIdx ? "#10B981" : "#CBD5E1",
  }));

  // ── Recharts tooltip content (closures over demoConfig + hc arrays) ─────────
  const ttmTip = ({ active, payload, label }: any) => {
    if (!active || !payload?.[0]) return null;
    const idx    = X_LABELS.indexOf(label as string);
    const val    = payload[0].value as number;
    const hcRisk = Math.max(0, val - 1) * demoConfig.holdingCostPerDay * demoConfig.monthlySalesVolume;
    return (
      <div
        className="bg-[#111827] rounded-[10px] px-[12px] py-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        style={{ minWidth: 192 }}
      >
        <p className="text-[9px] font-bold uppercase tracking-[1px] text-white/35 mb-[6px] font-['Inter:Bold',sans-serif]">
          {STEP_NAMES[idx] ?? label}
        </p>
        <p className="text-[20px] font-bold text-white mb-[8px] font-['Inter:Bold',sans-serif]">
          {val} days
        </p>
        <div className="space-y-[4px]">
          <Row l="Studio AI target"                                        v="1 day"                               green />
          <Row l="Days above target"                                        v={`${Math.max(0, val - 1)}d`} />
          <Row l="HC at risk / month"                                       v={`$${hcRisk.toLocaleString()}`} />
          <p className="text-[9px] text-white/25 font-['Inter:Regular',sans-serif] pt-[2px]">
            ${demoConfig.holdingCostPerDay}/day x {demoConfig.monthlySalesVolume} sales
          </p>
        </div>
      </div>
    );
  };

  const hcTip = ({ active, payload, label }: any) => {
    if (!active || !payload?.[0]) return null;
    const idx    = X_LABELS.indexOf(label as string);
    const rawVal = hc[idx] ?? 0;
    const scale  = ((demoConfig.holdingCostPerDay * demoConfig.monthlySalesVolume) / (46 * 100)).toFixed(2);
    return (
      <div
        className="bg-[#111827] rounded-[10px] px-[12px] py-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        style={{ minWidth: 196 }}
      >
        <p className="text-[9px] font-bold uppercase tracking-[1px] text-white/35 mb-[6px] font-['Inter:Bold',sans-serif]">
          {STEP_NAMES[idx] ?? label}
        </p>
        <p className="text-[20px] font-bold text-white mb-[8px] font-['Inter:Bold',sans-serif]">
          ${rawVal.toLocaleString()}
          <span className="text-[11px] text-white/40 font-['Inter:Regular',sans-serif]">/mo</span>
        </p>
        <div className="space-y-[4px]">
          <Row l="Your HC rate"         v={`$${demoConfig.holdingCostPerDay}/car/day`} />
          <Row l="Monthly sales vol."   v={`${demoConfig.monthlySalesVolume} units`} />
          <Row l="Scale vs. benchmark"  v={`${scale}x`} green />
        </div>
      </div>
    );
  };

  // ── Metric card calculation lines ─────────────────────────────────────────
  const ttmLines: CalcLine[] = [
    { label: "Your current workflow",  value: `${ttmBefore} days` },
    { label: "After this step",        value: `${ttmAfter} days`,   isResult: true },
    { label: "Days saved",             value: `${ttmDelta} days`,   isResult: true },
    { label: "Studio AI target",       value: "1 day" },
    { label: "HC rate",                value: `$${demoConfig.holdingCostPerDay}/car/day` },
    { label: "Monthly HC recovery",    value: `$${(ttmDelta * demoConfig.holdingCostPerDay * demoConfig.monthlySalesVolume).toLocaleString()}`, isResult: true },
  ];

  const hcLines: CalcLine[] = [
    { label: "HC before this step",    value: `$${hcBefore.toLocaleString()}/mo` },
    { label: "HC after this step",     value: `$${hcAfter.toLocaleString()}/mo`,  isResult: true },
    { label: "Your HC rate",           value: `$${demoConfig.holdingCostPerDay}/car/day` },
    { label: "Monthly sales volume",   value: `${demoConfig.monthlySalesVolume} units` },
    { label: "Recovered this step",    value: `$${hcDelta.toLocaleString()}`,       isResult: true },
  ];

  const scoreLines: CalcLine[] = [
    { label: "Before this step",       value: `${scoreBefore.toFixed(1)} / 10` },
    { label: "After this step",        value: `${scoreAfter.toFixed(1)} / 10`,   isResult: true },
    { label: "Improvement",            value: `+${scoreDelta.toFixed(1)} pts`,   isResult: true },
    { label: "Scale",                  value: "0 to 10" },
    { label: "Factors",                value: "Media quality, VDP completeness" },
  ];

  const fmtHcDelta = hcDelta >= 1000
    ? `+$${(hcDelta / 1000).toFixed(1)}K`
    : `+$${hcDelta.toLocaleString()}`;

  return (
    <div data-section className={successMode ? "" : "mb-[20px]"}>
      {!successMode && (
        <p className="text-[10px] font-bold uppercase tracking-[1.4px] text-black/40 mb-[12px] font-['Inter:Bold',sans-serif]">
          Impact metrics
        </p>
      )}

      {/* Dual mini bar charts */}
      <div className="flex gap-[8px] mb-[10px]">
        <MiniBarChart
          title="TTM (days)"
          data={ttmData}
          labelFmt={(v) => `${v}d`}
          tooltipContent={ttmTip}
          height={chartH}
        />
        <MiniBarChart
          title="Holding Cost ($K)"
          data={hcData}
          labelFmt={(v) => `$${v}K`}
          tooltipContent={hcTip}
          height={chartH}
        />
      </div>

      {/* Three metric cards */}
      <div className="flex gap-[6px]">
        <MetricCard
          icon={<Clock size={11} strokeWidth={2.3} />}
          label="TTM saved"
          delta={`-${ttmDelta}d`}
          sub={`${ttmBefore}d to ${ttmAfter}d`}
          title="Time to market"
          lines={ttmLines}
          accent={accent}
        />
        <MetricCard
          icon={<DollarSign size={11} strokeWidth={2.3} />}
          label="HC recovered"
          delta={fmtHcDelta}
          sub="this step"
          title="Holding cost recovery"
          lines={hcLines}
          accent="#10B981"
        />
        <MetricCard
          icon={<Activity size={11} strokeWidth={2.3} />}
          label="Inv. score"
          delta={scoreAfter.toFixed(1)}
          sub={`+${scoreDelta.toFixed(1)} pts`}
          title="Inventory score"
          lines={scoreLines}
          accent="#7C3AED"
        >
          {/* 0–10 progress bar */}
          <div className="mt-[6px] h-[3px] rounded-full overflow-hidden" style={{ background: "#E5E7EB" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${(scoreAfter / 10) * 100}%`,
                background: "linear-gradient(90deg, #7C3AED, #4600F2)",
              }}
            />
          </div>
          <div className="flex justify-between mt-[2px]">
            <span className="text-[8.5px] text-black/25 font-['Inter:Regular',sans-serif]">0</span>
            <span className="text-[8.5px] text-black/25 font-['Inter:Regular',sans-serif]">10</span>
          </div>
        </MetricCard>
      </div>
    </div>
  );
}

// ── Shared tooltip row helper ─────────────────────────────────────────────────
function Row({ l, v, green }: { l: string; v: string; green?: boolean }) {
  return (
    <div className="flex justify-between gap-[8px]">
      <span className="text-[10px] text-white/50 font-['Inter:Regular',sans-serif]">{l}</span>
      <span className={`text-[10px] font-semibold font-['Inter:Semi_Bold',sans-serif] ${green ? "text-[#34D399]" : "text-white"}`}>
        {v}
      </span>
    </div>
  );
}
