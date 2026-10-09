import React, { useState, useMemo, useEffect } from 'react';
import { 
  Video, 
  Phone, 
  MessageSquare, 
  PhoneCall, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Filter, 
  Stethoscope, 
  Building2, 
  FileText, 
  Lock, 
  Sparkles, 
  Mic, 
  MicOff, 
  VideoOff, 
  X, 
  Download, 
  Share2, 
  Info,
  CalendarCheck,
  Send,
  QrCode,
  Award,
  AlertCircle
} from 'lucide-react';
import { LanguageCode, HealthcareProvider, ScheduledAppointment, ConsultationModality, ProviderSpecialty } from '../types';
import { BOTSWANA_DISTRICTS } from '../data/languages';
import { BOTSWANA_TELEHEALTH_PROVIDERS, AVAILABLE_TIME_SLOTS } from '../data/telehealthProvidersData';
import { 
  getStoredAppointments, 
  saveAppointment, 
  cancelAppointment, 
  filterProviders 
} from '../services/telehealthService';

interface RemoteConsultationPortalProps {
  currentLang: LanguageCode;
  initialDistrict?: string;
  onNavigateToFacilities?: (districtName?: string) => void;
  onNavigateToTriage?: () => void;
  onOpenEmergency?: () => void;
}

export const RemoteConsultationPortal: React.FC<RemoteConsultationPortalProps> = ({
  currentLang,
  initialDistrict,
  onNavigateToFacilities,
  onNavigateToTriage,
  onOpenEmergency,
}) => {
  // Navigation / active sub-view
  const [activeTab, setActiveTab] = useState<'browse' | 'my_appointments' | 'virtual_room'>('browse');

  // Filters
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict || 'All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Booking Wizard State
  const [bookingProvider, setBookingProvider] = useState<HealthcareProvider | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-02');
  const [selectedSlot, setSelectedSlot] = useState<string>('14:30 - 15:00');
  const [selectedBookingModality, setSelectedBookingModality] = useState<ConsultationModality>('video');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [chiefComplaint, setChiefComplaint] = useState<string>('');
  const [symptomDuration, setSymptomDuration] = useState<string>('2_3_days');
  const [attachTriage, setAttachTriage] = useState<boolean>(true);
  const [emergencyAcknowledged, setEmergencyAcknowledged] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<ScheduledAppointment | null>(null);

  // Appointments State
  const [appointments, setAppointments] = useState<ScheduledAppointment[]>([]);

  // Virtual Call Simulator State
  const [activeCallAppointment, setActiveCallAppointment] = useState<ScheduledAppointment | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);
  const [callDurationSeconds, setCallDurationSeconds] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'doctor' | 'patient'; text: string; time: string }>>([
    { sender: 'doctor', text: 'Dumela! Welcome to your secure PHELO consultation. Can you hear and see me clearly?', time: '14:30' }
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  // Load appointments from storage on mount
  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  // Update district filter if initialDistrict prop changes
  useEffect(() => {
    if (initialDistrict && initialDistrict !== 'All') {
      setSelectedDistrict(initialDistrict);
    }
  }, [initialDistrict]);

  // Call timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTab === 'virtual_room' && activeCallAppointment) {
      interval = setInterval(() => {
        setCallDurationSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTab, activeCallAppointment]);

  // Filtered providers
  const filteredProviders = useMemo(() => {
    return filterProviders(
      BOTSWANA_TELEHEALTH_PROVIDERS,
      selectedDistrict,
      selectedSpecialty,
      selectedModality,
      searchQuery
    );
  }, [selectedDistrict, selectedSpecialty, selectedModality, searchQuery]);

  // Handle Booking Submit
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingProvider) return;
    if (!patientName.trim()) {
      alert(currentLang === 'tn' ? 'Tswee-tswee tsenya leina la gago' : 'Please provide your name or initials');
      return;
    }
    if (!patientPhone.trim()) {
      alert(currentLang === 'tn' ? 'Tswee-tswee tsenya nomoro ya mogala' : 'Please provide your contact phone number for SMS confirmation');
      return;
    }
    if (!chiefComplaint.trim()) {
      alert(currentLang === 'tn' ? 'Tswee-tswee tlhalosa lebaka la go kopa therisano' : 'Please describe your main health reason or symptoms');
      return;
    }

    const newApp = saveAppointment({
      providerId: bookingProvider.id,
      providerName: bookingProvider.name,
      providerSpecialty: bookingProvider.specialtyLabelEn,
      facilityName: bookingProvider.facility,
      district: bookingProvider.district,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      modality: selectedBookingModality,
      date: selectedDate,
      timeSlot: selectedSlot,
      chiefComplaint: chiefComplaint.trim(),
      symptomDuration,
      triageSummaryAttached: attachTriage,
    });

    setAppointments(getStoredAppointments());
    setBookingSuccess(newApp);
  };

  // Launch Virtual Room
  const handleLaunchCall = (app: ScheduledAppointment) => {
    setActiveCallAppointment(app);
    setActiveTab('virtual_room');
    setCallDurationSeconds(0);
    setChatMessages([
      { 
        sender: 'doctor', 
        text: `Dumela ${app.patientName}! I have reviewed your consultation note regarding "${app.chiefComplaint.slice(0, 45)}...". How are you feeling right now?`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'patient' as const, text: newChatMessage.trim(), time };
    setChatMessages(prev => [...prev, userMsg]);
    setNewChatMessage('');

    // Simulated doctor response after 1.5s
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'doctor',
          text: 'Understood. Based on clinical protocols, I am updating your electronic prescription and health summary now. You will be able to collect any prescribed medications at your nearest clinic.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  const formatCallTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Top Banner / Philosophy */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-teal-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-900/60 text-teal-300 border border-teal-700/60">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>
                {currentLang === 'tn' 
                  ? 'Therisano e e Sireletsegileng ya Kgakala · MoH TeleHealth Standard' 
                  : 'Certified Botswana Healthcare Provider Teleconsult Portal'}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {currentLang === 'tn' 
                ? 'Itekodise: Therisano ya Kgakala le Dingaka' 
                : 'PHELO TeleHealth: Remote Consultation Portal'}
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {currentLang === 'tn'
                ? 'Kopana le dingaka le baoki ba maemo a a kwa godimo mo kgaolong ya gago ka video, mogala o o sa tlhokeng maranyane a mantsi, kgotsa thulaganyo ya go founelwa mahala ke tleliniki.'
                : 'Securely consult certified Botswana physicians, nurse-midwives, and paediatricians in your district. Designed for all connectivity levels—from low-data audio calls to free clinic callbacks.'}
            </p>
          </div>

          {/* Emergency Safety Intercept Pill */}
          <div className="bg-rose-950/40 border border-rose-800/60 p-4 rounded-2xl shrink-0 max-w-xs space-y-2">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{currentLang === 'tn' ? 'Tshireletso ya Potlako' : 'Emergency Safety Check'}</span>
            </div>
            <p className="text-xs text-rose-200/90 leading-tight">
              {currentLang === 'tn'
                ? 'Fa motho a idibetse, a tswa madi a mantsi kgotsa pelo e opa thata, bitsa 997 ka bonako.'
                : 'If experiencing severe chest pain, heavy bleeding, or convulsions, do not wait for virtual consultation.'}
            </p>
            <button
              onClick={onOpenEmergency}
              className="w-full py-1.5 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors"
            >
              {currentLang === 'tn' ? 'Bona Dikhutsafalo tsa 997' : 'Call 997 / Nearest Casualty'}
            </button>
          </div>
        </div>

        {/* Portal Sub-Navigation Tabs */}
        <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setActiveTab('browse'); setBookingProvider(null); setBookingSuccess(null); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'browse'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>{currentLang === 'tn' ? 'Batla Dingaka & Rulaganya' : 'Find Providers & Book'}</span>
          </button>

          <button
            onClick={() => setActiveTab('my_appointments')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 relative ${
              activeTab === 'my_appointments'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{currentLang === 'tn' ? 'Ditherisano tsa Me' : 'My Scheduled Consultations'}</span>
            {appointments.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center">
                {appointments.length}
              </span>
            )}
          </button>

          {activeCallAppointment && (
            <button
              onClick={() => setActiveTab('virtual_room')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'virtual_room'
                  ? 'bg-emerald-500 text-slate-950 shadow-md animate-pulse'
                  : 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{currentLang === 'tn' ? 'Tsena mo Phaposing ya Ngaka' : 'Active Consultation Room'}</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: BROWSE PROVIDERS & BOOKING WIZARD */}
      {/* ========================================================================= */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Booking Modal / Drawer if a provider is selected */}
          {bookingProvider ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <button
                  onClick={() => { setBookingProvider(null); setBookingSuccess(null); }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{currentLang === 'tn' ? 'Boela morago kwa lenaneng' : 'Back to Provider List'}</span>
                </button>

                <div className="text-xs text-slate-500 font-mono">
                  {bookingProvider.bhpcRegistration}
                </div>
              </div>

              {bookingSuccess ? (
                /* Booking Success Receipt */
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-slate-900 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-emerald-950">
                      {currentLang === 'tn' ? 'Therisano e Rulagantswe ka Katlego!' : 'Consultation Confirmed!'}
                    </h3>
                    <p className="text-sm text-emerald-800 mt-1">
                      {currentLang === 'tn'
                        ? `O beile nako le ${bookingSuccess.providerName} ka ${bookingSuccess.date} ka nako ya ${bookingSuccess.timeSlot}.`
                        : `Your virtual appointment with ${bookingSuccess.providerName} is booked for ${bookingSuccess.date} at ${bookingSuccess.timeSlot}.`}
                    </p>
                  </div>

                  {/* Booking Details Card */}
                  <div className="bg-white p-4 rounded-xl border border-emerald-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Appointment Ref:</span>
                      <strong className="font-mono text-slate-900">{bookingSuccess.id.slice(0, 16).toUpperCase()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Facility / Clinic:</span>
                      <strong className="text-slate-900">{bookingSuccess.facilityName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Modality:</span>
                      <strong className="uppercase text-teal-800 font-bold">{bookingSuccess.modality}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Patient Phone:</span>
                      <strong className="text-slate-900">{bookingSuccess.patientPhone}</strong>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      {currentLang === 'tn'
                        ? 'O tla amogela molaetsa wa SMS mo mogaleng wa gago pele ga nako ya therisano le link ya go tsena mo phaposing.'
                        : 'You will receive an automated SMS reminder 15 minutes before your slot. Toll-free callback users will receive a direct phone ring.'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => handleLaunchCall(bookingSuccess)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
                    >
                      <Video className="w-4 h-4" />
                      <span>{currentLang === 'tn' ? 'Tsena mo Phaposing Jaanong (Test)' : 'Enter Waiting Room Now'}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('my_appointments')}
                      className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50"
                    >
                      {currentLang === 'tn' ? 'Bona Ditherisano Tsotlhe' : 'View in My Appointments'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleConfirmBooking} className="space-y-6">
                  {/* Provider Header in Form */}
                  <div className="flex items-start gap-4 p-4 bg-teal-50/60 rounded-2xl border border-teal-100">
                    <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-bold text-lg shrink-0">
                      {bookingProvider.name.split(' ')[1]?.[0] || 'D'}
                    </div>
                    <div>
                      <div className="text-xs text-teal-800 font-semibold">{bookingProvider.specialtyLabelEn}</div>
                      <h3 className="text-lg font-bold text-slate-900">{bookingProvider.name}</h3>
                      <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{bookingProvider.facility} · {bookingProvider.district}</span>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Modality Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                      {currentLang === 'tn' ? '1. Tlhopha Mokgwa wa Therisano' : '1. Select Consultation Modality'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {bookingProvider.supportedModalities.map((mod) => (
                        <button
                          key={mod}
                          type="button"
                          onClick={() => setSelectedBookingModality(mod)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selectedBookingModality === mod
                              ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-500/20 text-teal-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {mod === 'video' && <Video className="w-4 h-4 text-teal-700" />}
                            {mod === 'audio' && <Phone className="w-4 h-4 text-sky-700" />}
                            {mod === 'callback' && <PhoneCall className="w-4 h-4 text-emerald-700" />}
                            {mod === 'chat' && <MessageSquare className="w-4 h-4 text-purple-700" />}
                            <span className="capitalize text-xs font-bold">
                              {mod === 'callback' ? 'Clinic Callback' : mod}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight">
                            {mod === 'video' && 'Encrypted HD video'}
                            {mod === 'audio' && 'Low-data voice call'}
                            {mod === 'callback' && 'Toll-free voice call'}
                            {mod === 'chat' && 'Secure messaging'}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                        {currentLang === 'tn' ? '2. Letsatsi la Therisano' : '2. Consultation Date'}
                      </label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="2026-10-02">Today · Friday, 02 October 2026</option>
                        <option value="2026-10-03">Tomorrow · Saturday, 03 October 2026</option>
                        <option value="2026-10-05">Monday · 05 October 2026</option>
                        <option value="2026-10-06">Tuesday · 06 October 2026</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                        {currentLang === 'tn' ? '3. Nako e e Gololesegileng' : '3. Available Time Slot'}
                      </label>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500"
                      >
                        {AVAILABLE_TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Patient Details & Reason */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                        {currentLang === 'tn' ? '4. Leina la Molwetse / Ditlhaka' : '4. Patient Name or Initials'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kagiso M. or Boitumelo"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                        {currentLang === 'tn' ? '5. Nomoro ya Mogala (Botswana +267)' : '5. Contact Phone Number (+267)'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+267 72 000 000"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Chief Complaint */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
                      {currentLang === 'tn' ? '6. Lebaka la Therisano & Matshwao' : '6. Reason for Visit & Key Symptoms'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={
                        currentLang === 'tn'
                          ? 'Tlhalosa ka bokhutshwane matshwao a o a utlwang, lobaka le o nang le one le fa o kile wa nwa melemo mengwe...'
                          : 'Describe your symptoms, how long you have felt unwell, and any questions about medicines or test results...'
                      }
                      value={chiefComplaint}
                      onChange={(e) => setChiefComplaint(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* Link Prior Triage Checkbox */}
                  <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <input
                      type="checkbox"
                      id="attachTriage"
                      checked={attachTriage}
                      onChange={(e) => setAttachTriage(e.target.checked)}
                      className="rounded text-teal-600 focus:ring-teal-500 mt-0.5"
                    />
                    <label htmlFor="attachTriage" className="text-slate-700 cursor-pointer">
                      <strong>Attach Prior Triage Assessment:</strong> Automatically share my recent anonymous symptom triage score and red flag answers with this healthcare provider.
                    </label>
                  </div>

                  {/* Safety Intercept Checkbox */}
                  <div className="flex items-start gap-2.5 p-3 bg-rose-50/70 rounded-xl border border-rose-200 text-xs">
                    <input
                      type="checkbox"
                      id="emergencyAck"
                      required
                      checked={emergencyAcknowledged}
                      onChange={(e) => setEmergencyAcknowledged(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500 mt-0.5"
                    />
                    <label htmlFor="emergencyAck" className="text-rose-950 font-medium cursor-pointer">
                      I confirm that the patient is NOT currently experiencing life-threatening emergency signs (severe difficulty breathing, loss of consciousness, uncontrolled bleeding, or acute chest trauma).
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setBookingProvider(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
                    >
                      {currentLang === 'tn' ? 'Tlogela' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={!emergencyAcknowledged}
                      className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-xs"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>{currentLang === 'tn' ? 'Rulaganya Therisano Jaanong' : 'Confirm & Schedule Appointment'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Provider Directory Filter Bar + Provider Cards Grid */
            <>
              {/* Filtering Controls */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder={
                        currentLang === 'tn'
                          ? 'Batla ngaka ka leina, sepatela kgotsa kgaolo...'
                          : 'Search by provider name, facility, specialty, or language...'
                      }
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  {/* District Dropdown */}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-800"
                    >
                      <option value="All">All Botswana Districts (Nationwide)</option>
                      {BOTSWANA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Modality and Specialty Pills */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
                      <Filter className="w-3 h-3" />
                      <span>Specialty:</span>
                    </span>
                    <button
                      onClick={() => setSelectedSpecialty('all')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedSpecialty === 'all'
                          ? 'bg-teal-700 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All Specialties
                    </button>
                    <button
                      onClick={() => setSelectedSpecialty('general_opd')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedSpecialty === 'general_opd'
                          ? 'bg-teal-700 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      General OPD & Family
                    </button>
                    <button
                      onClick={() => setSelectedSpecialty('maternal_antenatal')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedSpecialty === 'maternal_antenatal'
                          ? 'bg-teal-700 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Maternal & Midwifery
                    </button>
                    <button
                      onClick={() => setSelectedSpecialty('paediatrics')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedSpecialty === 'paediatrics'
                          ? 'bg-teal-700 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Paediatrics
                    </button>
                    <button
                      onClick={() => setSelectedSpecialty('chronic_ncd')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedSpecialty === 'chronic_ncd'
                          ? 'bg-teal-700 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Hypertension & Diabetes
                    </button>
                    <button
                      onClick={() => setSelectedSpecialty('mental_wellness')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedSpecialty === 'mental_wellness'
                          ? 'bg-teal-700 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Mental Wellness
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <span>{filteredProviders.length} Providers Available</span>
                  </div>
                </div>
              </div>

              {/* Provider Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProviders.map((provider) => (
                  <div
                    key={provider.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Provider Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-800 to-sky-700 text-white flex items-center justify-center font-black text-lg shadow-xs shrink-0">
                          {provider.name.split(' ')[1]?.[0] || 'D'}
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            ★ {provider.rating} ({provider.reviewsCount})
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1 font-mono">
                            {provider.bhpcRegistration}
                          </div>
                        </div>
                      </div>

                      {/* Name & Title */}
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {provider.name}
                      </h3>
                      <div className="text-xs font-semibold text-teal-800 mt-0.5">
                        {currentLang === 'tn' ? provider.titleTn : provider.titleEn}
                      </div>

                      {/* District & Facility */}
                      <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium text-slate-800">{provider.facility}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <span>{provider.district}</span>
                        </div>
                      </div>

                      {/* Bio snippet */}
                      <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                        {currentLang === 'tn' ? provider.bioTn : provider.bioEn}
                      </p>

                      {/* Supported Modalities Badges */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                        {provider.supportedModalities.map((mod) => (
                          <span
                            key={mod}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 flex items-center gap-1"
                          >
                            {mod === 'video' && <Video className="w-2.5 h-2.5 text-teal-700" />}
                            {mod === 'audio' && <Phone className="w-2.5 h-2.5 text-sky-700" />}
                            {mod === 'callback' && <PhoneCall className="w-2.5 h-2.5 text-emerald-700" />}
                            {mod === 'chat' && <MessageSquare className="w-2.5 h-2.5 text-purple-700" />}
                            <span className="capitalize">{mod === 'callback' ? 'Free Callback' : mod}</span>
                          </span>
                        ))}
                        <span className="ml-auto text-[10px] text-slate-400">
                          {provider.languages.join(' · ')}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{provider.nextAvailableSlot}</span>
                      </div>

                      <button
                        onClick={() => {
                          setBookingProvider(provider);
                          setSelectedBookingModality(provider.supportedModalities[0] || 'video');
                        }}
                        className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <span>{currentLang === 'tn' ? 'Beela Nako' : 'Book Appointment'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: MY SCHEDULED APPOINTMENTS */}
      {/* ========================================================================= */}
      {activeTab === 'my_appointments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {currentLang === 'tn' ? 'Ditherisano tsa Me tse di Rulagantsweng' : 'Your Scheduled Virtual Consultations'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentLang === 'tn'
                  ? 'Bona ditherisano tsa gago tsa kgakala, tsena mo phaposing ya ngaka kgotsa o fetole nako.'
                  : 'Manage upcoming telehealth appointments, view provider clinical notes, and access e-prescriptions.'}
              </p>
            </div>

            <button
              onClick={() => { setActiveTab('browse'); setBookingProvider(null); }}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs"
            >
              <Calendar className="w-4 h-4" />
              <span>{currentLang === 'tn' ? 'Rulaganya e Nngwe' : 'Book New Consultation'}</span>
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                {currentLang === 'tn' ? 'Ga go na ditherisano tse di rulagantsweng' : 'No Consultations Scheduled'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {currentLang === 'tn'
                  ? 'Ga o ise o bee nako le ngaka epe ya kgaolo ya gago. Tobetsa fa tlase go batla ngaka.'
                  : 'You have not booked any remote appointments yet. Choose a provider from your district to get started.'}
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="mt-2 px-5 py-2.5 bg-teal-700 text-white text-xs font-bold rounded-xl"
              >
                Browse District Clinicians
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-teal-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">
                        REF: {app.id.slice(0, 16).toUpperCase()}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">
                        {app.providerName}
                      </h4>
                      <div className="text-xs font-semibold text-teal-800">
                        {app.providerSpecialty}
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : app.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-teal-50 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  {/* Timing & Modality Pill */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-teal-700" />
                        <span>Date & Slot</span>
                      </div>
                      <div className="font-bold text-slate-800 mt-0.5">{app.date}</div>
                      <div className="text-[11px] text-slate-600">{app.timeSlot}</div>
                    </div>

                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-teal-700" />
                        <span>District & Modality</span>
                      </div>
                      <div className="font-bold text-slate-800 mt-0.5">{app.district}</div>
                      <div className="text-[11px] text-teal-800 font-semibold uppercase">{app.modality}</div>
                    </div>
                  </div>

                  {/* Chief Complaint */}
                  <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100 text-xs">
                    <span className="font-bold text-teal-900">Reason: </span>
                    <span className="text-slate-700">{app.chiefComplaint}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleLaunchCall(app)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>{currentLang === 'tn' ? 'Tsena mo Phaposing' : 'Enter Consultation'}</span>
                    </button>

                    {app.status !== 'cancelled' && (
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to cancel this appointment?')) {
                            const updated = cancelAppointment(app.id);
                            setAppointments(updated);
                          }
                        }}
                        className="px-3 py-1.5 text-xs text-rose-700 hover:text-rose-900 font-semibold"
                      >
                        {currentLang === 'tn' ? 'Khansela' : 'Cancel'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: ACTIVE VIRTUAL CONSULTATION ROOM SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'virtual_room' && activeCallAppointment && (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 text-white p-4 sm:p-6 shadow-2xl space-y-6">
          {/* Room Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-xs text-teal-400 font-mono flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  <span>256-bit Encrypted Consultation Session · Ref: {activeCallAppointment.id.slice(0, 12)}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Consultation with {activeCallAppointment.providerName}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold text-emerald-400">
                ⏱ {formatCallTime(callDurationSeconds)}
              </div>

              <button
                onClick={() => setShowPrescriptionModal(true)}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{currentLang === 'tn' ? 'Kaelo ya Melemo (e-Prescription)' : 'View e-Prescription'}</span>
              </button>

              <button
                onClick={() => setActiveTab('my_appointments')}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold"
              >
                {currentLang === 'tn' ? 'Tswala Phaposi' : 'Leave Room'}
              </button>
            </div>
          </div>

          {/* Main Call Stage: Video Preview + Live Chat & Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Video Feeds & Controls */}
            <div className="lg:col-span-8 space-y-4">
              {/* Doctor Video Feed (Simulated Realistic Stream) */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                {/* Doctor Overlay Info */}
                <div className="flex items-center justify-between">
                  <div className="bg-slate-950/80 backdrop-blur-xs px-3 py-1 rounded-lg border border-slate-700 text-xs font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{activeCallAppointment.providerName}</span>
                    <span className="text-[10px] text-slate-400">({activeCallAppointment.facilityName})</span>
                  </div>

                  <span className="text-[10px] font-mono text-teal-300 bg-teal-950/70 px-2 py-0.5 rounded border border-teal-800">
                    HD · 1080p WebRTC
                  </span>
                </div>

                {/* Doctor Avatar / Visualizer */}
                <div className="text-center my-auto space-y-3">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-700 to-sky-600 mx-auto flex items-center justify-center text-3xl font-black shadow-lg border-2 border-teal-400 ring-8 ring-teal-500/20">
                    {activeCallAppointment.providerName.split(' ')[1]?.[0] || 'D'}
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">
                      {activeCallAppointment.providerName}
                    </div>
                    <div className="text-xs text-teal-300">
                      {activeCallAppointment.providerSpecialty}
                    </div>
                  </div>
                  {/* Audio Waveform Indicator */}
                  <div className="flex items-center justify-center gap-1 h-5">
                    <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-3" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-5 delay-100" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-2 delay-200" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-bounce h-4 delay-300" />
                  </div>
                </div>

                {/* Patient Self-View Window (Bottom Right) */}
                <div className="absolute bottom-4 right-4 w-32 sm:w-40 aspect-video bg-slate-800 rounded-xl border-2 border-slate-700 overflow-hidden shadow-lg flex items-center justify-center">
                  {isVideoDisabled ? (
                    <div className="text-center text-slate-400 text-[10px]">
                      <VideoOff className="w-5 h-5 mx-auto mb-1 opacity-70" />
                      <span>Camera Off</span>
                    </div>
                  ) : (
                    <div className="text-center text-slate-300 text-[10px]">
                      <div className="w-8 h-8 rounded-full bg-teal-700 mx-auto mb-1 flex items-center justify-center font-bold text-xs">
                        {activeCallAppointment.patientName[0] || 'P'}
                      </div>
                      <span>{activeCallAppointment.patientName} (You)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* In-Call Media Controls Bar */}
              <div className="flex items-center justify-center gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setIsMicMuted(!isMicMuted)}
                  className={`p-3 rounded-xl transition-all ${
                    isMicMuted
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                  title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                >
                  {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsVideoDisabled(!isVideoDisabled)}
                  className={`p-3 rounded-xl transition-all ${
                    isVideoDisabled
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                  title={isVideoDisabled ? 'Turn On Camera' : 'Turn Off Camera'}
                >
                  {isVideoDisabled ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>

                <div className="h-6 w-px bg-slate-700 mx-2" />

                <button
                  onClick={() => setShowPrescriptionModal(true)}
                  className="px-4 py-2.5 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Clinical Prescription</span>
                </button>

                <button
                  onClick={() => {
                    alert('Consultation concluded successfully. Clinical notes have been saved to your digital health record.');
                    setActiveTab('my_appointments');
                  }}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold"
                >
                  End Call
                </button>
              </div>
            </div>

            {/* Right 4 Cols: Live Consultation Chat & Clinical Notes */}
            <div className="lg:col-span-4 bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col h-[520px]">
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wide flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Encrypted Patient Chat</span>
                </h4>
                <span className="text-[10px] text-slate-500">Live Transcript</span>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl max-w-[85%] ${
                      msg.sender === 'doctor'
                        ? 'bg-teal-950/60 border border-teal-800/60 text-teal-100 mr-auto'
                        : 'bg-slate-800 text-slate-100 ml-auto'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 mb-0.5 flex justify-between gap-2">
                      <span>{msg.sender === 'doctor' ? activeCallAppointment.providerName.split(',')[0] : 'You'}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message to your doctor..."
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800 rounded-xl border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Electronic Prescription Modal */}
          {showPrescriptionModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                      Rx
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Botswana MoH Electronic Prescription
                      </h4>
                      <div className="text-xs text-slate-500">
                        PHELO Digital Dispensary Dispensing Voucher
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPrescriptionModal(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Prescribing Doctor:</span>
                      <strong>{activeCallAppointment.providerName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Facility / Clinic:</span>
                      <strong>{activeCallAppointment.facilityName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Patient:</span>
                      <strong>{activeCallAppointment.patientName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">District:</span>
                      <strong>{activeCallAppointment.district}</strong>
                    </div>
                  </div>

                  <div className="border border-teal-200 bg-teal-50/60 p-3 rounded-xl space-y-2">
                    <div className="font-bold text-teal-950 uppercase text-[11px] tracking-wide">
                      Prescribed Medications:
                    </div>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-800">
                      <li>
                        <strong>Salbutamol Inhaler 100mcg</strong> — 2 puffs as needed for dry cough / wheeze.
                      </li>
                      <li>
                        <strong>Paracetamol 500mg Tablets</strong> — 1 to 2 tablets every 6 hours PRN for fever or pain.
                      </li>
                      <li>
                        <strong>Oral Rehydration Salts (ORS)</strong> — 1 sachet in 1 litre boiled water daily.
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-100 rounded-xl flex items-center justify-between text-[11px] text-slate-600">
                    <div>
                      <strong>Redeemable At:</strong> Any government clinic dispensary in {activeCallAppointment.district} (e.g. Extension 2 Clinic, Bontleng Clinic, Maun Clinic).
                    </div>
                    <QrCode className="w-10 h-10 text-slate-800 shrink-0 ml-2" />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      alert('Prescription saved to your device. You can present this QR code at your local clinic dispensary.');
                      setShowPrescriptionModal(false);
                    }}
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white rounded-xl text-xs font-bold"
                  >
                    Save to Device / Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
