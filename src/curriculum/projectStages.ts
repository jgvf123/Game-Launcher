/**
 * The nine gates of a project.
 *
 * Deliberately rigid: a stage cannot be closed until its checklist is done,
 * and the next stage stays locked until then. The point is not bookkeeping —
 * it is building the habit of not skipping pre-production, which is the single
 * most expensive habit in this kind of work.
 */
export interface ProjectStage {
  id: string
  title: string
  hinglish: string
  /** What going in unprepared actually costs you later. */
  why: string
  checklist: string[]
}

export const PROJECT_STAGES: ProjectStage[] = [
  {
    id: 'concept',
    title: 'Concept',
    hinglish: 'Idea ek line me. Kise dikhana hai aur kya feel karana hai.',
    why: 'Everything downstream is an argument about this. If it is not written in one sentence, it is not decided, and you will discover that at the grade.',
    checklist: [
      'The idea is written as one sentence a stranger would understand',
      'You can name who this is for and what they should feel',
      'A reference or moodboard exists — at least six images',
      'The deliverable, its length and its aspect ratio are decided',
    ],
  },
  {
    id: 'script',
    title: 'Script',
    hinglish: 'Do-column AV script ya shooting script. Words aur visuals dono.',
    why: 'A script is where an idea gets tested cheaply. Fixing a beat here costs a sentence; fixing it after generation costs a night.',
    checklist: [
      'The full script is written, not just described',
      'Voiceover is timed against words-per-second so it fits the cut',
      'Every line is something a camera can actually record',
      'The script is locked — no more rewrites past this point',
    ],
  },
  {
    id: 'storyboard',
    title: 'Storyboard',
    hinglish: 'Har shot ka rough frame. Sundar hona zaroori nahi, saaf hona zaroori hai.',
    why: 'Boards catch the shots that do not cut together. Stick figures are enough; the value is in discovering the problem before you pay for it.',
    checklist: [
      'Every beat has a frame, however rough',
      'Screen direction and eyelines are consistent across the boards',
      'You have checked the boards cut together in order',
      'Boards are locked',
    ],
  },
  {
    id: 'shot-list',
    title: 'Shot List',
    hinglish: 'Har shot ki technical detail — size, angle, lens, light, duration.',
    why: 'This converts a vague idea into a countable amount of work. Without it you cannot estimate time, and you will always underestimate.',
    checklist: [
      'Every shot has a size, angle, lens and light note',
      'Every shot has a duration, and the total matches the target length',
      'Each shot has a written prompt, not a plan to write one later',
      'You have estimated generation time per shot and totalled it',
    ],
  },
  {
    id: 'generation',
    title: 'Generation',
    hinglish: 'Pehle stills, phir motion. Seed aur character lock karke rakho.',
    why: 'Stills first, always. Animating a shot whose framing you have not approved is the most common way to waste a night of GPU time.',
    checklist: [
      'A character bible or style anchor exists and is being reused',
      'Every shot has an approved still before anything is animated',
      'Seeds and settings are recorded for the keepers',
      'Failed takes are deleted, so the folder holds only candidates',
    ],
  },
  {
    id: 'comp',
    title: 'Comp',
    hinglish: 'Cleanup, stabilise, deflicker, edges. Nuke ka kaam.',
    why: 'This is where your actual professional edge lives. Raw model output is a plate, not a shot.',
    checklist: [
      'Artifacts, morphing and flicker are cleaned or the shot is rejected',
      'Any real footage or product is tracked in with matched lens distortion',
      'Edges hold up at 100% — no haloing, no chewed alpha',
      'Grain is matched across every shot, generated and shot alike',
    ],
  },
  {
    id: 'grade',
    title: 'Grade',
    hinglish: 'Sab shots ek film jaise lagne chahiye, tees alag pictures nahi.',
    why: 'Matching thirty generated shots into one look is the skill that decides whether the piece reads as a film or as a folder of AI images.',
    checklist: [
      'Every shot is matched to one look — check on scopes, not by eye alone',
      'Skin tones sit on the skin tone line',
      'No clipping or banding in the delivered range',
      'You have viewed the whole piece top to bottom in one sitting',
    ],
  },
  {
    id: 'sound',
    title: 'Sound',
    hinglish: 'Dialogue, ambience, foley, SFX, music. Aadha "cinematic" yahin se aata hai.',
    why: 'Sound carries more of the feeling than picture does, and it is the layer AI work most often ships without. Silence is a choice; nothing is not.',
    checklist: [
      'Ambience exists under every shot — no digital silence',
      'Key actions have foley or an effect landing on frame',
      'Music is chosen and legally usable for the intended release',
      'Levels are mixed to the delivery LUFS target',
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery',
    hinglish: 'Sahi format, sahi ratio, sahi jagah. Aur case study likh lo.',
    why: 'The last mile is where reputation is made or lost. A brilliant film delivered in the wrong codec is a brilliant film that got a complaint.',
    checklist: [
      'Exported to the exact spec asked for — codec, resolution, frame rate',
      'Every required aspect version exists, each composed rather than cropped',
      'Watched once, all the way through, on a phone',
      'A case study is written up while the details are fresh',
    ],
  },
]

export const STAGE_BY_ID = new Map(PROJECT_STAGES.map((s) => [s.id, s]))
