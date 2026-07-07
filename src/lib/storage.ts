/** Namespaced, JSON-typed localStorage helpers. All app data lives under `fs.*`. */

const PREFIX = 'fs.'

export const KEYS = {
  reviews: `${PREFIX}reviews`,
  quizzes: `${PREFIX}quizzes`,
  streak: `${PREFIX}streak`,
  theme: `${PREFIX}theme`,
  stories: `${PREFIX}stories`,
} as const

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — the app keeps working in memory.
  }
}

export function remove(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

/** Local calendar date as YYYY-MM-DD (streaks are day-based, in local time). */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function daysBetween(fromKey: string, toKey: string): number {
  const from = new Date(`${fromKey}T12:00:00`)
  const to = new Date(`${toKey}T12:00:00`)
  return Math.round((to.getTime() - from.getTime()) / 86_400_000)
}
