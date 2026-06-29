// SSC CGL Tier 1 syllabus — 4 subjects, topics with Hinglish "kya seekhna hai".
// Structure intentionally simple so naye topics/Tier-2 baad me easily add ho saken.

export const SUBJECTS = [
  {
    id: 'reasoning',
    name: 'Reasoning',
    fullName: 'General Intelligence & Reasoning',
    icon: '🧩',
    blurb: 'Logic, patterns aur puzzles — bina ratta, sirf samajh se.',
    topics: [
      { id: 'analogy', name: 'Analogy', blurb: 'Relation pehchaano: jaise A:B waise C:?',
        learn: ['Word, number aur figure analogy', 'Pehle pair ka relation socho, fir apply karo', 'Common relations: kaam, jagah, opposite, part-whole'] },
      { id: 'classification', name: 'Classification (Odd one out)', blurb: 'Jo group me fit nahi baithta usse dhoondo.',
        learn: ['4 me se 3 ek jaise, 1 alag', 'Category, property ya pattern check karo', 'Odd one alag reason se baahar hota hai'] },
      { id: 'coding-decoding', name: 'Coding-Decoding', blurb: 'Letters/numbers ke chhupe code crack karo.',
        learn: ['Letter shifting (+1, -1, +2…)', 'Number coding aur substitution', 'A=1…Z=26 position yaad rakho'] },
      { id: 'series', name: 'Series (Number & Letter)', blurb: 'Agla number/letter kya aayega?',
        learn: ['Difference, multiplication, square/cube pattern', 'Alternate series (do patterns ek saath)', 'Letter series me gap count karo'] },
      { id: 'blood-relations', name: 'Blood Relations', blurb: 'Family tree banao, rishta nikaalo.',
        learn: ['Diagram banakar solve karo', 'Symbols use karo (+ male, − female)', 'Coded relation dhyan se padho'] },
      { id: 'direction-sense', name: 'Direction Sense', blurb: 'North-South-East-West ka khel.',
        learn: ['Hamesha North upar maan kar diagram banao', 'Left/right turns track karo', 'Shortest distance Pythagoras se'] },
      { id: 'syllogism', name: 'Syllogism', blurb: 'Statements se conclusion sach ya jhooth.',
        learn: ['Venn diagram zaroor banao', 'All / Some / No ka matlab samjho', 'Possibility case bhi check karo'] },
      { id: 'venn-diagram', name: 'Venn Diagram', blurb: 'Cheezon ke relation circles me dikhao.',
        learn: ['Overlapping groups samjho', 'Diagram match karna', 'Region wise counting'] },
      { id: 'seating-arrangement', name: 'Seating Arrangement', blurb: 'Logon ko sahi jagah bithao.',
        learn: ['Linear aur circular dono', 'Facing direction dhyan rakho', 'Fixed clues pehle lagao'] },
      { id: 'mirror-water-image', name: 'Mirror & Water Image', blurb: 'Reflection me cheez kaisi dikhegi?',
        learn: ['Mirror image: left-right ulta', 'Water image: upar-neeche ulta', 'Symmetric letters same rehte hain'] },
      { id: 'paper-folding', name: 'Paper Folding & Cutting', blurb: 'Fold karke kaata to khol kar kaisa?',
        learn: ['Fold lines ka symmetry samjho', 'Har cut mirror hoke double hota hai', 'Reverse me socho'] },
      { id: 'dice', name: 'Dice & Cubes', blurb: 'Dice ke opposite face dhoondo.',
        learn: ['Do positions se opposite nikaalo', 'Adjacent vs opposite faces', 'Standard dice rule (sum 7)'] },
      { id: 'math-operations', name: 'Mathematical Operations', blurb: 'Symbols ke naye matlab (BODMAS).',
        learn: ['Diye gaye symbols replace karo', 'BODMAS order follow karo', 'Sign change wale questions dhyan se'] },
      { id: 'counting-figures', name: 'Counting Figures', blurb: 'Triangles/squares gin lo — ek bhi miss nahi.',
        learn: ['Chhote se bade order me gino', 'Label A,B,C lagao', 'Overlap wale figures alag se'] },
      { id: 'statement-conclusion', name: 'Statement & Conclusion', blurb: 'Diye statement se kya pakka nikalta hai.',
        learn: ['Sirf statement se judge karo', 'Apni knowledge mat milao', 'Assume kuch extra mat karo'] },
    ],
  },
  {
    id: 'ga',
    name: 'General Awareness',
    fullName: 'General Awareness',
    icon: '🌍',
    blurb: 'History, Polity, Science, GK aur current affairs — thoda roz.',
    topics: [
      { id: 'history', name: 'History', blurb: 'Ancient se modern India tak.',
        learn: ['Indus Valley, Mauryan, Mughal, Gupta', 'Freedom struggle ke movements', 'Important dates & leaders'] },
      { id: 'geography', name: 'Geography', blurb: 'India aur world ki bhugol.',
        learn: ['Rivers, mountains, climate', 'Indian states & capitals', 'World continents & oceans'] },
      { id: 'polity', name: 'Polity & Constitution', blurb: 'Constitution, rights, government.',
        learn: ['Fundamental Rights & Duties', 'Parliament, President, PM', 'Important Articles & Amendments'] },
      { id: 'economy', name: 'Economy', blurb: 'Indian economy ki basics.',
        learn: ['Budget, GDP, inflation', 'Banking & RBI', 'Important schemes'] },
      { id: 'general-science', name: 'General Science', blurb: 'Physics, Chemistry, Biology basics.',
        learn: ['Daily-life science (units, laws)', 'Human body & diseases', 'Elements & reactions basics'] },
      { id: 'static-gk', name: 'Static GK', blurb: 'Jo facts kabhi nahi badalte.',
        learn: ['National symbols, dances, festivals', 'Stadiums, monuments, parks', 'First in India / World'] },
      { id: 'current-affairs', name: 'Current Affairs', blurb: 'Latest 6-12 months ki news.',
        learn: ['Schemes, appointments, summits', 'Awards & sports events', 'Roz newspaper/app se update'] },
      { id: 'misc-gk', name: 'Books, Awards, Sports & Days', blurb: 'Author, award, khel, important din.',
        learn: ['Books & their authors', 'National & international awards', 'Important days & sports cups'] },
    ],
  },
  {
    id: 'quant',
    name: 'Quantitative Aptitude',
    fullName: 'Quantitative Aptitude',
    icon: '🔢',
    blurb: 'Maths ka practice — formula yaad + speed.',
    topics: [
      { id: 'number-system', name: 'Number System', blurb: 'Numbers ke rules, divisibility, LCM/HCF.',
        learn: ['Divisibility rules (2,3,4,5,9,11)', 'LCM & HCF', 'Remainder & unit digit tricks'] },
      { id: 'percentage', name: 'Percentage', blurb: 'Har topic ki jaan — %.',
        learn: ['Fraction ↔ percentage conversion', 'Increase/decrease %', 'Successive percentage'] },
      { id: 'ratio-proportion', name: 'Ratio & Proportion', blurb: 'Cheezein kis ratio me baatein.',
        learn: ['a:b ko simplify karna', 'Proportion (a:b = c:d)', 'Dividing amount in ratio'] },
      { id: 'average', name: 'Average', blurb: 'Mean nikalna fast.',
        learn: ['Average = sum ÷ count', 'New average jab koi add/remove ho', 'Age & weight problems'] },
      { id: 'si-ci', name: 'Simple & Compound Interest', blurb: 'Paisa kitna badhega.',
        learn: ['SI = PRT/100', 'CI = P(1+R/100)^n − P', 'Difference of CI & SI for 2 yrs = P(R/100)²'] },
      { id: 'profit-loss', name: 'Profit, Loss & Discount', blurb: 'Kharido-becho ka hisaab.',
        learn: ['Profit% & Loss% on CP', 'Discount on MP', 'Marked price vs selling price'] },
      { id: 'mixture-alligation', name: 'Mixture & Alligation', blurb: 'Do cheezein milao, ratio nikaalo.',
        learn: ['Alligation rule (cross method)', 'Mean price', 'Replacement problems'] },
      { id: 'time-work', name: 'Time & Work', blurb: 'Kaam kitne din me poora.',
        learn: ['1 din ka kaam = 1/days', 'Combined work', 'Efficiency & wages'] },
      { id: 'time-speed-distance', name: 'Time, Speed & Distance', blurb: 'Chaal, doori, samay.',
        learn: ['Speed = distance/time', 'Trains, boats & streams', 'Relative speed'] },
      { id: 'algebra', name: 'Algebra', blurb: 'Identities aur equations.',
        learn: ['(a+b)², a²−b², a³±b³', 'Linear & quadratic equations', 'a+1/a wale identities'] },
      { id: 'geometry', name: 'Geometry', blurb: 'Triangles, circles, lines.',
        learn: ['Triangle properties & centres', 'Circle: tangent, chord, angle', 'Lines & angles theorems'] },
      { id: 'mensuration', name: 'Mensuration', blurb: '2D area & 3D volume.',
        learn: ['Area: triangle, circle, quad', 'Volume: cube, cylinder, cone, sphere', 'Surface area formulas'] },
      { id: 'trigonometry', name: 'Trigonometry', blurb: 'Sin-cos-tan aur heights.',
        learn: ['Standard angle values (0–90°)', 'Identities (sin²+cos²=1)', 'Height & distance'] },
      { id: 'data-interpretation', name: 'Data Interpretation', blurb: 'Graph/table padho, answer nikaalo.',
        learn: ['Bar, pie, line, table', 'Percentage & ratio from data', 'Speed me calculation'] },
    ],
  },
  {
    id: 'english',
    name: 'English',
    fullName: 'English Comprehension',
    icon: '📘',
    blurb: 'Grammar, vocabulary aur comprehension — daily thoda.',
    topics: [
      { id: 'reading-comprehension', name: 'Reading Comprehension', blurb: 'Passage padho, samjho, answer do.',
        learn: ['Pehle question, fir passage scan', 'Main idea & tone pakdo', 'Apni opinion mat lagao'] },
      { id: 'fill-blanks', name: 'Fill in the Blanks', blurb: 'Sahi shabd/grammar bharo.',
        learn: ['Context se word choose karo', 'Grammar (preposition, tense)', 'Collocation samjho'] },
      { id: 'error-spotting', name: 'Error Spotting', blurb: 'Galti kaha hai pehchaano.',
        learn: ['Subject-verb agreement', 'Tense & preposition errors', 'Article (a/an/the) rules'] },
      { id: 'sentence-improvement', name: 'Sentence Improvement', blurb: 'Vaakya ko behtar banao.',
        learn: ['Grammatically correct option', 'Concise & clear version', 'No-improvement bhi option ho sakta'] },
      { id: 'synonyms-antonyms', name: 'Synonyms & Antonyms', blurb: 'Same ya opposite meaning.',
        learn: ['Roz naye words yaad karo', 'Root words se guess', 'Context me meaning'] },
      { id: 'one-word', name: 'One Word Substitution', blurb: 'Ek shabd jo poora describe kare.',
        learn: ['Common substitutions ratte', 'Prefix/suffix se hint', 'Practice se pakad'] },
      { id: 'idioms', name: 'Idioms & Phrases', blurb: 'Muhavare ka asli matlab.',
        learn: ['Literal nahi, figurative meaning', 'Common idioms yaad karo', 'Context me use'] },
      { id: 'spelling', name: 'Spelling', blurb: 'Sahi spelling chuno.',
        learn: ['Commonly misspelt words', 'Double letters dhyan', 'ie/ei rule'] },
      { id: 'voice', name: 'Active & Passive Voice', blurb: 'Kartavachya ↔ karmavachya.',
        learn: ['Object subject ban jaata hai', 'Tense same rehti hai', 'by + agent'] },
      { id: 'speech', name: 'Direct & Indirect Speech', blurb: 'Kisi ki baat report karna.',
        learn: ['Tense backshift', 'Time & pronoun change', 'Reporting verb (said to → told)'] },
      { id: 'para-jumbles', name: 'Para Jumbles', blurb: 'Bikhre vaakyon ko sajao.',
        learn: ['Opening & closing sentence dhoondo', 'Linking words follow karo', 'Pronoun references'] },
      { id: 'cloze-test', name: 'Cloze Test', blurb: 'Passage ke blanks bharo.',
        learn: ['Poora passage ek baar padho', 'Grammar + context dono', 'Flow maintain karo'] },
    ],
  },
];

// Helpers — har jagah safe lookups.
export function getSubject(id) {
  return SUBJECTS.find((s) => s.id === id) || null;
}

export function getTopic(subjectId, topicId) {
  const s = getSubject(subjectId);
  if (!s) return null;
  return s.topics.find((t) => t.id === topicId) || null;
}

export function allTopics() {
  return SUBJECTS.flatMap((s) => s.topics.map((t) => ({ ...t, subjectId: s.id })));
}

export function totalTopicCount() {
  return SUBJECTS.reduce((n, s) => n + s.topics.length, 0);
}
