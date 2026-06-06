import { EmailSignup } from "@/components/email-signup";
import { Logo, Monogram } from "@/components/logo";

/* Edit these as real channels go live. */
const SOCIALS = {
  youtube: "https://youtube.com/@charlesblowshow",
  instagram: "https://instagram.com/charlesblowshow",
  substack: "https://charlesblowshow.substack.com",
  linkedin: "https://www.linkedin.com/in/charlesmblow",
};

const NAV = [
  { label: "The Show", href: "#format" },
  { label: "What You Get", href: "#features" },
  { label: "Follow", href: "#follow" },
  { label: "Newsletter", href: "#join" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Format />
        <Features />
        <Follow />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

/* ────────────────────────── Header ────────────────────────── */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <a href="#top" aria-label="The Charles Blow Show — home">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-ink/70 transition hover:text-azure"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#join"
          className="group inline-flex items-center gap-2 rounded-lg bg-ink py-2 pl-4 pr-2 text-sm font-semibold text-paper transition hover:bg-ink-soft"
        >
          Subscribe
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-azure text-white transition-transform group-hover:translate-x-0.5">
            ↗
          </span>
        </a>
      </div>
    </header>
  );
}

/* ────────────────────────── Hero ────────────────────────── */

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-8 pb-14 sm:pt-10">
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* Featured hero card */}
        <div className="media-azure-soft relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-8 sm:p-10">
            <Eyebrow className="text-paper/85">Launching Soon · A Daily Show</Eyebrow>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-paper sm:text-5xl">
              Race, politics &amp; power in America — in conversation.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
              Charles Blow brings the smartest seat at the table to your day —
              sharp analysis and deep conversations with the people shaping the
              news.
            </p>
            <div className="mt-7 max-w-lg">
              <EmailSignup id="hero-signup" variant="dark" />
              <p className="mt-2.5 text-sm text-paper/70">
                Be first in line for launch + the daily dispatch. No spam.
              </p>
            </div>
          </div>
        </div>

        {/* Right rail — "On the show" */}
        <aside className="flex flex-col rounded-2xl border border-line bg-surface p-6">
          <SmallHeading>On the show</SmallHeading>
          <div className="mt-4 flex flex-col divide-y divide-line">
            <RailItem
              eyebrow="Daily · Live · 10 min"
              eyebrowClass="text-azure"
              title="Lunch Break Live"
              meta="Charles Blow · Midday"
            />
            <RailItem
              eyebrow="Daily · 20 min"
              title="The Evening Show"
              meta="With high-profile guests"
            />
            <RailItem
              eyebrow="Weekly"
              title="The Column & Newsletter"
              meta="The week, in his words"
            />
            <RailItem
              eyebrow="Monthly"
              title="The Big Interview"
              meta="A marquee conversation"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

function RailItem({
  eyebrow,
  eyebrowClass = "text-muted",
  title,
  meta,
}: {
  eyebrow: string;
  eyebrowClass?: string;
  title: string;
  meta: string;
}) {
  return (
    <a href="#format" className="group block py-4 first:pt-0 last:pb-0">
      <Eyebrow className={eyebrowClass}>{eyebrow}</Eyebrow>
      <h3 className="mt-1.5 font-serif text-lg font-semibold leading-snug text-ink transition group-hover:text-azure">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted">{meta}</p>
    </a>
  );
}

/* ────────────────────────── The Format ────────────────────────── */

function Format() {
  return (
    <section id="format" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading kicker="The Format">the format.</SectionHeading>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Two daily segments, built around your day. Starting lean and
          deliberate — then growing to raise production value and expand the
          slate over time.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <FormatCard
            media="media-azure"
            badge="☀️ Midday · Live"
            badgeClass="text-azure"
            length="10 min"
            title="Lunch Break Live"
            body="A tight, live segment with Charles Blow's immediate read on the day's biggest story — reaction in real time, with the audience in the room."
          />
          <FormatCard
            media="media-ink"
            badge="🌙 Evening"
            badgeClass="text-ink"
            length="20 min"
            title="The Evening Show"
            body="A deeper conversation with a high-profile guest, going inside the issues driving the news cycle — the people and ideas behind the headlines."
          />
        </div>
      </div>
    </section>
  );
}

