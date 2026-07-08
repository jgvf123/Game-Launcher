import { useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import type { PromptAnnotation } from '../../lab/types'
import { LabStateProvider } from '../../lab/state'

// ─────────────────────────────── Lab layout ───────────────────────────────

const TABS = [
  { to: '/lab', label: 'Learn', end: true },
  { to: '/lab/recipes', label: 'Recipes' },
  { to: '/lab/builder', label: 'Builder' },
  { to: '/lab/quiz', label: 'Quiz' },
  { to: '/lab/log', label: 'Log' },
]

export function LabLayout() {
  return (
    <LabStateProvider>
      <div className="animate-fade-up space-y-5">
        <header className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Prompt Lab</h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              Prompt & context engineering for AI image and video — filmmaking and ad focused.
            </p>
          </div>
        </header>
        <nav
          aria-label="Prompt Lab sections"
          className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
        >
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-300/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </LabStateProvider>
  )
}

// ─────────────────────────────── Copy button ───────────────────────────────

export function CopyButton({ text, small = false }: { text: string; small?: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors duration-150 ${
        small ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'
      } ${
        copied
          ? 'bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300'
          : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-300/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
      }`}
    >
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        {copied ? (
          <path d="M7.6 13.2 4.4 10l-1.2 1.2 4.4 4.4 8-8-1.2-1.2z" />
        ) : (
          <path d="M6 2h9a1 1 0 0 1 1 1v10h-2V4H6V2zm-2 4h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm1 2v8h7V8H5z" />
        )}
      </svg>
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

// ───────────────────────────── Annotated prompt ─────────────────────────────

/**
 * Renders a prompt with tappable highlighted spans. Tapping a highlight
 * shows its "why" callout beneath the prompt.
 */
export function AnnotatedPrompt({
  prompt,
  annotations,
  defaultOpen = false,
}: {
  prompt: string
  annotations: PromptAnnotation[]
  defaultOpen?: boolean
}) {
  const [active, setActive] = useState<number | null>(defaultOpen && annotations.length ? 0 : null)

  const segments = useMemo(() => {
    // Split the prompt into plain/annotated segments by first occurrence of each span.
    type Seg = { text: string; ann: number | null }
    let segs: Seg[] = [{ text: prompt, ann: null }]
    annotations.forEach((a, i) => {
      const next: Seg[] = []
      let placed = false
      for (const seg of segs) {
        if (seg.ann !== null || placed) {
          next.push(seg)
          continue
        }
        const idx = seg.text.indexOf(a.span)
        if (idx === -1) {
          next.push(seg)
          continue
        }
        placed = true
        if (idx > 0) next.push({ text: seg.text.slice(0, idx), ann: null })
        next.push({ text: a.span, ann: i })
        if (idx + a.span.length < seg.text.length)
          next.push({ text: seg.text.slice(idx + a.span.length), ann: null })
      }
      segs = next
    })
    return segs
  }, [prompt, annotations])

  return (
    <div>
      <div className="rounded-xl bg-zinc-100 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
        {segments.map((seg, i) =>
          seg.ann === null ? (
            <span key={i}>{seg.text}</span>
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => setActive(active === seg.ann ? null : seg.ann)}
              className={`rounded px-0.5 text-left underline decoration-dotted underline-offset-4 transition-colors duration-150 ${
                active === seg.ann
                  ? 'bg-accent-soft text-accent-strong decoration-accent-strong dark:bg-zinc-800 dark:text-accent'
                  : 'text-accent-strong decoration-accent-strong/60 hover:bg-accent-soft dark:text-accent dark:hover:bg-zinc-800'
              }`}
            >
              {seg.text}
            </button>
          ),
        )}
      </div>
      {active !== null && annotations[active] && (
        <div className="animate-fade-up mt-2 rounded-lg border-l-4 border-accent-strong bg-accent-soft p-3 text-sm text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200">
          <span className="font-mono font-semibold text-accent-strong dark:text-accent">
            “{annotations[active].span}”
          </span>{' '}
          — {annotations[active].why}
        </div>
      )}
      {annotations.length > 0 && active === null && (
        <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
          Tap a highlighted phrase to see why it’s there
        </p>
      )}
    </div>
  )
}
