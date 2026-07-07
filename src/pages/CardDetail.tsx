import { Link, useNavigate, useParams } from 'react-router-dom'
import { CARD_BY_ID, MODULE_BY_ID } from '../content'
import { Illustration } from '../components/Illustration'
import { Button, MoodChip } from '../components/ui'

export function CardDetail() {
  const { cardId } = useParams()
  const navigate = useNavigate()
  const card = cardId ? CARD_BY_ID.get(cardId) : undefined

  if (!card) {
    return (
      <div className="animate-fade-up py-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">That card doesn’t exist.</p>
        <Link to="/library" className="mt-4 inline-block">
          <Button>Back to Library</Button>
        </Link>
      </div>
    )
  }

  const module = MODULE_BY_ID.get(card.module)!
  const related = card.relatedCardIds
    .map((id) => CARD_BY_ID.get(id))
    .filter((c) => c !== undefined)

  return (
    <div className="animate-fade-up mx-auto max-w-2xl space-y-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-base font-medium text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M12.7 15.3 7.4 10l5.3-5.3 1.2 1.2L9.8 10l4.1 4.1-1.2 1.2z" />
        </svg>
        Back
      </button>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <Illustration cardId={card.id} className="rounded-b-none" />
        <div className="space-y-4 p-6">
          <div>
            <Link
              to={`/library?module=${module.id}`}
              className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent"
            >
              {module.title}
            </Link>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">{card.name}</h1>
            <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-300">{card.shortDefinition}</p>
          </div>

          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{card.explanation}</p>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Common moods
            </h2>
            <div className="flex flex-wrap gap-2">
              {card.moodTags.map((mood) => (
                <Link key={mood} to={`/library?mood=${mood}`}>
                  <MoodChip mood={mood} />
                </Link>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                See also
              </h2>
              <div className="grid gap-2 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/library/${r.id}`}
                    className="rounded-lg border border-zinc-200 p-3 transition-colors duration-150 hover:border-accent-strong/50 dark:border-zinc-700 dark:hover:border-accent/50"
                  >
                    <span className="text-sm font-semibold">{r.name}</span>
                    <p className="mt-0.5 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
                      {r.shortDefinition}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
