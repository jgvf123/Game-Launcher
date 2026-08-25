import type { Lesson } from '../schema'
import { LENS_AND_PERSPECTIVE } from './lens-and-perspective'

/**
 * Every written lesson in the curriculum.
 * Modules whose lessons are not written yet simply have no entries here —
 * the app renders them as an empty shelf rather than as a stub.
 */
export const LESSONS: Lesson[] = [...LENS_AND_PERSPECTIVE].sort(
  (a, b) => a.moduleId.localeCompare(b.moduleId) || a.order - b.order,
)
