import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Calculator, ArrowRight, X, Info } from "lucide-react";
import { HoldingCostCalculatorModal } from "./HoldingCostCalculatorModal";

export interface Benchmarks {
  daysToFrontline: number;
  holdingCostPerDay: number;
}

export const DEFAULT_BENCHMARKS: Benchmarks = {
  daysToFrontline: 12,
  holdingCostPerDay: 46,
};

interface Props {
  open: boolean;
  imsName?: string;
  /** Pre-populate fields from the Demo Setup screen */
  initialValues?: Partial<Benchmarks>;
  onClose?: () => void;
  onSubmit: (b: Benchmarks) => void;
}

// ─── Primary number field with prefix/suffix ────────────────────────────────

function MainField({
  label, prefix, suffix, value, onChange,
}: {
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] uppercase tracking-[0.6px] font-bold text-black/55 mb-[6px] font-['Inter:Bold',sans-serif]">
        {label}
      </label>
      <div className="flex items-center bg-white border border-black/15 rounded-[10px] h-[48px] px-[14px] focus-within:border-[#4600F2] focus-within:ring-1 focus-within:ring-[#4600F2]">
        {prefix && <span className="text-[16px] text-black/55 mr-[4px] font-medium">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="flex-1 bg-transparent outline-none text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] min-w-0"
        />
        {suffix && <span className="text-[13px] text-black/55 ml-[4px] font-medium whitespace-nowrap">{suffix}</span>}
      </div>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────

export function BenchmarksModal({ open, imsName, initialValues, onClose, onSubmit }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [days, setDays] = useState(initialValues?.daysToFrontline ?? DEFAULT_BENCHMARKS.daysToFrontline);
  const [cost, setCost] = useState(initialValues?.holdingCostPerDay ?? DEFAULT_BENCHMARKS.holdingCostPerDay);
  const [calcModalOpen, setCalcModalOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    // Reset to setup-screen values (or defaults) each time it opens
    setDays(initialValues?.daysToFrontline ?? DEFAULT_BENCHMARKS.daysToFrontline);
    setCost(initialValues?.holdingCostPerDay ?? DEFAULT_BENCHMARKS.holdingCostPerDay);
    setCalcModalOpen(false);

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

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-6"
    >
      <div
        ref={panelRef}
        className="bg-white rounded-[20px] w-full max-w-[620px] max-h-[92vh] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        {/* Header */}
        <div className="px-[28px] pt-[22px] pb-[14px] flex items-start justify-between gap-[16px]">
          <div>
            <h2 className="text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[26px]">
              Quick setup
            </h2>
            <p className="mt-[2px] text-[13px] text-black/55 font-['Inter:Regular',sans-serif]">
              Two numbers to calibrate your savings
              {imsName ? <> before we sync <span className="font-semibold text-[#0a0a0a]">{imsName}</span></> : ""}.
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="size-[32px] rounded-full hover:bg-black/5 flex items-center justify-center transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={18} className="text-black/60" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto px-[28px] py-[10px] bg-[#FAFAFB]">
          <div className="flex gap-[12px]">
            <MainField
              label="Days to frontline"
              suffix="days"
              value={days}
              onChange={setDays}
            />
            <MainField
              label="Holding cost"
              prefix="$"
              suffix="/ day"
              value={cost}
              onChange={setCost}
            />
          </div>

          <button
            type="button"
            onClick={() => setCalcModalOpen(true)}
            className="mt-[12px] inline-flex items-center gap-[6px] text-[12px] font-semibold text-[#4600F2] hover:text-[#3a00d0] transition-colors font-['Inter:Semi_Bold',sans-serif]"
          >
            <Calculator size={13} />
            Don't know? Let's calculate →
          </button>

          {/* Info strip */}
          <div className="mt-[14px] flex items-start gap-[8px] px-[12px] py-[10px] rounded-[10px] bg-[rgba(70,0,242,0.04)] border border-[rgba(70,0,242,0.12)]">
            <Info size={14} className="text-[#4600F2] mt-[2px] shrink-0" />
            <p className="text-[11px] text-black/65 font-['Inter:Regular',sans-serif] leading-[16px]">
              Industry benchmark: <span className="font-semibold text-[#0a0a0a]">$40–$50/car/day</span> holding cost · <span className="font-semibold text-[#0a0a0a]">&lt;3 days</span> trade-to-live gold standard. Studio AI targets <span className="font-semibold text-[#4600F2]">1 day</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-[28px] py-[14px] border-t border-black/8 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={() => onSubmit(DEFAULT_BENCHMARKS)}
            className="text-[12px] font-semibold text-black/55 hover:text-[#0a0a0a] transition-colors font-['Inter:Semi_Bold',sans-serif]"
          >
            Skip — use defaults
          </button>
          <button
            type="button"
            onClick={() => onSubmit({ daysToFrontline: days, holdingCostPerDay: cost })}
            className="h-[44px] px-[24px] rounded-[10px] text-white text-[14px] font-semibold font-['Inter:Semi_Bold',sans-serif] inline-flex items-center gap-[8px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(90deg, #FF5C7A 0%, #B651D7 50%, #4600F2 100%)",
              boxShadow: "0 6px 16px rgba(70,0,242,0.25)",
            }}
          >
            Continue sync
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Holding cost calculator — opens as a separate modal on top */}
      <HoldingCostCalculatorModal
        open={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
        onApply={(v) => { setCost(v); setCalcModalOpen(false); }}
      />
    </div>
  );
}
