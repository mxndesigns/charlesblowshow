#!/usr/bin/env python3
"""Example edited 'recent events' clip with the Charles Blow Show logo on it.
Branded motion template (sample headlines) -> MP4 via bundled ffmpeg."""
import sys; sys.path.insert(0,"/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/_build")
import os, math, subprocess, numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg
from brandkit import (PAPER,SURFACE,INK,INK_SOFT,MUTED,LINE,AZURE,AZURE_BRIGHT,AZURE_DARK,
                      SERIF,SERIF_SB,SERIF_I,SANS,SANS_SB,SANS_B)

W,H,FPS=1920,1080,30
OUTDIR="/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/CharlesBlowShow_Social_Media/video"
FRAMES="/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/_build/frames"
os.makedirs(OUTDIR,exist_ok=True); os.makedirs(FRAMES,exist_ok=True)
for f in os.listdir(FRAMES):
    if f.endswith(".png"): os.remove(os.path.join(FRAMES,f))

_fc={}
def F(path,sz):
    k=(path,sz)
    if k not in _fc: _fc[k]=ImageFont.truetype(path,sz)
    return _fc[k]
def ease(p): p=max(0.0,min(1.0,p)); return 1-(1-p)**3
def lerp(a,b,t): return a+(b-a)*t
def clamp01(x): return max(0.0,min(1.0,x))

def tw(d,t,f): return d.textlength(t,font=f)
def ls_text(d,x,y,t,f,fill,ls,anchor_v="m"):
    cx=x; a="l"+("m" if anchor_v=="m" else "a")
    for ch in t:
        d.text((cx,y),ch,font=f,fill=fill,anchor=a); cx+=d.textlength(ch,font=f)+ls
    return cx-x
def ls_w(d,t,f,ls): return sum(d.textlength(c,font=f) for c in t)+(len(t)-1)*ls

def mono(d,cx,cy,sq,dark=INK,lt=PAPER,acc=AZURE_BRIGHT):
    half=sq/2; r=int(sq*0.225)
    d.rounded_rectangle([cx-half,cy-half,cx+half,cy+half],radius=r,fill=dark)
    d.text((cx,cy-sq*0.085),"CB",font=F(SERIF_SB,int(sq*0.5)),fill=lt,anchor="mm")
    rw,rh=sq*0.34,max(sq*0.06,2); ry=cy+sq*0.28
    d.rounded_rectangle([cx-rw/2,ry-rh/2,cx+rw/2,ry+rh/2],radius=rh/2,fill=acc)

def tri(d,x,cy,h,color):
    d.polygon([(x,cy-h/2),(x,cy+h/2),(x+h*0.92,cy)],fill=color)

# precomputed clip background: azure_bright -> ink vertical, with bottom scrim baked
ys=np.linspace(0,1,H)[:,None]
top=np.array(AZURE_BRIGHT,float); bot=np.array(INK,float)
grad=top*(1-ys)+bot*ys
# darken toward bottom 45% for caption/lower-third legibility
scrim=np.clip((ys-0.45)/0.55,0,1)*0.55
grad=grad*(1-scrim)+np.array(INK,float)*scrim
CLIP_BG=Image.fromarray(np.repeat(grad[:,None,:],W,axis=1).astype("uint8"),"RGB")
INK_IMG=Image.new("RGB",(W,H),INK)

def blend_to_ink(img,k):
    if k<=0: return img
    return Image.blend(img,INK_IMG,min(1.0,k))

# ---- timeline (seconds) ----
T_INTRO=(0.0,2.4); T_CLIP=(2.4,10.2); T_END=(10.2,12.0); DUR=12.0

S1=("LUNCH BREAK LIVE","Today's top story — what it really means",
    "Here's what today's biggest story actually means.")
S2=("THE EVENING SHOW","The conversation behind the headline",
    "And here's what it changes, going forward.")
SWAP=6.1

