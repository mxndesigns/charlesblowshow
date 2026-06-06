"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Segment, SegGanttTask, SegPost } from "@/lib/content/registry";
import { Eyebrow, SectionHeading } from "./ui";
import { InterviewSetup } from "./interview-setup";
import { Monogram } from "@/components/logo";

/**
 * The complete segment playbook, rendered natively in the Charles Blow Show
 * brand (ink / paper / azure) with the playbook's own section navigation built
 * into the page as tabs — Concept · Anatomy · Marketing · Launch Posts ·
 * Sign-Ups · Roadmap · AI Agent. Replaces the off-brand source-HTML embed.
 */

const TABS = [
  { key: "concept", label: "Concept" },
  { key: "anatomy", label: "Anatomy" },
  { key: "setup", label: "Interview Setup" },
  { key: "marketing", label: "Marketing" },
  { key: "posts", label: "Launch Posts" },
  { key: "signup", label: "Sign-Ups" },
  { key: "roadmap", label: "Roadmap" },
  { key: "agent", label: "AI Agent" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function SegmentDetail({ segment }: { segment: Segment }) {
  const [tab, setTab] = useState<TabKey>("concept");

  return (
    <div className="space-y-8">
      {/* Tabs — the playbook's section nav, in the page structure */}
      <div className="sticky top-0 z-30 -mx-1 overflow-x-auto bg-paper/90 py-2 backdrop-blur">
        <div role="tablist" className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                tab === t.key
                  ? "bg-ink text-paper"
                  : "text-muted hover:bg-azure-tint/50 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {tab === "concept" && <ConceptTab segment={segment} />}
        {tab === "anatomy" && <AnatomyTab segment={segment} />}
        {tab === "setup" && <InterviewSetup />}
        {tab === "marketing" && <MarketingTab segment={segment} />}
        {tab === "posts" && <PostsTab segment={segment} />}
        {tab === "signup" && <SignupTab segment={segment} />}
        {tab === "roadmap" && <RoadmapTab segment={segment} />}
        {tab === "agent" && <AgentTab segment={segment} />}
      </div>
    </div>
  );
}

/* ───────────────────────── Concept ───────────────────────── */

function ConceptTab({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <div>
          <Eyebrow className="text-azure">The Segment</Eyebrow>
          <p className="mt-2 max-w-3xl text-lg text-slate-700">{segment.lead}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {segment.concept.map((c) => (
            <div key={c.label} className="rounded-2xl border border-line bg-surface p-5">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-azure">
                {c.label}
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-ink">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <Eyebrow className="text-azure">The Case</Eyebrow>
          <SectionHeading className="mt-1">Why it works</SectionHeading>
        </div>
        <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {segment.why.map((r) => (
            <div key={r.title} className="border-b border-dashed border-line pb-3">
              <span className="font-semibold text-ink">{r.title}.</span>{" "}
              <span className="text-muted">{r.body}</span>
            </div>
          ))}
        </div>
        <Bet text={segment.bet} />
      </section>
    </div>
  );
}

/* ───────────────────────── Anatomy ───────────────────────── */

function AnatomyTab({ segment }: { segment: Segment }) {
  return (
    <div className="space-y-10">
      <section className="space-y-5">
        <div>
          <Eyebrow className="text-azure">Run of Show</Eyebrow>
          <SectionHeading className="mt-1">Anatomy of the ten minutes</SectionHeading>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            A repeatable structure viewers learn to expect. Same beats every time; only the story changes.
          </p>
        </div>
        <ol>
          {segment.beats.map((b) => (
            <li
              key={b.time}
              className="grid grid-cols-[64px_1fr] gap-4 border-l-2 border-azure py-3.5 pl-4 sm:grid-cols-[88px_1fr]"
            >
              <div>
                <span className="font-serif text-lg font-bold text-azure">{b.time}</span>
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted">
                  {b.phase}
                </span>
              </div>
              <div>
                <span className="font-semibold text-ink">{b.title}.</span>{" "}
                <span className="text-muted">{b.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-5">
        <div>
          <Eyebrow className="text-azure">Production</Eyebrow>
          <SectionHeading className="mt-1">How it gets made</SectionHeading>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {segment.trios.map((t) => (
            <div key={t.heading} className="rounded-2xl border border-line bg-surface p-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
                {t.heading}
              </h4>
              <ul className="mt-3 space-y-2">
                {t.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="mt-0.5 shrink-0 font-bold text-azure">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ───────────────────────── Marketing ───────────────────────── */

function MarketingTab({ segment }: { segment: Segment }) {
  const p = segment.playbook;
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow className="text-azure">Go-To-Market</Eyebrow>
        <SectionHeading className="mt-1">Across all three platforms</SectionHeading>
        <p className="mt-2 max-w-3xl text-muted">{p.marketingLead}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {p.platforms.map((plat) => (
          <div key={plat.key} className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="border-t-4 border-azure p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-xs font-bold uppercase text-paper">
                  {plat.key}
                </span>
                <div>
                  <p className="font-semibold text-ink">{plat.name}</p>
                  <p className="text-xs text-muted">{plat.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{plat.feel}</p>
              <h4 className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
                Cadence
              </h4>
              <ul className="mt-2 space-y-1.5">
                {plat.cadence.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-muted">
                    <span className="mt-0.5 shrink-0 font-bold text-azure">›</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <h4 className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600">
                Launch beat
              </h4>
              <p className="mt-1.5 text-sm text-muted">{plat.launchBeat}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <SectionHeading>The launch arc — week to week</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.arc.map((a, i) => (
            <div key={a.phase} className="rounded-2xl border border-line bg-surface p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-azure-tint px-2.5 py-0.5 text-xs font-semibold text-azure-dark">
                <span className="font-mono">{i + 1}</span>
                {a.phase.replace(/^Phase \d+ · /, "")}
              </span>
              <p className="mt-3 text-sm text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-ink p-6 text-paper">
        <h3 className="font-serif text-xl font-semibold text-paper">One rule that ties it together</h3>
        <p className="mt-2 text-paper/80">{p.oneRule.body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.oneRule.chips.map((chip) => (
            <span key={chip} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-azure-bright">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Launch Posts ───────────────────────── */

function PostsTab({ segment }: { segment: Segment }) {
  const p = segment.playbook;
  const [copied, setCopied] = useState<number | null>(null);

  async function copy(i: number, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1800);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Eyebrow className="text-azure">Copy You Can Ship</Eyebrow>
        <SectionHeading className="mt-1">The launch posts</SectionHeading>
        <p className="mt-2 max-w-2xl text-muted">
          Platform-native versions of the announcement, same message. Copy any one.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {p.posts.map((post, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-[0.6rem] font-bold uppercase text-paper">
                {post.platform.slice(0, 2)}
              </span>
              <span className="text-sm font-semibold text-ink">{post.platform}</span>
              <span className="text-xs text-muted">· {post.kind}</span>
              <button
                onClick={() => copy(i, post.body)}
                className="ml-auto rounded-md border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink transition hover:border-azure/60 hover:text-azure"
              >
                {copied === i ? "Copied ✓" : "Copy"}
              </button>
            </div>
            {/* Animated example post */}
            <div className="border-b border-line bg-paper/60 px-4 py-4">
              <PostPreview post={post} />
            </div>
            <p className="whitespace-pre-wrap px-4 py-4 text-sm leading-relaxed text-slate-700">
              {post.body}
            </p>
          </div>
        ))}
      </div>
      <p className="rounded-xl border border-line bg-azure-tint/40 px-4 py-3 text-sm text-slate-700">
        <span className="font-semibold text-ink">Tip:</span> {p.postsTip}
      </p>
    </div>
  );
}

/* ───────────────────────── Sign-Ups ───────────────────────── */

const FUNNEL_COLORS = ["#00b2f4", "#0090cc", "#0a6a94", "#2a2d36", "#14161d"];

function SignupTab({ segment }: { segment: Segment }) {
  const p = segment.playbook;
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow className="text-azure">Audience Building</Eyebrow>
        <SectionHeading className="mt-1">Getting people to sign up</SectionHeading>
        <p className="mt-2 max-w-3xl text-muted">{p.signupLead}</p>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <h3 className="mb-4 font-serif text-lg font-semibold text-ink">The conversion funnel</h3>
        <div className="space-y-2">
          {p.funnel.map((f, i) => (
            <div key={f.label} className="grid items-center gap-3 sm:grid-cols-[160px_1fr]">
              <div>
                <p className="text-sm font-semibold text-ink">{f.label}</p>
                <p className="text-xs text-muted">{f.sub}</p>
              </div>
              <div
                className="flex h-10 items-center rounded-lg px-4 text-sm font-semibold text-white"
                style={{ width: `${f.pct}%`, background: FUNNEL_COLORS[i] }}
              >
                {f.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {p.signupCards.map((c) => (
          <div key={c.heading} className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-serif text-lg font-semibold text-ink">{c.heading}</h3>
            {c.body && <p className="mt-2 text-sm text-muted">{c.body}</p>}
            {c.items && (
              <ul className="mt-3 space-y-2">
                {c.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <span className="mt-0.5 shrink-0 font-bold text-azure">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div>
        <SectionHeading>Sign-up tactics by platform</SectionHeading>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-paper text-left text-xs uppercase tracking-[0.08em] text-slate-600">
                <th className="px-4 py-3 font-semibold">Platform</th>
                <th className="px-4 py-3 font-semibold">Primary CTA</th>
                <th className="px-4 py-3 font-semibold">How they sign up</th>
              </tr>
            </thead>
            <tbody>
              {p.tactics.map((t) => (
                <tr key={t.platform} className="border-t border-line bg-surface align-top">
                  <td className="px-4 py-3 font-semibold text-ink">{t.platform}</td>
                  <td className="px-4 py-3 text-muted">{t.cta}</td>
                  <td className="px-4 py-3 text-muted">{t.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Bet text={p.signupTarget} />
    </div>
  );
}

/* ───────────────────────── Roadmap (Gantt) ───────────────────────── */

const TRACK_COLORS: Record<string, string> = {
  launch: "#0090cc",
  mktg: "#14161d",
  agent: "#00b2f4",
  topics: "#6c7077",
};

function RoadmapTab({ segment }: { segment: Segment }) {
  const p = segment.playbook;
  const weeks = useMemo(
    () => p.ganttMonths.reduce((sum, m) => sum + m.span, 0),
    [p.ganttMonths]
  );
  const [filter, setFilter] = useState<string>("all");

  const tasksByTrack = (id: string) => p.ganttTasks.filter((t) => t.track === id);

  return (
    <div className="space-y-5">
      <div>
        <Eyebrow className="text-azure">6-Month Roadmap</Eyebrow>
        <SectionHeading className="mt-1">Launch & topic Gantt</SectionHeading>
        <p className="mt-2 max-w-3xl text-muted">{p.ganttLead}</p>
      </div>

      {/* Track filters */}
      <div className="flex flex-wrap gap-2">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")} color="#14161d">
          All tracks
        </FilterButton>
        {p.ganttTracks.map((tr) => (
          <FilterButton
            key={tr.id}
            active={filter === tr.id}
            onClick={() => setFilter(tr.id)}
            color={TRACK_COLORS[tr.id]}
            dot
          >
            {tr.name}
          </FilterButton>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[920px] border-collapse text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 min-w-[230px] border-b border-line bg-ink px-3 py-2 text-left text-paper">
                Workstream
              </th>
              {p.ganttMonths.map((m) => (
                <th
                  key={m.name}
                  colSpan={m.span}
                  className="border-b border-line bg-ink px-1 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-azure-bright"
                >
                  {m.name}
                </th>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-10 border-b border-line bg-ink px-3 py-1" />
              {Array.from({ length: weeks }, (_, i) => (
                <th key={i} className="border-b border-line bg-ink px-0 py-1 text-[0.55rem] font-normal text-paper/40">
                  W{i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {p.ganttTracks
              .filter((tr) => filter === "all" || filter === tr.id)
              .map((tr) => (
                <GanttTrackRows
                  key={tr.id}
                  trackName={tr.name}
                  color={TRACK_COLORS[tr.id]}
                  tasks={tasksByTrack(tr.id)}
                  weeks={weeks}
                />
              ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted">{p.ganttNote}</p>
    </div>
  );
}

function GanttTrackRows({
  trackName,
  color,
  tasks,
  weeks,
}: {
  trackName: string;
  color: string;
  tasks: SegGanttTask[];
  weeks: number;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={weeks + 1}
          className="bg-paper px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink"
        >
          {trackName}
        </td>
      </tr>
      {tasks.map((t) => {
        const left = ((t.s - 1) / weeks) * 100;
        const width = ((t.e - t.s + 1) / weeks) * 100;
        const dur = t.e - t.s + 1;
        const label = t.label.replace("★ ", "");
        return (
          <tr key={t.label}>
            <td className="sticky left-0 z-10 min-w-[230px] whitespace-nowrap border-r border-line bg-surface px-3 py-1.5 font-medium text-slate-700">
              {t.label}
            </td>
            <td colSpan={weeks} className="p-0">
              <div className="relative h-8">
                <div
                  className="absolute top-1.5 flex h-5 items-center overflow-hidden whitespace-nowrap rounded px-2 text-[0.6rem] font-semibold text-white"
                  style={{ left: `${left}%`, width: `calc(${width}% - 4px)`, background: color }}
                  title={`${t.label} · Week ${t.s}–${t.e} (${dur} wk${dur > 1 ? "s" : ""})`}
                >
                  {dur >= 2 ? label : ""}
                </div>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}

function FilterButton({
  active,
  onClick,
  color,
  dot = false,
  children,
}: {
  active: boolean;
  onClick: () => void;
  color: string;
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition"
      style={
        active
          ? { background: color, color: "#fff", borderColor: "transparent" }
          : { background: "#fff", color: "#2a2d36", borderColor: "#e7e3d9" }
      }
    >
      {dot && (
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: active ? "#fff" : color }} />
      )}
      {children}
    </button>
  );
}

/* ───────────────────────── AI Agent ───────────────────────── */

function AgentTab({ segment }: { segment: Segment }) {
  const p = segment.playbook;
  return (
    <div className="space-y-9">
      <div>
        <Eyebrow className="text-azure">Automation</Eyebrow>
        <SectionHeading className="mt-1">The AI research & posting agent</SectionHeading>
        <p className="mt-2 max-w-3xl text-muted">{p.agentLead}</p>
      </div>

      {/* Daily clock */}
      <div>
        <SectionHeading>The daily posting clock</SectionHeading>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {p.clock.map((s) => (
            <div
              key={s.time + s.ampm}
              className={`rounded-xl border p-4 text-center ${
                s.anchor ? "border-azure bg-azure-tint/40 ring-1 ring-azure/30" : "border-line bg-surface"
              }`}
            >
              <p className="font-serif text-xl font-bold text-azure">
                {s.time}
                <span className="ml-0.5 text-xs text-muted">{s.ampm}</span>
              </p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-slate-600">
                {s.anchor ? "★ " : ""}
                {s.name}
              </p>
              <p className="mt-1 text-xs text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The loop */}
      <div>
        <SectionHeading>How the agent works — the loop</SectionHeading>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {p.loop.map((s) => (
            <div key={s.n} className="rounded-xl border border-line bg-surface p-4">
              <span className="font-serif text-base font-bold text-azure-bright">{s.n}</span>
              <p className="mt-0.5 font-semibold text-ink">{s.title}</p>
              <p className="mt-1 text-xs text-muted">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          <span className="font-semibold text-ink">Human-in-the-loop is the default.</span>{" "}
          {p.humanNote.replace("Human-in-the-loop is the default. ", "")}
        </p>
      </div>

      {/* Stack */}
      <div>
        <SectionHeading>Suggested technical stack</SectionHeading>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-paper text-left text-xs uppercase tracking-[0.08em] text-slate-600">
                <th className="px-4 py-3 font-semibold">Layer</th>
                <th className="px-4 py-3 font-semibold">Job</th>
                <th className="px-4 py-3 font-semibold">Practical options</th>
              </tr>
            </thead>
            <tbody>
              {p.stack.map((row) => (
                <tr key={row.layer} className="border-t border-line bg-surface align-top">
                  <td className="px-4 py-3 font-semibold text-ink">{row.layer}</td>
                  <td className="px-4 py-3 text-muted">{row.job}</td>
                  <td className="px-4 py-3 text-muted">{row.options}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Build roadmap */}
      <div>
        <SectionHeading>Build roadmap (phased)</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.buildPhases.map((a, i) => (
            <div key={a.phase} className="rounded-2xl border border-line bg-surface p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-azure-tint px-2.5 py-0.5 text-xs font-semibold text-azure-dark">
                <span className="font-mono">{i + 1}</span>
                {a.phase.replace(/^Phase \d+ · /, "")}
              </span>
              <p className="mt-3 text-sm text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Guardrails */}
      <div className="rounded-2xl bg-ink p-6 text-paper">
        <h3 className="font-serif text-xl font-semibold text-paper">Guardrails worth hard-coding</h3>
        <p className="mt-2 text-paper/80">{p.guardrails.body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.guardrails.chips.map((chip) => (
            <span key={chip} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-azure-bright">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <p className="border-t border-line pt-5 text-xs italic text-muted">{p.disclaimer}</p>
    </div>
  );
}

/* ───────────────── Animated post previews ───────────────── */

function snippet(body: string, n = 130): string {
  const clean = body.replace(/\s+/g, " ").trim();
  return clean.length > n ? clean.slice(0, n).trimEnd() + "…" : clean;
}

function PostPreview({ post }: { post: SegPost }) {
  if (post.platform === "LinkedIn") return <LinkedInPreview body={post.body} />;
  if (post.platform === "YouTube") return <YouTubePreview body={post.body} />;
  return post.kind.toLowerCase().includes("story") ? (
    <StoryPreview body={post.body} />
  ) : (
    <ReelPreview body={post.body} />
  );
}

function LinkedInPreview({ body }: { body: string }) {
  return (
    <div className="post-pop rounded-xl border border-line bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Monogram size={32} />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">Charles Blow</p>
          <p className="text-[11px] text-muted">Columnist · now · 🌐</p>
        </div>
      </div>
      <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-slate-700">
        {snippet(body, 150)}
      </p>
      <div className="mt-3 flex items-center gap-4 border-t border-line pt-2 text-[11px] text-muted">
        <span className="inline-flex items-center gap-1 font-semibold text-azure">
          <span className="post-heart inline-block">👍</span> Like
        </span>
        <span>💬 Comment</span>
        <span>↻ Repost</span>
        <span>➤ Send</span>
      </div>
    </div>
  );
}

function YouTubePreview({ body }: { body: string }) {
  return (
    <div className="post-pop overflow-hidden rounded-xl border border-line bg-white shadow-sm">
      <div className="relative aspect-video bg-gradient-to-br from-ink-soft to-ink">
        <span className="absolute left-2 top-2 rounded bg-azure px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
          Premieres
        </span>
        <div className="absolute inset-0 grid place-items-center">
          <span className="post-play grid h-10 w-14 place-items-center rounded-lg bg-white/90 text-lg text-ink">
            ▶
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <div className="post-progress h-full bg-azure-bright" />
        </div>
      </div>
      <div className="flex gap-2 p-2.5">
        <Monogram size={26} />
        <div className="min-w-0">
          <p className="line-clamp-2 text-[12px] font-semibold text-ink">{snippet(body, 70)}</p>
          <p className="text-[11px] text-muted">The Charles Blow Show · premiere</p>
        </div>
      </div>
    </div>
  );
}

function ReelPreview({ body }: { body: string }) {
  return (
    <div className="post-pop relative mx-auto aspect-[9/16] w-1/2 min-w-[150px] overflow-hidden rounded-xl bg-gradient-to-b from-ink-soft to-ink shadow-sm">
      <span className="absolute left-2 top-2 text-[10px] font-semibold text-white/90">Reels</span>
      {/* CB logo bug */}
      <span className="absolute right-2 top-2 inline-flex rounded-md bg-white/95 p-0.5 ring-1 ring-black/10">
        <Monogram size={18} />
      </span>
      <div className="absolute inset-0 grid place-items-center">
        <span className="post-play grid h-12 w-12 place-items-center rounded-full bg-white/90 text-ink">
          ▶
        </span>
      </div>
      <div className="absolute bottom-16 right-2 flex flex-col items-center gap-3 text-white">
        <span className="post-heart text-lg">♥</span>
        <span className="text-sm">💬</span>
        <span className="text-sm">➤</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2.5">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex rounded-md bg-white p-0.5">
            <Monogram size={16} />
          </span>
          <p className="text-[10px] font-semibold text-white">@charlesblowshow</p>
        </div>
        <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-white/85">{snippet(body, 80)}</p>
      </div>
    </div>
  );
}

function StoryPreview({ body }: { body: string }) {
  return (
    <div className="post-pop relative mx-auto aspect-[9/16] w-1/2 min-w-[150px] overflow-hidden rounded-xl bg-gradient-to-b from-azure-dark to-ink shadow-sm">
      <div className="absolute inset-x-2 top-2">
        <div className="flex gap-1">
          <span className="h-0.5 flex-1 rounded bg-white/80" />
          <span className="h-0.5 flex-1 rounded bg-white/30" />
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="inline-flex rounded-md bg-white p-0.5">
            <Monogram size={16} />
          </span>
          <span className="text-[10px] font-semibold text-white">charlesblowshow</span>
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid h-20 w-20 place-items-center">
          <span className="post-ring absolute inset-0 rounded-full border-2 border-dashed border-azure-bright/70" />
          <div className="text-center text-white">
            <p className="font-serif text-2xl font-bold leading-none">3</p>
            <p className="text-[9px] uppercase tracking-wide">days</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <p className="line-clamp-2 text-[10px] leading-snug text-white/90">{snippet(body, 70)}</p>
      </div>
    </div>
  );
}

/* ───────────────────────── shared ───────────────────────── */

function Bet({ text }: { text: string }) {
  return (
    <blockquote className="rounded-r-xl border-l-4 border-azure-bright bg-azure-tint/40 px-5 py-4 font-serif text-lg italic text-slate-700">
      {text}
    </blockquote>
  );
}
