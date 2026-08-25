import { Link, useParams } from 'react-router-dom'
import { TRACK_BY_ID, lessonsInModule, modulesInTrack, trackScope } from '../../curriculum'
import type { TrackId } from '../../curriculum'
import { useLessonProgress, useShippedLessonIds } from '../../data/hooks'
import { EmptyState } from '../../components/ui'

export function TrackDetail() {
  const { trackId } = useParams<{ trackId: string }>()
  const track = trackId ? TRACK_BY_ID.get(trackId as TrackId) : undefined
  const progress = useLessonProgress()
  const shipped = useShippedLessonIds()

  if (!track) {
    return (
      <EmptyState title="No such track">
        That track id does not exist.{' '}
        <Link to="/tracks" className="underline">
          Back to tracks
        </Link>
        .
      </EmptyState>
    )
  }

  const modules = modulesInTrack(track.id)
  const scope = trackScope(track.id)

  return (
    <div>
      <Link to="/tracks" className="text-sm font-medium text-ink-soft hover:underline">
        &larr; All tracks
      </Link>
      <header className="mb-6 mt-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
          Track {track.letter}
        </p>
        <h1 className="text-2xl font-bold tracking-tight">{track.title}</h1>
        <p className="mt-1 text-base text-ink-soft">{track.tagline}</p>
        <p className="mt-2 text-sm text-ink-soft">
          {scope.written} of {scope.planned} lessons written across {modules.length} modules.
        </p>
      </header>

      <div className="space-y-5">
        {modules.map((module) => {
          const lessons = lessonsInModule(module.id)
          return (
            <section key={module.id}>
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <h2 className="font-semibold">{module.title}</h2>
                <span className="shrink-0 text-xs font-medium text-ink-soft">
                  {lessons.length > 0
                    ? `${lessons.length} of ${module.plannedLessons}`
                    : `${module.plannedLessons} planned`}
                </span>
              </div>
              <p className="mb-2 text-sm text-ink-soft">{module.tagline}</p>

              {lessons.length === 0 ? (
                <div className="rounded-lg border border-dashed border-line px-4 py-4 text-sm text-ink-soft">
                  Not written yet. When it is, it ships as {module.plannedLessons} complete lessons
                  — never as stubs.
                </div>
              ) : (
                <ol className="divide-y divide-line overflow-hidden rounded-2xl bg-surface">
                  {lessons.map((lesson) => {
                    const opened = progress.has(lesson.id)
                    const done = shipped.has(lesson.id)
                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/lesson/${lesson.id}`}
                          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-paper"
                        >
                          <span
                            aria-hidden
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              done
                                ? 'bg-accent-strong text-white'
                                : opened
                                  ? 'bg-accent-soft text-accent-strong dark:bg-surface dark:text-accent'
                                  : 'bg-surface text-ink-soft  '
                            }`}
                          >
                            {done ? '✓' : lesson.order}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium leading-tight">{lesson.title}</span>
                            <span className="block text-sm leading-snug text-ink-soft">
                              {lesson.oneLine}
                            </span>
                          </span>
                          <span className="shrink-0 text-xs font-medium text-ink-faint">
                            {lesson.estMinutes} min
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ol>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
