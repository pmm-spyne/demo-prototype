import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Check, Download, Sparkles, X } from "lucide-react";
import { SmartCampaignDeck } from "./SmartCampaignDeck";

interface Props {
  open: boolean;
  count: number;
  onSmartCampaign?: () => void;
  onExport?: () => void;
  onDownload?: () => void;
  onClose: () => void;
}

export function SelectionActionBar({
  open, count, onSmartCampaign, onExport, onDownload, onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [deckOpen, setDeckOpen] = useState(true);
  const [deckSeen, setDeckSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }
      );
      // Only auto-open the pitch deck the first time the bar appears in this session
      if (!deckSeen) setDeckOpen(true);
    } else {
      gsap.to(el, { y: 80, opacity: 0, scale: 0.96, duration: 0.25, ease: "power2.in" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div
      ref={ref}
      style={{ pointerEvents: open ? "auto" : "none", opacity: open ? undefined : 0 }}
      className="fixed bottom-[28px] left-1/2 -translate-x-1/2 z-40"
    >
      {/* SmartCampaigns pitch deck — opens once per session */}
      <SmartCampaignDeck
        open={open && deckOpen}
        onClose={() => { setDeckOpen(false); setDeckSeen(true); }}
        onCreate={() => { setDeckOpen(false); setDeckSeen(true); onSmartCampaign?.(); }}
      />

      <div className="relative bg-[#0a0a0a] text-white rounded-[16px] shadow-[0_18px_40px_rgba(0,0,0,0.35)] flex items-center gap-[10px] pl-[10px] pr-[10px] py-[10px]">
        {/* Count chip */}
        <div className="flex items-center gap-[12px] pr-[16px] border-r border-white/15">
          <div className="size-[40px] rounded-[12px] bg-white/10 flex items-center justify-center">
            <Check size={20} strokeWidth={2.5} />
          </div>
          <span className="text-[16px] font-semibold font-['Inter:Semi_Bold',sans-serif] whitespace-nowrap">
            {count.toLocaleString()} {count === 1 ? "vehicle" : "vehicles"} selected
          </span>
        </div>

        {/* Create SmartCampaign — gradient */}
        <button
          type="button"
          onClick={() => {
            setDeckOpen(false);
            setDeckSeen(true);
            onSmartCampaign?.();
          }}
          className="h-[48px] px-[28px] rounded-[12px] text-white text-[15px] font-bold font-['Inter:Bold',sans-serif] inline-flex items-center gap-[8px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(90deg, #5BBFF6 0%, #7F6AF2 35%, #B651D7 65%, #FF7B5C 100%)",
            boxShadow: "0 6px 18px rgba(127,106,242,0.45)",
          }}
        >
          <Sparkles size={16} strokeWidth={2.5} />
          Create SmartCampaign
        </button>

        {/* Export */}
        <button
          type="button"
          onClick={onExport}
          className="h-[48px] px-[22px] rounded-[12px] bg-white/[0.08] hover:bg-white/[0.14] text-white text-[14px] font-semibold font-['Inter:Semi_Bold',sans-serif] transition-colors"
        >
          Export
        </button>

        {/* Download icon */}
        <button
          type="button"
          onClick={onDownload}
          className="size-[48px] rounded-[12px] bg-white/[0.08] hover:bg-white/[0.14] flex items-center justify-center transition-colors"
          aria-label="Download"
        >
          <Download size={18} />
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="size-[48px] rounded-[12px] hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Dismiss selection"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
