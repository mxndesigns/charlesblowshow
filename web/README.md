# charlesblowshow.com — Landing Page

Phase 0 of the [website spec](../docs/04-website-spec.md): a single landing page whose job is to **capture emails before launch**. Next.js 16 (App Router) + Tailwind v4.

## What's here

- **`app/page.tsx`** — the landing page: hero + email capture, the two-segment format (Lunch Break Live / The Evening Show), what subscribers get, social links, final CTA, footer.
- **`components/email-signup.tsx`** — accessible client-side signup form (loading / success / error states).
- **`app/api/subscribe/route.ts`** — email capture endpoint. Validates, then adds to a Resend audience if configured; otherwise logs the signup so the form works during soft-launch.
- **`app/layout.tsx` / `app/globals.css`** — brand system: Fraunces (serif display) + Inter, the ink/cream/gold editorial palette, SEO + Open Graph metadata.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Connect the email list

The form works without any keys (signups are logged). Before going public, wire a real provider:

1. Copy `.env.example` → `.env.local`.
2. Create a [Resend](https://resend.com) API key + an Audience; set `RESEND_API_KEY` and `RESEND_AUDIENCE_ID`.
3. New signups now land in that audience. (To use Substack/Beehiiv instead, swap the fetch call in `app/api/subscribe/route.ts`.)

## Deploy (Vercel)

```bash
vercel            # preview
vercel --prod     # production, then point www.charlesblowshow.com at it
```

Set the same env vars in the Vercel project. The page is statically prerendered; `/api/subscribe` runs as a function.

## Editing channels

Social URLs live in the `SOCIALS` constant at the top of `app/page.tsx` — update them as real handles go live.

## Next (per the spec)

This is Phase 0. Phase 1 adds `/watch`, `/read`, `/join`, `/schedule` — see [docs/04-website-spec.md](../docs/04-website-spec.md).
