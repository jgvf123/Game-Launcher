import { Canvas, Chip, Figure, ILL, MiniScene } from './primitives'

export function WarmPaletteIll() {
  return (
    <Canvas title="Warm palette — oranges, ambers and golds">
      <MiniScene sky="#fcd34d" sun="#f97316" hillBack="#d97706" hillFront="#92400e" />
      <Chip x={62} y={90} color="#fbbf24" />
      <Chip x={90} y={90} color="#f97316" />
      <Chip x={118} y={90} color="#b45309" />
    </Canvas>
  )
}

export function CoolPaletteIll() {
  return (
    <Canvas title="Cool palette — blues, cyans and steels">
      <MiniScene sky="#93c5fd" sun="#e0f2fe" hillBack="#3b82f6" hillFront="#1e3a8a" />
      <Chip x={62} y={90} color="#bfdbfe" />
      <Chip x={90} y={90} color="#3b82f6" />
      <Chip x={118} y={90} color="#1e3a8a" />
    </Canvas>
  )
}

export function TealOrangeIll() {
  return (
    <Canvas title="Teal and orange — complementary blockbuster grade">
      <MiniScene sky="#134e4a" sun="#fb923c" hillBack="#0f766e" hillFront="#115e59" />
      {/* orange subject popping off the teal scene */}
      <Figure x={100} y={40} h={34} color="#fb923c" />
      <Chip x={72} y={90} w={26} color="#14b8a6" />
      <Chip x={104} y={90} w={26} color="#fb923c" />
    </Canvas>
  )
}

export function DesaturatedIll() {
  return (
    <Canvas title="Desaturated grade — color drained toward gray">
      <MiniScene sky="#b7b3ad" sun="#d6d3ce" hillBack="#8a8680" hillFront="#5e5a55" />
      <Chip x={62} y={90} color="#a8a29e" />
      <Chip x={90} y={90} color="#78716c" />
      <Chip x={118} y={90} color="#57534e" />
    </Canvas>
  )
}

export function HighContrastIll() {
  return (
    <Canvas title="High contrast — deep blacks against bright highlights">
      <MiniScene sky="#fafafa" sun="#ffffff" hillBack="#3f3f46" hillFront="#09090b" />
      <Chip x={76} y={90} color="#09090b" />
      <Chip x={104} y={90} color="#fafafa" />
      <rect x="104" y="90" width="24" height="16" rx="4" fill="none" stroke={ILL.muted} strokeWidth="1" />
    </Canvas>
  )
}

export function LowContrastIll() {
  return (
    <Canvas title="Low contrast — tones clustered in the middle, hazy and soft">
      <MiniScene sky="#b8bcc2" sun="#c6cad0" hillBack="#a4a8ae" hillFront="#94989e" />
      <Chip x={62} y={90} color="#b4b8be" />
      <Chip x={90} y={90} color="#a4a8ae" />
      <Chip x={118} y={90} color="#94989e" />
    </Canvas>
  )
}

export function MonochromaticIll() {
  return (
    <Canvas title="Monochromatic — one hue in many values">
      <MiniScene sky="#dbeafe" sun="#bfdbfe" hillBack="#60a5fa" hillFront="#1d4ed8" />
      <Chip x={48} y={90} color="#dbeafe" />
      <Chip x={76} y={90} color="#93c5fd" />
      <Chip x={104} y={90} color="#3b82f6" />
      <Chip x={132} y={90} color="#1d4ed8" />
    </Canvas>
  )
}

export function ComplementaryIll() {
  const wheel = [
    { a: -90, c: '#eab308' },
    { a: -30, c: '#f97316' },
    { a: 30, c: '#dc2626' },
    { a: 90, c: '#7c3aed' },
    { a: 150, c: '#2563eb' },
    { a: 210, c: '#16a34a' },
  ]
  const cx = 100
  const cy = 58
  const r = 34
  const pos = (deg: number) => ({
    x: cx + r * Math.cos((deg * Math.PI) / 180),
    y: cy + r * Math.sin((deg * Math.PI) / 180),
  })
  const p1 = pos(-30)
  const p2 = pos(150)
  return (
    <Canvas title="Complementary colors — opposites on the wheel">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={ILL.muted} strokeWidth="2" />
      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={ILL.accent} strokeWidth="2" strokeDasharray="4 3" />
      {wheel.map((w) => {
        const p = pos(w.a)
        return <circle key={w.a} cx={p.x} cy={p.y} r={8} fill={w.c} />
      })}
      <Chip x={72} y={100} color="#f97316" />
      <Chip x={104} y={100} color="#2563eb" />
    </Canvas>
  )
}

export function ColorSymbolismIll() {
  return (
    <Canvas title="Color as symbolism — red danger and passion, blue cold isolation">
      {/* red: warning */}
      <rect x="34" y="34" width="56" height="56" rx="10" fill="#dc2626" />
      <path d="M 62 48 L 76 74 L 48 74 Z" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="62" cy="68" r="1.8" fill="#ffffff" />
      <line x1="62" y1="57" x2="62" y2="63" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      {/* blue: isolation — a single small figure alone in the field */}
      <rect x="110" y="34" width="56" height="56" rx="10" fill="#1d4ed8" />
      <Figure x={138} y={54} h={24} color="#ffffff" opacity={0.9} />
    </Canvas>
  )
}

export function MotivatedColorIll() {
  return (
    <Canvas title="Motivated color — palette justified by in-world sources">
      {/* window pouring cool light */}
      <rect x="30" y="18" width="30" height="40" rx="3" fill="#93c5fd" stroke={ILL.stroke} strokeWidth="2" />
      <line x1="45" y1="18" x2="45" y2="58" stroke={ILL.stroke} strokeWidth="2" />
      <line x1="30" y1="38" x2="60" y2="38" stroke={ILL.stroke} strokeWidth="2" />
      <polygon points="30,58 60,58 78,108 16,108" fill="#60a5fa" opacity="0.35" />
      {/* lamp pouring warm light */}
      <path d="M 152 34 L 176 34 L 169 50 L 159 50 Z" fill="#f59e0b" />
      <line x1="164" y1="50" x2="164" y2="72" stroke={ILL.stroke} strokeWidth="2.6" strokeLinecap="round" />
      <polygon points="152,50 176,50 190,108 140,108" fill="#fbbf24" opacity="0.35" />
      {/* figure between the two motivated sources */}
      <Figure x={106} y={44} h={64} />
    </Canvas>
  )
}
