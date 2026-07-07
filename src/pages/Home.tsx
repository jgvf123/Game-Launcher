import { Link } from 'react-router-dom'
import { MODULES } from '../content'
import {
  allModuleProgress,
  dueCardIds,
  effectiveStreak,
  newCardIds,
  useAppState,
} from '../lib/state'
import { ButtonLink, ProgressBar } from '../components/ui'

export function Home() {
  const { reviews, quizzes, streak } = useAppState()
  const due = dueCardIds(reviews)
  const fresh = newCardIds(reviews)
  const progress = allModuleProgress(reviews, quizzes)
  const studiedTotal = progress.reduce((n, p) => n + p.studied, 0)
  const cardTotal = progress.reduce((n, p) => n + p.total, 0)
  const days = effectiveStreak(streak)
  const firstTime = studiedTotal === 0 && quizzes.length === 0

  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {firstTime ? 'Welcome to Frame School' : 'Welcome back'}
        </h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          {firstTime
            ? 'A quiet place to learn the visual grammar of filmmaking.'
            : 'Here is where your study stands today.'}
        </p>
      </header>

      {firstTime ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold">Start here</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-zinc-600 dark:text-zinc-300">
            <li>
              Browse the <strong>Library</strong> to read through a module — Shot Sizes is a
              great first pick.
            </li>
            <li>
              Open <strong>Study</strong> to drill those cards as flashcards. Your ratings
              schedule future reviews automatically.
            </li>
            <li>
              When a module feels familiar, take a <strong>Test</strong> — score 80% or more to
              earn its mastered badge.
            </li>
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink to="/library" variant="primary">
              Browse the Library
            </ButtonLink>
            <ButtonLink to="/study">Start studying</ButtonLink>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Due for review</p>
            <p className="mt-1 text-3xl font-bold text-accent-strong">{due.length}</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {due.length > 0
                ? 'cards are ready when you are'
                : fresh.length > 0
                  ? 'all caught up — learn something new?'
                  : 'all caught up'}
            </p>
            <ButtonLink to="/study" variant="primary" className="mt-3 w-full">
              {due.length > 0 ? 'Review now' : 'Study'}
            </ButtonLink>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Study streak</p>
            <p className="mt-1 text-3xl font-bold">
              {days} <span className="text-base font-medium text-zinc-500">day{days === 1 ? '' : 's'}</span>
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {days > 0 ? 'nice and steady' : 'a single session starts one'}
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Cards studied</p>
            <p className="mt-1 text-3xl font-bold">
              {studiedTotal}
              <span className="text-base font-medium text-zinc-500"> / {cardTotal}</span>
            </p>
            <ProgressBar value={studiedTotal} max={cardTotal} className="mt-3" label="Cards studied" />
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Direct scenes yourself</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              Build storyboards beat by beat, or take quick Director’s Eye drills — pick the
              angle or movement a scene needs and collect the principle behind it.
            </p>
          </div>
          <div className="flex gap-2">
            <ButtonLink to="/drills">Scene drills</ButtonLink>
            <ButtonLink to="/storyboard">Storyboard</ButtonLink>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Modules</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODULES.map((m) => {
            const p = progress.find((x) => x.moduleId === m.id)!
            return (
              <Link
                key={m.id}
                to={`/library?module=${m.id}`}
                className="group rounded-xl border border-zinc-200 bg-white p-4 transition-colors duration-150 hover:border-accent-strong/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent/50"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold group-hover:text-accent-strong dark:group-hover:text-accent">
                    {m.title}
                  </h3>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {p.studied}/{p.total}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">{m.tagline}</p>
                <ProgressBar value={p.studied} max={p.total} className="mt-3" label={`${m.title} studied`} />
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
