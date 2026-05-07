# 01 — Executive Summary

## 1.1 The Problem

Freelancers who work across multiple platforms (Upwork, Fiverr, LinkedIn) have **no unified tool** to quickly clip and track their job pipeline.

**Pain points yang teridentifikasi:**


1. **"Aku apply dimana aja ya minggu lalu?"** — Freelancer apply 5-15 jobs per minggu, lupa mana yang sudah di-respond, mana yang pending, mana yang harus follow-up
2. **"Gue butuh 3 tab terbuka cuma buat cek status"** — Upwork di tab 1, Fiverr di tab 2, spreadsheet tracking di tab 3. Fragmented workflow
3. **"Berapa sih win rate gue?"** — Platform native dashboard hanya show earnings, bukan pipeline analytics (win rate, avg response time, conversion funnel)
4. **"Gue mau export data buat laporan pajak"** — Platform native export terbatas, format tidak konsisten
5. **"Spreadsheet gue berantakan"** — Manual tracking di Google Sheets/Notion butuh effort tinggi, sering lupa update

**Data pendukung:**

* Upwork punya **12M+ registered freelancers** (2025 data)
* Fiverr punya **4M+ active sellers** (2025 data)
* Google Trends "freelancer income tracker" menunjukkan steady growth
* Chrome Web Store: keyword "freelancer income tracker" = **2 results, both irrelevant**
* Chrome Web Store: keyword "freelancer dashboard" = **6 results, zero focused on income tracking**

## 1.2 The Solution

**Freelancer Pulse** = Chrome extension yang letakkan **one-click clip button** saat freelancer browsing di Upwork dan Fiverr, lalu menyediakan **unified dashboard** untuk track seluruh pipeline.

**Key differentiator: ACTIVE ONE-CLICK CLIP.**

Bukan manual entry. Bukan CSV import. Bukan API scraping (TOS violation). User cukup **lihat job yang menarik → klik clip → DONE.** Extension extract metadata secara otomatis.

```
Traditional flow:
  User lihat job → copy title → buka spreadsheet → paste → tambah status → save
  (30-60 detik per job, friction tinggi, sering skip)

Freelancer Pulse flow:
  User lihat job → klik icon → DONE. Data auto-extracted.
  (3 detik per job, zero friction, selalu update)
```

## 1.3 Product Vision

> **"The Freelancer's CRM — Track Every Gig, From Your Browser."**

Freelancer Pulse letakkan **one-click clip button** di setiap job page. User aktif pilih job yang menarik, extension capture semua. Lalu dashboard-nya kasih insights yang membantu freelancer **earn more**.

**Vision per phase:**

| Phase | Vision |
|-------|--------|
| V1    | "Bookmark on steroids untuk freelancer" — clip jobs, track status |
| V2    | "Your freelance pipeline, everywhere" — cloud sync, web dashboard |
| V3    | "Understand your freelance business" — analytics, insights, AI |
| V4    | "Run your freelance business" — full CRM, invoicing, tax |
| V5    | "Freelance team management" — multi-seat, agency features |

## 1.4 Unique Value Proposition

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  Freelancer Pulse =                                        │
│                                                            │
│  ✅ ACTIVE ONE-CLICK — klik clip, data auto-extracted       │
│  ✅ CROSS-PLATFORM — Upwork + Fiverr dalam satu tempat    │
│  ✅ LOCAL-FIRST — data di browser kamu, privacy terjamin   │
│  ✅ ZERO-FRICTION — 3 detik per clip vs 30-60 detik manual│
│  ✅ EVOLVABLE — clipper → tracker → analytics → CRM       │
│  ✅ $0 START — free, no account needed, install & use     │
│                                                            │
│  vs                                                        │
│                                                            │
│  ❌ Spreadsheets — manual, easy forget, no automation      │
│  ❌ Upwork/Fiverr native — siloed, no cross-platform      │
│  ❌ Huntr ($40/mo) — traditional job seekers, not freelance│
│  ❌ UpKit/OverdoAI — proposal AI, not tracking            │
│  ❌ CRM tools (Bonsai, AND.CO) — too heavy, $17+/mo       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## 1.5 Why Now?

| Factor | Evidence |
|--------|----------|
| Freelancer economy booming | 64M+ Americans freelanced in 2025, 38% of workforce |
| Platform fatigue increasing | Freelancers increasingly multi-platform |
| Chrome extensions maturing | Manifest V3 stable, web standards mature |
| AI readiness | AI insights bisa jadi premium feature di V3 |
| Keyword gap exists | "Freelancer income tracker" = empty on CWS |
| Competitors unfocused | 15+ Upwork extensions, ZERO focused on tracking |
| Post-COVID remote work | More freelancers = bigger TAM |

