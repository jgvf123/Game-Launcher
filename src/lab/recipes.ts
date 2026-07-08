import type { Recipe } from './types'

/**
 * The recipe library: annotated, copy-ready prompts.
 * Prompts are written in portable keyword style — paste into MJ/SD as-is,
 * or load into the Builder ("Remix") to re-package for Flux/DALL·E/video dialects.
 */
export const RECIPES: Recipe[] = [
  // ─────────────────────────────── PORTRAITS ───────────────────────────────
  {
    id: 'p-char-closeup',
    type: 'still',
    title: 'Cinematic character close-up',
    useCase: 'portrait',
    prompt:
      'close-up of a retired sea captain, deep wrinkles and wind-burned skin, salt-grey stubble, warm tungsten key from the left, deep shadow falloff, 85mm, shallow depth of field, muted Kodak-style grade, subtle film grain',
    annotations: [
      { span: 'deep wrinkles and wind-burned skin', why: 'Specific texture detail defeats the airbrushed AI default.' },
      { span: 'warm tungsten key from the left', why: 'Named light source + direction = sculpted, motivated light.' },
      { span: '85mm, shallow depth of field', why: 'The portrait lens: compression + melted background.' },
      { span: 'muted Kodak-style grade', why: 'A grade with a name instead of the word “cinematic”.' },
    ],
    models: ['midjourney', 'flux', 'sd'],
    moodTags: ['intimate', 'melancholy'],
  },
  {
    id: 'p-lowkey',
    type: 'still',
    title: 'Moody low-key portrait',
    useCase: 'portrait',
    prompt:
      'low-key portrait of a jazz singer in the dark, single hard spotlight from high right, most of the face falling into black, smoke haze catching the beam, high contrast, 50mm, monochrome',
    annotations: [
      { span: 'single hard spotlight from high right', why: 'One source, stated hard, stated direction — the whole noir kit.' },
      { span: 'most of the face falling into black', why: 'Tells the model darkness is intentional, not underexposure to fix.' },
      { span: 'smoke haze catching the beam', why: 'Atmosphere makes light visible — instant depth.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['mysterious', 'tense'],
  },
  {
    id: 'p-highkey',
    type: 'still',
    title: 'High-key beauty',
    useCase: 'portrait',
    prompt:
      'high-key beauty portrait of a model with freckles, bright even softbox light, minimal shadows, clean white background, glossy natural makeup, visible skin texture and pores, 100mm, crisp focus on eyes',
    annotations: [
      { span: 'bright even softbox light, minimal shadows', why: 'High-key defined by its lighting, not by “bright and pretty”.' },
      { span: 'visible skin texture and pores', why: 'Beauty light + real skin — the anti-plastic insurance.' },
      { span: 'crisp focus on eyes', why: 'Directs the focus plane where beauty work lives.' },
    ],
    models: ['midjourney', 'flux', 'dalle'],
    moodTags: ['joyful', 'calm'],
  },
  {
    id: 'p-editorial',
    type: 'still',
    title: 'Editorial fashion',
    useCase: 'portrait',
    prompt:
      'editorial fashion photo, model in a sculptural crimson coat against raw concrete, hard directional sun creating a long diagonal shadow, confident wide stance, 35mm, high contrast, slight desaturation except the red',
    annotations: [
      { span: 'sculptural crimson coat against raw concrete', why: 'One loud color against one neutral texture — editorial in a phrase.' },
      { span: 'long diagonal shadow', why: 'Shadows as graphic design, the fashion-page signature.' },
      { span: 'slight desaturation except the red', why: 'Selective color instruction keeps the coat the only scream.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['epic', 'tense'],
  },
  {
    id: 'p-environmental',
    type: 'still',
    title: 'Environmental portrait',
    useCase: 'portrait',
    prompt:
      'environmental portrait of a potter in her sunlit studio, hands clay-covered at the wheel, shelves of glazed bowls behind, soft window light from the left, 28mm, deep focus, warm earthy palette',
    annotations: [
      { span: 'hands clay-covered at the wheel', why: 'The occupation shown in action, not stated as a caption.' },
      { span: '28mm, deep focus', why: 'Wide + deep: the person AND their world, both subjects.' },
    ],
    models: ['flux', 'dalle', 'sd'],
    moodTags: ['calm', 'intimate'],
  },
  {
    id: 'p-candid-doc',
    type: 'still',
    title: 'Candid documentary frame',
    useCase: 'portrait',
    prompt:
      'candid documentary photo of a train conductor laughing with a passenger, caught mid-gesture, slightly imperfect framing, available fluorescent light, 35mm, visible grain, unposed',
    annotations: [
      { span: 'caught mid-gesture, slightly imperfect framing', why: 'Imperfection tokens produce the unposed truth stock photos fake.' },
      { span: 'available fluorescent light', why: '“Available light” signals documentary honesty over studio polish.' },
    ],
    models: ['flux', 'midjourney'],
    moodTags: ['joyful', 'calm'],
  },
  {
    id: 'p-bw-study',
    type: 'still',
    title: 'B&W character study',
    useCase: 'portrait',
    prompt:
      'black and white character study of an old chess master mid-thought, hand on chin, Rembrandt lighting with a triangle of light on the shadowed cheek, deep blacks, fine silver-gelatin grain, 50mm',
    annotations: [
      { span: 'Rembrandt lighting with a triangle of light on the shadowed cheek', why: 'The named classic setup — models know it by name.' },
      { span: 'fine silver-gelatin grain', why: 'Names the print medium; richer than “black and white photo”.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['mysterious', 'calm'],
  },

  // ─────────────────────────────── PRODUCT / AD ───────────────────────────────
  {
    id: 'pr-marble',
    type: 'still',
    title: 'Luxury product on marble',
    useCase: 'product',
    prompt:
      'hero shot of an amber glass perfume bottle on white carrara marble, soft top light with a large gradient reflection, single water droplet beside it, shallow depth of field, blank label area, 4:5, high-end advertising photography',
    annotations: [
      { span: 'soft top light with a large gradient reflection', why: 'The luxury look IS this reflection — glass sells by its highlights.' },
      { span: 'single water droplet beside it', why: 'One prop, maximum restraint — luxury hates clutter.' },
      { span: 'blank label area', why: 'Plan the composite: the real logo goes on in post.' },
    ],
    models: ['midjourney', 'flux', 'sd'],
    moodTags: ['calm', 'epic'],
  },
  {
    id: 'pr-floating',
    type: 'still',
    title: 'Floating product, dramatic light',
    useCase: 'product',
    prompt:
      'sneaker floating mid-air at a dynamic angle, suspended dust particles, single hard spotlight from above, deep charcoal background, crisp rim light tracing the sole, product photography, 3:4',
    annotations: [
      { span: 'floating mid-air at a dynamic angle', why: 'Levitation reads as energy — the classic sneaker-ad move.' },
      { span: 'crisp rim light tracing the sole', why: 'Rim light separates product from dark bg and draws the silhouette.' },
      { span: 'suspended dust particles', why: 'Frozen particles imply the flash freezing a moment — adds physics.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['epic', 'tense'],
  },
  {
    id: 'pr-cosmetic-macro',
    type: 'still',
    title: 'Cosmetic macro',
    useCase: 'product',
    prompt:
      'extreme macro of a lipstick bullet emerging from its case, satin texture visible, soft gradient studio light, gentle pink-to-plum background wash, dewy highlight, 100mm macro, razor-thin focus plane',
    annotations: [
      { span: 'satin texture visible', why: 'Cosmetics sell texture; say the finish out loud.' },
      { span: '100mm macro, razor-thin focus plane', why: 'Macro lens language produces the extreme close product world.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['romantic', 'calm'],
  },
  {
    id: 'pr-food',
    type: 'still',
    title: 'Food hero',
    useCase: 'product',
    prompt:
      'overhead food hero of a burger stack mid-assembly, steam rising, sesame bun glistening, melted cheddar cascading over the patty edge, dark slate surface, dramatic side light, droplets of condensation on a cold glass beside it',
    annotations: [
      { span: 'melted cheddar cascading over the patty edge', why: 'Food ads are verbs — cascading, glistening, rising.' },
      { span: 'dramatic side light', why: 'Side light gives food dimension; flat light kills appetite.' },
    ],
    models: ['midjourney', 'flux', 'dalle'],
    moodTags: ['joyful'],
  },
  {
    id: 'pr-tech',
    type: 'still',
    title: 'Tech gadget on seamless',
    useCase: 'product',
    prompt:
      'minimalist product shot of matte black wireless earbuds on a seamless light-grey background, floating slightly above surface with a soft contact shadow, cool even light, subtle blue accent glow from the case LED, ultra-clean, 1:1',
    annotations: [
      { span: 'seamless light-grey background', why: 'The tech-ad staple: infinite, distraction-free space.' },
      { span: 'soft contact shadow', why: 'The shadow grounds the float — floating without it looks pasted.' },
      { span: 'subtle blue accent glow from the case LED', why: 'One motivated accent color from the product itself.' },
    ],
    models: ['midjourney', 'sd', 'dalle'],
    moodTags: ['calm'],
  },
  {
    id: 'pr-lifestyle',
    type: 'still',
    title: 'Lifestyle product-in-use',
    useCase: 'product',
    prompt:
      'lifestyle shot of a ceramic coffee tumbler in a cyclist’s hand at a foggy trailhead, steam curling up, morning backlight through mist, shallow focus on the tumbler, muted green-grey palette, candid feel',
    annotations: [
      { span: 'in a cyclist’s hand at a foggy trailhead', why: 'Product-in-life: the user and place tell the brand story.' },
      { span: 'shallow focus on the tumbler', why: 'Lifestyle context, but focus still sells the SKU.' },
    ],
    models: ['flux', 'midjourney'],
    moodTags: ['calm', 'joyful'],
  },
  {
    id: 'pr-beverage-splash',
    type: 'still',
    title: 'Beverage splash freeze',
    useCase: 'product',
    prompt:
      'high-speed photo of a citrus soda can with an arcing splash of liquid and orange slices frozen mid-air, pure white background, crisp hard flash light, every droplet sharp, commercial beverage advertising',
    annotations: [
      { span: 'arcing splash of liquid and orange slices frozen mid-air', why: 'Frozen liquid = energy; the beverage-ad signature.' },
      { span: 'every droplet sharp', why: 'Tells the model this is flash-frozen, not motion-blurred.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['joyful', 'epic'],
  },
  {
    id: 'pr-jewelry',
    type: 'still',
    title: 'Jewelry macro on black',
    useCase: 'product',
    prompt:
      'macro shot of a gold ring with a sapphire on black velvet, twin softbox reflections in the band, tiny star highlights on facets, deep black background, focus stacked sharpness, luxury advertising',
    annotations: [
      { span: 'twin softbox reflections in the band', why: 'Jewelry is photographed by its reflections — specify them.' },
      { span: 'black velvet', why: 'The texture that eats light and makes metal glow.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['epic', 'mysterious'],
  },

  // ─────────────────────────── ESTABLISHING / ENVIRONMENT ───────────────────────────
  {
    id: 'e-cityscape',
    type: 'still',
    title: 'Cinematic cityscape',
    useCase: 'environment',
    prompt:
      'elevated view of a rain-washed city at blue hour, grids of lit office windows, wet streets mirroring neon signage, low cloud ceiling catching the city glow, 35mm, deep focus, teal and amber palette',
    annotations: [
      { span: 'blue hour', why: 'A precise time of day with a known palette — stronger than “night”.' },
      { span: 'wet streets mirroring neon signage', why: 'Reflections double the light sources for free.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['melancholy', 'epic'],
  },
  {
    id: 'e-interior',
    type: 'still',
    title: 'Interior mood scene',
    useCase: 'environment',
    prompt:
      'empty mid-century living room at dusk, one floor lamp glowing warm against deepening blue window light, record player lid open, cigarette smoke hanging in the lamp beam, 28mm, quiet and still',
    annotations: [
      { span: 'warm against deepening blue window light', why: 'The two-temperature interior: warm practical vs cool dusk.' },
      { span: 'record player lid open', why: 'One story prop implies a whole absent character.' },
    ],
    models: ['flux', 'midjourney', 'dalle'],
    moodTags: ['melancholy', 'calm'],
  },
  {
    id: 'e-nature',
    type: 'still',
    title: 'Nature grandeur',
    useCase: 'environment',
    prompt:
      'vast glacial valley at dawn, a single tiny red tent on the moraine for scale, god rays breaking over the ridge, drifting mist layers, 24mm, deep focus, crisp cold palette',
    annotations: [
      { span: 'a single tiny red tent on the moraine for scale', why: 'Scale needs a ruler — one small known object makes the valley vast.' },
      { span: 'god rays breaking over the ridge', why: 'Named atmospheric light effect models render beautifully.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['epic', 'calm'],
  },
  {
    id: 'e-street',
    type: 'still',
    title: 'Atmospheric street',
    useCase: 'environment',
    prompt:
      'narrow old-town street after midnight rain, string lights swaying, closed shutters, one lit bakery window with a figure inside, cobblestones reflecting warm light, 35mm, shallow haze',
    annotations: [
      { span: 'one lit bakery window with a figure inside', why: 'A single lit window is narrative gravity — the eye goes straight to it.' },
      { span: 'cobblestones reflecting warm light', why: 'Wet texture + reflection = atmosphere by physics.' },
    ],
    models: ['flux', 'midjourney'],
    moodTags: ['mysterious', 'calm'],
  },
  {
    id: 'e-forest-road',
    type: 'still',
    title: 'Misty forest road',
    useCase: 'environment',
    prompt:
      'straight empty road vanishing into dense pine fog, headlight beams of a distant approaching car just visible, muted grey-green palette, symmetrical one-point perspective, 50mm, low contrast',
    annotations: [
      { span: 'headlight beams of a distant approaching car just visible', why: 'A promise of arrival — suspense in a landscape.' },
      { span: 'symmetrical one-point perspective', why: 'Composition instruction models obey remarkably well.' },
    ],
    models: ['midjourney', 'flux', 'sd'],
    moodTags: ['mysterious', 'unsettling'],
  },
  {
    id: 'e-rooftop',
    type: 'still',
    title: 'Rooftop blue hour',
    useCase: 'environment',
    prompt:
      'rooftop terrace at blue hour, string bulbs warm overhead, two empty chairs facing the skyline, city lights beginning to switch on, gentle wind in a tablecloth, 35mm, warm-cool contrast',
    annotations: [
      { span: 'two empty chairs facing the skyline', why: 'Absence as story — who sat here, who will?' },
      { span: 'warm-cool contrast', why: 'The blue-hour engine: tungsten bulbs against cobalt sky.' },
    ],
    models: ['flux', 'midjourney', 'dalle'],
    moodTags: ['romantic', 'melancholy'],
  },

  // ─────────────────────────── CONCEPT / MOOD BOARDS ───────────────────────────
  {
    id: 'c-scifi',
    type: 'still',
    title: 'Sci-fi world',
    useCase: 'concept',
    prompt:
      'terraforming station on a rust-orange exoplanet, colossal atmosphere processors venting white vapor, tiny suited figures on a catwalk, two moons low on the horizon, hard raking alien sunlight, concept art, ultra-wide 21:9',
    annotations: [
      { span: 'tiny suited figures on a catwalk', why: 'Scale ruler again — megastructures need ants.' },
      { span: 'hard raking alien sunlight', why: 'Off-world light quality sells the alien more than the architecture.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['epic', 'mysterious'],
  },
  {
    id: 'c-noir-alley',
    type: 'still',
    title: 'Noir alley',
    useCase: 'concept',
    prompt:
      'rain-slick noir alley, fire escape shadows laddering across brick, a fedora silhouette under the single caged bulb, steam from a grate, hard high-contrast black and white, 35mm',
    annotations: [
      { span: 'fire escape shadows laddering across brick', why: 'Noir is shadow patterns — name the pattern.' },
      { span: 'a fedora silhouette under the single caged bulb', why: 'Silhouette + lone source: the genre in one clause.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['mysterious', 'tense'],
  },
  {
    id: 'c-dreamy',
    type: 'still',
    title: 'Dreamy surreal',
    useCase: 'concept',
    prompt:
      'a bedroom floating in a pastel sky, sheets billowing upward in slow wind, doorway opening onto clouds, soft diffuse light with no shadows, gentle film halation, muted lavender and peach palette',
    annotations: [
      { span: 'soft diffuse light with no shadows', why: 'Shadowless light is the physics of dreams.' },
      { span: 'gentle film halation', why: 'The glow around highlights that reads “memory, not photo”.' },
    ],
    models: ['midjourney', 'dalle'],
    moodTags: ['romantic', 'calm'],
  },
  {
    id: 'c-retro',
    type: 'still',
    title: 'Retro / vintage aesthetic',
    useCase: 'concept',
    prompt:
      '1970s roadside motel at dusk, buzzing coral neon VACANCY sign, chrome sedan parked at an angle, faded Kodachrome palette, slight halation and vignette, shot on vintage 35mm film',
    annotations: [
      { span: 'faded Kodachrome palette', why: 'Naming the stock nails the era’s exact color memory.' },
      { span: 'slight halation and vignette', why: 'Lens-era artifacts — the period rendered by its optics.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['melancholy', 'romantic'],
  },
  {
    id: 'c-cyber-market',
    type: 'still',
    title: 'Cyberpunk night market',
    useCase: 'concept',
    prompt:
      'dense cyberpunk night market, noodle steam glowing in layered neon, umbrellas slick with rain, holographic koi swimming between stalls, crowd of silhouettes, 35mm, deep focus, cyan-magenta palette',
    annotations: [
      { span: 'holographic koi swimming between stalls', why: 'One impossible element makes it sci-fi; the rest stays grounded.' },
      { span: 'noodle steam glowing in layered neon', why: 'Atmosphere carrying colored light — depth by haze.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['epic', 'mysterious'],
  },
  {
    id: 'c-pastel-min',
    type: 'still',
    title: 'Pastel minimalism',
    useCase: 'concept',
    prompt:
      'minimalist composition of a single yellow spiral staircase against a flat pink wall, one small figure descending, hard clean shadow, geometric framing, pastel palette, 50mm, editorial',
    annotations: [
      { span: 'single yellow spiral staircase against a flat pink wall', why: 'Two colors, two shapes — minimalism is subtraction.' },
      { span: 'one small figure descending', why: 'The human dot gives geometry a story and a scale.' },
    ],
    models: ['midjourney', 'dalle'],
    moodTags: ['calm', 'joyful'],
  },

  // ─────────────── FRAMING VARIANTS — ONE SUBJECT (the violinist) ───────────────
  {
    id: 'f-wide',
    type: 'still',
    title: 'Violinist — wide shot',
    useCase: 'framing-variant',
    prompt:
      'wide shot of a street violinist playing under a stone archway at dusk, full figure small in frame, warm lamplight pooling around her, commuters passing as silhouettes, 35mm',
    annotations: [
      { span: 'wide shot', why: 'The framing token — compare this exact scene across the other variants.' },
      { span: 'full figure small in frame', why: 'Reinforces the size: models sometimes “drift closer” without it.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['melancholy', 'calm'],
  },
  {
    id: 'f-medium',
    type: 'still',
    title: 'Violinist — medium shot',
    useCase: 'framing-variant',
    prompt:
      'medium shot of a street violinist under a stone archway at dusk, framed from the waist up, bow mid-stroke, warm lamplight on her face, background commuters soft, 50mm',
    annotations: [
      { span: 'framed from the waist up', why: 'Anatomy landmark = unambiguous crop instruction.' },
      { span: 'bow mid-stroke', why: 'At medium, gesture becomes readable — give the hands a verb.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['calm', 'intimate'],
  },
  {
    id: 'f-closeup',
    type: 'still',
    title: 'Violinist — close-up',
    useCase: 'framing-variant',
    prompt:
      'close-up of the street violinist’s face, eyes closed in concentration, warm lamplight from below left, chin rest and scroll edge just in frame, 85mm, shallow depth of field',
    annotations: [
      { span: 'eyes closed in concentration', why: 'Close-ups are about interior state — direct the expression.' },
      { span: 'chin rest and scroll edge just in frame', why: 'Keeps the instrument present without stealing the face.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['intimate'],
  },
  {
    id: 'f-lowangle',
    type: 'still',
    title: 'Violinist — low angle',
    useCase: 'framing-variant',
    prompt:
      'low angle shot looking up at the street violinist, archway ceiling and dusk sky behind her, figure towering and monumental, warm lamplight rimming her silhouette, 35mm',
    annotations: [
      { span: 'low angle shot looking up', why: 'Angle token + gaze direction — she gains power over the frame.' },
      { span: 'figure towering and monumental', why: 'State the intended effect so the model exaggerates the geometry.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['heroic', 'epic'],
  },
  {
    id: 'f-highangle',
    type: 'still',
    title: 'Violinist — high angle',
    useCase: 'framing-variant',
    prompt:
      'high angle shot looking down at the street violinist from the archway stairs, she appears small against the wide cobblestone circle around her, scattered coins in the open case, 35mm',
    annotations: [
      { span: 'looking down at the street violinist from the archway stairs', why: 'Give the camera a physical position — “from the stairs” beats “high angle” alone.' },
      { span: 'she appears small against the wide cobblestone circle', why: 'The vulnerability the angle is FOR, spelled out.' },
    ],
    models: ['midjourney', 'flux'],
    moodTags: ['vulnerable', 'melancholy'],
  },
  {
    id: 'f-ots',
    type: 'still',
    title: 'Violinist — over-the-shoulder',
    useCase: 'framing-variant',
    prompt:
      'over-the-shoulder shot from behind a listener in a wool coat, their blurred shoulder framing the left edge, the violinist in focus beyond, warm dusk light, 50mm, shallow depth of field',
    annotations: [
      { span: 'their blurred shoulder framing the left edge', why: 'The OTS anatomy stated precisely: foreground anchor, soft.' },
      { span: 'the violinist in focus beyond', why: 'Declares the focus plane across the two figures.' },
    ],
    models: ['flux', 'midjourney'],
    moodTags: ['intimate'],
  },
  {
    id: 'f-dutch',
    type: 'still',
    title: 'Violinist — Dutch angle',
    useCase: 'framing-variant',
    prompt:
      'dutch angle shot of the street violinist, horizon tilted 15 degrees, archway lines running diagonal, unsettling energy in the frame, cooler shadows creeping into the lamplight, 35mm',
    annotations: [
      { span: 'horizon tilted 15 degrees', why: 'Quantify the tilt — “dutch angle” alone is often rendered too subtle.' },
      { span: 'cooler shadows creeping into the lamplight', why: 'Palette shift matches the angle’s unease — tokens working together.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['unsettling', 'tense'],
  },

  // ─────────────── LIGHTING VARIANTS — ONE SUBJECT (the watchmaker) ───────────────
  {
    id: 'l-rembrandt',
    type: 'still',
    title: 'Watchmaker — Rembrandt light',
    useCase: 'lighting-variant',
    prompt:
      'portrait of an old watchmaker at his bench, Rembrandt lighting from upper left, triangle of light on his shadowed cheek, dark workshop background, 85mm, warm tungsten tone',
    annotations: [
      { span: 'Rembrandt lighting from upper left', why: 'The named setup + direction; compare with the other variants of this same subject.' },
      { span: 'triangle of light on his shadowed cheek', why: 'Describe the signature so the model can’t miss the point.' },
    ],
    models: ['midjourney', 'flux', 'sd'],
    moodTags: ['mysterious', 'intimate'],
  },
  {
    id: 'l-silhouette',
    type: 'still',
    title: 'Watchmaker — silhouette',
    useCase: 'lighting-variant',
    prompt:
      'the watchmaker as a pure silhouette against his bright frosted workshop window, profile with loupe on his eye readable in outline, dust in the backlight, no facial detail, 50mm',
    annotations: [
      { span: 'pure silhouette against his bright frosted workshop window', why: 'Silhouette = expose for the background; the window is the light.' },
      { span: 'profile with loupe readable in outline', why: 'A silhouette lives or dies by its readable outline — design it.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['mysterious', 'melancholy'],
  },
  {
    id: 'l-rim',
    type: 'still',
    title: 'Watchmaker — backlit rim',
    useCase: 'lighting-variant',
    prompt:
      'the watchmaker leaning over a movement, strong backlight tracing a bright rim along his hair and shoulders, face in soft half-dark, floating dust sparkling in the beam, 85mm',
    annotations: [
      { span: 'bright rim along his hair and shoulders', why: 'Rim light described physically — where the line of light lives.' },
      { span: 'face in soft half-dark', why: 'Backlight means the face goes dark: say it, or the model adds fill.' },
    ],
    models: ['flux', 'midjourney'],
    moodTags: ['mysterious', 'calm'],
  },
  {
    id: 'l-window',
    type: 'still',
    title: 'Watchmaker — soft window light',
    useCase: 'lighting-variant',
    prompt:
      'the watchmaker at his bench beside a tall north-facing window, soft even daylight wrapping his face, gentle gradual shadows, calm and unhurried mood, 50mm, muted natural palette',
    annotations: [
      { span: 'tall north-facing window', why: 'North light = the softest, steadiest daylight — a photographer’s term models know.' },
      { span: 'gentle gradual shadows', why: 'Soft light defined by its shadow EDGES, the correct physical description.' },
    ],
    models: ['flux', 'dalle'],
    moodTags: ['calm', 'intimate'],
  },
  {
    id: 'l-noir',
    type: 'still',
    title: 'Watchmaker — hard noir shadow',
    useCase: 'lighting-variant',
    prompt:
      'the watchmaker interrogated by his own desk lamp, single hard bare bulb, razor-edged shadows across the bench, half his face cut into black, high contrast, smoke in the beam, 35mm',
    annotations: [
      { span: 'single hard bare bulb', why: 'Small source = hard shadow edges; the physics of noir in four words.' },
      { span: 'half his face cut into black', why: 'The chiaroscuro instruction — darkness as a deliberate shape.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['tense', 'mysterious'],
  },

  // ─────────────────────────────── EXTRA RANGE ───────────────────────────────
  {
    id: 'x-sports',
    type: 'still',
    title: 'Sports action freeze',
    useCase: 'concept',
    prompt:
      'a sprinter exploding out of the blocks, chalk dust bursting, every muscle defined, frozen at 1/8000s, hard low sun raking the track, long shadow stretching behind, 300mm telephoto compression, shallow focus',
    annotations: [
      { span: 'frozen at 1/8000s', why: 'Shutter-speed language tells the model: zero motion blur, crystalline.' },
      { span: '300mm telephoto compression', why: 'The sports-photo look is long glass — stacked, flat, isolated.' },
    ],
    models: ['midjourney', 'sd'],
    moodTags: ['epic', 'tense'],
  },
  {
    id: 'x-macro-texture',
    type: 'still',
    title: 'Abstract macro texture',
    useCase: 'concept',
    prompt:
      'extreme macro of ink diffusing through water, indigo tendrils blooming against white, soft even backlight, razor-thin focus, abstract, high detail, 4:5',
    annotations: [
      { span: 'ink diffusing through water', why: 'Physical processes generate organic abstract forms models render superbly.' },
      { span: 'soft even backlight', why: 'Backlighting translucent subjects reveals their internal structure.' },
    ],
    models: ['midjourney', 'sd', 'dalle'],
    moodTags: ['calm', 'mysterious'],
  },

  // ─────────────────────────────── VIDEO RECIPES ───────────────────────────────
  {
    id: 'v-product-orbit',
    type: 'video',
    title: 'Product orbit (ad hero)',
    useCase: 'video',
    prompt:
      'Slow orbit, medium close-up. An amber glass perfume bottle stands on wet black slate, droplets around its base. Studio dark background, one soft top light with a moving gradient reflection. The bottle remains rigid and solid, does not deform, label stays fixed. Premium, unhurried.',
    annotations: [
      { span: 'Slow orbit, medium close-up.', why: 'Camera FIRST (Veo dialect): one framing + one movement, nothing else.' },
      { span: 'remains rigid and solid, does not deform', why: 'Anti-morph clause — glass products melt without it.' },
      { span: 'moving gradient reflection', why: 'The orbit’s payoff: light traveling across glass. Name it.' },
    ],
    models: ['veo', 'kling', 'seedance'],
    moodTags: ['calm', 'epic'],
  },
  {
    id: 'v-boxer-pushin',
    type: 'video',
    title: 'Slow push-in (tension)',
    useCase: 'video',
    prompt:
      'Slow push-in from medium shot to close-up. A boxer sits alone in a dim locker room, unwrapping his hands slowly, eyes fixed on the floor. Tungsten practical lamps, deep shadows. Muffled crowd rumble through the walls, tape tearing softly (audio).',
    annotations: [
      { span: 'Slow push-in from medium shot to close-up', why: 'The dominant move with explicit start and end framing.' },
      { span: 'unwrapping his hands slowly', why: 'One continuous action that fits an 8-second clip.' },
      { span: 'Muffled crowd rumble through the walls, tape tearing softly (audio)', why: 'Veo audio design: ambience + one close diegetic sound.' },
    ],
    models: ['veo'],
    moodTags: ['tense', 'intimate'],
  },
  {
    id: 'v-kling-walk',
    type: 'video',
    title: 'Character walk (Kling dialect)',
    useCase: 'video',
    prompt:
      'A woman in a charcoal wool coat walks through a crowded rainy market at night, umbrellas passing around her, neon reflections on wet stone, steam drifting from food stalls. Her pace is steady and unhurried. Camera: tracking shot following behind her, smooth.',
    annotations: [
      { span: 'Camera: tracking shot following behind her, smooth.', why: 'Kling dialect: the scene fully built first, camera instruction LAST and plain.' },
      { span: 'Her pace is steady and unhurried', why: 'Gait direction — human motion is Kling’s strength; give it tempo.' },
    ],
    models: ['kling', 'hailuo'],
    moodTags: ['melancholy', 'calm'],
  },
  {
    id: 'v-drone-establish',
    type: 'video',
    title: 'Establishing pull-back reveal',
    useCase: 'video',
    prompt:
      'Slow aerial pull-back, wide shot. Begin close on a lone lighthouse lamp at dusk, then withdraw to reveal the entire storm-washed peninsula, waves breaking white against black rocks. Cold blue-grey palette, one warm light in the keeper’s window. Wind and distant surf (audio).',
    annotations: [
      { span: 'Begin close on a lone lighthouse lamp, then withdraw to reveal', why: 'Pull-backs are written as start → end; the reveal is the story.' },
      { span: 'one warm light in the keeper’s window', why: 'A single warm accent in a cold frame — the eye’s destination.' },
    ],
    models: ['veo', 'kling'],
    moodTags: ['epic', 'melancholy'],
  },
  {
    id: 'v-rack-focus',
    type: 'video',
    title: 'Rack focus reveal',
    useCase: 'video',
    prompt:
      'Static camera, medium shot, shallow depth of field. A woman reads a letter in the foreground, sharp; through the window behind her, a blurred figure approaches the house. Mid-clip, focus racks from her face to the figure outside. Soft afternoon window light.',
    annotations: [
      { span: 'Static camera', why: 'Rack focus IS the move — lock everything else.' },
      { span: 'focus racks from her face to the figure outside', why: 'The focus shift written as an event with a from and a to.' },
    ],
    models: ['veo', 'runway'],
    moodTags: ['tense', 'mysterious'],
  },
  {
    id: 'v-i2v-letter',
    type: 'video',
    title: 'i2v: animate a hero still',
    useCase: 'video',
    prompt:
      '[attach your locked hero still] She slowly lowers the letter and lifts her eyes toward the window. Her hair moves faintly in the draft. Slow push-in. Lighting and palette unchanged from the reference.',
    annotations: [
      { span: '[attach your locked hero still]', why: 'The i2v pattern: the image carries look and identity; the prompt only adds motion.' },
      { span: 'Lighting and palette unchanged from the reference', why: 'Fence off what the model must NOT reinvent.' },
    ],
    models: ['veo', 'kling', 'runway'],
    moodTags: ['intimate', 'melancholy'],
  },
  {
    id: 'v-whip-transition',
    type: 'video',
    title: 'Whip-pan transition pair',
    useCase: 'video',
    prompt:
      'Clip A: medium shot of a barista sliding a coffee across the counter, then a fast whip pan right that blurs the frame. Clip B: begins mid whip pan left that settles onto a cyclist catching the same cup at a street stand. Matching motion blur speed for an invisible edit point.',
    annotations: [
      { span: 'fast whip pan right that blurs the frame', why: 'End clip A inside the blur — the edit will hide in it.' },
      { span: 'begins mid whip pan left', why: 'Clip B starts inside the same blur; cut them together and the seam vanishes.' },
    ],
    models: ['kling', 'runway'],
    moodTags: ['joyful', 'chaotic'],
  },
  {
    id: 'v-veo-timestamps',
    type: 'video',
    title: 'Veo multi-shot via timestamps',
    useCase: 'video',
    prompt:
      '[00:00-00:03] Wide shot, static: a chess player makes her move in a silent tournament hall. [00:03-00:05] Reverse medium shot: her opponent’s eyes narrow. [00:05-00:08] Extreme close-up: her hand releases the queen. Room tone, a single clock tick (audio).',
    annotations: [
      { span: '[00:00-00:03] Wide shot, static:', why: 'Timestamp prompting: one framing per window, Veo cuts internally.' },
      { span: 'Reverse medium shot', why: 'Coverage grammar — the model understands shot/reverse-shot.' },
      { span: 'a single clock tick (audio)', why: 'One precise sound beats a soundscape paragraph.' },
    ],
    models: ['veo'],
    moodTags: ['tense', 'calm'],
  },
]

export const RECIPE_BY_ID = new Map(RECIPES.map((r) => [r.id, r]))

export const RECIPE_USECASE_LABEL: Record<Recipe['useCase'], string> = {
  portrait: 'Portraits',
  product: 'Product & Ads',
  environment: 'Establishing',
  concept: 'Concept & Mood',
  'framing-variant': 'Framing variants',
  'lighting-variant': 'Lighting variants',
  video: 'Video',
}
