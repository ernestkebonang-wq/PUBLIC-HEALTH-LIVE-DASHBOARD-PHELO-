import React, { useState } from 'react';
import { 
  Stethoscope, 
  Building2, 
  BookOpen, 
  Activity, 
  PhoneCall, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  Video,
  Sparkles,
  Layers,
  Compass,
  Pill,
  Droplet,
  Baby
} from 'lucide-react';
import { LanguageCode } from '../types';
import { UI_STRINGS } from '../data/languages';
import { InteractiveAnatomyExplorer } from './InteractiveAnatomyExplorer';
import { BotswanaHealthCorridorMap } from './BotswanaHealthCorridorMap';
import { BotswanaChoroplethMap } from './BotswanaChoroplethMap';
import { ECGHeartbeatBackground } from './ECGHeartbeatBackground';
import { PHELOLogo } from './PHELOLogo';
import { DailyHealthInsightWidget } from './DailyHealthInsightWidget';

interface HomeViewProps {
  currentLang: LanguageCode;
  onNavigateTab: (tab: string, careRouteType?: string) => void;
  onOpenEmergency: () => void;
  onOpenVideoHub?: () => void;
  onOpenBrandGuide?: () => void;
  isLivingMode?: boolean;
  userDistrict?: string;
}

const HERO_IMAGE_STORIES = [
  {
    id: 'community',
    src: '/src/assets/images/botswana_community_health_1790159651323.jpg',
    tagEn: 'Community Healthcare in Action',
    tagTn: 'Tlhokomelo ya Selegae ya Botsogo',
    captionEn: 'Compassionate primary consultation between a healthcare worker and local family under morning sunlight.',
    captionTn: 'Tlhatlhobo le therisano ya botsogo le mme le ngwana gaufi le tleliniki ya selegae.'
  },
  {
    id: 'nature',
    src: '/src/assets/images/botswana_nature_wellness_1790159662795.jpg',
    tagEn: 'Ecological Health & Vitality',
    tagTn: 'Tikologo le Metsi a Pula',
    captionEn: 'Pristine Okavango Delta waterways: connecting environmental balance, clean water, and community wellness.',
    captionTn: 'Metsi a a phepa a Okavango: motheo wa botsogo, tshireletso ya tikologo le boitekanelo.'
  },
  {
    id: 'hospital',
    src: '/src/assets/images/botswana_hospital_care_1790159682597.jpg',
    tagEn: 'Clinical Excellence & Technology',
    tagTn: 'Bokgoni jwa Bongaka & Thekenoloji',
    captionEn: 'Botswana medical doctors and nursing teams coordinating real-time patient charts on digital tablets.',
    captionTn: 'Dingaka le baoki ba sekaseka dintlha tsa balwetse ka thekenoloji ya sesha mo sepateleng.'
  },
  {
    id: 'ecosystem',
    src: '/src/assets/images/health_ecosystem_3d_1790159694724.jpg',
    tagEn: '3D Connected Health Ecosystem',
    tagTn: 'Thulaganyo e e Bofagantsweng ya Botsogo',
    captionEn: 'Interactive public health intelligence linking individual symptoms to national clinical corridors.',
    captionTn: 'Kitso ya botsogo e e bofaganyang matshwao a molwetse le ditsela tsa kalafo mo Botswana.'
  }
];

