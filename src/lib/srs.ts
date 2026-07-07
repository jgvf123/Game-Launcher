/**
 * Lightweight SM-2-style spaced repetition.
 *
 * Ratings map to SM-2 quality: 0 = "Didn't know it" (fail),
 * 1 = "Knew it" (good), 2 = "Knew it well" (easy).
 *
 * Failed cards come back within the same day; passed cards step out
 * 1 day → 3/6 days → interval × ease, with ease drifting per rating.
 */

export type Rating = 0 | 1 | 2

export interface ReviewEntry {
  at: string // ISO timestamp
  rating: Rating
}

export interface ReviewState {
  cardId: string
  ease: number
  intervalDays: number
  reps: number
  lastReviewedAt: string
  nextDueAt: string
  history: ReviewEntry[]
}

const MIN_EASE = 1.3
const DEFAULT_EASE = 2.5
/** Failed cards return after 10 minutes (same session or later today). */
const RELEARN_MS = 10 * 60 * 1000
const DAY_MS = 86_400_000
/** Cap history so localStorage stays small over years of use. */
const HISTORY_LIMIT = 50

export function initialReviewState(cardId: string, now = new Date()): ReviewState {
  return {
    cardId,
    ease: DEFAULT_EASE,
    intervalDays: 0,
    reps: 0,
    lastReviewedAt: now.toISOString(),
    nextDueAt: now.toISOString(),
    history: [],
  }
}

export function applyRating(prev: ReviewState | undefined, cardId: string, rating: Rating, now = new Date()): ReviewState {
  const state = prev ?? initialReviewState(cardId, now)
  const history = [...state.history, { at: now.toISOString(), rating }].slice(-HISTORY_LIMIT)

  let { ease, intervalDays, reps } = state

  if (rating === 0) {
    reps = 0
    intervalDays = 0
    ease = Math.max(MIN_EASE, ease - 0.2)
    return {
      ...state,
      ease,
      intervalDays,
      reps,
      history,
      lastReviewedAt: now.toISOString(),
      nextDueAt: new Date(now.getTime() + RELEARN_MS).toISOString(),
    }
  }

  // SM-2 ease drift: quality 4 ("knew it") ≈ 0, quality 5 ("knew it well") ≈ +0.1
  ease = Math.max(MIN_EASE, ease + (rating === 2 ? 0.1 : 0))
  reps += 1
  if (reps === 1) {
    intervalDays = rating === 2 ? 2 : 1
  } else if (reps === 2) {
    intervalDays = rating === 2 ? 6 : 3
  } else {
    intervalDays = Math.round(intervalDays * ease * (rating === 2 ? 1.15 : 1))
  }
  intervalDays = Math.min(intervalDays, 365)

  return {
    ...state,
    ease,
    intervalDays,
    reps,
    history,
    lastReviewedAt: now.toISOString(),
    nextDueAt: new Date(now.getTime() + intervalDays * DAY_MS).toISOString(),
  }
}

export function isDue(state: ReviewState | undefined, now = new Date()): boolean {
  if (!state) return false
  return new Date(state.nextDueAt).getTime() <= now.getTime()
}

/**
 * A card counts as "mastered" once it has survived at least two consecutive
 * successful reviews and its interval has grown to roughly a week.
 */
export function isMastered(state: ReviewState | undefined): boolean {
  if (!state) return false
  const last = state.history[state.history.length - 1]
  return state.reps >= 2 && state.intervalDays >= 6 && last !== undefined && last.rating >= 1
}
