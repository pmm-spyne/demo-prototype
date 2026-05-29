import { useCallback, useMemo, useState } from "react";
import {
  Send, Layers, Globe, Sparkles, Timer, Building2, Wand2,
  Rocket, Calendar, Search, Monitor, Palette, Smartphone,
} from "lucide-react";
import { IMSImportScreen } from "./IMSImportScreen";
import { ScanningScreen } from "./ScanningScreen";
import { LoadingScreen } from "./LoadingScreen";
import { Demo2Dashboard, type BucketKey, type BucketState } from "./Demo2Dashboard";
import { PitchPanel, type PitchContent } from "./shared/PitchPanel";
import { InventoryDiagnosticFab } from "./InventoryDiagnosticFab";
import { BeforeAfterToggle, type DashboardView } from "./BeforeAfterToggle";
import { SelectionActionBar } from "./SelectionActionBar";
import { SmartCampaignModal } from "./SmartCampaignModal";
import { PublishModal } from "./PublishModal";
import type { Row } from "./shared/VehicleRow";
import { PLATFORMS } from "./publishPlatforms";
import imgCampaigns from "../assets/smart-campaigns-example.png";
import imgRawExterior from "../assets/vehicle/raw-exterior-1.jpg";
import imgStudioExterior from "../assets/vehicle/studio-exterior-1.jpg";
import imgCgiFront from "../assets/vehicle/cgi-front.jpg";
import imgCgiTransformed from "../assets/vehicle/cgi-transformed-front.jpg";
import { ImageOff } from "lucide-react";
import { calcOpportunity, type DemoConfig } from "../types/demoConfig";

// ─── SmartMatch scan animation ────────────────────────────────────────────────
// Shows a blank placeholder with a VIN number, then a purple scan line sweeps
// left→right and the matched car image reveals — same 16/9 ratio as RawScanHero.
const SMART_MATCH_CSS = `
@keyframes smReveal {
  0%, 12%   { clip-path: inset(0 100% 0 0); }
  58%, 100% { clip-path: inset(0 0% 0 0); }
}
@keyframes smScanLine {
  0%, 12%   { left: 0%; opacity: 1; }
  58%       { left: 100%; opacity: 0; }
  62%       { left: 0%; opacity: 0; }
  70%, 100% { left: 0%; opacity: 0; }
}
@keyframes smScanPulse {
  0%, 100% { box-shadow: 0 0 8px 3px rgba(127,106,242,0.55), 0 0 22px 6px rgba(127,106,242,0.22); }
  50%      { box-shadow: 0 0 14px 5px rgba(127,106,242,0.85), 0 0 34px 10px rgba(127,106,242,0.42); }
}
@keyframes smVinGlow {
  0%, 8%    { color: rgba(156,163,175,0.6); text-shadow: none; }
  28%, 48%  { color: rgba(167,139,250,1); text-shadow: 0 0 20px rgba(127,106,242,0.8), 0 0 40px rgba(127,106,242,0.4); }
  62%, 100% { color: rgba(255,255,255,0.85); text-shadow: none; }
}
@keyframes smFoundBadge {
  0%, 42%   { opacity: 0; transform: scale(0.85); }
  58%, 100% { opacity: 1; transform: scale(1); }
}
`;

function SmartMatchScanHero() {
  return (
    <>
      <style>{SMART_MATCH_CSS}</style>
      <div
        className="relative w-full overflow-hidden rounded-[14px] border border-black/8 bg-[#111318]"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Base layer: "No Photo" placeholder with VIN number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[14px]">
          <ImageOff size={36} className="text-white/20" strokeWidth={1.5} />
          <div
            className="font-mono text-[13px] font-bold tracking-[3px] uppercase px-[12px] py-[6px] rounded-[6px] border border-white/10 bg-white/5"
            style={{
              animation: "smVinGlow 4.5s cubic-bezier(0.45,0,0.55,1) 0.5s infinite",
              color: "rgba(156,163,175,0.6)",
            }}
          >
            VIN5N1AT3CBXSC
          </div>
        </div>

        {/* Reveal layer: matched car image */}
        <div
          className="absolute inset-0"
          style={{ animation: "smReveal 4.5s cubic-bezier(0.45,0,0.55,1) 0.5s infinite" }}
        >
          <img
            src={imgStudioExterior}
            alt="Matched media"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Glowing purple scan line */}
        <div
          className="absolute inset-y-0 w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #7F6AF2 18%, #B651D7 50%, #7F6AF2 82%, transparent 100%)",
            animation:
              "smScanLine 4.5s cubic-bezier(0.45,0,0.55,1) 0.5s infinite, smScanPulse 1.1s ease-in-out infinite",
          }}
        />

        {/* Top-left: scanning status */}
        <div className="absolute top-[10px] left-[10px] flex items-center gap-[5px] px-[8px] py-[4px] rounded-[6px] bg-black/60 backdrop-blur-sm">
          <span className="size-[5px] rounded-full bg-[#A78BFA] animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8px] text-white font-['Inter:Bold',sans-serif]">
            Scanning VIN
          </span>
        </div>

        {/* Top-right: VIN Found badge (appears after scan) */}
        <div
          className="absolute top-[10px] right-[10px] flex items-center gap-[5px] px-[8px] py-[4px] rounded-[6px]"
          style={{
            background: "rgba(127,106,242,0.82)",
            backdropFilter: "blur(4px)",
            animation: "smFoundBadge 4.5s cubic-bezier(0.45,0,0.55,1) 0.5s infinite",
          }}
        >
          <span className="size-[5px] rounded-full bg-white" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8px] text-white font-['Inter:Bold',sans-serif]">
            VIN Found
          </span>
        </div>

        {/* Bottom-left: No photo yet */}
        <div className="absolute bottom-[10px] left-[10px] flex items-center gap-[5px] px-[8px] py-[4px] rounded-[6px] bg-black/60 backdrop-blur-sm">
          <span className="size-[5px] rounded-full bg-[#9CA3AF]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8px] text-[#D1D5DB] font-['Inter:Bold',sans-serif]">
            No photo yet
          </span>
        </div>

        {/* Bottom-right: Matched media badge (appears after scan) */}
        <div
          className="absolute bottom-[10px] right-[10px] flex items-center gap-[5px] px-[8px] py-[4px] rounded-[6px]"
          style={{
            background: "rgba(127,106,242,0.82)",
            backdropFilter: "blur(4px)",
            animation: "smFoundBadge 4.5s cubic-bezier(0.45,0,0.55,1) 0.5s infinite",
          }}
        >
          <span className="size-[5px] rounded-full bg-white" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8px] text-white font-['Inter:Bold',sans-serif]">
            Matched media
          </span>
        </div>
      </div>
    </>
  );
}

// ─── Stock photo grid animation ──────────────────────────────────────────────
// 3×2 grid of inconsistent stock photo cards — each sweeps through a purple
// scan line and reveals a clean, uniform Studio AI output.
const STOCK_GRID_CSS = `
@keyframes sgReveal {
  0%, 12%   { clip-path: inset(0 100% 0 0); }
  58%, 100% { clip-path: inset(0 0% 0 0); }
}
@keyframes sgScanLine {
  0%, 12%   { left: 0%; opacity: 1; }
  58%       { left: 100%; opacity: 0; }
  60%       { left: 0%; opacity: 0; }
  68%, 100% { left: 0%; opacity: 0; }
}
@keyframes sgScanPulse {
  0%, 100% { box-shadow: 0 0 6px 2px rgba(124,58,237,0.6), 0 0 16px 5px rgba(124,58,237,0.2); }
  50%      { box-shadow: 0 0 10px 4px rgba(124,58,237,0.9), 0 0 26px 8px rgba(124,58,237,0.4); }
}
@keyframes sgBadgeFade {
  0%, 52%   { opacity: 0; transform: scale(0.8); }
  68%, 100% { opacity: 1; transform: scale(1); }
}
@keyframes sgLabelFade {
  0%, 48%   { opacity: 1; }
  62%, 100% { opacity: 0; }
}
`;

