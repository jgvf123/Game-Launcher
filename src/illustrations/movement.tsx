import {
  Arrow,
  ArcArrow,
  Canvas,
  Camera,
  CameraTop,
  Figure,
  FovWedge,
  Ground,
  ILL,
  SightLine,
} from './primitives'

function Tripod({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={ILL.stroke} strokeWidth="2.4" strokeLinecap="round">
      <line x1={x} y1={y} x2={x - 13} y2={y + 30} />
      <line x1={x} y1={y} x2={x + 13} y2={y + 30} />
      <line x1={x} y1={y} x2={x} y2={y + 30} />
    </g>
  )
}

export function StaticIll() {
  return (
    <Canvas title="Static shot — locked-off camera on a tripod">
      <Ground />
      <Camera x={62} y={62} />
      <Tripod x={62} y={70} />
      <SightLine x1={77} y1={62} x2={130} y2={62} color={ILL.muted} />
      <Figure x={145} y={35} h={70} />
    </Canvas>
  )
}

export function PanIll() {
  return (
    <Canvas title="Pan — the camera rotates horizontally in place">
      <CameraTop x={100} y={72} rotate={-90} />
      <FovWedge x={100} y={70} angle={-90} halfSpread={16} len={44} opacity={0.14} />
      <ArcArrow x1={58} y1={52} x2={142} y2={52} r={52} sweep={1} headAngle={35} />
      <ArcArrow x1={132} y1={46} x2={68} y2={46} r={46} sweep={0} headAngle={215} color={ILL.muted} />
    </Canvas>
  )
}

export function TiltIll() {
  return (
    <Canvas title="Tilt — the camera rotates vertically in place">
      <Ground />
      <Camera x={70} y={62} />
      <Tripod x={70} y={70} />
      <ArcArrow x1={104} y1={90} x2={104} y2={34} r={40} sweep={1} headAngle={-60} />
      <SightLine x1={84} y1={58} x2={140} y2={30} color={ILL.muted} />
      <SightLine x1={84} y1={66} x2={140} y2={94} color={ILL.muted} />
    </Canvas>
  )
}

export function DollyIll() {
  return (
    <Canvas title="Dolly — the camera travels toward or away from the subject">
      <Ground y={98} />
      {/* rails */}
      <line x1="14" y1="104" x2="120" y2="104" stroke={ILL.muted} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="14" y1="110" x2="120" y2="110" stroke={ILL.muted} strokeWidth="2.4" strokeLinecap="round" />
      <Camera x={52} y={78} />
      <rect x="36" y="88" width="32" height="6" rx="2" fill={ILL.stroke} />
      <circle cx="44" cy="98" r="5" fill={ILL.stroke} />
      <circle cx="60" cy="98" r="5" fill={ILL.stroke} />
      <Arrow x1={74} y1={80} x2={108} y2={80} />
      <Figure x={150} y={28} h={70} />
    </Canvas>
  )
}

export function TruckIll() {
  return (
    <Canvas title="Truck — the camera travels sideways, parallel to the scene">
      {/* subjects along the top */}
      <circle cx="55" cy="26" r="8" fill={ILL.fill} />
      <circle cx="100" cy="26" r="8" fill={ILL.fill} />
      <circle cx="145" cy="26" r="8" fill={ILL.fill} />
      <FovWedge x={100} y={84} angle={-90} halfSpread={18} len={42} opacity={0.14} />
      <CameraTop x={100} y={86} rotate={-90} />
      {/* rail */}
      <line x1="30" y1="108" x2="170" y2="108" stroke={ILL.muted} strokeWidth="2.4" strokeLinecap="round" />
      <Arrow x1={118} y1={94} x2={162} y2={94} />
      <Arrow x1={82} y1={94} x2={38} y2={94} color={ILL.muted} />
    </Canvas>
  )
}

