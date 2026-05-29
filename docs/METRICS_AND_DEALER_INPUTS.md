# Metrics and Dealer Inputs — Technical Reference

> This document is intended for AI agents and developers working on the demo console.
> It covers every dealer input collected on the Setup Screen, the derived financial
> calculations, and how both feed the Impact Metrics section of each pitch panel.

---

## 1. Dealer Inputs (DemoConfig)

All dealer inputs are captured on `DemoSetupScreen.tsx` and stored in the `DemoConfig`
interface (`src/app/types/demoConfig.ts`). The object is passed as `demoConfig` prop
through `Demo2` > `PitchPanel` > `StepMetricsPanel`.

### 1.1 Identity fields

| Field | Type | Where set | Purpose |
|---|---|---|---|
| `aeName` | `string` | Setup screen left panel | AE name shown in header |
| `dealershipName` | `string` | Setup screen left panel | Personalises all on-screen copy |
| `imsProvider` | `string` | Setup screen left panel | Shown in IMS import flow |

These fields are display-only and do not affect any financial calculations.

---

### 1.2 Dealership profile

| Field | Type | Options | Default | Purpose |
|---|---|---|---|---|
| `numRooftops` | `string` | `"1"`, `"2-3"`, `"4-7"`, `"8+"` | `""` | Context only, no formula impact currently |
| `inventoryMix` | `string` | `"New only"`, `"Used only"`, `"Both New & Used"` | `""` | Context only |
| `totalInventory` | `number` | Free input | `200` | Total units on lot. Used in media gap and aged inventory calculations |

---

### 1.3 Operations inputs (drive the financial model)

These two fields are the primary drivers of holding cost and TTM calculations.

#### `daysToLiveChip` — Time from trade-in to live listing

| Chip selection | Numeric value used | Notes |
|---|---|---|
| `"1-2 days"` | 2 days | Near-target |
| `"3-5 days"` | 4 days | Industry average |
| `"6-9 days"` | 7 days | Below average |
| `"10+ days"` | 12 days | Worst-case / fallback default |

Resolved via `DAYS_TO_LIVE_MAP` in `demoConfig.ts`.
If the field is empty, the fallback is **12 days** (`?? 12` in `calcOpportunity`).

#### `photographyProcess` — Current photo workflow

| Selection | % of inventory without photos | Notes |
|---|---|---|
| `"In-house team"` | 15% | Best coverage |
| `"3rd party vendor"` | 20% | Common for mid-size dealers |
| `"Freelancer"` | 30% | Inconsistent scheduling |
| `"No consistent process"` | 40% | Worst case / fallback default |

Resolved via `PHOTO_PROCESS_GAP_MAP` in `demoConfig.ts`.
If the field is empty, the fallback is **30%** (`?? 30` in `calcOpportunity`).

#### `mediaFormats` — Multi-select, context only

Options: `"Still photos"`, `"360 spins"`, `"Video walkarounds"`, `"Syndicated to portals"`, `"None yet"`.
Not used in any formula currently. Used for AE context during the discovery call.

---

### 1.4 Pain points and spend

| Field | Type | Options | Default | Purpose |
|---|---|---|---|---|
| `painPoints` | `string[]` | 6 chips (e.g. "Slow to go live", "High cost per car") | `[]` | AE discovery context, no formula impact |
| `monthlyPhotographySpend` | `string` | `"Under $5K"` to `"Over $50K"` | `""` | Used to compute `photographyCostMonthly` (preferred over perVinCost) |
| `perVinCost` | `number` | Free input | `20` | Per-VIN cost in $. Used when `monthlyPhotographySpend` is not set |

Photography cost resolution order (in `calcPhotographyCostMonthly`):
1. If `monthlyPhotographySpend` maps to a known bucket → use the bucket midpoint
2. Otherwise → `perVinCost × totalInventory`

Bucket midpoints: Under $5K = $4,000 / $5K-$10K = $7,500 / $10K-$20K = $15,000 / $20K-$50K = $35,000 / Over $50K = $60,000.

---

### 1.5 Financial inputs

| Field | Type | Options | Default | Purpose |
|---|---|---|---|---|
| `monthlySalesVolume` | `number` | Free input | `100` | Units sold per month. Core multiplier in holding cost and frontline gap calculations |
| `holdingCostPerDay` | `number` | Free input | `46` | $/car/day holding cost. The single most important financial input |
| `holdingCostChip` | `string` | `"$40"`, `"$43"`, `"$46"`, `"$50"`, `"Custom"` | `"$46"` | UI chip that sets `holdingCostPerDay`. If "Custom", user types a value directly |

