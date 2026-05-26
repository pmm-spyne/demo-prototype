import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, Plus } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onPick?: (campaignId: string) => void;
  onCreateCustom?: () => void;
  /** Vehicle count to show on the Ageing template (defaults to what the user selected) */
  selectedCount?: number;
}

type Template = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  vehicleCount: number;
  /** Tint for the category chip */
  chipBg: string;
  chipFg: string;
};

function buildTemplates(selectedCount: number): Template[] {
  return [
    {
      id: "ageing",
      category: "Ageing",
      title: "Move 45+ day aged inventory",
      subtitle: "Push before the 60-day cliff.",
      vehicleCount: selectedCount || 4,
      chipBg: "#FEE2E2",
      chipFg: "#B91C1C",
    },
    {
      id: "promotional",
      category: "Promotional",
      title: "Dealership billboard",
      subtitle: "Make-of-the-month creatives.",
      vehicleCount: 32,
      chipBg: "#DBEAFE",
      chipFg: "#1D4ED8",
    },
    {
      id: "festive",
      category: "Festive",
      title: "Holiday season",
      subtitle: "Capture the December rush.",
      vehicleCount: 28,
      chipBg: "#FFEDD5",
      chipFg: "#C2410C",
    },
    {
      id: "certified",
      category: "Certified",
      title: "Certified Pre-owned Trust",
      subtitle: "Trust-driven CPO campaigns.",
      vehicleCount: 41,
      chipBg: "#D1FAE5",
      chipFg: "#047857",
    },
  ];
}

function TemplateCard({ template, onPick }: { template: Template; onPick?: (id: string) => void }) {
  return (
    <div className="relative rounded-[14px] border border-black/10 bg-white p-[16px] flex flex-col gap-[10px] hover:border-black/20 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-all">
      <span
        className="self-start inline-flex items-center px-[10px] py-[3px] rounded-full text-[11px] font-bold uppercase tracking-[0.4px] font-['Inter:Bold',sans-serif]"
        style={{ background: template.chipBg, color: template.chipFg }}
      >
        {template.category}
      </span>
      <div>
        <p className="text-[15px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[20px]">
          {template.title}
        </p>
        <p className="mt-[4px] text-[12px] text-black/55 font-['Inter:Regular',sans-serif] leading-[16px]">
          {template.subtitle}
        </p>
      </div>
      <div className="mt-auto pt-[8px] flex items-end justify-between gap-[10px]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.6px] font-semibold text-black/45 font-['Inter:Semi_Bold',sans-serif]">
            Total Vehicles
          </p>
          <p className="text-[18px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-none mt-[2px]">
            {template.vehicleCount}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onPick?.(template.id)}
          className="h-[34px] px-[14px] rounded-[8px] border border-[#4600F2] text-[#4600F2] text-[12px] font-semibold font-['Inter:Semi_Bold',sans-serif] hover:bg-[rgba(70,0,242,0.06)] transition-colors whitespace-nowrap"
        >
          Review & Publish
        </button>
      </div>
    </div>
  );
}

export function SmartCampaignModal({ open, onClose, onPick, onCreateCustom, selectedCount = 4 }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "power2.out" });
    gsap.fromTo(
      panel,
      { y: 20, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
    );
  }, [open]);

  if (!open) return null;

  const templates = buildTemplates(selectedCount);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-6"
    >
      <div
        ref={panelRef}
        className="bg-white rounded-[20px] w-full max-w-[780px] max-h-[92vh] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        {/* Header */}
        <div className="px-[28px] pt-[22px] pb-[16px] flex items-start justify-between gap-[16px]">
          <div>
            <h2 className="text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[26px]">
              Select a campaign to run
            </h2>
            <p className="mt-[2px] text-[13px] text-black/55 font-['Inter:Regular',sans-serif]">
              Pre-built templates or start from scratch.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-[32px] rounded-full hover:bg-black/5 flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            <X size={20} className="text-black/65" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto px-[28px] py-[14px] bg-[#FAFAFB]">
          {/* Template grid */}
          <div className="grid grid-cols-2 gap-[14px]">
            {templates.map((t) => (
              <TemplateCard key={t.id} template={t} onPick={onPick} />
            ))}
          </div>

          {/* Create your own */}
          <div className="mt-[14px] rounded-[14px] border border-dashed border-black/15 bg-white p-[16px] flex items-center justify-between gap-[14px]">
            <div className="flex items-center gap-[14px]">
              <div className="size-[40px] rounded-[10px] bg-[rgba(70,0,242,0.08)] text-[#4600F2] flex items-center justify-center shrink-0">
                <Plus size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">
                  Create your own
                </p>
                <p className="text-[12px] text-black/55 font-['Inter:Regular',sans-serif] mt-[1px]">
                  Custom messaging, branding and channels.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onCreateCustom}
              className="h-[36px] px-[16px] rounded-[8px] border border-[#4600F2] text-[#4600F2] text-[12px] font-semibold font-['Inter:Semi_Bold',sans-serif] hover:bg-[rgba(70,0,242,0.06)] transition-colors whitespace-nowrap"
            >
              Create custom campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
