import { FeatureCollection, Geometry } from 'geojson';

export interface DistrictSurveillanceMetadata {
  id: string;
  nameEn: string;
  nameTn: string;
  adminSeat: string;
  alertLevel: 'active_alert' | 'monitoring' | 'normal';
  alertStatusLabelEn: string;
  alertStatusLabelTn: string;
  primarySyndrome: string;
  primarySyndromeCode: 'waterborne' | 'malaria' | 'respiratory' | 'febrile' | 'maternal' | 'general';
  sevenDayCases: number;
  expectedBaseline: number;
  deltaPercent: number;
  dhmtLead: string;
  dhmtActionEn: string;
  dhmtActionTn: string;
  keyFacility: string;
  settlementsMonitored: string[];
  centroid: [number, number]; // [lng, lat]
}

export interface BotswanaDistrictFeatureProperties extends DistrictSurveillanceMetadata {}

export const BOTSWANA_DISTRICTS_DATA: DistrictSurveillanceMetadata[] = [
  {
    id: 'chobe',
    nameEn: 'Chobe District',
    nameTn: 'Kgaolo ya Chobe',
    adminSeat: 'Kasane',
    alertLevel: 'active_alert',
    alertStatusLabelEn: 'Active Public Health Alert (Vector-Borne)',
    alertStatusLabelTn: 'Kaelo ya Potlako ya Botsogo (Monang / Malaria)',
    primarySyndrome: 'Suspected Malaria / Febrile Spike',
    primarySyndromeCode: 'malaria',
    sevenDayCases: 31,
    expectedBaseline: 18,
    deltaPercent: 72.2,
    dhmtLead: 'Public Health Officer B. Nthoiwa (Chobe DHMT)',
    dhmtActionEn: 'Accelerate Indoor Residual Spraying (IRS) mop-up in riparian settlements along the Chobe River. Free RDT testing active at Kasane Primary Hospital.',
    dhmtActionTn: 'Go fafatsa matlo ka melemo ya monang mo metseng e e gaufi le noka ya Chobe le go tlhatlhobela malaria mahala kwa bookelong jwa Kasane.',
    keyFacility: 'Kasane Primary Hospital',
    settlementsMonitored: ['Kasane', 'Kazungula', 'Pandamatenga', 'Kachikau', 'Kavimba'],
    centroid: [25.15, -18.25],
  },
  {
    id: 'ngamiland',
    nameEn: 'Ngamiland (Okavango)',
    nameTn: 'Kgaolo ya Ngamiland',
    adminSeat: 'Maun',
    alertLevel: 'active_alert',
    alertStatusLabelEn: 'Active Public Health Alert (Waterborne)',
    alertStatusLabelTn: 'Kaelo ya Potlako ya Botsogo (Letshololo la Metsi)',
    primarySyndrome: 'Paediatric Acute Watery Diarrhoea',
    primarySyndromeCode: 'waterborne',
    sevenDayCases: 78,
    expectedBaseline: 42,
    deltaPercent: 85.7,
    dhmtLead: 'Dr. T. Sebina (Ngamiland DHMT)',
    dhmtActionEn: 'Community Health Workers deployed with ORS & Zinc packets. Municipal water testing and borehole decontamination in Thamalakane river wards.',
    dhmtActionTn: 'Baeletsi ba botsogo ba aba ORS le Zinc mo malwapeng. Ditlhatlhobo tsa metsi le go phepafatsa didiba mo dikgotleng tsa Thamalakane.',
    keyFacility: 'Letsholathebe II Memorial Hospital',
    settlementsMonitored: ['Maun', 'Boseja', 'Matlapana', 'Disaneng', 'Gumare', 'Shorobe', 'Shakawe'],
    centroid: [23.10, -19.60],
  },
  {
    id: 'gaborone_southeast',
    nameEn: 'Gaborone & South East',
    nameTn: 'Gaborone le Borwa Botlhaba',
    adminSeat: 'Gaborone',
    alertLevel: 'monitoring',
    alertStatusLabelEn: 'Active Monitoring (Respiratory Shift)',
    alertStatusLabelTn: 'Tlhokomelo e e Tseneletseng (Sehuba le Mafatlha)',
    primarySyndrome: 'Acute Respiratory Illness (ARI / Viral)',
    primarySyndromeCode: 'respiratory',
    sevenDayCases: 142,
    expectedBaseline: 110,
    deltaPercent: 29.1,
    dhmtLead: 'Gaborone DHMT Public Health Team',
    dhmtActionEn: 'Syndromic screening at 24-hour outpatient clinics (Bontleng & Extension 2). Flu vaccination mobilization for high-risk elderly and asthmatics.',
    dhmtActionTn: 'Tlhatlhobo ya sehuba mo ditleliniking tsa diura tse 24 le go kenta batsofe le ba ba nang le asma kgatlhanong le mofikela.',
    keyFacility: 'Princess Marina Hospital (PMH)',
    settlementsMonitored: ['Gaborone Central', 'Broadhurst', 'Bontleng', 'Tlokweng', 'Ramotswa', 'Otse'],
    centroid: [25.92, -24.65],
  },
  {
    id: 'central',
    nameEn: 'Central District',
    nameTn: 'Kgaolo ya Legare',
    adminSeat: 'Serowe',
    alertLevel: 'monitoring',
    alertStatusLabelEn: 'Active Monitoring (Unspecified Febrile)',
    alertStatusLabelTn: 'Tlhokomelo e e Tseneletseng (Letshoroma)',
    primarySyndrome: 'Unspecified Febrile Illness',
    primarySyndromeCode: 'febrile',
    sevenDayCases: 64,
    expectedBaseline: 55,
    deltaPercent: 16.4,
    dhmtLead: 'Central District Epidemiological Unit',
    dhmtActionEn: 'Laboratory tracking of viral etiologies in Palapye & Serowe education hubs. Cross-border truck driver syndromic surveillance active.',
    dhmtActionTn: 'Diteko tsa laboratory tsa letshoroma mo mafelong a thuto le tlhokomelo ya bakgweetsi ba dikoloi tse dikgolo.',
    keyFacility: 'Sekgoma Memorial Hospital & Palapye Primary',
    settlementsMonitored: ['Serowe', 'Palapye', 'Mahalapye', 'Bobonong', 'Tutume', 'Letlhakane'],
    centroid: [26.70, -22.35],
  },
  {
    id: 'francistown_northeast',
    nameEn: 'Francistown & North East',
    nameTn: 'Francistown le Bokone Botlhaba',
    adminSeat: 'Francistown / Masunga',
    alertLevel: 'normal',
    alertStatusLabelEn: 'Stable Baseline (Routine Surveillance)',
    alertStatusLabelTn: 'Seemo se se Ritibetseng (Tlhokomelo ya Gale)',
    primarySyndrome: 'Acute Respiratory Illness (Baseline)',
    primarySyndromeCode: 'respiratory',
    sevenDayCases: 94,
    expectedBaseline: 88,
    deltaPercent: 6.8,
    dhmtLead: 'Greater Francistown DHMT',
    dhmtActionEn: 'Routine weekly IDSR surveillance. Blood bank donation drive active at Nyangabgwe Referral Hospital.',
    dhmtActionTn: 'Tlhokomelo ya gale ya IDSR le kopo ya go aba madi mo bookelong jwa Nyangabgwe.',
    keyFacility: 'Nyangabgwe Referral Hospital',
    settlementsMonitored: ['Francistown', 'Tatitown', 'Masunga', 'Tshesebe', 'Matsiloje'],
    centroid: [27.45, -21.15],
  },
  {
    id: 'kweneng',
    nameEn: 'Kweneng District',
    nameTn: 'Kgaolo ya Kweneng',
    adminSeat: 'Molepolole',
    alertLevel: 'normal',
    alertStatusLabelEn: 'Stable Baseline (Maternal Outreach Active)',
    alertStatusLabelTn: 'Seemo se se Ritibetseng (Thusa ya Boimana)',
    primarySyndrome: 'Maternal & Child Health Vigilance',
    primarySyndromeCode: 'maternal',
    sevenDayCases: 19,
    expectedBaseline: 22,
    deltaPercent: -13.6,
    dhmtLead: 'Kweneng DHMT Maternal Health Unit',
    dhmtActionEn: 'Western Kweneng mobile clinic antenatal booking outreach showing positive reductions in late-stage gestational complications.',
    dhmtActionTn: 'Ditleliniki tse di tsamayang di tokafatsa tlhokomelo ya boimana le go fokotsa mathata a go belega.',
    keyFacility: 'Scottish Livingstone Hospital',
    settlementsMonitored: ['Molepolole', 'Thamaga', 'Letlhakeng', 'Metsimotlhabe', 'Lentsweletau'],
    centroid: [25.30, -24.10],
  },
  {
    id: 'kgatleng',
    nameEn: 'Kgatleng District',
    nameTn: 'Kgaolo ya Kgatleng',
    adminSeat: 'Mochudi',
    alertLevel: 'normal',
    alertStatusLabelEn: 'Stable Baseline (Routine Surveillance)',
    alertStatusLabelTn: 'Seemo se se Ritibetseng (Tlhokomelo ya Gale)',
    primarySyndrome: 'Cardiometabolic & General Health',
    primarySyndromeCode: 'general',
    sevenDayCases: 28,
    expectedBaseline: 30,
    deltaPercent: -6.7,
    dhmtLead: 'Kgatleng DHMT Primary Care',
    dhmtActionEn: 'Hypertension and diabetes screening drives active across kgotla community clinics in Mochudi & Artesia.',
    dhmtActionTn: 'Tlhatlhobo ya madi a matona le sukiri mo dikgotleng le ditleliniking tsa Mochudi le Artesia.',
    keyFacility: 'Deborah Retief Memorial Hospital (DRM)',
    settlementsMonitored: ['Mochudi', 'Bokaa', 'Oodi', 'Morwa', 'Artesia', 'Malolwane'],
    centroid: [26.35, -24.30],
  },
  {
    id: 'southern',
    nameEn: 'Southern District',
    nameTn: 'Kgaolo ya Borwa',
    adminSeat: 'Kanye',
    alertLevel: 'normal',
    alertStatusLabelEn: 'Stable Baseline (Routine Surveillance)',
    alertStatusLabelTn: 'Seemo se se Ritibetseng (Tlhokomelo ya Gale)',
    primarySyndrome: 'NCD Vigilance & Trauma Readiness',
    primarySyndromeCode: 'general',
    sevenDayCases: 37,
    expectedBaseline: 40,
    deltaPercent: -7.5,
    dhmtLead: 'Southern DHMT Directorate',
    dhmtActionEn: 'Trauma preparedness active along A1 highway corridor. Essential medicine dispensary stock stable.',
    dhmtActionTn: 'Ipaakanyetso ya dikotsi tsa tsela ya A1 le polokelo e e tiileng ya melemo mo ditleliniking.',
    keyFacility: 'Kanye Seventh-day Adventist Hospital & Athlone Hospital',
    settlementsMonitored: ['Kanye', 'Lobatse', 'Moshupa', 'Goodhope', 'Pitsane', 'Mabule'],
    centroid: [25.20, -25.20],
  },
  {
    id: 'ghanzi',
    nameEn: 'Ghanzi District',
    nameTn: 'Kgaolo ya Ghanzi',
    adminSeat: 'Ghanzi',
    alertLevel: 'normal',
    alertStatusLabelEn: 'Stable Baseline (Heat & Arid Health)',
    alertStatusLabelTn: 'Seemo se se Ritibetseng (Mogote le Phepafalo)',
    primarySyndrome: 'Heatwave & Hydration Vigilance',
    primarySyndromeCode: 'general',
    sevenDayCases: 16,
    expectedBaseline: 17,
    deltaPercent: -5.9,
    dhmtLead: 'Ghanzi DHMT Health Directorate',
    dhmtActionEn: 'Kalahari remote settlements health worker vehicle rounds providing water safety drops and vitamin supplementation.',
    dhmtActionTn: 'Dikoloi tsa baoki di etela metsana e e kgakala ya sekaka go isa pilisi le melemo ya go phepafatsa metsi.',
    keyFacility: 'Ghanzi Primary Hospital',
    settlementsMonitored: ['Ghanzi Town', 'Charleshill', 'Kalkfontein', 'Dekar', 'New Xade'],
    centroid: [21.80, -21.70],
  },
  {
    id: 'kgalagadi',
    nameEn: 'Kgalagadi District',
    nameTn: 'Kgaolo ya Kgalagadi',
    adminSeat: 'Tsabong',
    alertLevel: 'normal',
    alertStatusLabelEn: 'Stable Baseline (Arid Climate Outreach)',
    alertStatusLabelTn: 'Seemo se se Ritibetseng (Botsogo jwa Sekaka)',
    primarySyndrome: 'Extreme Heat & Chronic Hydration',
    primarySyndromeCode: 'general',
    sevenDayCases: 14,
    expectedBaseline: 15,
    deltaPercent: -6.6,
    dhmtLead: 'Kgalagadi DHMT Public Health Officer',
    dhmtActionEn: 'Solar-powered cold chain monitoring for infant vaccines verified intact across Hukuntsi and Tsabong clinics.',
    dhmtActionTn: 'Tlhokomelo ya ditshidifatsi tsa letsatsi tsa mekento ya masea mo ditleliniking tsa Tsabong le Hukuntsi.',
    keyFacility: 'Tsabong Primary Hospital & Hukuntsi Hospital',
    settlementsMonitored: ['Tsabong', 'Hukuntsi', 'Kang', 'Werda', 'Bokspits', 'Middlepits'],
    centroid: [22.20, -25.40],
  }
];