## 1.6 Success Criteria

**V1 MVP Success (3 months post-launch):**

* 500+ active weekly users
* 3.5+ star rating on Chrome Web Store
* 50%+ users clip 10+ jobs per week
* Retention: 30%+ active after 30 days

**V2 Success (6 months):**

* 2,000+ registered users
* 1,000+ active weekly users
* 60%+ of V1 users upgrade to V2

**V3 Monetization (9-12 months):**

* 2%+ conversion free → paid
* $500+ MRR
* 4.5+ star rating

**Long-term (18 months):**

* 30,000+ total users
* $3,000+ MRR
* Break-even on hosting costs

## 1.7 Key Constraints

| Constraint | Detail |
|------------|--------|
| Budget     | Zero budget untuk V1 (organic growth only) |
| Team       | Solo developer (Sibung + CTO) + Pi coding agent |
| Timeline   | V1 MVP target: 2-3 minggu |
| Tech       | TypeScript, Manifest V3 (V1), Go + SvelteKit (V2+) |
| Privacy    | Local-first, no data collection tanpa consent |
| Legal      | NO API scraping, NO credential access, DOM parsing only |
| Platform risk | Upwork/Fiverr bisa ubah DOM structure kapan saja |


---

# 02 — Market Analysis

## 2.1 Global Freelancer Market

### Market Size

| Metric | Data | Source |
|--------|------|--------|
| US freelancers (2025) | 64M+ people (38% workforce) | Upwork Research |
| Global freelancers (2025) | 1.57B+ (estimated) | World Bank / ILO |
| US freelance economy value | $1.27T+ (2025) | Upwork Research |
| Global freelance market CAGR | 15%+ (2023-2030) | Grand View Research |
| Freelance workforce growth | +7% YoY (US) | Upwork Freelance Forward |
| Average freelancer income (US) | $68,400/year | Upwork Research |
| Multi-platform freelancers | 43% use 2+ platforms | Payoneer Survey |

### Southeast Asia Specific

| Metric | Data | Source |
|--------|------|--------|
| Indonesia freelancers | 15M+ estimated | World Bank |
| Indonesia freelance workforce % | \~10% of total workforce | BPS Indonesia |
| Philippines freelancers | 1.5M+ | DOLE Philippines |
| Vietnam freelancers | 500K+ estimated | World Bank |
| Average freelancer income (ID) | Rp 3-8M/month | Sribulancer data |

### Key Trend: Multi-Platform Adoption

```
2019: Freelancer biasanya 1 platform saja
2023: 43% freelancer aktif di 2+ platforms
2025: 58% freelancer aktif di 2+ platforms (est.)
2026+: Trend meningkat karena economic uncertainty
```

**Implication:** Multi-platform = multi-tab chaos = need for unified tool. Ini fundamental driver untuk Freelancer Pulse.

## 2.2 Platform Analysis

### Upwork

| Metric | Value | Notes |
|--------|-------|-------|
| Registered freelancers | 12M+  | Largest freelance platform |
| Active freelancers | \~3M (estimated) | \~25% of registered |
| Annual platform GSV | $2.5B+ (2024) | Gross Services Volume |
| Active clients | 5M+   |       |
| Jobs posted/day | 10,000+ |       |
| Average job budget | $200-$5,000 | Varies wildly by category |
| Chrome extensions | 15+   | Crowded, mostly AI proposals |
| Native tracking | Basic earnings dashboard | No pipeline tracking |
| DOM structure | Stable, well-structured | Good for parsing |

**Upwork DOM parsing feasibility:**

* Job title: `<h1 class="air3-medium text-xl mb-1">` or similar
* Budget: `data-testid="budget"` or `.budget-info` elements
* Client info: `.client-info` section
* Job description: `.job-description-text` or `data-testid="job-description"`
* Posted date: `.posted-time` element
* ⚠️ **Risk:** Upwork periodically changes DOM classes. Need regex fallback + maintenance.

### Fiverr

| Metric | Value | Notes |
|--------|-------|-------|
| Registered sellers | 4M+   |       |
| Active sellers | \~1M (estimated) | \~25% of registered |
| Annual marketplace GSV | $1.3B+ (2023) |       |
| Active buyers | 4M+   |       |
| Gig categories | 700+  |       |
| Average gig price | $50-$500 |       |
| Chrome extensions | 10+   | Mostly SEO & enhancement |
| Native tracking | Revenue dashboard | No proposal/job tracking |
| DOM structure | Stable, React-based | Good for parsing |

