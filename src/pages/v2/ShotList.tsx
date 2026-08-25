import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, type ShotRow } from '../../data/db'
import { Button, EmptyState } from '../../components/ui'

const STATUSES = ['To generate', 'Generated', 'Needs retry', 'Comped', 'Graded', 'Final'] as const

const COLUMNS: { key: keyof ShotRow; label: string; wide?: boolean }[] = [
  { key: 'scene', label: 'Scene' },
  { key: 'shotNumber', label: 'Shot' },
  { key: 'size', label: 'Size' },
  { key: 'angle', label: 'Angle' },
  { key: 'movement', label: 'Movement' },
  { key: 'lens', label: 'Lens' },
  { key: 'lightNote', label: 'Light', wide: true },
  { key: 'durationSeconds', label: 'Secs' },
]

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function toCsv(shots: ShotRow[]): string {
  const headers = [
    'Order',
    'Scene',
    'Shot',
    'Size',
    'Angle',
    'Movement',
    'Lens',
    'Light',
    'Duration (s)',
    'Prompt',
    'Status',
  ]
  const escape = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const rows = shots.map((s, i) =>
    [
      i + 1,
      s.scene,
      s.shotNumber,
      s.size,
      s.angle,
      s.movement,
      s.lens,
      s.lightNote,
      s.durationSeconds,
      s.prompt,
      s.status,
    ]
      .map(escape)
      .join(','),
  )
  return [headers.map(escape).join(','), ...rows].join('\r\n')
}

/**
 * PDF export without shipping a PDF library: render a clean printable table in
 * a new window and hand it to the browser's own "Save as PDF". Works offline,
 * adds no dependency, and the output is identical on every platform.
 */
function printPdf(shots: ShotRow[]) {
  const win = window.open('', '_blank')
  if (!win) return
  const cell = (v: unknown) =>
    `<td>${String(v ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] ?? c)}</td>`
  win.document.write(`<!doctype html><html><head><title>Shot list</title><style>
    body{font:12px/1.4 system-ui,sans-serif;margin:24px;color:#111}
    h1{font-size:18px;margin:0 0 4px}
    p{margin:0 0 16px;color:#666}
    table{border-collapse:collapse;width:100%}
    th,td{border:1px solid #ccc;padding:6px 8px;text-align:left;vertical-align:top}
    th{background:#f4f4f4;font-weight:600}
    td:last-child{max-width:280px;font-size:11px;color:#444}
    @page{size:landscape;margin:12mm}
  </style></head><body>
    <h1>Shot list</h1><p>${shots.length} shots &middot; ${new Date().toLocaleDateString()}</p>
    <table><thead><tr>
      <th>#</th><th>Scene</th><th>Shot</th><th>Size</th><th>Angle</th><th>Movement</th>
      <th>Lens</th><th>Light</th><th>Secs</th><th>Status</th><th>Prompt</th>
    </tr></thead><tbody>
    ${shots
      .map(
        (s, i) =>
          `<tr>${cell(i + 1)}${cell(s.scene)}${cell(s.shotNumber)}${cell(s.size)}${cell(s.angle)}${cell(s.movement)}${cell(s.lens)}${cell(s.lightNote)}${cell(s.durationSeconds)}${cell(s.status)}${cell(s.prompt)}</tr>`,
      )
      .join('')}
    </tbody></table></body></html>`)
  win.document.close()
  win.focus()
  win.print()
}

function Thumbnail({ shot }: { shot: ShotRow }) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    let revoked: string | null = null
    let cancelled = false
    if (shot.thumbnailId) {
      void db.media.get(shot.thumbnailId).then((row) => {
        if (cancelled || !row) return
        revoked = URL.createObjectURL(row.blob)
        setUrl(revoked)
      })
    } else {
      setUrl(null)
    }
    return () => {
      cancelled = true
      if (revoked) URL.revokeObjectURL(revoked)
    }
  }, [shot.thumbnailId])

  async function attach(file: File) {
    const id = `shot-${shot.id}`
    await db.media.put({ id, blob: file })
    await db.shots.update(shot.id!, { thumbnailId: id })
  }

  return (
    <div className="shrink-0">
      {url ? (
        <img src={url} alt="" className="h-16 w-24 rounded-lg border border-line object-cover" />
      ) : (
        <div className="flex h-16 w-24 items-center justify-center rounded-lg border border-dashed border-line text-xs text-ink-faint">
          no still
        </div>
      )}
      <label className="mt-1 block cursor-pointer text-center text-xs font-medium text-accent-strong hover:underline dark:text-accent">
        {url ? 'replace' : 'add still'}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void attach(file)
          }}
        />
      </label>
    </div>
  )
}

