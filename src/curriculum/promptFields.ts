import type { TrackId } from './schema'

/**
 * The structured shot prompt, as data.
 *
 * Each slot knows what it buys you and which lesson taught it, so the builder
 * can explain its own output instead of just concatenating strings. `lessonId`
 * points at a written lesson where one exists; otherwise the UI falls back to
 * the track, and the link improves on its own as more lessons ship.
 */
export interface PromptField {
  id: string
  label: string
  hinglish: string
  placeholder: string
  options: string[]
  /** One line on what this slot is actually doing to the image. */
  why: string
  lessonId?: string
  trackId: TrackId
}

export const PROMPT_FIELDS: PromptField[] = [
  {
    id: 'subject',
    label: 'Subject',
    hinglish: 'Kaun ya kya. Itna specific ki koi ajnabi sketch bana sake.',
    placeholder: 'a woman in a yellow raincoat',
    options: [],
    why: 'First position owns the image. Whatever you name here is what the model builds and everything else only tints.',
    trackId: 'ai',
  },
  {
    id: 'action',
    label: 'Action',
    hinglish: 'Wo kar kya raha hai. Verb ke bina image poster ban jaata hai.',
    placeholder: 'waiting alone at a bus stop',
    options: [],
    why: 'A verb turns a portrait into a moment. Without one you get a posed stock image.',
    trackId: 'story',
  },
  {
    id: 'shotSize',
    label: 'Shot size',
    hinglish: 'Frame me kitna aa raha hai — aur wo kitna emotional hai.',
    placeholder: 'medium close-up',
    options: [
      'extreme close-up',
      'close-up',
      'medium close-up',
      'medium shot',
      'medium wide shot',
      'wide shot',
      'extreme wide shot',
    ],
    why: 'Size is the emotional distance between the viewer and the subject. Closer is more intimate and more committed.',
    trackId: 'camera',
  },
  {
    id: 'angle',
    label: 'Camera angle',
    hinglish: 'Camera kahan se dekh raha hai — power kiske paas hai.',
    placeholder: 'slightly low angle',
    options: [
      'eye level',
      'low angle',
      'high angle',
      'overhead',
      'Dutch angle',
      'over-the-shoulder',
      'point of view',
    ],
    why: 'Angle assigns power. Looking up makes the subject dominant, looking down makes them small — before a single other choice is made.',
    trackId: 'camera',
  },
  {
    id: 'distance',
    label: 'Camera distance',
    hinglish: 'Camera kitni door khada hai. Yehi perspective banata hai, lens nahi.',
    placeholder: 'shot from across the street',
    options: [
      'camera 40cm from the face',
      'camera about one metre away',
      'shot from two metres back',
      'shot from five metres back',
      'shot from across the street',
    ],
    why: 'This is the slot most people never fill, and it does more than the millimetre number. Distance is what sets perspective — whether the background presses on the subject or falls away behind them.',
    lessonId: 'camera-focal-length',
    trackId: 'camera',
  },
  {
    id: 'lens',
    label: 'Lens',
    hinglish: 'mm number. Model iske look ko pakadta hai, geometry ko nahi.',
    placeholder: '85mm portrait lens',
    options: [
      '16mm ultra wide lens',
      '24mm wide lens',
      '35mm lens',
      '50mm normal lens',
      '85mm portrait lens',
      '135mm telephoto lens',
      '200mm long lens, compressed background',
    ],
    why: 'A millimetre token pulls toward the look of photos captioned that way, not toward real optics — so it works best paired with the distance slot above.',
    lessonId: 'camera-focal-length',
    trackId: 'camera',
  },
  {
    id: 'movement',
    label: 'Camera movement',
    hinglish: 'Sirf video ke liye. Kam movement = zyada real.',
    placeholder: 'slow push in',
    options: [
      'static locked-off camera',
      'slow push in, camera moves toward the subject',
      'slow pull out',
      'slow zoom in',
      'gentle handheld drift',
      'tracking alongside the subject',
      'slow orbit around the subject',
      'crane up',
    ],
    why: 'For image-to-video only. A zoom is cheap and safe; a push demands the model invent parallax, which is where morphing starts.',
    lessonId: 'camera-zoom-vs-push-in',
    trackId: 'camera',
  },
  {
    id: 'lightDirection',
    label: 'Light direction',
    hinglish: 'Roshni kis taraf se aa rahi hai. Shadow yahi decide karta hai.',
    placeholder: 'hard side light from the left',
    options: [
      'soft front light',
      'key light 45 degrees from the left',
      'hard side light, deep shadow on the far cheek',
      'backlit, rim light on the shoulders',
      'top light',
      'underlight from below',
      'window light from camera left',
    ],
    why: 'Direction writes the shadows, and shadows are what make a flat render read as a real object in a real space.',
    trackId: 'light',
  },
  {
    id: 'lightQuality',
    label: 'Light quality',
    hinglish: 'Roshni sakht hai ya mulayam — source ke size par depend karta hai.',
    placeholder: 'soft diffused light',
    options: [
      'hard direct light, sharp-edged shadows',
      'soft diffused light, gradual shadow edges',
      'overcast, shadowless',
      'bounced light',
      'single warm practical lamp',
      'heavy haze with visible light beams',
    ],
    why: 'Hard or soft is decided by how big the source is relative to the subject. Say it explicitly or you inherit the model default, which is usually a flat softbox look.',
    trackId: 'light',
  },
  {
    id: 'timeOfDay',
    label: 'Time of day',
    hinglish: 'Kis waqt ka scene hai — poora palette isse badal jaata hai.',
    placeholder: 'golden hour',
    options: ['dawn', 'golden hour', 'midday sun', 'overcast afternoon', 'blue hour', 'night'],
    why: 'Time of day sets colour temperature, shadow length and contrast in one word. It is the cheapest mood control you have.',
    trackId: 'light',
  },
  {
    id: 'palette',
    label: 'Colour palette',
    hinglish: 'Frame ke rang. Do-teen rang kaafi hain, poora rainbow nahi.',
    placeholder: 'muted teal and warm amber',
    options: [
      'muted teal and warm amber',
      'warm amber and deep brown',
      'cool blue and grey',
      'desaturated earth tones',
      'near monochrome with one red accent',
      'high-contrast neon magenta and cyan',
    ],
    why: 'A stated palette is what makes thirty separate generations feel like one film instead of thirty unrelated pictures.',
    trackId: 'color',
  },
  {
    id: 'mood',
    label: 'Mood',
    hinglish: 'Feeling. Lekin sirf mood likhne se kuch nahi hota — upar ki cheezein hi mood banati hain.',
    placeholder: 'lonely, patient',
    options: ['lonely', 'tense', 'tender', 'triumphant', 'uneasy', 'calm', 'urgent'],
    why: 'Mood words alone match millions of unrelated images. They only work as a tiebreaker once the concrete slots above are filled.',
    trackId: 'story',
  },
  {
    id: 'style',
    label: 'Medium / style',
    hinglish: 'Photo hai, film still hai, ya illustration. Ye na likho toh model apni default style de dega.',
    placeholder: '35mm film still',
    options: [
      '35mm film still',
      'documentary photograph',
      'editorial product photography',
      'anamorphic film still with subtle horizontal flare',
      'vintage 1970s film stock, visible grain',
      'clean studio photograph',
    ],
    why: 'Without a medium you inherit the model house style, which is the single biggest reason images look generically "AI".',
    trackId: 'ai',
  },
  {
    id: 'aspect',
    label: 'Aspect ratio',
    hinglish: 'Delivery ratio pehle decide karo, baad me crop mat karo.',
    placeholder: '9:16 vertical',
    options: ['9:16 vertical', '1:1 square', '16:9 widescreen', '2.39:1 scope', '4:3'],
    why: 'Generate at the ratio you will deliver. Cropping a wide frame to vertical throws away most of the width and misplaces the subject.',
    lessonId: 'camera-aspect-ratio-and-safe-areas',
    trackId: 'camera',
  },
]

/** Assembly order for the final string — subject first, technical flavour last. */
export const PROMPT_ORDER = PROMPT_FIELDS.map((f) => f.id)

export const DEFAULT_NEGATIVES =
  'plastic skin, waxy texture, extra fingers, deformed hands, warped face, text, watermark, oversaturated, flat lighting, motion blur smear'
