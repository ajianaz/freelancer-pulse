---
title: "Freelancer Pulse — Epics & User Stories"
version: "1.0"
date: "2026-05-07"
status: "Draft"
author: "John (PM) + Winston (Architect)"
prdRef: "prd.md v1.0"
archRef: "architecture.md v1.0"
---

# Freelancer Pulse — Epics & User Stories

## Epic Overview

```
Epic 1: Foundation (v0.0.1)
  └─ Scaffold, manifest, build pipeline, CI

Epic 2: Job Clipping Engine (v0.1.0)
  └─ Content scripts, parsers, clip button

Epic 3: Pipeline Dashboard (v0.1.0)
  └─ Popup UI, job list, status tracking

Epic 4: Search, Filter & Stats (v0.1.0)
  └─ Search, filters, stats, weekly summary

Epic 5: Polish & Launch (v0.1.0)
  └─ Empty states, error handling, dark mode, CWS submission
```

---

## Epic 1: Foundation (v0.0.1)

**Goal:** Bootstrap working Chrome extension with Manifest V3, Svelte 5, Vite, CI.

| Story ID | Title | Points | Priority | Depends On | AC Summary |
|----------|-------|--------|----------|------------|------------|
| S1.1 | Project scaffold with Vite + CRXJS + Svelte 5 | 2 | P0 | — | `npm run dev` loads extension in Chrome; `npm run build` produces `dist/` |
| S1.2 | Manifest V3 configuration | 1 | P0 | S1.1 | manifest.json valid; permissions: storage, activeTab; content_scripts for upwork + fiverr URLs |
| S1.3 | Shared types & constants | 1 | P0 | S1.1 | `ClippedJob`, `JobStatus`, `Settings` interfaces; status color map; platform config |
| S1.4 | Storage service layer | 2 | P0 | S1.3 | CRUD operations on chrome.storage.local; findJobByUrl; getStats derived query; getStorageUsage |
| S1.5 | CI pipeline (GitHub Actions) | 1 | P0 | S1.1 | On push: typecheck + lint + test + build; upload dist/ artifact |
| S1.6 | Popup shell (empty state) | 1 | P0 | S1.1 | Click icon → popup opens 350px wide; shows branded header + empty state illustration |
| S1.7 | Background service worker shell | 1 | P0 | S1.1 | service_worker registered; responds to ping message |
| S1.8 | Unit test setup | 1 | P0 | S1.1 | Vitest + jsdom + testing-library configured; sample test passes |

**Epic 1 Total: 10 points**

---

## Epic 2: Job Clipping Engine (v0.1.0)

**Goal:** Parse Upwork + Fiverr pages, extract metadata, clip with one click.

| Story ID | Title | Points | Priority | Depends On | AC Summary |
|----------|-------|--------|----------|------------|------------|
| S2.1 | Base parser class with resilience | 2 | P0 | S1.3 | Abstract parser with `canParse()`, `extract()`, multi-selector fallback, MutationObserver wait |
| S2.2 | Upwork parser | 3 | P0 | S2.1 | Extract title, budget, client, description, tags from Upwork job pages; test with 5+ HTML fixtures |
| S2.3 | Fiverr parser | 3 | P0 | S2.1 | Extract gig title, price, seller, rating from Fiverr pages; test with 5+ HTML fixtures |
| S2.4 | Content script: URL detection & routing | 1 | P0 | S2.2, S2.3 | Detect upwork vs fiverr via URL; route to correct parser; no injection on other pages |
| S2.5 | Budget format normalizer | 2 | P0 | S1.3 | Parse "$500-$1000", "$50/hr", "Not specified" → { min, max, type, raw }; unit tests for all formats |
| S2.6 | Floating clip button | 2 | P0 | S2.4 | Inject styled button on supported pages; bottom-right fixed position; states: default, loading, clipped, error |
| S2.7 | Clip flow: click → extract → dedup → save → toast | 3 | P0 | S2.6, S1.4 | Click clip → extract via parser → check duplicate URL → save to storage → show toast; < 50ms perceived |
| S2.8 | Clip via popup action | 2 | P0 | S2.4, S1.4 | Popup shows "Clip this job" when on supported page; clips current tab's job |

**Epic 2 Total: 18 points**

---

## Epic 3: Pipeline Dashboard (v0.1.0)

**Goal:** Popup shows clipped jobs with status tracking, detail view, notes.

