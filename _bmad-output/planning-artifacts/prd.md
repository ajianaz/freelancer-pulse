---
title: "Freelancer Pulse — Product Requirements Document"
version: "1.0"
date: "2026-05-07"
status: "Draft"
author: "John (PM Agent)"
stepsCompleted: ["init", "context-load", "prd-complete"]
---

# Freelancer Pulse — Product Requirements Document

## 1. Product Overview

### 1.1 Product Name

**Freelancer Pulse** — "Your Freelance Pipeline, in One Click"

### 1.2 Product Vision

> The Freelancer's CRM — Track Every Gig, From Your Browser.

Freelancer Pulse is a Chrome extension that lets freelancers clip and track job listings from Upwork and Fiverr with a single click, providing a unified pipeline dashboard without leaving the browser.

### 1.3 Problem Statement

Freelancers who work across multiple platforms have no unified tool to quickly clip and track their job pipeline. They apply to 5-15 jobs per week across Upwork and Fiverr, lose track of which jobs they've applied to, forget follow-ups, and resort to messy spreadsheets that require 30-60 seconds per entry.

### 1.4 Solution

An ACTIVE one-click clip Chrome extension that:
- Injects a clip button on Upwork and Fiverr job pages
- Auto-extracts job metadata via DOM parsing (no API scraping)
- Stores everything locally in the browser (V1)
- Provides a unified popup dashboard for pipeline tracking

### 1.5 Unique Value Proposition

| Factor | Freelancer Pulse | Alternatives |
|--------|-----------------|--------------|
| Clip speed | **3 seconds** (one click) | 30-60 seconds (manual entry) |
| Cross-platform | **Upwork + Fiverr unified** | Siloed per-platform |
| Setup | **Zero** (install & use) | Account creation, spreadsheet setup |
| Privacy | **Local-first**, no data leaves browser | Cloud-dependent |
| Cost | **Free** (V1-V2) | $17-40/mo (Bonsai, Huntr) |

### 1.6 Scope by Version

This PRD covers **V1 (v0.0.1 + v0.1.0)** — the local-only Job Clipper MVP. Cloud sync, analytics, AI, and monetization are documented as future scope only.

---

## 2. Target Users & Personas

### 2.1 Primary Persona: "Active Multi-Platform Freelancer"

| Attribute | Detail |
|-----------|--------|
| **Name** | Maya, 28 |
| **Platforms** | Upwork + Fiverr daily |
| **Behavior** | Browses 20+ jobs/day, applies to 5-10/week |
| **Pain** | Loses track of proposals across platforms |
| **Goal** | One place to see entire freelance pipeline |
| **Tech level** | Comfortable with Chrome extensions |

### 2.2 Secondary Persona: "Part-Time Side Hustler"

| Attribute | Detail |
|-----------|--------|
| **Name** | Raj, 35 |
| **Platforms** | Upwork only (occasional) |
| **Behavior** | Browses casually, applies 2-3/week |
| **Pain** | Forgets about jobs he liked |
| **Goal** | Simple tracking without effort |
| **Tech level** | Basic, wants zero-setup tools |

---

## 3. User Stories & Acceptance Criteria

### Epic 1: Foundation (v0.0.1)

#### US-1.1: Extension Installation
**As a** freelancer, **I want to** install Freelancer Pulse from the Chrome Web Store **so that** I can start tracking jobs immediately.

**Acceptance Criteria:**
- [ ] Extension installs in under 5 seconds
- [ ] Extension icon appears in Chrome toolbar after install
- [ ] Clicking icon opens popup (even if empty state)
- [ ] No account creation or setup wizard required
- [ ] Manifest V3 compliant

#### US-1.2: Empty State Experience
**As a** new user, **I want to** see a helpful empty state **so that** I know what to do next.

**Acceptance Criteria:**
- [ ] Popup shows branded header "Freelancer Pulse"
- [ ] Empty state shows illustration + "Browse Upwork or Fiverr to clip your first job"
- [ ] No error states on first open

---

### Epic 2: Job Clipping (v0.1.0)

#### US-2.1: Auto-Detect Platform
**As the** extension, **I want to** detect which platform the user is browsing **so that** I use the correct parser.

**Acceptance Criteria:**
- [ ] Content script injected on `*://*.upwork.com/*` URLs
- [ ] Content script injected on `*://*.fiverr.com/*` URLs
- [ ] Platform correctly identified (upwork or fiverr)
- [ ] No injection on non-supported pages
- [ ] Injection at `document_idle`

#### US-2.2: Parse Upwork Job Page
**As a** freelancer, **I want to** clip an Upwork job with one click **so that** all details are captured automatically.

