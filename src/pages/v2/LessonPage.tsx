import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {
  LESSON_BY_ID,
  MODULE_BY_ID,
  TRACK_BY_ID,
  checkItemId,
  lessonsInModule,
  nextLesson,
} from '../../curriculum'
import type { Lesson } from '../../curriculum'
import { DIAGRAMS } from '../../diagrams/registry'
import { markChecksDone, shipAssignment, touchLesson, unshipLesson } from '../../data/db'
import { useShipLog } from '../../data/hooks'
import { useAppState } from '../../lib/state'
import { TermTooltip } from '../../components/TermTooltip'

/**
 * A lesson is walked, not scrolled.
 *
 * The whole lesson used to arrive on one page: prose, diagram, gloss, two
 * examples, three mistakes, the AI block, three questions and an assignment,
 * all visible at once. That is nine things asking for attention
 * simultaneously. Here each step is its own screen, and the only decision on
 * screen is whether to continue.
 */
type Step =
  | { kind: 'idea' }
  | { kind: 'diagram'; index: number }
  | { kind: 'examples' }
  | { kind: 'mistakes' }
  | { kind: 'ai' }
  | { kind: 'check'; index: number }
  | { kind: 'assignment' }

function buildSteps(lesson: Lesson): Step[] {
  return [
    { kind: 'idea' },
    ...lesson.visuals.map((_, index) => ({ kind: 'diagram' as const, index })),
    { kind: 'examples' },
    { kind: 'mistakes' },
    { kind: 'ai' },
    ...lesson.checks.map((_, index) => ({ kind: 'check' as const, index })),
    { kind: 'assignment' },
  ]
}

/** What this step is, in two words, so the rail says more than a number. */
function stepName(step: Step): string {
  switch (step.kind) {
    case 'idea':
      return 'Idea'
    case 'diagram':
      return 'Khud try karo'
    case 'examples':
      return 'Examples'
    case 'mistakes':
      return 'Galtiyan'
    case 'ai':
      return 'AI me'
    case 'check':
      return `Sawaal ${step.index + 1}`
    case 'assignment':
      return 'Tumhara kaam'
  }
}

const MARKDOWN_BASE = {
  p: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul>{children}</ul>,
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-ink-faint">{children}</p>
}

