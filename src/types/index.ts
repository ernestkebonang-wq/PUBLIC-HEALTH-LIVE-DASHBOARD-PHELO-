export type LanguageCode = 'en' | 'tn' | 'kck';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  isFullySupported: boolean;
}

export type IdentityLevel = 0 | 1 | 2; // 0: Anonymous, 1: Phone, 2: Verified

export interface UserProfile {
  identityLevel: IdentityLevel;
  anonymousId: string;
  phoneNumber?: string;
  district: string;
  preferredLanguage: LanguageCode;
  consents: {
    anonymousSurveillanceOptIn: boolean;
    localHistoryStorage: boolean;
  };
}

export type UrgencyLevel = 'EMERGENCY' | 'URGENT' | 'PRIMARY_CARE' | 'SELF_CARE';

export type CareRouteType = 
  | 'emergency_facility' 
  | 'urgent_clinic_24h' 
  | 'district_hospital' 
  | 'primary_clinic' 
  | 'health_post_chw' 
  | 'local_pharmacy' 
  | 'home_care_monitoring';

export interface SymptomDefinition {
  id: string;
  en: string;
  tn: string;
  kck: string;
  category: 'respiratory' | 'gastrointestinal' | 'febrile' | 'pain' | 'maternal_child' | 'injury' | 'general';
  isRedFlagTrigger: boolean;
}

export interface TriageInput {
  selectedSymptomIds: string[];
  naturalTextDescription: string;
  duration: 'today' | '2_3_days' | '1_week' | 'more_than_week';
  ageBand: 'infant_under_1' | 'child_1_5' | 'youth_6_17' | 'adult_18_64' | 'elder_65_plus';
  isPregnant: boolean;
  chronicConditions: string[];
  checkedDangerSigns: string[];
  district: string;
}

export interface TriageResult {
  id: string;
  timestamp: string;
  urgencyLevel: UrgencyLevel;
  careRoute: CareRouteType;
  primarySyndrome: string;
  summaryTitle: {
    en: string;
    tn: string;
  };
  clinicalRationale: {
    en: string;
    tn: string;
  };
  recommendedActions: {
    en: string[];
    tn: string[];
  };
  homeCareGuidance?: {
    en: string[];
    tn: string[];
  };
  redFlagsToWatch: {
    en: string[];
    tn: string[];
  };
  suggestedFacilityTypes: string[];
  matchedFacilitiesCount?: number;
  anonymousSignalContributed?: boolean;
}

export type FacilitySector = 'public' | 'private' | 'mission_partnership';

export type FacilityType = 
  | 'referral_hospital' 
  | 'district_hospital' 
  | 'primary_hospital' 
  | 'private_hospital'
  | 'clinic_24h' 
  | 'clinic' 
  | 'health_post';

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  sector?: FacilitySector;
  medicalAidAccepted?: string[];
  district: string;
  settlement: string;
  address: string;
  phone: string;
  emergencyPhone?: string;
  operatingHours: string;
  is24Hour: boolean;
  hasMaternity: boolean;
  hasLaboratory: boolean;
  hasPharmacy: boolean;
  hasChildHealthIMCI: boolean;
  hasTbArtServices: boolean;
  wheelchairAccessible: boolean;
  referralRequired: boolean;
  verifiedDate: string;
  notes?: string;
}

export interface HealthArticle {
  id: string;
  category: 'respiratory' | 'diarrhoeal' | 'maternal_child' | 'malaria' | 'chronic' | 'first_aid' | 'mental_health';
  titleEn: string;
  titleTn: string;
  summaryEn: string;
  summaryTn: string;
  contentEn: string;
  contentTn: string;
  warningSignsEn: string[];
  warningSignsTn: string[];
  practicalStepsEn: string[];
  practicalStepsTn: string[];
  reviewedBy: string;
  reviewDate: string;
  mohProtocolVersion: string;
}

export interface SurveillanceSignal {
  id: string;
  district: string;
  syndrome: 'acute_respiratory' | 'acute_watery_diarrhoea' | 'febrile_illness' | 'suspected_malaria' | 'maternal_alert';
  syndromeName: string;
  count7Days: number;
  expectedBaseline: number;
  deltaPercent: number;
  status: 'normal' | 'monitoring' | 'dhmt_flagged' | 'investigating';
  lastUpdated: string;
  notes: string;
}

