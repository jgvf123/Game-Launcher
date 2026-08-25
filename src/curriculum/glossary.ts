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
    hinglish:
      'Lens par likha mm ka number. Ye do cheezein tay karta hai — frame me kitna aayega, aur andar ki cheezein ek dusre se kitni paas lagengi. Ise sirf "zoom ka number" samajh lena hi sabse badi galti hai.',
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
    hinglish:
      'Camera ko kitna chauda dikh raha hai, degrees me. Chhota mm = zyada chauda, bada mm = patli si slice. Ek hi lens do alag cameras par alag field of view dega, kyunki sensor ki size alag hoti hai.',
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
    hinglish:
      'Chhota mm, lagbhag 12–35mm. Bahut kuch frame me aa jaata hai aur gehrai khinch jaati hai — paas ki cheez badi, thodi door wali bahut door. Frame bharne ke liye paas jaana padta hai, isliye feeling "andar ghuse hue" wali aati hai.',
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
    hinglish:
      'Lagbhag 40–58mm. Jo tumhari aankh dekhti hai, lagbhag wahi. Na drama, na exaggeration — isliye ye sabse imaandaar aur sabse kam dikhawa karne wala chunav hai.',
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
    hinglish:
      '85mm aur usse upar. Patli si slice dikhti hai, aur kyunki tum door se shoot karte ho, gehrai dab jaati hai — aage aur peeche wali cheezein chipak jaati hain. Feeling: door se nazar rakhna, akelapan, ya ghutan.',
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
    hinglish:
      'Frame ke andar cheezein ek dusre se kitni badi ya door lagti hain. Sabse zaroori baat: ye lens se nahi banta, tumhari khadi hone ki jagah se banta hai. Lens sirf itna tay karta hai ki us perspective ka kitna hissa crop me aayega.',
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
    hinglish:
      'Camera aur subject ke beech ki asli doori. Sirf yehi perspective badalti hai. Doori badlo toh subject aur background ka poora rishta badal jaata hai; sirf lens badlo toh bas crop badalta hai.',
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
    hinglish:
      'Door se shoot karo toh gehrai chapti ho jaati hai — sab kuch lagbhag barabar door hai, isliye alag-alag gehrai wali cheezein ek jaisi size me aati hain aur taash ke patton ki tarah chipak jaati hain. Ilzaam long lens par jaata hai, lekin asli wajah doori hai.',
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
    hinglish:
      'Camera hile toh paas ki cheez zyada khisakti hai aur door ki kam. Yehi hamara sabse strong depth signal hai. Zyada parallax = asli gehrai. Lagbhag zero parallax, jaise compressed telephoto me, toh duniya painted flat lagti hai.',
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
    hinglish:
      'Cheezon ko jaan-boojh ke alag-alag gehrai par rakhna — foreground, midground, background. Isse frame ek tasveer nahi, ek jagah lagta hai. Compression parton ko chipka deta hai; wide lens unhe phaila deta hai.',
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
    hinglish:
      'Camera bahut paas ho toh jo hissa lens ke najdeek hai wo zaroorat se zyada bada render hota hai — naak bada, kaan chhote. Ye lens ki kharabi nahi, doori ka asar hai; isiliye peeche hat jaane se apne aap theek ho jaata hai.',
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
    hinglish:
      'Optical kharabi jisme seedhi lines frame ke kinaron par bahar ki taraf mud jaati hain — wide aur zoom lenses me aam hai. Wide-angle distortion se alag cheez: ye kaanch ki property hai, isliye post me lens profile se theek ho jaati hai.',
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
    hinglish:
      'Full frame par 85–135mm ka range, jo chehron ke liye use hota hai. Wajah sharpness nahi — ye tumhe do meter ya zyada door khade hone par majboor karta hai, aur us doori par naak aur kaan lagbhag barabar door hote hain.',
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
    hinglish:
      'Camera apni jagah par rakhte hue focal length badalna. Sirf framing badalti hai: doori waisi ki waisi hai, isliye subject aur background ka rishta pehle jaisa hi rehta hai.',
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
    hinglish:
      'Camera ko sach me subject ki taraf le jaana, aksar dolly ya gimbal par. Doori badalti hai toh perspective bhi badalta hai — background peeche chhoot jaata hai, aur shot magnify hone ke bajaye paas jaane jaisa lagta hai.',
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
    hinglish:
      'Pahiyon wala platform, ya koi bhi rig, jo camera ko smooth chalata hai. Dolly move me dekhne ki jagah badalti hai, isliye parallax banta hai aur asli gehrai dikhti hai — jo zoom kabhi nahi kar sakta.',
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
    hinglish:
      'Camera ek taraf chalao aur lens doosri taraf zoom karo, barabar speed par. Subject ka size wahi rehta hai lekin background peeche phailta ya sikudta hai — lagta hai character ke paon ke neeche se zameen khisak rahi ho.',
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
    hinglish:
      'Camera ke andar ka chip jo image record karta hai. Uski asli naap tay karti hai ki lens ki banayi image ka kitna hissa capture hoga — isiliye ek hi lens alag cameras par alag frame karta hai.',
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
    hinglish:
      '36 x 24mm ka sensor, 35mm still negative jitna bada. Yehi wo reference hai jiske hisaab se crop factor aur equivalent focal length bole jaate hain — isliye lens ka number tabhi poora matlab rakhta hai jab sensor bhi bataya jaaye.',
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
    hinglish:
      'Lagbhag 24.9 x 18.7mm. Ek sadi se motion picture ka main format, aur aaj bhi zyadatar cinema cameras ka default. Full frame ke mukable iska crop factor lagbhag 1.4x hai.',
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
    hinglish:
      'Full frame ke diagonal aur tumhare sensor ke diagonal ka ratio. Lens ke mm ko isse guna karo toh pata chal jaata hai ki full frame par kaun sa lens waisi hi framing deta.',
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
    hinglish:
      'Focal length guna crop factor — yaani full frame ka wo lens jo waisi hi framing deta. Ye sirf framing batata hai: perspective abhi bhi tumhari khadi hone ki jagah se banta hai, aur depth of field alag tareeke se chalti hai.',
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
    hinglish:
      'Lens apne peeche jo gol image project karta hai. Sensor us daayre ke andar baith ke ek chaukor tukda kaat leta hai. Agar sensor daayre se bada ho toh kone kaale aa jaate hain — chhote format ke lens bade camera par lagane par yahi hota hai.',
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
    hinglish:
      'Frame ki chaudai aur unchai ka anupaat, ratio me likha jaata hai. Ye technical baad ki baat nahi, composition ka faisla hai: 2.39 frame kinaron par khaali jagah maangta hai, aur 9:16 frame sab kuch upar-neeche stack karne par majboor karta hai.',
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
    hinglish:
      'Chaude image ko lambe frame me fit karne ke liye upar-neeche kaali pattiyan lagana. Delivery file me pattiyan bake kar dena asli faisla hai — pixels ka nuksaan hota hai aur platform samajhdari se crop nahi kar paata.',
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
    hinglish:
      'Frame ka andar wala hissa jo cropping, overscan aur app ke buttons se bach jaata hai. Action safe zaroori movement bachata hai; title safe usse bhi tight hota hai aur text aur logo ke liye hai.',
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
    hinglish:
      'Aisa lens jo image ko optically squeeze karke normal shape ke sensor par record karta hai, aur baad me use stretch kiya jaata hai. Chaude frame ke alawa oval bokeh, horizontal streak flares aur alag focus falloff bhi deta hai — yaani ek look, sirf ratio nahi.',
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
