import { Link } from 'react-router-dom'
import { LESSON_SEQUENCE, REVIEW_ITEMS } from '../curriculum'
import { useLessonProgress, useShipLog } from '../data/hooks'
import { useAppState } from '../lib/state'
import { isDue } from '../lib/srs'
import { LessonPath } from '../components/LessonPath'
import { PillLink } from '../components/ui'

/**
 * Start here, and know where "here" is.
 *
 * One action, but never without orientation: which track and module you are
 * inside, which lesson of how many, and what the loop of a lesson actually
 * is. Every tappable thing on this page is a real button — the previous
 * version left them as bare text and they read as decoration.
 */
export function Home() {
  const { reviews } = useAppState()
  const progress = useLessonProgress()
  const shipLog = useShipLog()

  const shipped = new Set(shipLog.map((r) => r.lessonId))
  const lesson = LESSON_SEQUENCE.find((l) => !shipped.has(l.id))
  const started = lesson ? progress.has(lesson.id) : false
  const dueCount = REVIEW_ITEMS.filter((i) => isDue(reviews[i.id])).length
  const owed = LESSON_SEQUENCE.filter((l) => progress.has(l.id) && !shipped.has(l.id)).length
  const firstTime = progress.size === 0 && shipLog.length === 0

  return (
    <div className="animate-fade-up">
      {lesson ? (
        <section className="pt-2 sm:pt-8">
          <LessonPath lesson={lesson} shipped={shipped} />

          <p className="mt-8 text-sm font-medium text-accent-strong dark:text-accent">
            {started ? 'Jahan chhoda tha' : firstTime ? 'Yahan se shuru karo' : 'Agla lesson'}
          </p>
          <h1 className="mt-1.5 text-[1.7rem] font-bold leading-[1.2] tracking-tight sm:text-[2rem]">
            {lesson.title}
          </h1>
          <p className="reading mt-3 max-w-[34rem] text-ink-soft">{lesson.oneLine}</p>

          <Link
            to={`/lesson/${lesson.id}`}
            className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-accent-strong px-6 py-4 text-base font-semibold text-white transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            {started ? 'Ye lesson jaari rakho' : 'Ye lesson shuru karo'}
          </Link>

          <p className="mt-3 text-sm text-ink-faint">
            {lesson.estMinutes} min padhna &middot; {lesson.assignment.timeboxMinutes} min banana
          </p>
        </section>
      ) : (
        <section className="pt-2 sm:pt-8">
          <h1 className="text-[1.7rem] font-bold leading-tight tracking-tight">
            Jo likha tha, sab ship ho gaya.
          </h1>
          <p className="reading mt-3 max-w-[34rem] text-ink-soft">
            Abhi queue me kuch nahi bacha. Jo aata hai use dohrao, ya jaake kuch banao.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PillLink to="/review">Dohrao</PillLink>
            <PillLink to="/practice">Banao</PillLink>
          </div>
        </section>
      )}

      {/* What a lesson actually is — shown until the first one is finished. */}
      {firstTime ? (
        <section className="mt-10 max-w-[34rem] rounded-2xl bg-surface p-5">
          <p className="font-semibold">Ye app kaise chalti hai</p>
          <ol className="reading mt-3 space-y-2 text-ink-soft">
            <li>
              <span className="font-semibold text-ink">1.</span> Ek lesson kholo. Wo chhote steps me
              chalta hai — padho, diagram ghumao, teen sawaal, aur ek cheez banao.
            </li>
            <li>
              <span className="font-semibold text-ink">2.</span> Har step pe neeche ek hi button
              hota hai: <span className="font-semibold text-ink">Continue</span>. Bas wahi dabate
              jao.
            </li>
            <li>
              <span className="font-semibold text-ink">3.</span> Lesson khatam hone par agla lesson
              apne aap khul jaata hai. Upar ke daane batate hain tum kahan ho.
            </li>
          </ol>
        </section>
      ) : null}

      {/* Real buttons, not text that looks like prose. */}
      <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
        {dueCount > 0 ? (
          <PillLink to="/review" count={dueCount}>
            review ke liye baaki
          </PillLink>
        ) : null}
        {owed > 0 ? (
          <PillLink to="/practice" count={owed}>
            kaam banana baaki
          </PillLink>
        ) : null}
        <PillLink to="/tracks">Poora curriculum dekho</PillLink>
      </div>
    </div>
  )
}
