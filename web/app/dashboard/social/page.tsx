"use client";

import { useState } from "react";
import Image from "next/image";
import { social, type ImageAsset } from "@/lib/content/registry";
import { PageHeader } from "@/components/dashboard/ui";

const TABS = [
  { key: "posts", label: "Posts", items: social.posts },
  { key: "stories", label: "Stories", items: social.stories },
  { key: "video", label: "Video", items: social.video },
] as const;

const ASPECT: Record<ImageAsset["shape"], string> = {
  square: "aspect-square",
  story: "aspect-[9/16]",
  wide: "aspect-video",
};

const GRID: Record<string, string> = {
  posts: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  stories: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  video: "grid-cols-1 sm:grid-cols-2",
};

export default function SocialPage() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("posts");
  const current = TABS.find((t) => t.key === active)!;

  return (
    <div className="space-y-8">
      <PageHeader
        kicker="Brand / Marketing"
        title="Social Media"
        description="Launch creative across formats. Posts (square), Stories (9:16), and the video lower-third + end-card."
      />

      <div role="tablist" className="flex gap-1 rounded-xl border border-line bg-surface p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              active === tab.key
                ? "bg-ink text-paper"
                : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}{" "}
            <span className={active === tab.key ? "text-azure-bright" : "text-muted/60"}>
              {tab.items.length}
            </span>
          </button>
        ))}
      </div>

      <div className={`grid gap-5 ${GRID[active]}`}>
        {current.items.map((item) => (
          <figure
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-line bg-surface"
          >
            <a
              href={item.src}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative block overflow-hidden bg-paper ${ASPECT[item.shape]}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </a>
            <figcaption className="flex items-center justify-between px-4 py-2.5">
              <span className="text-sm font-medium text-ink">{item.title}</span>
              <a
                href={item.src}
                download
                className="text-xs font-semibold text-azure hover:text-azure-dark"
              >
                ↓
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
