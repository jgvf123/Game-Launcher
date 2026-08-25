import { z } from 'zod'

/**
 * The Frame School v2 content contract.
 *
 * Everything the curriculum ships is data validated against these schemas.
 * `npm run lint:content` runs them (plus the cross-reference checks in
 * `scripts/lint-content.ts`) and fails the build on any violation, so a
 * half-written lesson can never reach the app.
 */

/** ≤600 words, enforced. Prose is markdown; taught terms are **bolded**. */
const BODY_WORD_CAP = 600

export const trackIds = [
  'story',
  'script',
  'camera',
  'light',
  'color',
  'editing',
  'sound',
  'production',
  'ai',
  'money',
] as const
export type TrackId = (typeof trackIds)[number]

export const TrackSchema = z.object({
  id: z.enum(trackIds),
  letter: z.string().length(1),
  title: z.string().min(3),
  tagline: z.string().min(10),
  order: z.number().int().positive(),
})
export type Track = z.infer<typeof TrackSchema>

export const ModuleSchema = z.object({
  id: z.string().min(3),
  trackId: z.enum(trackIds),
  title: z.string().min(3),
  tagline: z.string().min(10),
  order: z.number().int().positive(),
  /**
   * How many lessons this module will hold when complete. Modules whose
   * lessons are not written yet render as an empty shelf — never as a stub
   * lesson. `plannedLessons` is what the progress UI counts against.
   */
  plannedLessons: z.number().int().positive(),
})
export type Module = z.infer<typeof ModuleSchema>

export const TermSchema = z.object({
  id: z.string().min(2),
  term: z.string().min(2),
  /** The same idea in plain Hinglish — this is what makes the app usable. */
  hinglish: z.string().min(10),
  definition: z.string().min(20),
  trackId: z.enum(trackIds),
  /** Lesson id that introduces this term. Cross-checked by the linter. */
  taughtIn: z.string().min(3),
  seeAlso: z.array(z.string()).default([]),
  /**
   * Other spellings a lesson may **bold** for this term (plurals, short forms).
   * The bolded-term linter resolves against `term` plus these.
   */
  aliases: z.array(z.string()).default([]),
})
export type Term = z.infer<typeof TermSchema>

export const DiagramRefSchema = z.object({
  /** Key into the diagram registry. The linter proves it resolves. */
  component: z.string().min(3),
  caption: z.string().min(10),
  interactive: z.boolean(),
})
export type DiagramRef = z.infer<typeof DiagramRefSchema>

/**
 * Rule 5 of the brief, encoded in the type system: a named source requires a
 * year and a specific shot. When confidence in a real source is not there,
 * the only legal alternative is `kind: 'generic'`, which cannot carry a title.
 * Inventing a film is therefore a type error, not a judgement call.
 */
export const ExampleSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('work'),
    title: z.string().min(2),
    year: z.number().int().min(1878).max(2100),
    shot: z.string().min(20),
    why: z.string().min(20),
  }),
  z.object({
    kind: z.literal('generic'),
    shot: z.string().min(20),
    why: z.string().min(20),
  }),
])
export type Example = z.infer<typeof ExampleSchema>

export const QuestionSchema = z.object({
  id: z.string().min(1),
  prompt: z.string().min(10),
  /** Multiple choice keeps review sessions fast on a phone. */
  options: z.array(z.string().min(1)).min(3).max(4),
  answerIndex: z.number().int().min(0),
  why: z.string().min(15),
})
export type Question = z.infer<typeof QuestionSchema>

export const AssignmentSchema = z.object({
  brief: z.string().min(40),
  deliverable: z.string().min(10),
  /** Never open-ended. A task without an end time never gets started. */
  timeboxMinutes: z.number().int().min(15).max(90),
  successCriteria: z.tuple([z.string().min(15), z.string().min(15), z.string().min(15)]),
  /** Free / local tools by default. Paid services only ever as an aside. */
  usesTools: z.array(z.string().min(2)).min(1),
})
export type Assignment = z.infer<typeof AssignmentSchema>

export const LessonSchema = z.object({
  id: z.string().min(3),
  trackId: z.enum(trackIds),
  moduleId: z.string().min(3),
  order: z.number().int().positive(),
  title: z.string().min(5),
  /** The promise of the lesson, in about a dozen words. */
  oneLine: z.string().min(10),
  estMinutes: z.number().int().min(4).max(20),
  prerequisites: z.array(z.string()).default([]),
  body: z.string().min(200),
  hinglishGloss: z.string().min(80),
  visuals: z.array(DiagramRefSchema).min(1),
  filmExamples: z.array(ExampleSchema).length(2),
  commonMistakes: z.tuple([z.string().min(20), z.string().min(20), z.string().min(20)]),
  /** Mandatory. The half of the craft that no course teaches. */
  aiTranslation: z.string().min(200),
  terms: z.array(z.string()).min(1),
  checks: z.tuple([QuestionSchema, QuestionSchema, QuestionSchema]),
  assignment: AssignmentSchema,
})
export type Lesson = z.infer<typeof LessonSchema>

export function wordCount(markdown: string): number {
  return markdown
    .replace(/[#*_>`-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

export { BODY_WORD_CAP }

/** Every `**term**` occurrence in a lesson body, deduped, lowercased. */
export function boldedTerms(markdown: string): string[] {
  const found = new Set<string>()
  for (const match of markdown.matchAll(/\*\*(.+?)\*\*/g)) {
    found.add(match[1].trim().toLowerCase())
  }
  return [...found]
}
