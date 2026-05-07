---
title: "Freelancer Pulse — UX Design Specification"
version: "1.0"
date: "2026-05-07"
status: "Draft"
author: "Sally (UX Designer Agent)"
prdRef: "prd.md v1.0"
---

# Freelancer Pulse — UX Design Specification

## 1. Design Principles

| # | Principle | Guideline |
|---|-----------|-----------|
| DP-1 | **3-Second Rule** | Clip a job in under 3 seconds from any state |
| DP-2 | **Zero Learning Curve** | No onboarding, no tutorial, no setup. Install → use |
| DP-3 | **Information Density** | Maximum info in minimal space (popup = 350px wide) |
| DP-4 | **Color-Coded Status** | Scan pipeline health at a glance |
| DP-5 | **Progressive Disclosure** | Show essentials first, details on interaction |
| DP-6 | **Dark Mode Ready** | Design works in both light and dark themes |

---

## 2. Design Tokens

### 2.1 Colors — Status System

| Status | Color | Hex | Text Color |
|--------|-------|-----|------------|
| Clipped | Gray | `#6B7280` | White |
| Applied | Blue | `#3B82F6` | White |
| Interviewed | Amber | `#F59E0B` | White |
| Offered | Purple | `#8B5CF6` | White |
| Hired | Green | `#10B981` | White |
| Rejected | Red | `#EF4444` | White |
| Closed | Dark Gray | `#374151` | White |

### 2.2 Colors — Platform Badges

| Platform | Color | Hex |
|----------|-------|-----|
| Upwork | Green | `#14A800` |
| Fiverr | Green | `#00B22D` |

### 2.3 Spacing Scale

| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
| `xl` | 24px |

### 2.4 Typography

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Page Title | 16px | 600 | System UI |
| Card Title | 13px | 500 | System UI |
| Body Text | 12px | 400 | System UI |
| Caption/Label | 11px | 400 | System UI |
| Status Pill | 11px | 500 | System UI |

### 2.5 Popup Dimensions

| Property | Value |
|----------|-------|
| Width | 350px |
| Min Height | 480px |
| Max Height | 600px |

---

## 3. Component Library

### 3.1 Popup Layout

```
┌─────────────────────────────────────┐
│ 🟢 Freelancer Pulse          [⚙️]  │  ← Header (48px)
├─────────────────────────────────────┤
│ 🔍 Search jobs...                   │  ← Search bar (44px)
├─────────────────────────────────────┤
│ 📊 This Week: 8 clipped            │  ← Stats summary (56px)
│    3 applied · 1 hired             │
├─────────────────────────────────────┤
│ [All] [Upwork] [Fiverr]            │  ← Filter tabs (40px)
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Job Card                      │  │  ← Scrollable job list
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │ Job Card                      │  │
│  └───────────────────────────────┘  │
│  ...                                │
│                                     │
├─────────────────────────────────────┤
│ 💾 127 clips · 42% storage         │  ← Footer (32px)
└─────────────────────────────────────┘
```

### 3.2 Job Card (Collapsed)

```
┌───────────────────────────────────────┐
│ Build a React Dashboard for E-com     │  ← Title (13px, truncated)
│ 🟢 Upwork · $500-1000               │  ← Platform badge + Budget
│ 🔵 Applied · 2 days ago              │  ← Status pill + Time ago
│ Notes: "Follow up by Friday"          │  ← Notes preview (optional)
└───────────────────────────────────────┘
```

**States:**
- **Default:** As shown above
- **Hover:** Subtle background highlight (`#F3F4F6` light / `#1F2937` dark)
- **Active/Pressed:** Slightly darker highlight

### 3.3 Job Card (Expanded / Detail View)

