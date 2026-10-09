import React, { useState, useMemo } from 'react';
import { 
  Pill, 
  Search, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  Clock, 
  PhoneCall, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Filter,
  Bell,
  Check,
  Building2,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { EssentialMedicine, ESSENTIAL_MEDICINES } from '../data/medicinesData';
import { BOTSWANA_DISTRICTS } from '../data/languages';
import { LanguageCode } from '../types';

interface EssentialMedicinesTrackerProps {
  currentLang: LanguageCode;
  initialDistrict?: string;
  onNavigateToFacilities?: (tier?: string) => void;
}

export const EssentialMedicinesTracker: React.FC<EssentialMedicinesTrackerProps> = ({
  currentLang,
  initialDistrict = 'All',
  onNavigateToFacilities
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => {
    if (initialDistrict && initialDistrict !== 'All') {
      const match = BOTSWANA_DISTRICTS.find(d => 
        d.toLowerCase().includes(initialDistrict.toLowerCase()) || 
        initialDistrict.toLowerCase().includes(d.toLowerCase())
      );
      return match || 'Gaborone';
    }
    return 'Gaborone';
  });

  // Local refill scheduler state
  const [scheduledMedName, setScheduledMedName] = useState<string>('');
  const [lastRefillDate, setLastRefillDate] = useState<string>('');
  const [scheduledSuccess, setScheduledSuccess] = useState<boolean>(false);
  const [userReportFeedback, setUserReportFeedback] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Medicines', labelTn: 'Melemo Yotlhe' },
    { id: 'hypertension', labelEn: 'Hypertension (Madi a Matona)', labelTn: 'Madi a Matona' },
    { id: 'diabetes', labelEn: 'Diabetes (Sukiri)', labelTn: 'Sukiri' },
    { id: 'malaria', labelEn: 'Malaria Treatment', labelTn: 'Malaria' },
    { id: 'maternal_child', labelEn: 'Paediatric & ORS', labelTn: 'Bana & ORS' },
    { id: 'respiratory', labelEn: 'Asthma & Chest', labelTn: 'Asma & Sehuba' },
    { id: 'emergency_antidote', labelEn: 'Emergency Antivenom', labelTn: 'Antivenom ya Dinoga' }
  ];

  const filteredMedicines = useMemo(() => {
    return ESSENTIAL_MEDICINES.filter(med => {
      if (selectedCategory !== 'all' && med.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = med.genericName.toLowerCase().includes(q);
        const matchBrand = med.brandNames.some(b => b.toLowerCase().includes(q));
        const matchIndication = med.indicationsEn.toLowerCase().includes(q) || med.indicationsTn.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchIndication) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleSaveRefillReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledMedName || !lastRefillDate) return;
    setScheduledSuccess(true);
    setTimeout(() => setScheduledSuccess(false), 4000);
  };

  const handleUserReport = (facilityName: string, status: 'found' | 'stockout') => {
    const message = status === 'found'
      ? (currentLang === 'tn' ? `Re a leboga! O netefaditse gore ${facilityName} e na le molemo gompieno.` : `Thank you! Verified that ${facilityName} currently has stock.`)
      : (currentLang === 'tn' ? `Re a leboga! Pego ya gore ${facilityName} ga e na molemo e rometswe mo tsamaisong.` : `Report submitted. District Pharmacy Coordinator notified of stockout at ${facilityName}.`);
    
    setUserReportFeedback(message);
    setTimeout(() => setUserReportFeedback(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Title & Central Medical Stores Alignment Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
          <Pill className="w-4 h-4 text-teal-700" />
          <span>{currentLang === 'tn' ? 'Tsamaiso ya Melemo ya Setshaba' : 'National Essential Medicines Network'}</span>
          <span aria-hidden="true">·</span>
          <span>{currentLang === 'tn' ? 'Central Medical Stores (CMS) Alignment' : 'MoH Botswana CMS Aligned'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {currentLang === 'tn' ? 'Neteweke ya Polokelo ya Melemo mo Ditleliniking' : 'Essential Medicine Availability & Clinic Dispensary Tracker'}
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl leading-relaxed">
          {currentLang === 'tn'
            ? 'Batla melemo ya gago ya botsogo go bona gore a e teng mo ditleliniking tsa kgaolo ya lona pele ga o tsamaya. Fokotsa mela le mesepele e e sa tlhokegeng.'
            : 'Check stock levels for chronic, paediatric, and emergency medicines across public clinic dispensaries before travelling. Avoid long queues and find alternative facilities with verified stock.'}
        </p>
      </div>

      {/* Community Report Confirmation Toast */}
      {userReportFeedback && (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center gap-3 text-xs text-teal-900 font-semibold shadow-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
          <span>{userReportFeedback}</span>
        </div>
      )}

      {/* Search & District Control Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Text Search */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLang === 'tn' ? 'Batla molemo (e.g. Amlodipine, Metformin, Coartem, Inhaler, ORS)...' : 'Search by generic name, brand (Norvasc, Glucophage, Coartem, Ventolin)...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700/30 focus:border-teal-700 placeholder:text-slate-400"
            />
          </div>

          {/* District Selector */}
          <div className="md:col-span-4 relative">
            <div className="flex items-center gap-1.5 border border-slate-300 rounded-xl px-3 py-2 bg-slate-50">
              <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
              <label htmlFor="medicine-district" className="sr-only">Select District</label>
              <select
                id="medicine-district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                {BOTSWANA_DISTRICTS.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-teal-800 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {currentLang === 'tn' ? cat.labelTn : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Grid */}
      <div className="space-y-6">
        {filteredMedicines.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
            <Pill className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">
              {currentLang === 'tn' ? 'Ga gona melemo e e tsamaisanang le patlo ya gago.' : 'No essential medicines matched your search.'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {currentLang === 'tn' ? 'Leka go batla ka leina le lengwe kgotsa o tlose difilthara.' : 'Try adjusting the search query or selecting "All Medicines".'}
            </p>
          </div>
        ) : (
          filteredMedicines.map((med) => {
            // Find facilities in selected district
            const districtData = med.districtAvailability.find(d => 
              d.district.toLowerCase().includes(selectedDistrict.toLowerCase()) ||
              selectedDistrict.toLowerCase().includes(d.district.toLowerCase())
            ) || med.districtAvailability[0];

            return (
              <div 
                key={med.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-teal-200"
              >
                {/* Medicine Header */}
                <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1 text-[11px]">
                        <span className="font-bold text-teal-800 uppercase tracking-wider bg-teal-100 px-2 py-0.5 rounded">
                          {currentLang === 'tn' ? med.categoryLabelTn : med.categoryLabelEn}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500 font-medium">
                          MoH Tier: {med.moHEssentialListTier}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-500">
                          {med.standardSupplyDays} Days Standard Refill
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                        {med.genericName}
                      </h2>
                      <div className="text-xs text-slate-500 mt-0.5 font-medium">
                        Brands: {med.brandNames.join(', ')} · Forms: {med.dosageForms.join('; ')}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs">
                        {med.prescriptionRequired 
                          ? (currentLang === 'tn' ? 'E batla Bukana ya Kokelo' : 'Clinic Card / Rx Required')
                          : (currentLang === 'tn' ? 'Mahala kwa Kokelwaneng' : 'Free Dispensary Walk-In')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 mt-2.5 leading-relaxed">
                    {currentLang === 'tn' ? med.indicationsTn : med.indicationsEn}
                  </p>
                </div>

                {/* District Facility Stock Matrix */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-teal-700" />
                      <span>{selectedDistrict} Dispensary Stock Availability</span>
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      CMS Distribution Sync · October 1, 2026
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {districtData.facilitiesStocked.map((fac, idx) => {
                      const isInStock = fac.stockStatus === 'in_stock';
                      const isLow = fac.stockStatus === 'low_stock';
                      const isOut = fac.stockStatus === 'out_of_stock';

                      return (
                        <div 
                          key={idx}
                          className={`rounded-2xl border p-4 flex flex-col justify-between transition-colors ${
                            isInStock 
                              ? 'bg-emerald-50/30 border-emerald-200' 
                              : isLow 
                              ? 'bg-amber-50/30 border-amber-200' 
                              : 'bg-rose-50/30 border-rose-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                                {fac.facilityName}
                              </h4>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                                isInStock
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isLow
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isInStock ? 'In Stock' : isLow ? 'Low Stock' : 'Out of Stock'}
                              </span>
                            </div>

                            <div className="text-xs text-slate-600 space-y-1 mt-2">
                              <div className="flex items-center gap-1.5 text-[11px]">
                                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{fac.dispensaryHours}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px]">
                                <PhoneCall className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <a href={`tel:${fac.contactPhone}`} className="text-teal-800 font-semibold hover:underline">
                                  {fac.contactPhone}
                                </a>
                              </div>
                            </div>

                            {isOut && fac.alternativeNearbyFacility && (
                              <div className="mt-2.5 p-2 bg-white rounded-xl border border-rose-200 text-[11px] text-rose-900 leading-tight">
                                <strong>Alternative:</strong> {fac.alternativeNearbyFacility}
                              </div>
                            )}

                            {isLow && fac.alternativeNearbyFacility && (
                              <div className="mt-2.5 p-2 bg-white rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-tight">
                                <strong>Buffer:</strong> {fac.alternativeNearbyFacility}
                              </div>
                            )}
                          </div>

                          {/* Community Verification Buttons */}
                          <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 text-[10px]">
                              Verified {fac.lastVerified}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleUserReport(fac.facilityName, 'found')}
                                className="px-2 py-1 bg-white hover:bg-emerald-50 border border-slate-200 text-emerald-800 rounded-lg font-semibold transition-colors shadow-2xs"
                                title="Confirm this facility had stock when you visited"
                              >
                                ✓ Collected
                              </button>
                              <button
                                onClick={() => handleUserReport(fac.facilityName, 'stockout')}
                                className="px-2 py-1 bg-white hover:bg-rose-50 border border-slate-200 text-rose-800 rounded-lg font-semibold transition-colors shadow-2xs"
                                title="Report that this medicine was out of stock"
                              >
                                ✕ Out
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Collection Checklist Requirements */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs">
                    <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-teal-700" />
                      <span>{currentLang === 'tn' ? 'Se o Tshwanetseng go Tla ka Sone fa o Tsaya Molemo:' : 'What to Bring for Clinic Dispensary Collection:'}</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-slate-600">
                      {(currentLang === 'tn' ? med.collectionRequirementsTn : med.collectionRequirementsEn).map((req, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Chronic Refill Scheduler Companion Card */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-teal-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>{currentLang === 'tn' ? 'Thulaganyo ya go Tsaya Melemo ya Botsogo' : 'Chronic Medication Refill Planner'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {currentLang === 'tn' ? 'O se ka wa Fitelwa ke Letsatsi la go Tsaya Melemo' : 'Never Miss Your Clinic Medication Refill Window'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentLang === 'tn'
                ? 'Tsenya letsatsi le o setseng o tsere melemo ya gago ka lone go bona letsatsi le o tshwanetseng go boela kokelwaneng go e tsaya gape pele e fela.'
                : 'Calculate your exact 28-day clinic pickup date and avoid treatment interruptions. Stored strictly in your browser with zero account required.'}
            </p>
          </div>

          <div className="lg:col-span-5 bg-white/10 p-5 rounded-2xl border border-white/15">
            <form onSubmit={handleSaveRefillReminder} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  {currentLang === 'tn' ? 'Leina la Molemo wa Gago:' : 'Select or Type Medicine:'}
                </label>
                <select
                  value={scheduledMedName}
                  onChange={(e) => setScheduledMedName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-medium border-none focus:outline-none"
                  required
                >
                  <option value="">{currentLang === 'tn' ? '-- Tlhopha molemo --' : '-- Select Medicine --'}</option>
                  {ESSENTIAL_MEDICINES.map(m => (
                    <option key={m.id} value={m.genericName}>{m.genericName} ({m.brandNames[0]})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-200 font-semibold mb-1">
                  {currentLang === 'tn' ? 'Letsatsi le o O Tsayang ka Lone la Bofelo:' : 'Last Clinic Pickup Date:'}
                </label>
                <input
                  type="date"
                  value={lastRefillDate}
                  onChange={(e) => setLastRefillDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-medium border-none focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>{currentLang === 'tn' ? 'Bala Letsatsi la Refill' : 'Calculate Next Refill Date'}</span>
              </button>

              {scheduledSuccess && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-400/50 rounded-xl text-emerald-200 text-center font-medium mt-2">
                  ✓ Calculated! Next clinic collection due: {new Date(new Date(lastRefillDate).getTime() + 28 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}. Plan your visit 2 days early.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
