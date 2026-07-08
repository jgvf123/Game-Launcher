import type { LabLesson, LabModule } from './types'

export const LAB_MODULES: LabModule[] = [
  { id: 'foundations', title: 'Foundations', tagline: 'How prompts actually work — specificity, order, anatomy, iteration.', order: 1 },
  { id: 'dialects', title: 'Model Dialects', tagline: 'The same scene, written four different ways for four different models.', order: 2 },
  { id: 'negatives', title: 'Negatives & the AI Look', tagline: 'What to exclude, per model — and how to kill the plastic sheen.', order: 3 },
  { id: 'cine-vocab', title: 'Cinematic Vocabulary', tagline: 'Concrete film language that beats the word “cinematic”.', order: 4 },
  { id: 'recipes-still', title: 'Recipe Library', tagline: '40+ annotated, ready-to-paste still prompts.', order: 5 },
  { id: 'video', title: 'Motion & Video', tagline: 'The video formula, the modifier rule, and per-model camera language.', order: 6 },
  { id: 'context', title: 'Context Engineering', tagline: 'References, i2v, seeds, and the open-model control trio.', order: 7 },
  { id: 'faces', title: 'Face & Character Consistency', tagline: 'Why faces drift and the fixes, strongest first.', order: 8 },
  { id: 'brand', title: 'Brand & Product Consistency', tagline: 'Locking products, palettes and logos for ad work.', order: 9 },
  { id: 'artifacts', title: 'Fixing AI Artifacts', tagline: 'Prompt-side troubleshooting for melting, floating and bad physics.', order: 10 },
  { id: 'workflow', title: 'Pro Workflow', tagline: 'Multi-model iteration and a realistic ad pipeline.', order: 11 },
  { id: 'landscape', title: '2026 Model Landscape', tagline: 'Maintainable reference cards for every major tool.', order: 12 },
]

export const LAB_MODULE_BY_ID = new Map(LAB_MODULES.map((m) => [m.id, m]))