def draw_caption(d, sentence, prog, cx, y):
    words=sentence.split(); n=len(words)
    shown=int(clamp01(prog)*n+0.0001); shown=max(0,min(n,shown))
    if shown==0: return
    f=F(SANS_B,46)
    parts=words[:shown]
    widths=[tw(d,w,f) for w in parts]; space=tw(d," ",f)
    total=sum(widths)+space*(shown-1)
    x=cx-total/2
    for i,w in enumerate(parts):
        col=AZURE_BRIGHT if i==shown-1 else PAPER
        d.text((x,y),w,font=f,fill=col,anchor="lm"); x+=widths[i]+space

def lower_third(d, kicker, headline, slide):
    # slide: 0..1 in
    x0=80 - (1-slide)*900
    y0,y1=712,872
    d.rounded_rectangle([x0,y0,x0+1180,y1],radius=18,fill=INK)
    # azure rule
    d.rounded_rectangle([x0+44,y0+44,x0+44+70,y0+44+7],radius=3,fill=AZURE_BRIGHT)
    ls_text(d,x0+140,y0+52,kicker,F(SANS_B,24),AZURE_BRIGHT,4)
    d.text((x0+44,y0+118),headline,font=F(SERIF_SB,48),fill=PAPER,anchor="lm")

def live_dot(d, x, y, t):
    pulse=0.5+0.5*math.sin(t*5.0)
    rr=10+3*pulse
    d.ellipse([x-rr,y-rr,x+rr,y+rr],fill=AZURE_BRIGHT)
    ls_text(d,x+26,y,"LIVE",F(SANS_B,24),AZURE_BRIGHT,4)

def watermark(d,text="EXAMPLE TEMPLATE"):
    ls_text(d,W-360,52,text,F(SANS_B,18),(255,255,255),3)

