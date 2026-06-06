/**
 * Content registry — one typed manifest of every asset the dashboard surfaces.
 *
 * Pages read from here, so adding/relabelling an asset is a data change, not a
 * code change. All paths point into `web/public/content/` (served by Next).
 * See CBS-CMS-Dashboard-Plan §6.
 */

export interface EmailAsset {
  id: string;
  title: string;
  /** What this email is for, in the lifecycle. */
  blurb: string;
  /** Path to the live HTML email (rendered in a sandboxed iframe). */
  html: string;
  /** Path to the PNG preview thumbnail. */
  preview: string;
}

export const emails: EmailAsset[] = [
  {
    id: "01-welcome",
    title: "Welcome",
    blurb: "Sent on signup — what to expect from the show and the dispatch.",
    html: "/content/emails/01-welcome.html",
    preview: "/content/emails/previews/01-welcome.png",
  },
  {
    id: "02-waitlist",
    title: "Waitlist",
    blurb: "Pre-launch holding email for early subscribers.",
    html: "/content/emails/02-waitlist.html",
    preview: "/content/emails/previews/02-waitlist.png",
  },
  {
    id: "03-were-live",
    title: "We're Live",
    blurb: "Launch announcement — the first episode is up.",
    html: "/content/emails/03-were-live.html",
    preview: "/content/emails/previews/03-were-live.png",
  },
  {
    id: "04-daily-dispatch",
    title: "Daily Dispatch",
    blurb: "The recurring daily newsletter template.",
    html: "/content/emails/04-daily-dispatch.html",
    preview: "/content/emails/previews/04-daily-dispatch.png",
  },
  {
    id: "05-founding-member",
    title: "Founding Member",
    blurb: "The founding-member offer — limited launch cohort.",
    html: "/content/emails/05-founding-member.html",
    preview: "/content/emails/previews/05-founding-member.png",
  },
  {
    id: "06-membership-welcome",
    title: "Membership Welcome",
    blurb: "Onboarding for new paying members.",
    html: "/content/emails/06-membership-welcome.html",
    preview: "/content/emails/previews/06-membership-welcome.png",
  },
  {
    id: "07-guest-tonight",
    title: "Guest Tonight",
    blurb: "Evening Show guest announcement / reminder.",
    html: "/content/emails/07-guest-tonight.html",
    preview: "/content/emails/previews/07-guest-tonight.png",
  },
  {
    id: "08-weekly-roundup",
    title: "Weekly Roundup",
    blurb: "The free weekly dispatch — the week in his words.",
    html: "/content/emails/08-weekly-roundup.html",
    preview: "/content/emails/previews/08-weekly-roundup.png",
  },
  {
    id: "09-winback",
    title: "Win-back",
    blurb: "Re-engagement for lapsed subscribers.",
    html: "/content/emails/09-winback.html",
    preview: "/content/emails/previews/09-winback.png",
  },
];

export interface ImageAsset {
  id: string;
  title: string;
  src: string;
  /** Aspect ratio hint for the gallery grid. */
  shape: "square" | "story" | "wide";
}

export const social: {
  posts: ImageAsset[];
  stories: ImageAsset[];
  video: ImageAsset[];
} = {
  posts: [
    { id: "post-1-launch", title: "Launch", src: "/content/social/posts/post-1-launch.png", shape: "square" },
    { id: "post-2-manifesto", title: "Manifesto", src: "/content/social/posts/post-2-manifesto.png", shape: "square" },
    { id: "post-3-format", title: "The Format", src: "/content/social/posts/post-3-format.png", shape: "square" },
    { id: "post-4-founding-member", title: "Founding Member", src: "/content/social/posts/post-4-founding-member.png", shape: "square" },
    { id: "post-5-follow", title: "Follow", src: "/content/social/posts/post-5-follow.png", shape: "square" },
  ],
  stories: [
    { id: "story-1-launch", title: "Launch", src: "/content/social/stories/story-1-launch.png", shape: "story" },
    { id: "story-2-manifesto", title: "Manifesto", src: "/content/social/stories/story-2-manifesto.png", shape: "story" },
    { id: "story-3-founding-member", title: "Founding Member", src: "/content/social/stories/story-3-founding-member.png", shape: "story" },
    { id: "story-4-live", title: "Live", src: "/content/social/stories/story-4-live.png", shape: "story" },
  ],
  video: [
    { id: "lower-third", title: "Lower-third", src: "/content/social/video/preview_lower-third.png", shape: "wide" },
    { id: "end-card", title: "End card", src: "/content/social/video/preview_end-card.png", shape: "wide" },
  ],
};

export interface PlaybookAsset {
  id: string;
  title: string;
  segment: string;
  html: string;
}

export const playbooks: PlaybookAsset[] = [
  {
    id: "the-evening-show",
    title: "The Evening Show",
    segment: "🌙 Evening · 20 min · guest conversation",
    html: "/content/playbooks/the-evening-show.html",
  },
  {
    id: "lunch-break-live",
    title: "Lunch Break Live",
    segment: "☀️ Midday · 10 min · live take",
    html: "/content/playbooks/lunch-break-live.html",
  },
];

export interface SegmentCard {
  label: string;
  title: string;
  body: string;
}

export interface SegmentReason {
  title: string;
  body: string;
}

export interface SegmentBeat {
  time: string;
  phase: string;
  title: string;
  detail: string;
}

export interface SegmentTrio {
  heading: string;
  items: string[];
}

export interface SegPlatform {
  key: "li" | "ig" | "yt";
  name: string;
  role: string;
  feel: string;
  cadence: string[];
  launchBeat: string;
}

export interface SegPhase {
  phase: string;
  body: string;
}

export interface SegPost {
  platform: "LinkedIn" | "Instagram" | "YouTube";
  kind: string;
  body: string;
}

export interface SegFunnelStep {
  label: string;
  sub: string;
  /** Bar width as a percentage (0–100). */
  pct: number;
  caption: string;
}

export interface SegSignupCard {
  heading: string;
  body?: string;
  items?: string[];
}

