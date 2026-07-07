import type { ModuleDef } from './types'

export const MODULES: ModuleDef[] = [
  {
    id: 'shot-sizes',
    title: 'Shot Sizes',
    tagline: 'How much of the subject the frame includes — from landscape to iris.',
    order: 1,
  },
  {
    id: 'camera-angles',
    title: 'Camera Angles',
    tagline: 'Where the camera sits relative to the subject, and the power it implies.',
    order: 2,
  },
  {
    id: 'lens',
    title: 'Lens & Focal Length',
    tagline: 'How glass shapes space — compression, distortion, and depth of field.',
    order: 3,
  },
  {
    id: 'movement',
    title: 'Camera Movement',
    tagline: 'How the camera travels through a scene and what motion communicates.',
    order: 4,
  },
  {
    id: 'lighting',
    title: 'Lighting',
    tagline: 'Direction and quality of light — the fastest route to mood.',
    order: 5,
  },
  {
    id: 'mood-color',
    title: 'Mood & Color',
    tagline: 'Palettes, grades, and color meaning — how tone is built.',
    order: 6,
  },
]

export const MODULE_BY_ID = new Map(MODULES.map((m) => [m.id, m]))
