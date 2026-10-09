import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ShieldAlert, 
  ArrowLeft,
  Navigation,
  Copy,
  Check,
  Send,
  Radio
} from 'lucide-react';
import { LanguageCode } from '../types';
import { EMERGENCY_PROTOCOLS, BOTSWANA_EMERGENCY_NUMBERS, EmergencyProtocol } from '../data/emergencyProtocols';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  onNavigateToFacilities: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onNavigateToFacilities,
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<EmergencyProtocol | null>(null);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [copiedGps, setCopiedGps] = useState(false);

  const handleFetchGps = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationError('GPS geolocation not supported on this device');
      return;
    }
    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsCoordinates({
          lat: parseFloat(pos.coords.latitude.toFixed(5)),
          lng: parseFloat(pos.coords.longitude.toFixed(5)),
          accuracy: Math.round(pos.coords.accuracy)
        });
        setIsLocating(false);
      },
      (err) => {
        setLocationError('Please enable location access in browser settings to pinpoint coordinates.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleCopyCoordinates = async () => {
    if (!gpsCoordinates) return;
    const text = `GPS Coordinates: ${gpsCoordinates.lat}, ${gpsCoordinates.lng} (Accuracy: ±${gpsCoordinates.accuracy}m)`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedGps(true);
        setTimeout(() => setCopiedGps(false), 2500);
      }
    } catch {}
  };

  if (!isOpen) return null;

  const smsBeaconBody = encodeURIComponent(
    `EMERGENCY SOS BOTSWANA: Medical assistance required at GPS: ${
      gpsCoordinates ? `${gpsCoordinates.lat}, ${gpsCoordinates.lng} (±${gpsCoordinates.accuracy}m)` : 'Botswana'
    }. Sent via PHELO Emergency Mode.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-rose-700 text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <AlertOctagon className="w-6 h-6 text-white shrink-0 animate-pulse" />
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                {currentLang === 'tn' ? 'Kemo ya Potlako (Emergency)' : currentLang === 'kck' ? 'Rubatsigo gwe Chimbi' : 'Emergency Assistance Mode'}
              </h2>
              <p className="text-xs text-rose-100">
                {currentLang === 'tn' 
                  ? 'Kaelo ya bofefo fa botshelo bo le mo kotsing mo Botswana' 
                  : 'Immediate verified Botswana dispatch and clinical stabilization'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-rose-100 hover:text-white p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Dial Action Grid */}
        <div className="p-4 bg-rose-50/70 border-b border-rose-100 shrink-0">
          <div className="text-xs font-semibold text-rose-900 uppercase tracking-wider mb-2">
            {currentLang === 'tn' ? 'Dinomore tsa Bofefo tsa Botswana' : 'Direct Emergency Call Dispatch'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <a
              href="tel:997"
              className="flex flex-col items-center justify-center p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm transition-all active:scale-95 text-center min-h-[48px]"
            >
              <PhoneCall className="w-4 h-4 mb-1" />
              <span className="text-sm font-bold">997</span>
              <span className="text-[10px] text-rose-100">Ambulance / EMS</span>
            </a>
            <a
              href="tel:992"
              className="flex flex-col items-center justify-center p-2.5 bg-purple-900 hover:bg-purple-950 text-white rounded-xl shadow-sm transition-all active:scale-95 text-center min-h-[48px]"
            >
              <PhoneCall className="w-4 h-4 mb-1 text-purple-200" />
              <span className="text-sm font-bold">992</span>
              <span className="text-[10px] text-purple-200">MRI 24h Ambulance</span>
            </a>
            <a
              href="tel:112"
              className="flex flex-col items-center justify-center p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm transition-all active:scale-95 text-center min-h-[48px]"
            >
              <PhoneCall className="w-4 h-4 mb-1 text-emerald-400" />
              <span className="text-sm font-bold">112</span>
              <span className="text-[10px] text-slate-300">Toll-Free (Mobile)</span>
            </a>
            <a
              href="tel:999"
              className="flex flex-col items-center justify-center p-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 rounded-xl transition-all active:scale-95 text-center min-h-[48px]"
            >
              <ShieldAlert className="w-4 h-4 mb-1 text-slate-700" />
              <span className="text-sm font-bold">999</span>
              <span className="text-[10px] text-slate-500">Police Service</span>
            </a>
            <a
              href="tel:0800600740"
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 rounded-xl transition-all active:scale-95 text-center min-h-[48px]"
            >
              <PhoneCall className="w-4 h-4 mb-1 text-teal-700" />
              <span className="text-xs font-bold truncate max-w-full">0800 600 740</span>
              <span className="text-[10px] text-slate-500">MoH Healthline</span>
            </a>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* 1-TAP GPS BEACON & OFFLINE SOS TOOL */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 border border-rose-500/40 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  {currentLang === 'tn' ? 'GPS ya Lefelo & SOS ya Moraka/Tsela' : 'Offline GPS Beacon & Highway SOS'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                Works with 0MB Data
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentLang === 'tn'
                ? 'Kapa dinomore tsa gago tsa GPS go di balela modiri wa 997 kgotsa go romela molaetsa wa SMS wa potlako fa o le kwa morakeng kgotsa mo tseleng.'
                : 'Pinpoint precise GPS coordinates for verbal relay to 997/992 dispatchers or generate an immediate SMS beacon when cellular data is unavailable.'}
            </p>

            {gpsCoordinates ? (
              <div className="bg-white/10 rounded-xl p-3 border border-white/15 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="font-mono text-emerald-300 font-bold">
                    GPS: {gpsCoordinates.lat}, {gpsCoordinates.lng}
                  </div>
                  <span className="text-[10px] text-slate-300 font-mono">
                    ±{gpsCoordinates.accuracy}m accuracy
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={handleCopyCoordinates}
                    className="px-3 py-1.5 bg-white text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    {copiedGps ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-800">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-700" />
                        <span>Copy Coordinates for 997</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`sms:997?body=${smsBeaconBody}`}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send SMS Beacon</span>
                  </a>

                  <button
                    onClick={handleFetchGps}
                    className="text-[11px] text-slate-300 hover:text-white underline ml-auto py-1"
                  >
                    Refresh GPS
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={handleFetchGps}
                  disabled={isLocating}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95"
                >
                  <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Acquiring Satellite GPS...' : 'Acquire My GPS Coordinates'}</span>
                </button>
                {locationError && (
                  <span className="text-[11px] text-rose-300">
                    {locationError}
                  </span>
                )}
              </div>
            )}
          </div>

          {!selectedProtocol ? (
            <div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  {currentLang === 'tn' ? 'Tlhopha Kemo e e go Lebaneng:' : 'Select Current Emergency Category:'}
                </h3>
                <p className="text-xs text-slate-500">
                  {currentLang === 'tn' 
                    ? 'Bona dikgato tsa ntlha fa ambulense e santse e le mo tseleng' 
                    : 'Get immediate verified life-saving instructions while waiting for ambulance'}
                </p>
              </div>

              <div className="space-y-2">
                {EMERGENCY_PROTOCOLS.map((protocol) => (
                  <button
                    key={protocol.id}
                    onClick={() => setSelectedProtocol(protocol)}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 transition-all flex items-center justify-between group min-h-[52px]"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-rose-900">
                        {currentLang === 'tn' ? protocol.categoryTn : currentLang === 'kck' ? protocol.categoryKck : protocol.categoryEn}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {currentLang === 'tn' ? protocol.firstActionTn : protocol.firstActionEn}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-700 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedProtocol(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 p-1 -ml-1 transition-colors min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentLang === 'tn' ? 'Boela morago' : 'Back to emergency categories'}</span>
              </button>

              <div className="border border-rose-200 bg-rose-50/50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-rose-950">
                    {currentLang === 'tn' ? selectedProtocol.categoryTn : selectedProtocol.categoryEn}
                  </h3>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                    {selectedProtocol.severity}
                  </span>
                </div>
                <p className="text-sm text-rose-900 font-medium leading-relaxed">
                  {currentLang === 'tn' ? selectedProtocol.firstActionTn : selectedProtocol.firstActionEn}
                </p>
              </div>

              {/* Step by step */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {currentLang === 'tn' ? 'Dikgato tse o Tshwanetseng go di Tsaya:' : 'What You Must Do Immediately:'}
                </h4>
                <div className="space-y-2">
                  {(currentLang === 'tn' ? selectedProtocol.stepByStepTn : selectedProtocol.stepByStepEn).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="font-bold text-teal-800 shrink-0 w-4">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Do not do */}
              <div>
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>{currentLang === 'tn' ? 'Se o sa Tshwanelang go se Dira (DO NOT):' : 'What You Must NOT Do:'}</span>
                </h4>
                <div className="space-y-1.5">
                  {(currentLang === 'tn' ? selectedProtocol.doNotDoTn : selectedProtocol.doNotDoEn).map((item, idx) => (
                    <div key={idx} className="text-xs text-rose-800 bg-rose-50/70 p-2 rounded-lg border border-rose-100">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Clinical Safeguard Note */}
          <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 leading-relaxed">
            <strong>Clinical Safety Safeguard:</strong> PHELO does not provide clinical diagnosis. Emergency mode provides urgent routing and basic life-support actions while certified healthcare personnel respond.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              onNavigateToFacilities();
            }}
            className="w-full sm:w-auto text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors py-2 text-center"
          >
            {currentLang === 'tn' ? 'Bona Dipatela tsa dioura tse 24 →' : 'Find Nearest 24-Hour Emergency Hospital →'}
          </button>
          <a
            href="tel:997"
            className="w-full sm:w-auto px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{currentLang === 'tn' ? 'Leletsa 997 Jaanong' : 'Call 997 Ambulance Now'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