export const LAB_LESSONS: LabLesson[] = [
  // ─────────────────────────────── 1 · FOUNDATIONS ───────────────────────────────
  {
    id: 'specificity',
    module: 'foundations',
    title: 'Specificity beats vibes',
    summary: 'Describe the image so a stranger could sketch it without asking a question.',
    explanation: [
      'Diffusion models don’t “get” your intention — they match your words against everything they’ve seen. Vague mood words (“epic”, “beautiful”, “stunning”) match millions of unrelated images, so the model averages them into generic output. Specific, concrete nouns and modifiers collapse that cloud into one picture.',
      'The working test: could a human artist sketch your prompt without asking a single follow-up question? “A sad scene” fails. “A woman in a yellow raincoat waiting alone at a bus stop at night, wet asphalt reflecting a green pharmacy sign” passes — subject, wardrobe, place, time, and even the color palette are pinned.',
      'Pros write prompts like set descriptions, not like reviews of the finished image. Say what is IN the frame, not how you hope it feels.',
    ],
    examples: [
      {
        label: 'Weak vs strong',
        prompt:
          'Weak: a beautiful epic sad street scene. Strong: a woman in a yellow raincoat waiting alone at a night bus stop, wet asphalt reflecting a green pharmacy cross, sodium streetlight haze',
        annotations: [
          { span: 'beautiful epic sad', why: 'Pure vibes — matches everything, pins nothing. The model averages toward generic.' },
          { span: 'yellow raincoat', why: 'Concrete wardrobe + a color anchor the composition can build around.' },
          { span: 'wet asphalt reflecting a green pharmacy cross', why: 'One specific detail paints the whole environment — reflections, palette, mood, all implied by facts.' },
          { span: 'sodium streetlight haze', why: 'Names the light source instead of naming an emotion; the sadness arrives for free.' },
        ],
      },
    ],
    relatedIds: ['anatomy', 'word-order', 'no-cinematic'],
    tags: ['fundamentals', 'writing'],
  },
  {
    id: 'word-order',
    module: 'foundations',
    title: 'Word order = emphasis',
    summary: 'Most models weight early tokens more — front-load what matters most.',
    explanation: [
      'In most text-to-image models, tokens near the start of the prompt carry more weight than tokens at the end. The first noun phrase usually decides what the image IS; trailing words tint it. Put the subject first, then the biggest stylistic decisions, and push housekeeping (quality tags, aspect ratio) to the tail.',
      'This is also why a buried subject fails: in “moody atmospheric rainy cyberpunk street with neon and a detective”, the street owns the frame and the detective becomes an afterthought. Flip it: “a weathered detective in a rain-soaked trench coat, standing in a neon-lit cyberpunk street…” — now the model builds the person and hangs the world behind them.',
    ],
    examples: [
      {
        label: 'Same words, different owner',
        prompt:
          'a weathered detective in a rain-soaked trench coat, neon-lit cyberpunk alley behind him, moody atmosphere, 35mm film still',
        annotations: [
          { span: 'a weathered detective', why: 'First position = the image’s owner. He will be sharp, centered, developed.' },
          { span: 'neon-lit cyberpunk alley behind him', why: '“Behind him” explicitly demotes the environment to backdrop.' },
          { span: '35mm film still', why: 'Technical flavor rides last — it tints, it doesn’t drive.' },
        ],
      },
    ],
    relatedIds: ['specificity', 'anatomy', 'mj-dialect'],
    tags: ['fundamentals', 'writing'],
  },
  {
    id: 'anatomy',
    module: 'foundations',
    title: 'The 6-part image anatomy',
    summary: 'Subject+detail · style/medium · lighting · composition · mood · technical.',
    explanation: [
      'Nearly every strong image prompt contains six jobs, whatever the model: (1) subject with specific detail, (2) style or medium, (3) lighting, (4) composition/framing, (5) mood, (6) technical specs (aspect ratio, lens, quality). You don’t need six sentences — you need all six jobs covered, in roughly that order.',
      'When a generation disappoints, audit it against the six parts. Nine times out of ten one slot is empty: no lighting stated (so you got flat noon), no framing stated (so you got a random crop), no medium (so you got the model’s house style).',
    ],
    examples: [
      {
        label: 'All six slots, labeled',
        prompt:
          'an elderly clockmaker inspecting a brass gear, cluttered workshop — photorealistic film still — single warm desk lamp, deep shadows — close-up, shallow depth of field — patient, absorbed mood — 85mm, 4:5',
        annotations: [
          { span: 'an elderly clockmaker inspecting a brass gear, cluttered workshop', why: 'Slot 1: subject + a verb + one prop + a place. Sketchable.' },
          { span: 'photorealistic film still', why: 'Slot 2: medium. Without it you inherit the model’s default style.' },
          { span: 'single warm desk lamp, deep shadows', why: 'Slot 3: lighting — source, temperature, contrast.' },
          { span: 'close-up, shallow depth of field', why: 'Slot 4: framing + focus behavior.' },
          { span: 'patient, absorbed mood', why: 'Slot 5: mood, AFTER the facts — one short phrase is enough.' },
          { span: '85mm, 4:5', why: 'Slot 6: technical tail — lens flavor and aspect ratio.' },
        ],
      },
    ],
    relatedIds: ['specificity', 'word-order', 'video-formula'],
    tags: ['fundamentals', 'anatomy'],
  },
  {
    id: 'iteration',
    module: 'foundations',
    title: 'The iteration mindset',
    summary: 'Expect 3–5 refinements. Change ONE variable at a time.',
    explanation: [
      'First generations are drafts, not failures. Professionals budget 3–5 refinements per image and treat each as an experiment: change exactly one variable — the lighting phrase, the lens, the framing — and regenerate. Change three things at once and you learn nothing from the result.',
      'Keep the winning version’s wording verbatim. Prompt fragments that work are assets: collect them in a personal swipe file (this app’s Builder can save yours) and reuse them across projects.',
    ],
    examples: [],
    relatedIds: ['one-variable', 'multi-model', 'seeds'],
    tags: ['fundamentals', 'workflow'],
  },

  // ─────────────────────────────── 2 · MODEL DIALECTS ───────────────────────────────
  {
    id: 'mj-dialect',
    module: 'dialects',
    title: 'Midjourney: keywords + parameters',
    summary: 'Short high-signal phrases, comma-chained, with --parameters doing real work.',
    explanation: [
      'Midjourney v7 reads short keyword phrases (2–4 words each) better than long grammar. Chain high-signal fragments with commas, front-load the subject, and control behavior with parameters: --ar (aspect), --no (negative), --chaos (variety), --stylize (how much MJ beautifies), --style raw (reduce the glossy “MJ look” for photoreal work).',
      'Consistency comes from references, not repetition: Omni-Reference for a person/product, style reference codes for a repeatable aesthetic.',
    ],
    examples: [
      {
        label: 'The dialect in action',
        prompt:
          'weathered fisherman portrait, salt-crusted beard, golden hour rim light, 85mm close-up, film grain --ar 4:5 --style raw --no hat, sunglasses',
        model: 'midjourney',
        annotations: [
          { span: 'weathered fisherman portrait', why: 'Subject phrase first — 3 words, all signal.' },
          { span: 'golden hour rim light', why: 'Lighting as a compact keyword phrase, not a sentence.' },
          { span: '--style raw', why: 'Dials down Midjourney’s house beautification for photoreal honesty.' },
          { span: '--no hat, sunglasses', why: 'MJ’s negative syntax — exclusions live in the parameter, not the prose.' },
        ],
      },
    ],
    relatedIds: ['flux-dialect', 'sd-dialect', 'which-model'],
    tags: ['midjourney', 'dialect'],
  },
  {
    id: 'flux-dialect',
    module: 'dialects',
    title: 'Flux: natural sentences',
    summary: 'Write it like a photographer’s brief — Flux actually reads grammar.',
    explanation: [
      'Flux has the strongest natural-language adherence of the image models: full sentences, spatial relationships (“to the left of”, “behind”), and multi-part instructions genuinely land. Keyword-stuffing HURTS here — it fragments the scene.',
      'Because it follows text so literally, Flux is the best model for consistency through pure prompting: describe a character once in exact terms and paste that description verbatim into every prompt.',
    ],
    examples: [
      {
        label: 'Same fisherman, Flux dialect',
        prompt:
          'A close-up portrait of a weathered fisherman in his sixties with a salt-crusted grey beard. Low golden-hour sunlight rims his face from behind the left shoulder. Shot on an 85mm lens with visible film grain, 4:5 crop. He wears no hat.',
        model: 'flux',
        annotations: [
          { span: 'in his sixties with a salt-crusted grey beard', why: 'Sentence-level detail Flux will honor precisely — reuse this clause verbatim for consistency.' },
          { span: 'from behind the left shoulder', why: 'Spatial grammar most models ignore — Flux respects it.' },
          { span: 'He wears no hat.', why: 'Exclusion as a plain sentence: Flux has no negative field and doesn’t need one.' },
        ],
      },
    ],
    relatedIds: ['mj-dialect', 'dalle-dialect', 'consistency-ladder'],
    tags: ['flux', 'dialect'],
  },
  {
    id: 'sd-dialect',
    module: 'dialects',
    title: 'Stable Diffusion: weights, negatives, pipeline',
    summary: 'Keywords + (weights) + a real negative field — and ControlNet does the heavy lifting.',
    explanation: [
      'SDXL/3.5 speaks keywords with syntax extras: (parentheses:1.3) to weight a token up, a dedicated NEGATIVE prompt field that genuinely removes concepts, and CFG scale to trade creativity against adherence.',
      'But the real SD superpower is the pipeline: ControlNet pins pose/depth/edges from a reference, LoRA bakes in a character or brand look, IP-Adapter transfers an image’s style. Once ControlNet drives composition, prompt wording matters far less — the prompt becomes set-dressing over a locked structure.',
    ],
    examples: [
      {
        label: 'Same fisherman, SD dialect',
        prompt:
          'portrait of weathered fisherman, (salt-crusted grey beard:1.2), golden hour rim light, 85mm, film grain, photorealistic | NEGATIVE: hat, sunglasses, smooth skin, cartoon, watermark',
        model: 'sd',
        annotations: [
          { span: '(salt-crusted grey beard:1.2)', why: 'Weight syntax: 20% extra emphasis on the defining feature.' },
          { span: 'NEGATIVE: hat, sunglasses, smooth skin, cartoon, watermark', why: 'A real negative field — stack exclusions here instead of polluting the positive prompt.' },
        ],
      },
    ],
    relatedIds: ['control-trio', 'universal-negatives', 'mj-dialect'],
    tags: ['stable-diffusion', 'dialect'],
  },
  {
    id: 'dalle-dialect',
    module: 'dialects',
    title: 'DALL·E / GPT-4o: talk to it',
    summary: 'Descriptive paragraphs and multi-turn editing — exclusions in plain English.',
    explanation: [
      'DALL·E and GPT-4o image generation behave like a junior artist you brief in conversation. Write full descriptive paragraphs; then refine across turns: “same scene, but move the lamp behind him and make the light warmer.” No parameters, no negative field — say “there should be no text or watermark anywhere” in plain language.',
      'This conversational loop makes it the fastest model for exploring compositions, even if its photoreal ceiling is softer than Flux or MJ.',
    ],
    examples: [
      {
        label: 'Same fisherman, conversational',
        prompt:
          'Create a photorealistic close-up portrait of a weathered fisherman in his sixties with a salt-crusted grey beard, lit by low golden-hour sun from behind his left shoulder, like an 85mm film photograph with subtle grain, vertical 4:5. There should be no hat and no text anywhere in the image.',
        model: 'dalle',
        annotations: [
          { span: 'Create a photorealistic close-up portrait', why: 'Direct instruction voice — you are briefing, not tagging.' },
          { span: 'There should be no hat and no text anywhere', why: 'Exclusion as a sentence. This IS the DALL·E negative prompt.' },
        ],
      },
    ],
    relatedIds: ['flux-dialect', 'negatives-by-model'],
    tags: ['dalle', 'dialect'],
  },
  {
    id: 'which-model',
    module: 'dialects',
    title: 'Which model for which job',
    summary: 'Choose per-shot: aesthetics → MJ, adherence → Flux, control → SD, conversation → GPT-4o.',
    explanation: [
      'Stop looking for one best model — pick per job. Beauty/mood boards and stylized concept art: Midjourney. Precise scene construction and text rendering: Flux. Total structural control, brand LoRAs, zero budget: Stable Diffusion. Fast conversational iteration and editing: DALL·E/GPT-4o.',
      'For video: prompt adherence + audio → Veo; human motion and faces → Kling or Hailuo; reference-driven consistency and post tools → Runway; product/multi-shot stability → Seedance; local and free → Wan.',
      'The Model Landscape module keeps one maintained card per tool — check lastUpdated there before committing a pipeline.',
    ],
    examples: [],
    relatedIds: ['landscape-overview', 'multi-model', 'video-dialects'],
    tags: ['strategy'],
  },

  // ─────────────────────────── 3 · NEGATIVES & THE AI LOOK ───────────────────────────
  {
    id: 'universal-negatives',
    module: 'negatives',
    title: 'The universal negative stack',
    summary: 'blurry, distorted, low quality, watermark — plus the portrait-specific block.',
    explanation: [
      'Some failure modes are so common that excluding them is near-free insurance: blurry, distorted, low quality, jpeg artifacts, watermark, text, logo. For any image with people add the portrait block: deformed hands, extra fingers, asymmetric eyes, malformed limbs.',
      'Don’t dump fifty negatives — each one nudges the model. Use the standard stack plus only the exclusions this image actually risks.',
    ],
    examples: [
      {
        label: 'A sane default (SD-style)',
        prompt:
          'NEGATIVE: blurry, distorted, low quality, jpeg artifacts, watermark, text — for portraits add: deformed hands, extra fingers, asymmetric eyes',
        annotations: [
          { span: 'watermark, text', why: 'Training data is full of stock-photo watermarks; these two save many rerolls.' },
          { span: 'deformed hands, extra fingers', why: 'Hands remain the classic failure — always negate them on people shots.' },
        ],
      },
    ],
    relatedIds: ['negatives-by-model', 'ai-look', 'weak-spots'],
    tags: ['negatives'],
  },
  {
    id: 'negatives-by-model',
    module: 'negatives',
    title: 'Negatives per model',
    summary: '--no for MJ, the negative field for SD, plain English for DALL·E and Flux.',
    explanation: [
      'The same exclusion travels differently: Midjourney takes --no item, item at the end of the prompt. Stable Diffusion has a dedicated negative field — the strongest implementation, it truly subtracts concepts. DALL·E and Flux take natural-language sentences (“no text, no watermark, he is not wearing glasses”).',
      'Know the strength order: SD negative field > MJ --no > natural-language exclusion. If an exclusion is critical (say, no glasses on a brand character), pick a model where you can enforce it strongly, or fix in post.',
    ],
    examples: [],
    relatedIds: ['universal-negatives', 'sd-dialect', 'dalle-dialect'],
    tags: ['negatives', 'dialect'],
  },
  {
    id: 'ai-look',
    module: 'negatives',
    title: 'Killing the “AI look”',
    summary: 'Over-smooth skin, perfect symmetry, glossy plastic — counter with imperfection tokens.',
    explanation: [
      'The telltale AI look is a cluster: poreless smooth skin, perfectly symmetric faces, glossy plastic surfaces, over-saturated cinematic teal, everything in focus. It comes from models being trained to please — you counter it by explicitly requesting reality’s flaws.',
      'The counter-token kit: skin texture, visible pores, natural imperfections, film grain, subtle motion blur, asymmetric framing, candid expression. In Midjourney also add --style raw; in SD put smooth skin, airbrushed, plastic in the negative field.',
    ],
    examples: [
      {
        label: 'De-plasticizing a portrait',
        prompt:
          'candid portrait of a barista laughing, visible pores and skin texture, natural imperfections, soft window light, slight film grain, shot on 35mm --style raw',
        annotations: [
          { span: 'visible pores and skin texture', why: 'Directly attacks the airbrushed default.' },
          { span: 'candid', why: 'Fights the posed, symmetrical stock-photo energy.' },
          { span: 'slight film grain', why: 'Grain breaks the digital-perfect surface and reads as “photograph”.' },
        ],
      },
    ],
    relatedIds: ['universal-negatives', 'no-cinematic', 'mj-dialect'],
    tags: ['negatives', 'realism'],
  },

  // ─────────────────────────── 4 · CINEMATIC VOCABULARY ───────────────────────────
  {
    id: 'no-cinematic',
    module: 'cine-vocab',
    title: 'Stop writing “cinematic”',
    summary: 'The word produces a generic look — name the actual technique instead.',
    explanation: [
      '“Cinematic” is the most over-used token in image prompting, and it converges on one generic look: teal-orange grade, anamorphic flare, shallow focus. If that IS what you want — say those exact words. If not, the word is stealing control from you.',
      'Replace the adjective with the craft: name a focal length (35mm, 85mm), a depth of field, a lighting setup (Rembrandt key, backlit rim), a film stock or grain, a grade by name (bleach bypass, muted Kodak tones). Every concrete term you learned in the cinematography modules of this app is a usable prompt token.',
    ],
    examples: [
      {
        label: '“Cinematic”, decompressed',
        prompt:
          'night diner interior, woman at the counter, single practical neon sign as key light, 35mm lens, shallow depth of field, muted Kodak-style grade, gentle film grain',
        annotations: [
          { span: 'single practical neon sign as key light', why: 'This is what “cinematic” was hiding: a motivated, named light source.' },
          { span: 'muted Kodak-style grade', why: 'A grade with a name beats a vibe with none.' },
        ],
      },
    ],
    relatedIds: ['lens-language', 'grade-mood', 'specificity'],
    tags: ['vocabulary', 'realism'],
  },
  {
    id: 'lens-language',
    module: 'cine-vocab',
    title: 'Lens & focus tokens',
    summary: '35mm vs 85mm, shallow vs deep, anamorphic flare — optics as vocabulary.',
    explanation: [
      'Focal lengths are style shorthand the models know: 24–35mm = environmental, wide, a bit of stretch; 50mm = neutral documentary; 85–135mm = compressed, flattering portraits with melted backgrounds. “Shallow depth of field” isolates; “deep focus” keeps layered scenes readable.',
      '“Anamorphic lens flare” brings the horizontal streak and oval bokeh of big-screen glass — powerful but loud, so use it deliberately. These map one-to-one to the Lens module in the cinematography half of this app.',
    ],
    examples: [
      {
        label: 'Two lenses, two stories',
        prompt:
          'A: street vendor at his stall, 28mm environmental portrait, deep focus, market alive behind him. B: the same vendor, 85mm close-up, shallow depth of field, market melted to warm bokeh',
        annotations: [
          { span: '28mm environmental portrait, deep focus', why: 'Wide + deep = man AND world, both sharp, both subjects.' },
          { span: '85mm close-up, shallow depth of field', why: 'Long + shallow = the man alone; the world becomes color.' },
        ],
      },
    ],
    relatedIds: ['no-cinematic', 'grade-mood', 'anatomy'],
    tags: ['vocabulary', 'lens'],
  },
  {
    id: 'grade-mood',
    module: 'cine-vocab',
    title: 'Light + lens + grade = mood',
    summary: 'Noir, romance, horror, corporate — each is a repeatable token bundle.',
    explanation: [
      'Moods are recipes, not adjectives. Noir: hard single-source light, deep shadows, high contrast, 35mm, desaturated or monochrome. Romance: soft window light, warm palette, 85mm shallow focus, gentle halation. Horror: low-key, cool green-cyan cast, hard shadows breaking across faces, slight wide-angle unease. Clean corporate: high-key even light, neutral whites, 50mm, deep focus, low contrast.',
      'Build the bundle from the three layers — light quality/direction, lens behavior, color grade — and you can dial any genre on demand. The Recipes module has one-subject lighting variants that make this visible.',
    ],
    examples: [],
    relatedIds: ['no-cinematic', 'lens-language', 'ai-look'],
    tags: ['vocabulary', 'mood'],
  },

  // ─────────────────────────────── 6 · MOTION & VIDEO ───────────────────────────────
  {
    id: 'video-formula',
    module: 'video',
    title: 'The universal video formula',
    summary: 'Subject + action + scene + camera + lighting (+ audio for Veo).',
    explanation: [
      'Every strong video prompt answers five questions: WHO/WHAT (subject), DOING WHAT (action — the part stills don’t have), WHERE (scene), HOW SEEN (camera framing + movement), and HOW LIT. Veo adds a sixth: WHAT WE HEAR.',
      'Action verbs carry video prompts the way nouns carry stills. “A chef” is a still; “a chef flips a sizzling pan, flames leaping” is a shot. Give every clip one clear action with a beginning and an end that fits the clip length.',
    ],
    examples: [
      {
        label: 'The formula, assembled',
        prompt:
          'A street chef flips noodles in a flaming wok, sparks rising — cramped night market stall, steam and neon — slow push-in from medium shot — lit by the wok flame and overhead bulbs — sizzle and clatter of the market (audio)',
        annotations: [
          { span: 'flips noodles in a flaming wok, sparks rising', why: 'One concrete action with visible physics — the heart of a video prompt.' },
          { span: 'slow push-in from medium shot', why: 'Camera slot: ONE framing + ONE movement.' },
          { span: 'sizzle and clatter of the market (audio)', why: 'The audio clause — Veo renders it, other models ignore it harmlessly.' },
        ],
      },
    ],
    relatedIds: ['modifier-rule', 'video-dialects', 'anatomy'],
    tags: ['video', 'formula'],
  },
  {
    id: 'modifier-rule',
    module: 'video',
    title: 'The 2–3 modifier rule',
    summary: 'One framing + one movement (+ maybe one lens). One DOMINANT move per clip.',
    explanation: [
      'Video models get confused by stacked camera directives. The reliable ceiling: one framing term (medium shot), one movement (slow push-in), optionally one lens/look term (shallow focus). Ask for “pan + tilt + orbit + zoom + handheld” in one clip and you get swimmy, undecided motion.',
      'Choose the DOMINANT move — the one the emotion needs — and give the clip only that. If a sequence needs multiple moves, that’s multiple clips stitched in the edit (see Multi-shot).',
    ],
    examples: [
      {
        label: 'Overloaded vs disciplined',
        prompt:
          'Overloaded: pan across the room then tilt up while orbiting and zooming handheld. Disciplined: slow orbit around the dancer, medium shot',
        annotations: [
          { span: 'pan across the room then tilt up while orbiting and zooming handheld', why: 'Five directives — the model will average them into mush.' },
          { span: 'slow orbit around the dancer, medium shot', why: 'One move, one framing. This is the whole grammar of a clip.' },
        ],
      },
    ],
    relatedIds: ['video-formula', 'camera-emotions', 'multi-shot'],
    tags: ['video', 'camera'],
  },
  {
    id: 'camera-emotions',
    module: 'video',
    title: 'Camera moves and what they mean',
    summary: 'Push-in = pressure, orbit = showcase, handheld = panic, crane = release.',
    explanation: [
      'The move IS the emotion — the same vocabulary you drilled in the cinematography half of this app, now as prompt tokens: static/locked (observation, deadpan), slow push-in (rising tension or intimacy), pull-back (release, reveal, loneliness), orbit (showcase, wonder — the ad favorite), pan/tilt (reveal along an axis), dolly/tracking (travel with the subject), crane up (ending, scale), handheld (raw, urgent, documentary), Steadicam glide (smooth immersive follow), whip pan (energy, transition), rack focus (redirect attention).',
      'This language is portable across Veo, Kling and Runway — only the packaging differs (see Video Dialects).',
    ],
    examples: [],
    relatedIds: ['modifier-rule', 'video-dialects', 'video-formula'],
    tags: ['video', 'camera'],
  },
  {
    id: 'video-dialects',
    module: 'video',
    title: 'Veo, Kling, Runway dialects',
    summary: 'Veo wants camera FIRST; Kling wants camera LAST; Runway wants you to paint it.',
    explanation: [
      'Veo 3.1: five parts, camera first — Cinematography → Subject → Action → Context → Style & Ambiance. It renders native audio (write what we hear), takes up to 3 reference images for character consistency, supports first-and-last-frame control, and understands timestamp prompting ([00:00-00:02] medium shot, [00:02-00:04] reverse shot) for multi-shot clips.',
      'Kling 3.0: describe the scene fully, then put the camera instruction LAST — it builds the world before moving through it. Use plain motion words (push in, pull back, orbit, pan, tilt). Professional Mode exposes manual camera sliders; values around 1–3 give smooth, usable motion. Has a multi-shot storyboard mode.',
      'Runway Gen-4.5: strongest when you stop writing and start painting — the motion brush marks WHAT moves and in which direction, and reference images drive character consistency. Best-in-class for chaining shots and finishing.',
    ],
    examples: [
      {
        label: 'Same shot, Veo vs Kling packaging',
        prompt:
          'Veo: Slow push-in, medium shot. A tired boxer sits alone in the locker room, unwrapping his hands. Dim tungsten practicals. Distant crowd rumble through the walls (audio). — Kling: A tired boxer sits alone in a dim locker room unwrapping his hands, tungsten practical lamps. Camera: slow push in.',
        annotations: [
          { span: 'Slow push-in, medium shot.', why: 'Veo reads cinematography FIRST — lead with the camera.' },
          { span: 'Camera: slow push in.', why: 'Kling reads the scene first, camera LAST — same intent, opposite packaging.' },
          { span: 'Distant crowd rumble through the walls (audio)', why: 'Audio clause: only Veo renders this natively.' },
        ],
      },
    ],
    relatedIds: ['video-formula', 'modifier-rule', 'multi-shot'],
    tags: ['video', 'dialect'],
  },
  {
    id: 'multi-shot',
    module: 'video',
    title: 'Multi-shot sequences: stitch, don’t stuff',
    summary: 'One dominant move per clip; assemble the sequence in the edit.',
    explanation: [
      'Long AI clips drift. The professional pattern is short and deliberate: plan the sequence as 4–6 clips, give each ONE dominant camera move and ONE action beat, generate, then stitch in your editor — this is exactly where a video-editing background becomes a superpower.',
      'For in-model multi-shot: Veo timestamp prompting can pack 2–3 shots into one clip; Kling and Seedance have storyboard modes. Still, the edit is where rhythm lives — treat generated clips as dailies, not finals.',
    ],
    examples: [],
    relatedIds: ['modifier-rule', 'ad-pipeline', 'video-dialects'],
    tags: ['video', 'workflow'],
  },

  // ─────────────────────────── 7 · CONTEXT ENGINEERING ───────────────────────────
  {
    id: 'reference-types',
    module: 'context',
    title: 'Style reference vs subject reference',
    summary: 'Copy the LOOK of an image, or include the THING in an image — never confuse the two.',
    explanation: [
      'Reference images beat words for anything words can’t pin down — a palette, a face, a product’s exact shape. But there are two different jobs: a STYLE reference says “copy this aesthetic (palette, lighting, grain) but not its content”; a SUBJECT reference says “this exact person/product must appear”. Feeding a subject reference as a style reference gives you strangers in the right colors; the reverse gives you your product in the wrong world.',
      'Every serious tool now has both lanes: Midjourney separates style reference from Omni-Reference; Veo takes subject reference images; SD splits them across IP-Adapter (style) and LoRA/ControlNet (subject/structure).',
    ],
    examples: [],
    relatedIds: ['i2v', 'control-trio', 'consistency-ladder'],
    tags: ['context', 'reference'],
  },
  {
    id: 'i2v',
    module: 'context',
    title: 'i2v beats t2v for control',
    summary: 'Generate a strong still, then animate it — the pro path to consistent video.',
    explanation: [
      'Text-to-video makes the model invent everything at once. Image-to-video hands it a visual anchor: composition, character, palette and lighting are already decided, and the model only has to add motion. Control and consistency jump dramatically.',
      'The professional path: iterate a controlled STILL until it’s right (cheap, fast), then animate that still with a one-move camera prompt. First-frame/last-frame control extends this — lock where the clip starts AND ends and let the model interpolate.',
    ],
    examples: [
      {
        label: 'The i2v prompt is tiny',
        prompt:
          '[hero still attached] The woman slowly lowers the letter and looks up toward the window. Slow push-in. Soft window light unchanged.',
        annotations: [
          { span: '[hero still attached]', why: 'The image carries subject, framing, palette, light — 80% of the prompt is already inside it.' },
          { span: 'Soft window light unchanged.', why: 'Tell the model what NOT to reinvent.' },
        ],
      },
    ],
    relatedIds: ['reference-types', 'consistency-ladder', 'ad-pipeline'],
    tags: ['context', 'video'],
  },
  {
    id: 'seeds',
    module: 'context',
    title: 'Seeds: repeatability on demand',
    summary: 'Fix the seed to isolate variables; vary it to explore.',
    explanation: [
      'The seed is the random starting noise. Same prompt + same seed + same settings = (nearly) the same image. That makes seeds the scientific control for iteration: fix the seed, change one prompt token, and the diff you see is caused by that token alone.',
      'Workflow: explore with random seeds → find a composition you love → note its seed → refine wording with the seed locked. In SD the seed is a field; in Midjourney it’s --seed; most video tools expose it in advanced settings.',
    ],
    examples: [],
    relatedIds: ['iteration', 'one-variable'],
    tags: ['context', 'workflow'],
  },
  {
    id: 'control-trio',
    module: 'context',
    title: 'LoRA, ControlNet, IP-Adapter',
    summary: 'Train the look, pin the structure, transfer the style — the open-model trio.',
    explanation: [
      'For open models (SD, Flux-dev, Wan) three tools cover almost every control need: LoRA — a small fine-tune trained on 15–30 images that bakes a character, product or brand look into the model itself (the strongest consistency there is). ControlNet — feeds a pose skeleton, depth map or edge sketch that the generation must follow, pinning composition regardless of wording. IP-Adapter — takes a reference image as a “visual prompt”, transferring its style or subject without training.',
      'Rule of thumb: recurring character/brand → LoRA; exact pose/layout → ControlNet; “make it look like this” one-offs → IP-Adapter.',
    ],
    examples: [],
    relatedIds: ['sd-dialect', 'reference-types', 'consistency-ladder'],
    tags: ['context', 'tools'],
  },

  // ─────────────────────────── 8 · FACE & CHARACTER CONSISTENCY ───────────────────────────
  {
    id: 'why-faces-drift',
    module: 'faces',
    title: 'Why faces drift',
    summary: 'Every generation resamples identity — without an anchor, the face is dice.',
    explanation: [
      'Models don’t remember your character between generations. Each run resamples “a woman in her thirties with short dark hair” from millions of candidates — so shot 2 is a different woman who fits the same words. The looser the description, the wider the dice.',
      'Consistency is therefore an anchoring problem: you must hand the model identity information stronger than words — an image, a reference, or a trained LoRA.',
    ],
    examples: [],
    relatedIds: ['consistency-ladder', 'reference-types'],
    tags: ['faces', 'consistency'],
  },
  {
    id: 'consistency-ladder',
    module: 'faces',
    title: 'The consistency ladder',
    summary: 'LoRA > reference images > i2v from a hero still > repeated exact description.',
    explanation: [
      'Fixes in order of strength: (1) Train a LoRA on the character — identity baked into the weights, survives any prompt. (2) Reference images — e.g. up to 3 in Veo, Omni-Reference in MJ, Runway references. (3) i2v from one locked hero still — the face enters every clip from the same pixels. (4) Weakest but free: a consistent, detailed, REPEATED description — same age, features, wardrobe, phrasing, verbatim, every single time.',
      'For a recurring character, make a character sheet first: one session generating the same person from multiple angles (front, profile, 3/4) with a locked description/seed — then use those images as references everywhere. Storyboard modes (Kling, Seedance) accept the sheet across shots.',
    ],
    examples: [
      {
        label: 'A reusable identity block',
        prompt:
          'MIRA: woman, 34, short black bob with blunt fringe, light-brown eyes, small scar over left eyebrow, charcoal wool coat over mustard scarf — copy this block verbatim into every prompt',
        annotations: [
          { span: 'small scar over left eyebrow', why: 'A rare, specific feature narrows the identity dice dramatically.' },
          { span: 'copy this block verbatim into every prompt', why: 'Consistency by repetition only works if the wording never varies.' },
        ],
      },
    ],
    relatedIds: ['why-faces-drift', 'control-trio', 'i2v'],
    tags: ['faces', 'consistency'],
  },
  {
    id: 'human-models',
    module: 'faces',
    title: 'Which models hold humans best',
    summary: 'Kling & Hailuo for motion/faces, Veo for adherence + audio, Runway for references.',
    explanation: [
      'Human work has clear lanes in 2026: Kling and Hailuo render human motion and facial performance most naturally — walk cycles, expressions, hands in motion. Veo leads on doing-what-you-said plus native audio (dialogue lip-sync included). Runway wins when consistency across many shots matters, because its reference system and editing tools close the loop.',
      'Practical pattern: design the character in an image model (Flux/MJ with references), verify a character sheet, then animate in Kling/Hailuo for performance or Veo for scripted shots with sound.',
    ],
    examples: [],
    relatedIds: ['consistency-ladder', 'video-dialects', 'which-model'],
    tags: ['faces', 'strategy'],
  },

  // ─────────────────────────── 9 · BRAND & PRODUCT CONSISTENCY ───────────────────────────
  {
    id: 'product-locking',
    module: 'brand',
    title: 'Locking the product & palette',
    summary: 'Subject reference for the exact product; hex codes + reference for brand color.',
    explanation: [
      'For ads the product is the actor, and it must be THIS product. Use subject reference (product photos from several angles) so the model reproduces the actual bottle/box/device, not a lookalike. Lock the brand palette two ways at once: a style/color reference image AND explicit tokens (“brand palette: deep teal #0F4C4C and warm cream #F5EDE0”).',
      'Shoot the reference photos like a product photographer would: clean background, even light, multiple angles — garbage references produce garbage consistency.',
    ],
    examples: [
      {
        label: 'Palette locking tokens',
        prompt:
          'hero shot of [REF: the attached serum bottle], on wet black slate, brand palette: deep teal #0F4C4C background, warm cream #F5EDE0 accents, soft top light',
        annotations: [
          { span: '[REF: the attached serum bottle]', why: 'Subject reference: the exact SKU, not “a serum bottle”.' },
          { span: 'deep teal #0F4C4C', why: 'Hex tokens nudge the grade toward the brand book — belt AND suspenders with the reference.' },
        ],
      },
    ],
    relatedIds: ['logo-limits', 'reference-types', 'product-models'],
    tags: ['brand', 'product'],
  },
  {
    id: 'logo-limits',
    module: 'brand',
    title: 'Logos & labels: plan the composite',
    summary: 'Fine logo detail still artifacts — generate clean, composite the real logo in post.',
    explanation: [
      'On-screen text and fine logo detail remain weak spots in 2026: labels warp, letterforms melt, trademarks come back subtly wrong — which for a brand is worse than obviously wrong. The professional answer is not a better prompt; it is a workflow: generate the shot with a clean/blank label area, then composite the real vector logo in post.',
      'Prompt for compositing: “blank matte label area, no text on packaging” gives you a clean plate. Your editing background makes this a five-minute fix instead of fifty rerolls.',
    ],
    examples: [],
    relatedIds: ['product-locking', 'weak-spots', 'ad-pipeline'],
    tags: ['brand', 'post'],
  },
  {
    id: 'product-models',
    module: 'brand',
    title: 'Product-friendly models',
    summary: 'Seedance for product/multi-shot stability; human-specialists are the wrong tool here.',
    explanation: [
      'Models optimize for different subjects. Seedance is notable for product and logo stability across multi-shot generations — the packaging stays the same object between cuts. Human-performance specialists (Kling, Hailuo) wobble more on rigid products; adherence leaders (Veo) do well with strong references.',
      'For stills, SD + a product LoRA (trained on your SKU) or Flux with verbatim product description + references are the dependable lanes. Whatever generates it: the finishing pass (real logo composited, artifacts cleaned) is part of the pipeline, not an apology.',
    ],
    examples: [],
    relatedIds: ['product-locking', 'logo-limits', 'which-model'],
    tags: ['brand', 'strategy'],
  },

  // ─────────────────────────── 10 · FIXING AI ARTIFACTS ───────────────────────────
  {
    id: 'rigidity',
    module: 'artifacts',
    title: 'Morphing & melting → rigidity language',
    summary: '“Remains rigid and solid, does not deform” — say the physics out loud.',
    explanation: [
      'Video models love to melt objects: bottles breathe, cars wobble like jelly, jewelry flows. The counter is explicit rigidity language in the prompt: “the bottle remains rigid and solid, does not deform, keeps its exact shape throughout”.',
      'It reads silly. It works. Models respond to stated physical constraints, especially near the object’s mention. Pair with slower camera moves — fast motion multiplies morphing.',
    ],
    examples: [
      {
        label: 'Anti-melt clause',
        prompt:
          'slow orbit around a glass perfume bottle on marble; the bottle remains rigid and solid, does not deform, label stays fixed and legible',
        annotations: [
          { span: 'remains rigid and solid, does not deform', why: 'The core anti-morph incantation — state the physics you want.' },
          { span: 'label stays fixed and legible', why: 'Labels drift independently; pin them explicitly.' },
        ],
      },
    ],
    relatedIds: ['physics-negatives', 'weak-spots', 'modifier-rule'],
    tags: ['artifacts', 'video'],
  },
  {
    id: 'physics-negatives',
    module: 'artifacts',
    title: 'Floating & teleporting → physics negatives',
    summary: '“No clipping, no floating, feet stay planted” — deny the glitch by name.',
    explanation: [
      'Objects hovering above tables, feet sliding over ground, hands passing through cups — video models drop physics under load. Name the failure in negatives or constraints: “no floating, no clipping, feet firmly planted, the cup stays in contact with the table”.',
      'For impacts and collisions, describe the contact explicitly: “the fist connects with the pad, the pad compresses” — models given the collision language render the collision; models left to infer it often skip the touch entirely.',
    ],
    examples: [],
    relatedIds: ['rigidity', 'weak-spots'],
    tags: ['artifacts', 'video'],
  },
  {
    id: 'weak-spots',
    module: 'artifacts',
    title: 'Frame around the weak spots',
    summary: 'Hands, on-screen text, complex machinery: crop them out or fix in post.',
    explanation: [
      'Some things are still cheaper to avoid than to fix: close-up hands doing fine manipulation, readable on-screen text, complex mechanical detail (bike chains, watch movements). The pro move is directorial: frame around them — crop at the wrists, keep text out of frame, show the machine’s silhouette not its guts.',
      'When they must appear, plan the post fix from the start: generate a clean plate and composite real text/logos; cutaway inserts of real hands; shorter shots so flaws have no time to register.',
    ],
    examples: [],
    relatedIds: ['logo-limits', 'universal-negatives', 'multi-shot'],
    tags: ['artifacts', 'strategy'],
  },

  // ─────────────────────────── 11 · PRO WORKFLOW ───────────────────────────
  {
    id: 'multi-model',
    module: 'workflow',
    title: 'Run it across 2–3 models',
    summary: 'Same prompt, multiple models, pick per shot — never marry one tool.',
    explanation: [
      'Models interpret identically-worded prompts differently: one nails the light, another the face, a third the palette. Professionals A/B the same core prompt across 2–3 models (translated to each dialect) and pick per shot — the way a director picks lenses, not religions.',
      'This is cheap for stills and increasingly standard for video. Keep the intent constant, adapt the packaging with the Builder’s dialect toggle, and log which model won which kind of shot in your Practice Log — that record becomes your personal model map.',
    ],
    examples: [],
    relatedIds: ['which-model', 'one-variable', 'iteration'],
    tags: ['workflow', 'strategy'],
  },
  {
    id: 'one-variable',
    module: 'workflow',
    title: 'One variable at a time',
    summary: 'Iteration is an experiment; three simultaneous changes teach you nothing.',
    explanation: [
      'When refining, change exactly one thing per generation: the lighting phrase OR the lens OR the framing. Lock the seed if the tool allows. The comparison then tells you precisely what that token does in that model — knowledge you keep forever.',
      'Winning fragments go into your swipe library (save them from the Builder). Over weeks this compounds into a personal phrasebook that outperforms any generic prompt list — including this app’s.',
    ],
    examples: [],
    relatedIds: ['iteration', 'seeds', 'multi-model'],
    tags: ['workflow'],
  },
  {
    id: 'ad-pipeline',
    module: 'workflow',
    title: 'A realistic ad pipeline',
    summary: 'Define shots → stills → animate the best (i2v) → edit, grade, composite, sound.',
    explanation: [
      'The dependable zero-crew ad pipeline in 2026: (1) Write a 4–6 shot list with one job per shot (hook, product hero, lifestyle, detail, CTA). (2) Generate STILLS for every shot — iterate cheap until each frame is right, with product references locked. (3) Animate the winning stills via i2v, one dominant camera move each. (4) Assemble in the edit: rhythm, grade for consistency across models, composite the real logo, add sound/music.',
      'Notice where the skill lives: steps 1 and 4 are pure filmmaking — shot design and editing. The generators only occupy the middle, which is exactly why cinematography fundamentals plus prompt craft is the complete package.',
    ],
    examples: [],
    relatedIds: ['i2v', 'multi-shot', 'logo-limits'],
    tags: ['workflow', 'ads'],
  },

  // ─────────────────────────── 12 · MODEL LANDSCAPE ───────────────────────────
  {
    id: 'landscape-overview',
    module: 'landscape',
    title: 'Reading the 2026 landscape',
    summary: 'Lanes, dialects, cost tiers — and why every card has a lastUpdated date.',
    explanation: [
      'The model cards below each state a lane (what the tool is actually best at), its preferred prompt dialect, rough clip length/resolution, and a cost tier. Treat lanes as the decision layer: match the shot’s job to a lane, then write in that model’s dialect.',
      'This space changes monthly — hence the lastUpdated stamp on every card. When a card is more than a couple of months old, verify before betting a project on it. (Sora is deliberately absent: discontinued in 2026.) Wan deserves special attention for zero-budget work: open weights, runs locally, commercial-use-friendly.',
    ],
    examples: [],
    relatedIds: ['which-model', 'multi-model'],
    tags: ['landscape', 'reference'],
  },
]

export const LAB_LESSON_BY_ID = new Map(LAB_LESSONS.map((l) => [l.id, l]))
