import { Link } from 'react-router-dom'
import {
  CURRICULUM_SCOPE,
  LESSON_BY_ID,
  LESSON_SEQUENCE,
  REVIEW_ITEMS,
  TRACK_BY_ID,
} from '../curriculum'
import { useLessonProgress, useShipLog } from '../data/hooks'
import { effectiveStreak, useAppState } from '../lib/state'
import { isDue } from '../lib/srs'
import { ButtonLink, ProgressBar } from '../components/ui'

function Stat({
  label,
  value,
  sub,
  to,
  accent = false,
}: {
  label: string
  value: string | number
  sub: string
  to?: string
  accent?: boolean
}) {
  const body = (
    <>
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <p
        className={`mt-1 text-3xl font-bold ${accent ? 'text-accent-strong dark:text-accent' : ''}`}
      >
        {value}
      </p>
      <p className="mt-1 text-sm leading-snug text-zinc-500 dark:text-zinc-400">{sub}</p>
    </>
  )
  const className =
    'block rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900'
  if (!to) return <div className={className}>{body}</div>
  return (
    <Link
      to={to}
      className={`${className} transition-colors hover:border-accent-strong/50 dark:hover:border-accent/50`}
    >
      {body}
    </Link>
  )
}

export function Home() {
  const { reviews, streak } = useAppState()
  const progress = useLessonProgress()
  const shipLog = useShipLog()

  const shipped = new Set(shipLog.map((r) => r.lessonId))
  const days = effectiveStreak(streak)

  // Everything due across lesson checks, glossary terms and the v1 cards.
  const dueCount = REVIEW_ITEMS.filter((i) => isDue(reviews[i.id])).length

  // Today's lesson: the first one in curriculum order you have not shipped.
  const todaysLesson = LESSON_SEQUENCE.find((l) => !shipped.has(l.id))

  // Assignments started but never shipped — the honest backlog.
  const owed = LESSON_SEQUENCE.filter((l) => progress.has(l.id) && !shipped.has(l.id))

  // Weak areas: lessons whose review items were last answered wrong.
  const weakByLesson = new Map<string, number>()
  for (const item of REVIEW_ITEMS) {
    const state = reviews[item.id]
    const last = state?.history[state.history.length - 1]
    if (!last || last.rating !== 0) continue
    if (!LESSON_BY_ID.has(item.lessonId)) continue
    weakByLesson.set(item.lessonId, (weakByLesson.get(item.lessonId) ?? 0) + 1)
  }
  const weakAreas = [...weakByLesson.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)

  const firstTime = progress.size === 0 && shipLog.length === 0

  return (
    <div className="animate-fade-up space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {firstTime ? 'Frame School' : 'Today'}
        </h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Learn the craft of filmmaking — then learn how every part of it is executed when your
          camera is a diffusion model.
        </p>
      </header>

      {firstTime ? (
        <section className="rounded-2xl border-2 border-accent-strong/40 bg-accent-soft/40 p-6 dark:border-accent/30 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold">Shuru yahan se karo</h2>
          <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
            Har lesson do baar padhaata hai — ek baar jaise asli set pe kaam hota hai, aur ek baar
            jaise AI pipeline me hota hai. Har lesson ke end me ek cheez banani hoti hai, timer ke
            saath. Padhna kaafi nahi — banana zaroori hai.
          </p>
          {todaysLesson ? (
            <div className="mt-5">
              <ButtonLink to={`/lesson/${todaysLesson.id}`} variant="primary">
                Pehla lesson kholo &middot; {todaysLesson.title}
              </ButtonLink>
            </div>
          ) : null}
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-3">
          <Stat
            label="Due for review"
            value={dueCount}
            accent
            to="/review"
            sub={dueCount > 0 ? 'lesson checks, terms and cards' : 'all caught up'}
          />
          <Stat
            label="Shipped"
            value={shipLog.length}
            to="/ship-log"
            sub={shipLog.length > 0 ? 'things you actually made' : 'nothing finished yet'}
          />
          <Stat
            label="Streak"
            value={`${days} day${days === 1 ? '' : 's'}`}
            sub={days > 0 ? 'keep it going' : 'one session starts it'}
          />
        </section>
      )}

      {/* Today's lesson — the main call to action once you are past day one. */}
      {todaysLesson && !firstTime ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
            Next lesson
          </p>
          <h2 className="mt-1 text-lg font-bold leading-tight">{todaysLesson.title}</h2>
          <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">{todaysLesson.oneLine}</p>
          <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
            {TRACK_BY_ID.get(todaysLesson.trackId)?.title} &middot; {todaysLesson.estMinutes} min
            read, then {todaysLesson.assignment.timeboxMinutes} min of work
          </p>
          <ButtonLink to={`/lesson/${todaysLesson.id}`} variant="primary" className="mt-4">
            {progress.has(todaysLesson.id) ? 'Continue' : 'Start'}
          </ButtonLink>
        </section>
      ) : null}

      {/* Assignments you owe yourself. */}
      {owed.length > 0 ? (
        <section>
          <h2 className="mb-3 text-lg font-semibold">
            Assignments waiting{' '}
            <span className="font-normal text-zinc-500 dark:text-zinc-400">({owed.length})</span>
          </h2>
          <ul className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            {owed.slice(0, 4).map((lesson) => (
              <li key={lesson.id}>
                <Link
                  to={`/lesson/${lesson.id}`}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent-soft/40 dark:hover:bg-zinc-800/70"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium leading-tight">{lesson.title}</span>
                    <span className="block text-sm text-zinc-500 dark:text-zinc-400">
                      {lesson.assignment.deliverable}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-strong dark:bg-zinc-800 dark:text-accent">
                    {lesson.assignment.timeboxMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Weak areas — the feedback a junior never gets. */}
      {weakAreas.length > 0 ? (
        <section className="rounded-2xl border border-red-300/60 bg-red-50/60 p-5 dark:border-red-900/50 dark:bg-red-950/20">
          <h2 className="text-lg font-semibold">Weak spots</h2>
          <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            Recall you got wrong most recently. Re-read these before the next review.
          </p>
          <ul className="mt-3 space-y-1.5">
            {weakAreas.map(([lessonId, count]) => {
              const lesson = LESSON_BY_ID.get(lessonId)
              if (!lesson) return null
              return (
                <li key={lessonId}>
                  <Link
                    to={`/lesson/${lessonId}`}
                    className="font-medium text-accent-strong hover:underline dark:text-accent"
                  >
                    {lesson.title}
                  </Link>
                  <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {count} missed
                  </span>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}

      {/* Curriculum progress. */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold">The curriculum</h2>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {shipped.size} shipped &middot; {CURRICULUM_SCOPE.written} lessons written of{' '}
            {CURRICULUM_SCOPE.planned} planned
          </span>
        </div>
        <ProgressBar
          value={shipped.size}
          max={CURRICULUM_SCOPE.written}
          className="mt-3"
          label="Lessons shipped"
        />
        <p className="mt-3 text-sm leading-snug text-zinc-500 dark:text-zinc-400">
          Ten tracks: story, script, camera, light, color, editing, sound, how production runs, AI
          filmmaking, and the business. Lessons ship complete or not at all — a module you have
          not seen yet is empty on purpose, never filled with stubs.
        </p>
        <ButtonLink to="/tracks" className="mt-4">
          Browse all tracks
        </ButtonLink>
      </section>

      {/* v1 surfaces, kept and clearly secondary. */}
      <section>
        <h2 className="mb-1 text-lg font-semibold">Also in here</h2>
        <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
          The original Frame School tools — still useful, still holding your old progress.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { to: '/library', title: 'Library', sub: '57 illustrated concept cards' },
            { to: '/lab', title: 'Prompt Lab', sub: 'Annotated prompts, recipes, model notes' },
            { to: '/drills', title: 'Director’s Eye', sub: 'Quick scenario drills' },
            { to: '/storyboard', title: 'Storyboard', sub: 'Build a story beat by beat' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-accent-strong/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent/50"
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{item.sub}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
