import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import {
  X, Check, Layers, ArrowRight, TrendingUp, Wand2, Eye, Award, Sparkles,
} from "lucide-react";

import cgiFront            from "../assets/vehicle/cgi-front.jpg";
import cgiSide             from "../assets/vehicle/cgi-side.jpg";
import cgiRear             from "../assets/vehicle/cgi-rear.jpg";
import cgiTransformedFront from "../assets/vehicle/cgi-transformed-front.jpg";
import cgiTransformedSide  from "../assets/vehicle/cgi-transformed-side.jpg";
import cgiTransformedRear  from "../assets/vehicle/cgi-transformed-rear.jpg";

interface Props {
  open: boolean;
  onClose: () => void;
  onNext?: () => void;
  onBack?: () => void;
  completed?: boolean;
  totalCgi?: number;
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export function CGIUpgradeModal({
  open, onClose, onNext, onBack, completed, totalCgi = 134,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cgiLayerRef = useRef<HTMLDivElement>(null);
  const cgiCarRef = useRef<HTMLImageElement>(null);
  const studioLayerRef = useRef<HTMLDivElement>(null);
  const studioCarRef = useRef<HTMLImageElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const wandRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const flowRef = useRef<SVGPathElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  type Phase = "cgi" | "scanning" | "matched" | "transforming" | "done";
  const [phase, setPhase] = useState<Phase>("cgi");
  const [path, setPath] = useState("");
  const [upgraded, setUpgraded] = useState(0);

  const eligible = Math.round(totalCgi * 0.72);

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

  // Reset state every open
  useEffect(() => {
    if (!open) return;
    setPhase("cgi");
    setUpgraded(0);
    setPath("");
    [
      [cgiLayerRef.current, { opacity: 1 }],
      [cgiCarRef.current, { opacity: 0.95 }],
      [studioLayerRef.current, { opacity: 0 }],
      [studioCarRef.current, { opacity: 0 }],
      [scanRef.current, { opacity: 0, y: "-100%" }],
      [wandRef.current, { opacity: 0, scale: 0.6, rotation: 0 }],
      [burstRef.current, { opacity: 0, scale: 0.8 }],
      [orbRef.current, { opacity: 0, scale: 0.5, x: 0, y: 0 }],
    ].forEach(([el, props]) => { if (el) gsap.set(el, props as gsap.TweenVars); });
  }, [open]);

  // Compute parent → hero path (the line along which the orb travels)
  useEffect(() => {
    if (!open) return;
    const compute = () => {
      const stage = stageRef.current;
      const p = parentRef.current;
      const h = heroRef.current;
      if (!stage || !p || !h) return;
      const sr = stage.getBoundingClientRect();
      const pr = p.getBoundingClientRect();
      const hr = h.getBoundingClientRect();
      const px = pr.right - sr.left;
      const py = pr.top + pr.height / 2 - sr.top;
      const hx = hr.left - sr.left;
      const hy = hr.top + hr.height / 2 - sr.top;
      const dx = (hx - px) * 0.5;
      setPath(`M ${px} ${py} C ${px + dx} ${py}, ${hx - dx} ${hy}, ${hx} ${hy}`);
    };
    const id = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", compute);
    };
  }, [open]);

  // The full animation timeline: cgi (idle) → scanning → matched → transforming → done
  useEffect(() => {
    if (!open || !path) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // 1) PHASE: scanning — scan beam sweeps the hero
      tl.call(() => setPhase("scanning"));
      tl.fromTo(
        scanRef.current,
        { y: "-100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }
      );
      tl.to(scanRef.current, { y: "100%", duration: 1.4, ease: "power1.inOut" });
      tl.to(scanRef.current, { opacity: 0, duration: 0.25 }, "-=0.2");

      // 2) PHASE: matched — parent line draws + flowing dash starts
      tl.call(() => setPhase("matched"));
      const line = lineRef.current;
      const flow = flowRef.current;
      if (line && flow) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
        tl.to(line, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" });

        gsap.set(flow, { strokeDasharray: `${len * 0.18} ${len * 0.82}`, strokeDashoffset: len, opacity: 1 });
        gsap.to(flow, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "none",
          repeat: -1,
        });
      }

      // 3) Send an orb from parent to hero
      const orb = orbRef.current;
      if (line && orb) {
        const len = line.getTotalLength();
        const obj = { p: 0 };
        tl.fromTo(orb, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.15, ease: "power2.out" });
        tl.to(obj, {
          p: 1,
          duration: 0.9,
          ease: "power1.inOut",
          onUpdate: () => {
            const pt = line.getPointAtLength(obj.p * len);
            gsap.set(orb, { x: pt.x - 18, y: pt.y - 12 });
          },
        }, "<");
        tl.to(orb, { opacity: 0, scale: 0.5, duration: 0.15 }, "+=0");
      }

      // 4) PHASE: transforming — wand pop + burst + cgi → studio crossfade
      tl.call(() => setPhase("transforming"));
      tl.fromTo(
        wandRef.current,
        { opacity: 0, scale: 0.4, rotation: -20 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" }
      );
      tl.to(burstRef.current, { scale: 1.4, opacity: 1, duration: 0.45, ease: "power2.out" }, "<");
      tl.to(cgiLayerRef.current,  { opacity: 0, duration: 0.55, ease: "power2.out" }, "<+=0.05");
      tl.to(cgiCarRef.current,    { opacity: 0, duration: 0.5,  ease: "power2.out" }, "<");
      tl.fromTo(
        studioLayerRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        "<"
      );
      tl.fromTo(
        studioCarRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
        "<"
      );
      tl.to(burstRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.05");
      tl.to(wandRef.current, { opacity: 0, scale: 0.7, y: -8, duration: 0.3, ease: "power2.in" }, "<");

      // 5) PHASE: done — flip status to upgraded; counter eventually ticks up to eligible
      tl.call(() => setPhase("done"));
    });

    return () => ctx.revert();
  }, [open, path]);

