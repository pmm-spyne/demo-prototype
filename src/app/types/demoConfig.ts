/**
 * DemoConfig — prospect inputs captured on the Demo Setup Screen.
 * Flows through the entire product so every number in the demo
 * reflects the prospect's actual situation, not hardcoded defaults.
 */
export interface DemoConfig {
  // ── Identity ──────────────────────────────────────────────────────────
  aeName: string;
  dealershipName: string;
  imsProvider: string; // e.g. "Vincue", "VinSolutions"

  // ── Inventory profile ─────────────────────────────────────────────────
  totalInventory: number;      // total units on lot
  monthlySalesVolume: number;  // units sold per month
  pctWithoutPhotos: number;    // 0–100, % of inventory missing photos

  // ── Financial benchmarks ──────────────────────────────────────────────
  holdingCostPerDay: number;   // $/car/day (from 5-step formula or manual)
  currentDaysToFrontline: number; // how long trade→live takes today
  avgFrontGross: number;       // average front-end gross per vehicle ($)
}

export const DEFAULT_DEMO_CONFIG: DemoConfig = {
  aeName: "",
  dealershipName: "",
  imsProvider: "Vincue",

  totalInventory: 200,
  monthlySalesVolume: 100,
  pctWithoutPhotos: 38,

  holdingCostPerDay: 46,
  currentDaysToFrontline: 12,
  avgFrontGross: 3500,
};

// ── Derived opportunity numbers ─────────────────────────────────────────────
// Used on the setup screen AND in the demo to show consistent math.

export function calcOpportunity(c: DemoConfig) {
  const vehiclesNoPhotos = Math.round((c.pctWithoutPhotos / 100) * c.totalInventory);

  // Invisible inventory: $200–300/week per unlisted unit (playbook Ch.4 §6)
  const invisibleMonthly = vehiclesNoPhotos * 220 * 4; // $220/wk × 4 weeks

  // Frontline gap: days above 3-day gold standard × holding cost × monthly throughput
  const frontlineGapDays = Math.max(0, c.currentDaysToFrontline - 1);
  const frontlineMonthly = frontlineGapDays * c.holdingCostPerDay * c.monthlySalesVolume;

  // Aged inventory: assume ~15% of lot is 45+ days
  const agedVehicles = Math.round(c.totalInventory * 0.15);
  const agedMonthly = agedVehicles * c.holdingCostPerDay * 30;

  const totalMonthly = invisibleMonthly + frontlineMonthly + agedMonthly;

  // Break-even day per vehicle
  const breakEvenDay = c.holdingCostPerDay > 0
    ? Math.round(c.avgFrontGross / c.holdingCostPerDay)
    : 76;

  return {
    vehiclesNoPhotos,
    invisibleMonthly,
    frontlineGapDays,
    frontlineMonthly,
    agedVehicles,
    agedMonthly,
    totalMonthly,
    breakEvenDay,
  };
}
