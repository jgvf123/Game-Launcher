import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from 'react'
import type { Mood } from '../content'

// ────────────────────────────────── Button ─────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-strong text-white hover:brightness-105 active:brightness-95 shadow-sm',
  secondary:
    'bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700',
  ghost:
    'text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-800',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
}

export function Button({
  variant = 'secondary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong disabled:opacity-50 disabled:pointer-events-none ${BUTTON_STYLES[variant]} ${className}`}
    />
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
      className={`h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 ${className}`}
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
      className="m-auto w-[calc(100vw-2rem)] max-w-md rounded-xl bg-white p-0 text-zinc-800 shadow-xl backdrop:bg-zinc-950/50 dark:bg-zinc-900 dark:text-zinc-100"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-3 text-base text-zinc-600 dark:text-zinc-300">{children}</div>
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
  const style = active
    ? 'bg-accent-strong text-white'
    : 'bg-zinc-200/70 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
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
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-700">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-base text-zinc-500 dark:text-zinc-400">{children}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

// ────────────────────────────────── Badge ──────────────────────────────────

export function MasteredBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-sm font-semibold text-accent-strong dark:bg-zinc-800">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M8 1l2 4.1 4.5.7-3.2 3.2.7 4.5L8 11.4 4 13.5l.7-4.5L1.5 5.8 6 5.1 8 1z" />
      </svg>
      Mastered
    </span>
  )
}
