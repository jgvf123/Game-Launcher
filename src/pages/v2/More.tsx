import { Link } from 'react-router-dom'
import { CURRICULUM_SCOPE, TERMS } from '../../curriculum'
import { useShipLog } from '../../data/hooks'

/**
 * Everything that is real but not part of the daily loop.
 *
 * These used to sit in the main rail alongside Learn and Review, which made
 * the app look like a control panel. Nothing has been removed — it is just no
 * longer shouting.
 */
function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9 first:mt-0">
      <h2 className="text-sm text-ink-faint">{title}</h2>
      <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl bg-surface">
        {children}
      </ul>
    </section>
  )
}

function Row({ to, title, sub }: { to: string; title: string; sub: string }) {
  return (
    <li>
      <Link to={to} className="block px-5 py-4 transition-colors hover:bg-paper">
        <span className="block font-medium">{title}</span>
        <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{sub}</span>
      </Link>
    </li>
  )
}

export function More() {
  const shipLog = useShipLog()

  return (
    <div className="animate-fade-up">
      <h1 className="text-[1.6rem] font-bold tracking-tight">More</h1>

      <div className="mt-8">
        <Group title="The curriculum">
          <Row
            to="/tracks"
            title="All tracks"
            sub={`Ten tracks · ${CURRICULUM_SCOPE.written} lessons written of ${CURRICULUM_SCOPE.planned} planned`}
          />
          <Row
            to="/glossary"
            title="Glossary"
            sub={`${TERMS.length} terms, in English and Hinglish`}
          />
          <Row
            to="/ship-log"
            title="Ship Log"
            sub={
              shipLog.length > 0
                ? `${shipLog.length} finished — the only count that matters`
                : 'Nothing finished yet'
            }
          />
        </Group>

        <Group title="Reference & drills">
          <Row to="/library" title="Card library" sub="57 illustrated concept cards" />
          <Row to="/study" title="Flashcards" sub="Diagram on the front, answer on the back" />
          <Row to="/test" title="Mixed test" sub="Quiz yourself across a module or everything" />
          <Row to="/drills" title="Director’s Eye" sub="Quick graded scenario drills" />
          <Row to="/storyboard" title="Storyboard mode" sub="Direct a story beat by beat" />
          <Row to="/lab" title="Prompt Lab" sub="Annotated prompts, recipes, model notes" />
        </Group>

        <Group title="You">
          <Row to="/progress" title="Progress" sub="Modules, streaks and quiz history" />
          <Row to="/settings" title="Settings" sub="Theme, language, export and import your data" />
        </Group>
      </div>
    </div>
  )
}
