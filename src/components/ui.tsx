import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import type { Mood } from '../content'

// ────────────────────────────────── Button ─────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-accent-strong text-white hover:brightness-105 active:brightness-95 shadow-sm',
  secondary: 'bg-surface text-ink border border-line hover:border-accent hover:text-accent-strong',
  ghost: 'text-ink-soft hover:bg-surface',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
}

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong disabled:opacity-50 disabled:pointer-events-none'

export function Button({
  variant = 'secondary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button {...props} className={`${BUTTON_BASE} ${BUTTON_STYLES[variant]} ${className}`} />
}

/** A router Link styled as a Button. Never nest a Button inside a Link — anchors with nested interactive elements don't navigate. */
export function ButtonLink({
  to,
  variant = 'secondary',
  className = '',
  children,
}: {
  to: string
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}) {
  return (
    <Link to={to} className={`${BUTTON_BASE} ${BUTTON_STYLES[variant]} ${className}`}>
      {children}
    </Link>
  )
}

/**
 * A bordered pill link. Used for secondary actions that used to be bare text
 * and therefore did not read as tappable at all.
 */
export function PillLink({
  to,
  children,
  count,
}: {
  to: string
  children: ReactNode
  count?: number
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-[0.95rem] font-medium transition-colors hover:border-accent hover:text-accent-strong dark:hover:text-accent"
    >
      {count !== undefined ? (
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent-strong px-1.5 text-xs font-bold text-white">
          {count}
        </span>
      ) : null}
      {children}
    </Link>
  )
}

// ─────────────────────────────── ProgressBar ───────────────────────────────

export function ProgressBar({
  value,
  max = 100,
  className = '',
  label,
}: {
  value: number
  max?: number
  className?: string
  label?: string
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={`h-2 w-full overflow-hidden rounded-full bg-line ${className}`}
    >
      <div className="bar-fill h-full rounded-full bg-accent-strong" style={{ width: `${pct}%` }} />
    </div>
  )
}

// ────────────────────────────────── Modal ──────────────────────────────────

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
      className="m-auto w-[calc(100vw-2rem)] max-w-md rounded-xl bg-surface p-0 text-ink shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-3 text-base text-ink-soft">{children}</div>
      </div>
    </dialog>
  )
}

// ─────────────────────────────── Mood chips ────────────────────────────────

export function MoodChip({
  mood,
  active = false,
  onClick,
}: {
  mood: Mood
  active?: boolean
  onClick?: () => void
}) {
  const base =
    'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium capitalize transition-colors duration-150'
  const style = active ? 'bg-accent-strong text-white' : 'bg-line/70 text-ink-soft  '
  if (!onClick) return <span className={`${base} ${style}`}>{mood}</span>
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${base} ${style} cursor-pointer hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong`}
    >
      {mood}
    </button>
  )
}

// ─────────────────────────────── Empty state ───────────────────────────────

export function EmptyState({
  title,
  children,
  action,
}: {
  title: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-line px-6 py-12 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-base text-ink-soft">{children}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

// ────────────────────────────────── Badge ──────────────────────────────────

export function MasteredBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-sm font-semibold text-accent-strong dark:text-accent">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M8 1l2 4.1 4.5.7-3.2 3.2.7 4.5L8 11.4 4 13.5l.7-4.5L1.5 5.8 6 5.1 8 1z" />
      </svg>
      Mastered
    </span>
  )
}
