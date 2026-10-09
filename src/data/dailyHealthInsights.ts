import { DailyHealthInsight } from '../types';

export const DAILY_HEALTH_INSIGHTS: DailyHealthInsight[] = [
  {
    id: 'dhi-ngamiland-waterborne',
    district: 'Ngamiland (Maun)',
    districtScope: 'local',
    topic: 'waterborne',
    severity: 'alert',
    dateValid: '2026-10-01',
    title: {
      en: 'Clean Water Precaution & Immediate Home ORS for Paediatric Diarrhoea',
      tn: 'Tlhokomelo ya Metsi a a Phepa le Motswako wa ORS mo Baneng',
      kck: 'Tsireledzo ye Mvura Yakaphepa ne Mushonga we ORS ku Bana'
    },
    headlineContext: {
      en: 'Ngamiland DHMT flagged an 85.7% uptick in paediatric watery diarrhoea across Thamalakane river settlements. Early hydration at home prevents severe dehydration before reaching the clinic.',
      tn: 'Lekgotla la Botsogo la Ngamiland (DHMT) le lemogile koketsego ya 85.7% ya letshololo mo baneng ba ba kwa tlase ga dingwaga tse 5 gaufi le noka ya Thamalakane. Tlhokomelo ya bofefo ya metsi a sukiri le letswai e pholosa botshelo.',
      kck: 'Baphaphatisi be Ngamiland DHMT bawona kwando ye 85.7% ye zhizho yebana bano shupika ne manyemba pado ne nuka ye Thamalakane.'
    },
    trendSignal: {
      en: 'Paediatric cluster under-5 threshold exceeded in Boseja & Matlapana wards',
      tn: 'Koketsego ya letshololo mo dikgotleng tsa Boseja le Matlapana',
      statValue: '+85.7%',
      statLabel: '7-day syndromic cluster spike',
      source: 'Ngamiland DHMT Surveillance & Water Quality Desk'
    },
    actionAdvice: {
      en: [
        'Boil all household drinking water for a minimum of 3 rolling minutes, particularly water collected from communal taps or bowsers.',
        'At the first loose stool, prepare homemade ORS: 1 litre boiled/cooled water + 6 level teaspoons sugar + 1/2 level teaspoon salt.',
        'Never withhold breastfeeding or soft sorghum porridge (motogo); continue frequent feeding.',
        'Visit your nearest clinic or health post to collect free Zinc tablets—taking Zinc for 10 days prevents recurrence for 3 months.'
      ],
      tn: [
        'Bedisa metsi otlhe a go nwa bonyane metsotso e le 3 e tuka, segolo jang metsi a ditanka kgotsa a dipompo tsa setshaba.',
        'Fa ngwana a simolola go itlhotlhora, mo fele ORS: lithara e le 1 ya metsi a a bedisitsweng + ditshwana tse 6 tsa sukiri + halofo ya leswana la letswai.',
        'O se ka wa kgaotsa go anyisa ngwana kgotsa go mo fa motogo o o apeilweng sentle.',
        'Etela kokelwana e e gaufi go tsaya dipilisi tsa Zinc tsa mahala—Zinc e fokotsa letshololo e bo e sireletsa ngwana dikgwedi tse 3.'
      ]
    },
    didYouKnow: {
      en: 'Zinc supplementation combined with ORS reduces the duration of childhood diarrhoea by up to 25% and is freely provided by all Botswana public clinics.',
      tn: 'Dipilisi tsa Zinc fa di dirisiwa le motswako wa ORS di fokotsa boleele jwa letshololo ka 25% mme di abelwa mahala kwa ditleliniking tsotlhe tsa puso.'
    },
    quickAction: {
      type: 'protocol',
      labelEn: 'Open MoH ORS & Diarrhoea Protocol',
      labelTn: 'Bona Kaelo ya Semmuso ya ORS',
      targetTab: 'health_info',
      targetPayload: 'diarrhoeal-illness-ors'
    },
    shareableSummaryText: {
      en: 'PHELO Public Health Alert for Ngamiland: 85% diarrhoea increase flagged in under-5s. Boil drinking water for 3 mins. Start home ORS (1L clean water + 6 tsp sugar + 1/2 tsp salt) & visit clinic for Zinc tablets.',
      tn: 'Tlhagiso ya Botsogo ya PHELO ya Ngamiland: Letshololo la bana le tlhatlogile ka 85%. Bedisa metsi a go nwa metsotso e le 3. Fa ngwana motswako wa ORS (1L metsi + ditshwana 6 tsa sukiri + halofo ya letswai) o bo o ya tliliniking go tsaya Zinc.'
    }
  },
  {
    id: 'dhi-chobe-malaria',
    district: 'Chobe (Kasane)',
    districtScope: 'local',
    topic: 'vector',
    severity: 'alert',
    dateValid: '2026-10-01',
    title: {
      en: 'Early Vector Precaution & 24-Hour Fever Testing in Northern Corridor',
      tn: 'Kaelo ya Monang wa Malaria le Tlhatlhobo ya Letshoroma kwa Bokone',
      kck: 'Yambulo ye Ndandagwi ye Mvula ne Ku Tjekiwa kwe Fever mu Chobe'
    },
    headlineContext: {
      en: 'Rising seasonal temperatures and river edge backwaters have increased early Anopheles vector breeding in riparian Chobe settlements, with a 72.2% febrile signal uptick.',
      tn: 'Mogote o o tlhatlogang le matsha a noka ya Chobe di okeditse matsetse a menang ya malaria, ka koketsego ya 72.2% ya batho ba ba nang le letshoroma mo kgaolong.',
      kck: 'Kupisa kwo mbili ne mvura pado ne nuka ya Chobe kwo visa dzinanga dze malaria kwano kwanza ndandagwi.'
    },
    trendSignal: {
      en: 'Elevated rapid diagnostic test (RDT) positivity at 14% at Kasane Primary Outpatient',
      tn: 'Tlhatlhobo ya RDT e bontsha koketsego ya 14% kwa kokelong ya Kasane',
      statValue: '+72.2%',
      statLabel: 'Vector & febrile signal increase',
      source: 'National Malaria Elimination Programme & Chobe Directorate'
    },
    actionAdvice: {
      en: [
        'Any unexplained fever occurring within 30 days of visiting Kasane, Chobe, or Okavango requires an immediate clinic blood test (mRDT) within 24 hours.',
        'Sleep under an insecticide-treated mosquito net every single night, ensuring edges are tucked securely under the mattress.',
        'Allow national Indoor Residual Spraying (IRS) teams full access to spray internal home walls—it is proven safe and highly protective.',
        'Clear all standing water receptacles, discarded tins, and animal drinking troughs within 10 metres of sleeping quarters.'
      ],
      tn: [
        'Motho mongwe le mongwe yo o tswang Kasane, Chobe kgotsa Okavango a na le letshoroma mo malatsing a le 30 o tshwanetse go ya tlhatlhobong ya madi kwa tliliniking mo dioureng tse 24.',
        'Robala mo lotloeng lwa monang (mosquito net) bosigo bongwe le bongwe, o tsenye matlhakore a lone ka fa tlase ga materase.',
        'Letlelela badiri ba puso ba go fasa matlo go fasa dipota tsa gago ka ditlhare tsa go thibela monang—ga di na kotsi mo bathong.',
        'Tsholola metsi a a emeng mo ditankeng, dithining kgotsa dijelo tsa diruiwa tse di gaufi le fa lo robalang gone.'
      ]
    },
    didYouKnow: {
      en: 'First-line Artemisinin combination therapy (Coartem) is 100% free at all government clinics in Botswana and cures uncomplicated malaria in 3 days if taken promptly.',
      tn: 'Dipilisi tsa Coartem di fiwa mahala kwa ditleliniking tsotlhe tsa puso mo Botswana mme di fodisa malaria mo malatsing a le mararo fela fa o simolola ka bonako.'
    },
    quickAction: {
      type: 'protocol',
      labelEn: 'Review Malaria Protocol & Signs',
      labelTn: 'Bona Matshwao a Malaria & Dikaelo',
      targetTab: 'health_info',
      targetPayload: 'malaria-prevention-signs'
    },
    shareableSummaryText: {
      en: 'PHELO Chobe Health Alert: Early vector activity uptick along Chobe River. Any fever needs an immediate clinic test within 24 hours. Sleep under treated mosquito nets and support IRS house spraying.',
      tn: 'Tlhagiso ya PHELO mo Chobe: Menang ya malaria e simolotse go ata. Letshoroma lengwe le lengwe le batla tlhatlhobo mo dioureng tse 24 kwa kokelwaneng. Robala mo neteng ya monang.'
    }
  },
  {
    id: 'dhi-gaborone-respiratory',
    district: 'Gaborone',
    districtScope: 'local',
    topic: 'respiratory',
    severity: 'seasonal',
    dateValid: '2026-10-01',
    title: {
      en: 'Spring Seasonal Shift: Viral Colds vs. 2-Week TB Sputum Screening',
      tn: 'Phetogo ya Sehula: Mofikela wa Tlwaelo le Tlhatlhobo ya Kgotlholo e e Fetang Dibeke tse 2',
      kck: 'Phetogo ye Shango: Kgotlholo ne Tjeko ye Mahala ye TB'
    },
    headlineContext: {
      en: 'Seasonal temperature variations and spring dust have driven a 29.1% increase in acute upper respiratory presentations across Gaborone and South East clinics, predominantly in school-aged children.',
      tn: 'Phefo le lerole la dikgakologo di okeditse mofikela le sehuba ka 29.1% mo ditleliniking tsa Gaborone le South East, segolo jang mo baneng ba dikolo.',
      kck: 'Mphepo ne buseze kwo shango kwo kwanza gohola kwebana be chikolo mu Gaborone.'
    },
    trendSignal: {
      en: 'Upper respiratory surge across Gaborone clinics within expected spring seasonal limits',
      tn: 'Koketsego ya sehuba sa dikgakologo mo ditleliniking tsa Gaborone',
      statValue: '+29.1%',
      statLabel: 'Upper respiratory presentation uptick',
      source: 'Gaborone DHMT & National Tuberculosis Programme'
    },
    actionAdvice: {
      en: [
        'Most viral coughs and runny noses resolve naturally within 5 to 7 days with rest, hydration, and warm drinks like lemon and honey (for children over 1 year).',
        'Avoid requesting or buying antibiotics for simple viral colds; antibiotics do not destroy viruses and can cause resistant bacteria.',
        'CRITICAL RULE: Any cough lasting longer than 2 weeks, or accompanied by night sweats, chest pain, or weight loss, requires a free GeneXpert TB sputum test at your nearest clinic.',
        'Promote cough etiquette at home and schools: sneeze into the elbow crease and keep classroom windows well-ventilated.'
      ],
      tn: [
        'Mofikela o montsi o fola o le wosi mo malatsing a le 5 go ya go a le 7 ka go nwa metsi a a borutho le go ikhutsa.',
        'O se ka wa reka kgotsa wa kopa dipilisi tsa antibiotics fa o na le mofikela fela; ga di bolae ditoroko tsa mofikela.',
        'MOLAO WA BOTLHOKWA: Sehuba sengwe le sengwe se se fetang dibeke tse 2, kgotsa se na le go fufula bosigo le go ota, se tlhoka tlhatlhobo ya mahala ya TB (GeneXpert) kwa kokelwaneng.',
        'Rutang bana go thiba melomo ka sephaka sa lebogo fa ba kgotlhola le go tlogela difensetere di bulegile go tsenya phefo e e phepa.'
      ]
    },
    didYouKnow: {
      en: 'Botswana provides ultra-rapid GeneXpert molecular TB screening at no cost at all public facilities, delivering results often within 24 to 48 hours.',
      tn: 'Tlhatlhobo ya sefofora sa TB sa sesha sa GeneXpert ke ya mahala kwa ditleliniking tsotlhe tsa puso mo Botswana mme maduo a tswa ka bonako mo dioureng tse 24-48.',
    },
    quickAction: {
      type: 'protocol',
      labelEn: 'Review MoH Respiratory & TB Protocol',
      labelTn: 'Bona Dikaelo tsa Sehuba & TB',
      targetTab: 'health_info',
      targetPayload: 'acute-respiratory-tb'
    },
    shareableSummaryText: {
      en: 'PHELO Spring Health Advice: 29% increase in seasonal coughs in Gaborone. Simple colds resolve in 5-7 days with rest and fluids. But if cough lasts 2+ weeks, visit your clinic for a free GeneXpert TB check.',
      tn: 'Kgakololo ya PHELO ya Gaborone: Sehuba sa dikgakologo se oketsegile. Mofikela o fola mo malatsing a le 5-7 ka go ikhutsa. Fa sehuba se feta dibeke tse 2, ya tliliniking go itlhatlhobela TB mahala.'
    }
  },
  {
    id: 'dhi-kgalagadi-heatwave',
    district: 'Kgalagadi (Tsabong)',
    districtScope: 'local',
    topic: 'environmental',
    severity: 'advisory',
    dateValid: '2026-10-01',
    title: {
      en: 'Desert Heatwave Alert: Hydration & Heat Exhaustion Prevention',
      tn: 'Tlhagiso ya Mogote o o Feteletseng: Go Nwa Metsi le Tshireletso ya Letsatsi',
      kck: 'Yambulo ye Kupisa kwo Zhuba mu Kgalagadi'
    },
    headlineContext: {
      en: 'Spring ambient temperatures in Kgalagadi and Ghanzi regions are approaching 37°C. Early dehydration and heat exhaustion are prominent hazards for livestock herders, farm workers, and elderly citizens.',
      tn: 'Mogote mo kgaolong ya Kgalagadi le Ghanzi o tsena mo go 37°C. Go felelwa ke metsi le letsapa la mogote ke kotsi e kgolo mo badiring ba merakeng, batsofe le masea.',
      kck: 'Kupisa kwo zhuba mu Kgalagadi kwaswika 37°C. Nthu unofanila kunwa mvura kuitila kuti asawire pasi.'
    },
    trendSignal: {
      en: 'High ambient temperature advisory with elevated clinical dehydration rates',
      tn: 'Mogote o o feteletseng o baka letsapa le go felelwa ke metsi mo mmeleng',
      statValue: '37°C',
      statLabel: 'Peak dry desert daytime index',
      source: 'Department of Meteorological Services & Kgalagadi Health District'
    },
    actionAdvice: {
      en: [
        'Drink water proactively before feeling thirsty—adults should aim for 2.5 to 3.5 litres of clean water per day during high heat.',
        'Avoid direct sun exposure between 11:30 AM and 15:30 PM; wear wide-brimmed hats and lightweight, light-coloured clothing.',
        'Watch for early heat exhaustion: dizziness, profuse sweating, nausea, rapid pulse, and dark-amber urine. Move immediately to deep shade and sip cool water.',
        'Never leave infants, children, or elderly family members inside closed vehicles or unventilated corrugated zinc structures.'
      ],
      tn: [
        'Nwa metsi o sa emele go utlwa lenyora—motho yo motona o tshwanetse go nwa dilithara tse 2.5 go ya go 3.5 tsa metsi a a phepa ka letsatsi fa go fisa.',
        'Efoga letsatsi le le fisisang magareng ga 11:30 le 15:30; apara hutshe e e bophara le diaparo tse di motlhofo tse di seng dintsho.',
        'Tlhokomela matshwao a go kgwathisiwa ke mogote: go zunguzega, go fufulelwa thata, pelo e e itayang ka bofefo, le mothapo o o serolwana se se fifetseng.',
        'O se ka wa tlogela ngwana kgotsa motsofe mo koloing e e tswetsweng kgotsa mo ntlwaneng ya masenke e e se nang phefo.'
      ]
    },
    didYouKnow: {
      en: 'Water loss from sweating can reach 1 litre per hour during outdoor manual labour in Botswana desert heat. Drinking small sips frequently hydrates the body far more effectively than drinking large volumes at once.',
      tn: 'Mmele o ka latlhegelwa ke lithara e le nngwe ya metsi ka houra e le nngwe fa o bereka mo letsatsing mo Kgalagadi. Go nwa metsi ka ditswana gantsi go molemo go gaisa go nwa a mantsi ka gangwe.'
    },
    quickAction: {
      type: 'triage',
      labelEn: 'Check Heat Exhaustion Symptoms',
      labelTn: 'Tlhatlhoba Matshwao a Mogote',
      targetTab: 'triage'
    },
    shareableSummaryText: {
      en: 'PHELO Heat Advisory for Kgalagadi & Ghanzi: Temperatures near 37°C. Drink 3L water daily, seek shade between 11:30 and 15:30, and watch for dizziness/nausea. Protect children & elders.',
      tn: 'Tlhagiso ya Mogote ya PHELO mo Kgalagadi: Mogote o tsena mo go 37°C. Nwang metsi a mantsi (3L), iphitlheng mo moriting fa letsatsi le tuka, lo tlhokomele batsofe le masea.'
    }
  },
  {
    id: 'dhi-kweneng-maternal',
    district: 'Kweneng (Molepolole)',
    districtScope: 'local',
    topic: 'maternal',
    severity: 'preventive',
    dateValid: '2026-10-01',
    title: {
      en: 'First-Trimester Antenatal Booking & Maternal Hypertension Screening',
      tn: 'Go Kwadisa Boimana Pele ga Dibeke tse 12 le Tlhatlhobo ya Madi a Matona',
      kck: 'Kunyoresa Nhumbu Nechimbi ne Tjeko ye Madi a Mahulu'
    },
    headlineContext: {
      en: 'Kweneng DHMT reports improved early antenatal registration following mobile clinic outreach. Early first-trimester booking allows timely detection of gestational hypertension (pre-eclampsia) and anaemia prevention.',
      tn: 'Lekgotla la Botsogo la Kweneng le akgola bomme ba ba kwadisang boimana esale gale. Go simolola tlhatlhobo pele ga dibeke tse 12 go thibela botlhoko jwa madi a matona mo mmeleng.',
      kck: 'Bomme banofanila kunyoresa nhumbu ku tliliniki tjiya pashure kwe mwedzi mitatu kuitila kuti bacinge bupenyu gwebana.'
    },
    trendSignal: {
      en: 'Mobile outreach clinics expanding early antenatal booking across Kweneng West',
      tn: 'Ditleliniki tse di tsamayang di thusa bomme go kwadisa boimana ka bonako',
      statValue: '8 ANC',
      statLabel: 'Standard MoH contacts recommended',
      source: 'Maternal & Child Health Directorate & Scottish Livingstone Hospital'
    },
    actionAdvice: {
      en: [
        'Visit your local clinic as soon as you miss a menstrual period or suspect pregnancy (ideally before 12 weeks of gestation).',
        'Collect your free daily Iron and Folic Acid supplements to prevent maternal anaemia and support healthy fetal neural development.',
        'Always carry your green "Road to Health / Antenatal Record" card in a waterproof pouch wherever you travel.',
        'DANGER SIGNS: If you develop a severe persistent headache, blurred vision or seeing spots, or sudden facial swelling, attend maternity casualty immediately.'
      ],
      tn: [
        'Etela tliliniki ya gago ka bonako fa o lemoga gore o itsholofetse (segolo jang pele ga dibeke di le 12 tsa boimana).',
        'Tsaya dipilisi tsa mahala tsa tshipi (Iron & Folic Acid) go nonotsha madi le go thibela bokoa jwa ngwana mo mpeng.',
        'Tshola Bukana ya Boimana (Road to Health card) ya gago mo kgetsaneng e e sa tseneng metsi nako le nako fa o tsamaya.',
        'MATSHWAO A KOTSI: Fa o utlwa tlhogo e opa thata, o sa bone sentle kgotsa o ruruha sefatlhego, potlakela kwa kgotleng ya pelego mo sepateleng.'
      ]
    },
    didYouKnow: {
      en: 'All pregnancy-related checkups, routine ultrasound scans, maternal laboratory tests, and deliveries are fully subsidized by the Government of Botswana.',
      tn: 'Ditlhatlhobo tsotlhe tsa boimana, disikene, diteko tsa lab le go belega mo dipateleng tsa puso ke ditirelo tse di duelelwang ke Puso ya Botswana.'
    },
    quickAction: {
      type: 'protocol',
      labelEn: 'Review Maternal Danger Signs Protocol',
      labelTn: 'Bona Matshwao a Kotsi a Boimana',
      targetTab: 'health_info',
      targetPayload: 'maternal-danger-signs'
    },
    shareableSummaryText: {
      en: 'PHELO Maternal Health Guidance: Expectant mothers in Botswana should book their first clinic checkup before 12 weeks. Collect free Iron/Folate supplements and report severe headaches or swelling immediately.',
      tn: 'Kgakololo ya PHELO ya Boimana: Bomme ba ba itsholofetseng ba tshwanetse go kwadisa pele ga dibeke tse 12. Tsaya dipilisi tsa Iron mahala mme o potlakele kokelong fa tlhogo e opa thata.'
    }
  },
  {
    id: 'dhi-national-hypertension-diabetes',
    district: 'All Districts',
    districtScope: 'national',
    topic: 'chronic',
    severity: 'preventive',
    dateValid: '2026-10-01',
    title: {
      en: 'National NCD Vigilance: Free Blood Pressure & Blood Sugar Screening',
      tn: 'Kaelo ya Setshaba: Tlhatlhobo ya Mahala ya Madi a Matona le Sukiri',
      kck: 'Yambulo ye Shango: Tjeko ye Mahala ye Blood Pressure ne Sukiri'
    },
    headlineContext: {
      en: 'Over 35% of adult high blood pressure (Madi a Matona) in Botswana remains undiagnosed until a stroke or heart complication occurs. Free 5-minute walk-in screenings are accessible at every public clinic outpatient counter.',
      tn: 'Bontsi jwa batho ba ba nang le madi a matona mo Botswana ga ba itse ka gonne ga gona matshwao a a bonalang pele ga pelo e tlhaselwa. Tlhatlhobo ya metsotso e le 5 ke ya mahala kwa tliliniking.',
      kck: 'Bathu banji banano madi a mahulu tabato ziba. Tjeko ye mahala inowanika ku dzipatela dzose dze Botswana.'
    },
    trendSignal: {
      en: 'National Ministry of Health Non-Communicable Diseases (NCD) screening campaign active',
      tn: 'Letsholo la puso la go tlhatlhobela madi a matona le sukiri le tsweletse',
      statValue: 'Free Check',
      statLabel: '5-minute routine clinic walk-in',
      source: 'Ministry of Health Non-Communicable Diseases Directorate'
    },
    actionAdvice: {
      en: [
        'Visit your nearest clinic triage or outpatient counter for a free 5-minute blood pressure and finger-prick glucose check.',
        'Limit added sodium: cut down on salt shakers at the table, stock cubes, and salted biltong; enhance meals with garlic, onion, and fresh herbs.',
        'Incorporate 30 minutes of physical movement 5 days a week: walking briskly, gardening, traditional dancing, or field work.',
        'If you are already on antihypertensive or diabetic medication, take your tablets every day without skipping—even when you feel completely well.'
      ],
      tn: [
        'Etela kokelwana ya gago e e gaufi go tlhatlhobiwa madi a matona le sukiri mahala mo metsotsong e le 5 fela.',
        'Fokotsa letswai mo dijong: fokotsa ditlhare tsa go apaya (stock cubes) le letswai le le beilweng fa fatshe; dirisa konofolo, kwii le ditlama.',
        'Tsaya metsotso e le 30 o itshidila mmele malatsi a le 5 ka beke: go tsamaya ka bofefo, go bereka mo tshingwaneng kgotsa go bina mmino wa setso.',
        'Fa o setse o filwe dipilisi tsa madi a matona kgotsa sukiri, di nwe tsatsi le letsatsi o sa tlose lepe—le fa o ikutlwa o siame.'
      ]
    },
    didYouKnow: {
      en: 'High blood pressure is called the "silent killer" because 8 out of 10 people feel completely normal even when their pressure is dangerously high.',
      tn: 'Madi a matona a bidiwa mmolai yo o didimetseng ka gonne batho ba le 8 mo go ba le 10 ba ikutlwa ba tsogile sentle tota le fa madi a tletse mo mmeleng.'
    },
    quickAction: {
      type: 'facility',
      labelEn: 'Find Nearest Clinic for Screening',
      labelTn: 'Batla Tleliniki e e Gaufi ya Tlhatlhobo',
      targetTab: 'facilities',
      targetPayload: 'clinic'
    },
    shareableSummaryText: {
      en: 'PHELO Public Health Tip: Know your numbers! Over 35% of high blood pressure in Botswana is silent. Walk into any local government clinic for a free 5-minute blood pressure and glucose test today.',
      tn: 'Kgakololo ya PHELO: Itse maemo a mmele wa gago! Madi a matona ga a na modumo. Etela kokelwana epe ya puso gompieno go itlhatlhoba madi a matona le sukiri mahala mo metsotsong e le 5.'
    }
  },
  {
    id: 'dhi-central-immunization',
    district: 'Central (Serowe / Palapye)',
    districtScope: 'local',
    topic: 'nutrition',
    severity: 'preventive',
    dateValid: '2026-10-01',
    title: {
      en: 'Childhood Routine Immunization Catch-Up & Nutrition Monitoring',
      tn: 'Letsholo la Mekento ya Bana le Tlhokomelo ya Dikotla mo Central',
      kck: 'Kukhwelwa kwe Bana Makento ne Zwidyo Zwinobatsira mu Central'
    },
    headlineContext: {
      en: 'Routine Expanded Programme on Immunization (EPI) checks at Palapye and Serowe clinics emphasize verifying child Road-to-Health clinic cards for scheduled measles, rubella, and polio doses.',
      tn: 'Ditleliniki tsa Serowe le Palapye di ikopela batsadi go netefatsa gore bana ba bone ba kentswe mekento yotlhe ya botlhokwa jaaka mmasele le pholio.',
      kck: 'Dzipatela dze Serowe ne Palapye dzinokumbila babereki kuti bakekese makento ebana bose.'
    },
    trendSignal: {
      en: 'Active child health & growth monitoring clinics at all Central district health posts',
      tn: 'Diteko tsa kgolo le boima jwa ngwana di tsweletse mo dikokelwaneng',
      statValue: '100% Free',
      statLabel: 'EPI childhood vaccines at clinic',
      source: 'Central District Health Management Team (Serowe/Palapye DHMT)'
    },
    actionAdvice: {
      en: [
        'Check your child\'s green clinic card today. If any scheduled vaccines (at birth, 6 wks, 10 wks, 14 wks, 9 mos, or 18 mos) were missed, walk in for catch-up doses.',
        'Attend monthly child growth monitoring sessions to track weight, height, and receive Vitamin A drops and deworming tablets.',
        'Feed weaning infants nutrient-rich traditional foods: mashed beans (morogo wa dinawa), eggs, soft porridge fortified with ground peanuts, and pumpkin.',
        'Never delay bringing a sick or listless infant with fever or chest in-drawing to the clinic.'
      ],
      tn: [
        'Sekaseka karata ya botsogo ya ngwana wa gago gompieno. Fa a na le mokento o o mo fetileng, mo tsee o ye kokelwaneng go ya go o kenta mahala.',
        'Tsenya ngwana diteko tsa kgwedi le kgwedi tsa go lekanya boima jwa mmele le go amogela marothodi a Vitamin A le dipilisi tsa diboko.',
        'Fepa ngwana dijo tse di nang le dikotla: dinawa tse di thubilweng, mahe, motogo o o tswakilweng le manoko a a sidilweng, le lephutse.',
        'O se ka wa diega go isa ngwana yo o sa tsogang kgotsa a na le letshoroma kwa tliliniking.'
      ]
    },
    didYouKnow: {
      en: 'Childhood vaccines prevent over 3 million deaths globally each year and provide life-long immunity against debilitating infectious illnesses.',
      tn: 'Mekento ya bana e thibela dintsho tse di fetang dimilione tse tharo mo lefatsheng ngwaga le ngwaga e bo e sireletsa bana botshelo jotlhe.'
    },
    quickAction: {
      type: 'facility',
      labelEn: 'Find Nearest Child Health Clinic',
      labelTn: 'Bona Kokelwana ya Bana e e Gaufi',
      targetTab: 'facilities',
      targetPayload: 'clinic'
    },
    shareableSummaryText: {
      en: 'PHELO Child Health Advice for Central District: Check your child’s clinic card for missed immunizations (measles, polio). All EPI vaccines are free at government clinics. Bring your child for catch-up!',
      tn: 'Kgakololo ya PHELO ya Bana: Sekaseka karata ya ngwana go bona gore a o kentswe mekento yotlhe ya mmasele le pholio. Mekento yotlhe ke ya mahala kwa ditleliniking tsa puso.'
    }
  }
];

export function getDailyInsightsForDistrict(districtName: string): DailyHealthInsight[] {
  if (!districtName || districtName === 'All' || districtName === 'All Districts') {
    return DAILY_HEALTH_INSIGHTS;
  }

  const matching = DAILY_HEALTH_INSIGHTS.filter(d => 
    d.district.toLowerCase().includes(districtName.toLowerCase()) || 
    districtName.toLowerCase().includes(d.district.toLowerCase())
  );

  const national = DAILY_HEALTH_INSIGHTS.filter(d => d.districtScope === 'national');
  const others = DAILY_HEALTH_INSIGHTS.filter(d => !matching.includes(d) && !national.includes(d));

  return [...matching, ...national, ...others];
}

export function getDefaultDailyInsight(): DailyHealthInsight {
  return DAILY_HEALTH_INSIGHTS[0];
}
