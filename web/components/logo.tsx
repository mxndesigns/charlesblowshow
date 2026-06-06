/**
 * The Charles Blow Show — logo system. See docs/10-brand-guidelines.md.
 * - <Monogram />  the "CB" bug (avatars, favicons, nav)
 * - <Logo />      the horizontal lockup (monogram + wordmark)
 */

export function Monogram({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label="The Charles Blow Show"
      className={className}
    >
      <rect width="40" height="40" rx="9" fill="var(--color-ink)" />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        className="font-serif"
        fontSize="19"
        fontWeight={600}
        fill="var(--color-paper)"
        letterSpacing="-0.5"
      >
        CB
      </text>
      {/* azure byline rule */}
      <rect x="13" y="29.5" width="14" height="2.2" rx="1.1" fill="var(--color-azure-bright)" />
    </svg>
  );
}

export function Logo({
  className = "",
  monogramSize = 30,
}: {
  className?: string;
  monogramSize?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Monogram size={monogramSize} />
      <span className="font-serif text-[1.15rem] font-semibold leading-none tracking-tight text-ink">
        The Charles Blow Show
      </span>
    </span>
  );
}