Industry benchmark: **$40-$50/car/day** (source: used-car playbook Ch.4).
Demo default: **$46/day** (midpoint benchmark).

---

## 2. Derived Financial Calculations (`calcOpportunity`)

Function location: `src/app/types/demoConfig.ts` — `calcOpportunity(c: DemoConfig)`.

All derived values are computed fresh from `DemoConfig` on every render. Nothing is
cached or stored separately.

### 2.1 `currentDaysToFrontline`
```
currentDaysToFrontline = DAYS_TO_LIVE_MAP[daysToLiveChip] ?? 12
```
The dealer's actual days from trade-in to live listing, resolved from their chip
selection. Fallback of 12 days is used when no chip is selected.

### 2.2 `vehiclesNoPhotos`
```
pctWithoutPhotos       = PHOTO_PROCESS_GAP_MAP[photographyProcess] ?? 30
vehiclesNoPhotos       = round((pctWithoutPhotos / 100) × totalInventory)
```
Estimated number of units on the lot with no live photos at any given time.

### 2.3 `mediaGapMonthly` — Cost of unlisted inventory
```
mediaGapMonthly = vehiclesNoPhotos × $220/wk × 4 weeks
```
Each unlisted unit costs approximately $200-$300/week in missed leads
(playbook Ch.4 §6 "Invisible Inventory"). $220 is the midpoint estimate used here.

### 2.4 `frontlineGapDays` and `frontlineMonthly` — Cost of slow TTM
```
frontlineGapDays   = max(0, currentDaysToFrontline - 1)
frontlineMonthly   = frontlineGapDays × holdingCostPerDay × monthlySalesVolume
```
The "1" subtracted is the Studio AI 1-day target. Every day above that target
compounds across the full monthly sales volume.

### 2.5 `agedVehicles` and `agedMonthly` — Aged inventory cost
```
agedVehicles  = round(totalInventory × 15%)
agedMonthly   = agedVehicles × holdingCostPerDay × 30 days
```
Industry average: ~15% of lot sits at 45+ days (target is below 10%, playbook Ch.5 §4).

### 2.6 `totalMonthly` — Full monthly cost at risk
```
totalMonthly = mediaGapMonthly + frontlineMonthly + agedMonthly
```
This is the headline number shown on the setup screen "What Studio AI Closes" banner.

### 2.7 `breakEvenDay`
```
breakEvenDay = round($3,500 / holdingCostPerDay)
```
The day on which accumulated holding cost exceeds average front gross ($3,500, playbook Ch.6).
At $46/day, break-even is day 76.

### 2.8 `photographyCostMonthly`
See section 1.4 above.

---

## 3. Step Progression Arrays

These arrays live in two places and must be kept in sync:
- `src/app/components/Demo2.tsx` — used for the dashboard KPI bar
- `src/app/components/shared/StepMetricsPanel.tsx` — used for graphs and metric cards

Index `0` is the baseline (no steps complete). Index `1-5` correspond to each resolved bucket.

### `DTF_BY_STEP` — Days to frontline (fleet average, used for KPI bar and HC scaling only)
```
[14, 12, 10, 8, 6, 5]
 ^    ^   ^   ^  ^  ^
 |    |   |   |  |  Step 5: Smart Campaigns
 |    |   |   |  Step 4: Syndication
 |    |   |   Step 3: CGI Upgrade
 |    |   Step 2: SmartMatch
 |    Step 1: Raw Photos (Smart Shoot)
 Baseline (used when no daysToLiveChip is set)
```

> **Important:** `DTF_BY_STEP` is a fleet-average glide used for the dashboard KPI bar and
> HC scaling only. The `StepMetricsPanel` graphs use **step-specific TTM targets** (see
> section 4.3) which are more accurate and more persuasive for the pitch.

### `SCORE_BY_STEP` — Inventory score (0-10)
```
[4.2, 5.3, 6.4, 7.5, 8.4, 9.1]
```

### `HOLDING_COST_BY_STEP` — Cumulative monthly holding cost at risk ($)
```
[52500, 48200, 43600, 37300, 27900, 10000]
```
These are benchmark values calibrated to `holdingCostPerDay = $46` and
`monthlySalesVolume = 100`. They are scaled in `StepMetricsPanel` using `hcScale`
(see section 4.2 below).

