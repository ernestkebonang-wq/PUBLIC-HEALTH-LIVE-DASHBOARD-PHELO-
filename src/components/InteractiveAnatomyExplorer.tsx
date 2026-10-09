import React, { useState } from 'react';
import { 
  Heart, 
  Wind, 
  Droplets, 
  Baby, 
  Brain, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle,
  Activity,
  Layers
} from 'lucide-react';
import { LanguageCode } from '../types';

interface InteractiveAnatomyExplorerProps {
  currentLang: LanguageCode;
  onNavigateToTriage: () => void;
}

interface HealthSystem {
  id: string;
  nameEn: string;
  nameTn: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
  targetTier: string;
  targetTierTn: string;
  keyConcernsEn: string[];
  keyConcernsTn: string[];
  redFlagEn: string;
  redFlagTn: string;
  actionEn: string;
  actionTn: string;
  hotspotY: number; // percentage from top
  hotspotX: number; // percentage from left
}

const HEALTH_SYSTEMS: HealthSystem[] = [
  {
    id: 'respiratory',
    nameEn: 'Lungs & Respiratory System',
    nameTn: 'Makgwafo & Thulaganyo ya go Hema',
    icon: Wind,
    color: 'text-cyan-800 border-cyan-400 bg-cyan-50',
    badgeBg: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    targetTier: '24-Hour Clinic / District Hospital',
    targetTierTn: 'Tleliniki ya 24h / Sepatela sa Kgaolo',
    keyConcernsEn: [
      'Cough lasting more than 2 weeks (MoH TB screening protocol)',
      'Fast breathing or lower chest wall indrawing in children under 5',
      'Sudden wheezing or acute asthma flare-up'
    ],
    keyConcernsTn: [
      'Kgotlholo e e fetang dibeke tse pedi (tlhatlhobo ya TB ya MoH)',
      'Go hema ka bofefo kgotsa sehuba se tsena mo teng mo baneng',
      'Go hupela ka tshoganyetso kgotsa kgotlholo e e tseneletseng'
    ],
    redFlagEn: 'Stridor (harsh breathing at rest), blue lips, inability to drink or talk.',
    redFlagTn: 'Molomo o o phepole, go palelwa ke go nwa metsi kgotsa go bua.',
    actionEn: 'Visit the nearest 24h clinic or hospital casualty immediately.',
    actionTn: 'Ya kwa tleliniking ya dioura tse 24 kgotsa casualty ka bonako.',
    hotspotY: 28,
    hotspotX: 50
  },
  {
    id: 'cardiovascular',
    nameEn: 'Heart & Circulatory System',
    nameTn: 'Pelo & Madi a a Tsamayang',
    icon: Heart,
    color: 'text-rose-800 border-rose-400 bg-rose-50',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    targetTier: 'Hospital Emergency Casualty (PMH / Nyangabgwe / Private)',
    targetTierTn: 'Casualty ya Sepatela (PMH / Bokamoso / Nyangabgwe)',
    keyConcernsEn: [
      'Crushing central chest pain or tightness radiating to left arm or jaw',
      'High blood pressure (Hypertension check at nearest local clinic)',
      'Sudden severe dizziness with irregular fast heart palpitations'
    ],
    keyConcernsTn: [
      'Botlhoko jo bo gatelelang mo sehubeng bo ya mo lebogong la molema',
      'Madi a matona (tlhatlhobo ya hypertension kwa tleliniking)',
      'Tsedidi e e tseneletseng le pelo e e itayang ka bofefo'
    ],
    redFlagEn: 'Chest pain accompanied by cold sweating, nausea, and collapse. Dial 997 or 992.',
    redFlagTn: 'Sehuba se se botlhoko se na le mofufutso o o tsididi le go idibala. Leletsa 997.',
    actionEn: 'Do not drive yourself. Call 997 (Gov) or 992 (Private EMS) for immediate ALS transport.',
    actionTn: 'O seka wa kgweetsa. Leletsa 997 kgotsa 992 go kopa ambulense ka bofefo.',
    hotspotY: 34,
    hotspotX: 47
  },
  {
    id: 'gastrointestinal',
    nameEn: 'Digestive & Hydration (ORS)',
    nameTn: 'Mpa & Motswako wa Metsi (ORS)',
    icon: Droplets,
    color: 'text-teal-800 border-teal-400 bg-teal-50',
    badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
    targetTier: 'Primary Clinic / Home Rehydration',
    targetTierTn: 'Tleliniki ya Motse / Kaelo ya ORS mo Gae',
    keyConcernsEn: [
      'Acute watery diarrhoea in infants and young children',
      'Early dehydration (sunken eyes, dry mouth, slow skin pinch return)',
      'Home ORS formula: 1 Litre safe boiled water + 6 teaspoons sugar + 0.5 teaspoon salt'
    ],
    keyConcernsTn: [
      'Letshololo la madi le metsi mo maseeng le baneng ba bannye',
      'Matshwao a go fela ga metsi (matlho a a nwelang, go koma ga leleme)',
      'Motswako wa ORS mo gae: Litha e le 1 ya metsi + ditshwana tse 6 tsa sukiri + halofo ya letswai'
    ],
    redFlagEn: 'Lethargy, child unable to drink, persistent vomiting, or bloody stools.',
    redFlagTn: 'Ngoana o palelwa ke go nwa, o feletswe ke matla kgotsa o tlhatsa gotlhe.',
    actionEn: 'Administer ORS in sips immediately; proceed to nearest local clinic within 2 hours.',
    actionTn: 'Moneele ORS ka ditshwana mme o ye tleliniking e e gaufi mo dioureng tse pedi.',
    hotspotY: 46,
    hotspotX: 50
  },
  {
    id: 'maternal',
    nameEn: 'Maternal & Child Health (Baimana)',
    nameTn: 'Botsogo jwa Boimana & Masea (Baimana)',
    icon: Baby,
    color: 'text-amber-800 border-amber-400 bg-amber-50',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    targetTier: 'Maternity Wing / 24h Delivery Clinic',
    targetTierTn: 'Lefapha la Baimana / Tleliniki ya Pelego',
    keyConcernsEn: [
      'Severe frontal headache with blurred vision (Pre-eclampsia signal)',
      'Vaginal bleeding at any stage of pregnancy',
      'Sudden reduction in baby movements in 3rd trimester'
    ],
    keyConcernsTn: [
      'Tlhogo e e botlhoko thata le matlho a a fifalang (matshwao a BP ya boimana)',
      'Madi a a tswang mo boimaneng ka nako nngwe le nngwe',
      'Ngoana o emisitse kgotsa o fokoditse go raga mo mpeng'
    ],
    redFlagEn: 'Convulsions, continuous fluid leakage, severe abdominal pain.',
    redFlagTn: 'Go thithibala (fits), metsi a a tswang a sa kgaotse, kgotsa botlhoko jo bo tseneletseng.',
    actionEn: 'Proceed immediately to the maternity admission unit at a 24h clinic or hospital.',
    actionTn: 'Ya ka bonako kwa tleliniking ya 24h e e nang le maternity kgotsa kokelong.',
    hotspotY: 55,
    hotspotX: 50
  },
  {
    id: 'brain_mental',
    nameEn: 'Neurological & Mental Wellbeing',
    nameTn: 'Boko, Maikutlo & Lifeline',
    icon: Brain,
    color: 'text-purple-800 border-purple-400 bg-purple-50',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    targetTier: 'District Hospital Psychiatric Unit / Lifeline Botswana',
    targetTierTn: 'Lefapha la Tlhaloganyo / Lifeline Botswana',
    keyConcernsEn: [
      'FAST Stroke signs: Facial drooping, Arm weakness, Slurred speech, Time to call 997',
      'Acute anxiety, overwhelming distress, or postpartum mental exhaustion',
      'Lifeline Botswana Toll-Free Support: 0800 600 740 / 391 1290'
    ],
    keyConcernsTn: [
      'Matshwao a stroke (FAST): Sefatlhego se relela, lebogo le a koafala, go bua go bokete',
      'Kgatelelo ya maikutlo, go tlhobaela, kgotsa tlhobaelo morago ga pelego',
      'Mogala wa mahala wa Lifeline Botswana: 0800 600 740'
    ],
    redFlagEn: 'Thoughts of self-harm, acute confusion, or sudden paralysis.',
    redFlagTn: 'Maikutlo a go ikgobatsa, go tlhakatlhakana ga tlhaloganyo kgotsa go sa kgoneng go tsamaya.',
    actionEn: 'Access Lifeline Botswana or visit the nearest hospital emergency unit.',
    actionTn: 'Leletsa Lifeline Botswana kgotsa o etele sepatela sa kgaolo ka bonako.',
    hotspotY: 14,
    hotspotX: 50
  },
  {
    id: 'vector_environmental',
    nameEn: 'Environmental & Vector Health',
    nameTn: 'Tikologo & Bolwetse jwa Malaria / Dinoga',
    icon: ShieldAlert,
    color: 'text-emerald-800 border-emerald-400 bg-emerald-50',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    targetTier: 'Local Clinic (Rapid Diagnostic Testing)',
    targetTierTn: 'Tleliniki ya Selegae (RDT ya Malaria)',
    keyConcernsEn: [
      'High fever after travelling to Okavango, Ngamiland, Chobe or Boteti (Malaria protocol)',
      'Snakebite management (Puff adder / cobra): Keep limb still, DO NOT cut or apply tourniquet',
      'Extreme heat stress and dehydration in open desert climates'
    ],
    keyConcernsTn: [
      'Fifi e e kwa godimo morago ga go tswa Ngamiland, Chobe kgotsa Boteti (Malaria)',
      'Go longwa ke noga: O seka wa sega kgotsa wa bofa ka kgole, tsamaya ka bonako',
      'Kotsi ya letsatsi le mogote o montsi mo sekakeng'
    ],
    redFlagEn: 'Snakebite with progressive swelling or breathing difficulty; severe malaria vomiting.',
    redFlagTn: 'Go ruruga ka bofefo morago ga go longwa ke noga kgotsa go hema ka bokete.',
    actionEn: 'Immediate rapid testing and antivenom triage at nearest district health facility.',
    actionTn: 'Itlhaganelele tlhatlhobo ya RDT kgotsa kalafo ya antivenom kwa tleliniking.',
    hotspotY: 70,
    hotspotX: 50
  }
];

