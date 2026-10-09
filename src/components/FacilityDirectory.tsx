import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldAlert, 
  ShieldCheck,
  CreditCard,
  Check, 
  Filter, 
  Baby, 
  Accessibility, 
  Calendar,
  AlertCircle,
  X,
  Sparkles
} from 'lucide-react';
import { Facility, FacilityType, LanguageCode } from '../types';
import { BOTSWANA_FACILITIES } from '../data/facilities';
import { BOTSWANA_DISTRICTS } from '../data/languages';

interface FacilityDirectoryProps {
  currentLang: LanguageCode;
  initialDistrict?: string;
  initialTierFilter?: string;
}

interface ServiceKeywordTag {
  id: string;
  keyword: string;
  labelEn: string;
  labelTn: string;
}

const POPULAR_SERVICE_KEYWORDS: ServiceKeywordTag[] = [
  { id: 'private', keyword: 'private', labelEn: 'Private Hospitals', labelTn: 'Dipatela tsa Poraefete' },
  { id: 'maternity', keyword: 'maternity', labelEn: 'Maternity & Delivery', labelTn: 'Pelego / Baimana' },
  { id: 'casualty', keyword: 'casualty', labelEn: '24/7 Casualty & Trauma', labelTn: 'Potlako (Casualty)' },
  { id: 'lab', keyword: 'laboratory', labelEn: 'Laboratory', labelTn: 'Laboratori' },
  { id: 'pharmacy', keyword: 'pharmacy', labelEn: 'Dispensary / Pharmacy', labelTn: 'Molemo' },
  { id: 'child', keyword: 'child health', labelEn: 'Child Health IMCI', labelTn: 'Kalafi ya Bana' },
  { id: 'tb_art', keyword: 'tb art', labelEn: 'TB & ART Clinic', labelTn: 'TB le ART' },
  { id: 'malaria', keyword: 'malaria', labelEn: 'Malaria Services', labelTn: 'Malaria' },
  { id: 'wheelchair', keyword: 'accessible', labelEn: 'Wheelchair Accessible', labelTn: 'Ditilo tsa Maotwana' },
];

const TIER_OPTIONS = [
  { value: 'all', labelEn: 'All Facilities', labelTn: 'Tsotlhe' },
  { value: 'private_hospital', labelEn: 'Private Hospitals', labelTn: 'Dipatela tsa Poraefete' },
  { value: 'referral_hospital', labelEn: 'Tertiary Referral', labelTn: 'Dipatela tse Dikgolo' },
  { value: 'district_hospital', labelEn: 'District Hospitals', labelTn: 'Dipatela tsa Kgaolo' },
  { value: 'clinic_24h', labelEn: '24-Hour Clinics', labelTn: 'Ditleliniki 24h' },
  { value: 'clinic', labelEn: 'Local Clinics', labelTn: 'Ditleliniki tsa Selegae' },
];

