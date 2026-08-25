import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { PROJECT_STAGES } from '../../curriculum/projectStages'
import { db, type ProjectRow } from '../../data/db'
import { Button, EmptyState, ProgressBar } from '../../components/ui'

function itemKey(stageId: string, index: number) {
  return `${stageId}:${index}`
}

function stageComplete(project: ProjectRow, stageIndex: number): boolean {
  const stage = PROJECT_STAGES[stageIndex]
  return stage.checklist.every((_, i) => project.checklist[itemKey(stage.id, i)])
}

/** The first stage whose checklist is not finished — everything after it is locked. */
function currentStageIndex(project: ProjectRow): number {
  for (let i = 0; i < PROJECT_STAGES.length; i++) {
    if (!stageComplete(project, i)) return i
  }
  return PROJECT_STAGES.length
}

function ProjectCard({ project }: { project: ProjectRow }) {
  const [open, setOpen] = useState(false)
  const current = currentStageIndex(project)
  const done = current
  const finished = current >= PROJECT_STAGES.length
  const activeIndex = Math.min(current, PROJECT_STAGES.length - 1)

  /**
   * Read-modify-write inside a transaction. Ticking several boxes quickly
   * would otherwise merge each change onto a stale copy of the checklist and
   * silently undo the previous tick.
   */
  async function toggle(stageId: string, index: number, value: boolean) {
    await db.transaction('rw', db.projects, async () => {
      const row = await db.projects.get(project.id!)
      if (!row) return
      const checklist = { ...row.checklist, [itemKey(stageId, index)]: value }
      const next = { ...row, checklist }
      const reached = currentStageIndex(next)
      await db.projects.update(project.id!, {
        checklist,
        updatedAt: new Date().toISOString(),
        stage: PROJECT_STAGES[Math.min(reached, PROJECT_STAGES.length - 1)].id,
      })
    })
  }

  return (
    <div className="rounded-xl bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight">{project.title}</h2>
          <p className="mt-0.5 text-sm text-ink-soft">
            {finished ? (
              <span className="font-semibold text-green-700 dark:text-green-400">
                Delivered — every gate passed.
              </span>
            ) : (
              <>
                Stage {current + 1} of {PROJECT_STAGES.length}:{' '}
                <span className="font-semibold text-accent-strong dark:text-accent">
                  {PROJECT_STAGES[current].title}
                </span>
              </>
            )}
          </p>
        </div>
        <Button className="px-3 py-1 text-sm" onClick={() => setOpen((v) => !v)}>
          {open ? 'Hide' : 'Open'}
        </Button>
      </div>

      <ProgressBar
        value={done}
        max={PROJECT_STAGES.length}
        className="mt-3"
        label={`${project.title} progress`}
      />

      {/* Stage rail */}
      <ol className="mt-3 flex flex-wrap gap-1.5">
        {PROJECT_STAGES.map((stage, i) => {
          const complete = i < current
          const isCurrent = i === current
          return (
            <li
              key={stage.id}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                complete
                  ? 'bg-accent-strong text-white'
                  : isCurrent
                    ? 'bg-accent-soft text-accent-strong dark:bg-surface dark:text-accent'
                    : 'bg-surface text-ink-faint'
              }`}
            >
              {complete ? '✓ ' : isCurrent ? '' : '🔒 '}
              {stage.title}
            </li>
          )
        })}
      </ol>

      {open ? (
        <div className="mt-4 space-y-3">
          {PROJECT_STAGES.map((stage, i) => {
            const locked = i > current
            const complete = i < current
            return (
              <section
                key={stage.id}
                className={`rounded-lg border p-3 ${
                  locked
                    ? 'border-dashed border-line opacity-55'
                    : complete
                      ? 'border-green-500/50 bg-green-50/40 dark:bg-green-950/20'
                      : 'border-accent-strong/40 bg-accent-soft/40 dark:border-accent/30 dark:bg-surface'
                }`}
              >
                <h3 className="flex flex-wrap items-baseline gap-2 font-semibold">
                  <span>
                    {i + 1}. {stage.title}
                  </span>
                  {locked ? (
                    <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                      locked
                    </span>
                  ) : null}
                </h3>
                <p className="mt-0.5 text-sm text-ink-soft">{stage.hinglish}</p>

                {locked ? (
                  <p className="mt-1.5 text-sm text-ink-soft">
                    Finish {PROJECT_STAGES[activeIndex].title} first. That is the whole point.
                  </p>
                ) : (
                  <>
                    <p className="mt-1.5 text-sm leading-snug text-ink-soft">{stage.why}</p>
                    <ul className="mt-2 space-y-1.5">
                      {stage.checklist.map((item, index) => (
                        <li key={index}>
                          <label className="flex cursor-pointer items-start gap-2 text-base leading-snug">
                            <input
                              type="checkbox"
                              checked={Boolean(project.checklist[itemKey(stage.id, index)])}
                              onChange={(e) => void toggle(stage.id, index, e.target.checked)}
                              className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent-strong)]"
                            />
                            <span>{item}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                    {stage.id === 'shot-list' ? (
                      <Link
                        to={`/tools/shot-list?project=${project.id}`}
                        className="mt-2 inline-block text-sm font-medium text-accent-strong hover:underline dark:text-accent"
                      >
                        Open this project&rsquo;s shot list &rarr;
                      </Link>
                    ) : null}
                  </>
                )}
              </section>
            )
          })}

          <Button
            variant="ghost"
            className="text-sm text-red-600"
            onClick={() => void db.projects.delete(project.id!)}
          >
            Delete project
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function Projects() {
  const [title, setTitle] = useState('')
  const projects = useLiveQuery(
    () => db.projects.orderBy('updatedAt').reverse().toArray(),
    [],
    [] as ProjectRow[],
  )

  async function create() {
    const name = title.trim()
    if (!name) return
    const now = new Date().toISOString()
    await db.projects.add({
      title: name,
      stage: PROJECT_STAGES[0].id,
      createdAt: now,
      updatedAt: now,
      checklist: {},
    })
    setTitle('')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
      <p className="mt-1 text-base text-ink-soft">
        Nine gates from concept to delivery. A stage will not close until its checklist is done, and
        the next one stays locked until it does. This is rigid on purpose — skipping pre-production
        is the habit that costs the most.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void create()
          }}
          placeholder="New project name…"
          className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-base"
        />
        <Button variant="primary" onClick={() => void create()} disabled={!title.trim()}>
          Start project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No projects yet">
            Start one for the next thing you actually intend to finish — a spec ad, a reel piece, a
            client job. The gates work the same either way.
          </EmptyState>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
