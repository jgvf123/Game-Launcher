import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TERM_LOOKUP } from '../curriculum'
import { useLanguage } from '../lib/prefs'

/**
 * A **bolded** term in lesson prose. Tap or click to see the definition and
 * its Hinglish gloss without leaving the page — the rule being that the app
 * never uses a word it has not defined on the same screen.
 *
 * Text that is not a known glossary term just renders bold, so emphasis
 * still works normally in prose.
 */
export function TermTooltip({ text }: { text: string }) {
  const term = TERM_LOOKUP.get(text.trim().toLowerCase())
  const lang = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!term) return <strong className="font-semibold">{text}</strong>

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="cursor-help font-semibold text-accent-strong underline decoration-dotted underline-offset-4 hover:decoration-solid dark:text-accent"
      >
        {text}
      </button>
      {open ? (
        <span className="absolute bottom-full left-0 z-30 mb-2 block w-72 max-w-[80vw] rounded-lg border border-line bg-surface p-3 text-left text-sm font-normal shadow-lg">
          <span className="block font-semibold">{term.term}</span>
          <span className="mt-1 block leading-snug text-ink-soft">{term.definition}</span>
          {lang === 'both' ? (
            <span className="mt-2 block rounded bg-accent-soft px-2.5 py-2 leading-snug text-ink">
              {term.hinglish}
            </span>
          ) : null}
          <Link
            to={`/glossary?term=${term.id}`}
            className="mt-2 block text-xs font-medium text-accent-strong hover:underline dark:text-accent"
          >
            Open in glossary &rarr;
          </Link>
        </span>
      ) : null}
    </span>
  )
}
