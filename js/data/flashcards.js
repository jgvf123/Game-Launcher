// Starter flashcards per topic — formulas, rules & facts.
// Keyed by topicId. Front = sawaal/prompt, Back = jawaab. Aur cards baad me add karna easy.

export const FLASHCARDS = {
  // ---------- REASONING ----------
  analogy: [
    { front: 'Analogy solve karne ka pehla step?', back: 'Pehle pair ka exact relation pakdo, fir wahi relation second pair pe lagao.' },
    { front: 'Hand : Glove :: Foot : ?', back: 'Sock — jaise hand pe glove, waise foot pe sock pehente hain.' },
    { front: 'Common analogy relations?', back: 'Worker–tool, cause–effect, part–whole, opposite, item–category.' },
  ],
  classification: [
    { front: 'Classification (odd one out) ka rule?', back: '4 me se 3 ek common property share karte hain, 1 nahi — wahi answer.' },
    { front: '3, 5, 7, 9, 11 — odd one?', back: '9 — baaki sab prime, 9 composite (3×3).' },
  ],
  'coding-decoding': [
    { front: 'A=1, Z=?', back: '26. Position yaad: EJOTY = 5,10,15,20,25.' },
    { front: 'CAT ko +1 shift karo', back: 'DBU (C→D, A→B, T→U).' },
    { front: 'Reverse alphabet: A↔?', back: 'Z (A↔Z, B↔Y, C↔X… "ATBASH" pattern). Sum of positions = 27.' },
  ],
  series: [
    { front: '2, 6, 12, 20, 30, ? pattern?', back: '42. Difference badh raha: +4,+6,+8,+10,+12 (n²+n).' },
    { front: '1, 4, 9, 16, ? ', back: '25 — perfect squares (1²,2²,3²,4²,5²).' },
    { front: 'Series me kya-kya check karein?', back: 'Difference, multiplication, squares/cubes, alternate pattern, prime numbers.' },
  ],
  'blood-relations': [
    { front: 'Blood relation best method?', back: 'Family tree diagram banao — symbols se (male/female, generation lines).' },
    { front: "Mother's brother kaun?", back: 'Maternal uncle (Mama).' },
    { front: "Father's father?", back: 'Paternal grandfather (Dada).' },
  ],
  'direction-sense': [
    { front: 'Right turn pe direction kaise badalti?', back: 'N→E→S→W→N (clockwise). Left turn ulta (anti-clockwise).' },
    { front: 'Shortest distance kaise nikaalein?', back: 'Pythagoras: √(x² + y²) jab raasta L-shape ho.' },
  ],
  syllogism: [
    { front: 'Syllogism solve karne ka best tool?', back: 'Venn diagram — har statement ko circles me draw karo.' },
    { front: '"All A are B" ka matlab?', back: 'Poora A circle, B ke andar. Par har B, A ho zaroori nahi.' },
    { front: '"Some A are B" me possibility?', back: 'Some B are A bhi hamesha true (some reversible hota hai).' },
  ],
  'venn-diagram': [
    { front: 'Dog, Animal, Cat — Venn kaisa?', back: 'Dog aur Cat alag-alag circles, dono Animal ke andar.' },
    { front: 'Overlap region kya dikhata hai?', back: 'Jo elements dono groups me common hain.' },
  ],
  'seating-arrangement': [
    { front: 'Seating arrangement me pehle kya lagayein?', back: 'Fixed/definite clues pehle, fir conditional clues.' },
    { front: 'Circular table, facing centre — left/right?', back: "Person ka left = aapka right (ulta hota hai)." },
  ],
  'mirror-water-image': [
    { front: 'Mirror image me kya badalta?', back: 'Left ↔ Right ulta (vertical line of symmetry).' },
    { front: 'Water image me kya badalta?', back: 'Top ↔ Bottom ulta (horizontal flip).' },
    { front: 'Kaunse letters mirror me same?', back: 'A, H, I, M, O, T, U, V, W, X, Y (vertically symmetric).' },
  ],
  'paper-folding': [
    { front: 'Paper folding ka core idea?', back: 'Fold line ke aar-paar har cut symmetric (mirror) hoke repeat hota hai.' },
    { front: 'Solve kaise karein?', back: 'Reverse me socho — unfold karke har cut ko mirror karo.' },
  ],
  dice: [
    { front: 'Standard dice ka rule?', back: 'Opposite faces ka sum = 7 (1-6, 2-5, 3-4).' },
    { front: 'Do positions diye ho to opposite kaise?', back: 'Jo face dono positions me common hai uske adjacent saare — baaki uska opposite.' },
  ],
  'math-operations': [
    { front: 'Symbol replacement ke baad order?', back: 'BODMAS: Bracket, Of, Division, Multiplication, Addition, Subtraction.' },
    { front: 'If + means ×, then 4 + 5 = ?', back: '20 (4 × 5).' },
  ],
  'counting-figures': [
    { front: 'Figures kaise gino, miss na ho?', back: 'Chhote (single) se shuru, fir 2-2, 3-3 combine karte jao; parts ko label karo.' },
  ],
  'statement-conclusion': [
    { front: 'Conclusion kaise judge karein?', back: 'Sirf diye statement ke base par — apni real-world knowledge mat milao.' },
  ],

  // ---------- GENERAL AWARENESS ----------
  history: [
    { front: 'Indus Valley Civilization ki cities?', back: 'Harappa, Mohenjo-daro, Lothal, Dholavira.' },
    { front: 'Quit India Movement kab?', back: '1942, Mahatma Gandhi ke netritva me.' },
    { front: 'First Battle of Panipat kab & kiske beech?', back: '1526 — Babur vs Ibrahim Lodi (Mughal empire shuru).' },
  ],
  geography: [
    { front: 'India ki sabse lambi nadi?', back: 'Ganga.' },
    { front: 'Tropic of Cancer India ke kitne states se?', back: '8 states se guzarti hai.' },
    { front: 'India ka sabse bada state (area)?', back: 'Rajasthan.' },
  ],
  polity: [
    { front: 'Indian Constitution kab laagu hua?', back: '26 January 1950.' },
    { front: 'Right to Equality kaunsa Article?', back: 'Articles 14–18.' },
    { front: 'Fundamental Duties kaunse Article me?', back: 'Article 51A (42nd Amendment, 1976 se jode gaye).' },
  ],
  economy: [
    { front: 'RBI ki sthaapna kab?', back: '1935. Headquarter: Mumbai.' },
    { front: 'GDP ka full form?', back: 'Gross Domestic Product.' },
    { front: 'Budget kaun present karta hai?', back: 'Finance Minister (Article 112 — Annual Financial Statement).' },
  ],
  'general-science': [
    { front: 'Force ka SI unit?', back: 'Newton (N).' },
    { front: 'Paani ka chemical formula?', back: 'H₂O.' },
    { front: 'Insaan ke body me kitni haddiyaan (adult)?', back: '206.' },
  ],
  'static-gk': [
    { front: 'India ka National Animal?', back: 'Bengal Tiger.' },
    { front: 'India ka National Bird?', back: 'Peacock (Mor).' },
    { front: 'Bharatnatyam kis state ka dance?', back: 'Tamil Nadu.' },
  ],
  'current-affairs': [
    { front: 'Current affairs kaise yaad rakhein?', back: 'Roz 15 min news app/newspaper + monthly revision notes.' },
    { front: 'Important areas?', back: 'Schemes, appointments, awards, sports, summits, science-tech.' },
  ],
  'misc-gk': [
    { front: '"Wings of Fire" ke author?', back: 'Dr. APJ Abdul Kalam.' },
    { front: 'Nobel Prize kis kshetra me nahi?', back: 'Mathematics me Nobel nahi diya jaata.' },
    { front: 'FIFA kis khel se juda?', back: 'Football.' },
  ],

  // ---------- QUANTITATIVE APTITUDE ----------
  'number-system': [
    { front: 'Divisibility by 3?', back: 'Digits ka sum 3 se divisible ho.' },
    { front: 'Divisibility by 11?', back: 'Alternate digits ka difference 0 ya 11 ka multiple ho.' },
    { front: 'LCM × HCF = ?', back: 'Product of the two numbers (a × b).' },
  ],
  percentage: [
    { front: '1/8 ko percentage me?', back: '12.5%.' },
    { front: 'A, B se 25% zyada — B, A se kitne % kam?', back: '20%. (x% zyada → x/(100+x) kam)' },
    { front: 'Successive 10% & 20% increase net?', back: '+32%. (formula: a+b+ab/100)' },
  ],
  'ratio-proportion': [
    { front: 'a:b = c:d me kya equal hota?', back: 'Cross product: a×d = b×c.' },
    { front: '₹600 ko 2:3 me baato', back: '₹240 aur ₹360.' },
  ],
  average: [
    { front: 'Average ka formula?', back: 'Sum of values ÷ number of values.' },
    { front: 'First n natural numbers ka average?', back: '(n+1)/2.' },
  ],
  'si-ci': [
    { front: 'Simple Interest formula?', back: 'SI = (P × R × T) / 100.' },
    { front: 'Compound Interest amount?', back: 'A = P(1 + R/100)ⁿ ; CI = A − P.' },
    { front: '2 saal me CI − SI = ?', back: 'P × (R/100)².' },
  ],
  'profit-loss': [
    { front: 'Profit% kis par nikalte hain?', back: 'Cost Price (CP) par. Profit% = (Profit/CP)×100.' },
    { front: 'Discount kis par lagta hai?', back: 'Marked Price (MP) par.' },
    { front: 'SP jab 20% profit, CP=₹500?', back: '₹600 (CP × 1.20).' },
  ],
  'mixture-alligation': [
    { front: 'Alligation rule kis kaam aata?', back: 'Do cheezein milakar ratio nikaalne me (cross method).' },
    { front: 'Alligation formula?', back: '(Cheap qty)/(Dear qty) = (Dear price − Mean)/(Mean − Cheap price).' },
  ],
  'time-work': [
    { front: 'A 10 din me kaam karta, 1 din me?', back: '1/10 kaam.' },
    { front: 'A=10d, B=15d, saath me?', back: '6 din. (1/10+1/15 = 1/6)' },
  ],
  'time-speed-distance': [
    { front: 'Speed formula?', back: 'Speed = Distance / Time.' },
    { front: 'km/h ko m/s me?', back: '× 5/18.' },
    { front: 'Same direction me relative speed?', back: 'Speeds ka difference (a − b).' },
  ],
  algebra: [
    { front: '(a+b)² = ?', back: 'a² + 2ab + b².' },
    { front: 'a² − b² = ?', back: '(a+b)(a−b).' },
    { front: 'a³ + b³ = ?', back: '(a+b)(a² − ab + b²).' },
    { front: 'Agar a + 1/a = 2, to a = ?', back: '1 (kyunki a=1 hi satisfy karta).' },
  ],
  geometry: [
    { front: 'Triangle ke andar ke angles ka sum?', back: '180°.' },
    { front: 'Centroid medians ko kis ratio me?', back: '2:1 (vertex se).' },
    { front: 'Semicircle me bana angle?', back: '90° (angle in semicircle).' },
  ],
  mensuration: [
    { front: 'Circle ka area?', back: 'πr².' },
    { front: 'Cylinder ka volume?', back: 'πr²h.' },
    { front: 'Sphere ka volume?', back: '(4/3)πr³.' },
    { front: 'Cone ka volume?', back: '(1/3)πr²h.' },
  ],
  trigonometry: [
    { front: 'sin²θ + cos²θ = ?', back: '1.' },
    { front: 'sin 30° = ?', back: '1/2.' },
    { front: 'tan 45° = ?', back: '1.' },
    { front: 'cos 60° = ?', back: '1/2.' },
  ],
  'data-interpretation': [
    { front: 'DI me time kaise bachayein?', back: 'Pehle graph/table ka title & units samjho, fir approx & ratio se calculate.' },
    { front: 'Pie chart total kitne degree?', back: '360° = 100%.' },
  ],

  // ---------- ENGLISH ----------
  'reading-comprehension': [
    { front: 'RC ka best strategy?', back: 'Pehle questions padho, fir passage scan karke answer dhoondo.' },
    { front: 'Inference question me kya na karein?', back: 'Apni outside knowledge mat lagao — sirf passage se.' },
  ],
  'fill-blanks': [
    { front: 'Blank fill karne ka clue?', back: 'Context + grammar (tense, preposition, collocation) dono dekho.' },
  ],
  'error-spotting': [
    { front: 'Subject-verb agreement rule?', back: 'Singular subject → singular verb. "Each/Every/One of" → singular verb.' },
    { front: '"He do not" — kya galat?', back: '"do" → "does" (third person singular).' },
  ],
  'sentence-improvement': [
    { front: 'Sentence improvement me option?', back: 'Sahi & concise version; kabhi "No improvement" bhi correct answer.' },
  ],
  'synonyms-antonyms': [
    { front: 'Synonym of "Benevolent"?', back: 'Kind / generous.' },
    { front: 'Antonym of "Candid"?', back: 'Deceptive / dishonest.' },
  ],
  'one-word': [
    { front: 'One who studies stars?', back: 'Astronomer.' },
    { front: 'A government by the people?', back: 'Democracy.' },
    { front: 'One who eats everything?', back: 'Omnivore.' },
  ],
  idioms: [
    { front: '"Once in a blue moon" matlab?', back: 'Bahut kabhi-kabhi / very rarely.' },
    { front: '"To bite the dust" matlab?', back: 'Haar jaana / fail or die.' },
  ],
  spelling: [
    { front: 'Sahi spelling: Recieve / Receive?', back: 'Receive ("i before e, except after c").' },
    { front: 'Sahi: Embarass / Embarrass?', back: 'Embarrass (double r, double s).' },
  ],
  voice: [
    { front: 'Active → Passive me kya hota?', back: 'Object subject ban jaata hai; verb 3rd form + by + old subject.' },
    { front: '"She writes a letter" passive?', back: '"A letter is written by her."' },
  ],
  speech: [
    { front: 'Direct → Indirect me tense?', back: 'Generally ek step peeche (present→past, etc.).' },
    { front: '"said to" indirect me?', back: '"told".' },
  ],
  'para-jumbles': [
    { front: 'Para jumble pehla step?', back: 'Opening sentence dhoondo (independent, koi pronoun reference nahi).' },
    { front: 'Sequence kaise jodein?', back: 'Linking words, pronouns aur time order follow karo.' },
  ],
  'cloze-test': [
    { front: 'Cloze test approach?', back: 'Poora passage ek baar padho, fir context + grammar se har blank bharo.' },
  ],
};

export function getFlashcards(topicId) {
  return FLASHCARDS[topicId] || [];
}
