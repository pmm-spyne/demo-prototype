# Studio AI — Product Context & Improvement Roadmap

> **For agents and contributors:** Read this before touching any code. It captures the product's purpose, the validated industry benchmarks that should inform every number in the UI, and a prioritized list of improvements grounded in those benchmarks.

---

## 1. What Studio AI Is

Studio AI is a B2B SaaS console for **auto dealerships**. It connects to a dealer's Inventory Management System (IMS — e.g., Vincue), scans the full lot for media gaps and aging signals, and uses AI to:

- **Smart Match** — Auto-fill missing vehicle photos using stock/CGI images matched by year, make, model, trim, and color.
- **Merchandising** — Transform raw lot photos into studio-quality white-background visuals.
- **Syndication / Publishing** — Push polished listings to third-party platforms (AutoTrader, Cars.com, KBB, CarGurus, TrueCar, Facebook, Instagram, TikTok, dealer website).
- **Smart Campaigns** — Rule-based visual campaigns applied to aging or seasonal inventory (aged >45 days, CPO trust, holiday, dealership billboard).

Everything is framed through a **financial cost lens**: the dealer inputs their holding cost per day and days-to-frontline benchmark, and every vehicle row shows them exactly how much delay is costing in dollars.

### User Journey (current prototype flow)

1. **IMS Import** (`IMSImportScreen`) — Dealer picks their IMS provider (e.g., Vincue).
2. **Benchmarks Setup** (`BenchmarksModal`) — Dealer sets Days to Frontline (default: 50) and Holding Cost/day (default: $40).
3. **Loading + Sync** (`LoadingScreen`) — Inventory imports.
4. **Scan** (`ScanningScreen`) — Analyzes media gaps: no photos, raw photos, CGI photos.
5. **Dashboard** (`DashboardScreen`) — Main workspace: health metrics, vehicle table, bulk actions, filter chips by age.
6. **Vehicle Detail Page** (`VehicleDetailScreen`) — Per-vehicle view: overview, images (before/after), 360 spin, video tour.
7. **Marketing** (`MarketingScreen`) — Smart Campaigns hub: pre-built templates + AI prompt input.

### Key Components

| File | Purpose |
|---|---|
| `src/app/components/BenchmarksModal.tsx` | Collects daysToFrontline + holdingCostPerDay; feeds all downstream cost math |
| `src/app/components/HoldingCostCalculatorModal.tsx` | "Don't know? Calculate →" helper — currently placeholder |
| `src/app/components/DashboardScreen.tsx` | Main inventory table; filter chips; summary cards; Smart Match spotlight |
| `src/app/components/NeedActionsWidget.tsx` | Floating panel surfacing vehicles with no photos / no hero angle |
| `src/app/components/SelectionActionBar.tsx` | Bulk action bar when aged filter is applied and rows are selected |
| `src/app/components/SmartCampaignModal.tsx` | Campaign template picker (Ageing, Promotional, Festive, Certified) |
| `src/app/components/TransformationSummaryModal.tsx` | Auto-opens on dashboard load; shows scan results + score lift |
| `src/app/components/MarketingScreen.tsx` | Campaign hub with AI prompt + 4 suggested templates |
| `src/app/components/publishPlatforms.ts` | Platform list: Vincue, AutoTrader, Cars.com, KBB, CarGurus, TrueCar, Spyne Smartview, Facebook, Instagram, TikTok |

---

## 2. Industry Benchmarks (Source: *The Used Car Manager's Ultimate Playbook* by Chris J. Martinez)

> Full source document: `docs/used-car-playbook.md` (123-page OCR of the original PDF).
> Author background: 22+ years as a used-car GM at CarMax, Universal Toyota, Charles Maund Toyota (150 → 1,100 units/month), Jackie Cooper Auto Group, Mercedes-Benz of San Antonio. Founded The AutoMiner (2015), exited to PureCars (2022).

### 2a. Holding Cost

