import { describe, expect, it } from 'vitest'
import { applyRating, initialReviewState, isDue, isMastered } from './srs'

const T0 = new Date('2026-01-01T09:00:00Z')
const days = (n: number) => new Date(T0.getTime() + n * 86_400_000)

describe('SM-2 scheduling', () => {
  it('brings a failed card back the same day', () => {
    const state = applyRating(undefined, 'x', 0, T0)
    expect(state.intervalDays).toBe(0)
    expect(isDue(state, T0)).toBe(false)
    expect(isDue(state, new Date(T0.getTime() + 20 * 60 * 1000))).toBe(true)
  })

  it('steps a known card out over days', () => {
    const first = applyRating(undefined, 'x', 1, T0)
    expect(first.intervalDays).toBe(1)
    const second = applyRating(first, 'x', 1, days(1))
    expect(second.intervalDays).toBe(3)
    const third = applyRating(second, 'x', 1, days(4))
    expect(third.intervalDays).toBeGreaterThan(3)
  })

  it('steps an easy card out faster than a merely known one', () => {
    const known = applyRating(applyRating(undefined, 'x', 1, T0), 'x', 1, days(1))
    const easy = applyRating(applyRating(undefined, 'y', 2, T0), 'y', 2, days(1))
    expect(easy.intervalDays).toBeGreaterThan(known.intervalDays)
  })

  it('resets progress but not ease to the floor on a lapse', () => {
    const grown = applyRating(applyRating(undefined, 'x', 1, T0), 'x', 1, days(1))
    const lapsed = applyRating(grown, 'x', 0, days(4))
    expect(lapsed.reps).toBe(0)
    expect(lapsed.intervalDays).toBe(0)
    expect(lapsed.ease).toBeLessThan(grown.ease)
    expect(lapsed.ease).toBeGreaterThanOrEqual(1.3)
  })

  it('treats a card as mastered only after it survives a week', () => {
    let state = initialReviewState('x', T0)
    expect(isMastered(state)).toBe(false)
    state = applyRating(state, 'x', 2, T0)
    state = applyRating(state, 'x', 2, days(2))
    expect(state.intervalDays).toBeGreaterThanOrEqual(6)
    expect(isMastered(state)).toBe(true)
  })

  it('never schedules further out than a year', () => {
    let state = applyRating(undefined, 'x', 2, T0)
    for (let i = 0; i < 20; i++) state = applyRating(state, 'x', 2, days(i + 1))
    expect(state.intervalDays).toBeLessThanOrEqual(365)
  })
})