export const InteractiveAnatomyExplorer: React.FC<InteractiveAnatomyExplorerProps> = ({
  currentLang,
  onNavigateToTriage
}) => {
  const [activeSystemId, setActiveSystemId] = useState<string>('respiratory');
  const activeSystem = HEALTH_SYSTEMS.find(s => s.id === activeSystemId) || HEALTH_SYSTEMS[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-5 sm:p-7 transition-all">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4 text-teal-700" />
            <span>{currentLang === 'tn' ? 'Tsamaiso ya Mebele le Dithulaganyo tsa Botsogo' : 'Interactive Health Systems Visualizer'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            {currentLang === 'tn' ? 'Tlhatlhoba Dikarolo tsa Motsheletsi wa Botsogo' : 'Explore Human Body Systems & Care Urgency'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
            {currentLang === 'tn'
              ? 'Kgetha setho kgotsa thulaganyo ya mmele go bona matshwao a kotsi le gore o tshwanetse go batla thuso kae mo Botswana.'
              : 'Select any physiological system below to reveal MoH clinical red flags, expected care tiers, and immediate emergency steps.'}
          </p>
        </div>

        {/* 3D Depth Indicator Badge */}
        <div className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] font-semibold text-slate-700 shrink-0">
          <Activity className="w-3.5 h-3.5 text-teal-700 animate-vitality" />
          <span>Clinical Triage Grounded</span>
        </div>
      </div>

      {/* Main Grid: Visual Body Silhouette (Left) + Detailed Interactive Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-start">
        {/* Left Column: 3D-styled interactive silhouette with dynamic vitality nodes */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100/60 rounded-2xl border border-slate-200/80 relative min-h-[380px]">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1">
            <span>{currentLang === 'tn' ? 'Kgetha Karolo ya Mmele' : 'Tap on Any Body Zone'}</span>
          </div>

          {/* SVG Anatomical Silhouette with 3D Depth and Hotspots */}
          <div className="relative w-48 h-80 flex items-center justify-center select-none">
            {/* Ambient biological aura */}
            <div className="absolute inset-0 bg-teal-200/20 rounded-full blur-2xl pointer-events-none" />

            {/* Stylized Human Anatomy Silhouette */}
            <svg
              viewBox="0 0 160 300"
              className="w-full h-full text-slate-300 drop-shadow-md transition-all duration-500"
              fill="currentColor"
            >
              {/* Head */}
              <circle cx="80" cy="35" r="22" className="transition-colors hover:text-slate-400" />
              {/* Neck */}
              <rect x="74" y="55" width="12" height="15" rx="3" />
              {/* Torso */}
              <path d="M50 70 C50 65, 110 65, 110 70 L115 150 C115 160, 95 165, 80 165 C65 165, 45 160, 45 150 Z" />
              {/* Left Arm */}
              <path d="M47 72 L25 140 C22 148, 28 152, 33 148 L50 90 Z" />
              {/* Right Arm */}
              <path d="M113 72 L135 140 C138 148, 132 152, 127 148 L110 90 Z" />
              {/* Left Leg */}
              <path d="M55 160 L50 280 C49 288, 62 288, 65 280 L75 165 Z" />
              {/* Right Leg */}
              <path d="M105 160 L110 280 C111 288, 98 288, 95 280 L85 165 Z" />
            </svg>

            {/* Dynamic Interactive Hotspot Nodes */}
            {HEALTH_SYSTEMS.map((system) => {
              const isActive = system.id === activeSystemId;
              const IconComp = system.icon;
              return (
                <button
                  key={system.id}
                  onClick={() => setActiveSystemId(system.id)}
                  style={{ top: `${system.hotspotY}%`, left: `${system.hotspotX}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                    isActive
                      ? 'scale-125 bg-slate-900 text-white shadow-lg ring-4 ring-teal-400 ring-opacity-60'
                      : 'scale-95 bg-white/90 text-slate-700 hover:scale-110 shadow-md border border-slate-300'
                  }`}
                  aria-label={`Select ${system.nameEn}`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-teal-300' : 'text-slate-700'}`} />
                  {isActive && (
                    <span className="absolute -inset-1 rounded-full border-2 border-teal-500 animate-ping opacity-40" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick system selector tags underneath silhouette */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
            {HEALTH_SYSTEMS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSystemId(s.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  s.id === activeSystemId
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {currentLang === 'tn' ? s.nameTn.split(' ')[0] : s.nameEn.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Selected System Clinical Intelligence Card */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* System Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border mb-1.5 ${activeSystem.badgeBg}`}>
                  <activeSystem.icon className="w-3.5 h-3.5" />
                  <span>{currentLang === 'tn' ? activeSystem.targetTierTn : activeSystem.targetTier}</span>
                </span>
                <h4 className="text-xl font-bold text-slate-900">
                  {currentLang === 'tn' ? activeSystem.nameTn : activeSystem.nameEn}
                </h4>
              </div>
            </div>

            {/* Common Community Symptoms & MoH Guidance */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {currentLang === 'tn' ? 'Matshwao a Tlwaelo a go Kaelwa:' : 'Key Symptoms & Public Health Guidance:'}
              </h5>
              <ul className="space-y-2 text-xs text-slate-600">
                {(currentLang === 'tn' ? activeSystem.keyConcernsTn : activeSystem.keyConcernsEn).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flag Warning Box */}
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-rose-950">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                <span>{currentLang === 'tn' ? 'Matshwao a Kotsi a Bofefo (Red Flags):' : 'Critical Clinical Red Flags:'}</span>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed font-medium">
                {currentLang === 'tn' ? activeSystem.redFlagTn : activeSystem.redFlagEn}
              </p>
            </div>

            {/* Recommended Care Tier Instruction */}
            <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-3.5 text-xs text-teal-950 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
              <div>
                <strong className="text-teal-900">
                  {currentLang === 'tn' ? 'Kgato e e Tshwanetseng:' : 'Recommended Action:'}
                </strong>{' '}
                {currentLang === 'tn' ? activeSystem.actionTn : activeSystem.actionEn}
              </div>
            </div>
          </div>

          {/* Direct CTA into Triage */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              {currentLang === 'tn'
                ? 'A o na le matshwao a a tshwanang le a? Tsena mo kaelong ya Triage.'
                : 'Experiencing these symptoms right now? Run a full triage evaluation.'}
            </span>
            <button
              onClick={onNavigateToTriage}
              className="w-full sm:w-auto px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{currentLang === 'tn' ? 'Tlhatlhoba Matshwao a me' : 'Check Symptoms with Triage'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
