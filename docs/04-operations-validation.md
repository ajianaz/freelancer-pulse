# 08 — Monetization

## Pricing Tiers

| Feature | Free | Pro ($5/mo) | Team ($15/mo) |
|---------|------|-------------|---------------|
| Clip jobs | 100 total | Unlimited   | Unlimited     |
| Platforms | Upwork + Fiverr | Upwork + Fiverr | + LinkedIn (V5) |
| Local storage | ✅    | ✅           | ✅             |
| Cloud sync | ❌    | ✅           | ✅             |
| Web dashboard | ❌    | ✅           | ✅             |
| Analytics | Basic stats | Full analytics | Full + team   |
| AI insights | ❌    | ✅           | ✅             |
| Export (CSV/JSON) | ✅    | ✅           | ✅             |
| Email reports | ❌    | Weekly      | Daily         |
| Multi-seat | ❌    | ❌           | 5 seats       |
| Priority support | ❌    | ✅           | ✅             |

## Why $5/mo?

| Price Point | Pros | Cons |
|-------------|------|------|
| $3/mo       | Higher conversion | Too cheap → perceived low value, hard to raise later |
| **$5/mo**   | **Sweet spot: impulsive purchase threshold** | **Conversion may be lower than $3** |
| $10/mo      | Higher revenue per user | Above "impulse buy" zone, more consideration |
| $15/mo      | Premium positioning | Viable only for Team tier |

**Decision:** $5/mo = a cup of coffee. Below the "$10 decision threshold" where users start overthinking. Huntr charges $40/mo — we're 8x cheaper. Easy sell.

## Revenue Projections

### Conservative (1% SAM capture, 2% conversion)

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Total users | 5,000  | 15,000 | 30,000 |
| Paying users (2%) | 100    | 300    | 600    |
| ARPU/mo | $5     | $5.50  | $6     |
| **MRR** | **$500** | **$1,650** | **$3,600** |
| **ARR** | **$6,000** | **$19,800** | **$43,200** |
| Costs (VPS+Stripe) | $240   | $480   | $960   |
| **Net Profit** | **$5,760** | **$19,320** | **$42,240** |

### Moderate (3% SAM, 3% conversion)

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Total users | 15,000 | 50,000 | 100,000 |
| Paying users (3%) | 450    | 1,500  | 3,000  |
| ARPU/mo | $5     | $5.50  | $6     |
| **MRR** | **$2,250** | **$8,250** | **$18,000** |
| **ARR** | **$27,000** | **$99,000** | **$216,000** |

### Optimistic (5% SAM, 5% conversion)

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Total users | 25,000 | 100,000 | 250,000 |
| Paying users (5%) | 1,250  | 5,000  | 12,500 |
| ARPU/mo | $5     | $6     | $7     |
| **MRR** | **$6,250** | **$30,000** | **$87,500** |
| **ARR** | **$75,000** | **$360,000** | **$1,050,000** |

## Break-Even

| Cost Item | Monthly |
|-----------|---------|
| VPS Singapore (Hetzner/DO) | $10-20  |
| PostgreSQL managed | $0 (self-hosted on VPS) |
| Domain + SSL | $1/mo (amortized) |
| Email (Resend/Mailgun) | $0-10   |
| Stripe fees (2.9% + 30¢) | Per transaction |
| **Total fixed** | **\~$15-30/mo** |

**Break-even: \~3-6 paying users.** Essentially free to run until thousands of users.

## Revenue Model per Version

```
V1: $0 → Build user base, zero friction
V2: $0 → Still free, cloud sync drives adoption
V3: Freemium → Analytics = paid feature
V4: $5/mo Pro stable → Add annual plan ($48/yr = 20% discount)
V5: $5 Pro + $15 Team → Agency/multi-seat revenue
```

## Payment Processing

* **Stripe** — global standard, handles subscriptions, 2.9% + 30¢ per transaction
* Checkout via web dashboard (not extension — Chrome Payment API is deprecated)
* Annual plan discount: $48/yr (save $12, 20% off)


---

# 09 — Go-to-Market Strategy

## Channel Strategy (Zero Budget, V1)

