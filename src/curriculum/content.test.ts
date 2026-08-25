import { describe, expect, it } from 'vitest'
import { DIAGRAM_KEYS } from '../diagrams/registry'
import { TERMS, TERM_LOOKUP } from './glossary'
import { LESSONS } from './lessons'
import { MODULE_BY_ID } from './tracks'
import { REVIEW_ITEMS } from './review'
import { BODY_WORD_CAP, LessonSchema, TermSchema, boldedTerms, wordCount } from './schema'

/**
 * These mirror `npm run lint:content` so the invariants are enforced by the
 * test run too — content rules should fail in whichever gate runs first.
 */
describe('lessons', () => {
  it.each(LESSONS.map((l) => [l.id, l] as const))('%s satisfies the schema', (_id, lesson) => {
    expect(LessonSchema.safeParse(lesson).success).toBe(true)
  })

  it.each(LESSONS.map((l) => [l.id, l] as const))('%s stays under the word cap', (_id, lesson) => {
    expect(wordCount(lesson.body)).toBeLessThanOrEqual(BODY_WORD_CAP)
  })

  it.each(LESSONS.map((l) => [l.id, l] as const))(
    '%s only bolds terms the glossary defines',
    (_id, lesson) => {
      const unknown = boldedTerms(lesson.body).filter((t) => !TERM_LOOKUP.has(t))
      expect(unknown).toEqual([])
    },
  )

  it.each(LESSONS.map((l) => [l.id, l] as const))('%s points at real diagrams', (_id, lesson) => {
    expect(lesson.visuals.length).toBeGreaterThan(0)
    for (const v of lesson.visuals) expect(DIAGRAM_KEYS).toContain(v.component)
  })

  it.each(LESSONS.map((l) => [l.id, l] as const))('%s sits in a real module', (_id, lesson) => {
    const module = MODULE_BY_ID.get(lesson.moduleId)
    expect(module).toBeDefined()
    expect(module?.trackId).toBe(lesson.trackId)
  })

  it('has unique ids', () => {
    const ids = LESSONS.map((l) => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('glossary', () => {
  it.each(TERMS.map((t) => [t.id, t] as const))('%s satisfies the schema', (_id, term) => {
    expect(TermSchema.safeParse(term).success).toBe(true)
  })

  it('only points taughtIn at written lessons', () => {
    const ids = new Set(LESSONS.map((l) => l.id))
    for (const term of TERMS) expect(ids.has(term.taughtIn)).toBe(true)
  })
})

describe('review items', () => {
  it('gives every item a resolvable answer', () => {
    for (const item of REVIEW_ITEMS) {
      expect(item.options.length).toBeGreaterThanOrEqual(3)
      expect(item.answerIndex).toBeGreaterThanOrEqual(0)
      expect(item.answerIndex).toBeLessThan(item.options.length)
      expect(new Set(item.options).size).toBe(item.options.length)
    }
  })

  it('gives every item a unique id', () => {
    const ids = REVIEW_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers every lesson check', () => {
    const checks = LESSONS.flatMap((l) => l.checks)
    expect(REVIEW_ITEMS.filter((i) => i.kind === 'check')).toHaveLength(checks.length)
  })
})
