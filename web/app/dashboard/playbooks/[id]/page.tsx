import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { playbooks } from "@/lib/content/registry";
import { HtmlFrame } from "@/components/dashboard/html-frame";
import { PageHeader } from "@/components/dashboard/ui";

export function generateStaticParams() {
  return playbooks.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pb = playbooks.find((p) => p.id === id);
  return { title: pb ? pb.title : "Playbook" };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pb = playbooks.find((p) => p.id === id);
  if (!pb) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Playbook"
        title={pb.title}
        description={pb.segment}
        actions={
          <Link
            href="/dashboard"
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink transition hover:border-azure/60 hover:text-azure"
          >
            ← Overview
          </Link>
        }
      />
      <HtmlFrame src={pb.html} title={pb.title} height={900} />
    </div>
  );
}
