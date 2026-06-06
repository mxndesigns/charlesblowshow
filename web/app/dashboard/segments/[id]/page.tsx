import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { segments } from "@/lib/content/registry";
import { SegmentDetail } from "@/components/dashboard/segment-detail";
import { PageHeader } from "@/components/dashboard/ui";

export function generateStaticParams() {
  return segments.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const segment = segments.find((s) => s.id === id);
  return { title: segment ? segment.name : "Segment" };
}

export default async function SegmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const segment = segments.find((s) => s.id === id);
  if (!segment) notFound();

  return (
    <div className="space-y-10">
      <PageHeader
        kicker={`${segment.emoji} ${segment.slot}`}
        title={segment.name}
        description={segment.tagline}
        actions={
          <Link
            href="/dashboard/segments"
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink transition hover:border-azure/60 hover:text-azure"
          >
            ← All segments
          </Link>
        }
      />
      <SegmentDetail segment={segment} />
    </div>
  );
}