```
Week 1-2: Pre-launch
├── Landing page (simple HTML/CSS, CTA: "Join Waitlist")
├── r/freelancing post — "I built a tool because I was tired of..."
├── r/upwork post — share pain point + solution
├── Twitter/X thread — "Freelancer tracking is broken. Here's why."
└── Product Hunt "Upcoming" page

Week 3: Launch
├── Product Hunt launch (Tuesday or Wednesday, best days)
├── r/freelancing update — "It's live!"
├── r/SideProject post
├── Hacker News "Show HN" post
├── Indie Hackers post
└── Twitter thread with demo GIF

Week 4-8: Organic Growth
├── Reply to every Chrome Web Store review
├── YouTube short: "How I track all my freelance jobs in 1 click"
├── Blog post SEO: "Best Freelancer Tracking Tools 2026" (include ourselves)
├── Guest post on freelancer blogs
└── Build in public on Twitter (weekly updates)
```

## Chrome Web Store SEO

| Tactic | Detail |
|--------|--------|
| Title  | "Freelancer Pulse — Job Tracker for Upwork & Fiverr" |
| Description | Keyword-rich, 132 char max |
| Category | Productivity |
| Keywords | freelancer, upwork, fiverr, job tracker, income tracker, freelance dashboard |
| Screenshots | 5 max: clip demo, dashboard, stats, cross-platform, dark mode |
| Promo tile | 440x280 brand image |

## Community Targets

| Community | Size | Approach |
|-----------|------|----------|
| r/freelancing | 200K+ | Pain-point post, not ad |
| r/upwork  | 50K+ | Share personal story |
| r/SideProject | 300K+ | Technical build story |
| r/webdev  | 2M+  | Extension dev technical post |
| Indie Hackers | High-intent | Build-in-public thread |
| Product Hunt | Broad | Launch day push |
| Hacker News | Technical | Show HN post |
| Twitter/X | Broad | Thread + build in public |

## Referral Loop (V2+)

* "Share Freelancer Pulse with a freelancer friend" → referral link
* No referral rewards in V1 (keep simple)
* V3+: "Give 1 month Pro, get 1 month Pro" referral program

## Content Marketing Calendar

