import { useState } from "react";
import { PLATFORMS, type Platform, type PublishedTo } from "./publishPlatforms";

const VISIBLE = 3;

function StackedAvatar({ platform, idx, total }: { platform: Platform; idx: number; total: number }) {
  return (
    <div
      className="size-[22px] rounded-full ring-2 ring-white shrink-0 flex items-center justify-center text-[8px] font-bold font-['Inter:Bold',sans-serif]"
      style={{
        background: platform.gradient || platform.bg,
        color: platform.fg,
        fontStyle: platform.italic ? "italic" : "normal",
        zIndex: total - idx,
        marginLeft: idx === 0 ? 0 : -6,
      }}
    >
      {platform.glyph}
    </div>
  );
}

function formatDate(iso: string) {
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

export function PublishingCell({ published }: { published: PublishedTo[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  if (!published.length) {
    return (
      <span className="text-[12px] text-[#9CA3AF] italic font-['Inter:Regular',sans-serif]">
        Not published
      </span>
    );
  }

  const visible = published.slice(0, VISIBLE);
  const overflow = published.length - VISIBLE;

  return (
    <div className="relative flex items-center">
      {visible.map((p, i) => {
        const platform = PLATFORMS.find((x) => x.id === p.platformId);
        if (!platform) return null;
        return (
          <div
            key={p.platformId}
            className="relative"
            onMouseEnter={() => setHovered(p.platformId)}
            onMouseLeave={() => setHovered(null)}
            style={{ marginLeft: i === 0 ? 0 : -6, zIndex: hovered === p.platformId ? 50 : VISIBLE + 1 - i }}
          >
            <StackedAvatar platform={platform} idx={i} total={visible.length + (overflow > 0 ? 1 : 0)} />
            {hovered === p.platformId && (
              <PlatformTooltip name={platform.name} date={formatDate(p.publishedAt)} />
            )}
          </div>
        );
      })}

      {overflow > 0 && (
        <div
          className="relative"
          onMouseEnter={() => setHovered("__overflow__")}
          onMouseLeave={() => setHovered(null)}
          style={{ marginLeft: -6, zIndex: 1 }}
        >
          <div className="size-[22px] rounded-full ring-2 ring-white bg-[#F1F1F4] flex items-center justify-center text-[9px] font-bold text-[#4600F2] font-['Inter:Bold',sans-serif]">
            +{overflow}
          </div>
          {hovered === "__overflow__" && (
            <OverflowTooltip
              entries={published.slice(VISIBLE).map((p) => {
                const platform = PLATFORMS.find((x) => x.id === p.platformId);
                return { name: platform?.name ?? p.platformId, date: formatDate(p.publishedAt) };
              })}
            />
          )}
        </div>
      )}
    </div>
  );
}

function PlatformTooltip({ name, date }: { name: string; date: string }) {
  return (
    <div className="absolute left-1/2 bottom-full mb-[8px] -translate-x-1/2 pointer-events-none">
      <div className="bg-[#0a0a0a] text-white rounded-[8px] px-[10px] py-[6px] shadow-[0_8px_18px_rgba(0,0,0,0.25)] whitespace-nowrap">
        <p className="text-[11px] font-semibold font-['Inter:Semi_Bold',sans-serif] leading-tight">{name}</p>
        <p className="text-[10px] text-white/70 mt-[1px] font-['Inter:Regular',sans-serif] leading-tight">
          Published · {date}
        </p>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 top-full size-0"
        style={{
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid #0a0a0a",
        }}
      />
    </div>
  );
}

function OverflowTooltip({ entries }: { entries: { name: string; date: string }[] }) {
  return (
    <div className="absolute left-1/2 bottom-full mb-[8px] -translate-x-1/2 pointer-events-none">
      <div className="bg-[#0a0a0a] text-white rounded-[8px] px-[10px] py-[8px] shadow-[0_8px_18px_rgba(0,0,0,0.25)] min-w-[180px]">
        <p className="text-[10px] uppercase tracking-[0.6px] font-bold font-['Inter:Bold',sans-serif] text-white/55 mb-[4px]">
          Also published to
        </p>
        {entries.map((e, i) => (
          <div key={i} className="flex items-center justify-between gap-[12px] py-[2px]">
            <p className="text-[11px] font-semibold font-['Inter:Semi_Bold',sans-serif] leading-tight">{e.name}</p>
            <p className="text-[10px] text-white/55 font-['Inter:Regular',sans-serif] leading-tight">{e.date}</p>
          </div>
        ))}
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2 top-full size-0"
        style={{
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid #0a0a0a",
        }}
      />
    </div>
  );
}
