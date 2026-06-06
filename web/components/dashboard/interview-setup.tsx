import Image from "next/image";
import { Eyebrow, SectionHeading } from "./ui";
import { Monogram } from "@/components/logo";

interface RefShot {
  src: string;
  title: string;
  caption: string;
}
interface RefGroup {
  heading: string;
  note: string;
  shots: RefShot[];
}

const REF = "/content/setup-references";

const REFERENCE_GROUPS: RefGroup[] = [
  {
    heading: "Solo — the daily read",
    note: "The everyday format: one host, one story. Frame wide with room to breathe.",
    shots: [
      {
        src: `${REF}/WideShot_Solo_StraightOn.png`,
        title: "Straight-on wide",
        caption:
          "Host centered to the lens, mic in frame, warm practicals and an LED bar behind for depth and separation from the wall.",
      },
      {
        src: `${REF}/Angled_Wide.png`,
        title: "Angled wide",
        caption:
          "Host on the third, body angled in, shallow depth of field — leaves clean negative space for floating graphics.",
      },
    ],
  },
  {
    heading: "Guest — The Evening Show",
    note: "The interview format: host + guest across a round table, twin mics, cut between angles.",
    shots: [
      {
        src: `${REF}/GuestSetup_WideShot.png`,
        title: "Two-shot establishing",
        caption:
          "Host and guest across a round table, twin boom mics, RGB wall wash. The wide that sets the room.",
      },
      {
        src: `${REF}/Guest_OverheadShot.png`,
        title: "Over-the-shoulder · guest",
        caption:
          "Cross-table angle favoring the guest — the listening reverse for their answers.",
      },
      {
        src: `${REF}/Guest_OverheadShot_Angled.png`,
        title: "Over-the-shoulder · host",
        caption:
          "Reverse favoring the host, angled — cut between these two for conversational rhythm.",
      },
    ],
  },
  {
    heading: "Production & streaming",
    note: "How it's captured and pushed live.",
    shots: [
      {
        src: `${REF}/Streamyards_Callout.png`,
        title: "StreamYard layout",
        caption:
          "How the live two-up is composed and streamed — the guest/multi-cam control surface that runs the show.",
      },
      {
        src: `${REF}/BTS-Shots.png`,
        title: "Behind the scenes",
        caption:
          "Camera framing and exposure dialed in on the rig — the cinematic look set at capture, not in post.",
      },
    ],
  },
];

/**
 * Interview / production setup guidance for the show — rendered natively in the
 * CBS brand with schematic SVG illustrations of how the shot is framed, lit, and
 * how the floating graphics sit. Built as data so more options can be added.
 */

interface SetupPoint {
  label: string;
  body: string;
}
interface SetupGroup {
  icon: string;
  title: string;
  intro?: string;
  points: SetupPoint[];
}
interface SetupOption {
  n: string;
  title: string;
  variant: string;
  tagline: string;
  groups: SetupGroup[];
}

const OPTIONS: SetupOption[] = [
  {
    n: "01",
    title: "The Solo Commentator",
    variant: "Wide Shot + Floating Graphics",
    tagline:
      "An “environmental portrait” look. A pure wide shot can feel distant — so frame the host off-center for an intentional, modern composition that leaves a natural “canvas” for visual callouts.",
    groups: [
      {
        icon: "🎥",
        title: "Shooting & Framing",
        points: [
          {
            label: "Camera angle",
            body: "Single camera at eye level or slightly below (a commanding presence), using a medium-wide lens — around 24mm or 35mm on a full-frame sensor.",
          },
          {
            label: "Composition — the 60/40 split",
            body: "Sit on the left or right third of the frame (rule of thirds). Framed on the left, angle your body slightly toward the right, looking just off-camera or directly into the lens.",
          },
          {
            label: "Negative space",
            body: "The empty 40% of the frame is your graphics zone.",
          },
        ],
      },
      {
        icon: "💡",
        title: "Lighting Setup",
        intro:
          "A wide shot captures more of the room, so the lighting has to control the mood of the whole space — not just your face.",
        points: [
          {
            label: "Key light",
            body: "A large, soft source (like a 36-inch softbox) at a 45° angle from your face, slightly above eye level. It leaves a soft shadow on one side for cinematic depth.",
          },
          {
            label: "Fill light / reflector",
            body: "Opposite the key light, to subtly soften the shadows — keeping the look clean and accessible.",
          },
          {
            label: "Background / practical lights",
            body: "Clean, minimal practicals behind the empty space (a dim, warm desk lamp or a diffused LED bar) for depth and separation between you and the wall.",
          },
        ],
      },
      {
        icon: "📊",
        title: "Graphic Integration",
        points: [
          {
            label: "The look",
            body: "Clean, borderless pop-up cards or minimalist text callouts.",
          },
          {
            label: "Placement",
            body: "Hovering in the open third opposite you, level with chest or shoulder height.",
          },
          {
            label: "Execution",
            body: "Keep the area behind the graphic clean or slightly out of focus (shallow depth of field) so the text stays highly readable.",
          },
        ],
      },
    ],
  },
];

