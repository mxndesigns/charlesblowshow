import "server-only";
import type { SubscriberCount } from "./types";
import { PLATFORM_LABELS, PLATFORM_URLS } from "./types";

/**
 * YouTube adapter — the cleanest live integration (Data API v3).
 *
 * Needs two env vars:
 *   YOUTUBE_API_KEY      — a Google API key with YouTube Data API v3 enabled
 *   YOUTUBE_CHANNEL_ID   — the channel id (UC...)
 *
 * With neither set, returns null so the aggregator falls back to manual entry.
 * Cached for an hour so we don't hammer the API or block page loads.
 */
export async function fetchYouTube(): Promise<SubscriberCount | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) return null;

  const url =
    `https://www.googleapis.com/youtube/v3/channels` +
    `?part=statistics&id=${encodeURIComponent(channelId)}&key=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return {
        platform: "youtube",
        label: PLATFORM_LABELS.youtube,
        subscribers: null,
        fetchedAt: new Date().toISOString(),
        source: "manual",
        url: PLATFORM_URLS.youtube,
        note: `YouTube API returned ${res.status}`,
      };
    }
    const data = (await res.json()) as {
      items?: { statistics?: { subscriberCount?: string } }[];
    };
    const raw = data.items?.[0]?.statistics?.subscriberCount;
    const subscribers = raw != null ? Number(raw) : null;
    return {
      platform: "youtube",
      label: PLATFORM_LABELS.youtube,
      subscribers: Number.isFinite(subscribers) ? subscribers : null,
      fetchedAt: new Date().toISOString(),
      source: "live",
      url: PLATFORM_URLS.youtube,
    };
  } catch (err) {
    return {
      platform: "youtube",
      label: PLATFORM_LABELS.youtube,
      subscribers: null,
      fetchedAt: new Date().toISOString(),
      source: "manual",
      url: PLATFORM_URLS.youtube,
      note: err instanceof Error ? err.message : "YouTube fetch failed",
    };
  }
}
