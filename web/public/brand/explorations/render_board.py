#!/usr/bin/env python3
"""Editorial Gravity — logo exploration specimen board for The Charles Blow Show."""
from PIL import Image, ImageDraw, ImageFont

# ---------- config ----------
SS = 2                      # supersample
W, H = 2400, 3120           # final px
FONTDIR = "/Users/cedmixon/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/c2145823-8e5e-4dad-8353-02aa566d7df9/d0ce449d-1548-4a24-a29f-429f7addd6e6/skills/canvas-design/canvas-fonts"
OUT = "/Users/cedmixon/Documents/CharlesBlowShow/web/public/brand/explorations/logo-explorations.png"

# ---------- palette ----------
paper      = (251, 250, 246)
surface    = (255, 255, 255)
ink        = (20, 22, 29)
ink_soft   = (42, 45, 54)
muted      = (108, 112, 119)
line       = (231, 227, 217)
line_soft  = (238, 235, 227)
ember      = (232, 85, 45)
ember_dark = (200, 67, 44)
ember_tint = (251, 233, 226)

# ---------- canvas ----------
img = Image.new("RGB", (W * SS, H * SS), paper)
d = ImageDraw.Draw(img)

def s(v): return v * SS
def F(path, size): return ImageFont.truetype(f"{FONTDIR}/{path}", int(round(size * SS)))

# fonts (Newsreader/Inter substitutes from the canvas set)
SERIF   = lambda sz: F("CrimsonPro-Bold.ttf", sz)
SERIF_R = lambda sz: F("CrimsonPro-Regular.ttf", sz)
SERIF_I = lambda sz: F("CrimsonPro-Italic.ttf", sz)
SANS    = lambda sz: F("InstrumentSans-Regular.ttf", sz)
SANS_B  = lambda sz: F("InstrumentSans-Bold.ttf", sz)
MONO    = lambda sz: F("GeistMono-Regular.ttf", sz)

# ---------- primitives (final-px coords) ----------
def rrect(x0, y0, x1, y1, r, fill=None, outline=None, width=1):
    d.rounded_rectangle([s(x0), s(y0), s(x1), s(y1)], radius=s(r),
                        fill=fill, outline=outline, width=int(round(width * SS)))

def rect(x0, y0, x1, y1, fill=None, outline=None, width=1):
    d.rectangle([s(x0), s(y0), s(x1), s(y1)], fill=fill, outline=outline,
                width=int(round(width * SS)))

def hline(x0, x1, y, fill=line, width=1):
    d.line([s(x0), s(y), s(x1), s(y)], fill=fill, width=int(round(width * SS)))

def text(x, y, string, fnt, fill, anchor="la"):
    d.text((s(x), s(y)), string, font=fnt, fill=fill, anchor=anchor)

def tlen(string, fnt):
    return d.textlength(string, font=fnt) / SS

def text_ls(x, y, string, fnt, fill, ls, av="m"):
    cx = s(x); a = "l" + ("m" if av == "m" else "a")
    for ch in string:
        d.text((cx, s(y)), ch, font=fnt, fill=fill, anchor=a)
        cx += d.textlength(ch, font=fnt) + s(ls)
    return (cx - s(x)) / SS

def measure_ls(string, fnt, ls):
    tot = sum(d.textlength(ch, font=fnt) for ch in string) / SS
    return tot + (len(string) - 1) * ls

def text_ls_center(xc, y, string, fnt, fill, ls, av="m"):
    w = measure_ls(string, fnt, ls)
    return text_ls(xc - w / 2, y, string, fnt, fill, ls, av)

# ---------- the CB monogram (reusable, scalable) ----------
def monogram(cx, cy, sq, dark=ink, lt=paper, acc=ember):
    """ink rounded-square + serif CB + ember byline rule, scaled to side `sq`."""
    half = sq / 2.0
    r = sq * 0.225
    rrect(cx - half, cy - half, cx + half, cy + half, r, fill=dark)
    # serif CB, optically centered slightly high
    text(cx, cy - sq * 0.075, "CB", SERIF(sq * 0.5), lt, anchor="mm")
    # ember byline rule
    rw, rh = sq * 0.34, max(sq * 0.055, 2)
    ry = cy + sq * 0.28
    rrect(cx - rw / 2, ry - rh / 2, cx + rw / 2, ry + rh / 2, rh / 2, fill=acc)

