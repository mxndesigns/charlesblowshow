#!/usr/bin/env python3
"""Charles Blow Show — marketing email designs.
One content spec -> usable email HTML + PNG design previews. Brand: azure, Newsreader+Inter."""
import sys; sys.path.insert(0,"/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/_build")
import os, html
from brandkit import (Canvas, PAPER,SURFACE,INK,INK_SOFT,MUTED,LINE,LINE_SOFT,AZURE,AZURE_BRIGHT,
                      AZURE_DARK,AZURE_TINT, SERIF,SERIF_SB,SERIF_I,SANS,SANS_SB,SANS_B, monogram)

OUT="/Users/cedmixon/Documents/CharlesBlowShow/Brand:Marketing/Emails_CharlesBlowShow/emails_cbs"
PV=f"{OUT}/previews"; os.makedirs(PV,exist_ok=True)
CARDW=600; PAD=44; INNER=CARDW-2*PAD; BACKDROP=(236,234,228)

def hx(c): return "#%02x%02x%02x"%c
SERIF_STACK="'Newsreader', Georgia, 'Times New Roman', serif"
SANS_STACK="'Inter', -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"

# ---------- element constructors ----------
def eyebrow(t,onaz=False): return ("eyebrow",t,onaz)
def h1(t): return ("h1",t)
def h2(t): return ("h2",t)
def p(t): return ("p",t)
def small(t): return ("small",t)
def button(label,href="#",style="azure"): return ("button",label,href,style)
def bullets(items): return ("bullets",items)
def rule(): return ("rule",)
def segs(rows): return ("segs",rows)
def imgph(label): return ("img",label)
def space(h): return ("space",h)
def logo(dark=False): return ("logo",dark)
def quote(t,by): return ("quote",t,by)

def band(bg,*els,pad=PAD): return {"bg":bg,"pad":pad,"els":list(els)}
def footer(dark=False): return ("footer",dark)

# ============================================================
# PNG RENDERER (single tall canvas -> crop)
# ============================================================
def txtcol(ondark,kind="body"):
    if ondark: return {"body":(210,213,219),"head":PAPER,"muted":(150,154,162)}[kind]
    return {"body":INK_SOFT,"head":INK,"muted":MUTED}[kind]

def draw_button(c,x,y,label,style,ondark,inner):
    if style=="azure": fill,tc,outline=AZURE,PAPER,None
    elif style=="ink": fill,tc,outline=(INK if not ondark else PAPER),(PAPER if not ondark else INK),None
    else: fill,tc,outline=None,(AZURE_DARK if not ondark else AZURE_BRIGHT),(AZURE if not ondark else AZURE_BRIGHT)
    f=c.font(SANS_B,17); tw=c.tlen(label,f); ah=15; gap=12; tot=tw+gap+ah; w=tot+64; h=54
    if outline: c.rrect(x,y,x+w,y+h,10,outline=outline,width=2)
    else: c.rrect(x,y,x+w,y+h,10,fill=fill)
    gx=x+(w-tot)/2
    c.text(gx,y+h/2,label,f,tc,anchor="lm")
    ax=gx+tw+gap; cy=y+h/2; c.d.polygon([(c.S(ax),c.S(cy-ah/2)),(c.S(ax),c.S(cy+ah/2)),(c.S(ax+ah*0.9),c.S(cy))],fill=tc)
    return h

