import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LESSON_BY_ID, REVIEW_ITEMS, type ReviewItem } from '../../curriculum'
import { useLessonProgress } from '../../data/hooks'
import { useAppState } from '../../lib/state'
import { isDue } from '../../lib/srs'
import { Button, EmptyState, ProgressBar } from '../../components/ui'

const NEW_PER_SESSION = 8
const MAX_SESSION = 24

const KIND_LABEL: Record<ReviewItem['kind'], string> = {
  check: 'Lesson check',
  term: 'Glossary',
  card: 'Concept card',
}

export function Review() {
  const { reviews, rateCard } = useAppState()
  const progress = useLessonProgress()
  const [queue, setQueue] = useState<ReviewItem[] | null>(null)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState({ right: 0, wrong: 0 })

  const openedLessons = useMemo(() => new Set(progress.keys()), [progress])

  const { due, fresh } = useMemo(() => {
    const dueItems: ReviewItem[] = []
    const freshItems: ReviewItem[] = []
    for (const item of REVIEW_ITEMS) {
      const state = reviews[item.id]
      if (state) {
        if (isDue(state)) dueItems.push(item)
        continue
      }
      // Only introduce material the learner has actually met.
      const met = item.kind === 'card' || openedLessons.has(item.lessonId)
      if (met) freshItems.push(item)
    }
    return { due: dueItems, fresh: freshItems }
  }, [reviews, openedLessons])

  function start() {
    const picked = [...due, ...fresh.slice(0, NEW_PER_SESSION)].slice(0, MAX_SESSION)
    setQueue(picked)
    setIndex(0)
    setPicked(null)
    setScore({ right: 0, wrong: 0 })
  }

  function answer(choice: number) {
    if (!queue || picked !== null) return
    const item = queue[index]
    const correct = choice === item.answerIndex
    setPicked(choice)
    setScore((s) => ({
      right: s.right + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }))
    rateCard(item.id, correct ? 2 : 0)
  }

  function advance() {
    if (!queue) return
    if (index + 1 >= queue.length) {
      setQueue([])
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  // ── idle / start screen ──
  if (queue === null) {
    const total = due.length + Math.min(fresh.length, NEW_PER_SESSION)
    return (
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Review</h1>
        <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
          One queue for everything you have learned — lesson checks, glossary terms and the
          concept cards, scheduled together by the same SM-2 engine.
        </p>

        {total === 0 ? (
          <div className="mt-8">
            <EmptyState title="Nothing due right now">
              Open a lesson and answer its three checks, and they will start appearing here on
              schedule. <Link to="/tracks" className="underline">Go to the tracks</Link>.
            </EmptyState>
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-3xl font-bold text-accent-strong dark:text-accent">{due.length}</p>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  due for review
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-3xl font-bold">{Math.min(fresh.length, NEW_PER_SESSION)}</p>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  new this session
                </p>
              </div>
            </div>
            <Button variant="primary" className="mt-5" onClick={start}>
              Start session &middot; {total} cards
            </Button>
          </>
        )}
      </div>
    )
  }

  // ── finished ──
  if (queue.length === 0 || index >= queue.length) {
    const total = score.right + score.wrong
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-bold tracking-tight">Session done</h1>
        <p className="mt-2 text-4xl font-bold text-accent-strong dark:text-accent">
          {total > 0 ? Math.round((score.right / total) * 100) : 0}%
        </p>
        <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
          {score.right} right, {score.wrong} wrong. The ones you missed come back soon; the ones
          you nailed step further out.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={() => setQueue(null)}>Back to review</Button>
          <Link
            to="/tracks"
            className="inline-flex items-center rounded-lg px-4 py-2 font-medium text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Learn something new
          </Link>
        </div>
      </div>
    )
  }

  // ── in session ──
  const item = queue[index]
  const lesson = LESSON_BY_ID.get(item.lessonId)

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4">
        <ProgressBar value={index} max={queue.length} label="Session progress" />
        <p className="mt-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {index + 1} of {queue.length} &middot; {KIND_LABEL[item.kind]}
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-lg font-medium leading-snug">{item.prompt}</p>
        <div className="mt-4 space-y-2">
          {item.options.map((opt, oi) => {
            const isAnswer = oi === item.answerIndex
            const isPick = oi === picked
            let tone =
              'border-zinc-200 hover:border-accent hover:bg-accent-soft/40 dark:border-zinc-700 dark:hover:bg-zinc-800'
            if (picked !== null && isAnswer) tone = 'border-green-500 bg-green-50 dark:bg-green-950/40'
            else if (picked !== null && isPick) tone = 'border-red-400 bg-red-50 dark:bg-red-950/40'
            else if (picked !== null) tone = 'border-zinc-200 opacity-60 dark:border-zinc-700'
            return (
              <button
                key={oi}
                type="button"
                disabled={picked !== null}
                onClick={() => answer(oi)}
                className={`block w-full rounded-lg border px-3 py-2.5 text-left text-base transition-colors disabled:cursor-default ${tone}`}
              >
                {opt}
              </button>
            )
          })}
        </div>

        {picked !== null ? (
          <>
            <p className="mt-4 rounded-lg bg-zinc-100 px-3 py-2.5 text-base leading-snug text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {item.why}
            </p>
            {lesson ? (
              <Link
                to={`/lesson/${lesson.id}`}
                className="mt-2 block text-sm font-medium text-accent-strong hover:underline dark:text-accent"
              >
                Re-read: {lesson.title} &rarr;
              </Link>
            ) : null}
            <Button variant="primary" className="mt-4 w-full" onClick={advance} autoFocus>
              {index + 1 >= queue.length ? 'Finish' : 'Next'}
            </Button>
          </>
        ) : null}
      </div>
    </div>
  )
}
