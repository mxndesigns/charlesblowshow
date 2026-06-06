import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { emails } from "@/lib/content/registry";
import { HtmlFrame } from "@/components/dashboard/html-frame";
import { PageHeader } from "@/components/dashboard/ui";

export function generateStaticParams() {
  return emails.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const email = emails.find((e) => e.id === id);
  return { title: email ? `${email.title} — Email` : "Email" };
}

export default async function EmailDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = emails.findIndex((e) => e.id === id);
  if (index === -1) notFound();
  const email = emails[index];
  const prev = emails[index - 1];
  const next = emails[index + 1];

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Emails"
        title={email.title}
        description={email.blurb}
        actions={
          <Link
            href="/dashboard/emails"
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink transition hover:border-azure/60 hover:text-azure"
          >
            ← All emails
          </Link>
        }
      />

      <HtmlFrame src={email.html} title={`${email.title} (${email.id})`} height={820} />

      <nav className="flex items-center justify-between border-t border-line pt-5 text-sm">
        {prev ? (
          <Link href={`/dashboard/emails/${prev.id}`} className="text-azure hover:text-azure-dark">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/dashboard/emails/${next.id}`} className="text-azure hover:text-azure-dark">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
