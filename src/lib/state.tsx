import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CARDS, CARD_BY_ID, MODULES } from '../content'
import type { ModuleId, Mood } from '../content'
import { applyRating, isDue, isMastered, type Rating, type ReviewState } from './srs'
import { KEYS, daysBetween, load, remove, save, todayKey } from './storage'

export type QuizScope =
  | { kind: 'all' }
  | { kind: 'module'; moduleId: ModuleId }
  | { kind: 'mood'; mood: Mood }

export interface QuizRecord {
  id: string
  date: string // ISO
  scope: QuizScope
  score: number
  total: number
  missedCardIds: string[]
}

export interface StreakState {
  currentStreak: number
  longestStreak: number
  lastStudyDate: string | null // YYYY-MM-DD
}

export interface StoryProgress {
  beatsDone: number
  mistakes: number
  completed: boolean
}

/** Best result achieved on a drill: nailed it, picked the workable option, or got there via retries. */
export type DrillResult = 'perfect' | 'good' | 'learned'

type Theme = 'light' | 'dark'

interface AppState {
  reviews: Record<string, ReviewState>
  quizzes: QuizRecord[]
  streak: StreakState
  stories: Record<string, StoryProgress>
  drills: Record<string, DrillResult>
  theme: Theme
  rateCard: (cardId: string, rating: Rating) => void
  recordQuiz: (record: Omit<QuizRecord, 'id' | 'date'>) => void
  setStoryProgress: (storyId: string, progress: StoryProgress) => void
  resetStory: (storyId: string) => void
  recordDrill: (drillId: string, result: DrillResult) => void
  /** Advance the daily streak from any learning activity (used by Prompt Lab). */
  touchStreak: () => void
  setTheme: (theme: Theme) => void
  resetModule: (moduleId: ModuleId) => void
  resetAll: () => void
}

const EMPTY_STREAK: StreakState = { currentStreak: 0, longestStreak: 0, lastStudyDate: null }

const AppStateContext = createContext<AppState | null>(null)

