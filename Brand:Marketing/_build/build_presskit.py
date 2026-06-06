#!/usr/bin/env python3
import sys; sys.path.insert(0,"/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/_build")
from brandkit import *
import os

W,H=1700,2200; M=150; TOTAL=7
OUT="/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/CharlesBlowShow_Press_Kit_v1.pdf"
pages=[]

def footer(c,n,dark=False):
    col=(150,154,162) if dark else MUTED; ln=(60,64,74) if dark else LINE
    c.line(M,2078,W-M,2078,fill=ln,width=1)
    c.text(M,2110,"THE CHARLES BLOW SHOW",c.font(SANS_SB,15),col,anchor="lm")
    c.text(W-M,2110,f"PRESS & PARTNER KIT — {n:02d}/{TOTAL:02d}",c.font(SANS_SB,15),col,anchor="rm")

def eyebrow(c,x,y,t,color=AZURE,ls=4.0,size=17): c.text_ls(x,y,t.upper(),c.font(SANS_B,size),color,ls)

def header(c,n,kick,title):
    eyebrow(c,M,150,kick); c.text(M-2,232,title,c.font(SERIF_SB,64),INK,anchor="lm")
    c.line(M,290,W-M,290,fill=INK,width=2); c.line(M,295,W-M,295,fill=LINE,width=1); footer(c,n)

# ---------- 1 COVER (paper) ----------
c=Canvas(W,H,PAPER)
c.rect(0,0,W,10,fill=AZURE_BRIGHT)
monogram(c,M+70,330,120)
eyebrow(c,M,540,"Press & Partner Kit · v1.0 · 2026",AZURE_DARK,4.0,19)
c.text(M-4,700,"The Charles",c.font(SERIF_SB,104),INK,anchor="lm")
c.text(M-4,812,"Blow Show",c.font(SERIF_SB,104),INK,anchor="lm")
c.text(M,920,"A daily, independent take on race, politics & power — in conversation.",c.font(SERIF_I,38),INK_SOFT,anchor="lm") if False else c.paragraph(M-2,900,"A daily, independent take on race, politics & power — in conversation.",c.font(SERIF_I,40),INK_SOFT,W-2*M-40,52)
# draft banner
c.rrect(M,1180,W-M,1300,14,fill=AZURE_TINT)
c.text(M+40,1240,"DRAFT — verify all facts and secure host approval (bio & quotes) before any public use.",c.font(SANS_SB,22),AZURE_DARK,anchor="lm")
c.line(M,2000,W-M,2000,fill=LINE,width=1)
c.text(M,2060,"press@charlesblowshow.com",c.font(SANS_SB,24),INK,anchor="lm")
c.text(W-M,2060,"charlesblowshow.com",c.font(SANS_SB,24),AZURE_DARK,anchor="rm")
pages.append(c.image())

# ---------- 2 RELEASE ----------
c=Canvas(W,H,PAPER); header(c,2,"For immediate release","the announcement.")
y=360
c.text(M,y,"LAUNCHING SOON · [MONTH DAY], 2026",c.font(SANS_B,16),AZURE_DARK,anchor="lm"); y+=64
y=c.paragraph(M,y,"The Charles Blow Show launches: a daily, independent take on race, politics, and power — in conversation.",c.font(SERIF_SB,42),INK,W-2*M,54)+24
paras=[
 "The Charles Blow Show is a daily, independent political-media show built for people who want to understand the day, not just feel angry about it. Each weekday brings two short segments — a live midday read on the biggest story, and an evening conversation with a high-profile guest — plus a companion site and a daily newsletter.",
 "Where cable news is loud and the feed is built for outrage, the show is editorial and unflinching: a serious independent newsroom a person actually wants to read. The promise is simple — leave the audience equipped, not anxious. Every day ends on “What now?”",
 "The show is free to watch. Members fund the work and unlock the full daily dispatch, ad-free audio, and the complete archive. The news itself is never paywalled.",
]
for p in paras:
    y=c.paragraph(M,y,p,c.font(SERIF,29),INK_SOFT,W-2*M,46)+26
# how it works mini
y+=10; c.text(M,y,"The daily rhythm",c.font(SANS_B,20),INK,anchor="lm"); y+=50
for t,d in [("Lunch Break Live","~10 min, live, midday — the immediate read."),
            ("The Evening Show","~20 min — a conversation with a guest who’s shaping the news."),
            ("The Daily Dispatch","the column-grade take, distilled, in your inbox.")]:
    c.ellipse(M,y-7,M+14,y+7,fill=AZURE_BRIGHT)
    c.text(M+36,y,t,c.font(SANS_SB,24),INK,anchor="lm"); c.text(M+470,y,d,c.font(SANS,22),MUTED,anchor="lm"); y+=52
pages.append(c.image())

