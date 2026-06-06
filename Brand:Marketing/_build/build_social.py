#!/usr/bin/env python3
import sys; sys.path.insert(0,"/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/_build")
from brandkit import *
import os

BASE="/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/CharlesBlowShow_Social_Media"
POSTS=f"{BASE}/posts"; STORIES=f"{BASE}/stories"
os.makedirs(POSTS,exist_ok=True); os.makedirs(STORIES,exist_ok=True)

def arrow(c,x,cy,h,color):
    s=c.S; c.d.polygon([(s(x),s(cy-h/2)),(s(x),s(cy+h/2)),(s(x+h*0.92),s(cy))],fill=color)

def cta_pill(c,cx,cy,label,fsize,pill_fill,txt_fill,pad=44):
    f=c.font(SANS_B,fsize); tw=c.tlen(label,f); ah=fsize*0.78; gap=fsize*0.7
    total=tw+gap+ah; w=total+pad*2; h=fsize*2.5
    c.rrect(cx-w/2,cy-h/2,cx+w/2,cy+h/2,h/2,fill=pill_fill)
    gx=cx-total/2
    c.text(gx,cy,label,f,txt_fill,anchor="lm")
    arrow(c,gx+tw+gap,cy,ah,txt_fill)

def cta_outline(c,cx,cy,label,fsize,line_fill,txt_fill,pad=44):
    f=c.font(SANS_B,fsize); tw=c.tlen(label,f); ah=fsize*0.78; gap=fsize*0.7
    total=tw+gap+ah; w=total+pad*2; h=fsize*2.5
    c.rrect(cx-w/2,cy-h/2,cx+w/2,cy+h/2,h/2,outline=line_fill,width=3)
    gx=cx-total/2
    c.text(gx,cy,label,f,txt_fill,anchor="lm")
    arrow(c,gx+tw+gap,cy,ah,txt_fill)

def eyebrow(c,x,y,t,color,ls,size,av="m"): return c.text_ls(x,y,t.upper(),c.font(SANS_B,size),color,ls,av)
def eyebrow_c(c,xc,y,t,color,ls,size): return c.text_ls_center(xc,y,t.upper(),c.font(SANS_B,size),color,ls)

def headline(c,cx,cy,text,size,color=INK,max_w=900,period=True,leading=None,bold=True):
    f=c.font(SERIF_SB if bold else SERIF,size); leading=leading or size*1.05
    lines=c.wrap(text,f,max_w); total=leading*(len(lines)-1); y=cy-total/2
    for i,ln in enumerate(lines):
        if i==len(lines)-1 and period:
            w=c.tlen(ln,f); pw=c.tlen(".",f); x0=cx-(w+pw)/2
            c.text(x0,y,ln,f,color,anchor="lm"); c.text(x0+w,y,".",f,AZURE_BRIGHT,anchor="lm")
        else:
            c.text(cx,y,ln,f,color,anchor="mm")
        y+=leading
    return y

# fit a headline's size so longest word/line fits
def fit_head(c,text,start,max_w):
    s=start
    while s>20:
        f=c.font(SERIF_SB,s)
        if all(c.tlen(w,f)<=max_w for w in text.split()) and max(c.tlen(l,f) for l in c.wrap(text,f,max_w))<=max_w: break
        s-=2
    return s

