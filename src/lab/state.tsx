import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { load, save, remove } from '../lib/storage'
import { applyRating, isDue, isMastered, type Rating, type ReviewState } from '../lib/srs'
import { useAppState } from '../lib/state'
import { LAB_LESSONS } from './lessons'
import { clearMedia, deleteMedia } from './idb'

const K = {
  reviews: 'fs.lab.reviews',
  read: 'fs.lab.read',
  quizzes: 'fs.lab.quizzes',
  saved: 'fs.lab.saved',
  log: 'fs.lab.log',
} as const

export interface LabQuizRecord {
  id: string
  date: string
  scope: string // module id or 'all'
  score: number
  total: number
  missedLessonIds: string[]
}

export interface SavedPrompt {
  id: string
  title: string
  mode: 'image' | 'video'
  model: string
  prompt: string
  createdAt: string
}

export interface LogEntry {
  id: string
  prompt: string
  model: string
  tags: string[]
  notes: string
  createdAt: string
  /** Set when a media blob exists in IndexedDB under this entry's id. */
  mediaType: string | null
  /** Optional external URL instead of an uploaded file. */
  mediaUrl: string | null
}

interface LabState {
  labReviews: Record<string, ReviewState>
  readLessons: string[]
  labQuizzes: LabQuizRecord[]
  savedPrompts: SavedPrompt[]
  logEntries: LogEntry[]
  markLessonRead: (lessonId: string) => void
  rateLesson: (lessonId: string, rating: Rating) => void
  recordLabQuiz: (r: Omit<LabQuizRecord, 'id' | 'date'>) => void
  savePrompt: (p: Omit<SavedPrompt, 'id' | 'createdAt'>) => void
  deletePrompt: (id: string) => void
  addLogEntry: (e: Omit<LogEntry, 'createdAt'>) => void
  deleteLogEntry: (id: string) => void
  clearLog: () => void
  resetLabProgress: () => void
}

const LabContext = createContext<LabState | null>(null)

export function LabStateProvider({ children }: { children: ReactNode }) {
  const { touchStreak } = useAppState()
  const [labReviews, setLabReviews] = useState<Record<string, ReviewState>>(() =>
    load(K.reviews, {}),
  )
  const [readLessons, setReadLessons] = useState<string[]>(() => load(K.read, []))
  const [labQuizzes, setLabQuizzes] = useState<LabQuizRecord[]>(() => load(K.quizzes, []))
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>(() => load(K.saved, []))
  const [logEntries, setLogEntries] = useState<LogEntry[]>(() => load(K.log, []))

  useEffect(() => save(K.reviews, labReviews), [labReviews])
  useEffect(() => save(K.read, readLessons), [readLessons])
  useEffect(() => save(K.quizzes, labQuizzes), [labQuizzes])
  useEffect(() => save(K.saved, savedPrompts), [savedPrompts])
  useEffect(() => save(K.log, logEntries), [logEntries])

  const markLessonRead = useCallback((lessonId: string) => {
    setReadLessons((prev) => (prev.includes(lessonId) ? prev : [...prev, lessonId]))
  }, [])

  const rateLesson = useCallback((lessonId: string, rating: Rating) => {
    setLabReviews((prev) => ({
      ...prev,
      [lessonId]: applyRating(prev[lessonId], lessonId, rating),
    }))
  }, [])

  const recordLabQuiz = useCallback(
    (r: Omit<LabQuizRecord, 'id' | 'date'>) => {
      setLabQuizzes((prev) => [
        ...prev,
        { ...r, id: crypto.randomUUID(), date: new Date().toISOString() },
      ])
      touchStreak()
    },
    [touchStreak],
  )

  const savePrompt = useCallback((p: Omit<SavedPrompt, 'id' | 'createdAt'>) => {
    setSavedPrompts((prev) => [
      { ...p, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
      ...prev,
    ])
  }, [])

  const deletePrompt = useCallback((id: string) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const addLogEntry = useCallback(
    (e: Omit<LogEntry, 'createdAt'>) => {
      setLogEntries((prev) => [{ ...e, createdAt: new Date().toISOString() }, ...prev])
      touchStreak()
    },
    [touchStreak],
  )

  const deleteLogEntry = useCallback((id: string) => {
    setLogEntries((prev) => prev.filter((e) => e.id !== id))
    void deleteMedia(id).catch(() => {})
  }, [])

  const clearLog = useCallback(() => {
    setLogEntries([])
    void clearMedia().catch(() => {})
  }, [])

  const resetLabProgress = useCallback(() => {
    setLabReviews({})
    setReadLessons([])
    setLabQuizzes([])
    remove(K.reviews)
    remove(K.read)
    remove(K.quizzes)
  }, [])

  const value = useMemo(
    () => ({
      labReviews,
      readLessons,
      labQuizzes,
      savedPrompts,
      logEntries,
      markLessonRead,
      rateLesson,
      recordLabQuiz,
      savePrompt,
      deletePrompt,
      addLogEntry,
      deleteLogEntry,
      clearLog,
      resetLabProgress,
    }),
    [
      labReviews,
      readLessons,
      labQuizzes,
      savedPrompts,
      logEntries,
      markLessonRead,
      rateLesson,
      recordLabQuiz,
      savePrompt,
      deletePrompt,
      addLogEntry,
      deleteLogEntry,
      clearLog,
      resetLabProgress,
    ],
  )

  return <LabContext.Provider value={value}>{children}</LabContext.Provider>
}

export function useLabState(): LabState {
  const ctx = useContext(LabContext)
  if (!ctx) throw new Error('useLabState must be used within LabStateProvider')
  return ctx
}

// ─── derived helpers ───

export function dueLessonIds(labReviews: Record<string, ReviewState>, now = new Date()): string[] {
  return Object.values(labReviews)
    .filter((r) => isDue(r, now))
    .map((r) => r.cardId)
}

export function labProgressSummary(
  labReviews: Record<string, ReviewState>,
  readLessons: string[],
) {
  const total = LAB_LESSONS.length
  const read = readLessons.filter((id) => LAB_LESSONS.some((l) => l.id === id)).length
  const mastered = LAB_LESSONS.filter((l) => isMastered(labReviews[l.id])).length
  return { total, read, mastered }
}

/** Read lab state straight from storage — for pages outside the LabStateProvider (Progress, Settings). */
export function readLabSnapshot() {
  return {
    labReviews: load<Record<string, ReviewState>>(K.reviews, {}),
    readLessons: load<string[]>(K.read, []),
    labQuizzes: load<LabQuizRecord[]>(K.quizzes, []),
    savedPrompts: load<SavedPrompt[]>(K.saved, []),
    logEntries: load<LogEntry[]>(K.log, []),
  }
}

/** Clear Lab learning progress (reviews, read, quizzes) from storage. */
export function resetLabProgressStorage() {
  remove(K.reviews)
  remove(K.read)
  remove(K.quizzes)
}

/** Clear saved prompts from storage. */
export function clearSavedPromptsStorage() {
  remove(K.saved)
}

/** Clear the practice log (metadata + media). */
export function clearLogStorage() {
  remove(K.log)
  void clearMedia().catch(() => {})
}
