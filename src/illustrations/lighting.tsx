import { Beam, Canvas, CameraTop, ILL, LightIcon, Portrait, Tag } from './primitives'

export function ThreePointIll() {
  return (
    <Canvas title="Three-point lighting — key, fill and back light around the subject">
      {/* subject, seen from above */}
      <circle cx="100" cy="62" r="11" fill={ILL.fill} />
      <Beam x={52} y={30} tx={100} ty={62} spread={11} opacity={0.3} />
      <LightIcon x={52} y={30} />
      <Tag x={52} y={16} text="KEY" color={ILL.accent} />
      <Beam x={150} y={34} tx={100} ty={62} spread={11} opacity={0.14} color={ILL.stroke} />
      <LightIcon x={150} y={34} color={ILL.stroke} />
      <Tag x={150} y={20} text="FILL" />
      <Beam x={100} y={14} tx={100} ty={54} spread={9} opacity={0.14} color={ILL.stroke} />
      <LightIcon x={100} y={14} r={4} color={ILL.stroke} />
      <Tag x={122} y={12} text="BACK" anchor="start" />
      <CameraTop x={100} y={100} rotate={-90} />
    </Canvas>
  )
}

export function HighKeyIll() {
  return (
    <Canvas title="High-key lighting — bright and nearly shadowless">
      <LightIcon x={48} y={24} />
      <LightIcon x={152} y={24} />
      <Portrait>
        {/* barely-there shadow */}
        <path d="M 116 40 A 26 26 0 0 1 126 70 L 126 32 Z" fill={ILL.frame} opacity="0.12" />
      </Portrait>
    </Canvas>
  )
}

export function LowKeyIll() {
  return (
    <Canvas title="Low-key lighting — darkness dominates, one hard source">
      <rect x="0" y="0" width="200" height="125" rx="6" fill={ILL.frame} opacity="0.18" />
      <LightIcon x={40} y={26} />
      <Portrait>
        <rect x="100" y="26" width="34" height="66" fill={ILL.frame} opacity="0.72" />
      </Portrait>
    </Canvas>
  )
}

export function ChiaroscuroIll() {
  return (
    <Canvas title="Chiaroscuro — painterly extremes of light and dark">
      <rect x="0" y="0" width="200" height="125" rx="6" fill={ILL.frame} opacity="0.3" />
      <Portrait color={ILL.bg}>
        <rect x="100" y="26" width="34" height="66" fill={ILL.frame} opacity="0.95" />
      </Portrait>
      <LightIcon x={34} y={30} />
    </Canvas>
  )
}

export function HardLightIll() {
  return (
    <Canvas title="Hard light — small source, crisp-edged shadow">
      <LightIcon x={34} y={22} r={4} />
      <Beam x={34} y={22} tx={92} ty={52} spread={16} opacity={0.16} />
      <Portrait>
        {/* razor-edged half shadow */}
        <path d="M 104 26 L 104 92 L 134 92 L 134 26 Z" fill={ILL.frame} opacity="0.65" />
        <line x1="104" y1="30" x2="104" y2="88" stroke={ILL.frame} strokeWidth="1.4" />
      </Portrait>
    </Canvas>
  )
}

export function SoftLightIll() {
  return (
    <Canvas title="Soft light — large diffused source, gentle shadow">
      <defs>
        <linearGradient id="ill-soft-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={ILL.frame} stopOpacity="0" />
          <stop offset="1" stopColor={ILL.frame} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* large softbox source */}
      <rect x="20" y="16" width="30" height="42" rx="4" fill={ILL.accent} opacity="0.85" />
      <Beam x={35} y={37} tx={92} ty={56} spread={30} opacity={0.12} />
      <Portrait>
        <rect x="96" y="26" width="40" height="70" fill="url(#ill-soft-grad)" />
      </Portrait>
    </Canvas>
  )
}

export function PracticalIll() {
  return (
    <Canvas title="Practical light — a visible lamp inside the scene">
      <defs>
        <radialGradient id="ill-prac-glow">
          <stop offset="0" stopColor={ILL.accent} stopOpacity="0.5" />
          <stop offset="1" stopColor={ILL.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="66" cy="52" r="40" fill="url(#ill-prac-glow)" />
      {/* table lamp */}
      <path d="M 52 40 L 80 40 L 72 58 L 60 58 Z" fill={ILL.accent} />
      <line x1="66" y1="58" x2="66" y2="86" stroke={ILL.stroke} strokeWidth="3" strokeLinecap="round" />
      <rect x="52" y="86" width="28" height="5" rx="2.5" fill={ILL.stroke} />
      {/* figure lit by it */}
      <circle cx="140" cy="52" r="16" fill={ILL.fill} />
      <path d="M 116 125 Q 118 78 140 76 Q 162 78 164 125 Z" fill={ILL.fill} />
      {/* table line */}
      <line x1="34" y1="92" x2="98" y2="92" stroke={ILL.muted} strokeWidth="2.4" strokeLinecap="round" />
    </Canvas>
  )
}

export function RembrandtIll() {
  return (
    <Canvas title="Rembrandt lighting — a triangle of light on the shadowed cheek">
      <LightIcon x={44} y={20} />
      <Beam x={44} y={20} tx={92} ty={50} spread={16} opacity={0.16} />
      <Portrait>
        <rect x="102" y="26" width="36" height="70" fill={ILL.frame} opacity="0.6" />
        {/* the signature triangle on the shadow side */}
        <path d="M 106 56 L 116 56 L 111 70 Z" fill={ILL.bg} />
      </Portrait>
    </Canvas>
  )
}

export function ButterflyIll() {
  return (
    <Canvas title="Butterfly lighting — frontal key from above, shadow under the nose">
      <LightIcon x={100} y={14} />
      <Beam x={100} y={14} tx={100} ty={44} spread={20} opacity={0.14} />
      <Portrait>
        {/* symmetric butterfly shadow under the nose */}
        <path d="M 100 66 Q 92 74 100 72 Q 108 74 100 66 Z" fill={ILL.frame} opacity="0.7" />
        <ellipse cx="100" cy="70" rx="7" ry="3" fill={ILL.frame} opacity="0.55" />
      </Portrait>
    </Canvas>
  )
}

export function SilhouetteIll() {
  return (
    <Canvas title="Silhouette — a dark figure against a bright background">
      <circle cx="100" cy="66" r="46" fill={ILL.accent} opacity="0.9" />
      <g>
        <circle cx="100" cy="52" r="15" fill={ILL.frame} />
        <path d="M 74 125 Q 76 76 100 74 Q 124 76 126 125 Z" fill={ILL.frame} />
      </g>
    </Canvas>
  )
}
