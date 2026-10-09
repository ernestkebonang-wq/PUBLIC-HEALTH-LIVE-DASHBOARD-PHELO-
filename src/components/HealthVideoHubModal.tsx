import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download,
  Video
} from 'lucide-react';
import { LanguageCode } from '../types';

interface HealthVideoHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
}

interface VideoModule {
  id: string;
  titleEn: string;
  titleTn: string;
  duration: string;
  category: string;
  summaryEn: string;
  summaryTn: string;
  keyStepsEn: string[];
  keyStepsTn: string[];
  clinicalWarningEn: string;
  clinicalWarningTn: string;
}

const VIDEO_MODULES: VideoModule[] = [
  {
    id: 'ors_prep',
    titleEn: 'How to Prepare Life-Saving ORS at Home',
    titleTn: 'Kaelo ya go Dira Motswako wa ORS mo Gae',
    duration: '2:45 min',
    category: 'Paediatric Rehydration',
    summaryEn: 'The official MoH Botswana standard for preventing fatal dehydration in infants and children suffering from acute watery diarrhoea.',
    summaryTn: 'Tsela e e siameng ya go thibela go fela ga metsi mo baneng ba ba nang le letshololo le go tlhatsa.',
    keyStepsEn: [
      'Step 1: Thoroughly wash hands with clean running water and soap.',
      'Step 2: Measure exactly 1 Litre of clean, boiled (cooled) safe water into a clean container.',
      'Step 3: Add 6 level teaspoons of clean sugar.',
      'Step 4: Add half (0.5) level teaspoon of salt.',
      'Step 5: Stir well until completely dissolved. Administer in frequent small sips.'
    ],
    keyStepsTn: [
      'Kgato 1: Tlhapha diatla ka sesepa le metsi a a phepa a a elelang.',
      'Kgato 2: Tsaya litha e le 1 ya metsi a a bedisitsweng a bo a tsidifala.',
      'Kgato 3: Tsenya ditshwana tse 6 tse di lekanetseng tsa sukiri.',
      'Kgato 4: Tsenya halofo (0.5) ya tshwana ya letswai.',
      'Kgato 5: Tswakanya sentle go fitlhela go nyerologa. Nosa ngoana ka ditshwana tse dinnye.'
    ],
    clinicalWarningEn: 'If the child is vomiting frequently, wait 10 minutes then resume slowly with 1 teaspoon every 2 minutes. If lethargic or eyes become sunken, go directly to the nearest clinic.',
    clinicalWarningTn: 'Fa ngoana a tlhatsa, leta metsotso e le 10 o bo o tswelela ka bonya. Fa matlho a nwelang, itlhaganelele kwa tleliniking.'
  },
  {
    id: 'childhood_danger_signs',
    titleEn: 'Recognizing Severe Childhood Danger Signs (IMCI)',
    titleTn: 'Go Lemoga Matshwao a Kotsi mo Baneng (IMCI)',
    duration: '3:15 min',
    category: 'Child Health / IMCI',
    summaryEn: 'Integrated Management of Childhood Illness (IMCI) protocol for identifying when a cough or fever has progressed to severe pneumonia or sepsis.',
    summaryTn: 'Dikaelo tsa IMCI tsa go bona fa sehuba kgotsa fifi e tseneletse mo kotsing e kgolo.',
    keyStepsEn: [
      'Check breathing rate: Fast breathing (>50 breaths/min for 2-11 months, >40 for 1-5 years).',
      'Observe chest wall: Look for lower chest wall indrawing (chest moves IN when breathing IN).',
      'Assess hydration: Gently pinch skin of abdomen - skin pinch taking >2 seconds to return indicates severe dehydration.',
      'Evaluate alertness: Inability to breastfeed, abnormally sleepy, or floppy muscle tone.'
    ],
    keyStepsTn: [
      'Leba go hema: Go hema ka bofefo jo bo sa tlwaelesegang.',
      'Leba sehuba: Sehuba se tsena mo teng fa ngoana a hema.',
      'Leba letlalo: Fa o ngwatha letlalo la mpa le boe ka bonya (> metsotswana e le 2).',
      'Leba maikutlo: Ngoana o palelwa ke go anya, o feletswe ke matla kgotsa o a idibala.'
    ],
    clinicalWarningEn: 'Any single IMCI danger sign requires immediate referral to a 24-hour clinic or hospital casualty. Do not wait until morning.',
    clinicalWarningTn: 'Lotshwao lope fela lwa tse le tlhoka gore o tseye ngoana ka bonako o mo ise sepateleng.'
  },
  {
    id: 'malaria_prevention',
    titleEn: 'Malaria Fever & Bed Net Protection in Northern Botswana',
    titleTn: 'Thibelo ya Malaria & Dithebe tsa Menang kwa Bokone',
    duration: '2:20 min',
    category: 'Vector & Environmental Health',
    summaryEn: 'Critical guidelines for residents and travellers in Ngamiland, Okavango Delta, Chobe, and Boteti during the post-rainy season transmission window.',
    summaryTn: 'Dikaelo tsa thibelo ya malaria le go dirisa dithebe tsa menang mo dikgaolong tsa Ngamiland le Chobe.',
    keyStepsEn: [
      'Sleep under Long-Lasting Insecticidal Nets (LLINs) every night without exception.',
      'Ensure home walls are sprayed during national Indoor Residual Spraying (IRS) campaigns.',
      'Recognize early symptoms: High spiking fever, severe rigors (shaking chills), muscle aches.',
      'Seek Rapid Diagnostic Testing (RDT) at the clinic within 24 hours of first fever.'
    ],
    keyStepsTn: [
      'Robala ka fa tlase ga thebe ya menang (LLIN) bosigo bongwe le bongwe.',
      'Dumelela go gasiwa ga matlo ka nako ya letsholo la IRS.',
      'Lemoga fifi e e kwa godimo, go roroma le botlhoko jwa ditshika.',
      'Tsamaya ka bofefo go ya go tlhathobiwa ka RDT mo dioureng tse 24.'
    ],
    clinicalWarningEn: 'Do not take presumptive medication without a laboratory or RDT confirmation. Delay in Falciparum malaria treatment can lead to cerebral malaria within 48 hours.',
    clinicalWarningTn: 'O seka wa nwa dipilisi kwantle ga tlhatlhobo ya madi. Malaria o ka tsena mo bobokong ka bofefo.'
  },
  {
    id: 'snakebite_response',
    titleEn: 'First Aid for Snakebites in the Kalahari & Bushveld',
    titleTn: 'Thuso ya Bofefo fa o Longwa ke Noga mo Sekakeng',
    duration: '3:40 min',
    category: 'First Aid & Wildlife',
    summaryEn: 'Proven emergency protocols for venomous snakebites (Puff adder, Black mamba, Snouted cobra) common in Botswana savanna environments.',
    summaryTn: 'Se o tshwanetseng go se dira le se o SA tshwanelang go se dira fa o longwa ke noga.',
    keyStepsEn: [
      'DO: Keep the victim calm and strictly immobilize the bitten limb (splint at heart level).',
      'DO: Remove rings, tight bracelets, and tight clothing before swelling begins.',
      'DO: Call 997 or 992 or arrange immediate rapid transport to the nearest hospital.',
      'DO NOT: NEVER cut the wound, never suck the venom, and NEVER apply a tight tourniquet.',
      'DO NOT: Never apply potassium permanganate, ice, or electric shocks.'
    ],
    keyStepsTn: [
      'DIRA: Ritibatsa molwetse mme o seka wa tsamaisa leoto kgotsa lebogo le le longweng.',
      'DIRA: Rola dipalamonwana le dibenyane pele ga go ruruga go simolola.',
      'DIRA: Leletsa 997 kgotsa 992 kgotsa o mo ise sepateleng se se gaufi ka bofefo.',
      'OSEKA WA: O seka wa sega, wa monya botlhole kgotsa wa bofa ka kgole e e gagametseng.'
    ],
    clinicalWarningEn: 'All snakebite victims must be monitored in a hospital casualty for at least 24 hours for antivenom administration or airway management.',
    clinicalWarningTn: 'Molwetse o tshwanetse go bewa ka fa tlase ga tlhokomelo ya kokelo bonyane dioura tse 24.'
  }
];

