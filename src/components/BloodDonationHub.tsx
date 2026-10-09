import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Droplet, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Calendar, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Building2,
  Users,
  Sparkles,
  Info
} from 'lucide-react';
import { NBTS_BLOOD_BANKS, DONOR_ELIGIBILITY_CRITERIA, BloodBankReserve } from '../data/bloodBankData';
import { LanguageCode } from '../types';

interface BloodDonationHubProps {
  currentLang: LanguageCode;
  onNavigateToFacilities?: (tier?: string) => void;
}

export const BloodDonationHub: React.FC<BloodDonationHubProps> = ({
  currentLang,
  onNavigateToFacilities
}) => {
  const [selectedBankId, setSelectedBankId] = useState<string>(NBTS_BLOOD_BANKS[0].facilityId);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, boolean>>({});
  const [pledgeCenter, setPledgeCenter] = useState<string>(NBTS_BLOOD_BANKS[0].facilityName);
  const [pledgeDate, setPledgeDate] = useState<string>('');
  const [pledgeSuccess, setPledgeSuccess] = useState<boolean>(false);

  const selectedBank = NBTS_BLOOD_BANKS.find(b => b.facilityId === selectedBankId) || NBTS_BLOOD_BANKS[0];

  const allEligible = DONOR_ELIGIBILITY_CRITERIA.length > 0 && 
    DONOR_ELIGIBILITY_CRITERIA.every(crit => quizAnswers[crit.id] === true);

  const handleToggleCriterion = (id: string) => {
    setQuizAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeDate || !pledgeCenter) return;
    setPledgeSuccess(true);
    setTimeout(() => setPledgeSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Title & NBTS Alignment */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 mb-1">
          <Droplet className="w-4 h-4 text-rose-600 fill-rose-600 animate-pulse" />
          <span>{currentLang === 'tn' ? 'Tsamaiso ya Madi a Botshelo' : 'National Blood Transfusion Service (NBTS)'}</span>
          <span aria-hidden="true">·</span>
          <span>{currentLang === 'tn' ? 'Ministry of Health Botswana' : 'MoH Botswana Clinical Network'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {currentLang === 'tn' ? 'Madi a Botshelo: Polokelo le Kopo ya Potlako ya Baabi ba Madi' : 'National Blood Reserves & Corridor Donor Network'}
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl leading-relaxed">
          {currentLang === 'tn'
            ? 'Bona selekanyo sa madi mo dipateleng tse dikgolo tsa Botswana, matshwao a madi a a tlhaelang thata (segolo jang O-negative), le mafelo a go abela madi gaufi le wena.'
            : 'Track live hospital blood bank reserves across Botswana trauma corridors, identify critical shortages (especially universal O-negative), and find permanent or mobile NBTS donation centers.'}
        </p>
      </div>

      {/* Critical Shortage Warning Banner */}
      <div className="bg-rose-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-rose-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-800 border border-rose-700 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-rose-200 animate-bounce" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
              {currentLang === 'tn' ? 'Kopo ya Potlako ya Setshaba' : 'Urgent Corridor Appeal'}
            </div>
            <h2 className="text-base sm:text-lg font-bold">
              {currentLang === 'tn' 
                ? 'Tlhaelo e Kgolo ya Madi a O-Negative & B-Negative mo Tseleng ya A1' 
                : 'Critical Shortage: O-Negative & B-Negative Across A1 Trauma Corridors'}
            </h2>
            <p className="text-xs text-rose-200 mt-1 max-w-2xl leading-relaxed">
              {currentLang === 'tn'
                ? 'Sepatela sa Princess Marina le sa Nyangabgwe di na le madi a a sa lekaneng malatsi a mabedi. Baabi ba ba nang le madi a O-negative ba kopiwa go etela diofisi tsa NBTS ka bofefo.'
                : 'Princess Marina and Nyangabgwe blood banks have under 2 days of emergency reserve remaining for highway trauma and maternity casualty. Healthy donors are urgently invited to donate.'}
            </p>
          </div>
        </div>

        <a
          href="tel:+2673621400"
          className="px-4 py-2.5 bg-white text-rose-950 font-bold rounded-xl text-xs hover:bg-rose-50 transition-colors whitespace-nowrap shadow-xs"
        >
          {currentLang === 'tn' ? 'Leletsa NBTS: 362 1400' : 'Call NBTS Donor Line'}
        </a>
      </div>

      {/* Regional Blood Bank Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {NBTS_BLOOD_BANKS.map((bank) => (
          <button
            key={bank.facilityId}
            onClick={() => setSelectedBankId(bank.facilityId)}
            className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 text-left ${
              selectedBankId === bank.facilityId
                ? 'bg-teal-900 text-white border-teal-900 shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <div className="text-xs font-bold">{bank.facilityName.split(' ')[0]} {bank.facilityName.split(' ')[1]}</div>
            <div className={`text-[10px] mt-0.5 ${selectedBankId === bank.facilityId ? 'text-teal-200' : 'text-slate-500'}`}>
              {bank.district} · {bank.daysOfSupplyRemaining} Days Left
            </div>
          </button>
        ))}
      </div>

      {/* Selected Bank Live Status & Blood Group Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <Building2 className="w-3.5 h-3.5 text-teal-700" />
              <span>{selectedBank.facilityName}</span>
              <span className="text-slate-300">·</span>
              <span>{selectedBank.region}</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Live Reserve Inventory by Blood Group
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              selectedBank.overallStatus === 'critical'
                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                : selectedBank.overallStatus === 'low'
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              Overall: {selectedBank.overallStatus} ({selectedBank.daysOfSupplyRemaining} days supply)
            </span>
          </div>
        </div>

        {/* 8 Blood Groups Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {selectedBank.bloodGroups.map((bg) => {
            const isCritical = bg.status === 'critical_emergency';
            const isLow = bg.status === 'low';
            const percentage = Math.min(100, Math.round((bg.unitsOnHand / bg.targetUnits) * 100));

            return (
              <div 
                key={bg.group}
                className={`rounded-2xl border p-3 text-center transition-all ${
                  isCritical 
                    ? 'bg-rose-50/80 border-rose-300 shadow-2xs' 
                    : isLow 
                    ? 'bg-amber-50/50 border-amber-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-lg font-black font-mono text-slate-900">
                    {bg.group}
                  </span>
                  {bg.urgentAppealActive && (
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                  )}
                </div>

                <div className="text-sm font-extrabold text-slate-900 font-mono">
                  {bg.unitsOnHand} <span className="text-[10px] text-slate-500 font-normal">/ {bg.targetUnits}</span>
                </div>

                {/* Micro Progress Bar */}
                <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      isCritical ? 'bg-rose-600' : isLow ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className={`text-[10px] font-bold uppercase mt-2 ${
                  isCritical ? 'text-rose-700' : isLow ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  {isCritical ? 'Critical' : isLow ? 'Low' : 'Adequate'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Donation Center Details & Mobile Schedule */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-700" />
              <span>Permanent Donation Center Location:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {selectedBank.donationCenter.location}
            </p>
            <div className="mt-2 text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedBank.donationCenter.operatingHours}</span>
            </div>
          </div>

          <div>
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-700" />
              <span>Upcoming NBTS Mobile Donation Bus Drive:</span>
            </div>
            {selectedBank.donationCenter.nextMobileDriveDate ? (
              <div className="text-slate-700 leading-relaxed space-y-1">
                <div className="font-semibold text-rose-900">
                  Date: {selectedBank.donationCenter.nextMobileDriveDate}
                </div>
                <div>Location: {selectedBank.donationCenter.nextMobileDriveLocation}</div>
              </div>
            ) : (
              <p className="text-slate-500">Contact center directly for community mobile bus bookings.</p>
            )}
            <div className="mt-2 text-teal-800 font-semibold flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-teal-700" />
              <a href={`tel:${selectedBank.donationCenter.phone}`} className="hover:underline">
                {selectedBank.donationCenter.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Section: 30-Second Eligibility Quiz & Pledge Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 30-Second Eligibility Quiz */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-4">
          <div>
            <div className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>{currentLang === 'tn' ? 'Tlhatlhobo ya Bofefo ya go Aba Madi' : '30-Second Donor Eligibility Check'}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Can You Safely Donate Blood Today?
            </h3>
            <p className="text-xs text-slate-600">
              Check off the basic safety criteria below before walking into your nearest NBTS center.
            </p>
          </div>

          <div className="space-y-2.5">
            {DONOR_ELIGIBILITY_CRITERIA.map((crit) => {
              const checked = !!quizAnswers[crit.id];
              return (
                <button
                  key={crit.id}
                  onClick={() => handleToggleCriterion(crit.id)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                    checked 
                      ? 'bg-emerald-50/50 border-emerald-300' 
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-[13px] text-slate-800 leading-snug font-medium">
                    {currentLang === 'tn' ? crit.textTn : crit.textEn}
                  </span>
                </button>
              );
            })}
          </div>

          <div className={`p-4 rounded-2xl border text-xs leading-relaxed transition-all ${
            allEligible 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
              : 'bg-slate-100 border-slate-200 text-slate-600'
          }`}>
            {allEligible ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  <strong>You meet all general donor criteria!</strong> One donation saves up to 3 lives across Botswana hospitals. Walk into {selectedBank.facilityName.split(' ')[0]} {selectedBank.facilityName.split(' ')[1]} today.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Select all criteria that apply to you to confirm donation eligibility.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Pledge Blood Donation */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 rounded-3xl p-6 sm:p-7 text-white shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-rose-300" />
              <span>{currentLang === 'tn' ? 'Ikanise go Thusa Botshelo' : 'Blood Donation Pledge'}</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              Pledge a Lifesaving Donation in Botswana
            </h3>
            <p className="text-xs text-rose-200 leading-relaxed">
              Every donation provides red cells for trauma accidents, platelets for cancer patients, and plasma for mothers with postpartum haemorrhage.
            </p>

            <form onSubmit={handlePledgeSubmit} className="space-y-3 pt-2 text-xs text-slate-900">
              <div>
                <label className="block text-rose-200 font-semibold mb-1">
                  Preferred Donation Center:
                </label>
                <select
                  value={pledgeCenter}
                  onChange={(e) => setPledgeCenter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-medium focus:outline-none"
                  required
                >
                  {NBTS_BLOOD_BANKS.map(b => (
                    <option key={b.facilityId} value={b.facilityName}>{b.facilityName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-rose-200 font-semibold mb-1">
                  Pledge Date:
                </label>
                <input
                  type="date"
                  value={pledgeDate}
                  onChange={(e) => setPledgeDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 font-medium focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                <Droplet className="w-4 h-4 fill-white" />
                <span>Confirm My Blood Pledge</span>
              </button>

              {pledgeSuccess && (
                <div className="p-3 bg-emerald-950/90 border border-emerald-400 text-emerald-200 rounded-xl text-center font-medium mt-2">
                  ✓ Pledge Recorded! Re a leboga! Remember to drink plenty of clean water and eat a healthy meal before donating.
                </div>
              )}
            </form>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-rose-300">
            <strong>NBTS Fact:</strong> Whole blood can be safely donated every 90 days. The body naturally replenishes plasma within 24 hours and red cells within 4 weeks.
          </div>
        </div>
      </div>
    </div>
  );
};
