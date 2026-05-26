import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import {
  X, Check, Layers, ArrowRight, Zap, Clock,
  Image as ImageIcon, RotateCw, Aperture,
} from "lucide-react";

import studioExt1 from "../assets/vehicle/studio-exterior-1.jpg";
import studioExt2 from "../assets/vehicle/studio-exterior-2.jpg";
import studioExt3 from "../assets/vehicle/studio-exterior-3.jpg";
import studioInt1 from "../assets/vehicle/studio-interior-1.jpg";
import studioInt2 from "../assets/vehicle/studio-interior-2.jpg";
import spin360Mov from "../assets/vehicle/spin-360.mov";

interface Props {
  open: boolean;
  onClose: () => void;
  onNext?: () => void;
  onBack?: () => void;
  completed?: boolean;
  totalNoPhotos?: number;
  daysBaseline?: number;
  holdingPerDay?: number;
}

const EXTERIOR_TARGET = 9;
const INTERIOR_TARGET = 18;
const VIDEO_TARGET = 1;
const PER_CHILD_TOTAL = EXTERIOR_TARGET + INTERIOR_TARGET + VIDEO_TARGET; // 28

type Child = {
  stk: string;
  vin: string;
  mmytcc: string;
  exterior: number;
  interior: number;
  has360: boolean;
};

const INITIAL_CHILDREN: Child[] = [
  { stk: "STK-2210", vin: "TMBJF7NJ6LG502501", mmytcc: "Skoda Kamiq SE · 2020 · Silver", exterior: 0, interior: 0, has360: false },
  { stk: "STK-2212", vin: "TMBJF7NJ6LG502604", mmytcc: "Skoda Kamiq SE · 2020 · Silver", exterior: 0, interior: 0, has360: false },
  { stk: "STK-2214", vin: "TMBJF7NJ6LG502712", mmytcc: "Skoda Kamiq SE · 2020 · Silver", exterior: 0, interior: 0, has360: false },
];

// Scrolling inventory list shown during the parent-discovery phase.
// One entry is the spec match (Skoda Kamiq SE Silver) — the rest are distractors.
type ScanEntry = { stk: string; vin: string; mmy: string; match: boolean };
const SCAN_LIST: ScanEntry[] = [
  { stk: "STK-1842", vin: "1FTFW1ET5DFA92341", mmy: "2022 Ford F-150 XLT · Blue",      match: false },
  { stk: "STK-1893", vin: "JN8AT3BB2KW001211", mmy: "2019 Nissan Rogue SV · White",     match: false },
  { stk: "STK-1907", vin: "1G1ZE5ST9HF184559", mmy: "2017 Chevrolet Malibu LT · Black", match: false },
  { stk: "STK-1924", vin: "WBA8E9G54JNU48721", mmy: "2018 BMW 330i · Gray",             match: false },
  { stk: "STK-1956", vin: "5YJ3E1EA6KF391201", mmy: "2019 Tesla Model 3 LR · White",    match: false },
  { stk: "STK-1989", vin: "WAUFFAFL8DA055330", mmy: "2013 Audi A4 Premium · Silver",    match: false },
  { stk: "STK-2014", vin: "JTDKARFU4F3050981", mmy: "2015 Toyota Prius Two · Red",      match: false },
  { stk: "STK-2056", vin: "1HGCV1F35MA022119", mmy: "2021 Honda Accord Sport · White",  match: false },
  { stk: "STK-2107", vin: "TMBJF7NJ6LG502118", mmy: "2020 Skoda Kamiq SE · Silver",     match: true  },
  { stk: "STK-2153", vin: "WP0AA2A86JS115002", mmy: "2018 Porsche 911 Carrera · Black", match: false },
  { stk: "STK-2188", vin: "1C4RJFBG2NC119988", mmy: "2022 Jeep Grand Cherokee · Green", match: false },
  { stk: "STK-2204", vin: "WDDZF4JB7KA512388", mmy: "2019 Mercedes-Benz E-Class · Blue",match: false },
  { stk: "STK-2239", vin: "5J6RW2H50KL000281", mmy: "2019 Honda CR-V EX-L · Silver",    match: false },
  { stk: "STK-2271", vin: "KMHD84LF6KU821055", mmy: "2019 Hyundai Elantra GT · Red",    match: false },
];
const MATCH_LIST_INDEX = SCAN_LIST.findIndex(t => t.match);

