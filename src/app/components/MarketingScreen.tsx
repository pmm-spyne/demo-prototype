import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Plus, Sparkles, ArrowUp } from "lucide-react";
import { AppHeader, AppSidebar } from "./AppShell";

type Template = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  vehicleCount: number;
  chipBg: string;
  chipFg: string;
};

const TEMPLATES: Template[] = [
  { id: "festive",     category: "Festive",     title: "Holiday season",            subtitle: "Capture the December rush.", vehicleCount: 45, chipBg: "#FEE2E2", chipFg: "#B91C1C" },
  { id: "certified",   category: "Certified",   title: "Certified Pre-owned Trust", subtitle: "Trust-driven CPO campaigns.", vehicleCount: 45, chipBg: "#DBEAFE", chipFg: "#1D4ED8" },
  { id: "promotional", category: "Promotional", title: "Dealership billboard",      subtitle: "Make-of-the-month creatives.", vehicleCount: 45, chipBg: "#CFFAFE", chipFg: "#0E7490" },
  { id: "ageing",      category: "Ageing",      title: "Move 45+ day aged inventory", subtitle: "Push before the 60-day cliff.", vehicleCount: 45, chipBg: "#FFEDD5", chipFg: "#C2410C" },
];

const SUGGESTIONS = [
  "Discount on pre-owned sedans",
  "Clear trucks aged >80 days",
  "Christmas Special on SUVs",
];

function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`relative pb-[10px] pt-[2px] text-[13px] font-['Inter:Semi_Bold',sans-serif] transition-colors ${
        active ? "text-[#4600F2] font-semibold" : "text-black/55 hover:text-[#0a0a0a] font-medium"
      }`}
    >
      <span>{label}</span>
      {active && (
        <span className="absolute left-0 right-0 -bottom-[1px] h-[2.5px] rounded-full bg-[#4600F2]" />
      )}
    </button>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="rounded-[14px] border border-black/10 bg-white p-[16px] flex flex-col gap-[12px] hover:border-black/20 hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all">
      <span
        className="self-start inline-flex items-center px-[10px] py-[3px] rounded-full text-[11px] font-bold uppercase tracking-[0.4px] font-['Inter:Bold',sans-serif]"
        style={{ background: template.chipBg, color: template.chipFg }}
      >
        {template.category}
      </span>
      <div>
        <p className="text-[14px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[18px]">
          {template.title}
        </p>
        <p className="mt-[4px] text-[12px] text-black/55 font-['Inter:Regular',sans-serif] leading-[16px]">
          {template.subtitle}
        </p>
      </div>
      <div className="mt-auto pt-[6px] flex items-end justify-between gap-[10px]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.6px] font-semibold text-black/45 font-['Inter:Semi_Bold',sans-serif]">
            Total Vehicles
          </p>
          <p className="text-[18px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-none mt-[2px]">
            {template.vehicleCount}
          </p>
        </div>
        <button
          type="button"
          className="h-[32px] px-[14px] rounded-[8px] border border-[#4600F2] text-[#4600F2] text-[11px] font-semibold font-['Inter:Semi_Bold',sans-serif] hover:bg-[rgba(70,0,242,0.06)] transition-colors whitespace-nowrap"
        >
          Review & Publish
        </button>
      </div>
    </div>
  );
}

interface Props {
  onNavigate?: (label: string) => void;
}

export function MarketingScreen({ onNavigate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>("[data-fade]");
    if (!items.length) return;
    gsap.fromTo(
      items,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="bg-white flex flex-col size-full">
      <AppHeader />
      <div className="flex flex-1 min-h-0">
        <AppSidebar active="Marketing" onNavigate={onNavigate} />
        <div
          ref={containerRef}
          className="flex-1 overflow-auto relative"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 18% 25%, rgba(255,92,122,0.10) 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 50% 38%, rgba(0,196,136,0.10) 0%, transparent 60%),
              radial-gradient(ellipse 55% 45% at 88% 18%, rgba(127,106,242,0.10) 0%, transparent 65%),
              radial-gradient(ellipse 60% 50% at 80% 80%, rgba(91,191,246,0.10) 0%, transparent 65%),
              #f9fafb
            `,
          }}
        >
          <div className="px-[28px] py-[20px] min-w-[900px] relative z-[1]">
            {/* Page header */}
            <div data-fade className="flex items-start justify-between mb-[18px]">
              <div>
                <h1 className="text-[24px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-tight">
                  Smart Campaigns
                </h1>
                <p className="text-[13px] text-[#6B7280] mt-[2px] font-['Inter:Regular',sans-serif]">
                  Spyne suggests campaigns from your aging and holding-cost signals.
                </p>
              </div>
              <button className="flex items-center gap-[6px] h-[36px] px-[14px] bg-[#4600F2] rounded-[8px] text-[12px] font-semibold text-white hover:bg-[#3a00d0] font-['Inter:Semi_Bold',sans-serif]">
                <Plus size={14} strokeWidth={2.5} />
                Create Campaign
              </button>
            </div>

            {/* Tabs */}
            <div data-fade className="flex items-end border-b border-black/8 mb-[24px]">
              <div className="flex items-center gap-[24px] -mb-[1px]">
                <Tab label="New Campaigns" active />
                <Tab label="My Campaigns" />
              </div>
            </div>

            {/* AI prompt area */}
            <div data-fade className="text-center py-[12px]">
              <h2 className="text-[20px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">
                What campaign do you want to run?
              </h2>
            </div>

            <div data-fade className="flex justify-center">
              <div
                className="w-full max-w-[640px] relative rounded-[14px] bg-white"
                style={{
                  boxShadow: "0 0 0 1.5px rgba(70,0,242,0.35), 0 8px 20px rgba(70,0,242,0.10)",
                }}
              >
                <div className="flex items-center gap-[10px] px-[8px] py-[8px]">
                  {/* Gradient avatar icon */}
                  <div
                    className="shrink-0 size-[34px] rounded-[10px] flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #FF5C7A 0%, #B651D7 50%, #4600F2 100%)",
                      color: "#fff",
                    }}
                  >
                    <Sparkles size={16} strokeWidth={2.5} />
                  </div>
                  <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Run a campaign on vehicles aged over >60 days"
                    className="flex-1 bg-transparent outline-none text-[13px] text-[#0a0a0a] placeholder:text-black/40 font-['Inter:Regular',sans-serif] min-w-0"
                  />
                  <button
                    type="button"
                    disabled={!prompt.trim()}
                    className="shrink-0 size-[34px] rounded-[10px] bg-[rgba(70,0,242,0.10)] hover:bg-[rgba(70,0,242,0.18)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-[#4600F2] transition-colors"
                    aria-label="Submit"
                  >
                    <ArrowUp size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Suggestion pills */}
            <div data-fade className="mt-[14px] flex flex-wrap items-center justify-center gap-[8px]">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrompt(s)}
                  className="h-[28px] px-[12px] rounded-full bg-white border border-black/10 text-[11px] font-medium text-black/70 hover:bg-[#fafafa] hover:border-black/20 transition-colors font-['Inter:Medium',sans-serif]"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div data-fade className="mt-[28px] mb-[14px] border-t border-black/8" />

            {/* Suggested for you */}
            <div data-fade>
              <p className="text-[13px] font-bold text-[#0a0a0a] mb-[12px] font-['Inter:Bold',sans-serif]">
                Suggested for you
              </p>
              <div className="grid grid-cols-4 gap-[14px]">
                {TEMPLATES.map((t) => (
                  <TemplateCard key={t.id} template={t} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