export interface SegTactic {
  platform: string;
  cta: string;
  how: string;
}

export interface SegClockSlot {
  time: string;
  ampm: string;
  name: string;
  desc: string;
  /** The anchor slot (the live). */
  anchor?: boolean;
}

export interface SegFlowStep {
  n: string;
  title: string;
  body: string;
}

export interface SegStackRow {
  layer: string;
  job: string;
  options: string;
}

export interface SegGanttTrack {
  id: string;
  name: string;
}

export interface SegGanttTask {
  track: string;
  label: string;
  /** Start week (1-based) and end week (inclusive). */
  s: number;
  e: number;
}

/** The marketing / roadmap / agent depth of a segment playbook, as structured
 *  data so it renders natively on-brand (replacing the off-brand source HTML). */
export interface SegmentPlaybook {
  marketingLead: string;
  platforms: SegPlatform[];
  arc: SegPhase[];
  oneRule: { body: string; chips: string[] };
  posts: SegPost[];
  postsTip: string;
  signupLead: string;
  funnel: SegFunnelStep[];
  signupCards: SegSignupCard[];
  tactics: SegTactic[];
  signupTarget: string;
  ganttLead: string;
  ganttMonths: { name: string; span: number }[];
  ganttTracks: SegGanttTrack[];
  ganttTasks: SegGanttTask[];
  ganttNote: string;
  agentLead: string;
  clock: SegClockSlot[];
  loop: SegFlowStep[];
  humanNote: string;
  stack: SegStackRow[];
  buildPhases: SegPhase[];
  guardrails: { body: string; chips: string[] };
  disclaimer: string;
}

export interface Segment {
  id: string;
  name: string;
  emoji: string;
  /** One-line description of the segment. */
  tagline: string;
  /** Slot summary — cadence · time · length. */
  slot: string;
  /** Concept lead paragraph. */
  lead: string;
  /** The Promise / Slot / Edge cards. */
  concept: SegmentCard[];
  /** "Why it works" reasons. */
  why: SegmentReason[];
  /** Run-of-show beats (the anatomy of the ten minutes). */
  beats: SegmentBeat[];
  /** Production trios: recurring signatures · minimum kit · daily prep loop. */
  trios: SegmentTrio[];
  /** The closing "bet" line. */
  bet: string;
  /** The full playbook depth (marketing, roadmap, agent), rendered natively. */
  playbook: SegmentPlaybook;
}

/**
 * Structured per-segment detail, extracted from the segment-playbook HTML
 * (`The-Evening-Show-Playbook.html`, `Lunch-Break-Live-Playbook.html`). Mirrors
 * the playbooks' section structure: Concept → Run of Show → Why it works →
 * production kit. The full interactive playbook is embedded beneath the outline.
 */
