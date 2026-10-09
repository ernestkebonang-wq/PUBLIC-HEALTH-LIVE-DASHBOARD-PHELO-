import { LifestyleAdjustment, RegionalIntelligenceProfile } from '../types';

export const REGIONAL_INTELLIGENCE_PROFILES: Record<string, RegionalIntelligenceProfile> = {
  'Ngamiland (Maun)': {
    district: 'Ngamiland (Maun)',
    surveillanceSummary: {
      primarySyndrome: 'acute_watery_diarrhoea',
      primarySyndromeName: 'Acute Watery Diarrhoea (Paediatric)',
      deltaPercent: 85.7,
      surveillanceStatus: 'dhmt_flagged',
      sevenDayVolume: 78,
      expectedBaseline: 42,
      activeInvestigationLead: 'Dr. T. Sebina (Ngamiland DHMT)',
      environmentalFactorEn: 'Seasonal river level fluctuation along Thamalakane river corridor & communal bowser storage',
      environmentalFactorTn: 'Phetogo ya metsi a noka ya Thamalakane le polokelo ya metsi a ditanka tsa setshaba'
    },
    lifestyleAdjustments: [
      {
        id: 'ngam-adj-boil-store',
        category: 'hydration_water',
        title: {
          en: 'Morning Rolling Boil & Narrow-Neck Storage Routine',
          tn: 'Go Bedisa Metsi Mosong le go a Boloka Sentle',
          kck: 'Kubidisa Mvura Mangwanani ne ku i Viga Zvakanaka'
        },
        lifestyleAction: {
          en: 'Boil all household drinking water for at least 3 continuous minutes each morning. Store cooled water in narrow-neck containers with tight caps to prevent cups or hands touching the water.',
          tn: 'Bedisa metsi otlhe a go nwa metsotso e le 3 e tuka mosong mongwe le mongwe. A tshele mo ditshelaneng tse di nang le melomo e e sesane e e nang le ditswalo tse di tiileng.'
        },
        surveillanceRationale: {
          en: 'Bacteriological testing along Thamalakane river settlements detected coliform contamination in wide-mouth buckets dipped into by multiple family members.',
          tn: 'Diteko tsa metsi mo Maun di bontshitse gore dibaketeria di ata fa batho ba ina dikopi mo dikaneng tse di bulegileng.'
        },
        difficulty: 'easy',
        timeOfDay: 'morning',
        impactLevel: 'high',
        settlementScope: 'Boseja, Matlapana, Disaneng, Shorobe'
      },
      {
        id: 'ngam-adj-wash-prep',
        category: 'home_environment',
        title: {
          en: 'Food Prep Hand-Washing Station at Homestead Entrance',
          tn: 'Selo sa go Tlhapa Diatla fa Kgorong ya Lelwapa',
          kck: 'Tjiwoko tjo Shambila Maboko Kwo Npfula'
        },
        lifestyleAction: {
          en: 'Hang a simple 5-litre plastic water bottle with a small nail puncture (tippy-tap) and soap near the outdoor cooking area and toilet for mandatory hand-washing before food handling.',
          tn: 'Bofelela tlhobolo ya metsi ya polasetiki le molora gaufi le fa lo apeelang gone le fa matlwaneng gore mongwe le mongwe a tlhape diatla pele a tshwara dijo.'
        },
        surveillanceRationale: {
          en: 'Surveillance data shows household contact transmission is responsible for 62% of secondary paediatric diarrhoea cases in informal settlements.',
          tn: 'Tshedimosetso e bontsha gore bana ba le bantsi ba tsaya letshololo mo bathong ba lelwapa ba ba sa tlhapang diatla pele ba ba fepa.'
        },
        difficulty: 'easy',
        timeOfDay: 'all_day',
        impactLevel: 'high',
        settlementScope: 'Maun urban & riverside wards'
      },
      {
        id: 'ngam-adj-sorghum-porridge',
        category: 'nutrition_diet',
        title: {
          en: 'Gut-Soothing Traditional Sorghum Feeding (Motogo)',
          tn: 'Go Fepa Bana Motogo o o Rulagantsweng Sentle',
          kck: 'Kupa Bana Buswa gwe Mabele buno Zorodza Mpa'
        },
        lifestyleAction: {
          en: 'Prepare soft, warm sorghum porridge (motogo) with a pinch of salt for children under 5. Avoid processed sugary juices or heavily salted chips which pull water into the intestines.',
          tn: 'Apeela bana ba ba botlana motogo o o motlhofo o o nang le letswainyana le lennye. Efoga dino tse di tsididi tse di nang le sukiri e ntsi tse di rotletsang go felelwa ke metsi.'
        },
        surveillanceRationale: {
          en: 'Sorghum provides easily digestible complex carbohydrates and potassium that help line the gut mucosa during acute diarrhoeal recovery.',
          tn: 'Mabele a thusa teng ya ngwana go nna le maatla a bo a thibele mpa go thunya le go latlhegelwa ke dikotla.'
        },
        difficulty: 'easy',
        timeOfDay: 'morning',
        impactLevel: 'medium',
        settlementScope: 'All Ngamiland households'
      },
      {
        id: 'ngam-adj-water-bottles',
        category: 'family_childcare',
        title: {
          en: 'Dedicated Child School Water Flasks (Zero Cup Sharing)',
          tn: 'Sekotlele sa Ngwana sa Metsi kwa Sekolong',
          kck: 'Bhodhoro le Mvura ye Ngwana ku Chikolo'
        },
        lifestyleAction: {
          en: 'Send every preschooler and primary school child with their own marked 750ml water flask. Teach them not to drink directly from communal taps or share cups with classmates.',
          tn: 'Romela ngwana mongwe le mongwe sekolong ka botlolo ya gagwe ya metsi e e kwadilweng leina. Mo rute go se nwe metsi ka molomo mo dipompong tsa setshaba.'
        },
        surveillanceRationale: {
          en: 'School-age daycares in Boseja showed cross-infection clusters originating from communal water dippers.',
          tn: 'Dikolo tsa bana ba ba potlana mo Maun di lemogile go tsenana ga letshololo ka go nwa metsi ka kopi e le nngwe.'
        },
        difficulty: 'easy',
        timeOfDay: 'morning',
        impactLevel: 'high',
        settlementScope: 'Maun primary schools & daycares'
      }
    ]
  },
  'Chobe (Kasane)': {
    district: 'Chobe (Kasane)',
    surveillanceSummary: {
      primarySyndrome: 'suspected_malaria',
      primarySyndromeName: 'Febrile Illness / Suspected Vector-Borne',
      deltaPercent: 72.2,
      surveillanceStatus: 'investigating',
      sevenDayVolume: 31,
      expectedBaseline: 18,
      activeInvestigationLead: 'Public Health Officer B. Nthoiwa (Chobe Directorate)',
      environmentalFactorEn: 'Post-winter humidity rise & early breeding in riverine reeds along Chobe National Park boundary',
      environmentalFactorTn: 'Mogote o o tlhatlogang le matsha a noka ya Chobe le diphologolo'
    },
    lifestyleAdjustments: [
      {
        id: 'chobe-adj-dusk-clothing',
        category: 'outdoor_exposure',
        title: {
          en: 'Dusk Outdoor Activity Shift & Long-Sleeve Habit',
          tn: 'Phetogo ya go Nna kwa Ntle Maitseboa le Diaparo',
          kck: 'Kupfuka Mabhurugwe le Majasi Maitseboa'
        },
        lifestyleAction: {
          en: 'Move outdoor family gatherings indoors by 17:45. If remaining outdoors around the courtyard or kgotla, wear light-coloured, loose-fitting long trousers and long-sleeved shirts.',
          tn: 'Tsenang mo malwapeng ka 17:45 maitseboa pele monang o simolola go loma. Fa lo santse lo le kwa ntle, aparang borokgwe le baki tse di tswalang matsogo le maoto.'
        },
        surveillanceRationale: {
          en: 'Anopheles mosquito biting activity in Chobe peaks precisely between 18:00 and 21:00 in outdoor domestic courtyards.',
          tn: 'Monang wa malaria mo Kasane o loma thata magareng ga 18:00 le 21:00 fa batho ba phuthagane mo kgotleng kgotsa mo lelwapeng.'
        },
        difficulty: 'easy',
        timeOfDay: 'evening',
        impactLevel: 'high',
        settlementScope: 'Kasane, Kazungula, Lesoma, Pandamatenga'
      },
      {
        id: 'chobe-adj-bednet-tuck',
        category: 'sleep_rest',
        title: {
          en: 'Nightly 30-Minute Bednet Perimeter Check & Tuck',
          tn: 'Go Tlhola le go Bofa Net ya Monang Bosigo',
          kck: 'Ku Tjeka Net ye Nanga Zvakanaka Bosigo'
        },
        lifestyleAction: {
          en: 'Inspect insecticide-treated bednets for tiny tears 30 minutes before sleep. Ensure all 4 corners are tucked deeply underneath the mattress with zero sagging gaps.',
          tn: 'Sekaseka nete ya gago ya monang pele ga lo robala go bona gore ga e na maroba. Tsenya matlhakore otlhe ka fa tlase ga materase sentle.'
        },
        surveillanceRationale: {
          en: 'Entomological survey in Kazungula found 41% of household nets were hung loosely without mattress tucking, permitting mosquito ingress.',
          tn: 'Dipatlisiso tsa Chobe di fitlhetse gore bontsi jwa batho ba tsenwa ke monang ka gonne matlhakore a nete a sa tsenngwa sentle mo tlase ga bolao.'
        },
        difficulty: 'easy',
        timeOfDay: 'evening',
        impactLevel: 'high',
        settlementScope: 'Chobe riparian communities'
      },
      {
        id: 'chobe-adj-yard-drainage',
        category: 'home_environment',
        title: {
          en: 'Weekly 15-Minute Yard Water Evacuation Walk',
          tn: 'Go Tsholola Metsi a a Emeng mo Lwapaneng',
          kck: 'Ku Rasa Mvura Yakamira mu Lwapa'
        },
        lifestyleAction: {
          en: 'Every Saturday morning, walk the boundary of your yard: invert empty paint tins, flowerpot trays, old tyres, and clear livestock drinking troughs to dry before refilling.',
          tn: 'Mokibelo mongwe le mongwe mo mosong, tsamaya mo jarateng o menole dithini, dithaere le dijelo tsa dikoko gore metsi a se ka a ema a tsalisa menang.'
        },
        surveillanceRationale: {
          en: 'Domestic artificial water containers account for 78% of vector larval breeding habitats within residential Kasane wards.',
          tn: 'Dithini le masalela a metsi mo malwapeng a baka 78% ya matsetse a monang mo Kasane.'
        },
        difficulty: 'easy',
        timeOfDay: 'morning',
        impactLevel: 'medium',
        settlementScope: 'Kazungula and Kasane residential plots'
      }
    ]
  },
  'Gaborone': {
    district: 'Gaborone',
    surveillanceSummary: {
      primarySyndrome: 'acute_respiratory',
      primarySyndromeName: 'Acute Respiratory Illness (ARI)',
      deltaPercent: 29.1,
      surveillanceStatus: 'monitoring',
      sevenDayVolume: 142,
      expectedBaseline: 110,
      activeInvestigationLead: 'Gaborone DHMT Public Health Team',
      environmentalFactorEn: 'Spring high winds, fine Kalahari sand dust drift, and indoor heater-to-draft thermal shifts',
      environmentalFactorTn: 'Phefo le lerole la dikgakologo le phetogo ya mogote le serame'
    },
    lifestyleAdjustments: [
      {
        id: 'gab-adj-damp-dust',
        category: 'home_environment',
        title: {
          en: 'Damp-Cloth Wiping Over Dry Broom Sweeping',
          tn: 'Go Phimola ka Lesela le le Metsi Boemong jwa go Fiela Lerole',
          kck: 'Ku Phumula ne Jira Rinemvura Kusina ku Pswaira'
        },
        lifestyleAction: {
          en: 'Wipe window sills, tile floors, and bedroom surfaces with a damp cloth instead of dry sweeping, which sends fine spring dust particles into household air.',
          tn: 'Phimola difensetere le boalo ka lesela le le metsi boemong jwa go fiela ka lofielo le le omileng le le kgotlhang lerole mo moweng.'
        },
        surveillanceRationale: {
          en: 'Inhaled fine particulate dust irritates the tracheobronchial tree, doubling vulnerability to viral respiratory droplet infection.',
          tn: 'Lerole le le borai le tsena mo dikgofong mme le baka gore mofikela o tsenwe ke batho ka bofefo.'
        },
        difficulty: 'easy',
        timeOfDay: 'morning',
        impactLevel: 'medium',
        settlementScope: 'Gaborone urban wards & extensions'
      },
      {
        id: 'gab-adj-warm-steam',
        category: 'nutrition_diet',
        title: {
          en: 'Morning Lemon, Ginger & Natural Honey Warm Hydration',
          tn: 'Metsi a a Borutho a Lemone, Tsinzha le Tswina ya Dinotshe',
          kck: 'Mvura Inodziya ye Lemoni ne Ginger Mangwanani'
        },
        lifestyleAction: {
          en: 'Start mornings with warm water infused with fresh lemon, crushed ginger, and natural honey (for household members over 1 year of age) to soothe dry upper airways.',
          tn: 'Nwang metsi a a borutho a a nang le lemone, tsinzha le tswina ya dinotshe mo mosong go thibela sehuba le go thoba mometso o o botlhoko.'
        },
        surveillanceRationale: {
          en: 'Osmotic properties of honey soothe the pharyngeal mucosa and reduce dry nocturnal cough frequency by up to 40% in clinical trials.',
          tn: 'Tswina ya dinotshe e ritibatsa mometso e bo e thibele kgotlholo ya bosigo e e lapisang.'
        },
        difficulty: 'easy',
        timeOfDay: 'morning',
        impactLevel: 'medium',
        settlementScope: 'Gaborone, Mogoditshane, Tlokweng'
      },
      {
        id: 'gab-adj-cross-ventilation',
        category: 'home_environment',
        title: {
          en: 'Midday 45-Minute Cross-Ventilation Window Flush',
          tn: 'Go Bula Difensetere Metsotso e le 45 Motshegare',
          kck: 'Ku Vula Mafafitera Motshegare Kuti Mphepo Ipinde'
        },
        lifestyleAction: {
          en: 'Open opposite windows between 12:00 and 13:30 when ambient temperatures are warmest to flush stagnant viral air pockets without cooling the house.',
          tn: 'Bula difensetere tse di lebaneng magareng ga 12:00 le 13:30 fa letsatsi le le borutho go tsenya phefo e ntjha le go ntsha ditoroko tse di mo ntlong.'
        },
        surveillanceRationale: {
          en: 'Closed rooms retain infectious aerosols up to 3 hours; 45 minutes of cross-draft reduces indoor viral density by over 80%.',
          tn: 'Diphaphosi tse di tswetsweng di boloka ditoroko tsa mofikela; go tsenya phefo go fokotsa borai jwa go tsenana mo lwapeng.'
        },
        difficulty: 'easy',
        timeOfDay: 'midday',
        impactLevel: 'high',
        settlementScope: 'All residential housing'
      }
    ]
  },
  'Kgalagadi (Tsabong)': {
    district: 'Kgalagadi (Tsabong)',
    surveillanceSummary: {
      primarySyndrome: 'febrile_illness',
      primarySyndromeName: 'Heat Stress & Arid Dehydration Signals',
      deltaPercent: 44.0,
      surveillanceStatus: 'monitoring',
      sevenDayVolume: 41,
      expectedBaseline: 28,
      activeInvestigationLead: 'Tsabong Primary Hospital Clinical Desk',
      environmentalFactorEn: 'Sub-Saharan desert spring heatwaves surpassing 37°C with under 15% relative humidity',
      environmentalFactorTn: 'Mogote o o feteletseng wa sekaka o o fetang 37°C le phefo e e omileng'
    },
    lifestyleAdjustments: [
      {
        id: 'kga-adj-early-fieldwork',
        category: 'outdoor_exposure',
        title: {
          en: 'Dawn-Shift Agricultural & Cattlepost Labour Schedule',
          tn: 'Go Simolola Tiro ya Moraka le Tshimo Esale Ka Masa',
          kck: 'Ku Shinga Mashangwe Mangwanani-ngwanani'
        },
        lifestyleAction: {
          en: 'Complete all physical field, cattle-herding, or construction work between 05:30 and 10:30. Cease heavy manual labour completely during the extreme heat window of 11:30 to 15:30.',
          tn: 'Fetsang ditiro tsotlhe tsa go disa, go lema kgotsa go aga magareng ga 05:30 le 10:30 mo mosong. Emisang ditiro tse di boima ka nako ya mogote wa 11:30 go ya go 15:30.'
        },
        surveillanceRationale: {
          en: 'Outpatient heat syncope presentations peak in the late afternoon among farmworkers exposed to solar zenith radiation.',
          tn: 'Batho ba bantsi ba idibala kgotsa ba tsenwa ke mogote fa ba bereka mo letsatsing le le tlhabang motshegare.'
        },
        difficulty: 'moderate',
        timeOfDay: 'morning',
        impactLevel: 'high',
        settlementScope: 'Tsabong, Hukuntsi, Werda, Bokspits'
      },
      {
        id: 'kga-adj-hydration-cadence',
        category: 'hydration_water',
        title: {
          en: 'Hourly 250ml Water Rule (Drink Before Thirst)',
          tn: 'Molao wa go Nwa Kopi ya Metsi Houra Nngwe le Nngwe',
          kck: 'Kunwa Mvura Oga-oga Kusina ku Lira Lenyora'
        },
        lifestyleAction: {
          en: 'Carry a designated 3-litre insulated thermos or wrapped canteen whenever travelling or working. Sip 250ml (one mug) every 45 to 60 minutes, even if you do not feel thirsty.',
          tn: 'Tshola botlolo e kgolo ya metsi ya dilithara tse 3 nako le nako fa o tsamaya. Nwa kopi e le nngwe ya metsi houra nngwe le nngwe o sa emele go utlwa lenyora.'
        },
        surveillanceRationale: {
          en: 'Thirst sensation lags behind actual cellular fluid deficit by 1.5 litres in arid low-humidity desert climates.',
          tn: 'Mo sekakeng, motho o ikutlwa a na le lenyora morago ga gore mmele o setse o latlhegetswe ke metsi a mantsi.'
        },
        difficulty: 'easy',
        timeOfDay: 'all_day',
        impactLevel: 'high',
        settlementScope: 'All Kgalagadi settlements'
      },
      {
        id: 'kga-adj-elder-shade-check',
        category: 'family_childcare',
        title: {
          en: 'Midday Check-In on Elderly Relatives & Zinc-Roof Homes',
          tn: 'Go Tlhola Batsofe le Matlo a Masenke Motshegare',
          kck: 'Ku Tjeka Bakwegulu ne Bakegulu Masikati'
        },
        lifestyleAction: {
          en: 'Check on elderly relatives living in single-room corrugated iron houses at 13:00. Encourage them to sit under broad acacia shade trees with natural cross-breezes rather than indoors.',
          tn: 'Etela batsofe ba ba nnang mo matlong a masenke ka 13:00 motshegare. Ba kope go nna mo moriting wa setlhare kwa phefo e tsenang gone boemong jwa go nna mo ntlong e e fisang.'
        },
        surveillanceRationale: {
          en: 'Uninsulated zinc roofs can elevate indoor ambient temperature to 44°C, precipitating silent cardiovascular stress in seniors.',
          tn: 'Masenke a a se nang siling a gotela go fitlha mo go 44°C, se se ka bakelang pelo ya motsofe mathata a magolo.'
        },
        difficulty: 'easy',
        timeOfDay: 'midday',
        impactLevel: 'high',
        settlementScope: 'Tsabong & surrounding villages'
      }
    ]
  },
  'Kweneng (Molepolole)': {
    district: 'Kweneng (Molepolole)',
    surveillanceSummary: {
      primarySyndrome: 'maternal_alert',
      primarySyndromeName: 'Maternal Vitality & Antenatal Registration',
      deltaPercent: -13.6,
      surveillanceStatus: 'normal',
      sevenDayVolume: 19,
      expectedBaseline: 22,
      activeInvestigationLead: 'Kweneng DHMT Maternal Health Coordinator',
      environmentalFactorEn: 'Improved mobile clinic coverage in western Kweneng settlements supporting maternal wellness',
      environmentalFactorTn: 'Ditleliniki tse di tsamayang di tokafatsa tlhokomelo ya bomme le masea'
    },
    lifestyleAdjustments: [
      {
        id: 'kwe-adj-iron-routine',
        category: 'nutrition_diet',
        title: {
          en: 'Morning Iron Tablet with Citrus (Never Tea or Milk)',
          tn: 'Go Nwa Dipilisi tsa Tshipi le Dinamune (E Seng Tee)',
          kck: 'Kunwa Dipilisi dze Iron ne Lamuna'
        },
        lifestyleAction: {
          en: 'Take your clinic-provided iron and folic acid tablet with an orange or glass of water with lemon. Never swallow it with black tea, rooibos, or milk, which block iron absorption.',
          tn: 'Nwa dipilisi tsa gago tsa tshipi (Iron) ka lero la namune kgotsa metsi a lemone. O se ka wa di nwa ka tee e ntsho kgotsa mashi a a thibelang tshipi go bereka mo mmeleng.'
        },
        surveillanceRationale: {
          en: 'Tannins in tea reduce non-heme iron absorption by up to 60%, contributing to persistent gestational anaemia.',
          tn: 'Ditee tse di bogale di thibela mmele go amogela tshipi e e nonotshang madi a mme le lesea.'
        },
        difficulty: 'easy',
        timeOfDay: 'morning',
        impactLevel: 'high',
        settlementScope: 'Molepolole, Thamaga, Letlhakeng'
      },
      {
        id: 'kwe-adj-left-side-rest',
        category: 'sleep_rest',
        title: {
          en: 'Left-Lateral Afternoon 30-Minute Rest Routine',
          tn: 'Go Itapolosa ka Lotlhakore la Molema Motshegare',
          kck: 'Ku Zolola ne Lotlhakore gwe Ntswa Masikati'
        },
        lifestyleAction: {
          en: 'Lie on your left side with a pillow between your knees for 30 minutes in the afternoon to take pressure off the inferior vena cava and enhance blood flow to the placenta.',
          tn: 'Robala ka lotlhakore la molema o tsentse mosamo fa gare ga mangole metsotso e le 30 motshegare go tokafatsa phepafalo ya madi a a yang kwa ngwaneng.'
        },
        surveillanceRationale: {
          en: 'Relieving vena cava compression reduces lower limb oedema and stabilizes maternal blood pressure in the 2nd and 3rd trimesters.',
          tn: 'Go robala ka lotlhakore la molema go thibela maoto go ruruha go bo go ritibatse madi a matona.'
        },
        difficulty: 'easy',
        timeOfDay: 'midday',
        impactLevel: 'medium',
        settlementScope: 'All expectant mothers in Kweneng'
      }
    ]
  },
  'Central (Serowe / Palapye)': {
    district: 'Central (Serowe / Palapye)',
    surveillanceSummary: {
      primarySyndrome: 'febrile_illness',
      primarySyndromeName: 'Unspecified Febrile & Industrial Fatigue Signals',
      deltaPercent: 16.4,
      surveillanceStatus: 'monitoring',
      sevenDayVolume: 64,
      expectedBaseline: 55,
      activeInvestigationLead: 'Central DHMT Surveillance Officers',
      environmentalFactorEn: 'Expanding industrial/mining transit in Palapye corridors and thermal shifts',
      environmentalFactorTn: 'Mesepele ya ditiro tsa meepo le madirelo mo Palapye le Serowe'
    },
    lifestyleAdjustments: [
      {
        id: 'cen-adj-hydration-transit',
        category: 'hydration_water',
        title: {
          en: 'Commuter & Industrial Shift Hydration Pacing',
          tn: 'Go Nwa Metsi fa o Bereka mo Madirelong le Mesepele',
          kck: 'Kunwa Mvura ku Misho ne ku Mesepele'
        },
        lifestyleAction: {
          en: 'Miners, power plant, and transit workers should drink 500ml of water before entering industrial shifts, avoiding energy drinks loaded with excessive caffeine.',
          tn: 'Badiri ba meepo le dipalamo ba tshwanetse go nwa metsi a a lekaneng pele ga tiro, ba efoge dino tsa ditsididi tse di nang le caffeine e ntsi e e feletsang mmele metsi.'
        },
        surveillanceRationale: {
          en: 'High caffeine intake coupled with industrial microclimate heat exacerbates subclinical dehydration and transient febrile exhaustion.',
          tn: 'Caffeine e ntsi fa go fisa e baka gore motho a latlhegelwe ke metsi ka bofefo a bo a lwale ke letsapa.'
        },
        difficulty: 'easy',
        timeOfDay: 'morning',
        impactLevel: 'medium',
        settlementScope: 'Palapye industrial corridor, Serowe, Mahalapye'
      },
      {
        id: 'cen-adj-food-cover',
        category: 'home_environment',
        title: {
          en: 'Mesh Food Tents for Cooked Meals & Outdoor Braais',
          tn: 'Go Bipa Dijo ka Matloa go Thibela Dintsi',
          kck: 'Ku Bipa Zwidyo ne Neti kuti Nzi Dzisagala'
        },
        lifestyleAction: {
          en: 'Keep all cooked meats, beans, and pap covered with fine mesh food tents immediately after serving to prevent flies from transmitting enteric bacteria.',
          tn: 'Bipa nama, dinawa le bogobe ka matloa a a phepa ka bonako morago ga go ja go thibela dintsi go kgotlhela dijo.'
        },
        surveillanceRationale: {
          en: 'Fly-borne transfer of Shigella and Salmonella peaks during warm spring outdoor braais and family gatherings.',
          tn: 'Dintsi di rwala malwetse a mpa fa di dula mo dijong tse di sa bipewang mo letsatsing.'
        },
        difficulty: 'easy',
        timeOfDay: 'all_day',
        impactLevel: 'high',
        settlementScope: 'All Central district villages'
      }
    ]
  },
  'All Districts': {
    district: 'All Districts (National Botswana)',
    surveillanceSummary: {
      primarySyndrome: 'chronic_ncd_vigilance',
      primarySyndromeName: 'National Non-Communicable Diseases & General Wellness',
      deltaPercent: 5.2,
      surveillanceStatus: 'normal',
      sevenDayVolume: 420,
      expectedBaseline: 400,
      activeInvestigationLead: 'Ministry of Health Primary Healthcare Directorate',
      environmentalFactorEn: 'Country-wide spring seasonal transition, dry winds and lifestyle non-communicable risk factors',
      environmentalFactorTn: 'Phetogo ya dikgakologo mo Botswana le thibelo ya malwetse a a sa tshelanweng'
    },
    lifestyleAdjustments: [
      {
        id: 'nat-adj-salt-reduction',
        category: 'nutrition_diet',
        title: {
          en: 'The "No Table Salt Shaker" Household Rule',
          tn: 'Molao wa go Se Nne le Letswai mo Tafoleng',
          kck: 'Kusina Munyu pa Tafura ku Nba'
        },
        lifestyleAction: {
          en: 'Remove the salt shaker and seasoned stock cubes from the dining table. Flavour dishes using fresh garlic, wild sage (morogo wa thepe), ginger, lemon zest, and ground black pepper.',
          tn: 'Tlosang sejelo sa letswai le ditlhare tsa go apaya (stock cubes) mo tafoleng. Natesang dijo ka konofolo, morogo wa thepe, tsinzha le lemone.'
        },
        surveillanceRationale: {
          en: 'Reducing sodium intake by 2g daily lowers systolic blood pressure by 5 to 7 mmHg across African adult population cohorts.',
          tn: 'Go fokotsa letswai go fologisa madi a matona mo mmeleng go bo go sireletse pelo le diphilo.'
        },
        difficulty: 'easy',
        timeOfDay: 'all_day',
        impactLevel: 'high',
        settlementScope: 'Nationwide'
      },
      {
        id: 'nat-adj-evening-walk',
        category: 'outdoor_exposure',
        title: {
          en: 'Sunset 25-Minute Neighborhood Stride Habit',
          tn: 'Go Tsamaya Metsotso e le 25 Maitseboa le Baagisani',
          kck: 'Ku Famba Masikati ne Bakanyi Metsotso 25'
        },
        lifestyleAction: {
          en: 'Take a brisk 25-minute walk around your ward or yard after dinner with family or neighbours, stepping at a conversational pace where you can talk but not sing.',
          tn: 'Tsamayang metsotso e le 25 maitseboa morago ga dijo le baagisani kgotsa ba lelwapa ka bonako jo bo kgotlhang mmele sentle.'
        },
        surveillanceRationale: {
          en: 'Post-prandial ambulation enhances glucose uptake into skeletal muscles without insulin spikes, reducing type 2 diabetes incidence.',
          tn: 'Go tsamaya morago ga dijo go thusa mmele go laola sukiri sentle go bo go thibela bolwetse jwa sukiri.'
        },
        difficulty: 'easy',
        timeOfDay: 'evening',
        impactLevel: 'high',
        settlementScope: 'Nationwide'
      }
    ]
  }
};

export function getRegionalProfile(districtName: string): RegionalIntelligenceProfile {
  if (!districtName || districtName === 'All' || districtName === 'All Districts') {
    return REGIONAL_INTELLIGENCE_PROFILES['All Districts'];
  }

  // Exact match
  if (REGIONAL_INTELLIGENCE_PROFILES[districtName]) {
    return REGIONAL_INTELLIGENCE_PROFILES[districtName];
  }

  // Partial match
  const key = Object.keys(REGIONAL_INTELLIGENCE_PROFILES).find(k => 
    k.toLowerCase().includes(districtName.toLowerCase()) || 
    districtName.toLowerCase().includes(k.toLowerCase())
  );

  return key ? REGIONAL_INTELLIGENCE_PROFILES[key] : REGIONAL_INTELLIGENCE_PROFILES['All Districts'];
}
