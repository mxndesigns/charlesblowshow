"use client";

import { useState } from "react";

/**
 * Renders an already-web-native HTML asset (email or playbook) inside a
 * sandboxed iframe. The `sandbox` attribute with no `allow-scripts` means the
 * embedded markup can't run JS or navigate the top frame — safe for rendering
 * arbitrary email HTML. Optionally offers a "copy HTML" / "open" toolbar.
 */
export function HtmlFrame({
  src,
  title,
  height = 720,
  toolbar = true,
}: {
  src: string;
  title: string;
  height?: number;
  toolbar?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copyHtml() {
    try {
      const res = await fetch(src);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white">
      {toolbar && (
        <div className="flex items-center justify-between gap-3 border-b border-line bg-paper px-4 py-2.5">
          <span className="truncate text-sm font-medium text-muted">{title}</span>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={copyHtml}
              className="rounded-md border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink transition hover:border-azure/60 hover:text-azure"
            >
              {copied ? "Copied ✓" : "Copy HTML"}
            </button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink transition hover:border-azure/60 hover:text-azure"
            >
              Open ↗
            </a>
          </div>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        sandbox="allow-same-origin"
        loading="lazy"
        className="w-full bg-white"
        style={{ height }}
      />
    </div>
  );
}
