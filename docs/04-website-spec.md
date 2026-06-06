# 04 — Website Spec: www.charlesblowshow.com

*The hub. Everything in [03](./03-platform-strategy.md) points here. The site exists to do three things: **showcase the show, capture the email, sell the membership.** Everything else is secondary.*

---

## 1. Goals & non-goals

**Goals**
1. Convert visitors into **email subscribers** (primary CTA on every page).
2. Make the show feel like *appointment programming* — surface daily/weekly/monthly features clearly.
3. Be the canonical, SEO-strong archive of every episode, column, and clip.
4. Sell and manage **membership**.

**Non-goals (v1):** native video hosting (embed YouTube), building our own forum (use Substack/community tooling first), a custom mobile app.

---

## 2. Information architecture / sitemap

```
/                       Home — hero, what's new, the pitch, email capture
/watch                  Episode library (all "Conversation" episodes, filterable)
  /watch/[slug]         Episode page — embed, show notes, guest bio, companion column, clips, transcript
/read                   Articles & columns (Substack-fed or native)
  /read/[slug]          Article page
/segments               The franchises — The Throughline, Big Interview, Roundtable, etc.
  /segments/[name]      All content in that segment
/guests                 Guest directory (who's been on; who's coming)
  /guests/[name]        Guest profile + their episodes
/schedule               The programming grid — daily / weekly / monthly features
/listen                 Podcast hub (audio feed + platform links)
/join                   Membership — tiers, benefits, checkout
/live                   Upcoming live events / town halls / tickets
/about                  Charles Blow bio, the show's mission, press
/contact                Booking, press, sponsorship inquiries
/newsletter             Dedicated email-capture landing page (for ad campaigns)
```

---

## 3. Page-by-page features

### Home `/`
- **Hero:** latest flagship episode (auto-pulled), bold tagline, primary **"Subscribe free"** CTA.
- **"This week" strip:** the current week's column, episode, and top clip.
- **Programming preview:** Daily / Weekly / Monthly tiles (links to `/schedule`).
- **Featured guests** carousel + **"Coming up"** teaser (the roadmap, see [05](./05-guest-roadmap.md)).
- **Social proof:** subscriber count, press logos, notable guest names.
- **Email capture** repeated mid-page and in footer.

### Episode page `/watch/[slug]`
- YouTube embed + audio player.
- Guest bio + links; **chaptered segments** ("jump to The Throughline").
- **Companion column** inline or linked.
- Auto-embedded **clips** from that episode.
- **Transcript** (SEO + accessibility + AI-search visibility).
- "What Now?" action box. Related episodes. **Subscribe CTA.**

### Schedule `/schedule` — *the engagement showcase*
Visually communicates that this is a *programmed daily show*, not random uploads:
- **Daily (the spine):** ☀️ **Lunch Break Live** (10 min, with live day/time badge + "set reminder") and 🌙 **The Evening Show** (20 min, guest); plus The Daily Read and Quote of the Day.
- **Weekly:** Friday Mailbag, the Column, the Newsletter, best-of reel.
- **Monthly:** Big Interview, State of the Unions, Town Hall, Roundtable, Reading List.
- "Add to calendar" + "Get reminders" + "Notify me when Lunch Break Live starts" (→ email capture).

### Join `/join` — *the revenue page*
- Tier comparison (Free / Member / Founding).
- Benefit-led copy, testimonials, FAQ, secure checkout.
- Annual toggle (discount), gift-membership option.

---

## 4. Cross-cutting engagement features

- **Sticky email-capture bar** + exit-intent modal (used judiciously).
- **Member login / gated content** for paid posts, ad-free audio, town-hall RSVP.
- **Search** across episodes, columns, guests, transcripts.
- **Comments / community** (Substack-embedded v1; native later).
- **Share + clip** buttons everywhere.
- **Polls / "your take"** prompts feeding future Mailbag segments.
- **Accessibility:** captions, transcripts, semantic markup, WCAG-AA color contrast.
- **Analytics:** event tracking on every CTA to measure the funnel.

---

## 5. Recommended tech stack

Greenfield, fast to ship, scales with the audience. Optimized for SEO, performance, and a small team.

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | **Next.js 16 (App Router)** on **Vercel** | SSR/ISR for SEO + speed; great DX; scales to zero cost early |
| **Styling/UI** | **Tailwind v4** with brand design tokens (Newsreader + Inter; ink/paper/ember) | Cohesive editorial system per [10-brand-guidelines.md](./10-brand-guidelines.md); add a component library if/when complexity grows |
| **Content/CMS** | **Sanity** or **Contentful** (headless) for episodes/guests; **Substack** as source for columns (RSS/API) | Editors update without code; reuse Substack writing |
| **Email/membership** | **Substack** v1 (fastest), migrate to **Beehiiv/Ghost + Stripe** if more control needed | Don't rebuild what Substack gives free on day one |
| **Video/audio** | YouTube embeds; podcast via Transistor/Captivate RSS | No video-hosting cost; distribution built in |
| **Search** | Algolia or built-in + transcripts | Findable archive |
| **Analytics** | Vercel Analytics + GA4 + (optional) PostHog for funnels | Measure the email funnel end-to-end |
| **Forms/automation** | Resend or Substack embeds; Zapier for glue | Wire signups → CRM → welcome flow |

> **Build-vs-buy principle for v1:** lean on Substack for list+payments to launch in weeks, not months. Migrate to owned billing (Stripe/Ghost) once paid members justify the control. Don't let infrastructure delay launch.

---

## 6. Build plan (phased)

**Phase 0 — Landing page (Week 1–2):** single page: the pitch + email capture + social links. Goes live *immediately* to start building the list before the show launches.

**Phase 1 — MVP site (Week 3–6):** Home, `/watch` + episode pages, `/read`, `/about`, `/join`, `/schedule`, newsletter capture. Substack-powered list & payments.

**Phase 2 — Engagement layer (Month 2–3):** guest directory, segment pages, search, transcripts, member gating, podcast hub.

**Phase 3 — Scale (Month 4+):** native community, owned billing migration, live-event ticketing, personalization ("continue watching," recommended), data dashboard.

---

## 7. Success metrics for the site

- **Visitor → email conversion rate** (target 3–5%+ on content pages, higher on `/newsletter`).
- **Free → paid conversion** on `/join`.
- Organic search traffic to episode/transcript pages.
- Returning-visitor rate (appointment behavior).
- Avg. pages/session (depth of engagement).
