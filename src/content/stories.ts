/**
 * Storyboard mode content.
 *
 * One guided story (kind: 'teach') where every choice is explained,
 * then practice stories (kind: 'practice') where the learner directs:
 * for each beat they pick shot / angle / lens / lighting. Every option
 * carries a note — why it works, or why it would hurt the frame.
 * Option cardIds reference the main card library so learners can jump
 * to the full lesson for any technique.
 */

export type Dimension = 'shot' | 'angle' | 'lens' | 'light'

export const DIMENSIONS: Dimension[] = ['shot', 'angle', 'lens', 'light']

export const DIMENSION_LABEL: Record<Dimension, string> = {
  shot: 'Shot size',
  angle: 'Camera angle',
  lens: 'Lens & focus',
  light: 'Lighting',
}

export interface StoryOption {
  cardId: string
  correct?: boolean
  /** Why this works (correct) or why it would hurt the frame (wrong). */
  note: string
}

export interface StoryQuestion {
  dimension: Dimension
  /** Practice: 3 options, exactly one correct. Teach: a single correct option. */
  options: StoryOption[]
}

/** Where the beat sits in the dramatic arc — shown while playing so framing choices connect to story structure. */
export type BeatPhase = 'setup' | 'build' | 'turn' | 'climax' | 'resolution'

export const PHASE_LABEL: Record<BeatPhase, string> = {
  setup: 'Setup',
  build: 'Build',
  turn: 'Turn',
  climax: 'Climax',
  resolution: 'Resolution',
}

export interface StoryBeat {
  id: string
  title: string
  phase: BeatPhase
  script: string
  questions: StoryQuestion[]
}

export interface Story {
  id: string
  title: string
  logline: string
  kind: 'teach' | 'practice'
  beats: StoryBeat[]
}

/** The frame spec a completed beat renders with (its correct choices). */
export function beatFrameSpec(beat: StoryBeat): Record<Dimension, string> {
  const spec = {} as Record<Dimension, string>
  for (const q of beat.questions) {
    const correct = q.options.find((o) => o.correct) ?? q.options[0]
    spec[q.dimension] = correct.cardId
  }
  return spec
}

const q = (
  dimension: Dimension,
  correct: [string, string],
  ...wrong: [string, string][]
): StoryQuestion => ({
  dimension,
  options: [
    { cardId: correct[0], correct: true, note: correct[1] },
    ...wrong.map(([cardId, note]) => ({ cardId, note })),
  ],
})