| Week | Content | Platform |
|------|---------|----------|
| Launch | "Why I built Freelancer Pulse" | Reddit + IH + Twitter |
| W2   | "How to track freelance jobs without spreadsheets" | Blog + Twitter |
| W4   | "Upwork vs Fiverr: Which pays more? (data)" | Blog + Reddit |
| W6   | "5 freelance tools that actually save time" | Blog (listicle, include ourselves at #1) |
| W8   | User spotlight / testimonial tweet | Twitter  |
| Monthly | SEO blog posts targeting long-tail keywords | Blog     |


---

# 10 — Implementation Plan

## V1 MVP Sprint (2-3 Weeks)

### Sprint 1: Foundation (Week 1)

| Day | Task | Estimate |
|-----|------|----------|
| D1  | Project setup: Vite + TypeScript + Manifest V3 boilerplate | 2h       |
| D1  | Chrome extension scaffolding: manifest.json, popup.html, service worker | 2h       |
| D2  | Storage layer: chrome.storage.local wrapper + types | 2h       |
| D2  | Basic popup UI: empty state, job list skeleton | 3h       |
| D3  | Upwork DOM parser: title, budget, client, description, posted date | 4h       |
| D4  | Fiverr DOM parser: gig title, price, seller, rating | 4h       |
| D5  | Content script: URL detection, auto-route to parser | 2h       |
| D5  | Clip button: floating action on job pages | 3h       |
| D6-7 | Integration: content → background → popup → storage flow | 4h       |

### Sprint 2: Features (Week 2)

| Day | Task | Estimate |
|-----|------|----------|
| D8  | Status tracking: click to cycle status | 2h       |
| D8  | Job detail view: full description, notes | 2h       |
| D9  | Search + filter: by platform, status, title search | 3h       |
| D9  | Duplicate detection: URL dedup on clip | 1h       |
| D10 | Notes per job: text input, save to storage | 1h       |
| D10 | Basic stats: total, by platform, by status (count) | 2h       |
| D11 | Delete job + confirm dialog | 1h       |
| D11 | Dark mode support | 2h       |
| D12 | Polish: loading states, empty states, error handling | 3h       |
| D13 | Testing: manual QA on Upwork + Fiverr live pages | 3h       |

### Sprint 3: Launch (Week 3)

| Day | Task | Estimate |
|-----|------|----------|
| D14 | CWS assets: icon (128/48/16), screenshots (5), promo tile | 2h       |
| D14 | CWS listing: title, description, keywords optimized | 1h       |
| D15 | Privacy policy + terms pages | 1h       |
| D15 | Submit to CWS (review typically 1-3 days) | 0.5h     |
| D16-18 | Marketing: Reddit posts, Twitter thread, Product Hunt prep | 4h       |
| D19 | Product Hunt launch day | Full day |
| D20 | Monitor reviews, fix bugs, iterate | Ongoing  |

**Total V1 Estimate:** \~50 hours across 3 weeks

## Development Workflow

```
Feature branch (feat/clip-button)
  → Implement via Pi (coding agent)
  → Manual test on live Upwork/Fiverr pages
  → Commit to develop
  → CWS dev build test
  → Merge to main
  → Bump version
  → Submit to CWS
```

## Tools

| Tool | Purpose |
|------|---------|
| Pi (pi.dev) | AI coding agent for implementation |
| Vite | Extension build tool |
| TypeScript | Type safety |
| Svelte 5 | Popup UI framework (same as V2 SvelteKit) |
| Chrome DevTools | Testing & debugging |
| GitHub | Source control + issues |
| Chrome Web Store Developer Dashboard | Distribution |

## V2 Timeline (4-6 weeks after V1 launch)

```
Week 1-2: Go API scaffold + PostgreSQL schema + auth (magic link)
Week 3-4: SvelteKit dashboard + sync protocol
Week 5-6: Testing, deploy VPS, migration tool (V1→V2), launch
```


---

# 11 — Risk Assessment

## Risk Matrix

```
                    CRITICAL IMPACT
                         │
           R5 ●          │          ● R1
                         │
                         │
      ───────────────────┼───────────────────
                         │
           R4 ●          │          ● R3
                         │
           R8 ●          │     ● R2   ● R6
                         │
                         │
                    LOW IMPACT
     LOW LIKELIHOOD                HIGH LIKELIHOOD
```

## Top Risks

### R1: Platform DOM Change (Likelihood: HIGH, Impact: CRITICAL) ⚠️

**Scenario:** Upwork or Fiverr changes their page structure, breaking all DOM selectors overnight.

**Mitigation:**

* Use multiple selector strategies (class, data-testid, aria-label, text content)
* Regex fallback for text-based extraction
* Monitor changes with automated weekly DOM snapshot tests
* Graceful degradation: show "parsing error" instead of crash
* Community reporting: users can flag broken pages

**Contingency:** Hot-fix release within 24-48 hours. Keep parser modular so only affected platform's file needs update.

### R2: Low User Adoption (Likelihood: HIGH, Impact: MEDIUM)

**Scenario:** Product launches but nobody installs it.

**Mitigation:**

* CWS keyword optimization (empty keyword space = easy #1)
* Reddit/Twitter organic posting in r/freelancing, r/upwork
* Product Hunt launch (free exposure)
* SEO blog posts targeting "freelancer tracking tools"
* V1 = zero friction (no account needed)

**Early warning:** < 50 installs in first 2 weeks → pivot marketing or add feature.

### R3: Upwork/Fiverr TOS Restriction (Likelihood: MEDIUM, Impact: CRITICAL)

**Scenario:** Platform updates TOS to explicitly ban browser extensions.

**Mitigation:**

* We DON'T scrape APIs or capture credentials — only read visible DOM (user's own browser)
* Legal precedent: browser extensions reading public page content is generally permissible
* Stay under the radar: no mass data extraction, no auto-apply
* Be transparent about what data we collect (nothing leaves the browser in V1)

**Contingency:** Pivot to manual-clip model (user copies URL, extension extracts what it can). Or focus on LinkedIn (V3) if freelance platforms become hostile.

### R4: Chrome Web Store Rejection (Likelihood: MEDIUM, Impact: HIGH)

**Scenario:** CWS review rejects the extension or delays listing.

**Mitigation:**

* Follow all CWS policies strictly (single-purpose, no remote code, clear permissions)
* NO remote code execution — all logic bundled in extension
* Minimal permissions (storage, activeTab, host_permissions for 2 domains only)
* Submit early, iterate on review feedback

### R5: Solo Developer Burnout (Likelihood: LOW, Impact: CRITICAL)

**Scenario:** Developer stops maintaining the extension, DOM changes pile up, users leave bad reviews.

**Mitigation:**

* V1 is deliberately simple (2-3 week build)
* AI coding agent (Pi) handles most implementation
* Modular parser architecture = easy to fix individual breakages
* Clear V1 scope = no scope creep
* Extension is self-contained, minimal operational burden

### R6: Competitor Pivot (Likelihood: MEDIUM, Impact: MEDIUM)

**Scenario:** UpKit adds job tracking. Huntr adds freelancer support.

**Mitigation:**

* First-mover advantage in "freelancer clipper" niche
* Keep shipping fast — V1 in 2-3 weeks
* Build community loyalty (respond to reviews, feature requests)
* Cross-platform angle (Upwork + Fiverr unified) = hard to copy quickly

### R7: Chrome Extension API Changes (Likelihood: LOW, Impact: HIGH)

**Scenario:** Google further restricts Manifest V3 APIs.

**Mitigation:**

* Already on Manifest V3 (latest standard)
* Minimal API surface — mostly just storage + DOM access
* No background page (service worker only) — already compliant

### R8: Monetization Failure (Likelihood: MEDIUM, Impact: MEDIUM)

**Scenario:** Users refuse to pay $5/mo, conversion stays near 0%.

**Mitigation:**

* V1-V2 are free — build love first
* $5 is below decision threshold (psychology)
* Add value BEFORE asking for money (analytics are genuinely useful)
* Annual plan ($48/yr) as anchor for monthly ($5)

**Contingency:** Lower to $3/mo, or switch to one-time purchase ($29 lifetime), or ad-supported model.

## Legal Compliance Checklist

- [ ] Privacy policy page (required by CWS)
- [ ] No data collection without consent (V1 = all local)
- [ ] GDPR-ready for V2 (cloud sync requires consent)
- [ ] CCPA-compliant (California users)
- [ ] Clear data retention/deletion policy
- [ ] Cookie/tracking disclosure (if any analytics added)
- [ ] Terms of service


---

# 12 — Metrics & KPI

## North Star Metric

**Weekly Active Clippers (WAC)** — users who clip at least 1 job per week. This measures core value delivery. If users clip, the product works.

## V1 KPIs (Months 1-3)

| Metric | Target | Why |
|--------|--------|-----|
| Total installs | 500+ (3 months) | Distribution health |
| Weekly active users | 100+   | Retention signal |
| Weekly active clippers (WAC) | 50+    | Core value metric |
| Avg clips per user/week | 5+     | Engagement depth |
| Clips → status update rate | 30%+   | Users tracking pipeline |
| Day 1 retention | 40%+   | Install → use next day |
| Day 7 retention | 25%+   | Weekly habit formation |
| Day 30 retention | 15%+   | Long-term stickiness |
| CWS rating | 4.0+   | Quality signal |
| Uninstall rate | < 30% in 30 days | Below industry avg |

## V2 KPIs (Months 3-6)

| Metric | Target | Why |
|--------|--------|-----|
| Account creation rate | 20%+ of V1 users | Conversion to cloud |
| Web dashboard DAU | 30%+ of registered | Dashboard value |
| Sync success rate | 99%+   | Reliability |
| Export usage | 10%+ of users | Data portability value |

## V3 KPIs (Months 6-12)

| Metric | Target | Why |
|--------|--------|-----|
| Free → Paid conversion | 2%+    | Industry benchmark |
| MRR    | $500+  | Monetization validation |
| Churn (paid) | < 5%/month | Product-market fit |
| NPS    | 40+    | User satisfaction |

## Funnel Tracking

```
Install → Open Popup → Clip First Job → Clip 2nd Job → Update Status → Weekly Habit
  100%      80%            60%              40%             30%           15%
```

**Key drop-off points to watch:**


1. Install → Open (20% drop) = icon not noticed, product not compelling enough
2. Open → First clip (20% drop) = UI confusing, or user on non-supported page
3. First clip → Second clip (33% drop) = value not realized, or first clip failed

## Data Collection (Privacy-First)

* V1: Zero telemetry. All data local.
* V2: Optional anonymous stats (can be disabled):
  * Clip count (not content)
  * Platform distribution (Upwork vs Fiverr %)
  * Feature usage (which buttons clicked)
  * Error/exception counts
* V3: Same as V2 + conversion funnel events (anonymized)

**Principle:** We never collect job content, URLs, or user data without explicit consent. Analytics are aggregate and anonymous.


---

# BMAD Cross-Validation — Freelancer Pulse Blueprint

## Methodology

**Track 1: Hermes Fleet Discussion** — Bad Sector invited (agent offline, timeout) **Track 2: Manual BMAD Party Mode** — CTO embodies 6 personas, adversarial review

**Date:** 05 May 2026 **Status:** Complete (Track 2 only — manual adversarial review) **Updated:** 06 May 2026 — Blocker #2 resolved (positioning → active clip)

> ⚠️ **Note:** This document is historical — it captures the validation debate, including the "passive vs active" discussion. The final decision was **ACTIVE one-click clip** (not passive). All blueprint docs (01-07) have been updated to reflect this. See decision log #7 in master index.


---

## Claim-Level Consensus Table

| #   | Claim | Verdict | Confidence | Notes |
|-----|-------|---------|------------|-------|
| 1   | Keyword space empty ("freelancer income tracker") | ✅ Valid | HIGH       | Verified live on CWS. But — empty ≠ valuable. Could mean zero demand, not zero supply. |
| 2   | 43% multi-platform = unmet need | ⚠️ Partial | MEDIUM     | Stat is real (Payoneer Survey), but "multi-platform" ≠ "needs a tracker." Users may not see tracking as a problem worth solving. |
| 3   | No direct competitor | ✅ Valid | HIGH       | Confirmed. 15+ Upwork extensions, zero focused on cross-platform tracking. But UpKit (ROI tracker) is closest and could pivot fast. |
| 4   | $5/mo viable | ⚠️ Partial | MEDIUM     | Price point is sound. BUT — free V1 users rarely convert at V3. 2% conversion assumption is optimistic for a tool that starts free. Industry is 1-3% for free-to-paid transitions. |
| 5   | DOM parsing feasible | ✅ Valid | HIGH       | Both platforms have stable DOM. Risks are maintenance (not feasibility). Modular parser design mitigates this. |
| 6   | $210K Year 3 SOM | ❌ Optimistic | LOW        | This requires 50K users + 5% conversion at $7 ARPU. Extremely aggressive for solo developer with zero marketing budget. Realistic: $10K-50K Year 3. |
| 7   | Low TOS risk | ⚠️ Partial | MEDIUM     | DOM reading is generally legal, but platforms CAN restrict extensions via CSP headers. Upwork already serves restrictive headers. Need to verify. |
| 8   | V1 in 2-3 weeks | ✅ Valid | HIGH       | Scope is tight. TypeScript + Manifest V3 + Svelte 5 popup + 2 parsers. \~50 hours. Feasible with Pi as coding agent. |


---

## Persona Analysis (6 BMAD Perspectives)

### Winston (System Architect) — Focus: Technical Architecture

* **Approves:** Local-first V1, Manifest V3, modular parser design
* **Concern:** chrome.storage.local has 10MB limit. At \~500 bytes/job, that's \~20,000 jobs. Sufficient for V1, but need migration plan for V2 before users hit limits
* **Concern:** Service worker in Manifest V3 can be killed anytime. Background sync unreliable. Design for stateless service worker.
* **Recommendation:** Add storage usage indicator in popup. Alert at 80% capacity.

### Amelia (Senior Dev) — Focus: Implementation Risk

* **Approves:** V1 scope is tight and achievable
* **Concern:** Upwork uses complex SPA with lazy loading. DOM might not be ready when content script runs. Use MutationObserver, not just document_idle.
* **Concern:** Fiverr uses React with hydration. SSR vs CSR content differs. Parser needs both paths.
* **Recommendation:** Build parser as a class with retry/fallback. Test on 50+ real job pages before launch.

### Mary (QA Engineer) — Focus: Edge Cases & Quality

* **Concern:** What happens when user clips a job, then the client deletes the listing? URL becomes 404. Extension should handle gracefully.
* **Concern:** Budget format varies wildly: "$500-$1000", "$50/hr", "Not specified", "Less than $100". Parser needs to normalize.
* **Concern:** Fiverr gig URLs change when seller edits gig. Dedup by URL may create duplicates.
* **Recommendation:** Store original HTML snippet (truncated) for offline reference. Normalize budget into min/max/unknown fields.

### John (Product Manager) — Focus: Market & Prioritization

* **STRONG CONCERN:** "Passive capture" sounds great but — do users actually WANT to see every job they visit? Power users browse 50+ jobs/day. Clipping ALL of them creates noise.
* **Recommendation:** Passive capture should be OPT-IN, not automatic. User explicitly clicks "Clip." The value is ONE-CLICK ease, not zero-click automation.
* **Concern:** V1 has no "why should I keep this installed" moment after initial use. Need a "aha" feature — maybe a weekly summary: "You applied to 12 jobs this week, 3 got responses."
* **Recommendation:** Add a simple "This Week" summary card in popup, even in V1.

### Tesla (Innovator) — Focus: Differentiation & Future

* **Concern:** The market says "no competitor" but the reality might be "no demand." Users may be happy with spreadsheets.
* **Idea:** What if V1 includes a SIMPLE differentiator — "Earnings Estimate." When user clips an Upwork job, show estimated annual income if hired: "$500 project × 2/month = $12,000/year." This makes the extension feel valuable immediately.
* **Idea:** Gamification — "Freelancer Score" based on activity. Users share scores, driving virality.
* **Recommendation:** Consider one "delight" feature in V1 that makes users screenshot and share.

### Hun (Devil's Advocate / Bad Sector Role) — Focus: What Could Kill This

* **KILL RISK #1:** Upwork adds Content-Security-Policy headers that block extension content scripts. This is trivially easy for them to do and would make the extension useless on Upwork overnight.
  * Mitigation: Check current CSP headers on Upwork. If already restrictive, this is a showstopper.
* **KILL RISK #2:** Chrome Web Store requires "single purpose" policy. If we track income AND clip jobs AND show analytics, CWS reviewer might reject as "multiple purposes."
  * Mitigation: V1 = ONE purpose: "Clip and organize freelance jobs." Everything else supports that one purpose.
* **KILL RISK #3:** The real competitor isn't another extension — it's "good enough" alternatives: bookmarks, Notion templates, free Notion/Sheets. Users won't install an extension if their current workaround is "good enough."
  * Mitigation: The ONE-CLICK clip is the moat. It must be demonstrably faster than any alternative.


---

## Blind Spots Identified


1. **Upwork CSP Headers** — We assumed DOM parsing is feasible but didn't verify if Content-Security-Policy blocks extension injection. MUST verify before building.
2. **Active vs Passive clip debate** — John raised a valid point: passive = noisy. Explicit clip = intentional. We positioned as "passive" but the UX is actually "one-click active." Reconcile this.
3. **V1 retention hook** — No "aha moment" after first week. Users install, clip 5 jobs, then... what? Need a reason to keep opening the popup.
4. **Revenue projections too optimistic** — $210K Year 3 assumes exponential growth with zero marketing. Should plan for conservative ($6K) and treat anything above as upside.


---

## Actionable Recommendations

| #   | Priority | Action | Owner | Status |
|-----|----------|--------|-------|--------|
| 1   | 🔴 BLOCKER | Verify Upwork/Fiverr CSP headers allow content script injection. Test with a minimal extension BEFORE building. | CTO   | ⏳ PENDING |
| 2   | 🔴 BLOCKER | Reconcile "passive capture" vs "explicit clip" positioning. The UX is one-click, not zero-click. Update messaging. | CTO + Sibung | ✅ RESOLVED — Active clip |
| 3   | 🟡 HIGH  | Add "This Week" summary card in V1 popup — gives users a reason to return. | V1 Build | ✅ ADDED to wireframe |
| 4   | 🟡 HIGH  | Add storage usage indicator (approaching 10MB limit). | V1 Build | ✅ ADDED to wireframe |
| 5   | 🟢 MEDIUM | Normalize budget format: parse into {min, max, rate_type, currency} fields. | V1 Build |        |
| 6   | 🟢 MEDIUM | Store truncated original HTML snippet for offline reference. | V1 Build |        |
| 7   | 🟢 LOW   | Consider "Earnings Estimate" delight feature for V1 (gamification/virality). | V1 Nice-to-have |        |
| 8   | 🟢 LOW   | Plan conservative revenue scenario as baseline. $6K Year 1 = success. | Sibung |        |


---

## Final Verdict

**BUILD IT.** The market gap is real, the technical approach is sound, and the V1 scope is tight enough to validate demand with minimal investment.

**But address the 2 blockers first:**


1. Verify CSP headers (30 minutes of work, could save 3 weeks of wasted effort)
2. Decide: passive (auto-clip everything) vs active (user clicks clip). Recommendation: **ACTIVE clip.** One-click is fast enough. Passive creates noise and privacy concerns.

**Confidence: 7/10** — Would be 9/10 if CSP verified and positioning reconciled.