export interface EpidemiologicalAlert {
  id: string;
  district: string;
  title: string;
  date: string;
  severity: 'low' | 'moderate' | 'high';
  summary: string;
  recommendedDhmtAction: string;
  investigationLead: string;
  status: 'active' | 'investigating' | 'controlled';
}

export interface DailyHealthInsight {
  id: string;
  district: string;
  districtScope: 'local' | 'national';
  topic: 'waterborne' | 'vector' | 'respiratory' | 'chronic' | 'maternal' | 'environmental' | 'nutrition';
  severity: 'advisory' | 'alert' | 'preventive' | 'seasonal';
  dateValid: string;
  title: {
    en: string;
    tn: string;
    kck?: string;
  };
  headlineContext: {
    en: string;
    tn: string;
    kck?: string;
  };
  trendSignal: {
    en: string;
    tn: string;
    statValue?: string;
    statLabel?: string;
    source: string;
  };
  actionAdvice: {
    en: string[];
    tn: string[];
  };
  didYouKnow?: {
    en: string;
    tn: string;
  };
  quickAction?: {
    type: 'protocol' | 'facility' | 'triage' | 'surveillance';
    labelEn: string;
    labelTn: string;
    targetTab: string;
    targetPayload?: string;
  };
  shareableSummaryText: {
    en: string;
    tn: string;
  };
}

export type LifestyleCategory = 
  | 'hydration_water' 
  | 'outdoor_exposure' 
  | 'home_environment' 
  | 'nutrition_diet' 
  | 'sleep_rest' 
  | 'family_childcare';

export interface LifestyleAdjustment {
  id: string;
  category: LifestyleCategory;
  title: {
    en: string;
    tn: string;
    kck?: string;
  };
  lifestyleAction: {
    en: string;
    tn: string;
  };
  surveillanceRationale: {
    en: string;
    tn: string;
  };
  difficulty: 'easy' | 'moderate';
  timeOfDay: 'morning' | 'midday' | 'evening' | 'all_day';
  impactLevel: 'high' | 'medium';
  settlementScope?: string;
}

export interface RegionalIntelligenceProfile {
  district: string;
  surveillanceSummary: {
    primarySyndrome: string;
    primarySyndromeName: string;
    deltaPercent: number;
    surveillanceStatus: 'normal' | 'monitoring' | 'dhmt_flagged' | 'investigating';
    sevenDayVolume: number;
    expectedBaseline: number;
    activeInvestigationLead?: string;
    environmentalFactorEn: string;
    environmentalFactorTn: string;
  };
  lifestyleAdjustments: LifestyleAdjustment[];
}

// REMOTE CONSULTATION & TELEHEALTH TYPES
export type ConsultationModality = 'video' | 'audio' | 'callback' | 'chat';

export type ProviderSpecialty = 
  | 'general_opd'
  | 'maternal_antenatal'
  | 'paediatrics'
  | 'chronic_ncd'
  | 'mental_wellness'
  | 'dermatology';

export interface HealthcareProvider {
  id: string;
  name: string;
  titleEn: string;
  titleTn: string;
  specialty: ProviderSpecialty;
  specialtyLabelEn: string;
  specialtyLabelTn: string;
  facility: string;
  district: string;
  bhpcRegistration: string;
  experienceYears: number;
  languages: string[];
  bioEn: string;
  bioTn: string;
  avatarUrl?: string;
  supportedModalities: ConsultationModality[];
  nextAvailableSlot: string;
  rating: number;
  reviewsCount: number;
  availableDays: string[];
}

export type AppointmentStatus = 'confirmed' | 'in_waiting_room' | 'completed' | 'cancelled';

export interface ScheduledAppointment {
  id: string;
  providerId: string;
  providerName: string;
  providerSpecialty: string;
  facilityName: string;
  district: string;
  patientName: string;
  patientPhone: string;
  modality: ConsultationModality;
  date: string;
  timeSlot: string;
  chiefComplaint: string;
  symptomDuration?: string;
  triageSummaryAttached?: boolean;
  status: AppointmentStatus;
  createdAt: string;
  meetingLink?: string;
  digitalNotes?: string[];
  prescribedMedicines?: string[];
}
