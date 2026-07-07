import { useId, type ReactNode } from 'react'

/**
 * Shared vocabulary for every card illustration.
 * All illustrations draw on a 200 × 125 canvas and use the same
 * CSS-variable palette so they adapt to light/dark themes.
 */
export const ILL = {
  bg: 'var(--ill-bg)',
  frame: 'var(--ill-frame)',
  stroke: 'var(--ill-stroke)',
  fill: 'var(--ill-fill)',
  muted: 'var(--ill-muted)',
  accent: 'var(--ill-accent)',
}

export function Canvas({ children, title }: { children: ReactNode; title: string }) {
  return (
    <svg
      viewBox="0 0 200 125"
      role="img"
      aria-label={`Diagram: ${title}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="200" height="125" rx="6" fill={ILL.bg} />
      {children}
    </svg>
  )
}

/**
 * Minimal person silhouette, 100 units tall in its own space.
 * Anatomy landmarks (y in figure space): head top 0, chin 19, shoulders 22,
 * chest 30, waist 48, mid-thigh 62, knees 72, mid-shin 82, feet 100.
 * `x` is the horizontal centre, `y` the top of the head, `h` the height.
 */
export function Figure({
  x,
  y,
  h,
  color = ILL.fill,
  opacity = 1,
}: {
  x: number
  y: number
  h: number
  color?: string
  opacity?: number
}) {
  const s = h / 100
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color} opacity={opacity}>
      <circle cx="0" cy="10" r="9" />
      <rect x="-11" y="21" width="22" height="34" rx="10" />
      <rect x="-8.5" y="50" width="7" height="48" rx="3.5" />
      <rect x="1.5" y="50" width="7" height="48" rx="3.5" />
    </g>
  )
}

/** Side-view camera icon, facing right by default. ~26 wide, 18 tall, centred on (0,0). */
export function Camera({
  x,
  y,
  rotate = 0,
  scale = 1,
  color = ILL.frame,
}: {
  x: number
  y: number
  rotate?: number
  scale?: number
  color?: string
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} fill={color}>
      <rect x="-12" y="-7" width="17" height="14" rx="2.5" />
      <path d="M 5 -4.5 L 13 -8 L 13 8 L 5 4.5 Z" />
      <rect x="-10" y="-11" width="9" height="5" rx="1.5" />
    </g>
  )
}

/** Dashed sightline between camera and subject. */
export function SightLine({
  x1,
  y1,
  x2,
  y2,
  color = ILL.accent,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="1.6"
      strokeDasharray="4 3"
      strokeLinecap="round"
    />
  )
}

/** Straight arrow with a solid head. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = ILL.accent,
  width = 2.2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  width?: number
}) {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const hl = 6
  const spread = 0.5
  const p1 = `${x2 - hl * Math.cos(a - spread)},${y2 - hl * Math.sin(a - spread)}`
  const p2 = `${x2 - hl * Math.cos(a + spread)},${y2 - hl * Math.sin(a + spread)}`
  const shaftX = x2 - (hl - 1.5) * Math.cos(a)
  const shaftY = y2 - (hl - 1.5) * Math.sin(a)
  return (
    <g>
      <line x1={x1} y1={y1} x2={shaftX} y2={shaftY} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </g>
  )
}

/** Curved arrow along an arc (for pans, tilts, cranes). Sweep flag chooses direction. */
export function ArcArrow({
  x1,
  y1,
  x2,
  y2,
  r,
  sweep = 1,
  color = ILL.accent,
  headAngle,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  r: number
  sweep?: 0 | 1
  color?: string
  /** direction of the arrowhead in degrees (0 = pointing right) */
  headAngle: number
}) {
  const a = (headAngle * Math.PI) / 180
  const hl = 6
  const spread = 0.5
  const p1 = `${x2 - hl * Math.cos(a - spread)},${y2 - hl * Math.sin(a - spread)}`
  const p2 = `${x2 - hl * Math.cos(a + spread)},${y2 - hl * Math.sin(a + spread)}`
  return (
    <g>
      <path
        d={`M ${x1} ${y1} A ${r} ${r} 0 0 ${sweep} ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </g>
  )
}

/** The film-frame rectangle used by shot-size cards. */
export function FilmFrame({
  x = 60,
  y = 8,
  w = 130,
  h = 109,
  children,
}: {
  x?: number
  y?: number
  w?: number
  h?: number
  children?: ReactNode
}) {
  const clipId = useId()
  return (
    <g>
      <clipPath id={clipId}>
        <rect x={x} y={y} width={w} height={h} rx="3" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>{children}</g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        fill="none"
        stroke={ILL.frame}
        strokeWidth="2.5"
      />
    </g>
  )
}

/**
 * Standard layout for crop-defined shot sizes: a small reference figure on the
 * left with an accent line at the crop height, and the resulting framing on
 * the right. `cropAt` is the anatomy landmark in figure space (0–100).
 */
export function CropShot({ cropAt, title }: { cropAt: number; title: string }) {
  const refX = 28
  const refY = 32
  const refH = 62
  const cropY = refY + (refH * cropAt) / 100
  const frame = { x: 62, y: 8, w: 126, h: 109 }
  // Scale the framed figure so the visible span (head top → crop) fills the frame.
  const headroom = 8
  const visible = frame.h - headroom - 2
  const s = visible / cropAt
  const figH = 100 * s
  const figTop = frame.y + headroom
  return (
    <Canvas title={title}>
      <Figure x={refX} y={refY} h={refH} color={ILL.muted} />
      <line
        x1={refX - 15}
        y1={cropY}
        x2={refX + 15}
        y2={cropY}
        stroke={ILL.accent}
        strokeWidth="2"
        strokeDasharray="3 2.5"
        strokeLinecap="round"
      />
      <FilmFrame {...frame}>
        <Figure x={frame.x + frame.w / 2} y={figTop} h={figH} />
      </FilmFrame>
    </Canvas>
  )
}

/** Small light icon with rays (sun/lamp style) for lighting diagrams. */
export function LightIcon({
  x,
  y,
  r = 5,
  color = ILL.accent,
}: {
  x: number
  y: number
  r?: number
  color?: string
}) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <g stroke={color} strokeWidth="1.6" strokeLinecap="round">
      <circle cx={x} cy={y} r={r} fill={color} stroke="none" />
      {rays.map((deg) => {
        const a = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={x + (r + 2) * Math.cos(a)}
            y1={y + (r + 2) * Math.sin(a)}
            x2={x + (r + 5) * Math.cos(a)}
            y2={y + (r + 5) * Math.sin(a)}
          />
        )
      })}
    </g>
  )
}

