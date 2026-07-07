import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ALL_MOODS, CARDS, MODULES } from '../content'
import type { ModuleId, Mood } from '../content'
import { Illustration } from '../components/Illustration'
import { MoodChip } from '../components/ui'

export function Library() {
  const [params, setParams] = useSearchParams()
  const moduleFilter = (params.get('module') as ModuleId | null) ?? null
  const moodFilter = (params.get('mood') as Mood | null) ?? null
  const [query, setQuery] = useState('')

  const cards = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CARDS.filter((c) => {
      if (moduleFilter && c.module !== moduleFilter) return false
      if (moodFilter && !c.moodTags.includes(moodFilter)) return false
      if (q && !c.name.toLowerCase().includes(q) && !c.shortDefinition.toLowerCase().includes(q))
        return false
      return true
    })
  }, [moduleFilter, moodFilter, query])

  const setModule = (id: ModuleId | null) => {
    const next = new URLSearchParams(params)
    if (id) next.set('module', id)
    else next.delete('module')
    setParams(next, { replace: true })
  }
  const setMood = (mood: Mood | null) => {
    const next = new URLSearchParams(params)
    if (mood) next.set('mood', mood)
    else next.delete('mood')
    setParams(next, { replace: true })
  }

  const grouped = MODULES.map((m) => ({
    module: m,
    cards: cards.filter((c) => c.module === m.id),
  })).filter((g) => g.cards.length > 0)

  return (
    <div className="animate-fade-up space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Library</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Browse every concept, or filter by module and mood.
        </p>
      </header>

      <div className="space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search names and definitions…"
          aria-label="Search cards"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-base placeholder:text-zinc-400 focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by module">
          <button
            type="button"
            onClick={() => setModule(null)}
            aria-pressed={moduleFilter === null}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors duration-150 ${
              moduleFilter === null
                ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            All modules
          </button>
          {MODULES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setModule(moduleFilter === m.id ? null : m.id)}
              aria-pressed={moduleFilter === m.id}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors duration-150 ${
                moduleFilter === m.id
                  ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by mood">
          {ALL_MOODS.map((mood) => (
            <MoodChip
              key={mood}
              mood={mood}
              active={moodFilter === mood}
              onClick={() => setMood(moodFilter === mood ? null : mood)}
            />
          ))}
        </div>
      </div>

      {grouped.length === 0 ? (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          Nothing matches those filters — try widening the search.
        </p>
      ) : (
        grouped.map(({ module: m, cards: moduleCards }) => (
          <section key={m.id}>
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className="text-lg font-semibold">{m.title}</h2>
              <span className="text-sm text-zinc-400">{moduleCards.length} cards</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {moduleCards.map((card) => (
                <Link
                  key={card.id}
                  to={`/library/${card.id}`}
                  className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-150 hover:-translate-y-0.5 hover:border-accent-strong/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent/50"
                >
                  <Illustration cardId={card.id} className="rounded-b-none" />
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-accent-strong dark:group-hover:text-accent">
                      {card.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {card.shortDefinition}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
