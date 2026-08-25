import { NavLink, Outlet, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

/**
 * Four destinations, and no more.
 *
 * The app used to expose sixteen routes in one rail, which made every screen
 * a decision. Everything still exists — Practice gathers the tools, More
 * gathers the reference and the older sections — but the top level asks you
 * one question at a time: are you learning, reviewing, making, or looking
 * something up.
 */
const NAV: { to: string; label: string; end?: boolean; icon: ReactNode }[] = [
  {
    to: '/',
    label: 'Learn',
    end: true,
    icon: (
      <path d="M12 4 2 9l10 5 8-4v6h2V9L12 4zM6 13.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.5l-6 3-6-3z" />
    ),
  },
  {
    to: '/review',
    label: 'Review',
    icon: <path d="M12 5V2L7.5 6.5 12 11V8a5 5 0 1 1-5 5H5a7 7 0 1 0 7-8z" />,
  },
  {
    to: '/practice',
    label: 'Practice',
    icon: <path d="M3 5h6l2 2h10v12H3V5zm2 2v10h14V9h-8.8L8.2 7H5z" />,
  },
  {
    to: '/more',
    label: 'More',
    icon: (
      <path d="M5 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    ),
  },
]

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent-strong" fill="currentColor" aria-hidden>
      <path d="M3 5h18v14H3V5zm2 2v2h2V7H5zm0 4v2h2v-2H5zm0 4v2h2v-2H5zm14-8v2h2V7h-2zm0 4v2h2v-2h-2zm0 4v2h2v-2h-2zM9 7v10h6V7H9z" />
    </svg>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  // A lesson is a reading surface: the chrome steps back and lets it breathe.
  const focused = pathname.startsWith('/lesson/')

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center gap-4 px-5">
          <NavLink to="/" className="flex items-center gap-2 text-[0.95rem] font-semibold">
            <Mark />
            <span className={focused ? 'sr-only sm:not-sr-only' : ''}>Frame School</span>
          </NavLink>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 sm:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-[0.95rem] transition-colors ${
                    isActive
                      ? 'font-semibold text-ink'
                      : 'text-ink-soft hover:bg-surface hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <div className="mx-auto w-full max-w-3xl px-5 pb-28 pt-8 sm:pb-16">
          <Outlet />
        </div>
      </main>

      {/* Mobile: four tabs, comfortably sized. */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-paper/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1.5 backdrop-blur-sm sm:hidden"
      >
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-xs transition-colors ${
                isActive ? 'font-semibold text-accent-strong dark:text-accent' : 'text-ink-faint'
              }`
            }
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              {item.icon}
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