**Acceptance Criteria:**
- [ ] Extracts: title, URL, budget/rate, client name, posted date, description (first 500 chars), skills/tags
- [ ] Handles budget formats: "$500-$1000", "$50/hr", "Not specified", fixed price ranges
- [ ] Works on job search results page AND individual job detail page
- [ ] Graceful degradation: if a field can't be parsed, store null (don't crash)
- [ ] Uses MutationObserver for SPA lazy-loaded content

#### US-2.3: Parse Fiverr Gig Page
**As a** freelancer, **I want to** clip a Fiverr gig with one click **so that** all details are captured automatically.

**Acceptance Criteria:**
- [ ] Extracts: gig title, URL, price, seller info, rating
- [ ] Handles React hydration timing (SSR vs CSR)
- [ ] Graceful degradation for missing fields
- [ ] Works on gig detail pages

#### US-2.4: One-Click Clip Button
**As a** freelancer, **I want to** see a clip button on job pages **so that** I can save a job instantly.

**Acceptance Criteria:**
- [ ] Floating "Clip this job" button visible on supported job pages
- [ ] Button positioned non-intrusively (bottom-right or fixed position)
- [ ] Click triggers: extract data → save to storage → show toast "Job clipped! ✓"
- [ ] Button changes state after clip (disabled or "Clipped ✓")
- [ ] Duplicate detection: if URL already clipped, show "Already clipped" toast
- [ ] Clip action completes in < 50ms (perceived instant)

#### US-2.5: Clip via Popup
**As a** freelancer, **I want to** clip the current job from the popup **so that** I can save without finding the floating button.

**Acceptance Criteria:**
- [ ] Popup shows "Clip this job" button when on a supported page with unparsed content
- [ ] Click clips the job and updates the job list immediately
- [ ] Button hidden when not on a supported page or job already clipped

---

### Epic 3: Pipeline Dashboard (v0.1.0)

#### US-3.1: View Clipped Jobs List
**As a** freelancer, **I want to** see all my clipped jobs in one list **so that** I have a unified pipeline view.

**Acceptance Criteria:**
- [ ] Job list sorted by clipped date (newest first)
- [ ] Each job card shows: title (truncated), platform badge, budget, status pill, time ago
- [ ] Platform badge: "Upwork" (green) or "Fiverr" (green different shade)
- [ ] List scrollable when jobs exceed popup height
- [ ] Loading state while fetching from storage
- [ ] Empty state when no jobs clipped

#### US-3.2: Update Job Status
**As a** freelancer, **I want to** change a job's status **so that** I can track my pipeline progress.

**Acceptance Criteria:**
- [ ] Click on a job to expand detail view
- [ ] Status dropdown with pipeline stages: Clipped → Applied → Interviewed → Offered → Hired / Rejected / Closed
- [ ] Status change is instant (no save button)
- [ ] Status pills are color-coded per design spec
- [ ] Updated status reflected immediately in job list

#### US-3.3: Search Jobs
**As a** freelancer, **I want to** search my clipped jobs **so that** I can find a specific job quickly.

**Acceptance Criteria:**
- [ ] Search bar at top of popup
- [ ] Filters by title (substring match, case-insensitive)
- [ ] Results update in real-time as user types (debounced 300ms)
- [ ] "No results" state when search yields nothing

#### US-3.4: Filter by Platform & Status
**As a** freelancer, **I want to** filter jobs by platform and status **so that** I can focus on specific segments.

**Acceptance Criteria:**
- [ ] Filter tabs: All | Upwork | Fiverr
- [ ] Status filter dropdown or secondary tabs
- [ ] Filters combine (platform AND status)
- [ ] Active filter visually indicated

#### US-3.5: Add Notes to Job
**As a** freelancer, **I want to** add notes to a clipped job **so that** I can remember context later.

**Acceptance Criteria:**
- [ ] Notes text area in job detail view
- [ ] Auto-save on blur (no save button)
- [ ] Notes persisted in chrome.storage.local
- [ ] Notes preview (first line) shown in job card

#### US-3.6: Delete Job
**As a** freelancer, **I want to** delete a clipped job **so that** I can remove jobs I'm no longer interested in.

**Acceptance Criteria:**
- [ ] Delete button in job detail view
- [ ] Confirmation dialog before delete ("Delete this job?")
- [ ] Job removed from list immediately after confirmation
- [ ] Undo option within 3 seconds (optional, P2)

---

### Epic 4: Statistics (v0.1.0)

#### US-4.1: View Basic Stats
**As a** freelancer, **I want to** see basic pipeline statistics **so that** I understand my freelance activity.

**Acceptance Criteria:**
- [ ] Stats bar at top of popup showing: total clipped, applied, interviewed counts
- [ ] "This Week" summary card: jobs clipped this week, status breakdown
- [ ] Stats update in real-time when jobs change
- [ ] Compact design — stats must not push job list below the fold

#### US-4.2: Weekly Summary
**As a** freelancer, **I want to** see a weekly summary **so that** I get a reason to return to the extension.

