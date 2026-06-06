# 10 — Brand Guidelines

*The visual identity for The Charles Blow Show. Derived from an editorial, magazine-style design direction: light "paper" canvas, near-black ink, a single bright **azure** accent (the `#00B2F4` family), a high-contrast serif for headlines paired with a clean grotesque sans for UI. Authoritative, literate, modern.*

> Use this as the single source of truth for the website, lower-thirds, thumbnails, social templates, and decks. Implemented in code at `web/app/globals.css` (design tokens) and `web/components/logo.tsx` (the mark).

---

## 1. Brand attributes

**Incisive · Principled · Warm · Unflinching · Literate.**

The look should feel like a serious independent newsroom that a person actually wants to read — editorial, not cable-news loud; confident, not cold.

---

## 2. Logo

Three forms, one system:

| Form | Use |
|------|-----|
| **Monogram "CB"** | App icon, favicon, social avatars, lower-third bug, clip end-cards |
| **Wordmark** | "The Charles Blow Show" — site header, footers, decks |
| **Lockup** | Monogram + wordmark, horizontal — primary signature |

**The mark:** an ink rounded-square containing serif **"CB"** with a short **azure byline rule** beneath — evoking a byline/underline, the editorial signature of a columnist.

**Clear space:** keep padding equal to the height of the "C" around the lockup.
**Minimum size:** monogram no smaller than 24px; wordmark legible at ≥120px wide.

**Don'ts:** don't recolor the mark outside the palette · don't stretch or rotate · don't add shadows/gradients to the letters · don't place the wordmark on a busy photo without a scrim.

---

## 3. Color palette

| Token | Hex | Role |
|-------|-----|------|
| **Paper** | `#FBFAF6` | Primary background (warm white) |
| **Surface** | `#FFFFFF` | Cards, raised panels |
| **Ink** | `#14161D` | Primary text, dark buttons/surfaces, nav |
| **Ink Soft** | `#2A2D36` | Secondary dark / borders on dark |
| **Muted** | `#6C7077` | Metadata, captions, `author • date` |
| **Line** | `#E7E3D9` | Hairline dividers & card borders |
| **Azure** | `#0090CC` | Primary accent — links, eyebrows, CTAs (the interactive shade) |
| **Azure Bright** | `#00B2F4` | Brand signature pop — live dot, focus rings, byline rule, gradient tops |
| **Azure Dark** | `#0A6A94` | Accent hover/pressed (fully AA on paper) |
| **Azure Tint** | `#E1F3FD` | Soft accent backgrounds, badges |

**Usage rules**
- **Azure is a spice, not a sauce** — small doses: category eyebrows, the "live" dot, focus rings, one primary button per view.
- The bright **`#00B2F4`** is the brand's signature color, but it's too light for text/UI on paper (≈2.4:1). Use it for *fills, dots, focus rings, and rules*; use **Azure `#0090CC`** (or **Azure Dark** where strict 4.5:1 is required) for links, button labels, and accent text.
- Body text is **Ink on Paper**; never azure on paper for long copy.
- Dark sections invert: **Paper text on Ink**, where bright `#00B2F4` reads cleanly as the accent.
- Maintain **WCAG AA** contrast (Ink on Paper passes; reserve bright azure for large/decorative use, the deeper shades for text).

---

## 4. Typography

| Role | Typeface | Notes |
|------|----------|-------|
| **Display / Headlines** | **Newsreader** (serif) | Editorial, high-contrast. Lowercase headlines with a period ("Latest news.") are a signature device. Weights 400–600; italics for emphasis. |
| **UI / Body / Labels** | **Inter** (sans) | Nav, buttons, metadata, body. |
| **Category eyebrows** | Inter | UPPERCASE, letter-spaced, 12px, muted or azure. |

**Type scale (web):** Display 48–72 · H2 32–40 · H3 20–24 · Body 16–18 · Meta/Label 12–14.
**Rules:** serif for headlines only; sans for everything functional. Generous line-height on body (1.6). One accent weight, not many.

---

## 5. Components & motifs

- **Cards:** white surface, `Line` hairline border, 14px radius, optional media block on top.
- **Category eyebrow:** small uppercase label above titles (azure or muted).
- **Byline meta:** `Author • Date` in muted sans — the editorial fingerprint.
- **Buttons:** primary = Ink fill, Paper text, with a trailing **→**; accent = Azure fill (Paper text), hover → Azure Dark; ghost = Line border. Subscribe button pairs a dark block with an arrow tile (per the reference).
- **Section headers:** serif, lowercase, trailing period, with prev/next **arrow controls** on the right for carousels.
- **Media blocks:** where real photography isn't available yet, use azure↔ink **duotone gradients** as intentional placeholders.
- **Live dot:** small pulsing **bright azure** circle for the live segment.

---

## 6. Voice (verbal identity)

- **Plainspoken and precise.** Short, declarative. Say the quiet part.
- **Warm authority.** Smart friend at the table, not a lecturer.
- **Action-oriented.** End on "What Now?" — leave people equipped, not anxious.
- Sentence case in UI; lowercase-with-period for editorial section titles.

---

## 7. Application

| Surface | Direction |
|---------|-----------|
| **Website** | Paper canvas, editorial cards, azure accents (see `web/`) |
| **YouTube thumbnails** | High-contrast: Blow's face + azure title bar + serif phrase |
| **Lower-thirds** | Ink bar, Paper text, bright-azure rule + CB bug |
| **Clip template** | Paper or Ink caption band, azure progress/keyword highlight, CB end-card |
| **Substack / newsletter** | Serif headlines, ink body, azure links, byline metas |
| **Social avatars** | CB monogram on ink |

---

## 8. Tokens (for engineering)

Defined as Tailwind v4 theme tokens in `web/app/globals.css`:

```
--color-paper · --color-surface · --color-ink · --color-ink-soft
--color-muted · --color-line
--color-azure · --color-azure-bright · --color-azure-dark · --color-azure-tint
--font-serif (Newsreader) · --font-sans (Inter)
```

Utilities follow automatically: `bg-paper`, `text-ink`, `text-azure`, `bg-azure-bright`, `border-line`, `font-serif`, etc.