export const HomeView: React.FC<HomeViewProps> = ({
  currentLang,
  onNavigateTab,
  onOpenEmergency,
  onOpenVideoHub,
  onOpenBrandGuide,
  isLivingMode = true,
  userDistrict,
}) => {
  const t = UI_STRINGS[currentLang] || UI_STRINGS.en;
  const [activeHeroImageIndex, setActiveHeroImageIndex] = useState(0);
  const activeStory = HERO_IMAGE_STORIES[activeHeroImageIndex];

  return (
    <div className="space-y-10 sm:space-y-14 pb-16 sm:pb-24 relative">
      {/* SUBTLE MEDICAL ECG HEARTBEAT BACKGROUND LAYER */}
      <ECGHeartbeatBackground isLivingMode={isLivingMode} />

      {/* EMERGENCY DISPATCH TOP BAR STRIP */}
      <section aria-label="Emergency quick access" className="bg-rose-900 text-white shadow-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-300 animate-pulse shrink-0" />
            <span className="font-semibold">
              {currentLang === 'tn' ? 'Kemo ya Potlako ya Botsogo:' : 'Medical Emergency in Botswana?'}
            </span>
            <span className="hidden sm:inline text-rose-200">
              {currentLang === 'tn' 
                ? 'Leletsa 997 (Ambulense ya Puso), 992 (MRI Poraefete) kgotsa 112 mo mogaleng wa letheka.' 
                : 'Call 997 for Gov Ambulance, 992 for MRI Private EMS, or 112 toll-free.'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:997"
              className="px-3 py-1 bg-white text-rose-900 hover:bg-rose-50 rounded-md text-xs font-bold transition-colors whitespace-nowrap shadow-2xs"
            >
              Call 997
            </a>
            <a
              href="tel:992"
              className="px-3 py-1 bg-rose-950 hover:bg-black text-rose-100 rounded-md text-xs font-bold transition-colors whitespace-nowrap border border-rose-700"
            >
              992 (MRI)
            </a>
            <button
              onClick={onOpenEmergency}
              className="px-3 py-1 bg-rose-800 hover:bg-rose-700 text-white rounded-md text-xs font-semibold transition-colors whitespace-nowrap"
            >
              {currentLang === 'tn' ? 'Kaelo ya Potlako' : 'Emergency Guide'}
            </button>
          </div>
        </div>
      </section>

      {/* IMMERSIVE HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mission, Value Proposition & Action Triggers */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onOpenBrandGuide}
                className="flex items-center gap-2 text-xs font-semibold text-teal-900 bg-teal-50/90 hover:bg-teal-100 px-3 py-1 rounded-full border border-teal-200/90 transition-colors shadow-2xs group"
                title="View Official PHELO Brand Identity & Visual Guidelines"
              >
                <PHELOLogo variant="icon" size="xs" />
                <span>Living Health Environment</span>
                <span aria-hidden="true" className="text-teal-400">·</span>
                <span className="text-teal-700 font-bold group-hover:text-teal-950">Brand Identity</span>
              </button>
              <span className="hidden sm:inline text-xs text-slate-500 font-medium">
                Botswana Connected Health Ecosystem
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.12] text-balance">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Core Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('triage')}
                className="px-6 py-3.5 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl shadow-sm text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-[48px]"
              >
                <Stethoscope className="w-5 h-5 text-teal-200" />
                <span>{t.startTriageCta}</span>
                <ArrowRight className="w-4 h-4 text-teal-200" />
              </button>

              <button
                onClick={() => onNavigateTab('facilities')}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors min-h-[48px] shadow-2xs"
              >
                <Building2 className="w-5 h-5 text-slate-600" />
                <span>{t.findFacility}</span>
              </button>

              {onOpenVideoHub && (
                <button
                  onClick={onOpenVideoHub}
                  className="px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors min-h-[48px]"
                >
                  <Video className="w-4 h-4 text-emerald-700" />
                  <span>Clinical Video Hub</span>
                </button>
              )}
            </div>

            {/* Accountless & Privacy Reassurance */}
            <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800">Accountless & Private by Design:</strong>{' '}
                {t.accountlessNotice}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Documentary & Environment Story Switcher */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[16/11] bg-slate-950 group">
              <img
                src={activeStory.src}
                alt={activeStory.captionEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="eager"
              />

              {/* Environmental Vignette & Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-[11px] font-bold uppercase tracking-wider text-teal-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-teal-300" />
                  <span>{currentLang === 'tn' ? activeStory.tagTn : activeStory.tagEn}</span>
                </div>
                <p className="text-xs text-slate-200 leading-snug max-w-md">
                  {currentLang === 'tn' ? activeStory.captionTn : activeStory.captionEn}
                </p>

                {/* Subtle Image Story Dots */}
                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-white/20">
                  {HERO_IMAGE_STORIES.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => setActiveHeroImageIndex(idx)}
                      aria-label={`View story ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeHeroImageIndex
                          ? 'w-6 bg-teal-400'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-slate-300 ml-auto font-mono">
                    {activeHeroImageIndex + 1} / {HERO_IMAGE_STORIES.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVING COMMUNITY HEALTH PULSE METRICS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 rounded-3xl p-5 sm:p-6 text-white shadow-md border border-teal-800/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-teal-800/60">
            <div className="pt-2 sm:pt-0 sm:px-3 first:px-0">
              <div className="text-xs text-teal-300 font-medium">Verified Facilities</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
                28+
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Public clinics, district hospitals & private centers
              </div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-3">
              <div className="text-xs text-emerald-300 font-medium">Health Corridors</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
                5 Regional
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Connected referral & trauma dispatch routes
              </div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-3">
              <div className="text-xs text-teal-300 font-medium">Toll-Free Emergency Lines</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
                997 · 992 · 112
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Gov EMS, MRI Private & Lifeline 0800 600 740
              </div>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-3">
              <div className="text-xs text-teal-300 font-medium">Surveillance Standard</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
                MoH IDSR
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Anonymized syndromic early-warning alignment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY HEALTH INSIGHT: CONTEXTUAL PUBLIC HEALTH TRENDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DailyHealthInsightWidget
          currentLang={currentLang}
          userDistrict={userDistrict}
          onNavigateTab={onNavigateTab}
        />
      </section>

      {/* CORE 4-PILLAR PATHWAYS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {currentLang === 'tn' ? 'Tsamaiso ya Ditirelo tsa PHELO' : 'Essential Healthcare Pathways'}
          </h2>
          <p className="text-xs text-slate-500">
            {currentLang === 'tn' ? 'Tlhopha se o se tlhokang gompieno' : 'Select what you need clinical guidance on right now'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Triage & Care Router */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-teal-300 transition-all shadow-xs card-spatial">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-3.5">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'tn' ? '1. Triage & Kaelo' : '1. Triage & Care Router'}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {currentLang === 'tn'
                  ? 'Tlhatlhoba matshwao go bona gore a o tshwanetse go ya kwa kokelwaneng, sepateleng sa kgaolo kgotsa go itapolosa.'
                  : 'Assess clinical urgency and find the exact care tier: 24h clinic, primary clinic, or referral hospital.'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('triage')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 pt-2 border-t border-slate-100"
            >
              <span>{t.startTriageCta}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Facilities */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-teal-300 transition-all shadow-xs card-spatial">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center mb-3.5">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'tn' ? '2. Ditleliniki & Dipatela' : '2. Facility Directory'}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {currentLang === 'tn'
                  ? 'Bona ditleliniki tsa 24h, dipatela tsa puso (PMH, Nyangabgwe) le tsa poraefete tse di dirisang Medical Aid.'
                  : 'Browse authenticated 24/7 clinics, public district hospitals, and private centers (Bokamoso, Sidilega, Life GPH).'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('facilities')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-950 pt-2 border-t border-slate-100"
            >
              <span>{t.findFacility}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Essential Medicines Stock Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-teal-300 transition-all shadow-xs card-spatial">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3.5">
                <Pill className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'tn' ? '3. Polokelo ya Melemo' : '3. Essential Medicines Tracker'}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {currentLang === 'tn'
                  ? 'Bona fa melemo ya madi a matona, sukiri, asma le malaria e leng teng mo ditleliniking pele o ya go e tsaya.'
                  : 'Track live dispensary stock for chronic hypertension, diabetes, asthma, malaria, and pediatric rehydration across clinics.'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('medicines')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 pt-2 border-t border-slate-100"
            >
              <span>{currentLang === 'tn' ? 'Batla Polokelo ya Melemo' : 'Check Dispensary Stock'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4: National Blood Bank Reserves & Donor Hub */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-rose-300 transition-all shadow-xs card-spatial">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-3.5">
                <Droplet className="w-5 h-5 fill-rose-600 text-rose-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'tn' ? '4. Madi a Botshelo (NBTS)' : '4. National Blood Reserves'}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {currentLang === 'tn'
                  ? 'Bona tlhaelo ya madi mo dipateleng tse dikgolo, kopo ya potlako ya O-negative le mafelo a go aba madi.'
                  : 'Monitor live hospital blood reserves at PMH and Nyangabgwe, review universal O-negative shortages, and pledge a donation.'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('blood_bank')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 hover:text-rose-950 pt-2 border-t border-slate-100"
            >
              <span>{currentLang === 'tn' ? 'Bona Selekanyo sa Madi' : 'View Blood Reserves & Pledge'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 5: Bukana ya Masea (Under-5 Companion) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-emerald-300 transition-all shadow-xs card-spatial">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3.5">
                <Baby className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'tn' ? '5. Bukana ya Masea' : '5. Bukana ya Masea Companion'}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {currentLang === 'tn'
                  ? 'Thulaganyo ya mekento ya ngwana (EPI), go tlhola kgolo, dijo tsa selegae tsa motogo le dikaelo tsa go tsaya mokento o o fetileng.'
                  : 'Digital Road-to-Health companion: track EPI vaccine milestones, infant weaning nutrition, and missed dose clinic catch-up.'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('bukana')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 pt-2 border-t border-slate-100"
            >
              <span>{currentLang === 'tn' ? 'Bula Bukana ya Ngwana' : 'Open Under-5 Card Companion'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 6: Approved Health Protocols & Clinical Video Hub */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-purple-300 transition-all shadow-xs card-spatial">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-3.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'tn' ? '6. Dikaelo & Dithuto tsa Video' : '6. Protocols & Video Hub'}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {currentLang === 'tn'
                  ? 'Motswako wa ORS, tshireletso ya malaria, kalafi ya noga le dithuto tsa video tsa kumo ya potlako mo gae.'
                  : 'Step-by-step MoH clinical protocols on home ORS, snakebites, maternal emergency signs, and clinical video demonstrations.'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('health_info')}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 hover:text-purple-950 pt-2 border-t border-slate-100"
            >
              <span>{t.viewApprovedGuides}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 7: Remote Consultation Portal (PHELO TeleHealth) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-teal-400 transition-all shadow-xs card-spatial sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-teal-900/5 via-sky-900/5 to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-900 mb-1">
                    <ShieldCheck className="w-3 h-3 text-teal-700" />
                    <span>MoH TeleHealth Standard · 10 Districts</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentLang === 'tn' ? '7. Therisano ya Kgakala le Dingaka (TeleHealth)' : '7. Remote Consultation Portal (Virtual Care)'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    {currentLang === 'tn'
                      ? 'Beela nako ya therisano le ngaka kgotsa mooki wa kgaolo ya gago ka video, mogala o o botlhofo wa maranyane, kgotsa thulaganyo ya go founelwa mahala ke tleliniki.'
                      : 'Schedule virtual appointments with certified physicians, nurse-midwives, and paediatricians in your district. Choose from HD video, low-data audio, or toll-free clinic callbacks.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab('telehealth')}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-xs"
              >
                <span>{currentLang === 'tn' ? 'Batla Ngaka & Beela Nako' : 'Book Virtual Consult'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3D INTERACTIVE HEALTH SYSTEMS & ANATOMY VISUALIZER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveAnatomyExplorer
          currentLang={currentLang}
          onNavigateToTriage={() => onNavigateTab('triage')}
        />
      </section>

      {/* D3 INTERACTIVE BOTSWANA DISTRICTS PUBLIC HEALTH CHOROPLETH MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BotswanaChoroplethMap
          currentLang={currentLang}
          onNavigateToSurveillance={(districtName) => onNavigateTab('surveillance_matrix', districtName)}
          onNavigateToLifestyleFeed={(districtName) => onNavigateTab('surveillance_feed', districtName)}
          onNavigateToFacilities={(districtName) => onNavigateTab('facilities', districtName)}
        />
      </section>

      {/* 3D BOTSWANA NATIONAL HEALTH CORRIDORS MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BotswanaHealthCorridorMap
          currentLang={currentLang}
          onNavigateToFacilities={(tierFilter) => onNavigateTab('facilities', tierFilter)}
        />
      </section>

      {/* PUBLIC HEALTH SURVEILLANCE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl text-white overflow-hidden shadow-lg border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="p-6 sm:p-8 lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                <Activity className="w-4 h-4" />
                <span>Care First · Intelligence Second</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Turning Community Symptoms into Timely Public Health Intelligence
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Early symptom signals reported by citizens enable District Health Management Teams (DHMT) to detect unusual disease clusters before formal hospital admissions surge.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigateTab('surveillance_feed')}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  <span>{currentLang === 'tn' ? 'Dikaelo tsa Botshelo jwa Kgaolo' : 'Regional Lifestyle Feed'}</span>
                </button>

                <button
                  onClick={() => onNavigateTab('surveillance_matrix')}
                  className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>{currentLang === 'tn' ? 'Sekaseka Dipalo tsa IDSR' : 'Surveillance Telemetry Matrix'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400">
                  Strictly Anonymized · Zero PII
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 h-52 sm:h-64 lg:h-full relative overflow-hidden bg-slate-800">
              <img
                src="/src/assets/images/public_health_surveillance_1790157223275.jpg"
                alt="Epidemiologists reviewing district syndromic health mapping"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL SAFETY FOOTNOTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 bg-slate-100 rounded-2xl text-[11px] text-slate-600 flex items-start gap-2.5 leading-relaxed border border-slate-200">
          <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <strong>Clinical Safety Guarantee:</strong> {t.clinicalNotice} Emergency numbers and clinical protocols conform to Botswana Ministry of Health primary healthcare policies.
          </div>
        </div>
      </section>
    </div>
  );
};
