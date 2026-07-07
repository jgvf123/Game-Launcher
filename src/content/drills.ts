/**
 * Director's Eye — scenario drills.
 *
 * Each drill is one situation and one decision (usually camera angle or
 * movement). Options are graded: exactly one 'best', sometimes one 'good'
 * (workable, but weaker — the note explains the difference), the rest
 * 'wrong'. Every drill ends with a highlighted principle: the rule of
 * thumb worth remembering.
 */

export type DrillGrade = 'best' | 'good' | 'wrong'

export type DrillMood =
  | 'tense'
  | 'sad'
  | 'happy'
  | 'epic'
  | 'mysterious'
  | 'romantic'
  | 'vulnerable'
  | 'heroic'
  | 'chaotic'
  | 'calm'
  | 'unsettling'

export interface DrillOption {
  cardId: string
  grade: DrillGrade
  note: string
}

export interface Drill {
  id: string
  mood: DrillMood
  /** What is being decided, e.g. "Camera angle". */
  ask: string
  situation: string
  options: DrillOption[]
  principle: { title: string; text: string }
}

export const DRILL_MOODS: DrillMood[] = [
  'tense',
  'sad',
  'happy',
  'epic',
  'mysterious',
  'romantic',
  'vulnerable',
  'heroic',
  'chaotic',
  'calm',
  'unsettling',
]

const best = (cardId: string, note: string): DrillOption => ({ cardId, grade: 'best', note })
const good = (cardId: string, note: string): DrillOption => ({ cardId, grade: 'good', note })
const wrong = (cardId: string, note: string): DrillOption => ({ cardId, grade: 'wrong', note })

