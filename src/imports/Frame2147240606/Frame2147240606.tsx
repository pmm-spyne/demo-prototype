import svgPaths from "./svg-agc6v0ufhn";
import imgAvatar from "./3d2f716baa585f0a0eaedcf9fe1235868ac32c54.png";
import imgImage11 from "./7d19b273d7376b7617df1863482a11ecd20091ec.png";

function Close() {
  return (
    <div className="absolute right-[519.5px] size-[24px] top-[165.16px] z-[3]" data-name="close">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="close" opacity="0">
          <mask height="24" id="mask0_1_3024" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_3024)">
            <path d={svgPaths.p2ce2d670} fill="var(--fill-0, #8F8F8F)" id="close_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StrokeLogo() {
  return (
    <div className="absolute h-[24.688px] left-[4px] top-[4px] w-[24.889px]" data-name="Stroke Logo">
      <div className="absolute inset-[-4.34%_-4.31%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0339 26.8324">
          <g id="Stroke Logo">
            <path d={svgPaths.p31b9c000} id="Vector 98" stroke="var(--stroke-0, #FFCC00)" strokeWidth="2.14494" />
            <path d={svgPaths.p11423220} id="Vector 98_2" stroke="var(--stroke-0, #FF7700)" strokeWidth="2.14494" />
            <path d={svgPaths.p398593f0} id="Vector 99" stroke="var(--stroke-0, #01C6DC)" strokeWidth="2.14494" />
            <path d={svgPaths.p18edc80} id="Vector 98_3" stroke="var(--stroke-0, #00C488)" strokeWidth="2.14494" />
            <ellipse cx="13.4918" cy="4.67941" id="Ellipse 449" rx="3.60681" ry="3.60694" stroke="var(--stroke-0, #FF003D)" strokeWidth="2.14494" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function OutlinedLogo() {
  return (
    <div className="absolute h-[26.833px] left-[2.93px] top-[2.93px] w-[27.035px]" data-name="Outlined Logo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0352 26.8328">
        <g id="Outlined Logo">
          <path clipRule="evenodd" d={svgPaths.p9089470} fill="var(--fill-0, #FFCC00)" fillRule="evenodd" id="Vector 98 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p344a5800} fill="var(--fill-0, #FF7700)" fillRule="evenodd" id="Vector 98 (Stroke)_2" />
          <path clipRule="evenodd" d={svgPaths.pf6f9b80} fill="var(--fill-0, #01C6DC)" fillRule="evenodd" id="Vector 99 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p8747900} fill="var(--fill-0, #00C488)" fillRule="evenodd" id="Vector 98 (Stroke)_3" />
          <path clipRule="evenodd" d={svgPaths.p15f63b00} fill="var(--fill-0, #FF003D)" fillRule="evenodd" id="Ellipse 449 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Mark() {
  return (
    <div className="relative shrink-0 size-[32.889px]" data-name="Mark">
      <StrokeLogo />
      <OutlinedLogo />
    </div>
  );
}

function SpyneLogo() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white content-stretch flex items-center justify-center left-1/2 p-[3.556px] rounded-[3.556px] top-1/2" data-name="Spyne Logo">
      <Mark />
    </div>
  );
}

function Logomark() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Logomark">
      <SpyneLogo />
    </div>
  );
}

function Group() {
  return (
    <div className="h-[11px] relative shrink-0 w-[47.337px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 47.3369 11.0003">
        <g id="Group 58938833">
          <path d={svgPaths.pf0ebe00} fill="var(--fill-0, black)" fillOpacity="0.4" id="Path 23" />
          <path d={svgPaths.p30a58c00} fill="var(--fill-0, black)" fillOpacity="0.4" id="Path 23_2" />
          <path d={svgPaths.p2099cc00} fill="var(--fill-0, black)" fillOpacity="0.4" id="Path 24" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end px-[2px] relative shrink-0">
      <Group />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#402387] text-[20px] whitespace-nowrap">
        <p className="leading-[20px]">Retail Suite</p>
      </div>
      <Frame2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start justify-center relative shrink-0">
      <Frame7 />
    </div>
  );
}

function FictionalCompanyLogo() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[8px] py-px relative shrink-0" data-name="Fictional company logo">
      <Logomark />
      <Frame6 />
    </div>
  );
}

