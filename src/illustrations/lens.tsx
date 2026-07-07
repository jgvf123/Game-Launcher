import { Canvas, Camera, CameraTop, Figure, FovWedge, Ground, ILL, Arrow } from './primitives'

export function WideAngleLensIll() {
  return (
    <Canvas title="Wide-angle lens — broad field of view, exaggerated depth">
      <CameraTop x={100} y={102} rotate={-90} />
      <FovWedge x={100} y={100} angle={-90} halfSpread={52} len={92} />
      <circle cx="52" cy="42" r="7" fill={ILL.fill} />
      <circle cx="100" cy="26" r="7" fill={ILL.fill} />
      <circle cx="148" cy="42" r="7" fill={ILL.fill} />
    </Canvas>
  )
}

export function NormalLensIll() {
  return (
    <Canvas title="Standard lens — a natural, human field of view">
      <CameraTop x={100} y={102} rotate={-90} />
      <FovWedge x={100} y={100} angle={-90} halfSpread={22} len={92} />
      <circle cx="84" cy="30" r="7" fill={ILL.fill} />
      <circle cx="116" cy="30" r="7" fill={ILL.fill} />
    </Canvas>
  )
}

export function TelephotoLensIll() {
  return (
    <Canvas title="Telephoto lens — narrow view, compressed depth">
      <CameraTop x={100} y={102} rotate={-90} />
      <FovWedge x={100} y={100} angle={-90} halfSpread={7} len={94} />
      {/* subjects far apart in depth appear stacked together */}
      <circle cx="100" cy="30" r="7" fill={ILL.fill} />
      <circle cx="100" cy="16" r="7" fill={ILL.muted} />
    </Canvas>
  )
}

export function ShallowDofIll() {
  return (
    <Canvas title="Shallow depth of field — sharp subject, blurred background">
      <defs>
        <filter id="ill-blur">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>
      <g filter="url(#ill-blur)">
        <circle cx="60" cy="38" r="12" fill={ILL.muted} />
        <circle cx="148" cy="30" r="9" fill={ILL.muted} />
        <circle cx="162" cy="66" r="11" fill={ILL.muted} />
        <circle cx="44" cy="76" r="8" fill={ILL.muted} />
      </g>
      <Figure x={100} y={22} h={92} />
      {/* focal plane */}
      <line x1="70" y1="118" x2="130" y2="118" stroke={ILL.accent} strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
    </Canvas>
  )
}

export function DeepFocusIll() {
  return (
    <Canvas title="Deep focus — every plane sharp">
      <Ground y={112} />
      <Figure x={52} y={22} h={90} />
      <Figure x={112} y={50} h={62} />
      <Figure x={158} y={70} h={42} />
    </Canvas>
  )
}

export function DollyZoomIll() {
  return (
    <Canvas title="Dolly zoom — camera moves while the lens zooms opposite">
      <Ground />
      {/* warped background lines behind a steady subject */}
      <path d="M 118 18 Q 132 60 118 102" fill="none" stroke={ILL.muted} strokeWidth="2" />
      <path d="M 138 14 Q 158 60 138 106" fill="none" stroke={ILL.muted} strokeWidth="2" />
      <path d="M 158 10 Q 184 60 158 110" fill="none" stroke={ILL.muted} strokeWidth="2" />
      <Figure x={100} y={38} h={67} />
      <Camera x={40} y={62} />
      <Arrow x1={40} y1={80} x2={16} y2={80} />
      <Arrow x1={56} y1={44} x2={80} y2={44} />
    </Canvas>
  )
}