**The industry-standard formula (5-step):**

```
Step 1: Fixed Expense = YTD Total Used Vehicle Expense − YTD Variable Expense
         Example: $4,800,000 − $2,800,000 = $2,000,000

Step 2: Monthly Fixed = Fixed Expense ÷ 12
         $2,000,000 ÷ 12 = $166,667/month

Step 3: Avg Units in Stock = Monthly Sales × 1.33
         100 sales/month × 1.33 = 133 units

Step 4: Cost per Unit/Month = Monthly Fixed ÷ Avg Units
         $166,667 ÷ 133 = $1,254/unit/month

Step 5: Holding Cost/Day = Cost per Unit/Month ÷ 27 working days
         $1,254 ÷ 27 = $46.44/car/day
```

**Key benchmarks:**
- Validated industry range: **$40–$50/car/day**
- Typical mid-volume store: **~$46.44/car/day**
- Current prototype default: $40/day (acceptable floor; can be raised to $46)

**What $46/day means in real terms:**
- 40 cars sitting 10 extra days = **$18,400 burned** (18% of monthly net)
- 30 cars in recon 7 extra days = **$9,763 lost** (≈10% of monthly net)
- Turn slowing 0.5× (1.8x → 1.3x) = **$579,600/year in lost opportunity**

**Break-even day formula:**
```
Break-Even Day = Average Front Gross ÷ Holding Cost/Day
Example: $3,500 ÷ $46 = 76 days
→ Any car past day 76 has wiped out its entire front-end gross in holding cost.
```

**Gross ROI/Day formula (better than gross alone):**
```
Gross ROI/Day = Front Gross ÷ Days in Stock
Good: $3,500 ÷ 30 days = $116.67/day (2.5× holding cost — healthy)
Marginal: $3,500 ÷ 60 days = $58.33/day (barely above holding cost)
Bad: Any car where ROI/Day < Holding Cost/Day = you're losing money
```

---

### 2b. Speed to Frontline (Time to Live)

**The gold standard: 3 days from trade intake to live online.**

| Phase | Target Time | Key Action |
|---|---|---|
| Day 0 — Intake | Immediate | Appraisal, photos, RO estimate created |
| Day 1 — Mechanical | 24 hours | Tech completes repairs |
| Day 2 — Cosmetic/Detail | 24 hours | Paint touch-ups, interior detail, QC |
| Day 3 — Merchandising | End of day | Photos uploaded, unit live on site |

- **"Days to Frontline"** = recon + photo + online. Target: **< 3 days**.
- **"Days to Sale"** = full on-lot average turn. Target: **20–30 days** (healthy), 45+ days = danger zone.

> ⚠️ **Important distinction the prototype currently conflates:** The `BenchmarksModal` default of "50 days" is a *days-to-sale* metric, not a *days-to-frontline* metric. These are fundamentally different. The prototype should surface both separately.

**Invisible inventory cost:**
> Each unlisted unit costs **$200–$300/week** in missed opportunity.
> 20 cars stuck offline = ~7 lost leads/day = 1 fewer sale every 24 hours = **$2,000–$3,000/day in unrealized gross.**

---

### 2c. The 15/30/45-Day Repricing and Action Ladder

This is the operational calendar every used-car manager uses — and it maps directly to the dashboard filter chips:

| Days on Lot | Status Label | Dealer Action | Price Adjustment |
|---|---|---|---|
| 0–15 | **Fresh** | Showcase, test drives, confirm photos are live | Hold price (stay at 98–100% of market avg) |
| 16–30 | **Aware** | Check VDP views, adjust if below top-10 rank | −1% to −2% |
| 31–45 | **Aggressive** | Reprice to move, boost digital presence | −3% to −5% |
| 45+ | **Liquidate** | Campaign urgency, wholesale decision point | As needed to free capital |

> The playbook's phrase: *"The longer it sits, the more you've already discounted it — even if you haven't changed the price."*

