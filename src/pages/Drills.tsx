import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DRILLS, DRILL_MOODS, type Drill, type DrillMood, type DrillOption } from '../content/drills'
import { CARD_BY_ID } from '../content'
import { Button } from '../components/ui'
import { useAppState, type DrillResult } from '../lib/state'

const SESSION_LENGTH = 8

function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function MoodTag({ mood }: { mood: DrillMood }) {
  return (
    <span className="rounded-full bg-zinc-200/70 px-2.5 py-0.5 text-xs font-semibold capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      {mood}
    </span>
  )
}

/** The highlighted takeaway — the rule of thumb worth remembering. */
function PrincipleBox({ drill }: { drill: Drill }) {
  return (
    <div className="animate-fade-up mt-4 rounded-xl border-l-4 border-accent-strong bg-accent-soft p-4 dark:bg-zinc-800/80">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-accent-strong dark:text-accent" fill="currentColor" aria-hidden>
          <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V18h6v-1.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2zM9 20h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1z" />
        </svg>
        <p className="text-sm font-bold uppercase tracking-wide text-accent-strong dark:text-accent">
          {drill.principle.title}
        </p>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
        {drill.principle.text}
      </p>
    </div>
  )
}

interface SessionEntry {
  drill: Drill
  result: DrillResult
}

