import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Building2, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  Activity,
  ChevronDown
} from 'lucide-react';
import { 
  LanguageCode, 
  TriageInput, 
  TriageResult, 
  UrgencyLevel,
  UserProfile 
} from '../types';
import { 
  SYMPTOM_DEFINITIONS, 
  CLINICAL_DANGER_SIGNS, 
  BOTSWANA_DISTRICTS,
  UI_STRINGS,
  BOTSWANA_HEALTH_LANGUAGE_MAPPINGS
} from '../data/languages';
import { assessTriage, enhanceTriageWithAI } from '../services/triageEngine';
import { saveTriageAssessment, recordAnonymousSignal } from '../services/storageService';

interface TriageCareRouterProps {
  currentLang: LanguageCode;
  userProfile: UserProfile;
  onNavigateToFacilities: (filterType?: string) => void;
  onOpenEmergency: () => void;
}

export const TriageCareRouter: React.FC<TriageCareRouterProps> = ({
  currentLang,
  userProfile,
  onNavigateToFacilities,
  onOpenEmergency,
}) => {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;

  // Flow steps: 1: Symptoms -> 2: Danger Signs & Profile -> 3: Urgency & Care Route -> 4: Community Signal
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [triageInput, setTriageInput] = useState<TriageInput>({
    selectedSymptomIds: [],
    naturalTextDescription: '',
    duration: '2_3_days',
    ageBand: 'adult_18_64',
    isPregnant: false,
    chronicConditions: [],
    checkedDangerSigns: [],
    district: userProfile.district || 'Gaborone',
  });

  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiEnrichment, setAiEnrichment] = useState<{ additionalNotes?: string; setswanaExplanation?: string } | null>(null);
  const [anonymousSignalSaved, setAnonymousSignalSaved] = useState(false);
  const [showLanguageHelper, setShowLanguageHelper] = useState(false);

  // Symptom toggling
  const toggleSymptom = (id: string) => {
    setTriageInput(prev => ({
      ...prev,
      selectedSymptomIds: prev.selectedSymptomIds.includes(id)
        ? prev.selectedSymptomIds.filter(s => s !== id)
        : [...prev.selectedSymptomIds, id],
    }));
  };

  // Danger signs toggling
  const toggleDangerSign = (id: string) => {
    setTriageInput(prev => ({
      ...prev,
      checkedDangerSigns: prev.checkedDangerSigns.includes(id)
        ? prev.checkedDangerSigns.filter(d => d !== id)
        : [...prev.checkedDangerSigns, id],
    }));
  };

  // Run triage
  const handleRunAssessment = async () => {
    setIsProcessing(true);
    try {
      const result = assessTriage(triageInput);
      setTriageResult(result);
      saveTriageAssessment(result);

      // If user typed custom text, optionally enrich with clinical explanation
      if (triageInput.naturalTextDescription.trim().length > 10) {
        enhanceTriageWithAI(triageInput.naturalTextDescription, result).then(enrichment => {
          if (enrichment.additionalNotes) {
            setAiEnrichment(enrichment);
          }
        });
      }

      setStep(3);
    } catch (err) {
      console.error('Triage error', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle anonymous signal contribution
  const handleContributeSignal = () => {
    if (!triageResult) return;
    recordAnonymousSignal(triageInput.district, triageResult.primarySyndrome, triageInput.ageBand);
    setAnonymousSignalSaved(true);
  };

  // Reset form
  const handleReset = () => {
    setTriageInput({
      selectedSymptomIds: [],
      naturalTextDescription: '',
      duration: '2_3_days',
      ageBand: 'adult_18_64',
      isPregnant: false,
      chronicConditions: [],
      checkedDangerSigns: [],
      district: userProfile.district || 'Gaborone',
    });
    setTriageResult(null);
    setAiEnrichment(null);
    setAnonymousSignalSaved(false);
    setStep(1);
  };

  // Render Urgency Badge
  const renderUrgencyBadge = (level: UrgencyLevel) => {
    switch (level) {
      case 'EMERGENCY':
        return (
          <div className="bg-rose-700 text-white p-4 rounded-xl shadow-sm border border-rose-800">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-5 h-5 text-rose-200 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
                {currentLang === 'tn' ? 'MAEMO A POTLAKO (RED)' : 'EMERGENCY LEVEL (RED)'}
              </span>
            </div>
            <div className="text-lg font-bold">
              {triageResult?.summaryTitle[currentLang === 'tn' ? 'tn' : 'en']}
            </div>
          </div>
        );
      case 'URGENT':
        return (
          <div className="bg-amber-600 text-white p-4 rounded-xl shadow-sm border border-amber-700">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-amber-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                {currentLang === 'tn' ? 'POTLAKO E E LEKANYENG (ORANGE)' : 'URGENT CARE (ORANGE)'}
              </span>
            </div>
            <div className="text-lg font-bold">
              {triageResult?.summaryTitle[currentLang === 'tn' ? 'tn' : 'en']}
            </div>
          </div>
        );
      case 'PRIMARY_CARE':
        return (
          <div className="bg-teal-700 text-white p-4 rounded-xl shadow-sm border border-teal-800">
            <div className="flex items-center gap-2 mb-1">
              <Stethoscope className="w-5 h-5 text-teal-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                {currentLang === 'tn' ? 'KOKELWANA YA SELEGAE (YELLOW)' : 'PRIMARY CLINIC CARE (YELLOW)'}
              </span>
            </div>
            <div className="text-lg font-bold">
              {triageResult?.summaryTitle[currentLang === 'tn' ? 'tn' : 'en']}
            </div>
          </div>
        );
      case 'SELF_CARE':
        return (
          <div className="bg-emerald-700 text-white p-4 rounded-xl shadow-sm border border-emerald-800">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                {currentLang === 'tn' ? 'KALAFO YA MO GAE (GREEN)' : 'SELF-CARE & MONITORING (GREEN)'}
              </span>
            </div>
            <div className="text-lg font-bold">
              {triageResult?.summaryTitle[currentLang === 'tn' ? 'tn' : 'en']}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Triage Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
            <Stethoscope className="w-4 h-4 text-teal-700" />
            <span>{currentLang === 'tn' ? 'Tlhatlhobo ya Triage & Kaelo ya Kokelo' : 'Triage & Care Router'}</span>
            <span aria-hidden="true">·</span>
            <span>{currentLang === 'tn' ? 'Botswana Primary Care Guidelines' : 'Botswana Ministry of Health protocols'}</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {step === 1 ? 'Step 1 of 3: Symptoms' : step === 2 ? 'Step 2 of 3: Danger Signs' : 'Step 3 of 3: Recommended Care Route'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {currentLang === 'tn' ? 'Ke Ikutlwa ke sa Tsoga — Ke Ye Kae?' : "I'm Feeling Unwell — Where Should I Go?"}
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl">
          {currentLang === 'tn' 
            ? 'A o a lwala mme ga o itse gore a o tshwanetse go ya kwa kokelwaneng, sepateleng sa kgaolo kgotsa go itapolosa mo gae? Tlhatlhoba fano.' 
            : 'Unsure which clinic, 24-hour facility, or hospital tier to visit? Answer a few clinical questions for immediate safe routing.'}
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* STEP 1: PRESENTATION & SYMPTOMS */}
        {step === 1 && (
          <div className="p-5 sm:p-8 space-y-6">
            {/* Quick symptom selector */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                {currentLang === 'tn' ? '1. Tlhopha matshwao a o a utlwang gompieno:' : '1. Select symptoms you are experiencing:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {SYMPTOM_DEFINITIONS.map(sym => {
                  const isSelected = triageInput.selectedSymptomIds.includes(sym.id);
                  return (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() => toggleSymptom(sym.id)}
                      className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between min-h-[64px] ${
                        isSelected 
                          ? 'border-teal-700 bg-teal-50/80 text-teal-950 font-semibold shadow-xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 text-slate-800'
                      }`}
                    >
                      <span>{currentLang === 'tn' ? sym.tn : currentLang === 'kck' ? sym.kck : sym.en}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-teal-700 self-end mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Natural language symptom text box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="symptom-text" className="block text-xs font-semibold text-slate-900">
                  {currentLang === 'tn' 
                    ? 'Kgotsa tlhalosa ka mafoko a gago (Puo ya gago e dumeletswe):' 
                    : 'Or describe in your own words (English, Setswana, or Ikalanga):'}
                </label>
                <button
                  type="button"
                  onClick={() => setShowLanguageHelper(!showLanguageHelper)}
                  className="text-[11px] font-medium text-teal-700 hover:text-teal-900 flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{currentLang === 'tn' ? 'Mafoko a botsogo a Setswana' : 'Setswana health terms helper'}</span>
                </button>
              </div>

              {showLanguageHelper && (
                <div className="mb-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-900">Botswana Health Language Layer:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1 text-[11px]">
                    {BOTSWANA_HEALTH_LANGUAGE_MAPPINGS.slice(0, 9).map((item, idx) => (
                      <span key={idx} className="bg-white px-2 py-1 rounded border border-slate-200">
                        <strong className="text-teal-900">{item.local}</strong> → {item.en}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                id="symptom-text"
                rows={3}
                value={triageInput.naturalTextDescription}
                onChange={e => setTriageInput(prev => ({ ...prev, naturalTextDescription: e.target.value }))}
                placeholder={
                  currentLang === 'tn'
                    ? 'Sekao: Ke na le letshoroma le legolo le sehuba go tloga maabane, ngwana o palelwa ke go anywa...'
                    : 'Example: I have had a high fever and persistent dry cough for two days, and body chills...'
                }
                className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Duration and District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                  {currentLang === 'tn' ? 'Bolwetse bo tsere nako e e kae?' : 'How long have you felt unwell?'}
                </label>
                <select
                  value={triageInput.duration}
                  onChange={e => setTriageInput(prev => ({ ...prev, duration: e.target.value as any }))}
                  className="w-full p-2.5 text-xs font-medium rounded-xl border border-slate-300 bg-white text-slate-800 focus:border-teal-700 outline-none"
                >
                  <option value="today">Started today (Bosheng tsatsi leno)</option>
                  <option value="2_3_days">2 to 3 days (Malatsi a le 2–3)</option>
                  <option value="1_week">About 1 week (Beke e le 1)</option>
                  <option value="more_than_week">More than a week (Go feta beke)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                  {currentLang === 'tn' ? 'Kgaolo e o leng mo go yone (District):' : 'Your Botswana District:'}
                </label>
                <select
                  value={triageInput.district}
                  onChange={e => setTriageInput(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full p-2.5 text-xs font-medium rounded-xl border border-slate-300 bg-white text-slate-800 focus:border-teal-700 outline-none"
                >
                  {BOTSWANA_DISTRICTS.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenEmergency}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1 min-h-[44px]"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{currentLang === 'tn' ? 'Kotsi ya Potlako? Leletsa 997' : 'Life-threatening? Open 997 Emergency'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-transform active:scale-95 min-h-[44px]"
              >
                <span>{currentLang === 'tn' ? 'Tswella pele (Kgato 2)' : 'Next: Danger Signs Check'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DANGER SIGNS & CLINICAL VULNERABILITY */}
        {step === 2 && (
          <div className="p-5 sm:p-8 space-y-6">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                <span>{currentLang === 'tn' ? 'Tlhatlhobo ya Matshwao a Kotsi (Danger Signs)' : 'Critical Danger Signs Assessment'}</span>
              </div>
              <p className="text-xs text-rose-800">
                {currentLang === 'tn'
                  ? 'Kgetha fa e le gore o na le lengwe la matshwao a a latelang a a tlhokang kokelo ka bofefo:'
                  : 'Please check if any of these life-threatening clinical danger signs are present right now:'}
              </p>
            </div>

            <div className="space-y-2.5">
              {CLINICAL_DANGER_SIGNS.map(sign => {
                const isChecked = triageInput.checkedDangerSigns.includes(sign.id);
                return (
                  <label
                    key={sign.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked 
                        ? 'border-rose-600 bg-rose-50/60 text-rose-950 font-medium' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/30 text-slate-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleDangerSign(sign.id)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-700 focus:ring-rose-600 cursor-pointer"
                    />
                    <div className="text-xs leading-relaxed">
                      <div className="font-semibold">{currentLang === 'tn' ? sign.tn : sign.en}</div>
                      <div className="text-slate-500 text-[11px]">{currentLang === 'tn' ? sign.en : sign.tn}</div>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Age band and Vulnerability Modifiers */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1.5">
                  {currentLang === 'tn' ? 'Dingwaga tsa molwetsi (Age group):' : 'Age group of the person:'}
                </label>
                <select
                  value={triageInput.ageBand}
                  onChange={e => setTriageInput(prev => ({ ...prev, ageBand: e.target.value as any }))}
                  className="w-full p-2.5 text-xs font-medium rounded-xl border border-slate-300 bg-white text-slate-800 focus:border-teal-700 outline-none"
                >
                  <option value="infant_under_1">Infant under 1 year (Ngwana yo o ka fa tlase ga ngwaga)</option>
                  <option value="child_1_5">Child 1 to 5 years (Ngwana wa ngwaga 1–5)</option>
                  <option value="youth_6_17">Youth 6 to 17 years (Dingwaga 6–17)</option>
                  <option value="adult_18_64">Adult 18 to 64 years (Mogolo 18–64)</option>
                  <option value="elder_65_plus">Elder 65+ years (Mogodi 65+)</option>
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={triageInput.isPregnant}
                    onChange={e => setTriageInput(prev => ({ ...prev, isPregnant: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
                  />
                  <span>{currentLang === 'tn' ? 'A molwetsi o itsholofetse (Pregnant)?' : 'Is the person currently pregnant?'}</span>
                </label>
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentLang === 'tn' ? 'Boela morago' : 'Back to symptoms'}</span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleRunAssessment}
                className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-transform active:scale-95 min-h-[44px]"
              >
                {isProcessing ? (
                  <span>Evaluating clinical protocols...</span>
                ) : (
                  <>
                    <span>{currentLang === 'tn' ? 'Tlhatlhoba Maemo a Kokelo' : 'Generate Care Route'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TRIAGE RESULT & CARE ROUTE */}
        {step === 3 && triageResult && (
          <div className="p-5 sm:p-8 space-y-6">
            {/* Urgency header */}
            {renderUrgencyBadge(triageResult.urgencyLevel)}

            {/* Clinical Rationale */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {currentLang === 'tn' ? 'Tlhaloso ya Maemo a Botsogo:' : 'Clinical Assessment Rationale:'}
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">
                {triageResult.clinicalRationale[currentLang === 'tn' ? 'tn' : 'en']}
              </p>
              {aiEnrichment?.additionalNotes && (
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 italic">
                  <strong>Clinical Note:</strong> {aiEnrichment.additionalNotes}
                </div>
              )}
            </div>

            {/* Recommended Care Route & Facility Matching */}
            <div className="border border-teal-200 bg-teal-50/40 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-800" />
                  <h3 className="text-sm font-bold text-teal-950">
                    {currentLang === 'tn' ? 'Tsamaiso le Kokelo e e go Lebaneng:' : 'Recommended Care Route:'}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-teal-800">
                  {triageInput.district}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {triageResult.recommendedActions[currentLang === 'tn' ? 'tn' : 'en'].map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                    <span className="font-bold text-teal-800 shrink-0 w-4">{idx + 1}.</span>
                    <span className="leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>

              {/* Direct Facility Link */}
              <button
                onClick={() => onNavigateToFacilities(triageResult.careRoute)}
                className="w-full sm:w-auto px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Building2 className="w-4 h-4" />
                <span>
                  {currentLang === 'tn'
                    ? `Bona Ditleliniki le Dipatela mo ${triageInput.district}`
                    : `View Matching Verified Facilities in ${triageInput.district}`}
                </span>
              </button>
            </div>

            {/* Home care guidance if applicable */}
            {triageResult.homeCareGuidance && (
              <div className="border border-slate-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {currentLang === 'tn' ? 'Kaelo ya mo Gae le Phepafalo:' : 'Safe Home Care & Hydration Advice:'}
                </h4>
                <div className="space-y-1.5">
                  {triageResult.homeCareGuidance[currentLang === 'tn' ? 'tn' : 'en'].map((g, idx) => (
                    <div key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="text-teal-700 font-bold">•</span>
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Red flags warning */}
            <div className="border border-rose-200 bg-rose-50/50 rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 uppercase tracking-wider mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                <span>{currentLang === 'tn' ? 'Matshwao a a Kotsi a o Tshwanetseng go a Ela Tlhoko:' : 'Escalation Triggers — Seek Immediate Care If:'}</span>
              </div>
              <ul className="space-y-1">
                {triageResult.redFlagsToWatch[currentLang === 'tn' ? 'tn' : 'en'].map((rf, idx) => (
                  <li key={idx} className="text-xs text-rose-800 flex items-start gap-2">
                    <span className="font-bold">!</span>
                    <span>{rf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CARE FIRST, INTELLIGENCE SECOND: Anonymized Community Signal Opt-In */}
            <div className="border border-slate-200 bg-slate-50/70 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-800" />
                  <span className="text-xs font-bold text-slate-900">
                    {currentLang === 'tn' ? 'Thuso ya Setshaba (Public Health Intelligence)' : 'Community Health Contribution'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Zero PII · Anonymous
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {currentLang === 'tn'
                  ? `O ka thusa ba botsogo go lemoga dikemo tsa bolwetse mo ${triageInput.district} ka go romela tshedimosetso e e senang leina la gago kgotsa nomore ya mogala.`
                  : `Care First, Intelligence Second: Help your local District Health Management Team (DHMT) in ${triageInput.district} monitor syndromic activity by anonymously logging that a case was reported. No name, phone, or identity is ever shared.`}
              </p>

              {!anonymousSignalSaved ? (
                <button
                  type="button"
                  onClick={handleContributeSignal}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>{currentLang === 'tn' ? 'Romela Tshedimosetso ya Setshaba' : 'Contribute Anonymous Signal to DHMT'}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    {currentLang === 'tn' 
                      ? 'Re lebogile! Tshedimosetso e bolokilwe mo thulaganyong ya botsogo ya setshaba kwantle ga leina.' 
                      : 'Anonymous signal logged. Thank you for protecting community health in Botswana.'}
                  </span>
                </div>
              )}
            </div>

            {/* Restart Triage */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 py-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{currentLang === 'tn' ? 'Simolola Tlhatlhobo e Ntsha' : 'Start Another Assessment'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToFacilities()}
                className="text-xs font-bold text-teal-800 hover:text-teal-950 py-2"
              >
                {currentLang === 'tn' ? 'Tshekatsheko ya Ditleliniki tsotlhe →' : 'Browse All Facilities →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
