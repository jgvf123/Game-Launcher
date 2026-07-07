import { useState } from 'react'
import type { QuizRecord } from '../lib/state'
import { MODULE_BY_ID } from '../content'

function scopeShort(q: QuizRecord): string {
  if (q.scope.kind === 'all') return 'Full test'
  if (q.scope.kind === 'module') return MODULE_BY_ID.get(q.scope.moduleId)?.title ?? 'Module'
  return `Mood: ${q.scope.mood}`
}

/**
 * Quiz scores over time as a single-series bar chart.
 * One validated mark color per theme (--chart-bar); text uses text tokens.
 */
export function QuizChart({ quizzes }: { quizzes: QuizRecord[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const recent = quizzes.slice(-20)
  if (recent.length === 0) return null

  const W = 560
  const H = 180
  const pad = { top: 18, right: 8, bottom: 22, left: 34 }
  const plotW = W - pad.left - pad.right
  const plotH = H - pad.top - pad.bottom
  const slot = plotW / recent.length
  const barW = Math.min(28, Math.max(8, slot - 2))
  const yFor = (pct: number) => pad.top + plotH * (1 - pct / 100)

  // Rounded top corners (4px), flat baseline end.
  const barPath = (x: number, y: number, w: number, h: number) => {
    const r = Math.min(4, w / 2, h)
    const bottom = pad.top + plotH
    return `M ${x} ${bottom} L ${x} ${y + r} Q ${x} ${y} ${x + r} ${y} L ${x + w - r} ${y} Q ${x + w} ${y} ${x + w} ${y + r} L ${x + w} ${bottom} Z`
  }

  const hovered = hover !== null ? recent[hover] : null

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Quiz scores over time, most recent 20 tests">
        {/* recessive gridlines + y labels */}
        {[0, 50, 80, 100].map((pct) => (
          <g key={pct}>
            <line
              x1={pad.left}
              x2={W - pad.right}
              y1={yFor(pct)}
              y2={yFor(pct)}
              stroke="currentColor"
              className={pct === 80 ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-200 dark:text-zinc-800'}
              strokeWidth="1"
              strokeDasharray={pct === 80 ? '4 3' : undefined}
            />
            <text
              x={pad.left - 6}
              y={yFor(pct) + 3.5}
              textAnchor="end"
              fontSize="10"
              className="fill-zinc-500 dark:fill-zinc-400"
            >
              {pct}
            </text>
          </g>
        ))}
        {recent.map((q, i) => {
          const pct = q.total ? (q.score / q.total) * 100 : 0
          const x = pad.left + i * slot + (slot - barW) / 2
          const y = yFor(pct)
          return (
            <g key={q.id}>
              {/* generous hit target */}
              <rect
                x={pad.left + i * slot}
                y={pad.top}
                width={slot}
                height={plotH}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
              <path
                d={barPath(x, y, barW, Math.max(2, pad.top + plotH - y))}
                fill="var(--chart-bar)"
                opacity={hover === null || hover === i ? 1 : 0.45}
                pointerEvents="none"
              />
            </g>
          )
        })}
        <text
          x={pad.left}
          y={H - 6}
          fontSize="10"
          className="fill-zinc-500 dark:fill-zinc-400"
        >
          older
        </text>
        <text
          x={W - pad.right}
          y={H - 6}
          fontSize="10"
          textAnchor="end"
          className="fill-zinc-500 dark:fill-zinc-400"
        >
          latest
        </text>
      </svg>
      {hovered && hover !== null && (
        <div
          className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900"
          style={{
            left: `${((pad.left + hover * slot + slot / 2) / W) * 100}%`,
          }}
        >
          <strong>{Math.round((hovered.score / hovered.total) * 100)}%</strong> · {scopeShort(hovered)} ·{' '}
          {new Date(hovered.date).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}
