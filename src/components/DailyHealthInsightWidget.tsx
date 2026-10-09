import React, { useState, useMemo, useEffect } from 'react';
import { 
  Activity, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  Volume2, 
  VolumeX, 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  Bug, 
  Wind, 
  HeartPulse, 
  Baby, 
  SunMedium, 
  Copy, 
  Check,
  Building2,
  Stethoscope,
  BookOpen
} from 'lucide-react';
import { DailyHealthInsight, LanguageCode } from '../types';
import { DAILY_HEALTH_INSIGHTS, getDailyInsightsForDistrict } from '../data/dailyHealthInsights';

interface DailyHealthInsightWidgetProps {
  currentLang: LanguageCode;
  userDistrict?: string;
  onNavigateTab: (tab: string, payload?: string) => void;
}

const DISTRICT_OPTIONS = [
  { id: 'All', labelEn: 'All Botswana (National)', labelTn: 'Botswana Jotlhe (Setshaba)' },
  { id: 'Ngamiland (Maun)', labelEn: 'Ngamiland (Maun)', labelTn: 'Ngamiland (Maun)' },
  { id: 'Chobe (Kasane)', labelEn: 'Chobe (Kasane)', labelTn: 'Chobe (Kasane)' },
  { id: 'Gaborone', labelEn: 'Gaborone', labelTn: 'Gaborone' },
  { id: 'Kweneng (Molepolole)', labelEn: 'Kweneng (Molepolole)', labelTn: 'Kweneng (Molepolole)' },
  { id: 'Kgalagadi (Tsabong)', labelEn: 'Kgalagadi (Tsabong)', labelTn: 'Kgalagadi (Tsabong)' },
  { id: 'Central (Serowe / Palapye)', labelEn: 'Central (Serowe / Palapye)', labelTn: 'Central (Serowe / Palapye)' },
];

