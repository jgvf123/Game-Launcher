import { Link } from 'react-router-dom'
import { LESSON_SEQUENCE } from '../../curriculum'
import { useLessonProgress, useShipLog } from '../../data/hooks'

/**
 * The making half of the app. Four tools and whatever you owe yourself —
 * listed as plain rows, because a hub page should be read in two seconds and
 * then left.
 */
const TOOLS = [
  {
    to: '/tools/prompt-builder',
    title: 'Prompt Builder',
    sub: 'Build a shot prompt slot by slot, and see why each one matters.',
  },
  {
    to: '/tools/shot-analyzer',
    title: 'Shot Analyzer',
    sub: 'Read a frame, then check yourself against the rubric.',
  },
  {
    to: '/tools/shot-list',
    title: 'Shot List',
    sub: 'Plan every shot before you generate anything. Exports CSV, JSON, PDF.',
  },
  {
    to: '/projects',
    title: 'Projects',
    sub: 'Nine gates from concept to delivery. Nothing skips ahead.',
  },
]

export function Practice() {
  const progress = useLessonProgress()
  const shipLog = useShipLog()
  const shipped = new Set(shipLog.map((r) => r.lessonId))
  const owed = LESSON_SEQUENCE.filter((l) => progress.has(l.id) && !shipped.has(l.id))

  return (
    <div className="animate-fade-up">
      <h1 className="text-[1.6rem] font-bold tracking-tight">Practice</h1>
      <p className="reading mt-2 max-w-[34rem] text-ink-soft">
        Reading is not the point. This is where the reading turns into work.
      </p>

      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl bg-surface">
        {TOOLS.map((tool) => (
          <li key={tool.to}>
            <Link to={tool.to} className="block px-5 py-4 transition-colors hover:bg-paper">
              <span className="block font-semibold">{tool.title}</span>
              <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{tool.sub}</span>
            </Link>
          </li>
        ))}
      </ul>

      {owed.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-sm text-ink-faint">Assignments waiting ({owed.length})</h2>
          <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl bg-surface">
            {owed.slice(0, 5).map((lesson) => (
              <li key={lesson.id}>
                <Link
                  to={`/lesson/${lesson.id}`}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-paper"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-snug">{lesson.title}</span>
                    <span className="mt-0.5 block text-sm text-ink-soft">
                      {lesson.assignment.deliverable}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-ink-faint">
                    {lesson.assignment.timeboxMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {shipLog.length > 0 ? (
        <Link
          to="/ship-log"
          className="mt-8 inline-block text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <span className="font-semibold text-accent-strong dark:text-accent">
            {shipLog.length}
          </span>{' '}
          shipped so far &rarr;
        </Link>
      ) : null}
    </div>
  )
}
