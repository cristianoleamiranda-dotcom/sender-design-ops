import math, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, F = 640, 360, 144
OUT = '/home/user/propframes'
os.makedirs(OUT, exist_ok=True)

BLUE = (30, 115, 190)
CYAN = (0, 133, 178)
ICE = (143, 208, 232)

def font(sz):
    for p in ('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf',
              '/usr/share/fonts/dejavu/DejaVuSansMono.ttf'):
        if os.path.exists(p):
            return ImageFont.truetype(p, sz)
    return ImageFont.load_default()

F_SM, F_MD, F_LG = font(11), font(13), font(30)

S = (555, 150)   # Santiago
R = (105, 215)   # Rapa Nui
C = (330, 35)    # control

def bez(u):
    x = (1-u)**2*S[0] + 2*(1-u)*u*C[0] + u*u*R[0]
    y = (1-u)**2*S[1] + 2*(1-u)*u*C[1] + u*u*R[1]
    return (x, y)

def smooth(p):
    return p*p*(3-2*p)

COAST = [(600,0),(640,0),(640,360),(585,360),(575,300),(590,240),(570,180),(588,120),(575,60)]

for f in range(F):
    p = f/(F-1)
    u = smooth(min(1.0, p*1.08))
    img = Image.new('RGB', (W, H), (4, 8, 14))
    d = ImageDraw.Draw(img, 'RGBA')
    # graticula
    for x in range(80, W, 80):
        d.line([(x,0),(x,H)], fill=BLUE+(22,), width=1)
    for y in range(60, H, 60):
        d.line([(0,y),(W,y)], fill=BLUE+(22,), width=1)
    # costa
    d.polygon(COAST, fill=BLUE+(26,), outline=BLUE+(90,))
    # arco progresivo + glow
    N = 220
    pts = [bez(u*i/N) for i in range(int(N*u)+1)]
    glow = Image.new('RGBA', (W, H), (0,0,0,0))
    gd = ImageDraw.Draw(glow)
    if len(pts) > 1:
        gd.line(pts, fill=CYAN+(70,), width=7)
    glow = glow.filter(ImageFilter.GaussianBlur(4))
    img.paste(glow, (0,0), glow)
    if len(pts) > 1:
        d.line(pts, fill=CYAN+(255,), width=2)
    # extremos
    d.ellipse([S[0]-4, S[1]-4, S[0]+4, S[1]+4], fill=BLUE+(255,))
    d.ellipse([R[0]-4, R[1]-4, R[0]+4, R[1]+4], fill=CYAN+(255,))
    # cabeza luminosa
    if 0 < u < 1 and pts:
        hx, hy = pts[-1]
        hl = Image.new('RGBA', (W, H), (0,0,0,0))
        hd = ImageDraw.Draw(hl)
        hd.ellipse([hx-12, hy-12, hx+12, hy+12], fill=ICE+(120,))
        hl = hl.filter(ImageFilter.GaussianBlur(6))
        img.paste(hl, (0,0), hl)
        d.ellipse([hx-3.5, hy-3.5, hx+3.5, hy+3.5], fill=(255,255,255))
    # pulso final en Rapa Nui
    if u >= 1:
        k = (p - 0.92)/0.08
        if k > 0:
            rr = 6 + 26*min(1, k)
            d.ellipse([R[0]-rr, R[1]-rr, R[0]+rr, R[1]+rr], outline=ICE+(int(160*(1-min(1,k))),), width=2)
    # textos
    km = int(3759*min(1, u))
    d.text((24, 20), 'SENDER · ENLACE HF 2-30 MHz', font=F_SM, fill=ICE+(160,))
    d.text((W-24-190, 20), 'SCL -> RAPA NUI', font=F_SM, fill=ICE+(160,))
    d.text((250, 52), f'{km} km', font=F_LG, fill=(255,255,255))
    d.text((S[0]-96, S[1]+14), 'SANTIAGO · TX', font=F_MD, fill=ICE+(200,))
    d.text((R[0]-16, R[1]+14), 'RAPA NUI · RX', font=F_MD, fill=ICE+(200,))
    d.text((24, H-26), 'PROPAGACION IONOSFERICA · SIMULACION', font=F_SM, fill=ICE+(110,))
    img.save(f'{OUT}/f{f:03d}.png')
print('frames ok', F)
