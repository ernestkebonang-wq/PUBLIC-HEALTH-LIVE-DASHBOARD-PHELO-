export interface EmergencyProtocol {
  id: string;
  categoryEn: string;
  categoryTn: string;
  categoryKck: string;
  severity: 'CRITICAL' | 'URGENT';
  dispatchNumbers: { name: string; number: string }[];
  firstActionEn: string;
  firstActionTn: string;
  stepByStepEn: string[];
  stepByStepTn: string[];
  doNotDoEn: string[];
  doNotDoTn: string[];
}

export const BOTSWANA_EMERGENCY_NUMBERS = [
  { label: 'Ambulance / EMS (Botswana)', number: '997', description: 'National ambulance dispatch service' },
  { label: 'National Mobile Emergency (Toll-Free)', number: '112', description: 'Works on Mascom, Orange, BTC even with zero airtime' },
  { label: 'MRI Botswana (Private EMS / 24h Ambulance)', number: '992', description: 'ALS rapid response, aeromedical evacuation, medical aid direct billing' },
  { label: 'Police Service', number: '999', description: 'Accidents, assault, roadside trauma' },
  { label: 'Fire & Rescue', number: '998', description: 'Vehicle extrication, burns, chemical hazards' },
  { label: 'Ministry of Health Toll-Free Helpline', number: '0800 600 740', description: 'Government health advice and escalation line' },
];

