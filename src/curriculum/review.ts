import { CARDS } from '../content'
import { TERMS } from './glossary'
import { LESSONS } from './lessons'

/**
 * One unified review queue.
 *
 * Lesson checks and glossary terms both become review items with namespaced
 * ids, so a single SM-2 scheduler drives every kind of recall the app
 * teaches — alongside the v1 concept cards, which keep their bare ids. You
 * never end up with three separate streaks.
 */
export type ReviewKind = 'check' | 'term' | 'card'

export interface ReviewItem {
  id: string
  kind: ReviewKind
  /** Lesson this item trains, for the weak-areas panel. */
  lessonId: string
  trackId: string
  prompt: string
  options: string[]
  answerIndex: number
  why: string
}

export const CHECK_PREFIX = 'check:'
export const TERM_PREFIX = 'term:'

export function checkItemId(lessonId: string, questionId: string): string {
  return `${CHECK_PREFIX}${lessonId}:${questionId}`
}

export function termItemId(termId: string): string {
  return `${TERM_PREFIX}${termId}`
}

/** Deterministic pick of three wrong answers from the other glossary terms. */
function distractorsFor(termId: string): string[] {
  const others = TERMS.filter((t) => t.id !== termId)
  const picked: string[] = []
  let cursor = termId.length * 7
  let guard = 0
  while (picked.length < 3 && guard < 200) {
    const candidate = others[cursor % others.length]
    if (candidate && !picked.includes(candidate.term)) picked.push(candidate.term)
    cursor += 13
    guard += 1
  }
  return picked
}

function buildItems(): ReviewItem[] {
  const items: ReviewItem[] = []

  for (const lesson of LESSONS) {
    for (const q of lesson.checks) {
      items.push({
        id: checkItemId(lesson.id, q.id),
        kind: 'check',
        lessonId: lesson.id,
        trackId: lesson.trackId,
        prompt: q.prompt,
        options: q.options,
        answerIndex: q.answerIndex,
        why: q.why,
      })
    }
  }

  for (const term of TERMS) {
    const wrong = distractorsFor(term.id)
    if (wrong.length < 3) continue
    // Deterministic slot so the answer is not always in the same position.
    const slot = term.id.length % 4
    const options = [...wrong]
    options.splice(slot, 0, term.term)
    items.push({
      id: termItemId(term.id),
      kind: 'term',
      lessonId: term.taughtIn,
      trackId: term.trackId,
      prompt: `Which term does this describe? — ${term.definition}`,
      options,
      answerIndex: slot,
      why: term.hinglish,
    })
  }

  // The v1 concept cards join the same queue under their own bare ids, so
  // their existing SM-2 history from Frame School v1 carries straight over.
  for (const card of CARDS) {
    const others = CARDS.filter((c) => c.module === card.module && c.id !== card.id)
    if (others.length < 3) continue
    const wrong: string[] = []
    let cursor = card.id.length * 5
    let guard = 0
    while (wrong.length < 3 && guard < 200) {
      const candidate = others[cursor % others.length]
      if (candidate && !wrong.includes(candidate.name)) wrong.push(candidate.name)
      cursor += 7
      guard += 1
    }
    if (wrong.length < 3) continue
    const slot = card.id.length % 4
    const options = [...wrong]
    options.splice(slot, 0, card.name)
    items.push({
      id: card.id,
      kind: 'card',
      lessonId: `v1:${card.module}`,
      trackId: 'camera',
      prompt: `Which technique is this? — ${card.shortDefinition}`,
      options,
      answerIndex: slot,
      why: card.explanation,
    })
  }

  return items
}

export const REVIEW_ITEMS: ReviewItem[] = buildItems()
export const REVIEW_ITEM_BY_ID = new Map(REVIEW_ITEMS.map((i) => [i.id, i]))

/** Review items belonging to lessons the learner has actually opened. */
export function itemsForLessons(lessonIds: Set<string>): ReviewItem[] {
  return REVIEW_ITEMS.filter((i) => lessonIds.has(i.lessonId))
}
