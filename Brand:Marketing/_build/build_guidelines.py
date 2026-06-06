#!/usr/bin/env python3
import sys; sys.path.insert(0,"/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/_build")
from brandkit import *

W,H=1700,2200; M=150
OUT="/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/CharlesBlowShow_Brand_Guidelines_v1.pdf"
pages=[]

def footer(c, n, total=7, dark=False):
    col = (150,154,162) if dark else MUTED
    ln = (60,64,74) if dark else LINE
    c.line(M,2078,W-M,2078,fill=ln,width=1)
    c.text(M,2110,"THE CHARLES BLOW SHOW",c.font(SANS_SB,15),col,anchor="lm")
    c.text(W-M,2110,f"BRAND GUIDELINES — {n:02d}/{total:02d}",c.font(SANS_SB,15),col,anchor="rm")

def eyebrow(c,x,y,t,color=AZURE,ls=4.0,size=17):
    c.text_ls(x,y,t.upper(),c.font(SANS_B,size),color,ls)

def header(c,n,kick,title):
    eyebrow(c,M,150,kick)
    c.text(M-2,232,title,c.font(SERIF_SB,64),INK,anchor="lm")
    c.line(M,290,W-M,290,fill=INK,width=2); c.line(M,295,W-M,295,fill=LINE,width=1)
    footer(c,n)

