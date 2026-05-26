import { useState, useCallback } from "react";
import Frame31 from "../imports/Frame2147240606/Frame2147240606";
import { IMSImportScreen } from "./components/IMSImportScreen";
import { BenchmarksModal, type Benchmarks } from "./components/BenchmarksModal";
import { LoadingScreen } from "./components/LoadingScreen";
import { ScanningScreen } from "./components/ScanningScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { MarketingScreen } from "./components/MarketingScreen";
import { VehicleDetailScreen, type VehicleForVDP } from "./components/VehicleDetailScreen";
import { DemoSetupScreen } from "./components/DemoSetupScreen";
import { DEFAULT_DEMO_CONFIG, type DemoConfig } from "./types/demoConfig";

type Screen = "setup" | "import" | "loading" | "synced" | "scanning" | "dashboard" | "marketing" | "vdp";

export default function App() {
  const [screen, setScreen] = useState<Screen>("setup");
  const [demoConfig, setDemoConfig] = useState<DemoConfig>(DEFAULT_DEMO_CONFIG);
  const [imsName, setImsName] = useState<string>("Vincue");
  const [benchmarksOpen, setBenchmarksOpen] = useState(false);
  const [benchmarks, setBenchmarks] = useState<Benchmarks>({
    daysToFrontline: DEFAULT_DEMO_CONFIG.currentDaysToFrontline,
    holdingCostPerDay: DEFAULT_DEMO_CONFIG.holdingCostPerDay,
  });
  const [vdpVehicle, setVdpVehicle] = useState<VehicleForVDP | null>(null);

  // Demo Setup → pre-fill IMS + benchmarks from prospect inputs, then go to import
  const handleLaunchDemo = useCallback((config: DemoConfig) => {
    setDemoConfig(config);
    setImsName(config.imsProvider);
    setBenchmarks({
      daysToFrontline: config.currentDaysToFrontline,
      holdingCostPerDay: config.holdingCostPerDay,
    });
    setScreen("import");
  }, []);

  // After IMS pick: show benchmarks modal (pre-populated from setup screen)
  const handleImport = useCallback((name: string) => {
    setImsName(name);
    setBenchmarksOpen(true);
  }, []);

  const handleBenchmarksSubmit = useCallback((b: Benchmarks) => {
    setBenchmarks(b);
    setBenchmarksOpen(false);
    setScreen("loading");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setScreen("synced");
  }, []);

  const handleSyncedClick = (e: React.MouseEvent) => {
    let el: HTMLElement | null = e.target as HTMLElement;
    while (el) {
      if (el.textContent?.toLowerCase().includes("scan your inventory")) {
        setScreen("scanning");
        return;
      }
      el = el.parentElement;
    }
  };

  const handleNav = (label: string) => {
    if (label === "Marketing") setScreen("marketing");
    else if (label === "Studio AI" || label === "Inventory") setScreen("dashboard");
  };

  const openVdp = (v: VehicleForVDP) => {
    setVdpVehicle(v);
    setScreen("vdp");
  };

  if (screen === "setup") {
    return (
      <div className="size-full overflow-auto">
        <DemoSetupScreen onLaunch={handleLaunchDemo} />
      </div>
    );
  }

  if (screen === "vdp" && vdpVehicle) {
    return (
      <div className="size-full overflow-auto">
        <VehicleDetailScreen
          vehicle={vdpVehicle}
          onBack={() => setScreen("dashboard")}
          onNavigate={handleNav}
          dealershipName={demoConfig.dealershipName}
        />
      </div>
    );
  }

  if (screen === "marketing") {
    return (
      <div className="size-full overflow-auto">
        <MarketingScreen onNavigate={handleNav} demoConfig={demoConfig} />
      </div>
    );
  }

  if (screen === "dashboard") {
    return (
      <div className="size-full overflow-auto">
        <DashboardScreen
          benchmarks={benchmarks}
          onNavigate={handleNav}
          onRowClick={openVdp}
          demoConfig={demoConfig}
        />
      </div>
    );
  }

  if (screen === "scanning") {
    return (
      <div className="size-full overflow-auto">
        <ScanningScreen
          imsName={imsName}
          benchmarks={benchmarks}
          dealershipName={demoConfig.dealershipName}
          onFinish={() => setScreen("dashboard")}
        />
      </div>
    );
  }

  if (screen === "synced") {
    return (
      <div className="size-full overflow-auto" onClick={handleSyncedClick}>
        <Frame31 />
      </div>
    );
  }

  if (screen === "loading") {
    return (
      <div className="size-full overflow-auto">
        <LoadingScreen onComplete={handleLoadingComplete} />
      </div>
    );
  }

  return (
    <div className="size-full">
      <IMSImportScreen
        onImport={handleImport}
        initialImsId={demoConfig.imsProvider}
        dealershipName={demoConfig.dealershipName}
      />
      <BenchmarksModal
        open={benchmarksOpen}
        imsName={imsName}
        initialValues={benchmarks}
        onClose={() => setBenchmarksOpen(false)}
        onSubmit={handleBenchmarksSubmit}
      />
    </div>
  );
}
