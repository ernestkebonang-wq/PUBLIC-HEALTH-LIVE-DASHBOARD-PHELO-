import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Building2, 
  Phone, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { LanguageCode } from '../types';

interface BotswanaHealthCorridorMapProps {
  currentLang: LanguageCode;
  onNavigateToFacilities: (tierFilter?: string) => void;
}

interface Corridor {
  id: string;
  nameEn: string;
  nameTn: string;
  region: string;
  tertiaryHub: string;
  privateHub: string;
  districtFacilities: string[];
  keySpecialties: string[];
  casualtyPhone: string;
  ambulanceDispatch: string;
  coordinates: { x: number; y: number }; // percentage on map
}

const HEALTH_CORRIDORS: Corridor[] = [
  {
    id: 'gaborone_south',
    nameEn: 'Greater Gaborone & Southern Corridor',
    nameTn: 'Gaborone & Borwa (Gaborone, Ramotswa, Lobatse)',
    region: 'South-East & Southern Districts',
    tertiaryHub: 'Princess Marina Hospital (PMH)',
    privateHub: 'Bokamoso Private Hospital & Life GPH & Sidilega',
    districtFacilities: [
      'Extension 2 Clinic (24h Casualty)',
      'Bontleng 24-Hour Clinic',
      'Athlone Hospital (Lobatse)',
      'Bamalete Lutheran Hospital (Ramotswa)'
    ],
    keySpecialties: ['Level 1 Trauma', 'Cardiac Cath Lab', 'Neonatal ICU', 'Oncology Radiotherapy'],
    casualtyPhone: '+267 368 5600',
    ambulanceDispatch: '997 / 992',
    coordinates: { x: 55, y: 78 }
  },
  {
    id: 'francistown_north',
    nameEn: 'Northern & North East Corridor',
    nameTn: 'Bokone Botlhaba (Francistown, Tutume, Masunga)',
    region: 'North East & Central Districts',
    tertiaryHub: 'Nyangabgwe Referral Hospital',
    privateHub: 'Riverside Private Hospital',
    districtFacilities: [
      'Tatitown Clinic (24h Outpatient)',
      'Tutume Primary Hospital',
      'Masunga Primary Hospital',
      'Gweta Primary Hospital'
    ],
    keySpecialties: ['Neurosurgery', 'Northern Trauma Hub', 'Paediatric Surgery', 'Dialysis Centre'],
    casualtyPhone: '+267 241 1000',
    ambulanceDispatch: '997 / 992',
    coordinates: { x: 70, y: 38 }
  },
  {
    id: 'ngamiland_delta',
    nameEn: 'Ngamiland & Okavango Delta Health Network',
    nameTn: 'Ngamiland & Makgobokgobo a Okavango (Maun, Gumare)',
    region: 'North-West & Chobe Districts',
    tertiaryHub: 'Letsholathebe II Memorial Hospital',
    privateHub: 'Maun Medical Centre & Aeromedical Evacuation',
    districtFacilities: [
      'Maun Clinic (24-Hour Service)',
      'Gumare Primary Hospital',
      'Kasane Primary Hospital',
      'Shakawe Primary Hospital'
    ],
    keySpecialties: ['Tropical & Malaria Medicine', 'Aeromedical Evacuation Hub', 'Maternity', 'Snakebite Centre'],
    casualtyPhone: '+267 686 0412',
    ambulanceDispatch: '997 / 992',
    coordinates: { x: 30, y: 25 }
  },
  {
    id: 'kweneng_central',
    nameEn: 'Kweneng Central Corridor',
    nameTn: 'Kgaolo ya Kweneng (Molepolole, Thamaga)',
    region: 'Kweneng District',
    tertiaryHub: 'Scottish Livingstone Hospital',
    privateHub: 'Fast-track referral to Bokamoso Hospital',
    districtFacilities: [
      'Molepolole Clinic (24h Maternity & Triage)',
      'Thamaga Primary Hospital',
      'Metsimotlhabe Clinic',
      'Letlhakeng Clinic'
    ],
    keySpecialties: ['General Surgery', 'Orthopaedics', 'Maternity & IMCI', 'TB/ART Centre'],
    casualtyPhone: '+267 592 0333',
    ambulanceDispatch: '997 / 992',
    coordinates: { x: 42, y: 72 }
  },
  {
    id: 'mining_industrial',
    nameEn: 'Industrial & Mining Health Corridor',
    nameTn: 'Ditoropo tsa Meepo (Jwaneng, Orapa, Boteti)',
    region: 'Southern & Central Mining Hubs',
    tertiaryHub: 'Jwaneng Mine Hospital & Orapa Mine Hospital',
    privateHub: 'Debswana Medical Partnership / Direct Medical Aid',
    districtFacilities: [
      'Jwaneng Mine Hospital Casualty',
      'Orapa Mine Hospital 24h Unit',
      'Letlhakane Primary Hospital',
      'Selebi-Phikwe Government Hospital'
    ],
    keySpecialties: ['Occupational Trauma', 'Industrial Resuscitation', 'High-Dependency ICU', 'Burn Care'],
    casualtyPhone: '+267 588 4000',
    ambulanceDispatch: '997 / 992',
    coordinates: { x: 35, y: 76 }
  }
];

