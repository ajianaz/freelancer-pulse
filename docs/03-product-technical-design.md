# 04 — Product Strategy & Roadmap

## 4.1 Product Evolution Strategy

```
V1 MVP                    V2                       V3
Job Clipper               Tracker + Sync           Analytics + AI
(2-3 weeks)               (4-6 weeks)              (6-8 weeks)
│                         │                         │
│  ┌─────────────┐        │  ┌─────────────┐        │  ┌─────────────┐
│  │  Chrome Ext  │        │  │  Chrome Ext  │        │  │  Chrome Ext  │
│  │  (local)     │───────▶│  │  (sync)      │───────▶│  │  (AI hints)  │
│  └─────────────┘        │  └─────────────┘        │  └─────────────┘
│                         │  ┌─────────────┐        │  ┌─────────────┐
│                         │  │  Go API      │        │  │  Go API      │
│                         │  │  PostgreSQL  │        │  │  + AI Engine │
│                         │  │  SvelteKit   │        │  │  + Stripe    │
│                         │  └─────────────┘        │  └─────────────┘
│                         │                         │
│  💾 Local only          │  ☁️ Cloud sync            │  💰 Monetization
│  🆓 Free forever        │  🆓 Free tier +           │  💳 $5/mo Pro
│  🔧 Upwork + Fiverr     │  📊 Web dashboard         │  🤖 AI insights
│                         │                         │
└─────────────────────────┴─────────────────────────┴─────────────────┘
                                                           │
                                                           ▼
                                                    V4: CRM Features
                                                   (8-12 weeks)
                                                    ┌─────────────┐
                                                    │  Full CRM    │
                                                    │  Invoicing   │
                                                    │  Tax prep    │
                                                    │  Clients     │
                                                    │  Follow-ups  │
                                                    └─────────────┘
```

## 4.2 Version Detail

### V1: Job Clipper (MVP)

**Goal:** Validate core value prop — "can we make job clipping frictionless?"

**Scope:**

* Chrome extension, Manifest V3
* TypeScript, Svelte 5 (compile-time optimization, same language as V2 SvelteKit)
* DOM parsing for Upwork + Fiverr job pages
* Local storage only (chrome.storage.local)
* Popup UI for clipped job list + status tracking
* Basic stats (total clipped, by platform, by status)

**What we're validating:**

- [ ] Can we reliably parse Upwork job pages?
- [ ] Can we reliably parse Fiverr gig pages?
- [ ] Do users understand the clip concept immediately?
- [ ] Is the popup UI intuitive enough?
- [ ] Do users clip more than 10 jobs per week?

**Exit Criteria:** 100+ weekly active users, 4.0+ rating, clear usage patterns

### V2: Tracker + Cloud Sync

**Goal:** Add persistence, multi-device, and web dashboard

**Scope:**

* Go backend API (MikroSaaS-style)
* PostgreSQL 17 database
* SvelteKit web dashboard
* User authentication (email + magic link, NO password)
* Cloud sync between extension and dashboard
* Export (CSV, JSON)
* Dark mode support
* Notification when client responds

**What we're validating:**

- [ ] Will users create accounts? (conversion from anonymous)
- [ ] Does cloud sync drive engagement?
- [ ] Is the web dashboard used regularly?
- [ ] Do users export their data?

**Exit Criteria:** 500+ registered users, 200+ weekly active, 20%+ account conversion

### V3: Analytics + Monetization

**Goal:** Turn data into insights, start charging

**Scope:**

* Analytics dashboard: win rate, response rate, avg time-to-hire, income trends
* AI-powered insights (via API, not local):
  * "Jobs matching your profile this week"
  * "Your win rate increased 15% this month"
  * "You earn 30% more on fixed-price vs hourly"
* Stripe integration for payments
* Freemium model: Free (100 clips) / Pro (unlimited + analytics)
* Email weekly report (optional)

**What we're validating:**

