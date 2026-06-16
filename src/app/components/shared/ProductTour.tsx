import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X, ArrowRight, ChevronLeft, Lock } from "lucide-react";

export interface TourStep {
  /** data-tour-id of the element to spotlight */
  targetId: string;
  title: string;
  body: string;
  placement: "top" | "bottom" | "left" | "right";
  /** Override the CTA label. Defaults to "Next" (last step: "Got it"). */
  ctaLabel?: string;
  /** Renders a Pro badge in the tooltip header to indicate this is a Pro feature. */
  lockPreview?: boolean;
}

export interface ProductTourProps {
  steps: TourStep[];
  onComplete: () => void;
  onSkip: () => void;
}

const SPOT_PAD = 10;
const SPOT_RADIUS = 12;
const TOOLTIP_W = 328;

function getTargetRect(targetId: string): DOMRect | null {
  const el = document.querySelector(`[data-tour-id="${targetId}"]`);
  if (!el) return null;
  return el.getBoundingClientRect();
}

function tooltipPos(
  rect: DOMRect,
  placement: TourStep["placement"],
  tooltipH: number,
): { top: number; left: number } {
  const gap = SPOT_PAD + 14;
  const sx = rect.left - SPOT_PAD;
  const sy = rect.top - SPOT_PAD;
  const sw = rect.width + SPOT_PAD * 2;
  const sh = rect.height + SPOT_PAD * 2;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top = 0;
  let left = 0;

  switch (placement) {
    case "bottom":
      top = sy + sh + gap;
      left = sx + sw / 2 - TOOLTIP_W / 2;
      break;
    case "top":
      top = sy - gap - tooltipH;
      left = sx + sw / 2 - TOOLTIP_W / 2;
      break;
    case "right":
      top = sy + sh / 2 - tooltipH / 2;
      left = sx + sw + gap;
      break;
    case "left":
      top = sy + sh / 2 - tooltipH / 2;
      left = sx - gap - TOOLTIP_W;
      break;
  }

  return {
    top: Math.max(12, Math.min(vh - tooltipH - 12, top)),
    left: Math.max(12, Math.min(vw - TOOLTIP_W - 12, left)),
  };
}

export function ProductTour({ steps, onComplete, onSkip }: ProductTourProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;

  const measure = useCallback(() => {
    const r = getTargetRect(step.targetId);
    if (r) {
      // Scroll target into view if needed
      const el = document.querySelector(`[data-tour-id="${step.targetId}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
    setRect(r);
  }, [step.targetId]);

  // Re-measure on step change (small delay to let scroll/render settle)
  useEffect(() => {
    const t = setTimeout(measure, 60);
    return () => clearTimeout(t);
  }, [measure]);

  // Re-measure on resize
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Update tooltip position when rect or tooltip height changes
  useEffect(() => {
    if (!rect || !tooltipRef.current) return;
    const h = tooltipRef.current.offsetHeight || 180;
    setPos(tooltipPos(rect, step.placement, h));
  }, [rect, step.placement]);

  // Animate tooltip in on each step
  useEffect(() => {
    const el = tooltipRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { y: 8, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" },
    );
  }, [stepIdx]);

  const goNext = () => {
    if (!isLast) {
      setStepIdx((i) => i + 1);
    } else {
      onComplete();
    }
  };
  const goBack = () => setStepIdx((i) => Math.max(0, i - 1));

  const sx = rect ? rect.left - SPOT_PAD : 0;
  const sy = rect ? rect.top - SPOT_PAD : 0;
  const sw = rect ? rect.width + SPOT_PAD * 2 : 0;
  const sh = rect ? rect.height + SPOT_PAD * 2 : 0;

  return createPortal(
    <>
      {/* Dark overlay with spotlight cutout */}
      <svg
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9000, width: "100vw", height: "100vh" }}
        aria-hidden
      >
        <defs>
          <mask id="product-tour-spotlight">
            <rect width="100%" height="100%" fill="white" />
            {rect && (
              <rect x={sx} y={sy} width={sw} height={sh} rx={SPOT_RADIUS} fill="black" />
            )}
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(4,4,20,0.68)"
          mask="url(#product-tour-spotlight)"
        />
        {/* Spotlight ring */}
        {rect && (
          <rect
            x={sx} y={sy} width={sw} height={sh} rx={SPOT_RADIUS}
            fill="none"
            stroke="rgba(70,0,242,0.55)"
            strokeWidth="1.5"
          />
        )}
      </svg>

      {/* Click-blocker (lets tooltip clicks through, blocks app below) */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 8999 }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed"
        style={{
          zIndex: 9001,
          top: pos.top,
          left: pos.left,
          width: TOOLTIP_W,
        }}
      >
        <div className="rounded-[16px] bg-white overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.24),0_0_0_1px_rgba(0,0,0,0.07)]">
          {/* Gradient accent bar */}
          <div
            className="h-[3.5px]"
            style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)" }}
          />

          <div className="px-[18px] pt-[16px] pb-[18px]">
            {/* Title row */}
            <div className="flex items-start justify-between gap-[8px] mb-[8px]">
              <div className="flex items-center gap-[7px] flex-wrap min-w-0">
                {step.lockPreview && (
                  <span
                    className="inline-flex items-center gap-[3px] shrink-0 px-[7px] py-[2px] rounded-full text-[9px] font-bold uppercase tracking-[0.6px] text-white font-['Inter:Bold',sans-serif]"
                    style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)" }}
                  >
                    <Lock size={8} strokeWidth={3} /> Pro
                  </span>
                )}
                <h3 className="text-[13.5px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-snug">
                  {step.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onSkip}
                className="size-[22px] rounded-full bg-black/6 flex items-center justify-center text-black/40 hover:bg-black/12 shrink-0 mt-[1px]"
                aria-label="Skip tour"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </div>

            {/* Body */}
            <p className="text-[12.5px] text-[#374151] font-['Inter:Regular',sans-serif] leading-[1.6] mb-[16px]">
              {step.body}
            </p>

            {/* Footer: back + step counter + CTA */}
            <div className="flex items-center justify-between gap-[8px]">
              <div className="flex items-center gap-[10px]">
                <span className="text-[11px] text-black/38 font-['Inter:Medium',sans-serif] font-medium tabular-nums">
                  {stepIdx + 1} / {steps.length}
                </span>
                {stepIdx > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-[3px] text-[11.5px] font-semibold text-black/45 hover:text-[#0a0a0a] font-['Inter:Semi_Bold',sans-serif] transition-colors"
                  >
                    <ChevronLeft size={13} strokeWidth={2.5} />
                    Back
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-[5px] h-[34px] px-[16px] rounded-[9px] text-[12.5px] font-bold text-white font-['Inter:Bold',sans-serif] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(90deg,#4600F2,#B651D7)",
                  boxShadow: "0 6px 18px rgba(182,81,215,0.3)",
                }}
              >
                {step.ctaLabel ?? (isLast ? "Got it" : "Next")}
                {!isLast && !step.ctaLabel && (
                  <ArrowRight size={13} strokeWidth={2.5} />
                )}
              </button>
            </div>

            {/* Step dots */}
            <div className="flex items-center justify-center gap-[5px] mt-[14px]">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === stepIdx ? 18 : 5,
                    height: 5,
                    background: i === stepIdx
                      ? "#4600F2"
                      : i < stepIdx
                        ? "rgba(70,0,242,0.3)"
                        : "rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