export const BotswanaHealthCorridorMap: React.FC<BotswanaHealthCorridorMapProps> = ({
  currentLang,
  onNavigateToFacilities
}) => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>('gaborone_south');
  const activeCorridor = HEALTH_CORRIDORS.find(c => c.id === selectedCorridorId) || HEALTH_CORRIDORS[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-5 sm:p-7">
      {/* Title & Concept Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-teal-700" />
            <span>{currentLang === 'tn' ? 'Tsamaiso ya Dipatela le Ditsela tsa Botsogo' : 'Botswana National Health Corridors'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            {currentLang === 'tn' ? 'Dithulaganyo tsa Referral le Dipatela mo Kgaolong' : 'Integrated Care Corridors & Referral Pathways'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
            {currentLang === 'tn'
              ? 'Dipatela tsa puso le tsa poraefete di bofagantswe ka ditsela tsa bofefo le tlhatlhobo go netefatsa gore molwetse o bona thuso e e maleba.'
              : 'Connecting primary clinics, district hospitals, and tertiary referral institutions across Botswana with 24/7 casualty dispatch.'}
          </p>
        </div>

        <button
          onClick={() => onNavigateToFacilities()}
          className="inline-flex items-center gap-1.5 self-start sm:self-center px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors shrink-0"
        >
          <span>{currentLang === 'tn' ? 'Bona Ditleliniki Tsotlhe' : 'Browse All 28 Facilities'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Grid: Interactive Map with Depth (Left) + Corridor Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
        {/* Left Column: Interactive Botswana Geographic Schematic with Depth */}
        <div className="lg:col-span-6 bg-gradient-to-b from-slate-900 via-slate-950 to-teal-950 rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden min-h-[380px] shadow-inner">
          {/* Subtle Botswana Outline Background Grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Top schematic badge */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-teal-300 font-semibold">
            <span className="flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5" />
              <span>Botswana Referral Network · 5 Corridors</span>
            </span>
            <span className="bg-teal-900/60 px-2 py-0.5 rounded text-teal-200 border border-teal-700/60">
              Interactive Map
            </span>
          </div>

          {/* Map canvas container */}
          <div className="relative w-full h-64 my-auto flex items-center justify-center">
            {/* Stylized geometric Botswana border */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full max-h-56 text-teal-500/15"
              fill="currentColor"
            >
              {/* Approximated Botswana national boundary polygon */}
              <polygon points="20,10 65,10 85,25 78,60 70,88 45,95 30,85 15,65 15,30" />
            </svg>

            {/* Connecting Referral Vector Lines */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <line x1="55" y1="78" x2="42" y2="72" stroke="rgba(45, 212, 191, 0.4)" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="55" y1="78" x2="70" y2="38" stroke="rgba(45, 212, 191, 0.4)" strokeWidth="1.2" strokeDasharray="3,3" />
              <line x1="70" y1="38" x2="30" y2="25" stroke="rgba(45, 212, 191, 0.3)" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="55" y1="78" x2="35" y2="76" stroke="rgba(45, 212, 191, 0.4)" strokeWidth="1" strokeDasharray="2,2" />
            </svg>

            {/* Corridor Nodes on Map */}
            {HEALTH_CORRIDORS.map(corridor => {
              const isSelected = corridor.id === selectedCorridorId;
              return (
                <button
                  key={corridor.id}
                  onClick={() => setSelectedCorridorId(corridor.id)}
                  style={{ top: `${corridor.coordinates.y}%`, left: `${corridor.coordinates.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-10`}
                  aria-label={`Select ${corridor.nameEn}`}
                >
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold shadow-lg transition-transform ${
                    isSelected
                      ? 'bg-teal-400 text-slate-950 scale-110 ring-2 ring-white'
                      : 'bg-slate-800/90 text-teal-200 hover:scale-105 border border-teal-500/40'
                  }`}>
                    <MapPin className="w-3 h-3" />
                    <span className="hidden sm:inline">{corridor.nameEn.split(' ')[0]}</span>
                  </div>
                  {isSelected && (
                    <span className="absolute -inset-1 rounded-full border border-teal-400 animate-ping opacity-50" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick tab switcher under map */}
          <div className="relative z-10 flex flex-wrap gap-1 pt-2 border-t border-slate-800">
            {HEALTH_CORRIDORS.map(corridor => (
              <button
                key={corridor.id}
                onClick={() => setSelectedCorridorId(corridor.id)}
                className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                  corridor.id === selectedCorridorId
                    ? 'bg-teal-400 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white bg-slate-800/60'
                }`}
              >
                {corridor.nameEn.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Corridor Facility Intel & Action Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            {/* Corridor Header */}
            <div>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {activeCorridor.region}
              </span>
              <h4 className="text-xl font-bold text-slate-900 mt-1.5">
                {currentLang === 'tn' ? activeCorridor.nameTn : activeCorridor.nameEn}
              </h4>
            </div>

            {/* Tertiary Hub & Private Hub info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Public Tertiary Hub:
                </span>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>{activeCorridor.tertiaryHub}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
                <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block mb-1">
                  Private & Medical Aid Hub:
                </span>
                <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span>{activeCorridor.privateHub}</span>
                </span>
              </div>
            </div>

            {/* Feeder District Clinics & Hospitals */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                Feeder Clinics & 24h Emergency Units:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                {activeCorridor.districtFacilities.map((fac, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties & Clinical Capabilities */}
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[11px] font-bold text-slate-600 mr-1">Specialties:</span>
              {activeCorridor.keySpecialties.map(spec => (
                <span key={spec} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Call & Directory Transition */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <a
                href={`tel:${activeCorridor.casualtyPhone.replace(/\s+/g, '')}`}
                className="flex-1 sm:flex-initial px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-rose-700" />
                <span>Call Casualty: {activeCorridor.casualtyPhone}</span>
              </a>
              <span className="text-[11px] text-slate-500 hidden md:inline">
                EMS Dispatch: <strong className="text-slate-800">{activeCorridor.ambulanceDispatch}</strong>
              </span>
            </div>

            <button
              onClick={() => onNavigateToFacilities()}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Filter Corridor Facilities</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