# ---------- 3 THE SHOW ----------
c=Canvas(W,H,PAPER); header(c,3,"The product","the show.")
y=370
# segments cards
seg=[("Lunch Break Live","~10 min · daily · live","A tight, live read on the day’s biggest story — reaction in real time, the audience in the room."),
     ("The Evening Show","~20 min · daily","A deeper conversation with a high-profile guest — the people and ideas behind the headlines."),
     ("The Daily Dispatch","daily · email","The column-grade take, distilled — what happened, why it matters, what to do with it.")]
for t,m,d in seg:
    c.rrect(M,y,W-M,y+150,16,fill=SURFACE,outline=LINE,width=2)
    c.text(M+40,y+44,t,c.font(SERIF_SB,34),INK,anchor="lm")
    c.text(M+40,y+92,m.upper(),c.font(SANS_B,15),AZURE_DARK,anchor="lm")
    c.paragraph(M+560,y+38,d,c.font(SANS,22),INK_SOFT,W-M-(M+560)-30,32)
    y+=172
y+=20
c.text(M,y,"Who it’s for",c.font(SANS_B,20),INK,anchor="lm"); y+=46
y=c.paragraph(M,y,"Politically engaged adults who want to make sense of the day from someone they trust — readers of opinion columns, NPR/PBS listeners, Substack subscribers, and YouTube-news watchers. They arrive on a phone between things, and on desktop when they sit to read.",c.font(SERIF,29),INK_SOFT,W-2*M,46)
y+=36
c.rrect(M,y,W-M,y+170,16,fill=INK)
c.text_ls(M+44,y+50,"THE LINE",c.font(SANS_B,15),AZURE_BRIGHT,3.0)
c.paragraph(M+44,y+80,"The show is free. Members keep independent journalism independent. The news itself is never paywalled.",c.font(SERIF_SB,32),PAPER,W-2*M-88,42)
pages.append(c.image())

# ---------- 4 HOST ----------
c=Canvas(W,H,PAPER); header(c,4,"The host","Charles M. Blow.")
# portrait placeholder (duotone) — azure->ink
px0,py0,px1,py1=M,370,M+520,940
for i in range(py0,py1):
    t=(i-py0)/(py1-py0)
    col=tuple(int(AZURE_BRIGHT[k]+(INK[k]-AZURE_BRIGHT[k])*t) for k in range(3))
    c.line(px0,i,px1,i,fill=col,width=1)
c.rrect(px0,py0,px1,py1,16,outline=None,width=1)
c.text((px0+px1)/2,(py0+py1)/2-10,"CB",c.font(SERIF_SB,150),PAPER,anchor="mm")
c.text((px0+px1)/2,py1-44,"[ host portrait ]",c.font(SANS_SB,18),PAPER,anchor="mm")
# bio
bx=M+580
c.text(bx,400,"Host & creator",c.font(SANS_B,18),AZURE_DARK,anchor="lm")
c.paragraph(bx,452,"Charles M. Blow is a political commentator known publicly as a New York Times Opinion columnist and the author of the memoir “Fire Shut Up in My Bones” and “The Devil You Know: A Black Power Manifesto.”",c.font(SERIF,28),INK_SOFT,W-M-bx,42)
c.paragraph(bx,640,"On the show he brings the smartest seat at the table to the day’s news — sharp, principled, and in conversation.",c.font(SERIF,28),INK_SOFT,W-M-bx,42)
# verify note
c.rrect(bx,790,W-M,880,12,fill=AZURE_TINT)
c.paragraph(bx+30,820,"DRAFT bio — verify every fact and confirm host authorization before publishing.",c.font(SANS_SB,19),AZURE_DARK,W-M-bx-60,28)
# quote
qy=1010
c.line(M,qy,W-M,qy,fill=LINE,width=1)
c.text(M,qy+60,"“",c.font(SERIF_SB,140),AZURE_TINT,anchor="lm")
c.paragraph(M+90,qy+90,"[Placeholder quote — to be approved. Theme: the day’s news deserves a seat at the table where you leave understanding it, not just angrier.]",c.font(SERIF_I,40),INK,W-2*M-120,56)
c.text(M+90,qy+330,"— Charles M. Blow  (quote pending approval)",c.font(SANS_SB,22),MUTED,anchor="lm")
pages.append(c.image())

# ---------- 5 FAST FACTS + BLURBS ----------
c=Canvas(W,H,PAPER); header(c,5,"For editors","fast facts & blurbs.")
y=370
facts=[("Category","Daily independent political-media show"),
       ("Format","Two daily segments + daily newsletter"),
       ("Cadence","Weekdays — midday live + evening conversation"),
       ("Platforms","YouTube, podcast, newsletter, charlesblowshow.com"),
       ("Model","Free to watch · membership-funded · sponsor-supported"),
       ("Audience","Politically engaged adults seeking understanding, not outrage"),
       ("Status","Launching soon — building waitlist & founding members")]
