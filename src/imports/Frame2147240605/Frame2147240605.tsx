import svgPaths from "./svg-7hx2qcnpn1";
import imgAvatar from "./3d2f716baa585f0a0eaedcf9fe1235868ac32c54.png";
import imgImage11 from "./7d19b273d7376b7617df1863482a11ecd20091ec.png";
import imgAvatarImage60 from "./721b2cac5df6796f1d2361ccbed5eb7d9b697095.png";

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
    <div className="absolute contents left-[-2.34px] top-[-2.67px]" data-name="2">
      <div className="absolute flex h-[28.647px] items-center justify-center left-[5.6px] top-[36.17px] w-[28.629px]">
        <div className="flex-none rotate-30">
          <div className="h-[20.99px] relative w-[20.939px]">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.9387 20.9902">
              <path d={svgPaths.p12bf3600} fill="var(--fill-0, white)" id="Vector 605" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute left-[-2.34px] size-[91.45px] top-[-2.67px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.45 91.45">
          <foreignObject height="120.022" width="120.022" x="-14.286" y="-14.286">
            <div style={{ backdropFilter: "blur(7.14px)", clipPath: "url(#bgblur_0_1_3810_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <g id="Ellipse 4" data-figma-bg-blur-radius="14.286">
            <circle cx="45.725" cy="45.725" fill="var(--fill-0, white)" fillOpacity="0.06" r="45.6468" />
            <circle cx="45.725" cy="45.725" fill="url(#paint0_radial_1_3810)" fillOpacity="0.2" r="45.6468" />
            <circle cx="45.725" cy="45.725" r="45.6468" stroke="url(#paint1_linear_1_3810)" strokeWidth="0.156378" />
          </g>
          <defs>
            <clipPath id="bgblur_0_1_3810_clip_path" transform="translate(14.286 14.286)">
              <circle cx="45.725" cy="45.725" r="45.6468" />
            </clipPath>
            <radialGradient cx="0" cy="0" gradientTransform="translate(50.3051 24.5801) rotate(98.8228) scale(30.3591 29.7328)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_3810" r="1">
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.54" />
            </radialGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_3810" x1="64.4307" x2="50.4931" y1="1.71163" y2="44.1356">
              <stop stopColor="white" stopOpacity="0.17" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute left-[-2.34px] mix-blend-overlay size-[91.45px] top-[-2.67px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.45 91.45">
          <g id="Ellipse 8" opacity="0.3" style={{ mixBlendMode: "overlay" }}>
            <circle cx="45.725" cy="45.725" fill="url(#paint0_radial_1_3808)" r="45.725" />
            <circle cx="45.725" cy="45.725" fill="var(--fill-1, black)" fillOpacity="0.2" r="45.725" />
          </g>
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(57.3237 21.9148) rotate(99.4699) scale(70.496)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_3808" r="1">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute h-[84.801px] left-px top-[0.67px] w-[84.468px]">
        <div className="absolute inset-[-13.39%_-13.44%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 107.17 107.504">
            <g filter="url(#filter0_f_1_3806)" id="Ellipse 5">
              <path d={svgPaths.p10b6bd80} stroke="url(#paint0_linear_1_3806)" strokeWidth="2.00318" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="107.504" id="filter0_f_1_3806" width="107.17" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_3806" stdDeviation="5.67569" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_3806" x1="9.05869" x2="78.1014" y1="96.1529" y2="129.544">
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
      <div className="absolute h-[86.137px] left-[0.33px] top-0 w-[85.803px]">
        <div className="absolute inset-[-1.16%_-1.17%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87.8063 88.1401">
            <g filter="url(#filter0_f_1_3824)" id="Ellipse 9" opacity="0.8">
              <path d={svgPaths.pde28000} stroke="url(#paint0_linear_1_3824)" strokeWidth="0.333864" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="88.1401" id="filter0_f_1_3824" width="87.8063" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_3824" stdDeviation="0.500796" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_3824" x1="-1.32735" x2="68.8053" y1="87.1385" y2="121.059">
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
      <div className="absolute left-[-0.34px] mix-blend-soft-light size-[86.805px] top-[-0.33px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86.8047 86.8047">
          <g id="Ellipse 6" opacity="0.2" style={{ mixBlendMode: "soft-light" }}>
            <circle cx="43.4023" cy="43.4023" fill="url(#paint0_radial_1_3828)" r="43.4023" />
          </g>
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(48.7406 20.5407) rotate(106.205) scale(66.951 66.0778)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_3828" r="1">
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
    <div className="absolute h-[33.639px] left-[3.67px] top-[3.67px] w-[33.899px]" data-name="Outlined Logo">
      <div className="absolute inset-[-43.79%_-47.8%_-52.54%_-47.8%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66.3042 66.0431">
          <g id="Outlined Logo">
            <g filter="url(#filter0_d_1_3814)" id="Vector 98 (Stroke)">
              <path clipRule="evenodd" d={svgPaths.p2c2c5100} fill="var(--fill-0, #FFCC00)" fillRule="evenodd" />
            </g>
            <g filter="url(#filter1_d_1_3814)" id="Vector 98 (Stroke)_2">
              <path clipRule="evenodd" d={svgPaths.p2b203c00} fill="var(--fill-0, #FF7700)" fillRule="evenodd" />
            </g>
            <g filter="url(#filter2_d_1_3814)" id="Vector 99 (Stroke)">
              <path clipRule="evenodd" d={svgPaths.p11957800} fill="var(--fill-0, #01C6DC)" fillRule="evenodd" />
            </g>
            <g filter="url(#filter3_d_1_3814)" id="Vector 98 (Stroke)_3">
              <path clipRule="evenodd" d={svgPaths.p211d3e80} fill="var(--fill-0, #00C488)" fillRule="evenodd" />
            </g>
            <g filter="url(#filter4_d_1_3814)" id="Ellipse 449 (Stroke)">
              <path clipRule="evenodd" d={svgPaths.p13b22300} fill="var(--fill-0, #FF003D)" fillRule="evenodd" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="46.1067" id="filter0_d_1_3814" width="48.9048" x="14.717" y="19.9365">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.47294" />
              <feGaussianBlur stdDeviation="8.10115" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_3814" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_3814" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="46.1067" id="filter1_d_1_3814" width="48.9048" x="2.67718" y="19.9313">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.47294" />
              <feGaussianBlur stdDeviation="8.10115" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_3814" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_3814" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="47.5738" id="filter2_d_1_3814" width="46.6445" x="19.6597" y="7.628">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.47294" />
              <feGaussianBlur stdDeviation="8.10115" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_3814" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_3814" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="47.5738" id="filter3_d_1_3814" width="46.6445" x="-1.66641e-07" y="7.61624">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.47294" />
              <feGaussianBlur stdDeviation="8.10115" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_3814" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_3814" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="44.1389" id="filter4_d_1_3814" width="44.1386" x="11.0456" y="-1.30458e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.47294" />
              <feGaussianBlur stdDeviation="8.10115" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_3814" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_3814" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Mark1() {
  return (
    <div className="absolute left-[21.78px] size-[41.237px] top-[22.31px]" data-name="Mark">
      <OutlinedLogo1 />
    </div>
  );
}

function Component1() {
  return (
    <div className="overflow-clip relative rounded-[389.149px] shadow-[0px_24.706px_24.706px_0px_rgba(149,86,255,0.04)] shrink-0 size-[86.597px]" data-name="Component 540">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none rounded-[389.149px]" />
      <Component />
      <Mark1 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-2.003px_4.674px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-center p-[2.333px] relative rounded-[77.75px] shrink-0">
      <div aria-hidden="true" className="absolute border-[#ed8939] border-[2.31px] border-solid inset-[-2.31px] pointer-events-none rounded-[80.06px]" />
      <Component1 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[14.971px] items-center justify-center relative shrink-0">
      <div className="relative rounded-[95.157px] shrink-0 size-[95.157px]" data-name="image 11">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[95.157px] size-full" src={imgImage11} />
      </div>
      <div className="h-0 relative shrink-0 w-[271.114px]">
        <div className="absolute inset-[-6px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 271.114 6">
            <line id="Line 4248" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" strokeWidth="6" x1="3" x2="268.114" y1="3" y2="3" />
          </svg>
        </div>
      </div>
      <Frame21 />
      <div className="absolute h-0 left-[109.74px] top-[47.58px] w-[43px]">
        <div className="absolute inset-[-6px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 6">
            <line id="Line 4249" stroke="var(--stroke-0, #027A48)" strokeLinecap="round" strokeWidth="6" x1="3" x2="40" y1="3" y2="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center not-italic relative shrink-0 whitespace-nowrap">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] relative shrink-0 text-[#0a0a0a] text-[24px]">Fetching your inventory from your IMS</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#8f8f8f] text-[14px]">{`Feel free to head out. We'll notify you when your vehicles arrive.`}</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0">Jessica Camron</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">+112 8900 7890</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#fafafa] content-stretch flex gap-[12px] items-center p-[12px] relative rounded-[12px] shrink-0">
      <div className="relative rounded-[30px] shrink-0 size-[44px]" data-name="Avatar / Image-60">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[30px] size-full" src={imgAvatarImage60} />
      </div>
      <Frame24 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-full not-italic relative shrink-0 text-[#cdcccc] text-[12px] tracking-[0.96px] uppercase w-[min-content]">Your account manager</p>
      <Frame23 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0">
      <Frame22 />
      <Frame9 />
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

export default function Frame26() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start relative size-full">
      <Close />
      <Header />
      <Body />
    </div>
  );
}