import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft, ChevronRight, Eye, Download, MoreVertical, Edit3, Play,
  Sparkles, Image as ImageIcon, RotateCw, ArrowLeft, Plus, Minus, ListChecks,
  Grid3x3, Rows, ArrowLeftRight,
} from "lucide-react";
import { AppHeader, AppSidebar } from "./AppShell";

import rawExterior1 from "../assets/vehicle/raw-exterior-1.jpg";
import rawExterior2 from "../assets/vehicle/raw-exterior-2.jpg";
import rawExterior3 from "../assets/vehicle/raw-exterior-3.jpg";
import rawInterior1 from "../assets/vehicle/raw-interior-1.jpg";
import rawInterior2 from "../assets/vehicle/raw-interior-2.jpg";
import studioExt1 from "../assets/vehicle/studio-exterior-1.jpg";
import studioExt2 from "../assets/vehicle/studio-exterior-2.jpg";
import studioExt3 from "../assets/vehicle/studio-exterior-3.jpg";
import studioInt1 from "../assets/vehicle/studio-interior-1.jpg";
import studioInt2 from "../assets/vehicle/studio-interior-2.jpg";
import spin360Mov from "../assets/vehicle/spin-360.mov";

export interface VehicleForVDP {
  id: number | string;
  name: string;        // e.g. "2020 Skoda Kamiq SE"
  stk: string;         // e.g. "STK-2107"
  vin: string;         // e.g. "TMBJF7NJ6LG502118"
  trim?: string;       // "1794"
  smartMatch?: boolean;
}

interface Props {
  vehicle: VehicleForVDP;
  onBack: () => void;
  onNavigate?: (label: string) => void;
}

type TabId = "overview" | "details" | "images" | "spin" | "video";

// ─── Paired media slots (same pattern as RawPhotoTransformModal) ──────────────

type Slot = {
  kind: "video" | "image";
  studio: string;
  input: string | null;
  label: string;
};

const SLOTS: Slot[] = [
  { kind: "video", studio: spin360Mov,  input: null,         label: "360° Tour" },
  { kind: "image", studio: studioExt1,  input: rawExterior1, label: "Front 3/4" },
  { kind: "image", studio: studioExt2,  input: rawExterior2, label: "Side" },
  { kind: "image", studio: studioExt3,  input: rawExterior3, label: "Rear 3/4" },
  { kind: "image", studio: studioInt1,  input: rawInterior1, label: "Interior front" },
  { kind: "image", studio: studioInt2,  input: rawInterior2, label: "Interior rear" },
];

// ─── Tab strip ───────────────────────────────────────────────────────────────

function TabStrip({
  active, onChange, imagesCount,
}: { active: TabId; onChange: (id: TabId) => void; imagesCount: number }) {
  const tabs: { id: TabId; label: string; badge?: React.ReactNode }[] = [
    { id: "overview", label: "Overview" },
    { id: "details",  label: "Vehicle Details" },
    { id: "images",   label: "Images", badge: (
      <span className="ml-[6px] inline-flex items-center px-[5px] h-[16px] rounded-[4px] bg-[#F59E0B] text-white text-[9px] font-bold font-['Inter:Bold',sans-serif]">
        {imagesCount}
      </span>
    ) },
    { id: "spin",     label: "360 Spin", badge: <RotateCw size={11} className="ml-[5px] text-[#E91E63]" /> },
    { id: "video",    label: "Video Tour" },
  ];
  return (
    <div className="flex items-center gap-[8px] border-b border-black/8 px-[20px] pt-[10px]">
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`relative inline-flex items-center px-[14px] py-[10px] rounded-t-[8px] text-[13px] font-['Inter:Semi_Bold',sans-serif] font-semibold transition-colors ${
              isActive
                ? "text-[#0a0a0a] bg-white border border-black/8 border-b-white -mb-[1px]"
                : "text-black/55 hover:text-[#0a0a0a]"
            }`}
          >
            {t.label}
            {t.badge}
          </button>
        );
      })}
    </div>
  );
}

// ─── Tab 1: Overview (hero gallery) ───────────────────────────────────────────