export function InterviewSetup() {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow className="text-azure">Production</Eyebrow>
        <SectionHeading className="mt-1">Interview setup</SectionHeading>
        <p className="mt-2 max-w-3xl text-muted">
          How the show could look on camera — framing, lighting, and where the
          on-screen graphics sit. Schematic references, not final set design.
        </p>
      </div>

      {/* Reference clip */}
      <figure className="overflow-hidden rounded-2xl border border-line bg-ink">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="live-dot inline-block h-2 w-2 rounded-full bg-azure-bright" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-azure-bright">
            Reference clip
          </span>
          <span className="text-sm font-medium text-paper/70">
            The Evening Show — look &amp; motion test
          </span>
        </div>
        <div className="relative">
          <video
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-black"
            src="/content/video/evening-show-reference.mp4"
          >
            Your browser doesn&apos;t support embedded video.{" "}
            <a href="/content/video/evening-show-reference.mp4" className="text-azure-bright underline">
              Download the clip
            </a>
            .
          </video>
          {/* Animated logo bug — bottom-right */}
          <div
            className="logo-bug pointer-events-none absolute bottom-4 right-4 z-10 flex items-center gap-2"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.55))" }}
            aria-hidden
          >
            <span className="logo-bug-glow inline-flex rounded-[8px] ring-1 ring-white/20">
              <Monogram size={30} />
            </span>
            <span className="logo-bug-word font-serif text-[0.85rem] font-semibold leading-none text-white whitespace-nowrap">
              The Charles Blow Show
            </span>
          </div>
        </div>
        <figcaption className="px-5 py-3 text-sm text-paper/60">
          A motion reference for the on-camera look — wide framing with room for
          floating graphics. The shots below break down the setup; the diagrams
          further down show how to frame, light, and place callouts to match it.
        </figcaption>
      </figure>

      {/* Reference shots */}
      <section className="space-y-6">
        <div>
          <Eyebrow className="text-azure">Reference Shots</Eyebrow>
          <SectionHeading className="mt-1">What the setup looks like</SectionHeading>
          <p className="mt-2 max-w-3xl text-muted">
            Real-world references for the two formats and how they&apos;re shot —
            the look to aim for across solo days and guest nights.
          </p>
        </div>

        {REFERENCE_GROUPS.map((group) => (
          <div key={group.heading} className="space-y-3">
            <div>
              <h3 className="font-serif text-lg font-semibold text-ink">{group.heading}</h3>
              <p className="text-sm text-muted">{group.note}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.shots.map((shot) => (
                <a
                  key={shot.src}
                  href={shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-azure/60 hover:shadow-sm"
                >
                  <div className="relative aspect-video overflow-hidden bg-ink">
                    <Image
                      src={shot.src}
                      alt={shot.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-sm font-semibold text-ink transition group-hover:text-azure">
                      {shot.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{shot.caption}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {OPTIONS.map((opt) => (
        <article key={opt.n} className="overflow-hidden rounded-2xl border border-line bg-surface">
          {/* Option header */}
          <div className="flex items-baseline gap-3 border-b border-line bg-paper px-6 py-4">
            <span className="font-serif text-2xl font-bold text-azure">{opt.n}</span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-ink">{opt.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {opt.variant}
              </p>
            </div>
          </div>

          <div className="space-y-8 p-6">
            <p className="max-w-3xl text-slate-700">{opt.tagline}</p>

            {/* Illustrations */}
            <div className="grid gap-4 lg:grid-cols-3">
              <Figure caption="Framing — the 60/40 split">
                <FramingFigure />
              </Figure>
              <Figure caption="Lighting — top-down plan">
                <LightingFigure />
              </Figure>
              <Figure caption="The look — floating graphics">
                <LookFigure />
              </Figure>
            </div>

            {/* Spec groups */}
            <div className="grid gap-5 lg:grid-cols-3">
              {opt.groups.map((g) => (
                <div key={g.title} className="rounded-xl border border-line bg-paper/60 p-5">
                  <h4 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
                    <span aria-hidden>{g.icon}</span>
                    {g.title}
                  </h4>
                  {g.intro && <p className="mt-1.5 text-sm text-muted">{g.intro}</p>}
                  <dl className="mt-3 space-y-3">
                    {g.points.map((p) => (
                      <div key={p.label}>
                        <dt className="text-sm font-semibold text-ink">{p.label}</dt>
                        <dd className="mt-0.5 text-sm text-muted">{p.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Figure({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-white">
      {children}
      <figcaption className="border-t border-line bg-paper px-3 py-2 text-xs font-medium text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ───────────────── Framing: the 60/40 composition ───────────────── */

function FramingFigure() {
  return (
    <svg viewBox="0 0 320 180" className="block w-full" role="img" aria-label="Camera framing diagram: host on the left third, graphics zone on the right">
      <rect x="3" y="3" width="314" height="174" rx="6" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2" />
      {/* rule-of-thirds */}
      <g stroke="var(--color-azure)" strokeWidth="1" strokeDasharray="3 4" opacity="0.5">
        <line x1="109.7" y1="3" x2="109.7" y2="177" />
        <line x1="216.3" y1="3" x2="216.3" y2="177" />
        <line x1="3" y1="61" x2="317" y2="61" />
        <line x1="3" y1="119" x2="317" y2="119" />
      </g>
      {/* host on left third */}
      <g fill="var(--color-ink)">
        <circle cx="78" cy="92" r="20" />
        <path d="M44 177 C44 138 56 120 78 120 C100 120 112 138 112 177 Z" />
      </g>
      {/* body-angle arrow */}
      <path d="M104 150 q26 -6 44 0" fill="none" stroke="var(--color-azure-bright)" strokeWidth="1.5" markerEnd="url(#fr-arrow)" />
      <defs>
        <marker id="fr-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="var(--color-azure-bright)" />
        </marker>
      </defs>
      {/* graphics zone */}
      <text x="266" y="34" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="var(--color-muted)">
        GRAPHICS ZONE
      </text>
      <rect x="228" y="80" width="74" height="40" rx="5" fill="var(--color-azure-tint)" stroke="var(--color-azure)" strokeWidth="1.2" />
      <rect x="236" y="90" width="34" height="5" rx="2.5" fill="var(--color-azure)" />
      <rect x="236" y="101" width="56" height="4" rx="2" fill="var(--color-azure)" opacity="0.5" />
      <rect x="236" y="109" width="44" height="4" rx="2" fill="var(--color-azure)" opacity="0.5" />
      {/* 60 / 40 marker */}
      <text x="78" y="170" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-paper)">60</text>
      <text x="266" y="150" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--color-azure-dark)">40</text>
    </svg>
  );
}

/* ───────────────── Lighting: top-down plan ───────────────── */

function LightingFigure() {
  return (
    <svg viewBox="0 0 320 180" className="block w-full" role="img" aria-label="Top-down lighting plan: key light at 45 degrees, fill opposite, practical lights at the back wall">
      <rect x="0" y="0" width="320" height="180" fill="var(--color-paper)" />
      {/* back wall */}
      <line x1="40" y1="30" x2="280" y2="30" stroke="var(--color-line)" strokeWidth="3" />
      <text x="46" y="24" fontSize="8" fill="var(--color-muted)">back wall</text>
      {/* practical lights at wall */}
      <g>
        <circle cx="120" cy="38" r="9" fill="#e0a85a" opacity="0.35" />
        <circle cx="120" cy="38" r="3.5" fill="#e0a85a" />
        <circle cx="200" cy="38" r="9" fill="#e0a85a" opacity="0.35" />
        <circle cx="200" cy="38" r="3.5" fill="#e0a85a" />
        <text x="160" y="56" textAnchor="middle" fontSize="8" fill="var(--color-muted)">warm practicals</text>
      </g>
      {/* key light cone */}
      <path d="M70 86 L160 120 L96 70 Z" fill="var(--color-azure)" opacity="0.16" />
      {/* fill cone */}
      <path d="M250 92 L160 120 L228 76 Z" fill="var(--color-azure-bright)" opacity="0.1" />
      {/* subject */}
      <circle cx="160" cy="124" r="15" fill="var(--color-ink)" />
      <path d="M160 124 l0 12" stroke="var(--color-azure-bright)" strokeWidth="2" />
      <text x="160" y="128" textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--color-paper)">YOU</text>
      {/* key light */}
      <g>
        <rect x="52" y="74" width="26" height="16" rx="2" fill="var(--color-ink)" transform="rotate(-32 65 82)" />
        <text x="40" y="104" fontSize="8" fontWeight="700" fill="var(--color-ink)">Key · 36″ · 45°</text>
      </g>
      {/* fill / reflector */}
      <g>
        <rect x="244" y="80" width="22" height="14" rx="2" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" transform="rotate(34 255 87)" />
        <text x="222" y="108" fontSize="8" fill="var(--color-ink)">Fill / reflector</text>
      </g>
      {/* camera */}
      <g>
        <rect x="148" y="158" width="24" height="14" rx="2" fill="var(--color-azure)" />
        <path d="M172 162 l8 -3 v8 l-8 -3 Z" fill="var(--color-azure)" />
        <text x="160" y="154" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--color-azure-dark)">camera · eye level</text>
      </g>
    </svg>
  );
}

/* ───────────────── The look: composed shot ───────────────── */

function LookFigure() {
  return (
    <svg viewBox="0 0 320 180" className="block w-full" role="img" aria-label="Composed shot: host lit from one side with a floating graphic card in the negative space">
      <defs>
        <radialGradient id="look-practical" cx="74%" cy="32%" r="55%">
          <stop offset="0%" stopColor="#e0a85a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e0a85a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="look-key" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-azure-dark)" />
          <stop offset="100%" stopColor="var(--color-ink)" />
        </linearGradient>
        <linearGradient id="look-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#20242e" />
          <stop offset="100%" stopColor="var(--color-ink)" />
        </linearGradient>
      </defs>
      {/* room */}
      <rect x="3" y="3" width="314" height="174" rx="6" fill="url(#look-bg)" />
      {/* practical glow in negative space */}
      <rect x="3" y="3" width="314" height="174" rx="6" fill="url(#look-practical)" />
      {/* diffused LED bar behind */}
      <rect x="214" y="40" width="6" height="74" rx="3" fill="#7fd8fb" opacity="0.55" />
      {/* host, lit from key side */}
      <g>
        <circle cx="86" cy="86" r="22" fill="url(#look-key)" />
        {/* rim light on shoulder */}
        <path d="M48 177 C48 134 62 114 86 114 C110 114 124 134 124 177 Z" fill="url(#look-key)" />
        <path d="M120 130 C124 150 124 168 123 177" fill="none" stroke="var(--color-azure-bright)" strokeWidth="2" opacity="0.7" />
      </g>
      {/* floating borderless graphic card at shoulder height */}
      <g>
        <rect x="206" y="92" width="92" height="46" rx="7" fill="#ffffff" opacity="0.96" />
        <rect x="216" y="101" width="8" height="28" rx="2" fill="var(--color-azure)" />
        <text x="232" y="113" fontSize="11" fontWeight="800" fill="var(--color-ink)">$1.1M</text>
        <rect x="232" y="119" width="54" height="4" rx="2" fill="var(--color-muted)" opacity="0.5" />
        <rect x="232" y="127" width="40" height="4" rx="2" fill="var(--color-muted)" opacity="0.35" />
      </g>
      {/* live dot */}
      <circle cx="28" cy="26" r="4" fill="var(--color-azure-bright)" />
      <text x="38" y="29" fontSize="9" fontWeight="700" fill="var(--color-paper)">LIVE</text>
    </svg>
  );
}