function FormatCard({
  media,
  badge,
  badgeClass,
  length,
  title,
  body,
}: {
  media: string;
  badge: string;
  badgeClass: string;
  length: string;
  title: string;
  body: string;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-azure/60">
      <div className={`relative h-44 ${media}`}>
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
          {length}
        </span>
      </div>
      <div className="p-6">
        <span className={`text-xs font-semibold uppercase tracking-wide ${badgeClass}`}>
          {badge}
        </span>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-2 leading-relaxed text-muted">{body}</p>
      </div>
    </article>
  );
}

/* ────────────────────────── What you'll get ────────────────────────── */

function Features() {
  const items = [
    {
      eyebrow: "Every day",
      title: "The daily read",
      body: "Charles's column-grade take, distilled — what happened, why it matters, and what to do with it.",
    },
    {
      eyebrow: "The guests",
      title: "Conversations that go deep",
      body: "An incremental slate of voices across the political space — from in-the-arena practitioners to marquee names.",
    },
    {
      eyebrow: "On the feed",
      title: "Clips worth sharing",
      body: "The sharpest moments from each day, cut for the feed — so the smartest argument in the room travels.",
    },
  ];
  return (
    <section id="features" className="border-t border-line bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading kicker="What You Get">more than a show.</SectionHeading>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          A standing relationship — not just another video in the feed.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="border-t-2 border-azure pt-5">
              <Eyebrow className="text-muted">{it.eyebrow}</Eyebrow>
              <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
                {it.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── Follow ────────────────────────── */

function Follow() {
  const links = [
    { name: "YouTube", href: SOCIALS.youtube, handle: "The home of the show" },
    { name: "Instagram", href: SOCIALS.instagram, handle: "Daily clips & moments" },
    { name: "Substack", href: SOCIALS.substack, handle: "The column & newsletter" },
    { name: "LinkedIn", href: SOCIALS.linkedin, handle: "The conversation, for pros" },
  ];
  return (
    <section id="follow" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading kicker="Where to Follow">meet us on your platform.</SectionHeading>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-4 transition hover:border-azure/60 hover:bg-azure-tint/40"
            >
              <span>
                <span className="block font-semibold text-ink">{l.name}</span>
                <span className="block text-sm text-muted">{l.handle}</span>
              </span>
              <span aria-hidden className="text-azure transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── Final CTA ────────────────────────── */

function FinalCta() {
  return (
    <section id="join" className="bg-ink scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Eyebrow className="text-azure">Don&apos;t miss the first episode</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Join the list. Know the moment we go live.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-paper/70">
          Plus the daily dispatch from Charles — free, straight to your inbox.
        </p>
        <div className="mx-auto mt-8 max-w-xl text-left">
          <EmailSignup id="footer-signup" variant="dark" />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── Footer ────────────────────────── */

function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-8 text-sm text-muted sm:flex-row">
        <span className="flex items-center gap-2.5">
          <Monogram size={26} />
          <span className="font-serif font-semibold text-ink">
            The Charles Blow Show
          </span>
        </span>
        <p>© {new Date().getFullYear()} The Charles Blow Show. All rights reserved.</p>
        <div className="flex gap-4">
          {Object.entries(SOCIALS).map(([name, href]) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="capitalize transition hover:text-azure"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ────────────────────────── Shared bits ────────────────────────── */

function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${className}`}>
      {children}
    </span>
  );
}

function SmallHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
      {children}
    </span>
  );
}

function SectionHeading({
  kicker,
  children,
}: {
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <Eyebrow className="text-azure">{kicker}</Eyebrow>
        <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {children}
        </h2>
      </div>
      <div className="hidden gap-2 sm:flex" aria-hidden>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink/50">
          ←
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink/50">
          →
        </span>
      </div>
    </div>
  );
}
