import { Canvas, CropShot, FilmFrame, Figure, ILL, SightLine } from './primitives'

export function ExtremeWideIll() {
  return (
    <Canvas title="Extreme wide shot">
      <FilmFrame x={35} y={8} w={130} h={109}>
        <circle cx="140" cy="32" r="9" fill={ILL.muted} />
        <path d="M 35 84 L 75 46 L 108 84 Z" fill={ILL.stroke} opacity="0.55" />
        <path d="M 82 84 L 122 54 L 160 84 Z" fill={ILL.stroke} opacity="0.35" />
        <line x1="35" y1="84" x2="165" y2="84" stroke={ILL.stroke} strokeWidth="1.6" />
        <Figure x={100} y={72} h={12} color={ILL.accent} />
      </FilmFrame>
    </Canvas>
  )
}

export function WideIll() {
  return (
    <Canvas title="Wide shot">
      <FilmFrame x={35} y={8} w={130} h={109}>
        <line x1="35" y1="100" x2="165" y2="100" stroke={ILL.stroke} strokeWidth="1.6" />
        {/* tree */}
        <circle cx="60" cy="52" r="13" fill={ILL.muted} />
        <rect x="57.5" y="60" width="5" height="40" fill={ILL.muted} />
        {/* building */}
        <rect x="132" y="42" width="24" height="58" fill={ILL.muted} />
        <Figure x={100} y={38} h={62} />
      </FilmFrame>
    </Canvas>
  )
}

export function FullIll() {
  return (
    <Canvas title="Full shot">
      <FilmFrame x={62} y={8} w={126} h={109}>
        <Figure x={125} y={13} h={99} />
      </FilmFrame>
      {/* head-to-toe brackets */}
      <line x1="46" y1="13" x2="56" y2="13" stroke={ILL.accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="112" x2="56" y2="112" stroke={ILL.accent} strokeWidth="2" strokeLinecap="round" />
      <SightLine x1={51} y1={16} x2={51} y2={109} />
    </Canvas>
  )
}

export function MediumLongIll() {
  return <CropShot cropAt={82} title="Medium long shot — cropped at mid-shin" />
}

export function CowboyIll() {
  return <CropShot cropAt={62} title="Cowboy shot — cropped at mid-thigh" />
}

export function MediumIll() {
  return <CropShot cropAt={48} title="Medium shot — cropped at the waist" />
}

export function MediumCloseUpIll() {
  return <CropShot cropAt={31} title="Medium close-up — cropped at mid-chest" />
}

export function CloseUpIll() {
  return <CropShot cropAt={23} title="Close-up — the face fills the frame" />
}

export function ExtremeCloseUpIll() {
  return (
    <Canvas title="Extreme close-up — a single detail, the eye">
      <FilmFrame x={40} y={16} w={120} h={93}>
        <path
          d="M 52 62 Q 100 24 148 62 Q 100 100 52 62 Z"
          fill="none"
          stroke={ILL.frame}
          strokeWidth="3"
        />
        <circle cx="100" cy="62" r="19" fill={ILL.stroke} />
        <circle cx="100" cy="62" r="9" fill={ILL.accent} />
        <circle cx="95" cy="56" r="3.5" fill={ILL.bg} />
      </FilmFrame>
    </Canvas>
  )
}

export function TwoShotIll() {
  return (
    <Canvas title="Two-shot — two subjects share the frame">
      <FilmFrame x={45} y={8} w={110} h={109}>
        <Figure x={80} y={22} h={140} />
        <Figure x={122} y={26} h={140} opacity={0.75} />
      </FilmFrame>
    </Canvas>
  )
}

export function OverShoulderIll() {
  return (
    <Canvas title="Over-the-shoulder shot">
      <FilmFrame x={45} y={8} w={110} h={109}>
        <Figure x={118} y={26} h={180} />
        {/* foreground shoulder + head, back to camera */}
        <circle cx="58" cy="82" r="26" fill={ILL.frame} />
        <path d="M 30 125 Q 34 92 66 96 L 92 104 L 92 125 Z" fill={ILL.frame} />
      </FilmFrame>
    </Canvas>
  )
}

export function InsertIll() {
  return (
    <Canvas title="Insert shot — a close view of an object">
      <FilmFrame x={45} y={8} w={110} h={109}>
        {/* envelope, large in frame */}
        <rect x="66" y="42" width="68" height="44" rx="4" fill={ILL.bg} stroke={ILL.stroke} strokeWidth="2.5" />
        <path d="M 66 46 L 100 70 L 134 46" fill="none" stroke={ILL.stroke} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="70" r="5" fill={ILL.accent} />
      </FilmFrame>
    </Canvas>
  )
}
