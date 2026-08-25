import { Link } from 'react-router-dom'
import { LESSON_SEQUENCE, REVIEW_ITEMS, TRACK_BY_ID } from '../curriculum'
import { useLessonProgress, useShipLog } from '../data/hooks'
import { useAppState } from '../lib/state'
import { isDue } from '../lib/srs'

/**
 * One question, one answer.
 *
 * This screen exists to start the next thing and nothing else. Counts, weak
 * areas and the rest of the app are one tap away — they are not competing for
 * attention the moment you open it.
 */
export function Home() {
  const { reviews } = useAppState()
  const progress = useLessonProgress()
  const shipLog = useShipLog()

  const shipped = new Set(shipLog.map((r) => r.lessonId))
  const lesson = LESSON_SEQUENCE.find((l) => !shipped.has(l.id))
  const started = lesson ? progress.has(lesson.id) : false
  const dueCount = REVIEW_ITEMS.filter((i) => isDue(reviews[i.id])).length
  const owed = LESSON_SEQUENCE.filter((l) => progress.has(l.id) && !shipped.has(l.id)).length

  return (
    <div className="animate-fade-up">
      {lesson ? (
        <section className="pt-6 sm:pt-14">
          <p className="text-sm text-ink-faint">
            {started ? 'Where you left off' : 'Next up'}
            {' · '}
            {TRACK_BY_ID.get(lesson.trackId)?.title}
          </p>

          <h1 className="mt-3 text-[1.75rem] font-bold leading-[1.2] tracking-tight sm:text-[2.1rem]">
            {lesson.title}
          </h1>

          <p className="reading mt-3 max-w-[34rem] text-ink-soft">{lesson.oneLine}</p>

          <Link
            to={`/lesson/${lesson.id}`}
            className="mt-7 inline-flex items-center rounded-xl bg-accent-strong px-6 py-3.5 text-base font-semibold text-white transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
          >
            {started ? 'Continue' : 'Begin'}
          </Link>

          <p className="mt-3 text-sm text-ink-faint">
            {lesson.estMinutes} min to read &middot; {lesson.assignment.timeboxMinutes} min to make
          </p>
        </section>
      ) : (
        <section className="pt-6 sm:pt-14">
          <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight">
            Everything written is shipped.
          </h1>
          <p className="reading mt-3 max-w-[34rem] text-ink-soft">
            Nothing left in the queue. Review what you know, or make something of your own.
          </p>
          <Link
            to="/review"
            className="mt-7 inline-flex items-center rounded-xl bg-accent-strong px-6 py-3.5 text-base font-semibold text-white hover:brightness-105"
          >
            Review
          </Link>
        </section>
      )}

      {/* Everything else is a quiet line, never a competing panel. */}
      <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
        {dueCount > 0 ? (
          <Link to="/review" className="text-ink-soft transition-colors hover:text-ink">
            <span className="font-semibold text-accent-strong dark:text-accent">{dueCount}</span>{' '}
            due for review
          </Link>
        ) : null}
        {owed > 0 ? (
          <Link to="/practice" className="text-ink-soft transition-colors hover:text-ink">
            <span className="font-semibold text-accent-strong dark:text-accent">{owed}</span>{' '}
            assignment{owed === 1 ? '' : 's'} waiting
          </Link>
        ) : null}
        <Link to="/tracks" className="text-ink-soft transition-colors hover:text-ink">
          All tracks
        </Link>
      </div>
    </div>
  )
}