export const DailyHealthInsightWidget: React.FC<DailyHealthInsightWidgetProps> = ({
  currentLang,
  userDistrict,
  onNavigateTab,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    if (userDistrict && userDistrict !== 'All') {
      const match = DISTRICT_OPTIONS.find(d => userDistrict.includes(d.id) || d.id.includes(userDistrict));
      return match ? match.id : 'All';
    }
    return 'All';
  });

  const availableInsights = useMemo(() => {
    return getDailyInsightsForDistrict(selectedDistrict);
  }, [selectedDistrict]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Keep index within bounds when available insights change
  useEffect(() => {
    setCurrentIndex(0);
    // Stop any ongoing speech when switching
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedDistrict]);

  const currentInsight: DailyHealthInsight = availableInsights[currentIndex] || DAILY_HEALTH_INSIGHTS[0];

  const handleNext = () => {
    if (availableInsights.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % availableInsights.length);
  };

  const handlePrev = () => {
    if (availableInsights.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + availableInsights.length) % availableInsights.length);
  };

  // Copy health advice to clipboard
  const handleCopyShare = async () => {
    const textToShare = currentLang === 'tn' 
      ? `${currentInsight.shareableSummaryText.tn}\n\n— PHELO Botswana Health Platform (https://phelo.bw)`
      : `${currentInsight.shareableSummaryText.en}\n\n— PHELO Botswana Health Platform (https://phelo.bw)`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToShare);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.error('Clipboard copy error', err);
    }
  };

  // Text to speech narration
  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const titleText = currentLang === 'tn' ? currentInsight.title.tn : currentInsight.title.en;
    const headline = currentLang === 'tn' ? currentInsight.headlineContext.tn : currentInsight.headlineContext.en;
    const adviceList = currentLang === 'tn' ? currentInsight.actionAdvice.tn : currentInsight.actionAdvice.en;
    const fullSpeech = `${titleText}. ${headline}. Key guidance: ${adviceList.join('. ')}`;

    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = currentLang === 'tn' ? 'en-ZA' : 'en-GB';

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Category Icon Resolver
  const getTopicIcon = (topic: string) => {
    switch (topic) {
      case 'waterborne':
        return <Droplets className="w-5 h-5 text-sky-600" />;
      case 'vector':
        return <Bug className="w-5 h-5 text-amber-600" />;
      case 'respiratory':
        return <Wind className="w-5 h-5 text-teal-600" />;
      case 'chronic':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'maternal':
        return <Baby className="w-5 h-5 text-emerald-600" />;
      case 'environmental':
        return <SunMedium className="w-5 h-5 text-orange-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-600" />;
    }
  };

  // Severity styling
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'alert':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500 animate-pulse',
          labelEn: 'Active Public Health Alert',
          labelTn: 'Tlhagiso ya Potlako ya Botsogo'
        };
      case 'seasonal':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          labelEn: 'Seasonal Health Advisory',
          labelTn: 'Tlhagiso ya Phetogo ya Sehula'
        };
      case 'advisory':
        return {
          bg: 'bg-orange-50 text-orange-800 border-orange-200',
          dot: 'bg-orange-500',
          labelEn: 'Environmental Advisory',
          labelTn: 'Kaelo ya Tikologo'
        };
      case 'preventive':
      default:
        return {
          bg: 'bg-teal-50 text-teal-800 border-teal-200',
          dot: 'bg-teal-500',
          labelEn: 'Preventive Health Intelligence',
          labelTn: 'Kitso ya Boitekanelo le Thibelo'
        };
    }
  };

  const severityInfo = getSeverityBadge(currentInsight.severity);

  return (
    <section 
      aria-label="Daily Health Insight"
      className="bg-white rounded-3xl border border-teal-900/10 shadow-md overflow-hidden relative"
    >
      {/* Subtle top medical corridor accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-teal-700 via-emerald-600 to-sky-600" />

      {/* Header bar: Title, Live Date, and District Selector */}
      <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-teal-100/80 text-teal-900 border border-teal-200">
                <Activity className="w-3.5 h-3.5 text-teal-700" />
                <span>{currentLang === 'tn' ? 'Kitso ya Botsogo ya Letsatsi' : 'Daily Health Insight'}</span>
              </span>

              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${severityInfo.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${severityInfo.dot}`} />
                <span>{currentLang === 'tn' ? severityInfo.labelTn : severityInfo.labelEn}</span>
              </span>

              <span className="text-xs text-slate-500 font-medium">
                {currentLang === 'tn' ? 'Diphetoho tsa botsogo tsa selegae' : 'Ground-level Botswana health trends'}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {currentLang === 'tn' ? currentInsight.title.tn : currentInsight.title.en}
            </h2>
          </div>

          {/* District selector pills & Carousel navigation */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <label htmlFor="insight-district-select" className="sr-only">Select District</label>
                <select
                  id="insight-district-select"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="bg-transparent border-none text-xs font-bold text-slate-900 focus:outline-hidden cursor-pointer pr-1"
                >
                  {DISTRICT_OPTIONS.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {currentLang === 'tn' ? dist.labelTn : dist.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pagination Controls */}
            {availableInsights.length > 1 && (
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                <button
                  onClick={handlePrev}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                  aria-label="Previous insight"
                  title="Previous daily health insight"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono font-bold text-slate-600 px-1">
                  {currentIndex + 1}/{availableInsights.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                  aria-label="Next insight"
                  title="Next daily health insight"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="p-5 sm:p-6 lg:p-7 space-y-6">
        {/* Real Epidemiological Signal Origin Box */}
        <div className="bg-gradient-to-r from-teal-900/5 via-slate-50 to-emerald-900/5 border border-teal-900/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
              {getTopicIcon(currentInsight.topic)}
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                <span>{currentLang === 'tn' ? 'Motheo wa Tshedimosetso ya Setshaba' : 'Contextual Surveillance Trigger'}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-normal">{currentInsight.district}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed font-medium">
                {currentLang === 'tn' ? currentInsight.headlineContext.tn : currentInsight.headlineContext.en}
              </p>
              <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                <span>
                  <strong>Source:</strong> {currentInsight.trendSignal.source}
                </span>
              </div>
            </div>
          </div>

          {/* Metric Pill if present */}
          {currentInsight.trendSignal.statValue && (
            <div className="shrink-0 bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 text-center shadow-2xs self-stretch sm:self-auto flex sm:flex-col items-center justify-between sm:justify-center gap-2 sm:gap-0.5">
              <span className="text-lg sm:text-xl font-extrabold text-teal-950 font-mono">
                {currentInsight.trendSignal.statValue}
              </span>
              <span className="text-[10px] text-slate-500 font-medium max-w-[120px] leading-tight">
                {currentInsight.trendSignal.statLabel}
              </span>
            </div>
          )}
        </div>

        {/* Actionable Clinical & Preventive Guidance */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{currentLang === 'tn' ? 'Dikgato tsa Botlhokwa tsa Letsatsi' : 'Actionable Health Guidance for Today'}</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">
              {currentLang === 'tn' ? 'Dikaelo tsa Ministry of Health' : 'MoH Botswana Aligned'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(currentLang === 'tn' ? currentInsight.actionAdvice.tn : currentInsight.actionAdvice.en).map((advice, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/80 hover:bg-teal-50/50 border border-slate-200/80 hover:border-teal-200/80 rounded-xl p-3.5 flex items-start gap-3 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-teal-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-[13px] text-slate-800 leading-snug">
                  {advice}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Did You Know? Public Health Fact Box */}
        {currentInsight.didYouKnow && (
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3 text-emerald-950">
            <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="text-emerald-900">
                {currentLang === 'tn' ? 'A o ne o itse? ' : 'Did You Know? '}
              </strong>
              <span>
                {currentLang === 'tn' ? currentInsight.didYouKnow.tn : currentInsight.didYouKnow.en}
              </span>
            </div>
          </div>
        )}

        {/* Action Toolbar: Primary Protocol/Triage jump + Share/Audio tools */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Primary Action Button */}
            {currentInsight.quickAction && (
              <button
                onClick={() => {
                  if (currentInsight.quickAction) {
                    onNavigateTab(currentInsight.quickAction.targetTab, currentInsight.quickAction.targetPayload);
                  }
                }}
                className="px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition-transform active:scale-[0.98] flex items-center gap-2 shadow-2xs"
              >
                {currentInsight.quickAction.type === 'protocol' && <BookOpen className="w-3.5 h-3.5 text-teal-200" />}
                {currentInsight.quickAction.type === 'facility' && <Building2 className="w-3.5 h-3.5 text-teal-200" />}
                {currentInsight.quickAction.type === 'triage' && <Stethoscope className="w-3.5 h-3.5 text-teal-200" />}
                {currentInsight.quickAction.type === 'surveillance' && <Activity className="w-3.5 h-3.5 text-teal-200" />}
                <span>{currentLang === 'tn' ? currentInsight.quickAction.labelTn : currentInsight.quickAction.labelEn}</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-200" />
              </button>
            )}

            {/* Jump to District Surveillance */}
            <button
              onClick={() => onNavigateTab('surveillance', currentInsight.district)}
              className="px-3 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Activity className="w-3.5 h-3.5 text-teal-700" />
              <span>{currentLang === 'tn' ? 'Tshedimosetso ya Kgaolo' : 'View District Signal'}</span>
            </button>

            {/* Open Lifestyle Intelligence Feed */}
            <button
              onClick={() => onNavigateTab('surveillance_feed', currentInsight.district)}
              className="px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{currentLang === 'tn' ? 'Dikaelo tsa Botshelo' : 'Lifestyle Habits Feed'}</span>
            </button>
          </div>

          {/* Social / Accessibility Tools: Copy / Share & Audio narration */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleToggleSpeech}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border shadow-2xs ${
                isSpeaking 
                  ? 'bg-rose-50 text-rose-800 border-rose-200' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title={isSpeaking ? "Stop read-aloud" : "Listen to health guidance aloud"}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-700" />
                  <span>{currentLang === 'tn' ? 'Emisa' : 'Stop Audio'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>{currentLang === 'tn' ? 'Reetsa' : 'Listen'}</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyShare}
              className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
              title="Copy health tip to share on WhatsApp or SMS"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">{currentLang === 'tn' ? 'E Kopitswe!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>{currentLang === 'tn' ? 'Arolelana' : 'Share Tip'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