/** Translucent light beam from a source toward a target point. */
export function Beam({
  x,
  y,
  tx,
  ty,
  spread = 10,
  color = ILL.accent,
  opacity = 0.22,
}: {
  x: number
  y: number
  tx: number
  ty: number
  spread?: number
  color?: string
  opacity?: number
}) {
  const a = Math.atan2(ty - y, tx - x)
  const perp = a + Math.PI / 2
  const p1x = tx + spread * Math.cos(perp)
  const p1y = ty + spread * Math.sin(perp)
  const p2x = tx - spread * Math.cos(perp)
  const p2y = ty - spread * Math.sin(perp)
  return <polygon points={`${x},${y} ${p1x},${p1y} ${p2x},${p2y}`} fill={color} opacity={opacity} />
}

/** Field-of-view wedge for top-down lens/movement diagrams. */
export function FovWedge({
  x,
  y,
  angle,
  halfSpread,
  len,
  color = ILL.accent,
  opacity = 0.18,
}: {
  x: number
  y: number
  /** direction in degrees, 0 = right, -90 = up */
  angle: number
  halfSpread: number
  len: number
  color?: string
  opacity?: number
}) {
  const a1 = ((angle - halfSpread) * Math.PI) / 180
  const a2 = ((angle + halfSpread) * Math.PI) / 180
  return (
    <g>
      <polygon
        points={`${x},${y} ${x + len * Math.cos(a1)},${y + len * Math.sin(a1)} ${x + len * Math.cos(a2)},${y + len * Math.sin(a2)}`}
        fill={color}
        opacity={opacity}
      />
      <line x1={x} y1={y} x2={x + len * Math.cos(a1)} y2={y + len * Math.sin(a1)} stroke={color} strokeWidth="1.4" opacity="0.6" />
      <line x1={x} y1={y} x2={x + len * Math.cos(a2)} y2={y + len * Math.sin(a2)} stroke={color} strokeWidth="1.4" opacity="0.6" />
    </g>
  )
}

