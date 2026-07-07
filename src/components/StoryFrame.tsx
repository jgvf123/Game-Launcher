import { useId, type ReactNode } from 'react'
import { ILL, Figure } from '../illustrations/primitives'
import type { Dimension } from '../content/stories'

/**
 * Renders a storyboard panel composed from the beat's chosen techniques.
 * Schematic, same visual language as the card illustrations: the shot size
 * sets the figure framing, the angle sets horizon/geometry, the lens adds
 * background treatment, the lighting sets the tonal treatment.
 */
export function StoryFrame({
  spec,
  className = '',
  label,
}: {
  spec: Record<Dimension, string>
  className?: string
  label?: string
}) {
  const clipId = useId()
  const blurId = useId()
  const { shot, angle, lens, light } = spec

  const dutch = angle === 'dutch-angle'
  const birds = angle === 'birds-eye'
  const horizonY =
    angle === 'low-angle' ? 100
    : angle === 'worms-eye' ? 112
    : angle === 'high-angle' ? 42
    : angle === 'shoulder-level' ? 82
    : 76

  // ── lighting: tonal treatment ──
  const dark = ['low-key', 'chiaroscuro', 'practical', 'silhouette'].includes(light)
  const figureColor =
    light === 'silhouette' ? ILL.frame : dark ? 'oklch(0.35 0.008 260)' : ILL.fill

  const lightOverlays: ReactNode[] = []
  if (light === 'low-key' || light === 'chiaroscuro' || light === 'practical') {
    lightOverlays.push(
      <rect key="dk" x="-30" y="-30" width="260" height="185" fill={ILL.frame} opacity={light === 'chiaroscuro' ? 0.5 : 0.42} />,
    )
  }
  if (light === 'chiaroscuro') {
    lightOverlays.push(
      <polygon key="beam" points="-10,-10 60,-10 150,135 80,135" fill={ILL.bg} opacity="0.45" />,
    )
  }
  if (light === 'practical') {
    lightOverlays.push(
      <g key="lamp">
        <circle cx="160" cy="40" r="30" fill={ILL.accent} opacity="0.3" />
        <circle cx="160" cy="40" r="7" fill={ILL.accent} opacity="0.9" />
      </g>,
    )
  }
  if (light === 'silhouette') {
    lightOverlays.push(
      <circle key="glow" cx="100" cy={Math.min(horizonY - 8, 70)} r="44" fill={ILL.accent} opacity="0.85" />,
    )
  }
  if (light === 'hard-light') {
    lightOverlays.push(
      <polygon key="shadow" points="100,120 155,120 190,135 110,135" fill={ILL.frame} opacity="0.3" />,
    )
  }
  if (light === 'rembrandt') {
    lightOverlays.push(
      <rect key="half" x="100" y="-30" width="130" height="185" fill={ILL.frame} opacity="0.22" />,
    )
  }
  if (light === 'high-key') {
    lightOverlays.push(
      <rect key="lift" x="-30" y="-30" width="260" height="185" fill="#ffffff" opacity="0.14" />,
    )
  }

  // ── lens: background treatment (drawn behind the subject) ──
  const lensBg: ReactNode[] = []
  if (lens === 'wide-angle-lens' && !birds) {
    lensBg.push(
      <g key="persp" stroke={ILL.muted} strokeWidth="1.8" opacity="0.8">
        <line x1="-5" y1="125" x2="82" y2={horizonY} />
        <line x1="205" y1="125" x2="118" y2={horizonY} />
      </g>,
    )
  }
  if (lens === 'telephoto-lens' && !birds) {
    lensBg.push(<circle key="comp" cx="100" cy={horizonY - 22} r="46" fill={ILL.muted} opacity="0.55" />)
  }
  if (lens === 'shallow-dof' && !birds) {
    lensBg.push(
      <g key="bokeh" filter={`url(#${blurId})`}>
        <circle cx="46" cy="40" r="12" fill={ILL.muted} />
        <circle cx="160" cy="30" r="9" fill={ILL.muted} />
        <circle cx="172" cy="78" r="11" fill={ILL.muted} />
      </g>,
    )
  }
  if (lens === 'deep-focus' && !birds) {
    lensBg.push(
      <g key="deep">
        <Figure x={162} y={horizonY - 30} h={30} color={ILL.muted} />
        <Figure x={44} y={horizonY - 20} h={20} color={ILL.muted} />
      </g>,
    )
  }
  if (lens === 'dolly-zoom' && !birds) {
    lensBg.push(
      <g key="warp" stroke={ILL.muted} strokeWidth="1.8" fill="none">
        <path d="M 150 10 Q 170 62 150 115" />
        <path d="M 172 6 Q 196 62 172 119" />
      </g>,
    )
  }

  // ── subject per shot size ──
  const subject: ReactNode = (() => {
    if (birds) {
      const s = shot === 'extreme-wide' ? 0.5 : 1
      return (
        <g>
          <ellipse cx="100" cy="80" rx={20 * s} ry={9 * s} fill={figureColor} opacity="0.7" />
          <circle cx="100" cy="78" r={8 * s} fill={figureColor} />
          {shot === 'two-shot' && (
            <g>
              <ellipse cx="140" cy="86" rx={20 * s} ry={9 * s} fill={figureColor} opacity="0.7" />
              <circle cx="140" cy="84" r={8 * s} fill={figureColor} />
            </g>
          )}
        </g>
      )
    }
    switch (shot) {
      case 'extreme-wide':
        return (
          <g>
            <path d={`M 0 ${horizonY} L 52 ${horizonY - 40} L 100 ${horizonY} Z`} fill={ILL.muted} opacity="0.8" />
            <path d={`M 76 ${horizonY} L 130 ${horizonY - 28} L 182 ${horizonY} Z`} fill={ILL.muted} opacity="0.55" />
            <Figure x={100} y={horizonY - 13} h={13} color={light === 'silhouette' ? ILL.frame : ILL.accent} />
          </g>
        )
      case 'wide':
        return <Figure x={100} y={horizonY - 46} h={46} color={figureColor} />
      case 'full':
        return <Figure x={100} y={Math.max(6, horizonY - 90)} h={90} color={figureColor} />
      case 'medium-long':
        return <Figure x={100} y={10} h={128} color={figureColor} />
      case 'cowboy':
        return <Figure x={100} y={9} h={165} color={figureColor} />
      case 'medium':
        return <Figure x={100} y={8} h={210} color={figureColor} />
      case 'medium-close-up':
        return <Figure x={100} y={7} h={330} color={figureColor} />
      case 'close-up':
        return (
          <g fill={figureColor}>
            <circle cx="100" cy="56" r="35" />
            <path d="M 40 125 Q 44 96 100 94 Q 156 96 160 125 Z" />
          </g>
        )
      case 'extreme-close-up':
        return (
          <g>
            <path d="M 40 62 Q 100 22 160 62 Q 100 102 40 62 Z" fill="none" stroke={figureColor} strokeWidth="3.5" />
            <circle cx="100" cy="62" r="18" fill={figureColor} />
            <circle cx="100" cy="62" r="8" fill={ILL.accent} />
          </g>
        )
      case 'two-shot':
        return (
          <g>
            <Figure x={72} y={16} h={150} color={figureColor} />
            <Figure x={126} y={22} h={150} color={figureColor} opacity={0.8} />
          </g>
        )
      case 'over-the-shoulder':
        return (
          <g>
            <Figure x={122} y={20} h={175} color={figureColor} />
            <circle cx="44" cy="88" r="28" fill={ILL.frame} />
            <path d="M 12 135 Q 18 96 54 100 L 82 110 L 82 135 Z" fill={ILL.frame} />
          </g>
        )
      case 'insert':
        return (
          <g>
            <rect x="62" y="42" width="76" height="46" rx="5" fill={ILL.bg} stroke={figureColor} strokeWidth="3" />
            <circle cx="100" cy="65" r="7" fill={ILL.accent} />
          </g>
        )
      default:
        return <Figure x={100} y={horizonY - 70} h={70} color={figureColor} />
    }
  })()

  const showHorizon =
    !birds && ['extreme-wide', 'wide', 'full', 'medium-long', 'two-shot'].includes(shot)

  const povHands = angle === 'pov' && (
    <g fill={ILL.frame} opacity="0.85">
      <rect x="6" y="106" width="30" height="30" rx="12" />
      <rect x="164" y="106" width="30" height="30" rx="12" />
    </g>
  )

  const scene = (
    <g transform={dutch ? 'rotate(-10 100 62)' : undefined}>
      <rect x="-40" y="-40" width="280" height="205" fill={ILL.bg} />
      {light === 'silhouette' && lightOverlays}
      {lensBg}
      {showHorizon && (
        <line x1="-40" y1={horizonY} x2="240" y2={horizonY} stroke={ILL.muted} strokeWidth="2" />
      )}
      {subject}
      {light !== 'silhouette' && lightOverlays}
    </g>
  )

  return (
    <svg
      viewBox="0 0 200 125"
      role="img"
      aria-label={label ?? 'Storyboard frame'}
      className={`h-full w-full ${className}`}
    >
      <defs>
        <filter id={blurId}>
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <clipPath id={clipId}>
          <rect x="1.5" y="1.5" width="197" height="122" rx="5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {scene}
        {povHands}
      </g>
      <rect x="1.5" y="1.5" width="197" height="122" rx="5" fill="none" stroke={ILL.frame} strokeWidth="3" />
    </svg>
  )
}