export function ShotList() {
  const [params] = useSearchParams()
  const projectId = Number(params.get('project') ?? 0)
  const [dragId, setDragId] = useState<number | null>(null)

  const shots = useLiveQuery(
    () => db.shots.where('projectId').equals(projectId).sortBy('order'),
    [projectId],
    [] as ShotRow[],
  )

  async function addShot() {
    const nextNumber = shots.length + 1
    await db.shots.add({
      projectId,
      order: shots.length,
      scene: shots[shots.length - 1]?.scene ?? '1',
      shotNumber: String(nextNumber),
      size: '',
      angle: '',
      movement: '',
      lens: '',
      lightNote: '',
      durationSeconds: 3,
      prompt: '',
      status: STATUSES[0],
    })
  }

  async function update(shot: ShotRow, patch: Partial<ShotRow>) {
    await db.shots.update(shot.id!, patch)
  }

  async function remove(shot: ShotRow) {
    if (shot.thumbnailId) await db.media.delete(shot.thumbnailId)
    await db.shots.delete(shot.id!)
    await resequence(shots.filter((s) => s.id !== shot.id))
  }

  async function resequence(list: ShotRow[]) {
    await Promise.all(list.map((s, i) => db.shots.update(s.id!, { order: i })))
  }

  async function move(from: number, to: number) {
    if (to < 0 || to >= shots.length || from === to) return
    const next = [...shots]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    await resequence(next)
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shot List</h1>
          <p className="mt-1 text-base text-ink-soft">
            The document that turns an idea into a day of work. Fill it before you generate anything
            — deciding shot by shot in front of the model is how budgets and evenings disappear.
          </p>
        </div>
        <Button variant="primary" onClick={() => void addShot()}>
          Add shot
        </Button>
      </div>

      {shots.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            className="px-3 py-1.5 text-sm"
            onClick={() => download('shot-list.csv', toCsv(shots), 'text/csv')}
          >
            Export CSV
          </Button>
          <Button
            className="px-3 py-1.5 text-sm"
            onClick={() =>
              download('shot-list.json', JSON.stringify(shots, null, 2), 'application/json')
            }
          >
            Export JSON
          </Button>
          <Button className="px-3 py-1.5 text-sm" onClick={() => printPdf(shots)}>
            Export PDF
          </Button>
          <span className="self-center text-sm text-ink-soft">
            {shots.length} shots &middot;{' '}
            {shots.reduce((n, s) => n + (Number(s.durationSeconds) || 0), 0)}s total
          </span>
        </div>
      ) : null}

      {shots.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No shots yet"
            action={
              <Button variant="primary" onClick={() => void addShot()}>
                Add the first shot
              </Button>
            }
          >
            A shot list is where a vague idea becomes a countable amount of work. Add rows, fill the
            craft columns, then write the prompt last.
          </EmptyState>
        </div>
      ) : (
        <ol className="mt-4 space-y-3">
          {shots.map((shot, index) => (
            <li
              key={shot.id}
              draggable
              onDragStart={() => setDragId(shot.id ?? null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                const from = shots.findIndex((s) => s.id === dragId)
                if (from >= 0) void move(from, index)
                setDragId(null)
              }}
              className={`rounded-xl border bg-surface p-4  ${
                dragId === shot.id ? 'border-accent-strong opacity-60' : 'border-line'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 cursor-grab items-center justify-center rounded-full bg-surface text-xs font-bold text-ink-soft">
                  {index + 1}
                </span>
                <Thumbnail shot={shot} />
                <div className="ml-auto flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    className="px-2 py-1 text-sm"
                    aria-label="Move up"
                    onClick={() => void move(index, index - 1)}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    className="px-2 py-1 text-sm"
                    aria-label="Move down"
                    onClick={() => void move(index, index + 1)}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="ghost"
                    className="px-2 py-1 text-sm text-red-600"
                    onClick={() => void remove(shot)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {COLUMNS.map((col) => (
                  <label key={String(col.key)} className={col.wide ? 'col-span-2' : ''}>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {col.label}
                    </span>
                    <input
                      type={col.key === 'durationSeconds' ? 'number' : 'text'}
                      value={String(shot[col.key] ?? '')}
                      onChange={(e) =>
                        void update(shot, {
                          [col.key]:
                            col.key === 'durationSeconds' ? Number(e.target.value) : e.target.value,
                        } as Partial<ShotRow>)
                      }
                      className="mt-0.5 w-full rounded-md border border-line bg-surface px-2 py-1.5 text-sm"
                    />
                  </label>
                ))}
                <label>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Status
                  </span>
                  <select
                    value={shot.status}
                    onChange={(e) => void update(shot, { status: e.target.value })}
                    className="mt-0.5 w-full rounded-md border border-line bg-surface px-2 py-1.5 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-2 block">
                <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  Prompt
                </span>
                <textarea
                  value={shot.prompt}
                  onChange={(e) => void update(shot, { prompt: e.target.value })}
                  rows={2}
                  placeholder="Paste from the Prompt Builder…"
                  className="mt-0.5 w-full rounded-md border border-line bg-surface px-2 py-1.5 font-mono text-sm"
                />
              </label>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