function HeaderLhsConsole() {
  return (
    <div className="content-stretch flex h-[40px] items-center relative rounded-[8px] shrink-0 w-[256px]" data-name="Header LHS console">
      <FictionalCompanyLogo />
    </div>
  );
}

function Frame5() {
  return <div className="content-stretch flex gap-[12px] h-[38px] items-center justify-center relative rounded-[8px] shrink-0 w-[206px]" />;
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame5 />
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] not-italic relative shrink-0 whitespace-nowrap">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)]">
        <p className="leading-[14px]">Mega Dealer</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)]">
        <p className="leading-[20px]">Ford Sec 48</p>
      </div>
    </div>
  );
}

function EnterpriseLogo() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Enterprise logo">
      <Frame />
    </div>
  );
}

function Help24DpFill0Wght400Grad0Opsz() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="help_24dp_FILL0_wght400_GRAD0_opsz24 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="help_24dp_FILL0_wght400_GRAD0_opsz24 1">
          <path d={svgPaths.p220da280} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[50px] size-[38px] top-0">
      <div className="absolute inset-0 rounded-[100px]" data-name="Avatar">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgAvatar} />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0">
      <Frame8 />
      <div className="content-stretch flex gap-[4px] items-center px-[12px] py-[4px] relative rounded-[8px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(70, 0, 242, 0.04) 0%, rgba(70, 0, 242, 0.04) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Team switcher">
        <EnterpriseLogo />
      </div>
      <Help24DpFill0Wght400Grad0Opsz />
      <div className="relative rounded-[50px] shrink-0 size-[38px]">
        <Frame1 />
      </div>
    </div>
  );
}

function HeaderRhs() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center justify-center px-[32px] relative shrink-0" data-name="Header RHS">
      <Frame3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex h-full items-center justify-end relative shrink-0">
      <HeaderRhs />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_3px_4px_rgba(29,0,102,0.08)] flex h-[56px] items-center justify-between relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <HeaderLhsConsole />
      <Frame4 />
    </div>
  );
}

function LeftPanelClose() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="left_panel_close">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="left_panel_close">
          <mask height="30" id="mask0_1_2739" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="30" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="30" id="Bounding box" width="30" />
          </mask>
          <g mask="url(#mask0_1_2739)">
            <path d={svgPaths.p2a16dd00} fill="var(--fill-0, #8F8F8F)" id="left_panel_close_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Home() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="home">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="home">
          <mask height="24" id="mask0_1_2991" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_2991)">
            <path d={svgPaths.p3c42e100} fill="var(--fill-0, #1C1B1F)" id="home_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="content-stretch flex gap-[10px] h-[34px] items-center min-w-[38px] overflow-clip px-[10px] relative shrink-0" data-name="menu-item">
      <Home />
    </div>
  );
}

function Dashboard() {
  return (
    <div className="relative shrink-0 w-full" data-name="Dashboard">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <MenuItem />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Dashboard />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[11px] text-center whitespace-nowrap">Home</p>
    </div>
  );
}

function MenuItem9() {
  return (
    <div className="h-[8px] relative shrink-0 w-full" data-name="menu item79">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 8">
        <g id="menu item79">
          <path d="M14 4H50" id="Vector 1" opacity="0.1" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function AnimatedImages() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="animated_images">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="animated_images">
          <mask height="24" id="mask0_1_2735" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_2735)">
            <path d={svgPaths.p14b6a800} fill="var(--fill-0, #4600F2)" id="animated_images_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="content-stretch flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-name="menu-item">
      <AnimatedImages />
    </div>
  );
}

function Post() {
  return (
    <div className="relative shrink-0 w-full" data-name="Post">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <MenuItem1 />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[rgba(70,0,242,0.1)] content-stretch flex flex-col items-center relative rounded-[5px] shrink-0 w-[56px]">
      <Post />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] not-italic relative shrink-0 text-[#4600f2] text-[11px] text-center whitespace-nowrap">Studio AI</p>
    </div>
  );
}

function Assignment() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="assignment">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="assignment">
          <mask height="24" id="mask0_1_2943" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_2943)">
            <path d={svgPaths.p37f9f500} fill="var(--fill-0, #1C1B1F)" id="assignment_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem2() {
  return (
    <div className="content-stretch flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-name="menu-item">
      <Assignment />
    </div>
  );
}