def render_png(email):
    c=Canvas(CARDW+80, 6000, BACKDROP, ss=2)
    x0=40; y=40; cardx1=x0+CARDW
    for bd in email["bands"]:
        bg=bd["bg"]; pad=bd["pad"]; inner=CARDW-2*pad; ondark=(sum(bg)<300)
        ytop=y; ix=x0+pad; iy=y+pad
        for el in bd["els"]:
            k=el[0]
            if k=="logo":
                dark=el[1]
                monogram(c,ix+27,iy+20,54,dark=(INK if not dark else INK_SOFT),lt=PAPER,acc=AZURE_BRIGHT)
                c.text(ix+72,iy+20,"The Charles Blow Show",c.font(SERIF_SB,24),txtcol(ondark,"head"),anchor="lm")
                iy+=66
            elif k=="eyebrow":
                col=AZURE_BRIGHT if ondark else AZURE_DARK
                c.text_ls(ix,iy+8,el[1].upper(),c.font(SANS_B,13),col,2.5,av="m"); iy+=34
            elif k=="h1":
                f=c.font(SERIF_SB,32)
                for ln in c.wrap(el[1],f,inner): c.text(ix,iy,ln,f,txtcol(ondark,"head"),anchor="la"); iy+=40
                iy+=8
            elif k=="h2":
                f=c.font(SERIF_SB,23)
                for ln in c.wrap(el[1],f,inner): c.text(ix,iy,ln,f,txtcol(ondark,"head"),anchor="la"); iy+=30
                iy+=6
            elif k=="p":
                f=c.font(SANS,16)
                for ln in c.wrap(el[1],f,inner): c.text(ix,iy,ln,f,txtcol(ondark,"body"),anchor="la"); iy+=25
                iy+=12
            elif k=="small":
                f=c.font(SANS,13)
                for ln in c.wrap(el[1],f,inner): c.text(ix,iy,ln,f,txtcol(ondark,"muted"),anchor="la"); iy+=19
                iy+=8
            elif k=="button":
                iy+=draw_button(c,ix,iy,el[1],el[3],ondark,inner)+18
            elif k=="bullets":
                for it in el[1]:
                    c.ellipse(ix+2,iy+8,ix+12,iy+18,fill=AZURE_BRIGHT)
                    f=c.font(SANS,16); first=True
                    for ln in c.wrap(it,f,inner-30):
                        c.text(ix+28,iy,ln,f,txtcol(ondark,"body"),anchor="la"); iy+=25
                    iy+=6
                iy+=6
            elif k=="segs":
                for title,meta in el[1]:
                    c.ellipse(ix+1,iy+9,ix+13,iy+21,fill=AZURE_BRIGHT)
                    c.text(ix+30,iy,title,c.font(SERIF_SB,21),txtcol(ondark,"head"),anchor="la")
                    c.text(ix+30,iy+30,meta.upper(),c.font(SANS_B,12),txtcol(ondark,"muted"),anchor="la")
                    iy+=70
            elif k=="quote":
                c.text(ix,iy-6,"“",c.font(SERIF_SB,70),AZURE_TINT if not ondark else INK_SOFT,anchor="la")
                f=c.font(SERIF_I,24)
                for ln in c.wrap(el[1],f,inner-40): c.text(ix+44,iy+18,ln,f,txtcol(ondark,"head"),anchor="la"); iy+=34
                iy+=20; c.text(ix+44,iy,el[2],c.font(SANS_SB,15),txtcol(ondark,"muted"),anchor="la"); iy+=34
            elif k=="img":
                bx0,by0,bx1,by1=ix,iy,ix+inner,iy+200
                for i in range(by0,by1):
                    t=(i-by0)/(by1-by0); col=tuple(int(AZURE_BRIGHT[j]+(INK[j]-AZURE_BRIGHT[j])*t) for j in range(3))
                    c.line(bx0,i,bx1,i,fill=col)
                c.text((bx0+bx1)/2,(by0+by1)/2,el[1],c.font(SANS_B,16),PAPER,anchor="mm"); iy+=216
            elif k=="rule":
                c.line(ix,iy+6,ix+inner,iy+6,fill=(LINE if not ondark else (52,56,66))); iy+=22
            elif k=="space":
                iy+=el[1]
            elif k=="footer":
                dark=el[1]
                c.line(ix,iy,ix+inner,iy,fill=(LINE if not ondark else (52,56,66))); iy+=26
                monogram(c,ix+18,iy+14,40,dark=(INK if not ondark else INK_SOFT),lt=PAPER,acc=AZURE_BRIGHT)
                c.text(ix+48,iy+14,"The Charles Blow Show",c.font(SERIF_SB,18),txtcol(ondark,"head"),anchor="lm"); iy+=52
                c.text(ix,iy,"@charlesblowshow  ·  charlesblowshow.com",c.font(SANS_SB,14),txtcol(ondark,"muted"),anchor="la"); iy+=26
                c.text(ix,iy,"You're receiving this because you signed up at charlesblowshow.com.",c.font(SANS,12),txtcol(ondark,"muted"),anchor="la"); iy+=18
                c.text(ix,iy,"Unsubscribe  ·  Update preferences  ·  [mailing address]",c.font(SANS,12),txtcol(ondark,"muted"),anchor="la"); iy+=18
        # band bg paint behind: we drew text on backdrop; instead repaint band bg then redraw? -> draw bg FIRST
        y=iy+pad
    # NOTE: bands were drawn without bg behind (text on backdrop). Re-render properly below.
    return None  # replaced by render_png2

