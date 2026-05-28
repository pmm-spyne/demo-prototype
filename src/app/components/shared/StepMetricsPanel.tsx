import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { Clock, DollarSign, Activity, Camera, Zap } from "lucide-react";
import { calcOpportunity, type DemoConfig } from "../../types/demoConfig";

// ── Constants (mirrored from Demo2.tsx — keep in sync) ───────────────────────
const SCORE_STEPS = [4.2, 5.3, 6.4, 7.5, 8.4, 9.1];
const HC_STEPS    = [52_500, 48_200, 43_600, 37_300, 27_900, 10_000];
const DTF_STEPS   = [14, 12, 10, 8, 6, 5];

// Step-specific TTM "after" targets (see docs/METRICS_AND_DEALER_INPUTS.md §4.3)
// nophoto: 0d — SmartMatch is instant, no photographer visit needed
// cgi:     1d — CGI processing SLA
// raw:     no override — use dealer-scaled fleet avg (dtf[afterIdx])
const TTM_AFTER_OVERRIDE: Partial<Record<StepBucketKey, number>> = {
  nophoto: 0,
  cgi: 1,
};

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

// ── GraphSection ──────────────────────────────────────────────────────────────
interface GraphSectionProps {
  title: string;
  beforeDisplay: string;
  afterDisplay: string;
  deltaDisplay: string;
  deltaColor: string;
  deltaBg: string;
  startPct: number;
  endPct: number;
  afterBarRef: React.RefObject<HTMLDivElement | null>;
  deltaRef: React.RefObject<HTMLDivElement | null>;
  afterBarGradient: string;
  isZeroAfter?: boolean;
}

function GraphSection({
  title,
  beforeDisplay,
  afterDisplay,
  deltaDisplay,
  deltaColor,
  deltaBg,
  startPct,
  endPct: _endPct,
  afterBarRef,
  deltaRef,
  afterBarGradient,
  isZeroAfter,
}: GraphSectionProps) {
  return (
    <div
      className="rounded-[16px] border border-black/[0.06] bg-white p-[16px] shadow-[0_1px_0_rgba(0,0,0,0.04)]"
    >
      {/* Title + animated delta badge */}
      <div className="flex items-center justify-between mb-[12px]">
        <p className="text-[9.5px] font-bold uppercase tracking-[1.5px] text-black/35 font-['Inter:Bold',sans-serif]">
          {title}
        </p>
        <div
          ref={deltaRef}
          className="inline-flex items-center px-[10px] py-[4px] rounded-full text-[11px] font-bold font-['Inter:Bold',sans-serif]"
          style={{ background: deltaBg, color: deltaColor, opacity: 0 }}
        >
          {deltaDisplay}
        </div>
      </div>

      {/* Joined Before/After pair (grouped set) */}
      <div className="rounded-[14px] border border-black/[0.06] bg-[#F8FAFC] p-[12px]">
        {/* Before row */}
        <div className="flex items-center gap-[10px]">
          <span className="w-[56px] text-[9px] font-bold uppercase tracking-[0.9px] text-black/30 font-['Inter:Bold',sans-serif]">
            Before
          </span>
          <div className="flex-1 h-[32px] rounded-[10px] overflow-hidden border border-black/[0.05] bg-white">
            <div
              className="h-full w-full"
              style={{ background: "linear-gradient(90deg, rgba(244,63,94,0.20) 0%, rgba(244,63,94,0.10) 100%)" }}
            />
          </div>
          <span className="w-[54px] text-right text-[13px] font-bold text-black/45 tabular-nums font-['Inter:Bold',sans-serif]">
            {beforeDisplay}
          </span>
        </div>

        <div className="h-[10px]" />

        {/* After row */}
        <div className="flex items-center gap-[10px]">
          <span
            className="w-[56px] text-[9px] font-bold uppercase tracking-[0.9px] font-['Inter:Bold',sans-serif]"
            style={{ color: deltaColor }}
          >
            After
          </span>
          <div className="flex-1 h-[32px] rounded-[10px] overflow-hidden border border-black/[0.05] bg-white relative">
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(15,23,42,0.06) 0%, rgba(15,23,42,0.03) 100%)" }}
            />
            <div
              ref={afterBarRef}
              className="absolute inset-y-0 left-0 rounded-[10px]"
              style={{
                background: afterBarGradient,
                width: `${startPct}%`,
              }}
            />
            {isZeroAfter && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] font-bold text-[#059669] font-['Inter:Bold',sans-serif]">
                  Instant
                </span>
              </div>
            )}
          </div>
          <span
            className="w-[54px] text-right text-[13px] font-bold tabular-nums font-['Inter:Bold',sans-serif]"
            style={{ color: deltaColor }}
          >
            {afterDisplay}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── MetricBox ─────────────────────────────────────────────────────────────────