/**
 * GeoJSON representation of Botswana Districts.
 * Coordinates are formatted as GeoJSON MultiPolygon or Polygon [longitude, latitude].
 * Calibrated specifically so that D3's geoMercator projection fits the whole nation smoothly.
 */
export const BOTSWANA_DISTRICTS_GEOJSON: FeatureCollection<Geometry, DistrictSurveillanceMetadata> = {
  type: 'FeatureCollection',
  features: [
    // 1. CHOBE DISTRICT (Northern tip along Zambezi and Chobe rivers)
    {
      type: 'Feature',
      id: 'chobe',
      properties: BOTSWANA_DISTRICTS_DATA[0],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [24.15, -17.80],
          [25.26, -17.78], // Kazungula border confluence
          [25.55, -18.00],
          [25.90, -18.45],
          [25.80, -19.00],
          [25.20, -19.20],
          [24.30, -19.05],
          [24.00, -18.40],
          [24.15, -17.80]
        ]]
      }
    },
    // 2. NGAMILAND (North-West, Okavango Delta, Shakawe, Gumare, Maun)
    {
      type: 'Feature',
      id: 'ngamiland',
      properties: BOTSWANA_DISTRICTS_DATA[1],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [21.00, -18.30],
          [21.80, -18.30],
          [22.80, -18.25],
          [23.50, -18.50],
          [24.00, -18.40],
          [24.30, -19.05],
          [25.00, -19.50],
          [24.80, -20.40],
          [23.80, -20.70],
          [23.00, -20.60],
          [21.00, -20.50],
          [21.00, -18.30]
        ]]
      }
    },
    // 3. GHANZI (Central West Kalahari)
    {
      type: 'Feature',
      id: 'ghanzi',
      properties: BOTSWANA_DISTRICTS_DATA[8],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [20.00, -21.00],
          [21.00, -20.50],
          [23.00, -20.60],
          [23.80, -20.70],
          [23.80, -22.20],
          [23.50, -23.00],
          [21.50, -23.00],
          [20.00, -23.00],
          [20.00, -21.00]
        ]]
      }
    },
    // 4. KGALAGADI (South-West Kalahari, Tsabong, Kang, Bokspits)
    {
      type: 'Feature',
      id: 'kgalagadi',
      properties: BOTSWANA_DISTRICTS_DATA[9],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [20.00, -23.00],
          [21.50, -23.00],
          [23.50, -23.00],
          [23.80, -24.00],
          [23.50, -25.50],
          [22.80, -26.50],
          [22.00, -26.90],
          [20.70, -26.85],
          [20.00, -25.00],
          [20.00, -23.00]
        ]]
      }
    },
    // 5. CENTRAL DISTRICT (Serowe, Palapye, Mahalapye, Boteti, Bobonong)
    {
      type: 'Feature',
      id: 'central',
      properties: BOTSWANA_DISTRICTS_DATA[3],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [24.80, -20.40],
          [25.00, -19.50],
          [25.20, -19.20],
          [25.80, -19.00],
          [26.50, -20.00],
          [27.30, -20.60],
          [27.30, -21.40],
          [28.50, -21.80],
          [29.35, -22.20], // Tuli Block / Limpopo
          [28.80, -23.10],
          [27.50, -23.80],
          [26.50, -23.80],
          [25.80, -23.40],
          [25.20, -23.10],
          [24.50, -22.50],
          [23.80, -22.20],
          [23.80, -20.70],
          [24.80, -20.40]
        ]]
      }
    },
    // 6. NORTH EAST & FRANCISTOWN (Francistown, Masunga)
    {
      type: 'Feature',
      id: 'francistown_northeast',
      properties: BOTSWANA_DISTRICTS_DATA[4],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [26.50, -20.00],
          [27.60, -20.40],
          [27.95, -20.80],
          [27.80, -21.50],
          [27.30, -21.40],
          [27.30, -20.60],
          [26.50, -20.00]
        ]]
      }
    },
    // 7. KWENENG (Molepolole, Thamaga, Letlhakeng)
    {
      type: 'Feature',
      id: 'kweneng',
      properties: BOTSWANA_DISTRICTS_DATA[5],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [23.80, -24.00],
          [23.50, -23.00],
          [24.50, -22.50],
          [25.20, -23.10],
          [25.80, -23.40],
          [25.90, -24.10],
          [25.60, -24.60],
          [24.80, -24.80],
          [23.80, -24.00]
        ]]
      }
    },
    // 8. KGATLENG (Mochudi, Artesia)
    {
      type: 'Feature',
      id: 'kgatleng',
      properties: BOTSWANA_DISTRICTS_DATA[6],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [25.80, -23.40],
          [26.50, -23.80],
          [26.90, -24.20],
          [26.50, -24.70],
          [26.05, -24.60],
          [25.90, -24.10],
          [25.80, -23.40]
        ]]
      }
    },
    // 9. GABORONE & SOUTH EAST (Gaborone capital city, Ramotswa, Tlokweng)
    {
      type: 'Feature',
      id: 'gaborone_southeast',
      properties: BOTSWANA_DISTRICTS_DATA[2],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [25.60, -24.60],
          [25.90, -24.10],
          [26.05, -24.60],
          [26.25, -24.95],
          [25.90, -25.05],
          [25.65, -24.85],
          [25.60, -24.60]
        ]]
      }
    },
    // 10. SOUTHERN DISTRICT (Kanye, Lobatse, Moshupa, Goodhope)
    {
      type: 'Feature',
      id: 'southern',
      properties: BOTSWANA_DISTRICTS_DATA[7],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [23.50, -25.50],
          [23.80, -24.00],
          [24.80, -24.80],
          [25.60, -24.60],
          [25.65, -24.85],
          [25.90, -25.05],
          [25.80, -25.60],
          [25.40, -25.85],
          [24.50, -25.90],
          [23.50, -25.50]
        ]]
      }
    }
  ]
};
