import { UserProfile, TriageResult, LanguageCode } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'phelo_user_profile_v1',
  TRIAGE_HISTORY: 'phelo_triage_history_v1',
  ANONYMOUS_SIGNALS_CONTRIBUTED: 'phelo_contributed_signals_v1',
};

export function getInitialUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('LocalStorage unavailable or corrupt, fallback to memory', err);
  }

  const initial: UserProfile = {
    identityLevel: 0, // Level 0: Accountless Anonymous by default
    anonymousId: 'anon-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36),
    district: 'Gaborone',
    preferredLanguage: 'en',
    consents: {
      anonymousSurveillanceOptIn: true,
      localHistoryStorage: true,
    },
  };

  saveUserProfile(initial);
  return initial;
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving user profile to localStorage', err);
  }
}

export function getTriageHistory(): TriageResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRIAGE_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function saveTriageAssessment(assessment: TriageResult): void {
  try {
    const existing = getTriageHistory();
    const updated = [assessment, ...existing.slice(0, 19)]; // Store up to 20 local private records
    localStorage.setItem(STORAGE_KEYS.TRIAGE_HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save assessment locally', err);
  }
}

export function clearAllLocalData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.TRIAGE_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.ANONYMOUS_SIGNALS_CONTRIBUTED);
  } catch (err) {
    console.error('Error clearing local data', err);
  }
}

export function recordAnonymousSignal(district: string, syndrome: string, ageBand: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANONYMOUS_SIGNALS_CONTRIBUTED);
    const existing = raw ? JSON.parse(raw) : [];
    existing.push({
      timestamp: new Date().toISOString(),
      district,
      syndrome,
      ageBand,
    });
    localStorage.setItem(STORAGE_KEYS.ANONYMOUS_SIGNALS_CONTRIBUTED, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to record anonymous signal locally', err);
  }
}

export function getContributedSignalsCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANONYMOUS_SIGNALS_CONTRIBUTED);
    return raw ? JSON.parse(raw).length : 0;
  } catch {
    return 0;
  }
}
