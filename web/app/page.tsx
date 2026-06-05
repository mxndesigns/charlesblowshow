import { EmailSignup } from "@/components/email-signup";

/* Edit these as real channels go live. */
const SOCIALS = {
  youtube: "https://youtube.com/@charlesblowshow",
  instagram: "https://instagram.com/charlesblowshow",
  substack: "https://charlesblowshow.substack.com",
  linkedin: "https://www.linkedin.com/in/charlesmblow",
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Format />
        <Dispatch />
        <Follow />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

/* ------------------------------------------------------------------ */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-line/70 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight text-cream">
            The Charles Blow Show
          </span>
        </a>
        <a
          href="#join"
          className="rounded-lg border border-gold/50 px-4 py-2 text-sm font-semibold text-gold transition hover:bg-gold hover:text-ink"
        >
          Get the dispatch
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* warm radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 text-center sm:pt-28">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-soft px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted">
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-ember" />
          Launching soon — a new daily show
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-6xl">
          Race, politics &amp; power in America —{" "}
          <span className="text-gold">in conversation.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Charles Blow brings the smartest seat at the table to your day. Sharp
          analysis, deep conversations with the people shaping the news — and a
          calm, unflinching read on what it all means.
        </p>

        <div id="join" className="mx-auto mt-10 max-w-xl scroll-mt-24">
          <EmailSignup id="hero-signup" />
          <p className="mt-3 text-sm text-muted">
            Be first in line. Get the launch dispatch + a daily read straight to
            your inbox. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

function Format() {
  return (
    <section className="border-t border-ink-line/60 bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>The Format</SectionLabel>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
          Two daily segments, built around your day.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <FormatCard
            badge="☀️ Midday · Live"
            badgeClass="text-ember"
            title="Lunch Break Live"
            length="10 minutes"
            body="A tight, live segment with Charles Blow's immediate read on the day's biggest story — reaction in real time, with the audience in the room."
          />
          <FormatCard
            badge="🌙 Evening"
            badgeClass="text-gold"
            title="The Evening Show"
            length="20 minutes"
            body="A deeper conversation with a high-profile guest, going inside the issues driving the news cycle — the people and ideas behind the headlines."
          />
        </div>
        <p className="mt-8 max-w-2xl text-muted">
          We&apos;re starting lean and deliberate — then growing the audience and
          the team to raise production value and expand the slate over time.
        </p>
      </div>
    </section>
  );
}

function FormatCard({
  badge,
  badgeClass,
  title,
  length,
  body,
}: {
  badge: string;
  badgeClass: string;
  title: string;
  length: string;
  body: string;
}) {
  return (
    <div className="group rounded-2xl border border-ink-line bg-ink p-8 transition hover:border-gold/50">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold uppercase tracking-wide ${badgeClass}`}>
          {badge}
        </span>
        <span className="rounded-md border border-ink-line px-2.5 py-1 text-xs text-muted">
          {length}
        </span>
      </div>
      <h3 className="mt-5 font-serif text-2xl font-semibold text-cream">
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function Dispatch() {
  const items = [
    {
      title: "The daily read",
      body: "Charles's column-grade take, distilled — what happened, why it matters, and what to do with it.",
    },
    {
      title: "Conversations that go deep",
      body: "An incremental slate of guests across the political space — from in-the-arena voices to marquee names.",
    },
    {
      title: "Clips worth sharing",
      body: "The sharpest moments from each day, cut for the feed — so the smartest argument travels.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionLabel>What you&apos;ll get</SectionLabel>
      <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
        More than a show — a standing relationship.
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {items.map((it) => (
          <div key={it.title}>
            <div className="mb-4 h-px w-12 bg-gold" />
            <h3 className="font-serif text-xl font-semibold text-cream">
              {it.title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Follow() {
  const links = [
    { name: "YouTube", href: SOCIALS.youtube, handle: "The home of the show" },
    { name: "Instagram", href: SOCIALS.instagram, handle: "Daily clips & moments" },
    { name: "Substack", href: SOCIALS.substack, handle: "The column & newsletter" },
    { name: "LinkedIn", href: SOCIALS.linkedin, handle: "The conversation, for pros" },
  ];
  return (
    <section className="border-t border-ink-line/60 bg-ink-soft/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionLabel>Where to follow</SectionLabel>
        <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
          Meet us on your platform.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-ink-line bg-ink px-5 py-4 transition hover:border-gold/50 hover:bg-ink-soft"
            >
              <span>
                <span className="block font-semibold text-cream">{l.name}</span>
                <span className="block text-sm text-muted">{l.handle}</span>
              </span>
              <span aria-hidden className="text-gold">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
        Don&apos;t miss the first episode.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
        Join the list and you&apos;ll know the moment we go live — plus the daily
        dispatch from Charles, free.
      </p>
      <div className="mx-auto mt-8 max-w-xl">
        <EmailSignup id="footer-signup" />
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-ink-line/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p className="font-serif text-cream">The Charles Blow Show</p>
        <p>© {new Date().getFullYear()} The Charles Blow Show. All rights reserved.</p>
        <div className="flex gap-4">
          <a href={SOCIALS.youtube} className="hover:text-gold" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SOCIALS.instagram} className="hover:text-gold" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={SOCIALS.substack} className="hover:text-gold" target="_blank" rel="noopener noreferrer">
            Substack
          </a>
          <a href={SOCIALS.linkedin} className="hover:text-gold" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
      {children}
    </span>
  );
}