export const STORIES: Story[] = [
  // ─────────────────────────── TEACH: THE LAST TRAIN ───────────────────────────
  {
    id: 'last-train',
    title: 'The Last Train',
    logline:
      'Maya races to catch the last train and say goodbye to her brother before he leaves. Watch how each frame is chosen — and why.',
    kind: 'teach',
    beats: [
      {
        id: 'lt-1',
        title: 'Where we are',
        phase: 'setup',
        script:
          'Night. An almost-empty railway station under sodium lamps. The last train hisses at platform two. Maya is nowhere yet — the place itself is the first character.',
        questions: [
          q('shot', [
            'extreme-wide',
            'An establishing frame tells the audience where and when in one image — and the empty platforms make the night feel final.',
          ]),
          q('angle', [
            'eye-level',
            'A neutral eye keeps the opening honest. The station simply exists; no editorial spin yet.',
          ]),
          q('lens', [
            'wide-angle-lens',
            'A wide lens swallows the whole architecture and stretches the platforms deep — emptiness in every direction.',
          ]),
          q('light', [
            'practical',
            'Let the sodium lamps and lit train windows do the work: the night stays real, with pools of warmth in the dark.',
          ]),
        ],
      },
      {
        id: 'lt-2',
        title: 'Enter, running',
        phase: 'setup',
        script:
          'Maya bursts through the ticket gate, bag flying, coat half on. We need her whole body — the sprint IS the emotion.',
        questions: [
          q('shot', [
            'full',
            'Head to toe: the run itself is the acting. Crop her legs and you lose the desperation.',
          ]),
          q('angle', [
            'shoulder-level',
            'Just under her eyeline gives her drive a little stature without turning it into a hero pose.',
          ]),
          q('lens', [
            'normal-lens',
            'A normal lens keeps her speed believable — no distortion, just a human being moving fast.',
          ]),
          q('light', [
            'hard-light',
            'Station fluorescents are harsh and unflattering. Panic does not get beauty light.',
          ]),
        ],
      },
      {
        id: 'lt-3',
        title: 'The clock',
        phase: 'build',
        script:
          'Above the platform, the station clock: 11:58. Two minutes. The audience must read it in half a second.',
        questions: [
          q('shot', [
            'insert',
            'An insert is a pointed finger: LOOK at this clock. It plants the deadline in one cut.',
          ]),
          q('angle', [
            'low-angle',
            'Shot from her position looking up, the clock hangs over her — time is literally above her head, in charge.',
          ]),
          q('lens', [
            'shallow-dof',
            'Blur the station away so the dial owns the frame. Nothing competes with 11:58.',
          ]),
          q('light', [
            'hard-light',
            'Crisp hard light keeps the numbers razor sharp. Softness would romance a moment that should cut.',
          ]),
        ],
      },
      {
        id: 'lt-3b',
        title: 'Blocked',
        phase: 'build',
        script:
          'The barrier light flashes red. The guard steps in front of her, shaking his head — the platform is closing. She argues; he doesn’t move.',
        questions: [
          q('shot', [
            'over-the-shoulder',
            'Shot past the guard’s shoulder onto her face: his bulk physically blocks the frame the way he blocks her path — obstacle as composition.',
          ]),
          q('angle', [
            'eye-level',
            'Level framing keeps the confrontation procedural and infuriating — he isn’t a villain, just a wall with a rulebook.',
          ]),
          q('lens', [
            'normal-lens',
            'Plain glass for a plain bureaucratic obstacle. The drama is in the seconds ticking away, not in optics.',
          ]),
          q('light', [
            'hard-light',
            'The same unforgiving station fluorescents — the world is not softening for her.',
          ]),
        ],
      },
      {
        id: 'lt-4',
        title: 'Across the platform',
        phase: 'build',
        script:
          'Through crowd and steam she spots Arjun by the last carriage. We see him the way she sees him: far away, and about to be gone.',
        questions: [
          q('shot', [
            'wide',
            'He stays small in the frame with all that distance around him — the gap between them is the drama.',
          ]),
          q('angle', [
            'pov',
            'Her point of view makes us her: we find him in the crowd with her eyes, at the same instant.',
          ]),
          q('lens', [
            'telephoto-lens',
            'A long lens compresses the crowd into a wall between them — he looks near and impossibly far at once.',
          ]),
          q('light', [
            'silhouette',
            'Against the bright carriage windows he is a dark shape — a person already turning into a memory.',
          ]),
        ],
      },
      {
        id: 'lt-4b',
        title: 'The sprint',
        phase: 'turn',
        script:
          'The whistle blows. She ducks the barrier and runs flat out down the platform, past pillars and trolleys, the train doors beginning to beep.',
        questions: [
          q('shot', [
            'wide',
            'The whole platform in frame turns her sprint into geometry: her small figure versus the visible distance still left to close.',
          ]),
          q('angle', [
            'low-angle',
            'From low, her run gains urgency and force — for this one stretch, the film is fully on her side.',
          ]),
          q('lens', [
            'wide-angle-lens',
            'Wide glass exaggerates speed: pillars whip past enormous in the foreground while the train stays desperately far.',
          ]),
          q('light', [
            'practical',
            'Pools of platform lamplight strobe over her as she runs through them — motion you can feel in the lighting itself.',
          ]),
        ],
      },
      {
        id: 'lt-4c',
        title: 'The doors',
        phase: 'climax',
        script:
          'The doors start to slide shut. Arjun’s hand shoots through the gap and catches hers. For one held breath, the whole film is two hands.',
        questions: [
          q('shot', [
            'extreme-close-up',
            'Two hands gripping through a closing gap — the climax compressed into the smallest possible frame. Nothing else deserves pixels right now.',
          ]),
          q('angle', [
            'high-angle',
            'We look down at the hands exactly as they both do — the angle IS their eyeline at the moment of contact.',
          ]),
          q('lens', [
            'shallow-dof',
            'The platform, the guard, the beeping doors — all melt to blur. The grip is the only sharp thing in the world.',
          ]),
          q('light', [
            'hard-light',
            'The door edge cuts a crisp shadow across their wrists — even the light says this window is closing.',
          ]),
        ],
      },
      {
        id: 'lt-5',
        title: 'Goodbye',
        phase: 'climax',
        script:
          'The doors ease back open for one final moment. Two faces inches apart, one stolen minute, everything unsaid.',
        questions: [
          q('shot', [
            'close-up',
            'This scene lives in the eyes. The close-up removes the world so nothing dilutes the feeling.',
          ]),
          q('angle', [
            'eye-level',
            'Level with both of them: nobody has power here — only feeling.',
          ]),
          q('lens', [
            'shallow-dof',
            'The platform melts to blur. The two of them are the only sharp things left in the world.',
          ]),
          q('light', [
            'soft-light',
            'Soft light wraps their faces gently — the film being kind to them in a hard moment.',
          ]),
        ],
      },
      {
        id: 'lt-6',
        title: 'The platform after',
        phase: 'resolution',
        script:
          'The train pulls away into the dark. Maya stands alone on the emptying platform, small under the great arched roof, watching the tail lights shrink.',
        questions: [
          q('shot', [
            'extreme-wide',
            'A bookend: the film opened on this empty station, and now she is the small figure inside it. Same frame, new meaning — that is what resolutions do.',
          ]),
          q('angle', [
            'high-angle',
            'Looking gently down leaves her small in the architecture — the loss allowed to weigh on the frame.',
          ]),
          q('lens', [
            'wide-angle-lens',
            'The wide lens stretches the platform long and empty around her — all that distance, now on the wrong side of the glass.',
          ]),
          q('light', [
            'silhouette',
            'Against the receding train lights she becomes an outline — the story exhaling into a single dark shape.',
          ]),
        ],
      },
    ],
  },

  // ─────────────────────────── PRACTICE: THE NEW KID ───────────────────────────
  {
    id: 'new-kid',
    title: 'The New Kid',
    logline:
      'A new student’s first recess turns into a standoff with the class bully — and a small act of courage.',
    kind: 'practice',
    beats: [
      {
        id: 'nk-1',
        title: 'An empty yard',
        phase: 'setup',
        script:
          'Recess is ending. The new kid stands alone in a schoolyard that suddenly feels enormous.',
        questions: [
          q(
            'shot',
            ['extreme-wide', 'The empty yard dwarfs him — his isolation IS the shot.'],
            ['close-up', 'His face says nervous, but we lose the huge empty space that is causing it.'],
            ['medium', 'Waist-up feels comfortable and conversational — this moment is neither.'],
          ),
          q(
            'angle',
            ['high-angle', 'Looking down shrinks him inside the yard: small, new, out of place.'],
            ['low-angle', 'An upward angle makes him dominant — the opposite of a lost new kid.'],
            ['dutch-angle', 'A tilted horizon says reality is broken. It is just a lonely recess.'],
          ),
          q(
            'lens',
            ['wide-angle-lens', 'A wide lens stretches the yard away from him in every direction.'],
            ['telephoto-lens', 'Compression would crowd the space together — it should feel too big, not too tight.'],
            ['shallow-dof', 'Blurring the yard hides exactly the thing that intimidates him.'],
          ),
          q(
            'light',
            ['soft-light', 'Flat overcast light keeps it mundane and true — dread doesn’t need drama yet.'],
            ['low-key', 'Deep noir shadow at morning recess promises a horror film we aren’t making.'],
            ['silhouette', 'Reducing him to an outline hides the nervous face we are meeting.'],
          ),
        ],
      },
      {
        id: 'nk-2',
        title: 'The shadow arrives',
        phase: 'build',
        script:
          'The bully plants himself in front of the new kid, close enough to block out the sun.',
        questions: [
          q(
            'shot',
            ['cowboy', 'Mid-thigh up gives him a gunslinger’s swagger — hands loose and ready at his sides.'],
            ['extreme-wide', 'From across the yard the threat evaporates. Menace needs proximity.'],
            ['insert', 'A detail shot of what? The threat is his whole stance.'],
          ),
          q(
            'angle',
            ['low-angle', 'We look up from the kid’s height: the bully towers and owns the frame.'],
            ['high-angle', 'Looking down would shrink the bully — you would defuse your own villain.'],
            ['birds-eye', 'From above they are two dots. The standoff disappears.'],
          ),
          q(
            'lens',
            ['wide-angle-lens', 'Close and wide distorts him slightly larger than life — a playground giant.'],
            ['telephoto-lens', 'A long lens flattens and flatters, and keeps us safely far from someone who should loom.'],
            ['deep-focus', 'Everything sharp spreads attention across the whole yard. Keep it on him.'],
          ),
          q(
            'light',
            ['hard-light', 'Noon sun cutting a crisp black shadow across the kid — hard light is a bully’s light.'],
            ['butterfly', 'Hollywood glamour lighting on a school bully sends a very confused signal.'],
            ['high-key', 'Bright and shadowless reads cheerful sitcom, not threat.'],
          ),
        ],
      },
      {
        id: 'nk-3',
        title: 'Frozen',
        phase: 'build',
        script:
          'A beat on the new kid: wide eyes, dry mouth, the whole yard gone silent around him.',
        questions: [
          q(
            'shot',
            ['close-up', 'Fear lives in the face. The close-up traps us in it with him.'],
            ['wide', 'From this far his fear is a rumor — we need to feel it.'],
            ['two-shot', 'Sharing the frame dilutes it. This beat belongs to him alone.'],
          ),
          q(
            'angle',
            ['high-angle', 'The camera presses down on him — cornered, smaller than his own fear.'],
            ['low-angle', 'Upward angles grant power. He has none right now.'],
            ['worms-eye', 'From the ground he would tower like a monument — the exact wrong message.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'The yard smears to blur — panic narrows the world to a tunnel.'],
            ['deep-focus', 'A sharp background invites the eye to wander during his worst second.'],
            ['wide-angle-lens', 'This close, wide glass warps fear into caricature — we are not mocking him.'],
          ),
          q(
            'light',
            ['hard-light', 'The same cruel noon light: sweat, wide eyes, nowhere to hide.'],
            ['soft-light', 'A gentle wrap comforts the face. The scene is not offering comfort.'],
            ['practical', 'There is no lamp on a playground to motivate it — it would feel staged.'],
          ),
        ],
      },
      {
        id: 'nk-3b',
        title: 'The crowd gathers',
        phase: 'build',
        script:
          'Word travels fast. A ring of kids closes around the two of them, phones already out. Nobody steps in. The circle itself becomes a cage.',
        questions: [
          q(
            'shot',
            ['wide', 'Wide enough to hold the whole ring: the crowd’s circle IS the drama — a cage made of classmates.'],
            ['extreme-wide', 'From across the yard the ring reads, but the two faces inside it vanish.'],
            ['close-up', 'One face can’t show the thing that changed: the audience surrounding him.'],
          ),
          q(
            'angle',
            ['birds-eye', 'Straight down turns the crowd into a closing circle with him trapped at its center — the geometry of no escape.'],
            ['high-angle', 'A raised angle shows the ring too, just with less of that perfect, pitiless pattern.'],
            ['low-angle', 'From below you see legs and sky — the circle disappears.'],
          ),
          q(
            'lens',
            ['deep-focus', 'Every face in the ring stays sharp — each onlooker who does nothing is part of the story.'],
            ['wide-angle-lens', 'Wide glass fits the circle in, but bends the nearest faces toward caricature.'],
            ['shallow-dof', 'Blurring the crowd forgives them. The scene is about their watching.'],
          ),
          q(
            'light',
            ['hard-light', 'The same flat noon cruelty over everyone — no shade to hide in, for anybody.'],
            ['soft-light', 'A gentle wrap softens a scene that should feel exposed.'],
            ['silhouette', 'Turning the crowd to outlines hides the faces whose watching is the point.'],
          ),
        ],
      },
      {
        id: 'nk-4',
        title: 'Standing up',
        phase: 'turn',
        script:
          'The new kid swallows, plants his feet, and looks the bully dead in the eye. The yard holds its breath.',
        questions: [
          q(
            'shot',
            ['full', 'His whole body makes the decision — squared shoulders, planted feet, all of it visible.'],
            ['extreme-close-up', 'One eye can’t show a stance. Courage here is physical.'],
            ['over-the-shoulder', 'Tucking him behind the bully’s shoulder keeps him small — he is done being small.'],
          ),
          q(
            'angle',
            ['low-angle', 'Now HE gets the low angle. The power in the frame changes hands.'],
            ['high-angle', 'Pressing down on him again undoes his moment of courage.'],
            ['pov', 'Through his eyes we would lose the sight of him transforming — we need to SEE him.'],
          ),
          q(
            'lens',
            ['normal-lens', 'A plain human lens for a plainly human act of courage — no tricks.'],
            ['dolly-zoom', 'The vertigo warp screams inner collapse. He is finding his footing, not losing it.'],
            ['telephoto-lens', 'Distance and compression cool the moment. Stay near him.'],
          ),
          q(
            'light',
            ['three-point', 'Balanced, deliberate light with a clean rim — the frame finally treats him as the lead.'],
            ['low-key', 'Swallowing him in shadow reads doom. This is a win.'],
            ['silhouette', 'An anonymous outline erases the face we have learned to root for.'],
          ),
        ],
      },
      {
        id: 'nk-5',
        title: 'Nose to nose',
        phase: 'climax',
        script:
          'The bully leans in until their faces are inches apart. The yard goes completely silent. The new kid does not step back.',
        questions: [
          q(
            'shot',
            ['over-the-shoulder', 'Past the bully’s looming shoulder onto the kid’s held gaze: the threat stays in frame while we live with the one refusing to blink.'],
            ['two-shot', 'Both in profile is a classic standoff — workable, but it watches the duel instead of taking a side.'],
            ['extreme-wide', 'From across the yard the whole confrontation shrinks to gossip.'],
          ),
          q(
            'angle',
            ['eye-level', 'Dead level — because that is the story now: for the first time, they are equals.'],
            ['low-angle', 'Keeping the kid empowered works, but it overstates a fight he hasn’t won yet.'],
            ['high-angle', 'Pressing down on him now contradicts everything he just did.'],
          ),
          q(
            'lens',
            ['telephoto-lens', 'The long lens crushes their faces into one charged space — no air left between them.'],
            ['shallow-dof', 'Melting the crowd also isolates the duel — decent, but it loses the compression that makes it claustrophobic.'],
            ['wide-angle-lens', 'This close, wide glass warps both faces into cartoons.'],
          ),
          q(
            'light',
            ['hard-light', 'Noon light carves both faces sharp — sweat, stakes, and nowhere to hide for either of them.'],
            ['three-point', 'Clean and readable, but polish is the wrong texture for a raw playground standoff.'],
            ['butterfly', 'Glamour light in a staring contest is unintentional comedy.'],
          ),
        ],
      },
      {
        id: 'nk-6',
        title: 'The bell',
        phase: 'resolution',
        script:
          'The bell shrieks. A long second — then the bully scoffs, shoulders past him, and the crowd exhales. The new kid is still standing where he planted his feet.',
        questions: [
          q(
            'shot',
            ['medium', 'Waist-up holds his unclenching fists and his face at once — relief arriving in the body first.'],
            ['full', 'Head to toe works for the planted stance, but the trembling exhale on his face carries the beat.'],
            ['insert', 'A detail of what? The moment is him, whole.'],
          ),
          q(
            'angle',
            ['shoulder-level', 'A whisper below the eyeline: quiet, earned stature — without announcing a victory parade.'],
            ['low-angle', 'The hero angle oversells a win that was really just not-losing.'],
            ['high-angle', 'Pressing him down again throws away the whole arc.'],
          ),
          q(
            'lens',
            ['normal-lens', 'Honest glass for an honest outcome — the drama is over, let the frame relax with him.'],
            ['shallow-dof', 'Softening the emptying yard behind him plays too — a gentler, dreamier read.'],
            ['dolly-zoom', 'A reality-warp on a school bell is absurd.'],
          ),
          q(
            'light',
            ['soft-light', 'The hard noon edge finally softens — when the light relaxes, the audience’s shoulders drop with it.'],
            ['high-key', 'Bright relief works, but full sitcom brightness flattens a beat that earned nuance.'],
            ['low-key', 'Plunging him into shadow reads like the threat is still here. It isn’t.'],
          ),
        ],
      },
      {
        id: 'nk-7',
        title: 'Two chairs at lunch',
        phase: 'resolution',
        script:
          'Cafeteria. He eats alone — until the girl who watched it all slides her tray onto his table and sits down like it’s nothing.',
        questions: [
          q(
            'shot',
            ['two-shot', 'Two people, one frame, a shrinking gap: after a story about isolation, sharing the frame IS the happy ending.'],
            ['over-the-shoulder', 'Past his shoulder onto her arriving works — but it keeps them in confrontation grammar, and this is the opposite.'],
            ['extreme-wide', 'From across the cafeteria, the one table that matters gets lost among fifty.'],
          ),
          q(
            'angle',
            ['eye-level', 'Level and warm: no power, no pity — just two kids at the same table at last.'],
            ['shoulder-level', 'Nearly identical here, and just as friendly.'],
            ['birds-eye', 'An overhead map of a lunch table freezes the warmth out of it.'],
          ),
          q(
            'lens',
            ['normal-lens', 'Natural perspective for the most natural thing that’s happened all day.'],
            ['shallow-dof', 'Melting the cafeteria around their table also plays — a touch more romantic than the scene needs.'],
            ['wide-angle-lens', 'Distorting a gentle moment makes it a joke at their expense.'],
          ),
          q(
            'light',
            ['high-key', 'Bright, open, shadowless — the world is finally safe. Compare it to the flat gray of the opening yard: the arc, told in light.'],
            ['soft-light', 'Gentle window light also lands the warmth — high-key just completes the story’s journey out of shadow more fully.'],
            ['silhouette', 'Anonymous outlines end a story about finally being seen.'],
          ),
        ],
      },
    ],
  },

  // ──────────────────────── PRACTICE: THIRD FLOOR, NO LIGHTS ───────────────────
  {
    id: 'no-lights',
    title: 'Third Floor, No Lights',
    logline:
      'A cat burglar has four minutes inside a collector’s townhouse — and the guard is early.',
    kind: 'practice',
    beats: [
      {
        id: 'nl-1',
        title: 'The house from above',
        phase: 'setup',
        script:
          'Midnight. The townhouse sits on its rich, quiet street as a van rolls slowly to the curb.',
        questions: [
          q(
            'shot',
            ['extreme-wide', 'Target, street, escape routes — the heist map in a single frame.'],
            ['insert', 'Details come later. First the audience needs geography.'],
            ['medium-close-up', 'A face this early answers questions the mystery wants to keep open.'],
          ),
          q(
            'angle',
            ['birds-eye', 'Straight down turns the street into a blueprint and the crew into chess pieces — cold and procedural.'],
            ['worms-eye', 'Monumental awe is for cathedrals. We need scheme, not scale.'],
            ['shoulder-level', 'Warm and human — the wrong temperature for a crime being calculated.'],
          ),
          q(
            'lens',
            ['deep-focus', 'Every plane sharp — van, street, house — so the whole plan is readable at once.'],
            ['shallow-dof', 'Blur hides the layout the audience needs to follow the heist.'],
            ['dolly-zoom', 'A warping background announces panic before anything has gone wrong.'],
          ),
          q(
            'light',
            ['low-key', 'Darkness with a few pools of streetlight — noir’s native climate.'],
            ['high-key', 'A bright cheerful street kills the menace on contact.'],
            ['butterfly', 'Portrait glamour aimed at an empty street makes no sense.'],
          ),
        ],
      },
      {
        id: 'nl-1b',
        title: 'In through the window',
        phase: 'build',
        script:
          'Third floor. The window eases open without a sound and she slips over the sill into the dark study — a shape borrowed from the night outside.',
        questions: [
          q(
            'shot',
            ['full', 'Her whole body folding through the frame — cat-burglar physicality is the show, so keep every limb visible.'],
            ['wide', 'Wider still works and adds the room, but her precise, silent movement starts getting lost in furniture.'],
            ['extreme-close-up', 'A single detail can’t show a climb.'],
          ),
          q(
            'angle',
            ['eye-level', 'We wait inside the dark room as she enters our space — the quiet menace of trespass, felt from the room’s side.'],
            ['low-angle', 'From the floor she gains a cool grandeur — playable, but it glamorizes before she’s earned it.'],
            ['dutch-angle', 'Nothing has gone wrong yet. Spend the tilt now and you’ll have nothing left for when it does.'],
          ),
          q(
            'lens',
            ['wide-angle-lens', 'Wide glass lets the whole dark study loom around her small entering figure — the house is bigger than she is.'],
            ['deep-focus', 'Everything sharp keeps the geography honest too — slightly less oppressive than the wide’s stretch.'],
            ['shallow-dof', 'Blurring the room hides the very space she’ll have to escape from later.'],
          ),
          q(
            'light',
            ['silhouette', 'She enters as a pure black shape against the moonlit window — iconic, anonymous, professional.'],
            ['low-key', 'Deep shadow with slivers of light also fits — it just gives away more of her than the silhouette does.'],
            ['high-key', 'A brightly lit break-in is a contradiction.'],
          ),
        ],
      },
      {
        id: 'nl-2',
        title: 'The safe',
        phase: 'build',
        script:
          'Gloved fingers on the dial. Tumblers. Sweat. The room stays pitch black around a single beam of light.',
        questions: [
          q(
            'shot',
            ['insert', 'The dial is the whole story for these ten seconds — point the audience straight at it.'],
            ['wide', 'From across the room, the tension of each click is lost.'],
            ['two-shot', 'There is one person here, and the second character is a safe.'],
          ),
          q(
            'angle',
            ['pov', 'Through the thief’s eyes: we crack it with her, click by click.'],
            ['birds-eye', 'Overhead abstraction breaks the intimacy of hands-on work.'],
            ['dutch-angle', 'The tilt adds fake unease. The safe is tense enough.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'Focus on the dial’s edge, everything else black or blurred — total tunnel vision.'],
            ['wide-angle-lens', 'A wide view re-admits the room. This scene is about shutting the room out.'],
            ['deep-focus', 'Sharpness everywhere fights the flashlight logic of the space.'],
          ),
          q(
            'light',
            ['practical', 'One flashlight beam motivates every highlight — sourced, real, claustrophobic.'],
            ['three-point', 'Studio-neat lighting in a dark house at midnight rings false.'],
            ['high-key', 'A floodlit burglary is a contradiction in terms.'],
          ),
        ],
      },
      {
        id: 'nl-2b',
        title: 'The prize',
        phase: 'build',
        script:
          'The safe door swings open. Her torch beam climbs a small canvas in a plain frame — the painting the whole city thinks is a myth. Her breath catches.',
        questions: [
          q(
            'shot',
            ['medium', 'Her profile and the revealed canvas share the frame: desire and object in one composition — the want is the shot.'],
            ['insert', 'The painting alone announces the prize, but loses her face falling in love with it.'],
            ['extreme-wide', 'From across the room, the myth is a postage stamp.'],
          ),
          q(
            'angle',
            ['eye-level', 'Level with her reverence — the audience stands beside her at the altar.'],
            ['low-angle', 'Looking up monumentalizes the painting — a defensible flourish, slightly grander than this quiet beat.'],
            ['birds-eye', 'From the ceiling, the discovery becomes a diagram.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'The canvas glows razor sharp while the dark room falls away — for her, nothing else exists now.'],
            ['deep-focus', 'Keeping the room sharp maintains tension, but steals attention from the one thing she’s here for.'],
            ['dolly-zoom', 'The warp is for dread. This is desire.'],
          ),
          q(
            'light',
            ['practical', 'The torch beam is the only honest light in the room — let it paint the prize and nothing else.'],
            ['chiaroscuro', 'Painterly slashes of light and black suit a stolen masterpiece — just slightly more opera than this whisper needs.'],
            ['three-point', 'Studio-neat lighting inside a midnight safe-crack rings false.'],
          ),
        ],
      },
      {
        id: 'nl-3',
        title: 'Footsteps',
        phase: 'turn',
        script:
          'A guard’s flashlight sweeps the hallway. The thief flattens into a doorway, half-lit, holding her breath.',
        questions: [
          q(
            'shot',
            ['medium', 'Waist-up holds her body pressed flat AND the doorway hiding her — the geometry of the hide.'],
            ['extreme-wide', 'Too far to read her held breath.'],
            ['extreme-close-up', 'One eye loses the doorframe that is saving her life.'],
          ),
          q(
            'angle',
            ['dutch-angle', 'The world tips a few degrees — discovery is one sweep of the beam away.'],
            ['eye-level', 'Stable and calm is exactly what this second is not.'],
            ['low-angle', 'Granting her power mid-hide deflates the danger.'],
          ),
          q(
            'lens',
            ['deep-focus', 'She is sharp in the doorway, the guard’s beam sharp down the hall — both sides of the danger in one crisp frame.'],
            ['shallow-dof', 'Blur the guard and you blur the threat.'],
            ['dolly-zoom', 'Save the warp for when she is actually seen.'],
          ),
          q(
            'light',
            ['chiaroscuro', 'Slashes of torchlight against black — she exists only where the beam almost touches her.'],
            ['soft-light', 'Gentle gradation soothes a scene built on a knife edge.'],
            ['high-key', 'If the hall were this bright, she would already be caught.'],
          ),
        ],
      },
      {
        id: 'nl-3b',
        title: 'Seen!',
        phase: 'climax',
        script:
          'The beam swings back — and lands square on her face. A heartbeat of frozen eye contact, then the alarm begins to shriek through the house.',
        questions: [
          q(
            'shot',
            ['close-up', 'Caught: the entire heist collapses into her lit-up face — shock, calculation, and go.'],
            ['medium-close-up', 'Chest-up keeps a hint of her coiled posture — close, just a notch less electric.'],
            ['extreme-wide', 'From down the hall, the most important second of the night is a lighting effect.'],
          ),
          q(
            'angle',
            ['dutch-angle', 'NOW tilt the world — the wrongness you saved through the whole break-in finally detonates.'],
            ['pov', 'The guard’s beam-eye view pins her like an insect — strong too, it just gives the moment to him instead of her.'],
            ['eye-level', 'Level and calm is the one thing this second is not.'],
          ),
          q(
            'lens',
            ['dolly-zoom', 'The corridor stretches sickeningly behind her frozen face — the floor drops out of the plan. This is the once-per-film moment.'],
            ['shallow-dof', 'Her face sharp against a smeared world also reads panic — without breaking reality the way the warp does.'],
            ['deep-focus', 'Crisp calm geometry belongs to the planning scenes. The plan just died.'],
          ),
          q(
            'light',
            ['hard-light', 'The flashlight full in her face — crisp, merciless, interrogation-bright out of pure darkness.'],
            ['chiaroscuro', 'A slash of beam against black is nearly as strong — a touch more painterly than this raw jolt wants.'],
            ['soft-light', 'A gentle wrap would tuck her in. She has just been caught.'],
          ),
        ],
      },
      {
        id: 'nl-4',
        title: 'Over the rooftops',
        phase: 'climax',
        script:
          'Alarm. She is out the window and running the roofline against the moon while sirens wind up below.',
        questions: [
          q(
            'shot',
            ['wide', 'Full figure against the skyline — the escape is choreography and the city is the obstacle.'],
            ['close-up', 'Her face can’t show the rooftop gap she is about to jump.'],
            ['insert', 'A detail shot mid-sprint kills the momentum.'],
          ),
          q(
            'angle',
            ['low-angle', 'From the street looking up she is briefly mythic — the one that got away.'],
            ['high-angle', 'Looking down diminishes her at her most daring.'],
            ['pov', 'Her POV loses the iconic image: the silhouette running the roofline.'],
          ),
          q(
            'lens',
            ['telephoto-lens', 'A long lens stacks chimneys and towers tight behind her — the whole city compressed at her heels.'],
            ['wide-angle-lens', 'Wide glass would shrink her into the skyline instead of pinning her against it.'],
            ['shallow-dof', 'The skyline is half the image. Don’t melt it away.'],
          ),
          q(
            'light',
            ['silhouette', 'A black figure on a moonlit roofline — anonymous, iconic, gone.'],
            ['rembrandt', 'A painterly portrait triangle needs a still face, not a sprint.'],
            ['high-key', 'Bright even light would make the getaway look like noon.'],
          ),
        ],
      },
      {
        id: 'nl-5',
        title: 'Morning news',
        phase: 'resolution',
        script:
          'Dawn café. On the TV, a reporter stands outside the townhouse: “…an impossible theft.” At a corner table, she sips her coffee. A slim tube case leans against her chair.',
        questions: [
          q(
            'shot',
            ['medium', 'Waist-up at her table: calm face, coffee, and the tube case just in frame — the punchline assembled in one quiet composition.'],
            ['wide', 'The whole café with the TV works as a drier gag — the joke plays, from further away.'],
            ['insert', 'The case alone is half a punchline. It needs her unbothered face.'],
          ),
          q(
            'angle',
            ['eye-level', 'Deadpan, civilian, innocent — the angle wears the same poker face she does.'],
            ['shoulder-level', 'Nearly identical and just as innocent.'],
            ['dutch-angle', 'The danger is over. A tilt now would promise a twist that isn’t coming.'],
          ),
          q(
            'lens',
            ['deep-focus', 'The TV report sharp behind her sharp little smile — the joke IS the connection, so both planes must read.'],
            ['normal-lens', 'Honest glass keeps the morning mundane — fine, though the TV gag loses some snap without locked depth.'],
            ['shallow-dof', 'Blurring the newscast deletes the punchline.'],
          ),
          q(
            'light',
            ['soft-light', 'Innocent morning window light — the comedy of perfect normalcy after a night of shadows.'],
            ['high-key', 'Bright and cheerful also sells the “nothing happened here” joke, a touch more sitcom.'],
            ['low-key', 'Noir shadow at breakfast would confess for her.'],
          ),
        ],
      },
    ],
  },

  // ───────────────────────────── PRACTICE: TABLE FOR TWO ───────────────────────
  {
    id: 'table-for-two',
    title: 'Table for Two',
    logline:
      'Two strangers from a dating app meet for coffee. Both nearly bolt. Neither does.',
    kind: 'practice',
    beats: [
      {
        id: 'tt-1',
        title: 'Rehearsing hello',
        phase: 'setup',
        script:
          'In the café window’s reflection, Sam practices a smile that keeps collapsing into panic.',
        questions: [
          q(
            'shot',
            ['medium-close-up', 'Chest-up catches the practiced smile AND the nervous hands fixing the collar.'],
            ['extreme-wide', 'The joke and the jitters both vanish at this distance.'],
            ['insert', 'His coffee cup isn’t the story yet — his face is.'],
          ),
          q(
            'angle',
            ['eye-level', 'We meet him as an equal: awkward, likable, ours.'],
            ['worms-eye', 'Monument framing for a nervous hello is parody.'],
            ['high-angle', 'Pity framing is too cruel this early — we are laughing WITH him.'],
          ),
          q(
            'lens',
            ['normal-lens', 'Honest, unmannered glass for an honest, unglamorous panic.'],
            ['dolly-zoom', 'Save the vertigo warp for catastrophe, not a first date.'],
            ['wide-angle-lens', 'Inches from his face it would balloon his nose — mockery, not warmth.'],
          ),
          q(
            'light',
            ['soft-light', 'Window-diffused daylight is kind to him — the film is on his side.'],
            ['hard-light', 'Interrogation shadows turn the rom-com into a thriller.'],
            ['low-key', 'Noir gloom over a latte misleads the whole genre.'],
          ),
        ],
      },
      {
        id: 'tt-2',
        title: 'She’s here',
        phase: 'setup',
        script:
          'The door chimes. Riley walks in out of the rain, scanning the room for a face she only knows from a photo.',
        questions: [
          q(
            'shot',
            ['full', 'Head to toe through his eyes — the entrance is the event.'],
            ['extreme-close-up', 'Leading with an eyeball is horror language.'],
            ['over-the-shoulder', 'We aren’t behind anyone yet. This is his unguarded first look.'],
          ),
          q(
            'angle',
            ['pov', 'His point of view — the audience gets the door-chime jolt exactly when he does.'],
            ['birds-eye', 'Overhead turns a heart-skip into surveillance footage.'],
            ['dutch-angle', 'Nothing is wrong here. The tilt would lie.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'The café crowd melts; she is the only sharp thing in the room — exactly how it feels.'],
            ['deep-focus', 'Every patron in focus democratizes a frame that should have one subject.'],
            ['wide-angle-lens', 'The whole café in view dilutes the jolt of her.'],
          ),
          q(
            'light',
            ['butterfly', 'A frontal glamour key: for one beat, she gets the classic Hollywood entrance.'],
            ['silhouette', 'A dark shape in the doorway reads mystery-thriller, not butterflies.'],
            ['hard-light', 'Harsh edges fight the soft-focus swoon of the moment.'],
          ),
        ],
      },
      {
        id: 'tt-2b',
        title: 'The spill',
        phase: 'build',
        script:
          'Two minutes in, he gestures too hard and knocks his cup. Coffee races across the table toward her phone; both dive for napkins; hands collide; the ice breaks with the spill.',
        questions: [
          q(
            'shot',
            ['insert', 'The spreading coffee is a comic time-bomb — the insert lets the audience watch it race her phone.'],
            ['medium', 'Both of them flailing works and is warmer — the spill itself just stops being a character.'],
            ['extreme-wide', 'From across the café, the disaster is a napkin ballet nobody can read.'],
          ),
          q(
            'angle',
            ['high-angle', 'Looking down at the tabletop exactly as they do — the audience dives for the napkins with them.'],
            ['birds-eye', 'Straight down turns the table into graphic comedy — works if your film’s style is that deliberate.'],
            ['low-angle', 'From under the table? You’d miss the entire joke.'],
          ),
          q(
            'lens',
            ['normal-lens', 'Plain glass keeps the slapstick honest — the comedy is in the timing, not the optics.'],
            ['shallow-dof', 'Focusing the puddle and blurring the panic is a cute stylized read.'],
            ['dolly-zoom', 'An existential warp over spilled coffee is a parody of itself.'],
          ),
          q(
            'light',
            ['high-key', 'Bright, shadowless café light — nothing is at stake and everything is funny.'],
            ['soft-light', 'Gentle window light keeps it warm too, just a little less peppy.'],
            ['chiaroscuro', 'Operatic shadows would turn a spill into a crime scene.'],
          ),
        ],
      },
      {
        id: 'tt-3',
        title: 'Two coffees later',
        phase: 'build',
        script:
          'Elbows on the table, cups forgotten, the two of them lean over a shared phone screen, laughing.',
        questions: [
          q(
            'shot',
            ['two-shot', 'One frame, two people, a shrinking gap — the relationship IS the composition.'],
            ['close-up', 'Cutting to singles splits a moment that is about togetherness.'],
            ['extreme-wide', 'From across the café they read as furniture.'],
          ),
          q(
            'angle',
            ['eye-level', 'Level and even-handed. No one is winning — that is the point.'],
            ['low-angle', 'Power framing has no business in a moment about equality.'],
            ['high-angle', 'Looking coolly down detaches us just as we should lean in too.'],
          ),
          q(
            'lens',
            ['normal-lens', 'Natural perspective keeps the flirtation believable — we are at the next table.'],
            ['telephoto-lens', 'Long-lens compression makes eavesdroppers of us. Get inside the moment.'],
            ['dolly-zoom', 'A background warp mid-giggle is an earthquake in a teacup.'],
          ),
          q(
            'light',
            ['practical', 'The little table lamp motivates a warm pool of light that is theirs alone.'],
            ['high-key', 'Flat bright light belongs to the office she escaped from.'],
            ['chiaroscuro', 'Caravaggio drama over cappuccinos is operatic overkill.'],
          ),
        ],
      },
      {
        id: 'tt-3b',
        title: 'The ex texts',
        phase: 'turn',
        script:
          'Her phone lights up on the table: “I miss you. Please call.” Her smile flickers for half a second — and he sees it.',
        questions: [
          q(
            'shot',
            ['insert', 'The text must be read by the audience — the insert plants the intruder in five words.'],
            ['extreme-close-up', 'Her eyes changing is powerful — but without the screen, the audience can’t know why.'],
            ['two-shot', 'The cozy pair framing hides the one new thing in the scene.'],
          ),
          q(
            'angle',
            ['pov', 'Her private glance down at the screen — we are inside her secret the instant it arrives.'],
            ['high-angle', 'A neutral look down at the table also reads — it just shares the secret with the room instead of with her.'],
            ['low-angle', 'Looking up at a phone on a table is geometry from nowhere.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'The screen razor-sharp while he blurs beyond it — the past literally pulling focus from the present.'],
            ['normal-lens', 'Honest glass keeps it quiet and real, though the focus metaphor goes unused.'],
            ['deep-focus', 'Him sharp behind the text splits the beat’s single job.'],
          ),
          q(
            'light',
            ['practical', 'The cold screen-glow on her face inside the warm café light — two light sources, two lives, one face.'],
            ['soft-light', 'Staying soft keeps the scene gentle, but loses that eloquent clash of temperatures.'],
            ['hard-light', 'A harsh edge announces melodrama the scene is too quiet for.'],
          ),
        ],
      },
      {
        id: 'tt-3c',
        title: 'The honest thing',
        phase: 'climax',
        script:
          'She turns the phone face-down, takes a breath, and tells him the truth about the last year — the breakup, all of it. He doesn’t look away once.',
        questions: [
          q(
            'shot',
            ['over-the-shoulder', 'Across his shoulder onto her honesty: his presence holds the frame’s edge, quietly keeping her company in it.'],
            ['two-shot', 'Holding both works — it just watches the conversation instead of sitting inside the listening.'],
            ['insert', 'The face-down phone already had its shot. This beat is faces.'],
          ),
          q(
            'angle',
            ['eye-level', 'Perfectly level: confession offered and received between equals.'],
            ['shoulder-level', 'A hair below the eyeline is just as honest here.'],
            ['high-angle', 'Looking down turns her honesty into a weakness. It’s the bravest thing in the film.'],
          ),
          q(
            'lens',
            ['normal-lens', 'Honest story, honest glass — no optical comment, just her voice and his attention.'],
            ['shallow-dof', 'Melting the café keeps the bubble intact — lovely, slightly more swoon than confession.'],
            ['telephoto-lens', 'Long-lens distance makes eavesdroppers of us at the exact moment we’re invited in.'],
          ),
          q(
            'light',
            ['practical', 'Their little table lamp again — the warm pool the whole date has lived in, now holding something heavier.'],
            ['soft-light', 'Soft wrap stays kind to both faces — right mood, slightly less tied to their established world.'],
            ['butterfly', 'Glamour light during vulnerability says the film cares how she looks, not what she’s saying.'],
          ),
        ],
      },
      {
        id: 'tt-4',
        title: 'The pause',
        phase: 'climax',
        script:
          'Walking out under one umbrella, they stop. Rain ticks. Neither says the obvious thing. Their hands hang very close.',
        questions: [
          q(
            'shot',
            ['insert', 'Two hands, almost touching — the insert says everything they won’t.'],
            ['wide', 'The gap between their fingers disappears at street scale.'],
            ['medium', 'Waist-up keeps faces in play, but the scene’s whole voltage is in the hands.'],
          ),
          q(
            'angle',
            ['high-angle', 'We glance down at the hands exactly as they do — the angle IS their eyeline.'],
            ['worms-eye', 'From the pavement the hands would be lost against the sky.'],
            ['dutch-angle', 'Tension, yes — but the wobbly kind, not the romantic kind.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'Rain and street dissolve to bokeh around two sharp hands — the world can wait.'],
            ['deep-focus', 'Sharp traffic behind steals the frame’s one job.'],
            ['wide-angle-lens', 'Distorted giant hands turn tender into cartoonish.'],
          ),
          q(
            'light',
            ['soft-light', 'Overcast rain-light, soft as the moment — no hard edges anywhere.'],
            ['hard-light', 'Crisp noon shadows would contradict the rain and the mood.'],
            ['low-key', 'Darkness implies dread. This is hope with wet shoes.'],
          ),
        ],
      },
      {
        id: 'tt-5',
        title: 'The number 2 bus',
        phase: 'resolution',
        script:
          'Her bus pulls in. From the window seat she wipes the fogged glass and draws a little smiley at him standing in the rain. He laughs. Second date: guaranteed.',
        questions: [
          q(
            'shot',
            ['close-up', 'Her face at the glass, finger finishing the smiley — the promise and the person in one frame.'],
            ['insert', 'Just the smiley on fogged glass is a lovely beat — it only lacks her grin behind it.'],
            ['extreme-wide', 'From down the street, the smiley is a smudge and the ending evaporates.'],
          ),
          q(
            'angle',
            ['pov', 'His view up at her window — a perfect rhyme with her entrance seen through his eyes at the start.'],
            ['eye-level', 'Flat-on at the glass is sweet and simple too — it just leaves the rhyme unplayed.'],
            ['birds-eye', 'From above the bus, the goodbye is roof and rain.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'Rain-bokeh streets melting behind the sharp little smiley — the whole city turns to fairy lights around it.'],
            ['telephoto-lens', 'A long lens from his spot compresses the wet street beautifully too — a close cousin of the same feeling.'],
            ['deep-focus', 'Sharp traffic and timetables around the window bury the smiley.'],
          ),
          q(
            'light',
            ['practical', 'The bus’s warm interior glow against the blue evening — she leaves inside a little lantern of the night.'],
            ['soft-light', 'Soft rain-light works throughout — it just misses that warm-inside/cool-outside farewell contrast.'],
            ['chiaroscuro', 'Dramatic shadow play on a happy goodbye reads like a warning.'],
          ),
        ],
      },
    ],
  },

  // ─────────────────────────────── PRACTICE: THE VERDICT ───────────────────────
  {
    id: 'verdict',
    title: 'The Verdict',
    logline:
      'After three weeks of trial, a young teacher stands to hear the jury decide the rest of her life.',
    kind: 'practice',
    beats: [
      {
        id: 'vd-1',
        title: 'The courtroom',
        phase: 'setup',
        script:
          'Morning. The gallery fills. Dust hangs in hard window beams over the empty defendant’s chair.',
        questions: [
          q(
            'shot',
            ['wide', 'The room’s ritual and geography in one view — the court as a machine, before its human enters.'],
            ['extreme-close-up', 'A detail before geography confuses rather than intrigues.'],
            ['cowboy', 'A swagger framing with no gunslinger — the room is the subject.'],
          ),
          q(
            'angle',
            ['high-angle', 'From the gallery’s height the floor becomes an arena — institutions looking down at people.'],
            ['low-angle', 'Looking up at empty furniture monumentalizes nothing in particular.'],
            ['pov', 'Whose eyes? We haven’t met anyone yet.'],
          ),
          q(
            'lens',
            ['deep-focus', 'Benches, bar and bench all sharp — a space where every layer bears weight.'],
            ['shallow-dof', 'Blurring the room hides the machine we came to fear.'],
            ['dolly-zoom', 'The warp effect is a scream. This scene is a held breath.'],
          ),
          q(
            'light',
            ['hard-light', 'Hard window beams cutting the dust — judgment arrives with sharp edges.'],
            ['butterfly', 'Glamour light flatters an empty room into a postcard.'],
            ['high-key', 'Shadowless brightness drains the gravity out of the morning.'],
          ),
        ],
      },
      {
        id: 'vd-2',
        title: 'The accused',
        phase: 'build',
        script:
          'All rise. Elena stands at the defense table, jaw set, hands flat on the wood, the murmuring crowd at her back.',
        questions: [
          q(
            'shot',
            ['medium-close-up', 'Close enough for the set jaw, wide enough for the hands pressed flat — control barely holding.'],
            ['extreme-wide', 'Her three-week ordeal should not shrink to a speck now.'],
            ['insert', 'Her hands alone lose the face fighting to stay calm.'],
          ),
          q(
            'angle',
            ['eye-level', 'Straight-on and dignified: the film refuses to pre-judge her.'],
            ['high-angle', 'Looking down convicts her before the jury does.'],
            ['worms-eye', 'From the floor she would loom like the villain — the wrong signal entirely.'],
          ),
          q(
            'lens',
            ['telephoto-lens', 'The long lens crushes the murmuring gallery into a wall pressing at her back.'],
            ['wide-angle-lens', 'Wide glass would push the crowd away and release pressure the scene needs.'],
            ['deep-focus', 'A sharp crowd competes with the one face carrying the scene.'],
          ),
          q(
            'light',
            ['rembrandt', 'Half her face in shadow, a triangle of light on her cheek — doubt and dignity in a single setup.'],
            ['high-key', 'Bright and breezy contradicts everything at stake.'],
            ['silhouette', 'Erasing her face — when the entire scene IS her face.'],
          ),
        ],
      },
      {
        id: 'vd-2b',
        title: 'The prosecutor’s last look',
        phase: 'build',
        script:
          'Closing arguments end. Gathering his papers, the prosecutor lifts his eyes and holds Elena’s gaze across the courtroom for one long, unreadable second.',
        questions: [
          q(
            'shot',
            ['over-the-shoulder', 'Past Elena’s shoulder into his stare: the look is aimed at her, and the framing makes us stand in its path.'],
            ['close-up', 'His face alone carries the menace — but unmoored from her, the stare loses its target.'],
            ['extreme-wide', 'At room scale, a look is just two people standing.'],
          ),
          q(
            'angle',
            ['eye-level', 'Dead level: two adversaries, chillingly civil — the law’s politeness stretched over a knife.'],
            ['low-angle', 'Menace from below works, but it crowns him the winner before the jury speaks.'],
            ['worms-eye', 'From the floor of the court, everyone is furniture and flags.'],
          ),
          q(
            'lens',
            ['telephoto-lens', 'The long lens compresses the whole courtroom between them into nothing — the stare crosses the room like a wire pulled tight.'],
            ['shallow-dof', 'Isolating his face in blur is strong too — it just loses that collapsed-distance tension.'],
            ['wide-angle-lens', 'Wide glass pushes them apart and slackens the wire.'],
          ),
          q(
            'light',
            ['hard-light', 'The window beams the morning established — his face crossed by the same hard judgment as the room.'],
            ['rembrandt', 'A half-shadowed portrait suits an unreadable man — a shade more painterly than this procedural beat.'],
            ['butterfly', 'Glamour light on a prosecutor is a category error.'],
          ),
        ],
      },
      {
        id: 'vd-2c',
        title: 'The wait',
        phase: 'build',
        script:
          'The jury is out. A courthouse corridor. Hours pass: Elena motionless on a bench, her lawyer pacing, strangers’ footsteps echoing somewhere out of sight.',
        questions: [
          q(
            'shot',
            ['wide', 'The long empty corridor around her tiny figure — duration itself, made visible as space.'],
            ['full', 'Her whole slumped body on the bench tells the exhaustion — the corridor’s emptiness just tells it bigger.'],
            ['extreme-close-up', 'One trembling eye is drama. The wait is the opposite: numbness.'],
          ),
          q(
            'angle',
            ['high-angle', 'The building looking down on her one more time — she waits at the mercy of the machine.'],
            ['eye-level', 'Sitting with her at bench height is humane and quiet — it simply presses less.'],
            ['dutch-angle', 'Nothing is happening. That is the horror. A tilt would promise action.'],
          ),
          q(
            'lens',
            ['deep-focus', 'Every empty meter of corridor sharp to the far door — the distance the verdict must travel to reach her.'],
            ['wide-angle-lens', 'Stretching the hall also plays — with a touch more distortion than this stillness needs.'],
            ['shallow-dof', 'Blurring the corridor hides the emptiness that IS the scene.'],
          ),
          q(
            'light',
            ['soft-light', 'Flat, toneless institutional light — the morning’s dramatic beams are gone; even the light refuses to take sides now.'],
            ['three-point', 'Neutral studio balance reads similar — just more “lit” than a corridor should feel.'],
            ['chiaroscuro', 'Operatic shadows would make waiting feel like fate. It should feel like a dentist’s office.'],
          ),
        ],
      },
      {
        id: 'vd-3',
        title: 'The foreman',
        phase: 'turn',
        script:
          'A folded slip of paper travels from the foreman’s hand to the clerk. Twelve faces reveal nothing.',
        questions: [
          q(
            'shot',
            ['insert', 'The verdict is physically inside that paper — the insert makes the audience lean toward it.'],
            ['two-shot', 'Foreman-and-clerk as a pair is not the subject. The paper is.'],
            ['extreme-wide', 'The slip vanishes at room scale.'],
          ),
          q(
            'angle',
            ['eye-level', 'Deadpan and procedural — the paper simply passes, and we can do nothing about it.'],
            ['birds-eye', 'An overhead map of a hand-off wastes the claustrophobia.'],
            ['dutch-angle', 'The tilt editorializes. The horror here is how normal it looks.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'Only the slip is sharp; twelve unreadable faces blur behind it.'],
            ['deep-focus', 'Sharp jury faces invite tea-leaf reading. The scene wants blankness.'],
            ['wide-angle-lens', 'Wide glass inches from paper warps it — comic, not agonizing.'],
          ),
          q(
            'light',
            ['three-point', 'Neutral, even, institutional — blank procedure, lit blankly.'],
            ['chiaroscuro', 'Operatic shadow play breaks the deadpan that makes this scene hurt.'],
            ['practical', 'No candlelit verdicts in a modern courtroom.'],
          ),
        ],
      },
      {
        id: 'vd-3b',
        title: 'All rise',
        phase: 'climax',
        script:
          '“Will the defendant please rise.” Elena stands. The clerk unfolds the paper. The room is so quiet the paper’s crease can be heard.',
        questions: [
          q(
            'shot',
            ['medium-close-up', 'The same framing as her first day in court — but now the set jaw is trembling. The callback measures the cost.'],
            ['medium', 'Waist-up holds her white-knuckled hands too — a little wider, a little less intimate with her face.'],
            ['insert', 'The paper had its shot. This second belongs to her.'],
          ),
          q(
            'angle',
            ['eye-level', 'Straight-on to the end — the film has refused to pre-judge her, and refuses now.'],
            ['high-angle', 'The institution pressing down one last time is defensible — it just answers the question the scene must keep open.'],
            ['low-angle', 'Crowning her before the clerk speaks spoils the coin-toss.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'The courtroom dissolves; only she stays sharp — the verdict will land on one face, and it is already alone in focus.'],
            ['telephoto-lens', 'Long-lens compression squeezes the room against her — near-identical pressure, marginally less intimate.'],
            ['deep-focus', 'A room full of sharp faces splits the one moment that must not split.'],
          ),
          q(
            'light',
            ['rembrandt', 'Half her face in shadow, the little triangle holding on — doubt and dignity, at their darkest, one last time.'],
            ['low-key', 'Deep shadow states the dread plainly — with less of that painterly balance still fighting for hope.'],
            ['high-key', 'Bright light now would answer the verdict before the clerk does.'],
          ),
        ],
      },
      {
        id: 'vd-4',
        title: 'Two words',
        phase: 'climax',
        script:
          '“Not guilty.” The room erupts. Elena’s knees give; her lawyer catches her arm; she laughs and sobs at once.',
        questions: [
          q(
            'shot',
            ['close-up', 'Relief this size only reads in a face — stay on her as it floods in.'],
            ['extreme-wide', 'The erupting room drowns the one face we care about.'],
            ['insert', 'Her gripped hand tells less than her eyes right now.'],
          ),
          q(
            'angle',
            ['eye-level', 'Level with her — finally free of every angle of judgment.'],
            ['high-angle', 'The pressing-down frame belongs to the version where she loses.'],
            ['birds-eye', 'A god’s view distances us at the moment of embrace.'],
          ),
          q(
            'lens',
            ['shallow-dof', 'The erupting courtroom melts to blur — for her, the room has ceased to exist.'],
            ['deep-focus', 'A sharp celebrating crowd splits focus at the emotional peak.'],
            ['dolly-zoom', 'The warp is for dread landing, not relief.'],
          ),
          q(
            'light',
            ['high-key', 'Light floods in with the verdict — the visual weight of three weeks lifting.'],
            ['low-key', 'Keeping her in noir shadow contradicts the release.'],
            ['hard-light', 'The cutting window beams belong to the morning’s dread, not to this.'],
          ),
        ],
      },
      {
        id: 'vd-5',
        title: 'The steps',
        phase: 'resolution',
        script:
          'Elena pushes through the doors onto the sunlit courthouse steps and stops. Traffic, pigeons, ordinary noise. She closes her eyes and just breathes.',
        questions: [
          q(
            'shot',
            ['wide', 'Her small figure returned to the big ordinary world — the courthouse behind her, the city ahead, the frame finally open.'],
            ['full', 'Head to toe on the steps reads her whole unburdened posture — slightly tighter on her, slightly less world.'],
            ['insert', 'There is no detail to point at anymore. That is the relief.'],
          ),
          q(
            'angle',
            ['low-angle', 'From the foot of the steps, sky behind her: the building that looked down on her for three weeks finally looks up.'],
            ['eye-level', 'Meeting her level on the steps is quiet and humane — it just leaves the reversal of the opening high angle unplayed.'],
            ['high-angle', 'The institution’s angle. She is done being under it.'],
          ),
          q(
            'lens',
            ['wide-angle-lens', 'Wide glass opens space and sky around her — after weeks of compression, the world gets big again.'],
            ['deep-focus', 'The whole sharp city also says freedom — with a bit less of that sudden openness.'],
            ['telephoto-lens', 'Compression is pressure, and the pressure just ended.'],
          ),
          q(
            'light',
            ['high-key', 'Full, open daylight with barely a shadow — the same light that flooded the verdict, now the weather of her life.'],
            ['soft-light', 'Gentle daylight lands the same peace, one notch dimmer than the story’s final exhale deserves.'],
            ['hard-light', 'The blade-like beams belong to the courtroom. Out here, the light has no edges.'],
          ),
        ],
      },
    ],
  },
]

export const STORY_BY_ID = new Map(STORIES.map((s) => [s.id, s]))
