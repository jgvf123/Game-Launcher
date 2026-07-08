import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LAB_LESSONS, LAB_LESSON_BY_ID, LAB_MODULES, LAB_MODULE_BY_ID } from '../../lab/lessons'
import { MODEL_CARDS } from '../../lab/models'
import type { LabModuleId } from '../../lab/types'
import { dueLessonIds, useLabState } from '../../lab/state'
import { isDue } from '../../lib/srs'
import { AnnotatedPrompt, CopyButton } from './components'
import { ButtonLink } from '../../components/ui'

export function LabLearn() {
  const { labReviews, readLessons } = useLabState()
  const [moduleFilter, setModuleFilter] = useState<LabModuleId | null>(null)
  const [query, setQuery] = useState('')
  const due = dueLessonIds(labReviews)

  const lessons = useMemo(() => {
    const q = query.trim().toLowerCase()
    return LAB_LESSONS.filter((l) => {
      if (moduleFilter && l.module !== moduleFilter) return false
      if (q && !l.title.toLowerCase().includes(q) && !l.summary.toLowerCase().includes(q))
        return false
      return true
    })
  }, [moduleFilter, query])

  const grouped = LAB_MODULES.map((m) => ({
    module: m,
    lessons: lessons.filter((l) => l.module === m.id),
  })).filter((g) => g.lessons.length > 0 || g.module.id === 'recipes-still')

  const firstTime = readLessons.length === 0

  return (
    <div className="space-y-6">
      {firstTime && (
        <div className="rounded-2xl border border-accent-strong/40 bg-accent-soft p-4 text-sm text-zinc-700 dark:border-accent/40 dark:bg-zinc-900 dark:text-zinc-200">
          <strong>New here?</strong> Start with <strong>Foundations</strong> (4 short lessons),
          then open the <strong>Builder</strong> and assemble your first prompt. Everything you
          learn becomes a token you can actually type.
        </div>
      )}
      {due.length > 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
          <strong className="text-accent-strong dark:text-accent">{due.length}</strong> concept
          {due.length === 1 ? ' is' : 's are'} due for review — take a quiz to refresh them.{' '}
          <Link to="/lab/quiz" className="font-medium text-accent-strong hover:underline dark:text-accent">
            Go to Quiz →
          </Link>
        </div>
      )}

      <div className="space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lessons…"
          aria-label="Search lessons"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-base placeholder:text-zinc-400 focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setModuleFilter(null)}
            aria-pressed={moduleFilter === null}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              moduleFilter === null
                ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            All modules
          </button>
          {LAB_MODULES.filter((m) => m.id !== 'recipes-still').map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setModuleFilter(moduleFilter === m.id ? null : m.id)}
              aria-pressed={moduleFilter === m.id}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                moduleFilter === m.id
                  ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>
      </div>

      {grouped.map(({ module: m, lessons: moduleLessons }) => (
        <section key={m.id}>
          <div className="mb-2 flex items-baseline gap-3">
            <h2 className="text-lg font-semibold">
              {m.order}. {m.title}
            </h2>
            <span className="text-sm text-zinc-400">{m.tagline}</span>
          </div>
          {m.id === 'recipes-still' ? (
            <Link
              to="/lab/recipes"
              className="block rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-accent-strong/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent/50"
            >
              <span className="font-semibold text-accent-strong dark:text-accent">
                Open the Recipe Library →
              </span>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                40+ annotated still prompts and the video recipe set live in their own tab.
              </p>
            </Link>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {moduleLessons.map((l) => {
                const read = readLessons.includes(l.id)
                const lessonDue = isDue(labReviews[l.id])
                return (
                  <Link
                    key={l.id}
                    to={`/lab/learn/${l.id}`}
                    className="group rounded-xl border border-zinc-200 bg-white p-4 transition-colors duration-150 hover:border-accent-strong/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold group-hover:text-accent-strong dark:group-hover:text-accent">
                        {l.title}
                      </h3>
                      <span className="flex shrink-0 gap-1.5">
                        {lessonDue && (
                          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-strong dark:bg-zinc-800 dark:text-accent">
                            due
                          </span>
                        )}
                        {read && (
                          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                            read
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{l.summary}</p>
                  </Link>
                )
              })}
            </div>
          )}
          {m.id === 'landscape' && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {MODEL_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold">{card.name}</h3>
                    <span className="text-xs text-zinc-400">
                      {card.costTier} · upd {card.lastUpdated}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{card.lane}</p>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <strong className="text-zinc-600 dark:text-zinc-300">Dialect:</strong>{' '}
                    {card.dialect}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    <strong className="text-zinc-600 dark:text-zinc-300">Output:</strong>{' '}
                    {card.clipLengthRes}
                  </p>
                  <p className="mt-2 text-sm italic text-zinc-500 dark:text-zinc-400">{card.note}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

export function LabLessonDetail() {
  const { lessonId } = useParams()
  const lesson = lessonId ? LAB_LESSON_BY_ID.get(lessonId) : undefined
  const { markLessonRead } = useLabState()
  useEffect(() => {
    if (lesson) markLessonRead(lesson.id)
  }, [lesson, markLessonRead])

  if (!lesson) {
    return (
      <div className="py-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">That lesson doesn’t exist.</p>
        <ButtonLink to="/lab" className="mt-4">
          Back to Learn
        </ButtonLink>
      </div>
    )
  }

  const module = LAB_MODULE_BY_ID.get(lesson.module)!
  const related = lesson.relatedIds
    .map((id) => LAB_LESSON_BY_ID.get(id))
    .filter((l) => l !== undefined)

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link
        to="/lab"
        className="inline-flex items-center gap-1.5 text-base font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12.7 15.3 7.4 10l5.3-5.3 1.2 1.2L9.8 10l4.1 4.1-1.2 1.2z" />
        </svg>
        {module.title}
      </Link>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-bold tracking-tight">{lesson.title}</h1>
        <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-300">{lesson.summary}</p>
        <div className="mt-4 space-y-3">
          {lesson.explanation.map((p, i) => (
            <p key={i} className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {p}
            </p>
          ))}
        </div>

        {lesson.examples.map((ex, i) => (
          <div key={i} className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                {ex.label ?? 'Example'}
              </h2>
              <CopyButton text={ex.prompt} small />
            </div>
            <AnnotatedPrompt prompt={ex.prompt} annotations={ex.annotations} />
          </div>
        ))}

        {related.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Related lessons
            </h2>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/lab/learn/${r.id}`}
                  className="rounded-full bg-zinc-200/70 px-3 py-1 text-sm font-medium text-zinc-700 hover:text-accent-strong dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-accent"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
