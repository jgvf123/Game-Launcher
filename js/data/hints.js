// "Samjhao 💡" hints — har question ko simple Hindi/Hinglish me samjhata hai,
// mushkil word ka matlab batata hai, par ANSWER nahi deta.
// Arrays QUIZZES[topicId] ke SAME order me hain (index se match).

export const HINTS = {
  // ---------- REASONING ----------
  analogy: [
    'Soch: Pen ka kaam likhna. Knife ka "kaam" kya hai? Wahi relation lagao.',
    'Day aur Night opposite hain. Light ka opposite shabd socho.',
    'Bird apne ghar "Nest" me rehti. Bee (madhumakkhi) ka ghar kya kehlata?',
    'Insaan ke paas "foot". "Hoof" (khur) kis jaanwar ke paas hota? Wahi jodi.',
  ],
  classification: [
    'Inme 3 ek hi category (phool) ke hain, 1 alag (fruit). Alag wala dhoondo.',
    'Prime = sirf 1 aur khud se kate. Inme 3 prime hain, 1 nahi.',
    'Cube = number×khud×khud (2³=8, 3³=27). 3 cubes hain, 1 nahi.',
  ],
  'coding-decoding': [
    'Letter ki position: A=1 … Z=26. D, O, G ki position number likho.',
    'RED me har letter +1 hua (R→S). BLUE ke har letter ko +1 karo.',
    'Yahan bhi har letter +1 hua. FRIDAY ke har letter ko +1 karo.',
  ],
  series: [
    'Ek number se agla kaise bana — multiply (×) ho raha kya?',
    'Lagataar farak nikaalo (6−3=3, 11−6=5…). Us farak ka pattern dekho.',
    'Pichhle do number jodo to agla milta (Fibonacci). 5+8 = ?',
    'Har number se agla kitne guna ho raha hai?',
  ],
  'blood-relations': [
    'Tukdo me todo: "grandfather ka only son" = mera papa. Uska son kaun?',
    'B aur C bhai-behen. A unka papa. To A, C ka kya laga?',
    'P-Q pati-patni. R unka beta. R, Q (maa) ka kya lagega?',
  ],
  'direction-sense': [
    'North (upar) mooh. Right (clockwise): N→E→S→W. Kaunsi disha aayi?',
    'L-shape raasta. Seedhi doori = √(3²+4²). (3,4,5 wala triangle.)',
    'South mooh. Do left turn (anti-clockwise): S→E→N.',
  ],
  syllogism: [
    'Chain: cats poore dogs me, dogs poore animals me. To cats kahan?',
    'Kya pakka keh sakte ki pen red hai? Red books pen hon zaroori nahi.',
    'Jo A wale B hain, wo saare C ban gaye (kyunki All B are C).',
  ],
  'venn-diagram': [
    'Tennis & Football alag khel (alag circle), par dono "Games" (bade circle me).',
    'Pen & Pencil alag, dono Stationery (likhne ka saaman) ke andar.',
  ],
  'seating-arrangement': [
    'Tum North dekh rahe ho. P, Q ke right me hai → Q, P ke kis taraf?',
    '6 seats me opposite = +3 (1 se gino: 1→2→3→4).',
  ],
  'mirror-water-image': [
    'Aaine me left-right ulta. "b" ko ulta karo — kaunsa letter banta?',
    'Wo letter jo aaine me bilkul same dikhe (left-right symmetric).',
    'Paani me upar-neeche ulta. "M" ko ulta karke socho.',
  ],
  'paper-folding': [
    'Ek fold = kaagaz 2 parto me. Ek hole dono pe — khol ne par kitne?',
    'Do fold = 4 parte. Ek hole = khol ne par kitne holes?',
  ],
  dice: [
    'Normal paasa: aamne-saamne ke do faces ka jod kitna hota?',
    'Opposite ka jod 7 hai. 2 ke saamne kaunsa number?',
    'Standard paasa: 1 ke saamne kaunsa? (jod 7 yaad rakho.)',
  ],
  'math-operations': [
    'Pehle symbols badlo (+→×, −→+, ×→−), fir BODMAS. (6+2 → 6×2.)',
    'BODMAS: pehle ÷, fir ×, fir +. Left se right.',
    'Diya hai a#b ka matlab. 7#4 me a=7, b=4 rakho.',
  ],
  'counting-figures': [
    'Apex se base tak ek line. Chhote triangle + poora bada — sab gino.',
    '4 chhote square + 1 bada (poora) = ?',
    '1×1 ke 9, 2×2 ke 4, 3×3 ka 1 — sab jodo.',
  ],
  'statement-conclusion': [
    'Statement keh raha smoking buri. To "avoid karein" seedha nikalta?',
    'Agar sab pass ho gaye, to kya koi fail hua?',
  ],

  // ---------- GENERAL AWARENESS ----------
  history: [
    'Taj Mahal Agra me — kis Mughal badshah ne begum ki yaad me banwaya.',
    'Amritsar ka famous massacre — kaunse saal hua, yaad karo.',
    '1947 ke baad pehla Governor-General kaun tha.',
    'Indus Valley ki city jahan "Great Bath" (bada snaan-kund) mila.',
  ],
  geography: [
    'Kshetrafal (area) me sabse bada state.',
    'Wo nadi jo Bihar me baar-baar baadh laati — "Bihar ka dukh".',
    'Kark rekha (Tropic of Cancer) kitne Indian states se guzarti.',
    'Sabse oonchi choti jo poori India me ho (Everest to Nepal me hai).',
  ],
  polity: [
    'Maulik adhikaar (Fundamental Rights) abhi kitne hain.',
    'Desh ka samvidhanik mukhiya (constitutional head) kaun.',
    'Samvidhan "adopt" (sweekar) kab hua — laagu hone se alag date.',
    'Rashtrapati (President) banne ki kam se kam umar.',
  ],
  economy: [
    'Reserve Bank of India (RBI) kis saal bana.',
    'Union Budget kaun pesh karta hai.',
    'GST (ek tax system) kab laagu hua.',
    'NITI Aayog ne kis purani sanstha ki jagah li.',
  ],
  'general-science': [
    'Vidyut dhaara (electric current) ka SI unit.',
    'Paudhe photosynthesis me kaunsi gas lete hain.',
    'Sone (Gold) ka chemical symbol.',
    'Dhoop lagne se skin me kaunsa vitamin banta.',
  ],
  'static-gk': [
    'Bharat ka rashtriya jalchar (aquatic) jeev.',
    'Bharat ka rashtriya phool (flower).',
    'Kathakali nritya kis rajya ka hai.',
    'Tirange ke Ashok Chakra me kitni teeliyan (spokes).',
  ],
  'current-affairs': [
    'Bharat ki antariksh (space) sanstha ka naam.',
    'United Nations (UN) ka mukhyalay kis sheher me.',
    'IT companies ka hub — "Silicon Valley of India".',
  ],
  'misc-gk': [
    '"The Discovery of India" kisne likhi (jail me).',
    'Dronacharya Award kis kshetra ke logon ko milta (coaching).',
    '"Wings of Fire" kiski jeevani (Missile Man).',
    'Booker Prize kis cheez ke liye diya jaata.',
  ],

  // ---------- QUANTITATIVE APTITUDE ----------
  'number-system': [
    '÷9 ka rule: digits ka jod 9 se kate. Har option ke digit jodo.',
    'HCF = dono ka sabse bada common factor.',
    'LCM = sabse chhota number jo dono se kate.',
    '7 ki power ka last digit ghoomta: 7,9,3,1… 4th power pe kaunsa.',
  ],
  percentage: [
    '200 ka 25% = 200 × 25/100.',
    'Number × 1.20 = 60. Number nikaalo (60 ÷ 1.2).',
    'Fraction ko % me: × 100.',
    'x% zyada ho to wapas: x/(100+x) × 100 kam.',
  ],
  'ratio-proportion': [
    'b dono ratio me same banao, fir a:c nikaalo.',
    'Total parts = 2+3 = 5. ₹500 ÷ 5 = ek part.',
    'Mean proportional = √(4×9).',
  ],
  average: [
    'Sum karo, fir kitne number (5) se baato.',
    '1+2+3+4+5 ko 5 se baato. (ya (n+1)/2.)',
    'Sum = average × count = 25 × 6.',
  ],
  'si-ci': [
    'SI = P×R×T/100. P=1000, R=10, T=2.',
    'Amount = 1000×(1.1)². CI = Amount − 1000.',
    'Shortcut: P×(R/100)² = 5000 × (10/100)².',
    'Interest chahiye 500. SI=500=500×10×T/100 → T nikaalo.',
  ],
  'profit-loss': [
    'Profit = SP−CP = 20. Profit% = 20/CP × 100.',
    'Loss = 100. Loss% = 100/CP × 100.',
    'Discount MP par: 200 ka 10% ghatao.',
    'SP = CP × 0.9 = 90. CP nikaalo.',
  ],
  'mixture-alligation': [
    'Cross method: (30−24):(24−20).',
    '4 parts (3+1). 40÷4 = ek part. Water = 1 part.',
  ],
  'time-work': [
    'A ek din me 1/12, B 1/6. Jodo, fir ulta karo.',
    'Men×Days same = 80. 80 ÷ 8 men.',
    '5 ghante me poora. 1 ghante me kitna hissa?',
  ],
  'time-speed-distance': [
    'Distance = Speed × Time.',
    'km/h ko m/s: × 5/18.',
    'Speed = doori ÷ samay = 100 ÷ 5.',
    'Average speed = total distance ÷ total time.',
  ],
  algebra: [
    'Identity: a²+b² = (a+b)² − 2ab.',
    'a²−b² = (a+b)(a−b). Yahan b²=9.',
    '(x+1/x)² = x²+1/x²+2. To ghatao 2.',
    'Yeh standard result hai — expand karo, beech ke term cancel/double dekho.',
  ],
  geometry: [
    'Kisi bhi triangle ke teeno andar ke angle ka jod.',
    'Sab barabar — 180 ko 3 se baato.',
    'Vyas (diameter) pe bana angle hamesha kitna?',
    'Char bhuja wali aakriti ke saare angle ka jod.',
  ],
  mensuration: [
    'Area = πr². π=22/7, r=7.',
    'Cube ka volume = side³.',
    'Area = lambai × chaudai.',
    'Perimeter = 4 × side.',
  ],
  trigonometry: [
    'Standard value yaad karo: sin 90°.',
    'cos 0° ki value.',
    'tan 45° — famous value.',
    'Identity: sin²θ + cos²θ hamesha kitna?',
  ],
  'data-interpretation': [
    'Pie me 100% = 360°. To 25% = 360 ka chautha.',
    '500 ka 20% = 500 × 20/100.',
    'Poora circle kitne degree ka?',
  ],

  // ---------- ENGLISH ----------
  'reading-comprehension': [
    '"It builds trust" — yahan "It" kis shabd ke liye aaya? Pichla shabd dekho.',
    'Passage me band hone (close) ka time dhoondo.',
  ],
  'fill-blanks': [
    '"Good" ke saath kaunsa preposition? (kisi cheez me accha hona.)',
    'Ek fixed time (2010) ke saath "since" ya "for"? (point of time.)',
    '"Fond" ke saath fix preposition kaunsa.',
  ],
  'error-spotting': [
    '"He" (third person) ke saath "do" ya "does"?',
    '"One of the…" ke baad verb singular hota ya plural?',
    '"Senior" ke saath "than" aata ya "to"?',
  ],
  'sentence-improvement': [
    'Double comparative galat — "more" aur "-er" ek saath nahi.',
    '"Go" ka past participle "went" ya "gone"? (have ke saath.)',
  ],
  'synonyms-antonyms': [
    'Happy = khush. Same matlab wala shabd.',
    'Brave = bahadur. Iska ulta (darpok).',
    'Begin = shuru karna. Same matlab.',
    'Ancient = praacheen/purana. Iska ulta (naya).',
  ],
  'one-word': [
    'Jo padh-likh na sake — ek shabd.',
    'Bachchon ka ilaaj karne wala doctor.',
    'Kitabon ka shaukeen — ek shabd.',
  ],
  idioms: [
    '"Cake ka tukda" — figurative matlab: kaisa kaam?',
    '"Cat ko bag se bahar karna" ka chhupa matlab.',
    '"Ice todna" ka asli matlab — kis cheez ki shuruaat?',
  ],
  spelling: [
    'Sahi spelling chuno — "finite" chhupa hai isme.',
    'Yaad: ek "c", do "s" (Necessary).',
    '"Govern" + ment — beech ka "n" mat bhoolo.',
  ],
  voice: [
    'Passive: object (apple) pehle. is/are + verb ki 3rd form + by.',
    'Past tense passive: was/were + verb ki 3rd form.',
  ],
  speech: [
    'Indirect me tense ek step peeche (am→was), "I"→"he".',
    'Order/command ko indirect: told + to + verb.',
  ],
  'para-jumbles': [
    'Pehla vaakya swatantra hota — usme "it/this" jaisa reference nahi.',
    'Jo shabd pichli baat par depend kare, wo pehle nahi aa sakta.',
  ],
  'cloze-test': [
    '"… tired to walk" — "too … to" structure (itna ki na kar sake).',
    'Universal truth (hamesha sach) — simple present verb.',
  ],
};

export function getHint(topicId, index) {
  const arr = HINTS[topicId];
  if (arr && arr[index] != null) return arr[index];
  return null;
}
