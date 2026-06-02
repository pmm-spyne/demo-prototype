import { useEffect, useRef } from "react";
import gsap from "gsap";
import { calcOpportunity, type DemoConfig } from "../../types/demoConfig";

// ── Constants (mirrored from Demo2.tsx — keep in sync) ───────────────────────
const SCORE_STEPS = [4.2, 5.3, 6.4, 7.5, 8.4, 9.1];
const HC_STEPS    = [52_500, 48_200, 43_600, 37_300, 27_900, 10_000];
const DTF_STEPS   = [14, 12, 10, 8, 6, 5];

export type StepBucketKey = "raw" | "nophoto" | "cgi" | "unsyndicated" | "aging";
const BUCKET_ORDER: StepBucketKey[] = ["raw", "nophoto", "cgi", "unsyndicated", "aging"];

// ── Scaling helpers ───────────────────────────────────────────────────────────
function scaledHC(cfg: DemoConfig): number[] {
  const s = Math.max(0.2, (cfg.holdingCostPerDay * cfg.monthlySalesVolume) / (46 * 100));
  return HC_STEPS.map(v => Math.round(v * s));
}

function scaledDTF(cfg: DemoConfig): number[] {
  const { currentDaysToFrontline } = calcOpportunity(cfg);
  const shift = currentDaysToFrontline - DTF_STEPS[0];
  return DTF_STEPS.map((v, i) =>
    i === 0 ? currentDaysToFrontline : Math.max(1, v + shift)
  );
}

function fmtK(v: number): string {
  return v >= 1_000 ? `$${(v / 1_000).toFixed(1)}K` : `$${v.toLocaleString()}`;
}

// ── Impact bullets: B1 = number (proof), B2 = mechanism, B3 = dealer outcome ─
const STEP_BULLETS: Record<StepBucketKey, [string, string, string]> = {
  raw: [
    "Dealers on Studio AI report 46%+ more leads per listing",
    "Studio photos rank higher in portal search results",
    "Better photos shorten time from first view to first inquiry",
  ],
  nophoto: [
    "Each offline unit costs $200-$300/week in missed leads",
    "No photographer visit means no scheduling delay or gaps",
    "Vehicles live before they arrive on lot capture demand from day one",
  ],
  cgi: [
    "Stock photos suppress CTR on every portal that renders them",
    "Consistent branded visuals build recognition across all your VDPs",
    "Real images outperform OEM stock in buyer trust and time on page",
  ],
  unsyndicated: [
    "Buyers on AutoTrader, Cars.com, and KBB never see unlisted inventory",
    "Each additional portal multiplies impressions with no extra ad spend",
    "Multi-platform reach reduces dependence on any single traffic source",
  ],
  aging: [
    "By day 45, a unit has already burned 59% of its average front gross",
    "Campaign treatment re-enters promoted units higher in portal search",
    "Every 10 days saved at $46/day protects $460 in gross per unit",
  ],
};

// ── BeforeAfterBlock ──────────────────────────────────────────────────────────
interface BeforeAfterBlockProps {
  label: string;
  beforeVal: string;
  afterVal: string;
  deltaDisplay: string;
  deltaColor: string;
  deltaBg: string;
  blockRef: React.RefObject<HTMLDivElement | null>;
}

function BeforeAfterBlock({
  label,
  beforeVal,
  afterVal,
  deltaDisplay,
  deltaColor,
  deltaBg,
  blockRef,
}: BeforeAfterBlockProps) {
  return (
    <div ref={blockRef}>
      <p className="text-[10px] font-semibold uppercase tracking-[1.2px] text-black/40 mb-[10px] font-['Inter',sans-serif]">
        {label}
      </p>
      <div className="flex items-center gap-[10px]">
        {/* Before */}
        <div
          className="flex-1 rounded-[10px] px-[14px] py-[12px]"
          style={{
            background: "rgba(244,63,94,0.06)",
            border: "1px solid rgba(244,63,94,0.14)",
          }}
        >
          <p className="text-[8.5px] font-semibold uppercase tracking-[0.8px] text-[#F43F5E]/55 mb-[4px] font-['Inter',sans-serif]">
            Before
          </p>
          <p className="text-[17px] font-bold text-[#F43F5E] tabular-nums leading-none font-['Inter',sans-serif]">
            {beforeVal}
          </p>
        </div>

        {/* Arrow */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 text-black/20"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* After */}
        <div
          className="flex-1 rounded-[10px] px-[14px] py-[12px]"
          style={{
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.18)",
          }}
        >
          <p className="text-[8.5px] font-semibold uppercase tracking-[0.8px] text-[#059669]/55 mb-[4px] font-['Inter',sans-serif]">
            After
          </p>
          <p className="text-[17px] font-bold text-[#059669] tabular-nums leading-none font-['Inter',sans-serif]">
            {afterVal}
          </p>
        </div>

        {/* Delta badge */}
        <span
          className="shrink-0 px-[10px] py-[5px] rounded-full text-[10px] font-bold whitespace-nowrap font-['Inter',sans-serif]"
          style={{ background: deltaBg, color: deltaColor }}
        >
          {deltaDisplay}
        </span>
      </div>
    </div>
  );
}

