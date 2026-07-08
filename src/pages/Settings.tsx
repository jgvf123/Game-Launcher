import { useState } from 'react'
import { MODULES } from '../content'
import type { ModuleId } from '../content'
import { Button, Modal } from '../components/ui'
import { moduleProgress, useAppState } from '../lib/state'
import {
  clearLogStorage,
  clearSavedPromptsStorage,
  readLabSnapshot,
  resetLabProgressStorage,
} from '../lab/state'

export function Settings() {
  const { theme, setTheme, resetModule, resetAll, reviews, quizzes } = useAppState()
  const [confirmModule, setConfirmModule] = useState<ModuleId | null>(null)
  const [confirmAll, setConfirmAll] = useState(false)
  const [confirmLab, setConfirmLab] = useState<null | 'progress' | 'prompts' | 'log'>(null)
  const [labVersion, setLabVersion] = useState(0)
  const lab = readLabSnapshot()
  void labVersion // re-read snapshot after lab resets

  const confirmModuleDef = confirmModule ? MODULES.find((m) => m.id === confirmModule) : null

  return (
    <div className="animate-fade-up mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Light or dark — your pick is remembered on this device.
            </p>
          </div>
          <div
            role="group"
            aria-label="Theme"
            className="flex rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700"
          >
            {(['light', 'dark'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                aria-pressed={theme === t}
                className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors duration-150 ${
                  theme === t
                    ? 'bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900'
                    : 'text-zinc-600 dark:text-zinc-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Reset a module</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Clears review history, scheduling, and test results for that module only. Card content
          is never affected.
        </p>
        <ul className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
          {MODULES.map((m) => {
            const p = moduleProgress(m.id, reviews, quizzes)
            const hasData =
              p.studied > 0 ||
              quizzes.some((q) => q.scope.kind === 'module' && q.scope.moduleId === m.id)
            return (
              <li key={m.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium">{m.title}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {p.studied} of {p.total} cards studied
                  </p>
                </div>
                <Button onClick={() => setConfirmModule(m.id)} disabled={!hasData}>
                  Reset
                </Button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold">Prompt Lab</h2>
        <ul className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
          <li className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="font-medium">Reset Lab learning progress</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {lab.readLessons.length} lessons read · {lab.labQuizzes.length} quizzes — clears
                reviews, read-state and quiz history.
              </p>
            </div>
            <Button
              onClick={() => setConfirmLab('progress')}
              disabled={lab.readLessons.length === 0 && lab.labQuizzes.length === 0}
            >
              Reset
            </Button>
          </li>
          <li className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="font-medium">Clear saved prompts</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {lab.savedPrompts.length} saved in your Builder library.
              </p>
            </div>
            <Button onClick={() => setConfirmLab('prompts')} disabled={lab.savedPrompts.length === 0}>
              Clear
            </Button>
          </li>
          <li className="flex items-center justify-between gap-3 py-3">
            <div>
              <p className="font-medium">Clear practice log</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {lab.logEntries.length} entries incl. stored media (device-only).
              </p>
            </div>
            <Button onClick={() => setConfirmLab('log')} disabled={lab.logEntries.length === 0}>
              Clear
            </Button>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-red-200 bg-white p-6 dark:border-red-950 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">Full reset</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Erases everything: all review history, spaced-repetition scheduling, test results,
          storyboard progress, and streaks.
        </p>
        <Button variant="danger" className="mt-4" onClick={() => setConfirmAll(true)}>
          Reset all progress
        </Button>
      </section>

      <Modal
        open={confirmModule !== null}
        onClose={() => setConfirmModule(null)}
        title={`Reset ${confirmModuleDef?.title ?? 'module'}?`}
      >
        <p>
          This clears all review history and test results for{' '}
          <strong>{confirmModuleDef?.title}</strong>. This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button onClick={() => setConfirmModule(null)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirmModule) resetModule(confirmModule)
              setConfirmModule(null)
            }}
          >
            Reset module
          </Button>
        </div>
      </Modal>

      <Modal open={confirmAll} onClose={() => setConfirmAll(false)} title="Erase all progress?">
        <p>
          This will erase all your progress — every review, test score, and streak.{' '}
          <strong>This cannot be undone.</strong>
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button onClick={() => setConfirmAll(false)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              resetAll()
              resetLabProgressStorage()
              clearSavedPromptsStorage()
              clearLogStorage()
              setLabVersion((v) => v + 1)
              setConfirmAll(false)
            }}
          >
            Erase everything
          </Button>
        </div>
      </Modal>

      <Modal
        open={confirmLab !== null}
        onClose={() => setConfirmLab(null)}
        title={
          confirmLab === 'progress'
            ? 'Reset Prompt Lab progress?'
            : confirmLab === 'prompts'
              ? 'Clear saved prompts?'
              : 'Clear practice log?'
        }
      >
        <p>
          {confirmLab === 'progress' &&
            'Clears Lab lesson read-state, spaced-repetition reviews and quiz history. Saved prompts and your practice log are kept.'}
          {confirmLab === 'prompts' && 'Deletes every prompt saved from the Builder.'}
          {confirmLab === 'log' &&
            'Deletes all practice-log entries and their stored media from this device.'}{' '}
          This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button onClick={() => setConfirmLab(null)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirmLab === 'progress') resetLabProgressStorage()
              if (confirmLab === 'prompts') clearSavedPromptsStorage()
              if (confirmLab === 'log') clearLogStorage()
              setLabVersion((v) => v + 1)
              setConfirmLab(null)
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  )
}
