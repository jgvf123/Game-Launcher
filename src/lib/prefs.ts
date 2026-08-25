import { useEffect, useState } from 'react'
import { load, save } from './storage'

/**
 * Language preference. `both` shows the Hinglish gloss panels and the
 * Hinglish half of term popovers; `en` hides them for when the English is
 * already comfortable. Stored alongside the other `fs.*` keys.
 */
export type Language = 'both' | 'en'

const KEY = 'fs.lang'
const EVENT = 'fs:lang'

export function getLanguage(): Language {
  const stored = load<Language>(KEY, 'both')
  return stored === 'en' ? 'en' : 'both'
}

export function setLanguage(lang: Language): void {
  save(KEY, lang)
  window.dispatchEvent(new CustomEvent(EVENT))
}

/** Re-renders every consumer when the preference changes anywhere in the app. */
export function useLanguage(): Language {
  const [lang, setLang] = useState<Language>(getLanguage)
  useEffect(() => {
    const update = () => setLang(getLanguage())
    window.addEventListener(EVENT, update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener(EVENT, update)
      window.removeEventListener('storage', update)
    }
  }, [])
  return lang
}