- [ ] Will users pay $5/mo for analytics?
- [ ] What's the conversion rate free → paid?
- [ ] Are AI insights actually useful?
- [ ] Do weekly emails drive retention?

**Exit Criteria:** 2%+ conversion rate, $500+ MRR

### V4: CRM Features

**Goal:** Become indispensable daily tool for freelancer business

**Scope:**

* Client database with notes and history
* Follow-up reminders ("last contacted 5 days ago")
* Invoice tracking (link to payment status)
* Tax estimate calculator (based on earnings by country)
* Project management (tasks per client)
* Calendar integration

**Exit Criteria:** 4%+ conversion, $2,000+ MRR

### V5: Multi-platform + Team

**Goal:** Expand market and serve agencies

**Scope:**

* LinkedIn prospecting tracker
* Freelancer.com support
* Toptal support
* Team/agency plan (multi-seat, shared pipeline)
* API for third-party integrations
* White-label option (stretch goal)

**Exit Criteria:** 30,000+ total users, $5,000+ MRR

## 4.3 Feature Priority Framework

```
       IMPACT (berapa banyak user terbantu)
            HIGH
            │
    ┌───────┼───────┐
    │  Q1   │  Q2   │  ← DO FIRST
    │       │       │
    │ Clip  │ Cloud │
    │ Track │ Sync  │
    │ Stats │ Export│
    │       │       │
    ├───────┼───────┤
    │  Q3   │  Q4   │  ← DO LATER
    │       │       │
    │AI Hint│ Client│
    │Notif  │ Invoic│
    │Email  │ Tax   │
    │       │       │
    └───────┼───────┘
            │
           LOW
     EFFORT (berapa susah build)
```

## 4.4 Anti-Features (What We Will NOT Build)

| Feature | Why Not |
|---------|---------|
| Auto-apply to jobs | Upwork/Fiverr TOS violation, ethical concern |
| Proposal AI generation | Crowded (15+ competitors), platform could ban |
| Credential/access token capture | Security nightmare, TOS violation |
| Job scraping (mass extraction) | TOS violation, platform legal risk |
| Native mobile apps | Too expensive for V1-V3, web dashboard sufficient |
| Social features | Scope creep, privacy concern, minimal value |
| Blockchain/crypto payments | Irrelevant, complexity |
| Multi-language support V1 | English first, add ID later |


---

# 05 — Technical Architecture

## V1: Chrome Extension (Local-Only)

```
freelancer-pulse/
├── manifest.json              # Manifest V3
├── src/
│   ├── background/
│   │   └── service-worker.ts  # Service worker (alarm, messages)
│   ├── content/
│   │   ├── upwork-parser.ts   # DOM extraction — Upwork
│   │   ├── fiverr-parser.ts   # DOM extraction — Fiverr
│   │   └── inject.ts          # Route to correct parser
│   ├── popup/
│   │   ├── App.svelte          # Main popup (Svelte 5)
│   │   ├── JobList.svelte      # Clipped jobs list
│   │   ├── Stats.svelte        # Basic stats card
│   │   └── JobDetail.svelte    # Single job view
│   ├── storage/
│   │   └── store.ts           # chrome.storage.local wrapper
│   ├── types/
│   │   └── index.ts           # Shared types
│   └── utils/
│       └── id.ts              # UUID generator
├── package.json
├── tsconfig.json
└── vite.config.ts             # Build with Vite
```

### Manifest V3

```json
{
  "manifest_version": 3,
  "name": "Freelancer Pulse",
  "version": "0.1.0",
  "description": "Clip & track freelance jobs from Upwork & Fiverr",
  "permissions": ["storage", "activeTab", "alarms"],
  "host_permissions": ["*://*.upwork.com/*", "*://*.fiverr.com/*"],
  "background": { "service_worker": "sw.js", "type": "module" },
  "content_scripts": [{
    "matches": ["*://*.upwork.com/*", "*://*.fiverr.com/*"],
    "js": ["content.js"],
    "run_at": "document_idle"
  }],
  "action": { "default_popup": "popup.html", "default_icon": "icon.png" }
}
```

