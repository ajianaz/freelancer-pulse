---
title: "Freelancer Pulse — Architecture Document"
version: "1.0"
date: "2026-05-07"
status: "Draft"
author: "Winston (Architect Agent)"
prdRef: "prd.md v1.0"
uxRef: "ux-design.md v1.0"
---

# Freelancer Pulse — Architecture Document

## 1. Architecture Overview

### 1.1 System Context

V1 is a **local-only Chrome Extension**. No backend, no network calls, no external dependencies beyond the Chrome Extension API.

```
┌─────────────────────────────────────────────────────────┐
│                    Chrome Browser                        │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Content     │  │  Background   │  │    Popup      │  │
│  │   Script      │  │  Service      │  │    (Svelte)   │  │
│  │              │  │  Worker        │  │              │  │
│  │ upwork-      │  │              │  │  App.svelte   │  │
│  │ parser.ts    │  │ message       │  │  JobList      │  │
│  │ fiverr-      │  │ handler       │  │  Stats        │  │
│  │ parser.ts    │  │              │  │  JobDetail    │  │
│  │ clip-button  │  │              │  │              │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                  │                  │          │
│         └──────────────────┼──────────────────┘          │
│                            │                             │
│                   ┌────────▼────────┐                    │
│                   │  Storage Layer   │                    │
│                   │  (chrome.        │                    │
│                   │   storage.local) │                    │
│                   └─────────────────┘                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
         │                  │
    Upwork.com          Fiverr.com
    (DOM read only)     (DOM read only)
```

### 1.2 Architecture Decision Records

#### ADR-01: Svelte 5 for Popup UI

- **Context:** Need a lightweight UI framework for the popup (350px, fast load)
- **Decision:** Use Svelte 5 with runes
- **Rationale:** Compile-time framework (no runtime overhead), same language as V2 SvelteKit migration, small bundle size, reactive by default
- **Consequences:** Team must learn Svelte 5 runes API; benefits V2 migration path

#### ADR-02: CRXJS for Vite Integration

- **Context:** Need seamless Vite ↔ Chrome Extension manifest integration
- **Decision:** Use `@crxjs/vite-plugin` v2.0.0-beta.25
- **Rationale:** Auto-generates manifest entries from `manifest.json`, handles HMR in development, TypeScript support
- **Consequences:** Beta software — may have edge cases; lock version in package.json

#### ADR-03: Modular Parser Architecture

- **Context:** DOM parsing is highest-risk area (platforms change DOM)
- **Decision:** Each platform gets its own parser class with standardized interface
- **Rationale:** Isolates breakage to single file; easy to hotfix one platform without touching others
- **Consequences:** Must maintain consistent `ParserResult` interface across parsers

#### ADR-04: Stateless Service Worker

- **Context:** Manifest V3 kills service workers after 30s idle
- **Decision:** Service worker is stateless message router only. All state in chrome.storage
- **Rationale:** Worker can be killed and restarted without data loss; no in-memory state to manage
- **Consequences:** Every operation reads/writes to storage (acceptable for V1 scale)

#### ADR-05: Tailwind CSS for Styling

- **Context:** Need fast, consistent styling in popup and content script
- **Decision:** Tailwind CSS with PostCSS
- **Rationale:** Utility-first = fast development, consistent design tokens, small bundle via PurgeCSS
- **Consequences:** Class-heavy HTML; team must follow Tailwind conventions

---

## 2. Module Architecture

### 2.1 Directory Structure