| Story ID | Title | Points | Priority | Depends On | AC Summary |
|----------|-------|--------|----------|------------|------------|
| S3.1 | Popup layout & header | 1 | P0 | S1.6 | 350px width; branded header with logo + settings icon; proper popup dimensions |
| S3.2 | Job list component | 2 | P0 | S3.1, S1.4 | Renders ClippedJob[] sorted by date; scrollable; shows title, platform badge, budget, status pill, time ago |
| S3.3 | Job card (collapsed) | 2 | P0 | S3.2 | Truncated title; platform badge (Upwork green / Fiverr green); budget; status pill color-coded; notes preview |
| S3.4 | Job detail (expanded) | 3 | P0 | S3.3 | Click card → expand detail: full title, budget, client, posted date, description, tags, actions |
| S3.5 | Status dropdown | 2 | P0 | S3.4 | Dropdown with all 7 statuses; color dots; click to change; instant save; stats update |
| S3.6 | Notes editor | 1 | P1 | S3.4 | Textarea in detail view; auto-save on blur; persisted in storage |
| S3.7 | Delete job with confirmation | 1 | P1 | S3.4 | Delete button → "Delete this job?" dialog → confirm removes from storage + list |
| S3.8 | Storage usage footer | 1 | P1 | S3.2 | Shows clip count + storage %; progress bar; amber at 80%, red at 95% |
| S3.9 | Toast notification system | 1 | P0 | S3.1 | Success/warning/error toasts; auto-dismiss 3s; no stacking |

**Epic 3 Total: 14 points**

---

## Epic 4: Search, Filter & Stats (v0.1.0)

**Goal:** Search jobs, filter by platform/status, show pipeline statistics.

| Story ID | Title | Points | Priority | Depends On | AC Summary |
|----------|-------|--------|----------|------------|------------|
| S4.1 | Search bar component | 2 | P0 | S3.2 | Search input at top; substring match on title; case-insensitive; debounced 300ms; "No results" state |
| S4.2 | Platform filter tabs | 1 | P0 | S3.2 | Tabs: All \| Upwork \| Fiverr; active tab visually indicated; combines with search |
| S4.3 | Status filter | 1 | P1 | S4.2 | Dropdown or secondary tabs for status filtering; combines with platform + search |
| S4.4 | Basic stats (totals) | 2 | P0 | S3.2 | Total clipped, by platform, by status counts; computed from storage |
| S4.5 | Weekly summary card | 2 | P0 | S4.4 | "This Week" card: X clipped, Y applied, Z hired; resets weekly; shown above filter tabs |

**Epic 4 Total: 8 points**

---

## Epic 5: Polish & Launch (v0.1.0)

**Goal:** Error handling, empty states, dark mode prep, CWS submission.

| Story ID | Title | Points | Priority | Depends On | AC Summary |
|----------|-------|--------|----------|------------|------------|
| S5.1 | Error handling: parser failures | 1 | P0 | S2.2, S2.3 | Graceful degradation; partial data saved; error toast shown; never crash |
| S5.2 | Empty state polish | 1 | P0 | S3.2 | Illustration + "Browse Upwork or Fiverr to clip your first job" + platform icons |
| S5.3 | Loading states | 1 | P0 | S3.2 | Skeleton/spinner while storage reads; no layout shift |
| S5.4 | Dark mode CSS variables | 2 | P2 | S3.1 | CSS custom properties for all colors; `prefers-color-scheme` detection; toggle in settings |
| S5.5 | CWS assets & listing | 1 | P0 | All | Icon 16/48/128; screenshots (5); title + description with keywords; privacy policy |
| S5.6 | Manual QA pass | 2 | P0 | All | Test on 10+ real Upwork pages + 10+ Fiverr pages; verify all flows; fix critical bugs |

**Epic 5 Total: 8 points**

---

## Total Story Points

| Epic | Points | Version |
|------|--------|---------|
| Epic 1: Foundation | 10 | v0.0.1 |
| Epic 2: Clipping Engine | 18 | v0.1.0 |
| Epic 3: Pipeline Dashboard | 14 | v0.1.0 |
| Epic 4: Search, Filter & Stats | 8 | v0.1.0 |
| Epic 5: Polish & Launch | 8 | v0.1.0 |
| **Total** | **58** | |

---

## Dependency Graph

```
Epic 1 (Foundation)
  ├── Epic 2 (Clipping Engine) depends on Epic 1
  ├── Epic 3 (Dashboard) depends on Epic 1
  │     └── Epic 4 (Search/Stats) depends on Epic 3
  └── Epic 5 (Polish) depends on Epics 2, 3, 4

Recommended order:
  Epic 1 → Epic 2 → Epic 3 → Epic 4 → Epic 5
```

---

## Story Detail Template

Each story, when created for sprint planning, will follow this template:

```markdown
## Story: [ID] [Title]

**Epic:** [Epic X]
**Points:** [N]
**Priority:** P0/P1/P2
**Depends On:** [Story IDs]

### Context
[Why this story exists, reference to PRD/UX/Architecture]

### Acceptance Criteria
- [ ] [Specific, testable criterion]
- [ ] [Specific, testable criterion]

### Technical Notes
[Implementation hints from architecture doc]

### Test Cases
- [ ] [Test scenario]
- [ ] [Test scenario]
```