function Website() {
  return (
    <div className="relative shrink-0 w-full" data-name="website">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <MenuItem2 />
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Website />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[11px] text-center whitespace-nowrap">Inventory</p>
    </div>
  );
}

function Psychology() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="psychology">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="psychology">
          <mask height="24" id="mask0_1_2764" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_2764)">
            <path d={svgPaths.p1044bb72} fill="var(--fill-0, #1C1B1F)" id="psychology_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem3() {
  return (
    <div className="content-stretch flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-name="menu-item">
      <Psychology />
    </div>
  );
}

function Members() {
  return (
    <div className="relative shrink-0 w-full" data-name="members">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <MenuItem3 />
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Members />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[11px] text-center whitespace-nowrap">Vini AI</p>
    </div>
  );
}

function MenuItem8() {
  return (
    <div className="h-[8px] relative shrink-0 w-full" data-name="menu item75">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64 8">
        <g id="menu item79">
          <path d="M14 4H50" id="Vector 1" opacity="0.1" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function Analytics() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="analytics">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="analytics">
          <mask height="24" id="mask0_1_2809" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_2809)">
            <path d={svgPaths.p2f8f7380} fill="var(--fill-0, #1C1B1F)" id="analytics_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem4() {
  return (
    <div className="content-stretch flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-name="menu-item">
      <Analytics />
    </div>
  );
}

function Performence() {
  return (
    <div className="relative shrink-0 w-full" data-name="performence">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <MenuItem4 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Performence />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[11px] text-center whitespace-nowrap">Analytics</p>
    </div>
  );
}

function MaterialSymbolsSettingsOutline() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="material-symbols:settings-outline">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="material-symbols:settings-outline">
          <path d={svgPaths.p23a1300} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem5() {
  return (
    <div className="content-stretch flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-name="menu-item">
      <MaterialSymbolsSettingsOutline />
    </div>
  );
}

function Tags() {
  return (
    <div className="relative shrink-0 w-full" data-name="tags">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <MenuItem5 />
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Tags />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[11px] text-center whitespace-nowrap">Settings</p>
    </div>
  );
}

function Apps() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="apps">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="apps">
          <mask height="24" id="mask0_1_2794" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_2794)">
            <path d={svgPaths.p3ddad700} fill="var(--fill-0, #1C1B1F)" id="apps_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem6() {
  return (
    <div className="content-stretch flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-name="menu-item">
      <Apps />
    </div>
  );
}

function Design() {
  return (
    <div className="relative shrink-0 w-full" data-name="Design">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <MenuItem6 />
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Design />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[11px] text-center whitespace-nowrap">More</p>
    </div>
  );
}

function MenuItems() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="menu items">
      <Frame12 />
      <MenuItem9 />
      <Frame18 />
      <Frame13 />
      <Frame14 />
      <MenuItem8 />
      <Frame15 />
      <Frame16 />
      <Frame17 />
    </div>
  );
}

function TopOptions() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center py-[16px] relative shrink-0 w-full" data-name="top options">
      <LeftPanelClose />
      <MenuItems />
    </div>
  );
}

function MaterialSymbolsLightHelpCenterOutlineRounded() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="material-symbols-light:help-center-outline-rounded">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="material-symbols-light:help-center-outline-rounded">
          <g id="Vector">
            <mask fill="black" height="18" id="path-1-outside-1_1_2915" maskUnits="userSpaceOnUse" width="18" x="3" y="3">
              <rect fill="white" height="18" width="18" x="3" y="3" />
              <path d={svgPaths.p236e6f80} />
            </mask>
            <path d={svgPaths.p236e6f80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p32424200} fill="var(--stroke-0, black)" mask="url(#path-1-outside-1_1_2915)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem7() {
  return (
    <div className="content-stretch flex h-[34px] items-center min-w-[38px] overflow-clip px-[10px] relative rounded-[8px] shrink-0" data-name="menu-item">
      <MaterialSymbolsLightHelpCenterOutlineRounded />
    </div>
  );
}

function Design1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Design">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[8px] relative size-full">
          <MenuItem7 />
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
      <Design1 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[11px] text-center whitespace-nowrap">Help</p>
    </div>
  );
}

