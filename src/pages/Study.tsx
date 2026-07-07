import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CARD_BY_ID } from '../content'
import { Illustration } from '../components/Illustration'
import { Button, EmptyState, ProgressBar } from '../components/ui'
import { dueCardIds, newCardIds, useAppState } from '../lib/state'
import type { Rating } from '../lib/srs'

const NEW_PER_SESSION = 10

interface SessionStats {
  reviewed: number
  again: number
  knew: number
  knewWell: number
}

const EMPTY_STATS: SessionStats = { reviewed: 0, again: 0, knew: 0, knewWell: 0 }

export function Study() {
  const { reviews, rateCard } = useAppState()
  const [queue, setQueue] = useState<string[] | null>(null)
  const [initialCount, setInitialCount] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [stats, setStats] = useState<SessionStats>(EMPTY_STATS)

  const startSession = useCallback(() => {
    const due = dueCardIds(reviews)
    const fresh = newCardIds(reviews).slice(0, NEW_PER_SESSION)
    const session = [...due, ...fresh]
    setQueue(session)
    setInitialCount(session.length)
    setStats(EMPTY_STATS)
    setFlipped(false)
  }, [reviews])

  const current = queue && queue.length > 0 ? CARD_BY_ID.get(queue[0]) : undefined

  const rate = useCallback(
    (rating: Rating) => {
      if (!current) return
      rateCard(current.id, rating)
      setStats((s) => ({
        reviewed: s.reviewed + 1,
        again: s.again + (rating === 0 ? 1 : 0),
        knew: s.knew + (rating === 1 ? 1 : 0),
        knewWell: s.knewWell + (rating === 2 ? 1 : 0),
      }))
      setQueue((q) => {
        if (!q) return q
        const [head, ...rest] = q
        // Cards you didn't know return at the end of this same session.
        return rating === 0 ? [...rest, head] : rest
      })
      setFlipped(false)
    },
    [current, rateCard],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!current) return
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(e.target.tagName))
        return
      if (e.key === ' ' || e.key === 'Enter') {
        if (!flipped) {
          e.preventDefault()
          setFlipped(true)
        }
      } else if (flipped && ['1', '2', '3'].includes(e.key)) {
        e.preventDefault()
        rate((Number(e.key) - 1) as Rating)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, flipped, rate])

  // ── Not started yet: show the queue summary ──
  if (queue === null) {
    const due = dueCardIds(reviews)
    const fresh = newCardIds(reviews)
    const newThisSession = Math.min(fresh.length, NEW_PER_SESSION)
    const nothingToStudy = due.length === 0 && fresh.length === 0

    return (
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Study</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            Flashcards with spaced repetition — rate yourself honestly and the schedule does the
            rest.
          </p>
        </header>
        {nothingToStudy ? (
          <EmptyState
            title="All caught up"
            action={
              <Link to="/test">
                <Button variant="primary">Take a test instead</Button>
              </Link>
            }
          >
            Nothing is due for review right now, and every card has been introduced. Come back
            later, or lock things in with a quiz.
          </EmptyState>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex justify-center gap-8">
              <div>
                <p className="text-3xl font-bold text-accent-strong">{due.length}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">due for review</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{newThisSession}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">new cards</p>
              </div>
            </div>
            <Button variant="primary" className="mt-6 w-full" onClick={startSession}>
              Start session
            </Button>
            <p className="mt-3 text-sm text-zinc-400 dark:text-zinc-500">
              Tip: Space flips the card, then 1 / 2 / 3 rates it.
            </p>
          </div>
        )}
      </div>
    )
  }

  // ── Session finished ──
  if (!current) {
    return (
      <div className="animate-fade-up mx-auto max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Session complete</h1>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-4xl font-bold text-accent-strong">{stats.reviewed}</p>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">cards reviewed</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
              <p className="font-semibold">{stats.again}</p>
              <p className="text-zinc-500 dark:text-zinc-400">didn’t know</p>
            </div>
            <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
              <p className="font-semibold">{stats.knew}</p>
              <p className="text-zinc-500 dark:text-zinc-400">knew it</p>
            </div>
            <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
              <p className="font-semibold">{stats.knewWell}</p>
              <p className="text-zinc-500 dark:text-zinc-400">knew it well</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Button onClick={() => setQueue(null)}>Back to Study</Button>
          <Link to="/progress">
            <Button variant="primary">See progress</Button>
          </Link>
        </div>
      </div>
    )
  }

  // ── Active session ──
  const done = initialCount - queue.length
  return (
    <div className="animate-fade-up mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>
          Card {Math.min(done + 1, initialCount)} of {initialCount}
          {queue.length > initialCount - done ? ' (+retries)' : ''}
        </span>
        <span>{queue.length} left</span>
      </div>
      <ProgressBar value={done} max={initialCount} label="Session progress" />

      <div className="flip-scene h-[26rem]">
        <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
          {/* front: illustration only */}
          <button
            type="button"
            onClick={() => setFlipped(true)}
            disabled={flipped}
            aria-label="Flip card to reveal the answer"
            className="flip-face flex w-full cursor-pointer flex-col rounded-2xl border border-zinc-200 bg-white p-5 text-left dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Illustration cardId={current.id} />
            <div className="flex flex-1 flex-col items-center justify-center gap-1 pt-4 text-center">
              <p className="font-medium text-zinc-700 dark:text-zinc-200">
                What technique is this?
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Recall the name and what it’s for, then flip
              </p>
            </div>
          </button>
          {/* back: answer */}
          <div className="flip-face flip-back overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
              Answer
            </p>
            <h2 className="mt-1 text-xl font-bold">{current.name}</h2>
            <p className="mt-1 font-medium text-zinc-600 dark:text-zinc-300">
              {current.shortDefinition}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {current.explanation}
            </p>
          </div>
        </div>
      </div>

      {flipped ? (
        <div className="grid grid-cols-3 gap-3">
          <Button onClick={() => rate(0)} className="border-red-300 text-red-700 dark:border-red-900 dark:text-red-400">
            Didn’t know it
          </Button>
          <Button onClick={() => rate(1)}>Knew it</Button>
          <Button variant="primary" onClick={() => rate(2)}>
            Knew it well
          </Button>
        </div>
      ) : (
        <Button className="w-full" onClick={() => setFlipped(true)}>
          Flip to reveal
        </Button>
      )}
    </div>
  )
}