### Storage Schema (V1)

```typescript
interface ClippedJob {
  id: string;              // UUID
  platform: "upwork" | "fiverr";
  title: string;
  url: string;
  budget?: string;         // "$500-$1000" or null
  clientName?: string;
  postedDate?: string;
  description?: string;
  tags: string[];
  status: "clipped" | "applied" | "interviewed" | "offered" | "hired" | "rejected" | "closed";
  clippedAt: string;       // ISO 8601
  updatedAt: string;
  notes?: string;
}
// Key: chrome.storage.local → { jobs: ClippedJob[], settings: Settings }
```

### Data Flow (V1)

```
User visits Upwork/Fiverr job page
        │
        ▼
Content Script (inject.ts)
  ├── Detects platform via URL
  ├── Routes to upwork-parser or fiverr-parser
  └── Extracts metadata via DOM selectors
        │
        ▼
User clicks extension icon OR floating "Clip" button
        │
        ▼
Message: content → background → popup
        │
        ▼
store.ts → chrome.storage.local.set({ jobs: [...] })
        │
        ▼
Popup renders updated job list
```

## V2: Extension + Backend

```
┌──────────────┐     HTTPS      ┌──────────────────┐
│ Chrome Ext   │ ◄────────────► │ Go API (chi v5)  │
│ (TypeScript) │    REST API     │ VPS Singapore    │
└──────────────┘                 │ PostgreSQL 17    │
                                 │ SvelteKit Dash   │
                                 └──────────────────┘

API Endpoints:
  POST   /api/auth/magic-link     → Send login email
  POST   /api/auth/verify         → Verify token, return JWT
  POST   /api/jobs/sync           → Batch sync jobs (upsert)
  GET    /api/jobs                → List jobs (paginated, filtered)
  PATCH  /api/jobs/:id            → Update job status/notes
  DELETE /api/jobs/:id            → Delete job
  GET    /api/stats               → Aggregated stats
  POST   /api/export/csv          → Export jobs as CSV
  POST   /api/export/json         → Export jobs as JSON
```

### PostgreSQL Schema (V2)

```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now(),
  plan        TEXT DEFAULT 'free'  -- free | pro | team
);

CREATE TABLE jobs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id),
  platform    TEXT NOT NULL CHECK (platform IN ('upwork','fiverr')),
  external_id TEXT,                -- platform's job ID if available
  title       TEXT NOT NULL,
  url         TEXT NOT NULL,
  budget      TEXT,
  client_name TEXT,
  posted_date TIMESTAMPTZ,
  description TEXT,
  tags        TEXT[],
  status      TEXT DEFAULT 'clipped' CHECK (status IN (
    'clipped','applied','interviewed','offered','hired','rejected','closed')),
  notes       TEXT,
  clipped_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, url)            -- prevent duplicates
);

CREATE INDEX idx_jobs_user_status ON jobs(user_id, status);
CREATE INDEX idx_jobs_user_platform ON jobs(user_id, platform);
```

## Browser Compatibility

| Browser | V1  | V2  | Notes |
|---------|-----|-----|-------|
| Chrome  | ✅   | ✅   | Primary target |
| Edge    | ✅   | ✅   | Same extension API |
| Firefox | ⚠️ V2 | ✅   | V2+ — needs manifest V2→V3 migration adaptation |
| Safari  | ❌   | ⏳   | Low priority, requires macOS + $99/yr dev account |

## Performance Budgets

| Metric | Target |
|--------|--------|
| Extension load time | < 200ms |
| Popup open | < 100ms |
| Job clip action | < 50ms (perceived instant) |
| Content script injection | < 100ms, no visible impact |
| Storage (1000 jobs) | < 2MB (chrome.storage.local limit = 10MB) |
| Background service worker | < 10MB RAM |
| Go API response (p95) | < 200ms |