# =================================================================
# HEADER
# =================================================================
M = 150
text_ls(M, 150, "IDENTITY SPECIMEN  ·  NO. 01", SANS_B(16.5), ember, 5.0)
text(M - 2, 248, "Logo explorations", SERIF(86), ink, anchor="lm")
# ember period
pw = tlen("Logo explorations", SERIF(86))
text(M - 2 + pw + 6, 248, ".", SERIF(86), ember, anchor="lm")
text(M, 320, "Six directions for the CB mark, drawn on the Editorial Gravity system.",
     SERIF_I(30), muted, anchor="lm")

# right meta block (mono, right-aligned)
rx = W - M
my = 140; mstep = 34
for i, (k, v) in enumerate([("PROJECT", "the charles blow show"),
                            ("SET", "06 marks"),
                            ("PALETTE", "ink · paper · ember")]):
    y = my + i * mstep
    text(rx, y, v, MONO(15.5), ink, anchor="ra")
    text(rx - tlen(v, MONO(15.5)) - 14, y, k, MONO(15.5), muted, anchor="ra")

hline(M, W - M, 392, fill=ink, width=2)
hline(M, W - M, 398, fill=line, width=1)

# =================================================================
# GRID  (2 cols x 3 rows)
# =================================================================
GAP = 56
CW = (W - 2 * M - GAP) / 2          # 1019
CH = 626
GY0 = 448
cols = [M, M + CW + GAP]
rows = [GY0, GY0 + CH + GAP, GY0 + 2 * (CH + GAP)]

def card(ox, oy, num, name, desc, draw_stage):
    rrect(ox, oy, ox + CW, oy + CH, 16, fill=surface, outline=line, width=2)
    # corner reference
    text(ox + 34, oy + 40, f"/{num:02d}", MONO(17), ember, anchor="lm")
    # registration ticks (clinical detail)
    for tx in (ox + CW - 34 - 26, ox + CW - 34 - 13, ox + CW - 34):
        d.line([s(tx), s(oy + 34), s(tx), s(oy + 47)], fill=line, width=int(round(1.4 * SS)))
    # stage
    scx = ox + CW / 2
    draw_stage(ox, oy, scx)
    # caption
    hline(ox + 34, ox + CW - 34, oy + CH - 86, fill=line_soft, width=1)
    text(ox + 34, oy + CH - 56, name, SANS_B(24), ink, anchor="lm")
    text(ox + 34, oy + CH - 28, desc, SANS(17.5), muted, anchor="lm")

# ---- 01 The Byline (primary monogram) ----
def st01(ox, oy, scx):
    monogram(scx, oy + 248, 196)
card(cols[0], rows[0], 1, "The Byline",
     "Primary monogram — app icon, avatar, on-air bug.", st01)

# ---- 02 Stacked Masthead ----
def st02(ox, oy, scx):
    text_ls_center(scx, oy + 110, "THE", SANS_B(20), muted, 9.0)
    text(scx, oy + 188, "CHARLES", SERIF(66), ink, anchor="mm")
    text(scx, oy + 256, "BLOW", SERIF(66), ink, anchor="mm")
    # SHOW with ember period
    sw = tlen("SHOW", SERIF(66)); pw = tlen(".", SERIF(66))
    total = sw + pw
    x0 = scx - total / 2
    text(x0, oy + 324, "SHOW", SERIF(66), ink, anchor="lm")
    text(x0 + sw, oy + 324, ".", SERIF(66), ember, anchor="lm")
card(cols[1], rows[0], 2, "Stacked Masthead",
     "Editorial title block — footers, decks, covers.", st02)

# ---- 03 Lowercase Signature ----
def st03(ox, oy, scx):
    f = SERIF_I(78)
    sig = "charles blow"; sw = tlen(sig, f); pw = tlen(".", f)
    x0 = scx - (sw + pw) / 2
    text(x0, oy + 210, sig, f, ink, anchor="lm")
    text(x0 + sw, oy + 210, ".", f, ember, anchor="lm")
    text_ls_center(scx, oy + 300, "RACE · POLITICS · POWER", SANS_B(15), muted, 5.0)
card(cols[0], rows[1], 3, "Lowercase Signature",
     "The columnist's period — headline & social device.", st03)

