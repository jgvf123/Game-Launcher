import { NavLink, Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'

const NAV_ITEMS: {
  to: string
  label: string
  longLabel?: string
  icon: ReactNode
  end?: boolean
}[] = [
  {
    to: '/',
    label: 'Home',
    end: true,
    icon: (
      <path d="M3 10.5 12 3l9 7.5V21h-6v-6h-6v6H3v-10.5z" />
    ),
  },
  {
    to: '/library',
    label: 'Library',
    icon: (
      <path d="M4 4h5v16H4zM10.5 4h5v16h-5zM17.5 5.2l4.4 1.2-3.9 14.4-4.4-1.2z" />
    ),
  },
  {
    to: '/study',
    label: 'Study',
    icon: (
      <path d="M12 4 2 9l10 5 8-4v6h2V9L12 4zM6 13.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.5l-6 3-6-3z" />
    ),
  },
  {
    to: '/test',
    label: 'Test',
    icon: (
      <path d="M9 3h6l1 2h4v16H4V5h4l1-2zm3 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm-1 7.5-2.2-2.2 1-1L11 12.5l3.2-3.2 1 1L11 14.5z" />
    ),
  },
  {
    to: '/storyboard',
    label: 'Board',
    longLabel: 'Storyboard',
    icon: (
      <path d="M3 4h8v7H3V4zm10 0h8v7h-8V4zM3 13h8v7H3v-7zm10 0h8v7h-8v-7z" />
    ),
  },
  {
    to: '/lab',
    label: 'Lab',
    longLabel: 'Prompt Lab',
    icon: (
      <path d="M9 2h6v2h-1v5.2l4.8 8.4A2 2 0 0 1 17.1 21H6.9a2 2 0 0 1-1.7-3.4L10 9.2V4H9V2zm3 8.6L8.7 16h6.6L12 10.6z" />
    ),
  },
  {
    to: '/progress',
    label: 'Progress',
    icon: (
      <path d="M4 20V10h4v10H4zm6 0V4h4v16h-4zm6 0v-7h4v7h-4z" />
    ),
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm9 4a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L16 3H8l-.4 2.6a7 7 0 0 0-2 1.2l-2.5-1-2 3.4 2 1.6A7 7 0 0 0 3 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L8 21h8l.4-2.6a7 7 0 0 0 2-1.2l2.5 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z" />
    ),
  },
]

function NavItems({ orientation }: { orientation: 'side' | 'bottom' }) {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            orientation === 'side'
              ? `flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-accent-soft text-accent-strong dark:bg-zinc-800 dark:text-accent'
                    : 'text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-zinc-800/70'
                }`
              : `flex flex-1 flex-col items-center gap-0.5 rounded-md py-1.5 text-xs font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-accent-strong dark:text-accent'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`
          }
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden>
            {item.icon}
          </svg>
          <span>{orientation === 'side' ? (item.longLabel ?? item.label) : item.label}</span>
        </NavLink>
      ))}
    </>
  )
}

export function Layout() {
  return (
    <div className="min-h-dvh">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-56 flex-col border-r border-zinc-200 bg-white p-4 md:flex dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 flex items-center gap-2.5 px-2 pt-1">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent-strong" fill="currentColor" aria-hidden>
            <path d="M3 5h18v14H3V5zm2 2v2h2V7H5zm0 4v2h2v-2H5zm0 4v2h2v-2H5zm14-8v2h2V7h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2zM9 7v10h6V7H9z" />
          </svg>
          <span className="text-lg font-bold tracking-tight">Frame School</span>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Main">
          <NavItems orientation="side" />
        </nav>
        <p className="mt-auto px-2 text-xs text-zinc-400 dark:text-zinc-500">
          The visual grammar of filmmaking.
        </p>
      </aside>

      {/* Mobile bottom tabs */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-zinc-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-1 md:hidden dark:border-zinc-800 dark:bg-zinc-900"
      >
        <NavItems orientation="bottom" />
      </nav>

      <main className="min-h-dvh md:pl-56">
        <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6 md:px-8 md:pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
