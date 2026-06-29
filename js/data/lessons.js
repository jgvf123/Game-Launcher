// Study material per topic (Hinglish). Pehle PADHO, fir quiz.
// Block types: { h } heading, { p } para, { list:[] } points, { tip } highlight, { eg } example.
// Keyed by topicId. Content add/expand karna easy.

export const LESSONS = {
  // ================= REASONING =================
  analogy: [
    { p: 'Analogy ka matlab — do cheezon ke beech ka RELATION (rishta) pehchaanna, aur wahi relation doosri jodi par lagaana.' },
    { h: 'Kaise solve karein', list: ['Pehli jodi ka relation socho (kaam, jagah, opposite, part-whole).', 'Wahi relation doosri jodi par apply karo.'] },
    { eg: 'Pen : Write :: Knife : ? → Pen se likhte hain, to Knife se kaatte hain → Cut.' },
    { tip: 'Relation ko ek chhote vaakya me bolo: "Pen se likhte hain" — fir wahi line knife pe try karo.' },
  ],
  classification: [
    { p: 'Classification (Odd one out) — diye gaye options me se wo dhoondo jo baaki sabse ALAG hai.' },
    { h: 'Trick', list: ['4 me se 3 ek common property share karte hain.', 'Jo property share nahi karta wahi answer.'] },
    { eg: 'Rose, Lotus, Lily, Mango → teen phool hain, Mango fruit hai → Mango odd.' },
  ],
  'coding-decoding': [
    { p: 'Letters/numbers ko ek secret code me badla jaata hai. Aapko pattern pakad ke decode karna hota hai.' },
    { h: 'Zaroori cheez — letter positions', list: ['A=1, B=2, C=3 … Z=26', 'Yaad rakho: EJOTY = 5,10,15,20,25 (5 ke table se).'] },
    { eg: 'RED → SFE. Har letter +1 hua (R→S, E→F, D→E). To BLUE → CMVF.' },
    { tip: 'Pehle dekho letter aage badha (+) ya peeche (−), aur kitne se.' },
  ],
  series: [
    { p: 'Numbers/letters ek pattern me aate hain — agla kya aayega wo nikaalna hota hai.' },
    { h: 'Patterns dekho', list: ['Difference (+2,+4,+6…)', 'Multiplication (×2, ×3…)', 'Squares/Cubes (1,4,9,16…)', 'Alternate series (do pattern saath me)'] },
    { eg: '3, 6, 11, 18, ? → difference +3,+5,+7,+9 → 18+9 = 27.' },
  ],
  'blood-relations': [
    { p: 'Family ke rishton ke sawaal. Diagram (family tree) bana ke solve karna sabse safe hai.' },
    { h: 'Common rishte', list: ['Father ka father = Dada (paternal grandfather)', 'Mother ka brother = Mama (maternal uncle)', 'Father ki sister = Bua'] },
    { eg: '"He is the son of my grandfather\'s only son" → grandfather ka only son = mera father → uska son = mera Brother.' },
  ],
  'direction-sense': [
    { p: 'North-South-East-West ki samajh. Hamesha North ko upar maan kar kaagaz pe arrow banao.' },
    { h: 'Turns', list: ['Right turn (clockwise): N→E→S→W→N', 'Left turn (anti-clockwise): N→W→S→E→N'] },
    { tip: 'Shortest distance jab raasta L-shape ho: √(x² + y²) — Pythagoras. Jaise 3 aur 4 → 5.' },
  ],
  syllogism: [
    { p: 'Statements diye hote hain, aur batana hota hai ki conclusion pakka nikalta hai ya nahi. Venn diagram banao.' },
    { h: 'Words ka matlab', list: ['All A are B → poora A, B ke andar', 'Some A are B → thoda overlap', 'No A is B → bilkul alag'] },
    { tip: '"Some A are B" sahi ho to "Some B are A" bhi hamesha sahi hota hai.' },
  ],
  'venn-diagram': [
    { p: 'Cheezon ka aapas ka rishta circles se dikhaya jaata hai.' },
    { h: 'Soch', list: ['Alag cheezein = alag circle', 'Common cheez = overlap (beech ka hissa)', 'Ek cheez doosre ka part = chhota circle bade ke andar'] },
    { eg: 'Tennis, Football, Games → Tennis & Football alag circle, dono Games ke andar.' },
  ],
  'seating-arrangement': [
    { p: 'Logon ko line ya circle me bithaana, clues ke hisaab se.' },
    { h: 'Method', list: ['Fixed/definite clue pehle lagao.', 'Facing direction dhyan rakho.', 'Circle me andar mooh ho to person ka left = aapka right.'] },
  ],
  'mirror-water-image': [
    { h: 'Mirror image', p: 'Left ↔ Right ulta ho jaata hai (jaise aaina).' },
    { h: 'Water image', p: 'Top ↔ Bottom ulta ho jaata hai (jaise paani me reflection).' },
    { tip: 'Kuch letters mirror me same dikhte hain: A, H, I, M, O, T, U, V, W, X, Y.' },
  ],
  'paper-folding': [
    { p: 'Kaagaz ko fold karke hole/cut karte hain, fir khol kar pattern poochte hain.' },
    { h: 'Rule', list: ['Fold line ke aar-paar har cut MIRROR hoke double hota hai.', 'Reverse me socho — unfold karte jao.'] },
    { eg: 'Ek baar fold + 1 hole punch → khol ne par 2 holes.' },
  ],
  dice: [
    { p: 'Dice (paasa) ke faces ke sawaal — opposite/adjacent face pehchaanna.' },
    { h: 'Standard dice rule', list: ['Opposite faces ka sum = 7 → (1-6), (2-5), (3-4).'] },
    { tip: 'Do positions diye ho to: jo number dono me common dikhe, uske saare adjacent — baaki uska opposite.' },
  ],
  'math-operations': [
    { p: 'Symbols (+, −, ×, ÷) ka matlab badal diya jaata hai. Pehle replace karo, fir BODMAS lagao.' },
    { h: 'BODMAS order', list: ['Bracket → Of → Division → Multiplication → Addition → Subtraction'] },
    { eg: 'Agar + ka matlab × ho: 6 + 2 = 6×2 = 12.' },
  ],
  'counting-figures': [
    { p: 'Diye figure me triangles/squares ginna — ek bhi miss nahi.' },
    { h: 'Method', list: ['Pehle sabse chhote figure gino.', 'Fir 2-2, 3-3 mila ke bade gino.', 'Parts ko A, B, C label karo.'] },
    { eg: '3×3 board (tic-tac-toe) me squares = 9 + 4 + 1 = 14.' },
  ],
  'statement-conclusion': [
    { p: 'Diye statement se kya pakka nikalta hai — sirf usi statement ke base par judge karo.' },
    { tip: 'Apni real-world knowledge mat milao. Jo likha hai bas usi se decide karo.' },
  ],

  // ================= GENERAL AWARENESS =================
  history: [
    { h: 'Yaad rakhne layak', list: ['Indus Valley: Harappa, Mohenjo-daro (Great Bath), Lothal.', 'Mughal: Babur (Panipat 1526) → Akbar → Shah Jahan (Taj Mahal) → Aurangzeb.', 'Freedom: 1857 revolt, 1919 Jallianwala Bagh, 1942 Quit India.'] },
    { tip: 'Dates aur "kisne kya banaya/kiya" — yeh aksar poocha jaata hai.' },
  ],
  geography: [
    { h: 'Key facts', list: ['Sabse lambi nadi: Ganga.', 'Sabse bada state (area): Rajasthan.', 'Tropic of Cancer 8 Indian states se guzarti hai.', 'India ki highest peak (India me poori): Kangchenjunga.'] },
  ],
  polity: [
    { h: 'Constitution basics', list: ['Adopt: 26 Nov 1949 | Laagu: 26 Jan 1950.', 'Fundamental Rights: 6 (abhi).', 'Fundamental Duties: Article 51A.', 'President min. age: 35.'] },
  ],
  economy: [
    { h: 'Important', list: ['RBI sthaapna: 1935 (HQ Mumbai).', 'Budget: Finance Minister present karta (Article 112).', 'GST laagu: 1 July 2017.', 'NITI Aayog ne Planning Commission ko replace kiya (2015).'] },
  ],
  'general-science': [
    { h: 'Physics/Chemistry/Biology basics', list: ['Force ka unit: Newton. Current: Ampere.', 'Paani: H₂O. Gold: Au, Silver: Ag.', 'Photosynthesis me plant CO₂ leti, O₂ deti.', 'Dhoop se skin par Vitamin D banta.'] },
  ],
  'static-gk': [
    { h: 'National symbols', list: ['Animal: Tiger | Bird: Peacock | Flower: Lotus.', 'Aquatic animal: Gangetic Dolphin.', 'Tiranga me Ashok Chakra ke 24 spokes.'] },
    { tip: 'Classical dances: Bharatnatyam (Tamil Nadu), Kathakali (Kerala), Odissi (Odisha).' },
  ],
  'current-affairs': [
    { p: 'Latest 6-12 months ki news — schemes, appointments, awards, sports, summits.' },
    { tip: 'Roz 15 min news app/newspaper padho aur chhote notes banao. Yeh portion roz update hota hai.' },
  ],
  'misc-gk': [
    { h: 'Books, Awards, Sports', list: ['"Wings of Fire" → APJ Abdul Kalam.', '"Discovery of India" → Nehru.', 'Dronacharya Award → sports coaching.', 'Booker Prize → Literature; FIFA → Football.'] },
  ],

  // ================= QUANTITATIVE APTITUDE =================
  'number-system': [
    { h: 'Divisibility rules', list: ['÷2: last digit even', '÷3: digits ka sum 3 se kate', '÷5: last digit 0/5', '÷9: digits ka sum 9 se kate', '÷11: alternate digits ka difference 0/11'] },
    { tip: 'LCM × HCF = dono numbers ka product (a × b).' },
  ],
  percentage: [
    { p: 'Percentage matlab "per 100". Har Quant topic me kaam aata hai.' },
    { h: 'Useful', list: ['Fraction→%: ×100 (jaise 3/5 = 60%).', '1/8 = 12.5%, 1/4 = 25%, 1/3 ≈ 33.3%.', 'x% zyada → x/(100+x) kam.'] },
    { eg: 'A, B se 25% zyada → B, A se 25/125 = 20% kam.' },
  ],
  'ratio-proportion': [
    { p: 'Ratio = cheezon ki tulna (a:b). Proportion = do ratio barabar (a:b = c:d).' },
    { h: 'Rule', list: ['a:b = c:d me → a×d = b×c (cross product).', 'Amount baatna: parts jod ke har part ki value nikaalo.'] },
    { eg: '₹500 ko 2:3 me → 5 parts, 500/5=100 → ₹200 aur ₹300.' },
  ],
  average: [
    { h: 'Formula', p: 'Average = (saare numbers ka sum) ÷ (kitne numbers hain).' },
    { tip: 'First n natural numbers ka average = (n+1)/2.' },
    { eg: '10,20,30,40,50 → sum 150 ÷ 5 = 30.' },
  ],
  'si-ci': [
    { h: 'Simple Interest', p: 'SI = (P × R × T) / 100.' },
    { h: 'Compound Interest', p: 'Amount = P(1 + R/100)ⁿ ; CI = Amount − P.' },
    { tip: '2 saal me CI − SI = P × (R/100)². (Jaldi answer ke liye.)' },
    { eg: '₹1000, 10%, 2yr → SI = 200, CI = 210.' },
  ],
  'profit-loss': [
    { h: 'Yaad rakho', list: ['Profit%/Loss% hamesha CP (cost price) par.', 'Discount hamesha MP (marked price) par.', 'SP = CP × (100 ± profit/loss%)/100.'] },
    { eg: 'CP ₹100, SP ₹120 → Profit% = 20/100 ×100 = 20%.' },
  ],
  'mixture-alligation': [
    { p: 'Do cheezein milaane par ratio nikaalna. Cross (alligation) method use karo.' },
    { h: 'Alligation', p: '(Sasti qty)/(Mehengi qty) = (Mehengi price − Mean)/(Mean − Sasti price).' },
    { eg: '₹20 & ₹30 mila ke ₹24 → (30−24):(24−20) = 6:4 = 3:2.' },
  ],
  'time-work': [
    { h: 'Core idea', p: 'Agar A kaam X din me karta hai, to 1 din me 1/X kaam karega.' },
    { eg: 'A=12d, B=6d → saath me 1/12 + 1/6 = 1/4 → 4 din.' },
    { tip: 'Men × Days = constant. (10 men 8 din → 8 men 10 din.)' },
  ],
  'time-speed-distance': [
    { h: 'Formula', p: 'Speed = Distance ÷ Time. (Distance = Speed×Time)' },
    { h: 'Conversion', list: ['km/h → m/s: × 5/18', 'm/s → km/h: × 18/5'] },
    { tip: 'Same direction: relative speed = difference. Opposite: sum.' },
  ],
  algebra: [
    { h: 'Zaroori identities', list: ['(a+b)² = a² + 2ab + b²', 'a² − b² = (a+b)(a−b)', 'a³ + b³ = (a+b)(a²−ab+b²)'] },
    { tip: 'a + 1/a diya ho to: (a+1/a)² = a² + 1/a² + 2.' },
    { eg: 'a+b=10, ab=21 → a²+b² = (a+b)²−2ab = 100−42 = 58.' },
  ],
  geometry: [
    { h: 'Yaad rakho', list: ['Triangle ke andar ke angle ka sum = 180°.', 'Quadrilateral ke angle ka sum = 360°.', 'Semicircle me bana angle = 90°.', 'Centroid medians ko 2:1 me baant ta hai.'] },
  ],
  mensuration: [
    { h: 'Area (2D)', list: ['Circle: πr² | Rectangle: l×b | Triangle: ½×base×height'] },
    { h: 'Volume (3D)', list: ['Cube: a³ | Cylinder: πr²h | Cone: ⅓πr²h | Sphere: ⅘… (4/3)πr³'] },
    { eg: 'r=7, π=22/7 → circle area = 22/7 × 49 = 154.' },
  ],
  trigonometry: [
    { h: 'Standard values', list: ['sin: 0, ½, 1/√2, √3/2, 1 (0°,30°,45°,60°,90°)', 'cos ulta order me', 'tan45° = 1'] },
    { tip: 'Identity: sin²θ + cos²θ = 1 (har angle pe).' },
  ],
  'data-interpretation': [
    { p: 'Graph/table (bar, pie, line) padh ke answer nikaalna.' },
    { h: 'Tips', list: ['Pehle title & units samjho.', 'Pie chart: poora = 360° = 100%.', 'Approx & ratio se jaldi calculate karo.'] },
  ],

  // ================= ENGLISH =================
  'reading-comprehension': [
    { p: 'Ek passage padh ke uspe sawaal — samajh ke jawaab dena.' },
    { h: 'Strategy', list: ['Pehle questions par nazar daalo, fir passage scan karo.', 'Main idea aur tone pakdo.', 'Apni opinion mat lagao — sirf passage se.'] },
  ],
  'fill-blanks': [
    { p: 'Khaali jagah me sahi shabd/grammar bharo.' },
    { tip: 'Context + grammar (preposition, tense) dono dekho. Jaise "good AT", "fond OF", "since 2010".' },
  ],
  'error-spotting': [
    { p: 'Vaakya me grammar ki galti dhoondo.' },
    { h: 'Common errors', list: ['Subject-verb: "He DOES" (do nahi).', '"One of the boys IS" (singular).', '"Senior TO" (than nahi).'] },
  ],
  'sentence-improvement': [
    { p: 'Diye gaye vaakya ke part ko grammatically sahi banao.' },
    { tip: 'Double comparative galat: "more cleverer" → "cleverer". Kabhi "No improvement" bhi sahi answer hota hai.' },
  ],
  'synonyms-antonyms': [
    { p: 'Synonym = same meaning, Antonym = opposite meaning.' },
    { tip: 'Roz 5 naye words yaad karo. Root/prefix se bhi guess kar sakte ho (un-, dis- = opposite).' },
    { eg: 'Happy ≈ Joyful (synonym). Brave ↔ Cowardly (antonym).' },
  ],
  'one-word': [
    { p: 'Ek shabd jo poori baat describe kare.' },
    { eg: 'Jo padh-likh na sake → Illiterate. Bachchon ka doctor → Pediatrician. Books ka shaukeen → Bibliophile.' },
  ],
  idioms: [
    { p: 'Idiom ka literal nahi, figurative (chhupa) matlab hota hai.' },
    { eg: '"A piece of cake" = bahut aasaan. "Break the ice" = baat-cheet shuru karna.' },
  ],
  spelling: [
    { p: 'Sahi spelling pehchaano.' },
    { tip: 'Rule: "i before e, except after c" (receive). Common: Necessary (1 c, 2 s), Definitely, Government.' },
  ],
  voice: [
    { p: 'Active → Passive: object subject ban jaata hai; verb ki 3rd form + by + purana subject.' },
    { eg: 'He eats an apple → An apple IS EATEN BY him.' },
    { tip: 'Tense same rehti hai (present→present, past→past).' },
  ],
  speech: [
    { p: 'Direct (kisi ke exact words) → Indirect (report karna).' },
    { h: 'Changes', list: ['Tense ek step peeche (am→was).', 'said to → told.', 'Time/pronoun change (today→that day).'] },
    { eg: 'He said, "I am happy" → He said that he WAS happy.' },
  ],
  'para-jumbles': [
    { p: 'Bikhre vaakyon ko sahi order me lagaana.' },
    { h: 'Tips', list: ['Opening sentence: independent, koi "it/this" reference nahi.', 'Linking words & pronouns se aage jodo.'] },
  ],
  'cloze-test': [
    { p: 'Ek passage me kai blanks — context + grammar se bharo.' },
    { tip: 'Poora passage ek baar padho, fir flow maintain karte hue har blank bharo.' },
  ],
};

export function getLesson(topicId) {
  return LESSONS[topicId] || [];
}
