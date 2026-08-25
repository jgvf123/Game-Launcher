import type { Module, Track } from './schema'

/** The ten tracks of the Frame School v2 curriculum, in teaching order. */
export const TRACKS: Track[] = [
  { id: 'story', letter: 'A', title: 'Story & Thinking', tagline: 'Why anyone watches: premise, character, tension, and the shapes a story takes.', order: 1 },
  { id: 'script', letter: 'B', title: 'Script & Blueprint', tagline: 'Turning an idea into a document a crew — or a model — can execute.', order: 2 },
  { id: 'camera', letter: 'C', title: 'Camera & Lens', tagline: 'Exposure, glass, framing and movement — how the camera makes meaning.', order: 3 },
  { id: 'light', letter: 'D', title: 'Light & Mood', tagline: 'Direction, quality and ratio: the fastest route to how a frame feels.', order: 4 },
  { id: 'color', letter: 'E', title: 'Color', tagline: 'Palette as narrative, and the pipeline that gets it to the screen intact.', order: 5 },
  { id: 'editing', letter: 'F', title: 'Editing & Rhythm', tagline: 'Continuity, cut types and pace — where the film is actually built.', order: 6 },
  { id: 'sound', letter: 'G', title: 'Sound', tagline: 'The half of "cinematic" that nobody looks at and everybody hears.', order: 7 },
  { id: 'production', letter: 'H', title: 'How Production Works', tagline: 'Brief to delivery: the professional flow, the paperwork, the vocabulary.', order: 8 },
  { id: 'ai', letter: 'I', title: 'AI Filmmaking', tagline: 'Directing a diffusion model: prompting, consistency, motion, and repair.', order: 9 },
  { id: 'money', letter: 'J', title: 'Turning This Into Money', tagline: 'Positioning, pricing, pitching and proof — the business around the craft.', order: 10 },
]

export const TRACK_BY_ID = new Map(TRACKS.map((t) => [t.id, t]))

/**
 * Every module in the curriculum. `plannedLessons` is the target count; the
 * lessons that are actually written live in `./lessons`. A module with no
 * written lessons renders as an empty shelf with its real target — never as
 * a stub lesson with three bullet points.
 */
