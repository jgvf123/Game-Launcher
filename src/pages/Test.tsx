import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_MOODS, CARD_BY_ID, MODULES, MODULE_BY_ID } from '../content'
import type { ModuleId, Mood } from '../content'
import { Illustration } from '../components/Illustration'
import { Button, MoodChip } from '../components/ui'
import { buildQuiz, scopedCards, type QuizQuestion } from '../lib/quiz'
import { useAppState, type QuizScope } from '../lib/state'

const QUESTION_TYPE_LABEL: Record<QuizQuestion['type'], string> = {
  'image-to-name': 'Name this technique',
  'name-to-definition': 'Pick the definition',
  scenario: 'Choose the right tool',
  'fill-blank': 'Fill in the blank',
}

function scopeLabel(scope: QuizScope): string {
  if (scope.kind === 'all') return 'Full test'
  if (scope.kind === 'module') return MODULE_BY_ID.get(scope.moduleId)?.title ?? scope.moduleId
  return `Mood: ${scope.mood}`
}

export function Test() {
  const { recordQuiz } = useAppState()
  const [scope, setScope] = useState<QuizScope | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [missed, setMissed] = useState<string[]>([])
  const [finished, setFinished] = useState(false)

  const start = (s: QuizScope) => {
    setScope(s)
    setQuestions(buildQuiz(s))
    setIndex(0)
    setPicked(null)
    setScore(0)
    setMissed([])
    setFinished(false)
  }

  const question = questions[index]

  const choose = (choiceIndex: number) => {
    if (picked !== null || !question) return
    setPicked(choiceIndex)
    if (question.choices[choiceIndex].correct) {
      setScore((s) => s + 1)
    } else {
      setMissed((m) => (m.includes(question.cardId) ? m : [...m, question.cardId]))
    }
  }

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1)
      setPicked(null)
    } else if (scope) {
      recordQuiz({ scope, score, total: questions.length, missedCardIds: missed })
      setFinished(true)
    }
  }

  // ─── Scope picker ───
  if (!scope) {
    return <ScopePicker onStart={start} />
  }

  // ─── Results ───
  if (finished) {
    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0
    const passed = pct >= 80
    const missedCards = missed.map((id) => CARD_BY_ID.get(id)).filter((c) => c !== undefined)
    return (
      <div className="animate-fade-up mx-auto max-w-xl space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Results — {scopeLabel(scope)}</h1>
          <p
            className={`mt-3 text-5xl font-bold ${passed ? 'text-accent-strong' : 'text-zinc-700 dark:text-zinc-200'}`}
          >
            {pct}%
          </p>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            {score} of {questions.length} correct
            {scope.kind === 'module' &&
              (passed ? ' — module mastered!' : ' — 80% earns the mastered badge')}
          </p>
        </header>

        {missedCards.length > 0 && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-semibold">Worth restudying</h2>
            <ul className="mt-3 space-y-2">
              {missedCards.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/library/${c.id}`}
                    className="flex items-baseline justify-between gap-3 rounded-lg border border-zinc-200 px-3 py-2 transition-colors hover:border-accent-strong/50 dark:border-zinc-700 dark:hover:border-accent/50"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-sm text-zinc-400">
                      {MODULE_BY_ID.get(c.module)?.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex justify-center gap-3">
          <Button onClick={() => setScope(null)}>New test</Button>
          <Button variant="primary" onClick={() => start(scope)}>
            Retake
          </Button>
        </div>
      </div>
    )
  }

  if (!question) return null

  // ─── Active quiz ───
  const answered = picked !== null
  const correctPicked = picked !== null && question.choices[picked].correct
  return (
    <div className="animate-fade-up mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>
          Question {index + 1} of {questions.length} · {scopeLabel(scope)}
        </span>
        <span>
          Score {score}/{index + (answered ? 1 : 0)}
        </span>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
          {QUESTION_TYPE_LABEL[question.type]}
        </p>

        {question.type === 'image-to-name' ? (
          <div className="mt-3">
            <Illustration cardId={question.prompt} />
          </div>
        ) : (
          <p className="mt-3 text-lg font-medium leading-relaxed">
            {question.type === 'fill-blank'
              ? question.prompt.split('____').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="mx-1 inline-block w-16 border-b-2 border-accent-strong align-baseline" />
                    )}
                  </span>
                ))
              : question.prompt}
          </p>
        )}

        <div className="mt-5 grid gap-2.5">
          {question.choices.map((choice, i) => {
            let style =
              'border-zinc-300 hover:border-accent-strong/60 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/60'
            if (answered) {
              if (choice.correct)
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
                className={`rounded-lg border px-4 py-3 text-left text-base font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong disabled:cursor-default ${style}`}
              >
                {choice.text}
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
            <strong>{correctPicked ? 'Correct.' : 'Not quite.'}</strong> {question.reason}
          </div>
        )}
      </div>

      <Button variant="primary" className="w-full" onClick={next} disabled={!answered}>
        {index + 1 < questions.length ? 'Next question' : 'Finish test'}
      </Button>
    </div>
  )
}

function ScopePicker({ onStart }: { onStart: (scope: QuizScope) => void }) {
  const moodCounts = useMemo(
    () =>
      Object.fromEntries(
        ALL_MOODS.map((mood) => [mood, scopedCards({ kind: 'mood', mood }).length]),
      ) as Record<Mood, number>,
    [],
  )
  return (
    <div className="animate-fade-up space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Test</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Ten mixed questions — name the technique, match definitions, solve scenarios, fill
          blanks.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="font-semibold">Full test</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Questions drawn from every module.
        </p>
        <Button variant="primary" className="mt-3" onClick={() => onStart({ kind: 'all' })}>
          Start full test
        </Button>
      </section>

      <section>
        <h2 className="mb-3 font-semibold">By module</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onStart({ kind: 'module', moduleId: m.id as ModuleId })}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-left transition-colors duration-150 hover:border-accent-strong/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent/50"
            >
              <span className="font-semibold">{m.title}</span>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                Score 80% to earn the mastered badge
              </p>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-semibold">By mood</h2>
        <div className="flex flex-wrap gap-2">
          {ALL_MOODS.filter((mood) => moodCounts[mood] >= 4).map((mood) => (
            <MoodChip key={mood} mood={mood} onClick={() => onStart({ kind: 'mood', mood })} />
          ))}
        </div>
      </section>
    </div>
  )
}