export const segments: Segment[] = [
  {
    id: "lunch-break-live",
    name: "Lunch Break Live",
    emoji: "☀️",
    tagline:
      "A tight, ten-minute live segment with the immediate read on the day's biggest story.",
    slot: "Noon · every weekday · 10 min · live",
    lead: "A daily appointment at noon. When the news is still forming and everyone else is waiting for the official take, you go live for ten minutes and tell people what it means — fast, unfiltered, and in your voice. It's the column delivered live, before the column exists.",
    concept: [
      {
        label: "The Promise",
        title: "Ten minutes, one story, your read",
        body: "No panel, no teleprompter dance. One story that's driving the day, explained and interpreted by you while it's still hot. Viewers leave knowing what happened and what to think about it.",
      },
      {
        label: "The Slot",
        title: "Noon, every weekday",
        body: "It lives in the lunch hour on purpose — the natural mid-day check-in. People eat, you talk, they get the day's biggest story sorted before they head back in. Predictable, ritual, must-not-miss.",
      },
      {
        label: "The Edge",
        title: "Immediacy over polish",
        body: "The value is speed plus judgment. Cable spends a day deciding the frame; you set the frame at noon. Being early and being right about what matters is the whole brand.",
      },
    ],
    why: [
      { title: "Appointment habit", body: "A fixed daily time turns occasional viewers into a returning audience — the single hardest thing to build online." },
      { title: "Low production cost, high frequency", body: "Ten live minutes is cheap to make daily, and frequency is what algorithms and habits both reward." },
      { title: "Repurposing engine", body: "Every live becomes 3–5 clips, a newsletter blurb, and an audio cut. One shoot, a week of feed." },
      { title: "Distinct voice in a crowded field", body: "The market is full of “here's the news.” Almost no one offers “here's my immediate, opinionated read, live, at a set time.”" },
      { title: "Direct relationship", body: "Live chat, questions, and reactions build a community that belongs to you — not rented from a network." },
      { title: "Monetizable", body: "Memberships, a paid Q&A tier, sponsorship of a named recurring slot, and a newsletter all hang off this spine." },
    ],
    beats: [
      { time: "0:00", phase: "Cold open", title: "The hook — one sentence", detail: "Open straight into the story, no throat-clearing. “Here's the one thing you need to understand about today.” A standing on-screen lower-third and the same 3-second audio sting build instant recognition." },
      { time: "0:30", phase: "The facts", title: "What actually happened", detail: "90 seconds of clean, sourced summary — the who/what/when, stripped of spin, so everyone's on the same page before the opinion lands." },
      { time: "2:00", phase: "The read", title: "Your interpretation — the core", detail: "4–5 minutes of “here's what it means and why it matters.” The part no one else delivers at noon. Bring the column-writer's framing to a live moment." },
      { time: "7:00", phase: "The pushback", title: "Steelman the other side", detail: "60–90 seconds acknowledging the strongest counter-argument and answering it. This is what earns trust and separates you from a hot-take feed." },
      { time: "8:30", phase: "Live Q&A", title: "One or two questions from chat", detail: "Pull a sharp question from the live audience. Makes viewers feel seen and rewards showing up live versus watching the replay." },
      { time: "9:30", phase: "The close", title: "The takeaway + the ask", detail: "One memorable closing line (clip bait), then a single clear CTA: subscribe / join the newsletter / be here tomorrow at noon." },
    ],
    trios: [
      { heading: "Recurring signatures", items: ["Same cold-open line family", "Standing title card + sting", "“The Read” name-checked daily", "A weekly recurring rubric"] },
      { heading: "Minimum kit", items: ["One good camera + key light", "USB or lav mic (audio > video)", "Streaming tool (StreamYard / Ecamm / OBS)", "Lower-third + countdown overlay"] },
      { heading: "Daily prep loop", items: ["AI agent surfaces top story by 11:15", "15-min outline: facts, read, counter", "Go live 12:00, off by 12:10", "Clips cut & scheduled by 1:30"] },
    ],
    bet: "People don't just want to know what happened at lunch — they want to know what it means before the afternoon news cycle tells them. Lunch Break Live owns that ten-minute window.",
    playbook: {
      marketingLead:
        "Even weight on LinkedIn, Instagram, and YouTube — but the same story told three ways. YouTube is the home of the live and the archive; Instagram is the reach and personality engine; LinkedIn is the credibility and conversation layer. One segment, three on-ramps.",
      platforms: [
        {
          key: "li",
          name: "LinkedIn",
          role: "Credibility & conversation",
          feel: "Serious, civic, “you're in the room with someone who thinks for a living.” This is where the read becomes a discussion among engaged professionals.",
          cadence: [
            "Daily text post: the day's takeaway in 3–5 lines + the clip",
            "1–2 long-form articles/week expanding a segment into a column",
            "Reply to every substantive comment for the first 30 days",
          ],
          launchBeat:
            "A founding “why I'm doing this” essay pinned to your profile, plus a countdown series in the two weeks before episode one.",
        },
        {
          key: "ig",
          name: "Instagram",
          role: "Reach & personality",
          feel: "Immediate, human, face-forward. The discovery surface — Reels do the reach, Stories do the daily ritual, the grid is the brand.",
          cadence: [
            "1–2 Reels/day from the live (the closing line + the sharpest 30s)",
            "Daily Story: “Live at noon — today's story is ___” + countdown sticker",
            "Go Live natively to mirror the segment for IG-first viewers",
          ],
          launchBeat:
            "A teaser Reel trilogy (“something's coming at noon”), a launch-day countdown, and a pinned grid of the first week's best moments.",
        },
        {
          key: "yt",
          name: "YouTube",
          role: "Home base & archive",
          feel: "The destination. The live happens here, the full replay lives here, and Shorts feed discovery back into it. This is the searchable, evergreen spine.",
          cadence: [
            "The live stream itself, noon daily, auto-archived",
            "3–5 Shorts/day cut from the segment",
            "Optional weekly “best of the week” long-form recap",
          ],
          launchBeat:
            "A 60–90s channel trailer, a scheduled “Premiere” for episode one to concentrate the live audience, and Community-tab polls to pick early topics.",
        },
      ],
      arc: [
        { phase: "Phase 1 · Tease", body: "Mystery and anticipation. “Something arrives at noon.” Cryptic Reels, a countdown, a founding essay. No full reveal yet." },
        { phase: "Phase 2 · Reveal", body: "Name, time, promise, and trailer drop across all three at once. Pin everything. Open the sign-up. Ask for the calendar add." },
        { phase: "Phase 3 · Launch week", body: "Five episodes, five days. Heavy clipping, daily Stories, reply to everything. Treat week one like an event, not a routine." },
        { phase: "Phase 4 · Sustain", body: "Settle into the daily rhythm. Let data pick winning formats. Introduce the weekly rubric and the membership ask." },
      ],
      oneRule: {
        body: "Film once, distribute everywhere — but never cross-post identically. The same ten minutes becomes a LinkedIn argument, an Instagram moment, and a YouTube archive.",
        chips: ["Native formatting per platform", "Same voice everywhere", "Every post points back to noon"],
      },
      posts: [
        {
          platform: "LinkedIn",
          kind: "Announcement",
          body: `Starting Monday, I'm doing something new — and a little terrifying.

It's called Lunch Break Live: a tight, 10-minute live segment, every weekday at noon, where I give you my immediate read on the day's biggest story.

Not the polished take three days later. The real-time one — what happened, what it means, and why it matters — while it's still happening.

No panel. No spin. Ten minutes, one story, straight from me.

I've spent my career writing about this country after the dust settles. This is me showing up before it does.

🔔 First episode Monday at 12:00 PM ET.
Follow along + get the daily heads-up 👉 [link]

What story should I break down first? Tell me below. ⬇️`,
        },
        {
          platform: "Instagram",
          kind: "Reel caption",
          body: `New ritual starts Monday. 🕛

LUNCH BREAK LIVE — 10 minutes, every weekday at noon. The day's biggest story, my immediate read, live.

You eat. I'll make sense of the news. Back to your day by 12:10.

See you at noon. Turn on notifications so you don't miss the first one. 🔔

#LunchBreakLive #CharlesBlow #news #politics #thedailyread #goinglive`,
        },
        {
          platform: "YouTube",
          kind: "Community + trailer description",
          body: `▶ LUNCH BREAK LIVE — premieres Monday, 12:00 PM ET

Every weekday at noon, I go live for 10 minutes with my immediate read on the day's biggest story. What happened, what it means, and the part nobody else is saying yet.

One story. Ten minutes. No teleprompter, no panel — just the read.

🔔 Hit subscribe and set the reminder for Monday's premiere.
💬 Drop the first story you want me to break down in the comments.

New episode every weekday. Be here at noon.`,
        },
        {
          platform: "Instagram",
          kind: "Story countdown",
          body: `⏳ 3 days out.

Something new arrives at noon on Monday.
10 minutes. The day's biggest story. My take, live.

Tap the countdown so you're reminded 👆
Tap "Sign up" so you never miss one 👆

#LunchBreakLive`,
        },
      ],
      postsTip:
        "Post the LinkedIn essay and YouTube trailer first (they're searchable and pinnable), then run the Instagram teasers in the final 72 hours to spike anticipation right before launch.",
      signupLead:
        "Followers are rented; subscribers are owned. The goal of every post is to move someone one step closer to a relationship you control — ideally an email list and a calendar reminder.",
      funnel: [
        { label: "Discover", sub: "Reels, Shorts, LI posts", pct: 100, caption: "A clip stops the scroll" },
        { label: "Follow", sub: "Platform follow + notifications", pct: 82, caption: "They turn on the bell" },
        { label: "Show up live", sub: "Noon, the appointment", pct: 62, caption: "They watch at noon" },
        { label: "Sign up", sub: "Email list / newsletter", pct: 42, caption: "You now own the relationship" },
        { label: "Member", sub: "Paid tier / community", pct: 24, caption: "They pay to go deeper" },
      ],
      signupCards: [
        { heading: "The offer", body: "Give a reason to hand over an email beyond “newsletter.” Lead with a tangible: “The Noon Note” — a 60-second written version of each day's read, in your inbox by 12:30, plus first dibs on live Q&A." },
        { heading: "The mechanics", items: ["One simple landing page (name + email)", "Link in every bio, pinned comment, and clip end-card", "Verbal CTA in the segment's close, every day", "Auto-welcome email that sets the noon habit"] },
        { heading: "The nudges", items: ["Calendar-add link (“📅 Add noon to your calendar”)", "Notification asks baked into Stories", "Weekly “if you missed it” recap email to re-activate", "Refer-a-friend unlock for the Q&A tier"] },
      ],
      tactics: [
        { platform: "LinkedIn", cta: "“Get the Noon Note” link in posts + featured section", how: "Newsletter (native LI newsletter as a feeder) → landing page for email" },
        { platform: "Instagram", cta: "Link in bio + “Sign up” Story sticker + clip end-cards", how: "Link-in-bio page → email capture; DM auto-reply with the link on a keyword" },
        { platform: "YouTube", cta: "Pinned comment, end screen, description link, verbal close", how: "Description / pinned-comment link → landing page; Channel membership for paid tier" },
      ],
      signupTarget:
        "Target for the first 90 days: convert the audience habit (showing up at noon) into owned contacts (email) and a small paying core (members). Everything else is vanity.",
      ganttLead:
        "June–November 2026. Four tracks: launch & production, marketing, the AI agent build, and the recurring segment-topic clusters that give each week a theme. Filter by track; hover any bar for detail.",
      ganttMonths: [
        { name: "JUN", span: 4 }, { name: "JUL", span: 4 }, { name: "AUG", span: 5 },
        { name: "SEP", span: 4 }, { name: "OCT", span: 4 }, { name: "NOV", span: 5 },
      ],
      ganttTracks: [
        { id: "launch", name: "Launch & Production" },
        { id: "mktg", name: "Marketing & Growth" },
        { id: "agent", name: "AI Agent Build" },
        { id: "topics", name: "Topic Clusters" },
      ],
      ganttTasks: [
        { track: "launch", label: "Format design & run-of-show lock", s: 1, e: 2 },
        { track: "launch", label: "Kit, set & streaming setup", s: 1, e: 3 },
        { track: "launch", label: "Pilot test runs (private)", s: 3, e: 4 },
        { track: "launch", label: "★ LAUNCH WEEK (5 episodes)", s: 5, e: 5 },
        { track: "launch", label: "Daily live segment (sustain)", s: 6, e: 26 },
        { track: "launch", label: "Weekly “best of” recap", s: 8, e: 26 },
        { track: "mktg", label: "Brand assets & landing page", s: 1, e: 2 },
        { track: "mktg", label: "Phase 1 · Tease campaign", s: 3, e: 4 },
        { track: "mktg", label: "Phase 2 · Reveal + trailer drop", s: 4, e: 5 },
        { track: "mktg", label: "Phase 3 · Launch-week blitz", s: 5, e: 6 },
        { track: "mktg", label: "Always-on clipping & cross-post", s: 6, e: 26 },
        { track: "mktg", label: "Newsletter (“Noon Note”) live", s: 5, e: 26 },
        { track: "mktg", label: "Membership / paid tier opens", s: 12, e: 26 },
        { track: "agent", label: "P1 · Research + draft (manual-assist)", s: 2, e: 5 },
        { track: "agent", label: "P2 · Approve-to-post + scheduling", s: 6, e: 10 },
        { track: "agent", label: "P3 · Multi-platform + auto-clip", s: 10, e: 16 },
        { track: "agent", label: "P4 · Semi-autonomous + tuning", s: 16, e: 26 },
        { track: "topics", label: "Democracy & elections watch", s: 5, e: 14 },
        { track: "topics", label: "Race, justice & policy", s: 5, e: 26 },
        { track: "topics", label: "Economy & everyday cost", s: 7, e: 18 },
        { track: "topics", label: "Culture, media & narrative", s: 6, e: 22 },
        { track: "topics", label: "Courts & the law", s: 9, e: 20 },
        { track: "topics", label: "Election-season surge", s: 18, e: 26 },
        { track: "topics", label: "Year-end “what it all meant”", s: 24, e: 26 },
      ],
      ganttNote:
        "Each column is roughly one week. Topic clusters are seasonal/thematic anchors — the actual daily story is always whatever's biggest that day, but the cluster gives the week a recurring rubric (e.g., a standing “Democracy Watch” Monday).",
      agentLead:
        "A six-times-daily agent that researches the topics you care about online and publishes calibrated posts at 6 AM, 9 AM, 12 PM, 3 PM, 7 PM, and 9 PM — keeping the feed alive around the clock and feeding you the noon story on a plate.",
      clock: [
        { time: "6:00", ampm: "AM", name: "The Brief", desc: "Overnight wrap + “what to watch today.” Sets the agenda." },
        { time: "9:00", ampm: "AM", name: "The Build", desc: "Morning developments. Surfaces the candidate story for noon." },
        { time: "12:00", ampm: "PM", name: "Live Push", desc: "Promotes the live + posts the noon read recap after.", anchor: true },
        { time: "3:00", ampm: "PM", name: "The Angle", desc: "A deeper data point or counterpoint on the day's story." },
        { time: "7:00", ampm: "PM", name: "Prime Clip", desc: "The best segment clip, dropped at peak evening attention." },
        { time: "9:00", ampm: "PM", name: "The Reflect", desc: "Closing thought / tomorrow tease. Quieter, more personal." },
      ],
      loop: [
        { n: "01", title: "Watch", body: "Pull from a curated source set — news APIs, RSS, X/social trends, search — filtered to your beats (politics, race, democracy, culture)." },
        { n: "02", title: "Rank", body: "Score stories by relevance to your voice, momentum/recency, and audience fit. Surface the top candidate + 2 backups." },
        { n: "03", title: "Draft", body: "Generate platform-native copy in your voice from a tuned style guide, with source links and a suggested clip/visual." },
        { n: "04", title: "Approve", body: "Route to you (or an editor) via a quick mobile approval — Slack/email/text. One tap to ship, edit, or skip." },
        { n: "05", title: "Publish", body: "Post to the scheduled slot on each platform, then log engagement to retrain ranking and copy over time." },
      ],
      humanNote:
        "Human-in-the-loop is the default. For a voice-driven, opinion brand, a tap-to-approve gate protects your credibility. Once trust is established, low-risk slots (6 AM brief, 7 PM clip) can graduate to fully automatic.",
      stack: [
        { layer: "Orchestration", job: "Run the 6 daily jobs on a schedule; chain the steps", options: "Cron / a scheduled-task runner, n8n, Make, or a lightweight Python service" },
        { layer: "Research / ingestion", job: "Gather candidate stories on your beats", options: "News APIs (NewsAPI, GDELT), RSS feeds, X/social listening, web search API" },
        { layer: "Reasoning / drafting", job: "Rank stories + write copy in your voice", options: "An LLM (e.g., Claude) with a tuned system prompt + your style guide as context" },
        { layer: "Approval", job: "Get your one-tap yes/no before publishing", options: "Slack bot, email with action buttons, or SMS (Twilio)" },
        { layer: "Publishing", job: "Post to each platform at the right time", options: "Buffer/Hootsuite/Publer APIs, or native platform APIs (LinkedIn, IG Graph, YouTube)" },
        { layer: "Memory / learning", job: "Store what shipped + how it performed", options: "A simple database (Postgres/Airtable) feeding back engagement to improve ranking" },
      ],
      buildPhases: [
        { phase: "Phase 1 · Manual-assist", body: "Agent researches + drafts; you copy-paste and post by hand. Validate that the picks and voice are good before automating anything." },
        { phase: "Phase 2 · Approve-to-post", body: "Add scheduling + one-tap approval. Agent drafts on the 6-slot clock; you approve from your phone; it publishes." },
        { phase: "Phase 3 · Multi-platform", body: "Native per-platform formatting, auto-clipping from the live, and engagement logging feeding back into ranking." },
        { phase: "Phase 4 · Semi-autonomous", body: "Low-risk slots run automatically within guardrails; high-stakes posts still gated. Weekly performance report tunes the model." },
      ],
      guardrails: {
        body: "Because this is an opinion brand under your name: the agent amplifies your judgment; it never replaces it.",
        chips: ["Always cite a source", "No posting on breaking tragedy without human OK", "Voice-match check before send", "Daily volume cap", "Easy kill-switch"],
      },
      disclaimer:
        "This is a working brainstorm and strategy draft for planning purposes — figures, timing, and tooling are starting points to pressure-test, not commitments. Platform APIs and posting-automation policies change often and vary by platform; verify each platform's current automation and live-streaming terms before building.",
    },
  },
  {
    id: "the-evening-show",
    name: "The Evening Show",
    emoji: "🌙",
    tagline:
      "A nightly ten-minute live read on the one story that defined the day — the last word before you put the day down.",
    slot: "7:00 PM · every weeknight · 10 min · live",
    lead: "A nightly appointment to make sense of the day. By evening the news has fully landed — the spin has had its run, the facts have firmed up. You step in for ten minutes with the definitive read: here's what today actually meant. The last word before people put the day down.",
    concept: [
      {
        label: "The Promise",
        title: "Ten minutes, one story, your read",
        body: "No panel, no filler. The single story that defined the day, interpreted in your voice. Viewers go to bed knowing what happened and what to make of it.",
      },
      {
        label: "The Slot",
        title: "7:00 PM, every weeknight",
        body: "It owns the post-dinner wind-down — the moment people finally have a second to process the day. Primetime attention, appointment ritual, the night's must-see ten minutes.",
      },
      {
        label: "The Edge",
        title: "The day in full view",
        body: "Unlike a morning hot take, the evening read has all the facts in. The value is judgment delivered when the picture is complete — clarity, not just speed.",
      },
    ],
    why: [
      { title: "Primetime habit", body: "A fixed 7 PM slot lands in the highest-attention window of the day and turns viewers into a nightly returning audience." },
      { title: "The complete picture", body: "Evening means the story is fully formed — you can give the authoritative read, not a guess that ages badly by dinner." },
      { title: "Repurposing engine", body: "Each live becomes 3–5 clips, a newsletter, and an audio cut — and evening clips ride the strong night-time engagement wave." },
      { title: "Distinct in a crowded field", body: "Plenty of evening news recaps exist; almost none offer one person's sharp, opinionated read, live, at a set time." },
      { title: "Direct relationship", body: "Live chat and Q&A build a nightly community that belongs to you, not rented from a network." },
      { title: "Monetizable", body: "Memberships, a paid Q&A tier, a named-slot sponsorship, and a newsletter all hang off this spine." },
    ],
    beats: [
      { time: "0:00", phase: "Cold open", title: "The hook — one sentence", detail: "Open straight into the story of the day, no throat-clearing. “Of everything that happened today, here's the one thing that matters.” Standing lower-third + a 3-second sting build instant recognition." },
      { time: "0:30", phase: "The day in brief", title: "What actually happened", detail: "90 seconds of clean, sourced summary — now with the full day's facts settled, so everyone shares the same picture before the read." },
      { time: "2:00", phase: "The read", title: "Your interpretation — the core", detail: "4–5 minutes of “here's what it meant and why it matters.” The authoritative end-of-day take no one else delivers at 7 PM." },
      { time: "7:00", phase: "The pushback", title: "Steelman the other side", detail: "60–90 seconds on the strongest counter-argument, answered. This earns trust and separates you from a hot-take feed." },
      { time: "8:30", phase: "Live Q&A", title: "One or two questions from chat", detail: "Pull a sharp question from the live audience — rewards showing up live versus catching the replay." },
      { time: "9:30", phase: "The close", title: "The takeaway + the ask", detail: "One memorable closing line (clip bait), then a single clear CTA: subscribe / join the newsletter / be here tomorrow at 7." },
    ],
    trios: [
      { heading: "Recurring signatures", items: ["Same cold-open line family", "Standing title card + sting", "“The Read” name-checked nightly", "A weekly recurring rubric"] },
      { heading: "Minimum kit", items: ["One good camera + key light", "USB or lav mic (audio > video)", "Streaming tool (StreamYard / Ecamm / OBS)", "Lower-third + countdown overlay"] },
      { heading: "Daily prep loop", items: ["AI agent surfaces top story by 6:00 PM", "30-min outline: facts, read, counter", "Go live 7:00, off by 7:10", "Clips cut & scheduled by 8:30"] },
    ],
    bet: "At the end of the day people don't just want a recap — they want someone they trust to tell them what it all meant. The Evening Show owns that final ten-minute window before the day closes.",
    playbook: {
      marketingLead:
        "Even weight on LinkedIn, Instagram, and YouTube — the same story told three ways. YouTube is the home of the live and the archive; Instagram is the reach and personality engine; LinkedIn is the credibility and conversation layer. One segment, three on-ramps to 7 PM.",
      platforms: [
        {
          key: "li",
          name: "LinkedIn",
          role: "Credibility & conversation",
          feel: "Serious, civic, “you're in the room with someone who thinks for a living.” The evening read becomes the next morning's professional conversation starter.",
          cadence: [
            "Nightly recap post: the day's takeaway in 3–5 lines + the clip (posted ~8 PM)",
            "1–2 long-form articles/week expanding a segment into a column",
            "Reply to every substantive comment for the first 30 days",
          ],
          launchBeat:
            "A founding “why I'm doing this” essay pinned to your profile, plus a two-week countdown series before night one.",
        },
        {
          key: "ig",
          name: "Instagram",
          role: "Reach & personality",
          feel: "Immediate, human, face-forward. The discovery surface — Reels carry reach, Stories run the nightly ritual, the grid is the brand.",
          cadence: [
            "1–2 Reels/night from the live (closing line + sharpest 30s)",
            "Daily Story: “Live at 7 — tonight's story is ___” + countdown sticker",
            "Go Live natively to mirror the segment for IG-first viewers",
          ],
          launchBeat:
            "A teaser Reel trilogy (“something arrives at 7”), a launch-night countdown, and a pinned grid of week-one's best moments.",
        },
        {
          key: "yt",
          name: "YouTube",
          role: "Home base & archive",
          feel: "The destination. The live happens here, the full replay lives here, Shorts feed discovery back in. The searchable, evergreen spine.",
          cadence: [
            "The live stream itself, 7 PM nightly, auto-archived",
            "3–5 Shorts/day cut from the segment",
            "Optional weekly “best of the week” long-form recap",
          ],
          launchBeat:
            "A 60–90s channel trailer, a scheduled “Premiere” for night one to concentrate the live audience, and Community-tab polls to pick early topics.",
        },
      ],
      arc: [
        { phase: "Phase 1 · Tease", body: "Mystery and anticipation. “Something arrives at 7.” Cryptic Reels, a countdown, a founding essay. No full reveal yet." },
        { phase: "Phase 2 · Reveal", body: "Name, time, promise, and trailer drop across all three at once. Pin everything. Open sign-up. Ask for the calendar add." },
        { phase: "Phase 3 · Launch week", body: "Five nights, five episodes. Heavy clipping, nightly Stories, reply to everything. Treat week one as an event." },
        { phase: "Phase 4 · Sustain", body: "Settle into the nightly rhythm. Let data pick winning formats. Introduce the weekly rubric and the membership ask." },
      ],
      oneRule: {
        body: "Film once, distribute everywhere — but never cross-post identically. The same ten minutes becomes a LinkedIn argument, an Instagram moment, and a YouTube archive.",
        chips: ["Native formatting per platform", "Same voice everywhere", "Every post points back to 7 PM"],
      },
      posts: [
        {
          platform: "LinkedIn",
          kind: "Announcement",
          body: `Starting Monday, I'm doing something new — every single night.

It's called The Evening Show: a tight, 10-minute live segment at 7:00 PM ET, where I give you my immediate read on the day's biggest story.

By evening, the dust has settled. The facts are in. So this isn't a guess — it's the read. What happened today, what it actually meant, and why it matters.

No panel. No spin. Ten minutes, one story, straight from me — the last word before you put the day down.

🔔 Premieres Monday, 7:00 PM ET.
Follow along + get the nightly heads-up 👉 [link]

What story should I close out first? Tell me below. ⬇️`,
        },
        {
          platform: "Instagram",
          kind: "Reel caption",
          body: `New nightly ritual starts Monday. 🌆

THE EVENING SHOW — 10 minutes, every weeknight at 7. The day's biggest story, my immediate read, live.

Wind down with me. I'll make sense of the day before you close it out.

See you at 7. Turn on notifications so you don't miss the first one. 🔔

#TheEveningShow #CharlesBlow #news #politics #thenightlyread #goinglive`,
        },
        {
          platform: "YouTube",
          kind: "Community + trailer description",
          body: `▶ THE EVENING SHOW — premieres Monday, 7:00 PM ET

Every weeknight at 7, I go live for 10 minutes with my immediate read on the day's biggest story. By evening the picture's complete — so this is the read, not a guess. What happened, what it meant, and the part nobody else is saying.

One story. Ten minutes. No teleprompter, no panel — just the read.

🔔 Subscribe and set the reminder for Monday's premiere.
💬 Drop the first story you want me to break down in the comments.

New episode every weeknight. Be here at 7.`,
        },
        {
          platform: "Instagram",
          kind: "Story countdown",
          body: `⏳ 3 nights out.

Something new arrives at 7:00 PM Monday.
10 minutes. The day's biggest story. My take, live.

Tap the countdown so you're reminded 👆
Tap "Sign up" so you never miss a night 👆

#TheEveningShow`,
        },
      ],
      postsTip:
        "Post the LinkedIn essay and YouTube trailer first (searchable, pinnable), then run the Instagram teasers in the final 72 hours to spike anticipation right before the 7 PM premiere.",
      signupLead:
        "Followers are rented; subscribers are owned. Every post should move someone one step closer to a relationship you control — ideally an email list and a 7 PM calendar reminder.",
      funnel: [
        { label: "Discover", sub: "Reels, Shorts, LI posts", pct: 100, caption: "A clip stops the scroll" },
        { label: "Follow", sub: "Follow + notifications", pct: 82, caption: "They turn on the bell" },
        { label: "Show up live", sub: "7 PM, the appointment", pct: 62, caption: "They watch at 7" },
        { label: "Sign up", sub: "Email list / newsletter", pct: 42, caption: "You now own the relationship" },
        { label: "Member", sub: "Paid tier / community", pct: 24, caption: "They pay to go deeper" },
      ],
      signupCards: [
        { heading: "The offer", body: "Give a reason to hand over an email beyond “newsletter.” Lead with a tangible: “The Nightcap” — a 60-second written version of each night's read in your inbox by 7:30, plus first dibs on live Q&A." },
        { heading: "The mechanics", items: ["One simple landing page (name + email)", "Link in every bio, pinned comment, and clip end-card", "Verbal CTA in the segment's close, every night", "Auto-welcome email that sets the 7 PM habit"] },
        { heading: "The nudges", items: ["Calendar-add link (“📅 Add 7 PM to your calendar”)", "Notification asks baked into Stories", "Weekly “if you missed it” recap to re-activate", "Refer-a-friend unlock for the Q&A tier"] },
      ],
      tactics: [
        { platform: "LinkedIn", cta: "“Get The Nightcap” link in posts + featured section", how: "Native LI newsletter as a feeder → landing page for email" },
        { platform: "Instagram", cta: "Link in bio + “Sign up” Story sticker + clip end-cards", how: "Link-in-bio page → email capture; DM auto-reply with the link on a keyword" },
        { platform: "YouTube", cta: "Pinned comment, end screen, description link, verbal close", how: "Description / pinned-comment link → landing page; Channel membership for paid tier" },
      ],
      signupTarget:
        "Target for the first 90 days: convert the nightly habit (showing up at 7) into owned contacts (email) and a small paying core (members). Everything else is vanity.",
      ganttLead:
        "June–November 2026. Four tracks: launch & production, marketing, the AI agent build, and the recurring segment-topic clusters that give each week a theme. Filter by track; hover any bar for detail.",
      ganttMonths: [
        { name: "JUN", span: 4 }, { name: "JUL", span: 4 }, { name: "AUG", span: 5 },
        { name: "SEP", span: 4 }, { name: "OCT", span: 4 }, { name: "NOV", span: 5 },
      ],
      ganttTracks: [
        { id: "launch", name: "Launch & Production" },
        { id: "mktg", name: "Marketing & Growth" },
        { id: "agent", name: "AI Agent Build" },
        { id: "topics", name: "Topic Clusters" },
      ],
      ganttTasks: [
        { track: "launch", label: "Format design & run-of-show lock", s: 1, e: 2 },
        { track: "launch", label: "Kit, set & streaming setup", s: 1, e: 3 },
        { track: "launch", label: "Pilot test runs (private)", s: 3, e: 4 },
        { track: "launch", label: "★ LAUNCH WEEK (5 nights)", s: 5, e: 5 },
        { track: "launch", label: "Nightly live segment (sustain)", s: 6, e: 26 },
        { track: "launch", label: "Weekly “best of” recap", s: 8, e: 26 },
        { track: "mktg", label: "Brand assets & landing page", s: 1, e: 2 },
        { track: "mktg", label: "Phase 1 · Tease campaign", s: 3, e: 4 },
        { track: "mktg", label: "Phase 2 · Reveal + trailer drop", s: 4, e: 5 },
        { track: "mktg", label: "Phase 3 · Launch-week blitz", s: 5, e: 6 },
        { track: "mktg", label: "Always-on clipping & cross-post", s: 6, e: 26 },
        { track: "mktg", label: "Newsletter (“The Nightcap”) live", s: 5, e: 26 },
        { track: "mktg", label: "Membership / paid tier opens", s: 12, e: 26 },
        { track: "agent", label: "P1 · Research + draft (manual-assist)", s: 2, e: 5 },
        { track: "agent", label: "P2 · Approve-to-post + scheduling", s: 6, e: 10 },
        { track: "agent", label: "P3 · Multi-platform + auto-clip", s: 10, e: 16 },
        { track: "agent", label: "P4 · Semi-autonomous + tuning", s: 16, e: 26 },
        { track: "topics", label: "Democracy & elections watch", s: 5, e: 14 },
        { track: "topics", label: "Race, justice & policy", s: 5, e: 26 },
        { track: "topics", label: "Economy & everyday cost", s: 7, e: 18 },
        { track: "topics", label: "Culture, media & narrative", s: 6, e: 22 },
        { track: "topics", label: "Courts & the law", s: 9, e: 20 },
        { track: "topics", label: "Election-season surge", s: 18, e: 26 },
        { track: "topics", label: "Year-end “what it all meant”", s: 24, e: 26 },
      ],
      ganttNote:
        "Each column is roughly one week. Topic clusters are seasonal/thematic anchors — the nightly story is always whatever defined the day, but the cluster gives the week a recurring rubric (e.g., a standing “Democracy Watch” Monday or a “Week in Review” Friday).",
      agentLead:
        "A six-times-daily agent that researches the topics you care about online and publishes calibrated posts at 6 AM, 9 AM, 12 PM, 3 PM, 7 PM, and 9 PM — keeping the feed alive all day and building toward the 7 PM live.",
      clock: [
        { time: "6:00", ampm: "AM", name: "The Brief", desc: "Overnight wrap + “what to watch today.” Sets the agenda." },
        { time: "9:00", ampm: "AM", name: "The Build", desc: "Morning developments. Begins tracking the day's lead story." },
        { time: "12:00", ampm: "PM", name: "Midday Pulse", desc: "Where the story stands at lunch + a teaser for tonight." },
        { time: "3:00", ampm: "PM", name: "The Angle", desc: "A deeper data point or counterpoint as the day firms up." },
        { time: "7:00", ampm: "PM", name: "Live Push", desc: "Promotes the live, then posts the evening read recap. The anchor slot.", anchor: true },
        { time: "9:00", ampm: "PM", name: "Prime Clip", desc: "The night's best segment clip at peak evening attention + tomorrow tease." },
      ],
      loop: [
        { n: "01", title: "Watch", body: "Pull from a curated source set — news APIs, RSS, X/social trends, search — filtered to your beats (politics, race, democracy, culture)." },
        { n: "02", title: "Rank", body: "Score stories by relevance to your voice, momentum/recency, and audience fit. Surface the top candidate + 2 backups for the night." },
        { n: "03", title: "Draft", body: "Generate platform-native copy in your voice from a tuned style guide, with source links and a suggested clip/visual." },
        { n: "04", title: "Approve", body: "Route to you (or an editor) via quick mobile approval — Slack/email/text. One tap to ship, edit, or skip." },
        { n: "05", title: "Publish", body: "Post to the scheduled slot on each platform, then log engagement to retrain ranking and copy over time." },
      ],
      humanNote:
        "Human-in-the-loop is the default. For a voice-driven opinion brand, a tap-to-approve gate protects your credibility. Once trust is established, low-risk slots (6 AM brief, 9 PM clip) can graduate to fully automatic.",
      stack: [
        { layer: "Orchestration", job: "Run the 6 daily jobs on a schedule; chain the steps", options: "Cron / a scheduled-task runner, n8n, Make, or a lightweight Python service" },
        { layer: "Research / ingestion", job: "Gather candidate stories on your beats", options: "News APIs (NewsAPI, GDELT), RSS feeds, X/social listening, web search API" },
        { layer: "Reasoning / drafting", job: "Rank stories + write copy in your voice", options: "An LLM (e.g., Claude) with a tuned system prompt + your style guide as context" },
        { layer: "Approval", job: "Get your one-tap yes/no before publishing", options: "Slack bot, email with action buttons, or SMS (Twilio)" },
        { layer: "Publishing", job: "Post to each platform at the right time", options: "Buffer/Hootsuite/Publer APIs, or native platform APIs (LinkedIn, IG Graph, YouTube)" },
        { layer: "Memory / learning", job: "Store what shipped + how it performed", options: "A simple database (Postgres/Airtable) feeding engagement back to improve ranking" },
      ],
      buildPhases: [
        { phase: "Phase 1 · Manual-assist", body: "Agent researches + drafts; you copy-paste and post by hand. Validate the picks and voice before automating anything." },
        { phase: "Phase 2 · Approve-to-post", body: "Add scheduling + one-tap approval. Agent drafts on the 6-slot clock; you approve from your phone; it publishes." },
        { phase: "Phase 3 · Multi-platform", body: "Native per-platform formatting, auto-clipping from the live, engagement logging feeding back into ranking." },
        { phase: "Phase 4 · Semi-autonomous", body: "Low-risk slots run automatically within guardrails; high-stakes posts still gated. Weekly report tunes the model." },
      ],
      guardrails: {
        body: "Because this is an opinion brand under your name: the agent amplifies your judgment; it never replaces it.",
        chips: ["Always cite a source", "No posting on breaking tragedy without human OK", "Voice-match check before send", "Daily volume cap", "Easy kill-switch"],
      },
      disclaimer:
        "This is a working brainstorm and strategy draft for planning purposes — figures, timing, and tooling are starting points to pressure-test, not commitments. Platform APIs and posting-automation policies change often and vary by platform; verify each platform's current automation and live-streaming terms before building.",
    },
  },
];