function initialTheme(): Theme {
  const stored = load<Theme | null>(KEYS.theme, null)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function advanceStreak(prev: StreakState): StreakState {
  const today = todayKey()
  if (prev.lastStudyDate === today) return prev
  const continued = prev.lastStudyDate !== null && daysBetween(prev.lastStudyDate, today) === 1
  const current = continued ? prev.currentStreak + 1 : 1
  return {
    currentStreak: current,
    longestStreak: Math.max(prev.longestStreak, current),
    lastStudyDate: today,
  }
}

/** A streak that wasn't continued yesterday reads as 0 today. */
export function effectiveStreak(streak: StreakState): number {
  if (!streak.lastStudyDate) return 0
  const gap = daysBetween(streak.lastStudyDate, todayKey())
  return gap <= 1 ? streak.currentStreak : 0
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Record<string, ReviewState>>(() =>
    load(KEYS.reviews, {}),
  )
  const [quizzes, setQuizzes] = useState<QuizRecord[]>(() => load(KEYS.quizzes, []))
  const [streak, setStreak] = useState<StreakState>(() => load(KEYS.streak, EMPTY_STREAK))
  const [stories, setStories] = useState<Record<string, StoryProgress>>(() =>
    load(KEYS.stories, {}),
  )
  const [drills, setDrills] = useState<Record<string, DrillResult>>(() => load(KEYS.drills, {}))
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useEffect(() => save(KEYS.reviews, reviews), [reviews])
  useEffect(() => save(KEYS.quizzes, quizzes), [quizzes])
  useEffect(() => save(KEYS.streak, streak), [streak])
  useEffect(() => save(KEYS.stories, stories), [stories])
  useEffect(() => save(KEYS.drills, drills), [drills])
  useEffect(() => {
    save(KEYS.theme, theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const rateCard = useCallback((cardId: string, rating: Rating) => {
    setReviews((prev) => ({ ...prev, [cardId]: applyRating(prev[cardId], cardId, rating) }))
    setStreak(advanceStreak)
  }, [])

  const recordQuiz = useCallback((record: Omit<QuizRecord, 'id' | 'date'>) => {
    setQuizzes((prev) => [
      ...prev,
      { ...record, id: crypto.randomUUID(), date: new Date().toISOString() },
    ])
    setStreak(advanceStreak)
  }, [])

  const setStoryProgress = useCallback((storyId: string, progress: StoryProgress) => {
    setStories((prev) => ({ ...prev, [storyId]: progress }))
    setStreak(advanceStreak)
  }, [])

  const resetStory = useCallback((storyId: string) => {
    setStories((prev) => Object.fromEntries(Object.entries(prev).filter(([id]) => id !== storyId)))
  }, [])

  const DRILL_RANK: Record<DrillResult, number> = useMemo(
    () => ({ perfect: 3, good: 2, learned: 1 }),
    [],
  )

  const recordDrill = useCallback(
    (drillId: string, result: DrillResult) => {
      setDrills((prev) => {
        const existing = prev[drillId]
        // Keep the best result ever achieved for the drill.
        if (existing && DRILL_RANK[existing] >= DRILL_RANK[result]) return prev
        return { ...prev, [drillId]: result }
      })
      setStreak(advanceStreak)
    },
    [DRILL_RANK],
  )

  const touchStreak = useCallback(() => setStreak(advanceStreak), [])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])

  const resetModule = useCallback((moduleId: ModuleId) => {
    const moduleCardIds = new Set(CARDS.filter((c) => c.module === moduleId).map((c) => c.id))
    setReviews((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([id]) => !moduleCardIds.has(id))),
    )
    setQuizzes((prev) =>
      prev.filter((q) => !(q.scope.kind === 'module' && q.scope.moduleId === moduleId)),
    )
  }, [])

  const resetAll = useCallback(() => {
    setReviews({})
    setQuizzes([])
    setStreak(EMPTY_STREAK)
    setStories({})
    setDrills({})
    remove(KEYS.reviews)
    remove(KEYS.quizzes)
    remove(KEYS.streak)
    remove(KEYS.stories)
    remove(KEYS.drills)
  }, [])

  const value = useMemo(
    () => ({
      reviews,
      quizzes,
      streak,
      stories,
      drills,
      theme,
      rateCard,
      recordQuiz,
      setStoryProgress,
      resetStory,
      recordDrill,
      touchStreak,
      setTheme,
      resetModule,
      resetAll,
    }),
    [
      reviews,
      quizzes,
      streak,
      stories,
      drills,
      theme,
      rateCard,
      recordQuiz,
      setStoryProgress,
      resetStory,
      recordDrill,
      touchStreak,
      setTheme,
      resetModule,
      resetAll,
    ],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}

// ─────────────────────────── derived selectors ───────────────────────────

export interface ModuleProgress {
  moduleId: ModuleId
  total: number
  studied: number
  mastered: number
  quizMastered: boolean
  bestQuizPct: number | null
}

export function moduleProgress(
  moduleId: ModuleId,
  reviews: Record<string, ReviewState>,
  quizzes: QuizRecord[],
): ModuleProgress {
  const cards = CARDS.filter((c) => c.module === moduleId)
  const studied = cards.filter((c) => (reviews[c.id]?.history.length ?? 0) > 0).length
  const mastered = cards.filter((c) => isMastered(reviews[c.id])).length
  const moduleQuizzes = quizzes.filter(
    (q) => q.scope.kind === 'module' && q.scope.moduleId === moduleId,
  )
  const bestQuizPct = moduleQuizzes.length
    ? Math.max(...moduleQuizzes.map((q) => (q.total ? (q.score / q.total) * 100 : 0)))
    : null
  return {
    moduleId,
    total: cards.length,
    studied,
    mastered,
    quizMastered: bestQuizPct !== null && bestQuizPct >= 80,
    bestQuizPct,
  }
}

export function allModuleProgress(
  reviews: Record<string, ReviewState>,
  quizzes: QuizRecord[],
): ModuleProgress[] {
  return MODULES.map((m) => moduleProgress(m.id, reviews, quizzes))
}

export function dueCardIds(reviews: Record<string, ReviewState>, now = new Date()): string[] {
  return Object.values(reviews)
    .filter((r) => CARD_BY_ID.has(r.cardId) && isDue(r, now))
    .sort((a, b) => new Date(a.nextDueAt).getTime() - new Date(b.nextDueAt).getTime())
    .map((r) => r.cardId)
}

export function newCardIds(reviews: Record<string, ReviewState>): string[] {
  return CARDS.filter((c) => (reviews[c.id]?.history.length ?? 0) === 0).map((c) => c.id)
}
