import { useMemo, useState, useCallback } from "react";
import Frame31 from "../../imports/Frame2147240606/Frame2147240606";
import { IMSImportScreen } from "./IMSImportScreen";
import { BenchmarksModal, DEFAULT_BENCHMARKS, type Benchmarks } from "./BenchmarksModal";
import { LoadingScreen } from "./LoadingScreen";
import { ScanningScreen } from "./ScanningScreen";
import { DashboardScreen } from "./DashboardScreen";
import { MarketingScreen } from "./MarketingScreen";
import { VehicleDetailScreen, type VehicleForVDP } from "./VehicleDetailScreen";
import { calcOpportunity, type DemoConfig } from "../types/demoConfig";

type Screen = "import" | "loading" | "synced" | "scanning" | "dashboard" | "marketing" | "vdp";

interface Props {
  demoConfig?: DemoConfig;
}

function benchmarksFromConfig(config: DemoConfig): Benchmarks {
  const opp = calcOpportunity(config);
  return {
    daysToFrontline: opp.currentDaysToFrontline,
    holdingCostPerDay: config.holdingCostPerDay,
  };
}

export function Demo1({ demoConfig }: Props) {
  const initialBenchmarks = useMemo(
    () => (demoConfig ? benchmarksFromConfig(demoConfig) : DEFAULT_BENCHMARKS),
    [demoConfig],
  );

  const [screen, setScreen] = useState<Screen>("import");
  const [imsName, setImsName] = useState<string>(demoConfig?.imsProvider ?? "Vincue");
  const [benchmarksOpen, setBenchmarksOpen] = useState(false);
  const [benchmarks, setBenchmarks] = useState<Benchmarks>(initialBenchmarks);
  const [vdpVehicle, setVdpVehicle] = useState<VehicleForVDP | null>(null);

  const handleImport = useCallback((name: string) => {
    setImsName(name);
    if (demoConfig) {
      setBenchmarks(benchmarksFromConfig(demoConfig));
      setScreen("loading");
    } else {
      setBenchmarksOpen(true);
    }
  }, [demoConfig]);

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

  if (screen === "vdp" && vdpVehicle) {
    return (
      <div className="size-full overflow-auto">
        <VehicleDetailScreen
          vehicle={vdpVehicle}
          onBack={() => setScreen("dashboard")}
          onNavigate={handleNav}
        />
      </div>
    );
  }

  if (screen === "marketing") {
    return (
      <div className="size-full overflow-auto">
        <MarketingScreen onNavigate={handleNav} />
      </div>
    );
  }

  if (screen === "dashboard") {
    return (
      <div className="size-full overflow-auto">
        <DashboardScreen benchmarks={benchmarks} onNavigate={handleNav} onRowClick={openVdp} />
      </div>
    );
  }

  if (screen === "scanning") {
    return (
      <div className="size-full overflow-auto">
        <ScanningScreen
          imsName={imsName}
          benchmarks={benchmarks}
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
        initialImsId={demoConfig?.imsProvider}
        dealershipName={demoConfig?.dealershipName}
        demoConfig={demoConfig}
      />
      {!demoConfig && (
        <BenchmarksModal
          open={benchmarksOpen}
          imsName={imsName}
          onClose={() => setBenchmarksOpen(false)}
          onSubmit={handleBenchmarksSubmit}
        />
      )}
    </div>
  );
}
