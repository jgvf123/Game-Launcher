import type { TrackId } from './schema'

/**
 * The Shot Analyzer rubric.
 *
 * You tag a frame, then the rubric shows you how a professional reads that
 * attribute, and you mark yourself honestly. Accuracy is tracked per
 * attribute, so the app can tell you the thing a junior never gets told:
 * *which* part of reading an image you are actually bad at.
 */
export interface AnalyzerAttribute {
  id: string
  label: string
  hinglish: string
  options: string[]
  /** How to actually read this off a frame. */
  howToRead: string
  /** The mistake people make on this attribute specifically. */
  trap: string
  lessonId?: string
  trackId: TrackId
}

export const ANALYZER_ATTRIBUTES: AnalyzerAttribute[] = [
  {
    id: 'shotSize',
    label: 'Shot size',
    hinglish: 'Subject ka kitna hissa frame me hai.',
    options: ['ECU', 'CU', 'MCU', 'MS', 'MLS', 'LS', 'ELS'],
    howToRead:
      'Read it off where the frame cuts the body, not off how big the subject feels. Chin and forehead cropped is an ECU; head and shoulders is a CU; chest up is an MCU; waist up is an MS; knees up is an MLS; full body is an LS; body small in a large space is an ELS.',
    trap: 'A tight crop on a wide lens can feel close while still being a medium shot. Judge by the body landmarks, never by the emotion.',
    trackId: 'camera',
  },
  {
    id: 'angle',
    label: 'Camera angle',
    hinglish: 'Camera subject ki aankh se upar hai, neeche hai, ya barabar.',
    options: ['Eye level', 'Low angle', 'High angle', 'Overhead', 'Dutch', 'OTS', 'POV'],
    howToRead:
      'Find the horizon line, or the convergence of vertical lines in the background. If verticals splay outward toward the top, the camera is below centre — a low angle. If they converge inward, it is above.',
    trap: 'A subject looking up is not a low angle. The angle is where the camera is, not where the eyes are pointing.',
    trackId: 'camera',
  },
  {
    id: 'focalLength',
    label: 'Focal length feel',
    hinglish: 'Wide, normal ya long — background dekhkar batao.',
    options: ['Ultra wide', 'Wide', 'Normal', 'Short telephoto', 'Long telephoto'],
    howToRead:
      'Ignore the crop and look at the background. If it is far, small and stretched away, you are wide. If it is large and stacked flat right behind the subject, you are long. On faces, check the nose-to-ear proportion.',
    trap: 'People guess from how much is in frame. That is field of view, not perspective — a long lens standing far back can still show a whole room.',
    lessonId: 'camera-focal-length',
    trackId: 'camera',
  },
  {
    id: 'lightDirection',
    label: 'Light direction',
    hinglish: 'Roshni kis taraf se aa rahi hai — shadow dekho.',
    options: ['Front', 'Side', '45 degree key', 'Back / rim', 'Top', 'Under', 'Ambient'],
    howToRead:
      'Follow the nose shadow and the catchlight in the eyes. The shadow points directly away from the source; the catchlight sits where the source is. A bright edge on the shoulders and hair with a dark front means backlight.',
    trap: 'The brightest part of the frame is not always the key. Look for what is casting the shadow that defines the face.',
    trackId: 'light',
  },
  {
    id: 'lightQuality',
    label: 'Light quality',
    hinglish: 'Shadow ka kinara sakht hai ya dheere-dheere fade hota hai.',
    options: ['Hard', 'Medium', 'Soft', 'Very soft / shadowless'],
    howToRead:
      'Look only at the shadow edge, at the transition from lit to unlit. A knife-sharp edge is hard light from a small or distant source. A slow gradient over several centimetres is soft light from a large, close source.',
    trap: 'Brightness is not quality. Bright soft light and bright hard light look nothing alike, and dim light can be perfectly hard.',
    trackId: 'light',
  },
  {
    id: 'contrast',
    label: 'Contrast ratio',
    hinglish: 'Ujaale aur andhere ke beech kitna farak hai.',
    options: ['Very low', 'Low', 'Medium', 'High', 'Very high / chiaroscuro'],
    howToRead:
      'Compare the lit side of the subject to the shadow side. If you can still read full detail in the shadow, contrast is low. If the shadow side falls to near black with no detail, it is high.',
    trap: 'A dark image is not automatically high contrast. A frame can be dark overall and still be flat — check the range within it, not the overall level.',
    trackId: 'light',
  },
  {
    id: 'colorScheme',
    label: 'Colour scheme',
    hinglish: 'Frame ke rang aapas me kaise related hain.',
    options: [
      'Monochromatic',
      'Analogous',
      'Complementary',
      'Split-complementary',
      'Triadic',
      'Desaturated / neutral',
    ],
    howToRead:
      'Squint until detail disappears and only colour blocks remain. Name the two or three dominant hues and check where they sit on the wheel — opposite is complementary, adjacent is analogous.',
    trap: 'Teal-and-orange is the default guess and it is often wrong. Many frames are actually analogous, or near-neutral with one accent.',
    trackId: 'color',
  },
  {
    id: 'composition',
    label: 'Composition device',
    hinglish: 'Aankh ko kis cheez ne guide kiya.',
    options: [
      'Rule of thirds',
      'Centred / symmetry',
      'Leading lines',
      'Frame within a frame',
      'Negative space',
      'Foreground layering',
      'Diagonal',
    ],
    howToRead:
      'Ask what physically moved your eye to the subject. A road or railing pulling inward is leading lines. A doorway or window boxing the subject is a frame within a frame. Large emptiness pushing the subject to one edge is negative space.',
    trap: 'Almost everything roughly obeys thirds. Only call it thirds when the placement is doing the work — otherwise name the stronger device that is actually present.',
    trackId: 'camera',
  },
]
