import React, { useState, useEffect } from 'react';
import { 
  Baby, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  Utensils, 
  HelpCircle,
  Building2,
  ChevronRight
} from 'lucide-react';
import { BOTSWANA_EPI_SCHEDULE, VaccineMilestone } from '../data/childHealthSchedule';
import { LanguageCode } from '../types';

interface BukanaYaMaseaProps {
  currentLang: LanguageCode;
  onNavigateToFacilities?: (tier?: string) => void;
}

const STORAGE_KEY_BUKANA = 'phelo_bukana_child_profile_v1';

interface StoredChildProfile {
  childName: string;
  birthDate: string;
  gender: 'female' | 'male';
  completedVaccineIds: string[];
}

export const BukanaYaMasea: React.FC<BukanaYaMaseaProps> = ({
  currentLang,
  onNavigateToFacilities
}) => {
  const [profile, setProfile] = useState<StoredChildProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY_BUKANA);
        if (raw) return JSON.parse(raw);
      } catch {}
    }
    return {
      childName: 'Lesego',
      birthDate: '2026-04-15', // ~5.5 months old
      gender: 'female',
      completedVaccineIds: ['epi-birth-bcg', 'epi-6weeks', 'epi-10weeks', 'epi-14weeks']
    };
  });

  const [activeTabSection, setActiveTabSection] = useState<'schedule' | 'nutrition' | 'catchup'>('schedule');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BUKANA, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  // Calculate child age in weeks and months
  const childAgeWeeks = Math.max(0, Math.floor(
    (new Date('2026-10-01').getTime() - new Date(profile.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 7)
  ));
  const childAgeMonths = (childAgeWeeks / 4.33).toFixed(1);

  const toggleVaccineCompleted = (vaccineId: string) => {
    setProfile(prev => {
      const exists = prev.completedVaccineIds.includes(vaccineId);
      const updated = exists 
        ? prev.completedVaccineIds.filter(id => id !== vaccineId)
        : [...prev.completedVaccineIds, vaccineId];
      return { ...prev, completedVaccineIds: updated };
    });
  };

  const totalVaccines = BOTSWANA_EPI_SCHEDULE.length;
  const completedVaccinesCount = profile.completedVaccineIds.length;
  const progressPercent = Math.min(100, Math.round((completedVaccinesCount / totalVaccines) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Title & Authentic Green Bukana Heritage Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
          <Baby className="w-4 h-4 text-emerald-700" />
          <span>{currentLang === 'tn' ? 'Tlhokomelo ya Botsogo jwa Masea' : 'Child Health & Immunization Companion'}</span>
          <span aria-hidden="true">·</span>
          <span>{currentLang === 'tn' ? 'Bukana ya Masea (Road to Health Card)' : 'MoH Botswana EPI Schedule'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {currentLang === 'tn' ? 'Bukana ya Masea ya Maranyane' : 'Bukana ya Masea (Under-5 Road to Health Companion)'}
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl leading-relaxed">
          {currentLang === 'tn'
            ? 'Thulaganyo ya gago ya maranyane ya mekento ya ngwana, ditshwanelo tsa kgolo, dijo tsa selegae le dikaelo tsa go tsaya mokento o o go fetileng kwa kokelwaneng.'
            : 'Track childhood vaccine milestones according to Botswana Ministry of Health policy, identify due doses, monitor complementary feeding, and keep your child fully immunized.'}
        </p>
      </div>

      {/* Child Profile & Current Age Card */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-7 shadow-md border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-800/80 border border-emerald-700 flex items-center justify-center shrink-0">
            <Baby className="w-8 h-8 text-emerald-200" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              {currentLang === 'tn' ? 'Ngwana wa Gago' : 'Child Profile'}
            </div>
            <h2 className="text-2xl font-black text-white">
              {profile.childName}
            </h2>
            <div className="text-xs text-emerald-200 mt-0.5">
              Born {new Date(profile.birthDate).toLocaleDateString('en-GB')} · Current Age: <strong>{childAgeMonths} Months</strong> ({childAgeWeeks} weeks)
            </div>
          </div>
        </div>

        {/* Quick Edit Details Form */}
        <div className="bg-white/10 p-3 sm:p-4 rounded-2xl border border-white/15 flex flex-wrap items-center gap-3 text-xs w-full md:w-auto">
          <div>
            <label className="block text-[10px] text-emerald-200 font-semibold mb-1">
              Child Name:
            </label>
            <input
              type="text"
              value={profile.childName}
              onChange={(e) => setProfile(prev => ({ ...prev, childName: e.target.value }))}
              className="px-2.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold border-none focus:outline-none w-28"
            />
          </div>

          <div>
            <label className="block text-[10px] text-emerald-200 font-semibold mb-1">
              Birth Date:
            </label>
            <input
              type="date"
              value={profile.birthDate}
              onChange={(e) => setProfile(prev => ({ ...prev, birthDate: e.target.value }))}
              className="px-2.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold border-none focus:outline-none"
            />
          </div>

          <div className="pt-3 md:pt-0 self-end">
            <span className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs">
              Saved
            </span>
          </div>
        </div>
      </div>

      {/* Section Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTabSection('schedule')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSection === 'schedule'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{currentLang === 'tn' ? 'Thulaganyo ya Mekento (EPI)' : 'Immunization Timeline (EPI)'}</span>
        </button>

        <button
          onClick={() => setActiveTabSection('nutrition')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSection === 'nutrition'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>{currentLang === 'tn' ? 'Dijo tsa Ngwana (Motogo)' : 'Weaning & Nutrition Guide'}</span>
        </button>

        <button
          onClick={() => setActiveTabSection('catchup')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTabSection === 'catchup'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{currentLang === 'tn' ? 'Mokento o o Fetileng' : 'Missed Dose Catch-Up'}</span>
        </button>
      </div>

      {/* Tab 1: Immunization Schedule */}
      {activeTabSection === 'schedule' && (
        <div className="space-y-6">
          {/* Overall Immunization Progress Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-0.5">
                Primary Vaccine Shield Status
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {completedVaccinesCount} of {totalVaccines} Essential Stages Completed ({progressPercent}%)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Tick off the vaccines received from the nurse at your local clinic. All EPI vaccines are free at Botswana government clinics.
              </p>
            </div>

            <div className="w-full sm:w-48 shrink-0">
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-right text-[11px] font-mono font-bold text-emerald-800 mt-1">
                {progressPercent}% Protected
              </div>
            </div>
          </div>

          {/* Timeline Milestones Cards */}
          <div className="space-y-4">
            {BOTSWANA_EPI_SCHEDULE.map((milestone, idx) => {
              const isCompleted = profile.completedVaccineIds.includes(milestone.id);
              const isDueNow = !isCompleted && childAgeWeeks >= milestone.ageDueWeeks && (
                idx === BOTSWANA_EPI_SCHEDULE.length - 1 || childAgeWeeks < BOTSWANA_EPI_SCHEDULE[idx + 1].ageDueWeeks
              );
              const isOverdue = !isCompleted && childAgeWeeks > milestone.ageDueWeeks + 4;

              return (
                <div 
                  key={milestone.id}
                  className={`rounded-3xl border p-5 sm:p-6 transition-all ${
                    isCompleted 
                      ? 'bg-emerald-50/40 border-emerald-200 shadow-2xs' 
                      : isDueNow 
                      ? 'bg-amber-50/50 border-amber-300 shadow-xs ring-2 ring-amber-400/30' 
                      : isOverdue 
                      ? 'bg-rose-50/40 border-rose-300' 
                      : 'bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 flex-1">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleVaccineCompleted(milestone.id)}
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                          isCompleted 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'border-slate-300 hover:border-emerald-600 bg-white'
                        }`}
                        title={isCompleted ? "Click to uncheck" : "Click to mark as received at clinic"}
                      >
                        {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            {currentLang === 'tn' ? milestone.ageDueLabelTn : milestone.ageDueLabelEn}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500 font-medium">
                            {milestone.routeOfAdministration}
                          </span>
                        </div>

                        <h4 className={`text-base font-bold transition-colors ${
                          isCompleted ? 'text-emerald-950 line-through opacity-85' : 'text-slate-900'
                        }`}>
                          {milestone.vaccineName}
                        </h4>

                        <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                          <strong>Prevents:</strong> {currentLang === 'tn' ? milestone.preventsTn : milestone.preventsEn}
                        </p>

                        <div className="pt-2 text-xs text-slate-600 flex items-start gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{currentLang === 'tn' ? milestone.clinicalImportanceTn : milestone.clinicalImportanceEn}</span>
                        </div>

                        <div className="text-[11px] text-slate-500 italic pt-1">
                          <strong>Nurse Guidance:</strong> {currentLang === 'tn' ? milestone.sideEffectsNoticeTn : milestone.sideEffectsNoticeEn}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                        : isDueNow 
                        ? 'bg-amber-500 text-slate-950 animate-pulse' 
                        : isOverdue 
                        ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isCompleted ? 'Received' : isDueNow ? 'Due Now at Clinic' : isOverdue ? 'Overdue - Catch Up' : 'Upcoming'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Weaning & Traditional Nutrition Guide */}
      {activeTabSection === 'nutrition' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Traditional Botswana Infant Weaning (Go Kgwisa Lesea)
              </h3>
              <p className="text-xs text-slate-500">
                MoH nutrition policy: Exclusive breastfeeding for the first 6 months, followed by nutrient-dense local foods.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-emerald-950">
                1. Fortified Sorghum Porridge (Motogo)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prepare soft sorghum porridge enriched with 1 teaspoon of ground roasted peanuts or a drop of vegetable oil to boost energy density without excessive bulk.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-emerald-950">
                2. Mashed Beans & Pumpkin (Dinawa & Lephutse)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cooked indigenous cowpeas (*dinawa*) mashed with yellow sweet potato or pumpkin provide essential iron, vitamin A, and plant protein for healthy brain growth.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-emerald-950">
                3. Clean Water & Zero Sugary Juices
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Offer cooled boiled water in an open cup. Never introduce sweetened carbonated sodas, commercial boxed juices, or raw unboiled cow milk before age 1.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Missed Dose Catch-Up Guide */}
      {activeTabSection === 'catchup' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Missed a Clinic Appointment? Safe Catch-Up Rules
              </h3>
              <p className="text-xs text-slate-500">
                Never start the vaccination series over from the beginning. Simply continue where you left off.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950">
              <strong className="block font-bold mb-1">Golden Rule of Botswana EPI:</strong>
              No matter how late a child receives a dose, previous doses still count towards immunity. The body retains immune memory; you do not need to restart from birth.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">What to bring to the clinic:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Your physical Green "Road to Health" card (Bukana)</li>
                  <li>Child's birth certificate or hospital birth notification</li>
                  <li>Any prescription or medication the child is currently taking</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900">Mild illness is NOT a reason to delay:</h4>
                <p className="text-slate-600">
                  A minor runny nose, mild cold, or slight teething temperature is safe for immunization. Only postpone if the child has a high fever requiring hospital admission.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