export const MODULES: Module[] = [
  // ─────────────────────────── A · STORY & THINKING ───────────────────────────
  { id: 'story-foundations', trackId: 'story', title: 'Foundations', tagline: 'Premise, theme, and the controlling idea that every choice answers to.', order: 1, plannedLessons: 3 },
  { id: 'story-character', trackId: 'story', title: 'Character', tagline: 'Want vs need, the flaw, the arc, and what is actually at stake.', order: 2, plannedLessons: 4 },
  { id: 'story-tension', trackId: 'story', title: 'Tension', tagline: 'Conflict, dramatic irony, setup and payoff — the engine of attention.', order: 3, plannedLessons: 3 },
  { id: 'story-scene', trackId: 'story', title: 'The Scene', tagline: 'Objective, obstacle, turn, value shift: a scene as a working unit.', order: 4, plannedLessons: 2 },
  { id: 'story-structures', trackId: 'story', title: 'Structures', tagline: 'Three-act, eight-sequence, Save the Cat, and Kishotenketsu.', order: 5, plannedLessons: 5 },
  { id: 'story-packaging', trackId: 'story', title: 'Packaging the Idea', tagline: 'Logline, treatment and one-pager — how an idea travels to a client.', order: 6, plannedLessons: 3 },
  { id: 'story-shortform', trackId: 'story', title: 'Short-Form Story', tagline: 'The 30-second arc, the 15-second UGC arc, hooks and retention.', order: 7, plannedLessons: 4 },
  { id: 'story-adcraft', trackId: 'story', title: 'Ad Craft', tagline: 'Problem-agitate-solve, the single-minded proposition, the hero moment.', order: 8, plannedLessons: 4 },

  // ─────────────────────────── B · SCRIPT & BLUEPRINT ───────────────────────────
  { id: 'script-format', trackId: 'script', title: 'Screenplay Format', tagline: 'Slugline, action, dialogue, parenthetical, transition — and why format is speed.', order: 1, plannedLessons: 3 },
  { id: 'script-visual', trackId: 'script', title: 'Writing Visually', tagline: 'Show, do not tell: writing what the camera can actually record.', order: 2, plannedLessons: 2 },
  { id: 'script-av', trackId: 'script', title: 'The AV Script', tagline: 'Two-column audio/video and the shooting script — the real working formats.', order: 3, plannedLessons: 2 },
  { id: 'script-vo', trackId: 'script', title: 'Voiceover', tagline: 'Writing VO, and the words-per-second maths that makes it fit the cut.', order: 4, plannedLessons: 2 },
  { id: 'script-lock', trackId: 'script', title: 'Beat Sheet & Lock', tagline: 'Beat sheets, script lock, and why breaking lock costs money.', order: 5, plannedLessons: 2 },

  // ─────────────────────────── C · CAMERA & LENS ───────────────────────────
  { id: 'lens-and-perspective', trackId: 'camera', title: 'Lens & Perspective', tagline: 'Focal length, compression, distortion, format — how glass shapes space.', order: 1, plannedLessons: 6 },
  { id: 'exposure', trackId: 'camera', title: 'Exposure', tagline: 'Aperture, shutter, ISO, ND, stops and latitude — the triangle, properly.', order: 2, plannedLessons: 6 },
  { id: 'shutter-and-motion', trackId: 'camera', title: 'Shutter & Motion Blur', tagline: 'Shutter angle and the 180 rule — the biggest tell in fake footage.', order: 3, plannedLessons: 3 },
  { id: 'depth-of-field', trackId: 'camera', title: 'Depth of Field', tagline: 'f-stop vs T-stop, hyperfocal, bokeh, and focus as an editorial choice.', order: 4, plannedLessons: 4 },
  { id: 'lens-character', trackId: 'camera', title: 'Lens Character', tagline: 'Anamorphic, flares, breathing, aberration — why imperfection reads as real.', order: 5, plannedLessons: 5 },
  { id: 'shot-sizes', trackId: 'camera', title: 'Shot Sizes', tagline: 'ECU to ELS, and the emotional job each size is doing.', order: 6, plannedLessons: 3 },
  { id: 'camera-angles', trackId: 'camera', title: 'Angles', tagline: 'Eye level, high, low, overhead, Dutch, OTS, POV — where power sits.', order: 7, plannedLessons: 3 },
  { id: 'composition', trackId: 'camera', title: 'Composition', tagline: 'Thirds, headroom, lead room, layering, negative space, depth cues.', order: 8, plannedLessons: 5 },
  { id: 'movement', trackId: 'camera', title: 'Movement', tagline: 'Every move, what it says, and why an unmotivated move is noise.', order: 9, plannedLessons: 6 },
  { id: 'time-and-cadence', trackId: 'camera', title: 'Time & Cadence', tagline: 'Frame rates, slow motion, overcranking, time-lapse, judder.', order: 10, plannedLessons: 3 },
  { id: 'blocking', trackId: 'camera', title: 'Blocking & Staging', tagline: 'Where actors and camera go, and what changes when either moves.', order: 11, plannedLessons: 2 },

  // ─────────────────────────── D · LIGHT & MOOD ───────────────────────────
  { id: 'light-quality', trackId: 'light', title: 'Quality of Light', tagline: 'Hard vs soft, and the source-size rule that actually explains it.', order: 1, plannedLessons: 4 },
  { id: 'light-direction', trackId: 'light', title: 'Direction of Light', tagline: 'Key, fill, back, kicker, background, eye light — and three-point as grammar.', order: 2, plannedLessons: 4 },
  { id: 'light-ratio', trackId: 'light', title: 'Ratio & Contrast', tagline: 'Lighting ratios, high key and low key, and reading contrast by eye.', order: 3, plannedLessons: 3 },
  { id: 'color-temperature', trackId: 'light', title: 'Color Temperature', tagline: 'Kelvin, white balance, mixed sources, CTO and CTB.', order: 4, plannedLessons: 3 },
  { id: 'natural-light', trackId: 'light', title: 'Natural Light', tagline: 'Golden hour, blue hour, overcast, and why top-noon is ugly.', order: 5, plannedLessons: 3 },
  { id: 'shaping-tools', trackId: 'light', title: 'Shaping Tools', tagline: 'Bounce, negative fill, flags, cutters, and day-for-night.', order: 6, plannedLessons: 3 },
  { id: 'product-lighting', trackId: 'light', title: 'Product Lighting', tagline: 'Specular vs diffuse, gradients on curves — the reflection is the shape.', order: 7, plannedLessons: 3 },
  { id: 'atmosphere', trackId: 'light', title: 'Atmosphere', tagline: 'Haze, volumetrics, god rays, backlit particles, rain, practical bokeh.', order: 8, plannedLessons: 2 },

  // ─────────────────────────── E · COLOR ───────────────────────────
  { id: 'color-theory', trackId: 'color', title: 'Color Theory', tagline: 'Hue, saturation, value, and the harmonies that hold a frame together.', order: 1, plannedLessons: 4 },
  { id: 'color-narrative', trackId: 'color', title: 'Color as Narrative', tagline: 'Palettes that shift with the story, and building a color script.', order: 2, plannedLessons: 3 },
  { id: 'color-pipeline', trackId: 'color', title: 'The Pipeline', tagline: 'Raw, log, LUT, Rec.709, ACES, gamut, dynamic range, banding.', order: 3, plannedLessons: 4 },
  { id: 'grading-craft', trackId: 'color', title: 'Grading Craft', tagline: 'Primaries, secondaries, curves, lift/gamma/gain, qualifiers, power windows.', order: 4, plannedLessons: 5 },
  { id: 'scopes', trackId: 'color', title: 'Reading Scopes', tagline: 'Waveform, vectorscope, parade, false color, and the skin tone line.', order: 5, plannedLessons: 3 },
  { id: 'shot-matching', trackId: 'color', title: 'Matching Shots', tagline: 'Making thirty mismatched shots feel like one film.', order: 6, plannedLessons: 2 },

  // ─────────────────────────── F · EDITING & RHYTHM ───────────────────────────
  { id: 'continuity', trackId: 'editing', title: 'Continuity', tagline: '180 rule, eyeline match, screen direction, the 30 degree rule.', order: 1, plannedLessons: 4 },
  { id: 'cut-types', trackId: 'editing', title: 'Cut Types', tagline: 'Hard, match, J and L, cutaway, insert, jump, cross-cut, montage.', order: 2, plannedLessons: 4 },
  { id: 'rhythm', trackId: 'editing', title: 'Pacing & Rhythm', tagline: 'Cutting to music, cutting on action, and controlling felt time.', order: 3, plannedLessons: 3 },
  { id: 'coverage', trackId: 'editing', title: 'Coverage', tagline: 'Shot-reverse-shot, and how to fake coverage you never shot.', order: 4, plannedLessons: 3 },
  { id: 'shortform-retention', trackId: 'editing', title: 'Short-Form Retention', tagline: 'The one-second hook, pattern interrupts, loop endings.', order: 5, plannedLessons: 3 },
  { id: 'edit-workflow', trackId: 'editing', title: 'Assembly to Lock', tagline: 'Assembly, rough cut, fine cut, picture lock — and transitions.', order: 6, plannedLessons: 2 },

  // ─────────────────────────── G · SOUND ───────────────────────────
  { id: 'sound-layers', trackId: 'sound', title: 'The Five Layers', tagline: 'Dialogue, ambience, foley, SFX, music — and why sound carries the feeling.', order: 1, plannedLessons: 3 },
  { id: 'sound-mixing', trackId: 'sound', title: 'Mixing Basics', tagline: 'Levels, LUFS for delivery, ducking, EQ, reverb as space.', order: 2, plannedLessons: 4 },
  { id: 'sound-sync', trackId: 'sound', title: 'Sync & Hit Points', tagline: 'Locking picture to sound, and cutting to a hit.', order: 3, plannedLessons: 2 },
  { id: 'music', trackId: 'sound', title: 'Music', tagline: 'Choosing it, licensing it, and using silence as a tool.', order: 4, plannedLessons: 2 },
  { id: 'ai-voice', trackId: 'sound', title: 'Directing an AI Voice', tagline: 'Pacing, emphasis, breath, and re-directing a bad read.', order: 5, plannedLessons: 2 },

  // ─────────────────────────── H · HOW PRODUCTION WORKS ───────────────────────────
  { id: 'development', trackId: 'production', title: 'Development', tagline: 'The client brief, concept, treatment, moodboard, lookbook, pitch deck.', order: 1, plannedLessons: 4 },
  { id: 'pre-production', trackId: 'production', title: 'Pre-Production', tagline: 'Storyboard, animatic, shot list, floor plan, breakdown, schedule, recce.', order: 2, plannedLessons: 5 },
  { id: 'production-floor', trackId: 'production', title: 'On The Floor', tagline: 'Call sheets, crew roles, slate, takes, coverage, continuity.', order: 3, plannedLessons: 4 },
  { id: 'post-pipeline', trackId: 'production', title: 'Post Pipeline', tagline: 'Offline, lock, conform, online, VFX, DI, mix, QC, deliverables.', order: 4, plannedLessons: 4 },
  { id: 'client-reality', trackId: 'production', title: 'Client Reality', tagline: 'Estimates, approvals, feedback rounds, revision limits, scope creep.', order: 5, plannedLessons: 3 },
  { id: 'post-vocabulary', trackId: 'production', title: 'Vocabulary Drill', tagline: 'EDL, XML, AAF, proxy, plate, handles, TC — connecting post to everything before it.', order: 6, plannedLessons: 1 },

  // ─────────────────────────── I · AI FILMMAKING ───────────────────────────
  { id: 'ai-machine', trackId: 'ai', title: 'What The Machine Does', tagline: 'Diffusion, latent space, conditioning, seed, CFG, steps, VRAM.', order: 1, plannedLessons: 4 },
  { id: 'ai-image-models', trackId: 'ai', title: 'Image Models', tagline: 'FLUX, SDXL, DALL-E — what each is good and bad at.', order: 2, plannedLessons: 2 },
  { id: 'ai-prompting', trackId: 'ai', title: 'Prompting As Directing', tagline: 'The structured prompt, weighting, order, and why "cinematic" does nothing.', order: 3, plannedLessons: 5 },
  { id: 'ai-consistency', trackId: 'ai', title: 'Consistency', tagline: 'Character bible, seed locking, LoRA, IP-Adapter, ControlNet, continuity.', order: 4, plannedLessons: 6 },
  { id: 'ai-video', trackId: 'ai', title: 'Image To Video', tagline: 'Start/end frames, motion strength, camera prompting, per-model limits.', order: 5, plannedLessons: 5 },
  { id: 'ai-motion-realism', trackId: 'ai', title: 'Minimal Motion', tagline: 'Physics failures, morphing, flicker, drift — and designing shots that dodge them.', order: 6, plannedLessons: 3 },
  { id: 'ai-repair', trackId: 'ai', title: 'Repair & Finish', tagline: 'Cleanup, stabilise, deflicker, regrain, relight, real product over AI plate.', order: 7, plannedLessons: 7 },
  { id: 'ai-hybrid', trackId: 'ai', title: 'Hybrid Pipeline', tagline: 'What to shoot, what to generate, and when AI is the wrong tool.', order: 8, plannedLessons: 2 },
  { id: 'ai-local-pipeline', trackId: 'ai', title: 'Zero-Budget Local', tagline: 'What 8GB of VRAM can really do: ladders, batching, overnight queues.', order: 9, plannedLessons: 3 },
  { id: 'ai-workflow', trackId: 'ai', title: 'The Pro Workflow', tagline: 'Theme lock to sound, and why every gate is non-negotiable.', order: 10, plannedLessons: 2 },
  { id: 'ai-ethics', trackId: 'ai', title: 'Ethics & Client Safety', tagline: 'Likeness, brand safety, disclosure, and what you must never fake.', order: 11, plannedLessons: 2 },

  // ─────────────────────────── J · MONEY ───────────────────────────
  { id: 'money-positioning', trackId: 'money', title: 'Positioning', tagline: 'Picking a niche narrow enough to be remembered for.', order: 1, plannedLessons: 2 },
  { id: 'money-pricing', trackId: 'money', title: 'Pricing', tagline: 'Per-deliverable, per-second, day rate, retainer — and Indian market reality.', order: 2, plannedLessons: 4 },
  { id: 'money-sales', trackId: 'money', title: 'Getting Work', tagline: 'Spec work, cold outreach, scope, advances, revision clauses, contracts.', order: 3, plannedLessons: 3 },
  { id: 'money-portfolio', trackId: 'money', title: 'Proof', tagline: 'A reel that gets hired, content as a trust engine, the case-study format.', order: 4, plannedLessons: 3 },
]

export const MODULE_BY_ID = new Map(MODULES.map((m) => [m.id, m]))

export function modulesInTrack(trackId: Track['id']): Module[] {
  return MODULES.filter((m) => m.trackId === trackId).sort((a, b) => a.order - b.order)
}