function StockPhotoGridHero() {
  const DURATION = "5s";
  const cards = [
    { delay: "0s",     before: imgCgiFront,    after: imgCgiTransformed,  filter: "hue-rotate(25deg) brightness(1.15)",   issue: "Watermark"    },
    { delay: "0.55s",  before: imgRawExterior, after: imgStudioExterior,  filter: "grayscale(0.35) contrast(1.1)",        issue: "Off-brand"    },
    { delay: "1.1s",   before: imgCgiFront,    after: imgCgiTransformed,  filter: "sepia(0.3) brightness(1.05)",          issue: "Poor crop"    },
    { delay: "1.65s",  before: imgRawExterior, after: imgStudioExterior,  filter: "hue-rotate(-18deg) saturate(1.35)",    issue: "Different BG" },
    { delay: "2.2s",   before: imgCgiFront,    after: imgCgiTransformed,  filter: "brightness(1.22) contrast(1.12)",      issue: "Inconsistent" },
    { delay: "2.75s",  before: imgRawExterior, after: imgStudioExterior,  filter: "brightness(0.82) saturate(0.75)",      issue: "Off-angle"    },
  ];

  return (
    <>
      <style>{STOCK_GRID_CSS}</style>
      <div className="w-full rounded-[14px] border border-black/8 bg-[#111318] overflow-hidden p-[10px]">
        <div className="grid grid-cols-3 gap-[5px]">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[7px]"
              style={{ aspectRatio: "4/3" }}
            >
              {/* Base: inconsistent stock image */}
              <img
                src={card.before}
                alt="Inconsistent stock photo"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: card.filter }}
              />

              {/* Issue label — fades out when processed */}
              <div
                className="absolute top-[4px] left-[4px] px-[4px] py-[1.5px] rounded-[3px] text-[7.5px] font-bold text-white uppercase tracking-[0.4px] font-['Inter:Bold',sans-serif]"
                style={{
                  background: "rgba(239,68,68,0.85)",
                  animation: `sgLabelFade ${DURATION} ease-in-out ${card.delay} infinite`,
                }}
              >
                {card.issue}
              </div>

              {/* Reveal layer: Studio AI processed image */}
              <div
                className="absolute inset-0"
                style={{ animation: `sgReveal ${DURATION} ease-in-out ${card.delay} infinite` }}
              >
                <img
                  src={card.after}
                  alt="Studio AI processed"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Glowing purple scan line */}
              <div
                className="absolute inset-y-0 w-[1.5px]"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, #7C3AED 20%, #A855F7 50%, #7C3AED 80%, transparent 100%)",
                  animation: `sgScanLine ${DURATION} ease-in-out ${card.delay} infinite, sgScanPulse 1s ease-in-out infinite`,
                }}
              />

              {/* Studio AI badge — fades in after scan */}
              <div
                className="absolute bottom-[4px] right-[4px] flex items-center gap-[3px] px-[5px] py-[2px] rounded-[3px] text-[7.5px] font-bold text-white font-['Inter:Bold',sans-serif]"
                style={{
                  background: "rgba(124,58,237,0.88)",
                  backdropFilter: "blur(4px)",
                  animation: `sgBadgeFade ${DURATION} ease-in-out ${card.delay} infinite`,
                }}
              >
                ✓ Studio AI
              </div>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="mt-[8px] flex items-center justify-between px-[1px]">
          <div className="flex items-center gap-[5px]">
            <span className="size-[5px] rounded-full bg-[#7C3AED] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.9px] text-white/65 font-['Inter:Bold',sans-serif]">
              Standardising stock photos
            </span>
          </div>
          <span className="text-[9px] font-bold text-[#7C3AED] font-['Inter:Bold',sans-serif]">
            134 vehicles
          </span>
        </div>
      </div>
    </>
  );
}

// ─── Syndication hero ────────────────────────────────────────────────────────
// 6 platform listing cards appear sequentially (staggered) — each gets a
// green "Live" badge once published, then an "All live" status confirms.
const SYNDICATION_CSS = `
@keyframes synCard {
  0%   { opacity: 0; transform: translateY(6px) scale(0.93); }
  8%   { opacity: 1; transform: translateY(0) scale(1); }
  82%  { opacity: 1; transform: translateY(0) scale(1); }
  94%  { opacity: 0; }
  100% { opacity: 0; }
}
@keyframes synLive {
  0%, 8%  { opacity: 0; transform: scale(0.7); }
  16%     { opacity: 1; transform: scale(1); }
  82%     { opacity: 1; }
  94%     { opacity: 0; }
  100%    { opacity: 0; }
}
@keyframes synAllLive {
  0%, 64%  { opacity: 0; transform: translateX(6px); }
  72%, 80% { opacity: 1; transform: translateX(0); }
  92%      { opacity: 0; }
  100%     { opacity: 0; }
}
`;

