import { Link } from 'react-router-dom'
import { useShipLog } from '../../data/hooks'
import { EmptyState } from '../../components/ui'

/**
 * The Ship Log — the only page that counts finished work rather than
 * consumed material. Lessons read is a vanity number; things made is not.
 */
export function ShipLog() {
  const log = useShipLog()

  const byMonth = new Map<string, typeof log>()
  for (const row of log) {
    const key = new Date(row.shippedAt).toLocaleDateString(undefined, {
      month: 'long',
      year: 'numeric',
    })
    const bucket = byMonth.get(key) ?? []
    bucket.push(row)
    byMonth.set(key, bucket)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Ship Log</h1>
      <p className="mt-1 text-base text-ink-soft">
        Everything you have actually finished. Not lessons opened — things made.
      </p>

      {log.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Nothing shipped yet"
            action={
              <Link
                to="/tracks"
                className="inline-flex items-center rounded-lg bg-accent-strong px-4 py-2 font-medium text-white"
              >
                Find an assignment
              </Link>
            }
          >
            Every lesson ends in one timeboxed thing to make. Finish one, tick its three criteria
            honestly, and it lands here.
          </EmptyState>
        </div>
      ) : (
        <>
          <p className="mt-4 text-sm font-medium text-accent-strong dark:text-accent">
            {log.length} shipped
          </p>
          <div className="mt-4 space-y-6">
            {[...byMonth.entries()].map(([month, rows]) => (
              <section key={month}>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-faint">
                  {month}
                </h2>
                <ul className="space-y-2">
                  {rows.map((row) => (
                    <li key={row.id} className="rounded-xl bg-surface p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <Link
                          to={`/lesson/${row.lessonId}`}
                          className="font-semibold hover:underline"
                        >
                          {row.lessonTitle}
                        </Link>
                        <span className="shrink-0 text-xs font-medium text-ink-faint">
                          {new Date(row.shippedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink-soft">{row.deliverable}</p>
                      <p className="mt-1.5 text-xs font-medium text-ink-soft">
                        {row.criteriaMet.filter(Boolean).length} of {row.criteriaMet.length}{' '}
                        criteria met
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
