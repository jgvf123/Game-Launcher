import type { LabQuizItem } from './types'

/** Authored quiz items. Each trains the SM-2 state of its lessonId. */
export const LAB_QUIZ_ITEMS: LabQuizItem[] = [
  // ── spot the weak prompt ──
  {
    id: 'qz-spot-1',
    type: 'spot-weak',
    module: 'foundations',
    lessonId: 'specificity',
    question: 'Which prompt will generate the stronger, more controlled image?',
    options: [
      { text: 'a woman in a yellow raincoat at a night bus stop, wet asphalt reflecting a green pharmacy sign', correct: true },
      { text: 'a beautiful sad atmospheric street scene, stunning, emotional, masterpiece' },
    ],
    reason: 'Concrete nouns (raincoat, bus stop, pharmacy sign) pin one image; vibe words average into generic output.',
  },
  {
    id: 'qz-spot-2',
    type: 'spot-weak',
    module: 'cine-vocab',
    lessonId: 'no-cinematic',
    question: 'You want a specific moody diner look. Which prompt gives you more control?',
    options: [
      { text: 'night diner, single practical neon as key light, 35mm, shallow depth of field, muted Kodak-style grade', correct: true },
      { text: 'cinematic moody diner scene, very cinematic lighting, film look' },
    ],
    reason: '“Cinematic” converges on one generic look. Naming the source, lens and grade gives you the controls.',
  },
  {
    id: 'qz-spot-3',
    type: 'spot-weak',
    module: 'video',
    lessonId: 'modifier-rule',
    question: 'Which video prompt will produce cleaner camera motion?',
    options: [
      { text: 'slow orbit around the dancer, medium shot', correct: true },
      { text: 'pan across the room then tilt up while orbiting, zooming and handheld shake' },
    ],
    reason: 'One dominant move per clip. Stacked directives average into swimmy, undecided motion.',
  },
  {
    id: 'qz-spot-4',
    type: 'spot-weak',
    module: 'negatives',
    lessonId: 'ai-look',
    question: 'Which portrait prompt is more likely to avoid the plastic “AI look”?',
    options: [
      { text: 'candid portrait, visible pores and skin texture, natural imperfections, slight film grain --style raw', correct: true },
      { text: 'perfect beautiful flawless portrait, ultra smooth skin, ideal symmetrical face' },
    ],
    reason: 'The AI look IS over-smoothness and perfect symmetry — you counter it by explicitly requesting reality’s flaws.',
  },

  // ── fix this prompt ──
  {
    id: 'qz-fix-1',
    type: 'fix-prompt',
    module: 'foundations',
    lessonId: 'word-order',
    question:
      '“moody atmospheric rainy cyberpunk street with lots of neon and also a detective” keeps producing streets with no readable detective. The best fix?',
    options: [
      { text: 'Move the detective to the front: “a weathered detective in a trench coat, neon cyberpunk street behind him…”', correct: true },
      { text: 'Add “masterpiece, best quality, 8k” at the end' },
      { text: 'Repeat the word detective three times at the end' },
    ],
    reason: 'Early tokens carry more weight — whatever you front-load owns the frame.',
  },
  {
    id: 'qz-fix-2',
    type: 'fix-prompt',
    module: 'artifacts',
    lessonId: 'rigidity',
    question: 'Your product video shows the bottle subtly melting during the orbit. The best prompt-side fix?',
    options: [
      { text: 'Add “the bottle remains rigid and solid, does not deform, keeps its exact shape” and slow the camera move', correct: true },
      { text: 'Add “beautiful bottle, high quality glass”' },
      { text: 'Ask for a faster orbit so the melting is less visible' },
    ],
    reason: 'Explicit rigidity language + slower motion is the standard anti-morph fix; speed multiplies warping.',
  },
  {
    id: 'qz-fix-3',
    type: 'fix-prompt',
    module: 'brand',
    lessonId: 'logo-limits',
    question: 'The generated label text on your client’s jar keeps coming out warped. The professional fix?',
    options: [
      { text: 'Prompt for a blank matte label area and composite the real vector logo in post', correct: true },
      { text: 'Reroll until the text is perfect' },
      { text: 'Write the brand name in all caps in the prompt' },
    ],
    reason: 'Fine text/logo detail still artifacts in 2026 — pros generate a clean plate and composite the real asset.',
  },
  {
    id: 'qz-fix-4',
    type: 'fix-prompt',
    module: 'faces',
    lessonId: 'consistency-ladder',
    question: 'Your recurring character’s face changes in every shot (pure prompting, no references). The strongest available fix?',
    options: [
      { text: 'Train a LoRA on the character, or at minimum lock reference images / i2v from one hero still', correct: true },
      { text: 'Add “same person as before” to each prompt' },
      { text: 'Generate all shots on the same day' },
    ],
    reason: 'The consistency ladder: LoRA > reference images > i2v from a locked still > repeated exact description. “Same as before” means nothing — models have no memory.',
  },

  // ── which model for this job ──
  {
    id: 'qz-model-1',
    type: 'which-model',
    module: 'dialects',
    lessonId: 'which-model',
    question: 'You need a clip where the audience HEARS the dialogue and the rain — generated, not added later. Which model?',
    options: [
      { text: 'Veo', correct: true },
      { text: 'Kling' },
      { text: 'Stable Diffusion' },
    ],
    reason: 'Veo is the major model with native synced audio — write what we hear into the prompt.',
  },
  {
    id: 'qz-model-2',
    type: 'which-model',
    module: 'dialects',
    lessonId: 'which-model',
    question: 'Zero budget, must run locally, commercial use allowed. Which video lane?',
    options: [
      { text: 'Wan (open-source)', correct: true },
      { text: 'Runway Gen-4.5' },
      { text: 'Veo' },
    ],
    reason: 'Wan is open-weights, runs on your GPU, and is commercial-use-friendly — the zero-budget lane.',
  },
  {
    id: 'qz-model-3',
    type: 'which-model',
    module: 'faces',
    lessonId: 'human-models',
    question: 'A clip of a dancer where natural human motion matters most. Best first pick?',
    options: [
      { text: 'Kling (or Hailuo)', correct: true },
      { text: 'Seedance' },
      { text: 'Midjourney' },
    ],
    reason: 'Kling and Hailuo lead on human motion and facial performance; Seedance’s lane is product/multi-shot stability.',
  },
  {
    id: 'qz-model-4',
    type: 'which-model',
    module: 'brand',
    lessonId: 'product-models',
    question: 'A 3-shot ad where the product packaging must stay identical between cuts. Which video model is noted for this?',
    options: [
      { text: 'Seedance', correct: true },
      { text: 'Hailuo' },
      { text: 'Pika' },
    ],
    reason: 'Seedance is the product/multi-shot stability specialist; human-performance models wobble more on rigid products.',
  },
  {
    id: 'qz-model-5',
    type: 'which-model',
    module: 'dialects',
    lessonId: 'flux-dialect',
    question: 'Your prompt has precise spatial layout (“the lamp to the left of the window, behind the chair”). Which image model follows it best?',
    options: [
      { text: 'Flux', correct: true },
      { text: 'Midjourney' },
      { text: 'SDXL with no ControlNet' },
    ],
    reason: 'Flux has the strongest natural-language and spatial adherence; MJ prefers loose keywords and takes liberties.',
  },

  // ── order the slots ──
  {
    id: 'qz-order-1',
    type: 'order-slots',
    module: 'video',
    lessonId: 'video-dialects',
    question: 'For VEO, which ordering is the recommended 5-part structure?',
    options: [
      { text: 'Cinematography → Subject → Action → Context → Style & Ambiance', correct: true },
      { text: 'Subject → Style → Cinematography → Audio → Action' },
      { text: 'Context → Action → Subject → Cinematography → Style' },
    ],
    reason: 'Veo reads the camera FIRST: Cinematography → Subject → Action → Context → Style & Ambiance.',
  },
  {
    id: 'qz-order-2',
    type: 'order-slots',
    module: 'video',
    lessonId: 'video-dialects',
    question: 'For KLING, where does the camera instruction go?',
    options: [
      { text: 'Last — describe the full scene first, then “Camera: slow push in”', correct: true },
      { text: 'First, before the subject' },
      { text: 'It must be split across every sentence' },
    ],
    reason: 'Kling builds the scene, then moves through it — camera goes LAST, in plain words.',
  },
  {
    id: 'qz-order-3',
    type: 'order-slots',
    module: 'foundations',
    lessonId: 'anatomy',
    question: 'The universal 6-part image anatomy, in recommended order:',
    options: [
      { text: 'Subject+detail → style/medium → lighting → composition → mood → technical', correct: true },
      { text: 'Technical → mood → subject → lighting → style → composition' },
      { text: 'Mood → mood → subject → quality tags' },
    ],
    reason: 'Subject first (weight!), then medium, light, framing, mood, and the technical tail.',
  },

  // ── identify the technique ──
  {
    id: 'qz-ident-1',
    type: 'identify-technique',
    module: 'context',
    lessonId: 'i2v',
    question:
      'Prompt: “[hero still attached] She lowers the letter and looks up. Slow push-in. Lighting unchanged.” What technique is this?',
    options: [
      { text: 'Image-to-video from a locked hero still', correct: true },
      { text: 'Timestamp prompting' },
      { text: 'Negative prompting' },
    ],
    reason: 'The still carries look and identity; the prompt only adds motion — the i2v control pattern.',
  },
  {
    id: 'qz-ident-2',
    type: 'identify-technique',
    module: 'video',
    lessonId: 'video-dialects',
    question:
      'Prompt contains: “[00:00-00:02] wide shot… [00:02-00:05] reverse medium shot…”. What technique is this?',
    options: [
      { text: 'Veo timestamp prompting for multi-shot clips', correct: true },
      { text: 'Kling Professional Mode sliders' },
      { text: 'Motion brush' },
    ],
    reason: 'Timestamps assign a framing per time window — Veo cuts internally within one generation.',
  },
  {
    id: 'qz-ident-3',
    type: 'identify-technique',
    module: 'context',
    lessonId: 'control-trio',
    question: 'You feed a pose skeleton that the generation must follow exactly. Which tool is that?',
    options: [
      { text: 'ControlNet', correct: true },
      { text: 'LoRA' },
      { text: 'IP-Adapter' },
    ],
    reason: 'ControlNet pins structure (pose/depth/edges); LoRA bakes identity; IP-Adapter transfers image style.',
  },
  {
    id: 'qz-ident-4',
    type: 'identify-technique',
    module: 'context',
    lessonId: 'reference-types',
    question: 'You attach a reference image so the model copies its palette and lighting but NOT its content. That is a…',
    options: [
      { text: 'Style reference', correct: true },
      { text: 'Subject reference' },
      { text: 'Seed' },
    ],
    reason: 'Style reference = copy the aesthetic; subject reference = include this exact thing. Confusing them ruins both.',
  },
  {
    id: 'qz-ident-5',
    type: 'identify-technique',
    module: 'workflow',
    lessonId: 'seeds',
    question: 'You lock a number so the same prompt reproduces the same composition while you test one wording change. That is…',
    options: [
      { text: 'Fixing the seed', correct: true },
      { text: 'Raising CFG scale' },
      { text: 'Using --chaos' },
    ],
    reason: 'Same seed + same settings = same starting noise — the scientific control for one-variable iteration.',
  },

  // ── scenario → best tokens ──
  {
    id: 'qz-scen-1',
    type: 'scenario',
    module: 'cine-vocab',
    lessonId: 'grade-mood',
    question: 'The villain must look dominant and threatening in a still. Which token set serves that?',
    options: [
      { text: 'low angle shot looking up, hard single-source light, deep shadows, 35mm', correct: true },
      { text: 'high angle, soft window light, pastel palette, 85mm beauty' },
      { text: 'bird’s-eye view, high-key even light, minimal shadows' },
    ],
    reason: 'Low angle grants power; hard low-key light adds menace — the same grammar as the cinematography modules.',
  },
  {
    id: 'qz-scen-2',
    type: 'scenario',
    module: 'cine-vocab',
    lessonId: 'lens-language',
    question: 'Two exes see each other across a crowded platform — near yet unreachable. Which lens token?',
    options: [
      { text: 'telephoto compression stacking the crowd between them', correct: true },
      { text: '16mm ultra-wide with barrel distortion' },
      { text: 'deep focus, everything sharp' },
    ],
    reason: 'The long lens crushes the crowd into a wall between them — compression is the heartbreak.',
  },
  {
    id: 'qz-scen-3',
    type: 'scenario',
    module: 'video',
    lessonId: 'camera-emotions',
    question: 'A quiet confession must build pressure across one 8-second clip. Which camera token?',
    options: [
      { text: 'slow push-in from medium to close-up', correct: true },
      { text: 'whip pan between the two faces' },
      { text: 'fast orbit with handheld shake' },
    ],
    reason: 'The slow push-in is invisible rising tension; whips and orbits inject energy a confession doesn’t want.',
  },
  {
    id: 'qz-scen-4',
    type: 'scenario',
    module: 'workflow',
    lessonId: 'ad-pipeline',
    question: 'You must deliver a 25s product ad solo, zero shoot budget. The professional pipeline?',
    options: [
      { text: 'Shot list → generate stills → animate the best via i2v → edit, grade, composite real logo, sound', correct: true },
      { text: 'Generate one 25-second clip from a single long prompt' },
      { text: 'Generate 50 random clips and keep the good parts' },
    ],
    reason: 'Stills are cheap to iterate; i2v carries their control into motion; the edit is where the ad becomes an ad.',
  },
  {
    id: 'qz-scen-5',
    type: 'scenario',
    module: 'negatives',
    lessonId: 'negatives-by-model',
    question: 'In Midjourney, the reliable way to exclude hats from your portrait is…',
    options: [
      { text: 'append --no hat', correct: true },
      { text: 'write “NOT wearing a hat” mid-prompt' },
      { text: 'put “hat” in parentheses' },
    ],
    reason: 'MJ often IGNORES in-prose negation (and may even add the hat) — exclusions belong in --no.',
  },
]