export function Drills() {
  const { drills: saved, recordDrill } = useAppState()
  const [moodFilter, setMoodFilter] = useState<DrillMood | null>(null)
  const [session, setSession] = useState<Drill[] | null>(null)
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState<SessionEntry[]>([])

  const scoped = useMemo(
    () => (moodFilter ? DRILLS.filter((d) => d.mood === moodFilter) : DRILLS),
    [moodFilter],
  )

  const startSession = () => {
    // New scenes first, then the ones with the weakest past result.
    const rank: Record<DrillResult, number> = { perfect: 3, good: 2, learned: 1 }
    const ordered = shuffle(scoped).sort(
      (a, b) => (saved[a.id] ? rank[saved[a.id]] : 0) - (saved[b.id] ? rank[saved[b.id]] : 0),
    )
    setSession(ordered.slice(0, SESSION_LENGTH))
    setIndex(0)
    setResults([])
  }

  const finishDrill = (drill: Drill, result: DrillResult) => {
    recordDrill(drill.id, result)
    setResults((r) => [...r, { drill, result }])
  }

  // ─── landing ───
  if (!session) {
    const directed = DRILLS.filter((d) => saved[d.id]).length
    const perfect = DRILLS.filter((d) => saved[d.id] === 'perfect').length
    return (
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Director’s Eye</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            One situation, one decision. Pick the angle or movement the scene needs — sometimes
            two answers work, but only one is the director’s pick, and you’ll learn why.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Scenes directed</p>
            <p className="mt-1 text-3xl font-bold">
              {directed}
              <span className="text-base font-medium text-zinc-500"> / {DRILLS.length}</span>
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Director’s picks (first try)</p>
            <p className="mt-1 text-3xl font-bold text-accent-strong">{perfect}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold">Pick a mood (optional)</h2>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            Practice how one emotion is framed, or mix everything.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMoodFilter(null)}
              aria-pressed={moodFilter === null}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors duration-150 ${
                moodFilter === null
                  ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              All moods
            </button>
            {DRILL_MOODS.filter((m) => DRILLS.some((d) => d.mood === m)).map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setMoodFilter(moodFilter === mood ? null : mood)}
                aria-pressed={moodFilter === mood}
                className={`rounded-full px-3 py-1 text-sm font-medium capitalize transition-colors duration-150 ${
                  moodFilter === mood
                    ? 'bg-accent-strong text-white'
                    : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
          <Button variant="primary" className="mt-5 w-full sm:w-auto" onClick={startSession}>
            Start session ({Math.min(SESSION_LENGTH, scoped.length)} scenes)
          </Button>
        </div>
      </div>
    )
  }

  // ─── summary ───
  if (index >= session.length) {
    const count = (r: DrillResult) => results.filter((e) => e.result === r).length
    return (
      <div className="animate-fade-up mx-auto max-w-2xl space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Session complete</h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            {count('perfect') === results.length
              ? 'Every scene, director’s pick, first try. Sharp eye.'
              : 'Every principle below is now yours — that’s the point of the wrong turns.'}
          </p>
        </header>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl font-bold text-accent-strong">{count('perfect')}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">director’s pick</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl font-bold">{count('good')}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">workable call</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-2xl font-bold">{count('learned')}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">learned the hard way</p>
          </div>
        </div>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold">Principles from this session</h2>
          <ul className="mt-3 space-y-3">
            {results.map(({ drill }) => (
              <li key={drill.id} className="rounded-lg border-l-4 border-accent-strong bg-accent-soft p-3 dark:bg-zinc-800/80">
                <p className="text-sm font-bold uppercase tracking-wide text-accent-strong dark:text-accent">
                  {drill.principle.title}
                </p>
                <p className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-200">{drill.principle.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex justify-center gap-3">
          <Button onClick={() => setSession(null)}>Change mood</Button>
          <Button variant="primary" onClick={startSession}>
            Another session
          </Button>
        </div>
      </div>
    )
  }

  // ─── active drill ───
  return (
    <DrillCard
      key={session[index].id}
      drill={session[index]}
      position={`${index + 1} of ${session.length}`}
      onDone={(result) => finishDrill(session[index], result)}
      onNext={() => setIndex((i) => i + 1)}
    />
  )
}

function DrillCard({
  drill,
  position,
  onDone,
  onNext,
}: {
  drill: Drill
  position: string
  onDone: (result: DrillResult) => void
  onNext: () => void
}) {
  const [wrongPicks, setWrongPicks] = useState<Set<string>>(new Set())
  const [outcome, setOutcome] = useState<{ picked: DrillOption; result: DrillResult } | null>(null)

  const options = useMemo(() => shuffle(drill.options), [drill])
  const bestOption = drill.options.find((o) => o.grade === 'best')!
  const goodOption = drill.options.find((o) => o.grade === 'good')

  const choose = (option: DrillOption) => {
    if (outcome || wrongPicks.has(option.cardId)) return
    if (option.grade === 'wrong') {
      setWrongPicks((prev) => new Set(prev).add(option.cardId))
      return
    }
    const firstTry = wrongPicks.size === 0
    const result: DrillResult =
      option.grade === 'best' ? (firstTry ? 'perfect' : 'learned') : firstTry ? 'good' : 'learned'
    setOutcome({ picked: option, result })
    onDone(result)
  }

  const lastWrong = [...wrongPicks].pop()
  const lastWrongOption = drill.options.find((o) => o.cardId === lastWrong)

  return (
    <div className="animate-fade-up mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>Director’s Eye · Scene {position}</span>
        <MoodTag mood={drill.mood} />
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="leading-relaxed text-zinc-700 dark:text-zinc-200">{drill.situation}</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
          Your call · {drill.ask}
        </p>

        <div className="mt-4 grid gap-2.5">
          {options.map((option) => {
            const card = CARD_BY_ID.get(option.cardId)
            const isWrongPicked = wrongPicks.has(option.cardId)
            const revealBest = outcome && option.grade === 'best'
            const revealGood = outcome && option.grade === 'good'
            let style =
              'border-zinc-300 hover:border-accent-strong/60 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/60'
            if (revealBest)
              style =
                'border-green-600 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950/40 dark:text-green-200'
            else if (revealGood)
              style =
                'border-amber-500 bg-amber-50 text-amber-900 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-200'
            else if (isWrongPicked)
              style =
                'border-red-500 bg-red-50 text-red-900 opacity-80 dark:border-red-500 dark:bg-red-950/40 dark:text-red-200'
            else if (outcome) style = 'border-zinc-200 opacity-60 dark:border-zinc-800'
            return (
              <button
                key={option.cardId}
                type="button"
                onClick={() => choose(option)}
                disabled={!!outcome || isWrongPicked}
                className={`rounded-lg border px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong disabled:cursor-default ${style}`}
              >
                <span className="font-medium">{card?.name ?? option.cardId}</span>
                <span className="mt-0.5 block text-sm opacity-75">{card?.shortDefinition}</span>
                {revealBest && (
                  <span className="mt-2 block border-t border-green-200 pt-2 text-sm dark:border-green-900">
                    <strong>Director’s pick.</strong> {option.note}
                  </span>
                )}
                {revealGood && (
                  <span className="mt-2 block border-t border-amber-200 pt-2 text-sm dark:border-amber-900">
                    <strong>Also workable.</strong> {option.note}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {!outcome && lastWrongOption && (
          <div className="animate-fade-up mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-900 dark:bg-red-950/40 dark:text-red-200">
            <strong>Not this one.</strong> {lastWrongOption.note}
            <span className="mt-1 block opacity-80">Pick again.</span>
          </div>
        )}

        {outcome && (
          <>
            <div
              className={`animate-fade-up mt-4 rounded-lg p-3 text-sm ${
                outcome.result === 'perfect'
                  ? 'bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-200'
                  : outcome.result === 'good'
                    ? 'bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
                    : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200'
              }`}
            >
              {outcome.result === 'perfect' && <strong>Director’s pick, first try. </strong>}
              {outcome.result === 'good' && (
                <strong>
                  Your call works — but {CARD_BY_ID.get(bestOption.cardId)?.name} is the stronger
                  choice here.{' '}
                </strong>
              )}
              {outcome.result === 'learned' && <strong>Got there — the reasons are what matter. </strong>}
              {outcome.result !== 'good' && goodOption && outcome.picked.grade === 'best' && (
                <span>
                  Note: {CARD_BY_ID.get(goodOption.cardId)?.name} would also play, just weaker.
                </span>
              )}
            </div>
            <PrincipleBox drill={drill} />
            <div className="mt-4 flex items-center justify-between gap-3">
              <Link
                to={`/library/${bestOption.cardId}`}
                className="text-sm font-medium text-zinc-500 hover:text-accent-strong dark:text-zinc-400 dark:hover:text-accent"
              >
                Read the full card →
              </Link>
              <Button variant="primary" onClick={onNext}>
                Next scene
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
