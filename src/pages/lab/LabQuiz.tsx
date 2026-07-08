import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LAB_QUIZ_ITEMS } from '../../lab/quizItems'
import { LAB_LESSON_BY_ID, LAB_MODULES } from '../../lab/lessons'
import type { LabModuleId, LabQuizItem } from '../../lab/types'
import { dueLessonIds, useLabState } from '../../lab/state'
import { Button } from '../../components/ui'

const SESSION_LENGTH = 10

const TYPE_LABEL: Record<LabQuizItem['type'], string> = {
  'spot-weak': 'Spot the weak prompt',
  'fix-prompt': 'Fix this prompt',
  'which-model': 'Which model for this job',
  'order-slots': 'Order the slots',
  'identify-technique': 'Identify the technique',
  scenario: 'Scenario',
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function LabQuiz() {
  const { labReviews, rateLesson, recordLabQuiz, labQuizzes } = useLabState()
  const [scope, setScope] = useState<LabModuleId | 'all' | null>(null)
  const [items, setItems] = useState<LabQuizItem[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  const start = (s: LabModuleId | 'all') => {
    const pool = LAB_QUIZ_ITEMS.filter((q) => s === 'all' || q.module === s)
    const due = new Set(dueLessonIds(labReviews))
    // Due concepts first, then the rest, shuffled within groups.
    const ordered = [
      ...shuffle(pool.filter((q) => due.has(q.lessonId))),
      ...shuffle(pool.filter((q) => !due.has(q.lessonId))),
    ]
    setScope(s)
    setItems(
      ordered.slice(0, SESSION_LENGTH).map((q) => ({ ...q, options: shuffle(q.options) })),
    )
    setIndex(0)
    setPicked(null)
    setScore(0)
    setMissed([])
    setFinished(false)
  }

  const question = items[index]

  const choose = (i: number) => {
    if (picked !== null || !question) return
    setPicked(i)
    const correct = question.options[i].correct === true
    // SM-2 on the underlying concept: correct = "knew it", wrong = "didn't".
    rateLesson(question.lessonId, correct ? 1 : 0)
    if (correct) setScore((s) => s + 1)
    else setMissed((m) => (m.includes(question.lessonId) ? m : [...m, question.lessonId]))
  }

  const next = () => {
    if (index + 1 < items.length) {
      setIndex((i) => i + 1)
      setPicked(null)
    } else if (scope) {
      recordLabQuiz({ scope, score, total: items.length, missedLessonIds: missed })
      setFinished(true)
    }
  }

  const modulesWithItems = useMemo(
    () => LAB_MODULES.filter((m) => LAB_QUIZ_ITEMS.some((q) => q.module === m.id)),
    [],
  )

  // ── scope picker ──
  if (!scope) {
    const due = dueLessonIds(labReviews)
    const last = labQuizzes[labQuizzes.length - 1]
    return (
      <div className="space-y-5">
        <p className="text-zinc-500 dark:text-zinc-400">
          Six question types, immediate feedback, and missed concepts come back sooner (SM-2).
          {due.length > 0 && (
            <strong className="text-accent-strong dark:text-accent">
              {' '}
              {due.length} concept{due.length === 1 ? '' : 's'} due — they’ll appear first.
            </strong>
          )}
        </p>
        {last && (
          <p className="text-sm text-zinc-400">
            Last quiz: {last.score}/{last.total} ({new Date(last.date).toLocaleDateString()})
          </p>
        )}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold">Mixed quiz</h2>
          <Button variant="primary" className="mt-3" onClick={() => start('all')}>
            Start mixed quiz
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {modulesWithItems.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => start(m.id)}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-left transition-colors hover:border-accent-strong/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent/50"
            >
              <span className="font-semibold">{m.title}</span>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                {LAB_QUIZ_ITEMS.filter((q) => q.module === m.id).length} questions
              </p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ── results ──
  if (finished) {
    const pct = items.length ? Math.round((score / items.length) * 100) : 0
    const missedLessons = missed
      .map((id) => LAB_LESSON_BY_ID.get(id))
      .filter((l) => l !== undefined)
    return (
      <div className="mx-auto max-w-xl space-y-5 text-center">
        <h2 className="text-2xl font-bold">Quiz complete</h2>
        <p className="text-5xl font-bold text-accent-strong">{pct}%</p>
        <p className="text-zinc-500 dark:text-zinc-400">
          {score} of {items.length} — missed concepts resurface sooner in future quizzes.
        </p>
        {missedLessons.length > 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-left dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold">Worth restudying</h3>
            <ul className="mt-2 space-y-1.5">
              {missedLessons.map((l) => (
                <li key={l.id}>
                  <Link
                    to={`/lab/learn/${l.id}`}
                    className="text-accent-strong hover:underline dark:text-accent"
                  >
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-center gap-3">
          <Button onClick={() => setScope(null)}>Change scope</Button>
          <Button variant="primary" onClick={() => start(scope)}>
            Another round
          </Button>
        </div>
      </div>
    )
  }

  if (!question) return null

  const answered = picked !== null
  const correctPicked = picked !== null && question.options[picked].correct === true
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>
          {index + 1} of {items.length} · {TYPE_LABEL[question.type]}
        </span>
        <span>
          Score {score}/{index + (answered ? 1 : 0)}
        </span>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-lg font-medium leading-relaxed">{question.question}</p>
        <div className="mt-4 grid gap-2.5">
          {question.options.map((opt, i) => {
            let style =
              'border-zinc-300 hover:border-accent-strong/60 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/60'
            if (answered) {
              if (opt.correct)
                style =
                  'border-green-600 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950/40 dark:text-green-200'
              else if (picked === i)
                style =
                  'border-red-500 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-950/40 dark:text-red-200'
              else style = 'border-zinc-200 opacity-60 dark:border-zinc-800'
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => choose(i)}
                disabled={answered}
                className={`rounded-lg border px-4 py-3 text-left text-sm leading-relaxed transition-colors duration-150 disabled:cursor-default ${style} ${
                  question.type === 'spot-weak' ? 'font-mono' : 'font-medium'
                }`}
              >
                {opt.text}
              </button>
            )
          })}
        </div>
        {answered && (
          <div
            className={`animate-fade-up mt-4 rounded-lg p-3 text-sm ${
              correctPicked
                ? 'bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-200'
                : 'bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200'
            }`}
          >
            <strong>{correctPicked ? 'Correct.' : 'Not quite.'}</strong> {question.reason}{' '}
            <Link
              to={`/lab/learn/${question.lessonId}`}
              className="font-medium underline underline-offset-2"
            >
              Lesson →
            </Link>
          </div>
        )}
      </div>

      <Button variant="primary" className="w-full" onClick={next} disabled={!answered}>
        {index + 1 < items.length ? 'Next question' : 'Finish quiz'}
      </Button>
    </div>
  )
}