**Fiverr DOM parsing feasibility:**

* Gig title: `<h1 class="gig-title">` or similar
* Price: `.gig-price` or pricing cards
* Seller info: `.seller-info` section
* Rating: `.rating-score` elements
* ⚠️ **Risk:** Fiverr uses React heavily, SSR vs CSR can differ. Need mutation observer approach.

### LinkedIn (Phase 2 — V3+)

| Metric | Value | Notes |
|--------|-------|-------|
| Monthly Active Users | 1B+   | Largest professional network |
| Freelance job postings | Growing (LinkedIn ProFinder) |       |
| Chrome extensions | 1000+ | Very crowded |
| Use case difference | Lead gen, not job applications | Different UX pattern |

**LinkedIn consideration:** LinkedIn bukan freelance marketplace per se. Freelancer pakai LinkedIn untuk:

* Prospecting (cari klien potensial)
* Self-branding (profile, posts)
* ProFinder (LinkedIn's freelance marketplace, US-centric)

**V1-V2: Skip LinkedIn. V3: Add LinkedIn prospecting tracking.**

## 2.3 Chrome Extension Market

### Market Data

| Metric | Value | Source |
|--------|-------|--------|
| Total Chrome extensions | 300,000+ | Chrome Web Store |
| Total users (all extensions) | Billions | Google |
| Average install per extension | \~10,000 | Estimated |
| Top 1% extensions | 1M+ users |        |
| Average developer revenue | $5,000-$50,000/year | Varied widely |
| Extension uninstall rate | \~30% within 30 days | Google data |
| Freemium conversion rate | 2-5%  | Industry standard |

### Monetization Benchmarks

| Extension Type | Typical Pricing | Avg Revenue/1K Users |
|----------------|-----------------|----------------------|
| Productivity tools | $3-$10/mo       | $20-$100/mo          |
| Developer tools | $5-$15/mo       | $50-$200/mo          |
| AI-powered tools | $10-$30/mo      | $100-$500/mo         |
| Social media tools | $5-$20/mo       | $30-$150/mo          |
| Job search tools | $10-$40/mo      | $50-$300/mo          |

**Huntr benchmark:** \~50K users, $40/mo Pro plan. If 2% conversion = 1,000 paying = $40K MRR. This proves the model.

## 2.4 Demand Signals

### Keyword Analysis (Chrome Web Store — Live Research 05 May 2026)

| Keyword | Results | Quality | Competition |
|---------|---------|---------|-------------|
| "freelancer income tracker" | **2 (irrelevant)** | 🟢 **EMPTY** | 🟢 **ZERO** |
| "freelancer dashboard" | 6       | 🟢 Low  | 🟡 Low      |
| "upwork job tracker" | 5-10    | 🟡 Mixed | 🟡 Low-Medium |
| "fiverr gig tracker" | 3-5     | 🟢 Low quality | 🟢 **ZERO** |
| "freelancer proposal tracker" | 5-10    | 🟡 Mixed | 🟡 Low      |
| "freelancer CRM" | 2-3     | 🟢 Very low | 🟢 **ZERO** |
| "job application tracker" | 10+     | 🔴 Crowded | 🔴 **HIGH** |
| "upwork" | 15+     | 🟡 Mixed | 🔴 High     |

### Google Trends Indicators

| Query | Trend (2024-2026) | Signal |
|-------|-------------------|--------|
| "track freelance income" | Steady moderate   | Existing demand |
| "freelancer expense tracker" | Growing           | Financial tracking need |
| "upwork application tracker" | Low but growing   | Unmet need |
| "freelance CRM" | Steady            | Business tool demand |
| "best freelancer tools" | Growing           | Tool discovery demand |

### Reddit/Community Demand

Common complaints di r/freelancing dan r/upwork:

* "I can't keep track of all the proposals I've sent"
* "Wish there was a way to see all my job applications in one place"
* "I use a spreadsheet but I always forget to update it"
* "Upwork's native tracking is terrible"

**Gap confirmed:** Users complain about tracking secara verbal, tapi zero solution exists as Chrome extension specifically for this.

## 2.5 Total Addressable Market (TAM)

```
TAM (Total Addressable Market):
  Global freelancers who use Upwork or Fiverr = 4M+ active users
  × Average willingness to pay for tools = $5-$15/mo
  × 12 months
  = TAM: $240M - $720M annually

SAM (Serviceable Addressable Market):
  Freelancers who use BOTH platforms + Chrome
  = ~500K users (estimated 12.5% of active freelancers multi-platform)
  × $5/mo × 12 months
  = SAM: $30M annually

SOM (Serviceable Obtainable Market — Year 1):
  Target: 5,000 users (1% of SAM)
  × 2% conversion to paid
  = 100 paying users
  × $5/mo × 12 months
  = SOM: $6,000 Year 1

SOM (Year 3 — optimistic):
  Target: 50,000 users (10% of SAM)
  × 5% conversion to paid
  = 2,500 paying users
  × $7/mo (avg across tiers) × 12 months
  = SOM: $210,000 Year 3
```


---

# 03 — Competitive Landscape

## 3.1 Competitive Overview

```
                    ┌─────────────────────────────┐
                    │    TRADITIONAL JOB TRACKERS   │
                    │  (Huntr, Simplify, Careerflow)│
                    │  → Job seekers, NOT freelancers│
                    └──────────────┬────────────────┘
                                   │
    ┌──────────────────────────────┼──────────────────────────────┐
    │                              │                              │
    ▼                              ▼                              ▼
┌────────────┐            ┌──────────────┐             ┌────────────────┐
│ PROPOSAL   │            │ JOB CLIPPERS │             │ FULL CRM      │
│ AI TOOLS   │            │ (NO DIRECT   │             │ (Bonsai,      │
│ (15+ ext)  │            │  COMPETITOR) │             │  AND.CO)      │
│ UpKit,     │            │ Freelancer   │             │ Too heavy,    │
│ PitchMit,  │            │ Pulse = HERE │             │ $17+/mo       │
│ OverdoAI   │            │              │             │                │
└────────────┘            └──────────────┘             └────────────────┘
```

**KEY INSIGHT:** "Job Clipper + Tracker untuk Freelancer" = empty quadrant. Tidak ada satu pun extension yang mengisi posisi ini.

## 3.2 Tier 1 — Direct Competitors (Partial Overlap)

### UpKit

* **URL:** upkit.dev
* **Chrome Web Store:** "UpKit: Upwork Job Alerts" — 5.0★
* **Features:** AI proposal generator, instant job alerts, proposal scoring, **ROI tracker**
* **Overlap:** ROI tracker = closest feature overlap (30%)
* **Gap:** Upwork-ONLY, no Fiverr, no active one-click clip, ROI tracking but not full pipeline
* **Threat Level:** 🟡 MEDIUM — most similar concept, but very narrow

### OverdoAI

* **URL:** overdoai.com
* **Chrome Web Store:** 0.0★, 17 users
* **Features:** Profile analysis, pitch scoring, LinkedIn message generator, email finder
* **Pricing:** Free (3 analyses/mo), Pro $9/mo, Growth $19/mo
* **Overlap:** Analytics mindset (10%), Upwork + LinkedIn dual platform
* **Gap:** Zero tracking, zero income features, Africa-focused market, tiny user base
* **Threat Level:** 🟢 LOW — different product category (profile optimizer, not tracker)

### Agencer

* **URL:** agencer.ai
* **Chrome Web Store:** "Agencer: AI Upwork & LinkedIn Gig Assistant" — 4.2★
* **Features:** AI assistant for Upwork & LinkedIn gigs
* **Overlap:** Dual platform approach (25%)
* **Gap:** AI-first, not tracking-first. More like copilot than tracker
* **Threat Level:** 🟡 MEDIUM — could evolve to include tracking

### SmartApply

* **URL:** smartapplypro.com
* **Chrome Web Store:** 5.0★
* **Features:** Job analysis, cover letter analysis, AI feedback
* **Pricing:** Free trial, Lifetime $2500 BDT (\~$20 USD)
* **Overlap:** Freelancer tool (15%), Upwork focus
* **Gap:** Bangladesh market focus, no tracking, one-time pricing
* **Threat Level:** 🟢 LOW — different market, different value prop

## 3.3 Tier 2 — Adjacent Competitors

### Huntr (Most Relevant Adjacent)

* **URL:** huntr.co
* **Chrome Web Store:** 4.8★, 50K+ users
* **Features:** Job tracker, autofill, AI resume builder, contact tracker, interview tracker
* **Pricing:** Free (100 jobs), Pro $40/mo
* **Overlap:** Job tracking concept (40%)
* **Gap:** Traditional job seekers ONLY (LinkedIn, Indeed, etc). Not designed for freelancer workflow. No active clip from freelance platforms. No income tracking.
* **Threat Level:** 🟡 MEDIUM — could add freelancer support. But at $40/mo, pricing leaves room below.

### Simplify Copilot

* **URL:** simplify.jobs
* **Chrome Web Store:** 4.9★, very popular
* **Features:** Autofill, job tracker, AI resumes
* **Overlap:** Tracker + autofill (30%)
* **Gap:** Traditional job seekers, SaaS company with funding, not freelancers
* **Threat Level:** 🟢 LOW — different market

### Careerflow AI

* **Chrome Web Store:** 4.4★
* **Features:** Profile optimization, job tracker, autofill, ATS resume checker
* **Overlap:** LinkedIn focus, tracker (20%)
* **Gap:** Traditional job search, not freelancer pipeline
* **Threat Level:** 🟢 LOW

### PitchMit

* **URL:** pitchmit.com
* **Chrome Web Store:** 0.0★, verified publisher
* **Features:** Upwork proposal assistant
* **Overlap:** Upwork-only tool (10%)
* **Threat Level:** 🟢 LOW — no traction, narrow scope

## 3.4 Tier 3 — Platform-Native Tools

| Platform | Tracking Feature | Gap vs Freelancer Pulse |
|----------|------------------|-------------------------|
| **Upwork** | Earnings report, proposal tracker (in-platform) | Siloed, no Fiverr sync, no analytics, no export |
| **Fiverr** | Revenue dashboard, order management | Siloed, no Upwork sync, no pipeline view |
| **LinkedIn** | Profile views, who viewed your profile | Not a job tracking tool at all |

## 3.5 Tier 4 — SaaS Freelancer Tools (Not Extensions)

| Tool | Type | Pricing | Why Not Direct Competitor |
|------|------|---------|---------------------------|
| Bonsai | Full freelance suite | $17-$39/mo | Too heavy, full SaaS, not extension |
| AND.CO | Invoice + contracts | $9-$18/mo | Finance-focused, not pipeline |
| FreshBooks | Accounting | $7-$25/mo | Accounting, not job tracking |
| Toggl | Time tracking | Free-$20/mo | Time-focused, not pipeline |
| Notion/Sheets | Generic | Free-$10/mo | Generic tool, no freelance-specific features |

**Key difference:** These are full SaaS products with monthly subscriptions. Freelancer Pulse extension = lighter, cheaper, browser-native, zero onboarding friction.

## 3.6 Competitive Positioning Matrix

```
                    HIGH COMPLEXITY (Heavy CRM, SaaS)
                         │
            Bonsai ●     │     ● AND.CO
                         │
              Huntr ●    │
                         │
      ───────────────────┼─────────────────── HIGH PRICE ($15+/mo)
                         │
         Simplify ●      │
                         │
      ───────────────────┼───────────────────
                         │
         UpKit ●         │     ★ FREELANCER PULSE
                         │       (Target Position)
    OverdoAI ●           │
                         │
    SmartApply ●         │
                         │
      ───────────────────┼─────────────────── LOW PRICE (Free-$10/mo)
                         │
                    LOW COMPLEXITY (Light Extension)
```

**Target Position:** Low complexity + Low price = mass market, easy adoption, zero friction.

**Migration path:** As product evolves (V3-V4), move UP-RIGHT on the matrix toward Bonsai territory, but stay below on price.

## 3.7 SWOT Analysis

### Strengths

* **Empty keyword space** — "freelancer income tracker" = 2 results, both irrelevant
* **Active one-click clip** — unique differentiator no competitor has
* **Cross-platform** — first tool to unify Upwork + Fiverr in one tracker
* **Local-first** — zero privacy concern, instant value (no signup)
* **Free to start** — lowest barrier to entry possible

### Weaknesses

* **New product** — no brand, no user base, no reviews
* **Solo developer** — limited bandwidth for feature development
* **DOM parsing dependency** — platform DOM changes break parsing
* **Chrome-only** — Firefox/Edge/Safari users excluded (initially)
* **No AI in V1** — competitors like UpKit have AI features

### Opportunities

* **Keyword domination** — empty keyword = easy #1 ranking on CWS
* **Natural upsell path** — Clipper → Tracker → Analytics → CRM
* **Community building** — freelancer communities underserved
* **API partnerships** — potential integration with Bonsai, FreshBooks later
* **Mobile companion** — web dashboard can become mobile-friendly later
* **Multi-platform expansion** — LinkedIn, Freelancer.com, Toptal in V5

### Threats

* **Platform TOS changes** — Upwork/Fiverr could restrict extension access
* **Platform builds it** — Upwork could add pipeline tracking natively
* **Competitor pivots** — UpKit or Huntr could add freelancer features
* **Browser changes** — Chrome Manifest V3 already restricted some APIs
* **Market size** — freelancer tool market is inherently smaller than B2B SaaS