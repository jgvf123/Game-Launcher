import { Link } from 'react-router-dom'
import { STORIES, beatFrameSpec } from '../content/stories'
import { StoryFrame } from '../components/StoryFrame'
import { ProgressBar } from '../components/ui'
import { useAppState } from '../lib/state'

export function Storyboard() {
  const { stories } = useAppState()

  return (
    <div className="animate-fade-up space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Storyboard</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Direct real scenes. For every beat you choose the shot, angle, lens and lighting —
          right calls build your storyboard, wrong calls come with a lesson.
        </p>
      </header>

      <div className="space-y-4">
        {STORIES.map((story) => {
          const progress = stories[story.id]
          const done = progress?.beatsDone ?? 0
          const completed = progress?.completed ?? false
          const started = done > 0
          return (
            <Link
              key={story.id}
              to={`/storyboard/${story.id}`}
              className="block overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors duration-150 hover:border-accent-strong/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-accent/50"
            >
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="w-full shrink-0 sm:w-44">
                  <div className="aspect-[8/5] overflow-hidden rounded-lg">
                    <StoryFrame spec={beatFrameSpec(story.beats[0])} label={`${story.title} opening frame`} />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{story.title}</h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        story.kind === 'teach'
                          ? 'bg-accent-soft text-accent-strong dark:bg-zinc-800 dark:text-accent'
                          : 'bg-zinc-200/70 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                    >
                      {story.kind === 'teach' ? 'Guided lesson' : 'You direct'}
                    </span>
                    {completed && (
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-950/50 dark:text-green-300">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{story.logline}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar
                      value={done}
                      max={story.beats.length}
                      className="max-w-48"
                      label={`${story.title} progress`}
                    />
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {done}/{story.beats.length} frames
                    </span>
                    <span className="ml-auto text-sm font-medium text-accent-strong dark:text-accent">
                      {completed ? 'Replay' : started ? 'Continue' : 'Start'} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        Start with <strong>The Last Train</strong> — a guided lesson where every choice is
        explained. Then take the director’s chair on the other four.
      </p>
    </div>
  )
}
