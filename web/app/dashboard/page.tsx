import type { Metadata } from "next";
import Link from "next/link";
import { getSubscriberCounts, totalSubscribers } from "@/lib/integrations";
import { forecastAtScale, DEFAULT_ASSUMPTIONS } from "@/lib/revenue/model";
import { segments } from "@/lib/content/registry";
import {
  formatCurrencyCompact,
  formatNumber,
  formatRelativeTime,
} from "@/lib/format";
import { PageHeader, SectionHeading, Badge } from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Overview" };

export const revalidate = 3600;

const QUICK_LINKS = [
  { href: "/dashboard/revenue", label: "Revenue", note: "The model, live" },
  { href: "/dashboard/emails", label: "Emails", note: "9 templates" },
  { href: "/dashboard/social", label: "Social", note: "Posts · stories · video" },
  { href: "/dashboard/brand", label: "Brand", note: "Guidelines & one-pager" },
  { href: "/dashboard/press", label: "Press", note: "Kit & outreach" },
];

export default async function OverviewPage() {
  const counts = await getSubscriberCounts();
  const total = totalSubscribers(counts);
  const forecast = forecastAtScale(DEFAULT_ASSUMPTIONS, total);
  const anyLive = counts.some((c) => c.source === "live");

  return (
    <div className="space-y-12">
      <PageHeader
        kicker="Internal Console"
        title="Overview"
        description="The room you run the show from — every asset, your audience across platforms, and what that audience is projected to earn."
      />

      {/* Projected revenue headline */}
      <section className="overflow-hidden rounded-2xl border border-azure/30 bg-gradient-to-br from-azure-tint/70 to-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-azure-dark">
              Projected blended revenue
            </p>
            <p className="mt-2 font-serif text-5xl font-semibold tracking-tight text-ink">
              {formatCurrencyCompact(forecast.blended)}
              <span className="text-2xl font-normal text-muted">/mo</span>
            </p>
            <p className="mt-2 text-muted">
              At {formatNumber(total)} combined subscribers ·{" "}
              {formatCurrencyCompact(forecast.arr)} ARR from membership
            </p>
          </div>
          <Link
            href="/dashboard/revenue"
            className="rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink-soft"
          >
            Open revenue model →
          </Link>
        </div>
        {total === 0 && (
          <p className="mt-4 text-sm text-muted">
            Add subscriber counts (live API or manual) to see this number move.
          </p>
        )}
      </section>

      {/* Subscriber tiles */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <SectionHeading>Subscribers across platforms</SectionHeading>
          <Badge tone={anyLive ? "live" : "neutral"}>
            {anyLive ? "Live + manual" : "Manual entry"}
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {counts.map((c) => (
            <a
              key={c.platform}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-line bg-surface p-5 transition hover:border-azure/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">{c.label}</span>
                <Badge tone={c.source === "live" ? "live" : "neutral"}>
                  {c.source}
                </Badge>
              </div>
              <p className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink">
                {c.subscribers != null ? formatNumber(c.subscribers) : "—"}
              </p>
              <p className="mt-1 text-xs text-muted">
                {c.subscribers != null
                  ? `updated ${formatRelativeTime(c.fetchedAt)}`
                  : c.note ?? "not yet tracked"}
              </p>
            </a>
          ))}
        </div>
        <div className="rounded-2xl border border-ink bg-ink p-5 text-paper">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-paper/80">
              Combined audience
            </span>
            <span className="text-xs text-paper/50">
              feeds the revenue forecast
            </span>
          </div>
          <p className="mt-2 font-serif text-4xl font-semibold tracking-tight text-paper">
            {formatNumber(total)}
          </p>
        </div>
      </section>

      {/* Segments */}
      <section className="space-y-4">
        <SectionHeading>Show segments</SectionHeading>
        <div className="grid gap-5 md:grid-cols-2">
          {segments.map((s) => (
            <Link
              key={s.id}
              href={`/dashboard/segments/${s.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition hover:border-azure/60 hover:shadow-sm"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-azure">
                  {s.emoji} {s.slot}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-ink transition group-hover:text-azure">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{s.tagline}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-azure">
                Open the segment
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="space-y-4">
        <SectionHeading>Jump to</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group rounded-xl border border-line bg-surface px-4 py-3 transition hover:border-azure/60 hover:bg-azure-tint/40"
            >
              <span className="block font-semibold text-ink transition group-hover:text-azure">
                {q.label}
              </span>
              <span className="block text-xs text-muted">{q.note}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