  // Counter tick-up after the hero magic completes — shows the whole bucket processing
  useEffect(() => {
    if (!open || phase !== "done") return;
    const obj = { v: 1 };
    const tween = gsap.to(obj, {
      v: eligible,
      duration: 5,
      ease: "power1.out",
      onUpdate: () => setUpgraded(Math.round(obj.v)),
    });
    return () => { tween.kill(); };
  }, [open, phase, eligible]);

  // Progress bar
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const pct = Math.min(100, (upgraded / eligible) * 100);
    gsap.to(bar, { width: `${pct}%`, duration: 0.4, ease: "power2.out" });
  }, [upgraded, eligible]);

  if (!open) return null;

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
                  background: "linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(70,0,242,0.10) 100%)",
                  color: "#F59E0B",
                }}
              >
                <TrendingUp size={22} />
              </div>
              <div>
                <div className="flex items-center gap-[8px] flex-wrap">
                  <h2 className="text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[26px]">
                    Upgrading CGI to real photos
                  </h2>
                  <span className="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-full bg-[rgba(245,158,11,0.14)] text-[#B45309] text-[10px] font-semibold uppercase tracking-[0.6px]">
                    <Layers size={10} />
                    Smart Match
                  </span>
                  {completed && (
                    <span className="inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-full bg-[rgba(16,185,129,0.12)] text-[#059669] text-[10px] font-bold uppercase tracking-[0.6px]">
                      <Check size={10} strokeWidth={3} />
                      Completed
                    </span>
                  )}
                </div>
                <p className="mt-[4px] text-[13px] text-black/55 font-['Inter:Regular',sans-serif]">
                  Swapping renders for studio photos from a matching parent.
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

          {/* One real stat + two qualitative callouts */}
          <div className="mt-[16px] grid grid-cols-3 gap-[12px]">
            <div className="rounded-[10px] border border-black/8 bg-white px-[14px] py-[12px]">
              <p className="text-[10px] uppercase tracking-[0.8px] text-black/45 font-semibold font-['Inter:Semi_Bold',sans-serif]">
                Upgraded to real photos
              </p>
              <p className="mt-[4px] text-[22px] font-bold text-[#F59E0B] font-['Inter:Bold',sans-serif] leading-none">
                {upgraded}<span className="text-black/30 text-[14px] font-medium"> / {eligible}</span>
              </p>
            </div>
            <div className="rounded-[10px] border border-black/8 bg-white px-[14px] py-[12px] flex items-center gap-[10px]">
              <Eye size={18} className="shrink-0 text-[#4600F2]" />
              <p className="text-[12px] text-black/70 font-['Inter:Medium',sans-serif] font-medium leading-[16px]">
                Buyers see your<br />
                <span className="text-[#0a0a0a] font-semibold">real floor, not a render</span>
              </p>
            </div>
            <div className="rounded-[10px] border border-black/8 bg-white px-[14px] py-[12px] flex items-center gap-[10px]">
              <Award size={18} className="shrink-0 text-[#10B981]" />
              <p className="text-[12px] text-black/70 font-['Inter:Medium',sans-serif] font-medium leading-[16px]">
                Authentic photography<br />
                <span className="text-[#0a0a0a] font-semibold">on every eligible vehicle</span>
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
                  background: "linear-gradient(90deg, #F59E0B 0%, #10B981 100%)",
                }}
              />
            </div>
            <p className="text-[11px] text-black/50 font-medium font-['Inter:Medium',sans-serif]">
              {phase === "done" ? "Upgrading in progress" : "Detecting CGI listing…"}
            </p>
          </div>
        </div>

        {/* Stage — parent (left, small) + hero CGI vehicle (right, large) */}
        <div ref={stageRef} className="relative flex-1 px-[28px] py-[20px] bg-[#FAFAFB] overflow-hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] gap-[40px] h-full items-center">
            {/* Parent column */}
            <div ref={parentRef}>
              <p className="text-[9px] uppercase tracking-[0.8px] font-bold text-black/55 mb-[6px] font-['Inter:Bold',sans-serif]">
                Parent vehicle · real photos
              </p>
              <div className="relative rounded-[12px] overflow-hidden border-[2px] border-[#00C488] shadow-[0_8px_24px_rgba(0,196,136,0.18)] aspect-[16/11]">
                <img src={cgiTransformedSide} alt="Parent" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-[8px] left-[8px]">
                  <span className="inline-flex items-center gap-[4px] px-[7px] py-[2px] rounded-full bg-[#00C488] text-white text-[9px] font-bold uppercase tracking-[0.5px]">
                    <Check size={9} strokeWidth={3} />
                    Parent
                  </span>
                </div>
                <div className="absolute bottom-[6px] left-[6px] right-[6px] bg-black/55 backdrop-blur-sm rounded-[6px] px-[8px] py-[4px]">
                  <p className="text-[9px] font-bold text-white font-['Inter:Bold',sans-serif] leading-tight">
                    2020 Honda Accord Sport
                  </p>
                  <p className="text-[8px] text-white/70 leading-tight mt-[1px]">STK-2107 · real photo set</p>
                </div>
              </div>
              <p className="mt-[8px] text-[10px] text-black/55 font-['Inter:Regular',sans-serif] leading-tight">
                Same trim, same color — its photos donate to the CGI listing.
              </p>
            </div>

            {/* Hero CGI vehicle */}
            <div className="flex flex-col items-center gap-[10px]">
              <p className="self-start text-[9px] uppercase tracking-[0.8px] font-bold text-black/55 font-['Inter:Bold',sans-serif]">
                CGI listing → real photo
              </p>
              <div ref={heroRef} className="relative rounded-[14px] overflow-hidden border border-black/8 aspect-[16/10] w-full bg-white">
                {/* CGI layer — manufacturer render on white background */}
                <div ref={cgiLayerRef} className="absolute inset-0 bg-white" />
                <img
                  ref={cgiCarRef}
                  src={cgiFront}
                  alt="CGI render"
                  className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Studio (transformed) layer — same Accord on a real dealership lot */}
                <div ref={studioLayerRef} className="absolute inset-0 opacity-0 bg-[#1a1a1a]" />
                <img
                  ref={studioCarRef}
                  src={cgiTransformedFront}
                  alt="Real photo from parent"
                  className="absolute inset-0 w-full h-full object-cover opacity-0"
                />

                {/* Scan beam */}
                <div
                  ref={scanRef}
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 top-0 h-[35%] opacity-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.50) 50%, transparent 100%)",
                    boxShadow: "0 0 40px 10px rgba(245,158,11,0.45)",
                  }}
                />

                {/* Wand burst */}
                <div
                  ref={burstRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 m-auto rounded-full opacity-0"
                  style={{
                    width: "60%",
                    height: "60%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(245,158,11,0.4) 30%, transparent 60%)",
                    filter: "blur(8px)",
                  }}
                />
                <div
                  ref={wandRef}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0"
                >
                  <div
                    className="size-[68px] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(245,158,11,0.45)]"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #FF7B5C 50%, #B651D7 100%)",
                    }}
                  >
                    <Wand2 size={30} className="text-white" strokeWidth={2.2} />
                  </div>
                </div>

                {/* Status pill */}
                <div className="absolute top-[10px] left-[10px]">
                  {phase === "cgi" || phase === "scanning" ? (
                    <span className="inline-flex items-center gap-[4px] px-[8px] py-[3px] rounded-full bg-[#7F6AF2] text-white text-[10px] font-bold uppercase tracking-[0.6px]">
                      <Sparkles size={10} />
                      CGI render
                    </span>
                  ) : phase === "matched" || phase === "transforming" ? (
                    <span className="inline-flex items-center gap-[4px] px-[8px] py-[3px] rounded-full bg-[#F59E0B] text-white text-[10px] font-bold uppercase tracking-[0.6px]">
                      <Layers size={10} />
                      Matching parent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-[4px] px-[8px] py-[3px] rounded-full bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-[0.6px]">
                      <Check size={10} strokeWidth={3} />
                      Real photo
                    </span>
                  )}
                </div>

                {/* Vehicle caption */}
                <div className="absolute bottom-[10px] left-[10px] right-[10px] flex items-end justify-between">
                  <div className="bg-black/55 backdrop-blur-sm rounded-[8px] px-[10px] py-[5px]">
                    <p className="text-[11px] font-bold text-white font-['Inter:Bold',sans-serif] leading-tight">
                      2020 Honda Accord Sport
                    </p>
                    <p className="text-[9px] text-white/70 font-['Inter:Regular',sans-serif] leading-tight mt-[1px]">
                      STK-3218 · was on a stock render
                    </p>
                  </div>
                  <div className="bg-white/95 rounded-[6px] px-[6px] py-[2px]">
                    <span className="text-[9px] font-bold uppercase tracking-[0.6px] text-[#F59E0B] font-['Inter:Bold',sans-serif]">
                      {phase === "done" ? "After" : "Before"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SVG layer: parent → hero connector line + flowing dash */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="cgi-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"  stopColor="#00C488" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            {path && (
              <>
                <path
                  ref={lineRef}
                  d={path}
                  stroke="rgba(0,196,136,0.28)"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  style={{ opacity: 0 }}
                />
                <path
                  ref={flowRef}
                  d={path}
                  stroke="url(#cgi-flow-grad)"
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  style={{ opacity: 0, filter: "drop-shadow(0 0 4px rgba(245,158,11,0.5))" }}
                />
              </>
            )}
          </svg>

          {/* Travelling orb (parent → hero) */}
          <div
            ref={orbRef}
            className="absolute pointer-events-none top-0 left-0 size-[36px] rounded-full opacity-0"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(245,158,11,0.9) 40%, rgba(0,196,136,0.85) 100%)",
              boxShadow: "0 0 16px 4px rgba(245,158,11,0.55)",
            }}
          />
        </div>

        {/* Footer */}
        <div className="px-[28px] py-[14px] border-t border-black/8 flex items-center justify-between bg-white">
          <div className="flex items-center gap-[6px] text-[12px] text-black/55 font-['Inter:Medium',sans-serif] font-medium">
            <div className="size-[6px] rounded-full bg-[#F59E0B] animate-pulse" />
            CGI → Real photo · powered by
            <span className="text-[#0a0a0a] font-semibold ml-[2px]">Smart Match</span>
          </div>
          <div className="flex items-center gap-[10px]">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="h-[40px] px-[16px] rounded-[10px] inline-flex items-center gap-[6px] text-[13px] font-semibold text-[#0a0a0a] hover:bg-black/5 transition-colors font-['Inter:Semi_Bold',sans-serif]"
              >
                <ArrowRight size={14} strokeWidth={2.5} className="rotate-180" />
                Back
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="h-[40px] px-[20px] rounded-[10px] text-white text-[13px] font-semibold font-['Inter:Semi_Bold',sans-serif] transition-transform hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-[8px]"
                style={{
                  background: "linear-gradient(90deg, #FF5C7A 0%, #B651D7 50%, #4600F2 100%)",
                  boxShadow: "0 6px 16px rgba(70,0,242,0.25)",
                }}
              >
                Finish
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
