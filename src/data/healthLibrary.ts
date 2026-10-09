import { HealthArticle } from '../types';

export const APPROVED_HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'diarrhoeal-illness-ors',
    category: 'diarrhoeal',
    titleEn: 'Diarrhoeal Illness & Homemade Rehydration Solution (ORS)',
    titleTn: 'Bolwetse jwa Letshololo le Thulaganyo ya Sukiri le Letswai (ORS)',
    summaryEn: 'Dehydration from watery diarrhoea is dangerous, especially in young children. Learn how to prepare life-saving ORS at home before reaching the clinic.',
    summaryTn: 'Go felelwa ke metsi mo mmeleng ka ntlha ya letshololo go kotsi mo baneng. Ithute go fepa ngwana motswako wa sukiri le letswai.',
    contentEn: `Diarrhoea occurs when bowel movements become loose or watery. In Botswana's warm climate, loss of fluids and salts can quickly lead to severe dehydration.

The priority is immediate oral rehydration at home. Continue feeding and breastmilk; do not withhold food.

HOMEMADE ORAL REHYDRATION RECIPE (Standard MoH Botswana guideline):
1. Take 1 litre of clean boiled and cooled drinking water.
2. Add 6 level teaspoons of sugar.
3. Add 1/2 level teaspoon of salt.
4. Stir until completely dissolved.
5. Give the child small sips frequently (e.g. 1 teaspoon every 2 minutes if vomiting).

Take the child to the nearest clinic to collect Zinc supplements, which shorten diarrhoea duration and prevent recurrences for the next 3 months.`,
    contentTn: `Letshololo le baka go fela ga metsi le matswai mo mmeleng wa ngwana ka bofefo. Se se botlhokwa pele ga o goroga kwa tliliniking ke go thibela letsapa le go felelwa ke metsi.

SEKGAETSE SA GO DIRA MOTSWAKO WA SUKIRI LE LETSWAI:
1. Tsaya lithara e le nngwe ya metsi a a bedisitsweng a bo a tsidifadiwa.
2. Tsenya ditshwana tse 6 tsa sukiri (teaspoons).
3. Tsenya halofo ya leswana la letswai (1/2 teaspoon).
4. Fuduwa sentle go fitlhela di nyerologa.
5. Nosedisa ngwana ka ditswana gantsi, le fa a tlhatsa, mo fele ka iketlo.

Ipotse kwa kokelwaneng ya lona go tsaya dipilisi tsa Zinc tse di fokotsang bogale jwa letshololo.`,
    warningSignsEn: [
      'Sunken eyes or dry mouth and tongue',
      'Child cannot drink or is too weak to cry tears',
      'Blood visible in the stool (dysentery)',
      'Diarrhoea lasting more than 3 days with high fever',
    ],
    warningSignsTn: [
      'Matlho a tseneletseng kgotsa molomo o o omeletseng',
      'Ngwana o palelwa ke go anywa kgotsa go nwa metsi',
      'Madi a bonala mo mantle',
      'Letshololo le le fetang malatsi a le 3 le letshoroma le legolo',
    ],
    practicalStepsEn: [
      'Give ORS after every loose bowel movement.',
      'Continue breastfeeding or giving clean foods like soft sorghum porridge (motogo).',
      'Avoid sugary sodas, commercial juices, or overly sweet teas which worsen diarrhoea.',
    ],
    practicalStepsTn: [
      'Nosedisa motswako wa ORS nako le nako fa ngwana a sena go itlhotlhora.',
      'Tswelela o anyisa ngwana le go mo fa motogo o o motlhofo o o apeilweng sentle.',
      'Efoga dino tse di nang le sukiri e ntsi jaaka ditsididi le di-juice.',
    ],
    reviewedBy: 'Dr. K. Modise, Primary Healthcare Specialist, MoH Botswana',
    reviewDate: '2026-06-15',
    mohProtocolVersion: 'MoH-IMCI-2025-v3.1',
  },
  {
    id: 'acute-respiratory-tb',
    category: 'respiratory',
    titleEn: 'Coughs, Chest Infections and TB Screening in Botswana',
    titleTn: 'Kaelo ya Sehuba se se Sa Foleng le Tlhatlhobo ya Kgotlholo (TB)',
    summaryEn: 'Distinguishing common viral respiratory tract infections from conditions requiring antibiotic treatment or tuberculosis (TB) investigation.',
    summaryTn: 'Go lemoga pharologano fa gare ga mofikela o o tlwaelegileng le bolwetse jwa TB kgotsa kgotlholo e e tlhokang tlhatlhobo ya ngaka.',
    contentEn: `Respiratory infections range from common mild colds (caused by viruses that resolve on their own in 5 to 7 days) to pneumonia and pulmonary tuberculosis.

In Botswana, TB testing is completely free at all government clinics and health posts. If a cough lasts longer than 2 weeks, especially when accompanied by evening sweats, unexplained weight loss, or chest pain, it is vital to visit a clinic for a sputum GeneXpert test.

Antibiotics do not cure viral colds and should only be prescribed by a healthcare worker when a bacterial chest infection or pneumonia is diagnosed.`,
    contentTn: `Mofikela le sehuba se se botlhofo gantsi se fola se le sosi mo malatsing a le 5 go ya go a le 7 ka go nwa metsi a a lekaneng le go ikhutsa.

Mo Botswana, tlhatlhobo ya kgotlholo e kgolo (TB) ke ya mahala kwa ditleliniking tsotlhe. Fa kgotlholo e tsaya nako e e fetang dibeke tse pedi, o gotela bosigo, kgotsa o ota o sa itlhaloganyetse, etela kokelwana ya gago go tsenya kgotlholo mo testing ya GeneXpert.

Dipilisi tsa antibiotics ga di alafe mofikela, mme di tshwanetse fela go laelwa ke mooki kgotsa ngaka fa go tlhokega.`,
    warningSignsEn: [
      'Coughing up blood or rust-colored phlegm',
      'Struggling to catch breath or chest pulling inwards with breathing',
      'High fever lasting more than 48 hours without easing',
      'Severe pain in the ribs when breathing deeply or coughing',
    ],
    warningSignsTn: [
      'Go kgotlhola madi kgotsa marere a a nang le madi',
      'Go hupela le sehuba se se kabiwang fa o hema',
      'Letshoroma le legolo le le sa fokotsegeng malatsi a mabedi',
      'Botlhoko jo bo masisi mo logopong fa o hema',
    ],
    practicalStepsEn: [
      'Drink warm water with honey and lemon to soothe throat irritation (not for infants under 1 year).',
      'Cover your mouth and nose with an elbow when coughing to protect household members.',
      'Keep rooms well-ventilated by keeping windows slightly open.',
    ],
    practicalStepsTn: [
      'Nwa metsi a a borutho a a nang le lero la dinamune le tswina ya dinotshe.',
      'Thiba molomo ka sephaka sa lebogo fa o kgotlhola.',
      'Tlogela difensetere di bulegile go tsenya phefo e e phepa mo ntlong.',
    ],
    reviewedBy: 'National TB Programme / Public Health Directorate',
    reviewDate: '2026-07-20',
    mohProtocolVersion: 'NTP-BW-GUIDELINES-2025',
  },
  {
    id: 'maternal-danger-signs',
    category: 'maternal_child',
    titleEn: 'Critical Danger Signs During Pregnancy and Early Postpartum',
    titleTn: 'Matshwao a Kotsi mo Nakong ya Boimana le Morago ga Pelego',
    summaryEn: 'Expectant mothers must recognize emergency warning signals requiring immediate transport to a maternity facility.',
    summaryTn: 'Bomme ba ba itsholofetseng ba tshwanetse go itse matshwao a a tlhokang go ya ka bonako kwa kgotleng ya matsalo mo sepateleng.',
    contentEn: `While pregnancy is a natural process, complications can arise swiftly. Understanding red-flag warning signs saves both mother and baby.

All pregnant women in Botswana should attend at least 8 Antenatal Care (ANC) contacts. The Road to Health / Antenatal Record must be carried at all times.

Pre-eclampsia (high blood pressure in pregnancy) is a leading cause of maternal complications and requires immediate assessment if severe headaches, visual disturbances, or upper abdominal swelling occur.`,
    contentTn: `Ka nako ya boimana, botsogo jwa mme le ngwana bo tshwanetse go babalesega. Bomme botlhe ba tshwanetse go etela tliliniki go itlhatlhoba nako le nako le go tshola Bukana ya Boimana.

Bolwetse jwa madi a matona ka nako ya boimana (pre-eclampsia) bo baka kotsi e kgolo. Fa o utlwa tlhogo e opa thata, o bona maru mo matlhong, kgotsa o ruruha sefatlhego le diatla, ya kokelong ka bofefo.`,
    warningSignsEn: [
      'Vaginal bleeding, even painless spotting',
      'Severe headache with blurred vision or spots before eyes',
      'Sudden swelling of face, hands, and feet',
      'Decreased baby movements after 28 weeks of gestation',
      'Fluid leaking from the vagina before the due date',
    ],
    warningSignsTn: [
      'Madi a a tswang mo sephiring',
      'Go opa ga tlhogo go go masisi le go se bone sentle',
      'Go ruruha difatlhego, matsogo le maoto ka tshoganyetso',
      'Ngwana o emisa kgotsa o fokotsa go raga mo mpeng',
      'Metsi a pelego a dutla pele ga nako',
    ],
    practicalStepsEn: [
      'Always have transport arranged in advance for your expected delivery date.',
      'Take iron and folic acid supplements daily as provided by the clinic.',
      'Sleep on your left side to maximize placental blood circulation.',
    ],
    practicalStepsTn: [
      'Baakanya koloi kgotsa thulaganyo ya go ya kokelong esale gale.',
      'Nwa dipilisi tsa tshipi (iron & folic acid) tsatsi le letsatsi jaaka o laetswe.',
      'Robala ka lotlhakore la molema go tokafatsa phepafalo ya madi kwa maseeng.',
    ],
    reviewedBy: 'Maternal & Reproductive Health Unit, Princess Marina Hospital',
    reviewDate: '2026-05-10',
    mohProtocolVersion: 'MoH-MNH-2025-v2',
  },
  {
    id: 'malaria-prevention-signs',
    category: 'malaria',
    titleEn: 'Malaria Risk, Symptoms & Treatment in Northern Botswana',
    titleTn: 'Kaelo ya Bolwetse jwa Malaria mo Dikgaolong tsa Bokone jwa Botswana',
    summaryEn: 'Malaria is endemic in Ngamiland, Chobe, and parts of Central district. Early fever testing saves lives; delays can cause cerebral malaria.',
    summaryTn: 'Malaria e aname mo Ngamiland, Chobe le Boteti. Tlhatlhobo ya letshoroma mo nakong e khutshwane e pholosa botshelo.',
    contentEn: `Malaria is a life-threatening infection transmitted by infected Anopheles mosquitoes. In Botswana, the peak malaria season runs from November to May following summer rains.

Any fever occurring during or within one month of visiting Ngamiland, Maun, Kasane, Chobe, or Okavango must be tested for malaria immediately using a rapid diagnostic test (mRDT) at the clinic.

Botswana provides free and highly effective Artemisinin-based Combination Therapy (Coartem) at all public health facilities. Complete the entire 3-day course even if you feel better after day 1.`,
    contentTn: `Malaria e bakiwa ke motsetse wa monang. Mo Botswana e bonala thata go tloga ka kgwedi ya Ngwanatsele go fitlha Motsheganong morago ga dipula.

Motho mongwe le mongwe yo o nang le letshoroma a tswa kwa Maun, Kasane kgotsa Chobe o tshwanetse go tlhatlhobiwa malaria ka bofefo kwa tliliniking e e gaufi.

Kalafo ya Coartem ke ya mahala mme e alafa bolwetse jo ka botlalo fa o fetsa dipilisi tsotlhe tsa malatsi a mararo o sa tlose epe.`,
    warningSignsEn: [
      'High spiking fever with shaking chills and shivering',
      'Severe vomiting, preventing intake of oral medications',
      'Yellowing of eyes or skin (jaundice)',
      'Dark "tea-colored" urine',
      'Confusion, sleepiness, or convulsions (Cerebral Malaria)',
    ],
    warningSignsTn: [
      'Letshoroma le le tlhatlogang ka go roroma le go tsubala',
      'Go tlhatsa mo o palelwang ke go nwa dipilisi',
      'Matlho a a fetogang serolwana',
      'Mothapo o o fetogileng mmala jaaka tee e ntsho',
      'Kudzunguka, go thulamela thata kgotsa go goga ditshika',
    ],
    practicalStepsEn: [
      'Sleep under insecticide-treated mosquito nets every night.',
      'Allow government Indoor Residual Spraying (IRS) teams to spray your home.',
      'Wear long-sleeved clothing and trousers when outdoors at dawn and dusk.',
    ],
    practicalStepsTn: [
      'Robala mo gare ga lotloa lwa monang (mosquito net) bosigo bongwe le bongwe.',
      'Letlelela badiri ba puso go fasa ditlhare tsa monang mo malwapeng.',
      'Apara diaparo tse di tswalang maoto le matsogo maitseboa fa o le kwa ntle.',
    ],
    reviewedBy: 'National Malaria Elimination Programme (NMEP)',
    reviewDate: '2026-08-05',
    mohProtocolVersion: 'NMEP-BW-2025-REV',
  },
  {
    id: 'snakebite-scorpion-first-aid',
    category: 'first_aid',
    titleEn: 'Snakebite & Scorpion Sting Protocols in Botswana',
    titleTn: 'Kaelo ya Kotsi ya go Longwa ke Noga le Phepheng mo Botswana',
    summaryEn: 'Critical first aid for venomous bites (Puff Adder, Mamba, Spitting Cobra) and scorpions in rural and cattlepost environments.',
    summaryTn: 'Thulaganyo ya bofefo fa o longwa ke noga kgotsa phepheng kwa morakeng kgotsa mo gae pele ga o fitlha kwa kokelong.',
    contentEn: `Botswana is home to several medically significant venomous snakes: Puff Adders (cytotoxic/tissue necrosis), Black and Green Mambas (neurotoxic/paralysis), and Spitting Cobras.

DO NOT use old folklore methods: never cut the wound, never suck the venom, never apply ice, and never use tight tourniquets that stop all arterial blood flow.

Immobilize the bitten limb with a splint, keep the patient calm and completely still, and transport rapidly to the nearest hospital where antivenom (SAVP Polyvalent Snake Antivenom) is stocked.`,
    contentTn: `Mo Botswana go na le dinoga tse di borai jaaka Lephatshi, Mokwepa, le Kake. 

O SE KA WA SEGOLOLA NTHO KA THIPA, O SE KA WA ANYWA BOTLHOLE, O SE KA WA FUNGA KA THAPO E E THIBANG MADI GOTLHE.

Bofa leoto kgotsa seatla se se longweng gore se se ka sa suta-suta ka go bofelela kota e e papametseng. Dira gore molwetsi a iketle a ritibale mme lo mmhatele ka bonako kwa sepateleng sa kgaolo se se nang le antivenom.`,
    warningSignsEn: [
      'Difficulty swallowing, drooping eyelids, or trouble breathing (Neurotoxic venom)',
      'Rapid swelling spreading quickly up the limb (Cytotoxic venom)',
      'Uncontrolled bleeding from bite marks, gums, or nose (Hemotoxic venom)',
      'Severe agonizing pain radiating up the limb following a scorpion sting',
    ],
    warningSignsTn: [
      'Go palelwa ke go kometsa, dintshi tse di wela fatshe, kgotsa go hupela',
      'Go ruruha mo go anamelang godimo ga leoto ka bonako',
      'Madi a a dutlang mo molomong kgotsa mo marineng',
      'Botlhoko jo bo feteletseng jwa phepheng jo bo anamelang mo mmeleng',
    ],
    practicalStepsEn: [
      'Remove rings, bracelets, or tight shoes before swelling begins.',
      'Keep the bite site positioned at or slightly below the level of the heart.',
      'Take a safe photograph of the snake from a distance ONLY if it does not delay transport.',
    ],
    practicalStepsTn: [
      'Rola dipalamonwana le dibenyane pele ga letlalo le ruruha.',
      'Baya karolo e e longweng mo maemong a a lekanang le pelo.',
      'Tlhokomela go se batle go tshwara noga ka e ka go loma gape.',
    ],
    reviewedBy: 'Trauma Directorate & Toxicology Unit, Nyangabgwe Hospital',
    reviewDate: '2026-07-02',
    mohProtocolVersion: 'BW-TOX-SNAKE-2025',
  },
  {
    id: 'mental-health-lifeline',
    category: 'mental_health',
    titleEn: 'Mental Wellbeing, Distress & Lifeline Botswana Support',
    titleTn: 'Kaelo ya Maikutlo, Tlhobaelo le Thuso ya Lifeline Botswana',
    summaryEn: 'You do not have to carry overwhelming stress, grief, or depression alone. Confidential, free support services in Botswana.',
    summaryTn: 'Ga o a tshwanela go rwala pelo e e botlhoko kgotsa kgatelelo o le nosi. Ditirelo tsa mahala tsa bofefo tsa tshidilo maikutlo.',
    contentEn: `Emotional distress, severe anxiety, and depression are legitimate medical conditions that respond to care and counselling.

In Botswana, cultural stigmas often prevent individuals from seeking help early. Recognize that feelings of hopelessness, severe sleeplessness, loss of interest in daily life, or thoughts of self-harm deserve compassionate attention.

Contact Lifeline Botswana toll-free on 0800 600 740 or visit the mental health nurse at your local clinic for confidential support.`,
    contentTn: `Kgatelelo ya maikutlo le tlhobaelo e e feteletseng ke bolwetse jo bo alafegang. Mo Botswana, batho ba le bantsi ba itshoka ba le bosi ka ntlha ya ditlhong.

Fa o ikutlwa o se na tsholofelo, o sa kgone go robala, o gopola go intsha botshelo kgotsa go itlhokomolosa, itse gore o ka bona thuso e e tshepegang.

Leletsa Lifeline Botswana mahala mo go 0800 600 740 kgotsa etela mooki wa ditlhale mo tliliniking ya gago.`,
    warningSignsEn: [
      'Expressing desires to end one’s life or feeling like a burden to loved ones',
      'Giving away prized possessions or sudden withdrawal from family and friends',
      'Severe panic attacks with racing heartbeat, shaking, and dread',
      'Hearing voices or seeing things others cannot perceive',
    ],
    warningSignsTn: [
      'Go bua ka go batla go tlogela lefatshe kgotsa go ikutlwa o le morwalo',
      'Go ikgogona le go kgaogana le ditsala le ba lelwapa',
      'Kgothalo e e berekang ka letshogo le pelo e e itayang ka bofefo',
      'Go utlwa mantswe kgotsa go bona dilo tse ba bangwe ba sa di boneng',
    ],
    practicalStepsEn: [
      'Reach out to someone you trust: a friend, pastor, family member, or healthcare worker.',
      'Save the national helpline: 0800 600 740 on your phone for immediate call support.',
      'Remember that clinical nurses at all clinics are trained to provide confidential primary mental health care.',
    ],
    practicalStepsTn: [
      'Bua le motho yo o mo tshepang: tsala, moruti, wa lelwapa kgotsa mooki.',
      'Boloka nomore ya Lifeline 0800 600 740 mo founung ya gago.',
      'Itse gore baoki mo ditleliniking tsotlhe ba thapisitswe go go utlwa ka sephiri.',
    ],
    reviewedBy: 'Mental Health Coordination Unit / Lifeline Botswana',
    reviewDate: '2026-06-30',
    mohProtocolVersion: 'MoH-MH-2025',
  },
];
