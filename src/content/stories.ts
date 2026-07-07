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

export interface StoryBeat {
  id: string
  title: string
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
        id: 'lt-4',
        title: 'Across the platform',
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
        id: 'lt-5',
        title: 'Goodbye',
        script: 'She reaches him. The whistle blows. Two faces, one minute, everything unsaid.',
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
        id: 'nk-4',
        title: 'Standing up',
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
        id: 'nl-2',
        title: 'The safe',
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
        id: 'nl-3',
        title: 'Footsteps',
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
        id: 'nl-4',
        title: 'Over the rooftops',
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
        id: 'tt-3',
        title: 'Two coffees later',
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
        id: 'tt-4',
        title: 'The pause',
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
        id: 'vd-3',
        title: 'The foreman',
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
        id: 'vd-4',
        title: 'Two words',
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
    ],
  },
]

export const STORY_BY_ID = new Map(STORIES.map((s) => [s.id, s]))
