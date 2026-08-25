import { useLiveQuery } from 'dexie-react-hooks'
import { db, type LessonProgressRow, type ShipLogRow } from './db'

/** All lesson-progress rows, keyed by lesson id. Re-renders on every write. */
export function useLessonProgress(): Map<string, LessonProgressRow> {
  const rows = useLiveQuery(() => db.lessonProgress.toArray(), [], [] as LessonProgressRow[])
  return new Map(rows.map((r) => [r.lessonId, r]))
}

/** Everything actually finished, newest first. */
export function useShipLog(): ShipLogRow[] {
  return useLiveQuery(
    () => db.shipLog.orderBy('shippedAt').reverse().toArray(),
    [],
    [] as ShipLogRow[],
  )
}

export function useShippedLessonIds(): Set<string> {
  const log = useShipLog()
  return new Set(log.map((r) => r.lessonId))
}

export function useNote(lessonId: string): string | undefined {
  return useLiveQuery(() => db.notes.get(lessonId).then((r) => r?.body ?? ''), [lessonId])
}