```
┌───────────────────────────────────────┐
│ ← Back to list                        │  ← Back button
├───────────────────────────────────────┤
│ Build a React Dashboard for E-com     │  ← Full title
│ 🟢 Upwork · Posted 3 days ago        │  ← Platform + Posted date
├───────────────────────────────────────┤
│ Budget: $500 - $1,000                 │  ← Budget detail
│ Client: Acme Corp                     │  ← Client name
│ Status: [Applied ▾]                   │  ← Status dropdown
├───────────────────────────────────────┤
│ Skills: React, TypeScript, Dashboard  │  ← Tags
├───────────────────────────────────────┤
│ Looking for an experienced React      │  ← Description (scrollable)
│ developer to build a real-time...     │     max 500 chars
├───────────────────────────────────────┤
│ 📝 Notes                              │  ← Notes section
│ ┌───────────────────────────────────┐ │
│ │ Follow up by Friday. Client       │ │  ← Textarea, auto-save on blur
│ │ prefers async communication.      │ │
│ └───────────────────────────────────┘ │
├───────────────────────────────────────┤
│ 🔗 Open on Upwork   🗑️ Delete        │  ← Actions
└───────────────────────────────────────┘
```

### 3.4 Status Dropdown

```
┌─────────────────────┐
│ ● Clipped           │  ← Current (with checkmark)
│ ● Applied           │
│ ● Interviewed       │
│ ● Offered           │
│ ─────────────────── │  ← Divider
│ ● Hired             │
│ ● Rejected          │
│ ● Closed            │
└─────────────────────┘
```

Each item shows its color dot. Selection is instant (no confirm button).

### 3.5 Clip Button (Floating, on-page)

```
┌──────────────────────┐
│  📌 Clip this Job     │  ← 44px height, rounded-full
└──────────────────────┘
```

**Position:** Fixed bottom-right, 20px from edge, z-index above page content.

**States:**
- **Default:** Primary green (`#10B981`), white text
- **Hover:** Slightly darker (`#059669`)
- **Clipped:** Gray (`#6B7280`), "✓ Clipped" text, disabled
- **Error:** Red (`#EF4444`), "Parsing error — try manual clip"

### 3.6 Toast Notifications

```
┌─────────────────────────────────┐
│ ✓ Job clipped!                  │  ← Success (green accent)
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ⚠️ Already clipped              │  ← Warning (amber accent)
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ✕ Parsing error. Try again.     │  ← Error (red accent)
└─────────────────────────────────┘
```

**Behavior:**
- Appears at bottom of popup or bottom-right of page
- Auto-dismiss after 3 seconds
- No stacking (latest replaces previous)

### 3.7 Empty State

```
┌─────────────────────────────────────┐
│                                     │
│           📋                        │  ← Illustration
│                                     │
│    No jobs clipped yet              │  ← Headline
│                                     │
│    Browse Upwork or Fiverr and      │  ← Instruction
│    click Clip to save a job         │
│                                     │
│    🟢 Upwork  🟢 Fiverr            │  ← Platform icons
│                                     │
└─────────────────────────────────────┘
```

### 3.8 Stats Summary Card

```
┌─────────────────────────────────────┐
│ 📊 This Week                        │  ← Section header
├──────────┬──────────┬───────────────┤
│ 8        │ 3        │ 1             │  ← Numbers
│ Clipped  │ Applied  │ Hired         │  ← Labels
└──────────┴──────────┴───────────────┘
```

Compact 3-column layout. Numbers in 16px bold, labels in 11px.

### 3.9 Storage Usage Footer

```
┌─────────────────────────────────────┐
│ 💾 127 clips                    42% │  ← Text left, % right
│ ████████░░░░░░░░░░░░               │  ← Progress bar
└─────────────────────────────────────┘
```

Progress bar fills proportionally. Turns amber at 80%, red at 95%.

---

## 4. UX Flows

### 4.1 Flow: First-Time User

```
Install extension
  → Icon appears in toolbar
  → User clicks icon
  → Popup opens: Empty State (3.7)
  → User browses to Upwork/Fiverr
  → Floating clip button appears
  → User clicks "Clip this Job"
  → Toast: "✓ Job clipped!"
  → User clicks extension icon again
  → Job list shows 1 job
  → User explores job card → expands → sees detail
```

### 4.2 Flow: Clip a Job

```
User browses Upwork job page
  → Content script detects platform
  → Floating "Clip this Job" button appears (bottom-right)

Option A: Click floating button
  → Button shows loading spinner (50ms)
  → Data extracted → saved to storage
  → Toast: "✓ Job clipped!"
  → Button changes to "✓ Clipped" (gray, disabled)

Option B: Click extension icon → "Clip this job" in popup
  → Same extraction + save
  → Popup immediately shows new job at top
  → Toast: "✓ Job clipped!"
```

