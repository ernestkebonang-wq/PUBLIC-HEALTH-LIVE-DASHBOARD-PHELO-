import { INITIAL_SURVEILLANCE_SIGNALS, EPIDEMIOLOGICAL_ALERTS } from '../data/surveillanceData';
import { REGIONAL_INTELLIGENCE_PROFILES, getRegionalProfile } from '../data/lifestyleIntelligenceData';
import { RegionalIntelligenceProfile, LifestyleAdjustment } from '../types';

const LIFESTYLE_CHECKLIST_STORAGE_KEY = 'phelo_lifestyle_checklist_state_v1';

export function getAggregatedDistrictIntelligence(districtName: string): RegionalIntelligenceProfile {
  // Start from base regional profile
  const baseProfile = getRegionalProfile(districtName);

  // Pull live signals from surveillance module for this district
  const districtSignals = INITIAL_SURVEILLANCE_SIGNALS.filter(sig => 
    districtName !== 'All' && districtName !== 'All Districts'
      ? sig.district.toLowerCase().includes(districtName.toLowerCase()) || districtName.toLowerCase().includes(sig.district.toLowerCase())
      : true
  );

  // Pull active alerts for this district
  const districtAlert = EPIDEMIOLOGICAL_ALERTS.find(alert => 
    districtName !== 'All' && districtName !== 'All Districts'
      ? alert.district.toLowerCase().includes(districtName.toLowerCase()) || districtName.toLowerCase().includes(alert.district.toLowerCase())
      : false
  );

  // If we found live surveillance signals, dynamically reflect the latest 7-day stats
  if (districtSignals.length > 0) {
    const primarySignal = districtSignals[0];
    return {
      ...baseProfile,
      surveillanceSummary: {
        ...baseProfile.surveillanceSummary,
        primarySyndrome: primarySignal.syndrome,
        primarySyndromeName: primarySignal.syndromeName,
        deltaPercent: primarySignal.deltaPercent,
        surveillanceStatus: primarySignal.status,
        sevenDayVolume: primarySignal.count7Days,
        expectedBaseline: primarySignal.expectedBaseline,
        activeInvestigationLead: districtAlert ? districtAlert.investigationLead : baseProfile.surveillanceSummary.activeInvestigationLead,
      }
    };
  }

  return baseProfile;
}

export function loadCheckedAdjustments(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LIFESTYLE_CHECKLIST_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // If stored on a previous date, reset daily
    const today = new Date().toISOString().slice(0, 10);
    if (parsed.date !== today) {
      return {};
    }
    return parsed.checked || {};
  } catch {
    return {};
  }
}

export function saveCheckedAdjustment(id: string, isChecked: boolean): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const current = loadCheckedAdjustments();
    const updated = { ...current, [id]: isChecked };
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(
      LIFESTYLE_CHECKLIST_STORAGE_KEY,
      JSON.stringify({ date: today, checked: updated })
    );
    return updated;
  } catch {
    return {};
  }
}