interface MetricBoxProps {
  icon: React.ReactNode;
  label: string;
  delta: React.ReactNode;
  sub: string;
  accent: string;
}

const MetricBox = forwardRef<HTMLDivElement, MetricBoxProps>(
  ({ icon, label, delta, sub, accent }, ref) => (
    <div
      ref={ref}
      className="flex-1 rounded-[12px] p-[14px] flex flex-col"
      style={{ background: "#F3F4F6" }}
    >
      <span
        className="size-[24px] rounded-[6px] flex items-center justify-center mb-[10px]"
        style={{ background: `${accent}18`, color: accent }}
      >
        {icon}
      </span>
      <p className="text-[22px] font-bold text-[#0a0a0a] leading-none tabular-nums font-['Inter:Bold',sans-serif]">
        {delta}
      </p>
      <p className="mt-[5px] text-[8.5px] font-bold uppercase tracking-[0.5px] text-black/35 font-['Inter:Bold',sans-serif]">
        {label}
      </p>
      <p className="mt-[3px] text-[9.5px] text-black/40 leading-snug font-['Inter:Regular',sans-serif]">
        {sub}
      </p>
    </div>
  )
);
MetricBox.displayName = "MetricBox";

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
  completedSteps: _completedSteps,
  demoConfig,
  accent,
  successMode: _successMode = false,
}: StepMetricsPanelProps) {
  const bucketIdx = BUCKET_ORDER.indexOf(bucketKey);
  if (bucketIdx > 2) return null;

  const afterIdx = bucketIdx + 1;

  const opp    = calcOpportunity(demoConfig);
  const hc     = scaledHC(demoConfig);
  const dtf    = scaledDTF(demoConfig);

  // ── TTM values ───────────────────────────────────────────────────────────────
  // Before: dealer's original baseline — fixed across all steps
  // Start:  previous step's After value — where animation begins
  // After:  this step's target — where animation ends
  const ttmBaseline  = dtf[0];
  const ttmPrevAfter = dtf[bucketIdx];
  const ttmAfter     = TTM_AFTER_OVERRIDE[bucketKey] ?? dtf[afterIdx];
  const ttmDelta     = ttmBaseline - ttmAfter;
  const isZeroTTM    = ttmAfter === 0;

  const ttmStartPct = ttmBaseline > 0 ? (ttmPrevAfter / ttmBaseline) * 100 : 100;
  const ttmEndPct   = ttmBaseline > 0 ? (ttmAfter / ttmBaseline) * 100 : 0;

  // ── HC values ────────────────────────────────────────────────────────────────
  const hcBaseline  = hc[0];
  const hcPrevAfter = hc[bucketIdx];
  const hcAfter     = hc[afterIdx];
  const hcDelta     = hcPrevAfter - hcAfter; // recovered THIS step

  const hcStartPct = hcBaseline > 0 ? (hcPrevAfter / hcBaseline) * 100 : 100;
  const hcEndPct   = hcBaseline > 0 ? Math.max(4, (hcAfter / hcBaseline) * 100) : 4;

  // ── Score values ─────────────────────────────────────────────────────────────
  const scoreBefore = SCORE_STEPS[bucketIdx];
  const scoreAfter  = SCORE_STEPS[afterIdx];
  const scoreDelta  = +(scoreAfter - scoreBefore).toFixed(1);

  // ── Step 2 specific ──────────────────────────────────────────────────────────
  const photoSpendAvoided = opp.vehiclesNoPhotos * demoConfig.perVinCost;

  // ── Animation refs ───────────────────────────────────────────────────────────
  const ttmAfterBarRef  = useRef<HTMLDivElement>(null);
  const hcAfterBarRef   = useRef<HTMLDivElement>(null);
  const ttmDeltaRef     = useRef<HTMLDivElement>(null);
  const hcDeltaRef      = useRef<HTMLDivElement>(null);
  const box1Ref         = useRef<HTMLDivElement>(null);
  const box2Ref         = useRef<HTMLDivElement>(null);
  const box3Ref         = useRef<HTMLDivElement>(null);
  const scoreNumberRef  = useRef<HTMLSpanElement>(null);

  // ── Entrance animation ───────────────────────────────────────────────────────
  // Runs on mount (StepMetricsPanel mounts fresh when success state activates).
  // Sequence:
  //   0.00s  Before bars appear instantly (no animation — static reference)
  //   0.15s  After bars animate from prev-step width → this-step width
  //   0.70s  Delta badges pop in
  //   0.80s  Metric boxes slide up
  //   0.90s  Score odometer counts up
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    // Set After bars at previous-step start position before animating
    if (ttmAfterBarRef.current) {
      gsap.set(ttmAfterBarRef.current, { width: `${ttmStartPct}%` });
      tl.to(ttmAfterBarRef.current, {
        width: `${Math.max(0, ttmEndPct)}%`,
        duration: 0.8,
        ease: "power3.out",
      }, 0);
    }

    if (hcAfterBarRef.current) {
      gsap.set(hcAfterBarRef.current, { width: `${hcStartPct}%` });
      tl.to(hcAfterBarRef.current, {
        width: `${hcEndPct}%`,
        duration: 0.8,
        ease: "power3.out",
      }, 0.1);
    }

    // Delta badges: scale + fade pop after bars settle
    tl.fromTo(
      [ttmDeltaRef.current, hcDeltaRef.current],
      { opacity: 0, scale: 0.75, y: 4 },
      { opacity: 1, scale: 1, y: 0, duration: 0.32, ease: "back.out(1.7)", stagger: 0.09 },
      0.65
    );

    // Metric boxes: staggered slide up
    tl.fromTo(
      [box1Ref.current, box2Ref.current, box3Ref.current],
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.42, ease: "power3.out", stagger: 0.09 },
      0.78
    );

    // Score odometer count-up
    if (scoreNumberRef.current) {
      const obj = { val: scoreBefore };
      tl.to(obj, {
        val: scoreAfter,
        duration: 0.9,
        ease: "power2.out",
        onUpdate() {
          if (scoreNumberRef.current) {
            scoreNumberRef.current.textContent = obj.val.toFixed(1);
          }
        },
      }, 0.88);
    }

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketKey]);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-[12px]">
      {/* ── Graph 1: Time to market ─────────────────────────────────────────── */}
      <GraphSection
        title="Time to market"
        beforeDisplay={`${ttmBaseline}d`}
        afterDisplay={isZeroTTM ? "0d" : `${ttmAfter}d`}
        deltaDisplay={`-${ttmDelta}d`}
        deltaColor={accent}
        deltaBg={`${accent}20`}
        startPct={ttmStartPct}
        endPct={ttmEndPct}
        afterBarRef={ttmAfterBarRef}
        deltaRef={ttmDeltaRef}
        afterBarGradient={`linear-gradient(90deg, ${accent} 0%, ${accent}CC 100%)`}
        isZeroAfter={isZeroTTM}
      />

      {/* ── Graph 2: Holding cost ───────────────────────────────────────────── */}
      <GraphSection
        title="Holding cost at risk · monthly"
        beforeDisplay={fmtK(hcBaseline)}
        afterDisplay={fmtK(hcAfter)}
        deltaDisplay={`+${fmtK(hcDelta)} recovered`}
        deltaColor="#059669"
        deltaBg="#D1FAE5"
        startPct={hcStartPct}
        endPct={hcEndPct}
        afterBarRef={hcAfterBarRef}
        deltaRef={hcDeltaRef}
        afterBarGradient="linear-gradient(90deg, #10B981 0%, #059669 100%)"
      />

      {/* ── Three metric boxes ──────────────────────────────────────────────── */}
      <div className="flex gap-[8px] pt-[2px]">
        {/* Box 1 — step-specific primary outcome */}
        {bucketKey === "nophoto" ? (
          <MetricBox
            ref={box1Ref}
            icon={<Zap size={13} strokeWidth={2.5} />}
            label="Matched and live"
            delta={`${opp.vehiclesNoPhotos}`}
            sub="0 photos → live in 4 min"
            accent="#7C3AED"
          />
        ) : (
          <MetricBox
            ref={box1Ref}
            icon={<Clock size={13} strokeWidth={2.5} />}
            label="Days faster to live"
            delta={`-${ttmDelta}d`}
            sub={`${ttmBaseline}d → ${isZeroTTM ? "instant" : `${ttmAfter}d`}`}
            accent={accent}
          />
        )}

        {/* Box 2 — step-specific financial outcome */}
        {bucketKey === "nophoto" ? (
          <MetricBox
            ref={box2Ref}
            icon={<Camera size={13} strokeWidth={2.5} />}
            label="Photo spend avoided"
            delta={fmtK(photoSpendAvoided)}
            sub={`${opp.vehiclesNoPhotos} cars × $${demoConfig.perVinCost}/VIN`}
            accent="#0891B2"
          />
        ) : (
          <MetricBox
            ref={box2Ref}
            icon={<DollarSign size={13} strokeWidth={2.5} />}
            label="Holding cost recovered"
            delta={`+${fmtK(hcDelta)}`}
            sub="recovered this step"
            accent="#10B981"
          />
        )}

        {/* Box 3 — inventory score odometer (all steps) */}
        <MetricBox
          ref={box3Ref}
          icon={<Activity size={13} strokeWidth={2.5} />}
          label="Listing quality"
          delta={
            <span ref={scoreNumberRef}>{scoreBefore.toFixed(1)}</span>
          }
          sub={`+${scoreDelta} pts  ·  0 – 10`}
          accent="#7C3AED"
        />
      </div>
    </div>
  );
}
