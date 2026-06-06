# The Charles Blow Show — CMS Dashboard Build Plan

*A plan to turn this project folder into a single internal console for viewing, managing, and forecasting every part of the show.*

**Status:** planning draft · **Stack target:** the Next.js app already in this repo · **Scope:** internal/admin dashboard (not the public marketing site)

---

## 1. What this dashboard is (and isn't)

The folder today is a pile of finished deliverables — playbooks, emails, social art, press docs, a revenue model — plus a half-started Next.js app and a static `index.html` that only lists the email mockups. The goal is a **command center**: one logged-in app where you open any asset, watch your audience across platforms, and see what that audience is projected to earn.

Two things this is *not*, and it's worth being clear up front:

- **It is not the public site** (`charlesblowshow.com`). That's specced separately in `04-website-spec.md`. This dashboard is the back-of-house console — think "the room you run the show from." They can live in the same Next.js project under a protected `/dashboard` route group, sharing brand tokens and components.
- **It is not a document editor.** It *surfaces* and *renders* your existing files (HTML emails, PDFs, the playbooks, the spreadsheet model). Editing source docs stays in their native tools; the dashboard is the viewing/operating layer. (A later phase can add a real headless CMS — Sanity/Contentful — for episode and guest content, which `04` already recommends.)

---

## 2. Recommended architecture

Build on what's here. The repo is **Next.js 16 (App Router), React 19, Tailwind 4, TypeScript** — exactly the stack `04-website-spec.md` prescribes. Don't restart it.

```
web/
├── app/
│   ├── (public)/                 # marketing site — the website-spec pages, later
│   └── dashboard/                # ← THE CMS, protected by auth
│       ├── layout.tsx            # sidebar nav + brand chrome
│       ├── page.tsx              # Overview (playbooks, subscribers, projected revenue)
│       ├── revenue/page.tsx      # the 4 revenue legs + 100k forecast
│       ├── emails/page.tsx       # 9 email templates, rendered inline
│       ├── social/page.tsx       # posts / stories / video templates
│       ├── brand/page.tsx        # brand + partnership documents (combined)
│       └── press/page.tsx        # press kit + outreach playbook
├── lib/
│   ├── content/registry.ts       # one typed manifest of every asset (see §6)
│   ├── integrations/             # YouTube / IG / Substack / LinkedIn adapters
│   └── revenue/model.ts          # the xlsx logic ported to TypeScript (see §5)
├── components/                   # reuse logo.tsx, email-signup.tsx, add cards/charts
└── content/                      # copies of playbooks/emails as servable assets
```

**Auth:** a single password / one-seat login is enough for v1 (this is your console). Next.js middleware on the `/dashboard` group + an environment-stored credential, or Auth.js if you want real sessions. Don't over-build this.

**Rendering strategy by file type** — this matters because half your assets are binary documents:

| Source type | Files | How the dashboard shows it |
|---|---|---|
| HTML | the 9 emails, the 2 playbooks | `<iframe srcDoc>` (sandboxed) or copy into `/content` and embed — already web-native, zero conversion |
| PNG | social posts/stories/video previews | `next/image` cards in a gallery grid |
| PDF | brand guidelines, one-pager, press kit, 10 strategy docs | embed with `<iframe>` / a PDF.js viewer, plus a download link |
| DOCX | press kit, outreach playbook | **convert once to HTML/MDX** at build time (e.g. `mammoth`) so it renders inline; keep the .docx as a download |
| XLSX | revenue model v1 | **don't render the file** — port its logic to `lib/revenue/model.ts` and drive live charts (see §5) |

---

## 3. Information architecture (mirrors your spec exactly)

```
DASHBOARD (Overview)
├── The Evening Show — Playbook            → render The-Evening-Show-Playbook.html
├── Lunch Break Live — Playbook            → render Lunch-Break-Live-Playbook.html
├── Subscribers across all platforms       → live integrations (YouTube/IG/Substack/LinkedIn)
└── Projected revenue                      → revenue engine, fed by the live subscriber total

BRAND / MARKETING
├── Pricing → Revenue
│   ├── Audience          (the funnel: views → email → paid)
│   ├── Membership        (Free / Member $7 / Founding $150 — from monetization SoT)
│   ├── Sponsorships      (host-read CPM rate card — internal only)
│   ├── Platform / Ad     (YouTube RPM, podcast dynamic ads)
│   └── Overall forecast @ 100,000 subscribers
├── Emails (9 templates)                   01-welcome … 09-winback
├── Social Media
│   ├── Post templates    (5 PNGs)
│   ├── Story templates   (4 PNGs)
│   └── Video templates   (lower-third + endcard)
├── Brand & Partnership documents (combined)
└── Press overview        (press kit + outreach playbook)
```

---

