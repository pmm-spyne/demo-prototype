import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  TrendingDown, Mail, Lock, RotateCcw, AlertTriangle, ImageOff, Clock, Boxes,
} from "lucide-react";
import { AppHeader, AppSidebar } from "./AppShell";

interface ExpiredConsoleScreenProps {
  dealerName?: string;
  /** Holding cost + missed-lead dollars bleeding per day without Studio OS. */
  dailyLost: number;
  /** Same figure rolled up monthly — used in the banner + email body. */
  monthlyLost: number;
  /** Days since the trial lapsed. */
  daysSinceExpiry?: number;
  onReactivate: () => void;
}

export function ExpiredConsoleScreen({
  dealerName, dailyLost, monthlyLost, daysSinceExpiry = 3, onReactivate,
}: ExpiredConsoleScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const tl = gsap.timeline();
    tl.fromTo(root.querySelectorAll<HTMLElement>("[data-fade]"),
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" });
    return () => { tl.kill(); };
  }, []);

  const name = dealerName || "your dealership";

  return (
    <div className="bg-white flex flex-col size-full">
      <AppHeader />
      <div className="flex flex-1 min-h-0">
        <AppSidebar active="Studio OS" />
        <div ref={rootRef} className="flex-1 bg-[#f9fafb] overflow-auto">
          <div className="px-[28px] py-[20px] min-w-[1000px]">
            {/* $-lost banner — identical messaging to the degradation email */}
            <div
              data-fade
              className="relative overflow-hidden rounded-[14px] px-[22px] py-[18px] mb-[22px] text-white"
              style={{
                background: "linear-gradient(135deg, #7F1D1D 0%, #DC2626 60%, #EF4444 100%)",
                boxShadow: "0 14px 38px rgba(220,38,38,0.28)",
              }}
            >
              <TrendingDown size={120} className="absolute -top-[16px] -right-[8px] text-white/10" strokeWidth={1.3} />
              <div className="relative flex items-center justify-between gap-[20px] flex-wrap">
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-full bg-white/15 text-[9px] font-bold uppercase tracking-[1.2px] mb-[8px] font-['Inter:Bold',sans-serif]">
                    <AlertTriangle size={10} strokeWidth={2.6} /> Studio OS trial ended
                  </p>
                  <h2 className="text-[20px] font-bold font-['Inter:Bold',sans-serif] leading-[24px]">
                    You're losing ~${dailyLost.toLocaleString()}/day without Studio OS
                  </h2>
                  <p className="mt-[6px] text-[13px] text-white/85 font-['Inter:Regular',sans-serif] leading-[18px]">
                    Studio OS ended {daysSinceExpiry} days ago. Listings are sitting longer, photos are inconsistent again,
                    and aged units are bleeding holding cost — about{" "}
                    <span className="font-bold">${monthlyLost.toLocaleString()}/month</span> across {name}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onReactivate}
                  className="shrink-0 inline-flex items-center gap-[8px] h-[44px] px-[22px] rounded-[10px] text-[14px] font-bold text-[#B91C1C] bg-white font-['Inter:Bold',sans-serif] transition-transform hover:scale-[1.02] shadow-[0_8px_22px_rgba(0,0,0,0.18)]"
                >
                  <RotateCcw size={16} strokeWidth={2.4} /> Reactivate Studio OS
                </button>
              </div>
            </div>

            {/* Standard (degraded) merchandising header */}
            <div data-fade className="flex items-start justify-between mb-[18px]">
              <div>
                <h1 className="text-[22px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-tight">
                  Merchandising
                </h1>
                <p className="text-[13px] text-[#6B7280] mt-[2px] font-['Inter:Regular',sans-serif]">
                  Manage your inventory and see what needs your attention
                </p>
              </div>
              <span className="inline-flex items-center gap-[6px] h-[34px] px-[12px] rounded-[8px] text-[12px] font-semibold text-black/45 bg-black/5 border border-black/10 font-['Inter:Semi_Bold',sans-serif]">
                <Lock size={13} /> Studio OS inactive
              </span>
            </div>

            {/* Degraded stat cards — plain merchandising, no Studio OS scoring */}
            <div data-fade className="grid grid-cols-3 gap-[14px] mb-[22px]">
              {[
                { icon: <Boxes size={18} strokeWidth={2.1} />,   label: "Inventory",         value: "198",  note: "total units" },
                { icon: <ImageOff size={18} strokeWidth={2.1} />, label: "No Photos",         value: "201",  note: "back to manual capture" },
                { icon: <Clock size={18} strokeWidth={2.1} />,    label: "Days to Frontline", value: "11.4", note: "up from 2.8 on Studio OS" },
              ].map((c) => (
                <div key={c.label} className="rounded-[14px] border border-black/8 bg-white px-[18px] py-[15px]">
                  <div className="flex items-center gap-[8px] mb-[10px] text-black/40">
                    <span className="size-[30px] rounded-[9px] bg-black/5 flex items-center justify-center">{c.icon}</span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.4px] font-['Inter:Semi_Bold',sans-serif]">{c.label}</p>
                  </div>
                  <p className="text-[28px] font-bold text-black/70 font-['Inter:Bold',sans-serif] leading-none">{c.value}</p>
                  <p className="mt-[6px] text-[11.5px] text-black/45 font-['Inter:Regular',sans-serif]">{c.note}</p>
                </div>
              ))}
            </div>

            {/* Locked Studio OS modules + the degradation email preview */}
            <div data-fade className="grid grid-cols-2 gap-[14px]">
              {/* Greyed Studio OS module strip */}
              <div className="relative rounded-[14px] border border-black/8 bg-white p-[18px] overflow-hidden">
                <div className="flex flex-col gap-[10px] opacity-50 grayscale pointer-events-none">
                  {["Studio Instant", "Studio Create", "Studio Publish", "Studio Promote"].map((p) => (
                    <div key={p} className="flex items-center justify-between rounded-[10px] border border-black/8 px-[12px] py-[10px]">
                      <span className="text-[13px] font-semibold text-black/70 font-['Inter:Semi_Bold',sans-serif]">{p}</span>
                      <span className="text-[11px] font-bold text-black/40 uppercase tracking-[0.5px]">Off</span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
                  <span className="inline-flex items-center gap-[7px] px-[14px] py-[8px] rounded-[10px] text-[12.5px] font-bold text-white font-['Inter:Bold',sans-serif]" style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)" }}>
                    <Lock size={14} strokeWidth={2.6} /> Reactivate to turn these back on
                  </span>
                </div>
              </div>

              {/* Email preview — same $-lost messaging as the console banner */}
              <div className="rounded-[14px] border border-black/8 bg-white overflow-hidden">
                <div className="flex items-center gap-[8px] px-[16px] py-[11px] border-b border-black/8 bg-[#FAFAFB]">
                  <Mail size={15} className="text-[#DC2626]" />
                  <span className="text-[12px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif]">Sent to your inbox</span>
                  <span className="ml-auto text-[11px] text-black/40 font-['Inter:Regular',sans-serif]">Today, 9:00 AM</span>
                </div>
                <div className="p-[16px]">
                  <p className="text-[13px] font-bold text-[#0a0a0a] font-['Inter:Bold',sans-serif] leading-[18px]">
                    {name} is losing ~${dailyLost.toLocaleString()}/day since Studio OS ended
                  </p>
                  <p className="mt-[8px] text-[12px] text-black/60 font-['Inter:Regular',sans-serif] leading-[18px]">
                    In the {daysSinceExpiry} days since your trial lapsed, days-to-frontline climbed back to 11.4
                    and {201} listings dropped below buyer-ready. At your holding cost that's roughly{" "}
                    <span className="font-bold text-[#B91C1C]">${monthlyLost.toLocaleString()}/month</span> walking out the door.
                  </p>
                  <button
                    type="button"
                    onClick={onReactivate}
                    className="mt-[14px] inline-flex items-center gap-[7px] h-[38px] px-[18px] rounded-[9px] text-[12.5px] font-bold text-white font-['Inter:Bold',sans-serif] transition-transform hover:scale-[1.01]"
                    style={{ background: "linear-gradient(90deg,#4600F2,#B651D7)" }}
                  >
                    <RotateCcw size={14} strokeWidth={2.4} /> Reactivate Studio OS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
