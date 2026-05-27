import {
  Monitor, Eye, Copy, Layers, AlertTriangle, MoreVertical, ImageOff, Megaphone, Check, Wand2, Pencil,
} from "lucide-react";
import imgCar from "../../../imports/Frame2147240604/5dc495ae052ef514c9683fd2a095ba455d93a330.png";
import { PublishingCell } from "../PublishingCell";
import type { PublishedTo } from "../publishPlatforms";

export type Row = {
  id: number;
  name: string;
  stk: string;
  vin: string;
  price: string;
  date: string;
  age: number;
  mediaScore: number;
  daysToFrontline: number;
  holdCost: number;
  marginPct: number;
  totalMargin: number;
  smartMatch?: boolean;
  isLoss?: boolean;
  lossPerDay?: number;
  /** Demo 2 — raw-media state. "raw" = pre-processing badge, "processed" = studio-ready. */
  mediaState?: "raw" | "processed";
  /** Demo 2 — vehicle has no photos yet; renders placeholder thumbnail. */
  noPhoto?: boolean;
  /** Demo 2 — after SmartMatch, the row carries this badge in addition to media state. */
  smartMatched?: boolean;
  /** Demo 2 — platform IDs the vehicle has been syndicated to (small logo strip). */
  syndicatedTo?: string[];
  /** ISO timestamp when this vehicle was published (used by the Last Published column). */
  publishedAt?: string;
  /** Explicit new/pre-owned classification for the dashboard tabs.
   *  Defaults to "new" — aging on the lot ≠ pre-owned. */
  vehicleType?: "new" | "preowned";
  /** Demo 2 — campaign launched on this vehicle. */
  campaignActive?: boolean;
  /** Demo 2 — upgraded to CGI-grade studio render (vs. standard processed photo). */
  cgiUpgraded?: boolean;
  /** Demo 2 — optional thumbnail override (used when raw → processed swaps imagery). */
  thumbnailUrl?: string;
};

