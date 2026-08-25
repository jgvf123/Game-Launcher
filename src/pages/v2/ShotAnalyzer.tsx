import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { LESSON_BY_ID, TRACK_BY_ID } from '../../curriculum'
import { ANALYZER_ATTRIBUTES } from '../../curriculum/analyzerRubric'
import { db, type AnalyzerAttemptRow } from '../../data/db'
import { useLanguage } from '../../lib/prefs'
import { Button, ProgressBar } from '../../components/ui'

type Phase = 'tag' | 'grade' | 'done'

export function ShotAnalyzer() {
  const lang = useLanguage()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('tag')
  const [tags, setTags] = useState<Record<string, string>>({})
  const [scores, setScores] = useState<Record<string, boolean>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  const attempts = useLiveQuery(
    () => db.analyzerAttempts.orderBy('at').reverse().toArray(),
    [],
    [] as AnalyzerAttemptRow[],
  )

  // Object URLs must be released or the blob stays in memory for the session.
  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  /** Per-attribute accuracy across every attempt ever recorded. */
  const accuracy = useMemo(() => {
    const map = new Map<string, { right: number; total: number }>()
    for (const attempt of attempts) {
      for (const [id, ok] of Object.entries(attempt.scores)) {
        const row = map.get(id) ?? { right: 0, total: 0 }
        row.total += 1
        if (ok) row.right += 1
        map.set(id, row)
      }
    }
    return map
  }, [attempts])

  const weakest = useMemo(() => {
    const rated = ANALYZER_ATTRIBUTES.map((a) => {
      const row = accuracy.get(a.id)
      return row && row.total >= 3 ? { attr: a, pct: row.right / row.total } : null
    }).filter((x): x is { attr: (typeof ANALYZER_ATTRIBUTES)[number]; pct: number } => x !== null)
    if (rated.length === 0) return null
    const worst = rated.reduce((a, b) => (a.pct <= b.pct ? a : b))
    return worst.pct < 0.7 ? worst : null
  }, [accuracy])

  function loadFile(file: File) {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageUrl(URL.createObjectURL(file))
    setTags({})
    setScores({})
    setPhase('tag')
  }

  const allTagged = ANALYZER_ATTRIBUTES.every((a) => tags[a.id])
  const allGraded = ANALYZER_ATTRIBUTES.every((a) => scores[a.id] !== undefined)

  async function saveAttempt() {
    await db.analyzerAttempts.add({ at: new Date().toISOString(), scores })
    setPhase('done')
  }

  function reset() {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setImageUrl(null)
    setTags({})
    setScores({})
    setPhase('tag')
    if (fileRef.current) fileRef.current.value = ''
  }

  const correctCount = Object.values(scores).filter(Boolean).length

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Shot Analyzer</h1>
      <p className="mt-1 text-base text-ink-soft">
        Load a frame — from any film, or your own render. Read it, then check yourself against the
        rubric. The app tracks which attributes you keep getting wrong, which is the feedback a
        junior never gets.
      </p>

      {/* Weak-area callout */}
      {weakest ? (
        <div className="mt-4 rounded-xl border border-red-300/60 bg-red-50/60 p-4 dark:border-red-900/50 dark:bg-red-950/20">
          <p className="font-semibold">
            You are weakest at reading{' '}
            <span className="text-accent-strong dark:text-accent">
              {weakest.attr.label.toLowerCase()}
            </span>{' '}
            — {Math.round(weakest.pct * 100)}% right.
          </p>
          <p className="mt-1 text-sm leading-snug text-ink-soft">{weakest.attr.howToRead}</p>
        </div>
      ) : null}

      {/* Image loader */}
      <div className="mt-5">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) loadFile(file)
          }}
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-accent-strong file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
        />
        <p className="mt-1 text-xs text-ink-soft">
          The image never leaves your machine — it is not uploaded or stored, just read in the
          browser.
        </p>
      </div>

      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="The frame you are analysing"
            className="mt-4 max-h-[60vh] w-full rounded-xl border border-line object-contain"
          />

          {phase === 'tag' ? (
            <>
              <h2 className="mt-6 text-lg font-bold tracking-tight">Read the frame</h2>
              <p className="mt-0.5 text-sm text-ink-soft">
                Commit to an answer for all eight before you look at the rubric. Guessing after
                seeing the answer teaches you nothing.
              </p>
              <div className="mt-3 space-y-3">
                {ANALYZER_ATTRIBUTES.map((attr) => (
                  <div key={attr.id} className="rounded-xl bg-surface p-3">
                    <p className="font-semibold">{attr.label}</p>
                    {lang === 'both' ? (
                      <p className="text-sm text-ink-soft">{attr.hinglish}</p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {attr.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTags((p) => ({ ...p, [attr.id]: opt }))}
                          className={`rounded-full px-2.5 py-1 text-sm transition-colors ${
                            tags[attr.id] === opt
                              ? 'bg-accent-strong text-white'
                              : 'bg-surface text-ink-soft hover:text-ink'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="primary"
                className="mt-4"
                disabled={!allTagged}
                onClick={() => setPhase('grade')}
              >
                Reveal the rubric
              </Button>
              {!allTagged ? (
                <p className="mt-2 text-sm text-ink-soft">Answer all eight first.</p>
              ) : null}
            </>
          ) : null}

          {phase === 'grade' ? (
            <>
              <h2 className="mt-6 text-lg font-bold tracking-tight">Grade yourself</h2>
              <p className="mt-0.5 text-sm text-ink-soft">
                Read how each attribute is actually judged, then mark your own call. Only honest
                marks make the weak-area tracking worth anything.
              </p>
              <div className="mt-3 space-y-3">
                {ANALYZER_ATTRIBUTES.map((attr) => {
                  const lesson = attr.lessonId ? LESSON_BY_ID.get(attr.lessonId) : undefined
                  const mark = scores[attr.id]
                  return (
                    <div key={attr.id} className="rounded-xl bg-surface p-4">
                      <p className="flex flex-wrap items-baseline gap-2 font-semibold">
                        {attr.label}
                        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-sm text-accent-strong  dark:text-accent">
                          you said: {tags[attr.id]}
                        </span>
                      </p>
                      <p className="mt-2 text-base leading-relaxed">{attr.howToRead}</p>
                      <p className="mt-2 rounded-lg bg-surface px-3 py-2 text-sm leading-snug text-ink-soft">
                        <span className="font-semibold">Common trap: </span>
                        {attr.trap}
                      </p>
                      {lesson ? (
                        <Link
                          to={`/lesson/${lesson.id}`}
                          className="mt-1.5 inline-block text-sm font-medium text-accent-strong hover:underline dark:text-accent"
                        >
                          {lesson.title} &rarr;
                        </Link>
                      ) : (
                        <Link
                          to={`/track/${attr.trackId}`}
                          className="mt-1.5 inline-block text-sm font-medium text-accent-strong hover:underline dark:text-accent"
                        >
                          {TRACK_BY_ID.get(attr.trackId)?.title} &rarr;
                        </Link>
                      )}
                      <div className="mt-3 flex gap-2">
                        <Button
                          className={`px-3 py-1.5 text-sm ${mark === true ? 'border-green-500 bg-green-50 dark:bg-green-950/40' : ''}`}
                          onClick={() => setScores((p) => ({ ...p, [attr.id]: true }))}
                        >
                          I got it right
                        </Button>
                        <Button
                          className={`px-3 py-1.5 text-sm ${mark === false ? 'border-red-400 bg-red-50 dark:bg-red-950/40' : ''}`}
                          onClick={() => setScores((p) => ({ ...p, [attr.id]: false }))}
                        >
                          I got it wrong
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Button
                variant="primary"
                className="mt-4"
                disabled={!allGraded}
                onClick={() => void saveAttempt()}
              >
                Save this attempt
              </Button>
            </>
          ) : null}

          {phase === 'done' ? (
            <div className="mt-6 rounded-xl border-2 border-accent-strong/50 bg-accent-soft/40 p-5 text-center dark:border-accent/40">
              <p className="text-3xl font-bold text-accent-strong dark:text-accent">
                {correctCount} / {ANALYZER_ATTRIBUTES.length}
              </p>
              <p className="mt-1 text-base text-ink-soft">
                Recorded. Attempt number {attempts.length}.
              </p>
              <Button variant="primary" className="mt-4" onClick={reset}>
                Analyse another frame
              </Button>
            </div>
          ) : null}
        </>
      ) : null}

      {/* Running accuracy */}
      {attempts.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-lg font-bold tracking-tight">Your accuracy</h2>
          <p className="mt-0.5 text-sm text-ink-soft">
            Across {attempts.length} frame{attempts.length === 1 ? '' : 's'}.
          </p>
          <ul className="mt-3 space-y-2.5">
            {ANALYZER_ATTRIBUTES.map((attr) => {
              const row = accuracy.get(attr.id)
              if (!row) return null
              const pct = Math.round((row.right / row.total) * 100)
              return (
                <li key={attr.id}>
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">{attr.label}</span>
                    <span className="tabular-nums text-ink-soft">
                      {pct}% &middot; {row.right}/{row.total}
                    </span>
                  </div>
                  <ProgressBar
                    value={row.right}
                    max={row.total}
                    className="mt-1"
                    label={`${attr.label} accuracy`}
                  />
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