function SidebarCollapsedLight() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-w-px relative" data-name="Sidebar-Collapsed-Light">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between pb-[6px] relative size-full">
          <TopOptions />
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-full relative shrink-0 w-[64px] z-[5]">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <SidebarCollapsedLight />
      </div>
      <div aria-hidden="true" className="absolute border-[#f5f5f6] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute contents left-[-2.65px] top-[-3.02px]" data-name="2">
      <div className="absolute flex h-[32.462px] items-center justify-center left-[6.34px] top-[40.98px] w-[32.44px]">
        <div className="flex-none rotate-30">
          <div className="h-[23.785px] relative w-[23.726px]">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7265 23.7849">
              <path d={svgPaths.p19edb00} fill="var(--fill-0, white)" id="Vector 605" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute left-[-2.65px] size-[103.626px] top-[-3.02px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103.626 103.626">
          <foreignObject height="136.002" width="136.002" x="-16.1881" y="-16.1881">
            <div style={{ backdropFilter: "blur(8.09px)", clipPath: "url(#bgblur_0_4_4811_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <g id="Ellipse 4" data-figma-bg-blur-radius="16.1881">
            <circle cx="51.8129" cy="51.8129" fill="var(--fill-0, white)" fillOpacity="0.06" r="51.7243" />
            <circle cx="51.8129" cy="51.8129" fill="url(#paint0_radial_4_4811)" fillOpacity="0.2" r="51.7243" />
            <circle cx="51.8129" cy="51.8129" r="51.7243" stroke="url(#paint1_linear_4_4811)" strokeWidth="0.177199" />
          </g>
          <defs>
            <clipPath id="bgblur_0_4_4811_clip_path" transform="translate(16.1881 16.1881)">
              <circle cx="51.8129" cy="51.8129" r="51.7243" />
            </clipPath>
            <radialGradient cx="0" cy="0" gradientTransform="translate(57.0028 27.8527) rotate(98.8228) scale(34.4012 33.6915)" gradientUnits="userSpaceOnUse" id="paint0_radial_4_4811" r="1">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.54" />
            </radialGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_4_4811" x1="73.0091" x2="57.2158" y1="1.93952" y2="50.0119">
              <stop stopColor="white" stopOpacity="0.17" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute left-[-2.65px] mix-blend-overlay size-[103.626px] top-[-3.02px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 103.626 103.626">
          <g id="Ellipse 8" opacity="0.3" style={{ mixBlendMode: "overlay" }}>
            <circle cx="51.8129" cy="51.8129" fill="url(#paint0_radial_4_4824)" r="51.8129" />
            <circle cx="51.8129" cy="51.8129" fill="var(--fill-1, black)" fillOpacity="0.2" r="51.8129" />
          </g>
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(64.9558 24.8325) rotate(99.4699) scale(79.8819)" gradientUnits="userSpaceOnUse" id="paint0_radial_4_4824" r="1">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute h-[96.092px] left-[1.13px] top-[0.76px] w-[95.714px]">
        <div className="absolute inset-[-13.39%_-13.44%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 121.439 121.817">
            <g filter="url(#filter0_f_4_4815)" id="Ellipse 5">
              <path d={svgPaths.p5847a00} stroke="url(#paint0_linear_4_4815)" strokeWidth="2.26989" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="121.817" id="filter0_f_4_4815" width="121.439" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_4_4815" stdDeviation="6.43136" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_4_4815" x1="10.2648" x2="88.4999" y1="108.955" y2="146.792">
                <stop stopColor="#ED8939" />
                <stop offset="0.331731" stopColor="#E83E54" />
                <stop offset="0.51" stopColor="#B651D7" />
                <stop offset="0.72" stopColor="#7F6AF2" />
                <stop offset="1" stopColor="#5BBFF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute h-[97.605px] left-[0.38px] top-0 w-[97.227px]">
        <div className="absolute inset-[-1.16%_-1.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.4969 99.8752">
            <g filter="url(#filter0_f_4_4819)" id="Ellipse 9" opacity="0.8">
              <path d={svgPaths.p2f4b6800} stroke="url(#paint0_linear_4_4819)" strokeWidth="0.378315" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="99.8752" id="filter0_f_4_4819" width="99.4969" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_4_4819" stdDeviation="0.567473" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_4_4819" x1="-1.50407" x2="77.9661" y1="98.7403" y2="137.177">
                <stop stopColor="#ED8939" />
                <stop offset="0.331731" stopColor="#E83E54" />
                <stop offset="0.51" stopColor="#B651D7" />
                <stop offset="0.72" stopColor="#7F6AF2" />
                <stop offset="1" stopColor="#5BBFF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute left-[-0.38px] mix-blend-soft-light size-[98.362px] top-[-0.38px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98.362 98.362">
          <g id="Ellipse 6" opacity="0.2" style={{ mixBlendMode: "soft-light" }}>
            <circle cx="49.181" cy="49.181" fill="url(#paint0_radial_4_4809)" r="49.181" />
          </g>
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(55.23 23.2755) rotate(106.205) scale(75.865 74.8754)" gradientUnits="userSpaceOnUse" id="paint0_radial_4_4809" r="1">
              <stop stopColor="white" />
              <stop offset="0.674665" stopColor="#4B4058" stopOpacity="0.62" />
              <stop offset="0.855039" stopColor="#433D4B" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function OutlinedLogo1() {
  return (
    <div className="absolute h-[38.117px] left-[4.15px] top-[4.16px] w-[38.413px]" data-name="Outlined Logo">
      <div className="absolute inset-[-43.79%_-47.79%_-52.54%_-47.8%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75.132 74.8363">
          <g id="Outlined Logo">
            <g filter="url(#filter0_d_4_4802)" id="Vector 98 (Stroke)">
              <path clipRule="evenodd" d={svgPaths.p30d84a00} fill="var(--fill-0, #FFCC00)" fillRule="evenodd" />
            </g>
            <g filter="url(#filter1_d_4_4802)" id="Vector 98 (Stroke)_2">
              <path clipRule="evenodd" d={svgPaths.p14cf0f80} fill="var(--fill-0, #FF7700)" fillRule="evenodd" />
            </g>
            <g filter="url(#filter2_d_4_4802)" id="Vector 99 (Stroke)">
              <path clipRule="evenodd" d={svgPaths.pf95da00} fill="var(--fill-0, #01C6DC)" fillRule="evenodd" />
            </g>
            <g filter="url(#filter3_d_4_4802)" id="Vector 98 (Stroke)_3">
              <path clipRule="evenodd" d={svgPaths.p1324a700} fill="var(--fill-0, #00C488)" fillRule="evenodd" />
            </g>
            <g filter="url(#filter4_d_4_4802)" id="Ellipse 449 (Stroke)">
              <path clipRule="evenodd" d={svgPaths.p28d8a90} fill="var(--fill-0, #FF003D)" fillRule="evenodd" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52.2454" id="filter0_d_4_4802" width="55.416" x="16.6764" y="22.5909">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.66904" />
              <feGaussianBlur stdDeviation="9.17974" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4_4802" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4_4802" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52.2454" id="filter1_d_4_4802" width="55.416" x="3.03359" y="22.5854">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.66904" />
              <feGaussianBlur stdDeviation="9.17974" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4_4802" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4_4802" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="53.9079" id="filter2_d_4_4802" width="52.8548" x="22.2772" y="8.64352">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.66904" />
              <feGaussianBlur stdDeviation="9.17974" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4_4802" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4_4802" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="53.9079" id="filter3_d_4_4802" width="52.8548" x="-5.34514e-07" y="8.63024">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.66904" />
              <feGaussianBlur stdDeviation="9.17974" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4_4802" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4_4802" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="50.0156" id="filter4_d_4_4802" width="50.0152" x="12.5162" y="3.26661e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.66904" />
              <feGaussianBlur stdDeviation="9.17974" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4_4802" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4_4802" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Mark1() {
  return (
    <div className="absolute left-[24.67px] size-[46.727px] top-[25.28px]" data-name="Mark">
      <OutlinedLogo1 />
    </div>
  );
}

function Component1() {
  return (
    <div className="overflow-clip relative rounded-[440.961px] shadow-[0px_27.995px_27.995px_0px_rgba(149,86,255,0.04)] shrink-0 size-[98.127px]" data-name="Component 540">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none rounded-[440.961px]" />
      <Component />
      <Mark1 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-2.27px_5.296px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-center p-[2.333px] relative rounded-[77.75px] shrink-0">
      <Component1 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div className="mr-[-25.03px] relative rounded-[95.157px] shrink-0 size-[95.157px]" data-name="image 11">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[95.157px] size-full" src={imgImage11} />
      </div>
      <Frame21 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center not-italic relative shrink-0 whitespace-nowrap">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] relative shrink-0 text-[#0a0a0a] text-[24px]">Inventory is fully synced with Vincue</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#8f8f8f] text-[14px]">We found 234 vehicles on vincue which have synced here with spyne</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative rounded-[95.157px] shrink-0 size-[28px]" data-name="image 11">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[95.157px] size-full" src={imgImage11} />
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.8)] whitespace-nowrap">Inventory on Vincue</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0 w-[240px]">
      <div aria-hidden="true" className="absolute border-0 border-[rgba(76,191,255,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame25 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">234</p>
    </div>
  );
}

function StrokeLogo1() {
  return (
    <div className="absolute h-[20.351px] left-[3.3px] top-[3.3px] w-[20.517px]" data-name="Stroke Logo">
      <div className="absolute inset-[-4.34%_-4.31%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2847 22.1186">
          <g id="Stroke Logo">
            <path d={svgPaths.p2c64e200} id="Vector 98" stroke="var(--stroke-0, #FFCC00)" strokeWidth="1.76813" />
            <path d={svgPaths.p8b9d6c0} id="Vector 98_2" stroke="var(--stroke-0, #FF7700)" strokeWidth="1.76813" />
            <path d={svgPaths.p375e67f0} id="Vector 99" stroke="var(--stroke-0, #01C6DC)" strokeWidth="1.76813" />
            <path d={svgPaths.p22e4bb80} id="Vector 98_3" stroke="var(--stroke-0, #00C488)" strokeWidth="1.76813" />
            <ellipse cx="11.1216" cy="3.85736" id="Ellipse 449" rx="2.97318" ry="2.97329" stroke="var(--stroke-0, #FF003D)" strokeWidth="1.76813" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function OutlinedLogo2() {
  return (
    <div className="absolute h-[22.119px] left-[2.41px] top-[2.41px] w-[22.286px]" data-name="Outlined Logo">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2857 22.1189">
        <g id="Outlined Logo">
          <path clipRule="evenodd" d={svgPaths.p1b6c6300} fill="var(--fill-0, #FFCC00)" fillRule="evenodd" id="Vector 98 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p2df7f900} fill="var(--fill-0, #FF7700)" fillRule="evenodd" id="Vector 98 (Stroke)_2" />
          <path clipRule="evenodd" d={svgPaths.p1462b680} fill="var(--fill-0, #01C6DC)" fillRule="evenodd" id="Vector 99 (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p19cec900} fill="var(--fill-0, #00C488)" fillRule="evenodd" id="Vector 98 (Stroke)_3" />
          <path clipRule="evenodd" d={svgPaths.pdce1e80} fill="var(--fill-0, #FF003D)" fillRule="evenodd" id="Ellipse 449 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Mark2() {
  return (
    <div className="relative shrink-0 size-[27.111px]" data-name="Mark">
      <StrokeLogo1 />
      <OutlinedLogo2 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <Mark2 />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.8)] whitespace-nowrap">Inventory Synced</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0 w-[240px]">
      <div aria-hidden="true" className="absolute border-0 border-[#c9ecff] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Frame26 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">234</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Frame23 />
      <Frame24 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0">
      <Frame9 />
      <Frame27 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[38px] items-center relative shrink-0">
      <Frame22 />
      <Frame28 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[3.691px] items-center px-[54px] py-[16px] relative rounded-[14.765px] shrink-0" style={{ backgroundImage: "linear-gradient(171.792deg, rgb(237, 137, 57) 8.8462%, rgb(232, 62, 84) 36.974%, rgb(182, 81, 215) 52.09%, rgb(127, 106, 242) 69.896%, rgb(91, 191, 246) 93.638%), linear-gradient(90deg, rgb(70, 0, 242) 0%, rgb(70, 0, 242) 100%)" }}>
      <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-center text-white whitespace-nowrap">
        <p className="leading-[32px]">Scan your inventory</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[58px] items-center relative shrink-0">
      <Frame29 />
      <Frame30 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#f4f5f8] flex-[1_0_0] h-full min-w-px relative z-[2]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center pb-[24px] pt-[16px] px-[24px] relative size-full">
          <Frame10 />
        </div>
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-[1_0_0] isolate items-start min-h-px relative w-[1440px] z-[1]" data-name="Body">
      <Frame11 />
      <Frame20 />
    </div>
  );
}

export default function Frame31() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start relative size-full">
      <Close />
      <Header />
      <Body />
    </div>
  );
}