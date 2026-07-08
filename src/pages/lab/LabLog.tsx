import { useEffect, useMemo, useRef, useState } from 'react'
import { getMedia, putMedia } from '../../lab/idb'
import { useLabState, type LogEntry } from '../../lab/state'
import { MODEL_CARDS } from '../../lab/models'
import { Button, EmptyState, Modal } from '../../components/ui'
import { CopyButton } from './components'

/** Renders an entry's media from IndexedDB (or its URL). */
function EntryMedia({ entry }: { entry: LogEntry }) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    let objectUrl: string | null = null
    if (entry.mediaType) {
      void getMedia(entry.id).then((blob) => {
        if (blob) {
          objectUrl = URL.createObjectURL(blob)
          setUrl(objectUrl)
        }
      })
    }
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [entry.id, entry.mediaType])

  if (entry.mediaType?.startsWith('video') && url)
    return <video src={url} controls className="max-h-72 w-full rounded-lg bg-black object-contain" />
  if (entry.mediaType && url)
    return <img src={url} alt="Your generated result" className="max-h-72 w-full rounded-lg object-contain" />
  if (entry.mediaUrl)
    return (
      <a
        href={entry.mediaUrl}
        target="_blank"
        rel="noreferrer"
        className="block truncate rounded-lg bg-zinc-100 px-3 py-2 text-sm text-accent-strong dark:bg-zinc-800 dark:text-accent"
      >
        {entry.mediaUrl}
      </a>
    )
  return null
}

export function LabLog() {
  const { logEntries, addLogEntry, deleteLogEntry } = useLabState()
  const [creating, setCreating] = useState(false)
  const [modelFilter, setModelFilter] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  // form state
  const [prompt, setPrompt] = useState('')
  const [model, setModel] = useState('midjourney')
  const [tags, setTags] = useState('')
  const [notes, setNotes] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)

  // Draft handed over from the Builder.
  useEffect(() => {
    const raw = sessionStorage.getItem('fs.lab.logDraft')
    if (!raw) return
    sessionStorage.removeItem('fs.lab.logDraft')
    try {
      const draft = JSON.parse(raw) as { prompt: string; model: string }
      setPrompt(draft.prompt)
      setModel(draft.model)
      setCreating(true)
    } catch {
      // ignore
    }
  }, [])

  const entries = useMemo(
    () => (modelFilter ? logEntries.filter((e) => e.model === modelFilter) : logEntries),
    [logEntries, modelFilter],
  )
  const usedModels = useMemo(() => [...new Set(logEntries.map((e) => e.model))], [logEntries])

  const submit = async () => {
    const id = crypto.randomUUID()
    let mediaType: string | null = null
    if (file) {
      await putMedia(id, file)
      mediaType = file.type || 'image/*'
    }
    addLogEntry({
      id,
      prompt: prompt.trim(),
      model,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      notes: notes.trim(),
      mediaType,
      mediaUrl: mediaUrl.trim() || null,
    })
    setPrompt('')
    setTags('')
    setNotes('')
    setMediaUrl('')
    setFile(null)
    if (fileRef.current) fileRef.current.value = ''
    setCreating(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-zinc-500 dark:text-zinc-400">
          Your own results, stored only on this device: the exact prompt, the model, and what
          you’d change next time. This becomes your personal swipe file.
        </p>
        <Button variant="primary" onClick={() => setCreating((c) => !c)}>
          {creating ? 'Close' : 'New entry'}
        </Button>
      </div>

      {creating && (
        <div className="animate-fade-up rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold">New practice entry</h2>
          <div className="mt-3 space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                The exact prompt you used
              </span>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Model</span>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
                >
                  {MODEL_CARDS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Tags (comma-separated)
                </span>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="portrait, low-key, test"
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                Notes — what worked, what to fix next time
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Upload your image/video (stays on device)
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="mt-1 w-full text-sm text-zinc-500 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-200 file:px-3 file:py-1.5 file:text-sm file:font-medium dark:file:bg-zinc-800 dark:file:text-zinc-200"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  …or paste a URL
                </span>
                <input
                  type="url"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://…"
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>
            </div>
            <Button variant="primary" disabled={!prompt.trim()} onClick={() => void submit()}>
              Save entry
            </Button>
          </div>
        </div>
      )}

      {usedModels.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setModelFilter(null)}
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              modelFilter === null
                ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            All
          </button>
          {usedModels.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModelFilter(modelFilter === m ? null : m)}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                modelFilter === m
                  ? 'bg-accent-strong text-white'
                  : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {MODEL_CARDS.find((c) => c.id === m)?.name ?? m}
            </button>
          ))}
        </div>
      )}

      {entries.length === 0 && !creating ? (
        <EmptyState
          title="No entries yet"
          action={
            <Button variant="primary" onClick={() => setCreating(true)}>
              Log your first result
            </Button>
          }
        >
          Generate something with any tool, then log the prompt + result here. Over time this
          becomes the most valuable prompt library you own — yours.
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map((e) => (
            <div
              key={e.id}
              className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <EntryMedia entry={e} />
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">
                  {MODEL_CARDS.find((c) => c.id === e.model)?.name ?? e.model}
                </span>
                <span className="text-xs text-zinc-400">
                  {new Date(e.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 break-words rounded-lg bg-zinc-100 p-2.5 font-mono text-xs text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300">
                {e.prompt}
              </p>
              {e.notes && <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{e.notes}</p>}
              {e.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex justify-between">
                <CopyButton text={e.prompt} small />
                <button
                  type="button"
                  onClick={() => setConfirmDelete(e.id)}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        title="Delete this entry?"
      >
        <p>The entry and its stored media will be removed from this device.</p>
        <div className="mt-5 flex justify-end gap-3">
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirmDelete) deleteLogEntry(confirmDelete)
              setConfirmDelete(null)
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
