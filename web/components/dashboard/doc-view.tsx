import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { HtmlFrame } from "./html-frame";
import type { DocAsset } from "@/lib/content/registry";

/** Embeds a PDF with a download link beneath it. */
export function PdfEmbed({ doc }: { doc: DocAsset }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-paper px-4 py-2.5">
        <span className="truncate text-sm font-medium text-muted">{doc.title}</span>
        <a
          href={doc.download ?? doc.src}
          download
          className="shrink-0 rounded-md border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink transition hover:border-azure/60 hover:text-azure"
        >
          Download PDF ↓
        </a>
      </div>
      <iframe
        src={`${doc.src}#view=FitH`}
        title={doc.title}
        loading="lazy"
        className="h-[760px] w-full bg-white"
      />
    </div>
  );
}

/** Reads a markdown file from public/content and renders it server-side. */
export async function MarkdownView({ doc }: { doc: DocAsset }) {
  const rel = doc.src.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", rel);
  let html = "";
  try {
    const raw = await readFile(filePath, "utf8");
    html = await marked.parse(raw);
  } catch {
    html = "<p>Could not load this document.</p>";
  }
  return (
    <article className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div
        className="prose-cbs max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

/** Dispatches a DocAsset to the right renderer. */
export function DocView({ doc }: { doc: DocAsset }) {
  switch (doc.kind) {
    case "pdf":
      return <PdfEmbed doc={doc} />;
    case "markdown":
      return <MarkdownView doc={doc} />;
    case "html":
      return <HtmlFrame src={doc.src} title={doc.title} height={760} toolbar />;
  }
}
