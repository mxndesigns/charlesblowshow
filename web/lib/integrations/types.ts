/** Uniform shape every platform adapter returns. See CBS-CMS-Dashboard-Plan §5. */

export type Platform = "youtube" | "instagram" | "substack" | "linkedin";

export interface SubscriberCount {
  platform: Platform;
  label: string;
  /** Current subscriber / follower count, or null if unknown. */
  subscribers: number | null;
  /** ISO timestamp of when this figure was fetched/entered. */
  fetchedAt: string;
  /** Whether this came from a live API or a manually-entered fallback. */
  source: "live" | "manual";
  /** Public profile URL. */
  url: string;
  /** Set when a live fetch failed and we fell back to manual. */
  note?: string;
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  substack: "Substack",
  linkedin: "LinkedIn",
};

export const PLATFORM_URLS: Record<Platform, string> = {
  youtube: "https://youtube.com/@charlesblowshow",
  instagram: "https://instagram.com/charlesblowshow",
  substack: "https://charlesblowshow.substack.com",
  linkedin: "https://www.linkedin.com/in/charlesmblow",
};
