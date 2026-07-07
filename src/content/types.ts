export type ModuleId =
  | 'shot-sizes'
  | 'camera-angles'
  | 'lens'
  | 'movement'
  | 'lighting'
  | 'mood-color'

export type Mood =
  | 'tense'
  | 'romantic'
  | 'heroic'
  | 'vulnerable'
  | 'chaotic'
  | 'calm'
  | 'mysterious'
  | 'joyful'
  | 'intimate'
  | 'epic'
  | 'unsettling'
  | 'melancholy'

export interface FillBlank {
  /** Sentence containing exactly one `____` placeholder. Must not contain the answer text. */
  sentence: string
  answer: string
  distractors: [string, string, string]
}

export interface CardDef {
  id: string
  module: ModuleId
  name: string
  shortDefinition: string
  explanation: string
  moodTags: Mood[]
  relatedCardIds: string[]
  /** Scenario prompt whose correct answer is this card's technique. */
  scenario: string
  blank: FillBlank
}

export interface ModuleDef {
  id: ModuleId
  title: string
  tagline: string
  order: number
}
