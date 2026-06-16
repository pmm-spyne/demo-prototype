import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Zap, Camera, Send, Megaphone, Smartphone, Monitor, ArrowRight, Sparkles,
} from "lucide-react";
import { SpyneMark } from "./AppShell";

interface UnboxingScreenProps {
  dealerName?: string;
  onContinue: () => void;
}

interface Pillar {
  icon: React.ReactNode;
  name: string;
  tagline: string;
  accent: string;
}

const PILLARS: Pillar[] = [
  { icon: <Zap size={22} strokeWidth={2.2} />,      name: "Studio Instant", tagline: "Cloned, VIN-matched images at acquisition — listings live on Day 0.", accent: "#7F6AF2" },
  { icon: <Camera size={22} strokeWidth={2.2} />,   name: "Studio Create",  tagline: "App-guided professional capture and editing after recon.",        accent: "#E91E63" },
  { icon: <Send size={22} strokeWidth={2.2} />,     name: "Studio Publish", tagline: "One click to every marketplace, your site, social and Google.",     accent: "#4600F2" },
  { icon: <Megaphone size={22} strokeWidth={2.2} />, name: "Studio Promote", tagline: "Age-triggered promotions, updated across all channels.",           accent: "#DC2626" },
];

export function UnboxingScreen({ dealerName, onContinue }: UnboxingScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tl = gsap.timeline();
    tl.fromTo(root.querySelectorAll<HTMLElement>("[data-intro]"),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" },
    );
    tl.fromTo(root.querySelectorAll<HTMLElement>("[data-pillar]"),
      { y: 26, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.14, ease: "back.out(1.3)" },
      "-=0.15",
    );
    tl.fromTo(root.querySelectorAll<HTMLElement>("[data-outro]"),
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
      "-=0.1",
    );
    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative min-h-full w-full flex flex-col items-center justify-center px-[32px] py-[48px] overflow-hidden"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #2A1A55 0%, #150B33 45%, #0A0620 100%)" }}
    >
      {/* Ambient gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-1/2 -translate-x-1/2 w-[760px] h-[760px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(182,81,215,0.22) 0%, transparent 60%)" }}
      />

      <div className="relative w-full max-w-[860px] flex flex-col items-center text-center">
        {/* Brand + trial */}
        <div data-intro className="flex items-center gap-[10px] mb-[18px]">
          <div className="size-[40px] rounded-[10px] bg-white/10 backdrop-blur flex items-center justify-center">
            <SpyneMark />
          </div>
          <span
            className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full text-[11px] font-bold uppercase tracking-[1px] text-white font-['Inter:Bold',sans-serif]"
            style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)" }}
          >
            <Sparkles size={12} strokeWidth={2.6} /> Free for 30 days
          </span>
        </div>

        <h1 data-intro className="text-[44px] font-bold text-white font-['Inter:Bold',sans-serif] leading-[48px] tracking-[-0.5px]">
          Welcome to Studio OS
        </h1>
        <p data-intro className="mt-[12px] text-[15px] text-white/65 font-['Inter:Regular',sans-serif] max-w-[560px] leading-[22px]">
          {dealerName ? `${dealerName}, your` : "Your"} complete merchandising operating system — four products
          working as one, from acquisition to sold.
        </p>

        {/* Four pillars */}
        <div className="mt-[36px] grid grid-cols-2 gap-[16px] w-full">
          {PILLARS.map((p) => (
            <div
              key={p.name}
              data-pillar
              className="relative text-left rounded-[18px] p-[20px] overflow-hidden border border-white/10"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-[40%] -right-[20%] w-[200px] h-[200px] rounded-full"
                style={{ background: `radial-gradient(circle, ${p.accent}33 0%, transparent 65%)` }}
              />
              <span
                className="relative size-[44px] rounded-[12px] flex items-center justify-center text-white mb-[14px]"
                style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}AA)`, boxShadow: `0 8px 22px ${p.accent}55` }}
              >
                {p.icon}
              </span>
              <h3 className="relative text-[18px] font-bold text-white font-['Inter:Bold',sans-serif]">{p.name}</h3>
              <p className="relative mt-[6px] text-[12.5px] text-white/60 font-['Inter:Regular',sans-serif] leading-[18px]">
                {p.tagline}
              </p>
            </div>
          ))}
        </div>

        {/* Fabric footnote — App + Frame power the four pillars */}
        <div data-outro className="mt-[22px] flex items-center justify-center gap-[18px] text-white/55">
          <span className="inline-flex items-center gap-[7px] text-[12px] font-['Inter:Medium',sans-serif] font-medium">
            <Smartphone size={15} strokeWidth={2.2} className="text-white/70" />
            Studio App — the capture engine
          </span>
          <span className="size-[3px] rounded-full bg-white/25" />
          <span className="inline-flex items-center gap-[7px] text-[12px] font-['Inter:Medium',sans-serif] font-medium">
            <Monitor size={15} strokeWidth={2.2} className="text-white/70" />
            Studio Frame — the live media surface
          </span>
        </div>

        {/* CTA */}
        <button
          data-outro
          type="button"
          onClick={onContinue}
          className="mt-[34px] inline-flex items-center justify-center gap-[10px] h-[52px] px-[34px] rounded-[12px] text-[15px] font-bold text-white font-['Inter:Bold',sans-serif] transition-transform hover:scale-[1.02]"
          style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)", boxShadow: "0 14px 38px rgba(182,81,215,0.45)" }}
        >
          Enter Studio OS <ArrowRight size={18} />
        </button>
        <p data-outro className="mt-[14px] text-[11.5px] text-white/40 font-['Inter:Regular',sans-serif]">
          No credit card required · Reverts to your standard console when the trial ends
        </p>
      </div>
    </div>
  );
}
