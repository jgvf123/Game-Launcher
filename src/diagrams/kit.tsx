import type { ReactNode } from 'react'

/**
 * Shared vocabulary for v2 lesson diagrams.
 *
 * Every diagram is drawn in code on a 320 x 200 canvas, uses the same
 * CSS-variable palette as the v1 illustrations (so it themes automatically),
 * and stays crisp at any zoom. Interactive diagrams put their controls in
 * real HTML below the SVG — keyboard-operable, and readable on a phone.
 */
export const D = {
  bg: 'var(--ill-bg)',
  frame: 'var(--ill-frame)',
  stroke: 'var(--ill-stroke)',
  fill: 'var(--ill-fill)',
  muted: 'var(--ill-muted)',
  accent: 'var(--ill-accent)',
}

export const CANVAS = { w: 320, h: 200 }

export function Stage({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
      role="img"
      aria-label={`Diagram: ${label}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width={CANVAS.w} height={CANVAS.h} rx="8" fill={D.bg} />
      {children}
    </svg>
  )
}

/** Wraps an SVG stage plus its controls in a bordered, responsive card. */
export function DiagramShell({
  children,
  controls,
}: {
  children: ReactNode
  controls?: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="aspect-[320/200] w-full">{children}</div>
      {controls ? (
        <div className="border-t border-zinc-200 px-3 py-3 dark:border-zinc-800">{controls}</div>
      ) : null}
    </div>
  )
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange,
  hint,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (n: number) => void
  hint?: string
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm font-medium">
        <span className="text-ink-soft">{label}</span>
        <span className="tabular-nums font-semibold text-accent-strong dark:text-accent">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-[var(--color-accent-strong)]"
      />
      {hint ? <span className="block text-xs text-ink-soft">{hint}</span> : null}
    </label>
  )
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o.value === value
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                active ? 'bg-accent-strong text-white' : 'bg-surface text-ink-soft hover:text-ink'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** A short verdict line under a diagram — what the current setting actually means. */
export function Readout({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-sm leading-snug text-ink-soft">{children}</p>
}

/** Small caption text drawn inside an SVG. */
export function Tag({
  x,
  y,
  children,
  anchor = 'middle',
  color = D.stroke,
  size = 9,
}: {
  x: number | string
  y: number | string
  children: ReactNode
  anchor?: 'start' | 'middle' | 'end'
  color?: string
  size?: number
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      /* Sized down as one: the stage is rendered wider now, so raw sizes read oversized. */
      fontSize={size * 0.78}
      fill={color}
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontWeight={600}
    >
      {children}
    </text>
  )
}

/** Standing figure, `h` px tall, centred on `x`, feet at `y`. */
export function Person({
  x,
  y,
  h,
  color = D.fill,
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
    <g transform={`translate(${x} ${y - h}) scale(${s})`} fill={color} opacity={opacity}>
      <circle cx="0" cy="10" r="9" />
      <rect x="-11" y="21" width="22" height="34" rx="10" />
      <rect x="-8.5" y="50" width="7" height="48" rx="3.5" />
      <rect x="1.5" y="50" width="7" height="48" rx="3.5" />
    </g>
  )
}

/** Simple camera glyph pointing right, for plan views. */
export function CameraGlyph({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-7" y="-5" width="12" height="10" rx="2" fill={D.accent} />
      <path d="M5 -3.5 L11 -6.5 L11 6.5 L5 3.5 Z" fill={D.accent} />
    </g>
  )
}
