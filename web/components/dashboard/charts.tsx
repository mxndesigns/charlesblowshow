/** Dependency-free SVG charts. Pure/server-safe — no client JS. */

export function Sparkline({
  data,
  width = 120,
  height = 32,
  className = "text-azure",
}: {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}) {
  if (data.length < 2) {
    return <svg width={width} height={height} aria-hidden />;
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = i * stepX;
    const y = height - ((d - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  const [lastX, lastY] = pts[pts.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <path d={area} fill="currentColor" opacity={0.12} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r={2.4} fill="currentColor" />
    </svg>
  );
}

/** Horizontal stacked bar showing a revenue split. */
export function SplitBar({
  segments,
}: {
  segments: { label: string; value: number; className: string }[];
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-line">
      {segments.map((s) => (
        <div
          key={s.label}
          className={s.className}
          style={{ width: `${(s.value / total) * 100}%` }}
          title={`${s.label}: ${Math.round((s.value / total) * 100)}%`}
        />
      ))}
    </div>
  );
}

/** Vertical bar chart for the 12-month projection. */
export function BarChart({
  data,
  height = 180,
  className = "text-azure",
}: {
  data: { label: string; value: number }[];
  height?: number;
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1;
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex w-full flex-1 items-end">
            <div
              className={`w-full rounded-t bg-current ${className}`}
              style={{ height: `${Math.max((d.value / max) * 100, 1)}%` }}
              title={d.label}
            />
          </div>
          <span className="text-[0.6rem] font-medium text-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
