import type { CardDef } from './types'

/**
 * The complete Frame School curriculum.
 * Every card: name, one-line definition, 2–4 sentence explanation,
 * mood tags, related cards, a quiz scenario, and a fill-in-the-blank item.
 */
export const CARDS: CardDef[] = [
  // ──────────────────────────────── SHOT SIZES ────────────────────────────────
  {
    id: 'extreme-wide',
    module: 'shot-sizes',
    name: 'Extreme Wide Shot',
    shortDefinition:
      'The environment dominates the frame; the subject is tiny or not visible at all.',
    explanation:
      'An extreme wide shot (also called an extreme long shot) shows a vast slice of the world — a city skyline, a desert, a battlefield. It is most often used as an establishing shot at the start of a scene to tell the audience where and when the action takes place. Because the subject is dwarfed by the environment, it can also express scale, isolation, or insignificance.',
    moodTags: ['epic', 'melancholy', 'calm'],
    relatedCardIds: ['wide', 'birds-eye', 'full'],
    scenario:
      'You open the film on a lone rider dwarfed by an endless desert, so the audience immediately understands the setting and how small the character is within it.',
    blank: {
      sentence:
        'An extreme wide shot placed at the start of a scene to show location and context is called an ____ shot.',
      answer: 'establishing',
      distractors: ['insert', 'reaction', 'master'],
    },
  },
  {
    id: 'wide',
    module: 'shot-sizes',
    name: 'Wide Shot',
    shortDefinition:
      'The full subject is visible head to toe, with the environment still taking up much of the frame.',
    explanation:
      'A wide shot (or long shot) keeps the whole body in frame while giving the surroundings real presence. It lets the audience read body language and spatial relationships — who is near whom, who is moving where. Directors use it to ground action clearly before cutting closer, or to keep an emotional distance from the subject.',
    moodTags: ['calm', 'epic'],
    relatedCardIds: ['extreme-wide', 'full'],
    scenario:
      'Two characters argue across a sparse apartment and you want the audience to feel the physical gap between them while still seeing both fully.',
    blank: {
      sentence:
        'In a wide shot the subject is shown head to toe while the ____ still occupies a large part of the frame.',
      answer: 'environment',
      distractors: ['face', 'foreground prop', 'light source'],
    },
  },
  {
    id: 'full',
    module: 'shot-sizes',
    name: 'Full Shot',
    shortDefinition:
      'The subject fills the frame from head to toe, with little space above or below.',
    explanation:
      'A full shot frames the entire body tightly, so the person — not the place — is the point. It is the classic choice for showcasing costume, physicality, dance, or fight choreography, because every gesture stays visible. It reads as more engaged than a wide shot but still keeps the whole figure in play.',
    moodTags: ['heroic', 'joyful'],
    relatedCardIds: ['wide', 'medium-long', 'cowboy'],
    scenario:
      'A dancer performs a routine and you need every movement of the whole body visible, with the character clearly the star of the frame.',
    blank: {
      sentence:
        'A full shot frames the subject from ____, making the whole body — costume, posture, movement — the focus.',
      answer: 'head to toe',
      distractors: ['the waist up', 'the chest up', 'the knees up'],
    },
  },
  {
    id: 'medium-long',
    module: 'shot-sizes',
    name: 'Medium Long Shot',
    shortDefinition:
      'Frames the subject from roughly the knees up — also called the ¾ shot.',
    explanation:
      'The medium long shot (three-quarter shot) crops around the knees, balancing body language with a first hint of facial expression. It is a workhorse for group scenes and walk-and-talks, where you need gesture and geography but the faces are starting to matter. It bridges the emotional gap between wide coverage and closer, more personal framings.',
    moodTags: ['calm'],
    relatedCardIds: ['full', 'cowboy', 'medium'],
    scenario:
      'Three colleagues walk down a hallway mid-conversation; you want their gestures and relative positions readable while their expressions begin to register.',
    blank: {
      sentence:
        'The medium long shot, which crops the subject at roughly the ____, is also known as the ¾ shot.',
      answer: 'knees',
      distractors: ['ankles', 'waist', 'shoulders'],
    },
  },
  {
    id: 'cowboy',
    module: 'shot-sizes',
    name: 'Cowboy Shot',
    shortDefinition:
      'Frames the subject from mid-thigh up — named for Westerns that kept the gun holster in frame.',
    explanation:
      'The cowboy shot crops at mid-thigh, a framing invented so Western duels could show both the actor’s face and the revolver on the hip. Today it is used whenever something at the hip or in the hands matters — weapons, tools, badges — or simply to give a character a confident, ready-for-action stance. It carries a swagger that a plain medium shot lacks.',
    moodTags: ['heroic', 'tense'],
    relatedCardIds: ['medium-long', 'medium', 'low-angle'],
    scenario:
      'Your gunslinger squares off at high noon and the audience must see both her steely expression and the hand hovering over the holster.',
    blank: {
      sentence:
        'The cowboy shot crops the subject at ____ so that a holstered weapon stays visible in frame.',
      answer: 'mid-thigh',
      distractors: ['the neck', 'the ankles', 'mid-chest'],
    },
  },
  {
    id: 'medium',
    module: 'shot-sizes',
    name: 'Medium Shot',
    shortDefinition:
      'Frames the subject from the waist up — the standard conversational framing.',
    explanation:
      'The medium shot crops at the waist, roughly matching how we see a person we are talking to across a table. It keeps hands and upper-body gesture in play while the face is close enough to carry dialogue. Because it feels so neutral and natural, it is the default coverage for conversation scenes.',
    moodTags: ['calm'],
    relatedCardIds: ['medium-close-up', 'cowboy', 'two-shot'],
    scenario:
      'A detective interviews a witness across a desk and you want natural, neutral coverage that shows expressions and hand gestures without editorializing.',
    blank: {
      sentence:
        'The medium shot frames a subject from the ____ up and is the standard framing for dialogue coverage.',
      answer: 'waist',
      distractors: ['knees', 'chest', 'shoulders'],
    },
  },
  {
    id: 'medium-close-up',
    module: 'shot-sizes',
    name: 'Medium Close-Up',
    shortDefinition:
      'Frames the subject from mid-chest up, tightening attention onto the face.',
    explanation:
      'The medium close-up crops around mid-chest, close enough that expression dominates but with a sliver of posture and setting left for context. It signals that what a character feels is becoming more important than what they do. Editors often step from medium shot to medium close-up as a conversation turns serious.',
    moodTags: ['intimate', 'tense'],
    relatedCardIds: ['medium', 'close-up'],
    scenario:
      'Mid-interrogation the suspect’s answers start to crack, and you cut slightly tighter so the audience watches his face while still sensing the room.',
    blank: {
      sentence:
        'A medium close-up crops the subject at roughly ____, putting emphasis on the face while retaining a hint of context.',
      answer: 'mid-chest',
      distractors: ['the waist', 'the hairline', 'mid-thigh'],
    },
  },
  {
    id: 'close-up',
    module: 'shot-sizes',
    name: 'Close-Up',
    shortDefinition:
      'The face fills the frame, isolating emotion from the surrounding world.',
    explanation:
      'In a close-up the head (and perhaps the shoulders) fills the frame, stripping away the environment so nothing competes with expression. It is cinema’s most direct tool for empathy — the audience reads every flicker in the eyes. Used sparingly it lands like an exclamation mark; overused, it loses its power.',
    moodTags: ['intimate', 'tense', 'romantic'],
    relatedCardIds: ['medium-close-up', 'extreme-close-up'],
    scenario:
      'A character receives devastating news over the phone and the entire scene must live in the tiny shifts of her expression.',
    blank: {
      sentence:
        'A close-up fills the frame with the subject’s ____, removing the environment so emotion carries the shot.',
      answer: 'face',
      distractors: ['hands', 'silhouette', 'full body'],
    },
  },
  {
    id: 'extreme-close-up',
    module: 'shot-sizes',
    name: 'Extreme Close-Up',
    shortDefinition:
      'Frames a single detail — an eye, lips, a trembling hand — larger than life.',
    explanation:
      'The extreme close-up magnifies one small detail until it becomes the whole world of the shot. Because we rarely see anyone this close in real life, it feels heightened, intense, even invasive. It is used for critical story details (a key turning, a bead of sweat) and for peak psychological intensity.',
    moodTags: ['tense', 'unsettling', 'intimate'],
    relatedCardIds: ['close-up', 'insert'],
    scenario:
      'In the final seconds of the standoff you cut to just the hero’s eyes narrowing, stretching the moment to breaking point.',
    blank: {
      sentence:
        'An extreme close-up isolates a single small ____ — like an eye or a trigger finger — and magnifies it to fill the frame.',
      answer: 'detail',
      distractors: ['location', 'group', 'movement'],
    },
  },
  {
    id: 'two-shot',
    module: 'shot-sizes',
    name: 'Two-Shot',
    shortDefinition:
      'A single frame that holds two subjects, defining their relationship visually.',
    explanation:
      'A two-shot places two characters in the same frame, and how they share it is the storytelling: close together reads as intimacy or alliance, far apart as distance or conflict. Keeping both in one shot (instead of cutting between singles) lets the audience watch the relationship in real time. It is fundamental for duos, couples, and negotiations.',
    moodTags: ['romantic', 'intimate'],
    relatedCardIds: ['over-the-shoulder', 'medium'],
    scenario:
      'Two estranged siblings finally sit on the same bench, and you frame them together so the space between their shoulders tells the story.',
    blank: {
      sentence:
        'A two-shot frames ____ subjects together, using the space between them to express their relationship.',
      answer: 'two',
      distractors: ['background', 'moving', 'off-screen'],
    },
  },
  {
    id: 'over-the-shoulder',
    module: 'shot-sizes',
    name: 'Over-the-Shoulder Shot',
    shortDefinition:
      'Frames one character past the shoulder and head of another in the foreground.',
    explanation:
      'The over-the-shoulder shot looks at one character across the blurred shoulder of the character they face. That foreground presence anchors the geography of the conversation and makes the audience feel physically inside it. Alternating OTS shots is the backbone of classic dialogue coverage.',
    moodTags: ['intimate', 'tense'],
    relatedCardIds: ['two-shot', 'pov', 'medium-close-up'],
    scenario:
      'During a tense negotiation you shoot each speaker past the other’s shoulder so the audience always feels the opponent’s looming presence.',
    blank: {
      sentence:
        'In an over-the-shoulder shot, the ____ of the listening character stays in the foreground of the frame, anchoring the conversation’s geography.',
      answer: 'shoulder',
      distractors: ['reflection', 'shadow', 'prop'],
    },
  },
  {
    id: 'insert',
    module: 'shot-sizes',
    name: 'Insert Shot',
    shortDefinition:
      'A close shot of an object or detail cut into a scene to direct attention.',
    explanation:
      'An insert interrupts the main coverage with a close view of a specific object — a note being slipped, a clock, a hand on a doorknob. It tells the audience “this matters,” planting information or building suspense. Because it directs attention so forcefully, an insert is a promise: the detail should pay off.',
    moodTags: ['tense', 'mysterious'],
    relatedCardIds: ['extreme-close-up', 'rack-focus'],
    scenario:
      'While the couple chats at dinner, you cut briefly to the poison vial being tipped into a glass under the table.',
    blank: {
      sentence:
        'An insert shot cuts to a close view of an ____ or detail to signal to the audience that it will matter to the story.',
      answer: 'object',
      distractors: ['extra', 'exit', 'establishing view'],
    },
  },

  // ─────────────────────────────── CAMERA ANGLES ──────────────────────────────
  {
    id: 'eye-level',
    module: 'camera-angles',
    name: 'Eye-Level Angle',
    shortDefinition:
      'The camera sits at the subject’s eye height — neutral, equal, and natural.',
    explanation:
      'An eye-level angle meets the subject as another person would, implying no power difference between viewer and character. It is the invisible default of most dialogue because it does not editorialize. Choosing eye level is itself a statement: this person is our equal, and we judge them on their own terms.',
    moodTags: ['calm'],
    relatedCardIds: ['shoulder-level', 'low-angle', 'high-angle'],
    scenario:
      'You want the audience to meet the protagonist as an equal in her first scene, with no visual hint of judgment or power.',
    blank: {
      sentence:
        'An eye-level angle positions the camera at the subject’s eye height, creating a sense of ____ between viewer and character.',
      answer: 'equality',
      distractors: ['dominance', 'disorientation', 'voyeurism'],
    },
  },
  {
    id: 'low-angle',
    module: 'camera-angles',
    name: 'Low Angle',
    shortDefinition:
      'The camera looks up at the subject, making them appear powerful and dominant.',
    explanation:
      'Shooting from below forces the viewer to look up, and the brain reads that literally: the subject towers, gains authority, and can feel heroic or threatening. Villains loom and heroes rise on low angles alike — the technique grants power without saying whose side it is on. The lower and closer the camera, the more monumental the effect.',
    moodTags: ['heroic', 'tense', 'epic'],
    relatedCardIds: ['high-angle', 'worms-eye', 'cowboy'],
    scenario:
      'The villain steps out of the shadows and you want him to loom over the audience, dominant and threatening.',
    blank: {
      sentence:
        'A low angle looks up at the subject, making them appear ____ and dominant in the frame.',
      answer: 'powerful',
      distractors: ['fragile', 'distant', 'comedic'],
    },
  },
  {
    id: 'high-angle',
    module: 'camera-angles',
    name: 'High Angle',
    shortDefinition:
      'The camera looks down at the subject, making them appear small and vulnerable.',
    explanation:
      'A high angle presses the subject down into the frame, shrinking them within their surroundings. Audiences instinctively read this as weakness, defeat, or vulnerability — the visual opposite of the low angle. It is the go-to framing for a character who is overwhelmed, cornered, or diminished.',
    moodTags: ['vulnerable', 'melancholy'],
    relatedCardIds: ['low-angle', 'birds-eye'],
    scenario:
      'After losing everything, the hero sits alone on the courthouse steps, and you want him to look small and defeated.',
    blank: {
      sentence:
        'A high angle looks down on the subject, making them appear small and ____ within their environment.',
      answer: 'vulnerable',
      distractors: ['heroic', 'graceful', 'wealthy'],
    },
  },
  {
    id: 'birds-eye',
    module: 'camera-angles',
    name: 'Bird’s-Eye View',
    shortDefinition:
      'A directly overhead shot looking straight down on the scene.',
    explanation:
      'The bird’s-eye (overhead) view abstracts people into shapes and patterns on the ground, like pieces on a board. Its detachment can feel god-like or fateful — the audience observes rather than participates. It excels at choreography, crime-scene geography, and moments when characters seem moved by forces larger than themselves.',
    moodTags: ['epic', 'mysterious', 'unsettling'],
    relatedCardIds: ['high-angle', 'crane', 'extreme-wide'],
    scenario:
      'You shoot the heist crew crossing the marble lobby from directly above, turning them into chess pieces moving across a board.',
    blank: {
      sentence:
        'A bird’s-eye view looks straight ____ at the scene, abstracting characters into shapes and patterns.',
      answer: 'down',
      distractors: ['up', 'sideways', 'backward'],
    },
  },
  {
    id: 'worms-eye',
    module: 'camera-angles',
    name: 'Worm’s-Eye View',
    shortDefinition:
      'An extreme low angle from ground level, looking almost straight up.',
    explanation:
      'The worm’s-eye view drops the camera to the ground and points it skyward, so subjects and architecture tower overwhelmingly. It is the low angle pushed to its extreme — awe, menace, or vertigo rather than mere authority. Skyscrapers, cathedrals, and giants are its natural subjects.',
    moodTags: ['epic', 'unsettling'],
    relatedCardIds: ['low-angle', 'birds-eye'],
    scenario:
      'The rookie steps out of the station and you shoot from the pavement straight up at the courthouse columns to make the institution feel crushing.',
    blank: {
      sentence:
        'A worm’s-eye view places the camera at ____ level looking nearly straight up, making subjects tower overwhelmingly.',
      answer: 'ground',
      distractors: ['eye', 'shoulder', 'rooftop'],
    },
  },
  {
    id: 'dutch-angle',
    module: 'camera-angles',
    name: 'Dutch Angle',
    shortDefinition:
      'The camera is tilted off its horizontal axis, throwing the horizon askew.',
    explanation:
      'A Dutch (canted) angle rolls the camera so vertical lines lean, and the world literally goes off-balance. Audiences feel the wrongness before they name it — unease, madness, intoxication, or a reality out of joint. Because it is so loud, it works best at genuine turning points rather than as constant seasoning.',
    moodTags: ['unsettling', 'chaotic', 'tense'],
    relatedCardIds: ['handheld', 'dolly-zoom', 'pov'],
    scenario:
      'As the detective realizes his partner has betrayed him, the room needs to feel suddenly, physically wrong.',
    blank: {
      sentence:
        'A Dutch angle tilts the camera off its ____ axis so the horizon sits askew, signalling unease or disorientation.',
      answer: 'horizontal',
      distractors: ['optical', 'vertical', 'focal'],
    },
  },
  {
    id: 'pov',
    module: 'camera-angles',
    name: 'Point-of-View Shot',
    shortDefinition:
      'The camera shows exactly what a character sees, putting the audience in their eyes.',
    explanation:
      'A POV shot replaces the character’s eyes with the lens, usually sandwiched between shots of the character looking. The audience stops watching the character and briefly becomes them — powerful for suspense, horror, and deep identification. What the POV lingers on tells us what the character notices and cares about.',
    moodTags: ['intimate', 'tense', 'mysterious'],
    relatedCardIds: ['over-the-shoulder', 'eye-level', 'handheld'],
    scenario:
      'The babysitter hears a noise and you want the audience to creep down the dark hallway seeing exactly what she sees.',
    blank: {
      sentence:
        'A point-of-view shot shows the scene through a character’s ____, so the audience experiences the moment as them.',
      answer: 'eyes',
      distractors: ['memories', 'reflection', 'shadow'],
    },
  },
  {
    id: 'shoulder-level',
    module: 'camera-angles',
    name: 'Shoulder-Level Angle',
    shortDefinition:
      'The camera sits at shoulder height, a touch below the eyes — a subtly flattering near-neutral.',
    explanation:
      'Shoulder-level framing sits just below eye line, so the subject gains a whisper of stature without an obvious low-angle statement. Many filmmakers prefer it as their true default because pure eye level can feel flat. It keeps scenes natural while quietly giving characters presence.',
    moodTags: ['calm', 'heroic'],
    relatedCardIds: ['eye-level', 'low-angle'],
    scenario:
      'You are shooting standard dialogue coverage but want the lead to carry just a bit more quiet presence than a flat, neutral angle would give.',
    blank: {
      sentence:
        'A shoulder-level angle places the camera slightly ____ the subject’s eye line, lending subtle stature without an overt power statement.',
      answer: 'below',
      distractors: ['above', 'behind', 'beside'],
    },
  },

  // ───────────────────────────── LENS & FOCAL LENGTH ──────────────────────────
  {
    id: 'wide-angle-lens',
    module: 'lens',
    name: 'Wide-Angle Lens',
    shortDefinition:
      'A short focal length (below ~35mm) that sees a broad view and exaggerates depth.',
    explanation:
      'Wide-angle lenses take in a large field of view and stretch the apparent distance between foreground and background. Objects near the lens balloon larger and straight lines can bow (barrel distortion), which can make faces grotesque or spaces cavernous. Filmmakers use wides for immersive environments, cramped interiors that still read fully, and unsettling, in-your-face character moments.',
    moodTags: ['chaotic', 'epic', 'unsettling'],
    relatedCardIds: ['normal-lens', 'telephoto-lens', 'deep-focus'],
    scenario:
      'You shoot a paranoid character inches from the lens so his face distorts slightly while the whole room looms behind him.',
    blank: {
      sentence:
        'A wide-angle lens exaggerates the sense of ____ between foreground and background, making spaces feel deeper than they are.',
      answer: 'distance',
      distractors: ['color', 'brightness', 'symmetry'],
    },
  },
  {
    id: 'normal-lens',
    module: 'lens',
    name: 'Standard Lens',
    shortDefinition:
      'A focal length (~35–50mm) that renders space roughly as the human eye sees it.',
    explanation:
      'A standard or “normal” lens neither stretches nor compresses space, matching everyday human perspective. Because it adds no optical commentary, it feels honest and unmannered — a favorite of naturalistic filmmakers. When you want the audience to trust the frame as plain reality, this is the glass.',
    moodTags: ['calm'],
    relatedCardIds: ['wide-angle-lens', 'telephoto-lens'],
    scenario:
      'For an intimate realist drama, you want every frame to feel like standing in the room with the family — no optical drama at all.',
    blank: {
      sentence:
        'A standard lens renders perspective approximately as the human ____ sees it, without stretching or compressing space.',
      answer: 'eye',
      distractors: ['memory', 'ear', 'imagination'],
    },
  },
  {
    id: 'telephoto-lens',
    module: 'lens',
    name: 'Telephoto Lens',
    shortDefinition:
      'A long focal length (above ~85mm) that magnifies distant subjects and compresses depth.',
    explanation:
      'Telephoto lenses flatten space: background and foreground stack together, so distant objects appear crushed up against the subject. They also narrow the field of view and thin the depth of field, isolating a subject against a soft, compressed backdrop. The look suggests surveillance, longing across distance, or a world pressing in on a character.',
    moodTags: ['tense', 'mysterious', 'melancholy'],
    relatedCardIds: ['wide-angle-lens', 'shallow-dof', 'dolly-zoom'],
    scenario:
      'From a rooftop, the spy watches her target cross a crowded plaza; the crowd should stack up flat around him as she picks him out.',
    blank: {
      sentence:
        'A telephoto lens ____ space, making background elements appear stacked close behind the subject.',
      answer: 'compresses',
      distractors: ['stretches', 'brightens', 'tilts'],
    },
  },
  {
    id: 'shallow-dof',
    module: 'lens',
    name: 'Shallow Depth of Field',
    shortDefinition:
      'Only a thin plane is in focus; the subject is sharp against a soft, blurred background.',
    explanation:
      'Shallow depth of field — from wide apertures, long lenses, or close focus — melts the background into soft bokeh so nothing competes with the subject. It creates instant intimacy and directs the eye with surgical precision. Emotionally it isolates: the world beyond the character literally dissolves.',
    moodTags: ['intimate', 'romantic', 'melancholy'],
    relatedCardIds: ['deep-focus', 'telephoto-lens', 'rack-focus'],
    scenario:
      'In the crowded café the lovers see only each other, so you let every other patron dissolve into soft blur behind them.',
    blank: {
      sentence:
        'With shallow depth of field, a wide ____ helps blur the background so the sharp subject stands isolated.',
      answer: 'aperture',
      distractors: ['shutter', 'tripod', 'filter'],
    },
  },
  {
    id: 'deep-focus',
    module: 'lens',
    name: 'Deep Focus',
    shortDefinition:
      'Foreground, middle ground, and background are all in sharp focus at once.',
    explanation:
      'Deep focus keeps every plane of the image crisp, letting filmmakers stage meaningful action at several depths simultaneously. The audience’s eye is free to roam, and relationships between near and far elements can carry the storytelling. It demands small apertures, wide lenses, and lots of light — and rewards them with dense, layered frames.',
    moodTags: ['epic', 'calm'],
    relatedCardIds: ['shallow-dof', 'wide-angle-lens'],
    scenario:
      'A child plays in the foreground while, far behind through the window, her parents argue — and both layers must stay sharp so the audience connects them.',
    blank: {
      sentence:
        'Deep focus keeps foreground, middle ground, and ____ all sharp, allowing staging in multiple planes at once.',
      answer: 'background',
      distractors: ['soundtrack', 'sky', 'subtitle'],
    },
  },
  {
    id: 'dolly-zoom',
    module: 'lens',
    name: 'Dolly Zoom',
    shortDefinition:
      'The camera dollies one way while zooming the other, warping the background around a steady subject.',
    explanation:
      'In a dolly zoom (the “Vertigo effect”), the camera physically moves toward or away from the subject while the zoom compensates in the opposite direction. The subject stays the same size but the background stretches or crushes behind them, visualizing dread, realization, or a mind buckling. It is one of cinema’s purest images of internal crisis.',
    moodTags: ['unsettling', 'tense', 'chaotic'],
    relatedCardIds: ['dolly', 'telephoto-lens', 'dutch-angle'],
    scenario:
      'The captain realizes the bomb is on his own ship: he stands frozen while the corridor seems to stretch away behind him.',
    blank: {
      sentence:
        'In a dolly zoom, the camera moves while the lens ____ in the opposite direction, warping the background around a constant-size subject.',
      answer: 'zooms',
      distractors: ['pans', 'flares', 'defocuses'],
    },
  },

  // ─────────────────────────────── CAMERA MOVEMENT ────────────────────────────
  {
    id: 'static',
    module: 'movement',
    name: 'Static Shot',
    shortDefinition:
      'The camera is locked off and does not move; the frame becomes a fixed stage.',
    explanation:
      'A static (locked-off) shot removes all camera motion, turning the frame into a proscenium where only the subjects move. It reads as objective, patient, or deadpan — comedy loves it for letting absurdity play out untouched, and drama uses it to trap characters in an unblinking gaze. What enters, exits, and lingers in the fixed frame becomes the storytelling.',
    moodTags: ['calm', 'mysterious'],
    relatedCardIds: ['pan', 'tracking'],
    scenario:
      'You hold an unmoving frame on the farmhouse kitchen as the family’s chaotic breakfast argument spills in and out of view.',
    blank: {
      sentence:
        'A static shot is filmed from a ____ camera, so all movement in the frame comes from the subjects themselves.',
      answer: 'locked-off',
      distractors: ['handheld', 'crane-mounted', 'zooming'],
    },
  },
  {
    id: 'pan',
    module: 'movement',
    name: 'Pan',
    shortDefinition:
      'The camera rotates horizontally on a fixed pivot, sweeping the view left or right.',
    explanation:
      'A pan turns the camera head side to side without moving its position, like a person turning to look. It follows action across a space, connects two subjects, or slowly reveals what shares the room with the character. The speed of the pan sets the emotion — a lazy survey feels calm, a sudden turn feels alarmed.',
    moodTags: ['calm', 'mysterious'],
    relatedCardIds: ['tilt', 'whip-pan', 'static'],
    scenario:
      'The camera slowly sweeps across the abandoned office, moving off the hero’s face to reveal the figure standing in the doorway.',
    blank: {
      sentence:
        'A pan rotates the camera ____ on a fixed pivot point, sweeping the view across the scene.',
      answer: 'horizontally',
      distractors: ['vertically', 'forward', 'in a circle around the subject'],
    },
  },
  {
    id: 'tilt',
    module: 'movement',
    name: 'Tilt',
    shortDefinition:
      'The camera rotates vertically on a fixed pivot, sweeping the view up or down.',
    explanation:
      'A tilt pivots the camera up or down from a fixed position — the vertical sibling of the pan. Tilting up a building or a towering figure builds scale and awe; tilting down can reveal what lies at someone’s feet. It is a compact way to deliver a reveal along the vertical axis.',
    moodTags: ['epic', 'mysterious'],
    relatedCardIds: ['pan', 'crane', 'worms-eye'],
    scenario:
      'Starting on mud-caked boots, the camera travels up to finally reveal the bounty hunter’s face under the hat brim.',
    blank: {
      sentence:
        'A tilt rotates the camera ____ on a fixed pivot, often used to reveal height or scale.',
      answer: 'vertically',
      distractors: ['horizontally', 'diagonally', 'around its lens axis'],
    },
  },
  {
    id: 'dolly',
    module: 'movement',
    name: 'Dolly',
    shortDefinition:
      'The whole camera moves toward (push in) or away from (pull out) the subject.',
    explanation:
      'A dolly physically carries the camera through space, usually on wheels or track. A slow push-in tightens the frame around a character and cranks up intensity or intimacy; a pull-out withdraws, leaving them small in their world — a classic closing gesture. Unlike a zoom, the perspective genuinely changes, so the move feels like walking closer.',
    moodTags: ['tense', 'intimate', 'melancholy'],
    relatedCardIds: ['dolly-zoom', 'truck', 'tracking'],
    scenario:
      'As the witness finally tells the truth, the camera creeps slowly toward her face, tightening the scene’s grip.',
    blank: {
      sentence:
        'A dolly physically moves the camera ____ or away from the subject, changing true perspective as it travels.',
      answer: 'toward',
      distractors: ['above', 'behind the lights', 'off its tripod'],
    },
  },
  {
    id: 'truck',
    module: 'movement',
    name: 'Truck',
    shortDefinition:
      'The whole camera moves laterally — left or right — parallel to the scene.',
    explanation:
      'Trucking slides the camera sideways through space, often on track, keeping pace with action or gliding past a landscape of details. It differs from a pan because the camera itself travels, so foreground and background shift against each other with real parallax. Trucking along a line of soldiers, market stalls, or diner booths turns geography into rhythm.',
    moodTags: ['calm', 'epic'],
    relatedCardIds: ['dolly', 'tracking', 'pan'],
    scenario:
      'The camera glides sideways along the trench, passing soldier after soldier as dawn light hits their faces one by one.',
    blank: {
      sentence:
        'A truck moves the entire camera ____, traveling parallel to the scene rather than rotating in place.',
      answer: 'sideways',
      distractors: ['upward', 'in a circle', 'toward the subject'],
    },
  },
  {
    id: 'crane',
    module: 'movement',
    name: 'Crane / Jib',
    shortDefinition:
      'The camera sweeps vertically through space on a crane arm, rising above or descending into a scene.',
    explanation:
      'A crane or jib lifts the camera bodily through the air, from ground level to high overhead in one continuous move. Rising up and away turns a personal moment into a statement about the wider world — the classic grand ending. Descending pulls the audience down out of the sky and into the story, a favorite opening gesture.',
    moodTags: ['epic', 'melancholy', 'joyful'],
    relatedCardIds: ['birds-eye', 'tilt', 'truck'],
    scenario:
      'On the final shot, the camera lifts away from the embracing couple until they are a speck in the crowded festival square.',
    blank: {
      sentence:
        'A crane shot sweeps the camera ____ through space on a mechanical arm, often to open or close a scene grandly.',
      answer: 'vertically',
      distractors: ['handheld', 'underwater', 'along rails'],
    },
  },
  {
    id: 'handheld',
    module: 'movement',
    name: 'Handheld',
    shortDefinition:
      'The camera is carried by the operator, keeping a raw, unstable, human shake.',
    explanation:
      'Handheld camera keeps every breath and footstep of the operator in the frame, and audiences read that instability as immediacy: news footage, panic, intimacy without polish. It excels in combat, arguments, and documentary-flavored realism where a smooth machine move would feel dishonest. The shake is a texture — a little suggests nervous energy, a lot suggests chaos.',
    moodTags: ['chaotic', 'tense', 'vulnerable'],
    relatedCardIds: ['steadicam', 'pov', 'whip-pan'],
    scenario:
      'The squad is ambushed at night, and you shoot the scramble for cover with a raw, jolting camera that feels embedded in the panic.',
    blank: {
      sentence:
        'Handheld camera keeps the operator’s natural ____ in the image, which audiences read as immediacy and realism.',
      answer: 'shake',
      distractors: ['shadow', 'breathing sound', 'reflection'],
    },
  },
  {
    id: 'steadicam',
    module: 'movement',
    name: 'Steadicam / Gimbal',
    shortDefinition:
      'A stabilizer lets the camera float smoothly while the operator walks freely.',
    explanation:
      'A Steadicam or gimbal isolates the camera from the operator’s body, producing a gliding, floating move that can go anywhere legs can. It combines the freedom of handheld with the grace of a dolly — perfect for long unbroken takes through corridors, kitchens, and crowds. The dreamlike smoothness can feel elegant or, in horror, eerily inhuman.',
    moodTags: ['calm', 'mysterious', 'epic'],
    relatedCardIds: ['handheld', 'tracking', 'dolly'],
    scenario:
      'In one unbroken take, the camera glides behind the boxer from locker room, down the corridor, and up into the roaring arena.',
    blank: {
      sentence:
        'A Steadicam mechanically ____ the camera from the operator’s body so walking shots glide smoothly.',
      answer: 'isolates',
      distractors: ['detaches the lens', 'amplifies', 'suspends by cable'],
    },
  },
  {
    id: 'tracking',
    module: 'movement',
    name: 'Tracking Shot',
    shortDefinition:
      'The camera travels with a moving subject, holding them in frame as the world flows past.',
    explanation:
      'A tracking shot commits the camera to a subject in motion — alongside, behind, or ahead of them — by dolly, Steadicam, or vehicle. Keeping the character constant while the environment streams by creates momentum and attachment: we are with them. Long tracking shots can turn a simple walk into a tour of an entire world.',
    moodTags: ['epic', 'tense', 'heroic'],
    relatedCardIds: ['truck', 'steadicam', 'dolly'],
    scenario:
      'The camera stays locked alongside the marathon runner through the city streets, the crowd blurring past as she pushes for the finish.',
    blank: {
      sentence:
        'A tracking shot travels ____ a moving subject, keeping them in frame while the environment flows past.',
      answer: 'with',
      distractors: ['away from', 'above', 'independently of'],
    },
  },
  {
    id: 'whip-pan',
    module: 'movement',
    name: 'Whip Pan',
    shortDefinition:
      'A pan so fast the image smears into a blur — a burst of energy or a hidden cut.',
    explanation:
      'A whip pan slings the camera from one subject to another so quickly that the frame streaks into motion blur. It injects comic snap or violent urgency, and editors also hide cuts inside the blur to stitch takes or locations together. The technique shouts — used sparingly it is electric.',
    moodTags: ['chaotic', 'joyful', 'tense'],
    relatedCardIds: ['pan', 'handheld'],
    scenario:
      'A gunshot rings out at the wedding, and the camera snaps from the cake to the doorway so fast the room smears.',
    blank: {
      sentence:
        'A whip pan rotates the camera so fast the image smears into motion ____, often used to hide a cut.',
      answer: 'blur',
      distractors: ['grain', 'flare', 'vignette'],
    },
  },
  {
    id: 'rack-focus',
    module: 'movement',
    name: 'Rack Focus',
    shortDefinition:
      'Focus shifts from one plane to another within the shot, steering the eye between subjects.',
    explanation:
      'In a rack focus the focus puller rolls sharpness from one subject to another — say, from a face in the foreground to the figure appearing behind it. It redirects attention without a cut, physically linking two story elements in one breath. It depends on shallow depth of field: the blurrier the off-plane, the more dramatic the shift.',
    moodTags: ['tense', 'mysterious', 'romantic'],
    relatedCardIds: ['shallow-dof', 'insert', 'dolly'],
    scenario:
      'The heroine’s sharp profile softens as, behind her, the stranger at the bar snaps into focus — she is being watched.',
    blank: {
      sentence:
        'A rack focus shifts sharpness from one ____ of the image to another, redirecting attention without a cut.',
      answer: 'plane',
      distractors: ['color', 'corner', 'exposure'],
    },
  },

  // ────────────────────────────────── LIGHTING ────────────────────────────────
  {
    id: 'three-point',
    module: 'lighting',
    name: 'Three-Point Lighting',
    shortDefinition:
      'The classic setup: a key light shapes, a fill light softens, a back light separates.',
    explanation:
      'Three-point lighting builds a subject from three sources: the key (the main, strongest light, usually at ~45° to the face), the fill (a weaker light opposite the key that lifts the shadows), and the back light (behind the subject, rimming their outline off the background). It is the grammar every other setup edits: raising or killing the fill alone swings a scene from friendly to sinister. Interviews, studio work, and standard coverage all start here.',
    moodTags: ['calm'],
    relatedCardIds: ['high-key', 'low-key', 'rembrandt'],
    scenario:
      'You are lighting a straightforward interview and need the subject shaped, shadows controlled, and a clean rim separating them from the background.',
    blank: {
      sentence:
        'In three-point lighting, the ____ light is placed opposite the key to lift and soften the shadows it creates.',
      answer: 'fill',
      distractors: ['back', 'practical', 'bounce'],
    },
  },
  {
    id: 'high-key',
    module: 'lighting',
    name: 'High-Key Lighting',
    shortDefinition:
      'Bright, even illumination with soft shadows and low contrast throughout the frame.',
    explanation:
      'High-key lighting floods the scene with generous fill so shadows barely register and everything reads clean and open. It is the visual language of sitcoms, commercials, musicals, and corporate spaces — nothing lurks, nothing hides. Emotionally it promises safety and lightness, which also makes it a sly setup for comedy or irony when something dark intrudes.',
    moodTags: ['joyful', 'calm'],
    relatedCardIds: ['low-key', 'soft-light', 'three-point'],
    scenario:
      'A bubbly morning-show kitchen scene should feel bright, safe, and cheerful, with barely a shadow anywhere in the frame.',
    blank: {
      sentence:
        'High-key lighting uses strong fill to keep shadows minimal, producing bright, ____-contrast images.',
      answer: 'low',
      distractors: ['high', 'negative', 'split'],
    },
  },
  {
    id: 'low-key',
    module: 'lighting',
    name: 'Low-Key Lighting',
    shortDefinition:
      'Darkness dominates: minimal fill, deep shadows, and stark pools of light.',
    explanation:
      'Low-key lighting lets shadows own most of the frame, carving subjects out of darkness with hard, selective light. It is the native look of noir, thrillers, and horror, where what you cannot see does the frightening. Emotionally it whispers danger, secrecy, and moral ambiguity.',
    moodTags: ['tense', 'mysterious', 'melancholy'],
    relatedCardIds: ['high-key', 'chiaroscuro', 'silhouette'],
    scenario:
      'The informant waits in a parking garage at midnight, and the scene should feel dangerous, with faces half-swallowed by shadow.',
    blank: {
      sentence:
        'Low-key lighting uses very little ____ light, letting deep shadows dominate the frame.',
      answer: 'fill',
      distractors: ['key', 'back', 'colored'],
    },
  },
  {
    id: 'chiaroscuro',
    module: 'lighting',
    name: 'Chiaroscuro',
    shortDefinition:
      'Extreme, painterly contrast between light and dark — bold shapes carved by shadow.',
    explanation:
      'Borrowed from Renaissance painting (Caravaggio, Rembrandt), chiaroscuro pushes the light/dark contrast until the image becomes sculptural: brilliant highlights against near-black voids. In film it dramatizes moral conflict and inner division — faces half in light, half in darkness. It is low-key lighting elevated into deliberate visual art.',
    moodTags: ['mysterious', 'tense', 'epic'],
    relatedCardIds: ['low-key', 'rembrandt', 'high-contrast'],
    scenario:
      'The crime lord dispenses judgment from his study, half his face brilliant, half swallowed in black — a portrait of moral duality.',
    blank: {
      sentence:
        'Chiaroscuro is a dramatic contrast of light and dark borrowed from Renaissance ____.',
      answer: 'painting',
      distractors: ['theatre', 'architecture', 'poetry'],
    },
  },
  {
    id: 'hard-light',
    module: 'lighting',
    name: 'Hard Light',
    shortDefinition:
      'Light from a small or distant source, casting crisp-edged, dense shadows.',
    explanation:
      'Hard light comes from a source that is small relative to the subject — a bare bulb, a fresnel, the noon sun — so shadow edges stay razor sharp. It exaggerates texture: pores, scars, sweat, and grit all bite harder. The feel is harsh and unforgiving, which suits interrogations, deserts, and characters shown without mercy.',
    moodTags: ['tense', 'unsettling'],
    relatedCardIds: ['soft-light', 'low-key', 'silhouette'],
    scenario:
      'A single bare bulb hangs over the interrogation table, cutting razor-edged shadows across the suspect’s face.',
    blank: {
      sentence:
        'Hard light comes from a relatively ____ source, producing sharp-edged shadows and emphasized texture.',
      answer: 'small',
      distractors: ['large', 'warm', 'moving'],
    },
  },
  {
    id: 'soft-light',
    module: 'lighting',
    name: 'Soft Light',
    shortDefinition:
      'Light from a large or diffused source, wrapping the subject in gentle, gradual shadows.',
    explanation:
      'Soft light comes from a source that is big relative to the subject — an overcast sky, a window with diffusion, a bounced wall — so shadows melt gradually instead of cutting. It flatters skin, smooths texture, and feels kind. Romance, nostalgia, and safety are lit softly; the technique tells the audience these people are being handled with care.',
    moodTags: ['romantic', 'calm', 'intimate'],
    relatedCardIds: ['hard-light', 'high-key', 'butterfly'],
    scenario:
      'The reunion scene by the window should wrap both faces in gentle, flattering light with shadows that melt away softly.',
    blank: {
      sentence:
        'Light becomes softer as the source becomes ____ relative to the subject, making shadow edges more gradual.',
      answer: 'larger',
      distractors: ['smaller', 'brighter', 'bluer'],
    },
  },
  {
    id: 'practical',
    module: 'lighting',
    name: 'Practical Light',
    shortDefinition:
      'A light source visible inside the scene — a lamp, candle, neon sign — that motivates the illumination.',
    explanation:
      'A practical is any source the audience can actually see in the shot: table lamps, TV glow, neon, headlights. Practicals anchor the lighting in the story world, making even stylized setups feel believable, and they add depth and warmth to backgrounds. Cinematographers often hide the real movie lights but let practicals take the credit.',
    moodTags: ['intimate', 'calm', 'mysterious'],
    relatedCardIds: ['motivated-color', 'soft-light', 'low-key'],
    scenario:
      'A late-night diner scene should feel like it is lit only by the buzzing neon sign and the little lamps on each table.',
    blank: {
      sentence:
        'A practical is a light source that is ____ within the frame, such as a lamp or neon sign, motivating the scene’s illumination.',
      answer: 'visible',
      distractors: ['hidden', 'reflected', 'implied'],
    },
  },
  {
    id: 'rembrandt',
    module: 'lighting',
    name: 'Rembrandt Lighting',
    shortDefinition:
      'Key light at ~45° leaves a small triangle of light on the shadowed cheek.',
    explanation:
      'Named for the painter’s portraits, Rembrandt lighting sets the key high and about 45° to one side, so the nose shadow joins the cheek shadow and leaves a small lit triangle under the far eye. Half the face falls into shadow, giving instant depth, gravity, and psychological weight. It is the classic look for thoughtful, conflicted, or dramatic portraiture.',
    moodTags: ['mysterious', 'intimate', 'melancholy'],
    relatedCardIds: ['chiaroscuro', 'butterfly', 'three-point'],
    scenario:
      'For the weary general’s portrait scene you want classic painterly drama: half the face shadowed, with just a triangle of light on the dark cheek.',
    blank: {
      sentence:
        'Rembrandt lighting is identified by a small ____ of light on the shadowed cheek, formed under the eye.',
      answer: 'triangle',
      distractors: ['ring', 'stripe', 'halo'],
    },
  },
  {
    id: 'butterfly',
    module: 'lighting',
    name: 'Butterfly Lighting',
    shortDefinition:
      'Key light high and directly frontal, casting a small symmetrical shadow under the nose.',
    explanation:
      'Butterfly (paramount) lighting places the key above and directly in front of the face, creating a small butterfly-shaped shadow beneath the nose. The symmetry sculpts cheekbones and smooths the face, which made it the signature of classic Hollywood glamour portraits. It reads as beauty, poise, and star treatment.',
    moodTags: ['romantic', 'joyful'],
    relatedCardIds: ['rembrandt', 'soft-light', 'high-key'],
    scenario:
      'The starlet’s screen-test close-up calls for old-Hollywood glamour — symmetrical, sculpted, and flawless.',
    blank: {
      sentence:
        'Butterfly lighting places the key light high and directly in front of the face, casting a small shadow under the ____.',
      answer: 'nose',
      distractors: ['chin', 'brow', 'ear'],
    },
  },
  {
    id: 'silhouette',
    module: 'lighting',
    name: 'Silhouette',
    shortDefinition:
      'The subject is exposed as a black shape against a bright background.',
    explanation:
      'A silhouette lights the background, not the subject, so the figure reads as pure outline. Stripping away facial detail creates anonymity, iconography, or menace — the shape must do all the talking. It is beloved for entrances, exits, and moments when a character becomes larger than themselves.',
    moodTags: ['mysterious', 'epic', 'melancholy'],
    relatedCardIds: ['low-key', 'hard-light', 'high-contrast'],
    scenario:
      'The gunfighter appears in the saloon doorway as a pure black shape against the blazing daylight outside.',
    blank: {
      sentence:
        'In a silhouette the ____ is lit while the subject is left dark, reducing the figure to a pure outline.',
      answer: 'background',
      distractors: ['face', 'foreground', 'camera'],
    },
  },

  // ────────────────────────────────── MOOD & COLOR ────────────────────────────
  {
    id: 'warm-palette',
    module: 'mood-color',
    name: 'Warm Palette',
    shortDefinition:
      'Oranges, ambers, and golds dominate, evoking comfort, energy, or nostalgia.',
    explanation:
      'A warm palette pushes the image toward sunset tones — amber light, golden skin, honeyed interiors. Audiences associate warmth with safety, love, memory, and vitality, which is why flashbacks to happier times so often glow orange. Pushed to extremes, warmth can also read as heat, desire, or danger by fire.',
    moodTags: ['joyful', 'romantic', 'intimate'],
    relatedCardIds: ['cool-palette', 'teal-orange', 'motivated-color'],
    scenario:
      'The grandmother’s kitchen flashback should glow with golden nostalgia, instantly signalling a safer, happier time.',
    blank: {
      sentence:
        'Warm palettes lean on oranges, ambers, and golds, which audiences associate with comfort, energy, and ____.',
      answer: 'nostalgia',
      distractors: ['detachment', 'sterility', 'dread'],
    },
  },
  {
    id: 'cool-palette',
    module: 'mood-color',
    name: 'Cool Palette',
    shortDefinition:
      'Blues, cyans, and steels dominate, evoking cold, distance, or sorrow.',
    explanation:
      'A cool palette bathes the frame in blue and steel tones, and audiences feel the temperature drop: isolation, technology, grief, institutional detachment. Night scenes, morgues, corporate towers, and heartbreak all speak fluent blue. Played gently it can also be serene — moonlight and quiet water rather than ice.',
    moodTags: ['melancholy', 'calm', 'mysterious'],
    relatedCardIds: ['warm-palette', 'desaturated', 'color-symbolism'],
    scenario:
      'After the funeral, the widower’s empty apartment should feel drained of warmth — steely, blue, and isolating.',
    blank: {
      sentence:
        'Cool palettes built on blues and steels make scenes feel cold, distant, or ____.',
      answer: 'sorrowful',
      distractors: ['festive', 'cozy', 'appetizing'],
    },
  },
  {
    id: 'teal-orange',
    module: 'mood-color',
    name: 'Teal & Orange Grade',
    shortDefinition:
      'A complementary grade pushing shadows teal and skin tones orange for maximum pop.',
    explanation:
      'The teal-and-orange grade exploits color theory: skin tones sit naturally in the orange range, so pushing shadows and backgrounds toward teal — orange’s complement — makes faces leap off the screen. It became the signature of the modern blockbuster because it adds punch and polish to almost any footage. Used thoughtlessly it can feel generic, which is itself a lesson in restraint.',
    moodTags: ['epic', 'tense'],
    relatedCardIds: ['complementary', 'warm-palette', 'cool-palette'],
    scenario:
      'The studio wants the action sequence to have that punchy blockbuster look where tanned faces pop hard against cyan-shadowed streets.',
    blank: {
      sentence:
        'The teal-and-orange grade works because ____ tones sit in the orange range, so teal shadows make them pop by complementary contrast.',
      answer: 'skin',
      distractors: ['sky', 'foliage', 'metal'],
    },
  },
  {
    id: 'desaturated',
    module: 'mood-color',
    name: 'Desaturated Grade',
    shortDefinition:
      'Color intensity is drained toward gray, leaving a muted, weathered world.',
    explanation:
      'A desaturated or muted grade pulls color toward gray without removing it entirely, leaving the world faded and heavy. It is the visual shorthand for grim realism — war films, dystopias, depression, and grinding poverty. The missing color becomes an ache: the audience feels that vividness has been taken from these lives.',
    moodTags: ['melancholy', 'vulnerable', 'unsettling'],
    relatedCardIds: ['low-contrast', 'cool-palette', 'monochromatic'],
    scenario:
      'Your war drama should look drained and weathered, as if the color itself had been shelled out of the landscape.',
    blank: {
      sentence:
        'A desaturated grade reduces color ____ toward gray, giving scenes a muted, weathered feeling.',
      answer: 'intensity',
      distractors: ['temperature', 'symbolism', 'balance'],
    },
  },
  {
    id: 'high-contrast',
    module: 'mood-color',
    name: 'High Contrast',
    shortDefinition:
      'Deep blacks and bright highlights sit side by side, creating bold, dramatic images.',
    explanation:
      'A high-contrast image spans the full range from crushed black to blazing white, with little gentle middle ground. The eye reads that punch as drama, danger, and decisiveness — noir and thrillers live here. Combined with hard light it turns every frame into a graphic statement of conflict.',
    moodTags: ['tense', 'mysterious', 'epic'],
    relatedCardIds: ['low-contrast', 'chiaroscuro', 'low-key'],
    scenario:
      'The neo-noir chase should feel graphic and dangerous — ink-black alleys slashed by blazing white streetlights.',
    blank: {
      sentence:
        'High-contrast images place deep blacks directly against bright ____, creating bold, dramatic frames.',
      answer: 'highlights',
      distractors: ['pastels', 'midtones', 'greens'],
    },
  },
  {
    id: 'low-contrast',
    module: 'mood-color',
    name: 'Low Contrast',
    shortDefinition:
      'Tones cluster in the middle range — a soft, flat, often hazy image.',
    explanation:
      'Low-contrast images compress the tonal range so nothing is very dark or very bright, like a scene wrapped in mist. The effect is gentle and dreamlike: memory, overcast melancholy, or hazy nostalgia. Because nothing visually shouts, it can also express numbness or emotional flatness.',
    moodTags: ['calm', 'melancholy', 'mysterious'],
    relatedCardIds: ['high-contrast', 'desaturated', 'soft-light'],
    scenario:
      'The dream sequence on the foggy coastline should feel soft and unreal, with no harsh blacks or bright highlights anywhere.',
    blank: {
      sentence:
        'Low-contrast images compress the tonal range toward the ____, producing a soft, hazy, dreamlike look.',
      answer: 'middle',
      distractors: ['shadows', 'highlights', 'edges'],
    },
  },
  {
    id: 'monochromatic',
    module: 'mood-color',
    name: 'Monochromatic',
    shortDefinition:
      'The frame is built from variations of a single hue.',
    explanation:
      'A monochromatic scheme commits the image to one hue — an all-red nightclub, a green-soaked hallway, a blue night. The unity is hypnotic and instantly stylized, telling the audience they have entered a distinct psychological space. Because one color saturates everything, that color’s symbolism does maximum work.',
    moodTags: ['mysterious', 'melancholy', 'unsettling'],
    relatedCardIds: ['color-symbolism', 'complementary', 'desaturated'],
    scenario:
      'The assassin stalks through a nightclub drowned entirely in red light, and the single hue makes the sequence feel like a fever.',
    blank: {
      sentence:
        'A monochromatic color scheme builds the entire frame from variations of a ____ hue.',
      answer: 'single',
      distractors: ['complementary', 'primary', 'neutral'],
    },
  },
  {
    id: 'complementary',
    module: 'mood-color',
    name: 'Complementary Colors',
    shortDefinition:
      'Colors from opposite sides of the wheel — like orange/blue or red/green — create maximum vibrance and tension.',
    explanation:
      'Complementary pairs sit opposite each other on the color wheel, and placing them together makes both appear more intense. Filmmakers use the pairing for visual energy and for coded conflict — two characters, two worlds, two ideologies in opposing colors. The teal-and-orange grade is this principle industrialized.',
    moodTags: ['tense', 'epic'],
    relatedCardIds: ['teal-orange', 'color-symbolism', 'monochromatic'],
    scenario:
      'You dress the rival houses in opposing colors from opposite sides of the color wheel so every confrontation vibrates with visual conflict.',
    blank: {
      sentence:
        'Complementary colors sit ____ each other on the color wheel and intensify each other when placed together.',
      answer: 'opposite',
      distractors: ['next to', 'above', 'within'],
    },
  },
  {
    id: 'color-symbolism',
    module: 'mood-color',
    name: 'Color as Symbolism',
    shortDefinition:
      'A color carries recurring meaning — red as danger or passion, blue as cold isolation.',
    explanation:
      'Color symbolism assigns hues a job in the story: red flags danger, violence, or desire; blue signals isolation or sorrow; green can mean envy, sickness, or the uncanny. Repetition builds the code — once the audience links the color to the idea, a single red dress or blue-lit hallway does narrative work silently. The meanings are cultural, so films teach the audience their own dictionary.',
    moodTags: ['mysterious', 'tense', 'romantic'],
    relatedCardIds: ['monochromatic', 'warm-palette', 'cool-palette'],
    scenario:
      'You dress the femme fatale in red at every fateful meeting so that, by the finale, a mere flash of red silk reads as danger.',
    blank: {
      sentence:
        'In classic color symbolism, red commonly signals danger or passion while blue signals cold or ____.',
      answer: 'isolation',
      distractors: ['royalty', 'appetite', 'luck'],
    },
  },
  {
    id: 'motivated-color',
    module: 'mood-color',
    name: 'Motivated Color',
    shortDefinition:
      'The palette is justified by visible in-world sources — neon, firelight, sodium lamps.',
    explanation:
      'Motivated color grounds a stylized palette in sources the audience can see or infer: a bar glows red because of its neon sign, a bedroom turns blue under moonlight, a face flickers orange by the campfire. Because the story world explains the color, the grade feels immersive instead of imposed. It is how films get expressive color while keeping the audience inside reality — and how lighting and palette combine into genre tones like noir neon or firelit romance.',
    moodTags: ['intimate', 'mysterious', 'calm'],
    relatedCardIds: ['practical', 'warm-palette', 'monochromatic'],
    scenario:
      'You want the motel room drenched in pulsing pink, but justified — so you establish the buzzing vacancy sign right outside the window.',
    blank: {
      sentence:
        'Motivated color justifies the palette through visible in-world ____, such as neon signs or firelight.',
      answer: 'sources',
      distractors: ['dialogue', 'costumes', 'edits'],
    },
  },
]
