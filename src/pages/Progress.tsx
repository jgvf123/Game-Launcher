import { MODULES, MODULE_BY_ID } from '../content'
import { QuizChart } from '../components/QuizChart'
import { ButtonLink, EmptyState, MasteredBadge, ProgressBar } from '../components/ui'
import { allModuleProgress, effectiveStreak, useAppState, type QuizRecord } from '../lib/state'

function scopeShort(q: QuizRecord): string {
  if (q.scope.kind === 'all') return 'Full test'
  if (q.scope.kind === 'module') return MODULE_BY_ID.get(q.scope.moduleId)?.title ?? 'Module'
  return `Mood: ${q.scope.mood}`
}

export function Progress() {
  const { reviews, quizzes, streak } = useAppState()
  const progress = allModuleProgress(reviews, quizzes)
  const totalCards = progress.reduce((n, p) => n + p.total, 0)
  const masteredCards = progress.reduce((n, p) => n + p.mastered, 0)
  const masteredModules = progress.filter((p) => p.quizMastered).length
  const days = effectiveStreak(streak)
  const empty = quizzes.length === 0 && progress.every((p) => p.studied === 0)

  if (empty) {
    return (
      <div className="animate-fade-up space-y-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Progress</h1>
        </header>
        <EmptyState
          title="Nothing to chart yet"
          action={
            <ButtonLink to="/study" variant="primary">
              Start studying
            </ButtonLink>
          }
        >
          Study a few cards or take a test and your progress will start showing up here.
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Progress</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          A quiet overview of where your study stands.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Modules mastered</p>
          <p className="mt-1 text-3xl font-bold">
            {masteredModules}
            <span className="text-base font-medium text-zinc-500"> / {MODULES.length}</span>
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Cards mastered</p>
          <p className="mt-1 text-3xl font-bold">
            {masteredCards}
            <span className="text-base font-medium text-zinc-500"> / {totalCards}</span>
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Current streak</p>
          <p className="mt-1 text-3xl font-bold">
            {days}
            <span className="text-base font-medium text-zinc-500"> day{days === 1 ? '' : 's'}</span>
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Longest streak</p>
          <p className="mt-1 text-3xl font-bold">
            {streak.longestStreak}
            <span className="text-base font-medium text-zinc-500">
              {' '}
              day{streak.longestStreak === 1 ? '' : 's'}
            </span>
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">By module</h2>
        <div className="space-y-3">
          {progress.map((p) => {
            const m = MODULE_BY_ID.get(p.moduleId)!
            return (
              <div
                key={p.moduleId}
                className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{m.title}</h3>
                    {p.quizMastered && <MasteredBadge />}
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {p.bestQuizPct !== null
                      ? `best test ${Math.round(p.bestQuizPct)}%`
                      : 'no tests yet'}
                  </span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="mb-1 flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                      <span>Studied</span>
                      <span>
                        {p.studied}/{p.total}
                      </span>
                    </div>
                    <ProgressBar value={p.studied} max={p.total} label={`${m.title} studied`} />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                      <span>Mastered</span>
                      <span>
                        {p.mastered}/{p.total}
                      </span>
                    </div>
                    <ProgressBar value={p.mastered} max={p.total} label={`${m.title} mastered`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Quiz history</h2>
        {quizzes.length === 0 ? (
          <EmptyState
            title="No tests yet"
            action={
              <ButtonLink to="/test" variant="primary">
                Take your first test
              </ButtonLink>
            }
          >
            Your scores will chart here once you take a test. The dashed line marks the 80%
            mastery threshold.
          </EmptyState>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <QuizChart quizzes={quizzes} />
            <ul className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
              {[...quizzes]
                .slice(-5)
                .reverse()
                .map((q) => (
                  <li key={q.id} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                    <span className="font-medium">{scopeShort(q)}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {new Date(q.date).toLocaleDateString()} ·{' '}
                      <strong className="text-zinc-700 dark:text-zinc-200">
                        {q.total ? Math.round((q.score / q.total) * 100) : 0}%
                      </strong>{' '}
                      ({q.score}/{q.total})
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  )
}
