import { TERMS, TERM_BY_ID, TERM_LOOKUP } from './glossary'
import { LESSONS } from './lessons'
import { MODULES, MODULE_BY_ID, TRACKS, TRACK_BY_ID, modulesInTrack } from './tracks'
import type { Lesson, Module, Term, Track, TrackId } from './schema'

export {
  LESSONS,
  TERMS,
  TERM_BY_ID,
  TERM_LOOKUP,
  MODULES,
  MODULE_BY_ID,
  TRACKS,
  TRACK_BY_ID,
  modulesInTrack,
}
export type { Lesson, Module, Term, Track, TrackId }
export * from './review'

export const LESSON_BY_ID = new Map(LESSONS.map((l) => [l.id, l]))

export function lessonsInModule(moduleId: string): Lesson[] {
  return LESSONS.filter((l) => l.moduleId === moduleId).sort((a, b) => a.order - b.order)
}

export function lessonsInTrack(trackId: TrackId): Lesson[] {
  return LESSONS.filter((l) => l.trackId === trackId)
}

export function termsInTrack(trackId: TrackId): Term[] {
  return TERMS.filter((t) => t.trackId === trackId)
}

/** Written vs planned lesson counts, so the UI never overstates what exists. */
export function trackScope(trackId: TrackId): { written: number; planned: number } {
  return {
    written: lessonsInTrack(trackId).length,
    planned: modulesInTrack(trackId).reduce((sum, m) => sum + m.plannedLessons, 0),
  }
}

export const CURRICULUM_SCOPE = {
  written: LESSONS.length,
  planned: MODULES.reduce((sum, m) => sum + m.plannedLessons, 0),
}

/** Curriculum-wide lesson order, used for previous/next links. */
export const LESSON_SEQUENCE: Lesson[] = TRACKS.flatMap((t) =>
  modulesInTrack(t.id).flatMap((m) => lessonsInModule(m.id)),
)

export function nextLesson(lessonId: string): Lesson | undefined {
  const i = LESSON_SEQUENCE.findIndex((l) => l.id === lessonId)
  return i >= 0 ? LESSON_SEQUENCE[i + 1] : undefined
}

export function prevLesson(lessonId: string): Lesson | undefined {
  const i = LESSON_SEQUENCE.findIndex((l) => l.id === lessonId)
  return i > 0 ? LESSON_SEQUENCE[i - 1] : undefined
}