export function VehicleRow({
  row, published, selected, onToggle, spotlit, onOpen, transforming,
}: {
  row: Row;
  published: PublishedTo[];
  selected: boolean;
  onToggle: () => void;
  spotlit?: boolean;
  onOpen?: () => void;
  /** Demo 2 — row is actively transforming (shimmer overlay + slight scale). */
  transforming?: boolean;
}) {
  const ageClass = row.isLoss ? "text-[#EF4444]" : "text-[#374151]";
  const thumb = row.thumbnailUrl ?? imgCar;
  // Derive a PublishedTo[] from the row's syndication state (Demo 2 stores it
  // as an ID list + a single timestamp). If the row has its own `published`
  // prop passed in (Demo 1 flow), prefer that.
  const rowPublished: PublishedTo[] = row.syndicatedTo?.length
    ? row.syndicatedTo.map((id) => ({
        platformId: id,
        publishedAt: row.publishedAt ?? new Date().toISOString(),
      }))
    : published;

  return (
    <tr
      onClick={onOpen}
      data-vehicle-id={row.id}
      data-transforming={transforming ? "true" : undefined}
      className={`relative border-b border-black/5 transition-colors cursor-pointer ${
        transforming
          ? "demo2-transforming-row"
          : spotlit
            ? "siri-row-glow bg-[rgba(127,106,242,0.06)]"
            : selected
              ? "bg-[rgba(70,0,242,0.04)]"
              : row.isLoss ? "bg-[#FEF2F2]/40 hover:bg-[#FEF2F2]" : "hover:bg-[#FAFAFB]"
      }`}
    >
      <td className="pl-4 pr-2 py-3 w-10" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="w-4 h-4 rounded border-gray-300 accent-[#4600f2] cursor-pointer"
        />
      </td>
      {/* Vehicle */}
      <td className="py-3 pr-4 border-r border-black/5">
        <div className="flex items-center gap-3">
          {row.noPhoto ? (
            <div className="w-[68px] h-[48px] rounded-[6px] bg-[#F3F4F6] flex items-center justify-center text-[#9CA3AF] shrink-0">
              <ImageOff size={18} strokeWidth={2} />
            </div>
          ) : (
            <img
              src={thumb}
              alt=""
              className="w-[68px] h-[48px] object-cover rounded-[6px] bg-gray-100 shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[#111] font-['Inter:Semi_Bold',sans-serif] truncate">
              {row.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-[#6B7280]">{row.stk}</span>
              <span className="text-[#D1D5DB]">•</span>
              <span className="text-[11px] text-[#6B7280]">{row.vin}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[12px] text-[#374151] mt-0.5 font-medium">{row.price}</p>
          </div>
          {/* Loud right-aligned Edit button — sits inside the Vehicle cell so
              it's the obvious next action when the AE wants to fix one row. */}
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            title="Edit vehicle"
            aria-label="Edit vehicle"
            className="ml-auto shrink-0 inline-flex items-center gap-[5px] h-[30px] px-[10px] rounded-[8px] bg-[rgba(70,0,242,0.08)] hover:bg-[#4600F2] text-[#4600F2] hover:text-white border border-[rgba(70,0,242,0.18)] hover:border-[#4600F2] text-[11.5px] font-semibold font-['Inter:Semi_Bold',sans-serif] transition-colors"
          >
            <Pencil size={12} strokeWidth={2.4} />
            Edit
          </button>
        </div>
      </td>
      {/* Age */}
      <td className="py-3 px-4 whitespace-nowrap border-r border-black/5">
        <p className={`text-[13px] font-semibold ${ageClass}`}>
          {row.age} days
          {row.isLoss && (
            <AlertTriangle size={11} className="inline-block ml-[4px] -mt-[2px] text-[#EF4444]" />
          )}
        </p>
        <p className="text-[11px] text-[#9CA3AF] mt-0.5 font-['Inter:Regular',sans-serif]">{row.date}</p>
      </td>
      {/* Media */}
      <td className="py-3 px-4 border-r border-black/5">
        <div className="flex flex-col items-start gap-[4px]">
          <div className="flex items-center gap-1">
            {[Monitor, Eye, Copy].map((Icon, i) => (
              <button key={i} className="p-1 rounded hover:bg-gray-100 text-[#9CA3AF]">
                <Icon size={15} />
              </button>
            ))}
          </div>
          {/* Demo 2 state badges */}
          {row.mediaState === "raw" && (
            <span className="inline-flex items-center gap-[3px] px-[7px] py-[2px] rounded-full text-[9px] font-bold uppercase tracking-[0.5px] bg-[#FEF3C7] text-[#92400E]">
              Raw
            </span>
          )}
          {row.mediaState === "processed" && (
            <span className="demo2-badge-pop inline-flex items-center gap-[3px] px-[7px] py-[2px] rounded-full text-[9px] font-bold uppercase tracking-[0.5px] bg-[rgba(16,185,129,0.12)] text-[#059669]">
              <Check size={9} strokeWidth={3} />
              Processed
            </span>
          )}
          {row.smartMatched && (
            <span className="demo2-badge-pop smart-match-badge siri-shimmer-bg inline-flex items-center gap-[3px] px-[7px] py-[2px] rounded-full text-[9px] font-bold text-white font-['Inter:Bold',sans-serif] uppercase tracking-[0.5px] shadow-[0_2px_8px_rgba(127,106,242,0.35)]">
              <Layers size={9} strokeWidth={2.8} />
              SmartMatched
            </span>
          )}
          {/* Demo 1 spotlight badge — preserved */}
          {row.smartMatch && !row.smartMatched && (
            <span className="smart-match-badge siri-shimmer-bg inline-flex items-center gap-[3px] px-[7px] py-[2px] rounded-full text-[9px] font-bold text-white font-['Inter:Bold',sans-serif] uppercase tracking-[0.5px] shadow-[0_2px_8px_rgba(127,106,242,0.35)]">
              <Layers size={9} strokeWidth={2.8} />
              Smart Match
            </span>
          )}
          {row.cgiUpgraded && (
            <span className="demo2-badge-pop inline-flex items-center gap-[3px] px-[7px] py-[2px] rounded-full text-[9px] font-bold uppercase tracking-[0.5px] bg-[rgba(139,92,246,0.15)] text-[#7C3AED]">
              <Wand2 size={9} strokeWidth={2.8} />
              CGI
            </span>
          )}
          {row.campaignActive && (
            <span className="demo2-badge-pop inline-flex items-center gap-[3px] px-[7px] py-[2px] rounded-full text-[9px] font-bold uppercase tracking-[0.5px] bg-[rgba(70,0,242,0.1)] text-[#4600F2]">
              <Megaphone size={9} strokeWidth={2.8} />
              Campaign Live
            </span>
          )}
        </div>
      </td>
      {/* Media Score */}
      <td className="py-3 px-4 border-r border-black/5">
        <span className="text-[14px] font-bold text-[#10B981] font-['Inter:Bold',sans-serif]">
          {row.mediaScore.toFixed(1)}
        </span>
      </td>
      {/* Publishing — stacked avatars + hover tooltip + +N overflow list */}
      <td className="py-3 px-4 border-r border-black/5">
        <PublishingCell published={rowPublished} />
      </td>
      {/* Last Published */}
      <td className="py-3 px-4 text-[12px] whitespace-nowrap border-r border-black/5">
        {row.publishedAt ? (
          <div>
            <p className="text-[12px] font-semibold text-[#111] font-['Inter:Semi_Bold',sans-serif]">
              {formatLastPublished(row.publishedAt)}
            </p>
            <p className="text-[10.5px] text-[#9CA3AF] mt-[1px] font-['Inter:Regular',sans-serif]">
              {formatLastPublishedRelative(row.publishedAt)}
            </p>
          </div>
        ) : (
          <span className="text-[12px] text-[#9CA3AF] italic font-['Inter:Regular',sans-serif]">
            Never
          </span>
        )}
      </td>
      {/* Days to Frontline */}
      <td className="py-3 px-4 text-[13px] font-semibold whitespace-nowrap border-r border-black/5">
        {row.isLoss ? (
          <span className="text-[#9CA3AF]">—</span>
        ) : (
          <span className="text-[#10B981]">{row.daysToFrontline} days</span>
        )}
      </td>
      {/* Hold Cost */}
      <td className="py-3 pr-2">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <span className={`text-[13px] font-bold inline-flex items-center gap-[4px] ${
              row.isLoss ? "text-[#EF4444]" : "text-[#111]"
            }`}>
              ${row.holdCost.toLocaleString()}
              {row.isLoss && <AlertTriangle size={12} strokeWidth={2.5} />}
            </span>
            <div className="mt-1 w-[100px] h-[4px] rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${row.marginPct}%`,
                  backgroundColor: row.isLoss ? "#EF4444" : "#10B981",
                }}
              />
            </div>
            <p className={`text-[10px] mt-0.5 ${row.isLoss ? "text-[#EF4444] font-semibold" : "text-[#9CA3AF]"}`}>
              {row.isLoss
                ? `-$${row.lossPerDay}/day loss`
                : `${row.marginPct}% of $${row.totalMargin.toLocaleString()} margin`}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            aria-label="More"
            className="size-[26px] shrink-0 mt-0.5 rounded-md hover:bg-black/5 flex items-center justify-center text-black/40 hover:text-black/70 transition-colors"
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Date formatters for the Last Published column ──────────────────────────
function formatLastPublished(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const sameDay =
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (sameDay) return `Today, ${time}`;
  const date = d.toLocaleDateString([], { month: "short", day: "numeric" });
  return `${date}, ${time}`;
}

function formatLastPublishedRelative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.round(ms / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export function ColHeader({ label, last = false }: { label: string; last?: boolean }) {
  return (
    <th
      className={`py-3 px-4 text-left text-[12px] font-semibold text-[#0a0a0a] whitespace-nowrap font-['Inter:Semi_Bold',sans-serif] ${
        last ? "" : "border-r border-black/5"
      }`}
    >
      <span className="flex items-center gap-1">{label}</span>
    </th>
  );
}
