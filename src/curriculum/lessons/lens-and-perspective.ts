import type { Lesson } from '../schema'

/**
 * Track C, Module 1 — Lens & Perspective.
 * The module that fixes the single most common misunderstanding in camera
 * work: that focal length is a zoom knob rather than a decision about where
 * you are standing.
 */
export const LENS_AND_PERSPECTIVE: Lesson[] = [
  // ─────────────────────────────────── 1 ───────────────────────────────────
  {
    id: 'camera-focal-length',
    trackId: 'camera',
    moduleId: 'lens-and-perspective',
    order: 1,
    title: 'Focal length — the lens is a feeling, not a zoom',
    oneLine: 'Why 24mm and 85mm are two completely different emotions.',
    estMinutes: 9,
    prerequisites: [],
    body: `**Focal length** is the distance in millimetres from a lens’s optical centre to the sensor. It decides two things: how much world fits in the frame (**field of view**), and how the space *inside* the frame feels.

Three families. A **wide lens** (12–35mm) takes in more world and stretches space. A **normal lens** (40–58mm) reports roughly what your eye reports. A **telephoto lens** (85mm and up) sees a narrow slice and squashes space.

But field of view is the boring half — you can fix framing by walking. The important half is **perspective**, and perspective is not controlled by the lens at all. It is controlled by **camera-to-subject distance**.

Here is the whole idea in one experiment. Shoot a face at 24mm and fill the frame: you must stand about 40cm away. The nose is meaningfully closer to the lens than the ears, so the nose renders big. That is **wide-angle distortion**. Now shoot the same face at 85mm and fill the frame: you stand about two metres back. Nose and ears are now nearly the same distance from the lens, so the face renders flat and flattering.

Same face. Same framing. Different feeling — because *you moved*.

That is also why **perspective compression** happens on long lenses. From far away everything is roughly equally far, so foreground and background stack like cards. A street at 200mm looks crowded and inescapable. The same street at 24mm looks empty and long.

So the emotional job of each family:

- Wide — you are *in* this. Involved, unstable, exposed, sometimes grotesque.
- Normal — you are *watching* this. Neutral, honest, unshowy.
- Telephoto — you are *observing from outside*. Surveillance, isolation, longing. Or claustrophobia, because the background is pressed against them.

And the line that matters most: **zoom** and walking are not the same move. A zoom changes framing only, because the camera never left its spot. A **push-in** changes perspective, because the world reshapes as you approach. A zoom says *look closer*. A push says *get closer*. Those are different sentences.

Choose the lens for the relationship you want between subject and background. Then choose your distance to get the framing. Never the reverse.`,
    hinglishGloss: `Lens ka number (mm) sirf "kitna zoom" nahi hai — wo decide karta hai ki frame ke andar space kaisa lagega.
Wide lens = tum paas khade ho, isliye naak bada aur background door — sab phaila hua.
Telephoto = tum door khade ho, isliye chehra flat aur background bilkul chipka hua peeche.
Yaad rakhna: perspective lens se nahi banta, tumhari doori se banta hai. Lens toh sirf crop deta hai.
Isliye zoom karna aur chal ke paas jaana — do alag emotions hain. Zoom = "dekho". Paas jaana = "ghus jao".`,
    visuals: [
      {
        component: 'FocalLengthDial',
        caption:
          'Drag the focal length. The subject is locked to the same size at every setting, so the only thing changing is perspective — watch the background swell and the side objects leave the frame.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'The Graduate',
        year: 1967,
        shot: 'Benjamin sprinting down the street toward the church, shot on a long lens so he runs flat out and appears to gain no ground.',
        why: 'Compression strips out the visual cue of approach. The audience feels enormous effort with no progress — the anxiety of the scene rendered as geometry rather than acting.',
      },
      {
        kind: 'work',
        title: 'The Shining',
        year: 1980,
        shot: 'Danny riding his tricycle through the Overlook corridors, wide lens mounted low on a Steadicam, hallways stretching away ahead of him.',
        why: 'The wide lens exaggerates depth, so each corridor reads as longer than it can possibly be. The hotel becomes bigger than architecture allows, which is exactly the feeling the film needs.',
      },
    ],
    commonMistakes: [
      'Treating millimetres as a zoom knob — picking a focal length to get the framing, then never moving the camera. Framing should be your last decision, not your first.',
      'Shooting faces at 24–35mm because it fits more in, then wondering why everyone looks subtly wrong in a way you cannot name.',
      'Believing telephoto automatically means a blurry background. Blur comes from aperture and distance; stacking comes from distance. Two separate controls, constantly collapsed into one.',
    ],
    aiTranslation: `A diffusion model does not simulate a lens. Writing "85mm" is a **style token** — it pulls the image toward the look of photographs captioned 85mm (portraits, shallow focus, flattering skin), not toward a geometry.

So prompt the *consequence*, not just the number. "Shot from across the street on a long lens, background buildings stacked flat behind her, subject cleanly separated" beats "85mm" every time. For the opposite: "camera close to her face, wide lens, background falling away fast toward a deep horizon."

**What breaks:** the model hands you an impossible combination — a wide field of view with telephoto background stacking, or a wide-angle face with heavy shallow focus. It reads as fake instantly and most people cannot say why. Now you can.

**The hidden cause of AI face drift:** a character generated at 24mm in shot 3 and 85mm in shot 4 is literally a differently shaped face — different nose-to-ear proportion. Lock focal-length language per character across your shot list, exactly like you lock wardrobe.

**For image to video:** telephoto plates animate more safely. Less parallax means less background for the model to reconstruct, which means less morphing and warping. If a shot has to move, generate it long.

**In Nuke or After Effects:** perspective is baked at generation. You can re-crop and fake a small push with a 2D scale, but you cannot turn a 24mm face into an 85mm face without real 3D work. This one gets fixed upstream — comp cannot save it.`,
    terms: [
      'focal-length',
      'field-of-view',
      'wide-lens',
      'normal-lens',
      'telephoto-lens',
      'perspective',
      'camera-to-subject-distance',
    ],
    checks: [
      {
        id: 'c1',
        prompt: 'You need to fill the frame with a face and you only have an 85mm lens. What do you change?',
        options: [
          'Your camera-to-subject distance — walk backwards',
          'The aperture, to widen the field of view',
          'The sensor, to a smaller one',
          'Nothing — 85mm cannot fill a frame with a face',
        ],
        answerIndex: 0,
        why: 'Focal length and distance are a pair. Fix the framing by moving; the lens decides the perspective you get while doing it.',
      },
      {
        id: 'c2',
        prompt: 'A background looks stacked and pressed right up against the subject. What is actually responsible?',
        options: [
          'Camera distance — the long lens is only the crop that lets you see it',
          'The long lens itself, which bends light inward',
          'A wide aperture',
          'The aspect ratio of the frame',
        ],
        answerIndex: 0,
        why: 'Shooting from far away makes everything roughly equidistant, so depths render at similar sizes. The telephoto just crops into that effect.',
      },
      {
        id: 'c3',
        prompt: 'Zooming changes ____ only; moving the camera changes ____.',
        options: [
          'framing / perspective',
          'perspective / framing',
          'exposure / framing',
          'focus / depth of field',
        ],
        answerIndex: 0,
        why: 'The camera never moved during a zoom, so the subject-to-background relationship is untouched. Walking changes where you see from.',
      },
    ],
    assignment: {
      brief:
        'Pick one subject — a face, or a bottle on a table. Generate it twice in FLUX: once described as camera-close on a wide lens, once as far back on a long lens. Match the framing between them, so the subject occupies the same amount of frame in both. The only thing allowed to change is perspective.',
      deliverable: 'Two stills, side by side in one labelled image.',
      timeboxMinutes: 30,
      successCriteria: [
        'The subject occupies roughly the same frame area in both images. If one is bigger, you changed framing instead of perspective and the test is invalid.',
        'In the wide version the background is visibly further away and wider; in the long version background elements are larger and stacked closer behind the subject.',
        'You can state in one sentence which you would use for this subject and why, and the reason is about emotion rather than sharpness.',
      ],
      usesTools: ['FLUX Schnell', 'Any image viewer'],
    },
  },

  // ─────────────────────────────────── 2 ───────────────────────────────────
  {
    id: 'camera-perspective-compression',
    trackId: 'camera',
    moduleId: 'lens-and-perspective',
    order: 2,
    title: 'Compression — how distance stacks the world',
    oneLine: 'Why crowds, traffic and mountains look packed on a long lens.',
    estMinutes: 8,
    prerequisites: ['camera-focal-length'],
    body: `**Perspective compression** is the flattening of depth that happens when you shoot from far away. It is the most useful optical effect in commercial work, and almost everybody explains it wrong.

The wrong explanation is that long lenses compress. They do not. Distance compresses; the long lens is only the crop that lets you see it from far enough away to notice.

The maths is simple and worth holding in your head. How big something renders depends on one over its distance from the camera. Stand two metres from a person, with a second person six metres behind them. The first is at 2m, the second at 8m — four times further, so it renders a quarter of the size. Now walk back to thirty metres. The first is at 30m, the second at 36m — only 1.2 times further, so it renders at 83% of the size. The two people never moved. Their apparent relationship changed entirely because you did.

That collapse is what you are buying. It gives you:

- **Layering** that stacks instead of spreading. Ranks of people, rows of traffic, ridge behind ridge of hills — all pressed into one crowded plane.
- Backgrounds that read as walls rather than as space. A subject on a long lens is trapped in front of their background, not standing in a room.
- Big backgrounds. A distant building rendered large behind a subject only happens on a long lens, because you must stand far enough back for the building to gain relative size.
- Almost no **parallax**. If the camera moves laterally, near and far shift by nearly the same amount, so the world reads as a painted flat rather than a space.

The reverse is equally useful. Shooting close on a wide lens spreads depths apart: a room becomes cavernous, a corridor becomes endless, a hand held toward the lens becomes enormous against a tiny face. That is **compression** run backwards, and it is how you make small sets feel big.

The practical rule for a director: decide first whether the background should press on the subject or fall away from them. That decision sets your camera position. The lens follows.`,
    hinglishGloss: `Compression matlab: door se shoot karo toh saari cheezein ek dusre par chipki hui lagti hain.
Reason simple hai — 2m aur 8m me 4x ka farak hai, lekin 30m aur 36m me sirf 1.2x ka. Log wahi khade hain, tum hile ho.
Isliye bheed, traffic, pahaad — sab long lens par thuse hue dikhte hain.
Ulta bhi sach hai: paas se wide lens par kamra bada, corridor lamba lagta hai. Chhote set ko bada dikhane ka yehi tareeka hai.
Pehle socho background subject par dabaav daale ya door hat jaaye — phir camera ki jagah decide hogi. Lens baad me.`,
    visuals: [
      {
        component: 'CompressionStack',
        caption:
          'Three people standing 6m and 16m apart, permanently. Drag the camera back and watch the gaps between them collapse — nobody moved except you.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'Ran',
        year: 1985,
        shot: 'The battle sequences, covered from a distance on long lenses, where advancing ranks of soldiers stack into a single crowded wall of colour.',
        why: 'Compression removes the gaps between ranks, so an army reads as an unbroken mass rather than as individuals with space to escape into. The formality of the image is doing the storytelling.',
      },
      {
        kind: 'generic',
        shot: 'The standard city-traffic insert: a long lens down a straight road, cars apparently bumper to bumper and heat-shimmering into one another.',
        why: 'In reality the cars have normal gaps. Shot from several hundred metres away the gaps compress to nothing, which is how a mildly busy road is sold as gridlock — a routine trick in commercials and news cutaways alike.',
      },
    ],
    commonMistakes: [
      'Saying "the long lens compressed it" and stopping there. If you believe the lens did it, you will reach for a longer lens when what you actually needed was to stand further back.',
      'Using a long lens for a small set to make it look bigger. Compression does the opposite: it flattens the room into a wall. Small spaces want a wide lens and depth.',
      'Forgetting that compression kills parallax. A compressed shot with a camera move looks strangely flat and fake, because the depth cue you expect from movement never arrives.',
    ],
    aiTranslation: `Compression is the single most valuable thing you can prompt for on a small GPU, and almost nobody uses it deliberately.

**Prompt the distance, not just the lens.** "Long lens, shot from far across the road, background buildings stacked directly behind her with no visible gap, flattened depth" gives you compression. The bare token "telephoto" often just gives you shallow focus, because that is what the caption usually accompanied in training data.

**Why it matters on 8GB:** compressed shots have almost no parallax. When you feed that still into Wan 2.2 or LTX for image-to-video, the model has very little background geometry to invent as things move — so you get dramatically fewer morphing artifacts, less texture crawl, and far less background drift. A compressed plate is a *forgiving* plate. If a shot must survive motion, compose it long.

**What breaks:** models routinely produce an incoherent hybrid — a wide field of view showing a whole street, but with the far buildings rendered at telephoto scale. It reads as a matte painting behind a subject. The fix is to say what the frame excludes: "narrow field of view, only the subject and the wall behind, nothing of the street visible."

**In Nuke:** if you generate your subject and background as separate elements, you can build compression by hand — put them on cards, push the camera back and lengthen the focal length in the same move. That is a real 2.5D multi-plane setup and it is how you buy back a lens choice the model refused to give you. It is also the only way to get a convincing **dolly zoom** out of AI footage.`,
    terms: ['perspective-compression', 'parallax', 'layering'],
    checks: [
      {
        id: 'c1',
        prompt: 'You want a distant mountain to loom huge behind your subject. What do you do?',
        options: [
          'Move far back from the subject and use a long lens to reframe',
          'Move close to the subject with a wide lens',
          'Keep your position and open the aperture',
          'Raise the camera height',
        ],
        answerIndex: 0,
        why: 'The mountain only gains relative size when your distance to the subject becomes a large fraction of your distance to the mountain. That means standing far back.',
      },
      {
        id: 'c2',
        prompt: 'Two people stand 6m apart. Which camera position makes them look most similar in size?',
        options: [
          'Thirty metres away',
          'Two metres away',
          'Six metres away',
          'Distance makes no difference to their relative size',
        ],
        answerIndex: 0,
        why: 'At 30m the two are 30m and 36m away — barely different. Up close the same 6m gap is a fourfold difference in distance.',
      },
      {
        id: 'c3',
        prompt: 'Why does a compressed shot look flat and strange when the camera moves sideways?',
        options: [
          'There is almost no parallax, so the depth cue you expect never arrives',
          'Long lenses cannot be moved smoothly',
          'The shutter angle changes with focal length',
          'Compression reduces the frame rate',
        ],
        answerIndex: 0,
        why: 'Near and far objects are at similar distances, so they shift by similar amounts. Your eye reads matching shift as a flat surface.',
      },
    ],
    assignment: {
      brief:
        'Find a real place with clear depth — a corridor, a row of parked bikes, a street with poles. Photograph it twice with your phone: once standing very close to the nearest object, once from as far back as the space allows, zoomed in so the nearest object is the same size in frame. Do not crop afterwards.',
      deliverable: 'Two phone photographs, same nearest-object size, side by side.',
      timeboxMinutes: 25,
      successCriteria: [
        'The nearest object is close to the same size in both frames, so the comparison is honest.',
        'In the far version, objects further down the line are noticeably larger relative to the nearest one, and the gaps between them look smaller.',
        'You can point at one specific pair of objects and say how much the gap between them appeared to shrink.',
      ],
      usesTools: ['Phone camera'],
    },
  },

  // ─────────────────────────────────── 3 ───────────────────────────────────
  {
    id: 'camera-wide-angle-distortion',
    trackId: 'camera',
    moduleId: 'lens-and-perspective',
    order: 3,
    title: 'Wide-angle distortion — and using it on purpose',
    oneLine: 'Why close faces bulge, and when you should let them.',
    estMinutes: 8,
    prerequisites: ['camera-focal-length'],
    body: `**Wide-angle distortion** is the stretching you get when the camera is very close to a subject. A nose 10cm nearer the lens than the ears is, at 40cm range, a quarter of the total distance closer — so it renders about a third larger than it should. At two metres that same 10cm is a rounding error and the face looks normal.

Note what that means. It is not the lens misbehaving. It is honest projection of a real spatial fact. The reason we blame the **wide lens** is that a wide lens is the only way to fill the frame from 40cm, so the two always arrive together.

There is a genuine lens fault that gets confused with this, and you should keep them separate. **Barrel distortion** bows straight lines outward near the frame edges. That one *is* a property of the glass, it has nothing to do with distance, and it can be corrected with a lens profile in post. Perspective stretching cannot be corrected — it is baked into where you stood.

This is why **portrait length** exists. An 85–135mm lens forces you to stand two metres or more away, and at that range facial features are effectively equidistant from the lens. Photographers did not choose those focal lengths for sharpness. They chose them for the standing distance they impose.

So when do you *want* the distortion?

- *Aggression and threat.* A face leaning into a wide lens becomes a caricature of itself. Comedy and horror both live here.
- *Subjectivity.* Distortion signals that we are inside somebody’s head rather than watching neutrally.
- *Scale on objects.* A car shot low and close on a wide lens gets a heroic, muscular front end. Almost all car advertising uses this.
- *Hands, tools, food reaching toward camera.* Anything you want to feel offered to the viewer.

And when do you not? Beauty, fashion, most product hero shots, any interview, and any face a client has approved from a still. In those, distortion reads as a mistake even to people who cannot name it.

The rule is short. Get close for energy. Stand back for dignity.`,
    hinglishGloss: `Bahut paas se shoot karoge toh naak bada aur kaan chhote lagenge — chehra phool jaayega.
Reason: 40cm se shoot kar rahe ho toh naak poori doori ka ek chauthaai paas hai. 2m se wahi 10cm kuch bhi nahi.
Lens ki galti nahi hai — doori ki hai. Isliye 85–135mm ko "portrait lens" kehte hain: wo tumhe door khada hone par majboor karta hai.
Jaan-boojh ke use karo jab aggression, comedy, horror, ya car/product ko powerful dikhana ho.
Mat karo jab beauty, fashion, interview, ya client ka approved face ho. Wahan ye galti lagti hai.`,
    visuals: [
      {
        component: 'FaceDistortion',
        caption:
          'Head width is locked. Drag the camera distance and watch the nose grow and the ears narrow — the entire effect is distance, nothing else.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'Brazil',
        year: 1985,
        shot: 'Bureaucrats and officials shot in close-up on very wide lenses, faces bulging toward the camera while the room warps away behind them.',
        why: 'The distortion makes ordinary functionaries grotesque without any makeup or performance change. The lens choice is the characterisation.',
      },
      {
        kind: 'generic',
        shot: 'The standard car commercial hero angle: camera dropped almost to the tarmac, very close to the front wheel arch, wide lens.',
        why: 'The near corner of the car stretches toward the viewer and the far end tapers away, exaggerating length and stance. The car looks physically bigger and more planted than it is when you walk up to it.',
      },
    ],
    commonMistakes: [
      'Calling it lens distortion and then trying to fix it with a lens-profile correction. A profile fixes bowed lines, not stretched noses — the two are different problems.',
      'Using a wide lens for a close-up because the room is small. You will get an unflattering face; back out to a wider shot or find a way to gain distance instead.',
      'Warping a distorted face in After Effects to fix it. Warping drags the ears and hairline with it and creates a subtler, weirder wrongness than the original.',
    ],
    aiTranslation: `Diffusion models learned distortion from captions like "wide angle", "fisheye", "GoPro" and "selfie". So they apply it as a *style*, which means they apply it inconsistently — you will regularly get a barrel-distorted background behind a face rendered at flattering portrait proportions, or the reverse.

Name that failure, because it is everywhere and almost nobody diagnoses it: **perspective mismatch**. It is a major reason AI faces read as uncanny even when the skin, hair and lighting are excellent. The viewer is reading two contradictory camera positions in one image.

**To get distortion deliberately:** "shot from 30 centimetres away on a 20mm lens, nose closest to camera, face filling the frame, edges of the frame stretching." Naming the distance does far more than naming the lens.

**To avoid it — which is most product and beauty work:** "shot from two metres away on an 85mm portrait lens, natural facial proportions, no wide-angle stretching." Add wide-angle terms to your negatives. Left alone, several models drift toward a mildly wide, mildly bulged face that looks subtly off in a way clients reject without being able to explain.

**Fix it upstream, not in comp.** Regenerate. Warping in After Effects drags the ears and hairline and produces a worse artefact than the one you started with.

**The one that will earn you money:** when you composite a real product photograph over an AI-generated plate, you must match the plate’s implied distortion. If the plate reads as a 20mm shot and your product was photographed on a 50mm, the edges will never sit — the product will look pasted no matter how good your roto and grade are. In Nuke, estimate the plate’s distortion from straight lines in the background, apply a matching LensDistortion to your product element, then grade. This is the exact skill most AI operators do not have.`,
    terms: ['wide-angle-distortion', 'barrel-distortion', 'portrait-length'],
    checks: [
      {
        id: 'c1',
        prompt: 'A face shot from 40cm looks bulged. What actually caused it?',
        options: [
          'The camera being that close — features at different depths render at very different sizes',
          'The wide lens bending light at the edges',
          'A low shutter speed',
          'The sensor being too small',
        ],
        answerIndex: 0,
        why: 'At 40cm a 10cm nose-to-ear offset is a large fraction of the total distance. The lens only made that framing possible.',
      },
      {
        id: 'c2',
        prompt: 'Which of these can be corrected in post with a lens profile?',
        options: [
          'Barrel distortion — bowed straight lines near the frame edge',
          'A nose that renders too large from close range',
          'Perspective compression from a long lens',
          'Both barrel distortion and stretched facial features',
        ],
        answerIndex: 0,
        why: 'Barrel distortion is an optical property of the glass. Perspective stretching is a fact about where the camera stood, and no profile can undo it.',
      },
      {
        id: 'c3',
        prompt: 'Why are 85–135mm lenses traditionally used for portraits?',
        options: [
          'They force a camera distance of two metres or more, at which facial features are nearly equidistant',
          'They are optically sharper than shorter lenses',
          'They produce more background blur than any other lenses',
          'They have less barrel distortion by design',
        ],
        answerIndex: 0,
        why: 'The focal length is chosen for the standing distance it imposes. The flattering rendering is a consequence of that distance.',
      },
    ],
    assignment: {
      brief:
        'Use your phone. Photograph your own face — or any willing face — filling the frame from roughly 30cm, then again filling the frame from roughly 2 metres by walking back and zooming in. Then generate the same two treatments in FLUX by describing the camera distance rather than the millimetres, and compare which pair separates more cleanly.',
      deliverable: 'Four images: two photographed, two generated, arranged as a two-by-two grid.',
      timeboxMinutes: 40,
      successCriteria: [
        'In your close photograph the nose is visibly larger relative to the ears than in the far photograph, and you can point to the difference.',
        'Your two generated images differ in the same direction as your two photographs, which proves the prompt language actually worked.',
        'You can state whether the model responded more to the distance description or to the millimetre number, based on what you saw.',
      ],
      usesTools: ['Phone camera', 'FLUX Schnell'],
    },
  },

  // ─────────────────────────────────── 4 ───────────────────────────────────
  {
    id: 'camera-zoom-vs-push-in',
    trackId: 'camera',
    moduleId: 'lens-and-perspective',
    order: 4,
    title: 'Zoom vs push-in — two different sentences',
    oneLine: 'One magnifies the picture. The other moves the audience.',
    estMinutes: 7,
    prerequisites: ['camera-focal-length'],
    body: `A **zoom** and a **push-in** can end on identical framing, and they mean completely different things.

A zoom changes focal length while the camera stays put. Because **camera-to-subject distance** never changed, the relationship between subject and background is frozen: everything magnifies together, uniformly. It is a crop performed live. The viewer’s position in the world does not move — their *attention* is directed. The sentence is *look closer*.

A push-in physically moves the camera toward the subject, usually on a **dolly**, a slider or a gimbal. Distance changes, so perspective changes with it: the subject grows faster than the background, the background falls away and less of it stays in frame. The viewer is transported. The sentence is *get closer*.

Three consequences worth memorising.

*Parallax.* A push generates it — foreground shifts more than background as you travel, which is the strongest depth cue we have. A zoom generates none. This is the real reason a zoom feels cheap and a push feels expensive: one of them contains information about the shape of the space, and the other does not.

*Emotional register.* A slow push-in on a face is the standard grammar for a realisation landing. A zoom on a face reads as observation, surveillance, or comedy — which is why documentary and 1970s television are full of zooms and modern drama mostly is not.

*Combining them.* Move the camera one way while zooming the other at a matched rate and you get a **dolly zoom**: the subject stays the same size while the background expands or collapses behind them. Because it is physically impossible for a viewer to experience, it reads as the ground shifting under a character. Use it roughly once per project, if that.

A zoom is not forbidden. It is a specific tool with a specific voice — snap zooms punctuate, slow zooms in observational work signal that the camera is a watcher rather than a participant. Just never reach for one because moving the camera was inconvenient. That is the version an audience can feel.`,
    hinglishGloss: `Zoom aur push-in dono same framing par khatam ho sakte hain, lekin matlab bilkul alag hai.
Zoom = camera wahin khada, sirf lens badla. Background ka rishta same rehta hai. Matlab: "dekho, dhyaan do."
Push-in = camera sach me chal ke paas gaya. Background peeche chhoot jaata hai. Matlab: "andar aa jao."
Push me parallax milta hai — paas ki cheez zyada hilti hai, door ki kam. Yehi depth ka ehsaas deta hai, aur yehi mehnga lagta hai.
Zoom galat nahi hai. Bas usse tab mat use karo jab camera hilana mushkil lag raha ho — wo audience ko feel ho jaata hai.`,
    visuals: [
      {
        component: 'ZoomVsPush',
        caption:
          'Both panels keep the subject exactly the same size at every point of the move. The only difference is what happens to the background — which is the entire difference between the two moves.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'Vertigo',
        year: 1958,
        shot: 'The view down the bell-tower stairwell, dollying back while zooming in, so the stairwell stretches away while its framing holds.',
        why: 'The shot was devised for this film to externalise vertigo. It works because the brain cannot reconcile stable framing with shifting perspective, which is exactly what the character is experiencing.',
      },
      {
        kind: 'work',
        title: 'Jaws',
        year: 1975,
        shot: 'Brody on the beach as he registers the attack, the camera dollying in while the lens zooms out, the background beach stretching behind him.',
        why: 'The framing on his face barely changes, so the performance stays readable, while the world behind him becomes unstable. The technique carries the realisation instead of a reaction shot doing it.',
      },
    ],
    commonMistakes: [
      'Using a zoom because moving the camera was inconvenient. The audience cannot name what is wrong, but the shot reads as television rather than film.',
      'Calling a scale-up in After Effects a push-in. Scaling a finished frame is a zoom by definition — no new perspective information exists in the pixels.',
      'Using a dolly zoom because it looks impressive. It is a statement about a character losing their footing; deployed casually it just announces that somebody learned a trick.',
    ],
    aiTranslation: `Video models treat these as genuinely different requests, and knowing which one you are asking for is the difference between a usable shot and a morphing mess.

**"Zoom in" is the cheap, safe prompt.** Most image-to-video models implement it close to a scale of the existing frame. Little new information is required, so artifacts are rare — but you often get softness as the model upscales into the crop.

**"Dolly in" or "push in, camera moves toward the subject" is the expensive prompt.** The model now has to invent parallax: new background must appear at the edges, occluded areas must be filled, and relative sizes must change correctly. This is precisely where Wan, LTX and Kling break — you get warping edges, background drift, and objects that swim past each other at the wrong rates.

**Practical rule for 8GB:** if the shot only needs emphasis, prompt a slow zoom and accept it. If the shot genuinely needs the audience moved, prompt the push, generate several takes, and budget for throwing most of them away. Keep the move short — one to two seconds of travel — and keep the background simple, because every extra object is another thing to reconstruct wrong.

**Faking a push properly in comp — and this is your skill already.** Roto the subject, patch the plate behind them, put subject and background on separate cards at different depths, and animate a real 3D camera forward. You now have genuine parallax that the model could not produce, and you controlled it frame-perfectly. A 2D scale is a zoom; a multi-plane setup is a push. That distinction is worth money.

**Dolly zoom in an AI pipeline:** do not prompt for it. No current model holds subject scale steady while altering background perspective. Build it in Nuke — scale the background card up while pulling the camera back so the subject holds size. It is a twenty-minute setup and it looks correct because it *is* correct.`,
    terms: ['zoom', 'push-in', 'dolly', 'dolly-zoom'],
    checks: [
      {
        id: 'c1',
        prompt: 'A shot ends on the same framing whether you zoomed or pushed. What tells the audience which one happened?',
        options: [
          'The background — it changes size and coverage during a push, but not during a zoom',
          'The exposure shifting during the move',
          'The frame rate of the shot',
          'Nothing — the two are visually identical',
        ],
        answerIndex: 0,
        why: 'A push changes camera distance, so subject and background scale at different rates and the field of view narrows. A zoom magnifies everything uniformly.',
      },
      {
        id: 'c2',
        prompt: 'Why does a push-in feel more expensive than a zoom?',
        options: [
          'It produces parallax, which carries real information about the shape of the space',
          'It requires more expensive lenses',
          'It always uses a slower shutter',
          'It records at a higher resolution',
        ],
        answerIndex: 0,
        why: 'Parallax is our strongest depth cue. A zoom contains none, so the viewer receives no new information about the space.',
      },
      {
        id: 'c3',
        prompt: 'You scale a finished AI frame up over time in After Effects. What have you made?',
        options: [
          'A zoom — no new perspective information exists in those pixels',
          'A push-in, because the subject gets closer',
          'A dolly zoom',
          'A rack focus',
        ],
        answerIndex: 0,
        why: 'Scaling a flat image magnifies everything uniformly. Perspective can only change if the viewpoint changes, which needs either a real move or a multi-plane rebuild.',
      },
    ],
    assignment: {
      brief:
        'Take one still — generated or photographed — with a clear subject and a readable background. Produce two five-second moves from it: a plain 2D scale-up, and a genuine push built by rotoscoping the subject, patching the background, and animating a camera across two cards at different depths. Same start and end framing on both.',
      deliverable: 'Two five-second clips, exported side by side or back to back.',
      timeboxMinutes: 90,
      successCriteria: [
        'Both clips start and end on visibly the same framing, so the comparison is fair.',
        'In the multi-plane version the background moves at a measurably different rate to the subject, and the edges of the subject hold up without haloing.',
        'You can describe, in one sentence, which of the two you would deliver to a client and what specifically gives the other one away.',
      ],
      usesTools: ['Nuke', 'FLUX Schnell'],
    },
  },

  // ─────────────────────────────────── 5 ───────────────────────────────────
  {
    id: 'camera-sensor-and-crop-factor',
    trackId: 'camera',
    moduleId: 'lens-and-perspective',
    order: 5,
    title: 'Sensor size, crop factor, and what "35mm" actually means',
    oneLine: 'A millimetre number means nothing until you say which camera.',
    estMinutes: 8,
    prerequisites: ['camera-focal-length'],
    body: `A lens projects a circle of light — its **image circle**. The **sensor** sits inside that circle and takes a rectangular bite out of it. Change the size of the bite and you change the framing, without touching the lens at all.

That is the whole idea, and everything else is bookkeeping.

**Full frame** is 36 x 24mm, the size of a 35mm stills negative, and it is the reference everybody quotes against. **Super 35** is roughly 24.9 x 18.7mm and has been the workhorse of cinema for a century. Below that sit Micro Four Thirds, one-inch sensors in most drones, and the tiny sensors in phones.

**Crop factor** is the ratio of the full-frame diagonal to your sensor’s diagonal. Super 35 is about 1.4x, Micro Four Thirds is 2x, a one-inch drone sensor is about 2.7x, a phone can be 4x or more. Multiply your lens by that number and you get the **equivalent focal length** — the full-frame lens that would frame the same way.

So a 25mm on Super 35 frames like a 35mm on full frame. A 12mm on Micro Four Thirds frames like a 24mm. And your phone’s main camera, whose actual lens is around 5.5mm, frames like a 26mm — which is why phone footage always looks slightly wide and slightly close.

Now the three things people get wrong.

*Equivalence is about framing only.* It tells you what fits in the frame. It says nothing about perspective — that is still purely where you stand — and it does not directly transfer to depth of field, which follows the physical aperture diameter rather than the equivalent number.

*Crop does not magnify.* A smaller sensor does not bring you closer. It throws away the outside of the picture. If you crop a full-frame image in post by the same factor, you get the identical framing.

*A sensor bigger than the image circle gives you dark corners.* That is what happens when you put lenses designed for a small format onto a large-format camera, and it is a real constraint when renting.

The working habit: never say a focal length without a format. "35mm" is not information. "35mm on Super 35" is.`,
    hinglishGloss: `Lens ek gol image banata hai. Sensor us gole me se ek chaukor tukda kaat leta hai. Tukda chhota = kam frame me aayega.
Full frame = 36 x 24mm, yehi standard hai. Super 35 usse chhota, phone bahut chhota.
Crop factor = kitna chhota. Usse multiply karo toh pata chalega frame kaisa aayega. 25mm on Super 35 = 35mm jaisa.
Dhyaan do: crop se cheez paas nahi aati — bas kinaare kat jaate hain. Aur perspective abhi bhi sirf tumhari doori se banta hai.
Isliye kabhi sirf "35mm" mat bolo. Hamesha bolo "35mm on Super 35". Warna baat adhoori hai.`,
    visuals: [
      {
        component: 'SensorCrop',
        caption:
          'Pick a sensor and a lens. The image circle never changes — only how much of it the sensor keeps, and what that does to your framing and field of view.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'The Hateful Eight',
        year: 2015,
        shot: 'The interior scenes in the stagecoach lodge, captured on 65mm negative through Ultra Panavision anamorphic optics for a 2.76:1 frame.',
        why: 'A very large capture area with wide optics fits an entire room and a spread of characters into one frame with no close coverage. The format choice is what allows the film to stage long scenes as ensembles rather than as cutting patterns.',
      },
      {
        kind: 'generic',
        shot: 'The same 25mm lens moved from a Super 35 cinema camera onto a Micro Four Thirds body between setups, with nobody adjusting the camera position.',
        why: 'The framing tightens from a comfortable medium to a close shot. Nothing about the lens or the subject changed — only how much of the projected image the sensor kept, which is exactly the trap that crop factor exists to warn you about.',
      },
    ],
    commonMistakes: [
      'Quoting a focal length without a format and expecting anyone to know what you mean. On a shoot that ambiguity costs a lens swap; in a prompt it costs a regeneration.',
      'Believing a crop sensor gives you extra reach for free. It gives you a tighter crop of the same image, with fewer pixels behind it.',
      'Assuming equivalent focal length also converts depth of field. Framing converts by crop factor; depth of field follows the physical aperture diameter and behaves differently.',
    ],
    aiTranslation: `A diffusion model has no sensor. When you write "35mm" it is matching against captions from every format at once — phone snaps, Super 35 stills, medium format — so the token is a loose style prior, not a geometry instruction. This is why lens numbers in prompts feel unreliable: they genuinely are.

**Prompt framing and distance instead.** "Medium shot from three metres, moderately wide field of view showing the room behind him" is unambiguous in a way "35mm" never is. Keep the millimetre token if you like the look it pulls, but never rely on it alone to control the frame.

**Where this becomes a real production problem: the hybrid pipeline.** The moment you shoot a plate on your phone and place it in an AI-generated environment, you have two cameras with two different geometries. Your phone is roughly a 26mm equivalent — wide, with visible perspective stretch on anything close. If the AI environment reads as an 85mm compressed background, the composite will never sit, and no amount of grading and grain matching will rescue it. Viewers will call it fake without knowing why.

**So work in this order.** Shoot the plate first. Note its equivalent focal length and its camera height. Then prompt the environment to match that geometry explicitly — "wide angle view, deep space receding, camera at chest height" — rather than generating something beautiful and hoping the plate drops into it.

**In Nuke:** a 3D camera needs a focal length and a filmback before it can do anything useful. For an AI plate you have to estimate both. Use straight lines that should be parallel — building edges, floor tiles, table sides — and read their vanishing points, or measure a known object such as a bottle or a door. Getting this approximately right is what makes a tracked element sit in the plate; getting it wrong is what makes it float.`,
    terms: ['sensor', 'full-frame', 'super-35', 'crop-factor', 'equivalent-focal-length', 'image-circle'],
    checks: [
      {
        id: 'c1',
        prompt: 'You put a 25mm lens on a Super 35 camera, crop factor roughly 1.4x. What full-frame lens frames the same way?',
        options: ['About 35mm', 'About 18mm', 'About 50mm', 'Still 25mm — focal length does not change'],
        answerIndex: 0,
        why: 'Multiply the focal length by the crop factor: 25 x 1.4 is about 35. The lens itself is unchanged; only the framing is being described in full-frame terms.',
      },
      {
        id: 'c2',
        prompt: 'Does a smaller sensor bring the subject closer?',
        options: [
          'No — it discards the outside of the image, which is identical to cropping in post',
          'Yes, it magnifies the centre of the image',
          'Yes, but only with telephoto lenses',
          'No, it changes perspective instead',
        ],
        answerIndex: 0,
        why: 'The lens projects the same image circle regardless. A smaller sensor simply keeps less of it, exactly as a crop in post would.',
      },
      {
        id: 'c3',
        prompt: 'You shoot a plate on your phone and generate a compressed, long-lens-looking AI background for it. What goes wrong?',
        options: [
          'The two have contradictory geometry, so the composite never sits no matter how well you grade it',
          'The colours will not match',
          'The frame rates will conflict',
          'Nothing — perspective does not matter in compositing',
        ],
        answerIndex: 0,
        why: 'A phone is roughly a 26mm equivalent with visible perspective stretch. Dropping it into an 85mm-looking background is two cameras in one shot, and viewers read it as fake immediately.',
      },
    ],
    assignment: {
      brief:
        'Shoot one plate on your phone of a simple object on a table, noting roughly how far you stood. Then generate two AI backgrounds for it in FLUX: one prompted as a wide, deep space matching your phone geometry, and one prompted as a compressed long-lens background. Composite the object into both.',
      deliverable: 'Two composites from the same plate, plus one line of notes on each.',
      timeboxMinutes: 60,
      successCriteria: [
        'The matched-geometry composite has the object sitting in the space, with background lines converging consistently with the object edges.',
        'The mismatched composite visibly fails, and you can point at the specific cue that gives it away rather than just saying it feels wrong.',
        'You wrote down the approximate equivalent focal length of your phone plate before generating anything.',
      ],
      usesTools: ['Phone camera', 'FLUX Schnell', 'Nuke'],
    },
  },

  // ─────────────────────────────────── 6 ───────────────────────────────────
  {
    id: 'camera-aspect-ratio-and-safe-areas',
    trackId: 'camera',
    moduleId: 'lens-and-perspective',
    order: 6,
    title: 'Aspect ratio and safe areas — the shape is a decision',
    oneLine: 'Frame shape changes staging, and platforms will crop what you ignore.',
    estMinutes: 8,
    prerequisites: ['camera-focal-length'],
    body: `**Aspect ratio** is the proportion of frame width to height. It is a creative decision that changes how you stage a scene, not a technical setting you inherit from your camera.

The ratios you will actually use:

- *1.33 (4:3)* — tall and boxy. Archive, academy, and any time you want intimacy or a deliberate period feel.
- *1.78 (16:9)* — YouTube, broadcast, the default of the internet.
- *1.85* — the quieter theatrical standard, barely wider than 16:9.
- *2.39 (scope)* — very wide. Landscape, spectacle, and huge lateral negative space between two people.
- *9:16* — vertical. Reels, Shorts, TikTok. Where most paid short-form work now lands.
- *1:1* — square, for feeds that will crop both ways.

Ratio changes staging, which is the part people miss. A 2.39 frame makes it natural to place two characters at opposite edges with emptiness between them, and makes headroom precious. A 9:16 frame cannot do that at all — it forces you to stack information vertically, to shoot tighter, and to put your subject dead centre. Wide frames are about relationships across space. Tall frames are about one thing at a time.

Then there are **safe areas**, which exist because your frame will be cropped by things you do not control. Action safe, an inset of a few percent, protects important movement. Title safe, tighter still, protects text and logos. On social platforms the real hazard is the interface: captions, usernames, buttons and progress bars cover roughly the bottom fifth and part of one side of a vertical video. Treat that as a dead zone from the first storyboard.

Two mechanical points. **Letterbox** means fitting a wide image inside a taller frame with black bars. Bars baked into a delivery file cost you pixels and stop the platform cropping intelligently, so bake them only when the client asks. And **anamorphic** optics achieve a wide ratio by squeezing the image onto a normal sensor and unsqueezing later — which also brings oval bokeh and horizontal streak flares, so it is a look, not just a shape.

The rule that saves the most work: decide the delivery ratio before you shoot or generate anything, and compose for it. Reframing later always costs you something.`,
    hinglishGloss: `Aspect ratio = frame ka shape. Ye creative decision hai, camera ka default setting nahi.
2.39 wide frame me do log dono kinaare par khade ho sakte hain, beech me khaali jagah — rishta dikhta hai.
9:16 vertical me ye possible hi nahi. Wahan sab kuch upar-neeche stack hota hai aur subject beech me aata hai.
Safe area yaad rakho: Reels me neeche ka lagbhag 20% caption aur buttons kha jaate hain. Wahan kuch important mat rakho.
Sabse bada rule: delivery ratio pehle decide karo, phir shoot ya generate karo. Baad me crop karne me hamesha nuksaan hota hai.`,
    visuals: [
      {
        component: 'AspectRatioFrames',
        caption:
          'Switch ratios and watch the staging options change. Turn on the 9:16 overlay to see how little of a wide frame survives a vertical crop.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'The Grand Budapest Hotel',
        year: 2014,
        shot: 'The film changes aspect ratio by era — a boxy 1.37 frame for the 1930s sections, widescreen for the later timelines.',
        why: 'The frame shape itself tells you which decade you are in before any other cue arrives, and the tall 1930s frame naturally produces the centred, formal, doll-house staging that period requires.',
      },
      {
        kind: 'work',
        title: 'Mommy',
        year: 2014,
        shot: 'The film is staged in a 1:1 square frame, which the character physically pushes open into widescreen during a moment of freedom.',
        why: 'The square frame keeps the characters boxed and close for the whole film, so when the ratio widens the release is felt physically rather than understood intellectually. Frame shape is used as a story beat.',
      },
    ],
    commonMistakes: [
      'Shooting or generating in 16:9 and cropping to 9:16 for delivery. You throw away most of the width and the subject is almost never where the vertical frame needs it.',
      'Placing captions or a logo near the bottom of a vertical frame, where the platform interface will sit directly on top of them.',
      'Treating 2.39 as automatically more cinematic. A wide frame with nothing staged across it is just a 16:9 image with less picture in it.',
    ],
    aiTranslation: `Aspect ratio is one of the few prompt parameters that is genuinely mechanical rather than suggestive — and it changes more than the shape.

**Generate at your delivery ratio, always.** Models were trained on differently framed images per aspect, so a vertical generation does not merely crop a horizontal one — it composes differently, usually tighter and more centred, which is what you want for vertical anyway. Generating 16:9 and cropping to 9:16 discards about two-thirds of the width and puts your subject in the wrong place.

**On 8GB of VRAM, ratio is a budget decision.** What costs you memory is total pixel count, not shape. A 1024 x 1024 square and a 1344 x 768 wide frame cost roughly the same. Pick the ratio you need, then set the resolution ladder to fit the card — generate small, check composition, upscale the keeper.

**Delivering both wide and vertical.** Do not generate twice and hope for continuity, because the character will drift. Generate the vertical master, then extend outward with generative expand or outpainting to build the wide version. The subject stays identical and only the edges are invented, which is the cheap half.

**Design for the dead zone from the storyboard stage.** In a vertical ad the bottom fifth belongs to the platform. If your product lands there in the generated still, you will be re-generating rather than nudging, because moving a subject in a finished frame means repainting the background behind it.

**In After Effects or Nuke:** keep an overlay of both the title-safe box and the 9:16 crop on the comp from the first day of a project. Every reframe you catch during comp is one you did not catch after a client approved the wide version — and that is the version they will ask you to also deliver vertically, always at the end.`,
    terms: ['aspect-ratio', 'letterbox', 'safe-area', 'anamorphic'],
    checks: [
      {
        id: 'c1',
        prompt: 'Why does a 2.39 frame change how you stage two characters?',
        options: [
          'It makes lateral negative space between them natural, and headroom scarce',
          'It gives you more vertical room for gesture',
          'It forces the subject to be centred',
          'It has no effect on staging, only on the look',
        ],
        answerIndex: 0,
        why: 'A wide frame is about relationships across space. Vertical frames force stacking and centring instead.',
      },
      {
        id: 'c2',
        prompt: 'You must deliver both a 16:9 and a 9:16 version of an AI-generated ad. What is the right order?',
        options: [
          'Generate the vertical master, then extend outward to build the wide version',
          'Generate 16:9 and crop the middle for vertical',
          'Generate both independently at the same seed',
          'Generate square and letterbox both ways',
        ],
        answerIndex: 0,
        why: 'Extending outward keeps the subject identical and only invents edges. Cropping inward throws away most of the width and misplaces the subject.',
      },
      {
        id: 'c3',
        prompt: 'What sits in the bottom fifth of a vertical social video?',
        options: [
          'Platform interface — captions, usernames, buttons — so treat it as a dead zone',
          'The title-safe area, which is the safest part of the frame',
          'Nothing, provided you deliver at full resolution',
          'The letterbox bars',
        ],
        answerIndex: 0,
        why: 'That band is covered by the app. Anything important placed there is invisible to the viewer regardless of how the file was mastered.',
      },
    ],
    assignment: {
      brief:
        'Take one advertising idea — any product you own will do. Generate the same hero still three times in FLUX at three ratios: 9:16, 1:1 and 16:9, each generated natively rather than cropped. Then overlay a title-safe box and the platform dead zone on the vertical one.',
      deliverable: 'Three stills at three ratios, plus the vertical one with safe-area overlays drawn on.',
      timeboxMinutes: 45,
      successCriteria: [
        'All three were generated at their own ratio, not cropped from one another, and the composition genuinely differs between them.',
        'On the vertical version, nothing important falls inside the bottom fifth or outside the title-safe box.',
        'You can say which of the three ratios suits this particular product best, and give a staging reason rather than a taste reason.',
      ],
      usesTools: ['FLUX Schnell', 'Any image editor'],
    },
  },
]