// ─── Child card ──────────────────────────────────────────────────────────────

function ChildCard({
  child, refSetter, previewImg,
}: { child: Child; refSetter: (el: HTMLDivElement | null) => void; previewImg: string }) {
  const total = child.exterior + child.interior + (child.has360 ? 1 : 0);
  const done = total === PER_CHILD_TOTAL;
  return (
    <div
      ref={refSetter}
      className="relative rounded-[12px] overflow-hidden border border-black/10 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex"
    >
      {/* Thumbnail */}
      <div className="relative w-[112px] aspect-[4/3] shrink-0 bg-[#1f1f24]">
        {child.exterior > 0 ? (
          <img src={previewImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[4px]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#4a4a55" strokeWidth="1.5" />
              <line x1="3" y1="3" x2="21" y2="21" stroke="#6b6b75" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-[8px] uppercase tracking-[0.8px] text-[#6b6b75] font-bold">No photos</p>
          </div>
        )}
        <div className="absolute top-[6px] left-[6px]">
          {done ? (
            <span className="inline-flex items-center gap-[3px] px-[6px] py-[1px] rounded-full bg-[#00C488] text-white text-[8px] font-bold uppercase tracking-[0.5px]">
              <Check size={8} strokeWidth={3} /> Matched
            </span>
          ) : (
            <span className="inline-flex items-center gap-[3px] px-[6px] py-[1px] rounded-full bg-[#4600F2] text-white text-[8px] font-bold uppercase tracking-[0.5px]">
              <Layers size={8} /> Matching
            </span>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex-1 min-w-0 px-[12px] py-[10px] flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] truncate leading-tight">
            {child.stk}
          </p>
          <p className="text-[9px] text-black/55 font-['Inter:Medium',sans-serif] font-medium truncate mt-[1px]">
            VIN {child.vin}
          </p>
          <p className="text-[9px] text-black/50 font-['Inter:Regular',sans-serif] truncate mt-[1px]">
            {child.mmytcc}
          </p>
        </div>

        {/* Count badges */}
        <div className="mt-[6px] flex items-center gap-[4px]">
          <CountChip
            icon={<ImageIcon size={9} strokeWidth={2.5} />}
            value={child.exterior}
            target={EXTERIOR_TARGET}
            color="#4600F2"
          />
          <CountChip
            icon={<Aperture size={9} strokeWidth={2.5} />}
            value={child.interior}
            target={INTERIOR_TARGET}
            color="#F59E0B"
          />
          <CountChip
            icon={<RotateCw size={9} strokeWidth={2.5} />}
            value={child.has360 ? 1 : 0}
            target={VIDEO_TARGET}
            color="#00C488"
          />
        </div>
      </div>
    </div>
  );
}

function CountChip({
  icon, value, target, color,
}: { icon: React.ReactNode; value: number; target: number; color: string }) {
  return (
    <div
      className="inline-flex items-center gap-[3px] px-[6px] py-[2px] rounded-[5px] bg-[#FAFAFB] border border-black/8"
      style={{ color }}
    >
      {icon}
      <span className="text-[10px] font-bold font-['Inter:Bold',sans-serif] leading-none">
        {value}<span className="text-black/35 font-medium">/{target}</span>
      </span>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export function SmartMatchModal({
  open, onClose, onNext, onBack, completed, totalNoPhotos = 90,
  daysBaseline = 8.2, holdingPerDay = 38,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const childRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([null, null, null]);
  const flowRefs = useRef<(SVGPathElement | null)[]>([null, null, null]);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [children, setChildren] = useState<Child[]>(() => INITIAL_CHILDREN.map(c => ({ ...c })));
  // Holds the resolved SVG d="..." strings for each parent→child path
  const [paths, setPaths] = useState<string[]>(["", "", ""]);
  // Pre-flow phase: scan inventory for a spec match, THEN reveal parent + send media
  type Phase = "scanning" | "matched";
  const [phase, setPhase] = useState<Phase>("scanning");
  // Refs for the scrolling-list scan animation
  const scanListRef = useRef<HTMLDivElement>(null);
  const scanViewportRef = useRef<HTMLDivElement>(null);
  // Index of the row currently centered in the scan viewport (live, drives highlight)
  const [scanCenter, setScanCenter] = useState(0);
  // When true, the matched row is locked in and pulses
  const [scanLocked, setScanLocked] = useState(false);

  // Smart Match collapses days-to-frontline down to ~1 day (publish-on-Day-0 pitch)
  const daysAfter = 1;
  const daysSaved = Math.round((daysBaseline - daysAfter) * 10) / 10;
  const reductionPct = Math.round((daysSaved / daysBaseline) * 100);
  const eligible = Math.round(totalNoPhotos * 0.78);

  // Modal entrance
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(
      panel,
      { y: 24, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );
  }, [open]);

  // Reset state when opened — start in scanning phase
  useEffect(() => {
    if (!open) return;
    setChildren(INITIAL_CHILDREN.map(c => ({ ...c })));
    setPhase("scanning");
    setScanCenter(0);
    setScanLocked(false);
    setPaths(["", "", ""]);
  }, [open]);

  // GSAP-driven scrolling-list scan: fast scroll, decelerate, land on the match
  useEffect(() => {
    if (!open || phase !== "scanning") return;
    const list = scanListRef.current;
    const viewport = scanViewportRef.current;
    if (!list || !viewport) return;

    const ROW_H = 40; // must match the CSS row height below
    const viewH = viewport.clientHeight;
    // Make sure the matched row lands centered in the viewport
    const matchOffset = MATCH_LIST_INDEX * ROW_H - (viewH / 2 - ROW_H / 2);

    // Start position: well above the match so we scroll DOWN past several distractors
    gsap.set(list, { y: -matchOffset + ROW_H * 6 });
    setScanLocked(false);

    const obj = { y: -matchOffset + ROW_H * 6 };
    const tween = gsap.to(obj, {
      y: -matchOffset,
      duration: 2.6,
      ease: "power3.out",
      onUpdate: () => {
        gsap.set(list, { y: obj.y });
        // Centre row = current y inverted, plus half the viewport
        const center = (-obj.y + viewH / 2 - ROW_H / 2) / ROW_H;
        setScanCenter(Math.round(center));
      },
      onComplete: () => {
        setScanLocked(true);
        // Brief lock-in pulse, then reveal the matched parent card
        gsap.delayedCall(0.85, () => setPhase("matched"));
      },
    });
    return () => { tween.kill(); };
  }, [open, phase]);

  // Compute SVG paths from parent → each child centre, relative to stage.
  // Only computes once the parent has been revealed (phase === "matched").
  useEffect(() => {
    if (!open || phase !== "matched") return;
    const recompute = () => {
      const stage = stageRef.current;
      const parent = parentRef.current;
      if (!stage || !parent) return;
      const stageRect = stage.getBoundingClientRect();
      const pr = parent.getBoundingClientRect();
      // Parent anchor: right-middle
      const px = pr.right - stageRect.left;
      const py = pr.top - stageRect.top + pr.height / 2;
      const newPaths = childRefs.current.map((el) => {
        if (!el) return "";
        const cr = el.getBoundingClientRect();
        // Child anchor: left-middle
        const cx = cr.left - stageRect.left;
        const cy = cr.top - stageRect.top + cr.height / 2;
        // Cubic curve: control points sit horizontally
        const dx = (cx - px) * 0.5;
        return `M ${px} ${py} C ${px + dx} ${py}, ${cx - dx} ${cy}, ${cx} ${cy}`;
      });
      setPaths(newPaths);
    };
    // Run rAF twice + a small fallback to make sure refs have laid out after
    // the JSX swap from scanning-card → matched parent-card.
    const id1 = requestAnimationFrame(recompute);
    const id2 = requestAnimationFrame(() => requestAnimationFrame(recompute));
    const t = window.setTimeout(recompute, 120);
    window.addEventListener("resize", recompute);
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
      window.clearTimeout(t);
      window.removeEventListener("resize", recompute);
    };
  }, [open, phase]);

  // Once paths exist (post-match), draw them with GSAP, then loop a flowing dash
  useEffect(() => {
    if (!open || phase !== "matched" || paths.every(p => p === "")) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Draw each base line with a stroke-dashoffset reveal
      lineRefs.current.forEach((path, i) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
        tl.to(path, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" }, i * 0.18);
      });

      // After lines drawn, animate a flowing dash (gradient overlay path) infinitely
      flowRefs.current.forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: `${len * 0.18} ${len * 0.82}`, strokeDashoffset: len, opacity: 1 });
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "none",
            repeat: -1,
          },
          "<+=0.2"
        );
      });
    });
    return () => ctx.revert();
  }, [open, phase, paths]);

  // Animate orbs travelling along the paths (one per lane), repeatedly,
  // and credit each child as the orb lands
  useEffect(() => {
    if (!open || phase !== "matched" || paths.every(p => p === "")) return;

    // Build the per-child delivery schedule: 9 ext → 18 int → 1 video = 28 each
    const schedule: { lane: number; kind: "exterior" | "interior" | "video" }[] = [];
    const cats = [
      { kind: "exterior" as const, count: EXTERIOR_TARGET },
      { kind: "interior" as const, count: INTERIOR_TARGET },
      { kind: "video" as const,    count: VIDEO_TARGET },
    ];
    cats.forEach(({ kind, count }) => {
      for (let i = 0; i < count; i++) {
        for (let lane = 0; lane < 3; lane++) {
          schedule.push({ lane, kind });
        }
      }
    });

    const ctx = gsap.context(() => {
      const start = 1.8; // start after lines have drawn
      const stepDelay = 0.15; // seconds between successive orb launches
      schedule.forEach((step, i) => {
        const orb = orbRefs.current[step.lane];
        const lineEl = lineRefs.current[step.lane];
        if (!orb || !lineEl) return;
        const len = lineEl.getTotalLength();
        const obj = { p: 0 };
        const at = start + i * stepDelay;

        gsap.fromTo(
          orb,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.15, ease: "power2.out", delay: at }
        );
        gsap.to(obj, {
          p: 1,
          duration: 0.65,
          ease: "power1.inOut",
          delay: at,
          onUpdate: () => {
            const point = lineEl.getPointAtLength(obj.p * len);
            gsap.set(orb, { x: point.x - 16, y: point.y - 12 });
          },
          onComplete: () => {
            gsap.to(orb, { opacity: 0, scale: 0.5, duration: 0.15 });
            // Credit the child
            setChildren(prev => prev.map((c, idx) => {
              if (idx !== step.lane) return c;
              if (step.kind === "exterior") return { ...c, exterior: Math.min(EXTERIOR_TARGET, c.exterior + 1) };
              if (step.kind === "interior") return { ...c, interior: Math.min(INTERIOR_TARGET, c.interior + 1) };
              return { ...c, has360: true };
            }));
          },
        });
      });
    });
    return () => ctx.revert();
  }, [open, phase, paths]);

  // Progress bar
  const matchedSum = children.reduce((s, c) => s + c.exterior + c.interior + (c.has360 ? 1 : 0), 0);
  const matchedMax = children.length * PER_CHILD_TOTAL;
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const pct = (matchedSum / matchedMax) * 100;
    gsap.to(bar, { width: `${pct}%`, duration: 0.4, ease: "power2.out" });
  }, [matchedSum, matchedMax]);

  if (!open) return null;

  const allDone = children.every(c => c.exterior === EXTERIOR_TARGET && c.interior === INTERIOR_TARGET && c.has360);
  const matchedChildren = children.filter(c => c.exterior === EXTERIOR_TARGET && c.interior === INTERIOR_TARGET && c.has360).length;
  const previews = [studioExt2, studioExt3, studioInt2];

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-[2px] flex items-center justify-center p-4"
    >
      <div
        ref={panelRef}
        className="bg-white rounded-[20px] w-full max-w-[1080px] max-h-[92vh] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        {/* Header */}
        <div className="px-[28px] pt-[22px] pb-[16px] border-b border-black/8">
          <div className="flex items-start justify-between gap-[16px]">
            <div className="flex items-start gap-[14px]">
              <div
                className="shrink-0 size-[44px] rounded-[12px] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(0,196,136,0.14) 0%, rgba(70,0,242,0.10) 100%)",
                  color: "#00C488",
                }}
              >
                <Layers size={22} />
              </div>
              <div>
                <div className="flex items-center gap-[8px] flex-wrap">
                  <h2 className="text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[26px]">
                    Smart Match — filling no-photo inventory
                  </h2>
                  <span className="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-full bg-[rgba(0,196,136,0.12)] text-[#00C488] text-[10px] font-semibold uppercase tracking-[0.6px]">
                    <Zap size={10} />
                    New vehicles only
                  </span>
                  {completed && (
                    <span className="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-full bg-[rgba(16,185,129,0.12)] text-[#059669] text-[10px] font-bold uppercase tracking-[0.6px]">
                      <Check size={10} strokeWidth={3} />
                      Completed
                    </span>
                  )}
                </div>
                <p className="mt-[4px] text-[13px] text-black/55 font-['Inter:Regular',sans-serif]">
                  We find a parent vehicle in your inventory and replicate its media.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="size-[32px] rounded-full hover:bg-black/5 flex items-center justify-center transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={18} className="text-black/60" />
            </button>
          </div>

          {/* Stats row — same shape as the CGI / Raw modals */}
          <div className="mt-[16px] grid grid-cols-3 gap-[12px]">
            <div className="rounded-[10px] border border-black/8 bg-white px-[14px] py-[10px]">
              <p className="text-[10px] uppercase tracking-[0.8px] text-black/45 font-semibold font-['Inter:Semi_Bold',sans-serif]">
                Vehicles matched
              </p>
              <p className="mt-[4px] text-[20px] font-bold text-[#00C488] font-['Inter:Bold',sans-serif] leading-none">
                {matchedChildren}<span className="text-black/30 text-[13px] font-medium"> / {eligible}</span>
              </p>
            </div>
            <div className="rounded-[10px] border border-black/8 bg-white px-[14px] py-[10px]">
              <div className="flex items-center gap-[6px]">
                <Clock size={11} className="text-[#4600F2]" />
                <p className="text-[10px] uppercase tracking-[0.8px] text-black/45 font-semibold font-['Inter:Semi_Bold',sans-serif]">
                  Days to Frontline
                </p>
              </div>
              <p className="mt-[4px] text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-none">
                <span className="text-black/40 text-[14px] font-medium line-through mr-[6px]">{daysBaseline.toFixed(1)}</span>
                {daysAfter.toFixed(1)}<span className="text-[12px] font-semibold text-[#10B981] ml-[4px]">−{reductionPct}%</span>
              </p>
            </div>
            <div className="rounded-[10px] border border-black/8 bg-white px-[14px] py-[10px]">
              <p className="text-[10px] uppercase tracking-[0.8px] text-black/45 font-semibold font-['Inter:Semi_Bold',sans-serif]">
                Holding cost saved
              </p>
              <p className="mt-[4px] text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-none">
                $<span>{(matchedSum * daysSaved * holdingPerDay / PER_CHILD_TOTAL).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-[14px] flex items-center gap-[12px]">
            <div className="flex-1 h-[6px] rounded-full bg-[#F1F1F4] overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full rounded-full"
                style={{
                  width: "0%",
                  background: "linear-gradient(90deg, #00C488 0%, #4600F2 100%)",
                }}
              />
            </div>
            <p className="text-[11px] text-black/50 font-medium font-['Inter:Medium',sans-serif]">
              Matching in progress
            </p>
          </div>
        </div>

        {/* Stage — parent + lines + 3 children, all on one screen */}
        <div
          ref={stageRef}
          className="relative flex-1 px-[24px] py-[16px] bg-[#FAFAFB] overflow-hidden"
        >
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-[40px] h-full items-center">
            {/* Parent vehicle — scanning state OR revealed once a match lands */}
            <div ref={parentRef} className="relative">
              <p className="text-[9px] uppercase tracking-[0.8px] font-bold text-black/55 mb-[6px] font-['Inter:Bold',sans-serif]">
                {phase === "scanning" ? "Scanning inventory for spec match…" : "Parent vehicle · match found"}
              </p>

              {phase === "scanning" ? (
                <div className="relative rounded-[14px] overflow-hidden border border-black/10 bg-white aspect-[16/11] flex flex-col">
                  {/* Status header */}
                  <div className="flex items-center justify-between px-[10px] py-[7px] border-b border-black/8 bg-[#FAFAFB]">
                    <div className="inline-flex items-center gap-[6px]">
                      <span className="size-[6px] rounded-full bg-[#4600F2] animate-pulse" />
                      <p className="text-[10px] font-bold text-[#4600F2] uppercase tracking-[0.6px] font-['Inter:Bold',sans-serif]">
                        {scanLocked ? "Match found" : "Scanning inventory"}
                      </p>
                    </div>
                    <p className="text-[10px] text-black/45 font-['Inter:Medium',sans-serif] font-medium tabular-nums">
                      {SCAN_LIST.length} VINs
                    </p>
                  </div>

                  {/* Scrolling list viewport */}
                  <div ref={scanViewportRef} className="relative flex-1 overflow-hidden">
                    {/* Top + bottom fade masks */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[28px] bg-gradient-to-b from-white to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28px] bg-gradient-to-t from-white to-transparent z-10" />

                    {/* Centre-row highlight band (where the match will land) */}
                    <div
                      className={`pointer-events-none absolute left-[6px] right-[6px] top-1/2 -translate-y-1/2 h-[36px] rounded-[8px] border transition-all duration-200 z-[5] ${
                        scanLocked
                          ? "border-[#00C488] bg-[rgba(0,196,136,0.08)] shadow-[0_0_0_4px_rgba(0,196,136,0.15)]"
                          : "border-[#4600F2]/40 bg-[rgba(70,0,242,0.04)]"
                      }`}
                    />

                    {/* Scrolling list — GSAP translates this on the y-axis */}
                    <div ref={scanListRef} className="absolute left-0 right-0 top-0 will-change-transform">
                      {SCAN_LIST.map((row, i) => {
                        const isCentre = i === scanCenter;
                        const isMatch = row.match && scanLocked && isCentre;
                        return (
                          <div
                            key={row.stk}
                            className="h-[40px] flex items-center px-[12px] gap-[10px]"
                          >
                            <span className={`text-[10px] font-bold tabular-nums uppercase tracking-[0.4px] ${
                              isMatch ? "text-[#00C488]" : isCentre ? "text-[#4600F2]" : "text-black/35"
                            }`}>
                              {row.stk}
                            </span>
                            <span className={`text-[10px] font-mono tabular-nums truncate ${
                              isMatch ? "text-[#0a0a0a] font-semibold" : isCentre ? "text-[#0a0a0a]" : "text-black/40"
                            }`}>
                              {row.vin}
                            </span>
                            <span className={`flex-1 text-[11px] truncate ${
                              isMatch
                                ? "text-[#0a0a0a] font-bold font-['Inter:Bold',sans-serif]"
                                : isCentre
                                  ? "text-[#0a0a0a] font-semibold font-['Inter:Semi_Bold',sans-serif]"
                                  : "text-black/45 font-medium font-['Inter:Medium',sans-serif]"
                            }`}>
                              {row.mmy}
                            </span>
                            {isMatch ? (
                              <span className="inline-flex items-center justify-center size-[18px] rounded-full bg-[#00C488] shrink-0">
                                <Check size={10} className="text-white" strokeWidth={3.5} />
                              </span>
                            ) : (
                              <span className="size-[18px] shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status footer */}
                  <div className="px-[10px] py-[7px] border-t border-black/8 bg-[#FAFAFB]">
                    <p className="text-[10px] text-black/65 font-['Inter:Medium',sans-serif] font-medium truncate">
                      {scanLocked
                        ? <><span className="text-[#00C488] font-bold">Spec match:</span> {SCAN_LIST[MATCH_LIST_INDEX].mmy}</>
                        : <>Checking <span className="text-[#0a0a0a] font-semibold">{SCAN_LIST[Math.max(0, Math.min(scanCenter, SCAN_LIST.length - 1))]?.mmy ?? ""}</span></>}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-[14px] overflow-hidden border-[2px] border-[#00C488] shadow-[0_8px_24px_rgba(0,196,136,0.18)] aspect-[16/11]">
                  <img src={studioExt1} alt="Parent" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute top-[8px] left-[8px]">
                    <span className="inline-flex items-center gap-[4px] px-[7px] py-[2px] rounded-full bg-[#00C488] text-white text-[9px] font-bold uppercase tracking-[0.5px]">
                      <Check size={9} strokeWidth={3} />
                      Parent
                    </span>
                  </div>
                  <div className="absolute bottom-[8px] left-[8px] right-[8px] bg-black/55 backdrop-blur-sm rounded-[6px] px-[8px] py-[5px]">
                    <p className="text-[10px] font-bold text-white font-['Inter:Bold',sans-serif] leading-tight">
                      2020 Skoda Kamiq SE
                    </p>
                    <p className="text-[8px] text-white/70 leading-tight mt-[1px]">
                      STK-2107 · full media set
                    </p>
                  </div>
                </div>
              )}

              <p className="mt-[8px] text-[10px] text-black/55 font-['Inter:Regular',sans-serif] leading-tight">
                {phase === "scanning"
                  ? "Looking across your inventory for a same-spec match."
                  : "Sending its full media set to every spec-match."}
              </p>
            </div>

            {/* Children stack — always visible. Photos only flow in after parent match. */}
            <div className="flex flex-col gap-[10px]">
              {children.map((c, i) => (
                <ChildCard
                  key={c.stk}
                  child={c}
                  refSetter={(el) => { childRefs.current[i] = el; }}
                  previewImg={previews[i % previews.length]}
                />
              ))}
            </div>
          </div>

          {/* SVG layer for the flowing lines */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="100%"
            height="100%"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="sm-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"  stopColor="#00C488" />
                <stop offset="100%" stopColor="#4600F2" />
              </linearGradient>
            </defs>
            {paths.map((d, i) => (
              <g key={i}>
                {/* Base path (drawn once) */}
                <path
                  ref={(el) => { lineRefs.current[i] = el; }}
                  d={d}
                  stroke="rgba(0,196,136,0.25)"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  style={{ opacity: 0 }}
                />
                {/* Flowing dash overlay */}
                <path
                  ref={(el) => { flowRefs.current[i] = el; }}
                  d={d}
                  stroke="url(#sm-flow-grad)"
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  style={{ opacity: 0, filter: "drop-shadow(0 0 4px rgba(0,196,136,0.5))" }}
                />
              </g>
            ))}
          </svg>

          {/* Three orbs (one per lane) that travel along the lines */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={(el) => { orbRefs.current[i] = el; }}
              className="absolute pointer-events-none top-0 left-0 size-[32px] rounded-full opacity-0"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(0,196,136,0.85) 40%, rgba(70,0,242,0.85) 100%)",
                boxShadow: "0 0 14px 4px rgba(0,196,136,0.55)",
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="px-[28px] py-[14px] border-t border-black/8 flex items-center justify-between bg-white">
          <div className="flex items-center gap-[6px] text-[11px] text-black/55 font-['Inter:Medium',sans-serif] font-medium">
            <div className="size-[6px] rounded-full bg-[#00C488] animate-pulse" />
            Smart Match active · time-to-life:
            <span className="text-[#0a0a0a] font-semibold ml-[2px]">−{reductionPct}%</span>
            {allDone && <span className="text-[#00C488] font-bold ml-[6px]">All 3 matched</span>}
          </div>
          <div className="flex items-center gap-[8px]">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="h-[38px] px-[14px] rounded-[10px] inline-flex items-center gap-[6px] text-[12px] font-semibold text-[#0a0a0a] hover:bg-black/5 transition-colors font-['Inter:Semi_Bold',sans-serif]"
              >
                <ArrowRight size={13} strokeWidth={2.5} className="rotate-180" />
                Back
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="h-[38px] px-[18px] rounded-[10px] text-white text-[12px] font-semibold font-['Inter:Semi_Bold',sans-serif] transition-transform hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-[8px]"
                style={{
                  background: "linear-gradient(90deg, #FF5C7A 0%, #B651D7 50%, #4600F2 100%)",
                  boxShadow: "0 6px 16px rgba(70,0,242,0.25)",
                }}
              >
                Next: CGI / Stock photos
                <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
