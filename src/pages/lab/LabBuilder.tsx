import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  EMPTY_SLOTS,
  IMAGE_DIALECTS,
  VIDEO_DIALECTS,
  assemblePrompt,
  lintSlots,
  type BuilderMode,
  type BuilderSlots,
} from '../../lab/builder'
import { useLabState } from '../../lab/state'
import { Button } from '../../components/ui'
import { CopyButton } from './components'

interface SlotDef {
  key: keyof BuilderSlots
  label: string
  placeholder: string
  videoOnly?: boolean
  imageOnly?: boolean
}

const SLOT_DEFS: SlotDef[] = [
  { key: 'subject', label: 'Subject', placeholder: 'a weathered fisherman in his sixties' },
  { key: 'detail', label: 'Specific detail', placeholder: 'salt-crusted grey beard, wool sweater' },
  { key: 'action', label: 'Action (video)', placeholder: 'mends a net with slow, practiced hands', videoOnly: true },
  { key: 'style', label: 'Style / medium', placeholder: 'photorealistic film still' },
  { key: 'lighting', label: 'Lighting', placeholder: 'golden-hour rim light from behind the left shoulder' },
  { key: 'composition', label: 'Composition / framing', placeholder: 'medium close-up' },
  { key: 'cameraMove', label: 'Camera movement (video)', placeholder: 'slow push-in', videoOnly: true },
  { key: 'mood', label: 'Mood', placeholder: 'quiet, patient' },
  { key: 'technical', label: 'Technical', placeholder: '85mm, film grain, 4:5', imageOnly: true },
  { key: 'audio', label: 'Audio (Veo)', placeholder: 'gulls, rope creaking, distant surf', videoOnly: true },
  { key: 'negatives', label: 'Exclude', placeholder: 'hat, sunglasses, watermark' },
]

export function LabBuilder() {
  const navigate = useNavigate()
  const { savedPrompts, savePrompt, deletePrompt } = useLabState()
  const [mode, setMode] = useState<BuilderMode>('image')
  const [model, setModel] = useState<string>('midjourney')
  const [slots, setSlots] = useState<BuilderSlots>(EMPTY_SLOTS)
  const [savedFlash, setSavedFlash] = useState(false)

  // Remix payload from the recipe library.
  useEffect(() => {
    const raw = sessionStorage.getItem('fs.lab.remix')
    if (!raw) return
    sessionStorage.removeItem('fs.lab.remix')
    try {
      const remix = JSON.parse(raw) as { mode: BuilderMode; subject: string; detail: string }
      setMode(remix.mode)
      setModel(remix.mode === 'video' ? 'veo' : 'midjourney')
      setSlots({ ...EMPTY_SLOTS, subject: remix.subject, detail: remix.detail })
    } catch {
      // ignore malformed payloads
    }
  }, [])

  const dialects = mode === 'image' ? IMAGE_DIALECTS : VIDEO_DIALECTS
  useEffect(() => {
    if (!dialects.some((d) => d.id === model)) setModel(dialects[0].id)
  }, [dialects, model])

  const prompt = useMemo(() => assemblePrompt(slots, mode, model), [slots, mode, model])
  const warnings = useMemo(() => lintSlots(slots, mode), [slots, mode])
  const hasContent = slots.subject.trim().length > 0

  const set = (key: keyof BuilderSlots, value: string) => setSlots((s) => ({ ...s, [key]: value }))

  const visibleSlots = SLOT_DEFS.filter(
    (d) => !(d.videoOnly && mode === 'image') && !(d.imageOnly && mode === 'video'),
  )

  return (
    <div className="space-y-5">
      <p className="text-zinc-500 dark:text-zinc-400">
        Fill the slots once — the Builder re-packages them into each model’s dialect. The
        subject stays put while you flip models: that’s your global variable.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Mode" className="flex rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700">
          {(['image', 'video'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize ${
                mode === m
                  ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Model dialect" className="flex flex-wrap gap-1.5">
          {dialects.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setModel(d.id)}
              aria-pressed={model === d.id}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                model === d.id
                  ? 'bg-accent-strong text-white'
                  : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          {visibleSlots.map((d) => (
            <label key={d.key} className="block">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{d.label}</span>
              <input
                type="text"
                value={slots[d.key]}
                onChange={(e) => set(d.key, e.target.value)}
                placeholder={d.placeholder}
                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base placeholder:text-zinc-400 focus:border-accent-strong focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500"
              />
            </label>
          ))}
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 lg:sticky lg:top-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Assembled for {dialects.find((d) => d.id === model)?.label}
              </h2>
              {hasContent && <CopyButton text={prompt} small />}
            </div>
            <div className="mt-2 min-h-24 rounded-xl bg-zinc-100 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
              {hasContent ? prompt : <span className="text-zinc-400">Start with a subject…</span>}
            </div>

            {warnings.length > 0 && (
              <div className="mt-3 space-y-2">
                {warnings.map((w, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-2.5 text-sm ${
                      w.level === 'warn'
                        ? 'bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200'
                        : 'bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
                    }`}
                  >
                    {w.level === 'warn' ? '⚠ ' : '💡 '}
                    {w.text}
                  </div>
                ))}
              </div>
            )}

            {hasContent && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    savePrompt({
                      title: slots.subject.slice(0, 48),
                      mode,
                      model,
                      prompt,
                    })
                    setSavedFlash(true)
                    setTimeout(() => setSavedFlash(false), 1500)
                  }}
                >
                  {savedFlash ? 'Saved ✓' : 'Save to my library'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    sessionStorage.setItem(
                      'fs.lab.logDraft',
                      JSON.stringify({ prompt, model }),
                    )
                    navigate('/lab/log')
                  }}
                >
                  Send to practice log
                </Button>
                <Button variant="ghost" onClick={() => setSlots(EMPTY_SLOTS)}>
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {savedPrompts.length > 0 && (
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold">My prompt library</h2>
          <ul className="mt-3 space-y-2">
            {savedPrompts.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">
                    {p.title || 'Untitled'}{' '}
                    <span className="font-normal text-zinc-400">
                      · {p.mode} · {p.model}
                    </span>
                  </span>
                  <div className="flex gap-2">
                    <CopyButton text={p.prompt} small />
                    <button
                      type="button"
                      onClick={() => deletePrompt(p.id)}
                      className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-1.5 break-words font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {p.prompt}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