## 4. Page-by-page plan

### Overview (the landing screen)
Four zones, top to bottom:
1. **Two playbook cards** — Evening Show and Lunch Break Live, each opening the rendered HTML in a reader view.
2. **Subscriber tiles** — one per platform (YouTube, Instagram, Substack, LinkedIn) showing current count, 7-day delta, and a sparkline; plus a combined total. Pulled live where the API allows, cached otherwise (see §5).
3. **Projected revenue headline** — a single big number (blended monthly / ARR) computed from the *current* combined subscriber count run through the revenue engine, so the forecast moves as your audience grows.
4. **Quick links** into the Brand/Marketing sections.

### Revenue (the most valuable screen)
This is where the `v1` spreadsheet comes alive. Four leg-panels plus a forecast:
- **Audience** — the funnel inputs (views/sub, view→email %, email→paid %, churn) shown as editable controls, mirroring the xlsx Assumptions sheet.
- **Membership** — the three tiers and the Member-vs-Founding / monthly-vs-annual mix; outputs members, MRR, ARR.
- **Sponsorships** — episodes/mo × reads × CPM × sell-through (internal rate card — flag it "do not publish").
- **Platform / Ad** — RPM × monetized views.
- **Overall forecast @ 100,000 subscribers** — a scenario toggle that pins subscribers to 100k and shows blended revenue split across the three legs. *(Note: the shipped model targets 10k at month 12; 100k is an extrapolation beyond it — worth labeling as a stretch scenario, not the base plan.)*

### Emails
A gallery of the 9 templates using the PNG previews as thumbnails (you already have these), each opening the live HTML email in a sandboxed iframe with a "copy HTML" action. This is your existing `index.html`, rebuilt properly inside the dashboard.

### Social Media
Three tabs — Posts (5), Stories (4), Video (lower-third + endcard) — as image galleries. Because `build_social.py` and `build_video.py` generate these, a later phase can add a "regenerate" button that re-runs those scripts with new copy.

### Brand & Partnership documents (combined)
Your spec says "combine the documents in Partnership-Brand-Documents." I don't see a folder by that exact name in the repo — so this page combines the brand/partnership collateral that *is* here into one view: **Brand Guidelines PDF**, **Brand One-Pager PDF**, and the **10-brand-guidelines.md** (the live token reference). If there's a separate partnership-docs folder elsewhere, point me to it and I'll fold it in.

### Press overview
Two documents, rendered inline with download links: **Press Kit** (`CharlesBlowShow_Press_Kit_v1` — both .docx and .pdf exist) and the **Guest & Audience Outreach Playbook** (.docx). The press kit's .pdf can embed directly; the outreach .docx converts to HTML for inline reading.

---

## 5. The two genuinely hard parts (and how to handle them)

### Platform integrations — the real engineering
"Subscribers across all platforms based on integrations" is the only part that isn't just rendering files. Each platform is different:

| Platform | Feasibility | Notes |
|---|---|---|
| **YouTube** | Clean — YouTube Data API v3 (`channels.list` → `statistics.subscriberCount`). Needs a Google API key. | Easiest win; do first. |
| **Instagram** | Possible but heavier — Instagram Graph API requires a Business/Creator account, a linked Facebook Page, and an app review/OAuth. | Plan for follower count, not deep metrics. |
| **Substack** | No official public API. Subscriber count isn't exposed cleanly; public RSS gives posts, not subscriber totals. | Likely a **manual-entry field** you update, or a fragile scrape. Be realistic here. |
| **LinkedIn** | Restricted — follower stats need a Company Page + LinkedIn Marketing API approval. | Treat as manual or phase-3. |

**Recommended approach:** build an `integrations/` adapter layer with a uniform shape (`{ platform, subscribers, fetchedAt, source: 'live' | 'manual' }`). Ship **manual entry first** so every tile works on day one, then wire real APIs platform-by-platform starting with YouTube. Cache results (revalidate hourly) so you're not hammering APIs or blocking page loads. Never put API keys in client code — fetch in server components / route handlers.

### The revenue engine — port, don't embed
`CharlesBlowShow_Revenue_Model_v1.xlsx` is already a clean Assumptions → Projection → Summary model with exactly the four legs you want. Rather than rendering a spreadsheet in the browser, **re-implement its formulas in `lib/revenue/model.ts`** as a pure function: `forecast(assumptions, subscriberCount) → { members, MRR, ARR, sponsorship, platform, blended, split }`. Then the live subscriber total from §5 feeds it, and the 100k scenario is just calling that function with `subscribers = 100_000`. This is a few hours of work and makes the whole dashboard reactive.

> ⚠️ **Exclude `CharlesBlowShow_Revenue_Model_Global_v2.xlsx`.** Despite the filename, its contents are the *Gelatin* global model (flat-$7 booking fees, multi-market rollout, Atlanta) — a different business that this project was templated from. It is not Charles Blow Show data. Use `v1` only.

