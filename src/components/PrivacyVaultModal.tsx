import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Trash2, 
  Check, 
  Smartphone, 
  UserCheck, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { UserProfile, LanguageCode, IdentityLevel } from '../types';
import { BOTSWANA_DISTRICTS } from '../data/languages';
import { saveUserProfile, clearAllLocalData, getTriageHistory } from '../services/storageService';

interface PrivacyVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
  currentLang: LanguageCode;
}

export const PrivacyVaultModal: React.FC<PrivacyVaultModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onProfileUpdate,
  currentLang,
}) => {
  const [profile, setProfile] = useState<UserProfile>(userProfile);
  const [phoneInput, setPhoneInput] = useState(userProfile.phoneNumber || '');
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [purgeFeedback, setPurgeFeedback] = useState(false);

  if (!isOpen) return null;

  const history = getTriageHistory();

  const handleSaveConsents = () => {
    const updated: UserProfile = {
      ...profile,
      phoneNumber: profile.identityLevel >= 1 ? phoneInput : undefined,
    };
    saveUserProfile(updated);
    onProfileUpdate(updated);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handlePurge = () => {
    if (confirm('Are you sure you want to delete all local health records and anonymous tokens from this browser?')) {
      clearAllLocalData();
      setPurgeFeedback(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Privacy, Data Separation & Identity
              </h2>
              <p className="text-xs text-slate-500">
                Full transparency over your health data on PHELO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="p-5 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* Accountless Guarantee */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-teal-950 text-sm">
              <Lock className="w-4 h-4 text-teal-800" />
              <span>Accountless Access by Design</span>
            </div>
            <p className="text-teal-900 leading-relaxed">
              You are using PHELO without an account. We do <strong>not</strong> ask for your Omang (National Identity Card), 
              full legal name, or home address. Your personal health queries remain securely in your device's browser memory.
            </p>
            <div className="pt-1 font-mono text-[11px] text-teal-800">
              Anonymous Device ID: <span className="text-slate-700">{profile.anonymousId}</span>
            </div>
          </div>

          {/* Progressive Identity Tier */}
          <div>
            <label className="block font-bold text-slate-900 text-xs mb-2">
              Progressive Identity Level:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setProfile(p => ({ ...p, identityLevel: 0 }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  profile.identityLevel === 0
                    ? 'border-teal-700 bg-teal-50/60 font-semibold text-teal-950'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="font-bold text-xs">Level 0</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Accountless (Anonymous)</div>
              </button>

              <button
                type="button"
                onClick={() => setProfile(p => ({ ...p, identityLevel: 1 }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  profile.identityLevel === 1
                    ? 'border-teal-700 bg-teal-50/60 font-semibold text-teal-950'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="font-bold text-xs">Level 1</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Mobile Phone (SMS reminders)</div>
              </button>

              <button
                type="button"
                onClick={() => setProfile(p => ({ ...p, identityLevel: 2 }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  profile.identityLevel === 2
                    ? 'border-teal-700 bg-teal-50/60 font-semibold text-teal-950'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="font-bold text-xs">Level 2</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Verified Patient Profile</div>
              </button>
            </div>
          </div>

          {/* Level 1 phone number input if selected */}
          {profile.identityLevel >= 1 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label htmlFor="phone-input" className="block font-semibold text-slate-800 text-xs">
                Botswana Mobile Number (+267):
              </label>
              <input
                id="phone-input"
                type="tel"
                value={phoneInput}
                onChange={e => setPhoneInput(e.target.value)}
                placeholder="e.g. 71234567"
                className="w-full p-2 text-xs rounded-lg border border-slate-300 focus:border-teal-700 outline-none"
              />
              <p className="text-[11px] text-slate-500">
                Used solely for sending facility referral tokens or appointment notifications.
              </p>
            </div>
          )}

          {/* District Preference */}
          <div>
            <label className="block font-bold text-slate-900 text-xs mb-1.5">
              Default Health District:
            </label>
            <select
              value={profile.district}
              onChange={e => setProfile(p => ({ ...p, district: e.target.value }))}
              className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:border-teal-700 outline-none"
            >
              {BOTSWANA_DISTRICTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Privacy & Governance Consents */}
          <div className="space-y-3 pt-2">
            <div className="font-bold text-slate-900 text-xs">
              Privacy & Consent Preferences:
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.consents.anonymousSurveillanceOptIn}
                onChange={e => setProfile(p => ({
                  ...p,
                  consents: { ...p.consents, anonymousSurveillanceOptIn: e.target.checked }
                }))}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
              />
              <span className="leading-relaxed">
                <strong>Anonymized Syndromic Intelligence:</strong> Allow PHELO to aggregate only my district, age group, and broad symptom group (zero names, zero identifiers) to alert DHMT health officers to community patterns.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={profile.consents.localHistoryStorage}
                onChange={e => setProfile(p => ({
                  ...p,
                  consents: { ...p.consents, localHistoryStorage: e.target.checked }
                }))}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
              />
              <span className="leading-relaxed">
                <strong>Local Device History:</strong> Store my past triage assessments on this browser so I can review my symptoms if revisiting a clinic.
              </span>
            </label>
          </div>

          {/* Local Data Audit & Purge */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 text-xs">
                Device Storage Audit
              </span>
              <span className="text-[11px] text-slate-500">
                {history.length} assessment(s) stored locally
              </span>
            </div>

            <button
              type="button"
              onClick={handlePurge}
              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>{purgeFeedback ? 'Local Storage Cleared!' : 'Purge All My Local Data Immediately'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveConsents}
            className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            {savedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Preferences Saved</span>
              </>
            ) : (
              <span>Save Privacy Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
