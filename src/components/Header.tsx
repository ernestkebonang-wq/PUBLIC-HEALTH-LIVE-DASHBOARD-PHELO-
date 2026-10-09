import React from 'react';
import { PhoneCall, ShieldCheck, Globe, AlertTriangle, Sparkles } from 'lucide-react';
import { LanguageCode, UserProfile } from '../types';
import { SUPPORTED_LANGUAGES, UI_STRINGS } from '../data/languages';
import { PHELOLogo } from './PHELOLogo';

interface HeaderProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenEmergency: () => void;
  onOpenPrivacyVault: () => void;
  onOpenBrandGuide?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenEmergency,
  onOpenPrivacyVault,
  onOpenBrandGuide,
  activeTab,
  setActiveTab,
  userProfile,
}) => {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Distinctive Official PHELO Brand Identity */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="text-left group flex items-center focus:outline-none focus:ring-2 focus:ring-teal-700/40 rounded-xl p-1 -ml-1 transition-all"
            aria-label="PHELO Home"
          >
            <PHELOLogo
              variant="horizontal"
              size="sm"
              taglineText={currentLang === 'tn' ? 'Botsogo jwa Botswana' : 'Botswana Health'}
            />
          </button>

          {onOpenBrandGuide && (
            <button
              onClick={onOpenBrandGuide}
              title="View Official PHELO Brand Identity & Visual System"
              className="hidden lg:inline-flex items-center gap-1 text-[10px] font-bold text-teal-800 hover:text-teal-950 bg-teal-50/80 hover:bg-teal-100 border border-teal-200/80 px-2 py-0.5 rounded-full transition-colors ml-1"
            >
              <Sparkles className="w-2.5 h-2.5 text-teal-600" />
              <span>Identity</span>
            </button>
          )}
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-3.5 lg:gap-5 text-xs lg:text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'home' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => setActiveTab('triage')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'triage' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navTriage}
          </button>
          <button
            onClick={() => setActiveTab('facilities')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'facilities' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navFacilities}
          </button>
          <button
            onClick={() => setActiveTab('medicines')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'medicines' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navMedicines}
          </button>
          <button
            onClick={() => setActiveTab('blood_bank')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'blood_bank' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navBloodBank}
          </button>
          <button
            onClick={() => setActiveTab('bukana')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'bukana' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navBukana}
          </button>
          <button
            onClick={() => setActiveTab('telehealth')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'telehealth' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navTeleHealth || 'Remote Consult'}
          </button>
          <button
            onClick={() => setActiveTab('health_info')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'health_info' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navHealthInfo}
          </button>
          <button
            onClick={() => setActiveTab('surveillance')}
            className={`transition-colors hover:text-slate-900 ${
              activeTab === 'surveillance' ? 'text-teal-800 font-semibold border-b-2 border-teal-700 pb-0.5' : ''
            }`}
          >
            {t.navSurveillance}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="relative flex items-center">
            <label htmlFor="language-select" className="sr-only">Language</label>
            <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-md border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
              <select
                id="language-select"
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs font-medium text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Privacy & Progressive Identity */}
          <button
            onClick={onOpenPrivacyVault}
            title="Privacy and Accountless Settings"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Privacy settings"
          >
            <ShieldCheck className="w-4 h-4 text-teal-700" />
          </button>

          {/* Emergency Entry Point */}
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-md shadow-sm transition-all whitespace-nowrap min-h-[44px]"
            aria-label="Open emergency mode"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 text-white animate-pulse" />
            <span className="hidden xs:inline">{t.emergencyButton}</span>
            <span className="xs:hidden">997</span>
          </button>
        </div>
      </div>
    </header>
  );
};