# ---------- 1 COVER ----------
c=Canvas(W,H,INK)
# thin azure top rule
c.rect(0,0,W,10,fill=AZURE_BRIGHT)
eyebrow(c,M,300,"Brand Guidelines · v1.0 · 2026",AZURE_BRIGHT,4.5,19)
monogram(c,M+70,560,140,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
# big title
c.text(M-4,820,"The Charles",c.font(SERIF_SB,116),PAPER,anchor="lm")
c.text(M-4,940,"Blow Show",c.font(SERIF_SB,116),PAPER,anchor="lm")
c.text(M,1010,".",c.font(SERIF_SB,116),AZURE_BRIGHT,anchor="lm") if False else None
c.text(M,1120,"Visual identity & usage for partners.",c.font(SERIF_I,40),(190,194,201),anchor="lm")
# bottom strip
c.line(M,1980,W-M,1980,fill=(60,64,74),width=1)
c.text(M,2040,"Race, politics & power in America — in conversation.",c.font(SANS,24),(170,174,181),anchor="lm")
c.text(W-M,2040,"charlesblowshow.com",c.font(SANS_SB,24),AZURE_BRIGHT,anchor="rm")
pages.append(c.image())

# ---------- 2 BRAND AT A GLANCE ----------
c=Canvas(W,H,PAPER); header(c,2,"The brand","at a glance.")
y=380
c.text(M,y,"What it is",c.font(SANS_B,22),INK,anchor="lm")
y+=44
y=c.paragraph(M,y,"The Charles Blow Show is a daily, independent political-media show — incisive analysis of race, politics, and power in America, in conversation. Two short segments a day, a companion site, and a daily newsletter. The look should feel like a serious independent newsroom a person actually wants to read: editorial, not cable-news loud; confident, not cold.",c.font(SERIF,29),INK_SOFT,W-2*M,46)
y+=40
c.text(M,y,"Brand attributes",c.font(SANS_B,22),INK,anchor="lm"); y+=54
attrs=["Incisive","Principled","Warm","Unflinching","Literate"]
x=M
for a in attrs:
    f=c.font(SERIF_SB,30); w=c.tlen(a,f)+56
    c.rrect(x,y-2,x+w,y+58,28,outline=LINE,width=2)
    c.text(x+28,y+28,a,f,INK,anchor="lm")
    # azure dot
    c.ellipse(x+w-26,y+24,x+w-14,y+36,fill=AZURE_BRIGHT)
    x+=w+22
y+=120
# the lines block on azure-tint
c.rrect(M,y,W-M,y+360,18,fill=AZURE_TINT)
c.text(M+50,y+60,"THE LINES (USE VERBATIM)",c.font(SANS_B,16),AZURE_DARK,anchor="lm")
c.text_ls(M+50,y+60,"THE LINES — USE VERBATIM",c.font(SANS_B,15),AZURE_DARK,3.0) if False else None
ly=y+120
for big,small in [("Race, politics & power in America — in conversation.","Primary line"),
                  ("The smartest seat at the table — every day.","Social / spoken"),
                  ("We leave you equipped, not anxious. Every day ends on “What now?”","The promise")]:
    c.paragraph(M+50,ly,big,c.font(SERIF_SB,34),INK,W-2*M-100,44)
    nlines=len(c.wrap(big,c.font(SERIF_SB,34),W-2*M-100))
    ly+=44*nlines+6
    c.text(M+50,ly,small.upper(),c.font(SANS_B,14),AZURE_DARK,anchor="lm"); ly+=54
pages.append(c.image())

# ---------- 3 LOGO ----------
c=Canvas(W,H,PAPER); header(c,3,"The mark","logo system.")
# primary lockup
c.text(M,360,"Primary lockup",c.font(SANS_B,20),INK,anchor="lm")
monogram(c,M+55,470,90)
c.text(M+125,470,"The Charles Blow Show",c.font(SERIF_SB,46),INK,anchor="lm")
# monogram + wordmark labels
c.text(M,575,"An ink rounded-square “CB” with a bright-azure byline rule — the columnist’s underline.",c.font(SERIF_I,26),MUTED,anchor="lm")
# three forms row
fy=680
c.line(M,fy-20,W-M,fy-20,fill=LINE,width=1)
forms=[("Monogram","App icon, favicon, avatar, bug"),("Wordmark","Header, footers, decks"),("Lockup","Primary signature")]
cw=(W-2*M)/3
for i,(t,d) in enumerate(forms):
    x=M+i*cw
    if i==0: monogram(c,x+70,fy+110,84)
    elif i==1: c.text(x,fy+110,"The Charles\nBlow Show",c.font(SERIF_SB,30),INK,anchor="lm")
    else:
        monogram(c,x+45,fy+110,64); c.text(x+90,fy+110,"The Charles\nBlow Show",c.font(SERIF_SB,22),INK,anchor="lm")
    c.text(x,fy+230,t,c.font(SANS_B,20),INK,anchor="lm")
    c.text(x,fy+264,d,c.font(SANS,18),MUTED,anchor="lm")
# clear space + min size
gy=1080
c.line(M,gy-20,W-M,gy-20,fill=LINE,width=1)
c.text(M,gy+10,"Clear space & minimum size",c.font(SANS_B,20),INK,anchor="lm")
# clear-space diagram
bx,by=M+40,gy+90
c.rrect(bx-40,by-40,bx+360,by+200,8,outline=AZURE,width=2)
monogram(c,bx+60,by+80,120)
c.text(bx+150,by+80,"Keep padding equal\nto the height of the “C”.",c.font(SANS,20),INK_SOFT,anchor="lm")
# min sizes
mx=M+760
for s,lab in [(64,"64"),(40,"40"),(24,"24 px min")]:
    monogram(c,mx+s/2,by+80,s); c.text(mx+s/2,by+150,lab,c.font(SANS_SB,16),MUTED,anchor="mm"); mx+=s+70
# don'ts
dy=1500
c.line(M,dy-20,W-M,dy-20,fill=LINE,width=1)
c.text(M,dy+10,"Don’ts",c.font(SANS_B,20),INK,anchor="lm")
donts=["Don’t recolor the mark outside the palette.","Don’t stretch, rotate, or skew it.",
       "Don’t add shadows or gradients to the letters.","Don’t place the wordmark on a busy photo without a scrim.",
       "Don’t recolor the azure byline rule — it’s the signature."]
yy=dy+70
for d in donts:
    c.text(M+6,yy+2,"✕",c.font(SANS_B,22),AZURE,anchor="lm")
    c.text(M+44,yy+2,d,c.font(SERIF,27),INK_SOFT,anchor="lm"); yy+=58
pages.append(c.image())

# ---------- 4 COLOR ----------
c=Canvas(W,H,PAPER); header(c,4,"The palette","color.")
swatches=[("Paper","#FBFAF6",PAPER,"Primary background (warm white)"),
          ("Surface","#FFFFFF",SURFACE,"Cards, raised panels"),
          ("Ink","#14161D",INK,"Primary text, dark surfaces, nav"),
          ("Muted","#6C7077",MUTED,"Metadata, captions"),
          ("Line","#E7E3D9",LINE,"Hairline dividers & borders"),
          ("Azure","#0090CC",AZURE,"Primary accent — links, eyebrows, CTAs"),
          ("Azure Bright","#00B2F4",AZURE_BRIGHT,"Signature pop — dot, live, focus, rule"),
          ("Azure Dark","#0A6A94",AZURE_DARK,"Accent hover / pressed"),
          ("Azure Tint","#E1F3FD",AZURE_TINT,"Soft accent backgrounds, badges")]
y=370; rowh=168
for name,hexv,col,role in swatches:
    c.rrect(M,y,M+260,y+rowh-28,14,fill=col,outline=LINE if sum(col)>720 else None,width=2)
    c.text(M+300,y+18,name,c.font(SERIF_SB,34),INK,anchor="lm")
    c.text(M+300,y+72,hexv,c.font(SANS_SB,24),AZURE_DARK,anchor="lm")
    c.text(M+620,y+45,role,c.font(SANS,24),INK_SOFT,anchor="lm")
    y+=rowh
# usage rules box
c.rrect(M,y+6,W-M,y+250,18,fill=INK)
c.text_ls(M+50,y+58,"USAGE",c.font(SANS_B,15),AZURE_BRIGHT,3.0)
rules=["Azure is a spice, not a sauce — small doses: eyebrows, the live dot, focus, one primary button per view.",
       "Bright #00B2F4 is too light for text on paper — use it for fills, dots, rules; use Azure #0090CC for links & labels.",
       "Body text is Ink on Paper; never azure on paper for long copy. Maintain WCAG AA contrast."]
ry=y+105
for r in rules:
    c.text(M+50,ry,"—",c.font(SANS_B,22),AZURE_BRIGHT,anchor="lm")
    n=c.paragraph(M+86,ry,r,c.font(SANS,22),PAPER,W-2*M-130,32); ry=n+14
pages.append(c.image())

# ---------- 5 TYPOGRAPHY ----------
c=Canvas(W,H,PAPER); header(c,5,"The voice in type","typography.")
# Serif specimen
c.text(M,370,"DISPLAY / HEADLINES",c.font(SANS_B,15),AZURE_DARK,anchor="lm")
c.text(M,470,"Newsreader",c.font(SERIF_SB,58),INK,anchor="lm")
c.text(M,545,"High-contrast editorial serif · weights 400–600 · italics for emphasis.",c.font(SANS,22),MUTED,anchor="lm")
_hf=c.font(SERIF_SB,120)
c.text(M-6,690,"latest news",_hf,INK,anchor="lm")
c.text(M-6+c.tlen("latest news",_hf),690,".",_hf,AZURE_BRIGHT,anchor="lm")
# azure period emphasis
c.text(M,760,"Lowercase headline + a period is the signature device.",c.font(SERIF_I,28),INK_SOFT,anchor="lm")
c.line(M,840,W-M,840,fill=LINE,width=1)
# Sans specimen
c.text(M,890,"UI / BODY / LABELS",c.font(SANS_B,15),AZURE_DARK,anchor="lm")
c.text(M,985,"Inter",c.font(SANS_B,54),INK,anchor="lm")
c.text(M,1055,"Clean grotesque · nav, buttons, metadata, body. UPPERCASE eyebrows, letter-spaced.",c.font(SANS,22),MUTED,anchor="lm")
c.text(M,1150,"Aa Bb Cc 0123456789",c.font(SANS_SB,64),INK,anchor="lm")
c.line(M,1280,W-M,1280,fill=LINE,width=1)
# scale + rules
c.text(M,1330,"Type scale (web)",c.font(SANS_B,20),INK,anchor="lm")
scale=[("Display","48–72",SERIF_SB,52),("H2","32–40",SERIF_SB,38),("H3","20–24",SERIF_SB,26),
       ("Body","16–18",SANS,22),("Meta / Label","12–14",SANS_SB,18)]
sy=1390
for role,size,fp,disp in scale:
    c.text(M,sy+disp*0.3,"Aa",c.font(fp,disp),INK,anchor="lm")
    c.text(M+150,sy,role,c.font(SANS_SB,22),INK,anchor="la")
    c.text(M+150,sy+30,size+" px",c.font(SANS,19),MUTED,anchor="la")
    sy+=disp*0.7+44
# rules column
rx=M+760; c.text(rx,1330,"Rules",c.font(SANS_B,20),INK,anchor="lm")
for i,r in enumerate(["Serif for headlines only; sans for everything functional.",
                      "Hierarchy via scale + weight, ≥1.25 between steps.",
                      "Generous line-height on body (1.6).",
                      "One accent weight, not many. No all-caps body."]):
    yy=1390+i*120
    c.text(rx,yy,f"0{i+1}",c.font(SERIF_SB,30),AZURE,anchor="lm")
    c.paragraph(rx+70,yy-6,r,c.font(SANS,22),INK_SOFT,W-M-rx-70,32)
pages.append(c.image())

# ---------- 6 VOICE & APPLICATIONS ----------
c=Canvas(W,H,PAPER); header(c,6,"In the world","voice & applications.")
c.text(M,370,"Verbal identity",c.font(SANS_B,20),INK,anchor="lm")
voice=[("Plainspoken & precise.","Short, declarative. Say the quiet part."),
       ("Warm authority.","Smart friend at the table, not a lecturer."),
       ("Action-oriented.","End on “What now?” — equip, don’t alarm.")]
vy=430
for t,d in voice:
    c.text(M,vy,t,c.font(SERIF_SB,30),INK,anchor="lm")
    c.text(M,vy+42,d,c.font(SANS,22),MUTED,anchor="lm"); vy+=110
c.line(M,vy+6,W-M,vy+6,fill=LINE,width=1)
# motifs
my=vy+50
c.text(M,my,"Signature motifs",c.font(SANS_B,20),INK,anchor="lm"); my+=60
# eyebrow chip
eyebrow(c,M,my+10,"Category eyebrow"); c.text(M+360,my+10,"small uppercase, azure or muted",c.font(SANS,20),MUTED,anchor="lm")
my+=66
# live dot
c.ellipse(M,my,M+22,my+22,fill=AZURE_BRIGHT)
c.text_ls(M+38,my+11,"LIVE",c.font(SANS_B,18),AZURE,3.0)
c.text(M+360,my+11,"pulsing bright-azure dot for the live segment",c.font(SANS,20),MUTED,anchor="lm")
my+=66
c.text(M,my+11,"Author • Date",c.font(SANS,22),MUTED,anchor="lm")
c.text(M+360,my+11,"byline meta — the editorial fingerprint",c.font(SANS,20),MUTED,anchor="lm")
# applications grid
ay=my+110
c.line(M,ay-30,W-M,ay-30,fill=LINE,width=1)
c.text(M,ay,"Applications",c.font(SANS_B,20),INK,anchor="lm"); ay+=56
apps=[("Website","Paper canvas, editorial cards, azure accents"),
      ("YouTube thumbnails","Blow’s face + azure title bar + serif phrase"),
      ("Lower-thirds","Ink bar, paper text, bright-azure rule + CB bug"),
      ("Newsletter","Serif headlines, ink body, azure links, byline metas"),
      ("Social avatars","CB monogram on ink"),
      ("Clip end-cards","CB bug, azure keyword highlight")]
cw=(W-2*M-40)/2
for i,(t,d) in enumerate(apps):
    col=i%2; row=i//2
    x=M+col*(cw+40); yy=ay+row*120
    c.rrect(x,yy,x+cw,yy+100,14,fill=SURFACE,outline=LINE,width=2)
    c.ellipse(x+30,yy+44,x+44,yy+58,fill=AZURE_BRIGHT)
    c.text(x+62,yy+34,t,c.font(SANS_B,23),INK,anchor="lm")
    c.text(x+62,yy+70,d,c.font(SANS,19),MUTED,anchor="lm")
pages.append(c.image())

# ---------- 7 BACK ----------
c=Canvas(W,H,INK)
c.rect(0,0,W,10,fill=AZURE_BRIGHT)
monogram(c,W/2,520,150,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
c.text(W/2,760,"The news is never paywalled.",c.font(SERIF_SB,56),PAPER,anchor="mm")
c.text(W/2,830,"The show is free. Members keep it independent.",c.font(SERIF_I,34),(190,194,201),anchor="mm")
c.line(M,1040,W-M,1040,fill=(60,64,74),width=1)
c.text(W/2,1120,"PARTNER & PRESS",c.font(SANS_B,16),AZURE_BRIGHT,anchor="mm")
for i,(k,v) in enumerate([("Web","charlesblowshow.com"),("Press","press@charlesblowshow.com"),
                          ("Social","@charlesblowshow")]):
    yy=1190+i*64
    c.text(W/2-30,yy,k,c.font(SANS_SB,24),(150,154,162),anchor="rm")
    c.text(W/2+30,yy,v,c.font(SANS_SB,24),PAPER,anchor="lm")
c.text(W/2,2030,"Draft v1.0 · verify facts & secure approvals before public use.",c.font(SANS,18),(120,124,132),anchor="mm")
pages.append(c.image())

save_pdf(pages,OUT)
import os
pv="/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/_build/preview_guidelines"
os.makedirs(pv,exist_ok=True)
for i,p in enumerate(pages,1): p.save(f"{pv}/g{i:02d}.png")
print("wrote",OUT,"pages:",len(pages))
