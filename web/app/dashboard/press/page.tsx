import type { Metadata } from "next";
import { documents } from "@/lib/content/registry";
import { DocView } from "@/components/dashboard/doc-view";
import { PageHeader, SectionHeading } from "@/components/dashboard/ui";

export const metadata: Metadata = { title: "Press" };

export default function PressPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        kicker="Brand / Marketing"
        title="Press"
        description="Outward-facing media materials and the internal outreach playbook for booking guests and recruiting founding members."
      />
      {documents.press.map((doc) => (
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
