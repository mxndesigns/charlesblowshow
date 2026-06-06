import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { emails } from "@/lib/content/registry";
import { PageHeader } from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Emails" };

export default function EmailsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Brand / Marketing"
        title="Emails"
        description={`The ${emails.length} lifecycle templates. Open any one to read the live HTML in a sandboxed preview and copy its source.`}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {emails.map((email) => (
          <Link
            key={email.id}
            href={`/dashboard/emails/${email.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-azure/60 hover:shadow-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-paper">
              <Image
                src={email.preview}
                alt={`${email.title} email preview`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-azure">
                  {email.id.split("-")[0]}
                </span>
                <h2 className="font-serif text-lg font-semibold text-ink transition group-hover:text-azure">
                  {email.title}
                </h2>
              </div>
              <p className="mt-1 text-sm text-muted">{email.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