export type DocKind = "pdf" | "markdown" | "html";

export interface DocAsset {
  id: string;
  title: string;
  blurb: string;
  kind: DocKind;
  /** Public path (PDF/HTML) or content-relative path read server-side (markdown). */
  src: string;
  /** Optional download link (e.g. the original PDF behind a converted HTML doc). */
  download?: string;
}

export const documents: { brand: DocAsset[]; press: DocAsset[] } = {
  brand: [
    {
      id: "brand-guidelines-pdf",
      title: "Brand Guidelines",
      blurb: "The full branded guidelines deck (PDF).",
      kind: "pdf",
      src: "/content/docs/brand-guidelines.pdf",
      download: "/content/docs/brand-guidelines.pdf",
    },
    {
      id: "brand-one-pager",
      title: "Brand One-Pager",
      blurb: "The condensed partnership one-pager (PDF).",
      kind: "pdf",
      src: "/content/docs/brand-one-pager.pdf",
      download: "/content/docs/brand-one-pager.pdf",
    },
    {
      id: "brand-guidelines-md",
      title: "Brand Token Reference",
      blurb: "The live token reference the site/dashboard is built from.",
      kind: "markdown",
      src: "/content/docs/brand-guidelines.md",
    },
  ],
  press: [
    {
      id: "press-kit",
      title: "Press Kit",
      blurb: "The press kit for media and outlets (PDF).",
      kind: "pdf",
      src: "/content/press/press-kit.pdf",
      download: "/content/press/press-kit.pdf",
    },
    {
      id: "outreach-playbook",
      title: "Guest & Audience Outreach Playbook",
      blurb: "Two tracks: booking guests and recruiting founding members. Converted from the source .docx.",
      kind: "html",
      src: "/content/press/outreach-playbook.html",
    },
  ],
};