---

# 06 — Feature Breakdown

## V1: Job Clipper MVP

### Core Features

| #   | Feature | Description | Priority |
|-----|---------|-------------|----------|
| 1.1 | Auto-detect platform | Content script detects Upwork vs Fiverr via URL | P0       |
| 1.2 | DOM parsing — Upwork | Extract title, budget, client, description, posted date | P0       |
| 1.3 | DOM parsing — Fiverr | Extract gig title, price, seller info, rating | P0       |
| 1.4 | One-click clip | Floating "Clip" button on job pages + popup action | P0       |
| 1.5 | Job list (popup) | View all clipped jobs, sorted by date | P0       |
| 1.6 | Status tracking | Set status: clipped → applied → interviewed → hired/rejected | P0       |
| 1.7 | Basic stats | Total clipped, by platform, by status | P1       |
| 1.8 | Search/filter | Filter by platform, status, search by title | P1       |
| 1.9 | Notes per job | Add personal notes to any clipped job | P1       |
| 1.10 | Delete job | Remove from list | P1       |
| 1.11 | Duplicate detection | Prevent clipping same job URL twice | P1       |
| 1.12 | Dark mode | Match browser theme | P2       |

### V1 Scope Boundary

* **IN:** Clip, list, status, basic stats, search, notes
* **OUT:** Cloud sync, accounts, analytics, AI, export, notifications, mobile

## V2: Tracker + Cloud Sync

| #   | Feature | Description | Priority |
|-----|---------|-------------|----------|
| 2.1 | User auth (magic link) | Email-based login, no passwords | P0       |
| 2.2 | Cloud sync | Auto-sync jobs between extension and server | P0       |
| 2.3 | Web dashboard | SvelteKit dashboard at app.freelancerpulse.com | P0       |
| 2.4 | Multi-device sync | Same account on multiple browsers | P0       |
| 2.5 | CSV export | Download all jobs as CSV | P1       |
| 2.6 | JSON export | Machine-readable export | P1       |
| 2.7 | Import from V1 | Upgrade from local-only to cloud | P1       |
| 2.8 | Notification badges | Unread updates count on extension icon | P2       |
| 2.9 | Options page | Extension settings (theme, notifications, sync freq) | P2       |

## V3: Analytics + Monetization

| #   | Feature | Description | Priority |
|-----|---------|-------------|----------|
| 3.1 | Win rate analytics | Applied vs hired ratio over time | P0       |
| 3.2 | Response time | Avg time between clip and first response | P0       |
| 3.3 | Income trends | Earnings tracking (manual entry or platform estimate) | P0       |
| 3.4 | Platform comparison | Performance across Upwork vs Fiverr | P0       |
| 3.5 | AI insights | "Jobs matching your profile", "Win rate improved 15%" | P1       |
| 3.6 | Weekly email report | Automated summary to inbox | P1       |
| 3.7 | Stripe payment | Pro subscription management | P0       |
| 3.8 | Charts/visualizations | Line charts, pie charts, bar charts | P1       |

## V4: CRM

| #   | Feature | Description | Priority |
|-----|---------|-------------|----------|
| 4.1 | Client database | Track repeat clients across jobs | P0       |
| 4.2 | Follow-up reminders | "Last contacted 5 days ago" | P0       |
| 4.3 | Invoice tracking | Link to payment status (manual) | P1       |
| 4.4 | Tax estimate | Simple earnings-based tax calculator | P2       |
| 4.5 | Calendar view | Timeline of all jobs and deadlines | P1       |

## V5: Multi-Platform + Team

| #   | Feature | Description | Priority |
|-----|---------|-------------|----------|
| 5.1 | LinkedIn tracking | Clip LinkedIn job postings | P0       |
| 5.2 | Freelancer.com support | Third platform | P1       |
| 5.3 | Team/agency plan | Multi-seat, shared pipeline | P0       |
| 5.4 | API access | Third-party integrations | P2       |
| 5.5 | Firefox support | Browser expansion | P1       |


