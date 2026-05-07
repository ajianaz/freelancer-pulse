# Freelancer Pulse - Master Blueprint

**Chrome Extension: Freelance Pipeline Tracker + AI Roast** **Version:** Blueprint v1.1 | **Last Updated:** 06 May 2026 **Status:** Strategic Decisions Complete - Ready for Implementation **Owner:** Sibung | **Architect:** CTO


---

## Quick Reference

| Item | Value |
|------|-------|
| **Product Name** | Freelancer Pulse |
| **Tagline** | Your Freelance Pipeline, in One Click |
| **Type** | Chrome Extension + Go API |
| **Platforms** | Upwork, Fiverr (only - locked) |
| **Extension Stack** | TypeScript, Svelte 5, Vite, CRXJS, Tailwind CSS |
| **API Stack** | Go (MikroSaaS-style), PostgreSQL 18 |
| **Dashboard (V2+)** | SvelteKit |
| **Repos** | `freelancer-pulse` (extension) + `freelancer-pulse-api` (Go) |
| **License** | Proprietary |
| **Monetization** | TBD (parked) |

## Decision Log (18 decisions locked)

| #   | Decision | Date |
|-----|----------|------|
| 1   | Independent repo, bukan MikroSaaS module | 05 May 2026 |
| 2   | V1 local-only, zero backend | 05 May 2026 |
| 3   | TypeScript, Manifest V3 | 05 May 2026 |
| 4   | V2 backend Go + SvelteKit + PostgreSQL 17 | 05 May 2026 |
| 5   | VPS Singapore (bukan CF Pages split) | 05 May 2026 |
| 6   | Freemium monetization mulai V3 | 05 May 2026 |
| 7   | Option B (Active Clip) > A (CRM) untuk MVP | 05 May 2026 |
| 8   | Branding: Freelancer Pulse | 05 May 2026 |
| 9   | ACTIVE one-click clip (not passive) | 06 May 2026 |
| 10  | Positioning: Freelance Pipeline Tracker | 06 May 2026 |
| 11  | Extension stack: Svelte 5 | 06 May 2026 |
| 12  | v0.x.y semver pre-release | 06 May 2026 |
| 13  | AI Roast: Profile + Proposal, tone roast | 06 May 2026 |
| 14  | AI Roast timing: v0.1.5 | 06 May 2026 |
| 15  | Two repos: Extension (Svelte) + Go API | 06 May 2026 |
| 16  | AI API security: 6-layer model | 06 May 2026 |
| 17  | V5 expansion: Direct/Referral jobs | 06 May 2026 |
| 18  | Pricing: parked until V1 data | 06 May 2026 |

## Versioning Roadmap

| Version | Scope | Status |
|---------|-------|--------|
| v0.0.1  | Skeleton: Manifest V3 + Svelte + Vite + CI | Not Started |
| v0.1.0  | Core Clipper: one-click clip + popup + stats + export | Not Started |
| v0.1.5  | AI Roast: profile roast + proposal roast via Go API | Not Started |
| v0.2.0  | Enhanced Dashboard: filters, search, dark mode | Not Started |
| v0.3.0  | Cloud Sync: Go API + auth + sync + SvelteKit | Not Started |
| v1.0.0  | Production Ready: API frozen, monetization, polished | Not Started |

## Blockers Resolved

| Blocker | Status | Date |
|---------|--------|------|
| Passive vs Active positioning | RESOLVED: Active Clip | 06 May 2026 |
| CSP Upwork verification | RESOLVED: report-only, content script bypass | 06 May 2026 |
| CSP Fiverr verification | Pending (expected clear) | TBD  |

## Index


1. [Market and Competitive Analysis](/doc/market-competitive-analysis-NSpuoXraBd) - Problem definition, market size, competitor landscape
2. [Product and Technical Design](/doc/product-technical-design-ix4GnNbzm5) - Product strategy, architecture, features, UX design
3. [Operations and Validation](/doc/operations-validation-DQSZTCzxqp) - Monetization, GTM, implementation plan, risks, metrics, BMAD validation


---

*Local source:* `*/opt/data/freelancer-pulse/docs/*` *(14 files)* *Source file hash synced: 06 May 2026*