function OverviewTab() {
  const [idx, setIdx] = useState(0);
  const slot = SLOTS[idx];
  return (
    <div className="bg-white rounded-b-[14px] border border-t-0 border-black/8 p-[20px]">
      {/* Hero */}
      <div className="relative max-w-[760px] mx-auto rounded-[12px] overflow-hidden bg-[#1a1a1a] aspect-[16/10]">
        {slot.kind === "video" ? (
          <video
            key={`v-${idx}`}
            src={slot.studio}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <img
            key={`i-${idx}`}
            src={slot.studio}
            alt={slot.label}
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}

        {/* Click-and-drag overlay pill */}
        {slot.kind === "video" && (
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full bg-black/55 backdrop-blur-sm text-white text-[11px] font-medium font-['Inter:Medium',sans-serif]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M9 4l-5 5v6l5 5h6l5-5V9l-5-5H9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Click and Drag to view 360 spin
          </div>
        )}

        {/* Chevrons */}
        <button
          type="button"
          onClick={() => setIdx((i) => (i - 1 + SLOTS.length) % SLOTS.length)}
          className="absolute left-[14px] top-1/2 -translate-y-1/2 size-[34px] rounded-full bg-white/85 hover:bg-white flex items-center justify-center transition-colors shadow-md"
          aria-label="Previous"
        >
          <ChevronLeft size={18} className="text-[#0a0a0a]" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => setIdx((i) => (i + 1) % SLOTS.length)}
          className="absolute right-[14px] top-1/2 -translate-y-1/2 size-[34px] rounded-full bg-white/85 hover:bg-white flex items-center justify-center transition-colors shadow-md"
          aria-label="Next"
        >
          <ChevronRight size={18} className="text-[#0a0a0a]" strokeWidth={2.5} />
        </button>

        {/* Zoom controls */}
        <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 inline-flex items-center gap-[2px] bg-white/95 rounded-[8px] px-[2px] shadow-sm">
          <button className="size-[28px] flex items-center justify-center hover:bg-black/5 rounded-[6px]">
            <Minus size={14} className="text-black/60" />
          </button>
          <span className="text-[11px] font-semibold text-[#0a0a0a] font-['Inter:Semi_Bold',sans-serif] px-[4px]">100%</span>
          <button className="size-[28px] flex items-center justify-center hover:bg-black/5 rounded-[6px]">
            <Plus size={14} className="text-black/60" />
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-[16px] max-w-[760px] mx-auto grid grid-cols-6 gap-[8px]">
        {SLOTS.map((s, i) => {
          const active = i === idx;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`relative rounded-[8px] overflow-hidden border-[2px] aspect-[16/10] bg-[#1a1a1a] ${
                active ? "border-[#4600F2]" : "border-transparent hover:border-black/15"
              } transition-colors`}
            >
              {s.kind === "video" ? (
                <>
                  <video
                    src={s.studio}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                    <div className="size-[22px] rounded-full bg-[#F59E0B] flex items-center justify-center">
                      <Play size={11} className="text-white" fill="currentColor" strokeWidth={2.5} />
                    </div>
                  </div>
                </>
              ) : (
                <img src={s.studio} alt="" className="absolute inset-0 w-full h-full object-cover" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab 2: Vehicle Details (form) ─────────────────────────────────────────────

function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-black/60 mb-[6px] font-['Inter:Medium',sans-serif]">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  defaultValue = "", placeholder, suffix,
}: { defaultValue?: string; placeholder?: string; suffix?: React.ReactNode }) {
  return (
    <div className="flex items-center bg-white border border-black/15 rounded-[8px] h-[38px] px-[10px] focus-within:border-[#4600F2]">
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[13px] text-[#0a0a0a] font-['Inter:Regular',sans-serif] min-w-0"
      />
      {suffix}
    </div>
  );
}

function Select({
  defaultValue = "", placeholder, options,
}: { defaultValue?: string; placeholder?: string; options?: string[] }) {
  return (
    <div className="flex items-center bg-white border border-black/15 rounded-[8px] h-[38px] px-[10px] focus-within:border-[#4600F2]">
      <select
        defaultValue={defaultValue}
        className="flex-1 bg-transparent outline-none text-[13px] text-[#0a0a0a] font-['Inter:Regular',sans-serif] min-w-0 cursor-pointer appearance-none"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronRight size={14} className="text-black/40 rotate-90 shrink-0" />
    </div>
  );
}

function VehicleDetailsTab({ vehicle }: { vehicle: VehicleForVDP }) {
  return (
    <div className="bg-white rounded-b-[14px] border border-t-0 border-black/8 px-[24px] py-[20px]">
      {/* Description */}
      <p className="text-[14px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] mb-[10px]">
        Description
      </p>
      <div className="relative rounded-[10px] border border-black/15 bg-white p-[14px]">
        <textarea
          placeholder="Write Your Own or Let AI Do It for You"
          className="w-full bg-transparent outline-none text-[13px] text-[#0a0a0a] placeholder:text-black/40 font-['Inter:Regular',sans-serif] resize-none min-h-[80px]"
        />
        <button
          type="button"
          className="absolute bottom-[10px] right-[10px] h-[34px] px-[14px] rounded-[8px] inline-flex items-center gap-[6px] text-white text-[12px] font-semibold font-['Inter:Semi_Bold',sans-serif]"
          style={{
            background: "linear-gradient(90deg, #5BB5FF 0%, #7F6AF2 35%, #B651D7 65%, #FF7B5C 100%)",
          }}
        >
          <Sparkles size={13} strokeWidth={2.5} />
          Write with AI
        </button>
      </div>

      {/* Overview */}
      <p className="mt-[24px] text-[14px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] mb-[12px]">
        Overview
      </p>
      <div className="grid grid-cols-4 gap-x-[16px] gap-y-[14px]">
        <Field label="Exterior Color">
          <Select placeholder="Select or type a color" options={["White", "Black", "Silver", "Red", "Blue"]} />
        </Field>
        <Field label="Interior Trim">
          <Select placeholder="Select or type a color" options={["Black", "Tan", "Gray"]} />
        </Field>
        <Field label="Mileage">
          <TextInput
            defaultValue=""
            suffix={
              <select defaultValue="Miles" className="text-[12px] text-black/65 bg-transparent outline-none cursor-pointer pl-[6px] border-l border-black/10 ml-[6px]">
                <option>Miles</option>
                <option>KM</option>
              </select>
            }
          />
        </Field>
        <Field label="Exterior Color Code">
          <TextInput defaultValue="" />
        </Field>

        <Field label="Interior Color Code">
          <TextInput defaultValue="" />
        </Field>
        <Field label="Transmission Short">
          <Select placeholder="" options={["Automatic", "Manual", "CVT"]} defaultValue="Automatic" />
        </Field>
        <Field label="Engine">
          <Select
            defaultValue="6 Cylinders, V-Shaped, PORT+DIRE"
            options={["4 Cylinders", "6 Cylinders, V-Shaped, PORT+DIRE", "8 Cylinders V8"]}
          />
        </Field>
        <Field label="Trim">
          <TextInput defaultValue={vehicle.trim ?? "1794"} />
        </Field>

        <Field label="Driveline">
          <Select placeholder="Driveline" options={["FWD", "RWD", "AWD", "4WD"]} defaultValue="4WD" />
        </Field>
        <Field label="Fuel">
          <Select defaultValue="Gasoline" options={["Gasoline", "Diesel", "Hybrid", "Electric"]} />
        </Field>
        <Field label="Condition">
          <Select placeholder="Condition" options={["New", "Used", "Certified Pre-Owned"]} defaultValue="New" />
        </Field>
        <Field label="Disposition">
          <Select placeholder="Disposition" options={["Retail", "Wholesale", "Loaner"]} defaultValue="Retail" />
        </Field>
      </div>
    </div>
  );
}

// ─── Tab 3: Images ────────────────────────────────────────────────────────────

function ImagesTab() {
  const [mode, setMode] = useState<"studio" | "input">("studio");
  const [layout, setLayout] = useState<"grid" | "rows">("grid");

  // Generate 12 image slots from our 5 paired studio/raw images (cycled)
  const cycle = SLOTS.slice(1); // skip the 360 spin
  const items: Slot[] = Array.from({ length: 12 }, (_, i) => cycle[i % cycle.length]);

  const totalImages = items.length;

  return (
    <div className="bg-white rounded-b-[14px] border border-t-0 border-black/8 px-[20px] py-[16px]">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-[14px]">
        <div className="flex items-center gap-[12px]">
          <span className="text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">Console</span>
          <span className="text-[12px] text-black/55">·</span>
          <span className="text-[12px] text-black/55 font-['Inter:Regular',sans-serif]">{totalImages} Images</span>
          <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-[0.4px]">Under Review</span>
        </div>

        <div className="flex items-center gap-[10px]">
          {/* View Input / Output segmented toggle */}
          <div className="relative inline-flex items-center bg-[#F1F1F4] rounded-full p-[3px] h-[30px]">
            <span
              aria-hidden
              className="absolute top-[3px] bottom-[3px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.10)] transition-all duration-200 ease-out"
              style={{
                width: "calc(50% - 3px)",
                left: mode === "input" ? "3px" : "calc(50%)",
              }}
            />
            <button
              type="button"
              onClick={() => setMode("input")}
              className={`relative z-10 px-[12px] h-[24px] rounded-full text-[10px] font-semibold transition-colors ${
                mode === "input" ? "text-[#0a0a0a]" : "text-black/55"
              }`}
            >
              View input
            </button>
            <button
              type="button"
              onClick={() => setMode("studio")}
              className={`relative z-10 px-[12px] h-[24px] rounded-full text-[10px] font-semibold transition-colors ${
                mode === "studio" ? "text-[#0a0a0a]" : "text-black/55"
              }`}
            >
              Output
            </button>
          </div>

          {/* Layout switcher */}
          <div className="inline-flex items-center bg-white border border-black/10 rounded-[8px] p-[2px]">
            <button
              type="button"
              onClick={() => setLayout("grid")}
              className={`size-[26px] rounded-[6px] flex items-center justify-center ${layout === "grid" ? "bg-[#F1F1F4] text-[#0a0a0a]" : "text-black/45"}`}
              aria-label="Grid view"
            >
              <Grid3x3 size={14} />
            </button>
            <button
              type="button"
              onClick={() => setLayout("rows")}
              className={`size-[26px] rounded-[6px] flex items-center justify-center ${layout === "rows" ? "bg-[#F1F1F4] text-[#0a0a0a]" : "text-black/45"}`}
              aria-label="Rows view"
            >
              <Rows size={14} />
            </button>
          </div>

          <button
            type="button"
            className="h-[30px] px-[14px] rounded-[8px] border border-[#4600F2] text-[#4600F2] text-[11px] font-semibold font-['Inter:Semi_Bold',sans-serif] hover:bg-[rgba(70,0,242,0.06)] inline-flex items-center gap-[6px]"
          >
            <ArrowLeftRight size={12} strokeWidth={2.5} />
            Resequence
          </button>

          <button className="size-[30px] rounded-[8px] hover:bg-black/5 flex items-center justify-center" aria-label="More">
            <MoreVertical size={15} className="text-black/55" />
          </button>
        </div>
      </div>

      {/* Image grid */}
      <div className={layout === "grid" ? "grid grid-cols-4 gap-[10px]" : "grid grid-cols-2 gap-[10px]"}>
        {items.map((s, i) => {
          const src = mode === "studio" ? s.studio : (s.input ?? s.studio);
          return (
            <div
              key={i}
              className="relative rounded-[10px] overflow-hidden border border-black/8 aspect-[4/3] bg-[#1a1a1a]"
            >
              <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
              {/* Tiny tag bottom-left for first two cells (matches screenshot) */}
              {i < 2 && (
                <div className="absolute bottom-[6px] left-[6px] size-[22px] rounded-full bg-white/95 flex items-center justify-center">
                  <Sparkles size={11} className="text-[#4600F2]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab 4: 360 Spin ──────────────────────────────────────────────────────────

function SpinTab() {
  return (
    <div className="bg-white rounded-b-[14px] border border-t-0 border-black/8 px-[20px] py-[16px]">
      <div className="flex items-center justify-between mb-[14px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">Console</span>
          <span className="inline-flex items-center gap-[4px] text-[11px] font-bold text-[#B651D7] uppercase tracking-[0.4px]">
            <Sparkles size={11} />
            Assured
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <button className="h-[30px] px-[12px] rounded-[8px] border border-black/10 text-[11px] font-semibold text-[#0a0a0a] inline-flex items-center gap-[6px] hover:bg-[#fafafa] font-['Inter:Semi_Bold',sans-serif]">
            Share
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M14 4l6 6-6 6M20 10H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="size-[30px] rounded-[8px] hover:bg-black/5 flex items-center justify-center" aria-label="More">
            <MoreVertical size={15} className="text-black/55" />
          </button>
        </div>
      </div>

      {/* Before / After split */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] gap-[16px] items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.8px] font-bold text-black/55 mb-[6px] text-center font-['Inter:Bold',sans-serif]">Before</p>
          <div className="relative rounded-[12px] overflow-hidden border border-black/8 bg-[#1a1a1a] aspect-[4/3]">
            <img src={rawExterior1} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.8px] font-bold text-black/55 mb-[6px] text-center font-['Inter:Bold',sans-serif]">After</p>
          <div className="relative rounded-[12px] overflow-hidden border border-black/8 bg-[#1a1a1a] aspect-[16/9]">
            <video
              src={spin360Mov}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-[14px] left-1/2 -translate-x-1/2 inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full bg-black/55 backdrop-blur-sm text-white text-[11px] font-medium font-['Inter:Medium',sans-serif]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M9 4l-5 5v6l5 5h6l5-5V9l-5-5H9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Click and Drag to view 360 spin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab 5: Video Tour ────────────────────────────────────────────────────────

function VideoTab() {
  return (
    <div className="bg-white rounded-b-[14px] border border-t-0 border-black/8 px-[20px] py-[16px]">
      <div className="flex items-center justify-between mb-[14px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">Walkaround video</span>
          <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.4px]">Ready</span>
        </div>
      </div>
      <div className="relative rounded-[12px] overflow-hidden border border-black/8 bg-[#1a1a1a] aspect-[16/9] max-w-[760px] mx-auto">
        <video
          src={spin360Mov}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <p className="mt-[10px] text-center text-[11px] text-black/45 font-['Inter:Regular',sans-serif]">
        Auto-generated branded walkaround · 24 seconds
      </p>
    </div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function VehicleDetailScreen({ vehicle, onBack, onNavigate }: Props) {
  const [tab, setTab] = useState<TabId>("overview");
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesCount = 31;

  // Reset to overview if vehicle changes
  useEffect(() => { setTab("overview"); }, [vehicle.id]);

  return (
    <div className="bg-white flex flex-col size-full">
      <AppHeader />
      <div className="flex flex-1 min-h-0">
        <AppSidebar active="Studio AI" onNavigate={onNavigate} />
        <div ref={containerRef} className="flex-1 bg-[#FAFAFB] overflow-auto">
          <div className="px-[24px] py-[18px] min-w-[1000px]">
            {/* Title bar */}
            <div className="flex items-start justify-between gap-[20px] mb-[12px]">
              <div className="flex items-start gap-[10px]">
                <button
                  type="button"
                  onClick={onBack}
                  className="size-[28px] rounded-full hover:bg-black/5 flex items-center justify-center transition-colors mt-[3px]"
                  aria-label="Back to inventory"
                >
                  <ArrowLeft size={16} className="text-black/65" />
                </button>
                <div>
                  <h1 className="text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-tight">
                    {vehicle.name}
                  </h1>
                  <div className="mt-[2px] flex items-center gap-[8px]">
                    <span className="text-[12px] text-black/55 font-['Inter:Regular',sans-serif]">
                      {vehicle.vin || "—"}
                    </span>
                    <button className="size-[18px] rounded hover:bg-black/5 flex items-center justify-center" aria-label="Copy VIN">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                        <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" className="text-black/40" />
                        <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="2" className="text-black/40" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-[8px]">
                <button className="h-[34px] px-[14px] rounded-[8px] border border-[#4600F2] text-[#4600F2] text-[12px] font-semibold font-['Inter:Semi_Bold',sans-serif] hover:bg-[rgba(70,0,242,0.06)] inline-flex items-center gap-[6px] bg-white">
                  <Eye size={13} />
                  Preview
                  <ChevronRight size={12} className="rotate-90" />
                </button>
                <button className="h-[34px] px-[14px] rounded-[8px] bg-[#4600F2] hover:bg-[#3a00d0] text-white text-[12px] font-semibold font-['Inter:Semi_Bold',sans-serif] inline-flex items-center gap-[6px]">
                  <Edit3 size={13} strokeWidth={2.5} />
                  Add/Remove media
                </button>
                <button className="size-[34px] rounded-[8px] border border-black/10 hover:bg-[#fafafa] flex items-center justify-center" aria-label="Download">
                  <Download size={15} className="text-black/65" />
                </button>
                <button className="size-[34px] rounded-[8px] hover:bg-black/5 flex items-center justify-center" aria-label="More">
                  <MoreVertical size={15} className="text-black/65" />
                </button>
              </div>
            </div>

            {/* Date + user info bar */}
            <div className="flex items-center justify-end gap-[10px] mb-[10px] text-[11px] text-black/45 font-['Inter:Regular',sans-serif]">
              <span>May 7, 2026 7:58:11 AM <span className="text-black/35">(18 days ago)</span></span>
              <span className="text-black/25">|</span>
              <span>sourabh.rawat@spyne.ai</span>
            </div>

            {/* Tabs */}
            <TabStrip active={tab} onChange={setTab} imagesCount={imagesCount} />

            {/* Tab content */}
            <div className="mt-0">
              {tab === "overview" && <OverviewTab />}
              {tab === "details"  && <VehicleDetailsTab vehicle={vehicle} />}
              {tab === "images"   && <ImagesTab />}
              {tab === "spin"     && <SpinTab />}
              {tab === "video"    && <VideoTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