function Primary({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-10 inline-flex items-center rounded-xl bg-accent-strong px-6 py-3.5 text-base font-semibold text-white transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong disabled:opacity-40"
    >
      {children}
    </button>
  )
}

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? LESSON_BY_ID.get(lessonId) : undefined
  const navigate = useNavigate()
  const { rateCard } = useAppState()
  const shipLog = useShipLog()

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [criteria, setCriteria] = useState<boolean[]>([false, false, false])

  const steps = useMemo(() => (lesson ? buildSteps(lesson) : []), [lesson])

  useEffect(() => {
    setIndex(0)
    setAnswers({})
    setCriteria([false, false, false])
    if (lesson) void touchLesson(lesson.id)
  }, [lesson])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [index])

  if (!lesson) {
    return (
      <div className="pt-10 text-center">
        <p className="reading text-ink-soft">Ye lesson maujood nahi hai.</p>
        <Link
          to="/tracks"
          className="mt-4 inline-block font-medium text-accent-strong dark:text-accent"
        >
          Tracks dekho
        </Link>
      </div>
    )
  }

  const step = steps[index]
  const isLast = index === steps.length - 1
  const track = TRACK_BY_ID.get(lesson.trackId)
  const shipped = shipLog.find((r) => r.lessonId === lesson.id)
  const upNext = nextLesson(lesson.id)
  const moduleLessons = lessonsInModule(lesson.moduleId)
  const lessonPosition = moduleLessons.findIndex((l) => l.id === lesson.id) + 1
  const moduleSize = moduleLessons.length

  function advance() {
    if (isLast) {
      navigate(upNext ? `/lesson/${upNext.id}` : '/')
      return
    }
    setIndex((i) => i + 1)
  }

  function answerCheck(questionIndex: number) {
    return (choice: number) => {
      const question = lesson!.checks[questionIndex]
      if (answers[question.id] !== undefined) return
      setAnswers((prev) => ({ ...prev, [question.id]: choice }))
      rateCard(checkItemId(lesson!.id, question.id), choice === question.answerIndex ? 2 : 0)
      if (Object.keys(answers).length + 1 === lesson!.checks.length) {
        void markChecksDone(lesson!.id)
      }
    }
  }

  return (
    <article className="animate-fade-up">
      {/*
       * Two levels of "where am I": which lesson of the module, and which
       * step of this lesson. A bare 6/9 told you neither.
       */}
      <div>
        <Link
          to={track ? `/track/${track.id}` : '/tracks'}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent-strong dark:hover:text-accent"
        >
          &larr; {track?.title ?? 'Tracks'}
        </Link>

        <p className="mt-3 text-sm text-ink-faint">
          {MODULE_BY_ID.get(lesson.moduleId)?.title} &middot; Lesson {lessonPosition} /{' '}
          {moduleSize}
        </p>

        <div className="mt-2 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <div
              className="bar-fill h-full rounded-full bg-accent-strong"
              style={{ width: `${((index + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-medium text-ink-soft">
            Step {index + 1} / {steps.length}
          </span>
        </div>
        <p className="mt-1.5 text-sm font-semibold text-accent-strong dark:text-accent">
          {stepName(step)}
        </p>
      </div>

      <div key={index} className="animate-step pt-9">
        {/* ── the idea ── */}
        {step.kind === 'idea' ? (
          <>
            <StepLabel>{lesson.estMinutes} min padhne me</StepLabel>
            <h1 className="mt-2 text-[1.6rem] font-bold leading-[1.25] tracking-tight sm:text-[1.9rem]">
              {lesson.title}
            </h1>
            <p className="mt-2 text-[1.0625rem] text-ink-soft">{lesson.oneLine}</p>

            {/*
             * The definition is stated once, in English, because those are the
             * words used on a set and inside a prompt. Everything after it is
             * Hinglish.
             */}
            <div className="mt-7 max-w-[34rem] rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Definition &middot; English
              </p>
              <p className="mt-2 text-[1.0625rem] leading-relaxed">{lesson.definitionEn}</p>
            </div>

            <div className="reading mt-7 max-w-[34rem]">
              <ReactMarkdown
                components={{
                  ...MARKDOWN_BASE,
                  strong: ({ children }) => <TermTooltip text={String(children)} />,
                }}
              >
                {lesson.body}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* ── one diagram, alone ── */}
        {step.kind === 'diagram'
          ? (() => {
              const visual = lesson.visuals[step.index]
              const Diagram = DIAGRAMS[visual.component]
              return (
                <>
                  <h2 className="text-[1.35rem] font-bold leading-tight tracking-tight">
                    {visual.interactive ? 'Control ghumao aur dekho' : 'Diagram dekho'}
                  </h2>
                  <p className="reading mt-2 max-w-[34rem] text-ink-soft">{visual.caption}</p>
                  <div className="mt-6 max-w-[34rem]">{Diagram ? <Diagram /> : null}</div>
                </>
              )
            })()
          : null}

        {/* ── examples ── */}
        {step.kind === 'examples' ? (
          <>
            <h2 className="text-[1.35rem] font-bold leading-tight tracking-tight">Do examples</h2>
            <div className="mt-6 max-w-[34rem] space-y-7">
              {lesson.filmExamples.map((ex, i) => (
                <div key={i}>
                  <p className="font-semibold">
                    {ex.kind === 'work' ? (
                      <>
                        {ex.title} <span className="font-normal text-ink-faint">({ex.year})</span>
                      </>
                    ) : (
                      <span className="text-ink-faint">Ek shot jo tumne sau baar dekha hai</span>
                    )}
                  </p>
                  <p className="reading mt-1.5">{ex.shot}</p>
                  <p className="reading mt-2 text-ink-soft">{ex.why}</p>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* ── mistakes ── */}
        {step.kind === 'mistakes' ? (
          <>
            <h2 className="text-[1.35rem] font-bold leading-tight tracking-tight">
              Teen aam galtiyan
            </h2>
            <ol className="mt-6 max-w-[34rem] space-y-6">
              {lesson.commonMistakes.map((m, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-lg font-bold text-ink-faint">{i + 1}</span>
                  <span className="reading">{m}</span>
                </li>
              ))}
            </ol>
          </>
        ) : null}

        {/* ── AI translation ── */}
        {step.kind === 'ai' ? (
          <>
            <h2 className="text-[1.35rem] font-bold leading-tight tracking-tight">
              Wahi baat, jab tumhara camera ek model ho
            </h2>
            <div className="reading mt-6 max-w-[34rem]">
              <ReactMarkdown
                components={{
                  ...MARKDOWN_BASE,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                }}
              >
                {lesson.aiTranslation}
              </ReactMarkdown>
            </div>
          </>
        ) : null}

        {/* ── one question at a time ── */}
        {step.kind === 'check'
          ? (() => {
              const q = lesson.checks[step.index]
              const choice = answers[q.id]
              const done = choice !== undefined
              const answer = answerCheck(step.index)
              return (
                <>
                  <h2 className="max-w-[34rem] text-[1.35rem] font-semibold leading-[1.35]">
                    {q.prompt}
                  </h2>
                  <div className="mt-7 max-w-[34rem] space-y-2.5">
                    {q.options.map((opt, oi) => {
                      const isAnswer = oi === q.answerIndex
                      const isPick = oi === choice
                      let tone = 'border-line bg-surface hover:border-accent'
                      if (done && isAnswer)
                        tone = 'border-accent-strong bg-accent-soft/60 dark:bg-surface'
                      else if (done && isPick)
                        tone = 'border-line bg-surface opacity-70 line-through'
                      else if (done) tone = 'border-line bg-surface opacity-45'
                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={done}
                          onClick={() => answer(oi)}
                          className={`block w-full rounded-xl border px-4 py-3.5 text-left text-[1.0625rem] leading-snug transition-colors disabled:cursor-default ${tone}`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                  {done ? (
                    <p className="reading mt-6 max-w-[34rem] text-ink-soft">{q.why}</p>
                  ) : null}
                </>
              )
            })()
          : null}

        {/* ── the assignment ── */}
        {step.kind === 'assignment' ? (
          <>
            <StepLabel>
              {lesson.assignment.timeboxMinutes} min &middot;{' '}
              {lesson.assignment.usesTools.join(', ')}
            </StepLabel>
            <h2 className="mt-2 text-[1.35rem] font-bold leading-tight tracking-tight">
              Tumhara kaam
            </h2>
            <p className="reading mt-5 max-w-[34rem]">{lesson.assignment.brief}</p>
            <p className="reading mt-3 max-w-[34rem] text-ink-soft">
              <span className="font-semibold text-ink">Dena kya hai: </span>
              {lesson.assignment.deliverable}
            </p>

            {shipped ? (
              <div className="mt-8 max-w-[34rem] rounded-2xl bg-surface p-5">
                <p className="font-semibold">
                  {new Date(shipped.shippedAt).toLocaleDateString()} ko ship kiya
                </p>
                <button
                  type="button"
                  onClick={() => void unshipLesson(lesson.id)}
                  className="mt-2 text-sm text-ink-faint hover:text-ink"
                >
                  Ise wapas un-ship karo
                </button>
              </div>
            ) : (
              <div className="mt-8 max-w-[34rem]">
                <p className="text-sm text-ink-faint">Ye tabhi tick karo jab sach me ho.</p>
                <ul className="mt-3 space-y-3.5">
                  {lesson.assignment.successCriteria.map((c, i) => (
                    <li key={i}>
                      <label className="flex cursor-pointer items-start gap-3 leading-snug">
                        <input
                          type="checkbox"
                          checked={criteria[i]}
                          onChange={(e) =>
                            setCriteria((prev) =>
                              prev.map((v, j) => (j === i ? e.target.checked : v)),
                            )
                          }
                          className="mt-1 h-4.5 w-4.5 shrink-0 accent-[var(--color-accent-strong)]"
                        />
                        <span>{c}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={!criteria.every(Boolean)}
                  onClick={() =>
                    void shipAssignment({
                      lessonId: lesson.id,
                      lessonTitle: lesson.title,
                      deliverable: lesson.assignment.deliverable,
                      criteriaMet: criteria,
                    })
                  }
                  className="mt-6 rounded-xl border border-accent-strong px-5 py-2.5 font-semibold text-accent-strong transition-colors hover:bg-accent-soft/60 disabled:opacity-40 dark:text-accent"
                >
                  Shipped mark karo
                </button>
              </div>
            )}
          </>
        ) : null}

        {/* One decision per screen. */}
        <Primary
          onClick={advance}
          disabled={step.kind === 'check' && answers[lesson.checks[step.index].id] === undefined}
        >
          {isLast ? (upNext ? 'Khatam · agla lesson kholo' : 'Lesson khatam') : 'Aage badho'}
        </Primary>

        {index > 0 ? (
          <div>
            <button
              type="button"
              onClick={() => setIndex((i) => i - 1)}
              className="mt-5 text-sm text-ink-faint transition-colors hover:text-ink"
            >
              Peeche
            </button>
          </div>
        ) : null}
      </div>
    </article>
  )
}
