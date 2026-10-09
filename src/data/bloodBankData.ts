export interface BloodBankReserve {
  facilityId: string;
  facilityName: string;
  district: string;
  region: 'Southern Corridor' | 'Northern Corridor' | 'Okavango Corridor' | 'Central Corridor';
  overallStatus: 'critical' | 'low' | 'adequate' | 'optimal';
  daysOfSupplyRemaining: number;
  bloodGroups: {
    group: 'O-' | 'O+' | 'A-' | 'A+' | 'B-' | 'B+' | 'AB-' | 'AB+';
    status: 'critical_emergency' | 'low' | 'adequate';
    unitsOnHand: number;
    targetUnits: number;
    urgentAppealActive: boolean;
  }[];
  donationCenter: {
    location: string;
    operatingHours: string;
    phone: string;
    walkInAccepted: boolean;
    nextMobileDriveDate?: string;
    nextMobileDriveLocation?: string;
  };
}

export const NBTS_BLOOD_BANKS: BloodBankReserve[] = [
  {
    facilityId: 'nbts-pmh-gaborone',
    facilityName: 'Princess Marina Hospital NBTS Central Blood Bank',
    district: 'Gaborone',
    region: 'Southern Corridor',
    overallStatus: 'critical',
    daysOfSupplyRemaining: 1.8,
    bloodGroups: [
      { group: 'O-', status: 'critical_emergency', unitsOnHand: 4, targetUnits: 35, urgentAppealActive: true },
      { group: 'O+', status: 'low', unitsOnHand: 18, targetUnits: 60, urgentAppealActive: true },
      { group: 'A-', status: 'critical_emergency', unitsOnHand: 2, targetUnits: 20, urgentAppealActive: true },
      { group: 'A+', status: 'adequate', unitsOnHand: 28, targetUnits: 35, urgentAppealActive: false },
      { group: 'B-', status: 'critical_emergency', unitsOnHand: 3, targetUnits: 15, urgentAppealActive: true },
      { group: 'B+', status: 'adequate', unitsOnHand: 32, targetUnits: 40, urgentAppealActive: false },
      { group: 'AB-', status: 'low', unitsOnHand: 2, targetUnits: 10, urgentAppealActive: false },
      { group: 'AB+', status: 'adequate', unitsOnHand: 12, targetUnits: 15, urgentAppealActive: false },
    ],
    donationCenter: {
      location: 'Princess Marina Hospital Grounds (Opposite Maternity Wing), Gaborone',
      operatingHours: 'Monday - Friday: 07:30 - 16:30 | Saturday: 08:00 - 13:00',
      phone: '+267 362 1400',
      walkInAccepted: true,
      nextMobileDriveDate: '2026-10-03',
      nextMobileDriveLocation: 'Rail Park Mall Entrance (Near Bus Rank), Gaborone'
    }
  },
  {
    facilityId: 'nbts-nyangabgwe-francistown',
    facilityName: 'Nyangabgwe Referral Hospital Blood Bank',
    district: 'Francistown',
    region: 'Northern Corridor',
    overallStatus: 'low',
    daysOfSupplyRemaining: 2.4,
    bloodGroups: [
      { group: 'O-', status: 'critical_emergency', unitsOnHand: 3, targetUnits: 30, urgentAppealActive: true },
      { group: 'O+', status: 'low', unitsOnHand: 22, targetUnits: 50, urgentAppealActive: true },
      { group: 'A-', status: 'low', unitsOnHand: 4, targetUnits: 18, urgentAppealActive: false },
      { group: 'A+', status: 'adequate', unitsOnHand: 24, targetUnits: 30, urgentAppealActive: false },
      { group: 'B-', status: 'critical_emergency', unitsOnHand: 1, targetUnits: 12, urgentAppealActive: true },
      { group: 'B+', status: 'adequate', unitsOnHand: 26, targetUnits: 30, urgentAppealActive: false },
      { group: 'AB-', status: 'low', unitsOnHand: 3, targetUnits: 8, urgentAppealActive: false },
      { group: 'AB+', status: 'adequate', unitsOnHand: 10, targetUnits: 12, urgentAppealActive: false },
    ],
    donationCenter: {
      location: 'Nyangabgwe Referral Hospital Outpatient Quadrangle, Francistown',
      operatingHours: 'Monday - Friday: 08:00 - 16:00',
      phone: '+267 241 1000',
      walkInAccepted: true,
      nextMobileDriveDate: '2026-10-04',
      nextMobileDriveLocation: 'Galgonyana Shopping Complex, Francistown'
    }
  },
  {
    facilityId: 'nbts-maun-general',
    facilityName: 'Maun General Hospital Blood Transfusion Unit',
    district: 'Ngamiland (Maun)',
    region: 'Okavango Corridor',
    overallStatus: 'low',
    daysOfSupplyRemaining: 2.1,
    bloodGroups: [
      { group: 'O-', status: 'critical_emergency', unitsOnHand: 2, targetUnits: 20, urgentAppealActive: true },
      { group: 'O+', status: 'adequate', unitsOnHand: 24, targetUnits: 35, urgentAppealActive: false },
      { group: 'A-', status: 'low', unitsOnHand: 2, targetUnits: 12, urgentAppealActive: true },
      { group: 'A+', status: 'adequate', unitsOnHand: 18, targetUnits: 22, urgentAppealActive: false },
      { group: 'B-', status: 'low', unitsOnHand: 2, targetUnits: 10, urgentAppealActive: false },
      { group: 'B+', status: 'adequate', unitsOnHand: 20, targetUnits: 25, urgentAppealActive: false },
      { group: 'AB-', status: 'adequate', unitsOnHand: 2, targetUnits: 5, urgentAppealActive: false },
      { group: 'AB+', status: 'adequate', unitsOnHand: 8, targetUnits: 10, urgentAppealActive: false },
    ],
    donationCenter: {
      location: 'Maun General Hospital Blood Unit, Sir Seretse Khama Rd, Maun',
      operatingHours: 'Monday - Friday: 07:30 - 16:00',
      phone: '+267 686 0444',
      walkInAccepted: true,
      nextMobileDriveDate: '2026-10-05',
      nextMobileDriveLocation: 'Old Mall Taxi Rank, Maun'
    }
  },
  {
    facilityId: 'nbts-sekgoma-palapye',
    facilityName: 'Sekgoma Memorial & Palapye Hospital Regional Depot',
    district: 'Central (Serowe / Palapye)',
    region: 'Central Corridor',
    overallStatus: 'adequate',
    daysOfSupplyRemaining: 3.5,
    bloodGroups: [
      { group: 'O-', status: 'low', unitsOnHand: 5, targetUnits: 15, urgentAppealActive: true },
      { group: 'O+', status: 'adequate', unitsOnHand: 34, targetUnits: 40, urgentAppealActive: false },
      { group: 'A-', status: 'adequate', unitsOnHand: 8, targetUnits: 12, urgentAppealActive: false },
      { group: 'A+', status: 'adequate', unitsOnHand: 22, targetUnits: 25, urgentAppealActive: false },
      { group: 'B-', status: 'low', unitsOnHand: 3, targetUnits: 8, urgentAppealActive: false },
      { group: 'B+', status: 'adequate', unitsOnHand: 25, targetUnits: 30, urgentAppealActive: false },
      { group: 'AB-', status: 'adequate', unitsOnHand: 3, targetUnits: 6, urgentAppealActive: false },
      { group: 'AB+', status: 'adequate', unitsOnHand: 7, targetUnits: 8, urgentAppealActive: false },
    ],
    donationCenter: {
      location: 'Palapye Primary Hospital Casualty Annex, A1 Junction, Palapye',
      operatingHours: 'Monday - Friday: 08:00 - 16:30',
      phone: '+267 492 0222',
      walkInAccepted: true
    }
  }
];

export const DONOR_ELIGIBILITY_CRITERIA = [
  { id: 'age', textEn: 'Age between 16 and 65 years old (16-17 requires parental or guardian consent)', textTn: 'Dingwaga magareng ga 16 le 65' },
  { id: 'weight', textEn: 'Body weight at least 50 kg (110 lbs)', textTn: 'Boima jwa mmele bo sa fologe 50 kg' },
  { id: 'health', textEn: 'Feeling generally healthy and well today (no active fever, flu, or recent surgery)', textTn: 'O ikutlwa o tsogile sentle gompieno (ga o na mofikela kgotsa letshoroma)' },
  { id: 'interval', textEn: 'At least 3 months since your last whole blood donation (for men) or 4 months (for women)', textTn: 'Go fetile dikgwedi tse 3 o setse o ntshitse madi (banna) kgotsa dikgwedi tse 4 (basadi)' },
  { id: 'lifestyle', textEn: 'No high-risk exposure, recent tattoos, or piercings within the last 6 months', textTn: 'Ga o a tsenya tattoo kgotsa go phunya ditsebe mo dikgweding tse 6 tse di fetileng' }
];