export const FacilityDirectory: React.FC<FacilityDirectoryProps> = ({
  currentLang,
  initialDistrict = 'All',
  initialTierFilter = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedType, setSelectedType] = useState<string>(initialTierFilter);
  const [selectedSector, setSelectedSector] = useState<'all' | 'public' | 'private'>('all');
  const [filter24HoursOnly, setFilter24HoursOnly] = useState(false);
  const [filterMaternityOnly, setFilterMaternityOnly] = useState(false);

  // Helper function to check if a facility matches a specific term (name, location, or service keyword)
  const matchesKeyword = (facility: Facility, term: string): boolean => {
    const cleanTerm = term.toLowerCase().trim();
    if (!cleanTerm) return true;

    // Direct text fields
    if (facility.name.toLowerCase().includes(cleanTerm)) return true;
    if (facility.settlement.toLowerCase().includes(cleanTerm)) return true;
    if (facility.district.toLowerCase().includes(cleanTerm)) return true;
    if (facility.address.toLowerCase().includes(cleanTerm)) return true;
    if ((facility.notes || '').toLowerCase().includes(cleanTerm)) return true;

    // Private healthcare & medical aid matching
    const privateKeywords = [
      'private', 'poraefete', 'medical aid', 'bomaid', 'pula', 'botsogo', 
      'insurance', 'debswana', 'bokamoso', 'sidilega', 'gph', 'riverside', 
      'mri', 'lenmed', 'life healthcare', 'cath lab', 'oncology', 'dialysis'
    ];
    if ((facility.sector === 'private' || facility.type === 'private_hospital') && 
        privateKeywords.some(kw => cleanTerm.includes(kw) || kw.includes(cleanTerm))) {
      return true;
    }
    if (facility.medicalAidAccepted && facility.medicalAidAccepted.some(ma => ma.toLowerCase().includes(cleanTerm))) {
      return true;
    }

    // Facility Tier terms
    if (facility.type.toLowerCase().includes(cleanTerm)) return true;
    if (cleanTerm === 'hospital' && facility.type.includes('hospital')) return true;
    if (cleanTerm === 'clinic' && facility.type.includes('clinic')) return true;
    if ((cleanTerm === 'referral' || cleanTerm === 'tertiary') && facility.type === 'referral_hospital') return true;
    if (cleanTerm === 'district' && facility.type === 'district_hospital') return true;
    if ((cleanTerm === 'kokelo' || cleanTerm === 'sepatela') && facility.type.includes('hospital')) return true;
    if ((cleanTerm === 'tleliniki' || cleanTerm === 'kokelwana') && facility.type.includes('clinic')) return true;

    // Service Keyword: Maternity / Antenatal / Delivery
    const maternityKeywords = ['maternity', 'delivery', 'labour', 'labor', 'birth', 'antenatal', 'anc', 'baimana', 'pelego', 'matsalo', 'obstetric'];
    if (facility.hasMaternity && maternityKeywords.some(kw => cleanTerm.includes(kw) || kw.includes(cleanTerm))) {
      return true;
    }

    // Service Keyword: Laboratory / Blood tests / GeneXpert
    const labKeywords = ['lab', 'laboratory', 'test', 'blood', 'genexpert', 'diagnostics', 'diteko', 'screening'];
    if (facility.hasLaboratory && labKeywords.some(kw => cleanTerm.includes(kw) || kw.includes(cleanTerm))) {
      return true;
    }

    // Service Keyword: Pharmacy / Dispensary / Medication
    const pharmacyKeywords = ['pharmacy', 'dispensary', 'medicine', 'medication', 'drugs', 'molemo', 'ditlhare'];
    if (facility.hasPharmacy && pharmacyKeywords.some(kw => cleanTerm.includes(kw) || kw.includes(cleanTerm))) {
      return true;
    }

    // Service Keyword: Child Health / IMCI / Pediatric
    const childKeywords = ['child', 'children', 'pediatric', 'paediatric', 'imci', 'infant', 'baby', 'bana', 'immunization', 'vaccine', 'vaccination'];
    if (facility.hasChildHealthIMCI && childKeywords.some(kw => cleanTerm.includes(kw) || kw.includes(cleanTerm))) {
      return true;
    }

    // Service Keyword: TB / ART / HIV
    const tbKeywords = ['tb', 'art', 'arv', 'hiv', 'tuberculosis', 'infectious', 'aids', 'prep'];
    if (facility.hasTbArtServices && tbKeywords.some(kw => cleanTerm.includes(kw) || kw.includes(cleanTerm))) {
      return true;
    }

    // Service Keyword: 24h / Casualty / Emergency / Trauma
    const emergencyKeywords = ['24h', '24-hour', '24 hour', '24/7', 'casualty', 'emergency', 'trauma', 'night', 'bosigo', 'potlako', 'ambulance'];
    if ((facility.is24Hour || facility.emergencyPhone) && emergencyKeywords.some(kw => cleanTerm.includes(kw) || kw.includes(cleanTerm))) {
      return true;
    }

    // Service Keyword: Wheelchair / Disability Accessibility
    const accessKeywords = ['wheelchair', 'accessible', 'accessibility', 'disability', 'disabled', 'golafala'];
    if (facility.wheelchairAccessible && accessKeywords.some(kw => cleanTerm.includes(kw) || kw.includes(cleanTerm))) {
      return true;
    }

    return false;
  };

  const filteredFacilities = useMemo(() => {
    return BOTSWANA_FACILITIES.filter(facility => {
      // Sector filter (Public vs Private)
      const isPrivate = facility.sector === 'private' || facility.type === 'private_hospital';
      if (selectedSector === 'private' && !isPrivate) {
        return false;
      }
      if (selectedSector === 'public' && isPrivate) {
        return false;
      }

      // District filter
      if (selectedDistrict !== 'All' && !facility.district.includes(selectedDistrict)) {
        return false;
      }

      // Facility Type filter
      if (selectedType !== 'all') {
        if (selectedType === 'private_hospital' && facility.type !== 'private_hospital') return false;
        if (selectedType === 'referral_hospital' && facility.type !== 'referral_hospital') return false;
        if (selectedType === 'district_hospital' && facility.type !== 'district_hospital') return false;
        if (selectedType === 'clinic_24h' && facility.type !== 'clinic_24h') return false;
        if (selectedType === 'clinic' && facility.type !== 'clinic') return false;
      }

      // 24 Hour filter
      if (filter24HoursOnly && !facility.is24Hour) {
        return false;
      }

      // Maternity filter
      if (filterMaternityOnly && !facility.hasMaternity) {
        return false;
      }

      // Search Query filter (matches name, location, or service keywords)
      if (searchQuery.trim()) {
        const tokens = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const allTokensMatch = tokens.every(token => matchesKeyword(facility, token));
        if (!allTokensMatch) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDistrict, selectedType, selectedSector, filter24HoursOnly, filterMaternityOnly]);

  const handleQuickKeywordClick = (keyword: string) => {
    if (searchQuery.trim().toLowerCase() === keyword.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(keyword);
    }
  };

  const handleResetFilters = () => {
    setSelectedDistrict('All');
    setSelectedType('all');
    setSelectedSector('all');
    setFilter24HoursOnly(false);
    setFilterMaternityOnly(false);
    setSearchQuery('');
  };

  const getTierLabel = (type: FacilityType) => {
    switch (type) {
      case 'private_hospital':
        return currentLang === 'tn' ? 'Sepatela sa Poraefete (Private)' : 'Private Tertiary Hospital';
      case 'referral_hospital':
        return currentLang === 'tn' ? 'Kokelo e Kgolo ya Setshaba (Tertiary)' : 'Tertiary Referral Hospital';
      case 'district_hospital':
        return currentLang === 'tn' ? 'Sepatela sa Kgaolo (District)' : 'District Hospital';
      case 'primary_hospital':
        return currentLang === 'tn' ? 'Sepatela sa Motse (Primary)' : 'Primary Hospital';
      case 'clinic_24h':
        return currentLang === 'tn' ? 'Tleliniki ya Dioura tse 24' : '24-Hour Primary Clinic';
      case 'clinic':
        return currentLang === 'tn' ? 'Kokelwana ya Selegae' : 'Local Primary Clinic';
      case 'health_post':
        return currentLang === 'tn' ? 'Health Post ya Moemedi' : 'Community Health Post';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Title & Introduction */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
          <Building2 className="w-4 h-4 text-teal-700" />
          <span>{currentLang === 'tn' ? 'Bokopano jwa Ditleliniki le Dipatela' : 'Verified Botswana Facility Directory'}</span>
          <span aria-hidden="true">·</span>
          <span>{currentLang === 'tn' ? 'Tshedimosetso e e Netefaditsweng' : 'Official MoH Verification'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {currentLang === 'tn' ? 'Batla Kokelo e e Gaufi le Wena' : 'Find Verified Healthcare Facilities'}
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl">
          {currentLang === 'tn'
            ? 'Bona dinomore tsa megala, dinako tsa go bula le go tswala, ditiro tsa matsalo, le maemo a kokelo go efoga tiego.'
            : 'Access authenticated operating hours, direct emergency casualty phones, maternity wards, and referral protocols across Botswana districts.'}
        </p>
      </div>

      {/* Main Filter and Search Panel */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs mb-6 space-y-4">
        {/* Top Search Input Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label 
              htmlFor="facility-search-input" 
              className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide"
            >
              <Search className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
              <span>{currentLang === 'tn' ? 'Batla Kokelo kgotsa Tirelo ya Kalafi' : 'Search Facilities & Services'}</span>
            </label>
            {searchQuery && (
              <span className="text-[11px] text-teal-800 font-medium">
                Filtering by &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4 text-teal-800" aria-hidden="true" />
            </div>
            <input
              id="facility-search-input"
              type="search"
              role="searchbox"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Escape') {
                  setSearchQuery('');
                }
              }}
              placeholder={
                currentLang === 'tn'
                  ? 'Batla ka leina kgotsa tirelo (Sekai: Princess Marina, Maternity, Lab, TB/ART, 24 Hours, Molemo)...'
                  : 'Search by facility name or service keyword (e.g. Princess Marina, Maternity, Lab, TB/ART, Casualty, Pharmacy)...'
              }
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-xl border border-slate-300 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 text-slate-900 placeholder:text-slate-400 bg-slate-50/60 hover:bg-white focus:bg-white transition-all outline-none"
              aria-label={currentLang === 'tn' ? 'Batla kokelo ka leina kgotsa ditirelo tsa kalafi' : 'Search facilities by name or service keyword'}
              aria-describedby="facility-service-keywords-hint"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 focus:outline-none focus:text-teal-800 p-1"
                aria-label={currentLang === 'tn' ? 'Phimola dipatlo' : 'Clear search query'}
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Service Keyword Suggestions */}
          <div id="facility-service-keywords-hint" className="mt-2.5 flex items-center flex-wrap gap-1.5">
            <span className="text-[11px] font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" aria-hidden="true" />
              <span>{currentLang === 'tn' ? 'Ditirelo:' : 'Service keywords:'}</span>
            </span>
            {POPULAR_SERVICE_KEYWORDS.map(service => {
              const isSelected = searchQuery.toLowerCase().includes(service.keyword.toLowerCase());
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleQuickKeywordClick(service.keyword)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border flex items-center gap-1 ${
                    isSelected
                      ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  aria-pressed={isSelected}
                  title={`Filter by service keyword: ${service.labelEn}`}
                >
                  <span>{currentLang === 'tn' ? service.labelTn : service.labelEn}</span>
                  {isSelected && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* District and Tier Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          {/* District filter */}
          <div>
            <label htmlFor="facility-district-select" className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              {currentLang === 'tn' ? 'Kgaolo ya Botswana' : 'District Location'}
            </label>
            <select
              id="facility-district-select"
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full py-2 px-3 text-xs font-medium rounded-xl border border-slate-300 bg-white text-slate-800 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none"
            >
              <option value="All">{currentLang === 'tn' ? 'Dikgaolo Tsotlhe (All Districts)' : 'All Botswana Districts'}</option>
              {BOTSWANA_DISTRICTS.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Facility Tier filter */}
          <div>
            <label htmlFor="facility-tier-select" className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              {currentLang === 'tn' ? 'Maemo a Kokelo' : 'Facility Level / Tier'}
            </label>
            <select
              id="facility-tier-select"
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 text-xs font-medium rounded-xl border border-slate-300 bg-white text-slate-800 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none"
            >
              {TIER_OPTIONS.map(tier => (
                <option key={tier.value} value={tier.value}>
                  {currentLang === 'tn' ? tier.labelTn : tier.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Provider Sector Filter (All vs Public vs Private) */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase">
              {currentLang === 'tn' ? 'Lefapha la Botsogo:' : 'Provider Sector:'}
            </span>
            <div className="inline-flex rounded-xl border border-slate-200 p-0.5 bg-slate-100" role="group" aria-label="Healthcare provider sector">
              <button
                type="button"
                onClick={() => setSelectedSector('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSector === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {currentLang === 'tn' ? 'Tsotlhe (All)' : 'All Facilities'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedSector('public')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSector === 'public'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-900'
                }`}
              >
                {currentLang === 'tn' ? 'Mmuso (Public / MoH)' : 'Public / MoH'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedSector('private')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedSector === 'private'
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-purple-900'
                }`}
              >
                <CreditCard className="w-3 h-3" />
                <span>{currentLang === 'tn' ? 'Poraefete (Medical Aid)' : 'Private (Medical Aid)'}</span>
              </button>
            </div>
          </div>
          {selectedSector === 'private' && (
            <span className="text-[11px] font-medium text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
              <span>Direct EDI settlement with Bomaid, Pula, Botsogo & MVA Fund</span>
            </span>
          )}
        </div>

        {/* Quick Facility Tier Toggle Tabs */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-slate-600 uppercase">
              {currentLang === 'tn' ? 'Kgetha ka Potlako (Tier):' : 'Quick Tier Selector:'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Facility Level Filters">
            {TIER_OPTIONS.map(tier => {
              const isSelected = selectedType === tier.value;
              const isPrivateOption = tier.value === 'private_hospital';
              return (
                <button
                  key={tier.value}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedType(tier.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? isPrivateOption
                        ? 'bg-purple-900 text-white shadow-xs font-semibold'
                        : 'bg-teal-800 text-white shadow-xs font-semibold'
                      : isPrivateOption
                        ? 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-medium'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {isPrivateOption && <CreditCard className="w-3 h-3" />}
                  <span>{currentLang === 'tn' ? tier.labelTn : tier.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick capability toggle buttons & live count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter24HoursOnly(!filter24HoursOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                filter24HoursOnly 
                  ? 'bg-teal-800 text-white border-teal-800' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              aria-pressed={filter24HoursOnly}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>24 Hours Open Only</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterMaternityOnly(!filterMaternityOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                filterMaternityOnly 
                  ? 'bg-teal-800 text-white border-teal-800' 
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              aria-pressed={filterMaternityOnly}
            >
              <Baby className="w-3.5 h-3.5" />
              <span>Maternity & Delivery Ward</span>
            </button>

            {(searchQuery || selectedDistrict !== 'All' || selectedType !== 'all' || filter24HoursOnly || filterMaternityOnly) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-700 hover:text-rose-900 font-medium px-2 py-1 underline underline-offset-2"
              >
                {currentLang === 'tn' ? 'Sutisa di-filter' : 'Reset all filters'}
              </button>
            )}
          </div>

          <motion.div 
            key={filteredFacilities.length}
            initial={{ opacity: 0.6, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="status" 
            aria-live="polite" 
            className="text-xs text-slate-600 font-semibold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200"
          >
            {filteredFacilities.length === 1 
              ? 'Showing 1 verified facility' 
              : `Showing ${filteredFacilities.length} verified facilities`}
          </motion.div>
        </div>
      </div>

      {/* Facilities Grid with Smooth Motion Transition Animations */}
      <AnimatePresence mode="wait">
        {filteredFacilities.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-slate-200 p-8 text-center"
            role="region"
            aria-label="No results"
          >
            <Building2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-800">
              {currentLang === 'tn' ? 'Ga go a fitlhelwa kokelo epe' : 'No facilities matched your search or filters'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery 
                ? `No health facilities matched "${searchQuery}". Try searching a different keyword such as "maternity", "pharmacy", "clinic", or clear your filters.`
                : 'Try expanding your district selection or clearing specific filters to see nearby facilities.'}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              {currentLang === 'tn' ? 'Sutisa Dipatlo Tsotlhe (Reset Filters)' : 'Reset All Filters & Search'}
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="facilities-grid"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
            role="region" 
            aria-label="Facility list"
          >
            <AnimatePresence mode="popLayout">
              {filteredFacilities.map(facility => {
                const isPrivate = facility.sector === 'private' || facility.type === 'private_hospital';

                return (
                  <motion.div
                    key={facility.id}
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ 
                      duration: 0.22, 
                      ease: [0.16, 1, 0.3, 1],
                      layout: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                    }}
                    className={`bg-white rounded-2xl border shadow-xs hover:shadow-sm transition-colors p-5 flex flex-col justify-between ${
                      isPrivate 
                        ? 'border-purple-200 hover:border-purple-400' 
                        : 'border-slate-200 hover:border-teal-300'
                    }`}
                  >
                    <div>
                      {/* Facility Type & Sector Tag */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                            isPrivate 
                              ? 'text-purple-900 bg-purple-100 border border-purple-200 font-bold' 
                              : 'text-teal-800 bg-teal-50'
                          }`}>
                            {isPrivate && <CreditCard className="w-3 h-3 text-purple-700" />}
                            {getTierLabel(facility.type)}
                          </span>

                          {isPrivate && (
                            <span className="text-[10px] font-semibold text-purple-800 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                              Private / Medical Aid
                            </span>
                          )}
                        </div>

                        {facility.is24Hour && (
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3" />
                            24h Open
                          </span>
                        )}
                      </div>

                      {/* Facility Name */}
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {facility.name}
                      </h3>

                      {/* Location */}
                      <div className="flex items-start gap-1.5 text-xs text-slate-600 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{facility.settlement}, {facility.district}</span>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-0.5 pl-5">
                        {facility.address}
                      </div>

                      {/* Operating hours */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 mt-2.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{facility.operatingHours}</span>
                      </div>

                      {/* Verified Capabilities & Services list */}
                      <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-100">
                        {facility.hasMaternity && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            Maternity
                          </span>
                        )}
                        {facility.hasLaboratory && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            Laboratory
                          </span>
                        )}
                        {facility.hasPharmacy && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            Dispensary / Pharmacy
                          </span>
                        )}
                        {facility.hasChildHealthIMCI && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            Child IMCI
                          </span>
                        )}
                        {facility.hasTbArtServices && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            TB / ART
                          </span>
                        )}
                        {facility.wheelchairAccessible && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium flex items-center gap-0.5">
                            <Accessibility className="w-2.5 h-2.5" />
                            Accessible
                          </span>
                        )}
                      </div>

                      {/* Medical Aid Schemes (for private hospitals) */}
                      {facility.medicalAidAccepted && facility.medicalAidAccepted.length > 0 && (
                        <div className="mt-2.5 p-2 bg-purple-50/70 border border-purple-200/80 rounded-xl text-purple-950">
                          <div className="flex items-center gap-1 text-[10px] font-bold text-purple-900 uppercase tracking-wider mb-1">
                            <ShieldCheck className="w-3 h-3 text-purple-700" />
                            <span>{currentLang === 'tn' ? 'Medical Aid e e Amogelwang:' : 'Medical Aid Direct Billing:'}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {facility.medicalAidAccepted.map(scheme => (
                              <span key={scheme} className="inline-block bg-white text-purple-900 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-purple-200 shadow-2xs">
                                {scheme}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Clinical Notes & Facility Info */}
                      {facility.notes && (
                        <p className="mt-2.5 text-[11px] text-slate-600 bg-slate-50 border border-slate-200/70 rounded-lg p-2 leading-relaxed">
                          {facility.notes}
                        </p>
                      )}

                      {/* Referral notice if required */}
                      {facility.referralRequired && (
                        <div className="mt-2.5 p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>
                            {currentLang === 'tn'
                              ? 'Referral letter e a tlhokega mo go tsa tlwaelo; dikemo tsa potlako di amogelwa kwantle ga referral.'
                              : 'Routine consultations require referral letter from a primary clinic. Acute trauma and emergencies accepted directly.'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <a
                        href={`tel:${facility.phone.replace(/\s+/g, '')}`}
                        className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors focus:ring-2 focus:ring-slate-950 focus:outline-none"
                        aria-label={`Call ${facility.name} on ${facility.phone}`}
                      >
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        <span>Call {facility.phone}</span>
                      </a>

                      {facility.emergencyPhone && (
                        <a
                          href={`tel:${facility.emergencyPhone.replace(/\s+/g, '')}`}
                          title="Direct Emergency Line"
                          className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors focus:ring-2 focus:ring-rose-700 focus:outline-none"
                          aria-label={`Direct casualty emergency line for ${facility.name}`}
                        >
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
                          <span>{facility.id === 'mri-botswana-emergency-centre' ? 'Dial 992' : 'Casualty'}</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

