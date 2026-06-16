# Studio OS 3.0 — Revamp Context (Demo 2)

> Context doc for future agents. Scope is **Demo 2 only**. Demo 1 is the legacy
> flow and should not be changed unless explicitly asked. The dev server runs on
> `npm run dev` (Vite, usually `http://localhost:5174`).

## 1. What this is

A revamp of the merchandising console into **Studio OS** — a premium, tiered
product that upsells itself. The narrative: first-time users get a 30-day free
trial with a premium "unboxing", live on the console, and degrade back to a
plain merchandising screen (with $-lost messaging) when the trial expires.

## 2. Product rename (old → new)

| Old name           | New name           | Demo 2 bucket        |
| ------------------ | ------------------ | -------------------- |
| SmartMatch         | **Studio Instant** | `nophoto`, `cgi`     |
| SmartShoot         | **Studio Create**  | `raw`                |
| SmartSyndication   | **Studio Publish** | `unsyndicated`       |
| App                | **Studio App**     | engine (not a pillar)|
| SmartView          | **Studio Frame**   | surface (not a pillar)|
| SmartCampaigns     | **Studio Promote** | `aging` (Pro-gated)  |
| "Studio AI" (nav)  | **Studio OS**      | —                    |

- **Studio Instant** — cloned, VIN-matched images at acquisition (Day 0 listings).
- **Studio Create** — app-guided professional capture + editing post-recon.
- **Studio Publish** — one-click publishing to marketplaces, site, social, Google.
- **Studio App** — capture engine (overlays, offline, two-phase, on-edge).
- **Studio Frame** — embedded media unit on SRP/VDP; records shopper engagement.
- **Studio Promote** — age-triggered promotions across all channels.

## 3. Tiers

- **Studio OS Lite** — everything except Studio Promote.
- **Studio OS Pro** — adds Studio Promote (age-triggered campaigns).
- Stored as `tier: "lite" | "pro"` on `DemoConfig` (default `"lite"`).
- **Decision (confirmed with user):** only **Studio Promote** is Pro-gated.
  Earlier ideas to also lock CGI-grade renders and Premium Studio Frame were
  **explicitly dropped**.

### Upsell mechanic ("self-upselling")

On Lite, the `aging` bucket (Studio Promote) is **visible but locked**:
- A `Pro` lock badge renders on the Aging filter pill.
- Opening the pitch shows a premium **Pro lock banner** that quantifies the
  daily bleed (e.g. "34 aged units bleeding ~$1,380/day") — the dashboard's own
  numbers are the argument.
- The footer CTA becomes **"Unlock with Studio OS Pro"**. Clicking it flips
  `tier` → `pro`, fires confetti, and the normal "Continue to campaign builder"
  CTA resumes.

## 4. Journeys

### First-time (after IMS import + scan)

`connect → loading → scanning → unboxing → dashboard`

- **Unboxing scene** (`UnboxingScreen.tsx`): premium dark reveal — "Free for 30
  days" badge, the **four pillars** (Instant / Create / Publish / Promote), and a
  footnote framing **Studio App** (capture engine) + **Studio Frame** (live media
  surface) as the fabric powering the pillars. CTA: "Enter Studio OS".

### On-console (dashboard)

Two page-level tabs (`Demo2Dashboard.tsx`):
- **Overview** — the ROI-as-value report (`OverviewPanel.tsx`). Value hero
  ($/mo recovered), value cards (time-to-live, holding cost saved, photography
  saved, VDP engagement), per-product attribution, benefits list, trial banner.
  The diagnostic FAB + before/after toggle are **hidden** on this tab.
- **Active Inventory** — the existing bucket/diagnostic workflow (KPIs, filter
  pills, vehicle table, FAB).

### Expiry (degraded)

`dashboard → expired` via the Overview trial banner's **"Preview trial end"** link.
- **Expired console** (`ExpiredConsoleScreen.tsx`): standard/plain "Merchandising"
  screen with a red **"you're losing ~$X/day without Studio OS"** banner, greyed
  Studio OS modules, and a matching **$-lost email preview** ("same on console").
- "Reactivate Studio OS" returns to the live dashboard.

## 5. File map (key touch points)

