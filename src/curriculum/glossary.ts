import type { Term } from './schema'

/**
 * The glossary. Every term a lesson puts in **bold** must appear here, or
 * `npm run lint:content` fails the build — that rule is what stops the app
 * from ever using a word it has not defined on the same page.
 */
export const TERMS: Term[] = [
  // ───────────────── Lens & perspective ─────────────────
  {
    id: 'focal-length',
    term: 'Focal length',
    aliases: ['focal lengths'],
    hinglish: 'Lens ka mm number. Ye batata hai kitna frame me aayega, aur space kaisa dikhega — sirf zoom nahi.',
    definition:
      'The distance in millimetres from a lens’s optical centre to the sensor. It sets how much of the world fits in the frame, and — because it forces you to stand at a particular distance for a given framing — it decides how the space inside the frame feels.',
    trackId: 'camera',
    taughtIn: 'camera-focal-length',
    seeAlso: ['field-of-view', 'perspective', 'camera-to-subject-distance'],
  },
  {
    id: 'field-of-view',
    term: 'Field of view',
    aliases: ['fields of view', 'fov'],
    hinglish: 'Camera ko kitna chauda dikh raha hai. Chhota mm = zyada dikhega, bada mm = kam dikhega.',
    definition:
      'The angle of the world a lens and sensor together can see, measured in degrees. Short focal lengths give a wide field of view; long focal lengths give a narrow one. Two different sensors with the same lens give different fields of view.',
    trackId: 'camera',
    taughtIn: 'camera-focal-length',
    seeAlso: ['focal-length', 'crop-factor'],
  },
  {
    id: 'wide-lens',
    term: 'Wide lens',
    aliases: ['wide', 'wide lenses', 'wide-angle lens', 'wide angle'],
    hinglish: 'Chhota mm (12–35mm). Sab kuch frame me aa jaata hai, aur space khinch jaata hai — lamba, khula.',
    definition:
      'Roughly 12–35mm on full frame. Takes in a lot of the world and stretches apparent depth: things near the lens read large, things a few steps back read far away. Because you must stand close to fill the frame, it feels involved and unstable.',
    trackId: 'camera',
    taughtIn: 'camera-focal-length',
    seeAlso: ['focal-length', 'wide-angle-distortion'],
  },
  {
    id: 'normal-lens',
    term: 'Normal lens',
    aliases: ['normal', 'normal lenses'],
    hinglish: 'Around 40–58mm. Jo aankh dekhti hai lagbhag wahi. Na drama, na exaggeration — seedha sach.',
    definition:
      'Roughly 40–58mm on full frame, close to the perspective of human vision. Space reads honestly and nothing is editorialised, which makes it the neutral, adult, unshowy choice.',
    trackId: 'camera',
    taughtIn: 'camera-focal-length',
    seeAlso: ['focal-length', 'perspective'],
  },
  {
    id: 'telephoto-lens',
    term: 'Telephoto lens',
    aliases: ['telephoto', 'long lens', 'telephoto lenses', 'long lenses'],
    hinglish: 'Bada mm (85mm+). Patli si slice dikhti hai, aur background bilkul chipak ke paas aa jaata hai.',
    definition:
      'Roughly 85mm and above on full frame. Sees a narrow slice of the world and, because you shoot from far away, squashes apparent depth so foreground and background stack together. Reads as observation from outside — surveillance, isolation, or claustrophobia.',
    trackId: 'camera',
    taughtIn: 'camera-focal-length',
    seeAlso: ['perspective-compression', 'focal-length'],
  },
  {
    id: 'perspective',
    term: 'Perspective',
    aliases: [],
    hinglish: 'Frame ke andar cheezein ek dusre se kitni door/paas lagti hain. Ye lens se nahi, tumhari doori se banta hai.',
    definition:
      'The apparent size and depth relationship between objects in a frame. Crucially, perspective is set by where the camera stands, not by which lens is on it — the lens only decides how much of that perspective you crop into.',
    trackId: 'camera',
    taughtIn: 'camera-focal-length',
    seeAlso: ['camera-to-subject-distance', 'perspective-compression'],
  },
  {
    id: 'camera-to-subject-distance',
    term: 'Camera-to-subject distance',
    aliases: ['camera to subject distance', 'subject distance'],
    hinglish: 'Camera aur subject ke beech ki asli doori. Yehi perspective decide karti hai — lens nahi.',
    definition:
      'How far the camera physically stands from what it is shooting. It is the only thing that changes perspective. Change it and the relationship between subject and background changes; change the lens alone and only the crop changes.',
    trackId: 'camera',
    taughtIn: 'camera-focal-length',
    seeAlso: ['perspective', 'push-in'],
  },
  {
    id: 'perspective-compression',
    term: 'Perspective compression',
    aliases: ['compression', 'compressed'],
    hinglish: 'Door se shoot karo toh saari cheezein ek dusre par chipki hui lagti hain — taash ke patton ki tarah.',
    definition:
      'The flattening of apparent depth that happens when you shoot from far away: because everything is roughly equally distant, objects at different depths render at similar sizes and stack like cards. Usually credited to long lenses, but distance is the actual cause.',
    trackId: 'camera',
    taughtIn: 'camera-perspective-compression',
    seeAlso: ['telephoto-lens', 'parallax', 'layering'],
  },
  {
    id: 'parallax',
    term: 'Parallax',
    aliases: [],
    hinglish: 'Camera hile toh paas ki cheez zyada hilti hai, door ki kam. Yehi depth ka ehsaas deta hai.',
    definition:
      'The difference in how much near and far objects shift across frame when the camera moves. Strong parallax reads as real depth; almost no parallax — as in a compressed telephoto shot — reads as a flat, painted world.',
    trackId: 'camera',
    taughtIn: 'camera-perspective-compression',
    seeAlso: ['perspective-compression', 'dolly'],
  },
  {
    id: 'layering',
    term: 'Layering',
    aliases: ['layers', 'layered'],
    hinglish: 'Frame me foreground, midground, background — teen parat. Isse frame flat nahi lagta.',
    definition:
      'Deliberately placing elements at distinct depths — foreground, midground, background — so the frame reads as a space rather than a flat picture. Compression makes layers stack tightly; wide lenses spread them apart.',
    trackId: 'camera',
    taughtIn: 'camera-perspective-compression',
    seeAlso: ['perspective-compression', 'parallax'],
  },
  {
    id: 'wide-angle-distortion',
    term: 'Wide-angle distortion',
    aliases: ['wide angle distortion', 'perspective distortion'],
    hinglish: 'Bahut paas se shoot karne par naak bada, kaan chhote — chehra phool jaata hai. Lens ki galti nahi, doori ki hai.',
    definition:
      'The stretching of features that happens when the camera is very close to a subject: parts nearer the lens render disproportionately large. It is a distance effect, not a lens defect, which is why stepping back cures it.',
    trackId: 'camera',
    taughtIn: 'camera-wide-angle-distortion',
    seeAlso: ['wide-lens', 'portrait-length', 'barrel-distortion'],
  },
  {
    id: 'barrel-distortion',
    term: 'Barrel distortion',
    aliases: ['barrel'],
    hinglish: 'Seedhi lines kinaare par mud jaati hain, jaise frame phool gaya ho. Ye lens ka optical defect hai.',
    definition:
      'An optical fault where straight lines bow outward toward the edges of frame, common on wide and zoom lenses. Unlike wide-angle distortion it is a property of the glass, so it can be corrected with a lens profile in post.',
    trackId: 'camera',
    taughtIn: 'camera-wide-angle-distortion',
    seeAlso: ['wide-angle-distortion', 'wide-lens'],
  },
  {
    id: 'portrait-length',
    term: 'Portrait length',
    aliases: ['portrait lengths', 'portrait lens'],
    hinglish: 'Chehre ke liye achhe lens — 85mm se 135mm. Door khade ho, isliye chehra flat aur sundar.',
    definition:
      'The 85–135mm range on full frame, traditionally used for faces because it forces a camera distance of roughly two metres or more, at which the nose and ears are nearly equidistant from the lens and the face renders naturally.',
    trackId: 'camera',
    taughtIn: 'camera-wide-angle-distortion',
    seeAlso: ['telephoto-lens', 'wide-angle-distortion'],
  },
  {
    id: 'zoom',
    term: 'Zoom',
    aliases: ['zooming', 'zoom in', 'zoom-in'],
    hinglish: 'Lens ka mm badalna, camera wahin khada. Sirf crop badalta hai — perspective wahi ka wahi.',
    definition:
      'Changing focal length while the camera stays put. It changes framing only: because camera-to-subject distance is unchanged, the relationship between subject and background is identical before and after.',
    trackId: 'camera',
    taughtIn: 'camera-zoom-vs-push-in',
    seeAlso: ['push-in', 'dolly'],
  },
  {
    id: 'push-in',
    term: 'Push-in',
    aliases: ['push in', 'push', 'pushing in'],
    hinglish: 'Camera ko chala ke subject ke paas le jaana. Background peeche chhoot jaata hai — duniya badal jaati hai.',
    definition:
      'Physically moving the camera toward the subject, usually on a dolly or gimbal. Because the camera-to-subject distance changes, perspective changes with it: the background falls away and the frame feels like approach rather than magnification.',
    trackId: 'camera',
    taughtIn: 'camera-zoom-vs-push-in',
    seeAlso: ['zoom', 'dolly', 'camera-to-subject-distance'],
  },
  {
    id: 'dolly',
    term: 'Dolly',
    aliases: ['dollying', 'dolly shot'],
    hinglish: 'Camera ko pahiyon/track par chala ke move karna. Smooth movement, aur asli depth dikhti hai.',
    definition:
      'A wheeled platform (or any rig) that moves the camera through space smoothly. A dolly move changes viewpoint, so it produces parallax and reveals real depth — which is exactly what a zoom cannot do.',
    trackId: 'camera',
    taughtIn: 'camera-zoom-vs-push-in',
    seeAlso: ['push-in', 'parallax'],
  },
  {
    id: 'dolly-zoom',
    term: 'Dolly zoom',
    aliases: ['vertigo shot', 'dolly-zoom'],
    hinglish: 'Camera peeche jaata hai aur lens andar zoom karta hai — subject same size, background pagal ho jaata hai.',
    definition:
      'Dollying in one direction while zooming in the other, at matched rates. The subject stays the same size while the background expands or collapses behind them — the effect reads as the ground shifting under a character.',
    trackId: 'camera',
    taughtIn: 'camera-zoom-vs-push-in',
    seeAlso: ['zoom', 'push-in', 'perspective'],
  },
  {
    id: 'sensor',
    term: 'Sensor',
    aliases: ['sensors', 'sensor size'],
    hinglish: 'Camera ke andar ka chip jispe image banti hai. Bada chip = zyada frame me aayega same lens par.',
    definition:
      'The chip that records the image. Its physical dimensions decide how much of the lens’s projected image it captures — which is why the same lens frames differently on different cameras.',
    trackId: 'camera',
    taughtIn: 'camera-sensor-and-crop-factor',
    seeAlso: ['crop-factor', 'image-circle', 'full-frame'],
  },
  {
    id: 'full-frame',
    term: 'Full frame',
    aliases: ['full-frame', 'ff'],
    hinglish: '36 x 24mm ka sensor. Ye standard hai jiske hisaab se sab "mm" bola jaata hai.',
    definition:
      'A 36 x 24mm sensor, the size of a 35mm stills negative. It is the reference against which crop factors and equivalent focal lengths are quoted, which is why lens numbers only mean something once you say what sensor they are on.',
    trackId: 'camera',
    taughtIn: 'camera-sensor-and-crop-factor',
    seeAlso: ['sensor', 'crop-factor', 'super-35'],
  },
  {
    id: 'super-35',
    term: 'Super 35',
    aliases: ['super35', 's35'],
    hinglish: 'Lagbhag 25 x 18mm. Cinema ka sabse purana aur sabse common format.',
    definition:
      'Roughly 24.9 x 18.7mm, the dominant motion-picture format for a century and still the default of most cinema cameras. Its crop factor against full frame is about 1.4x.',
    trackId: 'camera',
    taughtIn: 'camera-sensor-and-crop-factor',
    seeAlso: ['full-frame', 'crop-factor'],
  },
  {
    id: 'crop-factor',
    term: 'Crop factor',
    aliases: ['crop factors'],
    hinglish: 'Chhote sensor par lens kitna "lamba" lagega, uska multiplier. 2x crop par 25mm lagega 50mm jaisa.',
    definition:
      'The ratio of the full-frame sensor diagonal to another sensor’s diagonal. Multiply a lens’s focal length by it to get the full-frame focal length that would frame the same way.',
    trackId: 'camera',
    taughtIn: 'camera-sensor-and-crop-factor',
    seeAlso: ['equivalent-focal-length', 'sensor', 'field-of-view'],
  },
  {
    id: 'equivalent-focal-length',
    term: 'Equivalent focal length',
    aliases: ['equivalent focal lengths', 'full-frame equivalent'],
    hinglish: 'Lens ka mm x crop factor. Isse pata chalta hai frame kaisa aayega, chaahe camera koi bhi ho.',
    definition:
      'Focal length multiplied by crop factor — the full-frame focal length that would produce the same framing. It describes framing only: perspective still comes from where you stand, and depth of field behaves differently again.',
    trackId: 'camera',
    taughtIn: 'camera-sensor-and-crop-factor',
    seeAlso: ['crop-factor', 'field-of-view'],
  },
  {
    id: 'image-circle',
    term: 'Image circle',
    aliases: ['image circles'],
    hinglish: 'Lens jo gol image project karta hai. Sensor us gole me se ek chaukor tukda kaat leta hai.',
    definition:
      'The circular image a lens projects behind itself. The sensor sits inside that circle and takes a rectangular bite out of it; if the sensor is larger than the circle you get dark corners, which is what vignetting from an undersized lens looks like.',
    trackId: 'camera',
    taughtIn: 'camera-sensor-and-crop-factor',
    seeAlso: ['sensor', 'crop-factor'],
  },
  {
    id: 'aspect-ratio',
    term: 'Aspect ratio',
    aliases: ['aspect ratios'],
    hinglish: 'Frame ki chaudai aur unchai ka ratio — 16:9, 2.39:1, 9:16. Ye decide karta hai frame ka shape.',
    definition:
      'The proportion of frame width to height, written as a ratio. It is a compositional decision, not a technical afterthought: a 2.39 frame invites lateral negative space, and a 9:16 frame forces vertical stacking.',
    trackId: 'camera',
    taughtIn: 'camera-aspect-ratio-and-safe-areas',
    seeAlso: ['letterbox', 'safe-area', 'anamorphic'],
  },
  {
    id: 'letterbox',
    term: 'Letterbox',
    aliases: ['letterboxing', 'letterboxed'],
    hinglish: 'Upar-neeche kaali patti daal ke wide frame ko 16:9 me fit karna.',
    definition:
      'Fitting a wider image inside a narrower frame by adding black bars above and below. Baking bars into a delivery file is a real decision — it costs you pixels and blocks the platform from cropping intelligently.',
    trackId: 'camera',
    taughtIn: 'camera-aspect-ratio-and-safe-areas',
    seeAlso: ['aspect-ratio', 'safe-area'],
  },
  {
    id: 'safe-area',
    term: 'Safe area',
    aliases: ['safe areas', 'safe-areas'],
    hinglish: 'Frame ka andar ka hissa jahan text/logo rakhna safe hai — bahar rakha toh crop ya UI kha jaayega.',
    definition:
      'The inset region of frame guaranteed to survive cropping, overscan, and platform interface elements. Action safe protects important motion; title safe, tighter still, protects text and logos.',
    trackId: 'camera',
    taughtIn: 'camera-aspect-ratio-and-safe-areas',
    seeAlso: ['aspect-ratio', 'letterbox'],
  },
  {
    id: 'anamorphic',
    term: 'Anamorphic',
    aliases: ['anamorphic lens', 'anamorphic lenses'],
    hinglish: 'Aisa lens jo image ko squeeze karke record karta hai, phir post me stretch hoti hai — wide frame + alag flares.',
    definition:
      'A lens that optically squeezes a wide image onto a normal-shaped sensor, to be unsqueezed later. Beyond the wider frame it brings oval bokeh, horizontal streak flares and a distinctive focus falloff — a look, not just a ratio.',
    trackId: 'camera',
    taughtIn: 'camera-aspect-ratio-and-safe-areas',
    seeAlso: ['aspect-ratio'],
  },
]

export const TERM_BY_ID = new Map(TERMS.map((t) => [t.id, t]))

/** Lowercased term text and aliases mapped to their term, for **bold** resolution. */
export const TERM_LOOKUP = new Map<string, Term>()
for (const t of TERMS) {
  TERM_LOOKUP.set(t.term.toLowerCase(), t)
  for (const alias of t.aliases) TERM_LOOKUP.set(alias.toLowerCase(), t)
}