### Step-to-bucket mapping
| Index | Bucket key | Product step |
|---|---|---|
| 0 | — | Baseline |
| 1 | `raw` | Step 1: Studio AI Smart Shoot |
| 2 | `nophoto` | Step 2: SmartMatch |
| 3 | `cgi` | Step 3: CGI Upgrade |
| 4 | `unsyndicated` | Step 4: Syndication |
| 5 | `aging` | Step 5: Smart Campaigns |

---

## 4. StepMetricsPanel — Redesigned Layout and Behaviour

File: `src/app/components/shared/StepMetricsPanel.tsx`

The panel renders in the **success state only** (after the AE completes the step action).
It mounts fresh when `success` becomes truthy in `PitchPanel`, which is what triggers
the entrance animation.

The panel currently renders for **Steps 1-3** (`raw`, `nophoto`, `cgi`).
Steps 4-5 have their own metric logic (see section 5).

### 4.1 Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `bucketKey` | `StepBucketKey` | Yes | The active bucket (`"raw"`, `"nophoto"`, `"cgi"`, etc.) |
| `completedSteps` | `number` | Yes | How many buckets were resolved before this pitch opened. Used to determine the After bar animation start position (previous step's result). |
| `demoConfig` | `DemoConfig` | Yes | Full dealer input object from setup screen |
| `accent` | `string` | Yes | Hex colour matching the pitch panel's eyebrow accent |
| `successMode` | `boolean` | No | When `true` (always set from PitchPanel), graphs render at full height with animation |

### 4.2 Dealer personalisation (`dealerScaledValues`)

The raw step arrays are benchmark values scaled to the dealer's actual inputs before display.

#### HC scaling
```
hcScale          = max(0.2, (holdingCostPerDay × monthlySalesVolume) / (46 × 100))
dealerHC[i]      = round(HC_STEPS[i] × hcScale)
```

`hcScale` compares the dealer's financial profile against the benchmark
(`$46/day × 100 units/month`). A dealer paying $50/day selling 150 units/month
gets `hcScale = (50 × 150) / (46 × 100) = 1.63x`. A minimum floor of `0.2` prevents
the graphs from collapsing to zero for small dealers.

#### TTM for graphs
TTM graph values are **not derived from `DTF_BY_STEP`**. They use step-specific targets
(see section 4.3) because each step fixes a specific cohort of vehicles, not the whole fleet.
The dealer's `currentDaysToFrontline` is always used as the Before value.

#### Inventory score
Score values use fixed `SCORE_STEPS` benchmark values and are not personalised.

### 4.3 Graph area — Horizontal before/after bars (Steps 1-3)

Two stacked horizontal before/after bar rows replace the old Recharts vertical charts.
**Both graphs are identical in structure across Steps 1-3.**

#### Graph 1 — Time to market

| | Step 1 (raw) | Step 2 (nophoto) | Step 3 (cgi) |
|---|---|---|---|
| Label | Time to market | Time to market | Time to market |
| Before value | `currentDaysToFrontline` (dealer input) | `currentDaysToFrontline` (dealer input) | `currentDaysToFrontline` (dealer input) |
| After value | `currentDaysToFrontline - 2` (fleet avg reduction) | `0 days` (SmartMatch is instant — no photographer needed) | `1 day` (CGI processing target) |
| Delta label | `-Xd` | `-Xd` (e.g. `-12d`) | `-Xd` |

> For Step 2, the After value is always `0d` because SmartMatch fills no-photo listings
> immediately without a photographer visit. This is the most dramatic TTM reduction in
> the demo and should be shown explicitly.
>
> For Step 3, the After value is always `1d` (CGI processing SLA).

#### Graph 2 — Holding cost at risk (monthly)

| | All steps 1-3 |
|---|---|
| Label | Holding cost at risk |
| Before value | `dealerHC[0]` — dealer's scaled baseline (always static) |
| After value | `dealerHC[afterIdx]` — scaled value for this step |
| Delta label | `+$XK recovered` |

### 4.4 Progressive bar behaviour across steps

This is the key visual mechanic:

**Before bar** — renders at the dealer's original baseline value on every step. It never
changes. It represents "where you would be today with no Spyne." This gives the AE a
persistent anchor to point at throughout the demo.

**After bar** — on each step, the bar animates FROM the previous step's After value
DOWN TO the current step's After value. The `completedSteps` prop provides the starting
position.

Example (dealer at 12-day TTM):
```
Step 1:  Before = 12d (static)  |  After animates: 12d → 10d
Step 2:  Before = 12d (static)  |  After animates: 10d → 0d
Step 3:  Before = 12d (static)  |  After animates: 0d  → 0d (already at target, no TTM change for CGI cohort)
```

Example for holding cost:
```
Step 1:  Before = $52.5K (static)  |  After animates: $52.5K → $48.2K
Step 2:  Before = $52.5K (static)  |  After animates: $48.2K → $43.6K
Step 3:  Before = $52.5K (static)  |  After animates: $43.6K → $37.3K
```

The Before bar width is always 100% of the graph container.
The After bar width is proportional: `(afterValue / beforeValue) × 100%`.

### 4.5 Entrance animation sequence (on mount)

`StepMetricsPanel` mounts fresh every time the success state activates. The animation
lives entirely inside this component via a `useEffect` on mount, using the existing
GSAP dependency.

Sequence:
1. Before bars appear instantly at full width (no animation — they are the static reference)
2. After bars start at the previous step's After value width
3. After bars animate to the current step's After value width (ease out, ~600ms)
4. Delta tag (`-2d`, `+$4.3K`) fades in next to the After bar end, holds for ~700ms, then fades to a smaller persistent label
5. After a short pause (~200ms), the 3 metric boxes count up their values

### 4.6 Metric boxes — Step-specific (one row of 3 below the graphs)

Three compact boxes sit below the graphs. The content of all three boxes is
**step-specific**. The structure is identical (icon, large delta, label, sub-label)
but the data and third box vary by step.

#### Step 1 — Smart Shoot (`raw`)

| Box | Delta | Label | Sub-label | Tooltip |
|---|---|---|---|---|
| 1 | `-Xd` | Days faster to live | `Xd to Yd` | TTM before/after, HC rate, monthly HC recovery |
| 2 | `+$X.XK` | Holding cost recovered | `this step` | HC before/after, HC rate, sales volume |
| 3 | `+X.X pts` | Listing quality | Score `X.X → Y.Y` | Score before/after, factors: media quality + VDP completeness |

Box 3 uses a mini odometer / animated score display (not a progress bar).

#### Step 2 — SmartMatch (`nophoto`)

| Box | Delta | Label | Sub-label | Tooltip |
|---|---|---|---|---|
| 1 | `X vehicles` | Matched and live | `0 photos → live in 4 min` | Vehicles matched, bucket size |
| 2 | `+$X` | Photo spend avoided | `X cars × $20/VIN` | `vehiclesNoPhotos × perVinCost` formula |
| 3 | `+X.X pts` | Listing quality | Score `X.X → Y.Y` | Score before/after |

**Photography spend avoided formula:**
```
photoSpendAvoided = vehiclesNoPhotos × perVinCost
```
Where `vehiclesNoPhotos` comes from `calcOpportunity()` and `perVinCost` defaults to
`$20` (set on the setup screen). This represents the immediate shoot cost avoided — the
cost that would have been paid to photograph each no-photo vehicle before SmartMatch.

Do not label this "monthly photography cost saved." It is the one-time backlog cost
avoided for the vehicles SmartMatch filled.

#### Step 3 — CGI Upgrade (`cgi`)

| Box | Delta | Label | Sub-label | Tooltip |
|---|---|---|---|---|
| 1 | `-Xd` | Days faster to live | `Xd to 1d` | TTM before/after, CGI processing SLA |
| 2 | `+$X.XK` | Holding cost recovered | `this step` | HC before/after, HC rate, sales volume |
| 3 | `+X.X pts` | Listing quality | Score `X.X → Y.Y` | Score before/after |

### 4.7 Inventory score display

Inventory score (Box 3 in Steps 1-3) should render as a **mini odometer / animated
number**, not a progress bar. The number animates from `scoreBefore` to `scoreAfter`
during the entrance sequence (step 5 of section 4.5 above).

A small `0 — 10` scale indicator sits below the number for context. The score is shown
in the box sub-label as `X.X → Y.Y`.

### 4.8 Where the panel renders in PitchPanel

- **Pre-action state** (`!success`): the metrics panel is NOT shown.
- **Success state** (`success` prop is set): renders below the green win banner with `successMode={true}`.

```tsx
{success && demoConfig && metricsStep && (
  <StepMetricsPanel
    bucketKey={metricsStep as StepBucketKey}
    completedSteps={completedSteps ?? 0}
    demoConfig={demoConfig}
    accent={accent}
    successMode
  />
)}
```

---

## 5. Metrics for Steps 4 and 5

### Step 4 — Syndication (`unsyndicated`)

TTM does not change at this step. Graph 1 switches from TTM to publishing reach.

**Graph 1 — Marketplace reach**
- Before: `1 channel` (dealer website only)
- After: count of `selectedChannels` (up to 6)
- Delta: `+X channels`

**Graph 2 — Holding cost at risk**
- Same progressive before/after pattern as Steps 1-3
- Before: `dealerHC[3]` (Step 3 result, static)
- After: `dealerHC[4]`

**3 metric boxes:**

| Box | Delta | Label |
|---|---|---|
| 1 | `+X channels` | Publishing reach |
| 2 | `X listings` | Now live across all channels |
| 3 | `+X.X pts` | Listing quality (score odometer) |

---

### Step 5 — Smart Campaigns (`aging`)

> **Implementation file:** `src/app/components/shared/StepMetricsPanel.tsx` — `isAging` branch.

#### Industry research basis

The Step 5 metrics are grounded in the following published sources. Do not use Spyne
internal claims for these benchmarks.

**VDP engagement uplift from visual campaign treatment:**
- AutoTrader marketplace data: listings with a "Good Deal" badge get **+31% more leads per VDP**;
  "Great Deal" badge gets **+60% more leads**. Source: Trader.ca merchandising whitepaper.
- CarGurus: top-quartile photo/visual quality listings receive **+40% more VDP views**.
  Source: CarpixAI citing CarGurus internal data (2024).
- Cox Automotive: used-car listings with real photos are **40% more likely to generate leads** vs.
  stock/no-photo. Source: xciteauto.com citing Cox Automotive (2024).
- Demo uses **+40% VDP views** as the conservative, multi-source supported figure.

**Sell-through speed reduction for promoted aged units:**
- Lotlinx / McCarthy Auto Group (12 rooftops, Kansas City): average DOL for units in a VIN-targeted
  campaign dropped from **42 days → 16 days** (62% reduction). Source: lotlinx.com/mccarthy.
- Lotlinx / Fayetteville Dodge Ram: average DOL from **38 days → 22 days** (42% reduction).
  Source: willowoodventures.com Lotlinx case study.
- Lotlinx OEM study (Dec 2023): **51% of units with 60+ DOL were sold** through a VIN-targeted
  campaign; 87% of traffic was net-new to dealer site. Source: lotlinx.com/oem-aging-inventory.
- Demo uses **45 days → 28 days** (38% reduction) — a conservative midpoint of the Lotlinx range
  that avoids the headline McCarthy result while remaining defensible.

**Holding cost and margin erosion benchmarks:**
- NADA 2025 Dealership Financial Profile: **$32–$48/day** per vehicle (floorplan + insurance +
  lot + depreciation). Source: NADA/US Tech Automations citing NADA 2025.
- WardsAuto / Colonnade Advisors (2024): **$40/day new, $85/day used**. Average turn time
  now 50.2 days, up 23% from 2023. Source: wardsauto.com.
- AutoAuctionAtlas: average used-car front gross **$1,668/unit in Q2 2025**, margin compressed
  to 5.4% (from 7.3% in 2019). After 46-60 DOL, **22-30% of front gross is eroded** by holding
  costs alone. Source: autoauctionatlas.com / NADA 2025 benchmark table.
- Demo default of **$46/day** sits at the NADA midpoint and is intentionally conservative.

#### Graph 1 — Average days on lot, aged units

This is the **mechanism graph** — it shows campaigns directly accelerating sell-through.

| | Value | Notes |
|---|---|---|
| Before | `45` days | Fixed constant. 45-day floor is the threshold at which the aging cohort is defined. |
| After | `28` days | Campaign target. Sourced from Lotlinx case data (38→22d avg, conservative mid). |
| Delta | `-17d per unit` | Displayed as `-17d` |
| Bar — Before | 100% width | Static reference (red gradient) |
| Bar — After | `(28 / 45) × 100` ≈ 62% | Green gradient, animates from 100% → 62% on mount |

```
AGED_DOL_BEFORE = 45   // constant
AGED_DOL_AFTER  = 28   // constant
agingDOLStartPct = 100
agingDOLEndPct   = Math.max(4, (AGED_DOL_AFTER / AGED_DOL_BEFORE) * 100)  // ≈ 62
```

#### Graph 2 — Margin at risk · monthly

This is the **financial outcome graph**. It is labelled "Margin at risk" (not "Holding cost")
because it captures both the direct holding cost savings AND the avoided markdown risk.

```
agingCostBefore  = agedVehicles × holdingCostPerDay × 30       (from calcOpportunity — unchanged)
agingCostAfter   = round(agingCostBefore × (28 / 45))          (DOL-ratio formula — replaces 10/15)
agingCostDelta   = agingCostBefore - agingCostAfter
```

At demo defaults ($46/day, 200 units → 30 aged vehicles):
- Before: 30 × $46 × 30 = **$41,400**
- After: $41,400 × (28/45) = **$25,760**
- Recovered: **$15,640**

This is stronger than the old `(10/15)` ratio which only recovered $13,800 and was based on
unit-count reduction rather than the campaign-driven DOL data.

| | Value |
|---|---|
| Bar — Before | 100% width (static) |
| Bar — After | `(agingCostAfter / agingCostBefore) × 100` ≈ 62% |
| Delta badge | `+$XK recovered` (green) |

#### 3 Metric boxes

| Box | Icon | Delta | Label | Sub-label | Source |
|---|---|---|---|---|---|
| 1 | Zap | `+40%` | VDP views on aged listings | `campaign visual treatment` | CarGurus / AutoTrader badge data |
| 2 | DollarSign | `+$XK` | Margin recovered | `vs. no campaign` | DOL-ratio formula above |
| 3 | Activity | `X.X` (score) | Listing quality | `+0.7 pts · 0-10` | SCORE_STEPS[4→5] |

Box 1 is the **"why it works"** box. It links the campaign mechanism to the financial outcome.
Without it, the HC recovery appears as a black-box number. With it the AE can narrate:
"Campaigns push 40% more shoppers onto your aged VDPs → they sell 17 days faster → you recover $X."

#### Success banner (PitchPanel — `aging` bucket)

| Field | Value |
|---|---|
| `title` | `"X aged units. Campaigns active."` (X = BUCKET_TOTALS.aging) |
| `subtitle` | `"Smart Campaigns applied visual promotions across your 45-day inventory. Targeted shoppers are now seeing your cars."` |
| Chip 1 | `delta: X units` / `label: "Units promoted"` |
| Chip 2 | `delta: "+40%"` / `label: "VDP views uplift"` |
| Chip 3 | `delta: "-17d"` / `label: "Avg. days on lot"` |
| Chip 4 | `delta: "+$X"` / `label: "Margin recovered"` (from holdingCostSavedAtStep) |

---

## 6. Data Flow Summary

```
DemoSetupScreen.tsx
  └─ captures DemoConfig
       └─ passed to Demo2 as demoConfig prop
            └─ Demo2 passes to PitchPanel as demoConfig prop
                 ├─ PitchPanel renders success header when success prop is set
                 └─ StepMetricsPanel receives demoConfig + bucketKey + completedSteps + accent
                      ├─ dealerScaledValues(demoConfig) → personalised hc[] array
                      ├─ step-specific TTM targets (0d for Step 2, 1d for Step 3)
                      ├─ Two horizontal before/after bar graphs (custom, no Recharts)
                      │    ├─ Before bar: always dealer baseline, static
                      │    └─ After bar: animates from prevStep value → thisStep value on mount
                      └─ Three step-specific metric boxes with GSAP count-up
```

### Key files

| File | Role |
|---|---|
| `src/app/types/demoConfig.ts` | DemoConfig interface, all lookup maps, calcOpportunity() |
| `src/app/components/DemoSetupScreen.tsx` | Captures all dealer inputs |
| `src/app/components/Demo2.tsx` | Holds step arrays (DTF/SCORE/HC_BY_STEP), passes demoConfig to PitchPanel |
| `src/app/components/shared/PitchPanel.tsx` | Renders success header and calls StepMetricsPanel |
| `src/app/components/shared/StepMetricsPanel.tsx` | Horizontal bar graphs, entrance animation, step-specific metric boxes |

### Sync requirement

`SCORE_STEPS` and `HC_STEPS` in `StepMetricsPanel.tsx` are copied
from `SCORE_BY_STEP` and `HOLDING_COST_BY_STEP` in `Demo2.tsx`.
**If you update the step arrays in Demo2.tsx, you must update StepMetricsPanel.tsx
as well.** A future improvement would export these arrays from a shared constants file.

---

*Last updated: May 2026*
