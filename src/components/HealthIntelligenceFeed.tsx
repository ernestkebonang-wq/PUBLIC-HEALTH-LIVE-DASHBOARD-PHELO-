import React, { useState, useMemo, useEffect } from 'react';
import { 
  Activity, 
  MapPin, 
  CheckCircle2, 
  Circle, 
  Filter, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  Share2, 
  Check, 
  Droplets, 
  Sun, 
  Home, 
  Utensils, 
  Moon, 
  Users, 
  Clock, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { LanguageCode, LifestyleCategory, LifestyleAdjustment } from '../types';
import { BOTSWANA_DISTRICTS } from '../data/languages';
import { 
  getAggregatedDistrictIntelligence, 
  loadCheckedAdjustments, 
  saveCheckedAdjustment 
} from '../services/healthIntelligenceService';

interface HealthIntelligenceFeedProps {
  currentLang: LanguageCode;
  initialDistrict?: string;
  onNavigateTab?: (tab: string, payload?: string) => void;
  compact?: boolean;
}

export const HealthIntelligenceFeed: React.FC<HealthIntelligenceFeedProps> = ({
  currentLang,
  initialDistrict = 'All',
  onNavigateTab,
  compact = false,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    if (initialDistrict && initialDistrict !== 'All') {
      const match = BOTSWANA_DISTRICTS.find(d => 
        d.toLowerCase().includes(initialDistrict.toLowerCase()) || 
        initialDistrict.toLowerCase().includes(d.toLowerCase())
      );
      return match || initialDistrict;
    }
    return 'Ngamiland (Maun)'; // Default to active cluster to immediately show contextual power
  });

  const [selectedCategory, setSelectedCategory] = useState<LifestyleCategory | 'all'>('all');
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCheckedMap(loadCheckedAdjustments());
  }, []);

  useEffect(() => {
    if (initialDistrict && initialDistrict !== 'All') {
      setSelectedDistrict(initialDistrict);
    }
  }, [initialDistrict]);

  const profile = useMemo(() => {
    return getAggregatedDistrictIntelligence(selectedDistrict);
  }, [selectedDistrict]);

  const filteredAdjustments = useMemo(() => {
    if (selectedCategory === 'all') {
      return profile.lifestyleAdjustments;
    }
    return profile.lifestyleAdjustments.filter(adj => adj.category === selectedCategory);
  }, [profile, selectedCategory]);

  const totalAdjustments = profile.lifestyleAdjustments.length;
  const completedCount = profile.lifestyleAdjustments.filter(adj => !!checkedMap[adj.id]).length;
  const completionPercentage = totalAdjustments > 0 ? Math.round((completedCount / totalAdjustments) * 100) : 0;

  const handleToggleCheck = (id: string) => {
    const nextState = !checkedMap[id];
    const updated = saveCheckedAdjustment(id, nextState);
    setCheckedMap(updated);
  };

  const handleShareChecklist = async () => {
    const listText = profile.lifestyleAdjustments.map((adj, i) => {
      const isDone = checkedMap[adj.id] ? '[x]' : '[ ]';
      const title = currentLang === 'tn' ? adj.title.tn : adj.title.en;
      const action = currentLang === 'tn' ? adj.lifestyleAction.tn : adj.lifestyleAction.en;
      return `${i + 1}. ${isDone} ${title}\n   ${action}`;
    }).join('\n\n');

    const header = currentLang === 'tn'
      ? `*PHELO Tshedimosetso ya Botsogo ya ${profile.district}*\nDiphetoho tsa botshelo tsa gompieno go ya ka dipalo tsa ditleliniki:\n\n`
      : `*PHELO Health Intelligence Feed: ${profile.district}*\nDaily non-clinical lifestyle adjustments based on regional surveillance data:\n\n`;

    const footer = `\n\nActive Status: ${profile.surveillanceSummary.surveillanceStatus.toUpperCase()} (${profile.surveillanceSummary.deltaPercent > 0 ? '+' : ''}${profile.surveillanceSummary.deltaPercent}%)\nTracked on PHELO Botswana Health Platform (https://phelo.bw)`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(header + listText + footer);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const getCategoryIcon = (cat: LifestyleCategory) => {
    switch (cat) {
      case 'hydration_water':
        return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'outdoor_exposure':
        return <Sun className="w-4 h-4 text-amber-600" />;
      case 'home_environment':
        return <Home className="w-4 h-4 text-teal-600" />;
      case 'nutrition_diet':
        return <Utensils className="w-4 h-4 text-emerald-600" />;
      case 'sleep_rest':
        return <Moon className="w-4 h-4 text-purple-600" />;
      case 'family_childcare':
        return <Users className="w-4 h-4 text-rose-600" />;
    }
  };

  const getCategoryLabel = (cat: LifestyleCategory) => {
    switch (cat) {
      case 'hydration_water':
        return currentLang === 'tn' ? 'Metsi & go Nwa' : 'Hydration & Water';
      case 'outdoor_exposure':
        return currentLang === 'tn' ? 'Tsamaiso ya Letsatsi' : 'Outdoor & Sun Timing';
      case 'home_environment':
        return currentLang === 'tn' ? 'Tikologo ya Lelwapa' : 'Home & Living Space';
      case 'nutrition_diet':
        return currentLang === 'tn' ? 'Dijo tsa Selegae' : 'Daily Nutrition';
      case 'sleep_rest':
        return currentLang === 'tn' ? 'Boroko & Boitapoloso' : 'Sleep & Recovery';
      case 'family_childcare':
        return currentLang === 'tn' ? 'Bana & Batsofe' : 'Family & Childcare';
    }
  };

  const getTimeOfDayBadge = (time: string) => {
    switch (time) {
      case 'morning':
        return currentLang === 'tn' ? 'Mosong' : 'Morning Routine';
      case 'midday':
        return currentLang === 'tn' ? 'Motshegare' : 'Midday Habit';
      case 'evening':
        return currentLang === 'tn' ? 'Maitseboa' : 'Evening Habit';
      default:
        return currentLang === 'tn' ? 'Letsatsi Lotlhe' : 'All-Day Routine';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Banner: Regional Aggregation Identity */}
      <div className="p-5 sm:p-6 lg:p-7 border-b border-slate-100 bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Activity className="w-3.5 h-3.5 text-teal-300" />
                <span>{currentLang === 'tn' ? 'Tshedimosetso ya Botsogo' : 'Health Intelligence Feed'}</span>
              </span>
              <span className="text-xs text-slate-300">
                {currentLang === 'tn' ? 'Go bofaganya dipalo tsa kgaolo le matshelo a batho' : 'Linking regional surveillance telemetry to everyday lifestyle habits'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {currentLang === 'tn' 
                ? `Diphetoho tsa Botshelo tse di Ikgethileng: ${profile.district}`
                : `Targeted Non-Clinical Lifestyle Adjustments: ${profile.district}`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {currentLang === 'tn'
                ? 'Ditsela tsa go iphemela le go tokafatsa boitekanelo mo lwapeng tse di theilweng mo matshwaong a ditleliniki tsa kgaolo ya lona.'
                : 'Specific, actionable behavioral steps for households, kitchens, and daily routines tailored directly to current district epidemiological alerts.'}
            </p>
          </div>

          {/* District Switcher */}
          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-800/90 border border-teal-700/60 rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <label htmlFor="feed-district-select" className="sr-only">Choose District</label>
              <select
                id="feed-district-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-white focus:outline-hidden cursor-pointer"
              >
                <option value="Ngamiland (Maun)" className="text-slate-900">Ngamiland (Maun)</option>
                <option value="Chobe (Kasane)" className="text-slate-900">Chobe (Kasane)</option>
                <option value="Gaborone" className="text-slate-900">Gaborone</option>
                <option value="Kweneng (Molepolole)" className="text-slate-900">Kweneng (Molepolole)</option>
                <option value="Kgalagadi (Tsabong)" className="text-slate-900">Kgalagadi (Tsabong)</option>
                <option value="Central (Serowe / Palapye)" className="text-slate-900">Central (Serowe / Palapye)</option>
                <option value="All Districts" className="text-slate-900">All Botswana (National)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Aggregated Surveillance Telemetry Summary Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-teal-300 uppercase tracking-wider font-semibold block">
              {currentLang === 'tn' ? 'Matshwao a a Tlhophilweng' : 'Surveillance Signal'}
            </span>
            <span className="font-bold text-slate-100 text-sm mt-0.5 block">
              {profile.surveillanceSummary.primarySyndromeName}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              {profile.surveillanceSummary.sevenDayVolume} cases / {profile.surveillanceSummary.expectedBaseline} baseline
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-teal-300 uppercase tracking-wider font-semibold block">
              {currentLang === 'tn' ? 'Bogale jwa Phetogo' : 'Anomaly & Status'}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`font-mono text-sm font-extrabold ${
                profile.surveillanceSummary.deltaPercent > 20 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {profile.surveillanceSummary.deltaPercent > 0 ? `+${profile.surveillanceSummary.deltaPercent}%` : `${profile.surveillanceSummary.deltaPercent}%`}
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-slate-200">
                {profile.surveillanceSummary.surveillanceStatus.replace('_', ' ')}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block truncate">
              Lead: {profile.surveillanceSummary.activeInvestigationLead || 'DHMT Directorate'}
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-[10px] text-teal-300 uppercase tracking-wider font-semibold block">
              {currentLang === 'tn' ? 'Mabaka a Tikologo' : 'Environmental Correlate'}
            </span>
            <p className="text-[11px] text-slate-200 mt-0.5 leading-snug line-clamp-2">
              {currentLang === 'tn' 
                ? profile.surveillanceSummary.environmentalFactorTn 
                : profile.surveillanceSummary.environmentalFactorEn}
            </p>
          </div>
        </div>
      </div>

      {/* Progress & Category Filter Subheader */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Daily Lifestyle Defense Shield Completion */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-800 text-white font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
            {completedCount}/{totalAdjustments}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>{currentLang === 'tn' ? 'Tshireletso ya Lelwapa Gompieno' : 'Daily Household Defense Shield'}</span>
              <span className="text-[11px] text-teal-700 font-semibold font-mono">({completionPercentage}%)</span>
            </div>
            <div className="w-36 sm:w-48 h-1.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full bg-teal-700 rounded-full transition-all duration-500" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category Pills & Action Tools */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-teal-800 text-white shadow-2xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {currentLang === 'tn' ? 'Tsotlhe' : 'All Lifestyle Habits'}
          </button>

          {(['hydration_water', 'outdoor_exposure', 'home_environment', 'nutrition_diet', 'sleep_rest', 'family_childcare'] as LifestyleCategory[]).map(cat => {
            const hasItems = profile.lifestyleAdjustments.some(a => a.category === cat);
            if (!hasItems) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-teal-800 text-white shadow-2xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{getCategoryLabel(cat)}</span>
              </button>
            );
          })}

          <button
            onClick={handleShareChecklist}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs ml-auto"
            title="Share this district lifestyle checklist on WhatsApp or SMS"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{currentLang === 'tn' ? 'E Kopitswe!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
                <span>{currentLang === 'tn' ? 'Arolelana Thulaganyo' : 'Share Routine'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Adjustments Feed Cards */}
      <div className="p-4 sm:p-6 lg:p-7 space-y-4">
        {filteredAdjustments.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            {currentLang === 'tn' 
              ? 'Ga gona diphetoho tse di kgethegileng mo karolong e mo kgaolong e.'
              : 'No specific adjustments in this category for this district. Select "All Lifestyle Habits" to see recommended routines.'}
          </div>
        ) : (
          filteredAdjustments.map((adj) => {
            const isChecked = !!checkedMap[adj.id];
            return (
              <div 
                key={adj.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                  isChecked
                    ? 'bg-emerald-50/40 border-emerald-300/80 shadow-2xs'
                    : 'bg-white hover:bg-slate-50/70 border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Interactive Checkbox Toggle */}
                    <button
                      onClick={() => handleToggleCheck(adj.id)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                        isChecked 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'border-slate-300 hover:border-teal-700 bg-white'
                      }`}
                      aria-label={isChecked ? "Mark as not done today" : "Mark as applied today"}
                      title={isChecked ? "Applied today in my household" : "Click to mark as applied today"}
                    >
                      {isChecked ? <Check className="w-4 h-4 stroke-[3]" /> : null}
                    </button>

                    <div className="space-y-1.5 flex-1">
                      {/* Meta Pills: Category + Time of Day + Settlement Scope */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="font-semibold text-slate-500 flex items-center gap-1">
                          {getCategoryIcon(adj.category)}
                          <span>{getCategoryLabel(adj.category)}</span>
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="font-medium text-slate-600 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{getTimeOfDayBadge(adj.timeOfDay)}</span>
                        </span>
                        {adj.settlementScope && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-500 italic">
                              {adj.settlementScope}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className={`text-base font-bold transition-colors ${
                        isChecked ? 'text-emerald-950 line-through opacity-85' : 'text-slate-900'
                      }`}>
                        {currentLang === 'tn' ? adj.title.tn : adj.title.en}
                      </h3>

                      {/* Non-Clinical Lifestyle Action */}
                      <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                        {currentLang === 'tn' ? adj.lifestyleAction.tn : adj.lifestyleAction.en}
                      </p>

                      {/* Surveillance Rationale Connection */}
                      <div className="pt-2 mt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600 bg-slate-50/80 rounded-xl p-2.5">
                        <Activity className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800">
                            {currentLang === 'tn' ? 'Lebaka la Tshedimosetso ya Botsogo: ' : 'Surveillance Grounding: '}
                          </strong>
                          <span>
                            {currentLang === 'tn' ? adj.surveillanceRationale.tn : adj.surveillanceRationale.en}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Tag */}
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                    adj.impactLevel === 'high' 
                      ? 'bg-teal-100 text-teal-900 border border-teal-200' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {adj.impactLevel} impact
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>
            {currentLang === 'tn'
              ? 'Diphetoho tse ga di emele kalafi ya ngaka; ke dikaelo tsa boitekanelo tsa selegae.'
              : 'Specific non-clinical lifestyle adjustments to reduce exposure. For medical diagnosis, consult a local clinic.'}
          </span>
        </div>

        {onNavigateTab && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('surveillance', selectedDistrict)}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl font-semibold transition-colors flex items-center gap-1 shadow-2xs"
            >
              <span>{currentLang === 'tn' ? 'Bona Dipalo Tsotlhe' : 'Inspect Raw Surveillance'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('triage')}
              className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-bold transition-colors flex items-center gap-1 shadow-2xs"
            >
              <span>{currentLang === 'tn' ? 'Tlhatlhoba Matshwao' : 'Triage Symptoms'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