// ── ImpactBullets ─────────────────────────────────────────────────────────────
interface ImpactBulletsProps {
  bullets: [string, string, string];
  accent: string;
  bulletsRef: React.RefObject<HTMLDivElement | null>;
}

function ImpactBullets({ bullets, accent, bulletsRef }: ImpactBulletsProps) {
  return (
    <div ref={bulletsRef} className="space-y-[8px] pt-[4px]">
      {bullets.map((b, i) => (
        <div key={i} className="flex items-start gap-[8px]">
          <span
            className="shrink-0 mt-[1px] text-[9px] leading-[1.6]"
            style={{ color: accent }}
          >
            ◆
          </span>
          <span className="text-[12.5px] text-[#374151] leading-[1.45] font-['Inter',sans-serif]">
            {b}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export interface StepMetricsPanelProps {
  bucketKey: StepBucketKey;
  completedSteps: number;
  demoConfig: DemoConfig;
  accent: string;
  successMode?: boolean;
}

export function StepMetricsPanel({
  bucketKey,
  demoConfig,
  accent,
}: StepMetricsPanelProps) {
  const hc  = scaledHC(demoConfig);
  const dtf = scaledDTF(demoConfig);
  const opp = calcOpportunity(demoConfig);
  const afterIdx = BUCKET_ORDER.indexOf(bucketKey) + 1;

  const blockRef   = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);

  // ── Per-step metric config ────────────────────────────────────────────────
  let metricLabel  = "";
  let beforeVal    = "";
  let afterVal     = "";
  let deltaDisplay = "";
  let deltaColor   = "#059669";
  let deltaBg      = "#D1FAE5";

  if (bucketKey === "raw") {
    const scoreBefore = SCORE_STEPS[0]; // 4.2
    const scoreAfter  = SCORE_STEPS[1]; // 5.3
    metricLabel  = "Media Score";
    beforeVal    = `${scoreBefore.toFixed(1)} / 10`;
    afterVal     = `${scoreAfter.toFixed(1)} / 10`;
    deltaDisplay = `+${(scoreAfter - scoreBefore).toFixed(1)} pts`;
    deltaColor   = accent;
    deltaBg      = `${accent}22`;

  } else if (bucketKey === "nophoto" || bucketKey === "cgi") {
    const delta = hc[0] - hc[afterIdx];
    metricLabel  = "Gross Margin at Risk";
    beforeVal    = fmtK(hc[0]);
    afterVal     = fmtK(hc[afterIdx]);
    deltaDisplay = `+${fmtK(delta)} recovered`;

  } else if (bucketKey === "unsyndicated") {
    const ttmBefore = dtf[0];
    metricLabel  = "Time to Market";
    beforeVal    = `${ttmBefore}d`;
    afterVal     = "1d";
    deltaDisplay = `-${ttmBefore - 1}d`;
    deltaColor   = accent;
    deltaBg      = `${accent}22`;

  } else if (bucketKey === "aging") {
    // Playbook Ch.5: "a 10-day delay adds $460 per unit in expense" ($46/day x 10d).
    // Campaigns save a conservative 10 days of DOL per aged unit.
    // costBefore = agedVehicles x holdingCostPerDay x 30d (full monthly exposure)
    // costAfter  = agedVehicles x holdingCostPerDay x 20d (30d - 10d saved)
    const costBefore = opp.agedMonthly;
    const costAfter  = Math.round(costBefore * (20 / 30));
    metricLabel  = "Gross Margin at Risk";
    beforeVal    = fmtK(costBefore);
    afterVal     = fmtK(costAfter);
    deltaDisplay = `+${fmtK(costBefore - costAfter)} recovered`;
  }

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    if (blockRef.current) gsap.set(blockRef.current, { opacity: 0, y: 10 });
    if (bulletsRef.current) gsap.set(bulletsRef.current, { opacity: 0, y: 14 });

    tl.to(blockRef.current,   { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" }, 0);
    tl.to(bulletsRef.current, { opacity: 1, y: 0, duration: 0.38, ease: "power3.out" }, 0.5);

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketKey]);

  return (
    <div className="space-y-[16px]">
      <BeforeAfterBlock
        label={metricLabel}
        beforeVal={beforeVal}
        afterVal={afterVal}
        deltaDisplay={deltaDisplay}
        deltaColor={deltaColor}
        deltaBg={deltaBg}
        blockRef={blockRef}
      />
      <ImpactBullets
        bullets={STEP_BULLETS[bucketKey]}
        accent={accent}
        bulletsRef={bulletsRef}
      />
    </div>
  );
}
