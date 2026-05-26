import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import {
  X, ArrowRight, ChevronLeft, Megaphone, Check,
  Hand, Layers, Clock, RefreshCcw,
  SlidersHorizontal, Activity, Globe, Smartphone, ShoppingBag,
} from "lucide-react";

import studioExt1 from "../assets/vehicle/studio-exterior-1.jpg";
import { PLATFORMS, type Platform } from "./publishPlatforms";

interface Props {
  open: boolean;
  onClose: () => void;
  onContinue?: () => void;
  onBack?: () => void;
  completed?: boolean;
  totalListings?: number;
}

const MAGENTA = "#E91E63";
const PURPLE = "#7F6AF2";
const MAGENTA_GRAD = "linear-gradient(90deg, #FF5C9A 0%, #B651D7 100%)";

// 8 platforms placed evenly around the central car
const RADIAL_PLATFORMS = PLATFORMS.filter((p) =>
  ["vincue", "autotrader", "cars", "kbb-marketplace", "spyne-smartview", "facebook", "instagram", "tiktok"].includes(p.id)
);

// ─── Atoms ───────────────────────────────────────────────────────────────────

function Eyebrow({ children, color = MAGENTA }: { children: React.ReactNode; color?: string }) {
  return (
    <p
      className="text-[10px] font-bold tracking-[2px] uppercase font-['Inter:Bold',sans-serif] mb-[8px]"
      style={{ color }}
    >
      {children}
    </p>
  );
}

function Pointer({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-[10px] px-[12px] py-[10px] rounded-[10px] bg-white border border-black/8">
      <span
        className="size-[28px] rounded-[8px] flex items-center justify-center shrink-0"
        style={{ background: "rgba(233,30,99,0.10)", color: MAGENTA }}
      >
        {icon}
      </span>
      <p className="text-[12.5px] font-semibold text-[#0a0a0a] font-['Inter:Semi_Bold',sans-serif]">{text}</p>
    </div>
  );
}

function FeatureCard({
  icon, title, tagline, accent,
}: { icon: React.ReactNode; title: string; tagline: string; accent: string }) {
  return (
    <div className="bg-white rounded-[12px] border border-black/8 p-[14px]">
      <span
        className="size-[36px] rounded-[10px] flex items-center justify-center mb-[10px]"
        style={{ background: `${accent}1A`, color: accent }}
      >
        {icon}
      </span>
      <p className="text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[16px]">{title}</p>
      <p className="mt-[3px] text-[11px] text-black/55 font-['Inter:Regular',sans-serif] leading-[14px]">{tagline}</p>
    </div>
  );
}

function StepBlock({
  n, title, tagline,
}: { n: string; title: string; tagline: string }) {
  return (
    <div>
      <p className="text-[22px] font-bold font-['Inter:Bold',sans-serif] leading-none" style={{ color: MAGENTA }}>
        {n}
      </p>
      <p className="mt-[6px] text-[12.5px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[15px]">{title}</p>
      <p className="mt-[2px] text-[11px] text-black/55 font-['Inter:Regular',sans-serif] leading-[14px]">{tagline}</p>
    </div>
  );
}

function BuiltForCard({
  icon, title, tagline, accent,
}: { icon: React.ReactNode; title: string; tagline: string; accent: string }) {
  return (
    <div className="bg-white rounded-[12px] border border-black/8 p-[14px] relative overflow-hidden">
      <div className="absolute left-[10px] right-[10px] top-0 h-[3px] rounded-b-full" style={{ background: accent }} />
      <span
        className="mt-[8px] inline-flex size-[28px] rounded-[8px] items-center justify-center"
        style={{ background: `${accent}1A`, color: accent }}
      >
        {icon}
      </span>
      <p className="mt-[8px] text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[16px]">{title}</p>
      <p className="mt-[3px] text-[11px] text-black/55 font-['Inter:Regular',sans-serif] leading-[14px]">{tagline}</p>
    </div>
  );
}