**Acceptance Criteria:**
- [ ] "This Week" card showing: X clipped, Y applied, Z hired
- [ ] Visible at top of popup, above filter tabs
- [ ] Resets every Monday (or configurable start day)

---

## 4. Functional Requirements

### 4.1 Core Requirements (P0 — Must Have)

| ID | Requirement | Version |
|----|-------------|---------|
| FR-01 | Content script auto-injection on Upwork and Fiverr job pages | v0.1.0 |
| FR-02 | DOM parsing for Upwork job metadata extraction | v0.1.0 |
| FR-03 | DOM parsing for Fiverr gig metadata extraction | v0.1.0 |
| FR-04 | Floating clip button on supported pages | v0.1.0 |
| FR-05 | Clip action: extract → deduplicate → save → confirm | v0.1.0 |
| FR-06 | Popup job list sorted by date, scrollable | v0.1.0 |
| FR-07 | Job status tracking with pipeline stages | v0.1.0 |
| FR-08 | Search jobs by title | v0.1.0 |
| FR-09 | Filter by platform | v0.1.0 |
| FR-10 | Basic stats (total, by platform, by status) | v0.1.0 |
| FR-11 | Persistent local storage (chrome.storage.local) | v0.1.0 |

### 4.2 Important Requirements (P1 — Should Have)

| ID | Requirement | Version |
|----|-------------|---------|
| FR-12 | Add notes to clipped jobs | v0.1.0 |
| FR-13 | Delete jobs with confirmation | v0.1.0 |
| FR-14 | Duplicate detection by URL | v0.1.0 |
| FR-15 | Filter by status | v0.1.0 |
| FR-16 | Weekly summary card | v0.1.0 |
| FR-17 | Storage usage indicator | v0.1.0 |
| FR-18 | Clip via popup action button | v0.1.0 |

### 4.3 Nice-to-Have (P2 — May Have)

| ID | Requirement | Version |
|----|-------------|---------|
| FR-19 | Dark mode (match browser theme) | v0.2.0 |
| FR-20 | Undo delete within 3 seconds | v0.2.0 |
| FR-21 | Keyboard shortcuts | v0.2.0 |
| FR-22 | Export to CSV | v0.2.0 |

---

## 5. Non-Functional Requirements

### 5.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Extension load time | < 200ms |
| NFR-02 | Popup open time | < 100ms |
| NFR-03 | Clip action (perceived) | < 50ms |
| NFR-04 | Content script injection | < 100ms, no visible page impact |
| NFR-05 | Storage capacity (1000 jobs) | < 2MB (limit = 10MB) |
| NFR-06 | Background service worker RAM | < 10MB |

### 5.2 Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-07 | Graceful parsing failure | Show "parsing error" toast, never crash |
| NFR-08 | Data integrity | No data loss on browser update or extension update |
| NFR-09 | Service worker resilience | Stateless design; worker can be killed without data loss |

### 5.3 Security & Privacy

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-10 | No data leaves browser (V1) | All data in chrome.storage.local only |
| NFR-11 | No credential access | Extension never accesses login tokens or passwords |
| NFR-12 | Minimal permissions | storage, activeTab, host_permissions (2 domains only) |
| NFR-13 | No remote code execution | All logic bundled, no eval(), no remote scripts |
| NFR-14 | CSP compliant | Extension must work within platform CSP headers |

### 5.4 Compatibility

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-15 | Chrome 110+ | Primary target |
| NFR-16 | Edge (Chromium) | Supported (same extension API) |
| NFR-17 | Manifest V3 | Required |

---

## 6. Technical Constraints

| Constraint | Detail |
|------------|--------|
| **Budget** | Zero budget for V1 (organic growth only) |
| **Team** | Solo developer (Sibung + CTO) + Pi coding agent |
| **Timeline** | V1 MVP: 2-3 weeks |
| **Stack** | TypeScript, Svelte 5, Vite, CRXJS, Tailwind CSS |
| **Manifest** | Manifest V3 (no exceptions) |
| **Storage** | chrome.storage.local, 10MB limit |
| **Legal** | NO API scraping, NO credential access, DOM parsing only |
| **Platforms** | Upwork + Fiverr ONLY (V1) |
| **Backend** | None for V1 (local-only) |

---

## 7. Data Model

### 7.1 ClippedJob

```typescript
interface ClippedJob {
  id: string;              // UUID v4
  platform: "upwork" | "fiverr";
  title: string;
  url: string;
  budget?: string;         // Raw: "$500-$1000" or "$50/hr" or null
  budgetMin?: number;      // Normalized: 500
  budgetMax?: number;      // Normalized: 1000
  budgetType?: "fixed" | "hourly" | "unknown";
  clientName?: string;
  postedDate?: string;     // ISO 8601 or null
  description?: string;    // First 500 chars
  tags: string[];
  status: JobStatus;
  clippedAt: string;       // ISO 8601
  updatedAt: string;       // ISO 8601
  notes?: string;
  htmlSnippet?: string;    // Truncated original HTML (P2)
}

type JobStatus =
  | "clipped"
  | "applied"
  | "interviewed"
  | "offered"
  | "hired"
  | "rejected"
  | "closed";
```

