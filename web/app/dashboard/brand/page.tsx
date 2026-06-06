import type { Metadata } from "next";
import { documents } from "@/lib/content/registry";
import { DocView } from "@/components/dashboard/doc-view";
import { PageHeader, SectionHeading } from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Brand & Partnership" };

export default function BrandPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        kicker="Brand / Marketing"
        title="Brand & Partnership"
        description="The brand collateral in one view — the full guidelines, the partnership one-pager, and the live token reference the site and this console are built from."
      />
      {documents.brand.map((doc) => (
        <section key={doc.id} className="space-y-3">
          <div>
            <SectionHeading>{doc.title}</SectionHeading>
            <p className="mt-1 text-sm text-muted">{doc.blurb}</p>
          </div>
          <DocView doc={doc} />
        </section>
      ))}
    </div>
  );
}