| File | Role |
| ---- | ---- |
| `src/app/types/demoConfig.ts` | `StudioTier` type, `tier` field, `calcOpportunity` (value math) |
| `src/app/components/Demo2.tsx` | Scene machine (`connect/loading/scanning/unboxing/dashboard/expired`), `tier` state, `PITCHES`, lock logic, upgrade/expire/reactivate handlers, `overviewSlot` |
| `src/app/components/Demo2Dashboard.tsx` | Plan chip, locked filter pill, Overview/Active Inventory page tabs (`PageTab`), `overviewSlot` rendering |
| `src/app/components/shared/PitchPanel.tsx` | `locked` / `onUpgrade` / `lockNote` props → Pro lock banner + "Unlock with Studio OS Pro" CTA |
| `src/app/components/OverviewPanel.tsx` | ROI-as-value report; `onExpire` triggers degraded preview |
| `src/app/components/UnboxingScreen.tsx` | First-time 4-pillar reveal |
| `src/app/components/ExpiredConsoleScreen.tsx` | Degraded merchandising screen + $-lost banner + email preview |
| `src/app/components/IMSImportScreen.tsx` | Connect scene "what you'll unlock" banners (renamed) |
| `src/app/components/DemoSetupScreen.tsx` | AE setup tool (rebranded "Studio OS") |
| `src/app/components/AppShell.tsx` | Sidebar/header; nav item renamed to "Studio OS" |

The value numbers across Overview, the lock note, and the expiry banner all derive
from `calcOpportunity(demoConfig)` so the story stays internally consistent.

## 6. Demo-time defaults (easy to change)

- Trial: **18 days left** (`Demo2.tsx` → `OverviewPanel` `trialDaysLeft`).
- Expired screen assumes **3 days lapsed** (`ExpiredConsoleScreen` `daysSinceExpiry`).
- Expiry is triggered manually via the Overview banner "Preview trial end" link.
- First-time unboxing always shows once after the scan (no first/second-run
  persistence yet).

## 7. Product tours

Two guided tours share the `ProductTour` component (`src/app/components/shared/ProductTour.tsx`).
The component renders a portal with an SVG spotlight cutout and a floating tooltip.

### Tour 1 — First login (6 steps, triggered on first dashboard entry)

Triggered inside `handleUnboxingContinue` in `Demo2.tsx` after a 600ms delay (lets the
dashboard entrance animation finish before the spotlight appears).

| Step | Target (`data-tour-id`) | Topic |
| ---- | ----------------------- | ----- |
| 1 | `plan-chip` | Trial active on Lite |
| 2 | `page-tabs` | Overview vs Active Inventory |
| 3 | `kpi-bar` | Live inventory KPIs |
| 4 | `filter-raw` | Studio Create: Car Tours + Video Tours (Pro badge) |
| 5 | `filter-unsyndicated` | Studio Publish: marketplace + social (Pro badge) |
| 6 | `filter-aging` | Smart Campaigns (Pro badge) |

### Tour 2 — Pro upgrade (4 steps, triggered after confetti settles)

Triggered inside `handleUpgradeToPro` in `Demo2.tsx` after a 1400ms delay.
`forcedPageTab="inventory"` is set first so filter pills are in the DOM.
Completing this tour auto-opens the aging pitch panel.

| Step | Target (`data-tour-id`) | Topic |
| ---- | ----------------------- | ----- |
| 1 | `plan-chip` | Now on Studio OS Pro |
| 2 | `filter-raw` | Car Tours + Video Tours unlocked |
| 3 | `filter-unsyndicated` | Full publishing unlocked |
| 4 | `filter-aging` | Smart Campaigns unlocked (CTA: "Launch campaigns") |

### Pro plan add-ons (tour narrative)

The three features highlighted as Pro in both tours:
- **Car Tours + Video Tours** — within Studio Create (`raw` bucket pitch).
- **Studio Publish** — full marketplace + social syndication (`unsyndicated` bucket).
- **Smart Campaigns** — Studio Promote age-triggered campaigns (`aging` bucket).

### Key files

| File | Role |
| ---- | ---- |
| `src/app/components/shared/ProductTour.tsx` | Spotlight + tooltip + step navigation component |
| `src/app/components/Demo2.tsx` | `FIRST_LOGIN_STEPS`, `PRO_UPGRADE_STEPS`, `tourActive` state, trigger logic |
| `src/app/components/Demo2Dashboard.tsx` | `data-tour-id` attributes on plan chip, page tabs, KPI bar, filter pills; `forcedPageTab` prop |

## 9. Open / possible follow-ups

- Wire tier + first-run selection into `DemoSetupScreen` (currently `tier`
  defaults to Lite; toggled live via the in-pitch upgrade).
- A true "second-time journey" that lands directly on the **Overview** tab
  (`Demo2Dashboard` already accepts `initialPageTab`).
- Persist trial/first-run state if the demo needs to survive reloads.