```
src/
├── background/
│   └── index.ts              # Service worker: message routing
├── content/
│   ├── index.ts              # Entry: URL detection, parser routing, clip button injection
│   ├── parsers/
│   │   ├── base-parser.ts    # Abstract base parser class
│   │   ├── upwork-parser.ts  # Upwork DOM extraction
│   │   └── fiverr-parser.ts  # Fiverr DOM extraction
│   ├── clip-button.ts        # Floating clip button component
│   └── clip-button.css       # Clip button styles (injected into page)
├── popup/
│   ├── index.html            # Popup entry HTML
│   ├── main.ts               # Svelte mount point
│   ├── App.svelte            # Root component
│   ├── components/
│   │   ├── Header.svelte     # Header with logo + settings icon
│   │   ├── SearchBar.svelte  # Search input
│   │   ├── StatsSummary.svelte # Weekly stats card
│   │   ├── FilterTabs.svelte # Platform filter tabs
│   │   ├── JobList.svelte    # Scrollable job list container
│   │   ├── JobCard.svelte    # Collapsed job card
│   │   ├── JobDetail.svelte  # Expanded job detail view
│   │   ├── StatusDropdown.svelte # Status change dropdown
│   │   ├── NotesEditor.svelte # Notes textarea
│   │   ├── EmptyState.svelte # Empty state illustration
│   │   ├── StorageFooter.svelte # Storage usage indicator
│   │   └── Toast.svelte      # Toast notification
│   └── types.ts              # Popup-specific types
├── lib/
│   ├── storage.ts            # chrome.storage.local wrapper
│   ├── types.ts              # Shared types (ClippedJob, JobStatus, Settings)
│   ├── utils.ts              # Utility functions (UUID, date formatting, budget parsing)
│   └── constants.ts          # Status colors, platform config
├── assets/
│   └── icon/                 # Extension icons (16, 48, 128)
└── vite-env.d.ts
```

### 2.2 Module Dependency Graph

```
                    ┌──────────┐
                    │   lib/   │
                    │ types.ts │
                    │ utils.ts │
                    │ storage  │
                    └────┬─────┘
                         │
              ┌──────────┼──────────┐
              │          │          │
        ┌─────▼────┐ ┌───▼────┐ ┌──▼───────┐
        │ content/  │ │ popup/ │ │background/│
        │ parsers   │ │ comp.  │ │ index.ts  │
        │ clip-btn  │ │ App    │ │           │
        └──────────┘ └────────┘ └───────────┘

No circular dependencies.
lib/ is the shared foundation.
content/, popup/, background/ are independent consumers.
```

---

## 3. Data Layer

### 3.1 Storage Interface

```typescript
// lib/storage.ts

interface StorageService {
  // Jobs
  getJobs(): Promise<ClippedJob[]>;
  getJob(id: string): Promise<ClippedJob | null>;
  addJob(job: ClippedJob): Promise<void>;
  updateJob(id: string, updates: Partial<ClippedJob>): Promise<void>;
  deleteJob(id: string): Promise<void>;
  findJobByUrl(url: string): Promise<ClippedJob | null>;

  // Stats (derived, computed on read)
  getStats(): Promise<PipelineStats>;

  // Settings
  getSettings(): Promise<Settings>;
  updateSettings(updates: Partial<Settings>): Promise<void>;

  // Storage info
  getStorageUsage(): Promise<{ usedBytes: number; totalBytes: number }>;
}
```

### 3.2 Data Flow Diagrams

#### Clip Flow

```
Content Script                Background (SW)              Storage
     │                              │                        │
     │ 1. User clicks clip button   │                        │
     │                              │                        │
     │ 2. parser.extract(dom)       │                        │
     │    → ParserResult            │                        │
     │                              │                        │
     │ 3. sendMessage({             │                        │
     │      type: "CLIP_JOB",       │                        │
     │      data: ParserResult      │                        │
     │    })                        │                        │
     │ ──────────────────────────>  │                        │
     │                              │                        │
     │                              │ 4. findJobByUrl(url)   │
     │                              │ ──────────────────────>│
     │                              │ <──────────────────────│
     │                              │   (null or existing)   │
     │                              │                        │
     │                              │ 5. If no dup:          │
     │                              │    addJob(newJob)      │
     │                              │ ──────────────────────>│
     │                              │                        │
     │ 6. sendResponse({            │                        │
     │      ok: true,               │                        │
     │      job: newJob             │                        │
     │    })                        │                        │
     │ <──────────────────────────  │                        │
     │                              │                        │
     │ 7. Show toast "✓ Clipped"   │                        │
```

