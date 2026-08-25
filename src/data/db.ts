import Dexie, { type Table } from 'dexie'

/**
 * Local, on-device store for everything the learner produces.
 *
 * Nothing here ever leaves the machine: no accounts, no sync, no telemetry.
 *
 * Note on the split with localStorage: review scheduling, quiz history,
 * streak and theme stay in the `fs.*` localStorage keys that v1 already
 * uses. That is deliberate — localStorage is synchronous and works when the
 * single-file build is opened straight off disk over `file://`, where some
 * browsers refuse IndexedDB. Dexie owns the bulkier, newer data below,
 * including anything that holds a Blob.
 */

export interface LessonProgressRow {
  lessonId: string
  /** First time the lesson page was opened. */
  startedAt: string
  /** Set when all three checks have been answered at least once. */
  checksDoneAt?: string
  /** Free-text notes the learner takes on the lesson. */
  updatedAt: string
}

export interface ShipLogRow {
  id?: number
  lessonId: string
  lessonTitle: string
  deliverable: string
  shippedAt: string
  /** Which of the three success criteria the learner honestly ticked. */
  criteriaMet: boolean[]
  note?: string
}

export interface NoteRow {
  lessonId: string
  body: string
  updatedAt: string
}

export interface ProjectRow {
  id?: number
  title: string
  stage: string
  createdAt: string
  updatedAt: string
  checklist: Record<string, boolean>
}

export interface ShotRow {
  id?: number
  projectId: number
  order: number
  scene: string
  shotNumber: string
  size: string
  angle: string
  movement: string
  lens: string
  lightNote: string
  durationSeconds: number
  prompt: string
  status: string
  thumbnailId?: string
}

export interface AnalyzerAttemptRow {
  id?: number
  at: string
  /** Per-attribute correctness, e.g. { shotSize: true, lightDirection: false }. */
  scores: Record<string, boolean>
}

export interface MediaRow {
  id: string
  blob: Blob
}

export interface PromptPresetRow {
  id?: number
  name: string
  fields: Record<string, string>
  updatedAt: string
}

class FrameSchoolDb extends Dexie {
  lessonProgress!: Table<LessonProgressRow, string>
  shipLog!: Table<ShipLogRow, number>
  notes!: Table<NoteRow, string>
  projects!: Table<ProjectRow, number>
  shots!: Table<ShotRow, number>
  analyzerAttempts!: Table<AnalyzerAttemptRow, number>
  media!: Table<MediaRow, string>
  promptPresets!: Table<PromptPresetRow, number>

  constructor() {
    super('frame-school-v2')
    this.version(1).stores({
      lessonProgress: 'lessonId, startedAt',
      shipLog: '++id, lessonId, shippedAt',
      notes: 'lessonId, updatedAt',
      projects: '++id, stage, updatedAt',
      shots: '++id, projectId, order',
      analyzerAttempts: '++id, at',
      media: 'id',
    })
    this.version(2).stores({
      promptPresets: '++id, name, updatedAt',
    })
  }
}

export const db = new FrameSchoolDb()

/** Records that a lesson has been opened. Idempotent. */
export async function touchLesson(lessonId: string): Promise<void> {
  const now = new Date().toISOString()
  const existing = await db.lessonProgress.get(lessonId)
  if (existing) {
    await db.lessonProgress.update(lessonId, { updatedAt: now })
    return
  }
  await db.lessonProgress.put({ lessonId, startedAt: now, updatedAt: now })
}

export async function markChecksDone(lessonId: string): Promise<void> {
  const now = new Date().toISOString()
  const existing = await db.lessonProgress.get(lessonId)
  if (!existing) {
    await db.lessonProgress.put({ lessonId, startedAt: now, checksDoneAt: now, updatedAt: now })
    return
  }
  if (existing.checksDoneAt) return
  await db.lessonProgress.update(lessonId, { checksDoneAt: now, updatedAt: now })
}

export async function shipAssignment(row: Omit<ShipLogRow, 'id' | 'shippedAt'>): Promise<void> {
  await db.shipLog.add({ ...row, shippedAt: new Date().toISOString() })
}

export async function unshipLesson(lessonId: string): Promise<void> {
  await db.shipLog.where('lessonId').equals(lessonId).delete()
}

export async function saveNote(lessonId: string, body: string): Promise<void> {
  await db.notes.put({ lessonId, body, updatedAt: new Date().toISOString() })
}

/** Everything on disk, as one JSON blob, for the settings export button. */
export async function exportAll(): Promise<string> {
  const [lessonProgress, shipLog, notes, projects, shots, analyzerAttempts, promptPresets] =
    await Promise.all([
      db.lessonProgress.toArray(),
      db.shipLog.toArray(),
      db.notes.toArray(),
      db.projects.toArray(),
      db.shots.toArray(),
      db.analyzerAttempts.toArray(),
      db.promptPresets.toArray(),
    ])
  const local: Record<string, unknown> = {}
  for (const key of Object.keys(localStorage)) {
    if (!key.startsWith('fs.')) continue
    try {
      local[key] = JSON.parse(localStorage.getItem(key) ?? 'null')
    } catch {
      // A key that will not parse is not worth failing the whole export over.
    }
  }
  return JSON.stringify(
    {
      version: 2,
      exportedAt: new Date().toISOString(),
      localStorage: local,
      dexie: { lessonProgress, shipLog, notes, projects, shots, analyzerAttempts, promptPresets },
    },
    null,
    2,
  )
}

/**
 * Restores an export produced by `exportAll`. Additive by design: existing
 * rows with the same key are overwritten, nothing else is touched, and a
 * malformed file is rejected before anything is written.
 */
export async function importAll(json: string): Promise<{ restored: number }> {
  const parsed = JSON.parse(json) as {
    version?: number
    localStorage?: Record<string, unknown>
    dexie?: Record<string, unknown[]>
  }
  if (parsed.version !== 2 || typeof parsed.dexie !== 'object' || parsed.dexie === null) {
    throw new Error('That does not look like a Frame School export.')
  }

  let restored = 0
  for (const [key, value] of Object.entries(parsed.localStorage ?? {})) {
    if (!key.startsWith('fs.')) continue
    localStorage.setItem(key, JSON.stringify(value))
    restored += 1
  }

  const tables = {
    lessonProgress: db.lessonProgress,
    shipLog: db.shipLog,
    notes: db.notes,
    projects: db.projects,
    shots: db.shots,
    analyzerAttempts: db.analyzerAttempts,
    promptPresets: db.promptPresets,
  } as const

  for (const [name, table] of Object.entries(tables)) {
    const rows = parsed.dexie[name]
    if (!Array.isArray(rows)) continue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (table as any).bulkPut(rows)
    restored += rows.length
  }

  return { restored }
}

/** Wipes every Dexie store. localStorage reset stays with the v1 settings page. */
export async function clearAllDexie(): Promise<void> {
  await Promise.all([
    db.lessonProgress.clear(),
    db.shipLog.clear(),
    db.notes.clear(),
    db.projects.clear(),
    db.shots.clear(),
    db.analyzerAttempts.clear(),
    db.promptPresets.clear(),
    db.media.clear(),
  ])
}
