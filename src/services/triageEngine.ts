import { TriageInput, TriageResult, UrgencyLevel, CareRouteType } from '../types';
import { BOTSWANA_HEALTH_LANGUAGE_MAPPINGS } from '../data/languages';
import { GoogleGenAI } from '@google/genai';

/**
 * Normalizes input text using the Botswana Health Language Layer
 */
export function extractLocalHealthConcepts(text: string): string[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const detectedConcepts: string[] = [];

  for (const mapping of BOTSWANA_HEALTH_LANGUAGE_MAPPINGS) {
    if (lower.includes(mapping.local) || lower.includes(mapping.en.toLowerCase())) {
      detectedConcepts.push(mapping.concept);
    }
  }

  return Array.from(new Set(detectedConcepts));
}

/**
 * Clinically validated triage assessment engine adhering to Botswana IMCI and Primary Care Triage guidelines
 */
export function assessTriage(input: TriageInput): TriageResult {
  const detectedConcepts = extractLocalHealthConcepts(input.naturalTextDescription);
  const dangerSigns = input.checkedDangerSigns || [];
  const symptoms = input.selectedSymptomIds || [];

  // Check critical emergency flags
  const isEmergency = 
    dangerSigns.includes('unconscious_lethargic') ||
    dangerSigns.includes('convulsions') ||
    dangerSigns.includes('fast_breathing_stridor') ||
    dangerSigns.includes('severe_blood_loss') ||
    dangerSigns.includes('cannot_drink') ||
    symptoms.includes('breathing_difficulty') ||
    symptoms.includes('chest_pain') ||
    symptoms.includes('maternal_bleeding') ||
    symptoms.includes('drowsiness_confusion') ||
    detectedConcepts.includes('syncope') ||
    detectedConcepts.includes('hemorrhage') ||
    detectedConcepts.includes('convulsions');

  if (isEmergency) {
    return {
      id: `triage-${Date.now()}`,
      timestamp: new Date().toISOString(),
      urgencyLevel: 'EMERGENCY',
      careRoute: 'emergency_facility',
      primarySyndrome: symptoms.includes('maternal_bleeding') 
        ? 'Obstetric / Maternal Emergency' 
        : symptoms.includes('chest_pain') 
        ? 'Acute Chest / Cardiovascular Distress' 
        : 'Critical Life-Threatening Presentation',
      summaryTitle: {
        en: 'Immediate Emergency Care Needed',
        tn: 'Thuso ya Potlako e e Tlhokegang Jaanong Jaana',
      },
      clinicalRationale: {
        en: 'Red-flag clinical danger signs were identified (such as severe breathing difficulty, active haemorrhage, convulsions, or loss of responsiveness). Delaying care carries acute clinical risk.',
        tn: 'Go lemogilwe matshwao a kotsi e kgolo ya botsogo (jaaka go hema ka bothata, madi a a dutlang thata, kgotsa go idibala). Go diega go ka baya botshelo mo kotsing e kgolo.',
      },
      recommendedActions: {
        en: [
          'Call 997 for an ambulance or proceed immediately to the nearest 24-hour Hospital Emergency Department.',
          'Do not attempt to give oral fluids or solid food if the person is struggling to breathe, convulsing, or drowsy.',
          'Keep the patient sitting upright if short of breath, or on their side (recovery position) if drowsy but breathing.',
          'Bring any ongoing medications, national ID, or Antenatal/Child Health Cards.',
        ],
        tn: [
          'Leletsa 997 go kopa ambulense kgotsa ya ka bonako kwa Kokelong e e nang le ditiro tsa potlako tsa dioura tse 24.',
          'O se ka wa nosedisa kgotsa go fepa molwetsi fa a palelwa ke go hema kgotsa a thulametse.',
          'Dudisa molwetsi fa a sa heme sentle, kgotsa mo latse ka lotlhakore fa a thulametse mme a hema.',
          'Tsaya dipilisi tsa gagwe le Bukana ya Ngwana kgotsa ya Boimana fa go le maleba.',
        ],
      },
      redFlagsToWatch: {
        en: [
          'Loss of consciousness or unresponsiveness',
          'Blue discoloration around the lips or fingers (cyanosis)',
          'Continuous seizure activity lasting longer than 3 minutes',
        ],
        tn: [
          'Go idibala kgotsa go tlhoka go arabela',
          'Melomo kgotsa menwana e e fetogang botala (cyanosis)',
          'Go roroma mo go fetang metsotso e le 3 go sa kgaotse',
        ],
      },
      suggestedFacilityTypes: ['referral_hospital', 'district_hospital', 'clinic_24h'],
      anonymousSignalContributed: false,
    };
  }

  // Check Urgent Level
  const isPaediatricHighRisk = (input.ageBand === 'infant_under_1' || input.ageBand === 'child_1_5') && 
    (symptoms.includes('fever') || symptoms.includes('diarrhoea') || symptoms.includes('vomiting'));

  const isMalariaRiskDistrict = input.district.includes('Ngamiland') || input.district.includes('Chobe');
  const isSuspectedMalariaFever = isMalariaRiskDistrict && symptoms.includes('fever');

  const isUrgent = 
    isPaediatricHighRisk ||
    isSuspectedMalariaFever ||
    dangerSigns.includes('vomiting_everything') ||
    symptoms.includes('stiff_neck') ||
    (symptoms.includes('diarrhoea') && symptoms.includes('vomiting')) ||
    (input.isPregnant && symptoms.includes('severe_headache')) ||
    (input.duration === 'more_than_week' && symptoms.includes('fever'));

  if (isUrgent) {
    return {
      id: `triage-${Date.now()}`,
      timestamp: new Date().toISOString(),
      urgencyLevel: 'URGENT',
      careRoute: 'urgent_clinic_24h',
      primarySyndrome: isSuspectedMalariaFever 
        ? 'Febrile Illness (Endemic Malaria Assessment Required)'
        : isPaediatricHighRisk 
        ? 'Paediatric Gastroenteritis / Febrile Episode (IMCI Protocol)' 
        : 'Acute Urgent Clinical Presentation',
      summaryTitle: {
        en: 'Same-Day Urgent Care Recommended (Within 2–4 Hours)',
        tn: 'O Tshwanetse go Bonwa ke Ngaka/Mooki Tsatsi Leno (Mo Dioureng tse 2–4)',
      },
      clinicalRationale: {
        en: isSuspectedMalariaFever
          ? 'Fever reported in a malaria-endemic district requires immediate rapid blood testing (mRDT) at the clinic today to rule out complicated malaria.'
          : isPaediatricHighRisk
          ? 'Young children with fever or gastrointestinal fluid loss require prompt professional clinical assessment to prevent rapid dehydration.'
          : 'Your symptoms indicate an acute condition that requires same-day medical evaluation at a clinic or outpatient department.',
        tn: isSuspectedMalariaFever
          ? 'Letshoroma mo kgaolong e e nang le malaria le tlhoka tlhatlhobo ya madi ya mRDT kwa kokelong gompieno go itsa kotsi.'
          : isPaediatricHighRisk
          ? 'Bana ba ba botlana ba ba nang le letshoroma kgotsa letshololo ba tlhoka go bonwa ke mooki ka pele go thibela go fela ga metsi mo mmeleng.'
          : 'Matshwao a gago a supa gore o tlhoka go tlhatlhobiwa ke mooki tsatsi leno pele letsatsi le phirima.',
      },
      recommendedActions: {
        en: [
          'Visit your nearest 24-hour Clinic or District Hospital Outpatient Department today.',
          'If vomiting or having watery diarrhoea: start taking small frequent sips of Oral Rehydration Salts (ORS).',
          'If traveling with a child, bring their Child Health Card (Road to Health Card).',
          'Do not take leftover antibiotics before the clinic healthcare worker has examined you.',
        ],
        tn: [
          'Etela Tleliniki ya dioura tse 24 kgotsa Kokelo ya Kgaolo tsatsi leno.',
          'Fa o tlhatsa kgotsa o tshololwa: simolola go nwa motswako wa sukiri le letswai (ORS) ka ditswana gantsi.',
          'Tshola Bukana ya Ngwana (Road to Health Card) fa o tsamaya le ngwana.',
          'O se ka wa nwa dipilisi tsa maloba tsa antibiotic pele ga mooki a go tlhatlhoba.',
        ],
      },
      homeCareGuidance: {
        en: [
          'Prepare 1 litre of clean water with 6 teaspoons of sugar and 1/2 teaspoon of salt.',
          'Keep drinking clean water, rooibos tea, or light broth.',
          'Dress in light clothing to help regulate body temperature.',
        ],
        tn: [
          'Baakanya lithara e le 1 ya metsi a a bedisitsweng a na le ditshwana tse 6 tsa sukiri le 1/2 ya letswai.',
          'Tswelela o nwa metsi a a phepa kgotsa motogo o o motlhofo.',
          'Apara diaparo tse di motlhofo go laola themperetjha ya mmele.',
        ],
      },
      redFlagsToWatch: {
        en: [
          'Inability to hold down any fluids for more than 4 hours',
          'Sudden confusion or extreme drowsiness',
          'Stiff neck or new unexplained rash',
        ],
        tn: [
          'Go palelwa ke go nwa metsi dioura tse 4 di sa tsweng',
          'Go thulamela thata kgotsa go tlhakatlhakana maikutlo',
          'Thamo e e thatafetseng kgotsa matlalo a a tswang dintho',
        ],
      },
      suggestedFacilityTypes: ['clinic_24h', 'district_hospital', 'primary_hospital'],
      anonymousSignalContributed: false,
    };
  }

  // Primary Care Level
  const isPrimaryCare = 
    symptoms.length > 0 && 
    (input.duration === '2_3_days' || input.duration === '1_week' || input.duration === 'more_than_week');

  if (isPrimaryCare) {
    return {
      id: `triage-${Date.now()}`,
      timestamp: new Date().toISOString(),
      urgencyLevel: 'PRIMARY_CARE',
      careRoute: 'primary_clinic',
      primarySyndrome: symptoms.includes('cough') 
        ? 'Persistent Respiratory Symptoms / Screening Candidate'
        : 'Subacute Primary Health Presentation',
      summaryTitle: {
        en: 'Primary Healthcare Clinic Consultation Recommended (24–48 Hours)',
        tn: 'Etela Kokelwana ya Gago ya Tsatsi le Letsatsi (Mo Malatsing a le 1–2)',
      },
      clinicalRationale: {
        en: 'Your symptoms have persisted for several days without severe red flags. A routine outpatient consultation at your local clinic is the most appropriate and cost-free step.',
        tn: 'Matshwao a gago a tsere malatsinyana mme ga gona kotsi e e potlakileng. Go bona mooki kwa kokelwaneng ya selegae ke kgato e e maleba.',
      },
      recommendedActions: {
        en: [
          'Visit your regular local clinic or health post during normal weekday opening hours (07:30 – 16:30).',
          'If your cough has lasted longer than 2 weeks, request a routine TB sputum test (GeneXpert) at the clinic (free of charge).',
          'Get plenty of rest and stay well hydrated.',
        ],
        tn: [
          'Etela kokelwana ya gago ya selegae ka dinako tsa tiro tsa beke (07:30 – 16:30).',
          'Fa sehuba se fetile dibeke tse pedi, kopa tlhatlhobo ya TB ya kgotlholo ya GeneXpert (ke ya mahala).',
          'Itapolose mme o nwe metsi a mantsi.',
        ],
      },
      homeCareGuidance: {
        en: [
          'Steam inhalation with warm water helps loosen phlegm.',
          'Warm tea with lemon and honey helps soothe cough and throat discomfort.',
          'Avoid exposure to wood smoke, dust, or cigarette fumes.',
        ],
        tn: [
          'Arama metsi a a molelo go bulela sehuba.',
          'Nwa tee e e borutho e e nang le lero la namune le tswina ya dinotshe.',
          'Efoga mosi wa dikgong le lerole le le ka bakang kgotlholo.',
        ],
      },
      redFlagsToWatch: {
        en: [
          'Development of shortness of breath or pain when breathing deeply',
          'Coughing up blood streaks',
          'Fever rising above 38.5°C',
        ],
        tn: [
          'Go hema ka bothata kgotsa go utlwa botlhoko mo sehubeng',
          'Go kgotlhola madi',
          'Letshoroma le le tlhatlogang thata',
        ],
      },
      suggestedFacilityTypes: ['clinic', 'clinic_24h', 'health_post'],
      anonymousSignalContributed: false,
    };
  }

  // Self-Care and Monitoring
  return {
    id: `triage-${Date.now()}`,
    timestamp: new Date().toISOString(),
    urgencyLevel: 'SELF_CARE',
    careRoute: 'home_care_monitoring',
    primarySyndrome: 'Mild Self-Limiting Symptoms / Early Onset',
    summaryTitle: {
      en: 'Safe Home Care & Active Monitoring',
      tn: 'Kalafo ya mo Gae le Tlhokomelo e e Tseneletseng',
    },
    clinicalRationale: {
      en: 'Your symptoms appear mild and of recent onset without clinical danger signs. Most uncomplicated viral conditions resolve safely at home with proper rest and hydration.',
      tn: 'Matshwao a gago a supega a le botlhofo ebile a simolotse bosheng kwantle ga matshwao a kotsi. Ditshwaetso tse dintsi tsa mofikela di fola di le tsosi mo gae ka go ikhutsa.',
    },
    recommendedActions: {
      en: [
        'Rest at home and drink at least 2 litres of clean fluids daily.',
        'If needed, paracetamol can be used for mild discomfort according to packaging instructions.',
        'If symptoms worsen or fail to improve after 3 to 4 days, visit your local clinic.',
      ],
      tn: [
        'Ikhutse mo gae mme o nwe metsi a a phepa a a lekaneng malatsi otlhe.',
        'Fa go tlhokega, paracetamol e ka go thusa ka botlhoko jo bo botlhofo go ya ka fa o laetsweng ka teng.',
        'Fa matshwao a nna masisi kgotsa a sa tokafale morago ga malatsi a le 3-4, bona mooki kwa kokelwaneng.',
      ],
    },
    homeCareGuidance: {
      en: [
        'Drink rooibos tea, clean boiled water, or fresh diluted juices.',
        'Keep bedroom well-aired and wash hands frequently with soap and water.',
        'Eat light, nourishing meals like sorghum porridge (motogo) or vegetable soup.',
      ],
      tn: [
        'Nwa tee ya rooibos le metsi a a bedisitsweng a phepafaditswe.',
        'Tsenya phefo mo ntlong le go tlhapa diatla ka molora le metsi kgafetsa.',
        'Ja dijo tse di botlhofo jaaka motogo le sopo.',
      ],
    },
    redFlagsToWatch: {
      en: [
        'Difficulty breathing or chest tightness',
        'Inability to drink or keep fluids down',
        'Fever lasting longer than 48 hours',
      ],
      tn: [
        'Go felelwa ke mowa kgotsa sehuba se se kabiwang',
        'Go palelwa ke go nwa metsi kgotsa go tlhatsa kgafetsa',
        'Letshoroma le le fetang malatsi a mabedi',
      ],
    },
    suggestedFacilityTypes: ['clinic', 'health_post'],
    anonymousSignalContributed: false,
  };
}

/**
 * Optional AI Triage reasoning helper using @google/genai SDK when user enters free-form narrative
 */
export async function enhanceTriageWithAI(
  userText: string,
  baseResult: TriageResult
): Promise<{ additionalNotes?: string; setswanaExplanation?: string }> {
  try {
    const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return {};
    }

    const ai = new GoogleGenAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the clinical triage safety advisor for PHELO, a digital health platform in Botswana.
User symptom description: "${userText}"
Current rule-based urgency tier: ${baseResult.urgencyLevel}
Care Route: ${baseResult.careRoute}

Guidelines:
1. NEVER declare a definitive medical diagnosis.
2. NEVER prescribe prescription drugs or alter existing prescriptions.
3. Provide a 2-sentence clinical clarification tailored to Botswana primary healthcare.
4. Provide a 2-sentence Setswana translation for the patient.

Format output as JSON:
{
  "additionalNotes": "...",
  "setswanaExplanation": "..."
}`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return {
        additionalNotes: parsed.additionalNotes,
        setswanaExplanation: parsed.setswanaExplanation,
      };
    }
  } catch (err) {
    console.warn('AI Triage enrichment fallback active:', err);
  }
  return {};
}
