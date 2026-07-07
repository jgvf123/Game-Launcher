import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  DIMENSIONS,
  DIMENSION_LABEL,
  STORY_BY_ID,
  beatFrameSpec,
  type Dimension,
  type Story,
  type StoryBeat,
} from '../content/stories'
import { CARD_BY_ID } from '../content'
import { StoryFrame } from '../components/StoryFrame'
import { Button, ButtonLink } from '../components/ui'
import { useAppState } from '../lib/state'

function shuffled<T>(items: T[], seed: string): T[] {
  // Small deterministic shuffle so options don't jump around on re-render.
  let h = 2166136261
  for (const ch of seed) h = (h ^ ch.charCodeAt(0)) * 16777619
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) & 0x7fffffff
    const j = h % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Horizontal storyboard strip: finished frames, the current slot, empty future slots. */
function Strip({ story, done, current }: { story: Story; done: number; current: number | null }) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 py-1">
      {story.beats.map((beat, i) => (
        <div key={beat.id} className="w-24 shrink-0 sm:w-28">
          <div
            className={`aspect-[8/5] overflow-hidden rounded-md ${
              i < done
                ? ''
                : i === current
                  ? 'border-2 border-dashed border-accent-strong/70'
                  : 'border-2 border-dashed border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {i < done ? (
              <StoryFrame spec={beatFrameSpec(beat)} label={`Frame ${i + 1}: ${beat.title}`} />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-semibold text-zinc-300 dark:text-zinc-700">
                {i + 1}
              </div>
            )}
          </div>
          <p className="mt-1 truncate text-center text-xs text-zinc-400 dark:text-zinc-500">
            {i < done ? beat.title : `Frame ${i + 1}`}
          </p>
        </div>
      ))}
    </div>
  )
}

export function StoryPlayer() {
  const { storyId } = useParams()
  const story = storyId ? STORY_BY_ID.get(storyId) : undefined

  if (!story) {
    return (
      <div className="animate-fade-up py-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">That story doesn’t exist.</p>
        <ButtonLink to="/storyboard" className="mt-4">
          Back to Storyboard
        </ButtonLink>
      </div>
    )
  }

  // Keyed by story id so switching stories fully resets the player state.
  return <Player key={story.id} story={story} />
}

function Player({ story }: { story: Story }) {
  const { stories, setStoryProgress, resetStory } = useAppState()

  const saved = stories[story.id]
  const [beatIndex, setBeatIndex] = useState(() =>
    saved && !saved.completed ? Math.min(saved.beatsDone, story.beats.length - 1) : 0,
  )
  const [mistakes, setMistakes] = useState(() => (saved && !saved.completed ? saved.mistakes : 0))
  const [showSummary, setShowSummary] = useState(() => saved?.completed ?? false)
  const [beatDone, setBeatDone] = useState(false)

  const beat = story.beats[beatIndex]
  const totalBeats = story.beats.length

  const completeBeat = () => {
    const nextDone = beatIndex + 1
    setStoryProgress(story.id, {
      beatsDone: nextDone,
      mistakes,
      completed: nextDone === totalBeats,
    })
    setBeatDone(true)
  }

  const nextBeat = () => {
    setBeatDone(false)
    if (beatIndex + 1 < totalBeats) {
      setBeatIndex(beatIndex + 1)
    } else {
      setShowSummary(true)
    }
  }

  const replay = () => {
    resetStory(story.id)
    setBeatIndex(0)
    setMistakes(0)
    setBeatDone(false)
    setShowSummary(false)
  }

  // ─────────────────────────────── summary ───────────────────────────────
  if (showSummary) {
    const perfect = mistakes === 0
    return (
      <div className="animate-fade-up mx-auto max-w-2xl space-y-6">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
            Storyboard complete
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">{story.title}</h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            {story.kind === 'teach'
              ? 'You’ve seen how each frame was chosen. Now take the director’s chair on a practice story.'
              : perfect
                ? 'Every call correct on the current run — clean directing.'
                : `${mistakes} wrong call${mistakes === 1 ? '' : 's'} along the way — each one came with the reason, which is the real lesson.`}
          </p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-2 px-1 text-sm font-semibold uppercase tracking-wide text-zinc-400">
            Your storyboard
          </h2>
          <Strip story={story} done={totalBeats} current={null} />
        </div>

        <div className="flex justify-center gap-3">
          <Button onClick={replay}>Replay story</Button>
          <ButtonLink to="/storyboard" variant="primary">
            More stories
          </ButtonLink>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-up mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Link
          to="/storyboard"
          className="inline-flex items-center gap-1.5 text-base font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12.7 15.3 7.4 10l5.3-5.3 1.2 1.2L9.8 10l4.1 4.1-1.2 1.2z" />
          </svg>
          Stories
        </Link>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {story.title} · Frame {beatIndex + 1} of {totalBeats}
        </span>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <Strip story={story} done={beatIndex + (beatDone ? 1 : 0)} current={beatDone ? null : beatIndex} />
      </div>

      {beatDone ? (
        <BeatComplete beat={beat} index={beatIndex} isLast={beatIndex + 1 === totalBeats} onNext={nextBeat} />
      ) : story.kind === 'teach' ? (
        <TeachBeat beat={beat} onDone={completeBeat} />
      ) : (
        <PracticeBeat
          key={beat.id}
          beat={beat}
          onMistake={() => setMistakes((m) => m + 1)}
          onDone={completeBeat}
        />
      )}
    </div>
  )
}

// ────────────────────────────── beat complete ──────────────────────────────

function BeatComplete({
  beat,
  index,
  isLast,
  onNext,
}: {
  beat: StoryBeat
  index: number
  isLast: boolean
  onNext: () => void
}) {
  const spec = beatFrameSpec(beat)
  return (
    <div className="animate-fade-up rounded-2xl border border-zinc-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
        Frame {index + 1} added to your storyboard
      </p>
      <div className="mx-auto mt-3 max-w-sm overflow-hidden rounded-lg">
        <StoryFrame spec={spec} label={`Completed frame: ${beat.title}`} />
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {DIMENSIONS.map((dim) => {
          const card = CARD_BY_ID.get(spec[dim])
          return (
            <Link
              key={dim}
              to={`/library/${spec[dim]}`}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:text-accent-strong dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-accent"
            >
              {DIMENSION_LABEL[dim]}: {card?.name ?? spec[dim]}
            </Link>
          )
        })}
      </div>
      <Button variant="primary" className="mt-5" onClick={onNext}>
        {isLast ? 'See your storyboard' : 'Next frame'}
      </Button>
    </div>
  )
}

// ─────────────────────────────── teach mode ────────────────────────────────

function TeachBeat({ beat, onDone }: { beat: StoryBeat; onDone: () => void }) {
  const spec = beatFrameSpec(beat)
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">{beat.title}</h2>
        <p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-300">{beat.script}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-sm p-4 pb-0">
          <StoryFrame spec={spec} label={`Frame: ${beat.title}`} />
        </div>
        <div className="space-y-3 p-5">
          {beat.questions.map((question) => {
            const choice = question.options.find((o) => o.correct) ?? question.options[0]
            const card = CARD_BY_ID.get(choice.cardId)
            return (
              <div key={question.dimension} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {DIMENSION_LABEL[question.dimension]}
                  </span>
                  <Link
                    to={`/library/${choice.cardId}`}
                    className="font-semibold text-accent-strong hover:underline dark:text-accent"
                  >
                    {card?.name ?? choice.cardId}
                  </Link>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {choice.note}
                </p>
              </div>
            )
          })}
          <Button variant="primary" className="w-full" onClick={onDone}>
            Add frame to storyboard
          </Button>
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────── practice mode ──────────────────────────────

function PracticeBeat({
  beat,
  onMistake,
  onDone,
}: {
  beat: StoryBeat
  onMistake: () => void
  onDone: () => void
}) {
  const [dimIndex, setDimIndex] = useState(0)
  const [wrongPicks, setWrongPicks] = useState<Set<string>>(new Set())
  const [feedback, setFeedback] = useState<{ cardId: string; correct: boolean; note: string } | null>(null)
  const [picks, setPicks] = useState<Partial<Record<Dimension, string>>>({})

  const question = beat.questions[dimIndex]
  const options = useMemo(
    () => shuffled(question.options, `${beat.id}:${question.dimension}`),
    [beat.id, question],
  )
  const solved = feedback?.correct ?? false

  const choose = (cardId: string) => {
    if (solved || wrongPicks.has(cardId)) return
    const option = question.options.find((o) => o.cardId === cardId)!
    if (option.correct) {
      setFeedback({ cardId, correct: true, note: option.note })
      setPicks((p) => ({ ...p, [question.dimension]: cardId }))
    } else {
      onMistake()
      setWrongPicks((prev) => new Set(prev).add(cardId))
      setFeedback({ cardId, correct: false, note: option.note })
    }
  }

  const advance = () => {
    if (dimIndex + 1 < beat.questions.length) {
      setDimIndex(dimIndex + 1)
      setWrongPicks(new Set())
      setFeedback(null)
    } else {
      onDone()
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">{beat.title}</h2>
        <p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-300">{beat.script}</p>
        {Object.keys(picks).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {DIMENSIONS.filter((d) => picks[d]).map((d) => (
              <span
                key={d}
                className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-950/50 dark:text-green-300"
              >
                {DIMENSION_LABEL[d]}: {CARD_BY_ID.get(picks[d]!)?.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
          Your call · {DIMENSION_LABEL[question.dimension]}
        </p>
        <p className="mt-1 text-zinc-600 dark:text-zinc-300">
          How do you frame this beat? ({dimIndex + 1} of {beat.questions.length})
        </p>

        <div className="mt-4 grid gap-2.5">
          {options.map((option) => {
            const card = CARD_BY_ID.get(option.cardId)
            const isWrongPick = wrongPicks.has(option.cardId)
            const isCorrectPick = solved && option.correct
            let style =
              'border-zinc-300 hover:border-accent-strong/60 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/60'
            if (isCorrectPick)
              style =
                'border-green-600 bg-green-50 text-green-900 dark:border-green-500 dark:bg-green-950/40 dark:text-green-200'
            else if (isWrongPick)
              style =
                'border-red-500 bg-red-50 text-red-900 opacity-80 dark:border-red-500 dark:bg-red-950/40 dark:text-red-200'
            else if (solved) style = 'border-zinc-200 opacity-60 dark:border-zinc-800'
            return (
              <button
                key={option.cardId}
                type="button"
                onClick={() => choose(option.cardId)}
                disabled={solved || isWrongPick}
                className={`rounded-lg border px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong disabled:cursor-default ${style}`}
              >
                <span className="font-medium">{card?.name ?? option.cardId}</span>
                <span className="mt-0.5 block text-sm opacity-75">{card?.shortDefinition}</span>
              </button>
            )
          })}
        </div>

        {feedback && (
          <div
            className={`animate-fade-up mt-4 rounded-lg p-3 text-sm ${
              feedback.correct
                ? 'bg-green-50 text-green-900 dark:bg-green-950/40 dark:text-green-200'
                : 'bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200'
            }`}
          >
            <strong>{feedback.correct ? 'Good call.' : 'Not this one.'}</strong> {feedback.note}
            {!feedback.correct && <span className="mt-1 block opacity-80">Pick again.</span>}
          </div>
        )}

        {solved && (
          <Button variant="primary" className="mt-4 w-full" onClick={advance}>
            {dimIndex + 1 < beat.questions.length ? 'Next choice' : 'Lock the frame'}
          </Button>
        )}
      </div>
    </div>
  )
}
