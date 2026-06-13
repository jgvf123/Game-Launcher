#!/usr/bin/env python3
"""Generate neon snake app icons (no external deps, pure-python PNG writer)."""
import struct, zlib, math, os

def clamp(v): return 0 if v < 0 else (255 if v > 255 else int(v))

def lerp(a, b, t): return a + (b - a) * t

def write_png(path, w, h, pixels):
    raw = bytearray()
    for y in range(h):
        raw.append(0)  # filter type 0
        row = pixels[y]
        for px in row:
            raw += bytes((px[0], px[1], px[2], px[3]))
    comp = zlib.compress(bytes(raw), 9)
    def chunk(typ, data):
        c = struct.pack(">I", len(data)) + typ + data
        return c + struct.pack(">I", zlib.crc32(typ + data) & 0xffffffff)
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0)
    with open(path, "wb") as f:
        f.write(sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", comp) + chunk(b"IEND", b""))

def make(size, maskable=False):
    s = size
    px = [[(0, 0, 0, 0) for _ in range(s)] for _ in range(s)]
    cx, cy = s / 2, s / 2
    pad = 0.0 if maskable else s * 0.0
    radius = s * 0.22  # rounded corner radius
    maxd = math.hypot(cx, cy)

    def inside_rounded(x, y):
        r = radius
        ix = min(max(x, r), s - r)
        iy = min(max(y, r), s - r)
        if x < r and y < r:
            return math.hypot(x - r, y - r) <= r
        if x > s - r and y < r:
            return math.hypot(x - (s - r), y - r) <= r
        if x < r and y > s - r:
            return math.hypot(x - r, y - (s - r)) <= r
        if x > s - r and y > s - r:
            return math.hypot(x - (s - r), y - (s - r)) <= r
        return True

    # snake path (a smooth S curve) sampled as circles
    seg = []
    n = 26
    for i in range(n):
        t = i / (n - 1)
        ang = t * math.pi * 1.9
        sx = cx + math.sin(ang) * s * 0.26
        sy = lerp(s * 0.78, s * 0.20, t)
        seg.append((sx, sy))
    head = seg[-1]
    food = (cx + s * 0.0, s * 0.12)  # apple near head top (unused exact)
    body_r = s * 0.085

    for y in range(s):
        for x in range(s):
            if not inside_rounded(x + 0.5, y + 0.5):
                continue
            d = math.hypot(x - cx, y - cy) / maxd
            # background radial gradient: deep purple-navy -> near black
            r = clamp(lerp(28, 6, d))
            g = clamp(lerp(18, 6, d))
            b = clamp(lerp(54, 14, d))
            a = 255
            # subtle grid lines
            if (x % max(1, s // 12) == 0) or (y % max(1, s // 12) == 0):
                r = clamp(r + 10); g = clamp(g + 16); b = clamp(b + 22)
            # snake body
            best = 1e9
            for (sxp, syp) in seg:
                dd = math.hypot(x - sxp, y - syp)
                if dd < best: best = dd
            if best < body_r:
                core = 1 - (best / body_r)
                r = clamp(lerp(20, 120, core))
                g = clamp(lerp(200, 255, core))
                b = clamp(lerp(120, 180, core))
            elif best < body_r + s * 0.03:
                glow = 1 - (best - body_r) / (s * 0.03)
                r = clamp(r + glow * 30)
                g = clamp(g + glow * 120)
                b = clamp(b + glow * 70)
            # eyes on head
            ex = math.hypot(x - (head[0] - s*0.025), y - (head[1]))
            ex2 = math.hypot(x - (head[0] + s*0.025), y - (head[1]))
            if ex < s*0.018 or ex2 < s*0.018:
                r, g, b = 10, 20, 18
            # food orb (red) top-right
            fx, fy = cx + s*0.27, s*0.16
            fd = math.hypot(x - fx, y - fy)
            if fd < s*0.055:
                c = 1 - fd/(s*0.055)
                r = clamp(lerp(180, 255, c)); g = clamp(lerp(40, 120, c)); b = clamp(lerp(60, 90, c))
            elif fd < s*0.075:
                glow = 1-(fd-s*0.055)/(s*0.02)
                r = clamp(r+glow*80); g = clamp(g+glow*10); b = clamp(b+glow*10)
            px[y][x] = (r, g, b, a)
    return px

os.makedirs("www/icons", exist_ok=True)
for sz in (192, 512):
    write_png(f"www/icons/icon-{sz}.png", sz, sz, make(sz))
    print("wrote", f"www/icons/icon-{sz}.png")
# maskable (full bleed, no transparent corners)
write_png("www/icons/maskable-512.png", 512, 512, make(512, maskable=True))
print("wrote maskable")