/** Top-view camera: small body square, used with FovWedge. */
export function CameraTop({
  x,
  y,
  rotate = -90,
  color = ILL.frame,
}: {
  x: number
  y: number
  /** direction the lens faces in degrees, 0 = right, -90 = up */
  rotate?: number
  color?: string
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate + 90})`} fill={color}>
      <rect x="-8" y="0" width="16" height="14" rx="2.5" />
      <path d="M -5 0 L -3 -5 L 3 -5 L 5 0 Z" />
    </g>
  )
}

/** Portrait head-and-shoulders used by lighting-quality cards. Returns the head clip id. */
export function Portrait({
  x = 100,
  y = 58,
  r = 26,
  color = ILL.fill,
  children,
}: {
  x?: number
  y?: number
  r?: number
  color?: string
  /** overlays clipped to the head circle (shadow shapes etc.) */
  children?: ReactNode
}) {
  const clipId = useId()
  return (
    <g>
      <path
        d={`M ${x - r - 12} 125 Q ${x - r - 10} ${y + r + 6} ${x} ${y + r + 4} Q ${x + r + 10} ${y + r + 6} ${x + r + 12} 125 Z`}
        fill={color}
      />
      <circle cx={x} cy={y} r={r} fill={color} />
      <clipPath id={clipId}>
        <circle cx={x} cy={y} r={r} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>{children}</g>
    </g>
  )
}

/** Ground line for side-view diagrams. */
export function Ground({ y = 105 }: { y?: number }) {
  return <line x1="8" y1={y} x2="192" y2={y} stroke={ILL.muted} strokeWidth="2" strokeLinecap="round" />
}

/** Tiny uppercase label used sparingly in diagrams. */
export function Tag({
  x,
  y,
  text,
  color = ILL.stroke,
  anchor = 'middle',
}: {
  x: number
  y: number
  text: string
  color?: string
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize="7.5"
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      letterSpacing="0.08em"
      textAnchor={anchor}
    >
      {text}
    </text>
  )
}

/** Rounded color chip for the mood & color module. */
export function Chip({
  x,
  y,
  w = 24,
  h = 16,
  color,
}: {
  x: number
  y: number
  w?: number
  h?: number
  color: string
}) {
  return <rect x={x} y={y} width={w} height={h} rx="4" fill={color} />
}

/** Mini landscape scene (sky, sun, two hills) tinted by the given palette. */
export function MiniScene({
  x = 55,
  y = 18,
  w = 90,
  h = 58,
  sky,
  sun,
  hillBack,
  hillFront,
}: {
  x?: number
  y?: number
  w?: number
  h?: number
  sky: string
  sun: string
  hillBack: string
  hillFront: string
}) {
  const clipId = useId()
  return (
    <g>
      <clipPath id={clipId}>
        <rect x={x} y={y} width={w} height={h} rx="5" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect x={x} y={y} width={w} height={h} fill={sky} />
        <circle cx={x + w * 0.72} cy={y + h * 0.32} r={h * 0.16} fill={sun} />
        <path
          d={`M ${x} ${y + h * 0.72} Q ${x + w * 0.3} ${y + h * 0.42} ${x + w * 0.55} ${y + h * 0.7} L ${x + w} ${y + h * 0.66} L ${x + w} ${y + h} L ${x} ${y + h} Z`}
          fill={hillBack}
        />
        <path
          d={`M ${x} ${y + h * 0.9} Q ${x + w * 0.45} ${y + h * 0.6} ${x + w} ${y + h * 0.88} L ${x + w} ${y + h} L ${x} ${y + h} Z`}
          fill={hillFront}
        />
      </g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill="none" stroke={ILL.frame} strokeWidth="1.8" />
    </g>
  )
}
