import type { Metadata } from "next";
import Link from "next/link";
import { segments } from "@/lib/content/registry";
import { PageHeader } from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Segments" };

export default function SegmentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        kicker="The Show"
        title="Segments"
        description="The two daily segments that make the show. Each one outlined — the concept, the run-of-show, why it works, and the full playbook."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {segments.map((s) => (
          <Link
            key={s.id}
            href={`/dashboard/segments/${s.id}`}
            className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-azure/60 hover:shadow-sm"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-azure">
              <span className="text-base">{s.emoji}</span>
              {s.slot}
            </div>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-ink transition group-hover:text-azure">
              {s.name}
            </h2>
            <p className="mt-2 flex-1 text-muted">{s.tagline}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {s.concept.map((c) => (
                <span
                  key={c.label}
                  className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-xs font-medium text-muted"
                >
                  {c.label}
                </span>
              ))}
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-azure">
              Open the segment
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