for k,v in facts:
    c.text(M,y,k,c.font(SANS_B,20),AZURE_DARK,anchor="lm")
    c.text(M+330,y,v,c.font(SERIF,27),INK,anchor="lm")
    c.line(M,y+44,W-M,y+44,fill=LINE_SOFT,width=1); y+=74
y+=20
c.text(M,y,"Copy-paste blurbs",c.font(SANS_B,20),INK,anchor="lm"); y+=54
blurbs=[("One-liner","A daily, independent take on race, politics, and power — in conversation."),
        ("Social (X / IG)","The smartest seat at the table — every day. A sharp midday read and an evening conversation on race, politics & power. Launching soon ▸ charlesblowshow.com"),
        ("Newsletter (2 sentences)","The Charles Blow Show is a daily independent political show — a live midday read and an evening conversation with the people shaping the news. The show is free; members fund the work and get the full daily dispatch, ad-free audio, and the archive.")]
for k,v in blurbs:
    c.text(M,y,k.upper(),c.font(SANS_B,15),AZURE_DARK,anchor="lm"); y+=40
    y=c.paragraph(M,y,v,c.font(SERIF,27),INK_SOFT,W-2*M,40)+30
pages.append(c.image())

# ---------- 6 PARTNERSHIP ----------
c=Canvas(W,H,PAPER); header(c,6,"Work with us","partnership.")
y=370
y=c.paragraph(M,y,"Independent media runs on a diversified base. The show is funded across three legs — and partners can plug into each.",c.font(SERIF,30),INK_SOFT,W-2*M,46)+30
legs=[("Membership","Audience-funded core. Free show; Member ($7/mo or $70/yr) unlocks ad-free audio, the full dispatch, and the archive; a limited Founding Member cohort gets credits + a quarterly live call."),
      ("Sponsorship","Host-read, brand-aligned slots (pre-/mid-roll) and newsletter placement. A Founding Sponsor package bundles reads, a newsletter slot, and a launch-partner mention. Rates shared on request."),
      ("Platform & ads","YouTube and podcast ad revenue that scales with reach — treated as upside on top of memberships and sponsorships.")]
for i,(t,d) in enumerate(legs):
    c.text(M,y,f"0{i+1}",c.font(SERIF_SB,40),AZURE,anchor="lm")
    c.text(M+90,y+6,t,c.font(SERIF_SB,34),INK,anchor="lm")
    y=c.paragraph(M+90,y+58,d,c.font(SANS,23),INK_SOFT,W-M-(M+90),34)+40
# founding sponsor callout
c.rrect(M,y,W-M,y+200,16,fill=INK)
c.text_ls(M+44,y+50,"FOUNDING SPONSOR",c.font(SANS_B,15),AZURE_BRIGHT,3.0)
c.paragraph(M+44,y+84,"Back the launch quarter: a fixed set of host-read placements, a recurring newsletter slot, and recognition as a founding partner of an independent newsroom.",c.font(SERIF,28),PAPER,W-2*M-88,40)
pages.append(c.image())

# ---------- 7 ASSETS & CONTACT (back) ----------
c=Canvas(W,H,INK)
c.rect(0,0,W,10,fill=AZURE_BRIGHT)
eyebrow(c,M,200,"Available assets",AZURE_BRIGHT,4.0,17)
assets=["Brand guidelines (PDF) — identity & usage","Logo: CB monogram + wordmark (SVG/PNG, azure)",
        "Social graphics: launch, manifesto, format, founding member","Lower-third & YouTube thumbnail templates","High-res assets on request"]
ay=270
for a in assets:
    c.ellipse(M,ay+8,M+14,ay+22,fill=AZURE_BRIGHT)
    c.text(M+40,ay+15,a,c.font(SERIF,29),PAPER,anchor="lm"); ay+=64
c.line(M,ay+30,W-M,ay+30,fill=(60,64,74),width=1)
monogram(c,W/2,ay+260,130,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
c.text(W/2,ay+440,"Let’s talk.",c.font(SERIF_SB,56),PAPER,anchor="mm")
for i,(k,v) in enumerate([("Press","press@charlesblowshow.com"),("Owner","isaidwhaticed@gmail.com"),
                          ("Web","charlesblowshow.com"),("Social","@charlesblowshow")]):
    yy=ay+540+i*60
    c.text(W/2-30,yy,k,c.font(SANS_SB,23),(150,154,162),anchor="rm")
    c.text(W/2+30,yy,v,c.font(SANS_SB,23),PAPER,anchor="lm")
c.text(W/2,2040,"Draft v1.0 · figures and bio are drafts — verify & secure approvals before public use.",c.font(SANS,18),(120,124,132),anchor="mm")
pages.append(c.image())

save_pdf(pages,OUT)
pv="/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/_build/preview_presskit"; os.makedirs(pv,exist_ok=True)
for i,p in enumerate(pages,1): p.save(f"{pv}/p{i:02d}.png")
print("wrote",OUT,"pages:",len(pages))
