import type { ModelCard } from './types'

/**
 * 2026 model landscape. This space changes fast — every card carries
 * lastUpdated so facts can be maintained as tools evolve.
 * Sora is excluded: discontinued in 2026.
 */
export const MODEL_CARDS: ModelCard[] = [
  {
    id: 'midjourney',
    name: 'Midjourney v7',
    kind: 'image',
    lane: 'Best-in-class aesthetics and stylization; concept art, mood boards, beauty.',
    dialect:
      'Short high-signal keyword phrases (2–4 words each) + parameters: --ar, --v, --no, --chaos, --stylize, --style raw to tame the “MJ look”. Omni-Reference / style reference for consistency.',
    clipLengthRes: 'Stills up to ~2048px (upscale); no native video lane worth relying on for ads.',
    costTier: '$$',
    lastUpdated: '2026-06',
    note: 'Front-load the subject; every extra vague word dilutes. --style raw + explicit lighting terms fights the over-polished default.',
  },
  {
    id: 'flux',
    name: 'Flux (Pro / Dev)',
    kind: 'image',
    lane: 'Strongest prompt adherence in natural language; text rendering; realistic people.',
    dialect:
      'Conversational full sentences. Describe the scene the way you would brief a photographer. Minimal keyword-stuffing; it actually reads grammar.',
    clipLengthRes: 'Stills; Dev weights run locally for zero-budget pipelines.',
    costTier: '$',
    lastUpdated: '2026-06',
    note: 'Great for consistency through pure prompting — repeat the exact character description verbatim across generations.',
  },
  {
    id: 'sd',
    name: 'Stable Diffusion (SDXL / 3.5)',
    kind: 'image',
    lane: 'The open pipeline: total control via ControlNet, LoRA, IP-Adapter; free and local.',
    dialect:
      'Keywords + (weighted:1.2) emphasis + strong negative prompts + CFG scale. Wording matters less once ControlNet drives composition.',
    clipLengthRes: 'Stills at any res your GPU allows; ecosystem of fine-tunes.',
    costTier: 'free/open',
    lastUpdated: '2026-05',
    note: 'Think pipeline, not prompt: LoRA for the character/brand, ControlNet for pose/depth/edges, IP-Adapter for style transfer.',
  },
  {
    id: 'dalle',
    name: 'DALL·E / GPT-4o images',
    kind: 'image',
    lane: 'Conversational creation and editing; understands long descriptive paragraphs and follow-ups.',
    dialect:
      'Full natural-language paragraphs. Multi-turn editing (“same scene, but make the light warmer”). Exclusions written in plain language, not a negative field.',
    clipLengthRes: 'Stills ~1–2 MP; excellent instruction-following, softer photorealism ceiling.',
    costTier: '$$',
    lastUpdated: '2026-06',
    note: 'Best when you want to iterate by talking. Weaker for gritty photoreal texture — ask explicitly for imperfections.',
  },
  {
    id: 'veo',
    name: 'Google Veo 3.1',
    kind: 'video',
    lane: 'Top prompt adherence + native synced audio (dialogue, SFX, ambience).',
    dialect:
      '5-part, camera FIRST: Cinematography → Subject → Action → Context → Style & Ambiance. Audio cues in prompt. Up to 3 reference images for character consistency; first-and-last-frame control; timestamp prompting ([00:00-00:02] medium shot…) for multi-shot clips.',
    clipLengthRes: '~8s native (extendable), up to 1080p–4K tiers.',
    costTier: '$$$',
    lastUpdated: '2026-06',
    note: 'The only major model where you also write what we HEAR. Give it one dominant camera move and it obeys.',
  },
  {
    id: 'kling',
    name: 'Kling 3.0',
    kind: 'video',
    lane: 'Human motion and character performance; strong physical realism per dollar.',
    dialect:
      'Scene first, camera instruction LAST — it builds the world, then moves through it. Simple explicit motion words (push in, pull back, orbit, pan, tilt). Professional Mode has manual camera sliders (~1–3 for smooth motion). Multi-shot storyboard mode.',
    clipLengthRes: '~5–10s clips, 1080p; elements/reference support.',
    costTier: '$$',
    lastUpdated: '2026-06',
    note: 'Holds faces and body mechanics well. Keep camera language plain — fancy phrasing confuses it.',
  },
  {
    id: 'runway',
    name: 'Runway Gen-4.5',
    kind: 'video',
    lane: 'Reference-driven consistency + editing toolkit; the “finish it here” platform.',
    dialect:
      'Concise scene description + motion brush (paint what moves and its direction) + camera controls. Reference images for character/world consistency. Built for chaining shots and editing.',
    clipLengthRes: '~5–10s clips, 1080p+; strong in-platform editing.',
    costTier: '$$$',
    lastUpdated: '2026-06',
    note: 'When words fail, paint it: the motion brush replaces a paragraph of camera prose.',
  },
  {
    id: 'hailuo',
    name: 'Hailuo / MiniMax',
    kind: 'video',
    lane: 'Expressive human performance and fast iteration at low cost.',
    dialect: 'Plain descriptive sentences; responds well to emotion and action verbs.',
    clipLengthRes: '~6–10s, 1080p.',
    costTier: '$',
    lastUpdated: '2026-05',
    note: 'A strong second opinion for people shots — run the same prompt here and in Kling and compare.',
  },
  {
    id: 'pika',
    name: 'Pika 2.5',
    kind: 'video',
    lane: 'Playful effects, quick social-format clips, ingredient-style scene composition.',
    dialect: 'Short scene sentences + effect keywords; image ingredients for subjects.',
    clipLengthRes: '~3–10s, 1080p.',
    costTier: '$',
    lastUpdated: '2026-04',
    note: 'Fast and cheap for drafts and stylized social content; not the photoreal ad lane.',
  },
  {
    id: 'seedance',
    name: 'Seedance',
    kind: 'video',
    lane: 'Multi-shot generation and product/logo stability — a product-ad specialist.',
    dialect: 'Structured scene descriptions; supports shot lists in one prompt.',
    clipLengthRes: '~5–10s, 1080p, multi-shot in one generation.',
    costTier: '$$',
    lastUpdated: '2026-05',
    note: 'Notably better than average at keeping a product/label stable across cuts — still composite the real logo in post.',
  },
  {
    id: 'wan',
    name: 'Wan (open-source)',
    kind: 'video',
    lane: 'Open weights, runs locally, commercial-use-friendly — the zero-budget video lane.',
    dialect: 'Natural sentences; LoRA/fine-tune ecosystem growing fast.',
    clipLengthRes: '~5s, 720p–1080p depending on GPU.',
    costTier: 'free/open',
    lastUpdated: '2026-06',
    note: 'The important one for no-budget work: your GPU, your rules, no per-clip fees.',
  },
]

export const MODEL_BY_ID = new Map(MODEL_CARDS.map((m) => [m.id, m]))