---

# 07 — UX Design

## Personas

### Primary: "Active Multi-Platform Freelancer"

* **Name:** Maya, 28
* **Platforms:** Upwork + Fiverr
* **Behavior:** Browses 20+ jobs/day, applies to 5-10/week
* **Pain:** Loses track of proposals, can't remember which jobs she applied to
* **Goal:** One place to see everything
* **Tech level:** Comfortable with Chrome extensions, uses multiple tools daily

### Secondary: "Part-Time Side Hustler"

* **Name:** Raj, 35
* **Platforms:** Upwork only (occasionally)
* **Behavior:** Browses casually, applies 2-3/week
* **Pain:** Forgets about jobs he liked, no follow-up discipline
* **Goal:** Simple tracking without effort
* **Tech level:** Basic, wants zero-setup tools

## Core UX Flows

### Flow 1: Clip a Job (3 seconds)

```
1. User browses Upwork/Fiverr (normal behavior)
2. Sees interesting job
3. Clicks extension icon → popup shows "Clip this job" button
   OR floating "Clip" button visible on the page
4. Clicks "Clip" → toast notification "Job clipped! ✓"
5. Done. Popup updates to show new job in list.
```

### Flow 2: Check Pipeline (popup)

```
1. Click extension icon
2. Popup opens showing:
   ├── Stats bar: "12 clipped · 5 applied · 2 interviewed"
   ├── Filter tabs: All | Upwork | Fiverr
   ├── Job list (sorted by clipped date, newest first):
   │   ├── Job title (truncated)
   │   ├── Platform badge + Budget
   │   ├── Status pill (color-coded)
   │   └── Click to expand → full details + notes
   └── Search bar at top
```

### Flow 3: Update Status

```
1. Click on a job in the list
2. Expand → see full details
3. Click status pill → dropdown: Clipped → Applied → Interviewed → Hired / Rejected
4. Select new status → instant update, pill color changes
```

## Status Color System

| Status | Color | Hex |
|--------|-------|-----|
| Clipped | Gray  | #6B7280 |
| Applied | Blue  | #3B82F6 |
| Interviewed | Yellow | #F59E0B |
| Offered | Purple | #8B5CF6 |
| Hired  | Green | #10B981 |
| Rejected | Red   | #EF4444 |
| Closed | Dark Gray | #374151 |

## Popup Wireframe (V1)

```
┌─────────────────────────────┐  ← 350px wide
│ 🟢 Freelancer Pulse    ⚙️  │
├─────────────────────────────┤
│ 🔍 Search jobs...           │
├─────────────────────────────┤
│ 📊 This Week: 8 clipped    │  ← BMAD: weekly summary card
│    3 applied · 1 hired     │
├─────────────────────────────┤
│ [All] [Upwork] [Fiverr]     │  ← filter tabs
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ Build React Dashboard   │ │  ← job card
│ │ Upwork · $500-1000      │ │
│ │ 🔵 Applied · 2 days ago│ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Mobile App UI Design    │ │
│ │ Fiverr · $50            │ │
│ │ ⚪ Clipped · 5 days ago │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ WordPress Speed Optimize │ │
│ │ Upwork · $200           │ │
│ │ 🟢 Hired · 1 week ago  │ │
│ └─────────────────────────┘ │
│                             │
│       (scrollable)          │
├─────────────────────────────┤
│ 💾 127/500 clips used  42%  │  ← BMAD: storage usage indicator
└─────────────────────────────┘
```

## Design Principles


1. **3-second rule** — Clip a job in under 3 seconds
2. **Zero learning curve** — No onboarding, no tutorial, no setup
3. **Information density** — Show maximum info in minimal space
4. **Color-coded status** — Scan pipeline at a glance
5. **Keyboard friendly** — Quick actions via keyboard shortcuts (V2)
6. **Dark mode first** — Most developers prefer dark theme