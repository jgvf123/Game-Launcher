import { Link } from 'react-router-dom'
import {
  CURRICULUM_SCOPE,
  TRACKS,
  lessonsInTrack,
  modulesInTrack,
  trackScope,
} from '../../curriculum'
import { useLessonProgress, useShippedLessonIds } from '../../data/hooks'

function Ring({ done, total, letter }: { done: number; total: number; letter: string }) {
  const r = 22
  const c = 2 * Math.PI * r
  const pct = total > 0 ? done / total : 0
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 shrink-0" aria-hidden>
      <circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="text-zinc-200 dark:text-ink"
      />
      <circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`}
        transform="rotate(-90 28 28)"
        className="text-accent-strong transition-all duration-300"
      />
      <text
        x="28"
        y="33"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill="currentColor"
        className="text-ink-soft"
      >
        {letter}
      </text>
    </svg>
  )
}

export function Tracks() {
  const progress = useLessonProgress()
  const shipped = useShippedLessonIds()

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Tracks</h1>
        <p className="mt-1 text-base text-ink-soft">
          Ten tracks, from story thinking to getting paid. Every concept is taught twice — once the
          way it works on a set, once the way it works when your camera is a diffusion model.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          <strong className="text-accent-strong dark:text-accent">
            {CURRICULUM_SCOPE.written} lessons written
          </strong>{' '}
          of {CURRICULUM_SCOPE.planned} planned. Nothing here is a stub — a lesson exists in full or
          it does not exist.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {TRACKS.map((track) => {
          const scope = trackScope(track.id)
          const lessons = lessonsInTrack(track.id)
          const started = lessons.filter((l) => progress.has(l.id)).length
          const done = lessons.filter((l) => shipped.has(l.id)).length
          const modules = modulesInTrack(track.id)
          const empty = scope.written === 0

          return (
            <Link
              key={track.id}
              to={`/track/${track.id}`}
              className={`flex gap-4 rounded-xl border p-4 transition-colors ${
                empty
                  ? 'border-dashed border-line hover:bg-zinc-50  dark:hover:bg-surface'
                  : 'border-line bg-surface hover:border-accent hover:bg-accent-soft/40  /70'
              }`}
            >
              <Ring done={done} total={scope.written || 1} letter={track.letter} />
              <div className="min-w-0">
                <h2 className="font-semibold leading-tight">{track.title}</h2>
                <p className="mt-0.5 text-sm leading-snug text-ink-soft">{track.tagline}</p>
                <p className="mt-2 text-xs font-medium text-ink-soft">
                  {empty ? (
                    <span>
                      {modules.length} modules &middot; {scope.planned} lessons planned
                    </span>
                  ) : (
                    <span>
                      <span className="text-accent-strong dark:text-accent">
                        {scope.written} written
                      </span>{' '}
                      of {scope.planned} &middot; {started} opened &middot; {done} shipped
                    </span>
                  )}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
