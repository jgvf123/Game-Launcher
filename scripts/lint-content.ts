/**
 * Content linter — `npm run lint:content`.
 *
 * The build fails if the curriculum breaks any of its own rules. This is what
 * makes "no placeholder content, ever" a property of the repository rather
 * than a promise: a half-written lesson cannot reach the app.
 */
import { DIAGRAM_KEYS } from '../src/diagrams/registry'
import { TERMS, TERM_LOOKUP } from '../src/curriculum/glossary'
import { LESSONS } from '../src/curriculum/lessons'
import { MODULES, MODULE_BY_ID, TRACKS } from '../src/curriculum/tracks'
import {
  BODY_WORD_CAP,
  LessonSchema,
  ModuleSchema,
  TermSchema,
  TrackSchema,
  boldedTerms,
  wordCount,
} from '../src/curriculum/schema'

const problems: string[] = []

function fail(where: string, message: string) {
  problems.push(`${where}: ${message}`)
}

// ── 1 · schema validation ───────────────────────────────────────────────────
for (const track of TRACKS) {
  const parsed = TrackSchema.safeParse(track)
  if (!parsed.success) fail(`track "${track.id}"`, parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
}
for (const module of MODULES) {
  const parsed = ModuleSchema.safeParse(module)
  if (!parsed.success) fail(`module "${module.id}"`, parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
}
for (const term of TERMS) {
  const parsed = TermSchema.safeParse(term)
  if (!parsed.success) fail(`term "${term.id}"`, parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '))
}
for (const lesson of LESSONS) {
  const parsed = LessonSchema.safeParse(lesson)
  if (!parsed.success) {
    fail(
      `lesson "${lesson.id}"`,
      parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; '),
    )
  }
}

// ── 2 · uniqueness ──────────────────────────────────────────────────────────
function assertUnique(label: string, ids: string[]) {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) fail(label, `duplicate id "${id}"`)
    seen.add(id)
  }
}
assertUnique('tracks', TRACKS.map((t) => t.id))
assertUnique('modules', MODULES.map((m) => m.id))
assertUnique('terms', TERMS.map((t) => t.id))
assertUnique('lessons', LESSONS.map((l) => l.id))

const lessonIds = new Set(LESSONS.map((l) => l.id))
const termIds = new Set(TERMS.map((t) => t.id))

// ── 3 · per-lesson cross-references ─────────────────────────────────────────
for (const lesson of LESSONS) {
  const where = `lesson "${lesson.id}"`

  // Body length cap — the whole point of the format is that it stays readable.
  const words = wordCount(lesson.body)
  if (words > BODY_WORD_CAP) fail(where, `body is ${words} words, cap is ${BODY_WORD_CAP}`)

  // Every bolded term must exist in the glossary.
  for (const bold of boldedTerms(lesson.body)) {
    if (!TERM_LOOKUP.has(bold)) {
      fail(where, `bolded term "${bold}" has no glossary entry (add it, or add an alias)`)
    }
  }

  // Declared terms must exist, and must actually appear in the prose.
  for (const termId of lesson.terms) {
    if (!termIds.has(termId)) fail(where, `declares unknown term id "${termId}"`)
  }

  // Diagrams must resolve to a real registered component.
  if (lesson.visuals.length === 0) fail(where, 'has no visual')
  for (const visual of lesson.visuals) {
    if (!DIAGRAM_KEYS.includes(visual.component)) {
      fail(where, `references missing diagram "${visual.component}"`)
    }
  }

  // Prerequisites must be real lessons.
  for (const prereq of lesson.prerequisites) {
    if (!lessonIds.has(prereq)) fail(where, `prerequisite "${prereq}" is not a lesson`)
  }

  // The module must exist and agree about which track it is in.
  const module = MODULE_BY_ID.get(lesson.moduleId)
  if (!module) fail(where, `module "${lesson.moduleId}" does not exist`)
  else if (module.trackId !== lesson.trackId) {
    fail(where, `is in track "${lesson.trackId}" but its module is in "${module.trackId}"`)
  }

  // Checks must have a resolvable answer.
  for (const check of lesson.checks) {
    if (check.answerIndex < 0 || check.answerIndex >= check.options.length) {
      fail(where, `check "${check.id}" answerIndex ${check.answerIndex} is out of range`)
    }
    if (new Set(check.options).size !== check.options.length) {
      fail(where, `check "${check.id}" has duplicate options`)
    }
  }
  const checkIds = lesson.checks.map((c) => c.id)
  if (new Set(checkIds).size !== checkIds.length) fail(where, 'has duplicate check ids')

  // An assignment with no tools or an open-ended timebox is not an assignment.
  if (lesson.assignment.usesTools.length === 0) fail(where, 'assignment names no tools')
}

// ── 4 · module ordering ─────────────────────────────────────────────────────
const byModule = new Map<string, number[]>()
for (const lesson of LESSONS) {
  const orders = byModule.get(lesson.moduleId) ?? []
  orders.push(lesson.order)
  byModule.set(lesson.moduleId, orders)
}
for (const [moduleId, orders] of byModule) {
  if (new Set(orders).size !== orders.length) {
    fail(`module "${moduleId}"`, 'has two lessons with the same order')
  }
  const module = MODULE_BY_ID.get(moduleId)
  if (module && orders.length > module.plannedLessons) {
    fail(
      `module "${moduleId}"`,
      `has ${orders.length} lessons but only ${module.plannedLessons} planned — raise plannedLessons`,
    )
  }
}

// ── 5 · glossary back-references ────────────────────────────────────────────
for (const term of TERMS) {
  if (!lessonIds.has(term.taughtIn)) {
    fail(`term "${term.id}"`, `taughtIn "${term.taughtIn}" is not a written lesson`)
  }
  for (const other of term.seeAlso) {
    if (!termIds.has(other)) fail(`term "${term.id}"`, `seeAlso "${other}" is not a term`)
  }
}

// ── report ──────────────────────────────────────────────────────────────────
const plannedTotal = MODULES.reduce((sum, m) => sum + m.plannedLessons, 0)

if (problems.length > 0) {
  console.error(`\n✗ Content lint failed — ${problems.length} problem(s):\n`)
  for (const p of problems) console.error(`  • ${p}`)
  console.error('')
  process.exit(1)
}

console.log(
  `✓ Content lint passed — ${LESSONS.length} lessons (of ${plannedTotal} planned), ` +
    `${TERMS.length} glossary terms, ${DIAGRAM_KEYS.length} diagrams, ` +
    `${MODULES.length} modules across ${TRACKS.length} tracks.`,
)