---

## 6. Data model — one content registry

The cleanest way to keep this maintainable is a single typed manifest so pages are data-driven, not hardcoded:

```typescript
// lib/content/registry.ts
export const emails = [
  { id: '01-welcome', title: 'Welcome — here's what to expect',
    html: '/content/emails/01-welcome.html', preview: '/content/emails/previews/01-welcome.png' },
  // … 02 through 09
];

export const social = {
  posts:   [ /* post1launch … post5follow */ ],
  stories: [ /* story1launch … story4live */ ],
  video:   [ /* lower-third, endcard */ ],
};

export const documents = {
  playbooks: [ 'The-Evening-Show', 'Lunch-Break-Live' ],
  brand:     [ 'Brand_Guidelines_v1.pdf', 'Brand_OnePager_v1.pdf', '10-brand-guidelines.md' ],
  press:     [ 'Press_Kit_v1', 'Guest_and_Audience_Outreach_Playbook' ],
};
```

Drop the asset files into `web/public/content/` (or `app/content/`) so Next can serve them. Add new assets by editing the manifest — no page changes needed.

---

## 7. Phased roadmap

**Phase 0 — Shell (½–1 day).** Protected `/dashboard` route group, sidebar nav matching the IA in §3, brand chrome (reuse `logo.tsx`, brand tokens). Empty pages that route correctly.

**Phase 1 — Render everything that's already web-ready (1–2 days).** Emails gallery (rebuild `index.html` properly), social galleries, both playbooks. This alone replaces the current static page and gives you a real console. No APIs, no conversions — pure wins.

**Phase 2 — Documents + revenue engine (2–3 days).** PDF embedding for brand/press; `mammoth` DOCX→HTML for the two Word docs; port `v1` xlsx to `lib/revenue/model.ts`; build the Revenue page with the four legs and the 100k scenario toggle (driven by manual subscriber numbers at first).

**Phase 3 — Live integrations (scoped, 2–5 days depending on platform approvals).** YouTube API first (quick), then Instagram (needs Business account + app review), with Substack/LinkedIn as manual-entry until/unless their access clears. Wire the live total into the Overview tiles and the revenue forecast.

**Later — Editing layer.** If you want to *change* content from the dashboard (not just view it), that's where Sanity/Contentful for episodes+guests and a "regenerate social/video" button (re-running `build_social.py` / `build_video.py`) come in.

---

## 8. Decisions I need from you

1. **Auth scope** — just you (simple password), or a small team with real accounts?
2. **Integration priority** — do you already have a YouTube/Google API key and an Instagram Business account? That determines how fast the subscriber tiles go live vs. start as manual entry.
3. **The "Partnership-Brand-Documents" folder** — I treated it as the brand-guidelines + one-pager set (the only matching files here). If there's a separate folder, point me to it.
4. **100k forecast framing** — show it as an explicit "stretch scenario" alongside the 10k base plan, or as the headline number? (I'd recommend the former, for honesty in any pitch.)
5. **Build now, or refine the plan first?** I can start scaffolding Phase 0 + Phase 1 immediately on this stack.

---

## 9. Complete file → dashboard mapping

| Dashboard location | Source file(s) | Treatment |
|---|---|---|
| Overview · playbook | `The-Evening-Show-Playbook.html` | Render inline |
| Overview · playbook | `Lunch-Break-Live-Playbook.html` | Render inline |
| Overview · subscribers | (live integrations) | API + manual fallback |
| Overview · projected revenue | `..._Revenue_Model_v1.xlsx` (logic) | Ported to TS engine |
| Revenue · all legs | `..._Monetization_SourceOfTruth.md`, `v1.xlsx` | Pricing + ported model |
| Emails | `01-welcome.html` … `09-winback.html` + `*.png` previews | Gallery + iframe |
| Social · posts | `post1launch.png` … `post5follow.png` | Image gallery |
| Social · stories | `story1launch.png` … `story4live.png` | Image gallery |
| Social · video | `preview_lowerthird.png`, `preview_endcard.png` | Image gallery |
| Brand & Partnership | `Brand_Guidelines_v1.pdf`, `Brand_OnePager_v1.pdf`, `10-brand-guidelines.md` | PDF embed + MD render |
| Press overview | `Press_Kit_v1.pdf/.docx`, `Guest_and_Audience_Outreach_Playbook.docx` | PDF embed + DOCX→HTML |
| — (excluded) | `..._Revenue_Model_Global_v2.xlsx` | Legacy Gelatin data — do not use |
| (reference, not a page) | `01`–`10` strategy `.md`/`.pdf` docs | Optional "Strategy library" tab later |
