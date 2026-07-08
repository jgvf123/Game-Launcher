import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RECIPES, RECIPE_USECASE_LABEL } from '../../lab/recipes'
import { MODEL_BY_ID } from '../../lab/models'
import type { Recipe } from '../../lab/types'
import { AnnotatedPrompt, CopyButton } from './components'
import { Button } from '../../components/ui'

const USECASES = Object.keys(RECIPE_USECASE_LABEL) as Recipe['useCase'][]

export function LabRecipes() {
  const navigate = useNavigate()
  const [typeFilter, setTypeFilter] = useState<'all' | 'still' | 'video'>('all')
  const [useCaseFilter, setUseCaseFilter] = useState<Recipe['useCase'] | null>(null)
  const [modelFilter, setModelFilter] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const recipes = useMemo(() => {
    const q = query.trim().toLowerCase()
    return RECIPES.filter((r) => {
      if (typeFilter !== 'all' && r.type !== typeFilter) return false
      if (useCaseFilter && r.useCase !== useCaseFilter) return false
      if (modelFilter && !r.models.includes(modelFilter)) return false
      if (q && !r.title.toLowerCase().includes(q) && !r.prompt.toLowerCase().includes(q))
        return false
      return true
    })
  }, [typeFilter, useCaseFilter, modelFilter, query])

  const allModels = useMemo(() => [...new Set(RECIPES.flatMap((r) => r.models))], [])

  const remix = (r: Recipe) => {
    // Heuristic slot split: first clause → subject, rest → detail.
    const cut = r.prompt.indexOf(',')
    const subject = cut === -1 ? r.prompt : r.prompt.slice(0, cut)
    const detail = cut === -1 ? '' : r.prompt.slice(cut + 1).trim()
    sessionStorage.setItem(
      'fs.lab.remix',
      JSON.stringify({ mode: r.type === 'video' ? 'video' : 'image', subject, detail, title: r.title }),
    )
    navigate('/lab/builder')
  }

  return (
    <div className="space-y-5">
      <p className="text-zinc-500 dark:text-zinc-400">
        {RECIPES.filter((r) => r.type === 'still').length} still +{' '}
        {RECIPES.filter((r) => r.type === 'video').length} video recipes — copy as-is, tap
        highlights to learn why each token is there, or remix in the Builder.
      </p>

      <div className="space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes…"
          aria-label="Search recipes"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-base placeholder:text-zinc-400 focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500"
        />
        <div className="flex flex-wrap gap-2">
          {(['all', 'still', 'video'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              aria-pressed={typeFilter === t}
              className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${
                typeFilter === t
                  ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
          <span className="mx-1 self-center text-zinc-300 dark:text-zinc-700">·</span>
          {USECASES.map((uc) => (
            <button
              key={uc}
              type="button"
              onClick={() => setUseCaseFilter(useCaseFilter === uc ? null : uc)}
              aria-pressed={useCaseFilter === uc}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                useCaseFilter === uc
                  ? 'bg-accent-strong text-white'
                  : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {RECIPE_USECASE_LABEL[uc]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {allModels.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModelFilter(modelFilter === m ? null : m)}
              aria-pressed={modelFilter === m}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                modelFilter === m
                  ? 'bg-accent-strong text-white'
                  : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800/70 dark:text-zinc-400'
              }`}
            >
              {MODEL_BY_ID.get(m)?.name ?? m}
            </button>
          ))}
        </div>
      </div>

      {recipes.length === 0 ? (
        <p className="py-10 text-center text-zinc-500 dark:text-zinc-400">
          Nothing matches — widen the filters.
        </p>
      ) : (
        <div className="space-y-4">
          {recipes.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold">{r.title}</h2>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {r.type === 'video' ? 'video' : 'still'} · {RECIPE_USECASE_LABEL[r.useCase]}
                  </span>
                </div>
                <div className="flex gap-2">
                  <CopyButton text={r.prompt} small />
                  <Button
                    variant="ghost"
                    className="!px-2.5 !py-1 !text-xs"
                    onClick={() => remix(r)}
                  >
                    Remix in Builder
                  </Button>
                </div>
              </div>
              <div className="mt-3">
                <AnnotatedPrompt prompt={r.prompt} annotations={r.annotations} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                <span>Suits:</span>
                {r.models.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {MODEL_BY_ID.get(m)?.name ?? m}
                  </span>
                ))}
                <span className="mx-1">·</span>
                {r.moodTags.map((t) => (
                  <span key={t} className="capitalize">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
