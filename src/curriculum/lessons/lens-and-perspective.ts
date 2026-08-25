import type { Lesson } from '../schema'

/**
 * Track A, Module 1 — Lens & Perspective.
 *
 * Each lesson states the definition once in English, because those are the
 * words used on a real set and inside a real prompt, and then does all of the
 * actual teaching in Hinglish with examples the learner can picture.
 */
export const LENS_AND_PERSPECTIVE: Lesson[] = [
  // ─────────────────────────────────── 1 ───────────────────────────────────
  {
    id: 'camera-focal-length',
    trackId: 'camera',
    moduleId: 'lens-and-perspective',
    order: 1,
    title: 'Focal length — lens ek feeling hai, zoom nahi',
    oneLine: '24mm aur 85mm do bilkul alag emotions kyun hain.',
    estMinutes: 9,
    prerequisites: [],
    definitionEn:
      'Focal length is the distance in millimetres from a lens’s optical centre to the sensor. It sets the field of view — how much of the world the frame includes — and, because any given framing forces you to stand at a particular distance, it shapes how the space inside the frame feels.',
    body: `Lens par jo number likha hota hai — 24mm, 50mm, 85mm — usko **focal length** kehte hain. Zyadatar log samajhte hain ki ye "kitna zoom" ka number hai. Nahi hai.

Ye do cheezein decide karta hai. Pehli: frame me kitna aayega, jise **field of view** kehte hain. Doosri, aur yehi asli hai: frame ke andar cheezein ek dusre se kitni paas ya door lagengi.

*Teen family hain:*

- **wide lens** (12–35mm) — bahut kuch frame me aa jaata hai, aur jagah khinchi hui lagti hai.
- **normal lens** (40–58mm) — jo tumhari aankh dekhti hai lagbhag wahi. Na drama, na exaggeration.
- **telephoto lens** (85mm se upar) — patli si slice dikhti hai, aur sab kuch chipka hua lagta hai.

Ab asli baat. Field of view toh aasan hissa hai — wo tum chal ke bhi theek kar sakte ho. Asli cheez hai **perspective**, aur dhyaan se suno: perspective lens se banta hi nahi. Wo banta hai **camera-to-subject distance** se — yaani tum kitni door khade ho.

*Ek experiment socho.* Apne dost ka chehra frame me poora bharna hai.

Pehle 24mm lagao. Chehra bharne ke liye tumhe bilkul paas jaana padega — lagbhag 40cm. Ab socho: uski naak tumse 40cm door hai, lekin kaan lagbhag 48cm. Matlab naak kaano se kaafi zyada paas hai. Jo paas hota hai wo bada dikhta hai — toh naak phool ke aayegi. Isko **wide-angle distortion** kehte hain.

Ab 85mm lagao. Wahi chehra bharne ke liye tumhe 2 meter peeche jaana padega. Ab naak 2m par hai aur kaan 2.08m par — farak lagbhag zero. Isliye chehra flat aur achha aayega.

Wahi chehra. Wahi framing. Lekin feeling bilkul alag — kyunki *tum hile*.

Yehi wajah hai ki lambe lens par **perspective compression** hota hai. Door se dekho toh saari cheezein lagbhag barabar door hain, isliye aage-peeche wali cheezein taash ke patton ki tarah ek dusre par chipak jaati hain. Ek sadak 200mm par bheed-bhaad aur ghutan bhari lagegi. Wahi sadak 24mm par khaali aur lambi.

*Toh feeling kya banti hai:*

- Wide — tum *andar* ho. Ghuse hue, exposed, kabhi-kabhi bhadda.
- Normal — tum *dekh rahe ho*. Seedha, imaandaar, bina natak.
- Telephoto — tum *bahar se nazar rakh rahe ho*. Chupke se dekhna, akelapan. Ya ghutan, kyunki background unke peeche chipka hua hai.

Aur sabse zaroori line: **zoom** karna aur chal ke paas jaana do alag cheezein hain. Zoom sirf crop badalta hai — camera toh wahin khada hai. **Push-in** me tum sach me paas jaate ho, isliye poori duniya ka rishta badal jaata hai. Zoom kehta hai "dekho". Paas jaana kehta hai "andar aa jao".

*Kaam ka tareeka:* pehle socho background subject par dabaav daale ya door hat jaaye. Usse tumhari khadi hone ki jagah tay hogi. Lens uske baad.`,
    visuals: [
      {
        component: 'FocalLengthDial',
        caption:
          'Slider ghumao. Subject har setting par bilkul same size ka rehta hai, isliye jo badal raha hai wo sirf perspective hai — dekho background kaise phoolta hai aur kinare wali cheezein frame se bahar ho jaati hain.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'The Graduate',
        year: 1967,
        shot: 'Benjamin church ki taraf poori taaqat se bhaagta hai, lekin shot lambe lens par liya gaya hai — lagta hai wo bhaag toh raha hai par aage badh hi nahi raha.',
        why: 'Compression aage badhne ka signal hi mita deta hai. Audience ko mehnat dikhti hai par progress nahi. Scene ki ghabrahat acting se nahi, geometry se aa rahi hai.',
      },
      {
        kind: 'work',
        title: 'The Shining',
        year: 1980,
        shot: 'Danny apni tricycle par hotel ke corridors me ghoomta hai — camera neeche, wide lens, aur corridor aage ki taraf khinchta chala jaata hai.',
        why: 'Wide lens gehrai ko badha deta hai, isliye har corridor asli se lamba lagta hai. Hotel building ke hisaab se jitna bada ho sakta hai, usse bada mehsoos hota hai — film ko yahi chahiye tha.',
      },
    ],
    commonMistakes: [
      'mm ko zoom ka knob samajhna — framing ke liye lens badal dena aur camera kabhi na hilana. Framing tumhara aakhri faisla hona chahiye, pehla nahi.',
      'Chehre ko 24–35mm par shoot karna kyunki "zyada frame me aa jaata hai" — phir sochna ki sab log halke se ajeeb kyun lag rahe hain.',
      'Ye maan lena ki telephoto matlab background blur. Blur aperture aur doori se aata hai; chipakna sirf doori se. Do alag control hain, log inhe ek samajh lete hain.',
    ],
    aiTranslation: `Diffusion model ke andar koi lens hai hi nahi. Jab tum "85mm" likhte ho toh wo optics nahi samajhta — wo un photos ki taraf jaata hai jinke caption me 85mm likha tha (portrait, blur background, achhi skin). Matlab wo ek *look* hai, geometry nahi. Isiliye prompt me mm number bharosemand nahi lagta — wo sach me nahi hai.

*Toh number ki jagah nateeja likho.* "Shot from across the street on a long lens, background buildings stacked flat behind her, subject cleanly separated" — ye "85mm" se bahut behtar kaam karega. Ulta chahiye toh: "camera close to her face, wide lens, background falling away fast toward a deep horizon."

*Kya toot-ta hai:* model aksar aisi cheez de deta hai jo ho hi nahi sakti — wide field of view lekin background telephoto ki tarah chipka hua, ya wide-angle chehra lekin bhaari blur. Dekhte hi nakli lagta hai aur log bata nahi paate kyun. Ab tum bata sakte ho.

*AI face drift ki chhupi hui wajah:* shot 3 me character 24mm par bana aur shot 4 me 85mm par — toh wo sach me *alag shakal* ka chehra hai, naak aur kaan ka anupaat badal gaya. Isliye har character ke liye lens ki bhasha waise hi lock karo jaise kapde lock karte ho.

*Image se video banate waqt:* telephoto plate zyada safe hota hai. Parallax kam hota hai, matlab model ko background kam banana padta hai, matlab morphing aur warping kam. Agar shot me movement chahiye hi, toh use long lens par generate karo.

*Nuke ya After Effects me:* perspective generate hote waqt hi pakka ho jaata hai. Tum crop kar sakte ho, halka sa push 2D scale se fake kar sakte ho — lekin 24mm chehre ko 85mm chehra nahi bana sakte bina asli 3D kaam ke. Ye galti comp me nahi sudharti. Isliye pehle hi sahi karo.`,
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
        prompt: 'Chehra frame me poora bharna hai aur tumhare paas sirf 85mm hai. Kya badloge?',
        options: [
          'Apni doori — peeche chal ke jao',
          'Aperture, taaki zyada frame me aaye',
          'Sensor, chhote wale par switch karo',
          'Kuch nahi — 85mm se chehra bhara hi nahi ja sakta',
        ],
        answerIndex: 0,
        why: 'Lens aur doori jodi me chalte hain. Framing chal ke theek karo; lens sirf ye decide karta hai ki chalte waqt perspective kaisa milega.',
      },
      {
        id: 'c2',
        prompt: 'Background subject ke bilkul peeche chipka hua lag raha hai. Iske peeche asli wajah kya hai?',
        options: [
          'Camera ki doori — lamba lens sirf wo crop hai jisse ye dikhta hai',
          'Khud lamba lens, jo roshni ko andar mod deta hai',
          'Khula hua aperture',
          'Frame ka aspect ratio',
        ],
        answerIndex: 0,
        why: 'Door se shoot karne par sab cheezein lagbhag barabar door hoti hain, isliye alag-alag gehrai ek jaisi size me aati hai. Telephoto sirf usme crop karta hai.',
      },
      {
        id: 'c3',
        prompt: 'Zoom karne se sirf ____ badalta hai; camera ko chala ke le jaane se ____ badalta hai.',
        options: [
          'framing / perspective',
          'perspective / framing',
          'exposure / framing',
          'focus / depth of field',
        ],
        answerIndex: 0,
        why: 'Zoom ke dauraan camera hila hi nahi, isliye subject aur background ka rishta waisa ka waisa hai. Chal ke jaane se dekhne ki jagah badal jaati hai.',
      },
    ],
    assignment: {
      brief:
        'Ek subject chuno — chehra, ya table par rakhi bottle. FLUX me use do baar banao: ek baar "camera bilkul paas, wide lens" likh ke, doosri baar "kaafi door se, long lens" likh ke. Dono me framing barabar rakhna — subject frame me utni hi jagah le. Sirf perspective badalna chahiye.',
      deliverable: 'Do stills, ek hi image me saath-saath, label ke saath.',
      timeboxMinutes: 30,
      successCriteria: [
        'Dono images me subject lagbhag utni hi jagah le raha hai. Agar ek bada hai toh tumne perspective nahi, framing badli — test bekaar ho gaya.',
        'Wide wali me background saaf taur par door aur chauda hai; long wali me background ki cheezein badi hain aur subject ke peeche chipki hui.',
        'Tum ek line me bata sakte ho ki is subject ke liye kaun sa chunoge aur kyun — aur wajah emotion ki honi chahiye, sharpness ki nahi.',
      ],
      usesTools: ['FLUX Schnell', 'Koi bhi image viewer'],
    },
  },

  // ─────────────────────────────────── 2 ───────────────────────────────────
  {
    id: 'camera-perspective-compression',
    trackId: 'camera',
    moduleId: 'lens-and-perspective',
    order: 2,
    title: 'Compression — doori duniya ko chipka deti hai',
    oneLine: 'Bheed, traffic aur pahaad long lens par thuse hue kyun lagte hain.',
    estMinutes: 8,
    prerequisites: ['camera-focal-length'],
    definitionEn:
      'Perspective compression is the flattening of apparent depth that happens when you shoot from far away: because everything is roughly equally distant, objects at different depths render at similar sizes and stack together. It is usually credited to long lenses, but camera distance is the actual cause.',
    body: `**Perspective compression** ka matlab hai — door se shoot karo toh gehrai chapti ho jaati hai. Commercial kaam me ye sabse kaam aane wala effect hai, aur lagbhag har jagah galat samjhaya jaata hai.

Galat samajh ye hai ki "long lens compress karta hai". Nahi. *Doori* compress karti hai. Lamba lens sirf wo crop hai jisse tum itni door se dekh paate ho ki farak nazar aaye.

*Ganit bahut simple hai, aur ye dimag me rakhne layak hai.* Koi cheez kitni badi dikhegi, ye uski doori par depend karta hai — jitna door, utna chhota.

Ek insaan se 2 meter door khade ho. Uske 6 meter peeche doosra insaan hai. Pehla 2m par, doosra 8m par — chaar guna door, toh wo chauthai size ka dikhega. Bada farak.

Ab tum peeche hat ke 30 meter par chale jao. Pehla ab 30m par, doosra 36m par — sirf 1.2 guna door. Ab doosra pehle ka 83% dikhega. Dono log apni jagah se hile tak nahi. Unka rishta badla kyunki *tum* hile.

Yehi collapse tum khareed rahe ho. Isse milta kya hai:

- **layering** jo phailne ke bajaye chipak jaati hai. Logon ki katarein, gaadiyon ki line, pahaad ke peeche pahaad — sab ek bheed bhare talé me dab jaate hain.
- Background jo kamre ki tarah nahi, deewar ki tarah lagta hai. Long lens par subject apne background ke saamne *phansa hua* hota hai, kamre me khada nahi.
- Bada background. Door ki building subject ke peeche tabhi badi aayegi jab tum kaafi peeche khade ho, warna nahi.
- **parallax** lagbhag khatam. Camera bagal me hile toh paas aur door dono utna hi khisakte hain, isliye duniya flat painting jaisi lagti hai.

Ulta bhi utna hi kaam ka hai. Paas se wide lens par gehrai phail jaati hai: kamra bada lagta hai, corridor lamba, lens ki taraf badhaya hua haath chhote chehre ke saamne bahut bada. Yehi tareeka hai chhote set ko bada dikhane ka.

*Director ka rule:* pehle ye decide karo ki background subject par dabaav daalega ya unse door hat jaayega. Wahi tumhari khadi hone ki jagah tay karega. Lens uske peeche aayega.`,
    visuals: [
      {
        component: 'CompressionStack',
        caption:
          'Teen log hamesha 6m aur 16m ki doori par khade hain — hilte nahi. Camera ko peeche khinchо aur dekho unke beech ka gap kaise gayab hota jaata hai. Sirf tum hile ho.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'Ran',
        year: 1985,
        shot: 'Ladai ke sequences door se lambe lens par shoot kiye gaye hain, jisme aage badhti sena ki katarein ek hi rang ki thos deewar ban jaati hain.',
        why: 'Compression kataron ke beech ki khaali jagah hata deta hai, isliye sena alag-alag logon ki jagah ek na tootne wali bheed lagti hai — bhaagne ki koi jagah hi nahi bachti. Kahani frame ki shakal se keh di gayi.',
      },
      {
        kind: 'generic',
        shot: 'Sheher ke traffic ka wo aam sa shot: seedhi sadak par bahut door se lamba lens, aur gaadiyan ek dusre se sati hui.',
        why: 'Asal me gaadiyon ke beech normal gap hai. Kai sau meter door se wo gap khatam ho jaata hai — isi tarah thodi si busy sadak ko jam dikhaya jaata hai. Ads aur news dono me ye roz hota hai.',
      },
    ],
    commonMistakes: [
      '"Long lens ne compress kar diya" bol ke ruk jaana. Agar tum lens ko wajah maanoge toh agli baar aur lamba lens uthaoge, jabki zaroorat peeche hatne ki thi.',
      'Chhote set ko bada dikhane ke liye long lens use karna. Compression ulta karta hai — kamre ko deewar bana deta hai. Chhoti jagah ko wide lens aur gehrai chahiye.',
      'Ye bhool jaana ki compression parallax maar deta hai. Compressed shot me camera hilao toh ajeeb sa flat aur nakli lagega, kyunki jo depth ka signal aankh chahti hai wo aata hi nahi.',
    ],
    aiTranslation: `Chhote GPU par compression sabse kaam ki cheez hai jo tum prompt kar sakte ho, aur lagbhag koi jaan-boojh ke use nahi karta.

*Lens ke saath doori bhi likho.* "Long lens, shot from far across the road, background buildings stacked directly behind her with no visible gap, flattened depth" — isse compression milega. Sirf "telephoto" likhoge toh aksar bas blur background mil jaata hai, kyunki training data me wahi caption saath aata tha.

*8GB par ye kyun matter karta hai:* compressed shot me parallax lagbhag nahi hota. Jab tum wo still Wan 2.2 ya LTX me daalte ho, model ko background ki geometry bahut kam banani padti hai — toh morphing artifacts kam, texture crawl kam, background drift kam. Compressed plate *maaf karne wala* plate hota hai. Agar shot ko movement jhelni hai, toh use long compose karo.

*Kya toot-ta hai:* model aksar bemel cheez deta hai — wide field of view jisme poori sadak dikh rahi hai, lekin door ki buildings telephoto scale me. Ye subject ke peeche lagi painting jaisa lagta hai. Ilaaj: batao ki frame me kya *nahi* aana chahiye — "narrow field of view, only the subject and the wall behind, nothing of the street visible."

*Nuke me:* agar subject aur background alag-alag generate kiye hain, toh compression tum khud bana sakte ho — dono ko cards par rakho, camera peeche le jao aur usi move me focal length badhao. Ye asli 2.5D multi-plane setup hai, aur yehi tareeka hai wo lens choice wapas paane ka jo model ne diya hi nahi. AI footage me dhang ka **dolly zoom** paane ka bhi yehi ek raasta hai.`,
    terms: ['perspective-compression', 'parallax', 'layering'],
    checks: [
      {
        id: 'c1',
        prompt: 'Subject ke peeche door wala pahaad bahut bada dikhana hai. Kya karoge?',
        options: [
          'Subject se kaafi door hat jao aur long lens se reframe karo',
          'Subject ke paas jao aur wide lens lagao',
          'Apni jagah par rehke aperture khol do',
          'Camera ki height badha do',
        ],
        answerIndex: 0,
        why: 'Pahaad tabhi bada aayega jab subject tak ki doori pahaad tak ki doori ka bada hissa ban jaaye. Uske liye peeche hatna padta hai.',
      },
      {
        id: 'c2',
        prompt: 'Do log 6 meter ki doori par khade hain. Kis jagah se dono lagbhag ek jaise size ke lagenge?',
        options: [
          'Tees meter door se',
          'Do meter door se',
          'Chhe meter door se',
          'Doori se unke size ka koi lena-dena nahi',
        ],
        answerIndex: 0,
        why: '30m par dono 30m aur 36m par hain — mamuli farak. Paas se wahi 6m ka gap chaar guna ka farak ban jaata hai.',
      },
      {
        id: 'c3',
        prompt: 'Compressed shot me camera bagal me chale toh flat aur ajeeb kyun lagta hai?',
        options: [
          'Parallax lagbhag zero hota hai, isliye depth ka signal aata hi nahi',
          'Long lens ko smooth chalaya nahi ja sakta',
          'Focal length ke saath shutter angle badal jaata hai',
          'Compression frame rate kam kar deta hai',
        ],
        answerIndex: 0,
        why: 'Paas aur door dono lagbhag barabar doori par hain, toh dono utna hi khisakte hain. Barabar khisakna aankh ko flat surface lagta hai.',
      },
    ],
    assignment: {
      brief:
        'Koi asli jagah dhundo jisme saaf gehrai ho — corridor, khadi bikes ki line, khambon wali sadak. Phone se do photo lo: ek bilkul paas se (sabse najdeek wali cheez ke paas khade ho ke), doosri jitna peeche ja sakte ho utna door se, zoom karke — taaki sabse najdeek wali cheez dono me utni hi badi rahe. Baad me crop mat karna.',
      deliverable: 'Do phone photos, najdeek wali cheez dono me same size, saath-saath.',
      timeboxMinutes: 25,
      successCriteria: [
        'Sabse najdeek wali cheez dono frames me lagbhag ek jaisi badi hai, warna comparison imaandaar nahi rahega.',
        'Door wali photo me line ke peeche wali cheezein najdeek wali ke mukable saaf taur par badi hain, aur unke beech ka gap chhota lagta hai.',
        'Tum kisi ek jodi ki taraf ungli karke bata sakte ho ki unke beech ka gap kitna kam dikhne laga.',
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
    title: 'Wide-angle distortion — aur jaan-boojh ke iska istemaal',
    oneLine: 'Paas se chehra kyun phoolta hai, aur kab ise phoolne dena chahiye.',
    estMinutes: 8,
    prerequisites: ['camera-focal-length'],
    definitionEn:
      'Wide-angle distortion is the stretching of features that occurs when the camera is very close to a subject: parts nearer the lens render disproportionately large. It is a consequence of camera distance, not a defect of the lens, which is why stepping back cures it.',
    body: `**Wide-angle distortion** wo khinchav hai jo tab hota hai jab camera subject ke bahut paas ho.

Socho naak kaano se lagbhag 10cm aage hai. Agar tum 40cm door ho, toh 10cm poori doori ka chauthai hissa hai — bahut bada farak. Isliye naak apni asli size se lagbhag ek tihai bada render hota hai. Ab 2 meter door se wahi 10cm mamuli baat hai, aur chehra normal aata hai.

Dhyaan do iska matlab kya hai. Lens kuch galat nahi kar raha. Wo bilkul imaandaari se wahi dikha raha hai jo sach me space me ho raha hai. Hum **wide lens** ko doshi isliye maante hain kyunki 40cm se frame bharne ka ek hi tareeka hai — wide lens. Dono hamesha saath aate hain, isliye ilzaam lens par chala jaata hai.

*Ek asli lens ki kharabi bhi hoti hai jo isme mila di jaati hai, aur inhe alag rakhna zaroori hai.* **Barrel distortion** me seedhi lines frame ke kinaron par bahar ki taraf mud jaati hain. *Wo* sach me kaanch ki property hai, doori se uska koi lena-dena nahi, aur post me lens profile se theek ho jaati hai. Perspective wala khinchav theek nahi hota — wo tumhari khadi hone ki jagah me pak chuka hai.

Isiliye **portrait length** naam ki cheez hai. 85–135mm ka lens tumhe do meter ya usse zyada door khade hone par majboor karta hai, aur us doori par chehre ke saare hisse lagbhag barabar door hote hain. Photographers ne ye focal lengths sharpness ke liye nahi chuni thi. Unhone wo *doori* ke liye chuni thi jo ye lens thop dete hain.

*Toh distortion kab chahiye hota hai?*

- *Gussa aur khatra.* Wide lens ki taraf jhukta hua chehra apna hi cartoon ban jaata hai. Comedy aur horror dono yahin rehte hain.
- *Kisi ke dimag ke andar.* Distortion batata hai ki hum neutral dekh nahi rahe, hum kisi ke andar se dekh rahe hain.
- *Cheezon ko bada dikhana.* Car ko neeche se, paas se, wide lens par shoot karo toh uska aage ka hissa taqatwar aur mota lagta hai. Lagbhag saari car advertising yehi karti hai.
- *Haath, tools, khaana jo camera ki taraf badhe.* Jo bhi cheez darshak ko "pesh" karni ho.

*Aur kab bilkul nahi?* Beauty, fashion, zyadatar product hero shots, koi bhi interview, aur koi bhi chehra jo client ne still dekh ke approve kiya ho. Wahan distortion galti lagti hai — un logon ko bhi jo naam nahi bata paate.

*Rule chhota hai:* energy chahiye toh paas jao. Izzat chahiye toh peeche hato.`,
    visuals: [
      {
        component: 'FaceDistortion',
        caption:
          'Sir ki chaudai lock hai. Camera ki doori ghumao aur dekho naak kaise badhta hai aur kaan kaise sikudte hain — poora khel sirf doori ka hai, aur kuch nahi.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'Brazil',
        year: 1985,
        shot: 'Sarkari babu aur officers ke close-ups bahut wide lens par liye gaye hain — chehre camera ki taraf phoole hue, aur peeche kamra mudta hua.',
        why: 'Distortion aam clerks ko bina makeup aur bina acting badle bhadda bana deta hai. Yahan lens ka chunav hi character banana ka kaam kar raha hai.',
      },
      {
        kind: 'generic',
        shot: 'Car ad ka wo standard hero angle: camera lagbhag sadak se chipka hua, aage ke pahiye ke bilkul paas, wide lens.',
        why: 'Car ka najdeek wala kona darshak ki taraf khinch jaata hai aur door wala sira patla ho jaata hai, jisse lambai aur jamaav badh ke dikhta hai. Car showroom me jaake dekhne se badi aur zyada jami hui lagti hai.',
      },
    ],
    commonMistakes: [
      'Ise "lens distortion" kehke lens-profile correction se theek karne ki koshish karna. Profile mudi hui lines theek karta hai, phooli hui naak nahi — do alag problem hain.',
      'Kamra chhota hai isliye close-up wide lens par le lena. Chehra kharab aayega; usse behtar hai wider shot lo ya doori paane ka koi jugaad karo.',
      'Distorted chehre ko After Effects me warp karke theek karna. Warp kaan aur hairline ko bhi kheench leta hai, aur original se zyada ajeeb cheez ban jaati hai.',
    ],
    aiTranslation: `Model ne distortion "wide angle", "fisheye", "GoPro" aur "selfie" jaise captions se seekha hai. Matlab wo use ek *style* ki tarah lagata hai — aur isiliye adhoora lagata hai. Tumhe aksar milega: background me barrel distortion, lekin chehra portrait wale flattering proportion me. Ya ulta.

*Is failure ka naam yaad rakho: perspective mismatch.* Ye har jagah hai aur lagbhag koi diagnose nahi karta. Yehi badi wajah hai ki achhi skin, achhe baal aur achhi lighting ke bawajood AI chehre "uncanny" lagte hain — darshak ek hi image me do alag camera positions padh raha hota hai.

*Jaan-boojh ke distortion chahiye:* "shot from 30 centimetres away on a 20mm lens, nose closest to camera, face filling the frame, edges of the frame stretching." Doori likhna mm likhne se kahin zyada kaam karta hai.

*Nahi chahiye — jo ki zyadatar product aur beauty kaam hai:* "shot from two metres away on an 85mm portrait lens, natural facial proportions, no wide-angle stretching." Negatives me wide-angle wale words daal do. Chhod doge toh kai models halka sa wide, halka sa phoola chehra bana dete hain — client usse reject kar deta hai bina bataye ki kyun.

*Ilaaj upar hai, comp me nahi.* Dobara generate karo. After Effects me warp karoge toh kaan aur hairline kheench jaayenge aur pehle se buri cheez banegi.

*Aur ye wala tumhe paise dilayega:* jab asli product photo ko AI plate par comp karte ho, tumhe plate ki distortion match karni padegi. Agar plate 20mm jaisa lagta hai aur tumne product 50mm par shoot kiya, toh kinare kabhi baithenge nahi — chahe roto aur grade kitna bhi perfect ho, product chipkaya hua lagega. Nuke me background ki seedhi lines dekh ke plate ki distortion ka andaaza lagao, product element par matching LensDistortion lagao, phir grade karo. Ye wahi skill hai jo zyadatar AI operators ke paas nahi hai.`,
    terms: ['wide-angle-distortion', 'barrel-distortion', 'portrait-length'],
    checks: [
      {
        id: 'c1',
        prompt: '40cm se liya hua chehra phoola hua lag raha hai. Asli wajah kya hai?',
        options: [
          'Camera ka itna paas hona — alag gehrai wale hisse bahut alag size me aate hain',
          'Wide lens ka kinaron par roshni ko modna',
          'Shutter speed kam hona',
          'Sensor chhota hona',
        ],
        answerIndex: 0,
        why: '40cm par naak aur kaan ka 10cm ka farak poori doori ka bada hissa hai. Lens ne bas wo framing mumkin banayi.',
      },
      {
        id: 'c2',
        prompt: 'Inme se kaun si cheez post me lens profile se theek ho sakti hai?',
        options: [
          'Barrel distortion — kinaron par mudi hui seedhi lines',
          'Paas se liya hua bada naak',
          'Long lens se aayi perspective compression',
          'Barrel distortion aur khinche hue chehre, dono',
        ],
        answerIndex: 0,
        why: 'Barrel distortion kaanch ki property hai. Perspective ka khinchav sirf ye batata hai ki camera kahan khada tha, aur koi profile use nahi mita sakta.',
      },
      {
        id: 'c3',
        prompt: 'Portrait ke liye 85–135mm lens kyun use hote hain?',
        options: [
          'Ye tumhe do meter ya zyada door khade hone par majboor karte hain, jahan chehre ke hisse lagbhag barabar door hote hain',
          'Ye baaki lenses se zyada sharp hote hain',
          'Ye sabse zyada background blur dete hain',
          'Inme design se kam barrel distortion hoti hai',
        ],
        answerIndex: 0,
        why: 'Focal length us doori ke liye chuni jaati hai jo wo thopta hai. Achha dikhna us doori ka nateeja hai.',
      },
    ],
    assignment: {
      brief:
        'Phone use karo. Apna — ya kisi bhi raazi chehre ka — photo lo jo lagbhag 30cm se frame bhar de, phir dobara 2 meter peeche ja ke zoom karke frame bharo. Uske baad FLUX me wahi do treatment banao, lekin mm likhne ke bajaye camera ki doori describe karke — aur dekho kaun si jodi zyada saaf farak dikhati hai.',
      deliverable: 'Chaar images: do photo khinchi hui, do generate ki hui, do-by-do grid me.',
      timeboxMinutes: 40,
      successCriteria: [
        'Tumhari paas wali photo me naak kaano ke mukable saaf taur par bada hai, aur tum us farak par ungli rakh sakte ho.',
        'Tumhari do generated images usi direction me alag hain jis direction me tumhari photos hain — isse pata chalta hai prompt ki bhasha sach me kaam kar gayi.',
        'Tum bata sakte ho ki model ne doori wale description par zyada reaction diya ya mm number par, jo tumne khud dekha uske hisaab se.',
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
    title: 'Zoom bनाam push-in — do alag baatein',
    oneLine: 'Ek tasveer ko bada karta hai. Doosra darshak ko utha ke le jaata hai.',
    estMinutes: 7,
    prerequisites: ['camera-focal-length'],
    definitionEn:
      'A zoom changes focal length while the camera stays put, so framing changes but perspective does not. A push-in physically moves the camera toward the subject, changing camera-to-subject distance and therefore perspective, which produces parallax.',
    body: `**Zoom** aur **push-in** dono bilkul ek jaisi framing par khatam ho sakte hain, aur phir bhi unka matlab bilkul alag hota hai.

Zoom me focal length badalti hai lekin camera apni jagah par khada rehta hai. **camera-to-subject distance** badla hi nahi, isliye subject aur background ka rishta jama hua hai — sab kuch ek saath, barabar bada hota hai. Ye live crop hai. Darshak duniya me apni jagah se hila nahi; uska *dhyaan* mod diya gaya. Baat ye hai: "dekho".

Push-in me camera sach me subject ki taraf chalta hai — **dolly** par, slider par, ya gimbal par. Doori badalti hai, isliye perspective bhi badalta hai: subject background se tez badhta hai, background peeche chhoot jaata hai aur uska kam hissa frame me bachta hai. Darshak ko utha ke le jaaya gaya. Baat ye hai: "paas aa jao".

*Teen nateeje yaad rakhne layak hain.*

*Pehla — parallax.* Push me **parallax** banta hai: chalte waqt aage ki cheez peeche ki cheez se zyada khisakti hai, aur yehi hamara sabse strong depth signal hai. Zoom me bilkul nahi banta. Yehi asli wajah hai ki zoom sasta lagta hai aur push mehnga — ek me space ki shakal ki jaankari hai, doosre me nahi.

*Doosra — feeling.* Chehre par dheema push-in wo standard grammar hai jab kisi ko koi baat samajh aati hai. Chehre par zoom nazar rakhne jaisa, ya comedy jaisa lagta hai — isiliye documentary aur 1970s ke TV me zoom bhare pade hain, aur aaj ke drama me lagbhag nahi hain.

*Teesra — dono ko mila do.* Camera ek taraf chalao aur lens doosri taraf zoom karo, barabar speed par, toh **dolly zoom** banta hai: subject ka size wahi rehta hai lekin background peeche phailta ya sikudta hai. Insaan ki aankh ye kabhi dekh hi nahi sakti, isliye ye aisa lagta hai jaise character ke paron ke neeche se zameen khisak rahi ho. Ek project me zyada se zyada ek baar.

Zoom mana nahi hai. Wo apni ek khaas awaaz wala tool hai — snap zoom baat par zor daalta hai, dheema zoom batata hai ki camera hissedaar nahi, dekhne wala hai. Bas use tab mat uthao jab camera hilana mushkil lag raha ho. Wo wala version audience ko mehsoos ho jaata hai.`,
    visuals: [
      {
        component: 'ZoomVsPush',
        caption:
          'Dono panels me subject har point par bilkul same size ka hai. Farak sirf background me hai — aur yehi dono moves ka poora farak hai.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'Vertigo',
        year: 1958,
        shot: 'Bell tower ki seedhiyon me neeche ka view — camera peeche jaata hai aur lens andar zoom karta hai, isliye seedhiyan khinchti chali jaati hain par framing wahi rehti hai.',
        why: 'Ye shot isi film ke liye ijaad hua tha, chakkar aane ki feeling bahar laane ke liye. Dimag stable framing aur badalte perspective ko jod nahi paata — aur character ke saath bilkul yahi ho raha hai.',
      },
      {
        kind: 'work',
        title: 'Jaws',
        year: 1975,
        shot: 'Beach par Brody ko hamla samajh aata hai — camera andar dolly karta hai aur lens bahar zoom, aur uske peeche ka beach khinch jaata hai.',
        why: 'Uske chehre ki framing lagbhag nahi badalti, isliye acting saaf padhi jaati hai, jabki peeche ki duniya hil jaati hai. Reaction shot ki jagah technique khud wo realisation utha leti hai.',
      },
    ],
    commonMistakes: [
      'Zoom isliye karna kyunki camera hilana mushkil tha. Audience naam nahi bata paayegi, lekin shot film ke bajaye television jaisa lagega.',
      'After Effects me scale-up ko push-in kehna. Bane hue frame ko bada karna definition ke hisaab se zoom hai — un pixels me nayi perspective ki koi jaankari hai hi nahi.',
      'Dolly zoom isliye lagana kyunki impressive lagta hai. Wo character ke paon ukhadne ke baare me ek statement hai; aise hi laga do toh bas ye announce hota hai ki kisi ne ek trick seekh li.',
    ],
    aiTranslation: `Video models in dono ko sach me alag request maante hain, aur tum kaun sa maang rahe ho — usi se kaam ka shot ya morphing wala kachra milta hai.

*"Zoom in" sasta aur safe prompt hai.* Zyadatar image-to-video models ise maujuda frame ke scale ki tarah karte hain. Nayi jaankari kam chahiye, isliye artifacts kam aate hain — lekin crop me jaate hue softness aksar aa jaati hai.

*"Dolly in" ya "push in, camera moves toward the subject" mehnga prompt hai.* Ab model ko parallax banana padega: kinaron par naya background aana chahiye, chhupi hui jagah bharni chahiye, aur relative sizes sahi tareeke se badalni chahiye. Yahin Wan, LTX aur Kling toot-te hain — kinare warp karte hain, background drift karta hai, cheezein galat speed se ek dusre ke paas se nikalti hain.

*8GB par practical rule:* agar shot ko sirf zor dena hai, dheema zoom prompt karo aur maan lo. Agar shot ko sach me audience ko utha ke le jaana hai, push prompt karo, kai takes banao, aur maan ke chalo ki zyadatar phenkne padenge. Move chhota rakho — ek se do second ka safar — aur background simple rakho, kyunki har extra cheez ek aur cheez hai jo galat ban sakti hai.

*Comp me push sahi tareeke se banana — aur ye skill tumhare paas pehle se hai.* Subject ko roto karo, uske peeche plate patch karo, subject aur background ko alag-alag depth par cards par rakho, aur asli 3D camera aage animate karo. Ab tumhare paas wahi parallax hai jo model bana hi nahi paata, aur wo bhi frame-perfect control ke saath. 2D scale zoom hai; multi-plane setup push hai. Is farak ki keemat hai.

*AI pipeline me dolly zoom:* iske liye prompt mat likho. Abhi koi model subject ka size sthir rakhte hue background ka perspective nahi badal paata. Ise Nuke me banao — background card ko bada karte jao aur camera peeche khinchte jao taaki subject ka size na badle. Bees minute ka setup hai aur sahi lagta hai, kyunki wo sach me sahi *hai*.`,
    terms: ['zoom', 'push-in', 'dolly', 'dolly-zoom'],
    checks: [
      {
        id: 'c1',
        prompt: 'Shot ek hi framing par khatam hota hai, chahe zoom kiya ho ya push. Audience ko kaise pata chalega kaun sa hua?',
        options: [
          'Background se — push me uska size aur coverage badalta hai, zoom me nahi',
          'Move ke dauraan exposure badalne se',
          'Shot ke frame rate se',
          'Kuch nahi — dono bilkul ek jaise dikhte hain',
        ],
        answerIndex: 0,
        why: 'Push me camera ki doori badalti hai, isliye subject aur background alag-alag rate se bade hote hain aur field of view sikudta hai. Zoom sab kuch barabar bada karta hai.',
      },
      {
        id: 'c2',
        prompt: 'Push-in zoom se zyada mehnga kyun lagta hai?',
        options: [
          'Usme parallax banta hai, jo space ki shakal ki asli jaankari deta hai',
          'Usme mehnge lens lagte hain',
          'Usme hamesha slow shutter use hota hai',
          'Wo zyada resolution par record hota hai',
        ],
        answerIndex: 0,
        why: 'Parallax hamara sabse strong depth signal hai. Zoom me wo hota hi nahi, isliye darshak ko space ke baare me koi nayi jaankari milti nahi.',
      },
      {
        id: 'c3',
        prompt: 'Tumne After Effects me ek bane hue AI frame ko dheere-dheere scale up kiya. Tumne kya banaya?',
        options: [
          'Zoom — un pixels me nayi perspective ki jaankari hai hi nahi',
          'Push-in, kyunki subject paas aa raha hai',
          'Dolly zoom',
          'Rack focus',
        ],
        answerIndex: 0,
        why: 'Flat image ko bada karne se sab kuch barabar bada hota hai. Perspective tabhi badal sakta hai jab dekhne ki jagah badle — uske liye ya asli move chahiye ya multi-plane rebuild.',
      },
    ],
    assignment: {
      brief:
        'Ek still lo — generate ki hui ya khinchi hui — jisme saaf subject ho aur padha ja sakne wala background ho. Usse do paanch-second ke move banao: ek simple 2D scale-up, aur doosra asli push — subject ko roto karke, background patch karke, aur do alag depth wale cards par camera animate karke. Dono ka start aur end framing same rakhna.',
      deliverable: 'Do paanch-second clips, saath-saath ya ek ke baad ek.',
      timeboxMinutes: 90,
      successCriteria: [
        'Dono clips saaf taur par ek hi framing par shuru aur khatam hote hain, taaki comparison imaandaar rahe.',
        'Multi-plane wale version me background subject se naap ke alag rate par chalta hai, aur subject ke kinare bina halo ke tikte hain.',
        'Tum ek line me bata sakte ho ki client ko kaun sa dete aur doosre ki pol kis cheez se khulti hai.',
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
    title: 'Sensor, crop factor, aur "35mm" ka asli matlab',
    oneLine: 'mm ka number tab tak adhoora hai jab tak camera na batao.',
    estMinutes: 8,
    prerequisites: ['camera-focal-length'],
    definitionEn:
      'A lens projects a circular image; the sensor sits inside that circle and captures a rectangle of it. Crop factor is the ratio of the full-frame sensor diagonal to another sensor’s diagonal, and multiplying focal length by it gives the equivalent focal length that would frame the same way on full frame.',
    body: `Lens roshni ka ek gol daayra banata hai — usko **image circle** kehte hain. **sensor** us daayre ke andar baithta hai aur usme se ek chaukor tukda kaat leta hai. Tukde ki size badlo, framing badal jaayegi — lens ko haath lagaye bina.

Bas yehi poora idea hai. Baaki sirf hisaab-kitaab hai.

**full frame** 36 x 24mm hota hai, 35mm still negative jitna, aur sab log isi ke hisaab se number bolte hain. **super 35** lagbhag 24.9 x 18.7mm hai aur ek sadi se cinema ka main format raha hai. Uske neeche Micro Four Thirds, zyadatar drones ka one-inch sensor, aur phone ke chhote sensors aate hain.

**crop factor** matlab full frame ke diagonal aur tumhare sensor ke diagonal ka ratio. Super 35 lagbhag 1.4x, Micro Four Thirds 2x, drone ka one-inch lagbhag 2.7x, phone 4x ya usse zyada. Apne lens ko us number se guna karo aur **equivalent focal length** mil jaata hai — yaani full frame ka wo lens jo isi tarah frame karta.

Toh Super 35 par 25mm, full frame ke 35mm jaisa frame karega. Micro Four Thirds par 12mm, 24mm jaisa. Aur tumhare phone ka main camera, jiska asli lens lagbhag 5.5mm hai, 26mm jaisa frame karta hai — isiliye phone ki footage hamesha thodi wide aur thodi paas lagti hai.

*Ab teen cheezein jo log galat samajhte hain.*

*Pehli — equivalence sirf framing ke baare me hai.* Wo batata hai frame me kya aayega. Perspective ke baare me kuch nahi kehta — wo abhi bhi sirf tumhari khadi hone ki jagah se banta hai — aur depth of field bhi seedhe seedhe convert nahi hoti, wo aperture ke asli diameter se chalti hai.

*Doosri — crop se cheez paas nahi aati.* Chhota sensor tumhe najdeek nahi le jaata. Wo bas tasveer ke bahar wale hisse phenk deta hai. Full frame image ko post me utna hi crop kar do, bilkul wahi framing milegi.

*Teesri — image circle se bada sensar lagaoge toh kone kaale aayenge.* Yehi hota hai jab chhote format ke liye bane lens bade camera par lagte hain, aur rent karte waqt ye asli dikkat hai.

*Aadat ye banao:* format bataye bina focal length kabhi mat bolo. "35mm" jaankari nahi hai. "35mm on Super 35" jaankari hai.`,
    visuals: [
      {
        component: 'SensorCrop',
        caption:
          'Sensor aur lens chuno. Image circle kabhi nahi badalta — sirf ye badalta hai ki sensor usme se kitna rakhta hai, aur usse tumhari framing aur field of view par kya asar padta hai.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'The Hateful Eight',
        year: 2015,
        shot: 'Lodge ke andar ke scenes 65mm negative par Ultra Panavision anamorphic optics ke saath liye gaye hain, 2.76:1 frame me.',
        why: 'Itna bada capture area aur wide optics ek hi frame me poora kamra aur kai characters samet lete hain, bina close coverage ke. Format ka chunav hi film ko lambe scenes ensemble ki tarah stage karne deta hai, cutting pattern ki tarah nahi.',
      },
      {
        kind: 'generic',
        shot: 'Wahi 25mm lens ek setup me Super 35 cinema camera se hata ke Micro Four Thirds body par lag jaata hai, aur kisi ne camera ki jagah nahi badli.',
        why: 'Framing aaram wale medium se close shot me sikud jaati hai. Lens ya subject me kuch nahi badla — sirf sensor ne projected image ka kam hissa rakha. Crop factor isi jaal se bachane ke liye hi hota hai.',
      },
    ],
    commonMistakes: [
      'Format bataye bina focal length bolna aur ummeed karna ki saamne wale ko samajh aa jaayega. Shoot par is confusion ki keemat ek lens change hai; prompt me ek regeneration.',
      'Ye maan lena ki crop sensor muft me extra reach de raha hai. Wo usi image ka tighter crop deta hai, aur uske peeche pixels bhi kam hote hain.',
      'Ye samajhna ki equivalent focal length depth of field bhi convert kar deta hai. Framing crop factor se convert hoti hai; depth of field aperture ke asli diameter se chalti hai aur alag behave karti hai.',
    ],
    aiTranslation: `Diffusion model ke paas sensor hai hi nahi. Jab tum "35mm" likhte ho toh wo ek saath har format ke captions se match kar raha hai — phone snaps, Super 35 stills, medium format. Isliye wo token ek dheela sa style hint hai, geometry ka order nahi. Prompt me lens numbers unreliable *lagte* hain kyunki wo sach me hain.

*Iski jagah framing aur doori likho.* "Medium shot from three metres, moderately wide field of view showing the room behind him" — ye utna hi saaf hai jitna "35mm" kabhi nahi tha. mm token rakhna hai toh rakho, lekin frame control karne ke liye akela us par mat jao.

*Ye asli production problem kahan banti hai: hybrid pipeline.* Jis pal tum phone se plate shoot karke use AI environment me daalte ho, tumhare paas do camera ho gaye jinki geometry alag hai. Tumhara phone lagbhag 26mm equivalent hai — wide, aur paas ki cheezon par saaf khinchav ke saath. Agar AI environment 85mm jaisa compressed background lagta hai, toh composite kabhi baithega nahi, aur koi bhi grading ya grain matching use bacha nahi payegi. Log use nakli kahenge bina jaane ki kyun.

*Isliye is order me kaam karo.* Pehle plate shoot karo. Uska equivalent focal length aur camera ki height note karo. Phir environment ko wahi geometry match karne ke liye prompt karo — "wide angle view, deep space receding, camera at chest height" — na ki kuch sundar bana ke ummeed karo ki plate usme fit ho jaayega.

*Nuke me:* 3D camera ko kaam karne se pehle focal length aur filmback chahiye. AI plate ke liye dono ka andaaza tumhe lagana hoga. Wo lines dekho jo parallel honi chahiye — building ke kinare, floor tiles, table ke side — aur unke vanishing points padho; ya koi jaani-pehchani cheez naapo jaise bottle ya darwaza. Isse lagbhag sahi karna hi wo cheez hai jo tracked element ko plate me baithati hai; galat karna wo cheez hai jo use tairta hua dikhati hai.`,
    terms: ['sensor', 'full-frame', 'super-35', 'crop-factor', 'equivalent-focal-length', 'image-circle'],
    checks: [
      {
        id: 'c1',
        prompt: 'Tumne Super 35 camera par 25mm lens lagaya, crop factor lagbhag 1.4x. Full frame par kaun sa lens waisi hi framing dega?',
        options: ['Lagbhag 35mm', 'Lagbhag 18mm', 'Lagbhag 50mm', 'Abhi bhi 25mm — focal length badalti nahi'],
        answerIndex: 0,
        why: 'Focal length ko crop factor se guna karo: 25 x 1.4 lagbhag 35. Lens khud nahi badla; sirf framing ko full frame ki bhasha me bola ja raha hai.',
      },
      {
        id: 'c2',
        prompt: 'Kya chhota sensor subject ko paas le aata hai?',
        options: [
          'Nahi — wo image ke bahar ke hisse phenk deta hai, jo post me crop karne jaisa hi hai',
          'Haan, wo image ke beech ko bada kar deta hai',
          'Haan, lekin sirf telephoto lens ke saath',
          'Nahi, wo iski jagah perspective badal deta hai',
        ],
        answerIndex: 0,
        why: 'Lens wahi image circle banata hai chahe kuch bhi ho. Chhota sensor bas usme se kam rakhta hai — bilkul waise hi jaise post me crop karna.',
      },
      {
        id: 'c3',
        prompt: 'Tumne phone se plate shoot ki aur uske liye compressed, long-lens jaisa AI background banaya. Kya galat hoga?',
        options: [
          'Dono ki geometry ek dusre ke khilaaf hai, isliye composite kabhi baithega nahi chahe grade kitni bhi achhi ho',
          'Rang match nahi karenge',
          'Frame rates takra jaayenge',
          'Kuch nahi — compositing me perspective matter nahi karta',
        ],
        answerIndex: 0,
        why: 'Phone lagbhag 26mm equivalent hai, jisme saaf perspective khinchav hota hai. Use 85mm jaise background me daalna ek hi shot me do camera hain, aur darshak turant nakli padh lete hain.',
      },
    ],
    assignment: {
      brief:
        'Phone se ek plate shoot karo — table par rakhi koi simple cheez — aur lagbhag kitni door khade the wo note kar lo. Phir FLUX me uske liye do background banao: ek "wide, deep space" jo tumhare phone ki geometry se mile, aur doosra compressed long-lens wala. Dono me object ko composite karo.',
      deliverable: 'Ek hi plate se do composites, aur dono par ek-ek line notes.',
      timeboxMinutes: 60,
      successCriteria: [
        'Matching wale composite me object space ke andar baitha lagta hai, aur background ki lines object ke kinaron se mel khaati hain.',
        'Mismatch wala composite saaf taur par fail hota hai, aur tum us khaas cue par ungli rakh sakte ho jo pol kholta hai — sirf "ajeeb lag raha hai" nahi.',
        'Kuch bhi generate karne se pehle tumne apni phone plate ka lagbhag equivalent focal length likh liya tha.',
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
    title: 'Aspect ratio aur safe areas — shape ek faisla hai',
    oneLine: 'Frame ki shakal staging badal deti hai, aur platform baaki crop kar dega.',
    estMinutes: 8,
    prerequisites: ['camera-focal-length'],
    definitionEn:
      'Aspect ratio is the proportion of frame width to height. Safe areas are the inset regions guaranteed to survive cropping, overscan and platform interface elements — action safe protects important motion, and title safe, tighter still, protects text and logos.',
    body: `**aspect ratio** matlab frame ki chaudai aur unchai ka anupaat. Ye creative faisla hai jo scene stage karne ka tareeka badal deta hai — camera ka default setting nahi jo tumhe bas mil gaya.

*Jo ratios tum sach me use karoge:*

- *1.33 (4:3)* — lamba aur dabba jaisa. Archive, academy, aur jab intimacy ya purane daur ka ehsaas chahiye.
- *1.78 (16:9)* — YouTube, TV, internet ka default.
- *1.85* — theatre ka shaant wala standard, 16:9 se bas thoda chauda.
- *2.39 (scope)* — bahut chauda. Landscape, tamasha, aur do logon ke beech bahut saari khaali jagah.
- *9:16* — vertical. Reels, Shorts, TikTok. Aajkal ka zyadatar paid short-form kaam yahin girta hai.
- *1:1* — square, un feeds ke liye jo dono taraf crop karengi.

Ratio staging badal deta hai — yahi hissa log miss karte hain. 2.39 frame me do characters ko dono kinaron par khada karna natural lagta hai, beech me khaali jagah ke saath, aur headroom keemti ho jaata hai. 9:16 frame me ye ho hi nahi sakta — wahan tumhe jaankari upar-neeche stack karni padegi, tighter shoot karna padega, aur subject beech me rakhna padega. Chaude frames rishton ke baare me hain. Lambe frames ek waqt me ek cheez ke baare me.

Phir aata hai **safe area**, jo isliye hai kyunki tumhara frame un cheezon se crop hoga jo tumhare control me nahi hain. Action safe, kuch percent andar, zaroori movement bachata hai. Title safe, usse bhi tight, text aur logo bachata hai. Social platforms par asli khatra interface hai: captions, username, buttons aur progress bar vertical video ke neeche ke lagbhag paanchve hisse aur ek side ko dhak lete hain. Use pehle storyboard se hi dead zone maan lo.

*Do technical baatein.* **letterbox** matlab chaude image ko lambe frame me kaali pattiyon ke saath fit karna. Delivery file me pattiyan bake kar doge toh pixels ka nuksaan hota hai aur platform samajhdari se crop nahi kar paata — isliye tabhi bake karo jab client kahe. Aur **anamorphic** optics chaude ratio isliye deti hain kyunki wo image ko squeeze karke normal sensor par record karti hain aur baad me stretch hota hai — saath me oval bokeh aur horizontal streak flares bhi aate hain, toh wo ek look hai, sirf shape nahi.

*Sabse zyada mehnat bachane wala rule:* kuch bhi shoot ya generate karne se pehle delivery ratio decide karo, aur usi ke liye compose karo. Baad me reframe karne me hamesha kuch na kuch jaata hai.`,
    visuals: [
      {
        component: 'AspectRatioFrames',
        caption:
          'Ratio badalte jao aur dekho staging ke options kaise badalte hain. 9:16 overlay chalu karo aur dekho chaude frame ka kitna kam hissa vertical crop me bachta hai.',
        interactive: true,
      },
    ],
    filmExamples: [
      {
        kind: 'work',
        title: 'The Grand Budapest Hotel',
        year: 2014,
        shot: 'Film daur ke hisaab se aspect ratio badalti hai — 1930s ke hisson ke liye dabba jaisa 1.37 frame, baad ke timelines ke liye widescreen.',
        why: 'Frame ki shakal hi bata deti hai tum kis dashak me ho, kisi aur cue se pehle. Aur lamba 1930s frame apne aap wo centred, formal, doll-house jaisi staging deta hai jo us daur ko chahiye.',
      },
      {
        kind: 'work',
        title: 'Mommy',
        year: 2014,
        shot: 'Poori film 1:1 square frame me stage ki gayi hai, jise character azaadi ke ek pal me sach me haathon se khol ke widescreen kar deta hai.',
        why: 'Square frame poori film characters ko dabba band aur paas rakhta hai, isliye jab ratio khulta hai toh raahat dimag se nahi, badan se mehsoos hoti hai. Frame ki shakal ko story beat ki tarah use kiya gaya hai.',
      },
    ],
    commonMistakes: [
      '16:9 me shoot ya generate karke delivery ke liye 9:16 crop karna. Chaudai ka zyadatar hissa phenk dete ho aur subject lagbhag kabhi wahan nahi hota jahan vertical frame ko chahiye.',
      'Vertical frame ke neeche ki taraf captions ya logo rakhna, jahan platform ka interface unke bilkul upar baith jaayega.',
      '2.39 ko apne aap cinematic maan lena. Chauda frame jisme kuch stage hi nahi kiya gaya, wo bas kam tasveer wala 16:9 hai.',
    ],
    aiTranslation: `Aspect ratio un giney-chuney prompt parameters me se hai jo sach me mechanical hai, suggestion nahi — aur wo shape se zyada badalta hai.

*Hamesha apni delivery ratio par hi generate karo.* Models har aspect ke liye alag tarah se framed images par train hue hain, isliye vertical generation horizontal ka crop nahi hai — wo alag compose karta hai, aksar tighter aur zyada centred, jo vertical ke liye chahiye bhi wahi. 16:9 bana ke 9:16 crop karne me lagbhag do-tihai chaudai chali jaati hai aur subject galat jagah aa jaata hai.

*8GB VRAM par ratio ek budget ka faisla hai.* Memory total pixel count se khatam hoti hai, shape se nahi. 1024 x 1024 square aur 1344 x 768 wide lagbhag barabar padte hain. Jo ratio chahiye wo chuno, phir resolution ladder card ke hisaab se set karo — chhota generate karo, composition check karo, jo pasand aaye use upscale karo.

*Wide aur vertical dono deni hai?* Do baar generate karke continuity ki ummeed mat karo, character drift ho jaayega. Vertical master banao, phir generative expand ya outpainting se bahar ki taraf badha ke wide version banao. Subject bilkul wahi rehta hai aur sirf kinare invent hote hain — yaani sasta wala hissa.

*Dead zone ko storyboard stage se hi design karo.* Vertical ad me neeche ka paanchwa hissa platform ka hai. Agar generated still me tumhara product wahan aa gaya, toh tumhe dobara generate karna padega, khiskana kaam nahi karega — kyunki bane hue frame me subject hilane ka matlab hai uske peeche background dobara paint karna.

*After Effects ya Nuke me:* project ke pehle din se comp par title-safe box aur 9:16 crop dono ka overlay rakho. Comp me pakda gaya har reframe wo hai jo tumne client ke wide version approve karne ke *baad* nahi pakda — aur wahi version hai jiska vertical bhi maanga jaayega, hamesha aakhir me.`,
    terms: ['aspect-ratio', 'letterbox', 'safe-area', 'anamorphic'],
    checks: [
      {
        id: 'c1',
        prompt: '2.39 frame do characters ko stage karne ka tareeka kyun badal deta hai?',
        options: [
          'Usme unke beech chaudai me khaali jagah natural lagti hai, aur headroom kam pad jaata hai',
          'Usme gesture ke liye zyada vertical jagah milti hai',
          'Wo subject ko beech me rehne par majboor karta hai',
          'Staging par koi asar nahi, sirf look badalta hai',
        ],
        answerIndex: 0,
        why: 'Chauda frame chaudai me rishton ke baare me hai. Vertical frames stacking aur centring par majboor karte hain.',
      },
      {
        id: 'c2',
        prompt: 'Ek AI ad ka 16:9 aur 9:16 dono version dena hai. Sahi order kya hai?',
        options: [
          'Vertical master generate karo, phir bahar ki taraf badha ke wide banao',
          '16:9 generate karo aur beech ka hissa vertical ke liye crop karo',
          'Dono alag-alag generate karo, same seed par',
          'Square generate karke dono taraf letterbox kar do',
        ],
        answerIndex: 0,
        why: 'Bahar badhane se subject bilkul wahi rehta hai aur sirf kinare bante hain. Andar crop karne se zyadatar chaudai chali jaati hai aur subject galat jagah aa jaata hai.',
      },
      {
        id: 'c3',
        prompt: 'Vertical social video ke neeche ke paanchve hisse me kya baithta hai?',
        options: [
          'Platform ka interface — captions, username, buttons — isliye use dead zone maano',
          'Title-safe area, jo frame ka sabse safe hissa hai',
          'Kuch nahi, agar tum full resolution par deliver karo',
          'Letterbox ki kaali pattiyan',
        ],
        answerIndex: 0,
        why: 'Us patti ko app dhak leta hai. Wahan rakhi koi bhi zaroori cheez darshak ko dikhti hi nahi, chahe file kaise bhi master ki gayi ho.',
      },
    ],
    assignment: {
      brief:
        'Ek advertising idea lo — koi bhi product jo tumhare paas hai. Wahi hero still FLUX me teen baar banao, teen ratios par: 9:16, 1:1 aur 16:9, har ek natively generate karke, crop karke nahi. Phir vertical wale par title-safe box aur platform dead zone ka overlay banao.',
      deliverable: 'Teen ratios par teen stills, aur vertical wala safe-area overlays ke saath.',
      timeboxMinutes: 45,
      successCriteria: [
        'Teeno apne apne ratio par generate hue hain, ek dusre se crop karke nahi, aur composition sach me alag hai.',
        'Vertical version me koi zaroori cheez neeche ke paanchve hisse me ya title-safe box ke bahar nahi hai.',
        'Tum bata sakte ho ki is product ke liye teeno me se kaun sa ratio sabse sahi hai, aur wajah staging ki honi chahiye, pasand ki nahi.',
      ],
      usesTools: ['FLUX Schnell', 'Koi bhi image editor'],
    },
  },
]
