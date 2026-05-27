import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FloatingDelta {
  id: number;
  text: string;
  color: string;
}

interface Props {
  /** The current numeric value of the KPI; deltas auto-fire when this changes. */
  value: number;
  /**
   * "down-good" → a decrease is positive (use for Days-to-Frontline) so the
   * delta paints green and renders as e.g. "-3 days".
   * "up-good" → an increase is positive (use for Inventory Score) so the
   * delta paints green and renders as "+1.1".
   */
  direction: "up-good" | "down-good";
  /** Decimal places to show on the delta (default 0; pass 1 for the score) */
  decimals?: number;
  /** Optional suffix appended after the number, e.g. " d" or " pts" */
  suffix?: string;
}

let _nextId = 0;

/**
 * Floats a "+N" or "-N" indicator above the KPI when its value changes — the
 * indicator drifts upward and fades out (~1.4s). Stacks if several fire close
 * together. Position absolute, so the host must be position:relative.
 */
export function KpiDelta({ value, direction, decimals = 0, suffix = "" }: Props) {
  const prevRef = useRef<number | null>(null);
  const [deltas, setDeltas] = useState<FloatingDelta[]>([]);

  useEffect(() => {
    if (prevRef.current === null) {
      prevRef.current = value;
      return;
    }
    const diff = value - prevRef.current;
    prevRef.current = value;
    if (Math.abs(diff) < 0.05) return;

    const sign = diff > 0 ? "+" : "−";
    const magnitude = Math.abs(diff).toFixed(decimals);
    const isGood = direction === "up-good" ? diff > 0 : diff < 0;
    const color = isGood ? "#059669" : "#DC2626";

    const id = ++_nextId;
    setDeltas((d) => [...d, { id, text: `${sign}${magnitude}${suffix}`, color }]);

    // Auto-remove after the animation completes so the DOM stays tidy
    const t = window.setTimeout(() => {
      setDeltas((d) => d.filter((x) => x.id !== id));
    }, 1500);

    return () => window.clearTimeout(t);
  }, [value, direction, decimals, suffix]);

  if (deltas.length === 0) return null;
  return (
    <>
      {deltas.map((d) => (
        <FloatingNumber key={d.id} text={d.text} color={d.color} />
      ))}
    </>
  );
}

function FloatingNumber({ text, color }: { text: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: 0, opacity: 0, scale: 0.7 },
      {
        keyframes: [
          { y: -8,  opacity: 1, scale: 1.15, duration: 0.22, ease: "back.out(2)" },
          { y: -42, opacity: 1, scale: 1.0,  duration: 0.5,  ease: "power2.out" },
          { y: -64, opacity: 0, scale: 0.9,  duration: 0.45, ease: "power1.in" },
        ],
      }
    );
  }, []);

  return (
    <span
      ref={ref}
      className="absolute right-[14px] top-[14px] z-10 px-[10px] py-[3px] rounded-full text-[15px] font-bold font-['Inter:Bold',sans-serif] pointer-events-none"
      style={{
        color: "#ffffff",
        background: color,
        boxShadow: `0 6px 16px ${color}55`,
      }}
    >
      {text}
    </span>
  );
}
