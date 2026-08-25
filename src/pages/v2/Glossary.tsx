import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { LESSON_BY_ID, TERMS, TRACKS, TRACK_BY_ID } from '../../curriculum'
import type { TrackId } from '../../curriculum'
import { EmptyState } from '../../components/ui'

export function Glossary() {
  const [params] = useSearchParams()
  const highlighted = params.get('term')
  const [query, setQuery] = useState('')
  const [track, setTrack] = useState<TrackId | 'all'>('all')

  const tracksWithTerms = useMemo(
    () => TRACKS.filter((t) => TERMS.some((term) => term.trackId === t.id)),
    [],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TERMS.filter((t) => {
      if (track !== 'all' && t.trackId !== track) return false
      if (!q) return true
      return (
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.hinglish.toLowerCase().includes(q) ||
        t.aliases.some((a) => a.toLowerCase().includes(q))
      )
    }).sort((a, b) => a.term.localeCompare(b.term))
  }, [query, track])

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Glossary</h1>
      <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
        Every term the lessons put in bold, in English and in Hinglish, linked back to the lesson
        that teaches it. {TERMS.length} terms so far.
      </p>

      <div className="mt-4 space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a term, a definition, or the Hinglish…"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong dark:border-zinc-700 dark:bg-zinc-900"
        />
        <div className="flex flex-wrap gap-1.5">
          {(['all', ...tracksWithTerms.map((t) => t.id)] as (TrackId | 'all')[]).map((id) => {
            const active = id === track
            const label = id === 'all' ? 'All' : (TRACK_BY_ID.get(id)?.title ?? id)
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setTrack(id)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-accent-strong text-white'
                    : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No match">
            Nothing in the glossary matches that yet.
          </EmptyState>
        </div>
      ) : (
        <dl className="mt-5 space-y-3">
          {results.map((term) => {
            const lesson = LESSON_BY_ID.get(term.taughtIn)
            const isHighlighted = term.id === highlighted
            return (
              <div
                key={term.id}
                id={term.id}
                className={`rounded-xl border p-4 ${
                  isHighlighted
                    ? 'border-accent-strong bg-accent-soft/40 dark:bg-zinc-900'
                    : 'border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900'
                }`}
              >
                <dt className="flex flex-wrap items-baseline gap-2">
                  <span className="text-lg font-semibold">{term.term}</span>
                  <span className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    {TRACK_BY_ID.get(term.trackId)?.title}
                  </span>
                </dt>
                <dd className="mt-1.5 text-base leading-relaxed">{term.definition}</dd>
                <dd className="mt-2 rounded-lg bg-accent-soft/60 px-3 py-2 text-base leading-relaxed text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {term.hinglish}
                </dd>
                {lesson ? (
                  <dd className="mt-2">
                    <Link
                      to={`/lesson/${lesson.id}`}
                      className="text-sm font-medium text-accent-strong hover:underline dark:text-accent"
                    >
                      Taught in: {lesson.title} &rarr;
                    </Link>
                  </dd>
                ) : null}
                {term.seeAlso.length > 0 ? (
                  <dd className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                    See also:{' '}
                    {term.seeAlso.map((id, i) => (
                      <span key={id}>
                        {i > 0 ? ', ' : ''}
                        <Link to={`/glossary?term=${id}`} className="hover:underline">
                          {id.replace(/-/g, ' ')}
                        </Link>
                      </span>
                    ))}
                  </dd>
                ) : null}
              </div>
            )
          })}
        </dl>
      )}
    </div>
  )
}