**15-Day Walk Checklist** (preventative):
1. Physical condition — clean, tires dressed?
2. 30+ high-res photos uploaded?
3. Price within 98–100% of market average?
4. VDP views trending up or down?
5. Does every manager know the story for this unit?

**45-Day Walk Checklist** (profit triage):
1. Calculate ROI/Day — if < $46, you're upside down
2. Still in top 5 search results within 25-mile radius?
3. Are certain price bands getting stale? (adjust future buying)
4. Exit strategy: Retail Again / Wholesale Now / Trade Hold

---

### 2d. Inventory Mix Rule (30-40-30)

For lots with 100+ units:

| Segment | % of Inventory | Purpose |
|---|---|---|
| Affordable ($10k–$25k) | 30% | Volume & BDC traffic |
| Core ($25k–$45k) | 40% | Bread-and-butter retail sales |
| Premium ($45k+) | 30% | High-margin, trade bait |

---

### 2e. Other Validated Benchmarks (Quick Reference)

| Metric | Target | Formula |
|---|---|---|
| Turn Rate | 1.6–2.0× per month | Units Sold ÷ Avg Inventory |
| Total PVR (Front + Back) | $3,500+ | — |
| Front-End Gross (after pack) | $1,500/unit | — |
| Back-End PVR | $2,000+/unit | — |
| Net-to-Gross | 30%+ | Net Profit ÷ Total Gross × 100 |
| Return on Sales (ROS) | 4–4.5% | Net Profit ÷ Sales Revenue × 100 |
| Recon Time | < 3 days | Day 0 intake to Day 3 live online |
| Finance Penetration | 70–75% | Financed Deals ÷ Total Retail × 100 |
| Aged Inventory % | < 10% | Aged Units ÷ Total Inventory × 100 |
| Avg Recon Cost per Unit | $1,000–$1,400 | Total Recon ÷ Retail Units |
| Trade Retention % | 65–70% | Retail Trades ÷ Total Trades × 100 |
| Gross ROI/Day | $100+/day | Front Gross ÷ Days in Stock |
| Holding Cost/Day | $40–$50 | See 5-step formula above |
| Cost-to-Market % | 97–99% | Your Price ÷ Market Avg × 100 |

---

## 3. Suggested Improvements to Studio AI

Ordered by implementation priority. Each improvement cites the specific component(s) to change and the playbook source.

---

### Priority 1 — `HoldingCostCalculatorModal`: Implement the Real 5-Step Formula

**Current state:** The modal is a stub / placeholder. Dealers who don't know their holding cost have no real guidance.

**What to build:** A step-by-step calculator with 4 input fields:
1. YTD Total Used Vehicle Expense (e.g., $4,800,000)
2. YTD Variable Expense (commissions, policy, delivery) (e.g., $2,800,000)
3. Average Monthly Sales Volume (e.g., 100 units)
4. Working Days per Month (default: 27)

Output: `$XX.XX / car / day` — auto-populated into the BenchmarksModal `holdingCostPerDay` field.

**Why this matters:** A dealer who sees *their own number* — calculated from their own P&L — is far more likely to take holding cost urgency seriously than one who accepted a generic $40 default.

**Playbook source:** Chapter 6, Section 3 (pages 40–41).

---

### Priority 2 — `BenchmarksModal`: Separate "Days to Frontline" from "Days to Sale"

**Current state:** Single field labeled "Days to frontline" with a default of 50 days. This is actually a days-to-sale metric. The industry gold standard for true time-to-frontline (recon → photos → live online) is **< 3 days**.

**What to change:**
- Rename the existing 50-day field to **"Average Days to Sale"** (current lot turn average).
- Add a second field: **"Current Days to Frontline"** (how long from trade intake to the car being live online), defaulting to 10–12 days (realistic for most stores).
- Show the benchmark context: *"Industry gold standard: 3 days. Studio AI targets: 1 day."*