# ---- 04 On-Air Bug (lower third) ----
def st04(ox, oy, scx):
    bx0, bx1 = ox + 64, ox + CW - 64
    by, bh = oy + 248, 120
    rrect(bx0, by - bh / 2, bx1, by + bh / 2, 18, fill=ink)
    # mini monogram on the bar
    monogram(bx0 + 78, by, 86, dark=ink_soft, lt=paper, acc=ember)
    tx = bx0 + 150
    # live row: ember dot + LIVE
    d.ellipse([s(tx), s(by - 30), s(tx + 13), s(by - 17)], fill=ember)
    text_ls(tx + 24, by - 23, "LIVE", SANS_B(16), ember, 4.0)
    text_ls(tx + 24 + 64, by - 23, "· LUNCH BREAK", SANS_B(16), (170,174,181), 4.0)
    text(tx, by + 18, "The Charles Blow Show", SERIF(34), paper, anchor="lm")
card(cols[1], rows[1], 4, "On-Air Bug",
     "Lower-third for the live segment & clip end-cards.", st04)

# ---- 05 Bound Monogram (open, on paper) ----
def st05(ox, oy, scx):
    cy = oy + 228
    text(scx, cy, "CB", SERIF(216), ink, anchor="mm")
    rw, rh = 150, 13
    ry = cy + 132
    rrect(scx - rw / 2, ry - rh / 2, scx + rw / 2, ry + rh / 2, rh / 2, fill=ember)
card(cols[0], rows[2], 5, "Bound Monogram",
     "Open mark on paper — large-format, editorial.", st05)

# ---- 06 Favicon System (scaling) ----
def st06(ox, oy, scx):
    cy = oy + 234
    sizes  = [168, 112, 72, 44]          # rendered sizes
    labels = ["512", "180", "64", "32"]  # real app-icon targets (px)
    gap = 50
    total = sum(sizes) + gap * (len(sizes) - 1)
    x = scx - total / 2
    base = cy + sizes[0] / 2              # align all marks on one baseline
    for sz, lab in zip(sizes, labels):
        mcy = base - sz / 2
        monogram(x + sz / 2, mcy, sz)
        text(x + sz / 2, base + 36, lab, MONO(14), muted, anchor="mm")
        x += sz + gap
card(cols[1], rows[2], 6, "Favicon System",
     "One mark, clean from 512 px down to 16 px.", st06)

# =================================================================
# FOOTER
# =================================================================
FY = rows[2] + CH + 60          # ~2382
hline(M, W - M, FY, fill=ink, width=2)
hline(M, W - M, FY + 6, fill=line, width=1)

# palette swatches
text_ls(M, FY + 52, "PALETTE", SANS_B(15), muted, 4.0)
chips = [("Paper", paper, "#FBFAF6"), ("Ink", ink, "#14161D"),
         ("Ember", ember, "#E8552D"), ("Muted", muted, "#6C7077"),
         ("Line", line, "#E7E3D9")]
cx = M; cy = FY + 92; cs = 70
for name, col, hexv in chips:
    rrect(cx, cy, cx + cs, cy + cs, 10, fill=col,
          outline=line if col == paper else None, width=2)
    text(cx, cy + cs + 26, name, SANS_B(18), ink, anchor="lm")
    text(cx, cy + cs + 52, hexv, MONO(15), muted, anchor="lm")
    cx += cs + 92

# type credits (right)
ty = FY + 52
text(W - M, ty, "TYPE", MONO(15), muted, anchor="ra")
creds = [("Display / Headlines", "Newsreader"),
         ("UI / Body / Labels", "Inter"),
         ("Specimen shown in", "Crimson Pro · Instrument Sans")]
for i, (role, fam) in enumerate(creds):
    y = FY + 92 + i * 40
    text(W - M, y, fam, SERIF(26) if i < 2 else SANS_B(20), ink, anchor="ra")
    text(W - M - tlen(fam, SERIF(26) if i < 2 else SANS_B(20)) - 16, y + 2,
         role, SANS(17), muted, anchor="ra")

# baseline
text_ls_center(W / 2, H - 70, "THE CHARLES BLOW SHOW  ·  BRAND SYSTEM  ·  EDITORIAL GRAVITY  ·  2026",
               MONO(14.5), muted, 3.0)

# ---------- export ----------
out = img.resize((W, H), Image.LANCZOS)
out.save(OUT)
print("wrote", OUT)
