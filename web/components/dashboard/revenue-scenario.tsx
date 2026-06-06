"use client";

import { useMemo, useState } from "react";
import {
  DEFAULT_ASSUMPTIONS,
  forecastAtScale,
  type Assumptions,
} from "@/lib/revenue/model";
import {
  formatCurrency,
  formatCurrencyCompact,
  formatNumber,
  formatPercent,
} from "@/lib/format";
import { SplitBar } from "./charts";

type PresetKey = "live" | "base" | "stretch";

const PRESETS: { key: PresetKey; label: string; value?: number }[] = [
  { key: "live", label: "Live now" },
  { key: "base", label: "10k (base)", value: 10_000 },
  { key: "stretch", label: "100k (stretch)", value: 100_000 },
];

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="font-semibold text-ink">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-azure"
      />
    </label>
  );
}

export function RevenueScenario({
  liveSubscribers,
}: {
  liveSubscribers: number;
}) {
  const [preset, setPreset] = useState<PresetKey>(
    liveSubscribers > 0 ? "live" : "base"
  );
  const [a, setA] = useState<Assumptions>(DEFAULT_ASSUMPTIONS);

  const subscribers =
    preset === "live"
      ? liveSubscribers
      : PRESETS.find((p) => p.key === preset)?.value ?? liveSubscribers;

  const f = useMemo(() => forecastAtScale(a, subscribers), [a, subscribers]);

  const set = <K extends keyof Assumptions>(key: K, value: Assumptions[K]) =>
    setA((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      {/* Scenario selector */}
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => {
          const disabled = p.key === "live" && liveSubscribers <= 0;
          return (
            <button
              key={p.key}
              disabled={disabled}
              onClick={() => setPreset(p.key)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                preset === p.key
                  ? "border-azure bg-azure text-white"
                  : "border-line bg-surface text-ink hover:border-azure/60"
              }`}
            >
              {p.label}
              {p.key === "live" && liveSubscribers > 0 && (
                <span className="ml-1.5 opacity-80">
                  ({formatNumber(liveSubscribers)})
                </span>
              )}
            </button>
          );
        })}
        <span className="ml-auto text-sm text-muted">
          Modeling{" "}
          <span className="font-semibold text-ink">
            {formatNumber(subscribers)}
          </span>{" "}
          subscribers
        </span>
      </div>

      {preset === "stretch" && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
          ⚠️ <strong>Stretch scenario.</strong> The shipped model targets 10k by
          month 12; 100k is an extrapolation beyond it — treat as upside, not the
          base plan.
        </p>
      )}

      {/* Headline outputs */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-azure/30 bg-azure-tint/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-azure-dark">
            Blended monthly
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink">
            {formatCurrencyCompact(f.blended)}
          </p>
          <p className="mt-1 text-sm text-muted">{formatCurrency(f.blended)}/mo</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            ARR (membership)
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink">
            {formatCurrencyCompact(f.arr)}
          </p>
          <p className="mt-1 text-sm text-muted">
            MRR {formatCurrency(f.mrr)}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Paying members
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink">
            {formatNumber(f.members)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {formatNumber(f.memberTier)} Member · {formatNumber(f.foundingTier)}{" "}
            Founding
          </p>
        </div>
      </div>

      {/* Revenue split across the three legs */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-ink">
            Revenue split
          </h3>
          <span className="text-sm text-muted">
            {formatCurrency(f.blended)}/mo total
          </span>
        </div>
        <div className="mt-4">
          <SplitBar
            segments={[
              { label: "Membership", value: f.membership, className: "bg-azure" },
              { label: "Sponsorship", value: f.sponsorship, className: "bg-ink" },
              { label: "Platform / ad", value: f.platform, className: "bg-azure-bright" },
            ]}
          />
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <LegStat
            dot="bg-azure"
            label="Membership"
            value={f.membership}
            share={f.split.membership}
          />
          <LegStat
            dot="bg-ink"
            label="Sponsorship"
            value={f.sponsorship}
            share={f.split.sponsorship}
          />
          <LegStat
            dot="bg-azure-bright"
            label="Platform / ad"
            value={f.platform}
            share={f.split.platform}
          />
        </div>
      </div>

      {/* Editable assumptions */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-ink">
            Assumptions
          </h3>
          <button
            onClick={() => setA(DEFAULT_ASSUMPTIONS)}
            className="text-sm font-semibold text-azure hover:text-azure-dark"
          >
            Reset
          </button>
        </div>
        <p className="mt-1 text-sm text-muted">
          Drag to model the funnel — outputs above recompute live. Mirrors the
          xlsx Assumptions sheet.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Slider
            label="View → email signup"
            value={a.viewToEmail}
            min={0.005}
            max={0.06}
            step={0.001}
            display={formatPercent(a.viewToEmail, 1)}
            onChange={(v) => set("viewToEmail", v)}
          />
          <Slider
            label="Email → paid member"
            value={a.emailToPaid}
            min={0.01}
            max={0.1}
            step={0.005}
            display={formatPercent(a.emailToPaid, 1)}
            onChange={(v) => set("emailToPaid", v)}
          />
          <Slider
            label="Monthly churn"
            value={a.monthlyChurn}
            min={0.01}
            max={0.12}
            step={0.005}
            display={formatPercent(a.monthlyChurn, 1)}
            onChange={(v) => set("monthlyChurn", v)}
          />
          <Slider
            label="Views per subscriber / mo"
            value={a.viewsPerSubscriber}
            min={1}
            max={12}
            step={0.5}
            display={`${a.viewsPerSubscriber}×`}
            onChange={(v) => set("viewsPerSubscriber", v)}
          />
          <Slider
            label="Share on Member tier"
            value={a.shareMemberTier}
            min={0.5}
            max={1}
            step={0.05}
            display={formatPercent(a.shareMemberTier, 0)}
            onChange={(v) => set("shareMemberTier", v)}
          />
          <Slider
            label="Members on annual billing"
            value={a.shareAnnual}
            min={0}
            max={1}
            step={0.05}
            display={formatPercent(a.shareAnnual, 0)}
            onChange={(v) => set("shareAnnual", v)}
          />
          <Slider
            label="Sponsor sell-through"
            value={a.sellThrough}
            min={0}
            max={1}
            step={0.05}
            display={formatPercent(a.sellThrough, 0)}
            onChange={(v) => set("sellThrough", v)}
          />
          <Slider
            label="Platform RPM"
            value={a.rpm}
            min={1}
            max={15}
            step={0.5}
            display={formatCurrency(a.rpm)}
            onChange={(v) => set("rpm", v)}
          />
        </div>
      </div>
    </div>
  );
}

function LegStat({
  dot,
  label,
  value,
  share,
}: {
  dot: string;
  label: string;
  value: number;
  share: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <span className="text-sm font-medium text-muted">{label}</span>
      </div>
      <p className="mt-1 font-serif text-2xl font-semibold text-ink">
        {formatCurrency(value)}
      </p>
      <p className="text-xs text-muted">{formatPercent(share, 0)} of blended</p>
    </div>
  );
}