export const DRILLS: Drill[] = [
  // ─────────────────────────────── CAMERA ANGLES ───────────────────────────────
  {
    id: 'ang-villain',
    mood: 'tense',
    ask: 'Camera angle',
    situation:
      'The villain circles the hero, who is chained to a chair. For this shot of the villain, he must feel unstoppable — the audience should dread him.',
    options: [
      best('low-angle', 'Looking up at him makes him tower and dominate — dread, delivered by geometry.'),
      good('worms-eye', 'Even more menace from the floor — works, but this extreme can tip into comic-book unless the scene is stylized.'),
      wrong('high-angle', 'Looking down shrinks him. You would be defusing your own villain.'),
      wrong('eye-level', 'Neutral framing makes him an equal. He should not feel like an equal.'),
    ],
    principle: {
      title: 'ANGLE = POWER',
      text: 'The camera below a subject grants power; the camera above takes it away. Decide who owns the scene, then place the camera accordingly.',
    },
  },
  {
    id: 'ang-widow',
    mood: 'sad',
    ask: 'Camera angle',
    situation:
      'The morning after the funeral. The widow sits on the edge of their bed in the empty house, hands folded, not moving.',
    options: [
      best('high-angle', 'Looking gently down makes her small inside the room — grief pressing from above.'),
      good('eye-level', 'An honest, respectful observation — it works, but it carries less of the weight the high angle adds for free.'),
      wrong('low-angle', 'An upward angle gives her monumental power — the opposite of hollowed-out.'),
      wrong('dutch-angle', 'A tilted world signals derangement or threat. This is quiet sorrow, not madness.'),
    ],
    principle: {
      title: 'HEIGHT = WEIGHT',
      text: 'Framing a person from above visually presses down on them. For loss, defeat and loneliness, let the camera look down.',
    },
  },
  {
    id: 'ang-drugged',
    mood: 'chaotic',
    ask: 'Camera angle',
    situation:
      'The hero wakes up drugged in an unfamiliar hotel room. The ceiling fan spins. Nothing feels level, including his mind.',
    options: [
      best('dutch-angle', 'Rolling the horizon makes the room itself feel wrong — the audience is off-balance with him.'),
      good('pov', 'Seeing the smeared room through his eyes also works — slightly less graphic, more subjective.'),
      wrong('eye-level', 'Level and stable is exactly what his head is not.'),
      wrong('birds-eye', 'A detached overhead reads clinical and calm — the wrong nervous system.'),
    ],
    principle: {
      title: 'DUTCH = WRONGNESS',
      text: 'Tilt the horizon only when reality itself is off — intoxication, madness, betrayal. Used casually, it loses all its power.',
    },
  },
  {
    id: 'ang-friends',
    mood: 'happy',
    ask: 'Camera angle',
    situation:
      'Two old friends spot each other at a café after ten years. Hugs, easy laughter, talking over each other.',
    options: [
      best('eye-level', 'Level with both: no judgment, no hierarchy — just two equals, and we are the third chair.'),
      good('shoulder-level', 'A touch under the eyeline is nearly as natural and adds a whisper of warmth — fine here too.'),
      wrong('low-angle', 'Nobody is dominating anyone over coffee. Power framing has no job in this scene.'),
      wrong('high-angle', 'Looking down turns warmth into pity or surveillance.'),
    ],
    principle: {
      title: 'EYE LEVEL = HONESTY',
      text: 'For friendship, comedy and everyday truth, keep the camera at eye height. Neutral is not boring — it is trust.',
    },
  },
  {
    id: 'ang-robot',
    mood: 'epic',
    ask: 'Camera angle',
    situation:
      'First full reveal of the ancient war machine as it rises out of the harbor, taller than the buildings around it.',
    options: [
      best('worms-eye', 'From the pavement looking almost straight up, it becomes architecture — overwhelming, mythic.'),
      good('low-angle', 'A standard low angle also sells power — it just caps the scale lower than the moment deserves.'),
      wrong('eye-level', 'A neutral angle measures it like a news report. Reveals need awe.'),
      wrong('high-angle', 'Looking down on it makes your monster manageable.'),
    ],
    principle: {
      title: 'LOWER CAMERA, BIGGER MYTH',
      text: 'The more the audience has to “look up,” the larger a subject feels. For giants — literal or moral — drop the camera to the floor.',
    },
  },
  {
    id: 'ang-crime-scene',
    mood: 'mysterious',
    ask: 'Camera angle',
    situation:
      'Detectives stand in a wheat field around a body. The evidence is arranged in a circle whose pattern only makes sense from certain views.',
    options: [
      best('birds-eye', 'Straight down reveals the pattern the characters cannot see — the audience becomes the all-knowing eye.'),
      good('high-angle', 'A raised angle hints at the pattern while staying human — workable, but the geometry reads weaker.'),
      wrong('pov', 'A detective’s POV shows exactly what they see — which is precisely not the pattern.'),
      wrong('low-angle', 'Up from the wheat, you would see sky and knees.'),
    ],
    principle: {
      title: 'OVERHEAD = PATTERN & FATE',
      text: 'The bird’s-eye view abstracts people into pieces on a board. Use it when design, fate or system matters more than any one person.',
    },
  },
  {
    id: 'ang-closet',
    mood: 'tense',
    ask: 'Camera angle',
    situation:
      'The babysitter hears slow breathing behind the closet door. Her hand reaches for the handle. The audience should be her.',
    options: [
      best('pov', 'Her point of view puts the audience’s own hand on that handle — dread becomes first-person.'),
      good('dutch-angle', 'The tilt adds unease from outside her — works, but keeps the audience a spectator instead of a participant.'),
      wrong('birds-eye', 'An overhead map of the hallway drains the intimacy that makes this scary.'),
      wrong('low-angle', 'Granting her hero framing calms exactly the nerves you are trying to fray.'),
    ],
    principle: {
      title: 'POV = BECOME THE CHARACTER',
      text: 'When fear (or desire) must be felt and not observed, shoot through the character’s eyes — bracketed by shots of them looking.',
    },
  },
  {
    id: 'ang-lost-child',
    mood: 'vulnerable',
    ask: 'Camera angle',
    situation:
      'A six-year-old has lost her mother’s hand in a packed railway station. Legs and suitcases rush past her on every side.',
    options: [
      best('high-angle', 'Adult height looking down: she is tiny in a forest of strangers — instant vulnerability.'),
      good('birds-eye', 'Straight down shows her stranded in the crowd’s current — striking, but colder and less personal.'),
      wrong('low-angle', 'From her ankles she becomes the powerful one — a lost child should not loom.'),
      wrong('shoulder-level', 'Adult shoulder height frames the crowd comfortably, and loses her entirely.'),
    ],
    principle: {
      title: 'SMALL IN THE FRAME = SMALL IN THE WORLD',
      text: 'Vulnerability is built by making the subject physically small: higher angles, wider frames, bigger surroundings.',
    },
  },
  {
    id: 'ang-firefighter',
    mood: 'heroic',
    ask: 'Camera angle',
    situation:
      'The firefighter walks out of the smoke carrying the rescued dog, crowd cheering behind the barrier.',
    options: [
      best('low-angle', 'The classic hero frame: we look up, she rises out of the smoke larger than life.'),
      good('eye-level', 'Documentary honesty — believable and humble, but it leaves the goosebumps on the table.'),
      wrong('high-angle', 'Looking down diminishes her at her proudest moment.'),
      wrong('dutch-angle', 'A tilted triumph reads like something is secretly wrong.'),
    ],
    principle: {
      title: 'HEROES RISE ON LOW ANGLES',
      text: 'Save the low angle for the beats where a character earns stature — overuse it and nobody feels special.',
    },
  },
  {
    id: 'ang-dancers',
    mood: 'romantic',
    ask: 'Camera angle',
    situation:
      'The music fades. Two dancers stop, forehead to forehead, breathing hard, eyes closed. Nobody else exists.',
    options: [
      best('eye-level', 'Level with their faces, inside their private world — intimacy without commentary.'),
      good('shoulder-level', 'Slightly below the eyeline is nearly identical here and adds gentle grace — acceptable.'),
      wrong('birds-eye', 'From the ceiling they are choreography, not lovers.'),
      wrong('worms-eye', 'From the floorboards this is a perfume ad, not a breath.'),
    ],
    principle: {
      title: 'INTIMACY STAYS LEVEL',
      text: 'Closeness between equals is shot level and close. Extreme angles editorialize — and intimacy dies when someone comments on it.',
    },
  },
  {
    id: 'ang-power-shift',
    mood: 'tense',
    ask: 'Camera angle',
    situation:
      'For twenty minutes the boss has belittled her from behind his desk. Now the intern stands up, and for the first time, he goes quiet. Frame the intern.',
    options: [
      best('low-angle', 'Give her the angle he owned all scene — the audience feels the power physically change hands.'),
      good('eye-level', 'Letting her rise into a neutral frame also plays — quieter, but it forfeits the visual rhyme with his earlier low angles.'),
      wrong('high-angle', 'Still pressing down on her means nothing changed.'),
      wrong('pov', 'His POV keeps the scene his. The scene just became hers.'),
    ],
    principle: {
      title: 'CHANGE THE ANGLE WHEN POWER CHANGES',
      text: 'Angles are a scoreboard. When the dynamic flips, flip the geometry — the audience reads it before a word is spoken.',
    },
  },
  {
    id: 'ang-van',
    mood: 'unsettling',
    ask: 'Camera angle',
    situation:
      'A jogger ties her shoe on the empty trail. She doesn’t know that from a parked van, someone is filming her.',
    options: [
      best('pov', 'The watcher’s POV through the van glass makes the audience the accomplice — deeply uncomfortable, exactly right.'),
      good('high-angle', 'A raised, distant angle gives a surveillance-camera chill — works, though it loses the “someone specific is watching” intimacy.'),
      wrong('eye-level', 'A neutral trailside frame hides the whole point: she is being watched.'),
      wrong('worms-eye', 'A heroic ground-up angle glorifies a moment that should crawl.'),
    ],
    principle: {
      title: 'THE UNSEEN WATCHER IS A POV',
      text: 'To make an audience feel voyeurism or threat, put them behind the watcher’s eyes — through glass, leaves, or a doorway edge.',
    },
  },

  // ─────────────────────────────── CAMERA MOVEMENT ─────────────────────────────
  {
    id: 'mov-witness',
    mood: 'tense',
    ask: 'Camera movement',
    situation:
      'In the empty courtroom after hours, the witness finally starts telling the truth. One long speech. The pressure should build without a single cut.',
    options: [
      best('dolly', 'A slow push-in tightens the frame around her as the truth gets heavier — pressure the audience feels, not sees.'),
      good('static', 'A locked frame that refuses to blink also works — colder and more austere, but it builds less.'),
      wrong('whip-pan', 'A violent blur mid-confession would shatter the spell.'),
      wrong('crane', 'Rising away signals an ending. Her story is just beginning.'),
    ],
    principle: {
      title: 'PUSH-IN = PRESSURE RISING',
      text: 'A slow dolly toward a face is invisible tension: the world narrows as stakes grow. The slower the push, the harder it lands.',
    },
  },
  {
    id: 'mov-ambush',
    mood: 'chaotic',
    ask: 'Camera movement',
    situation:
      'Night patrol. The first shot cracks out of nowhere and the squad scrambles for cover in the dark, shouting over each other.',
    options: [
      best('handheld', 'Raw shake puts the audience inside the scramble — panic transmitted straight to the body.'),
      good('whip-pan', 'Snapping between soldiers has energy — usable in bursts, but as the whole language it turns chaos into style.'),
      wrong('static', 'A calm tripod watching an ambush feels like security footage.'),
      wrong('steadicam', 'A serene glide through gunfire is elegant — and completely wrong-blooded.'),
    ],
    principle: {
      title: 'SHAKE = PANIC IN THE BODY',
      text: 'Handheld instability is contagious: the audience’s pulse follows the frame. Ration it — constant shake numbs instead of frightens.',
    },
  },
  {
    id: 'mov-finale',
    mood: 'happy',
    ask: 'Camera movement',
    situation:
      'Final scene. The lovers finally embrace in the middle of the festival crowd. The story is over — let it go.',
    options: [
      best('crane', 'Rising up and away turns them from protagonists back into two people among thousands — the classic exhale of an ending.'),
      good('dolly', 'A slow pull-back at ground level also releases the scene — gentler, though it never gains the sky.'),
      wrong('whip-pan', 'A slapstick blur would punch a hole in the goodbye.'),
      wrong('tilt', 'Tilting up to the sky abandons them too early — the crane keeps them in frame as it releases.'),
    ],
    principle: {
      title: 'RISING AWAY = LETTING GO',
      text: 'Endings breathe out. A crane up (or slow pull-back) tells the audience: the story is releasing its grip — you can too.',
    },
  },
  {
    id: 'mov-boxer',
    mood: 'epic',
    ask: 'Camera movement',
    situation:
      'One unbroken take: follow the boxer from the silent locker room, down the tunnel, and up into the roaring arena.',
    options: [
      best('steadicam', 'A floating glide behind him keeps the take unbroken and immersive — momentum you can walk in.'),
      good('handheld', 'Following handheld adds nerves and grit — legitimate, but over minutes the shake exhausts instead of builds.'),
      wrong('static', 'A fixed camera cannot follow him anywhere — the journey IS the shot.'),
      wrong('pan', 'Rotating in place loses him at the first corner.'),
    ],
    principle: {
      title: 'GLIDE = MOMENTUM YOU INHABIT',
      text: 'For long follow-shots, stabilized movement carries the audience like a current. Save shake for when composure should crack.',
    },
  },
  {
    id: 'mov-boots',
    mood: 'mysterious',
    ask: 'Camera movement',
    situation:
      'The stranger walks into the saloon. Start on the mud-caked boots and spurs; end on the eyes under the hat brim.',
    options: [
      best('tilt', 'A slow tilt up the body is the classic vertical reveal — each detail raises the question the face finally answers.'),
      good('crane', 'Physically craning up the body reads similarly — heavier machinery for the same idea, fine if you have it.'),
      wrong('pan', 'Sideways rotation reveals the room, not the man.'),
      wrong('rack-focus', 'A focus shift needs two planes — this is one subject, bottom to top.'),
    ],
    principle: {
      title: 'TILT = VERTICAL REVEAL',
      text: 'Feed information in a deliberate order: the tilt controls what the audience knows and exactly when they know it.',
    },
  },
  {
    id: 'mov-toast',
    mood: 'tense',
    ask: 'Camera movement',
    situation:
      'Mid-wedding-toast, in the same frame: the bride smiling in the foreground — and behind her, out of focus, the ex quietly enters the hall. Reveal him.',
    options: [
      best('rack-focus', 'Rolling focus from her smile to his face connects them in one breath — no cut, maximum dread.'),
      good('pan', 'Panning off her to the door also reveals him — but it abandons her face, and her face is half the story.'),
      wrong('static', 'Holding sharp on her leaves the bomb permanently defused in the blur.'),
      wrong('tilt', 'Up or down finds ceiling and cake — he is behind her, not above her.'),
    ],
    principle: {
      title: 'FOCUS IS A POINTING FINGER',
      text: 'A rack focus redirects the audience’s eye inside the frame — it links two story elements without the interruption of a cut.',
    },
  },
  {
    id: 'mov-breakfast',
    mood: 'calm',
    ask: 'Camera movement',
    situation:
      'Sunday breakfast chaos: kids arguing, toast burning, dad on the phone — all drifting in and out of one kitchen doorframe. Deadpan comedy.',
    options: [
      best('static', 'A locked frame turns the doorway into a stage; the comedy is what wanders in and out of it.'),
      good('pan', 'Gently following the chaos also works — warmer, but it starts choosing the joke for the audience.'),
      wrong('handheld', 'Nervous shake injects anxiety into a scene about cozy disorder.'),
      wrong('dolly-zoom', 'A reality-warp over burnt toast is a category error.'),
    ],
    principle: {
      title: 'THE LOCKED FRAME IS A STAGE',
      text: 'When the camera refuses to react, life inside the frame becomes funnier and truer. Deadpan is a tripod.',
    },
  },
  {
    id: 'mov-bomb',
    mood: 'unsettling',
    ask: 'Camera movement',
    situation:
      'The captain, mid-order, freezes: the bomb isn’t on the enemy ship — it’s on his. The world should visibly buckle around him.',
    options: [
      best('dolly-zoom', 'Dolly in while zooming out: he stays fixed as the corridor stretches behind him — realization as physics.'),
      good('dolly', 'A hard push-in lands the shock too — powerful, but it stays inside normal reality while the dolly-zoom breaks it.'),
      wrong('pan', 'Looking around the room disperses a moment that should implode.'),
      wrong('crane', 'Floating upward releases tension at the exact second it must spike.'),
    ],
    principle: {
      title: 'DOLLY-ZOOM = THE WORLD WARPS',
      text: 'When the ground falls out from under a character, the vertigo effect shows their inner state in the geometry of the shot. Once per film.',
    },
  },

  // ─────────────────────────────── MIXED: SHOT / LENS / LIGHT ──────────────────
  {
    id: 'mix-tell',
    mood: 'tense',
    ask: 'Shot size',
    situation:
      'Final hand of the tournament. The pro’s face is stone — but one bead of sweat slides down his temple as he pushes all-in on a bluff.',
    options: [
      best('extreme-close-up', 'The bead of sweat IS the scene — magnify the tell until the audience can’t miss it.'),
      good('close-up', 'His whole face works and keeps context — but the single drop no longer screams.'),
      wrong('medium', 'From the waist up the tell disappears into posture.'),
      wrong('wide', 'From table distance the drama is a man sitting still.'),
    ],
    principle: {
      title: 'THE CLOSER, THE LOUDER',
      text: 'Shot size is volume. A detail that must roar — a tell, a trigger, a tear — gets the tightest frame you have.',
    },
  },
  {
    id: 'mix-chapel',
    mood: 'mysterious',
    ask: 'Lighting',
    situation:
      'Midnight confession in a chapel lit only by racks of votive candles. It should feel sacred, secret, and real.',
    options: [
      best('practical', 'Let the candles themselves light the faces — flicker, warmth, and total believability.'),
      good('low-key', 'Deep shadow with sculpted pools is the right mood — it just risks feeling staged if no visible source explains it.'),
      wrong('high-key', 'Bright and shadowless turns the chapel into a showroom.'),
      wrong('butterfly', 'Glamour portrait light in a confession reads like a perfume commercial.'),
    ],
    principle: {
      title: 'MOTIVATED LIGHT KEEPS MAGIC HONEST',
      text: 'Style survives when the frame explains itself. Anchor dramatic lighting to a source the audience can see — candle, window, neon.',
    },
  },
  {
    id: 'mix-platform',
    mood: 'sad',
    ask: 'Lens & focus',
    situation:
      'Rush hour. Across the crowded metro platform, two exes see each other for the first time since the breakup. Neither moves. The train is coming.',
    options: [
      best('telephoto-lens', 'The long lens crushes the crowd between them into a wall — so near, so unreachable.'),
      good('shallow-dof', 'Melting the crowd to blur isolates them too — lovely, but it erases the obstacle instead of weaponizing it.'),
      wrong('wide-angle-lens', 'A wide lens stretches the platform and shrinks them both into the architecture.'),
      wrong('deep-focus', 'Every commuter in sharp detail buries the only two faces that matter.'),
    ],
    principle: {
      title: 'TELEPHOTO = NEAR YET UNREACHABLE',
      text: 'Compression stacks space: use a long lens when distance itself is the heartbreak — the world piles up between two people.',
    },
  },
  {
    id: 'mix-tango',
    mood: 'romantic',
    ask: 'Shot size',
    situation:
      'The tango finale. Every step, hook and flick of their footwork is the payoff of the whole film. Show the dance, all of it.',
    options: [
      best('full', 'Head to toe, both dancers, nothing cropped — the choreography is the star and the frame serves it.'),
      good('wide', 'Wider also keeps the bodies whole and adds the hall — acceptable, but the dancers start losing the frame to the venue.'),
      wrong('close-up', 'Faces in ecstasy, feet invisible — you cut the payoff out of its own shot.'),
      wrong('insert', 'One shoe stab is a garnish, not the meal.'),
    ],
    principle: {
      title: 'FULL BODY FOR FULL-BODY ART',
      text: 'Dance, fights, physical comedy: if the body is the performance, frame the whole body — and hold it.',
    },
  },
]

export const DRILL_BY_ID = new Map(DRILLS.map((d) => [d.id, d]))
