import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { LESSON_BY_ID, TRACK_BY_ID } from '../../curriculum'
import {
  DEFAULT_NEGATIVES,
  PROMPT_FIELDS,
  PROMPT_ORDER,
  type PromptField,
} from '../../curriculum/promptFields'
import { db, type PromptPresetRow } from '../../data/db'
import { useLanguage } from '../../lib/prefs'
import { Button } from '../../components/ui'

/** Where a slot's explanation should link — the written lesson, else the track. */
function slotLink(field: PromptField): { to: string; label: string } | null {
  if (field.lessonId && LESSON_BY_ID.has(field.lessonId)) {
    return { to: `/lesson/${field.lessonId}`, label: LESSON_BY_ID.get(field.lessonId)!.title }
  }
  const track = TRACK_BY_ID.get(field.trackId)
  return track ? { to: `/track/${track.id}`, label: track.title } : null
}

export function PromptBuilder() {
  const lang = useLanguage()
  const [values, setValues] = useState<Record<string, string>>({})
  const [negatives, setNegatives] = useState(DEFAULT_NEGATIVES)
  const [useNegatives, setUseNegatives] = useState(true)
  const [presetName, setPresetName] = useState('')
  const [copied, setCopied] = useState(false)

  const presets = useLiveQuery(
    () => db.promptPresets.orderBy('updatedAt').reverse().toArray(),
    [],
    [] as PromptPresetRow[],
  )

  const filled = useMemo(
    () => PROMPT_FIELDS.filter((f) => (values[f.id] ?? '').trim().length > 0),
    [values],
  )

  const prompt = useMemo(
    () =>
      PROMPT_ORDER.map((id) => (values[id] ?? '').trim())
        .filter(Boolean)
        .join(', '),
    [values],
  )

  const empty = PROMPT_FIELDS.filter((f) => !(values[f.id] ?? '').trim())

  function set(id: string, v: string) {
    setValues((prev) => ({ ...prev, [id]: v }))
  }

  async function copy() {
    const text = useNegatives && negatives.trim() ? `${prompt}\n\nNegative: ${negatives}` : prompt
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be blocked; the textarea below is always selectable.
    }
  }

  async function savePreset() {
    const name = presetName.trim()
    if (!name) return
    await db.promptPresets.add({ name, fields: values, updatedAt: new Date().toISOString() })
    setPresetName('')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold tracking-tight">Prompt Builder</h1>
      <p className="mt-1 text-base text-zinc-500 dark:text-zinc-400">
        Fill the slots a director would actually decide, in the order that matters. Every field
        links back to the lesson that teaches it — this is the bridge between the theory and the
        thing you are actually making today.
      </p>

      <div className="mt-6 space-y-4">
        {PROMPT_FIELDS.map((field) => {
          const value = values[field.id] ?? ''
          return (
            <div
              key={field.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <label className="block">
                <span className="flex flex-wrap items-baseline gap-2">
                  <span className="font-semibold">{field.label}</span>
                  {value ? (
                    <span className="text-xs font-semibold uppercase tracking-wide text-accent-strong dark:text-accent">
                      filled
                    </span>
                  ) : null}
                </span>
                {lang === 'both' ? (
                  <span className="mt-0.5 block text-sm text-zinc-500 dark:text-zinc-400">
                    {field.hinglish}
                  </span>
                ) : null}
                <input
                  type="text"
                  value={value}
                  onChange={(e) => set(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong dark:border-zinc-700 dark:bg-zinc-950"
                />
              </label>
              {field.options.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {field.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set(field.id, opt)}
                      className={`rounded-full px-2.5 py-1 text-sm transition-colors ${
                        value === opt
                          ? 'bg-accent-strong text-white'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      {/* Negatives */}
      <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <label className="flex items-center gap-2 font-semibold">
          <input
            type="checkbox"
            checked={useNegatives}
            onChange={(e) => setUseNegatives(e.target.checked)}
            className="h-4 w-4 accent-[var(--color-accent-strong)]"
          />
          Negative prompt
        </label>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          SDXL and ComfyUI workflows use this. FLUX Schnell mostly ignores it — leave it off there
          and fix problems in the positive prompt instead.
        </p>
        <textarea
          value={negatives}
          onChange={(e) => setNegatives(e.target.value)}
          rows={2}
          disabled={!useNegatives}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </div>

      {/* Output */}
      <div className="sticky bottom-20 mt-6 rounded-xl border-2 border-accent-strong/50 bg-accent-soft/50 p-4 backdrop-blur md:bottom-4 dark:border-accent/40 dark:bg-zinc-900/95">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold">Your prompt</h2>
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {filled.length} of {PROMPT_FIELDS.length} slots
          </span>
        </div>
        <textarea
          readOnly
          value={
            prompt
              ? useNegatives && negatives.trim()
                ? `${prompt}\n\nNegative: ${negatives}`
                : prompt
              : 'Fill a slot or two and your prompt appears here.'
          }
          rows={4}
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => void copy()} disabled={!prompt}>
            {copied ? 'Copied' : 'Copy prompt'}
          </Button>
          <Button onClick={() => setValues({})} disabled={!prompt}>
            Clear
          </Button>
        </div>
      </div>

      {/* Why this prompt works */}
      {filled.length > 0 ? (
        <section className="mt-8">
          <h2 className="text-lg font-bold tracking-tight">Why this prompt works</h2>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            What each slot you filled is doing to the image, and where it is taught.
          </p>
          <ul className="mt-3 space-y-2">
            {filled.map((field) => {
              const link = slotLink(field)
              return (
                <li
                  key={field.id}
                  className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <p className="text-sm font-semibold text-accent-strong dark:text-accent">
                    {field.label}
                    <span className="ml-2 font-normal text-zinc-500 dark:text-zinc-400">
                      &ldquo;{values[field.id]}&rdquo;
                    </span>
                  </p>
                  <p className="mt-1 text-base leading-snug">{field.why}</p>
                  {link ? (
                    <Link
                      to={link.to}
                      className="mt-1.5 inline-block text-sm font-medium text-accent-strong hover:underline dark:text-accent"
                    >
                      {link.label} &rarr;
                    </Link>
                  ) : null}
                </li>
              )
            })}
          </ul>

          {empty.length > 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-zinc-300 p-3 dark:border-zinc-700">
              <p className="text-sm font-semibold">Still empty</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {empty.map((f) => f.label).join(' · ')}. An empty slot is not neutral — the model
                fills it with its own default, and that default is what makes an image look
                generic.
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Presets */}
      <section className="mt-8">
        <h2 className="text-lg font-bold tracking-tight">Presets</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Name this setup…"
            className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base dark:border-zinc-700 dark:bg-zinc-900"
          />
          <Button onClick={() => void savePreset()} disabled={!presetName.trim() || !prompt}>
            Save
          </Button>
        </div>
        {presets.length === 0 ? (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Nothing saved yet. Presets are useful for locking a look across a whole shot list.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {presets.map((preset) => (
              <li
                key={preset.id}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{preset.name}</span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                    {new Date(preset.updatedAt).toLocaleDateString()}
                  </span>
                </span>
                <Button className="px-3 py-1 text-sm" onClick={() => setValues(preset.fields)}>
                  Load
                </Button>
                <Button
                  variant="ghost"
                  className="px-2 py-1 text-sm"
                  onClick={() => void db.promptPresets.delete(preset.id!)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