# The above approach needs bg-first; implement clean version:
def render_png2(email):
    # PASS 1 measure heights by drawing to scratch
    scratch=Canvas(10,10,BACKDROP,ss=2)
    def measure_band(bd):
        inner=CARDW-2*bd["pad"]; h=bd["pad"]*2; c=scratch
        for el in bd["els"]:
            k=el[0]
            if k=="logo": h+=66
            elif k=="eyebrow": h+=34
            elif k=="h1": h+=len(c.wrap(el[1],c.font(SERIF_SB,32),inner))*40+8
            elif k=="h2": h+=len(c.wrap(el[1],c.font(SERIF_SB,23),inner))*30+6
            elif k=="p": h+=len(c.wrap(el[1],c.font(SANS,16),inner))*25+12
            elif k=="small": h+=len(c.wrap(el[1],c.font(SANS,13),inner))*19+8
            elif k=="button": h+=54+18
            elif k=="bullets":
                for it in el[1]: h+=len(c.wrap(it,c.font(SANS,16),inner-30))*25+6
                h+=6
            elif k=="segs": h+=len(el[1])*70
            elif k=="quote": h+=len(c.wrap(el[1],c.font(SERIF_I,24),inner-40))*34+18+34+20
            elif k=="img": h+=216
            elif k=="rule": h+=22
            elif k=="space": h+=el[1]
            elif k=="footer": h+=26+52+26+18+18
        return h
    heights=[measure_band(b) for b in email["bands"]]
    total=sum(heights)
    H=total+80
    c=Canvas(CARDW+80,H,BACKDROP,ss=2)
    x0=40; y=40
    for bd,bh in zip(email["bands"],heights):
        bg=bd["bg"]; pad=bd["pad"]; inner=CARDW-2*pad; ondark=(sum(bg)<300); onazure=(bg==AZURE_BRIGHT)
        c.rect(x0,y,x0+CARDW,y+bh,fill=bg)
        ix=x0+pad; iy=y+pad
        for el in bd["els"]:
            k=el[0]
            if k=="logo":
                monogram(c,ix+27,iy+20,54,dark=(INK if not el[1] else INK_SOFT),lt=PAPER,acc=AZURE_BRIGHT)
                c.text(ix+72,iy+20,"The Charles Blow Show",c.font(SERIF_SB,24),txtcol(ondark,"head"),anchor="lm"); iy+=66
            elif k=="eyebrow":
                ec=INK if onazure else (AZURE_BRIGHT if ondark else AZURE_DARK)
                c.text_ls(ix,iy+8,el[1].upper(),c.font(SANS_B,13),ec,2.5); iy+=34
            elif k=="h1":
                f=c.font(SERIF_SB,32)
                for ln in c.wrap(el[1],f,inner): c.text(ix,iy,ln,f,txtcol(ondark,"head"),anchor="la"); iy+=40
                iy+=8
            elif k=="h2":
                f=c.font(SERIF_SB,23)
                for ln in c.wrap(el[1],f,inner): c.text(ix,iy,ln,f,txtcol(ondark,"head"),anchor="la"); iy+=30
                iy+=6
            elif k=="p":
                f=c.font(SANS,16)
                for ln in c.wrap(el[1],f,inner): c.text(ix,iy,ln,f,txtcol(ondark,"body"),anchor="la"); iy+=25
                iy+=12
            elif k=="small":
                f=c.font(SANS,13)
                for ln in c.wrap(el[1],f,inner): c.text(ix,iy,ln,f,txtcol(ondark,"muted"),anchor="la"); iy+=19
                iy+=8
            elif k=="button": iy+=draw_button(c,ix,iy,el[1],el[3],ondark,inner)+18
            elif k=="bullets":
                for it in el[1]:
                    c.ellipse(ix+2,iy+8,ix+12,iy+18,fill=AZURE_BRIGHT); f=c.font(SANS,16)
                    for ln in c.wrap(it,f,inner-30): c.text(ix+28,iy,ln,f,txtcol(ondark,"body"),anchor="la"); iy+=25
                    iy+=6
                iy+=6
            elif k=="segs":
                for title,meta in el[1]:
                    c.ellipse(ix+1,iy+9,ix+13,iy+21,fill=AZURE_BRIGHT)
                    c.text(ix+30,iy,title,c.font(SERIF_SB,21),txtcol(ondark,"head"),anchor="la")
                    c.text(ix+30,iy+30,meta.upper(),c.font(SANS_B,12),txtcol(ondark,"muted"),anchor="la"); iy+=70
            elif k=="quote":
                c.text(ix,iy-6,"“",c.font(SERIF_SB,70),(AZURE_TINT if not ondark else INK_SOFT),anchor="la")
                f=c.font(SERIF_I,24)
                for ln in c.wrap(el[1],f,inner-40): c.text(ix+44,iy+18,ln,f,txtcol(ondark,"head"),anchor="la"); iy+=34
                iy+=20; c.text(ix+44,iy,el[2],c.font(SANS_SB,15),txtcol(ondark,"muted"),anchor="la"); iy+=34
            elif k=="img":
                bx0,by0,bx1,by1=ix,iy,ix+inner,iy+200
                for i in range(by0,by1):
                    t=(i-by0)/(by1-by0); col=tuple(int(AZURE_BRIGHT[j]+(INK[j]-AZURE_BRIGHT[j])*t) for j in range(3))
                    c.line(bx0,i,bx1,i,fill=col)
                c.text((bx0+bx1)/2,(by0+by1)/2,el[1],c.font(SANS_B,16),PAPER,anchor="mm"); iy+=216
            elif k=="rule":
                c.line(ix,iy+6,ix+inner,iy+6,fill=(LINE if not ondark else (52,56,66))); iy+=22
            elif k=="space": iy+=el[1]
            elif k=="footer":
                c.line(ix,iy,ix+inner,iy,fill=(LINE if not ondark else (52,56,66))); iy+=26
                monogram(c,ix+18,iy+14,40,dark=(INK if not ondark else INK_SOFT),lt=PAPER,acc=AZURE_BRIGHT)
                c.text(ix+48,iy+14,"The Charles Blow Show",c.font(SERIF_SB,18),txtcol(ondark,"head"),anchor="lm"); iy+=52
                c.text(ix,iy,"@charlesblowshow  ·  charlesblowshow.com",c.font(SANS_SB,14),txtcol(ondark,"muted"),anchor="la"); iy+=26
                c.text(ix,iy,"You signed up at charlesblowshow.com.",c.font(SANS,12),txtcol(ondark,"muted"),anchor="la"); iy+=18
                c.text(ix,iy,"Unsubscribe · Update preferences · [mailing address]",c.font(SANS,12),txtcol(ondark,"muted"),anchor="la"); iy+=18
        c.rect(x0,y,x0+CARDW,y+bh,outline=(LINE if not ondark else None),width=1)
        y+=bh
    c.save_png(f"{PV}/{email['id']}.png")

