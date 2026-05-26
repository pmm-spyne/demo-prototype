import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ChevronLeft, ChevronDown, ChevronUp, Info } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (perDay: number) => void;
}

// ─── Formula ─────────────────────────────────────────────────────────────────
//
// Daily holding cost per car =
//   (YTD Total Used Expense − YTD Variable Expense)   ← annual fixed expense
//   ÷ 12                                              ← monthly fixed expense
//   ÷ Monthly Sales                                   ← per-car
//   ÷ (Days Open per Month × 4/3)                     ← avg inventory days, scaled
//
// At defaults (2.5M / 0.5M / 100 / 27) this evaluates to ≈ $46.30/car/day.

function calc({
  total, variable, sales, daysOpen,
}: { total: number; variable: number; sales: number; daysOpen: number }): number {
  if (!sales || !daysOpen) return 0;
  const fixedMonthly = (total - variable) / 12;
  const avgInventoryDays = daysOpen * (4 / 3);
  return fixedMonthly / sales / avgInventoryDays;
}

// ─── Field ───────────────────────────────────────────────────────────────────

function NumberField({
  label, hint, prefix, suffix, value, onChange, step = 1,
}: {
  label: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
  value: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-[6px] mb-[6px]">
        <label className="text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">{label}</label>
        {hint && (
          <span className="group relative inline-flex">
            <Info size={12} className="text-black/35" />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-[6px] hidden group-hover:block bg-[#0a0a0a] text-white text-[10px] px-[6px] py-[3px] rounded whitespace-nowrap z-10">
              {hint}
            </span>
          </span>
        )}
      </div>
      <div className="flex items-stretch bg-white border border-black/15 rounded-[8px] h-[44px] focus-within:border-[#4600F2] focus-within:ring-1 focus-within:ring-[#4600F2] overflow-hidden">
        {prefix && (
          <span className="px-[12px] flex items-center bg-[#F4F4F6] text-[14px] font-semibold text-black/70 border-r border-black/10">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="numeric"
          value={Number.isFinite(value) ? value : 0}
          step={step}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="flex-1 px-[12px] bg-transparent outline-none text-[14px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] min-w-0"
        />
        {suffix && (
          <span className="px-[12px] flex items-center bg-[#F4F4F6] text-[12px] font-medium text-black/65 border-l border-black/10">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────

export function HoldingCostCalculatorModal({ open, onClose, onApply }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [total, setTotal] = useState(2_500_000);
  const [variable, setVariable] = useState(500_000);
  const [sales, setSales] = useState(100);
  const [daysOpen, setDaysOpen] = useState(27);
  const [showFormula, setShowFormula] = useState(false);

  const perDay = useMemo(
    () => calc({ total, variable, sales, daysOpen }),
    [total, variable, sales, daysOpen]
  );

  useEffect(() => {
    if (!open) return;
    // Reset to defaults each open
    setTotal(2_500_000);
    setVariable(500_000);
    setSales(100);
    setDaysOpen(27);
    setShowFormula(false);

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

  const formattedPerDay = `$${perDay.toFixed(2)}`;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[20px] w-full max-w-[620px] max-h-[92vh] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        {/* Header */}
        <div className="px-[28px] pt-[22px] pb-[14px] border-b border-black/8">
          <div className="flex items-start gap-[10px]">
            <button
              type="button"
              onClick={onClose}
              className="size-[28px] rounded-full hover:bg-black/5 flex items-center justify-center transition-colors mt-[2px]"
              aria-label="Back"
            >
              <ChevronLeft size={18} className="text-black/65" />
            </button>
            <div>
              <h2 className="text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[26px]">
                Calculate your rate
              </h2>
              <p className="mt-[2px] text-[13px] text-black/55 font-['Inter:Regular',sans-serif]">
                Enter what you know — we'll do the rest
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-[28px] py-[20px]">
          <div className="flex flex-col gap-[16px]">
            <NumberField
              label="YTD Total Used Expense"
              hint="Year-to-date expenses on used vehicle operations"
              prefix="$"
              value={total}
              step={10000}
              onChange={setTotal}
            />
            <NumberField
              label="YTD Variable Expense"
              hint="Variable costs that scale with each sale"
              prefix="$"
              value={variable}
              step={10000}
              onChange={setVariable}
            />
            <NumberField
              label="Monthly Sales"
              hint="Average units sold per month"
              value={sales}
              suffix="units/mo"
              onChange={setSales}
            />
            <NumberField
              label="Days Open per Month"
              hint="Working days the lot is open each month"
              value={daysOpen}
              suffix="days"
              onChange={setDaysOpen}
            />
          </div>

          {/* Result panel */}
          <div className="mt-[18px] rounded-[12px] border border-[rgba(70,0,242,0.20)] bg-[rgba(70,0,242,0.06)] px-[18px] py-[16px] flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[1px] font-bold text-black/55 font-['Inter:Bold',sans-serif]">
              Daily Holding Cost
            </p>
            <p className="text-[22px] font-bold text-[#4600F2] font-['Inter:Bold',sans-serif]">
              {formattedPerDay}
              <span className="text-[13px] font-medium text-[#4600F2]/70 ml-[2px]">/car/day</span>
            </p>
          </div>

          {/* Show formula expander */}
          <button
            type="button"
            onClick={() => setShowFormula((v) => !v)}
            className="mt-[12px] inline-flex items-center gap-[4px] text-[12px] font-semibold text-black/65 hover:text-[#0a0a0a] font-['Inter:Semi_Bold',sans-serif]"
          >
            {showFormula ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            See how it's calculated
          </button>
          {showFormula && (
            <div className="mt-[8px] rounded-[10px] bg-[#FAFAFB] border border-black/8 px-[14px] py-[12px] text-[11px] text-black/65 font-['Inter:Regular',sans-serif] leading-[16px]">
              <p>
                <span className="text-[#0a0a0a] font-semibold">Daily cost</span> =
                (Total Used Expense − Variable Expense) ÷ 12 ÷ Monthly Sales ÷ (Days Open × 4/3)
              </p>
              <p className="mt-[6px] text-black/45">
                Days Open × 4/3 approximates average inventory days per month — accounting for cars
                sitting past business days.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-[28px] py-[14px] border-t border-black/8 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-[4px] text-[13px] font-semibold text-black/65 hover:text-[#0a0a0a] font-['Inter:Semi_Bold',sans-serif]"
          >
            <ChevronLeft size={14} strokeWidth={2.5} />
            Back
          </button>
          <button
            type="button"
            onClick={() => onApply(Math.round(perDay))}
            className="h-[42px] px-[20px] rounded-[10px] bg-[#4600F2] hover:bg-[#3a00d0] text-white text-[13px] font-semibold font-['Inter:Semi_Bold',sans-serif] transition-colors"
          >
            Apply {formattedPerDay} /car/day
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