function SyndicationHero() {
  const DUR = "7s";
  const platforms = [
    { name: "AutoTrader", short: "AT",   color: "#FF6600", delay: "0s",    liveDel: "0.55s" },
    { name: "Cars.com",   short: "Cars", color: "#005B99", delay: "0.6s",  liveDel: "1.15s" },
    { name: "KBB",        short: "KBB",  color: "#003087", delay: "1.2s",  liveDel: "1.75s" },
    { name: "Facebook",   short: "FB",   color: "#1877F2", delay: "1.8s",  liveDel: "2.35s" },
    { name: "Instagram",  short: "IG",   color: "#C13584", delay: "2.4s",  liveDel: "2.95s" },
    { name: "Dealer Site",short: "Site", color: "#4600F2", delay: "3.0s",  liveDel: "3.55s" },
  ];

  return (
    <>
      <style>{SYNDICATION_CSS}</style>
      <div className="w-full rounded-[14px] border border-black/8 bg-[#111318] overflow-hidden p-[10px]">
        <div className="grid grid-cols-3 gap-[5px]">
          {platforms.map((p, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[7px]"
              style={{
                aspectRatio: "4/3",
                opacity: 0,
                animation: `synCard ${DUR} ease-out ${p.delay} infinite`,
              }}
            >
              {/* Platform accent stripe */}
              <div className="absolute top-0 left-0 right-0 h-[3px] z-[1]" style={{ background: p.color }} />

              {/* Car image */}
              <img
                src={i % 2 === 0 ? imgCgiTransformed : imgStudioExterior}
                alt={p.name}
                className="w-full h-full object-cover"
              />

              {/* Platform badge */}
              <div
                className="absolute bottom-[4px] left-[4px] px-[5px] py-[2px] rounded-[3px] text-[7.5px] font-bold text-white uppercase tracking-[0.4px] font-['Inter:Bold',sans-serif]"
                style={{ background: `${p.color}DD` }}
              >
                {p.short}
              </div>

              {/* Live badge — appears after card */}
              <div
                className="absolute bottom-[4px] right-[4px] flex items-center gap-[2px] px-[5px] py-[2px] rounded-[3px] text-[7.5px] font-bold text-white font-['Inter:Bold',sans-serif]"
                style={{
                  background: "rgba(16,185,129,0.9)",
                  opacity: 0,
                  animation: `synLive ${DUR} ease-out ${p.liveDel} infinite`,
                }}
              >
                ✓ Live
              </div>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="mt-[8px] flex items-center justify-between px-[1px]">
          <div className="flex items-center gap-[5px]">
            <span className="size-[5px] rounded-full bg-[#4600F2] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.9px] text-white/65 font-['Inter:Bold',sans-serif]">
              Syndicating to 6 platforms
            </span>
          </div>
          <div
            className="flex items-center gap-[4px]"
            style={{ opacity: 0, animation: `synAllLive ${DUR} ease-out 3.55s infinite` }}
          >
            <span className="size-[5px] rounded-full bg-[#10B981]" />
            <span className="text-[9px] font-bold text-[#10B981] font-['Inter:Bold',sans-serif]">
              All live
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Smart Campaigns overlay carousel ───────────────────────────────────────
// A studio-grade car listing with 3 promotional overlay types cycling like a
// carousel: Promo Overlay → Aged Inventory Push → Dealer Services Billboard.
const SMART_CAMPAIGNS_CSS = `
@keyframes scO1 {
  0%    { opacity: 0; transform: translateX(14px); }
  6%    { opacity: 1; transform: translateX(0); }
  27%   { opacity: 1; transform: translateX(0); }
  33%   { opacity: 0; transform: translateX(-14px); }
  33.1% { opacity: 0; transform: translateX(14px); }
  100%  { opacity: 0; transform: translateX(14px); }
}
@keyframes scO2 {
  0%    { opacity: 0; transform: translateX(14px); }
  33%   { opacity: 0; transform: translateX(14px); }
  39%   { opacity: 1; transform: translateX(0); }
  60%   { opacity: 1; transform: translateX(0); }
  66%   { opacity: 0; transform: translateX(-14px); }
  66.1% { opacity: 0; transform: translateX(14px); }
  100%  { opacity: 0; transform: translateX(14px); }
}
@keyframes scO3 {
  0%    { opacity: 0; transform: translateX(14px); }
  66%   { opacity: 0; transform: translateX(14px); }
  72%   { opacity: 1; transform: translateX(0); }
  93%   { opacity: 1; transform: translateX(0); }
  99%   { opacity: 0; transform: translateX(-14px); }
  100%  { opacity: 0; transform: translateX(14px); }
}
@keyframes scDot1 {
  0%, 33%, 100% { opacity: 0.3; transform: scale(1); }
  6%, 27%       { opacity: 1;   transform: scale(1.4); }
}
@keyframes scDot2 {
  0%, 100%  { opacity: 0.3; transform: scale(1); }
  39%, 60%  { opacity: 1;   transform: scale(1.4); }
}
@keyframes scDot3 {
  0%, 100%  { opacity: 0.3; transform: scale(1); }
  72%, 93%  { opacity: 1;   transform: scale(1.4); }
}
`;

function SmartCampaignsHero() {
  const DUR = "9s";
  return (
    <>
      <style>{SMART_CAMPAIGNS_CSS}</style>
      <div
        className="relative w-full overflow-hidden rounded-[14px] border border-black/8 bg-[#111318]"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Base: studio-grade car listing */}
        <img
          src={imgCgiTransformed}
          alt="Car listing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

        {/* ── OVERLAY 1: Promotional Offer ── */}
        <div
          className="absolute inset-0"
          style={{ animation: `scO1 ${DUR} ease-in-out infinite` }}
        >
          <div
            className="absolute top-[10px] right-[10px] px-[9px] py-[4px] rounded-[7px] text-[9px] font-bold text-white uppercase tracking-[0.6px] font-['Inter:Bold',sans-serif]"
            style={{ background: "linear-gradient(135deg,#DC2626,#EF4444)", boxShadow: "0 3px 10px rgba(220,38,38,0.5)" }}
          >
            Special Offer
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-[12px] py-[10px] flex items-center justify-between">
            <span className="text-white text-[11px] font-semibold font-['Inter:Semi_Bold',sans-serif]">Finance from $299/mo</span>
            <span className="text-[10px] text-white/65 font-['Inter:Regular',sans-serif]">0% APR available</span>
          </div>
          <div
            className="absolute bottom-[10px] left-[10px] px-[7px] py-[2px] rounded-[4px] text-[8px] font-bold text-white/80 uppercase tracking-[0.8px] font-['Inter:Bold',sans-serif]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            Promo Overlay
          </div>
        </div>

        {/* ── OVERLAY 2: Aged Inventory Push ── */}
        <div
          className="absolute inset-0"
          style={{ animation: `scO2 ${DUR} ease-in-out infinite` }}
        >
          <div
            className="absolute top-[10px] right-[10px] flex items-center gap-[5px] px-[9px] py-[4px] rounded-[7px] text-[9px] font-bold text-white uppercase tracking-[0.6px] font-['Inter:Bold',sans-serif]"
            style={{ background: "rgba(245,158,11,0.92)", boxShadow: "0 3px 10px rgba(245,158,11,0.45)" }}
          >
            <span>38 Days on Lot</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-[12px] py-[10px] flex items-center justify-between">
            <span className="text-white text-[11px] font-semibold font-['Inter:Semi_Bold',sans-serif]">Price reduced $1,200</span>
            <span
              className="px-[7px] py-[3px] rounded-[5px] text-[9px] font-bold text-white font-['Inter:Bold',sans-serif]"
              style={{ background: "rgba(220,38,38,0.88)" }}
            >
              Act Now
            </span>
          </div>
          <div
            className="absolute bottom-[10px] left-[10px] px-[7px] py-[2px] rounded-[4px] text-[8px] font-bold text-white/80 uppercase tracking-[0.8px] font-['Inter:Bold',sans-serif]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            Aged Inventory
          </div>
        </div>

        {/* ── OVERLAY 3: Dealer Services Billboard ── */}
        <div
          className="absolute inset-0"
          style={{ animation: `scO3 ${DUR} ease-in-out infinite` }}
        >
          <div
            className="absolute top-[10px] right-[10px] px-[9px] py-[4px] rounded-[7px] text-[9px] font-bold text-white uppercase tracking-[0.6px] font-['Inter:Bold',sans-serif]"
            style={{ background: "rgba(16,185,129,0.92)", boxShadow: "0 3px 10px rgba(16,185,129,0.45)" }}
          >
            Certified Pre-Owned
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-[12px] py-[10px] flex items-center gap-[6px]">
            {["Free Delivery", "2-Year Warranty", "Remote Buying"].map((t, i) => (
              <span key={i} className="flex items-center gap-[6px]">
                {i > 0 && <span className="size-[3px] rounded-full bg-white/40" />}
                <span className="text-white text-[11px] font-semibold font-['Inter:Semi_Bold',sans-serif]">{t}</span>
              </span>
            ))}
          </div>
          <div
            className="absolute bottom-[10px] left-[10px] px-[7px] py-[2px] rounded-[4px] text-[8px] font-bold text-white/80 uppercase tracking-[0.8px] font-['Inter:Bold',sans-serif]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            Billboard
          </div>
        </div>

        {/* Always-visible: Active Campaign badge top-left */}
        <div className="absolute top-[10px] left-[10px] flex items-center gap-[5px] px-[8px] py-[4px] rounded-[6px] bg-black/60 backdrop-blur-sm">
          <span className="size-[5px] rounded-full bg-[#DC2626] animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8px] text-white font-['Inter:Bold',sans-serif]">
            Active Campaign
          </span>
        </div>

        {/* Carousel indicator dots */}
        <div className="absolute top-[10px] right-[10px] flex gap-[4px]" style={{ marginTop: 32 }}>
          {([`scDot1`, `scDot2`, `scDot3`] as const).map((anim, i) => (
            <span
              key={i}
              className="size-[5px] rounded-full bg-white"
              style={{ animation: `${anim} ${DUR} ease-in-out infinite` }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Raw scan animation ───────────────────────────────────────────────────────
// CSS keyframes injected once — simulates a Studio AI scan pass:
// a glowing magenta line sweeps left→right, revealing the studio output.
const RAW_SCAN_CSS = `
@keyframes studioReveal {
  0%,8%    { clip-path: inset(0 100% 0 0); }
  52%,62%  { clip-path: inset(0 0% 0 0); }
  92%,100% { clip-path: inset(0 100% 0 0); }
}
@keyframes scanLineMove {
  0%,8%    { left: 0%; opacity: 1; }
  52%,62%  { left: 100%; opacity: 0; }
  63%      { left: 0%; opacity: 0; }
  70%,100% { left: 0%; opacity: 1; }
}
@keyframes scanPulse {
  0%,100% { box-shadow: 0 0 8px 3px rgba(233,30,99,0.55), 0 0 22px 6px rgba(233,30,99,0.22); }
  50%     { box-shadow: 0 0 14px 5px rgba(233,30,99,0.85), 0 0 34px 10px rgba(233,30,99,0.42); }
}
`;

function RawScanHero() {
  return (
    <>
      <style>{RAW_SCAN_CSS}</style>
      <div
        className="relative w-full overflow-hidden rounded-[14px] border border-black/8 bg-[#0d0d0d]"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Base layer: raw lot photo */}
        <img
          src={imgRawExterior}
          alt="Raw lot photo"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Reveal layer: studio output, unmasked by scan line */}
        <div
          className="absolute inset-0"
          style={{ animation: "studioReveal 4s cubic-bezier(0.45,0,0.55,1) 1.2s infinite" }}
        >
          <img
            src={imgStudioExterior}
            alt="Studio output"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Glowing scan line */}
        <div
          className="absolute inset-y-0 w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #E91E63 18%, #FF5C9A 50%, #E91E63 82%, transparent 100%)",
            animation:
              "scanLineMove 4s cubic-bezier(0.45,0,0.55,1) 1.2s infinite, scanPulse 1.1s ease-in-out infinite",
          }}
        />

        {/* Bottom labels */}
        <div className="absolute bottom-[10px] left-[10px] flex items-center gap-[5px] px-[8px] py-[4px] rounded-[6px] bg-black/60 backdrop-blur-sm">
          <span className="size-[5px] rounded-full bg-[#9CA3AF]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8px] text-[#D1D5DB] font-['Inter:Bold',sans-serif]">
            Raw lot photo
          </span>
        </div>
        <div
          className="absolute bottom-[10px] right-[10px] flex items-center gap-[5px] px-[8px] py-[4px] rounded-[6px]"
          style={{ background: "rgba(233,30,99,0.82)", backdropFilter: "blur(4px)" }}
        >
          <span className="size-[5px] rounded-full bg-white" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8px] text-white font-['Inter:Bold',sans-serif]">
            Studio AI output
          </span>
        </div>

        {/* Top-right Studio AI badge */}
        <div
          className="absolute top-[10px] right-[10px] px-[10px] py-[5px] rounded-[8px] text-[11px] font-bold text-white font-['Inter:Bold',sans-serif]"
          style={{
            background: "linear-gradient(90deg, #FF5C9A 0%, #B651D7 100%)",
            boxShadow: "0 4px 14px rgba(182,81,215,0.45)",
          }}
        >
          Studio AI
        </div>

        {/* Top-left scanning indicator */}
        <div className="absolute top-[10px] left-[10px] flex items-center gap-[5px] px-[8px] py-[4px] rounded-[6px] bg-black/60 backdrop-blur-sm">
          <span className="size-[5px] rounded-full bg-[#E91E63] animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.8px] text-white font-['Inter:Bold',sans-serif]">
            Scanning
          </span>
        </div>
      </div>
    </>
  );
}

// ─── Pitch content ─────────────────────────────────────────────────────────────
const PITCHES: Record<BucketKey, PitchContent> = {
  raw: {
    accent: "#E91E63",
    step: "Step 01 · Studio AI · Smart Shoot",
    product: "Smart Shoot",
    punchline: "List faster with listings that convert.",
    tagline: "Turns any smartphone into a full studio, creating interactive listings with studio-grade images, car tours and video tours.",
    problem:
      "Raw lot photos have mixed backgrounds, patchy lighting, and no 360 or video. Buyers scroll past listings that look like they were shot in a hurry.",
    problemChips: [
      "Photography Costs",
      "Low Converting Media",
      "Inconsistent VDPs",
    ],
    solutionSection: {
      title: "The Solution",
      boxes: [
        {
          icon: <Smartphone size={14} strokeWidth={2} />,
          label: "Guided App Shoots",
          body: "Staff shoot with the Studio AI app, cutting out photography spend",
        },
        {
          icon: <Monitor size={14} strokeWidth={2} />,
          label: "Interactive VDPs",
          body: "Creates studio-quality visuals that drive higher VDP engagement",
        },
        {
          icon: <Palette size={14} strokeWidth={2} />,
          label: "Dealer Branding",
          body: "Applies consistent branded environments across your inventory",
        },
      ],
    },
    bullets: [
      "Open app on any phone",
      "Shoot with guided overlays",
      "Pick your backdrop",
      "Go live same day",
    ],
    bulletStyle: "nodes",
    heroNode: <RawScanHero />,
    actionLabel: "Process all 89",
  },
  nophoto: {
    accent: "#7F6AF2",
    step: "Step 02 · Studio AI · Smart Match",
    product: "SmartMatch",
    punchline: "Capture demand from Day 0",
    tagline: "Publish studio-grade listings the moment you acquire a vehicle, before it even arrives on lot.",
    problem:
      "The vehicle is acquired but the shoot is pending or it has not hit your lot yet. Every day your listing sits dark, buyers are clicking the competition while holding cost eats at your margin.",
    problemChips: [
      "Pre-Arrival Gap",
      "Shoot Delays",
      "Repetitive Merch Costs",
    ],
    solutionSection: {
      title: "The Solution",
      boxes: [
        {
          icon: <Search size={14} strokeWidth={2} />,
          label: "Smart VIN Match",
          body: "Matched by spec and color, cloning studio assets automatically",
        },
        {
          icon: <Rocket size={14} strokeWidth={2} />,
          label: "Instant TTM",
          body: "Publishes in seconds, capturing demand from day of acquisition",
        },
        {
          icon: <Building2 size={14} strokeWidth={2} />,
          label: "Group Asset Library",
          body: "Assets shot once are shared instantly across every rooftop",
        },
      ],
    },
    bullets: [
      "New car acquired",
      "Enter VIN or import from IMS",
      "Matching VIN found",
      "Go live with studio grade assets",
    ],
    bulletStyle: "nodes",
    heroNode: <SmartMatchScanHero />,
    actionLabel: "Run SmartMatch",
  },
  cgi: {
    accent: "#7C3AED",
    step: "Step 03 · Studio AI · Smart Match",
    product: "SmartMatch",
    punchline: "Real images. Consistent listings.",
    tagline: "SmartMatch finds VIN-matched real vehicle assets so every listing goes live with authentic, consistent images across VDP and VLP.",
    problem:
      "Stock images on your VDPs are hurting your dealership brand. Inconsistent backgrounds, watermarks, and non-standard crops across listings reduce buyer trust and suppress VDP clicks.",
    problemChips: [
      "Inconsistent VDPs",
      "OEM Stock Images",
      "Low Marketplace CTR",
    ],
    solutionSection: {
      title: "The Solution",
      boxes: [
        {
          icon: <Layers size={14} strokeWidth={2} />,
          label: "Real VIN-Matched Assets",
          body: "Finds real images by VIN match, replacing stock photos instantly",
        },
        {
          icon: <Globe size={14} strokeWidth={2} />,
          label: "Consistent VDP and VLP",
          body: "Ensures VDP and VLP show the same real images consistently",
        },
        {
          icon: <Sparkles size={14} strokeWidth={2} />,
          label: "Higher Buyer Trust",
          body: "Real photos outperform stock, driving engagement and more VDP clicks",
        },
      ],
    },
    bullets: [
      "Stock photo detected",
      "SmartMatch searches by VIN",
      "Real vehicle assets found",
      "Go live with real images",
    ],
    bulletStyle: "nodes",
    heroNode: <StockPhotoGridHero />,
    comparison: {
      beforeLabel: "Standard processed",
      afterLabel: "CGI-grade render",
      before: <img src={imgCgiFront} alt="Standard processed front" className="w-full h-full object-cover" />,
      after:  <img src={imgCgiTransformed} alt="CGI-grade front" className="w-full h-full object-cover" />,
    },
    actionLabel: "Replace stock photos",
  },
  unsyndicated: {
    accent: "#4600F2",
    step: "Step 04 · Studio AI · Syndication",
    product: "Syndication",
    punchline: "Every channel, one click.",
    tagline: "One action publishes your studio-grade inventory to every marketplace, auto-formatted and ready to go live at any scale.",
    problem:
      "Your vehicles are listing-ready but visibility stops at your website. Buyers searching AutoTrader, Cars.com, and KBB never see them. Every day a car sits off-marketplace is another day holding cost compounds with zero buyer reach.",
    problemChips: [
      "Zero Off-Site Visibility",
      "Manual Publishing",
      "Vendor Bottlenecks",
    ],
    solutionSection: {
      title: "The Solution",
      boxes: [
        {
          icon: <Globe size={14} strokeWidth={2} />,
          label: "Instant Multi-Platform Reach",
          body: "Publishes across popular marketplaces and social channels with one click",
        },
        {
          icon: <Wand2 size={14} strokeWidth={2} />,
          label: "Multi-Format Automation",
          body: "Auto-generates the right format, specs and limits per marketplace",
        },
        {
          icon: <Send size={14} strokeWidth={2} />,
          label: "Unlimited Throughput",
          body: "No vendor bottlenecks, publish your full inventory at any scale",
        },
      ],
    },
    bullets: [
      "Select listings to syndicate",
      "Pick your marketplaces",
      "One-click publish",
      "Track listing health",
    ],
    bulletStyle: "nodes",
    heroNode: <SyndicationHero />,
    actionLabel: "Publish all 156",
  },
  aging: {
    accent: "#DC2626",
    step: "Step 05 · Studio AI · Smart Campaigns",
    product: "Smart Campaigns",
    punchline: "Right offer. Right car. Right time.",
    tagline: "Run visual promotions like an expert marketing team would, automatically across every listing in your inventory.",
    problem:
      "Dealership campaigns are fragmented, manual, and easy to miss. Promotions expire unnoticed, aged inventory looks identical to fresh arrivals, and every deal becomes a price negotiation when your value goes unseen.",
    problemChips: [
      "Manual Promotions",
      "Aged Inventory Invisible",
      "Competing on Price Alone",
    ],
    solutionSection: {
      title: "The Solution",
      boxes: [
        {
          icon: <Sparkles size={14} strokeWidth={2} />,
          label: "Automated Visual Promotions",
          body: "Applies overlays and dynamic text to your inventory automatically",
        },
        {
          icon: <Timer size={14} strokeWidth={2} />,
          label: "Aged Inventory Targeting",
          body: "Identifies listings past 30 days and applies a visual urgency push automatically",
        },
        {
          icon: <Building2 size={14} strokeWidth={2} />,
          label: "Dynamic Offer Overlays",
          body: "Shows your full value upfront before a buyer reaches the price",
        },
      ],
    },
    bullets: [
      "Set up your creatives",
      "Build campaign rules",
      "Preview per VIN",
      "Launch and run automatically",
    ],
    bulletStyle: "nodes",
    heroNode: <SmartCampaignsHero />,
    features: [
      { icon: <Sparkles size={16} strokeWidth={2.2} />,  title: "Targeted Audiences", tagline: "In-market shoppers, auto-segmented.", accent: "#DC2626" },
      { icon: <Timer size={16} strokeWidth={2.2} />,     title: "Holding-Cost ROI",   tagline: "$/day math on every campaign run.", accent: "#F59E0B" },
      { icon: <Building2 size={16} strokeWidth={2.2} />, title: "Group-Wide",         tagline: "Roll the same campaign across lots.", accent: "#4600F2" },
    ],
    featuresPhase: "pitch",
    actionLabel: "Launch campaigns",
  },
};

type Scene = "connect" | "loading" | "scanning" | "dashboard";

interface VehicleState extends Row {
  initialBuckets: BucketKey[];
  /**
   * The bucket this vehicle was just resolved from, if any.
   * Keeps the row visible under the same bucket filter after its state has
   * changed — otherwise the post-transform list goes empty as vehicles cascade
   * into their next bucket.
   */
  lastResolvedFromBucket?: BucketKey;
}

// KPI lookup — index = number of resolved buckets (now 5 buckets, 6 steps)
const DTF_BY_STEP   = [14,  12,  10,  8,    6,    5];
// Inventory Score is on a 0-10 scale (rendered as a half-donut gauge)
const SCORE_BY_STEP = [4.2, 5.3, 6.4, 7.5,  8.4,  9.1];
// Cumulative holding-cost savings unlocked as each bucket resolves. Numbers
// roughly correspond to (DTF days saved × hold-cost $/day × inventory volume).
const HOLDING_COST_BY_STEP = [52_500, 48_200, 43_600, 37_300, 27_900, 10_000];

/** Holding-cost reduction unlocked when bucket `step` (1-based) resolves. */
function holdingCostSavedAtStep(step: number): number {
  if (step <= 0 || step >= HOLDING_COST_BY_STEP.length) return 0;
  return HOLDING_COST_BY_STEP[step - 1] - HOLDING_COST_BY_STEP[step];
}

const BUCKET_TOTALS: Record<BucketKey, number> = {
  raw: 89,
  nophoto: 23,
  cgi: 134,
  unsyndicated: 156,
  aging: 34,
};

// ─── Seed inventory ──────────────────────────────────────────────────────────
// 19 vehicles — new-vehicle inventory (2024/2025 model year). Bucket membership
// is derived from per-vehicle flags via computeBucket() below.
const SEED: VehicleState[] = [
  // ── Raw bucket (10) ──
  ...rawSeed(1,  "2025 Honda CR-V EX-L",            "STK-4012", "VIN5FJRW1H8XPL", "$36,500"),
  ...rawSeed(2,  "2025 Toyota RAV4 XLE Premium",    "STK-4015", "VIN2T3W1RFV0SC", "$34,900"),
  ...rawSeed(3,  "2024 Hyundai Tucson SEL",         "STK-4017", "VIN5NMJBCAE7RH", "$31,200"),
  ...rawSeed(4,  "2025 Mazda CX-5 Carbon Turbo",    "STK-4019", "VINJM3KFBCM9R0", "$37,800"),
  ...rawSeed(5,  "2025 Subaru Forester Sport",      "STK-4022", "VIN4S4BTGND1S3", "$33,600"),
  ...rawSeed(30, "2025 Honda Civic Sport Touring",  "STK-4023", "VIN2HGFE2F50RH", "$28,400"),
  ...rawSeed(31, "2025 Toyota Camry SE Hybrid",     "STK-4024", "VIN4T1B11HK1SU", "$29,950"),
  ...rawSeed(32, "2024 Hyundai Elantra N Line",     "STK-4025", "VINKMHLM4AG7RU", "$26,800"),
  ...rawSeed(33, "2025 Kia Telluride EX",           "STK-4026", "VIN5XYP3DHC7SG", "$44,500"),
  ...rawSeed(34, "2025 Ford Edge ST-Line",          "STK-4027", "VIN2FMPK4J96RB", "$41,200"),

  // ── No-photo bucket (10): mostly pure, 4 also aging ──
  ...noPhotoSeed(6,  "2025 Nissan Rogue SV",        "STK-4031", "VIN5N1AT3CBXSC", "$32,400", false),
  ...noPhotoSeed(7,  "2024 Volkswagen Tiguan SE",   "STK-4034", "VIN3VV2B7AX7RM", "$30,900", false),
  ...noPhotoSeed(8,  "2024 Kia Sportage X-Line",    "STK-3955", "VIN5XYK3CAF9RG", "$33,100", true),
  ...noPhotoSeed(9,  "2024 Ford Bronco Sport BL",   "STK-3941", "VIN3FMCR9C66RR", "$34,800", true),
  ...noPhotoSeed(35, "2025 Chevrolet Trax LT",      "STK-4035", "VINKL77LJE26SB", "$24,300", false),
  ...noPhotoSeed(36, "2025 Subaru Crosstrek Sport", "STK-4036", "VIN4S4GUHF67S3", "$31,750", false),
  ...noPhotoSeed(37, "2024 Jeep Wrangler Sahara",   "STK-3942", "VIN1C4HJXEG2RW", "$42,950", true),
  ...noPhotoSeed(38, "2024 Toyota 4Runner TRD",     "STK-3950", "VINJTEBU5JR8RX", "$48,600", true),
  ...noPhotoSeed(39, "2025 Mazda CX-30 Turbo",      "STK-4038", "VIN3MVDMBCM8SM", "$33,900", false),
  ...noPhotoSeed(40, "2025 Volkswagen Atlas SEL",   "STK-4039", "VIN1V2BR2CA6SC", "$45,800", false),

  // ── CGI bucket (10) — premium inventory worth elevating to CGI-grade ──
  ...cgiSeed(20, "2025 BMW X5 xDrive40i",           "STK-4060", "VIN5UXCR6C04PL", "$67,400"),
  ...cgiSeed(21, "2025 Mercedes-Benz GLE 350",      "STK-4063", "VIN4JGFB4FB4SA", "$72,900"),
  ...cgiSeed(22, "2025 Audi Q5 Premium Plus",       "STK-4066", "VINWA1BAAFY8R2", "$58,500"),
  ...cgiSeed(23, "2025 Lexus RX 350 Luxury",        "STK-4069", "VIN2T2BAMCA3SC", "$63,200"),
  ...cgiSeed(41, "2025 Cadillac XT5 Premium",       "STK-4071", "VIN1GYKNDRS9SZ", "$55,400"),
  ...cgiSeed(42, "2025 Acura MDX A-Spec",           "STK-4073", "VIN5J8YE1H50SL", "$57,800"),
  ...cgiSeed(43, "2025 Volvo XC60 Plus B5",         "STK-4075", "VINYV4L12RK9S1", "$54,950"),
  ...cgiSeed(44, "2025 Genesis GV70 Sport",         "STK-4077", "VINKMUH4DTC9SU", "$61,300"),
  ...cgiSeed(45, "2025 Lincoln Nautilus Reserve",   "STK-4079", "VIN2LMPJ8K94RB", "$59,750"),
  ...cgiSeed(46, "2025 Infiniti QX60 Sensory",      "STK-4081", "VIN5N1DL1FS4SC", "$62,400"),

  // ── Unsyndicated bucket (10) ──
  ...unsynSeed(10, "2025 Chevrolet Equinox RS",     "STK-4040", "VIN3GNAXKEV2SL", "$32,750"),
  ...unsynSeed(11, "2025 GMC Terrain Denali",       "STK-4042", "VIN3GKAL5EX3SL", "$39,500"),
  ...unsynSeed(12, "2025 Jeep Compass Limited",     "STK-4044", "VIN3C4NJDCB7ST", "$33,200"),
  ...unsynSeed(13, "2024 Buick Envista Avenir",     "STK-4047", "VINKL77LFE2XRB", "$31,800"),
  ...unsynSeed(14, "2025 Hyundai Kona N Line",      "STK-4050", "VINKM8K3CAB9SU", "$29,400"),
  ...unsynSeed(47, "2025 Honda Passport TrailSport","STK-4052", "VIN5FNYF8H58SB", "$45,200"),
  ...unsynSeed(48, "2024 Nissan Murano Platinum",   "STK-4054", "VIN5N1AZ2DJ6RC", "$42,900"),
  ...unsynSeed(49, "2025 Kia Sorento X-Pro",        "STK-4056", "VIN5XYRH4LFXSG", "$41,600"),
  ...unsynSeed(50, "2025 Ford Escape ST-Line Plus", "STK-4058", "VIN1FMCU0H66RB", "$36,800"),
  ...unsynSeed(51, "2024 Mazda CX-50 Turbo Premium","STK-4061", "VIN7MMVABDM3RN", "$39,950"),

  // ── Aging bucket (10) — past frontline target, holding cost climbing ──
  ...agingSeed(15, "2024 Ford Explorer Limited",    "STK-3812", "VIN1FM5K8F8XR0", "$44,200", 48, 1180, 56),
  ...agingSeed(16, "2024 Toyota Highlander LE",     "STK-3805", "VIN5TDADAB04RS", "$41,500", 52, 1305, 64),
  ...agingSeed(17, "2024 Honda Pilot Sport",        "STK-3798", "VIN5FNYG2H50RB", "$45,800", 58, 1490, 78),
  ...agingSeed(18, "2024 Nissan Pathfinder SL",     "STK-3791", "VIN5N1DR3BB1RC", "$42,300", 61, 1620, 92),
  ...agingSeed(19, "2024 Mazda CX-90 Preferred",    "STK-3780", "VINJM3KKBHB1R1", "$46,900", 67, 1830, 118),
  ...agingSeed(52, "2024 Chevrolet Traverse LT",    "STK-3760", "VIN1GNERFKW6RJ", "$39,400", 45, 1080, 48),
  ...agingSeed(53, "2024 GMC Acadia Denali",        "STK-3755", "VIN1GKKNVRS6RZ", "$48,750", 53, 1335, 70),
  ...agingSeed(54, "2024 Subaru Ascent Onyx",       "STK-3748", "VIN4S4WMBKD7R3", "$42,100", 56, 1430, 76),
  ...agingSeed(55, "2024 Hyundai Palisade SEL",     "STK-3740", "VINKM8R3DGE2RU", "$43,800", 64, 1745, 105),
  ...agingSeed(56, "2024 Volkswagen Atlas Cross",   "STK-3732", "VIN1V2GE2CA1RC", "$40,600", 71, 1985, 132),
];

function baseRow(id: number, name: string, stk: string, vin: string, price: string): Row {
  return {
    id, name, stk, vin, price,
    date: "26 May '26, 10:30 AM",
    age: 6,
    mediaScore: 0,
    daysToFrontline: 4,
    holdCost: 240,
    marginPct: 28,
    totalMargin: 4200,
  };
}

function rawSeed(id: number, name: string, stk: string, vin: string, price: string): VehicleState[] {
  const r = baseRow(id, name, stk, vin, price);
  return [{ ...r, mediaState: "raw", mediaScore: 4.2, initialBuckets: ["raw"] }];
}

function noPhotoSeed(
  id: number, name: string, stk: string, vin: string, price: string, alsoAging: boolean
): VehicleState[] {
  const r = baseRow(id, name, stk, vin, price);
  if (alsoAging) {
    return [{
      ...r,
      noPhoto: true,
      mediaScore: 0,
      age: 43,
      date: "13 Apr '26, 09:15 AM",
      isLoss: true,
      lossPerDay: 45,
      holdCost: 1085,
      marginPct: 100,
      totalMargin: 1800,
      daysToFrontline: 0,
      initialBuckets: ["nophoto", "aging"],
    }];
  }
  return [{ ...r, noPhoto: true, mediaScore: 0, initialBuckets: ["nophoto"] }];
}

function unsynSeed(id: number, name: string, stk: string, vin: string, price: string): VehicleState[] {
  const r = baseRow(id, name, stk, vin, price);
  return [{ ...r, mediaState: "processed", mediaScore: 8.6, daysToFrontline: 2, initialBuckets: ["unsyndicated"] }];
}

function cgiSeed(id: number, name: string, stk: string, vin: string, price: string): VehicleState[] {
  const r = baseRow(id, name, stk, vin, price);
  // Premium / high-value vehicles already have processed photos but benefit
  // from CGI-grade renders for OEM-tier marketplaces.
  return [{
    ...r,
    mediaState: "processed",
    mediaScore: 8.4,
    daysToFrontline: 3,
    initialBuckets: ["cgi"],
  }];
}

function agingSeed(
  id: number, name: string, stk: string, vin: string, price: string,
  age: number, holdCost: number, lossPerDay: number,
): VehicleState[] {
  const r = baseRow(id, name, stk, vin, price);
  return [{
    ...r,
    age,
    date: ageToDate(age),
    isLoss: true,
    lossPerDay,
    holdCost,
    marginPct: 100,
    totalMargin: 2200,
    mediaScore: 7.4,
    mediaState: "processed",
    daysToFrontline: 0,
    syndicatedTo: ["vincue", "autotrader"],
    publishedAt: new Date(Date.now() - age * 86400000).toISOString(),
    initialBuckets: ["aging"],
  }];
}

function ageToDate(daysAgo: number): string {
  const d = new Date(Date.now() - daysAgo * 86400000);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} '${String(d.getFullYear()).slice(2)}, 09:15 AM`;
}

// Canonical bucket order — also drives the "Next up" CTA suggestion.
const BUCKET_ORDER: BucketKey[] = ["raw", "nophoto", "cgi", "unsyndicated", "aging"];

const NEXT_BUCKET_LABELS: Record<BucketKey, string> = {
  raw:          "Studio AI",
  nophoto:      "Smart Match",
  cgi:          "CGI Upgrade",
  unsyndicated: "Syndication",
  aging:        "Smart Campaigns",
};

// Priority: raw > nophoto > unsyndicated > aging > done
function computeBucket(v: VehicleState): BucketKey | null {
  if (v.mediaState === "raw") return "raw";
  if (v.noPhoto) return "nophoto";
  if (!v.syndicatedTo?.length) return "unsyndicated";
  if (v.isLoss && !v.campaignActive) return "aging";
  return null;
}

// Channels the syndication picker offers — keeps the side panel digestible
// (6 channels) instead of all 11 in PLATFORMS.
const SYND_CHANNEL_IDS = ["vincue", "autotrader", "cars", "kbb-marketplace", "facebook", "instagram"];
const SYND_CHANNELS = PLATFORMS.filter((p) => SYND_CHANNEL_IDS.includes(p.id));
const SYND_PLATFORMS = SYND_CHANNEL_IDS;

// ─── Component ───────────────────────────────────────────────────────────────

interface Demo2Props {
  demoConfig?: DemoConfig;
}

export function Demo2({ demoConfig }: Demo2Props) {
  const [scene, setScene] = useState<Scene>("connect");
  const [imsName, setImsName] = useState(demoConfig?.imsProvider ?? "Vincue");
  const [activeBucket, setActiveBucket] = useState<BucketKey | null>(null);
  const [pitchOpen, setPitchOpen] = useState(false);
  const [runningBucket, setRunningBucket] = useState<BucketKey | null>(null);
  const [transformingIds, setTransformingIds] = useState<Set<number>>(new Set());
  // Syndication flow: pitch CTA opens Demo 1's PublishModal for channel selection
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  // Smart Campaign two-step flow state
  const [campaignSelectionMode, setCampaignSelectionMode] = useState(false);
  const [smartCampaignModalOpen, setSmartCampaignModalOpen] = useState(false);
  const [fabExpanded, setFabExpanded] = useState(true);
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<Set<number>>(new Set());

  const [dashboardView, setDashboardView] = useState<DashboardView>("current");
  // Syndication channel selection — defaults to all available channels.
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(() => new Set(SYND_CHANNEL_IDS));
  const [vehicles, setVehicles] = useState<VehicleState[]>(SEED);
  const [completed, setCompleted] = useState<Record<BucketKey, boolean>>({
    raw: false, nophoto: false, cgi: false, unsyndicated: false, aging: false,
  });

  const completedCount = Object.values(completed).filter(Boolean).length;
  // "Before" view freezes the dashboard at step 0 with no buckets resolved.
  // "Current" view tracks live progress.
  const isBeforeView = dashboardView === "before";
  const effectiveStep = isBeforeView ? 0 : completedCount;
  const dtf = DTF_BY_STEP[effectiveStep];
  const score = SCORE_BY_STEP[effectiveStep];
  const holdingCost = HOLDING_COST_BY_STEP[effectiveStep];
  // Persistent uplift since the previous resolved bucket (used by the KPI bar
  // to show e.g. "+2 days saved" / "+1.1" next to the current value).
  // In Before view we suppress uplifts since there's no preceding step.
  const prevDtf        = !isBeforeView && completedCount > 0 ? DTF_BY_STEP[completedCount - 1]          : null;
  const prevScore      = !isBeforeView && completedCount > 0 ? SCORE_BY_STEP[completedCount - 1]        : null;
  const prevHoldingCost = !isBeforeView && completedCount > 0 ? HOLDING_COST_BY_STEP[completedCount - 1] : null;
  const dtfUplift          = prevDtf          != null ? prevDtf - dtf : 0;
  const scoreUplift        = prevScore        != null ? score - prevScore : 0;
  const holdingCostDrop    = prevHoldingCost  != null ? prevHoldingCost - holdingCost : 0;

  const buckets: Record<BucketKey, BucketState> = useMemo(() => ({
    raw:          { count: BUCKET_TOTALS.raw,          completed: isBeforeView ? false : completed.raw },
    nophoto:      { count: BUCKET_TOTALS.nophoto,      completed: isBeforeView ? false : completed.nophoto },
    cgi:          { count: BUCKET_TOTALS.cgi,          completed: isBeforeView ? false : completed.cgi },
    unsyndicated: { count: BUCKET_TOTALS.unsyndicated, completed: isBeforeView ? false : completed.unsyndicated },
    aging:        { count: BUCKET_TOTALS.aging,        completed: isBeforeView ? false : completed.aging },
  }), [completed, isBeforeView]);

  // Before view freezes vehicle state to the SEED (no transformations applied);
  // Current view uses the live `vehicles` state that mutates as buckets resolve.
  const visibleVehicles = isBeforeView ? SEED : vehicles;
  const visibleRows: Row[] = useMemo(() => {
    if (!activeBucket) return visibleVehicles;
    return visibleVehicles.filter((v) => v.initialBuckets.includes(activeBucket));
  }, [visibleVehicles, activeBucket]);

  // Selecting a filter no longer tints the rows — the table stays white. Row
  // colour is reserved for the transformation animation (purple shimmer) only.
  const highlightIds = useMemo(() => new Set<number>(), []);

  // ─── Scene 1: Connect → Loading → Scanning ──
  // pick an IMS → inventory fetch/sync animation → live scan → dashboard.
  const handleImport = useCallback((name: string) => {
    setImsName(name);
    setScene("loading");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setScene("scanning");
  }, []);

  const handleScanComplete = useCallback(() => {
    // Fresh dashboard entry — clear any pitch/filter state left from a prior run or HMR.
    setActiveBucket(null);
    setPitchOpen(false);
    setScene("dashboard");
  }, []);

  // ─── Bucket click → filter + open pitch (no transformation yet) ──
  const handleBucketClick = useCallback((b: BucketKey) => {
    setActiveBucket((prev) => prev === b ? prev : b);
    setPitchOpen(true);
  }, []);

  const handleClearBucket = useCallback(() => {
    setActiveBucket(null);
    setPitchOpen(false);
  }, []);

  // ─── Run the actual transformation animation on the affected rows ──
  // Used by both the FAB's Transform button and (for aging) the Create-Campaign FAB.
  const runTransform = useCallback((bucket: BucketKey, options?: { platforms?: string[] }) => {
    if (runningBucket || completed[bucket]) return;
    // Snapshot which vehicle IDs will be touched so the row shimmer targets them
    const targetIds = new Set(
      vehicles.filter((v) => v.initialBuckets.includes(bucket)).map((v) => v.id)
    );
    if (targetIds.size === 0) {
      // Nothing visible to transform — still mark the bucket resolved + tick KPI
      setCompleted((c) => ({ ...c, [bucket]: true }));
      return;
    }
    setRunningBucket(bucket);
    setTransformingIds(targetIds);
    // Focus the list on the bucket so the AE sees the rows in motion
    setActiveBucket(bucket);

    // 1.6s shimmer pass → then apply state + clear the running flag
    setTimeout(() => {
      setVehicles((vs) => vs.map((v) => applyAction(v, bucket, options)));
      setCompleted((c) => ({ ...c, [bucket]: true }));
      setTransformingIds(new Set());
      setRunningBucket(null);
    }, 1600);
  }, [vehicles, runningBucket, completed]);

  // From the SmartCampaign pitch CTA → close pitch, minimise the Need Actions
  // FAB, auto-select all aging vehicles, and surface the SelectionActionBar so
  // the AE can act on the cohort just like Demo 1's >40-day flow.
  const handleAgingPitchContinue = useCallback(() => {
    setPitchOpen(false);
    setFabExpanded(false);
    const agingIds = new Set(
      vehicles.filter((v) => v.initialBuckets.includes("aging")).map((v) => v.id)
    );
    setSelectedVehicleIds(agingIds);
    setCampaignSelectionMode(true);
    setActiveBucket("aging"); // filter the list to aging too
  }, [vehicles]);

  const handleToggleSelect = useCallback((id: number) => {
    setSelectedVehicleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleCloseSelectionBar = useCallback(() => {
    setCampaignSelectionMode(false);
    setSelectedVehicleIds(new Set());
  }, []);

  // From SmartCampaignModal "pick a template" → fire the actual transform
  const handleCampaignPick = useCallback(() => {
    setSmartCampaignModalOpen(false);
    setCampaignSelectionMode(false);
    setSelectedVehicleIds(new Set());
    runTransform("aging");
  }, [runTransform]);

  const scanBenchmarks = demoConfig
    ? {
        daysToFrontline: calcOpportunity(demoConfig).currentDaysToFrontline,
        holdingCostPerDay: demoConfig.holdingCostPerDay,
      }
    : undefined;

  if (scene === "connect") {
    return (
      <div className="size-full">
        <IMSImportScreen
          onImport={handleImport}
          initialImsId={demoConfig?.imsProvider}
          dealershipName={demoConfig?.dealershipName}
          demoConfig={demoConfig}
        />
      </div>
    );
  }
  if (scene === "loading") {
    return (
      <div className="size-full overflow-auto">
        <LoadingScreen onComplete={handleLoadingComplete} imsName={imsName} />
      </div>
    );
  }
  if (scene === "scanning") {
    return (
      <div className="size-full overflow-auto">
        <ScanningScreen
          imsName={imsName}
          benchmarks={scanBenchmarks}
          snapshotOnly
          onFinish={handleScanComplete}
        />
      </div>
    );
  }

  const pitchContent = activeBucket ? PITCHES[activeBucket] : null;
  const isAgingPitch = activeBucket === "aging";
  const isActiveCompleted = activeBucket ? completed[activeBucket] : false;
  // First bucket in canonical order that hasn't been resolved yet (excluding the
  // current bucket itself — so after resolving raw, "next" is nophoto, not raw).
  const nextBucket = BUCKET_ORDER.find((k) => k !== activeBucket && !completed[k]) ?? null;

  return (
    <div className="size-full">
      <Demo2Dashboard
        dtf={dtf}
        score={score}
        holdingCost={holdingCost}
        dtfUplift={dtfUplift}
        scoreUplift={scoreUplift}
        holdingCostDrop={holdingCostDrop}
        buckets={buckets}
        activeBucket={activeBucket}
        onBucketClick={handleBucketClick}
        onClearBucket={handleClearBucket}
        rows={visibleRows}
        highlightIds={highlightIds}
        transformingIds={transformingIds}
        selectedIds={selectedVehicleIds}
        onToggleSelect={handleToggleSelect}
      />

      <InventoryDiagnosticFab
        buckets={buckets}
        activeBucket={activeBucket}
        onBucketClick={handleBucketClick}
        expanded={fabExpanded}
        onExpandedChange={setFabExpanded}
      />

      <BeforeAfterToggle active={dashboardView} onChange={setDashboardView} />

      {/* Selection action bar — surfaces during the Smart Campaign flow */}
      <SelectionActionBar
        open={campaignSelectionMode && selectedVehicleIds.size > 0}
        count={selectedVehicleIds.size}
        onClose={handleCloseSelectionBar}
        onSmartCampaign={() => setSmartCampaignModalOpen(true)}
        onExport={() => { /* AE narration only */ }}
        onDownload={() => { /* AE narration only */ }}
        skipDeck
      />

      {/* "Where do you want to publish?" — Demo 1's PublishModal */}
      <PublishModal
        open={publishModalOpen}
        totalListings={BUCKET_TOTALS.unsyndicated}
        onClose={() => setPublishModalOpen(false)}
        onPublish={(ids) => {
          setPublishModalOpen(false);
          runTransform("unsyndicated", { platforms: ids });
        }}
      />

      {/* Suggested campaign templates — reuses Demo 1's modal */}
      <SmartCampaignModal
        open={smartCampaignModalOpen}
        selectedCount={selectedVehicleIds.size}
        onClose={() => setSmartCampaignModalOpen(false)}
        onPick={handleCampaignPick}
      />

      {pitchContent && (() => {
        const isSyndication = activeBucket === "unsyndicated";

        // ── Success banner data ──────────────────────────────────────────
        // When the active bucket has been resolved, compute the lift it gave —
        // the deltas between its step and the step before it.
        const bucketStep = activeBucket ? BUCKET_ORDER.indexOf(activeBucket) + 1 : 0;
        const dtfSaved     = DTF_BY_STEP[bucketStep - 1] - DTF_BY_STEP[bucketStep];
        const savedDollars = holdingCostSavedAtStep(bucketStep);
        const successForActive = (activeBucket && completed[activeBucket] && bucketStep > 0) ? {
          dtfSaved,
          scoreGained: SCORE_BY_STEP[bucketStep] - SCORE_BY_STEP[bucketStep - 1],
          scoreBefore: SCORE_BY_STEP[bucketStep - 1],
          scoreAfter: SCORE_BY_STEP[bucketStep],
          savedDollars,
          // Studio AI (raw): custom headline + 4 chips that speak to the product value prop.
          // Step 1 does not affect days-to-frontline, so that chip is excluded.
          ...(activeBucket === "raw" ? {
            title:    `${BUCKET_TOTALS.raw} raw listings, now studio grade.`,
            subtitle: "Studio AI turned parking-lot shots into professional, buyer-ready media across your full inventory.",
            chips: [
              { delta: `${BUCKET_TOTALS.raw}`,                             label: "Listings upgraded"    },
              { delta: "+34%",                                              label: "VDP views uplift"     },
              { delta: `+${(SCORE_BY_STEP[bucketStep] - SCORE_BY_STEP[bucketStep - 1]).toFixed(1)}`,
                                                                            label: "Inventory score"      },
              { delta: `+$${savedDollars.toLocaleString()}`,               label: "Holding cost saved"   },
            ],
          } : {}),
          ...(activeBucket === "nophoto" ? {
            title:    `${BUCKET_TOTALS.nophoto} vehicles matched and live.`,
            subtitle: "SmartMatch filled every eligible listing before a camera touched them.",
            chips: [
              { delta: `${BUCKET_TOTALS.nophoto}`,                          label: "Vehicles matched"     },
              { delta: "0 → 4 min",                                         label: "Time to live"         },
              { delta: `+${(SCORE_BY_STEP[bucketStep] - SCORE_BY_STEP[bucketStep - 1]).toFixed(1)}`,
                                                                            label: "Inventory score"      },
              { delta: `+$${savedDollars.toLocaleString()}`,               label: "Holding cost saved"   },
            ],
          } : {}),
          ...(activeBucket === "aging" ? {
            title:    `${BUCKET_TOTALS.aging} aged units. Campaigns active.`,
            subtitle: "Smart Campaigns applied visual promotions across your 45-day inventory. Targeted shoppers are now seeing your cars.",
            chips: [
              { delta: `${BUCKET_TOTALS.aging}`,                            label: "Units promoted"       },
              { delta: "+40%",                                               label: "VDP views uplift"     },
              { delta: "-17d",                                               label: "Avg. days on lot"     },
              { delta: `+$${savedDollars.toLocaleString()}`,               label: "Margin recovered"     },
            ],
          } : {}),
        } : undefined;

        // Resolve which CTA the pitch should currently show
        let label: string;
        let onAction: () => void;
        if (isActiveCompleted) {
          if (nextBucket) {
            label = `Next up: ${NEXT_BUCKET_LABELS[nextBucket]}`;
            onAction = () => { setActiveBucket(nextBucket); setPitchOpen(true); };
          } else {
            label = "Inventory is sale-ready — close";
            onAction = () => setPitchOpen(false);
          }
        } else if (isAgingPitch) {
          label = "Continue to campaign builder";
          onAction = handleAgingPitchContinue;
        } else if (isSyndication) {
          // Clicking Syndicate opens Demo 1's PublishModal — the proper
          // "where do you want to publish?" picker, not inline in the pitch.
          label = pitchContent.actionLabel;
          onAction = () => setPublishModalOpen(true);
        } else {
          label = pitchContent.actionLabel;
          onAction = () => runTransform(activeBucket!);
        }

        return (
          <PitchPanel
            open={pitchOpen}
            onClose={() => setPitchOpen(false)}
            onAction={onAction}
            actionRunning={runningBucket === activeBucket}
            completed={false}
            {...pitchContent}
            success={successForActive}
            actionLabel={label}
            demoConfig={demoConfig}
            completedSteps={completedCount}
            metricsStep={activeBucket ?? undefined}
          />
        );
      })()}
    </div>
  );
}

// ─── Action transitions ──────────────────────────────────────────────────────
// Gate by initialBuckets — the cohort a vehicle was diagnosed into doesn't
// change, even as its state migrates through transformations.
function applyAction(
  v: VehicleState, bucket: BucketKey, options?: { platforms?: string[] }
): VehicleState {
  if (!v.initialBuckets.includes(bucket)) return v;

  const stamp = { lastResolvedFromBucket: bucket };
  switch (bucket) {
    case "raw":
      return { ...v, ...stamp, mediaState: "processed", mediaScore: 9.1, daysToFrontline: 2 };
    case "nophoto":
      return {
        ...v,
        ...stamp,
        noPhoto: false,
        smartMatched: true,
        mediaState: "processed",
        mediaScore: 8.8,
        daysToFrontline: v.isLoss ? 0 : 2,
      };
    case "cgi":
      return {
        ...v,
        ...stamp,
        cgiUpgraded: true,
        mediaState: "processed",
        mediaScore: 9.6,
        daysToFrontline: 2,
      };
    case "unsyndicated":
      return {
        ...v,
        ...stamp,
        syndicatedTo: options?.platforms ?? SYND_PLATFORMS,
        publishedAt: new Date().toISOString(),
      };
    case "aging":
      return { ...v, ...stamp, campaignActive: true };
  }
}