# ============================================================
# HTML RENDERER
# ============================================================
def el_html(el,ondark,onazure=False):
    body=hx((210,213,219) if ondark else INK_SOFT); head=hx(PAPER if ondark else INK)
    mut=hx((150,154,162) if ondark else MUTED)
    az=hx(INK if onazure else (AZURE_BRIGHT if ondark else AZURE_DARK))
    k=el[0]
    if k=="logo":
        return f'<div style="font-family:{SERIF_STACK};font-weight:600;font-size:22px;color:{head}"><span style="display:inline-block;width:30px;height:30px;background:{hx(INK)};border-radius:7px;color:{hx(PAPER)};text-align:center;line-height:30px;font-size:15px;vertical-align:middle;margin-right:10px">CB</span>The Charles Blow Show</div>'
    if k=="eyebrow":
        return f'<div style="font-family:{SANS_STACK};font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:{az};margin:0 0 6px">{html.escape(el[1])}</div>'
    if k=="h1":
        return f'<h1 style="font-family:{SERIF_STACK};font-weight:600;font-size:30px;line-height:1.18;color:{head};margin:0 0 6px">{html.escape(el[1])}</h1>'
    if k=="h2":
        return f'<h2 style="font-family:{SERIF_STACK};font-weight:600;font-size:22px;line-height:1.2;color:{head};margin:0 0 4px">{html.escape(el[1])}</h2>'
    if k=="p":
        return f'<p style="font-family:{SANS_STACK};font-size:16px;line-height:1.6;color:{body};margin:0 0 14px">{html.escape(el[1])}</p>'
    if k=="small":
        return f'<p style="font-family:{SANS_STACK};font-size:13px;line-height:1.5;color:{mut};margin:0 0 10px">{html.escape(el[1])}</p>'
    if k=="button":
        label,href,style=el[1],el[2],el[3]
        if style=="azure": bg=hx(AZURE);col=hx(PAPER);bd=""
        elif style=="ink": bg=hx(INK if not ondark else PAPER);col=hx(PAPER if not ondark else INK);bd=""
        else: bg="transparent";col=az;bd=f"border:2px solid {az};"
        return f'<a href="{href}" style="display:inline-block;background:{bg};color:{col};{bd}font-family:{SANS_STACK};font-weight:600;font-size:16px;text-decoration:none;padding:13px 26px;border-radius:10px;margin:4px 0 16px">{html.escape(label)} &rarr;</a>'
    if k=="bullets":
        lis="".join(f'<tr><td valign="top" style="padding:0 12px 10px 0"><span style="display:inline-block;width:9px;height:9px;border-radius:5px;background:{hx(AZURE_BRIGHT)}"></span></td><td style="padding:0 0 10px;font-family:{SANS_STACK};font-size:16px;line-height:1.5;color:{body}">{html.escape(it)}</td></tr>' for it in el[1])
        return f'<table cellpadding="0" cellspacing="0" role="presentation"><tbody>{lis}</tbody></table>'
    if k=="segs":
        rows=""
        for title,meta in el[1]:
            rows+=f'<tr><td valign="top" style="padding:0 14px 18px 0"><span style="display:inline-block;width:11px;height:11px;border-radius:6px;background:{hx(AZURE_BRIGHT)};margin-top:6px"></span></td><td style="padding:0 0 18px"><div style="font-family:{SERIF_STACK};font-weight:600;font-size:20px;color:{head}">{html.escape(title)}</div><div style="font-family:{SANS_STACK};font-weight:700;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:{mut};margin-top:2px">{html.escape(meta)}</div></td></tr>'
        return f'<table cellpadding="0" cellspacing="0" role="presentation"><tbody>{rows}</tbody></table>'
    if k=="quote":
        return f'<div style="font-family:{SERIF_STACK};font-style:italic;font-size:23px;line-height:1.4;color:{head};border-left:3px solid {hx(AZURE_BRIGHT)};padding-left:18px;margin:6px 0 14px">{html.escape(el[1])}<div style="font-family:{SANS_STACK};font-style:normal;font-weight:600;font-size:14px;color:{mut};margin-top:10px">{html.escape(el[2])}</div></div>'
    if k=="img":
        return f'<div style="background:linear-gradient(135deg,{hx(AZURE_BRIGHT)},{hx(INK)});border-radius:12px;height:180px;line-height:180px;text-align:center;color:{hx(PAPER)};font-family:{SANS_STACK};font-weight:700;font-size:15px;margin:4px 0 14px">{html.escape(el[1])}</div>'
    if k=="rule":
        return f'<div style="height:1px;background:{hx(LINE if not ondark else (52,56,66))};margin:8px 0 18px"></div>'
    if k=="space": return f'<div style="height:{el[1]}px"></div>'
    if k=="footer":
        c=hx((150,154,162) if ondark else MUTED)
        return (f'<div style="height:1px;background:{hx(LINE if not ondark else (52,56,66))};margin:0 0 18px"></div>'
                f'<div style="font-family:{SERIF_STACK};font-weight:600;font-size:18px;color:{head};margin-bottom:8px"><span style="display:inline-block;width:26px;height:26px;background:{hx(INK if not ondark else INK_SOFT)};border-radius:6px;color:{hx(PAPER)};text-align:center;line-height:26px;font-size:13px;margin-right:8px">CB</span>The Charles Blow Show</div>'
                f'<p style="font-family:{SANS_STACK};font-size:13px;color:{c};margin:4px 0">@charlesblowshow &nbsp;·&nbsp; charlesblowshow.com</p>'
                f'<p style="font-family:{SANS_STACK};font-size:12px;color:{c};margin:4px 0">You signed up at charlesblowshow.com.</p>'
                f'<p style="font-family:{SANS_STACK};font-size:12px;color:{c};margin:4px 0"><a href="#" style="color:{c}">Unsubscribe</a> · <a href="#" style="color:{c}">Update preferences</a> · [mailing address]</p>')
    return ""