# ============ POSTS (1080×1080) ============
def post1_launch():
    c=Canvas(1080,1080,INK); c.rect(0,0,1080,8,fill=AZURE_BRIGHT)
    eyebrow_c(c,540,150,"Launching soon · a daily show",AZURE_BRIGHT,5,22)
    monogram(c,540,330,150,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
    headline(c,540,600,"Race, politics & power in America",58,PAPER,max_w=900,period=False,leading=72)
    c.text(540,720,"— in conversation.",c.font(SERIF_I,42),(190,194,201),anchor="mm")
    c.line(120,940,960,940,fill=(60,64,74),width=1)
    c.text(120,990,"@charlesblowshow",c.font(SANS_SB,28),PAPER,anchor="lm")
    c.text(960,990,"charlesblowshow.com",c.font(SANS_SB,28),AZURE_BRIGHT,anchor="rm")
    c.save_png(f"{POSTS}/post-1-launch.png")

def post2_manifesto():
    c=Canvas(1080,1080,PAPER)
    eyebrow_c(c,540,150,"The Charles Blow Show",AZURE_DARK,5,20)
    sz=fit_head(c,"Race, politics & power in America in conversation",78,880)
    headline(c,540,560,"Race, politics & power in America — in conversation",sz,INK,max_w=880,period=True,leading=sz*1.06)
    monogram(c,540,930,76)
    c.save_png(f"{POSTS}/post-2-manifesto.png")

def post3_format():
    c=Canvas(1080,1080,PAPER)
    eyebrow(c,120,140,"The format",AZURE_DARK,5,20,av="m")
    c.text(118,210,"two segments",c.font(SERIF_SB,76),INK,anchor="lm")
    c.text(118+c.tlen("two segments",c.font(SERIF_SB,76)),210,".",c.font(SERIF_SB,76),AZURE_BRIGHT,anchor="lm")
    rows=[("Lunch Break Live","~10 min · live · midday"),("The Evening Show","~20 min · with a guest"),("The Daily Dispatch","daily · in your inbox")]
    y=400
    for t,d in rows:
        c.ellipse(120,y-9,138,y+9,fill=AZURE_BRIGHT)
        c.text(170,y,t,c.font(SERIF_SB,46),INK,anchor="lm")
        c.text(170,y+52,d.upper(),c.font(SANS_B,20),MUTED,anchor="lm")
        c.line(120,y+110,960,y+110,fill=LINE,width=1); y+=180
    c.text(120,1000,"@charlesblowshow",c.font(SANS_SB,26),INK,anchor="lm")
    c.text(960,1000,"charlesblowshow.com",c.font(SANS_SB,26),AZURE_DARK,anchor="rm")
    c.save_png(f"{POSTS}/post-3-format.png")

def post4_founding():
    c=Canvas(1080,1080,AZURE_BRIGHT)
    eyebrow_c(c,540,160,"Founding member",INK,5,22)
    headline(c,540,460,"The show is free. Members keep it independent",62,INK,max_w=900,period=True,leading=78)
    c.text(540,760,"Back independent journalism — and get the full",c.font(SANS,26),INK,anchor="mm")
    c.text(540,798,"dispatch, ad-free audio, and the archive.",c.font(SANS,26),INK,anchor="mm")
    cta_pill(c,540,916,"Become a founding member",26,INK,PAPER)
    c.save_png(f"{POSTS}/post-4-founding-member.png")

def post5_follow():
    c=Canvas(1080,1080,INK); c.rect(0,0,1080,8,fill=AZURE_BRIGHT)
    eyebrow_c(c,540,150,"Where to follow",AZURE_BRIGHT,5,20)
    headline(c,540,330,"The smartest seat at the table — every day",54,PAPER,max_w=880,period=True,leading=66)
    chans=["YouTube — the home of the show","Instagram — daily clips","Substack — the column & dispatch","LinkedIn — the conversation, for pros"]
    y=560
    for ch in chans:
        name,rest=ch.split(" — ")
        c.ellipse(180,y-7,194,y+7,fill=AZURE_BRIGHT)
        c.text(218,y,name,c.font(SANS_SB,30),PAPER,anchor="lm")
        c.text(218+c.tlen(name,c.font(SANS_SB,30))+16,y+2,"· "+rest,c.font(SANS,24),(150,154,162),anchor="lm")
        y+=78
    monogram(c,540,940,84,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
    c.save_png(f"{POSTS}/post-5-follow.png")

# ============ STORIES (1080×1920) ============
def story1_launch():
    c=Canvas(1080,1920,INK); c.rect(0,0,1080,10,fill=AZURE_BRIGHT)
    eyebrow_c(c,540,300,"Launching soon",AZURE_BRIGHT,6,24)
    monogram(c,540,560,170,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
    headline(c,540,1010,"A daily show on race, politics & power",70,PAPER,max_w=860,period=True,leading=88)
    c.text(540,1280,"in conversation — not in outrage.",c.font(SERIF_I,40),(190,194,201),anchor="mm")
    c.line(120,1640,960,1640,fill=(60,64,74),width=1)
    c.text(540,1710,"@charlesblowshow",c.font(SANS_SB,30),PAPER,anchor="mm")
    c.text(540,1760,"charlesblowshow.com",c.font(SANS_SB,28),AZURE_BRIGHT,anchor="mm")
    c.save_png(f"{STORIES}/story-1-launch.png")

def story2_manifesto():
    c=Canvas(1080,1920,PAPER)
    eyebrow_c(c,540,320,"The Charles Blow Show",AZURE_DARK,6,22)
    headline(c,540,920,"Race, politics & power in America — in conversation",82,INK,max_w=860,period=True,leading=92)
    c.text(540,1360,"the smartest seat at the table, every day.",c.font(SERIF_I,38),MUTED,anchor="mm")
    monogram(c,540,1660,90)
    c.save_png(f"{STORIES}/story-2-manifesto.png")

def story3_founding():
    c=Canvas(1080,1920,AZURE_BRIGHT)
    eyebrow_c(c,540,300,"Founding member",INK,6,24)
    headline(c,540,720,"The show is free. Members keep it independent",74,INK,max_w=880,period=True,leading=92)
    benefits=["Ad-free, early audio","The full daily dispatch","The complete archive","Name in the credits"]
    y=1120
    for b in benefits:
        c.ellipse(300,y-8,318,y+10,fill=INK)
        c.text(348,y,b,c.font(SANS_SB,34),INK,anchor="lm"); y+=86
    cta_pill(c,540,1603,"Become a founding member",30,INK,PAPER)
    c.text(540,1720,"link in bio",c.font(SANS_SB,26),INK,anchor="mm")
    c.save_png(f"{STORIES}/story-3-founding-member.png")

def story4_live():
    c=Canvas(1080,1920,INK); c.rect(0,0,1080,10,fill=AZURE_BRIGHT)
    # live row
    c.ellipse(380,360,410,390,fill=AZURE_BRIGHT)
    c.text_ls(430,376,"LIVE NOW",c.font(SANS_B,30),AZURE_BRIGHT,5)
    headline(c,540,820,"Lunch Break Live",92,PAPER,max_w=900,period=True,leading=104)
    c.text(540,1080,"The day’s biggest story — the immediate read.",c.font(SERIF_I,40),(190,194,201),anchor="mm")
    cta_outline(c,540,1365,"Watch on YouTube",30,AZURE_BRIGHT,AZURE_BRIGHT)
    monogram(c,540,1660,90,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
    c.save_png(f"{STORIES}/story-4-live.png")

for fn in [post1_launch,post2_manifesto,post3_format,post4_founding,post5_follow,
           story1_launch,story2_manifesto,story3_founding,story4_live]:
    fn()
print("wrote posts:",len(os.listdir(POSTS)),"stories:",len(os.listdir(STORIES)))