### 4.3 Flow: Update Job Status

```
User opens popup
  → Clicks on job card
  → Detail view opens
  → Clicks status dropdown
  → Selects "Applied"
  → Status pill instantly updates to blue "Applied"
  → Stats summary card updates counts
  → No save button needed (auto-save)
```

### 4.4 Flow: Search & Filter

```
User opens popup
  → Types "react" in search bar
  → Job list filters in real-time (debounced 300ms)
  → Shows only jobs with "react" in title
  → User clicks [Upwork] tab
  → Filters narrow to Upwork + "react" jobs
  → User clears search → all Upwork jobs shown
  → User clicks [All] → all jobs shown
```

### 4.5 Flow: Delete a Job

```
User opens popup
  → Expands a job card
  → Clicks 🗑️ Delete
  → Confirmation dialog: "Delete this job?"
  → [Cancel] [Delete]
  → If Delete: job removed, list updates, toast: "Job deleted"
  → If Cancel: dialog closes, no change
```

---

## 5. Interaction Patterns

### 5.1 Popup ↔ Content Script Communication

```
Content Script                    Background (SW)                  Popup
     │                                  │                            │
     │--- clipJob(data) --------------->│                            │
     │                                  │--- storage.set(job) ------>│
     │                                  │                            │
     │<-- toast("✓ Clipped") -----------│                            │
     │                                  │--- jobListUpdated ------->│
     │                                  │                            │--- re-render
```

### 5.2 State Management

- **Source of truth:** `chrome.storage.local`
- **Popup reads:** On open and on `storage.onChanged` events
- **Popup writes:** Status updates, notes, deletes
- **Content script writes:** New clips (via background)
- **No in-memory cache needed:** Storage reads are fast for < 10MB

### 5.3 Animation & Transitions

| Element | Animation | Duration |
|---------|-----------|----------|
| Popup open | None (instant) | 0ms |
| Job card expand | Slide down | 200ms ease-out |
| Status change | Pill color fade | 150ms |
| Toast appear | Fade in + slide up | 200ms |
| Toast dismiss | Fade out | 300ms |
| Search filter | List re-render | Instant |
| Clip button hover | Background darken | 100ms |

---

## 6. Responsive Considerations

The popup has a fixed width (350px). All components are designed for this single width.

For future web dashboard (V2+):
- Mobile-first responsive layout
- Breakpoints: 375px, 768px, 1024px, 1440px
- Card grid layout for job list on wider screens

---

## 7. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| Color contrast | WCAG AA minimum (4.5:1 for text) |
| Keyboard nav | Tab through job cards, Enter to expand |
| Screen reader | ARIA labels on status pills, buttons |
| Focus indicators | Visible focus ring on all interactive elements |
| Motion | Respect `prefers-reduced-motion` |

---

## 8. Dark Mode Design

### 8.1 Color Mapping

| Element | Light | Dark |
|---------|-------|------|
| Popup background | `#FFFFFF` | `#111827` |
| Card background | `#F9FAFB` | `#1F2937` |
| Card hover | `#F3F4F6` | `#374151` |
| Text primary | `#111827` | `#F9FAFB` |
| Text secondary | `#6B7280` | `#9CA3AF` |
| Border | `#E5E7EB` | `#374151` |
| Search background | `#F3F4F6` | `#1F2937` |
| Empty state text | `#9CA3AF` | `#6B7280` |

### 8.2 Status Colors (Unchanged)

Status colors remain the same in dark mode. They have sufficient contrast against dark backgrounds.

---

## 9. Popup Navigation Map

```
                    ┌─────────────┐
                    │  Job List    │ ← Default view
                    │  (Main)      │
                    └──────┬──────┘
                           │
                    Click on job card
                           │
                           ▼
                    ┌─────────────┐
                    │  Job Detail  │ ← Expanded view
                    │              │
                    │  - Status    │
                    │  - Notes     │
                    │  - Delete    │
                    └──────────────┘

Popup is single-page (no routing needed in V1).
Navigation is: List ↔ Detail (expand/collapse).
```