def render_html(email):
    bands=""
    for bd in email["bands"]:
        ondark=sum(bd["bg"])<300; onazure=(bd["bg"]==AZURE_BRIGHT)
        inner="".join(el_html(e,ondark,onazure) for e in bd["els"])
        bands+=f'<tr><td style="background:{hx(bd["bg"])};padding:{bd["pad"]}px">{inner}</td></tr>'
    pre=html.escape(email.get("preheader",""))
    doc=f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>{html.escape(email["subject"])}</title></head>
<body style="margin:0;padding:24px 0;background:{hx(BACKDROP)}">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">{pre}</span>
<table role="presentation" align="center" cellpadding="0" cellspacing="0" width="{CARDW}" style="width:{CARDW}px;max-width:{CARDW}px;margin:0 auto;border-collapse:separate">
<tbody>{bands}</tbody></table>
<p style="font-family:{SANS_STACK};font-size:11px;color:{hx(MUTED)};text-align:center;margin:18px">Subject: {html.escape(email["subject"])}</p>
</body></html>'''
    open(f"{OUT}/{email['id']}.html","w",encoding="utf-8").write(doc)

# ============================================================
# EMAIL SPECS
# ============================================================
FOOT=lambda dark=False:("footer",dark)
EMAILS=[
 {"id":"01-welcome","subject":"Welcome — here's what to expect.","preheader":"The smartest seat at the table, in your inbox.",
  "bands":[
    band(INK, logo(True)),
    band(SURFACE, eyebrow("Welcome"), h1("You're in. Welcome to the table."),
         p("Thanks for joining The Charles Blow Show. A few times a week you'll get a sharp, plainspoken read on race, politics, and power — written to leave you equipped, not anxious."),
         p("Here's what lands in your inbox:"),
         bullets(["The Daily Dispatch — the day's story, distilled, with a clear “what now.”","First word when we go live, plus the best clips from each show.","The occasional members-only invite (the show itself is always free)."]),
         button("Watch the latest","#","azure"),
         rule(), small("Prefer fewer emails? Set your cadence any time."), FOOT()),
  ]},
 {"id":"02-waitlist","subject":"You're on the list.","preheader":"We'll tell you the moment we go live.",
  "bands":[
    band(INK, logo(True), space(6), eyebrow("Launching soon"), h1("You're on the list."),
         p("Thanks for raising your hand early. You'll be among the first to know when The Charles Blow Show goes live — a daily, independent take on race, politics, and power."),
         button("See what's coming","#","outline"), space(4)),
    band(SURFACE, p("While you wait, follow along — that's where the first clips will drop."),
         button("Follow on YouTube","#","azure"), FOOT()),
  ]},
 {"id":"03-were-live","subject":"We're live. The first episode is here.","preheader":"Episode one is up — come pull up a chair.",
  "bands":[
    band(INK, logo(True), space(8), eyebrow("It's here"), h1("We're live. Episode one is up."),
         p("The wait's over. The first episode of The Charles Blow Show is live — and there's a new one every weekday."),
         button("Watch episode one","#","azure")),
    band(SURFACE, imgph("[ episode thumbnail ]"),
         h2("Two segments, every day."),
         segs([("Lunch Break Live","~10 min · live · midday"),("The Evening Show","~20 min · with a guest")]),
         p("Subscribe so you never miss the midday read or the evening conversation."),
         button("Subscribe on YouTube","#","ink"), FOOT()),
  ]},
 {"id":"04-daily-dispatch","subject":"The Daily Dispatch — [Weekday, Month Day]","preheader":"Today's story, distilled — and what to do with it.",
  "bands":[
    band(SURFACE, logo(False), rule(),
         eyebrow("The Daily Dispatch · [date]"),
         h1("[Today's headline goes here — the one thing that mattered.]"),
         p("[2–3 sentences of Charles's plainspoken read: what happened, and why it actually matters beneath the noise.]"),
         h2("What now."),
         p("[The equip-don't-alarm takeaway — what to watch next, what to do, what to ignore.]"),
         button("Watch today's show","#","azure"),
         rule(),
         eyebrow("Also today"),
         bullets(["[Second item — a quick hit with a link.]","[Third item — one more thing worth your time.]"]),
         FOOT()),
  ]},
 {"id":"05-founding-member","subject":"Keep it independent — become a founding member.","preheader":"The show stays free. Members make it possible.",
  "bands":[
    band(AZURE_BRIGHT, eyebrow("Founding member"), h1("The show is free. Keep it independent."),
         p("No network, no paywall on the news. The Charles Blow Show is funded by people who want it to exist — and founding members get the most for backing it first.")),
    band(SURFACE, h2("What founding members get"),
         bullets(["Ad-free, early audio of every episode","The full Daily Dispatch (not just the weekly)","The complete searchable archive","Your name in the credits + a quarterly members' call"]),
         button("Become a founding member","#","azure"),
         small("$150/year, limited launch cohort. Cancel anytime. The news itself stays free, always."),
         FOOT()),
  ]},
 {"id":"06-membership-welcome","subject":"You're a member — here's everything you unlocked.","preheader":"Thank you for keeping this independent.",
  "bands":[
    band(INK, logo(True), space(6), eyebrow("Member since today"), h1("Thank you. You just kept this independent."),
         p("Your membership is what lets the show answer to the audience and no one else. Here's everything that's now open to you:")),
    band(SURFACE, bullets(["Ad-free, early audio — link in every episode email","The full Daily Dispatch, every weekday","The complete archive, searchable","Your members-only Q&A thread"]),
         button("Open the members' room","#","azure"),
         rule(), quote("The day's news deserves a seat at the table where you leave understanding it.","— from the show"),
         FOOT()),
  ]},
 {"id":"07-guest-tonight","subject":"Tonight on The Evening Show: [Guest Name]","preheader":"A conversation with the person behind today's headline.",
  "bands":[
    band(INK, logo(True), space(8), eyebrow("Tonight · The Evening Show"),
         h1("[Guest Name] joins Charles tonight."),
         p("[One line on who the guest is and why this conversation matters right now.]"),
         imgph("[ guest portrait ]"),
         button("Set a reminder","#","azure"),
         small("Live at [time] · replay posted right after."), FOOT()),
  ]},
 {"id":"08-weekly-roundup","subject":"The week, in his words.","preheader":"The five moments worth catching up on.",
  "bands":[
    band(SURFACE, logo(False), rule(), eyebrow("The week in review"),
         h1("The week, in his words."),
         p("Missed a day? Here are the moments that mattered — the sharpest reads and conversations from the week."),
         segs([("[Monday's clip title]","Lunch Break Live"),("[Tuesday's conversation]","The Evening Show"),("[The one everyone shared]","Most-watched")]),
         button("Catch up on YouTube","#","azure"),
         rule(), small("One email a week. The Daily Dispatch lands every weekday if you want more."),
         FOOT()),
  ]},
 {"id":"09-winback","subject":"We saved your seat.","preheader":"It's been a minute — here's what you missed.",
  "bands":[
    band(SURFACE, logo(False), space(6), eyebrow("We saved your seat"),
         h1("It's been a minute."),
         p("The table's still set. Here's a quick way back in — one recent conversation people kept talking about."),
         imgph("[ featured clip ]"),
         button("Watch this one","#","azure"),
         p("Want fewer emails instead of none? You can dial it down — we'd rather keep you than lose you."),
         button("Adjust my cadence","#","outline"), FOOT()),
  ]},
]

def gallery():
    cards=""
    for e in EMAILS:
        cards+=f'<a href="emails_cbs/{e["id"]}.html" style="text-decoration:none;color:#14161d"><div style="border:1px solid #e7e3d9;border-radius:12px;overflow:hidden;background:#fff"><img src="emails_cbs/previews/{e["id"]}.png" style="width:100%;display:block"><div style="padding:12px 16px;font-family:sans-serif"><div style="font-weight:700;font-size:14px">{e["id"]}</div><div style="font-size:13px;color:#6c7077">{html.escape(e["subject"])}</div></div></div></a>'
    doc=f'''<!doctype html><meta charset="utf-8"><title>Charles Blow Show — Marketing Emails</title>
<body style="background:#fbfaf6;margin:0;padding:40px;font-family:sans-serif">
<h1 style="font-family:Georgia,serif">Charles Blow Show — marketing email designs</h1>
<p style="color:#6c7077">{len(EMAILS)} templates · click any to open the HTML email · previews are PNG mockups.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;margin-top:24px">{cards}</div></body>'''
    open(f"{os.path.dirname(OUT)}/index.html","w",encoding="utf-8").write(doc)

for e in EMAILS:
    render_png2(e); render_html(e); print("built",e["id"])
gallery()
print("done:",len(EMAILS),"emails ->",OUT)
