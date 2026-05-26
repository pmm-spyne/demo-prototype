import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageOff, Car, ArrowRight, Minus, Sparkles, AlertCircle } from "lucide-react";

interface Props {
  open: boolean;
  onMinimize: () => void;
  /** Triggers a campaign on the 60+ day aged inventory */
  onRunCampaign?: () => void;
  /** Open table filtered to a given issue type */
  onIssueClick?: (issue: "no-photos" | "no-hero") => void;
  /** Total aged vehicles needing attention */
  count?: number;
  noPhotos?: number;
  noHeroAngle?: number;
}

function IssueRow({
  icon, label, count, onClick,
}: { icon: React.ReactNode; label: string; count: number; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-[10px] px-[10px] py-[10px] rounded-[10px] bg-[#F4F4F6] hover:bg-[#EDEDF1] transition-colors text-left"
    >
      <span className="size-[28px] rounded-[8px] bg-white flex items-center justify-center shrink-0 text-[#0a0a0a]">
        {icon}
      </span>
      <span className="flex-1 text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] truncate">
        {label}
      </span>
      <span className="text-[12px] font-bold text-[#4600F2] font-['Inter:Bold',sans-serif] whitespace-nowrap">
        {count} vehicles
      </span>
      <ArrowRight size={14} className="text-[#4600F2] shrink-0" strokeWidth={2.5} />
    </button>
  );
}

export function NeedActionsWidget({
  open, onMinimize, onRunCampaign, onIssueClick,
  count = 12, noPhotos = 4, noHeroAngle = 8,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(
        el,
        { y: 24, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
      );
    } else {
      gsap.to(el, { y: 24, opacity: 0, scale: 0.96, duration: 0.2, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div
      ref={ref}
      style={{ pointerEvents: open ? "auto" : "none", opacity: open ? undefined : 0 }}
      className="fixed bottom-[24px] right-[24px] z-30 w-[340px]"
    >
      <div className="bg-white rounded-[16px] shadow-[0_24px_60px_rgba(0,0,0,0.22)] border border-black/5 overflow-hidden">
        {/* Header — light red gradient */}
        <div
          className="relative px-[18px] pt-[16px] pb-[14px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(239,68,68,0.10) 0%, rgba(239,68,68,0.02) 100%)",
          }}
        >
          <button
            type="button"
            onClick={onMinimize}
            className="absolute top-[12px] right-[12px] size-[26px] rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
            aria-label="Minimize"
          >
            <Minus size={15} className="text-black/55" strokeWidth={2.5} />
          </button>
          <p className="text-[18px] font-bold leading-[24px] font-['Inter:Bold',sans-serif]">
            <span className="text-[#DC2626]">{count} vehicles</span>
            <span className="text-[#0a0a0a]"> not ready to sell!</span>
          </p>
          <p className="mt-[2px] text-[12px] text-black/55 font-['Inter:Regular',sans-serif]">
            Add respective media to these aged vehicles.
          </p>
        </div>

        {/* Issue list */}
        <div className="px-[14px] py-[12px] flex flex-col gap-[8px]">
          <IssueRow
            icon={<ImageOff size={14} strokeWidth={2.2} />}
            label="No photos"
            count={noPhotos}
            onClick={() => onIssueClick?.("no-photos")}
          />
          <IssueRow
            icon={<Car size={14} strokeWidth={2.2} />}
            label="No hero angle"
            count={noHeroAngle}
            onClick={() => onIssueClick?.("no-hero")}
          />
        </div>

        {/* CTA */}
        <div className="px-[14px] pb-[14px]">
          <button
            type="button"
            onClick={onRunCampaign}
            className="w-full h-[42px] rounded-[10px] text-white text-[13px] font-semibold font-['Inter:Semi_Bold',sans-serif] inline-flex items-center justify-center gap-[8px] transition-transform hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "linear-gradient(90deg, #FF5C9A 0%, #B651D7 50%, #4600F2 100%)",
              boxShadow: "0 6px 16px rgba(70,0,242,0.25)",
            }}
          >
            <Sparkles size={14} strokeWidth={2.5} />
            Run a campaign on 60+ day aged
            <ArrowRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Compact floating button that opens the widget */
export function NeedActionsButton({
  count, onClick,
}: { count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[42px] pl-[16px] pr-[10px] rounded-full text-white text-[13px] font-semibold font-['Inter:Semi_Bold',sans-serif] inline-flex items-center gap-[10px] shadow-[0_8px_20px_rgba(220,38,38,0.45)] hover:shadow-[0_12px_28px_rgba(220,38,38,0.55)] transition-shadow"
      style={{ background: "linear-gradient(90deg, #DC2626 0%, #EF4444 100%)" }}
    >
      <AlertCircle size={15} strokeWidth={2.5} />
      Need actions
      <span className="flex items-center -space-x-[6px]">
        <span className="size-[22px] rounded-full bg-white text-[#DC2626] flex items-center justify-center ring-2 ring-[#DC2626]/30 text-[10px] font-bold">
          {count}
        </span>
      </span>
    </button>
  );
}
