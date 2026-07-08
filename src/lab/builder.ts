/** Prompt Builder: one set of slots, reassembled into each model's dialect. */

export type BuilderMode = 'image' | 'video'

export interface BuilderSlots {
  subject: string
  detail: string
  style: string
  lighting: string
  composition: string
  mood: string
  technical: string
  negatives: string
  // video-only
  action: string
  cameraMove: string
  audio: string
}

export const EMPTY_SLOTS: BuilderSlots = {
  subject: '',
  detail: '',
  style: '',
  lighting: '',
  composition: '',
  mood: '',
  technical: '',
  negatives: '',
  action: '',
  cameraMove: '',
  audio: '',
}

export const IMAGE_DIALECTS = [
  { id: 'midjourney', label: 'Midjourney' },
  { id: 'flux', label: 'Flux' },
  { id: 'sd', label: 'Stable Diffusion' },
  { id: 'dalle', label: 'DALL·E / GPT-4o' },
] as const

export const VIDEO_DIALECTS = [
  { id: 'veo', label: 'Veo' },
  { id: 'kling', label: 'Kling' },
  { id: 'runway', label: 'Runway' },
] as const

const join = (parts: (string | undefined)[], sep: string) =>
  parts.map((p) => p?.trim()).filter(Boolean).join(sep)

const sentence = (s: string) => {
  const t = s.trim()
  if (!t) return ''
  const capped = t[0].toUpperCase() + t.slice(1)
  return /[.!?]$/.test(capped) ? capped : `${capped}.`
}

export function assemblePrompt(slots: BuilderSlots, mode: BuilderMode, model: string): string {
  const s = slots
  if (mode === 'image') {
    switch (model) {
      case 'midjourney': {
        const core = join([s.subject, s.detail, s.style, s.lighting, s.composition, s.mood, s.technical], ', ')
        return join([core, s.negatives.trim() ? `--no ${s.negatives}` : ''], ' ')
      }
      case 'flux': {
        return join(
          [
            sentence(join([s.subject, s.detail], ', ')),
            sentence(join([s.composition, s.lighting], ', ')),
            sentence(join([s.style, s.mood], ', ')),
            sentence(s.technical),
            s.negatives.trim() ? sentence(`No ${s.negatives}`) : '',
          ],
          ' ',
        )
      }
      case 'sd': {
        const core = join([s.subject, s.detail, s.style, s.lighting, s.composition, s.mood, s.technical], ', ')
        const neg = s.negatives.trim() || 'blurry, distorted, low quality, watermark, text'
        return `${core} | NEGATIVE: ${neg}`
      }
      case 'dalle':
      default: {
        return join(
          [
            sentence(
              `Create ${join([s.subject, s.detail], ', ')}${s.composition ? `, framed as ${s.composition}` : ''}`,
            ),
            sentence(join([s.lighting, s.style, s.mood], ', ')),
            sentence(s.technical),
            s.negatives.trim() ? sentence(`There should be no ${s.negatives} anywhere in the image`) : '',
          ],
          ' ',
        )
      }
    }
  }
  // video
  switch (model) {
    case 'veo': {
      return join(
        [
          sentence(join([s.composition, s.cameraMove], ', ')), // cinematography FIRST
          sentence(join([s.subject, s.action], ' ')),
          sentence(s.detail),
          sentence(join([s.lighting, s.style, s.mood], ', ')),
          s.audio.trim() ? `${s.audio.trim().replace(/[.!?]$/, '')} (audio).` : '',
          s.negatives.trim() ? sentence(`Avoid ${s.negatives}`) : '',
        ],
        ' ',
      )
    }
    case 'kling': {
      return join(
        [
          sentence(join([s.subject, s.action], ' ')),
          sentence(join([s.detail, s.lighting, s.mood], ', ')),
          sentence(s.style),
          s.negatives.trim() ? sentence(`Avoid ${s.negatives}`) : '',
          s.cameraMove.trim() || s.composition.trim()
            ? `Camera: ${join([s.composition, s.cameraMove], ', ')}.` // camera LAST
            : '',
        ],
        ' ',
      )
    }
    case 'runway':
    default: {
      return join(
        [
          sentence(join([s.subject, s.action], ' ')),
          sentence(join([s.detail, s.lighting, s.style, s.mood], ', ')),
          s.cameraMove.trim() || s.composition.trim()
            ? `Camera: ${join([s.composition, s.cameraMove], ', ')}.`
            : '',
          s.negatives.trim() ? sentence(`Avoid ${s.negatives}`) : '',
          'Tip: mark the moving elements with the motion brush instead of describing them.',
        ],
        ' ',
      )
    }
  }
}

const MOVE_WORDS = [
  'pan',
  'tilt',
  'orbit',
  'zoom',
  'push',
  'pull',
  'dolly',
  'truck',
  'crane',
  'handheld',
  'track',
  'whip',
  'shake',
]
const FRAME_WORDS = ['wide', 'medium', 'close-up', 'close up', 'extreme close', 'full shot', 'over-the-shoulder']

export interface BuilderWarning {
  level: 'warn' | 'tip'
  text: string
}

export function lintSlots(slots: BuilderSlots, mode: BuilderMode): BuilderWarning[] {
  const warnings: BuilderWarning[] = []
  const all = Object.values(slots).join(' ').toLowerCase()

  const cinematicCount = (all.match(/cinematic/g) ?? []).length
  if (cinematicCount >= 1) {
    warnings.push({
      level: cinematicCount > 1 ? 'warn' : 'tip',
      text:
        cinematicCount > 1
          ? '“cinematic” appears multiple times — it converges on a generic look. Name the technique instead: a focal length, a lighting setup, a grade.'
          : 'Consider replacing “cinematic” with concrete terms (35mm, shallow depth of field, teal-orange grade, practical lighting).',
    })
  }

  if (mode === 'video') {
    const cam = slots.cameraMove.toLowerCase()
    const moves = MOVE_WORDS.filter((w) => cam.includes(w))
    if (moves.length > 1)
      warnings.push({
        level: 'warn',
        text: `Multiple camera movements detected (${moves.join(', ')}). Use ONE dominant move per clip — stitch several clips for a sequence.`,
      })
    const frames = FRAME_WORDS.filter((w) => (slots.composition + ' ' + cam).toLowerCase().includes(w))
    const modifierCount = frames.length + moves.length
    if (modifierCount > 3)
      warnings.push({
        level: 'warn',
        text: `${modifierCount} camera modifiers — the reliable ceiling is one framing + one movement (+ optionally one lens).`,
      })
    if (!slots.action.trim() && slots.subject.trim())
      warnings.push({ level: 'tip', text: 'Video needs a verb: give the subject one clear action that fits the clip length.' })
  }

  if (mode === 'image' && !slots.lighting.trim() && slots.subject.trim())
    warnings.push({ level: 'tip', text: 'No lighting stated — you will inherit flat default light. Name a source and direction.' })

  return warnings
}
