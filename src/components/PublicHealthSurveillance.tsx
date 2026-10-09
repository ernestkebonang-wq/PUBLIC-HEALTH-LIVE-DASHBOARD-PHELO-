import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckCircle2, 
  Info,
  Filter,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { LanguageCode, SurveillanceSignal, EpidemiologicalAlert } from '../types';
import { INITIAL_SURVEILLANCE_SIGNALS, EPIDEMIOLOGICAL_ALERTS } from '../data/surveillanceData';
import { BOTSWANA_DISTRICTS } from '../data/languages';
import { getContributedSignalsCount } from '../services/storageService';
import { HealthIntelligenceFeed } from './HealthIntelligenceFeed';

interface PublicHealthSurveillanceProps {
  currentLang: LanguageCode;
  initialDistrict?: string;
  initialViewMode?: 'feed' | 'matrix';
  onNavigateTab?: (tab: string, payload?: string) => void;
}

export const PublicHealthSurveillance: React.FC<PublicHealthSurveillanceProps> = ({ 
  currentLang,
  initialDistrict,
  initialViewMode = 'feed',
  onNavigateTab
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict || 'All');
  const [activeViewMode, setActiveViewMode] = useState<'feed' | 'matrix'>(initialViewMode);
  const [signals, setSignals] = useState<SurveillanceSignal[]>(INITIAL_SURVEILLANCE_SIGNALS);
  const [alerts, setAlerts] = useState<EpidemiologicalAlert[]>(EPIDEMIOLOGICAL_ALERTS);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  React.useEffect(() => {
    if (initialDistrict) {
      setSelectedDistrict(initialDistrict);
    }
  }, [initialDistrict]);

  React.useEffect(() => {
    if (initialViewMode) {
      setActiveViewMode(initialViewMode);
    }
  }, [initialViewMode]);

  const localContributedCount = getContributedSignalsCount();

  const filteredSignals = signals.filter(sig => {
    if (selectedDistrict === 'All') return true;
    return sig.district.includes(selectedDistrict);
  });

  const handleExportSummary = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(signals, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `phelo_botswana_surveillance_summary_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Title & Core Philosophy Banner */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
          <Activity className="w-4 h-4 text-teal-700" />
          <span>Community Health Intelligence</span>
          <span aria-hidden="true">·</span>
          <span>District Health Management Teams (DHMT)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Public Health Surveillance & Syndromic Signals
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl">
          Aggregated, anonymous health trends across Botswana districts. Turning early community symptom reports into timely public health investigation before outbreaks spread.
        </p>
      </div>

      {/* Primary Module View Switcher */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveViewMode('feed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeViewMode === 'feed'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{currentLang === 'tn' ? 'Tshedimosetso ya Botshelo (Feed)' : 'Health Intelligence Feed'}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-700 text-teal-100 font-semibold">
              Actionable
            </span>
          </button>

          <button
            onClick={() => setActiveViewMode('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeViewMode === 'matrix'
                ? 'bg-teal-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{currentLang === 'tn' ? 'Dipalo tsa IDSR & Dipatlisiso' : 'Surveillance Telemetry Matrix'}</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          {activeViewMode === 'feed'
            ? (currentLang === 'tn' ? 'Dikaelo tsa botshelo tsa kgaolo' : 'Contextual household adjustments for your district')
            : (currentLang === 'tn' ? 'Dipalo tsa semmuso tsa MoH IDSR' : 'Official MoH IDSR baseline telemetry')}
        </div>
      </div>

      {activeViewMode === 'feed' ? (
        <HealthIntelligenceFeed
          currentLang={currentLang}
          initialDistrict={selectedDistrict}
          onNavigateTab={(tab, payload) => {
            if (tab === 'surveillance') {
              if (payload) setSelectedDistrict(payload);
              setActiveViewMode('matrix');
            } else if (onNavigateTab) {
              onNavigateTab(tab, payload);
            }
          }}
        />
      ) : (
        <>
          {/* CRITICAL EPIDEMIOLOGICAL GOVERNANCE NOTICE */}
      <div className="mb-6 bg-amber-50/90 border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-900 leading-relaxed">
            <div className="font-bold text-sm text-amber-950">
              Crucial Public Health Principle: Community Reports ≠ Confirmed Cases ≠ Outbreaks
            </div>
            <p>
              PHELO identifies <strong>unusual syndromic health activity</strong> to assist public health professionals. 
              The system strictly enforces the governance flow:
            </p>
            <div className="font-mono text-[11px] font-semibold text-amber-950 bg-white/70 px-2.5 py-1.5 rounded border border-amber-200 inline-block mt-1">
              AI DETECTS → HUMAN REVIEWS → PUBLIC-HEALTH INVESTIGATION → AUTHORISED ACTION
            </div>
            <p className="text-[11px] text-amber-800 pt-0.5">
              AI algorithms never independently declare an outbreak. All anomalous signals trigger on-the-ground validation by District Health Management Teams (DHMT) and laboratory testing.
            </p>
          </div>
        </div>
      </div>

      {/* DATA TRANSPARENCY & PROVENANCE CLASSIFICATION BAR */}
      <div className="mb-6 p-3.5 bg-slate-900 text-white rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="font-bold">Epidemiological Provenance:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 rounded bg-teal-800/80 text-teal-200 font-semibold border border-teal-700">
            Official Data: MoH IDSR Weekly Baseline
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700">
            Real-Time Feed: Anonymized Community Inflow
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-900/60 text-amber-200 font-semibold border border-amber-700">
            DHMT Human-in-the-Loop Verified
          </span>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs card-spatial">
          <div className="text-xs font-medium text-slate-500">Active District Signals</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {signals.length}
          </div>
          <div className="text-[11px] text-teal-700 mt-1 font-medium">Across 10 Botswana health districts</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs card-spatial">
          <div className="text-xs font-medium text-slate-500">Flagged for DHMT Review</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1 font-mono tabular-nums">
            {signals.filter(s => s.status === 'dhmt_flagged' || s.status === 'investigating').length}
          </div>
          <div className="text-[11px] text-amber-700 mt-1 font-medium">Under active epidemiological review</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs card-spatial">
          <div className="text-xs font-medium text-slate-500">Total 7-Day Symptom Volume</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
            {signals.reduce((acc, s) => acc + s.count7Days, 0)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Zero PII / Anonymized aggregate</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs card-spatial">
          <div className="text-xs font-medium text-slate-500">Your Anonymous Contribution</div>
          <div className="text-2xl sm:text-3xl font-bold text-teal-800 mt-1 font-mono tabular-nums">
            {localContributedCount}
          </div>
          <div className="text-[11px] text-teal-700 mt-1 font-medium">Signals logged from this device</div>
        </div>
      </div>

      {/* INTERACTIVE SYNDROMIC TIME-SERIES & TRENDS VISUALIZATION */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-0.5">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              <span>Time-Series Health Trends · Botswana IDSR Benchmark</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Syndromic Early Warning Trajectory (Community vs Expected Baseline)
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-teal-600 rounded-full inline-block" />
              <span>Current Week Signals</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-slate-300 rounded-full inline-block border-dashed" />
              <span>MoH Baseline Threshold</span>
            </span>
          </div>
        </div>

        {/* SVG Area Chart Graphic */}
        <div className="pt-5">
          <div className="relative h-48 w-full">
            <svg viewBox="0 0 700 180" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="30" x2="700" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="80" x2="700" y2="80" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="130" x2="700" y2="130" stroke="#f1f5f9" strokeWidth="1" />

              {/* Expected Baseline Line (dashed) */}
              <path
                d="M 0 110 Q 175 105 350 100 T 700 95"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Current Signal Curve with Area Fill */}
              <path
                d="M 0 135 Q 120 130 200 90 T 380 75 T 520 40 T 700 48 L 700 180 L 0 180 Z"
                fill="url(#tealGrad)"
              />
              <path
                d="M 0 135 Q 120 130 200 90 T 380 75 T 520 40 T 700 48"
                fill="none"
                stroke="#0f766e"
                strokeWidth="3"
              />

              {/* Data points */}
              <circle cx="200" cy="90" r="4" fill="#0f766e" stroke="#fff" strokeWidth="2" />
              <circle cx="380" cy="75" r="4" fill="#0f766e" stroke="#fff" strokeWidth="2" />
              <circle cx="520" cy="40" r="5" fill="#d97706" stroke="#fff" strokeWidth="2" />
              <circle cx="700" cy="48" r="4" fill="#0f766e" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>

          {/* X-axis days */}
          <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100">
            <span>Day 1 (Mon)</span>
            <span>Day 2 (Tue)</span>
            <span>Day 3 (Wed)</span>
            <span>Day 4 (Thu)</span>
            <span className="text-amber-700 font-bold">Day 5 (Cluster Spike)</span>
            <span>Day 6 (Sat)</span>
            <span>Today (Sun)</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>
            <strong>Observation:</strong> Paediatric watery diarrhoea reports in Kweneng District exceeded the 30-day moving average on Day 5, prompting a local DHMT water testing team deployment.
          </span>
          <span className="text-[11px] font-semibold text-teal-800 ml-2 whitespace-nowrap">
            Verification: In Progress
          </span>
        </div>
      </div>


      {/* Active Alerts Section */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>Active DHMT Epidemiological Early Warning Investigations</span>
        </h2>

        <div className="space-y-3">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className="bg-white rounded-2xl border border-amber-200 p-4 sm:p-5 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    {alert.district}
                  </span>
                  <span className="text-xs text-slate-500">
                    Logged {alert.date}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  Status: {alert.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1.5">
                {alert.title}
              </h3>

              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                {alert.summary}
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-800 space-y-1">
                <div>
                  <strong className="text-slate-900">Recommended DHMT Action:</strong> {alert.recommendedDhmtAction}
                </div>
                <div className="text-slate-500 text-[11px]">
                  Investigation Lead: {alert.investigationLead}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Signals Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              District Syndromic Monitoring Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Comparing 7-day syndromic reports against expected epidemiological seasonal baselines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="py-1.5 px-2.5 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-teal-700 outline-none"
            >
              <option value="All">All Districts</option>
              {BOTSWANA_DISTRICTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <button
              onClick={handleExportSummary}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'Exported!' : 'Export JSON'}</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">District & Syndrome</th>
                <th className="px-4 py-3 font-semibold text-right">7-Day Count</th>
                <th className="px-4 py-3 font-semibold text-right">Baseline Expected</th>
                <th className="px-4 py-3 font-semibold text-right">Anomaly Variance</th>
                <th className="px-4 py-3 font-semibold">Surveillance Status</th>
                <th className="px-4 py-3 font-semibold">Epidemiological Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredSignals.map(sig => {
                const isElevated = sig.deltaPercent > 25;
                return (
                  <tr key={sig.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{sig.district}</div>
                      <div className="text-[11px] text-teal-800 font-medium">{sig.syndromeName}</div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono tabular-nums text-sm font-bold text-slate-900">
                      {sig.count7Days}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono tabular-nums text-slate-500">
                      {sig.expectedBaseline}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono tabular-nums">
                      <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        isElevated ? 'bg-amber-100 text-amber-900' : 'text-slate-600'
                      }`}>
                        {sig.deltaPercent > 0 ? (
                          <TrendingUp className="w-3 h-3 text-amber-700" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-emerald-700" />
                        )}
                        {sig.deltaPercent > 0 ? `+${sig.deltaPercent}%` : `${sig.deltaPercent}%`}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {sig.status === 'dhmt_flagged' ? (
                        <span className="bg-rose-100 text-rose-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                          DHMT Flagged
                        </span>
                      ) : sig.status === 'investigating' ? (
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                          Investigating
                        </span>
                      ) : sig.status === 'monitoring' ? (
                        <span className="bg-teal-50 text-teal-800 font-semibold px-2 py-0.5 rounded text-[10px] uppercase">
                          Monitoring
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px] uppercase font-semibold">
                          Normal Baseline
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-slate-600 max-w-xs leading-relaxed">
                      {sig.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}
    </div>
  );
};
