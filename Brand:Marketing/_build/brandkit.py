"""Shared brand toolkit for The Charles Blow Show partner collateral.
Real brand faces (Newsreader + Inter), azure palette, 2x supersampled rendering."""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = "/Users/cedmixon/Documents/CharlesBlowShow"
FONTS = f"{ROOT}/assets/fonts"

# ---- palette (docs/10-brand-guidelines.md) ----
PAPER=(251,250,246); SURFACE=(255,255,255); INK=(20,22,29); INK_SOFT=(42,45,54)
MUTED=(108,112,119); LINE=(231,227,217); LINE_SOFT=(238,235,227)
AZURE=(0,144,204); AZURE_BRIGHT=(0,178,244); AZURE_DARK=(10,106,148); AZURE_TINT=(225,243,253)
PAPER_DIM=(214,212,206)

def _f(name): return f"{FONTS}/{name}"
SERIF   = _f("Newsreader-Regular.ttf")
SERIF_SB= _f("Newsreader-SemiBold.ttf")
SERIF_I = _f("Newsreader-Italic.ttf")
SANS    = _f("Inter-Regular.ttf")
SANS_SB = _f("Inter-SemiBold.ttf")
SANS_B  = _f("Inter-Bold.ttf")

class Canvas:
    def __init__(self, w, h, bg=PAPER, ss=2):
        self.w, self.h, self.ss = w, h, ss
        self.img = Image.new("RGB", (w*ss, h*ss), bg)
        self.d = ImageDraw.Draw(self.img)
    def S(self, v): return int(round(v*self.ss))
    def font(self, path, size): return ImageFont.truetype(path, self.S(size))
    # primitives (final-px coords)
    def rect(self,x0,y0,x1,y1,fill=None,outline=None,width=1):
        self.d.rectangle([self.S(x0),self.S(y0),self.S(x1),self.S(y1)],fill=fill,outline=outline,width=self.S(width))
    def rrect(self,x0,y0,x1,y1,r,fill=None,outline=None,width=1):
        self.d.rounded_rectangle([self.S(x0),self.S(y0),self.S(x1),self.S(y1)],radius=self.S(r),fill=fill,outline=outline,width=self.S(width))
    def line(self,x0,y0,x1,y1,fill=LINE,width=1):
        self.d.line([self.S(x0),self.S(y0),self.S(x1),self.S(y1)],fill=fill,width=self.S(width))
    def ellipse(self,x0,y0,x1,y1,fill=None,outline=None,width=1):
        self.d.ellipse([self.S(x0),self.S(y0),self.S(x1),self.S(y1)],fill=fill,outline=outline,width=self.S(width))
    def tlen(self,t,f): return self.d.textlength(t,font=f)/self.ss
    def text(self,x,y,t,f,fill,anchor="la"):
        self.d.text((self.S(x),self.S(y)),t,font=f,fill=fill,anchor=anchor)
    def fit(self,t,path,target_w,start,lo=8):
        s=start
        while s>lo and self.tlen(t,self.font(path,s))>target_w: s-=1
        return s
    # letter-spaced run
    def text_ls(self,x,y,t,f,fill,ls,av="m"):
        cx=self.S(x); a="l"+("m" if av=="m" else "a")
        for ch in t:
            self.d.text((cx,self.S(y)),ch,font=f,fill=fill,anchor=a); cx+=self.d.textlength(ch,font=f)+self.S(ls)
        return (cx-self.S(x))/self.ss
    def measure_ls(self,t,f,ls): return sum(self.d.textlength(c,font=f) for c in t)/self.ss+(len(t)-1)*ls
    def text_ls_center(self,xc,y,t,f,fill,ls,av="m"):
        w=self.measure_ls(t,f,ls); return self.text_ls(xc-w/2,y,t,f,fill,ls,av)
    # word wrap → list of lines
    def wrap(self,t,f,max_w):
        words=t.split(); lines=[]; cur=""
        for w in words:
            trial=(cur+" "+w).strip()
            if self.tlen(trial,f)<=max_w or not cur: cur=trial
            else: lines.append(cur); cur=w
        if cur: lines.append(cur)
        return lines
    def paragraph(self,x,y,t,f,fill,max_w,leading,anchor_la="la"):
        for ln in self.wrap(t,f,max_w):
            self.text(x,y,ln,f,fill,anchor=anchor_la); y+=leading
        return y
    def image(self): return self.img.resize((self.w,self.h),Image.LANCZOS)
    def save_png(self,path):
        os.makedirs(os.path.dirname(path),exist_ok=True); self.image().save(path); return path

# ---- the CB monogram ----
def monogram(c:Canvas, cx, cy, sq, dark=INK, lt=PAPER, acc=AZURE_BRIGHT):
    half=sq/2; r=sq*0.225
    c.rrect(cx-half,cy-half,cx+half,cy+half,r,fill=dark)
    c.text(cx,cy-sq*0.085,"CB",c.font(SERIF_SB,sq*0.5),lt,anchor="mm")
    rw,rh=sq*0.34,max(sq*0.06,2); ry=cy+sq*0.28
    c.rrect(cx-rw/2,ry-rh/2,cx+rw/2,ry+rh/2,rh/2,fill=acc)

def save_pdf(pages, path, resolution=200.0):
    """pages: list of PIL RGB images (already downscaled). Save multi-page PDF."""
    os.makedirs(os.path.dirname(path),exist_ok=True)
    pages[0].save(path,"PDF",save_all=True,append_images=pages[1:],resolution=resolution)
    return path
