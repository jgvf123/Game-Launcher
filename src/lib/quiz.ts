import { CARDS, CARD_BY_ID } from '../content'
import type { CardDef } from '../content'
import type { QuizScope } from './state'

export type QuestionType = 'image-to-name' | 'name-to-definition' | 'scenario' | 'fill-blank'

export interface QuizChoice {
  text: string
  correct: boolean
}

export interface QuizQuestion {
  type: QuestionType
  cardId: string
  /** For image-to-name this is the illustration's card id; otherwise a text prompt. */
  prompt: string
  choices: QuizChoice[]
  /** One-line reason shown with the feedback. */
  reason: string
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function scopedCards(scope: QuizScope): CardDef[] {
  switch (scope.kind) {
    case 'all':
      return CARDS
    case 'module':
      return CARDS.filter((c) => c.module === scope.moduleId)
    case 'mood':
      return CARDS.filter((c) => c.moodTags.includes(scope.mood))
  }
}

/** Distractor cards: same module first, then anywhere, never the card itself. */
function distractorCards(card: CardDef, count: number): CardDef[] {
  const sameModule = shuffle(CARDS.filter((c) => c.module === card.module && c.id !== card.id))
  const others = shuffle(CARDS.filter((c) => c.module !== card.module))
  return [...sameModule, ...others].slice(0, count)
}

function nameChoices(card: CardDef): QuizChoice[] {
  return shuffle([
    { text: card.name, correct: true },
    ...distractorCards(card, 3).map((c) => ({ text: c.name, correct: false })),
  ])
}

function buildQuestion(card: CardDef, type: QuestionType): QuizQuestion {
  switch (type) {
    case 'image-to-name':
      return {
        type,
        cardId: card.id,
        prompt: card.id,
        choices: nameChoices(card),
        reason: card.shortDefinition,
      }
    case 'name-to-definition':
      return {
        type,
        cardId: card.id,
        prompt: card.name,
        choices: shuffle([
          { text: card.shortDefinition, correct: true },
          ...distractorCards(card, 3).map((c) => ({ text: c.shortDefinition, correct: false })),
        ]),
        reason: `${card.name}: ${card.shortDefinition}`,
      }
    case 'scenario':
      return {
        type,
        cardId: card.id,
        prompt: card.scenario,
        choices: nameChoices(card),
        reason: card.shortDefinition,
      }
    case 'fill-blank':
      return {
        type,
        cardId: card.id,
        prompt: card.blank.sentence,
        choices: shuffle([
          { text: card.blank.answer, correct: true },
          ...card.blank.distractors.map((d) => ({ text: d, correct: false })),
        ]),
        reason: card.blank.sentence.replace('____', card.blank.answer),
      }
  }
}

const TYPES: QuestionType[] = ['image-to-name', 'name-to-definition', 'scenario', 'fill-blank']

export function buildQuiz(scope: QuizScope, length = 10): QuizQuestion[] {
  const pool = shuffle(scopedCards(scope)).slice(0, length)
  // Cycle through the four types over shuffled cards so every quiz is mixed.
  const typeOrder = shuffle(TYPES)
  return pool.map((card, i) => buildQuestion(card, typeOrder[i % typeOrder.length]))
}

export function cardName(cardId: string): string {
  return CARD_BY_ID.get(cardId)?.name ?? cardId
}
