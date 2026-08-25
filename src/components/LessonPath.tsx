import { Link } from 'react-router-dom'
import { MODULE_BY_ID, TRACK_BY_ID, lessonsInModule } from '../curriculum'
import type { Lesson } from '../curriculum'

/**
 * "You are here."
 *
 * The calm rebuild removed so much chrome that it also removed any sense of
 * place — you could not tell which module you were in, how long it was, or
 * what came next. This puts the map back without putting the clutter back:
 * the track and module you are inside, and the lessons of that module as a
 * row of steps with the current one marked.
 */
export function LessonPath({
  lesson,
  shipped,
  linkSteps = true,
}: {
  lesson: Lesson
  shipped: Set<string>
  /** Off inside a lesson, where tapping another lesson mid-step is a trap. */
  linkSteps?: boolean
}) {
  const track = TRACK_BY_ID.get(lesson.trackId)
  const module = MODULE_BY_ID.get(lesson.moduleId)
  const lessons = lessonsInModule(lesson.moduleId)
  const position = lessons.findIndex((l) => l.id === lesson.id) + 1

  return (
    <div>
      <p className="text-sm text-ink-soft">
        {track ? (
          <>
            <span className="font-medium">Track {track.letter}</span> &middot; {track.title}
          </>
        ) : null}
      </p>
      <p className="mt-0.5 text-sm text-ink-faint">
        {module?.title} &middot; Lesson {position} of {lessons.length}
      </p>

      <ol className="mt-3 flex flex-wrap items-center gap-1.5">
        {lessons.map((l, i) => {
          const isDone = shipped.has(l.id)
          const isCurrent = l.id === lesson.id
          const tone = isCurrent
            ? 'bg-accent-strong text-white'
            : isDone
              ? 'bg-accent-soft text-accent-strong dark:bg-surface dark:text-accent'
              : 'bg-surface text-ink-faint'
          const body = (
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${tone}`}
              title={l.title}
            >
              {isDone && !isCurrent ? '✓' : i + 1}
            </span>
          )
          return (
            <li key={l.id}>
              {linkSteps ? (
                <Link to={`/lesson/${l.id}`} aria-label={l.title}>
                  {body}
                </Link>
              ) : (
                body
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
