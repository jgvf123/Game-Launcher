/** Prompt Lab — shared types. All teaching content lives in structured data files. */

export type LabModuleId =
  | 'foundations'
  | 'dialects'
  | 'negatives'
  | 'cine-vocab'
  | 'recipes-still'
  | 'video'
  | 'context'
  | 'faces'
  | 'brand'
  | 'artifacts'
  | 'workflow'
  | 'landscape'

export interface LabModule {
  id: LabModuleId
  title: string
  tagline: string
  order: number
}

export interface PromptAnnotation {
  /** Exact substring of the prompt this note explains (first occurrence is highlighted). */
  span: string
  why: string
}

export interface AnnotatedExample {
  label?: string
  prompt: string
  model?: string
  annotations: PromptAnnotation[]
}

export interface LabLesson {
  id: string
  module: LabModuleId
  title: string
  summary: string
  /** Paragraphs. */
  explanation: string[]
  examples: AnnotatedExample[]
  relatedIds: string[]
  tags: string[]
}

export type ImageModel = 'midjourney' | 'flux' | 'sd' | 'dalle'
export type VideoModel = 'veo' | 'kling' | 'runway'

export interface Recipe {
  id: string
  type: 'still' | 'video'
  title: string
  useCase:
    | 'portrait'
    | 'product'
    | 'environment'
    | 'concept'
    | 'framing-variant'
    | 'lighting-variant'
    | 'video'
  prompt: string
  annotations: PromptAnnotation[]
  models: string[]
  moodTags: string[]
}

export interface ModelCard {
  id: string
  name: string
  kind: 'image' | 'video' | 'both'
  lane: string
  dialect: string
  clipLengthRes: string
  costTier: 'free/open' | '$' | '$$' | '$$$'
  lastUpdated: string
  note: string
}

export type LabQuestionType =
  | 'spot-weak'
  | 'fix-prompt'
  | 'which-model'
  | 'order-slots'
  | 'identify-technique'
  | 'scenario'

export interface LabQuizItem {
  id: string
  type: LabQuestionType
  module: LabModuleId
  /** Lesson whose SM-2 state this question trains. */
  lessonId: string
  question: string
  /** For 'spot-weak' the two prompts; otherwise the choices. */
  options: { text: string; correct?: boolean }[]
  reason: string
}