export const EMERGENCY_PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'difficulty-breathing',
    categoryEn: 'Severe Difficulty Breathing / Choking',
    categoryTn: 'Go hema ka bothata jo bo tseneletseng',
    categoryKck: 'Kufema kwe kulema kwakanyanya',
    severity: 'CRITICAL',
    dispatchNumbers: [
      { name: 'Ambulance', number: '997' },
      { name: 'Mobile Emergency', number: '112' },
    ],
    firstActionEn: 'Call 997 immediately. Sit the person upright and loosen tight clothing around neck and waist.',
    firstActionTn: 'Leletsa 997 ka bonako. Dudisa motho a papametse, mme o repise diaparo mo molaleng le mo dinokeng.',
    stepByStepEn: [
      'Keep the person sitting upright leaning slightly forward; do NOT force them to lie down.',
      'Ensure adequate fresh airflow; open windows and ask crowds to step back.',
      'If the person has a prescribed asthma pump (reliever inhaler), help them take 2 to 4 puffs immediately.',
      'Speak calmly to reduce anxiety, which can worsen breathing distress.',
      'Monitor breathing continuously until ambulance arrives.',
    ],
    stepByStepTn: [
      'Dudisa molwetsi a itsetseletse pele; o SE KA wa mo latsa ka mokwatla.',
      'Bula difensetere go tsenya phefo e e phepa; kopa batho ba katoge.',
      'Fa a na le phompholo ya asthma e a e laetsweng ke ngaka, mo thuse go hema ga bedi go ya go ga nne.',
      'Bua nae ka tidimalo le boiketo go fokotsa poifo.',
      'Ela tlhoko go hema ga gagwe go fitlhelela ambulense e goroga.',
    ],
    doNotDoEn: [
      'DO NOT force the person to lie flat on their back.',
      'DO NOT give liquids, food, or milk while struggling to breathe.',
    ],
    doNotDoTn: [
      'O SE KA wa mo latsa fa a palelwa ke go hema.',
      'O SE KA wa mo fa metsi kgotsa mashi ka o ka kangwa.',
    ],
  },
  {
    id: 'unconsciousness',
    categoryEn: 'Unconsciousness / Fainting / Unresponsive',
    categoryTn: 'Go idibala / Go sa arabeleng',
    categoryKck: 'Kuzingizika / Kusazwisisika',
    severity: 'CRITICAL',
    dispatchNumbers: [
      { name: 'Ambulance', number: '997' },
      { name: 'Mobile Emergency', number: '112' },
    ],
    firstActionEn: 'Call 997. Check if the person is breathing. If breathing, place in the Recovery Position (on their side).',
    firstActionTn: 'Leletsa 997. Tlhatlhoba gore a o a hema. Fa a hema, mo latse ka lotlhakore (Recovery Position).',
    stepByStepEn: [
      'Check breathing: look for chest rise and feel for breath at their mouth for 10 seconds.',
      'If breathing normally: gently roll them onto their side with their top leg bent to keep them stable and chin tilted up.',
      'Clear the mouth of vomit or obstruction if visible.',
      'Keep them warm with a blanket or jacket.',
      'If NOT breathing at all: immediately start chest compressions (hands centered on breastbone, push hard and fast 100-120 beats per minute) while on the line with 997.',
    ],
    stepByStepTn: [
      'Tlhola go hema: leba sehuba le go utlwa mowa mo molomong ka metsotswana e le 10.',
      'Fa a hema sentle: mo fetolele mo lotlhakoreng, o kobe leoto la kwa godimo gore a tsepame, o tsholeletse seledu kwa godimo.',
      'Ntsha mathe kgotsa matlhatso mo molomong fa a le teng.',
      'Mo apese kobo kgotsa baki gore a se ka a tsidifala.',
      'Fa a SA heme: simolola go gatelela sehuba (chest compressions) ka bonako fa o bua le 997.',
    ],
    doNotDoEn: [
      'DO NOT give water, food, or medicine to an unconscious person.',
      'DO NOT slap their face or shake them vigorously.',
    ],
    doNotDoTn: [
      'O SE KA wa nosedisa motho yo o idibetseng metsi.',
      'O SE KA wa mo phaila difatlhego kgotsa go mo thukutha.',
    ],
  },
  {
    id: 'severe-bleeding',
    categoryEn: 'Severe Bleeding / Deep Wounds',
    categoryTn: 'Go tswa madi a mantsi / Dintho tse di boteng',
    categoryKck: 'Kubuda mazi manji / Zwilonda',
    severity: 'CRITICAL',
    dispatchNumbers: [
      { name: 'Ambulance', number: '997' },
      { name: 'Emergency', number: '112' },
    ],
    firstActionEn: 'Call 997. Apply direct, firm, continuous pressure directly over the wound with a clean cloth.',
    firstActionTn: 'Leletsa 997. Gatelela ka thata dintho ka letsela le le phepa o sa tlose seatla.',
    stepByStepEn: [
      'Place a clean cloth, towel, or sterile gauze pad directly over the bleeding site.',
      'Press firmly with both hands without lifting the cloth to check.',
      'If blood soaks through, add another cloth on top—do NOT remove the first cloth.',
      'If the wound is on an arm or leg and bleeding cannot be stopped by direct pressure, apply pressure above the wound closer to the heart.',
      'Keep the patient lying down to prevent shock.',
    ],
    stepByStepTn: [
      'Baya letsela le le phepa kgotsa thaole mo nthong e e dutlang madi.',
      'Gatelela ka matsogo a mabedi ka thata o sa emise.',
      'Fa madi a tletse mo letseleng, baya le lengwe fa godimo ga lone—o se ka wa ntsha la ntlha.',
      'Latsa molwetsi fa fatshe gore a se ka a welelwa ke madi (shock).',
    ],
    doNotDoEn: [
      'DO NOT remove an impaled object (like glass or knife)—pack cloth around it instead.',
      'DO NOT wash a deep, heavily bleeding wound with water before controlling the flow.',
    ],
    doNotDoTn: [
      'O SE KA wa tusa sedirisiwa se se mo phuntseng (sekao: thipa kgotsa galase)—gatelela go potologa sone.',
      'O SE KA wa tlhatswa nthoto e e tswang madi ka metsi pele o a thiba.',
    ],
  },
  {
    id: 'chest-pain',
    categoryEn: 'Severe Chest Pain / Suspected Heart Attack',
    categoryTn: 'Botlhoko jo bo masisi mo sehubeng',
    categoryKck: 'Kuvavisa kwe dundulu kwakanyanya',
    severity: 'CRITICAL',
    dispatchNumbers: [
      { name: 'Ambulance', number: '997' },
      { name: 'Princess Marina ER', number: '+267 390 1999' },
    ],
    firstActionEn: 'Call 997. Help the person sit half-upright (W-position on floor with back supported and knees bent).',
    firstActionTn: 'Leletsa 997. Dudisa molwetsi a ikentse ka mokwatla mo lebcolumn/leboteng mangole a kobegile.',
    stepByStepEn: [
      'Seat the person comfortably on the ground with their head and shoulders supported.',
      'Loosen clothing around neck, chest, and waist.',
      'If not allergic and advised by emergency dispatch or clinical team, an adult may chew one 300mg soluble aspirin slowly.',
      'Keep them calm and still; do not allow walking or physical exertion.',
      'Be prepared to begin CPR if they become unresponsive and stop breathing.',
    ],
    stepByStepTn: [
      'Dudisa molwetsi mo fatshe a itshegeditse ka mokwatla.',
      'Repisa diaparo mo molaleng le mo sehubeng.',
      'Fa a se na allergy mme le dumeletswe ke 997, motho yo motona a ka tlhunya aspirin ya 300mg.',
      'Mo kope a ritibale, o se ka wa mo tsamaisa.',
      'Itokisetse go gatelela sehuba fa a idibala a bo a emisa go hema.',
    ],
    doNotDoEn: [
      'DO NOT allow the person to drive themselves to the hospital.',
      'DO NOT delay calling 997 hoping the pain will pass.',
    ],
    doNotDoTn: [
      'O SE KA wa letlelela molwetsi go itryisetsa koloi go ya kokelong.',
      'O SE KA wa diega o solofetse gore botlhoko bo tla fela bo le bosi.',
    ],
  },
  {
    id: 'poisoning',
    categoryEn: 'Poisoning / Chemical / Kerosene Ingestion',
    categoryTn: 'Go nwa botlhole / Parafene / Ditlhare tse di kotsi',
    categoryKck: 'Kudla bulyo / Mafuta e parafini',
    severity: 'CRITICAL',
    dispatchNumbers: [
      { name: 'Ambulance', number: '997' },
      { name: 'MoH Toll-Free', number: '0800 600 740' },
    ],
    firstActionEn: 'Call 997 immediately. Identify what was swallowed, the amount, and the time. Bring the container to the hospital.',
    firstActionTn: 'Leletsa 997 ka bofefo. Batla lebotlolo kgotsa se a se noleng o se ise kokelong.',
    stepByStepEn: [
      'Safely collect the container, bottle, or plant material involved to show the doctor.',
      'Wipe any chemical residues from around the lips or mouth with a damp cloth.',
      'If on skin or clothes, remove contaminated clothes and rinse skin with clean water.',
      'Transport immediately to the nearest 24h clinic or hospital emergency room.',
    ],
    stepByStepTn: [
      'Tshola lebotlolo kgotsa sesupo sa se se nolweng o tsamaye naso kokelong.',
      'Phepafatsa melomo ka letsela le le metsi fa go na le masalela.',
      'Fa botlhole bo tshologetse mo diaparong, di role o bo o tlhape letlalo ka metsi a phepa.',
      'Tsamaisa molwetsi ka bonako kwa kokelong e e gaufi.',
    ],
    doNotDoEn: [
      'DO NOT induce vomiting—especially for paraffin (kerosene), acids, or petrol, as this burns the lungs.',
      'DO NOT force the person to drink raw eggs, charcoal, or salty water.',
    ],
    doNotDoTn: [
      'O SE KA wa mo tlhatsisa—bogolo jang fa a nole parafene, corrosive acids kgotsa peterolo.',
      'O SE KA wa mo fa mae a a tala kgotsa metsi a letswai go mo tlhatsisa.',
    ],
  },
  {
    id: 'seizure',
    categoryEn: 'Seizure / Convulsions / Fits',
    categoryTn: 'Go roroma / Ditshika / Seebana',
    categoryKck: 'Kudzunguka / Ndandagwi',
    severity: 'URGENT',
    dispatchNumbers: [
      { name: 'Ambulance', number: '997' },
      { name: 'Mobile Emergency', number: '112' },
    ],
    firstActionEn: 'Protect the person from injury. Clear hard or sharp objects away from around them. Note the start time.',
    firstActionTn: 'Siela molwetsi dilo tse di ka mo gobatsang. Tlosa dilo tse di bogale. Ela nako tlhoko.',
    stepByStepEn: [
      'Place a soft folded jacket or pillow under their head.',
      'Loosen tight clothing around the neck.',
      'Time the seizure. If it lasts longer than 5 minutes, call 997 immediately.',
      'Once shaking stops, gently turn them into the Recovery Position on their side.',
      'Stay with them until they are fully awake and aware of their surroundings.',
    ],
    stepByStepTn: [
      'Baya baki e e phuthilweng kgotsa mosamo ka fa tlase ga tlhogo ya gagwe.',
      'Repisa diaparo mo molaleng.',
      'Bala nako ya go roroma. Fa e feta metsotso e le 5, leletsa 997 ka bofefo.',
      'Fa go roroma go fela, mo retololele mo lotlhakoreng.',
      'Nna nae go fitlhelela a tsoga sentle.',
    ],
    doNotDoEn: [
      'DO NOT put anything in their mouth (no spoons, fingers, or cloth)—they will NOT swallow their tongue.',
      'DO NOT restrain or pin down their arms and legs while shaking.',
    ],
    doNotDoTn: [
      'O SE KA wa tsenya leleme, leswana kgotsa letsela mo molomong.',
      'O SE KA wa kganela matsogo kgotsa maoto ka dikgoka a sa ntse a roroma.',
    ],
  },
  {
    id: 'pregnancy-emergency',
    categoryEn: 'Pregnancy Emergency / Severe Bleeding / Early Labour',
    categoryTn: 'Kotsi ya Boimana / Madi a mantsi / Pelego pele ga nako',
    categoryKck: 'Ngozi ye Nhumbu / Kubuda mazi / Kuzwala',
    severity: 'CRITICAL',
    dispatchNumbers: [
      { name: 'Ambulance', number: '997' },
      { name: 'Princess Marina Maternity', number: '+267 362 1400' },
    ],
    firstActionEn: 'Call 997 immediately. Have the expectant mother lie on her LEFT side to improve blood flow to baby.',
    firstActionTn: 'Leletsa 997 ka bofefo. Latsa moimana ka lotlhakore la MOLEMA go tokafatsa phepafalo ya madi kwa loseeng.',
    stepByStepEn: [
      'Lie on the left side with a pillow between the knees.',
      'If bleeding: place a clean sanitary pad (do not insert tampons) and keep track of pad count.',
      'If having severe contractions or feeling the baby coming down: prepare a clean, warm space with clean towels.',
      'Bring the mother’s Antenatal Card (Maternal Health Record / Bukana ya Boimana).',
    ],
    stepByStepTn: [
      'Mo latse ka lotlhakore la molema a beile mosamo fa gare ga mangole.',
      'Fa a tswa madi: baya sanitary pad e e phepa o bale gore a tletse di le kae.',
      'Baakanya thaole e e phepa le kobo e e thuthafetseng fa ngwana a le gaufi le go tswa.',
      'Tshola Bukana ya Boimana ya gagwe go tsamaya nayo kokelong.',
    ],
    doNotDoEn: [
      'DO NOT allow her to lie flat on her back (this compresses the inferior vena cava).',
      'DO NOT insert anything into the vagina.',
    ],
    doNotDoTn: [
      'O SE KA wa mo latsa ka mokwatla.',
      'O SE KA wa tsenya sepe mo karolong ya sephiri.',
    ],
  },
  {
    id: 'child-emergency',
    categoryEn: 'Child Emergency (High Fever / Lethargy / Convulsion)',
    categoryTn: 'Kotsi ya Ngwana (Letshoroma le legolo / Go palelwa ke go anywa)',
    categoryKck: 'Ngozi yo Mwana',
    severity: 'CRITICAL',
    dispatchNumbers: [
      { name: 'Ambulance', number: '997' },
      { name: 'Mobile Emergency', number: '112' },
    ],
    firstActionEn: 'Immediately transport to the nearest 24h clinic or district hospital. If convulsing or unresponsive, call 997.',
    firstActionTn: 'Isa ngwana ka bofefo kwa kokelong e e bulang ya dioura tse 24 kgotsa patela.',
    stepByStepEn: [
      'Check for Integrated Management of Childhood Illness (IMCI) general danger signs:',
      '1. Unable to drink or breastfeed',
      '2. Vomiting everything',
      '3. Convulsions or abnormal rolling of eyes',
      '4. Unusually sleepy, floppy, or difficult to wake',
      'Keep child comfortable and lightly clothed if feverish—do not bundle in heavy blankets.',
      'Always carry the child’s Child Health Card (Bukana ya Ngwana / Road to Health Card).',
    ],
    stepByStepTn: [
      'Tlhola matshwao a kotsi a ngwana (IMCI):',
      '1. O palelwa ke go anywa kgotsa go nwa metsi',
      '2. O tlhatsa sengwe le sengwe',
      '3. O roroma kgotsa o goga ditshika',
      '4. O robetse thata ga a thantse',
      'Mo apole dikobo tse di bokete fa a fisa go fokotsa themperetjha.',
      'Tshola Bukana ya Ngwana (Child Health Card) ka dinako tsotlhe.',
    ],
    doNotDoEn: [
      'DO NOT bathe child in ice water or rub with methylated spirits/alcohol.',
      'DO NOT force oral medicines if child is lethargic or vomiting repeatedly.',
    ],
    doNotDoTn: [
      'O SE KA wa thapisa ngwana ka metsi a a tsididi thata a a nang le aese.',
      'O SE KA wa mo tsenya molemo wa molomo ka dikgoka a idibetse.',
    ],
  },
];