This unlocks a sharper "aha" moment in `TransformationSummaryModal`: not just "we saved X days on your 50-day cycle" but "we collapsed your 12-day frontline process to 1 day — that's 11 days × $46 × [N vehicles] = $Y saved."

**Playbook source:** Chapter 4 (pages 28–33), Quick Sheet (page 3).

---

### Priority 3 — `DashboardScreen`: Reframe Filter Chips to the 15/30/45-Day Ladder

**Current state:** Filter chips are `Age <40 days`, `Age >40 days`, `Age >60 days`. These don't match the mental model dealers use.

**What to change:** Rename and recolor to match the operational ladder:

| Current | Proposed | Color / Behavior |
|---|---|---|
| (none) | `0–15 days` "Fresh" | Green — no action needed |
| `Age <40 days` | `16–30 days` "Watch" | Yellow — check VDP engagement |
| `Age >40 days` | `31–45 days` "Act Now" | Orange + pulse animation (already exists!) |
| `Age >60 days` | `45+ days` "Liquidate" | Red + pulse animation |

The pulse animation on the >40 and >60 chips is already implemented via GSAP in `FilterChip`. Just the label and threshold values need to change.

**Playbook source:** Chapter 5 Section 4 (15/30/45-Day Repricing Model), Chapter 7 (The 15-Day and 45-Day Walks).

---

### Priority 4 — `DashboardScreen` Vehicle Table: Add Gross ROI/Day

**Current state:** The `Hold. Cost` column shows:
- Healthy cars: `$229` + `12% of $4,500 margin` bar
- Aged/loss cars: `$1,894` + `-$168/day loss` in red

**What to add:** Show **Gross ROI/Day** as the sub-caption on healthy cars:
- Healthy: *"$116/day ROI"* (green)
- Marginal (ROI/Day < 2× holding cost): *"$62/day ROI"* (yellow)
- Upside down (ROI/Day < holding cost): Switch to *"-$X/day loss"* (red — already implemented)

Also add a per-row **break-even tooltip**: *"Break-even at day 76 — you're at day 24."*

**Playbook source:** Chapter 6 Section 7 (Gross ROI/Day Framework, pages 42–43).

---

### Priority 5 — `NeedActionsWidget`: Quantify the Missed Revenue, Not Just the Count

**Current state:** Header reads: *"12 vehicles not ready to sell!"* with sub-copy *"Add respective media to these aged vehicles."*

**What to change:** Replace with financially quantified language:

```
"12 vehicles costing ~$2,160/week in missed leads"
(based on $200–$300/week per unlisted unit × 12 vehicles)
```

Or, if the dealer's holding cost is known from benchmarks:
```
"12 vehicles not live — that's $X/day in hidden holding cost"
```

This converts a task reminder into a financial alarm. Dealers respond to dollar amounts, not item counts.

**Playbook source:** Chapter 4, Section 6 (The Invisible Inventory Trap, page 31).

---

### Priority 6 — `SmartCampaignModal` + `SelectionActionBar`: Add a Financial Impact Confirmation Step

**Current state:** When a dealer selects aged vehicles and clicks "Run Smart Campaign," they go directly to the campaign template grid. There's no moment that quantifies what this campaign is solving.

**What to add:** A single confirmation screen *before* the template grid:

```
📊 You've selected 4 vehicles
Total holding cost so far: $7,318
Combined daily loss: $528/day

A targeted campaign could move these in 5–7 days,
saving up to $3,696 in additional holding cost.

→ Pick a campaign template
```

Numbers derived from: `selectedRows.reduce((sum, r) => sum + r.holdCost, 0)` (already in the row data).

**Playbook source:** Chapter 6 (Holding Cost: The Real Cost of Sitting Still), Chapter 7 Section 4 (45-Day Walk: Profit Triage).

---

### Priority 7 — `MarketingScreen`: Wire AI Prompt to Inventory Intelligence

**Current state:** The AI prompt box (`"Run a campaign on vehicles aged over >60 days"`) is a static input with 3 hardcoded suggestion pills. No connection to actual inventory data.