def frame(t):
    img=None
    if t<T_INTRO[1]:
        img=INK_IMG.copy(); d=ImageDraw.Draw(img)
        p=ease((t-0.0)/0.9)
        # top azure rule grows
        rw=int(ease((t-0.15)/0.9)*(W-300))
        d.rectangle([150,150,150+rw,160],fill=AZURE_BRIGHT)
        sq=int(lerp(90,150,ease((t-0.0)/0.8)))
        mono(d,W/2,H/2-40,sq,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
        if t>0.6:
            d.text((W/2,H/2+150),"The Charles Blow Show",font=F(SERIF_SB,72),fill=PAPER,anchor="mm")
        if t>1.0:
            d.text((W/2,H/2+230),"race, politics & power — in conversation.",font=F(SERIF_I,38),fill=(190,194,201),anchor="mm")
        img=blend_to_ink(img, (t-2.2)/0.2)
    elif t<T_CLIP[1]:
        img=CLIP_BG.copy(); d=ImageDraw.Draw(img)
        tc=t-T_CLIP[0]
        seg = S1 if t<SWAP else S2
        seg_t0 = T_CLIP[0]+0.2 if t<SWAP else SWAP+0.1
        cap_prog=(t-seg_t0)/( (SWAP-0.2-(T_CLIP[0]+0.2)) if t<SWAP else (T_CLIP[1]-0.3-(SWAP+0.1)) )
        # persistent logo bug (top-left) — THE LOGO ON THE VIDEO
        mono(d,150,96,68,dark=INK,lt=PAPER,acc=AZURE_BRIGHT)
        watermark(d)
        live_dot(d, 150, 190, t)
        # date / today eyebrow under bug (clear of the LIVE label)
        ls_text(d,300,190,"TODAY · DAILY CLIP",F(SANS_B,22),(220,235,245),3)
        # footage placeholder marker (this is where real b-roll sits)
        d.text((W/2,430),"[  your footage / b-roll here  ]",font=F(SANS_B,30),fill=(196,222,238),anchor="mm")
        # lower third slide-in (reset per segment)
        slide=ease(min((t-(T_CLIP[0]+0.2))/0.4,1.0)) if t<SWAP else ease(min((t-(SWAP+0.05))/0.35,1.0))
        lower_third(d, seg[0], seg[1], slide)
        # captions band
        d.rounded_rectangle([W/2-560,952,W/2+560,1024],radius=14,fill=INK)
        draw_caption(d, seg[2], cap_prog, W/2, 988)
        # progress bar
        pb=int(clamp01(tc/(T_CLIP[1]-T_CLIP[0]))*W)
        d.rectangle([0,H-7,pb,H],fill=AZURE_BRIGHT)
        # cut flash on swap
        if 0<=t-SWAP<0.10: img=blend_to_ink(img,0.5*(1-(t-SWAP)/0.10))
        img=blend_to_ink(img,(T_CLIP[0]+0.2 - t)/0.2)   # fade in
        img=blend_to_ink(img,(t-(T_CLIP[1]-0.2))/0.2)    # fade out
    else:
        img=INK_IMG.copy(); d=ImageDraw.Draw(img)
        d.rectangle([0,0,W,8],fill=AZURE_BRIGHT)
        te=t-T_END[0]
        sq=int(lerp(110,140,ease(te/0.6)))
        mono(d,W/2,H/2-150,sq,dark=INK_SOFT,lt=PAPER,acc=AZURE_BRIGHT)
        d.text((W/2,H/2+30),"New episodes daily.",font=F(SERIF_SB,64),fill=PAPER,anchor="mm")
        # subscribe pill
        if te>0.4:
            lab="Subscribe"; f=F(SANS_B,30); twd=tw(d,lab,f); ah=24; gap=20; tot=twd+gap+ah
            pw=tot+90; px=W/2; py=H/2+150
            d.rounded_rectangle([px-pw/2,py-44,px+pw/2,py+44],radius=44,fill=AZURE)
            gx=px-tot/2; d.text((gx,py),lab,font=f,fill=PAPER,anchor="lm"); tri(d,gx+twd+gap,py,ah,PAPER)
        d.text((W/2,H/2+260),"@charlesblowshow   ·   charlesblowshow.com",font=F(SANS_SB,28),fill=(190,194,201),anchor="mm")
        d.text((W/2,H-70),"Example template · sample headlines · not an actual broadcast",font=F(SANS,20),fill=(120,124,132),anchor="mm")
        img=blend_to_ink(img,(T_END[0]+0.2 - t)/0.2)
    return img

N=int(DUR*FPS)
for i in range(N):
    t=i/FPS
    frame(t).save(f"{FRAMES}/f_{i:04d}.png")
    if i%30==0: print("frame",i,"/",N)

FFMPEG=imageio_ffmpeg.get_ffmpeg_exe()
OUT=f"{OUTDIR}/CharlesBlowShow_example_clip_16x9.mp4"
cmd=[FFMPEG,"-y","-framerate",str(FPS),"-i",f"{FRAMES}/f_%04d.png",
     "-c:v","libx264","-pix_fmt","yuv420p","-crf","18","-preset","medium",
     "-movflags","+faststart",OUT]
r=subprocess.run(cmd,capture_output=True,text=True)
if r.returncode!=0:
    print("libx264 failed, trying mpeg4...\n",r.stderr[-800:])
    cmd=[FFMPEG,"-y","-framerate",str(FPS),"-i",f"{FRAMES}/f_%04d.png","-c:v","mpeg4","-q:v","3",OUT]
    r=subprocess.run(cmd,capture_output=True,text=True)
print("ffmpeg rc",r.returncode)
print("wrote",OUT, os.path.getsize(OUT) if os.path.exists(OUT) else "MISSING","bytes")
# keep one still for preview
frame(4.5).save(f"{FRAMES}/_still_clip.png")
frame(0.9).save(f"{FRAMES}/_still_intro.png")
frame(11.0).save(f"{FRAMES}/_still_end.png")
