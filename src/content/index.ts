import { CARDS } from './cards'
import { MODULES, MODULE_BY_ID } from './modules'
import type { CardDef, ModuleId, Mood } from './types'

export { CARDS, MODULES, MODULE_BY_ID }
export type { CardDef, ModuleId, Mood }

export const CARD_BY_ID = new Map(CARDS.map((c) => [c.id, c]))

export function cardsByModule(moduleId: ModuleId): CardDef[] {
  return CARDS.filter((c) => c.module === moduleId)
}

export function cardsByMood(mood: Mood): CardDef[] {
  return CARDS.filter((c) => c.moodTags.includes(mood))
}

export const ALL_MOODS: Mood[] = [
  'tense',
  'romantic',
  'heroic',
  'vulnerable',
  'chaotic',
  'calm',
  'mysterious',
  'joyful',
  'intimate',
  'epic',
  'unsettling',
  'melancholy',
]
