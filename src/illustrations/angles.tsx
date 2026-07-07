import { Canvas, Camera, Figure, FovWedge, Ground, ILL, SightLine } from './primitives'

/** Standing subject used by the side-view angle diagrams. Head centre ≈ (140, 42). */
function Subject() {
  return <Figure x={140} y={35} h={70} />
}

export function EyeLevelIll() {
  return (
    <Canvas title="Eye-level angle — camera at the subject's eye height">
      <Ground />
      <Subject />
      <Camera x={48} y={42} />
      <SightLine x1={63} y1={42} x2={128} y2={42} />
    </Canvas>
  )
}

export function LowAngleIll() {
  return (
    <Canvas title="Low angle — camera below, looking up">
      <Ground />
      <Subject />
      <Camera x={52} y={94} rotate={-28} />
      <SightLine x1={66} y1={86} x2={131} y2={46} />
    </Canvas>
  )
}

export function HighAngleIll() {
  return (
    <Canvas title="High angle — camera above, looking down">
      <Ground />
      <Subject />
      <Camera x={50} y={22} rotate={26} />
      <SightLine x1={64} y1={29} x2={130} y2={42} />
    </Canvas>
  )
}

export function BirdsEyeIll() {
  return (
    <Canvas title="Bird's-eye view — directly overhead">
      <Camera x={100} y={20} rotate={90} />
      <SightLine x1={100} y1={32} x2={100} y2={78} />
      {/* subject seen from above: head + shoulders */}
      <ellipse cx="100" cy="94" rx="22" ry="10" fill={ILL.muted} />
      <circle cx="100" cy="92" r="9" fill={ILL.fill} />
    </Canvas>
  )
}

export function WormsEyeIll() {
  return (
    <Canvas title="Worm's-eye view — from the ground, looking straight up">
      {/* towers converging upward */}
      <path d="M 30 118 L 52 14 L 82 14 L 78 118 Z" fill={ILL.muted} />
      <path d="M 170 118 L 148 14 L 120 14 L 124 118 Z" fill={ILL.muted} />
      <Camera x={100} y={106} rotate={-90} />
      <SightLine x1={100} y1={92} x2={100} y2={26} />
    </Canvas>
  )
}

export function DutchAngleIll() {
  return (
    <Canvas title="Dutch angle — the frame tilted off its horizontal axis">
      {/* level reference */}
      <line x1="20" y1="62" x2="180" y2="62" stroke={ILL.muted} strokeWidth="1.6" strokeDasharray="4 3" />
      <g transform="rotate(-12 100 62)">
        <rect x="48" y="22" width="104" height="80" rx="3" fill="none" stroke={ILL.frame} strokeWidth="2.5" />
        <line x1="48" y1="78" x2="152" y2="78" stroke={ILL.accent} strokeWidth="2" />
        <Figure x={100} y={40} h={38} />
      </g>
    </Canvas>
  )
}

export function PovIll() {
  return (
    <Canvas title="Point-of-view shot — seeing through the character's eyes">
      <Ground />
      {/* character seen from the side, looking right */}
      <Figure x={48} y={35} h={70} />
      <circle cx="53" cy="41" r="2.6" fill={ILL.accent} />
      <FovWedge x={58} y={42} angle={-4} halfSpread={16} len={92} />
      {/* what they see: a door */}
      <rect x="150" y="52" width="26" height="53" rx="2" fill={ILL.muted} />
      <circle cx="156" cy="80" r="2.4" fill={ILL.frame} />
    </Canvas>
  )
}

export function ShoulderLevelIll() {
  return (
    <Canvas title="Shoulder-level angle — just below the eye line">
      <Ground />
      <Subject />
      {/* eye-line reference */}
      <line x1="120" y1="42" x2="185" y2="42" stroke={ILL.muted} strokeWidth="1.4" strokeDasharray="3 3" />
      <Camera x={48} y={52} rotate={-6} />
      <SightLine x1={63} y1={50} x2={129} y2={44} />
    </Canvas>
  )
}
