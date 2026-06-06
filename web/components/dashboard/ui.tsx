/** Small presentational primitives shared across dashboard pages. */
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${className}`}
    >
      {children}
    </span>
  );
}

export function PageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div>
        <Eyebrow className="text-azure">{kicker}</Eyebrow>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-muted">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-serif text-xl font-semibold tracking-tight text-ink ${className}`}
    >
      {children}
    </h2>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "azure" | "warn" | "live";
}) {
  const tones: Record<string, string> = {
    neutral: "border-line bg-paper text-muted",
    azure: "border-azure/30 bg-azure-tint text-azure-dark",
    warn: "border-amber-300 bg-amber-50 text-amber-700",
    live: "border-azure/40 bg-azure-tint text-azure-dark",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {tone === "live" && (
        <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-azure-bright" />
      )}
      {children}
    </span>
  );
}

export function StatTile({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-azure/30 bg-azure-tint/50"
          : "border-line bg-surface"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink">
        {value}
      </p>
      {sub && <div className="mt-1.5 text-sm text-muted">{sub}</div>}
    </div>
  );
}
