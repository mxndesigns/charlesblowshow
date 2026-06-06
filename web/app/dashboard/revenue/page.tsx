import type { Metadata } from "next";
import { getSubscriberCounts, totalSubscribers } from "@/lib/integrations";
import { project } from "@/lib/revenue/model";
import { formatCurrency, formatCurrencyCompact, formatNumber, formatPercent } from "@/lib/format";
import { PageHeader, SectionHeading, Badge } from "@/components/dashboard/ui";
import { BarChart } from "@/components/dashboard/charts";
import { RevenueScenario } from "@/components/dashboard/revenue-scenario";

export const metadata: Metadata = { title: "Revenue" };

// Subscriber counts may hit live APIs; revalidate hourly.
export const revalidate = 3600;

const MEMBERSHIP_TIERS = [
  { tier: "Free", price: "$0", note: "Every episode + free weekly dispatch. The news is never paywalled." },
  { tier: "Member", price: "$7/mo · $70/yr", note: "Ad-free early audio, daily dispatch, full archive, members' Q&A." },
  { tier: "Founding", price: "$150/yr", note: "Everything in Member + credits, quarterly live call, founding badge. Limited cohort." },
];

const RATE_CARD = [
  { item: "Host-read pre-roll", rate: "$30 CPM", note: "15–20s, top of episode" },
  { item: "Host-read mid-roll", rate: "$25 CPM", note: "30–45s, integrated" },
  { item: "Newsletter placement", rate: "$40 CPM", note: "one slot per send (on opens)" },
];

export default async function RevenuePage() {
  const counts = await getSubscriberCounts();
  const live = totalSubscribers(counts);
  const { months, summary } = project();

  return (
    <div className="space-y-12">
      <PageHeader
        kicker="Brand / Marketing"
        title="Revenue"
        description="The v1 model, live. Pick a subscriber scenario, drag the funnel assumptions, and watch the three legs recompute."
      />

      {/* Interactive scenario engine */}
      <RevenueScenario liveSubscribers={live} />

      {/* 12-month base projection (the shipped model to 10k) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <SectionHeading>12-month base plan</SectionHeading>
            <p className="mt-1 text-sm text-muted">
              The shipped v1 model: subscribers ramp{" "}
              {formatNumber(months[0].subscribers)} → {formatNumber(summary.subscribers)} over year one.
            </p>
          </div>
          <Badge tone="neutral">Base · not the 100k stretch</Badge>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted">Blended monthly revenue</span>
            <span className="text-sm text-muted">
              M12: <span className="font-semibold text-ink">{formatCurrency(months[11].blended)}</span>/mo
            </span>
          </div>
          <div className="mt-4 text-azure">
            <BarChart data={months.map((m) => ({ label: `M${m.month}`, value: m.blended }))} />
          </div>
        </div>

        {/* Year-1 summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryStat label="Year-1 revenue" value={formatCurrencyCompact(summary.year1.total)} sub="all legs" />
          <SummaryStat label="Members @ M12" value={formatNumber(summary.members)} sub={`${formatNumber(summary.memberTier)} / ${formatNumber(summary.foundingTier)}`} />
          <SummaryStat label="MRR @ M12" value={formatCurrencyCompact(summary.mrr)} sub={`ARR ${formatCurrencyCompact(summary.arr)}`} />
          <SummaryStat label="Email list @ M12" value={formatNumber(summary.emailList)} sub="cumulative" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <LegSummary label="Membership" value={summary.year1.membership} share={summary.split.membership} />
          <LegSummary label="Sponsorship" value={summary.year1.sponsorship} share={summary.split.sponsorship} />
          <LegSummary label="Platform / ad" value={summary.year1.platform} share={summary.split.platform} />
        </div>
      </section>

      {/* Pricing + internal rate card */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeading>Membership tiers</SectionHeading>
          <p className="mt-1 text-sm text-muted">From the monetization source of truth.</p>
          <div className="mt-4 space-y-3">
            {MEMBERSHIP_TIERS.map((t) => (
              <div key={t.tier} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-semibold text-ink">{t.tier}</span>
                  <span className="font-semibold text-azure">{t.price}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{t.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <SectionHeading>Sponsorship rate card</SectionHeading>
            <Badge tone="warn">Internal — do not publish</Badge>
          </div>
          <p className="mt-1 text-sm text-muted">Host-read, brand-aligned. Draft rates.</p>
          <div className="mt-4 space-y-3">
            {RATE_CARD.map((r) => (
              <div key={r.item} className="flex items-center justify-between rounded-xl border border-line bg-surface p-4">
                <div>
                  <span className="font-medium text-ink">{r.item}</span>
                  <p className="text-sm text-muted">{r.note}</p>
                </div>
                <span className="shrink-0 font-semibold text-ink">{r.rate}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <p className="border-t border-line pt-5 text-xs text-muted">
        Draft figures for internal modeling — confirm before any public page or
        sponsor deck quotes them. Never paywall the daily news segment. Source:
        <span className="font-mono"> CharlesBlowShow_Revenue_Model_v1.xlsx</span> +
        the monetization source of truth.
      </p>
    </div>
  );
}

function SummaryStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 font-serif text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-0.5 text-sm text-muted">{sub}</p>
    </div>
  );
}

function LegSummary({ label, value, share }: { label: string; value: number; share: number }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-1 font-serif text-2xl font-semibold text-ink">{formatCurrency(value)}</p>
      <p className="text-xs text-muted">{formatPercent(share, 0)} of year-1</p>
    </div>
  );
}
