import { ILLUSTRATIONS } from '../illustrations'

/** Renders the schematic diagram for a card, with a graceful fallback. */
export function Illustration({ cardId, className = '' }: { cardId: string; className?: string }) {
  const Ill = ILLUSTRATIONS[cardId]
  return (
    <div className={`aspect-[8/5] w-full overflow-hidden rounded-lg ${className}`}>
      {Ill ? (
        <Ill />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-sm text-zinc-400 dark:bg-zinc-800">
          diagram
        </div>
      )}
    </div>
  )
}
