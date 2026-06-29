// Starter MCQ bank per topic. Keyed by topicId.
// Each: { q, options:[4], answer: 0-based index, explain }. Quality > quantity; extend freely.

export const QUIZZES = {
  // ---------- REASONING ----------
  analogy: [
    { q: 'Pen : Write :: Knife : ?', options: ['Cut', 'Sharp', 'Metal', 'Kitchen'], answer: 0, explain: 'Pen se likhte hain, knife se kaatte hain.' },
    { q: 'Day : Night :: Light : ?', options: ['Dark', 'Bright', 'Sun', 'Lamp'], answer: 0, explain: 'Opposite pair: Day↔Night, Light↔Dark.' },
    { q: 'Bird : Nest :: Bee : ?', options: ['Honey', 'Hive', 'Flower', 'Sting'], answer: 1, explain: 'Bird rehti nest me, bee rehti hive me.' },
    { q: 'Foot : Man :: Hoof : ?', options: ['Shoe', 'Horse', 'Leg', 'Run'], answer: 1, explain: 'Man ka foot, horse ka hoof.' },
  ],
  classification: [
    { q: 'Odd one out?', options: ['Rose', 'Lotus', 'Lily', 'Mango'], answer: 3, explain: 'Mango ek fruit hai, baaki sab phool.' },
    { q: 'Odd one out?', options: ['11', '13', '15', '17'], answer: 2, explain: '15 prime nahi (3×5), baaki sab prime.' },
    { q: 'Odd one out?', options: ['8', '27', '64', '100'], answer: 3, explain: '8,27,64 perfect cubes hain; 100 nahi.' },
  ],
  'coding-decoding': [
    { q: 'If CAT = 3-1-20, then DOG = ?', options: ['4-15-7', '4-14-7', '3-15-7', '4-15-6'], answer: 0, explain: 'Letter positions: D=4, O=15, G=7.' },
    { q: 'If RED → SFE (each +1), then BLUE → ?', options: ['CMVF', 'CMWF', 'CNVF', 'DMVF'], answer: 0, explain: 'B+1=C, L+1=M, U+1=V, E+1=F.' },
    { q: 'MONDAY → NPOEBZ. Then FRIDAY → ?', options: ['GSJEBZ', 'GSJECZ', 'GSKEBZ', 'GTJEBZ'], answer: 0, explain: 'Har letter +1: F→G, R→S, I→J, D→E, A→B, Y→Z.' },
  ],
  series: [
    { q: 'Next number: 2, 4, 8, 16, ?', options: ['24', '32', '20', '30'], answer: 1, explain: 'Har baar ×2 → 16×2 = 32.' },
    { q: 'Next: 3, 6, 11, 18, ?', options: ['27', '25', '29', '28'], answer: 0, explain: 'Difference +3,+5,+7,+9 → 18+9 = 27.' },
    { q: 'Next: 1, 1, 2, 3, 5, 8, ?', options: ['11', '12', '13', '15'], answer: 2, explain: 'Fibonacci: 5+8 = 13.' },
    { q: 'Next: 5, 10, 20, 40, ?', options: ['60', '70', '80', '100'], answer: 2, explain: 'Har baar ×2 → 40×2 = 80.' },
  ],
  'blood-relations': [
    { q: "Reena: 'He is the son of my grandfather's only son.' How is he related to Reena?", options: ['Brother', 'Father', 'Uncle', 'Cousin'], answer: 0, explain: "Grandfather ka only son = Reena ka father; uska son = Reena ka brother." },
    { q: "A is B's father. C is B's sister. A is C's ?", options: ['Father', 'Brother', 'Uncle', 'Mother'], answer: 0, explain: 'B aur C bhai-behen hain, to A dono ka father.' },
    { q: 'Q is wife of P. R is son of P. R is Q\'s ?', options: ['Son', 'Brother', 'Nephew', 'Father'], answer: 0, explain: 'P-Q pati-patni, R unka beta → Q ka bhi son.' },
  ],
  'direction-sense': [
    { q: 'Walk 5 km North, turn right, walk 5 km. Now facing?', options: ['East', 'West', 'North', 'South'], answer: 0, explain: 'North se right = East.' },
    { q: 'Walk 3 km East, then 4 km North. Distance from start?', options: ['5 km', '7 km', '1 km', '12 km'], answer: 0, explain: 'Pythagoras: √(3²+4²) = 5.' },
    { q: 'Facing South, turn left, then left again. Now facing?', options: ['North', 'South', 'East', 'West'], answer: 0, explain: 'South→left=East→left=North.' },
  ],
  syllogism: [
    { q: 'All cats are dogs. All dogs are animals. So: All cats are animals?', options: ['Follows', "Doesn't follow", "Can't say", 'False'], answer: 0, explain: 'Chain: cats⊂dogs⊂animals → cats⊂animals.' },
    { q: 'All pens are books. Some books are red. So: Some pens are red?', options: ['Follows', "Doesn't follow", 'Always true', 'Both follow'], answer: 1, explain: 'Red books pen ho ya na ho — confirm nahi, so follow nahi karta.' },
    { q: 'Some A are B. All B are C. So: Some A are C?', options: ['Follows', "Doesn't follow", "Can't say", 'False'], answer: 0, explain: 'Jo A, B hain wo sab C bhi → some A are C.' },
  ],
  'venn-diagram': [
    { q: 'Best Venn for: Tennis, Football, Games?', options: ['Two separate circles inside one big circle', 'Three overlapping circles', 'Three separate circles', 'One circle inside another'], answer: 0, explain: 'Tennis & Football alag, dono Games ke andar.' },
    { q: 'Best Venn for: Pen, Pencil, Stationery?', options: ['Two separate circles inside one big circle', 'Three overlapping circles', 'Three separate circles', 'All same circle'], answer: 0, explain: 'Pen aur Pencil alag, dono Stationery me.' },
  ],
  'seating-arrangement': [
    { q: 'In a row facing North, P is immediate right of Q. So Q is to the ___ of P.', options: ['Left', 'Right', 'Front', 'Behind'], answer: 0, explain: 'P right me hai to Q uske left me.' },
    { q: '6 people sit around a circle (seats 1–6). Opposite of seat 1 is?', options: ['Seat 3', 'Seat 4', 'Seat 5', 'Seat 2'], answer: 1, explain: '6 seats me opposite = +3 → 1 ke opposite seat 4.' },
  ],
  'mirror-water-image': [
    { q: "Vertical mirror image of letter 'b' looks like?", options: ['d', 'p', 'q', 'b'], answer: 0, explain: 'Left-right flip se b → d.' },
    { q: 'Which letter looks SAME in a vertical mirror?', options: ['A', 'F', 'G', 'J'], answer: 0, explain: 'A vertically symmetric hai.' },
    { q: "Water image of letter 'M'?", options: ['W', 'N', 'E', 'M'], answer: 0, explain: 'Top-bottom flip se M → W.' },
  ],
  'paper-folding': [
    { q: 'Square paper folded once, one hole punched. Holes on unfolding?', options: ['1', '2', '4', '3'], answer: 1, explain: 'Ek fold = hole mirror hoke double → 2.' },
    { q: 'Paper folded twice, one hole punched. Holes on unfolding?', options: ['2', '3', '4', '8'], answer: 2, explain: 'Do folds → 1×2×2 = 4 holes.' },
  ],
  dice: [
    { q: 'On a standard dice, opposite faces sum to?', options: ['6', '7', '8', '12'], answer: 1, explain: 'Standard dice: 1-6, 2-5, 3-4 (sum 7).' },
    { q: 'If opposite faces sum to 7, face opposite to 2 is?', options: ['5', '6', '4', '3'], answer: 0, explain: '7 − 2 = 5.' },
    { q: 'Opposite of face showing 1 (standard dice)?', options: ['6', '2', '5', '3'], answer: 0, explain: '1 ke opposite 6 (sum 7).' },
  ],
  'math-operations': [
    { q: 'If + means ×, − means +, × means −: 6 + 2 − 3 × 1 = ?', options: ['14', '12', '11', '15'], answer: 0, explain: '6×2 + 3 − 1 = 12+3−1 = 14.' },
    { q: '12 ÷ 6 × 2 + 3 = ? (BODMAS)', options: ['7', '5', '4', '10'], answer: 0, explain: '12÷6=2, ×2=4, +3=7.' },
    { q: 'If a # b = (a+b)×2, then 7 # 4 = ?', options: ['22', '20', '24', '18'], answer: 0, explain: '(7+4)×2 = 22.' },
  ],
  'counting-figures': [
    { q: 'A triangle with one line from apex to base midpoint has how many triangles?', options: ['2', '3', '4', '1'], answer: 1, explain: '2 chhote + 1 bada = 3.' },
    { q: 'Number of squares in a 2×2 grid?', options: ['4', '5', '6', '8'], answer: 1, explain: '4 chhote + 1 bada = 5.' },
    { q: 'Number of squares on a 3×3 board (like tic-tac-toe)?', options: ['9', '13', '14', '10'], answer: 2, explain: '9(1×1) + 4(2×2) + 1(3×3) = 14.' },
  ],
  'statement-conclusion': [
    { q: "Statement: 'Smoking is injurious to health.' Conclusion: One should avoid smoking. Follows?", options: ['Follows', "Doesn't follow", "Can't say", 'False'], answer: 0, explain: 'Logical advice statement se nikalti hai.' },
    { q: "Statement: 'All students passed.' Conclusion: 'No student failed.' Follows?", options: ['Follows', "Doesn't follow", 'Partly', 'False'], answer: 0, explain: 'Sab pass = koi fail nahi.' },
  ],

  // ---------- GENERAL AWARENESS ----------
  history: [
    { q: 'Who built the Taj Mahal?', options: ['Akbar', 'Shah Jahan', 'Babur', 'Aurangzeb'], answer: 1, explain: 'Shah Jahan ne Mumtaz Mahal ki yaad me banwaya.' },
    { q: 'Jallianwala Bagh massacre kab hua?', options: ['1919', '1920', '1857', '1942'], answer: 0, explain: '13 April 1919, Amritsar.' },
    { q: 'First Governor-General of independent India?', options: ['Lord Mountbatten', 'C. Rajagopalachari', 'Nehru', 'Warren Hastings'], answer: 0, explain: 'Lord Mountbatten (1947–48).' },
    { q: 'Indus Valley city famous for the Great Bath?', options: ['Harappa', 'Mohenjo-daro', 'Lothal', 'Kalibangan'], answer: 1, explain: 'Great Bath Mohenjo-daro me mila.' },
  ],
  geography: [
    { q: 'Largest Indian state by area?', options: ['Rajasthan', 'Madhya Pradesh', 'Maharashtra', 'Uttar Pradesh'], answer: 0, explain: 'Rajasthan sabse bada (area).' },
    { q: "Which river is called the 'Sorrow of Bihar'?", options: ['Kosi', 'Damodar', 'Ganga', 'Son'], answer: 0, explain: 'Kosi nadi baar-baar baadh laati hai.' },
    { q: 'Tropic of Cancer kitne Indian states se guzarti hai?', options: ['8', '7', '5', '10'], answer: 0, explain: '8 states se (Gujarat se Mizoram tak).' },
    { q: 'Highest mountain peak entirely within India?', options: ['Kangchenjunga', 'K2', 'Nanda Devi', 'Mount Everest'], answer: 0, explain: 'Kangchenjunga (Everest Nepal me hai).' },
  ],
  polity: [
    { q: 'Indian Constitution me abhi kitne Fundamental Rights?', options: ['6', '7', '5', '8'], answer: 0, explain: 'Right to Property hatne ke baad 6 rah gaye.' },
    { q: 'Constitutional head of the Indian State?', options: ['President', 'Prime Minister', 'Chief Justice', 'Speaker'], answer: 0, explain: 'President desh ka head hota hai.' },
    { q: 'Constitution kab "adopt" hua?', options: ['26 Nov 1949', '26 Jan 1950', '15 Aug 1947', '26 Jan 1949'], answer: 0, explain: 'Adopt 26 Nov 1949; laagu 26 Jan 1950.' },
    { q: 'President banne ki minimum age?', options: ['35', '30', '25', '40'], answer: 0, explain: 'Kam se kam 35 saal.' },
  ],
  economy: [
    { q: 'RBI ki sthaapna kis saal?', options: ['1935', '1947', '1950', '1934'], answer: 0, explain: 'RBI 1 April 1935 ko establish hua.' },
    { q: 'Union Budget kaun present karta hai?', options: ['Finance Minister', 'Prime Minister', 'President', 'RBI Governor'], answer: 0, explain: 'Vitt Mantri (Finance Minister).' },
    { q: 'GST India me kab laagu hua?', options: ['2017', '2016', '2015', '2018'], answer: 0, explain: '1 July 2017.' },
    { q: 'NITI Aayog ne kis body ko replace kiya?', options: ['Planning Commission', 'Finance Commission', 'Election Commission', 'Law Commission'], answer: 0, explain: '2015 me Planning Commission ki jagah.' },
  ],
  'general-science': [
    { q: 'Electric current ka SI unit?', options: ['Ampere', 'Volt', 'Watt', 'Ohm'], answer: 0, explain: 'Current → Ampere (A).' },
    { q: 'Photosynthesis me plant kaunsi gas leti hai?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], answer: 0, explain: 'CO₂ andar, O₂ bahar.' },
    { q: 'Gold ka chemical symbol?', options: ['Au', 'Ag', 'Go', 'Gd'], answer: 0, explain: 'Au (Latin Aurum). Ag = silver.' },
    { q: 'Dhoop se skin par kaunsa vitamin banta hai?', options: ['Vitamin D', 'Vitamin C', 'Vitamin A', 'Vitamin B12'], answer: 0, explain: 'Sunlight se Vitamin D.' },
  ],
  'static-gk': [
    { q: 'India ka National Aquatic Animal?', options: ['Gangetic Dolphin', 'Whale', 'Turtle', 'Crocodile'], answer: 0, explain: 'Gangetic Dolphin.' },
    { q: 'National Flower of India?', options: ['Lotus', 'Rose', 'Marigold', 'Sunflower'], answer: 0, explain: 'Kamal (Lotus).' },
    { q: 'Kathakali dance kis state ka?', options: ['Kerala', 'Tamil Nadu', 'Odisha', 'Assam'], answer: 0, explain: 'Kerala ka classical dance.' },
    { q: 'Ashok Chakra (tiranga) me kitne spokes?', options: ['24', '12', '16', '8'], answer: 0, explain: '24 spokes (teeliyan).' },
  ],
  'current-affairs': [
    { q: 'India ki space agency kaunsi hai?', options: ['ISRO', 'NASA', 'DRDO', 'BARC'], answer: 0, explain: 'Indian Space Research Organisation.' },
    { q: 'United Nations ka headquarter kahan?', options: ['New York', 'Geneva', 'Paris', 'London'], answer: 0, explain: 'New York, USA.' },
    { q: "Which city is 'Silicon Valley of India'?", options: ['Bengaluru', 'Hyderabad', 'Pune', 'Chennai'], answer: 0, explain: 'Bengaluru IT hub.' },
  ],
  'misc-gk': [
    { q: "Author of 'The Discovery of India'?", options: ['Jawaharlal Nehru', 'Mahatma Gandhi', 'R. Tagore', 'APJ Kalam'], answer: 0, explain: 'Nehru ne jail me likhi.' },
    { q: 'Dronacharya Award kis kshetra me?', options: ['Sports coaching', 'Literature', 'Music', 'Science'], answer: 0, explain: 'Best coaches ke liye.' },
    { q: "'Wings of Fire' kiski autobiography?", options: ['APJ Abdul Kalam', 'Nehru', 'Ambedkar', 'Vajpayee'], answer: 0, explain: 'Dr. APJ Abdul Kalam.' },
    { q: 'Booker Prize kis field se juda?', options: ['Literature', 'Films', 'Science', 'Peace'], answer: 0, explain: 'Fiction/Literature ke liye.' },
  ],

  // ---------- QUANTITATIVE APTITUDE ----------
  'number-system': [
    { q: 'Inme se kaunsa 9 se divisible hai?', options: ['99999', '12345', '81818', '11111'], answer: 0, explain: 'Digit-sum 45 (9 ka multiple).' },
    { q: 'HCF of 12 and 18?', options: ['6', '3', '2', '12'], answer: 0, explain: 'Largest common factor = 6.' },
    { q: 'LCM of 4 and 6?', options: ['12', '24', '6', '8'], answer: 0, explain: 'Smallest common multiple = 12.' },
    { q: 'Unit digit of 7⁴?', options: ['1', '7', '9', '3'], answer: 0, explain: '7,9,3,1 cycle → 7⁴ ka unit 1.' },
  ],
  percentage: [
    { q: '25% of 200 = ?', options: ['50', '40', '25', '75'], answer: 0, explain: '200 × 25/100 = 50.' },
    { q: 'A number +20% = 60. Number = ?', options: ['50', '48', '45', '72'], answer: 0, explain: 'x × 1.2 = 60 → x = 50.' },
    { q: '3/5 ko percentage me?', options: ['60%', '30%', '35%', '65%'], answer: 0, explain: '3/5 × 100 = 60%.' },
    { q: "A's salary B se 25% zyada. B, A se kitne % kam?", options: ['20%', '25%', '15%', '30%'], answer: 0, explain: '25/125 × 100 = 20%.' },
  ],
  'ratio-proportion': [
    { q: 'a:b = 2:3, b:c = 4:5. a:c = ?', options: ['8:15', '2:5', '8:12', '10:15'], answer: 0, explain: 'b common: 8:12 & 12:15 → a:c = 8:15.' },
    { q: '₹500 ko 2:3 me baato.', options: ['₹200, ₹300', '₹250, ₹250', '₹100, ₹400', '₹150, ₹350'], answer: 0, explain: '5 parts → 500/5=100; 2×100, 3×100.' },
    { q: 'Mean proportional between 4 and 9?', options: ['6', '5', '12', '13'], answer: 0, explain: '√(4×9) = √36 = 6.' },
  ],
  average: [
    { q: 'Average of 10, 20, 30, 40, 50?', options: ['30', '25', '35', '40'], answer: 0, explain: 'Sum 150 / 5 = 30.' },
    { q: 'Average of first 5 natural numbers?', options: ['3', '2.5', '5', '4'], answer: 0, explain: '(1+2+3+4+5)/5 = 15/5 = 3.' },
    { q: 'Average of 6 numbers is 25. Their sum?', options: ['150', '125', '180', '100'], answer: 0, explain: '25 × 6 = 150.' },
  ],
  'si-ci': [
    { q: 'SI on ₹1000 at 10% for 2 years?', options: ['₹200', '₹100', '₹210', '₹220'], answer: 0, explain: '1000×10×2/100 = 200.' },
    { q: 'CI on ₹1000 at 10% for 2 years?', options: ['₹210', '₹200', '₹220', '₹201'], answer: 0, explain: '1000×1.1²=1210 → CI=210.' },
    { q: 'CI − SI on ₹5000 at 10% for 2 years?', options: ['₹50', '₹100', '₹55', '₹500'], answer: 0, explain: 'P(R/100)² = 5000×0.01 = 50.' },
    { q: 'In how many years ₹500 → ₹1000 at 10% SI?', options: ['10', '5', '20', '8'], answer: 0, explain: 'SI 500 = 500×10×T/100 → T=10.' },
  ],
  'profit-loss': [
    { q: 'CP ₹100, SP ₹120. Profit%?', options: ['20%', '15%', '25%', '10%'], answer: 0, explain: '20/100 × 100 = 20%.' },
    { q: 'CP ₹500, SP ₹400. Loss%?', options: ['20%', '25%', '10%', '15%'], answer: 0, explain: '100/500 × 100 = 20%.' },
    { q: 'MP ₹200, discount 10%. SP = ?', options: ['₹180', '₹190', '₹160', '₹170'], answer: 0, explain: '200 − 10% = 180.' },
    { q: 'SP ₹90 par 10% loss. CP = ?', options: ['₹100', '₹99', '₹81', '₹110'], answer: 0, explain: '90 = CP×0.9 → CP=100.' },
  ],
  'mixture-alligation': [
    { q: 'Rice ₹20/kg & ₹30/kg mix karke ₹24/kg. Ratio?', options: ['3:2', '2:3', '1:1', '4:1'], answer: 0, explain: '(30−24):(24−20) = 6:4 = 3:2.' },
    { q: '40 L mixture, milk:water = 3:1. Water kitna?', options: ['10 L', '30 L', '20 L', '15 L'], answer: 0, explain: '4 parts→10L each; water 1 part = 10L.' },
  ],
  'time-work': [
    { q: 'A=12 din, B=6 din. Saath me?', options: ['4 din', '3 din', '9 din', '6 din'], answer: 0, explain: '1/12+1/6 = 3/12 = 1/4 → 4 din.' },
    { q: '10 men a work in 8 days. 8 men in?', options: ['10 din', '6 din', '8 din', '12 din'], answer: 0, explain: 'Men×Days = 80 → 80/8 = 10.' },
    { q: 'A tank 5 ghante me bharta. 1 ghante me?', options: ['1/5', '5', '1/10', '2/5'], answer: 0, explain: 'Ek ghante me 1/5 part.' },
  ],
  'time-speed-distance': [
    { q: 'Speed 60 km/h, time 2 hrs. Distance?', options: ['120 km', '90 km', '30 km', '60 km'], answer: 0, explain: '60 × 2 = 120 km.' },
    { q: '72 km/h ko m/s me?', options: ['20', '25', '18', '36'], answer: 0, explain: '72 × 5/18 = 20 m/s.' },
    { q: '100 m long train crosses a pole in 5 s. Speed (m/s)?', options: ['20', '25', '10', '50'], answer: 0, explain: '100/5 = 20 m/s.' },
    { q: '150 km in 3 hrs. Average speed?', options: ['50 km/h', '45 km/h', '60 km/h', '75 km/h'], answer: 0, explain: '150/3 = 50 km/h.' },
  ],
  algebra: [
    { q: 'a+b=10, ab=21. a²+b² = ?', options: ['58', '142', '79', '46'], answer: 0, explain: '(a+b)²−2ab = 100−42 = 58.' },
    { q: 'Factorize a² − 9.', options: ['(a+3)(a−3)', '(a−3)²', '(a+9)(a−1)', '(a+3)²'], answer: 0, explain: 'a²−b² = (a+b)(a−b).' },
    { q: 'x + 1/x = 2. Then x² + 1/x² = ?', options: ['2', '4', '0', '6'], answer: 0, explain: '(x+1/x)²−2 = 4−2 = 2.' },
    { q: '(a+b)² − (a−b)² = ?', options: ['4ab', '2ab', 'a²+b²', '2(a²+b²)'], answer: 0, explain: 'Difference of squares → 4ab.' },
  ],
  geometry: [
    { q: 'Triangle ke andar ke angles ka sum?', options: ['180°', '360°', '90°', '270°'], answer: 0, explain: 'Hamesha 180°.' },
    { q: 'Equilateral triangle ka har angle?', options: ['60°', '90°', '45°', '120°'], answer: 0, explain: '180/3 = 60°.' },
    { q: 'Semicircle me bana angle?', options: ['90°', '60°', '180°', '45°'], answer: 0, explain: 'Angle in a semicircle = 90°.' },
    { q: 'Quadrilateral ke saare angles ka sum?', options: ['360°', '180°', '270°', '540°'], answer: 0, explain: '4 sides → 360°.' },
  ],
  mensuration: [
    { q: 'Circle (r=7) ka area? (π=22/7)', options: ['154', '144', '49', '22'], answer: 0, explain: 'πr² = 22/7 × 49 = 154.' },
    { q: 'Cube (side 3) ka volume?', options: ['27', '9', '18', '6'], answer: 0, explain: '3³ = 27.' },
    { q: 'Rectangle 5×4 ka area?', options: ['20', '9', '18', '40'], answer: 0, explain: 'l×b = 20.' },
    { q: 'Square (side 6) ka perimeter?', options: ['24', '36', '12', '18'], answer: 0, explain: '4×6 = 24.' },
  ],
  trigonometry: [
    { q: 'sin 90° = ?', options: ['1', '0', '1/2', '√3/2'], answer: 0, explain: 'sin 90° = 1.' },
    { q: 'cos 0° = ?', options: ['1', '0', '1/2', '√3/2'], answer: 0, explain: 'cos 0° = 1.' },
    { q: 'tan 45° = ?', options: ['1', '0', '√3', '1/√3'], answer: 0, explain: 'tan 45° = 1.' },
    { q: 'sin²30° + cos²30° = ?', options: ['1', '0', '1/2', '2'], answer: 0, explain: 'sin²θ+cos²θ = 1 (har θ).' },
  ],
  'data-interpretation': [
    { q: 'Pie chart me 25% kitne degree?', options: ['90°', '180°', '120°', '45°'], answer: 0, explain: '25% × 360 = 90°.' },
    { q: 'Total 500, ek category 20%. Value?', options: ['100', '80', '120', '200'], answer: 0, explain: '20% × 500 = 100.' },
    { q: 'Poora pie chart kitne degree?', options: ['360°', '180°', '100°', '720°'], answer: 0, explain: 'Full circle = 360°.' },
  ],

  // ---------- ENGLISH ----------
  'reading-comprehension': [
    { q: "'Honesty is the best policy. It builds trust.' What builds trust?", options: ['Honesty', 'Policy', 'Money', 'Power'], answer: 0, explain: "'It' refers to honesty." },
    { q: "'The library opens at 9 am and closes at 6 pm.' When does it close?", options: ['6 pm', '9 am', '9 pm', '6 am'], answer: 0, explain: 'Passage clearly says 6 pm.' },
  ],
  'fill-blanks': [
    { q: 'She is good ___ mathematics.', options: ['at', 'in', 'on', 'for'], answer: 0, explain: '"good at" sahi collocation hai.' },
    { q: 'He has been living here ___ 2010.', options: ['since', 'for', 'from', 'by'], answer: 0, explain: 'Point of time ke saath "since".' },
    { q: 'I am fond ___ music.', options: ['of', 'for', 'with', 'to'], answer: 0, explain: '"fond of" fixed phrase.' },
  ],
  'error-spotting': [
    { q: "Error dhoondo: 'He do not like coffee.'", options: ['do', 'not', 'like', 'coffee'], answer: 0, explain: 'Third person singular → "does".' },
    { q: "Error: 'One of the boys are absent.'", options: ['are', 'One', 'boys', 'absent'], answer: 0, explain: '"One of" singular → "is".' },
    { q: "Error: 'She is senior than me.'", options: ['than', 'senior', 'She', 'me'], answer: 0, explain: '"senior to" hota hai, "than" nahi.' },
  ],
  'sentence-improvement': [
    { q: "Improve: 'He is more cleverer than his brother.'", options: ['cleverer', 'more clever', 'most clever', 'No improvement'], answer: 0, explain: 'Double comparative galat; sirf "cleverer".' },
    { q: "Improve: 'I have went to the market.'", options: ['have gone', 'had went', 'have go', 'No improvement'], answer: 0, explain: 'Past participle of go = gone.' },
  ],
  'synonyms-antonyms': [
    { q: "Synonym of 'Happy'?", options: ['Joyful', 'Sad', 'Angry', 'Tired'], answer: 0, explain: 'Happy ≈ Joyful.' },
    { q: "Antonym of 'Brave'?", options: ['Cowardly', 'Bold', 'Strong', 'Fearless'], answer: 0, explain: 'Brave ka opposite = Cowardly.' },
    { q: "Synonym of 'Begin'?", options: ['Start', 'Stop', 'End', 'Close'], answer: 0, explain: 'Begin ≈ Start.' },
    { q: "Antonym of 'Ancient'?", options: ['Modern', 'Old', 'Past', 'Historic'], answer: 0, explain: 'Ancient ka opposite = Modern.' },
  ],
  'one-word': [
    { q: 'A person who cannot read or write?', options: ['Illiterate', 'Literate', 'Scholar', 'Writer'], answer: 0, explain: 'Illiterate.' },
    { q: 'A doctor who treats children?', options: ['Pediatrician', 'Cardiologist', 'Dentist', 'Surgeon'], answer: 0, explain: 'Pediatrician = bachchon ka doctor.' },
    { q: 'One who loves books?', options: ['Bibliophile', 'Bibliography', 'Librarian', 'Author'], answer: 0, explain: 'Bibliophile.' },
  ],
  idioms: [
    { q: "'A piece of cake' means?", options: ['Very easy', 'Very hard', 'Tasty food', 'Expensive'], answer: 0, explain: 'Bahut aasaan kaam.' },
    { q: "'To let the cat out of the bag' means?", options: ['Reveal a secret', 'Buy a pet', 'Run away', 'Be lazy'], answer: 0, explain: 'Raaz khol dena.' },
    { q: "'Break the ice' means?", options: ['Start a conversation', 'Feel cold', 'Break something', 'Win a game'], answer: 0, explain: 'Baat-cheet shuru karna.' },
  ],
  spelling: [
    { q: 'Sahi spelling chuno:', options: ['Definitely', 'Definately', 'Definetly', 'Definitly'], answer: 0, explain: 'Definitely sahi hai.' },
    { q: 'Sahi spelling chuno:', options: ['Necessary', 'Neccessary', 'Necesary', 'Necessery'], answer: 0, explain: 'One c, double s → Necessary.' },
    { q: 'Sahi spelling chuno:', options: ['Government', 'Goverment', 'Governmant', 'Govenment'], answer: 0, explain: 'Government (n included).' },
  ],
  voice: [
    { q: "Passive of 'He eats an apple.'", options: ['An apple is eaten by him.', 'An apple was eaten by him.', 'An apple is eat by him.', 'He is eaten an apple.'], answer: 0, explain: 'Present simple passive: is + V3.' },
    { q: "Passive of 'They built a house.'", options: ['A house was built by them.', 'A house is built by them.', 'A house was build by them.', 'A house were built by them.'], answer: 0, explain: 'Past simple passive: was + built.' },
  ],
  speech: [
    { q: "Indirect: He said, 'I am happy.'", options: ['He said that he was happy.', 'He said that I am happy.', 'He says he was happy.', 'He said he is happy.'], answer: 0, explain: 'Tense backshift + pronoun change.' },
    { q: "Indirect: She said to me, 'Go away.'", options: ['She told me to go away.', 'She said me to go away.', 'She told me go away.', 'She told to me to go away.'], answer: 0, explain: 'Imperative → told + to + verb.' },
  ],
  'para-jumbles': [
    { q: 'Para jumble me opening sentence usually?', options: ['Topic ko independently introduce karta', "'it/this' jaisa pronoun rakhta", 'Conclusion hota', "'However' se shuru hota"], answer: 0, explain: 'Pehla vaakya swatantra hota, koi reference nahi.' },
    { q: 'Kaunsa word usually FIRST sentence start nahi karta?', options: ['Therefore', 'The', 'A', 'In'], answer: 0, explain: '"Therefore" pehle kisi baat pe depend karta.' },
  ],
  'cloze-test': [
    { q: 'He was ___ tired to walk further.', options: ['too', 'to', 'very', 'so'], answer: 0, explain: '"too ... to" structure.' },
    { q: 'The sun ___ in the east.', options: ['rises', 'rise', 'rose', 'rising'], answer: 0, explain: 'Universal truth → simple present "rises".' },
  ],
};

export function getQuiz(topicId) {
  return QUIZZES[topicId] || [];
}