### 7.2 Settings (V1)

```typescript
interface Settings {
  theme: "light" | "dark" | "system";
  weekStartDay: "monday" | "sunday";
}
```

### 7.3 Storage Schema

```typescript
// chrome.storage.local
interface ExtensionStorage {
  jobs: ClippedJob[];
  settings: Settings;
}
```

---

## 8. Success Metrics & KPIs

### 8.1 North Star Metric

**Weekly Active Clippers (WAC)** — users who clip at least 1 job per week.

### 8.2 V1 Targets (3 months post-launch)

| Metric | Target |
|--------|--------|
| Total installs | 500+ |
| Weekly active users | 100+ |
| Weekly active clippers | 50+ |
| Avg clips per user/week | 5+ |
| Clips → status update rate | 30%+ |
| Day 1 retention | 40%+ |
| Day 7 retention | 25%+ |
| CWS rating | 4.0+ |
| Uninstall rate (30 days) | < 30% |

---

## 9. Assumptions & Dependencies

### 9.1 Assumptions

| # | Assumption | Impact if Wrong |
|---|-----------|----------------|
| A1 | Upwork DOM structure is stable enough for CSS selector parsing | High — parsers break, need hotfix |
| A2 | Fiverr DOM structure is stable enough for CSS selector parsing | High — parsers break, need hotfix |
| A3 | Upwork CSP headers allow content script injection | Critical — extension unusable on Upwork |
| A4 | Fiverr CSP headers allow content script injection | Critical — extension unusable on Fiverr |
| A5 | Freelancers want to track jobs across platforms | High — no product-market fit |
| A6 | chrome.storage.local 10MB is sufficient for V1 | Low — can add cleanup/export |
| A7 | CWS approves extension under "single purpose" policy | High — cannot distribute |

### 9.2 Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Upwork page structure | External | Needs verification |
| Fiverr page structure | External | Needs verification |
| Chrome Manifest V3 API stability | External | Stable |
| CRXJS Vite plugin beta | External | v2.0.0-beta.25 |
| Svelte 5 stability | External | Stable |

---

## 10. Out of Scope (V1)

The following are explicitly **not** in V1 scope:

- ❌ Cloud sync / cloud storage
- ❌ User accounts / authentication
- ❌ Backend API
- ❌ AI features / AI roast / AI insights
- ❌ Analytics beyond basic stats
- ❌ Export (CSV/JSON)
- ❌ Email reports / notifications
- ❌ Mobile app / web dashboard
- ❌ LinkedIn / Freelancer.com / Toptal support
- ❌ Multi-language support
- ❌ Team/agency features
- ❌ Payment / monetization / Stripe
- ❌ Proposal generation
- ❌ Auto-apply to jobs

---

## Appendix A: Version Roadmap (Reference Only)

| Version | Scope | PRD Coverage |
|---------|-------|--------------|
| v0.0.1 | Bootstrap: Manifest V3 + Svelte + Vite + CI | ✅ Epic 1 |
| v0.1.0 | Core Clipper: one-click clip + popup + stats + export | ✅ Epics 2-4 |
| v0.1.5 | AI Roast: profile + proposal roast via Go API | ❌ Future PRD |
| v0.2.0 | Enhanced Dashboard: filters, search, dark mode | ❌ Future PRD |
| v0.3.0 | Cloud Sync: Go API + auth + sync + SvelteKit | ❌ Future PRD |
| v1.0.0 | Production Ready: API frozen, monetization | ❌ Future PRD |

## Appendix B: Decision Log (Pre-PRD)

| # | Decision | Date | Rationale |
|---|----------|------|-----------|
| D1 | Independent repo, not MikroSaaS module | 2026-05-05 | Simpler to start, migrate later if needed |
| D2 | V1 local-only, zero backend | 2026-05-05 | Fastest validation, zero cost |
| D3 | TypeScript + Manifest V3 | 2026-05-05 | Type safety, latest Chrome standard |
| D4 | ACTIVE one-click clip (not passive) | 2026-05-06 | User chooses what to clip; less noise |
| D5 | Svelte 5 for popup UI | 2026-05-06 | Same language as V2 SvelteKit, compile-time optimization |
| D6 | Two platforms only: Upwork + Fiverr | 2026-05-06 | Validate on 2 before expanding |
| D7 | Two repos: Extension + Go API | 2026-05-06 | Independent deployment cycles |