#### Popup Read Flow

```
Popup                         Storage
  │                              │
  │ 1. onMount()                 │
  │    getJobs()                 │
  │ ──────────────────────────>  │
  │ <──────────────────────────  │
  │    ClippedJob[]              │
  │                              │
  │ 2. getStats()                │
  │ ──────────────────────────>  │
  │ <──────────────────────────  │
  │    PipelineStats             │
  │                              │
  │ 3. getStorageUsage()         │
  │ ──────────────────────────>  │
  │ <──────────────────────────  │
  │    { usedBytes, totalBytes } │
  │                              │
  │ 4. Render UI                 │
  │                              │
  │ 5. storage.onChanged listener│
  │    → re-fetch + re-render    │
```

---

## 4. Parser Architecture

### 4.1 Parser Interface

```typescript
// content/parsers/base-parser.ts

interface ParserResult {
  platform: "upwork" | "fiverr";
  title: string;
  url: string;
  budget?: string;
  budgetMin?: number;
  budgetMax?: number;
  budgetType?: "fixed" | "hourly" | "unknown";
  clientName?: string;
  postedDate?: string;
  description?: string;
  tags: string[];
}

abstract class BaseParser {
  abstract canParse(url: string): boolean;
  abstract extract(): ParserResult;

  protected querySelector(selectors: string[]): Element | null {
    // Try each selector in order, return first match
  }

  protected extractText(selectors: string[]): string | null {
    // querySelector → textContent → trim
  }

  protected waitForElement(selector: string, timeout: number): Promise<Element | null> {
    // MutationObserver-based wait for SPA lazy loading
  }
}
```

### 4.2 Parser Resilience Strategy

```
Extraction Attempt
  │
  ├─ Try primary selector (data-testid, aria-label)
  │   └─ Success → return result
  │
  ├─ Try fallback selector (CSS class, structural)
  │   └─ Success → return result
  │
  ├─ Try regex on text content
  │   └─ Success → return result
  │
  └─ All failed → return null for that field
      (Job still saved with partial data)
```

**Never crash.** Partial data is always better than no data.

---

## 5. Messaging Architecture

### 5.1 Message Types

```typescript
// lib/types.ts

type MessageType =
  | { type: "CLIP_JOB"; data: ParserResult }
  | { type: "CLIP_RESULT"; data: { ok: boolean; job?: ClippedJob; error?: string } }
  | { type: "GET_CURRENT_TAB_INFO" }
  | { type: "TAB_INFO"; data: { platform: string; url: string; canClip: boolean } };
```

### 5.2 Communication Channels

| From | To | Channel | Purpose |
|------|----|---------|---------|
| Content Script | Background | `chrome.runtime.sendMessage` | Clip job, get status |
| Background | Content Script | `chrome.tabs.sendMessage` | Response to clip |
| Popup | Background | `chrome.runtime.sendMessage` | Get current tab info |
| Popup | Storage | Direct `chrome.storage.local` | Read/write jobs, settings |
| Background | Storage | Direct `chrome.storage.local` | Write new clips |

---

## 6. Build & Development

### 6.1 Build Pipeline

```
TypeScript + Svelte source
        │
        ▼
  Vite (dev/prod)
    ├── @crxjs/vite-plugin → manifest processing
    ├── @sveltejs/vite-plugin-svelte → Svelte compilation
    ├── postcss + tailwindcss → CSS processing
    └── TypeScript → esbuild transpilation
        │
        ▼
  dist/
  ├── manifest.json         (auto-generated by CRXJS)
  ├── popup.html
  ├── popup.js
  ├── content.js
  ├── background.js
  ├── content.css           (clip button styles)
  └── assets/               (icons, images)
```

### 6.2 Development Workflow

```bash
npm run dev        # Vite dev server + HMR + Chrome extension reload
npm run build      # Production build
npm run test       # Vitest unit tests
npm run typecheck  # TypeScript check
npm run lint       # Prettier check
npm run check      # All checks combined
```

