# Console Demo — Copy & Pitch Requirements

> **Purpose:** This document defines the requirements for improving the in-product copy and pitch narrative across every screen of the Studio AI demo console. The demo runs on the actual Spyne product UI, so copy improvements here reflect what AEs show live to prospects and what real customers see in the product.

---

## Active Demo Flow

> **Demo 2 is the shortlisted flow. All copy, pitch, and design work should target Demo 2 only.**

The app contains two parallel demo flows toggled by a floating `DemoTabBar` (visible after the setup screen launches):

| Flow | Files | Status |
|---|---|---|
| Demo 1 | `Demo1.tsx` + original screen components | Legacy / reference only. Do not improve. |
| **Demo 2** | **`Demo2.tsx` + `Demo2Dashboard.tsx` + shared components** | **Active. All work happens here.** |

Demo 2 uses a side-by-side layout with a `PitchPanel` that surfaces feature context alongside the live inventory view. It flows through: IMS Import > Scanning > Dashboard (with pitch panel) > campaign and publish actions. When reading or editing any screen, always check whether the component is wired into Demo 2's flow before making changes.

---

## Context

### Who is this for?
- **Primary audience:** AEs and Sales reps using the console to run live demos with dealership prospects
- **Secondary audience:** The prospect themselves — they are watching the screen as the AE navigates it, so every label, number, and message is part of the pitch

### What makes copy "good" here?
1. **Financially grounded** — Every claim should connect to a dollar amount, a benchmark, or a time metric. Dealers respond to numbers, not features.
2. **Dealer-native language** — Use terms dealers already know: VDP, days-on-lot, frontline, recon, hold cost, aged inventory, gross, turn rate. Avoid tech jargon.
3. **Progressive urgency** — The narrative should build from "here's your current state" to "here's what it's costing you" to "here's the fix" as the demo progresses.
4. **No fluff** — Every sentence on screen should earn its place. If it doesn't move the prospect closer to feeling the problem or believing the solution, cut it.

### Reference documents (in `docs/`)
| File | What it covers |
|---|---|
| `PRODUCT_CONTEXT.md` | Full screen flow, validated financial benchmarks, improvement roadmap |
| `used-car-playbook.md` | 123-page source playbook — holding cost formulas, speed-to-frontline benchmarks, repricing ladder, invisible inventory costs |
| `Spyne Smart Campaigns.pdf` | Smart Campaigns feature detail — campaign types, targeting logic, use cases |
| `VIN Cloning New.pdf` | VIN Cloning / Smart Match feature detail — how AI fills photo gaps using stock/CGI matching |
| `spyne_studio_ai_brochure_2.html` | Marketing brochure — overall product positioning, key differentiators, tone of voice reference |

---

## Screen-by-Screen Requirements

Work through screens in demo flow order. For each screen, the task is to audit and rewrite:
- **Headlines / section titles** — Should communicate outcome, not feature name
- **Body copy / sub-labels** — Should add financial or operational context, not just describe the UI
- **Empty states and placeholders** — Should prompt the right action, not just say "no data"
- **CTA labels** — Should use momentum language ("Launch", "Run", "Fix Now") not generic ("Submit", "Continue", "OK")
- **Tooltips and hints** — Should cite benchmarks or give the AE a talking point, not just restate the label
- **Numbers and metrics** — Should be framed as costs, not stats (e.g., "12 days = $5,520 in avoidable holding cost" not just "12 days")

---

### Screen 1: Demo Setup

**File:** `src/app/components/DemoSetupScreen.tsx`
**Status:** Structure recently redesigned. Copy pass still needed.

**Goals:**
- The left panel (discovery) should feel like a structured sales call script, not a form. Labels and hints should prompt the AE with the right question to ask the prospect.
- The right panel (financial model) should make the prospect's current cost visible before the demo starts -- the "ouch moment" should happen here.
- The stat boxes (Total Vehicles, Monthly Sales, Turn Rate, Est. Monthly Gap) should use framing that creates urgency, not just shows numbers.
- The "What Studio AI Closes" banner copy should be dynamically personalised with the prospect's exact numbers, and read as a statement of ROI not a feature list.
- The launch CTA should feel like a moment, not a button.

---

### Screen 2: IMS Import

**File:** `src/app/components/IMSImportScreen.tsx`
**Status:** Not yet reviewed for copy.