export function CraneIll() {
  return (
    <Canvas title="Crane — the camera sweeps vertically on a jib arm">
      <Ground />
      {/* base and arm */}
      <path d="M 38 105 L 50 82 L 62 105 Z" fill={ILL.stroke} />
      <line x1="50" y1="84" x2="142" y2="36" stroke={ILL.stroke} strokeWidth="3" strokeLinecap="round" />
      <Camera x={152} y={32} rotate={12} />
      <ArcArrow x1={172} y1={86} x2={168} y2={42} r={60} sweep={1} headAngle={-80} />
    </Canvas>
  )
}

export function HandheldIll() {
  return (
    <Canvas title="Handheld — carried camera with a human shake">
      {/* jittery ghost frames */}
      <rect x="56" y="30" width="88" height="62" rx="3" fill="none" stroke={ILL.muted} strokeWidth="1.8" transform="rotate(-4 100 61)" />
      <rect x="56" y="30" width="88" height="62" rx="3" fill="none" stroke={ILL.muted} strokeWidth="1.8" transform="rotate(3 100 61)" />
      <Camera x={100} y={61} scale={1.15} />
      {/* shake squiggles */}
      <path d="M 30 50 q 5 -8 10 0 q 5 8 10 0" fill="none" stroke={ILL.accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M 150 74 q 5 -8 10 0 q 5 8 10 0" fill="none" stroke={ILL.accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M 92 104 q 5 -8 10 0 q 5 8 10 0" fill="none" stroke={ILL.accent} strokeWidth="2" strokeLinecap="round" />
    </Canvas>
  )
}

export function SteadicamIll() {
  return (
    <Canvas title="Steadicam — the camera floats smoothly while the operator walks">
      <Ground />
      {/* operator */}
      <Figure x={58} y={30} h={75} />
      {/* rig arm down to floating camera */}
      <line x1="66" y1="55" x2="92" y2="72" stroke={ILL.stroke} strokeWidth="2.4" strokeLinecap="round" />
      <Camera x={104} y={74} />
      {/* smooth glide path */}
      <path d="M 118 88 C 136 82 148 92 166 84" fill="none" stroke={ILL.accent} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1 6" />
      <Arrow x1={160} y1={85} x2={172} y2={82} />
    </Canvas>
  )
}

export function TrackingIll() {
  return (
    <Canvas title="Tracking shot — the camera travels with the subject">
      <Ground />
      <Figure x={130} y={30} h={75} />
      <Arrow x1={146} y1={44} x2={182} y2={44} />
      <Camera x={52} y={70} />
      <Arrow x1={68} y1={86} x2={104} y2={86} />
      <SightLine x1={66} y1={64} x2={116} y2={48} color={ILL.muted} />
    </Canvas>
  )
}

export function WhipPanIll() {
  return (
    <Canvas title="Whip pan — a blur-fast rotation">
      <CameraTop x={100} y={76} rotate={-90} />
      {/* motion streaks */}
      <path d="M 42 62 A 62 62 0 0 1 158 62" fill="none" stroke={ILL.muted} strokeWidth="2" strokeLinecap="round" />
      <path d="M 52 48 A 56 56 0 0 1 148 48" fill="none" stroke={ILL.muted} strokeWidth="2" strokeLinecap="round" />
      <ArcArrow x1={44} y1={40} x2={160} y2={44} r={64} sweep={1} headAngle={55} />
    </Canvas>
  )
}

export function RackFocusIll() {
  return (
    <Canvas title="Rack focus — sharpness shifts from one plane to another">
      <defs>
        <filter id="ill-blur-rack">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <Ground y={112} />
      <g filter="url(#ill-blur-rack)">
        <Figure x={62} y={26} h={86} color={ILL.muted} />
      </g>
      <Figure x={138} y={52} h={60} />
      {/* focal planes */}
      <line x1="44" y1="20" x2="44" y2="106" stroke={ILL.muted} strokeWidth="1.6" strokeDasharray="4 3" />
      <line x1="158" y1="40" x2="158" y2="106" stroke={ILL.accent} strokeWidth="1.6" strokeDasharray="4 3" />
      <Arrow x1={60} y1={16} x2={148} y2={16} />
    </Canvas>
  )
}