### 6.3 CI Pipeline

```
GitHub Push
  → GitHub Actions
    → npm ci
    → npm run check (typecheck + lint + test)
    → npm run build
    → Upload dist/ as artifact
```

---

## 7. Testing Strategy

### 7.1 Test Pyramid

```
        ┌──────────┐
        │   E2E    │  ← Manual QA on live Upwork/Fiverr
        │  (few)   │     (can't automate — requires live platform)
        ├──────────┤
        │Integration│  ← Parser tests with saved HTML fixtures
        │ (some)   │     Storage service tests
        ├──────────┤
        │  Unit    │  ← Utility functions, budget parsing,
        │ (many)   │     Svelte component tests (Testing Library)
        └──────────┘
```

### 7.2 Parser Testing

- Save real HTML snippets from Upwork/Fiverr as test fixtures
- Test each parser against fixtures
- Test graceful degradation with missing elements
- Test budget format normalization

### 7.3 Test Stack

| Tool | Purpose |
|------|---------|
| Vitest | Test runner |
| jsdom | DOM simulation for parser tests |
| @testing-library/svelte | Component tests |
| @testing-library/jest-dom | DOM assertions |

---

## 8. Error Handling

### 8.1 Error Boundaries

| Layer | Error Type | Handling |
|-------|-----------|----------|
| Parser | Selector not found | Return null for field, save partial job |
| Parser | Page not supported | Don't inject clip button |
| Storage | Quota exceeded | Show toast "Storage full — delete some jobs" |
| Storage | Read/write error | Log to console, show error toast |
| Popup | No data | Show empty state |
| Content Script | DOM not ready | Retry with MutationObserver (max 5s) |
| Background | Worker killed | Stateless — auto-recovers on next message |

### 8.2 Logging

- `console.error` for unexpected errors
- `console.warn` for degraded functionality
- No telemetry in V1
- Verbose logging behind `DEV` flag only

---

## 9. Performance Considerations

### 9.1 Bundle Size Budget

| Module | Budget | Notes |
|--------|--------|-------|
| Popup JS | < 100KB | Svelte compiles small |
| Content Script JS | < 30KB | No framework, vanilla TS |
| Content Script CSS | < 5KB | Clip button only |
| Background JS | < 10KB | Message routing only |
| Total extension | < 200KB | Unpacked |

### 9.2 Runtime Performance

- **Popup:** Read from storage on mount, listen to `storage.onChanged` for updates
- **Content Script:** Parse once on demand (when user clicks clip), not on page load
- **Background:** No polling, no alarms in V1, reactive messaging only
- **Storage:** Batch reads where possible, avoid reading full dataset for single job lookup

---

## 10. Security Model

### 10.1 Permissions Justification

| Permission | Justification |
|-----------|---------------|
| `storage` | Store clipped jobs locally |
| `activeTab` | Read current tab URL for platform detection |
| `host_permissions: upwork.com, fiverr.com` | Inject content script for DOM parsing |

### 10.2 Security Rules

1. **No `eval()` or `new Function()`** — all code is static
2. **No remote code loading** — everything bundled
3. **No network requests in V1** — zero data exfiltration possible
4. **No credential access** — extension reads visible DOM only
5. **Content Security Policy compliant** — no inline scripts in popup HTML

---

## 11. Future Architecture (V2+ Reference)

```
V2 Architecture (NOT implemented in V1):

┌──────────────┐     HTTPS      ┌──────────────────┐
│ Chrome Ext   │ ◄────────────► │ Go API (chi v5)  │
│ (TypeScript) │    REST/JSON   │ VPS Singapore    │
└──────────────┘                 │ PostgreSQL 18    │
                                 │ SvelteKit Dash   │
Migration path:                  └──────────────────┘
- storage.ts gains sync methods
- New lib/sync.ts module
- Background gains alarm for periodic sync
- Popup gains auth flow
```

This is documented here for awareness only. V1 code should NOT include any V2 scaffolding.
