import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Check, ChevronRight, Info } from "lucide-react";
import { Stage01PillAnimation } from "./Stage01PillAnimation";
import { TooltipContent, TooltipProvider } from "./ui/tooltip";

export type DemoJourneyStage = 1 | 2 | 3 | 4;

export interface DemoJourneyProspectNumbers {
  noPhotoVehicles: number;
  holdingCost: number;
  totalVehicles: number;
  monthlyReclaim: number;
}

export interface DemoJourneyStripProps {
  activeStage: DemoJourneyStage;
  completedStages: number[];
  dealerName: string;
  prospectNumbers: DemoJourneyProspectNumbers;
}

const STAGES: { id: DemoJourneyStage; name: string; tooltip: string }[] = [
  {
    id: 1,
    name: "Import & connect",
    tooltip:
      "Ask: how long does it take you to get a new vehicle live today? Then show the Day 0 moment.",
  },
  {
    id: 2,
    name: "Scan & diagnose",
    tooltip:
      "Ask: how consistent are photos across your locations? Then show the score jumping 3.2 → 9.8",
  },
  {
    id: 3,
    name: "Merchandise & match",
    tooltip:
      "Show them their IMS logo already connected. 932 publications is the number to land.",
  },
  {
    id: 4,
    name: "Publish & campaign",
    tooltip:
      "Ask: what happens to cars sitting past 30 days? Then show the campaign auto-firing.",
  },
];

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function invisibleReclaim(p: DemoJourneyProspectNumbers): number {
  return Math.min(p.noPhotoVehicles * 220 * 4, p.monthlyReclaim);
}

function cumulativeRecovered(completedStages: number[], p: DemoJourneyProspectNumbers): number {
  if (completedStages.length === 0) return 0;
  const maxCompleted = Math.max(...completedStages);
  if (maxCompleted >= 4) return p.monthlyReclaim;
  if (maxCompleted >= 3) return invisibleReclaim(p);
  return 0;
}

function completedOutcome(
  stageId: DemoJourneyStage,
  p: DemoJourneyProspectNumbers,
): string {
  switch (stageId) {
    case 1:
      return `${p.totalVehicles} vehicles synced`;
    case 2:
      return `${p.noPhotoVehicles} photo gaps found`;
    case 3:
      return `${p.noPhotoVehicles} gaps filled overnight`;
    case 4:
      return `$${formatCurrency(p.monthlyReclaim)}/mo reclaimed`;
    default:
      return "";
  }
}

function stageStatus(
  stageId: DemoJourneyStage,
  activeStage: DemoJourneyStage,
  completedStages: number[],
): "active" | "completed" | "future" {
  if (completedStages.includes(stageId)) return "completed";
  if (stageId === activeStage) return "active";
  return "future";
}

function RecoveredCounter({ value }: { value: number }) {
  const animated = useRef({ val: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    gsap.killTweensOf(animated.current);
    gsap.to(animated.current, {
      val: value,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => setDisplayValue(Math.round(animated.current.val)),
    });
  }, [value]);

  return (
    <div className="text-right shrink-0">
      <p className="text-[10px] font-semibold uppercase tracking-[1px] text-black/45 font-['Inter:Semi_Bold',sans-serif]">
        Monthly value recovered
      </p>
      <p className="mt-[2px] text-[20px] font-bold text-[#4600F2] font-['Inter:Bold',sans-serif] leading-none tabular-nums">
        ${formatCurrency(displayValue)}
      </p>
    </div>
  );
}