export const HealthVideoHubModal: React.FC<HealthVideoHubModalProps> = ({
  isOpen,
  onClose,
  currentLang
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>('ors_prep');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(35);

  if (!isOpen) return null;

  const activeModule = VIDEO_MODULES.find(m => m.id === activeModuleId) || VIDEO_MODULES[0];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-hub-title"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-teal-400" />
            <span id="video-hub-title" className="text-xs sm:text-sm font-bold">
              {currentLang === 'tn' ? 'Dithuto tsa Ditshwantsho tsa Botsogo (MoH)' : 'Botswana Public Health Educational Media Hub'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close media hub"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Simulated High-Definition Clinical Video Player */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[16/9] shadow-lg flex flex-col justify-between p-4 text-white border border-slate-800">
            {/* Ambient visual overlay representing animated clinical instruction */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

            {/* Top info badge */}
            <div className="relative z-10 flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded-md bg-teal-500/90 text-slate-950 font-bold uppercase tracking-wider text-[10px]">
                {activeModule.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                <Clock className="w-3 h-3 text-teal-400" />
                <span>{activeModule.duration}</span>
              </span>
            </div>

            {/* Center Animated Demonstration Graphic */}
            <div className="relative z-10 my-auto text-center space-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center mx-auto backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-teal-300" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-teal-300 ml-1" />
                )}
              </div>
              <p className="text-xs font-semibold text-slate-200">
                {currentLang === 'tn' ? activeModule.titleTn : activeModule.titleEn}
              </p>
              <p className="text-[11px] text-slate-400">
                Ministry of Health & Wellness Botswana Clinical Training Standard
              </p>
            </div>

            {/* Video Player Bottom Controls */}
            <div className="relative z-10 space-y-2 pt-2">
              {/* Scrubber bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  setProgress(Math.round((clickX / rect.width) * 100));
                }}
              >
                <div 
                  className="bg-teal-400 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }} 
                />
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[10px] text-slate-400 font-mono">00:58 / {activeModule.duration}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-teal-300 font-medium">
                  <span>720p HD · Subtitles: EN / TN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module Selector Carousel */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              {currentLang === 'tn' ? 'Dithuto tse dingwe tsa Ditshwantsho:' : 'Available Health Demonstration Modules:'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VIDEO_MODULES.map(m => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveModuleId(m.id);
                    setIsPlaying(true);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    m.id === activeModuleId
                      ? 'bg-teal-50 border-teal-400 text-teal-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <div className="text-[10px] text-teal-700 font-semibold mb-0.5">{m.category}</div>
                  <div className="text-xs leading-snug truncate">{currentLang === 'tn' ? m.titleTn : m.titleEn}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step-by-Step Clinical Transcript & Action Guide */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {currentLang === 'tn' ? 'Tsamaiso ya Dikgato (Step-by-Step Instructions):' : 'Step-by-Step Clinical Procedure:'}
              </h4>
              <p className="text-xs text-slate-600 mb-3">
                {currentLang === 'tn' ? activeModule.summaryTn : activeModule.summaryEn}
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                {(currentLang === 'tn' ? activeModule.keyStepsTn : activeModule.keyStepsEn).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning alert */}
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-950 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-900">
                  {currentLang === 'tn' ? 'Ela Tlhoko:' : 'Crucial Warning:'}
                </strong>{' '}
                {currentLang === 'tn' ? activeModule.clinicalWarningTn : activeModule.clinicalWarningEn}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-500">
            Official Botswana MoH Health Promotion & Education Division
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            {currentLang === 'tn' ? 'Tswala' : 'Close Player'}
          </button>
        </div>
      </div>
    </div>
  );
};