**Goals:**
- Reinforce credibility early. The IMS connection moment is where the prospect first sees that Spyne integrates with their existing stack -- this should not feel like a generic OAuth flow.
- The provider selection (Vincue, VinSolutions, etc.) should show logos and a brief one-liner on what data Spyne pulls from each.
- Loading/connecting states should use active, specific language: "Pulling inventory from Vincue..." not "Loading...".
- Any error or fallback states should preserve confidence and give a clear next step.

---

### Screen 3: Scanning

**File:** `src/app/components/ScanningScreen.tsx`
**Status:** Not yet reviewed for copy.

**Goals:**
- The scan is a theatrical moment in the demo -- it should feel like the AI is doing real diagnostic work on the prospect's lot.
- Each status message shown during the scan ("Computing hold costs", "Analysing media gaps", etc.) should be specific enough to sound technical but clear enough for a non-technical dealer to follow.
- The scan results reveal (score, vehicle count, gap breakdown) should be framed as a diagnosis: "here is the state of your lot right now."
- The progression from raw numbers to financial impact should happen on this screen, priming the dashboard reveal.

---

### Screen 4: Dashboard

**File:** `src/app/components/DashboardScreen.tsx`
**Status:** Partially improved per PRODUCT_CONTEXT.md roadmap. Copy pass needed.

**Goals:**
- Summary cards at the top should show financial health metrics, not just counts. "12 vehicles with no photos" should become "12 vehicles costing ~$2,160/week in missed leads."
- Filter chip labels should match the operational language dealers use: Fresh (0-15 days), Watch (16-30), Act Now (31-45), Liquidate (45+) -- not generic age bands.
- The vehicle table's holding cost column should tell a story per row: cost to date, daily burn rate, break-even day.
- The "Need Actions" widget headline should quantify the financial risk, not just the task count.
- Aged inventory rows should carry urgency copy that mirrors the playbook's 45-day-walk language.

---

### Screen 5: Vehicle Detail Page

**File:** `src/app/components/VehicleDetailScreen.tsx`
**Status:** Not yet reviewed for copy.

**Goals:**
- The before/after photo section is the most visual proof point in the entire demo -- the copy around it should amplify the transformation, not just label it.
- The financial summary per vehicle (hold cost, days on lot, break-even) should be front and centre, not buried.
- The media quality score should be explained in terms of what it costs/saves, not just as a number.
- Action buttons (Publish, Run Campaign, Smart Match) should have copy that connects the action to an outcome: "Publish to 6 platforms -- go live in 60 seconds."

---

### Screen 6: Marketing / Smart Campaigns

**File:** `src/app/components/MarketingScreen.tsx`
**Status:** Not yet reviewed for copy. Feature detail in `Spyne Smart Campaigns.pdf`.

**Goals:**
- The campaign template cards should lead with the business problem each campaign solves, not the campaign type name. E.g., "Aged Inventory" campaign should say "Move your 45+ day cars before they wipe their margin."
- The AI prompt placeholder should suggest high-value, inventory-specific prompts that sound like things a GM would actually type.
- Campaign preview copy should show what the prospect's customers will see -- making it tangible.
- The "activate" / "run" CTA should reference the specific vehicles and estimated impact: "Run on 4 vehicles -- potential to recover $7,200 in holding cost."

---

## Tone of Voice

Pull from the brochure (`spyne_studio_ai_brochure_2.html`) as the reference for brand voice. In general:

- **Confident, not salesy.** State facts and let the numbers do the work.
- **Specific, not vague.** "$46/car/day" beats "significant holding costs."
- **Direct.** Short sentences. No em dashes. No filler phrases like "leverage," "unlock," or "seamlessly."
- **Dealer-first framing.** The hero of the story is always the dealer's lot, not the AI. Spyne is the tool that fixes a problem the dealer already knows they have.

---

## How to Use This Document

1. Before working on any screen, read the relevant feature PDF and the corresponding section of `PRODUCT_CONTEXT.md`.
2. Audit the current copy against the goals listed for that screen above.
3. Rewrite copy directly in the component file. Do not create separate copy files -- keep copy co-located with components.
4. After each screen, update the status line above from "Not yet reviewed" to "In progress" or "Complete."

---

*Created: May 2026. Update the status fields above as each screen is completed.*
