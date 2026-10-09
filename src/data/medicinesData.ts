export interface EssentialMedicine {
  id: string;
  genericName: string;
  brandNames: string[];
  category: 'hypertension' | 'diabetes' | 'respiratory' | 'malaria' | 'maternal_child' | 'emergency_antidote' | 'infection_tb' | 'mental_health';
  categoryLabelEn: string;
  categoryLabelTn: string;
  dosageForms: string[];
  indicationsEn: string;
  indicationsTn: string;
  moHEssentialListTier: 'Primary Clinic' | '24h Clinic' | 'District Hospital' | 'Referral Hospital';
  prescriptionRequired: boolean;
  standardSupplyDays: number;
  collectionRequirementsEn: string[];
  collectionRequirementsTn: string[];
  districtAvailability: {
    district: string;
    facilitiesStocked: {
      facilityName: string;
      facilityType: string;
      stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
      stockUnitsRemaining?: number;
      lastVerified: string;
      alternativeNearbyFacility?: string;
      dispensaryHours: string;
      contactPhone: string;
    }[];
  }[];
}

export const ESSENTIAL_MEDICINES: EssentialMedicine[] = [
  {
    id: 'med-amlodipine',
    genericName: 'Amlodipine Besylate',
    brandNames: ['Norvasc', 'Amlod', 'Amlozek'],
    category: 'hypertension',
    categoryLabelEn: 'Hypertension & Heart (Madi a Matona)',
    categoryLabelTn: 'Madi a Matona le Pelo',
    dosageForms: ['5mg tablets', '10mg tablets'],
    indicationsEn: 'First-line calcium channel blocker for high blood pressure and angina prevention.',
    indicationsTn: 'Pilisi ya go fologisa madi a matona le go ritibatsa pelo e e itayang ka bofefo.',
    moHEssentialListTier: 'Primary Clinic',
    prescriptionRequired: true,
    standardSupplyDays: 28,
    collectionRequirementsEn: [
      'Original Green Clinic Card (Bukana) or hospital outpatient book',
      'Valid National ID (Omang) or Residence Permit',
      'Recent clinic blood pressure check (within past 30 days)'
    ],
    collectionRequirementsTn: [
      'Bukana ya botsogo ya kokelwana (green clinic card)',
      'Omang kgotsa pampiri ya boagi e e amelesegileng',
      'Tlhatlhobo ya bosheng ya madi a matona (mo malatsing a le 30)'
    ],
    districtAvailability: [
      {
        district: 'Gaborone',
        facilitiesStocked: [
          {
            facilityName: 'Bontleng 24h Clinic',
            facilityType: 'clinic_24h',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 420,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 20:00 (Daily)',
            contactPhone: '+267 395 1888'
          },
          {
            facilityName: 'Broadhurst Clinic',
            facilityType: 'clinic_24h',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 310,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 391 2288'
          },
          {
            facilityName: 'Extension 2 Clinic',
            facilityType: 'clinic',
            stockStatus: 'low_stock',
            stockUnitsRemaining: 35,
            lastVerified: '2026-09-30',
            alternativeNearbyFacility: 'Bontleng 24h Clinic (1.8 km)',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 395 2444'
          }
        ]
      },
      {
        district: 'Ngamiland (Maun)',
        facilitiesStocked: [
          {
            facilityName: 'Maun General Hospital Outpatient',
            facilityType: 'district_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 550,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 18:00 (Daily)',
            contactPhone: '+267 686 0444'
          },
          {
            facilityName: 'Boseja Clinic',
            facilityType: 'clinic',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 180,
            lastVerified: '2026-09-29',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 686 1122'
          },
          {
            facilityName: 'Matlapana Health Post',
            facilityType: 'health_post',
            stockStatus: 'out_of_stock',
            lastVerified: '2026-09-30',
            alternativeNearbyFacility: 'Boseja Clinic (4.2 km) or Maun General Hospital',
            dispensaryHours: '08:00 - 16:00 (Mon-Fri)',
            contactPhone: '+267 686 2300'
          }
        ]
      },
      {
        district: 'Chobe (Kasane)',
        facilitiesStocked: [
          {
            facilityName: 'Kasane Primary Hospital Dispensary',
            facilityType: 'primary_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 280,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 18:00 (Daily)',
            contactPhone: '+267 625 0333'
          },
          {
            facilityName: 'Kazungula Clinic',
            facilityType: 'clinic',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 140,
            lastVerified: '2026-09-30',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 625 1055'
          }
        ]
      }
    ]
  },
  {
    id: 'med-metformin',
    genericName: 'Metformin Hydrochloride',
    brandNames: ['Glucophage', 'Formet', 'Diagem'],
    category: 'diabetes',
    categoryLabelEn: 'Type 2 Diabetes (Sukiri)',
    categoryLabelTn: 'Bolwetse jwa Sukiri',
    dosageForms: ['500mg tablets', '850mg tablets'],
    indicationsEn: 'Core biguanide medication to reduce blood glucose in Type 2 Diabetes.',
    indicationsTn: 'Pilisi ya ntlha ya go laola le go fokotsa selekanyo sa sukiri mo mading.',
    moHEssentialListTier: 'Primary Clinic',
    prescriptionRequired: true,
    standardSupplyDays: 28,
    collectionRequirementsEn: [
      'Original Green Clinic Card (Bukana)',
      'National ID (Omang)',
      'Quarterly fasting blood glucose or HbA1c log'
    ],
    collectionRequirementsTn: [
      'Bukana ya botsogo ya kokelwana',
      'Omang kgotsa pampiri ya boagi',
      'Maduo a diteko tsa sukiri a bosheng'
    ],
    districtAvailability: [
      {
        district: 'Gaborone',
        facilitiesStocked: [
          {
            facilityName: 'Bontleng 24h Clinic',
            facilityType: 'clinic_24h',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 680,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 20:00 (Daily)',
            contactPhone: '+267 395 1888'
          },
          {
            facilityName: 'Gaborone West Clinic',
            facilityType: 'clinic_24h',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 510,
            lastVerified: '2026-10-01',
            dispensaryHours: '24 Hours',
            contactPhone: '+267 393 0500'
          }
        ]
      },
      {
        district: 'Kweneng (Molepolole)',
        facilitiesStocked: [
          {
            facilityName: 'Scottish Livingstone Hospital Pharmacy',
            facilityType: 'district_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 740,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 18:00 (Daily)',
            contactPhone: '+267 592 0333'
          },
          {
            facilityName: 'Mafitlhakgosi Clinic',
            facilityType: 'clinic',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 210,
            lastVerified: '2026-09-30',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 592 1211'
          }
        ]
      }
    ]
  },
  {
    id: 'med-coartem',
    genericName: 'Artemether + Lumefantrine (Coartem)',
    brandNames: ['Coartem', 'Artefan', 'Lumartem'],
    category: 'malaria',
    categoryLabelEn: 'Malaria Treatment (Kalafo ya Malaria)',
    categoryLabelTn: 'Kalafo ya Semmuso ya Malaria',
    dosageForms: ['20mg/120mg tablets (6-dose 3-day blister packs for adults & children)'],
    indicationsEn: 'National first-line ACT treatment for confirmed Plasmodium falciparum malaria.',
    indicationsTn: 'Kalafo e kgolo ya semmuso ya mahala ya bolwetse jwa malaria.',
    moHEssentialListTier: 'Primary Clinic',
    prescriptionRequired: true,
    standardSupplyDays: 3,
    collectionRequirementsEn: [
      'Positive Rapid Diagnostic Test (mRDT) or blood smear confirmed by clinic nurse',
      'Given free of charge to all citizens and visitors'
    ],
    collectionRequirementsTn: [
      'Maduo a a bontshang gore o na le malaria (RDT test kwa kokelwaneng)',
      'E fiwa mahala mo ditleliniking tsotlhe tsa puso'
    ],
    districtAvailability: [
      {
        district: 'Chobe (Kasane)',
        facilitiesStocked: [
          {
            facilityName: 'Kasane Primary Hospital',
            facilityType: 'primary_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 850,
            lastVerified: '2026-10-01',
            dispensaryHours: '24 Hours Emergency Dispensing',
            contactPhone: '+267 625 0333'
          },
          {
            facilityName: 'Kazungula Clinic',
            facilityType: 'clinic',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 340,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 625 1055'
          }
        ]
      },
      {
        district: 'Ngamiland (Maun)',
        facilitiesStocked: [
          {
            facilityName: 'Maun General Hospital',
            facilityType: 'district_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 920,
            lastVerified: '2026-10-01',
            dispensaryHours: '24 Hours Emergency Dispensing',
            contactPhone: '+267 686 0444'
          },
          {
            facilityName: 'Sedie Clinic',
            facilityType: 'clinic',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 260,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 686 3122'
          }
        ]
      }
    ]
  },
  {
    id: 'med-ors-zinc',
    genericName: 'Oral Rehydration Salts (ORS) + Zinc Sulphate Tablets',
    brandNames: ['MoH Paediatric Rehydration Kit', 'Zincfant', 'Oralyte'],
    category: 'maternal_child',
    categoryLabelEn: 'Paediatric Diarrhoea & Rehydration',
    categoryLabelTn: 'Letshololo la Bana & Motswako wa ORS',
    dosageForms: ['ORS sachets for 1L water', 'Zinc Sulphate 20mg dispersible tablets'],
    indicationsEn: 'Life-saving dual therapy for paediatric watery diarrhoea and dehydration prevention.',
    indicationsTn: 'Kalafo ya botlhokwa ya go thibela go felelwa ke metsi le go ritibatsa letshololo la bana.',
    moHEssentialListTier: 'Primary Clinic',
    prescriptionRequired: false,
    standardSupplyDays: 10,
    collectionRequirementsEn: [
      'Child present or parent collecting with child Road to Health card',
      'Provided 100% free of charge at all health posts, clinics, and hospitals'
    ],
    collectionRequirementsTn: [
      'Ngwana a le teng kgotsa motsadi a tshotse Bukana ya ngwana',
      'E abelwa mahala kwa ditleliniking tsotlhe'
    ],
    districtAvailability: [
      {
        district: 'Ngamiland (Maun)',
        facilitiesStocked: [
          {
            facilityName: 'Boseja Clinic',
            facilityType: 'clinic',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 1200,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 686 1122'
          },
          {
            facilityName: 'Maun General Hospital',
            facilityType: 'district_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 2400,
            lastVerified: '2026-10-01',
            dispensaryHours: '24 Hours Emergency Dispensing',
            contactPhone: '+267 686 0444'
          }
        ]
      },
      {
        district: 'Gaborone',
        facilitiesStocked: [
          {
            facilityName: 'Princess Marina Hospital Pediatric Outpatient',
            facilityType: 'referral_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 3100,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 20:00 (Daily)',
            contactPhone: '+267 362 1400'
          },
          {
            facilityName: 'Bontleng 24h Clinic',
            facilityType: 'clinic_24h',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 890,
            lastVerified: '2026-10-01',
            dispensaryHours: '24 Hours',
            contactPhone: '+267 395 1888'
          }
        ]
      }
    ]
  },
  {
    id: 'med-salbutamol',
    genericName: 'Salbutamol Metered Dose Inhaler',
    brandNames: ['Ventolin', 'Asthalin', 'Salbair'],
    category: 'respiratory',
    categoryLabelEn: 'Asthma & Bronchospasm Relief',
    categoryLabelTn: 'Kaelo ya go Hema le Asma',
    dosageForms: ['100mcg/dose CFC-free inhaler (200 actuations)'],
    indicationsEn: 'Rapid relief bronchodilator for acute asthma attacks, wheezing, and bronchospasm.',
    indicationsTn: 'Kaelo ya go budula e e bulang dikgofo ka bofefo fa motho a hupela kgotsa a na le asma.',
    moHEssentialListTier: 'Primary Clinic',
    prescriptionRequired: true,
    standardSupplyDays: 30,
    collectionRequirementsEn: [
      'Original Clinic Card / Asthma Register Card',
      'Old empty canister brought for exchange',
      'National ID (Omang)'
    ],
    collectionRequirementsTn: [
      'Bukana ya botsogo ya asma',
      'Go tla le botlolo e kgologolo e e fedileng go fiwa e ntjha',
      'Omang'
    ],
    districtAvailability: [
      {
        district: 'Gaborone',
        facilitiesStocked: [
          {
            facilityName: 'Broadhurst Clinic',
            facilityType: 'clinic_24h',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 180,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 16:30 (Mon-Fri)',
            contactPhone: '+267 391 2288'
          },
          {
            facilityName: 'Bontleng 24h Clinic',
            facilityType: 'clinic_24h',
            stockStatus: 'low_stock',
            stockUnitsRemaining: 14,
            lastVerified: '2026-10-01',
            alternativeNearbyFacility: 'Broadhurst Clinic or Princess Marina Hospital',
            dispensaryHours: '24 Hours',
            contactPhone: '+267 395 1888'
          }
        ]
      },
      {
        district: 'Central (Serowe / Palapye)',
        facilitiesStocked: [
          {
            facilityName: 'Palapye Primary Hospital',
            facilityType: 'primary_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 210,
            lastVerified: '2026-10-01',
            dispensaryHours: '07:30 - 18:00 (Daily)',
            contactPhone: '+267 492 0222'
          },
          {
            facilityName: 'Sekgoma Memorial Hospital (Serowe)',
            facilityType: 'district_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 320,
            lastVerified: '2026-09-30',
            dispensaryHours: '07:30 - 18:00 (Daily)',
            contactPhone: '+267 463 0222'
          }
        ]
      }
    ]
  },
  {
    id: 'med-antivenom',
    genericName: 'SAVP Polyvalent Snake Antivenom',
    brandNames: ['South African Vaccine Producers Polyvalent'],
    category: 'emergency_antidote',
    categoryLabelEn: 'Emergency Antivenom (SAVP)',
    categoryLabelTn: 'Molemo wa Kotsi ya Dinoga (Antivenom)',
    dosageForms: ['10ml vial injectable (requires cold-chain 2-8°C storage)'],
    indicationsEn: 'Hospital emergency antidote for Puff Adder, Mamba, Spitting Cobra, and Rinkhals envenomation.',
    indicationsTn: 'Molemo wa kotsi o o fiwang mo sepateleng fa motho a longwa ke noga e e botlhole.',
    moHEssentialListTier: 'District Hospital',
    prescriptionRequired: true,
    standardSupplyDays: 1,
    collectionRequirementsEn: [
      'Inpatient trauma emergency administration only',
      'Strictly administered under medical officer supervision in hospital casualty'
    ],
    collectionRequirementsTn: [
      'E tshelwa fela mo sepateleng ka fa tlase ga tlhokomelo ya ngaka'
    ],
    districtAvailability: [
      {
        district: 'Gaborone',
        facilitiesStocked: [
          {
            facilityName: 'Princess Marina Hospital Emergency Casualty',
            facilityType: 'referral_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 45,
            lastVerified: '2026-10-01',
            dispensaryHours: '24 Hours Trauma Casualty',
            contactPhone: '+267 362 1400'
          }
        ]
      },
      {
        district: 'Ngamiland (Maun)',
        facilitiesStocked: [
          {
            facilityName: 'Maun General Hospital Emergency Unit',
            facilityType: 'district_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 28,
            lastVerified: '2026-10-01',
            dispensaryHours: '24 Hours Emergency Unit',
            contactPhone: '+267 686 0444'
          }
        ]
      },
      {
        district: 'Kgalagadi (Tsabong)',
        facilitiesStocked: [
          {
            facilityName: 'Tsabong Primary Hospital Casualty',
            facilityType: 'primary_hospital',
            stockStatus: 'in_stock',
            stockUnitsRemaining: 18,
            lastVerified: '2026-10-01',
            dispensaryHours: '24 Hours Emergency Casualty',
            contactPhone: '+267 654 0222'
          }
        ]
      }
    ]
  }
];
