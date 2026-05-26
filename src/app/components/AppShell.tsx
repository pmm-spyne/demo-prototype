import { Megaphone } from "lucide-react";
import svgPaths from "../../imports/Frame2147240604/svg-1zmxnhi3uj";
import imgAvatar from "../../imports/Frame2147240604/3d2f716baa585f0a0eaedcf9fe1235868ac32c54.png";

export function SpyneMark() {
  return (
    <div className="relative shrink-0 size-[36px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white flex items-center justify-center left-1/2 p-[3.556px] rounded-[3.556px] top-1/2">
        <div className="relative shrink-0 size-[32.889px]">
          <div className="absolute h-[24.688px] left-[4px] top-[4px] w-[24.889px]">
            <div className="absolute inset-[-4.34%_-4.31%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0339 26.8324">
                <path d={svgPaths.p31b9c000} stroke="#FFCC00" strokeWidth="2.14494" />
                <path d={svgPaths.p11423220} stroke="#FF7700" strokeWidth="2.14494" />
                <path d={svgPaths.p398593f0} stroke="#01C6DC" strokeWidth="2.14494" />
                <path d={svgPaths.p18edc80} stroke="#00C488" strokeWidth="2.14494" />
                <ellipse cx="13.4918" cy="4.67941" rx="3.60681" ry="3.60694" stroke="#FF003D" strokeWidth="2.14494" />
              </svg>
            </div>
          </div>
          <div className="absolute h-[26.833px] left-[2.93px] top-[2.93px] w-[27.035px]">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0352 26.8328">
              <path clipRule="evenodd" d={svgPaths.p9089470} fill="#FFCC00" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p344a5800} fill="#FF7700" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.pf6f9b80} fill="#01C6DC" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p8747900} fill="#00C488" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p15f63b00} fill="#FF003D" fillRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppHeader({ dealershipName }: { dealershipName?: string } = {}) {
  const displayName = dealershipName?.trim() || "Ford Sec 48";
  const groupLabel = dealershipName?.trim() ? "Demo Prospect" : "Mega Dealer";
  return (
    <div className="bg-white drop-shadow-[0px_3px_4px_rgba(29,0,102,0.08)] flex h-[56px] items-center justify-between shrink-0 w-full z-[2] border-b border-black/10">
      <div className="flex h-[40px] items-center rounded-[8px] w-[256px] px-[8px]">
        <SpyneMark />
        <div className="flex flex-col gap-[5px] ml-3">
          <span className="font-bold text-[#402387] text-[20px] leading-[20px] font-['Inter:Bold',sans-serif]">Retail Suite</span>
          <div className="h-[11px] w-[47px]">
            <svg className="block size-full" fill="none" viewBox="0 0 47.3369 11.0003">
              <path d={svgPaths.pf0ebe00} fill="black" fillOpacity="0.4" />
              <path d={svgPaths.p30a58c00} fill="black" fillOpacity="0.4" />
              <path d={svgPaths.p2099cc00} fill="black" fillOpacity="0.4" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex gap-[8px] h-full items-center justify-center px-[32px]">
        <div className="flex gap-[16px] items-center justify-center">
          <div className="flex gap-[4px] items-center px-[12px] py-[4px] rounded-[8px]" style={{ background: "linear-gradient(90deg,rgba(70,0,242,0.04) 0%,rgba(70,0,242,0.04) 100%),#fff" }}>
            <div className="flex flex-col gap-[2px] items-start">
              <span className="text-[12px] text-black/60 font-normal font-['Inter:Regular',sans-serif] leading-[14px]">{groupLabel}</span>
              <span className="text-[14px] text-black/80 font-semibold font-['Inter:Semi_Bold',sans-serif] leading-[20px]">{displayName}</span>
            </div>
          </div>
          <div className="size-[24px]">
            <svg className="size-full" fill="none" viewBox="0 0 24 24">
              <path d={svgPaths.p220da280} fill="black" fillOpacity="0.6" />
            </svg>
          </div>
          <div className="relative rounded-[50px] size-[38px]">
            <div className="absolute inset-0 overflow-clip rounded-[50px]">
              <img alt="avatar" className="absolute inset-0 object-cover size-full" src={imgAvatar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarIcon({
  path, node, active,
}: { path?: string; node?: React.ReactNode; active?: boolean }) {
  return (
    <div className={`flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] rounded-[8px] ${active ? "bg-[rgba(70,0,242,0.1)]" : ""}`}>
      <div className="relative shrink-0 size-[24px] flex items-center justify-center">
        {node ? (
          <span className="block" style={{ color: active ? "#4600f2" : "#1C1B1F" }}>
            {node}
          </span>
        ) : (
          <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 24 24">
            <path d={path} fill={active ? "#4600f2" : "#1C1B1F"} />
          </svg>
        )}
      </div>
    </div>
  );
}

function SidebarDivider() {
  return (
    <div className="h-[8px] w-full">
      <svg className="size-full" fill="none" viewBox="0 0 64 8">
        <path d="M14 4H50" stroke="#0A0A0A" strokeLinecap="round" strokeOpacity="0.1" />
      </svg>
    </div>
  );
}

type SidebarItem =
  | { divider: true }
  | { label: string; path?: string; node?: React.ReactNode };

export function AppSidebar({
  active = "Studio AI",
  onNavigate,
}: {
  active?: string;
  onNavigate?: (label: string) => void;
} = {}) {
  const items: SidebarItem[] = [
    { label: "Home", path: svgPaths.p3c42e100 },
    { divider: true },
    { label: "Studio AI", path: svgPaths.p14b6a800 },
    { label: "Inventory", path: svgPaths.p37f9f500 },
    { label: "Vini AI", path: svgPaths.p1044bb72 },
    { label: "Marketing", node: <Megaphone size={20} strokeWidth={2} /> },
    { divider: true },
    { label: "Analytics", path: svgPaths.p2f8f7380 },
    { label: "Settings", path: svgPaths.p23a1300 },
    { label: "More", path: svgPaths.p3ddad700 },
  ];
  return (
    <div className="h-full shrink-0 w-[64px] z-[5] relative">
      <div className="flex items-center justify-center overflow-clip size-full">
        <div className="bg-white flex-1 h-full min-w-px relative">
          <div className="flex flex-col items-center justify-between pb-[6px] size-full">
            <div className="flex flex-col gap-[20px] items-center py-[16px] w-full">
              <div className="size-[30px]">
                <svg className="size-full" fill="none" viewBox="0 0 30 30">
                  <path d={svgPaths.p2a16dd00} fill="#8F8F8F" />
                </svg>
              </div>
              <div className="flex flex-col gap-[14px] items-center w-full">
                {items.map((item, i) =>
                  "divider" in item ? (
                    <SidebarDivider key={i} />
                  ) : (
                    <button
                      type="button"
                      key={i}
                      onClick={() => onNavigate?.(item.label)}
                      className="flex flex-col items-center w-full cursor-pointer"
                    >
                      <div className={`w-full flex flex-col items-center ${active === item.label ? "bg-[rgba(70,0,242,0.1)] rounded-[5px]" : ""}`}>
                        <SidebarIcon path={item.path} node={item.node} active={active === item.label} />
                      </div>
                      <p className={`text-[11px] text-center leading-[15px] font-['Inter:Medium',sans-serif] ${active === item.label ? "font-semibold text-[#4600f2]" : "font-medium text-[#0a0a0a]"}`}>
                        {item.label}
                      </p>
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] rounded-[8px]">
                <div className="size-[24px]">
                  <svg className="size-full" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p236e6f80} fill="black" />
                  </svg>
                </div>
              </div>
              <p className="text-[11px] font-medium text-[#0a0a0a] text-center leading-[15px] font-['Inter:Medium',sans-serif]">Help</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute border-[#f5f5f6] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}
