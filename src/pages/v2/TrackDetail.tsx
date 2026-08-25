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
        That track id does not exist. <Link to="/tracks" className="underline">Back to tracks</Link>.
      </EmptyState>
    )
  }

  const modules = modulesInTrack(track.id)
  const scope = trackScope(track.id)

  return (
    <div>
      <Link to="/tracks" className="text-sm font-medium text-zinc-500 hover:underline dark:text-zinc-400">
        &larr; All tracks
      </Link>
      <header className="mb-6 mt-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
          Track {track.letter}
        </p>
        <h1 className="text-2xl font-bold tracking-tight">{track.title}</h1>
        <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">{track.tagline}</p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
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
                <span className="shrink-0 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {lessons.length > 0
                    ? `${lessons.length} of ${module.plannedLessons}`
                    : `${module.plannedLessons} planned`}
                </span>
              </div>
              <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">{module.tagline}</p>

              {lessons.length === 0 ? (
                <div className="rounded-lg border border-dashed border-zinc-300 px-4 py-4 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  Not written yet. When it is, it ships as {module.plannedLessons} complete lessons
                  — never as stubs.
                </div>
              ) : (
                <ol className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
                  {lessons.map((lesson) => {
                    const opened = progress.has(lesson.id)
                    const done = shipped.has(lesson.id)
                    return (
                      <li key={lesson.id}>
                        <Link
                          to={`/lesson/${lesson.id}`}
                          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent-soft/40 dark:hover:bg-zinc-800/70"
                        >
                          <span
                            aria-hidden
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              done
                                ? 'bg-accent-strong text-white'
                                : opened
                                  ? 'bg-accent-soft text-accent-strong dark:bg-zinc-800 dark:text-accent'
                                  : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                          >
                            {done ? '✓' : lesson.order}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium leading-tight">{lesson.title}</span>
                            <span className="block text-sm leading-snug text-zinc-500 dark:text-zinc-400">
                              {lesson.oneLine}
                            </span>
                          </span>
                          <span className="shrink-0 text-xs font-medium text-zinc-400 dark:text-zinc-500">
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
