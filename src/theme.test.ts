import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/**
 * Guards the class of bug that made the Hinglish gloss unreadable in dark
 * mode: a colour token defined once, as a light value, and never redefined
 * for `.dark`. Any component using it then kept a pale panel while the ink on
 * it flipped to light.
 */
const css = readFileSync(new URL('./index.css', import.meta.url), 'utf8')

function block(selector: string): string {
  const start = css.indexOf(`${selector} {`)
  if (start === -1) throw new Error(`No ${selector} block in index.css`)
  return css.slice(start, css.indexOf('\n}', start))
}

const root = block(':root')
const dark = block('.dark')

/** Every token that paints a surface or ink must exist in both modes. */
const THEMED = [
  '--paper',
  '--surface',
  '--line',
  '--ink',
  '--ink-soft',
  '--ink-faint',
  '--accent-soft',
]

describe('theme tokens', () => {
  it.each(THEMED)('%s is defined for light', (token) => {
    expect(root).toContain(`${token}:`)
  })

  it.each(THEMED)('%s is redefined for dark', (token) => {
    expect(dark).toContain(`${token}:`)
  })

  it('routes every themed token through @theme so utilities resolve per mode', () => {
    const theme = block('@theme')
    for (const token of THEMED) {
      const utility = `--color-${token.slice(2)}`
      expect(theme).toContain(`${utility}: var(${token})`)
    }
  })

  it('keeps faint ink clearly darker than the paper it sits on', () => {
    // Lightness only — the full contrast check runs against a real browser.
    const lightness = (source: string, token: string) =>
      Number(source.match(new RegExp(`${token}: oklch\\(([\\d.]+)`))?.[1])
    expect(lightness(root, '--paper') - lightness(root, '--ink-faint')).toBeGreaterThan(0.35)
    expect(lightness(dark, '--ink-faint') - lightness(dark, '--paper')).toBeGreaterThan(0.35)
  })
})