function Divider() {
  return <div className="my-[20px] h-px bg-black/8" />;
}

// ─── Radial platforms diagram ─────────────────────────────────────────────────

function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <div
      className="size-[42px] rounded-[10px] flex items-center justify-center font-bold font-['Inter:Bold',sans-serif] shadow-[0_4px_12px_rgba(0,0,0,0.10)] border border-white"
      style={{
        background: platform.gradient || platform.bg,
        color: platform.fg,
        fontStyle: platform.italic ? "italic" : "normal",
        fontSize: 15,
        lineHeight: 1,
      }}
      title={platform.name}
    >
      {platform.glyph}
    </div>
  );
}

function RadialDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const linePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const flowPathRefs = useRef<(SVGPathElement | null)[]>([]);

  // Compute the 8 badge positions (radial)
  const N = RADIAL_PLATFORMS.length;
  const positions = Array.from({ length: N }, (_, i) => {
    const angle = (-Math.PI / 2) + (i * (2 * Math.PI)) / N;
    return { angle };
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      // Car pop-in
      gsap.fromTo(
        carRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }
      );

      // Lines draw
      linePathRefs.current.forEach((path, i) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.25 + i * 0.05,
        });
      });

      // Flowing dash overlay (animated continuously)
      flowPathRefs.current.forEach((path, i) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: `${len * 0.18} ${len * 0.82}`, strokeDashoffset: len, opacity: 1 });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "none",
          repeat: -1,
          delay: 0.8 + i * 0.08,
        });
      });

      // Badges pop in after lines start
      gsap.fromTo(
        badgeRefs.current.filter(Boolean),
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)", stagger: 0.06, delay: 0.4 }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  // Geometry: stage box 100% of parent, car centered, badges on radius
  // We'll use a fixed viewBox of 520x340 for the SVG inside the container.
  const W = 520;
  const H = 340;
  const cx = W / 2;
  const cy = H / 2;
  const carHalfW = 110;
  const carHalfH = 70;
  const rx = 230;
  const ry = 150;

  return (
    <div
      ref={wrapRef}
      className="relative rounded-[14px] overflow-hidden border border-black/8 bg-white"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(127,106,242,0.06) 0%, transparent 60%), white",
        aspectRatio: `${W} / ${H}`,
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="syn-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#FF5C9A" />
            <stop offset="50%" stopColor="#B651D7" />
            <stop offset="100%" stopColor="#4600F2" />
          </linearGradient>
        </defs>

        {positions.map((p, i) => {
          // Each badge sits on an ellipse around the car
          const ex = cx + Math.cos(p.angle) * rx;
          const ey = cy + Math.sin(p.angle) * ry;
          // Anchor: from edge of the car rectangle, toward the badge
          const dx = ex - cx;
          const dy = ey - cy;
          const dist = Math.hypot(dx, dy);
          const nx = dx / dist;
          const ny = dy / dist;
          // Find intersection with the car's bounding ellipse-ish (use rect)
          const sx = cx + nx * Math.min(carHalfW, Math.abs(carHalfW / nx || carHalfW));
          const sy = cy + ny * Math.min(carHalfH, Math.abs(carHalfH / ny || carHalfH));
          const sxC = cx + nx * carHalfW * 0.9;
          const syC = cy + ny * carHalfH * 0.95;
          // Smooth bezier
          const mx = (sxC + ex) / 2;
          const my = (syC + ey) / 2;
          const d = `M ${sxC} ${syC} Q ${mx} ${my} ${ex} ${ey}`;
          return (
            <g key={i}>
              <path
                ref={(el) => { linePathRefs.current[i] = el; }}
                d={d}
                stroke="rgba(127,106,242,0.30)"
                strokeWidth={1.8}
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0 }}
              />
              <path
                ref={(el) => { flowPathRefs.current[i] = el; }}
                d={d}
                stroke="url(#syn-flow-grad)"
                strokeWidth={2.4}
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0, filter: "drop-shadow(0 0 3px rgba(127,106,242,0.5))" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Car in the center */}
      <div
        ref={carRef}
        className="absolute"
        style={{
          left: `${(cx - carHalfW) / W * 100}%`,
          top: `${(cy - carHalfH) / H * 100}%`,
          width: `${(carHalfW * 2) / W * 100}%`,
          height: `${(carHalfH * 2) / H * 100}%`,
        }}
      >
        <div className="relative rounded-[12px] overflow-hidden bg-white border-[2px] border-[#4600F2] shadow-[0_8px_24px_rgba(70,0,242,0.15)] size-full">
          <img src={studioExt1} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute bottom-[4px] left-[4px] right-[4px] bg-black/55 backdrop-blur-sm rounded-[4px] px-[5px] py-[2px]">
            <p className="text-[8px] font-bold text-white font-['Inter:Bold',sans-serif] leading-tight truncate">
              2020 Skoda Kamiq SE
            </p>
          </div>
        </div>
      </div>

      {/* Platform badges around the car */}
      {positions.map((p, i) => {
        const ex = cx + Math.cos(p.angle) * rx;
        const ey = cy + Math.sin(p.angle) * ry;
        return (
          <div
            key={i}
            ref={(el) => { badgeRefs.current[i] = el; }}
            className="absolute"
            style={{
              left: `${ex / W * 100}%`,
              top: `${ey / H * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <PlatformBadge platform={RADIAL_PLATFORMS[i]} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export function SyndicationPitchModal({
  open, onClose, onContinue, onBack, completed, totalListings = 233,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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
    const body = bodyRef.current;
    if (body) {
      const targets = body.querySelectorAll<HTMLElement>("[data-pitch-section] > *");
      gsap.fromTo(
        targets,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[20px] w-full max-w-[1080px] max-h-[92vh] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        <div className="absolute top-[16px] right-[16px] z-10 flex items-center gap-[10px]">
          {completed && (
            <span className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-full bg-[rgba(16,185,129,0.12)] text-[#059669] text-[10px] font-bold uppercase tracking-[0.6px] font-['Inter:Bold',sans-serif]">
              <Check size={11} strokeWidth={3} />
              Completed
            </span>
          )}
          <button
            type="button"
            onClick={onClose}
            className="size-[32px] rounded-full bg-white/95 hover:bg-black/5 flex items-center justify-center transition-colors shadow-sm"
            aria-label="Close"
          >
            <X size={18} className="text-black/65" />
          </button>
        </div>

        <div ref={bodyRef} className="flex-1 overflow-y-auto px-[36px] py-[32px]" data-pitch-section>
          {/* HERO — 2-col: pitch + radial diagram */}
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-[24px] items-center">
            <div>
              <Eyebrow>Step 03 · Smart Suite · Distribution</Eyebrow>
              <h1 className="text-[32px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[36px] tracking-tight">
                Syndication.
              </h1>
              <h1
                className="text-[32px] font-bold font-['Inter:Bold',sans-serif] leading-[36px] tracking-tight"
                style={{
                  background: MAGENTA_GRAD,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                One click, every channel.
              </h1>
              <p className="mt-[10px] text-[13px] text-black/60 font-['Inter:Regular',sans-serif]">
                Push every listing to marketplaces, your website and social — instantly.
              </p>
            </div>
            <RadialDiagram />
          </div>

          <Divider />

          {/* PROBLEM */}
          <div>
            <Eyebrow>Why listings stall on day one</Eyebrow>
            <div className="grid grid-cols-2 gap-[10px]">
              <Pointer icon={<Hand size={15} />}        text="Manual posting per channel" />
              <Pointer icon={<Layers size={15} />}      text="Inconsistent feeds and specs" />
              <Pointer icon={<Clock size={15} />}       text="Hours between price change and live" />
              <Pointer icon={<RefreshCcw size={15} />}  text="No view of which channel sells" />
            </div>
          </div>

          <Divider />

          {/* SOLUTION */}
          <div>
            <Eyebrow>The Solution</Eyebrow>
            <h2 className="text-[18px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[22px]">
              Distribute studio-grade listings everywhere buyers shop.
            </h2>
            <div className="mt-[12px] grid grid-cols-2 gap-[10px]">
              <FeatureCard
                icon={<Megaphone size={18} strokeWidth={2.2} />}
                title="Multi-channel push"
                tagline="Marketplaces, website, social — one click."
                accent={MAGENTA}
              />
              <FeatureCard
                icon={<SlidersHorizontal size={18} strokeWidth={2.2} />}
                title="Auto-formatted per channel"
                tagline="Right specs, right images, right fields."
                accent="#F43F5E"
              />
              <FeatureCard
                icon={<RefreshCcw size={18} strokeWidth={2.2} />}
                title="Live re-sync"
                tagline="Price & status changes propagate instantly."
                accent="#10B981"
              />
              <FeatureCard
                icon={<Activity size={18} strokeWidth={2.2} />}
                title="Performance per channel"
                tagline="See which channels actually convert."
                accent="#4600F2"
              />
            </div>
          </div>

          <Divider />

          {/* HOW IT WORKS */}
          <div>
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="text-[16px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[22px]">
              Set the channels once. Spyne keeps them in sync.
            </h2>
            <div className="mt-[12px] grid grid-cols-4 gap-[12px]">
              <StepBlock n="01" title="Pick channels"        tagline="Marketplaces, website, social." />
              <StepBlock n="02" title="Format & validate"    tagline="Auto-fit each channel's spec." />
              <StepBlock n="03" title="Push live"            tagline="Every VIN, every channel." />
              <StepBlock n="04" title="Track performance"    tagline="See where the leads come from." />
            </div>
          </div>

          <Divider />

          {/* BUILT FOR */}
          <div>
            <Eyebrow color={PURPLE}>Built For</Eyebrow>
            <h2 className="text-[16px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[22px]">
              Every channel where buyers shop.
            </h2>
            <div className="mt-[12px] grid grid-cols-3 gap-[10px]">
              <BuiltForCard
                icon={<ShoppingBag size={14} strokeWidth={2.2} />}
                title="Marketplaces"
                tagline="Cars.com, Autotrader, KBB."
                accent={MAGENTA}
              />
              <BuiltForCard
                icon={<Globe size={14} strokeWidth={2.2} />}
                title="Your website"
                tagline="Direct push to your VDPs."
                accent="#F43F5E"
              />
              <BuiltForCard
                icon={<Smartphone size={14} strokeWidth={2.2} />}
                title="Social channels"
                tagline="Facebook, Instagram, TikTok."
                accent={PURPLE}
              />
            </div>
          </div>
        </div>

        {/* Sticky CTA footer */}
        <div className="px-[28px] py-[14px] border-t border-black/8 flex items-center justify-between bg-white">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="h-[42px] px-[16px] rounded-[10px] inline-flex items-center gap-[6px] text-[13px] font-semibold text-[#0a0a0a] hover:bg-black/5 transition-colors font-['Inter:Semi_Bold',sans-serif]"
            >
              <ChevronLeft size={15} strokeWidth={2.5} />
              Back
            </button>
          ) : (
            <div className="flex items-center gap-[6px] text-[12px] text-black/55 font-['Inter:Medium',sans-serif] font-medium">
              <Megaphone size={13} className="text-[#4600F2]" />
              Syndication · ready to push {totalListings} listings
            </div>
          )}
          <button
            type="button"
            onClick={() => onContinue?.()}
            className="h-[42px] px-[22px] rounded-[10px] text-white text-[13px] font-semibold font-['Inter:Semi_Bold',sans-serif] inline-flex items-center gap-[8px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(90deg, #FF5C9A 0%, #B651D7 50%, #4600F2 100%)",
              boxShadow: "0 6px 16px rgba(70,0,242,0.25)",
            }}
          >
            {completed ? "Continue" : `Pick channels for ${totalListings} listings`}
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