function StagePill({
  stageId,
  name,
  status,
  outcome,
  holdingCost,
  tooltip,
}: {
  stageId: DemoJourneyStage;
  name: string;
  status: "active" | "completed" | "future";
  outcome?: string;
  holdingCost?: number;
  tooltip: string;
}) {
  const isActive = status === "active";
  const isCompleted = status === "completed";
  const isFuture = status === "future";
  const showStage01Animation = stageId === 1 && isActive;

  return (
    <div
      className={`h-full flex flex-col rounded-[12px] border transition-colors overflow-hidden
        ${showStage01Animation ? "px-[8px] py-[6px]" : "px-[14px] py-[12px]"}
        ${isActive ? "bg-white border-[#4600F2] shadow-[0_1px_3px_rgba(70,0,242,0.08)]" : ""}
        ${isCompleted ? "bg-white/80 border-[rgba(70,0,242,0.15)]" : ""}
        ${isFuture ? "bg-white/60 border-black/8 opacity-40" : ""}`}
    >
      <div className="flex items-center gap-[6px] shrink-0">
        {isCompleted && (
          <span className="shrink-0 size-[18px] rounded-full bg-[#4600F2] flex items-center justify-center">
            <Check size={11} className="text-white" strokeWidth={3} />
          </span>
        )}
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.6px] font-['Inter:Bold',sans-serif]
            ${isActive ? "text-[#4600F2]" : ""}
            ${isCompleted ? "text-black/50" : ""}
            ${isFuture ? "text-black/40" : ""}`}
        >
          Stage {stageId}
        </span>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>
            <button
              type="button"
              className={`ml-auto shrink-0 size-[16px] rounded-full flex items-center justify-center transition-colors
                ${isActive ? "text-[#4600F2] hover:bg-[rgba(70,0,242,0.08)]" : "text-black/30 hover:text-black/50 hover:bg-black/5"}
                ${isFuture ? "opacity-60" : ""}`}
              aria-label={`Stage ${stageId} demo tip`}
            >
              <Info size={11} strokeWidth={2.5} />
            </button>
          </TooltipPrimitive.Trigger>
          <TooltipContent
            side="bottom"
            sideOffset={6}
            className="max-w-[220px] bg-[#402387] text-white text-[11px] leading-[15px] font-['Inter:Regular',sans-serif] px-[10px] py-[8px] border-0 shadow-[0_4px_12px_rgba(64,35,135,0.25)] [&>svg]:fill-[#402387] [&>svg]:bg-[#402387]"
          >
            {tooltip}
          </TooltipContent>
        </TooltipPrimitive.Root>
      </div>

      {showStage01Animation ? (
        <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
          <div className="origin-center scale-[0.82]">
            <Stage01PillAnimation holdingCost={holdingCost} />
          </div>
        </div>
      ) : (
        <>
          <p
            className={`mt-[4px] text-[13px] font-semibold font-['Inter:Semi_Bold',sans-serif] leading-[18px] truncate
              ${isActive ? "text-[#0a0a0a]" : ""}
              ${isCompleted ? "text-black/75" : ""}
              ${isFuture ? "text-black/55" : ""}`}
          >
            {name}
          </p>
          {isCompleted && outcome && (
            <p className="mt-[6px] text-[11px] text-[#4600F2] font-['Inter:Regular',sans-serif] leading-[14px] truncate">
              {outcome}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export function DemoJourneyStrip({
  activeStage,
  completedStages,
  dealerName,
  prospectNumbers,
}: DemoJourneyStripProps) {
  const recovered = cumulativeRecovered(completedStages, prospectNumbers);
  const activeTooltip = STAGES.find((s) => s.id === activeStage)?.tooltip;

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className="w-full rounded-[12px] border border-[rgba(70,0,242,0.12)] bg-[#F5F3FF] px-[16px] py-[12px]"
        aria-label="Demo journey progress"
      >
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between gap-[16px]">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[#4600F2]/70 font-['Inter:Semi_Bold',sans-serif]">
                Demo journey
              </p>
              <p className="mt-[1px] text-[13px] font-semibold text-[#402387] font-['Inter:Semi_Bold',sans-serif] truncate">
                {dealerName || "Your dealership"}
              </p>
            </div>
            <RecoveredCounter value={recovered} />
          </div>

          <div className="flex items-stretch w-full gap-[6px]">
            {STAGES.map((stage, index) => {
              const status = stageStatus(stage.id, activeStage, completedStages);
              return (
                <Fragment key={stage.id}>
                  <div className="flex-1 min-w-0">
                    <StagePill
                      stageId={stage.id}
                      name={stage.name}
                      status={status}
                      tooltip={stage.tooltip}
                      holdingCost={prospectNumbers.holdingCost}
                      outcome={
                        status === "completed"
                          ? completedOutcome(stage.id, prospectNumbers)
                          : undefined
                      }
                    />
                  </div>
                  {index < STAGES.length - 1 && (
                    <ChevronRight
                      size={14}
                      className="shrink-0 self-center text-[#4600F2]/30"
                      strokeWidth={2}
                      aria-hidden
                    />
                  )}
                </Fragment>
              );
            })}
          </div>

          {activeTooltip && (
            <p className="text-[11px] text-[#402387]/80 font-['Inter:Regular',sans-serif] leading-[15px] border-t border-[rgba(70,0,242,0.1)] pt-[8px]">
              <span className="font-semibold text-[#4600F2] font-['Inter:Semi_Bold',sans-serif]">
                Stage {activeStage} tip:{" "}
              </span>
              {activeTooltip}
            </p>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
