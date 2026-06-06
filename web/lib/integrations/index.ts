import "server-only";
import type { Platform, SubscriberCount } from "./types";
import { PLATFORM_LABELS, PLATFORM_URLS } from "./types";
import { fetchYouTube } from "./youtube";

/**
 * Subscriber aggregator. Every tile works on day one via manual entry; real
 * APIs are wired in platform-by-platform (YouTube first). See plan §5.
 *
 * Manual figures come from env vars so they can be updated without a deploy:
 *   MANUAL_YOUTUBE_SUBSCRIBERS, MANUAL_INSTAGRAM_SUBSCRIBERS,
 *   MANUAL_SUBSTACK_SUBSCRIBERS, MANUAL_LINKEDIN_SUBSCRIBERS
 *
 * Substack has no clean public API and LinkedIn needs Marketing-API approval,
 * so both stay manual until/unless that access clears.
 */

const MANUAL_ENV: Record<Platform, string> = {
  youtube: "MANUAL_YOUTUBE_SUBSCRIBERS",
  instagram: "MANUAL_INSTAGRAM_SUBSCRIBERS",
  substack: "MANUAL_SUBSTACK_SUBSCRIBERS",
  linkedin: "MANUAL_LINKEDIN_SUBSCRIBERS",
};

function manualCount(platform: Platform, note?: string): SubscriberCount {
  const raw = process.env[MANUAL_ENV[platform]];
  const parsed = raw != null && raw !== "" ? Number(raw) : null;
  return {
    platform,
    label: PLATFORM_LABELS[platform],
    subscribers: parsed != null && Number.isFinite(parsed) ? parsed : null,
    fetchedAt: new Date().toISOString(),
    source: "manual",
    url: PLATFORM_URLS[platform],
    note,
  };
}

export async function getSubscriberCounts(): Promise<SubscriberCount[]> {
  // YouTube: try live, fall back to manual when unconfigured/failed.
  const yt = await fetchYouTube();
  const youtube =
    yt && yt.source === "live"
      ? yt
      : manualCount("youtube", yt?.note ?? "Set YOUTUBE_API_KEY + YOUTUBE_CHANNEL_ID for live data.");

  return [
    youtube,
    manualCount("instagram", "Graph API needs a Business account + app review."),
    manualCount("substack", "No public API — update manually."),
    manualCount("linkedin", "Needs a Company Page + Marketing API approval."),
  ];
}

/** Combined total across platforms (treats unknowns as 0). */
export function totalSubscribers(counts: SubscriberCount[]): number {
  return counts.reduce((sum, c) => sum + (c.subscribers ?? 0), 0);
}

export type { SubscriberCount, Platform } from "./types";