**Future state (post-MVP):** Pre-populate suggestions based on scanned inventory signals:
- *"Your lot is 18% sedans but your market is 31% — you're underselling sedans"* (mix rule)
- *"7 trucks have been on lot 38+ days — time to reprice or campaign before the 45-day cliff"*
- *"3 CPO vehicles have media scores below 7 — a CPO Trust campaign could close $8K in at-risk margin"*

**Playbook source:** Chapter 3 (Buying Strategy / Inventory Mix), Chapter 5 Section 4 (Repricing Ladder), Chapter 2 (Marketing Domination).

---

### Priority 8 — `TransformationSummaryModal`: Anchor "Days Saved" to the Real Frontline Benchmark

**Current state:** `daysSaved = benchmarks.daysToFrontline - 1` (e.g., 50 − 1 = 49 days saved). This is dramatic but uses the wrong baseline.

**What to change:** Once Priority 2 is done (separate frontline vs. sale days), anchor to:
```
daysSaved = currentDaysToFrontline - studioAIDaysToFrontline
            = 12 - 1 = 11 days saved per vehicle
```

Then monetize it:
```
Total holding cost saved = 11 days × $46/day × 233 vehicles = $117,898
```

This is a real, defensible number — not inflated by conflating frontline time with sale time.

**Playbook source:** Chapter 4 (Speed to Market), Chapter 6 (Holding Cost formula).

---

## 4. What NOT to Build Yet (Requires Data Not in Current IMS Scope)

These benchmarks are real and valuable but require data sources beyond what Vincue/IMS provides today:

| Feature | Data Needed | Why Deferred |
|---|---|---|
| Cost-to-Market % per vehicle | Live regional market pricing (V-Auto, Market Master) | Requires a market data API integration |
| Trade Retention % | Appraisal + wholesale records | Not exposed in current IMS sync |
| Market Day Supply | Regional market inventory + sales data | Requires third-party market data |
| Finance Penetration % | F&I/DMS data | Out of scope for merchandising tool |
| Price Rank (top-5 in 25-mile radius) | Market listing data | Requires marketplace API |

---

## 5. Competitor Landscape (for positioning reference)

| Competitor Type | Examples | Studio AI Differentiation |
|---|---|---|
| Photo vendors | SpinCar, Dealer Image Pro | Studio AI adds AI gap-fill (Smart Match) + campaign execution — not just photo hosting |
| IMS add-ons | Vincue built-ins, VinSolutions media | Studio AI works across IMS providers and adds AI merchandising layer |
| Marketing agencies | Local agencies, Dealer Inspire | Studio AI is self-serve, inventory-triggered, no agency briefing cycle |
| Marketplace tools | AutoTrader Accelerate, Cars.com Connect | Studio AI is the upstream merchandising layer that feeds these platforms |

---

## 6. Demo Script Notes (for sales demos)

The prototype tells a financial story. Always run the demo in this order to maximize impact:

1. **Set benchmarks first** — Get the dealer to input their real numbers. Even $40/day × their lot size makes the math hit home.
2. **Let the scan run** — The scanning animation (with "Computing hold costs" status message) builds anticipation.
3. **Show the Transformation Summary** — Score from 2.8 → 7.9, 233 vehicles fixed. Let the count-up animations play.
4. **Filter to Age >45 days** — Watch the table turn red. The `-$168/day loss` on the Nissan Altima is the emotional peak.
5. **Hit "Need Actions"** — Show the 12-vehicle widget, then click "Run a campaign on 60+ day aged" to trigger the bulk action flow.
6. **Open a VDP** — Show the before/after photo transformation. This is the product's most visual proof point.
7. **Publish** — Run through the syndication pitch → platform picker → progress → recap. End on "your listings are now live on 6 platforms."

---

*Last updated: May 2026. Source analysis by product strategy review against `docs/used-car-playbook.md`.*
