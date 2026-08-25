import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {
  LESSON_BY_ID,
  MODULE_BY_ID,
  TRACK_BY_ID,
  checkItemId,
  nextLesson,
  prevLesson,
} from '../../curriculum'
import type { Lesson } from '../../curriculum'
import { DIAGRAMS } from '../../diagrams/registry'
import { markChecksDone, shipAssignment, touchLesson, unshipLesson } from '../../data/db'
import { useShipLog } from '../../data/hooks'
import { useAppState } from '../../lib/state'
import { useLanguage } from '../../lib/prefs'
import { Button, EmptyState } from '../../components/ui'
import { TermTooltip } from '../../components/TermTooltip'

function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <h2 className="mb-3 mt-8 text-lg font-bold tracking-tight">
      {kicker ? (
        <span className="mr-2 text-sm font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          {kicker}
        </span>
      ) : null}
      {children}
    </h2>
  )
}

// ─────────────────────────────── check questions ───────────────────────────────

function Checks({ lesson }: { lesson: Lesson }) {
  const { rateCard } = useAppState()
  const [picked, setPicked] = useState<Record<string, number>>({})

  function answer(questionId: string, index: number, correctIndex: number) {
    if (picked[questionId] !== undefined) return
    setPicked((p) => ({ ...p, [questionId]: index }))
    // First-time correct seeds the card as well known; a miss schedules it soon.
    rateCard(checkItemId(lesson.id, questionId), index === correctIndex ? 2 : 0)
  }

  const answered = lesson.checks.every((q) => picked[q.id] !== undefined)
  useEffect(() => {
    if (answered) void markChecksDone(lesson.id)
  }, [answered, lesson.id])

  return (
    <div className="space-y-4">
      {lesson.checks.map((q, qi) => {
        const choice = picked[q.id]
        const done = choice !== undefined
        return (
          <div
            key={q.id}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="font-medium">
              <span className="mr-1.5 text-zinc-400 dark:text-zinc-500">{qi + 1}.</span>
              {q.prompt}
            </p>
            <div className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const isAnswer = oi === q.answerIndex
                const isPick = oi === choice
                let tone =
                  'border-zinc-200 hover:border-accent hover:bg-accent-soft/40 dark:border-zinc-700 dark:hover:bg-zinc-800'
                if (done && isAnswer) tone = 'border-green-500 bg-green-50 dark:bg-green-950/40'
                else if (done && isPick) tone = 'border-red-400 bg-red-50 dark:bg-red-950/40'
                else if (done) tone = 'border-zinc-200 opacity-60 dark:border-zinc-700'
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={done}
                    onClick={() => answer(q.id, oi, q.answerIndex)}
                    className={`block w-full rounded-lg border px-3 py-2 text-left text-base transition-colors disabled:cursor-default ${tone}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            {done ? (
              <p className="mt-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm leading-snug text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {q.why}
              </p>
            ) : null}
          </div>
        )
      })}
      {answered ? (
        <p className="text-sm font-medium text-accent-strong dark:text-accent">
          All three answered — these are now in your review queue and will come back on schedule.
        </p>
      ) : null}
    </div>
  )
}

// ─────────────────────────────── the assignment ───────────────────────────────

function AssignmentBlock({ lesson }: { lesson: Lesson }) {
  const log = useShipLog()
  const existing = log.find((r) => r.lessonId === lesson.id)
  const [criteria, setCriteria] = useState<boolean[]>([false, false, false])
  const a = lesson.assignment

  const allTicked = criteria.every(Boolean)

  async function ship() {
    await shipAssignment({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      deliverable: a.deliverable,
      criteriaMet: criteria,
    })
  }

  return (
    <div className="rounded-xl border-2 border-accent-strong/50 bg-accent-soft/40 p-4 dark:border-accent/40 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent-strong px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
          Assignment
        </span>
        <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
          {a.timeboxMinutes} minutes
        </span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {a.usesTools.join(' · ')}
        </span>
      </div>

      <p className="mt-3 text-base leading-relaxed">{a.brief}</p>
      <p className="mt-2 text-base">
        <span className="font-semibold">Deliverable:</span> {a.deliverable}
      </p>

      {existing ? (
        <div className="mt-4 rounded-lg border border-green-500/60 bg-green-50 px-3 py-3 dark:bg-green-950/40">
          <p className="font-semibold text-green-800 dark:text-green-300">
            Shipped on {new Date(existing.shippedAt).toLocaleDateString()}
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            It is in your Ship Log. That is the only page that counts.
          </p>
          <Button
            variant="ghost"
            className="mt-2 px-2 py-1 text-sm"
            onClick={() => void unshipLesson(lesson.id)}
          >
            Un-ship this
          </Button>
        </div>
      ) : (
        <>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Grade yourself honestly
          </p>
          <ul className="mt-2 space-y-2">
            {a.successCriteria.map((c, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-2.5 text-base leading-snug">
                  <input
                    type="checkbox"
                    checked={criteria[i]}
                    onChange={(e) =>
                      setCriteria((prev) => prev.map((v, j) => (j === i ? e.target.checked : v)))
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent-strong)]"
                  />
                  <span>{c}</span>
                </label>
              </li>
            ))}
          </ul>
          <Button
            variant="primary"
            disabled={!allTicked}
            onClick={() => void ship()}
            className="mt-4"
          >
            Mark as shipped
          </Button>
          {!allTicked ? (
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              All three criteria have to be true. Ticking them when they are not only fools you.
            </p>
          ) : null}
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────── page ───────────────────────────────────

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? LESSON_BY_ID.get(lessonId) : undefined
  const lang = useLanguage()

  useEffect(() => {
    if (lesson) void touchLesson(lesson.id)
  }, [lesson])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [lessonId])

  if (!lesson) {
    return (
      <EmptyState title="No such lesson">
        That lesson id does not exist yet.{' '}
        <Link to="/tracks" className="underline">
          Browse the tracks
        </Link>
        .
      </EmptyState>
    )
  }

  const track = TRACK_BY_ID.get(lesson.trackId)
  const module = MODULE_BY_ID.get(lesson.moduleId)
  const prev = prevLesson(lesson.id)
  const next = nextLesson(lesson.id)

  return (
    <article className="mx-auto max-w-2xl">
      {/* 1 · title + promise + minutes */}
      <nav className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Link to="/tracks" className="hover:underline">
          Tracks
        </Link>
        {track ? (
          <>
            {' / '}
            <Link to={`/track/${track.id}`} className="hover:underline">
              {track.title}
            </Link>
          </>
        ) : null}
        {module ? <> / {module.title}</> : null}
      </nav>

      <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight">{lesson.title}</h1>
      <p className="mt-1.5 text-base text-zinc-600 dark:text-zinc-300">{lesson.oneLine}</p>
      <p className="mt-1 text-sm font-medium text-zinc-400 dark:text-zinc-500">
        {lesson.estMinutes} min read &middot; then {lesson.assignment.timeboxMinutes} min of work
      </p>

      {/* 2 · the concept */}
      <div className="prose-frame mt-6 space-y-4 text-base leading-relaxed">
        <ReactMarkdown
          components={{
            strong: ({ children }) => <TermTooltip text={String(children)} />,
            p: ({ children }) => <p className="leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="ml-5 list-disc space-y-1.5">{children}</ul>,
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            em: ({ children }) => <em className="italic">{children}</em>,
          }}
        >
          {lesson.body}
        </ReactMarkdown>
      </div>

      {/* 3 · the diagram */}
      {lesson.visuals.map((v, i) => {
        const Diagram = DIAGRAMS[v.component]
        if (!Diagram) return null
        return (
          <figure key={i} className="mt-7">
            <Diagram />
            <figcaption className="mt-2 text-sm leading-snug text-zinc-500 dark:text-zinc-400">
              {v.interactive ? (
                <span className="mr-1.5 font-semibold text-accent-strong dark:text-accent">
                  Interactive —
                </span>
              ) : null}
              {v.caption}
            </figcaption>
          </figure>
        )
      })}

      {/* 4 · Hinglish gloss — hidden entirely when the learner picks English only */}
      {lang === 'both' ? (
      <details className="mt-7 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900" open>
        <summary className="cursor-pointer select-none px-4 py-3 font-semibold">
          Yehi baat, simple Hinglish me
        </summary>
        <div className="whitespace-pre-line border-t border-zinc-200 px-4 py-3 text-base leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
          {lesson.hinglishGloss}
        </div>
      </details>
      ) : null}

      {/* 5 · two real examples */}
      <SectionTitle kicker="Seen in">Two examples</SectionTitle>
      <div className="space-y-3">
        {lesson.filmExamples.map((ex, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="font-semibold">
              {ex.kind === 'work' ? (
                <>
                  {ex.title}{' '}
                  <span className="font-normal text-zinc-500 dark:text-zinc-400">({ex.year})</span>
                </>
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400">
                  A standard shot you have seen a hundred times
                </span>
              )}
            </p>
            <p className="mt-1.5 text-base leading-relaxed">{ex.shot}</p>
            <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              <span className="font-semibold">Why it works: </span>
              {ex.why}
            </p>
          </div>
        ))}
      </div>

      {/* 6 · common mistakes */}
      <SectionTitle kicker="Avoid">Common mistakes</SectionTitle>
      <ol className="space-y-2">
        {lesson.commonMistakes.map((m, i) => (
          <li key={i} className="flex gap-3 rounded-lg bg-zinc-100 px-3 py-2.5 dark:bg-zinc-800/70">
            <span className="font-bold text-red-500">{i + 1}</span>
            <span className="text-base leading-relaxed">{m}</span>
          </li>
        ))}
      </ol>

      {/* 7 · AI translation — visually distinct on purpose */}
      <div className="mt-8 rounded-xl border-2 border-dashed border-accent bg-accent-soft/30 p-4 dark:bg-zinc-900">
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span aria-hidden>⚡</span> AI Translation
        </h2>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
          The same concept, executed when your camera is a diffusion model.
        </p>
        <div className="prose-frame mt-3 space-y-3 text-base leading-relaxed">
          <ReactMarkdown
            components={{
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              p: ({ children }) => <p className="leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="ml-5 list-disc space-y-1.5">{children}</ul>,
            }}
          >
            {lesson.aiTranslation}
          </ReactMarkdown>
        </div>
      </div>

      {/* 8 · checks */}
      <SectionTitle kicker="Recall">Three checks</SectionTitle>
      <Checks lesson={lesson} />

      {/* 9 · assignment */}
      <SectionTitle kicker="Make">The assignment</SectionTitle>
      <AssignmentBlock lesson={lesson} />

      <nav className="mt-10 flex justify-between gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
        {prev ? (
          <Link
            to={`/lesson/${prev.id}`}
            className="max-w-[45%] text-sm font-medium text-zinc-500 hover:underline dark:text-zinc-400"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/lesson/${next.id}`}
            className="max-w-[45%] text-right text-sm font-medium text-accent-strong hover:underline dark:text-accent"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
