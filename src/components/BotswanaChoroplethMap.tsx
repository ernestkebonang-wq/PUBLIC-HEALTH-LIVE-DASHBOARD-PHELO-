import React, { useState, useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight, 
  Building2, 
  Compass, 
  ChevronRight, 
  Filter, 
  Info, 
  MapPin, 
  Radio, 
  Sparkles, 
  TrendingUp, 
  Users,
  Eye,
  CheckCircle2,
  ExternalLink,
  Layers,
  Thermometer
} from 'lucide-react';
import { LanguageCode } from '../types';
import { 
  BOTSWANA_DISTRICTS_DATA, 
  BOTSWANA_DISTRICTS_GEOJSON, 
  DistrictSurveillanceMetadata 
} from '../data/botswanaDistrictsGeo';

interface BotswanaChoroplethMapProps {
  currentLang: LanguageCode;
  onNavigateToSurveillance?: (districtName?: string) => void;
  onNavigateToLifestyleFeed?: (districtName?: string) => void;
  onNavigateToFacilities?: (districtName?: string) => void;
}

type FilterStatus = 'all' | 'active_alert' | 'monitoring' | 'normal';

export const BotswanaChoroplethMap: React.FC<BotswanaChoroplethMapProps> = ({
  currentLang,
  onNavigateToSurveillance,
  onNavigateToLifestyleFeed,
  onNavigateToFacilities,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('ngamiland');
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');
  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    district: DistrictSurveillanceMetadata;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedDistrict = useMemo(() => {
    return BOTSWANA_DISTRICTS_DATA.find(d => d.id === selectedDistrictId) || BOTSWANA_DISTRICTS_DATA[1];
  }, [selectedDistrictId]);

  // Aggregated summary statistics
  const stats = useMemo(() => {
    const totalDistricts = BOTSWANA_DISTRICTS_DATA.length;
    const activeAlerts = BOTSWANA_DISTRICTS_DATA.filter(d => d.alertLevel === 'active_alert').length;
    const monitoring = BOTSWANA_DISTRICTS_DATA.filter(d => d.alertLevel === 'monitoring').length;
    const normal = BOTSWANA_DISTRICTS_DATA.filter(d => d.alertLevel === 'normal').length;
    const total7DayCases = BOTSWANA_DISTRICTS_DATA.reduce((acc, d) => acc + d.sevenDayCases, 0);

    return { totalDistricts, activeAlerts, monitoring, normal, total7DayCases };
  }, []);

  // Filtered districts list
  const filteredDistricts = useMemo(() => {
    if (filterStatus === 'all') return BOTSWANA_DISTRICTS_DATA;
    return BOTSWANA_DISTRICTS_DATA.filter(d => d.alertLevel === filterStatus);
  }, [filterStatus]);

  // Width & height for the SVG coordinate system
  const width = 820;
  const height = 720;

  // D3 Projection and Path Generator
  const { pathGenerator, projection } = useMemo(() => {
    const proj = d3.geoMercator().fitExtent(
      [[45, 45], [width - 45, height - 45]],
      BOTSWANA_DISTRICTS_GEOJSON as any
    );
    const gen = d3.geoPath().projection(proj);
    return { projection: proj, pathGenerator: gen };
  }, [width, height]);

  // Get color for alert level
  const getFillColor = (level: 'active_alert' | 'monitoring' | 'normal', isSelected: boolean, isHovered: boolean) => {
    if (level === 'active_alert') {
      if (isSelected) return '#e11d48'; // rose-600
      if (isHovered) return '#f43f5e'; // rose-500
      return '#be123c'; // rose-700
    }
    if (level === 'monitoring') {
      if (isSelected) return '#d97706'; // amber-600
      if (isHovered) return '#f59e0b'; // amber-500
      return '#b45309'; // amber-700
    }
    // normal baseline
    if (isSelected) return '#0d9488'; // teal-600
    if (isHovered) return '#14b8a6'; // teal-500
    return '#047857'; // emerald-700
  };

  const getAlertBadgeColor = (level: 'active_alert' | 'monitoring' | 'normal') => {
    if (level === 'active_alert') return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    if (level === 'monitoring') return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  };

  return (
    <div className="bg-slate-950 rounded-3xl border border-slate-800 text-white overflow-hidden shadow-2xl relative">
      {/* Visual Accent Glow Header */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-rose-500 to-amber-500 opacity-90" />

      {/* Top Banner / Telemetry Header */}
      <div className="p-5 sm:p-7 border-b border-slate-800 bg-slate-900/70 backdrop-blur-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 tracking-wide uppercase mb-1">
              <Radio className="w-4 h-4 animate-pulse text-teal-300" />
              <span>
                {currentLang === 'tn' 
                  ? 'Tlhokomelo ya Malwetse a Kgaolo mo Botswana · D3 IDSR Live' 
                  : 'Botswana National Health Surveillance · Interactive D3 Choropleth'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>
                {currentLang === 'tn' 
                  ? 'Mmapa wa Boitekanelo & Dikaelo tsa Potlako' 
                  : 'Public Health Alert Choropleth Map'}
              </span>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-900/60 text-teal-200 border border-teal-700/50">
                10 DHMT Districts Active
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {currentLang === 'tn'
                ? 'Sekaseka seemo sa dikaelo tsa botsogo mo dikgaolong tsotlhe tsa Botswana. Tobetsa kgaolo go bona dipalo tsa letshololo, malaria, sehuba le dithuso tsa DHMT.'
                : 'Real-time syndromic surveillance aggregated across all Botswana health districts. Click or hover any district to inspect active outbreak alerts, 7-day case delta rates, and DHMT mitigation.'}
            </p>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 shrink-0">
            <div className="bg-slate-800/90 rounded-xl p-2.5 sm:p-3 border border-slate-700/80">
              <div className="text-[10px] text-slate-400 uppercase font-medium">
                {currentLang === 'tn' ? 'Dikgaolo Tsotlhe' : 'Total Districts'}
              </div>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5">
                {stats.totalDistricts}
              </div>
            </div>

            <div className="bg-rose-950/40 rounded-xl p-2.5 sm:p-3 border border-rose-800/50">
              <div className="text-[10px] text-rose-300 uppercase font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                {currentLang === 'tn' ? 'Dipotlako (Alerts)' : 'Active Alerts'}
              </div>
              <div className="text-lg sm:text-xl font-black text-rose-200 mt-0.5">
                {stats.activeAlerts} <span className="text-xs font-normal text-rose-400">Districts</span>
              </div>
            </div>

            <div className="bg-amber-950/40 rounded-xl p-2.5 sm:p-3 border border-amber-800/50">
              <div className="text-[10px] text-amber-300 uppercase font-semibold">
                {currentLang === 'tn' ? 'Tlhokomelo' : 'Monitoring'}
              </div>
              <div className="text-lg sm:text-xl font-black text-amber-200 mt-0.5">
                {stats.monitoring} <span className="text-xs font-normal text-amber-400">Districts</span>
              </div>
            </div>

            <div className="bg-emerald-950/40 rounded-xl p-2.5 sm:p-3 border border-emerald-800/50">
              <div className="text-[10px] text-emerald-300 uppercase font-semibold">
                {currentLang === 'tn' ? 'Seemo sa Gale' : 'Stable'}
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-200 mt-0.5">
                {stats.normal} <span className="text-xs font-normal text-emerald-400">Districts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & View Mode Controls Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>{currentLang === 'tn' ? 'Tlhotlha ka Seemo:' : 'Filter Alert Tier:'}</span>
            </span>

            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'all'
                  ? 'bg-teal-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {currentLang === 'tn' ? 'Tsotlhe (10)' : 'All Districts (10)'}
            </button>

            <button
              onClick={() => setFilterStatus('active_alert')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filterStatus === 'active_alert'
                  ? 'bg-rose-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-rose-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>{currentLang === 'tn' ? 'Dikaelo tsa Potlako (2)' : 'Active Alerts (2)'}</span>
            </button>

            <button
              onClick={() => setFilterStatus('monitoring')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filterStatus === 'monitoring'
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{currentLang === 'tn' ? 'Tlhokomelo (2)' : 'Elevated Monitoring (2)'}</span>
            </button>

            <button
              onClick={() => setFilterStatus('normal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                filterStatus === 'normal'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{currentLang === 'tn' ? 'Ritibetse (6)' : 'Stable Baseline (6)'}</span>
            </button>
          </div>

          {/* Toggle between D3 Map View and Comparison Grid */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'map' ? 'bg-teal-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{currentLang === 'tn' ? 'Mmapa wa D3' : 'D3 Map'}</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                viewMode === 'grid' ? 'bg-teal-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{currentLang === 'tn' ? 'Lenane la Dikgaolo' : 'District Cards'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body: Map + District Telemetry Inspector */}
      <div className="p-4 sm:p-6 lg:p-8">
        {viewMode === 'map' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: D3 SVG Map Container */}
            <div 
              ref={containerRef}
              className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-3 sm:p-5 relative flex flex-col justify-between overflow-hidden shadow-inner"
            >
              {/* Map Canvas Header with Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="font-mono text-[11px] text-teal-300">EPSG:4326 · Mercator Fit Projection</span>
                </div>

                {/* Color Legend */}
                <div className="flex items-center gap-3 text-[11px]">
                  <div className="flex items-center gap-1 text-rose-300">
                    <span className="w-3 h-3 rounded-xs bg-rose-600 inline-block" />
                    <span>Active Alert</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300">
                    <span className="w-3 h-3 rounded-xs bg-amber-600 inline-block" />
                    <span>Monitoring</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-300">
                    <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" />
                    <span>Stable</span>
                  </div>
                </div>
              </div>

              {/* D3 Vector SVG Map */}
              <div className="relative w-full aspect-[820/720]">
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${width} ${height}`}
                  className="w-full h-full select-none"
                  style={{ filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.4))' }}
                >
                  <defs>
                    {/* Pulsing beacon glow filter */}
                    <filter id="beacon-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Hatch pattern for accessibility / colorblind differentiation on alerts */}
                    <pattern id="hatch-alert" patternUnits="userSpaceOnUse" width="8" height="8">
                      <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" stroke="#ffe4e6" strokeWidth="1.2" opacity="0.3" />
                    </pattern>
                  </defs>

                  {/* Render District Boundaries & Polygons */}
                  <g className="districts-layer">
                    {BOTSWANA_DISTRICTS_GEOJSON.features.map((feature) => {
                      const distProps = feature.properties;
                      const pathString = pathGenerator(feature as any) || '';
                      const isSelected = selectedDistrictId === distProps.id;
                      const isHovered = hoveredDistrictId === distProps.id;
                      const isFilteredOut = filterStatus !== 'all' && distProps.alertLevel !== filterStatus;

                      const fillColor = getFillColor(distProps.alertLevel, isSelected, isHovered);

                      return (
                        <g key={distProps.id}>
                          <path
                            d={pathString}
                            fill={fillColor}
                            fillOpacity={isFilteredOut ? 0.25 : 1}
                            stroke={isSelected ? '#38bdf8' : isHovered ? '#f8fafc' : '#0f172a'}
                            strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.5}
                            strokeLinejoin="round"
                            className="cursor-pointer transition-all duration-200"
                            onClick={() => setSelectedDistrictId(distProps.id)}
                            onMouseEnter={(e) => {
                              setHoveredDistrictId(distProps.id);
                              const rect = e.currentTarget.getBoundingClientRect();
                              setTooltipData({
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                                district: distProps
                              });
                            }}
                            onMouseLeave={() => {
                              setHoveredDistrictId(null);
                              setTooltipData(null);
                            }}
                          />

                          {/* Pattern overlay for active alert districts for accessibility */}
                          {distProps.alertLevel === 'active_alert' && (
                            <path
                              d={pathString}
                              fill="url(#hatch-alert)"
                              pointerEvents="none"
                              opacity={isFilteredOut ? 0.1 : 0.6}
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>

                  {/* Centroid Markers & Labels */}
                  <g className="markers-layer" pointerEvents="none">
                    {BOTSWANA_DISTRICTS_DATA.map((dist) => {
                      const coords = projection(dist.centroid);
                      if (!coords) return null;
                      const [cx, cy] = coords;
                      const isSelected = selectedDistrictId === dist.id;
                      const isAlert = dist.alertLevel === 'active_alert';
                      const isMonitoring = dist.alertLevel === 'monitoring';

                      return (
                        <g key={`marker-${dist.id}`} transform={`translate(${cx}, ${cy})`}>
                          {/* Animated Radar Pulse for Active Alerts */}
                          {isAlert && (
                            <>
                              <circle
                                r="18"
                                fill="none"
                                stroke="#f43f5e"
                                strokeWidth="2"
                                opacity="0.6"
                                className="animate-ping"
                              />
                              <circle
                                r="26"
                                fill="none"
                                stroke="#fda4af"
                                strokeWidth="1"
                                opacity="0.3"
                              />
                            </>
                          )}

                          {/* Marker Point */}
                          <circle
                            r={isSelected ? 7 : isAlert ? 6 : 4.5}
                            fill={
                              isAlert ? '#ffffff' : isMonitoring ? '#fef3c7' : '#e2e8f0'
                            }
                            stroke={
                              isAlert ? '#be123c' : isMonitoring ? '#b45309' : '#065f46'
                            }
                            strokeWidth={isSelected ? 3 : 2}
                            filter="url(#beacon-glow)"
                          />

                          {/* District Label Text */}
                          <text
                            y={isAlert ? -12 : -9}
                            textAnchor="middle"
                            className={`text-[11px] font-extrabold tracking-wide fill-white drop-shadow-md select-none ${
                              isSelected ? 'text-[12px] fill-cyan-300 font-black' : ''
                            }`}
                            style={{
                              paintOrder: 'stroke',
                              stroke: '#020617',
                              strokeWidth: 3,
                              strokeLinecap: 'butt',
                              strokeLinejoin: 'miter',
                            }}
                          >
                            {dist.nameEn.split(' ')[0]}
                          </text>

                          {/* Alert delta badge if significant */}
                          {Math.abs(dist.deltaPercent) > 15 && (
                            <text
                              y={16}
                              textAnchor="middle"
                              className={`text-[9.5px] font-mono font-bold select-none ${
                                dist.deltaPercent > 0 ? 'fill-rose-300' : 'fill-emerald-300'
                              }`}
                              style={{
                                paintOrder: 'stroke',
                                stroke: '#020617',
                                strokeWidth: 2.5,
                              }}
                            >
                              {dist.deltaPercent > 0 ? `+${dist.deltaPercent}%` : `${dist.deltaPercent}%`}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* Floating Map Instruction Note */}
                <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-800 text-[10px] text-slate-400">
                  {currentLang === 'tn' ? 'Tobetsa kgaolo epe go bona dipalo' : 'Tap/hover any district to inspect surveillance signals'}
                </div>
              </div>

              {/* Bottom Quick District Selection Chips */}
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <div className="text-[11px] font-medium text-slate-400 mb-2">
                  {currentLang === 'tn' ? 'Tlhopha Kgaolo ka Bonako:' : 'Quick District Select:'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {BOTSWANA_DISTRICTS_DATA.map((dist) => {
                    const isSelected = selectedDistrictId === dist.id;
                    const isAlert = dist.alertLevel === 'active_alert';
                    return (
                      <button
                        key={dist.id}
                        onClick={() => setSelectedDistrictId(dist.id)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-teal-500 text-slate-950 font-bold ring-2 ring-teal-400'
                            : isAlert
                            ? 'bg-rose-950/60 text-rose-200 border border-rose-800/50 hover:bg-rose-900/60'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            dist.alertLevel === 'active_alert'
                              ? 'bg-rose-400'
                              : dist.alertLevel === 'monitoring'
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                        <span>{dist.nameEn.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Selected District Telemetry Inspector */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg">
                {/* District Header */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide">
                        {selectedDistrict.adminSeat} DHMT Center
                      </span>
                      <span className="text-xs text-slate-500">·</span>
                      <span className="text-xs text-slate-400">{selectedDistrict.keyFacility}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mt-1">
                      {selectedDistrict.nameEn}
                    </h3>
                    <div className="text-xs text-teal-300 font-medium">
                      {selectedDistrict.nameTn}
                    </div>
                  </div>

                  {/* Alert Status Pill */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getAlertBadgeColor(
                      selectedDistrict.alertLevel
                    )}`}
                  >
                    {selectedDistrict.alertLevel === 'active_alert'
                      ? 'Outbreak Alert'
                      : selectedDistrict.alertLevel === 'monitoring'
                      ? 'Monitoring'
                      : 'Stable Baseline'}
                  </span>
                </div>

                {/* Primary Alert / Status Banner */}
                <div
                  className={`mt-4 p-3.5 rounded-xl border ${
                    selectedDistrict.alertLevel === 'active_alert'
                      ? 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                      : selectedDistrict.alertLevel === 'monitoring'
                      ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                      : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {selectedDistrict.alertLevel === 'active_alert' ? (
                      <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    ) : selectedDistrict.alertLevel === 'monitoring' ? (
                      <Activity className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">
                        {currentLang === 'tn'
                          ? selectedDistrict.alertStatusLabelTn
                          : selectedDistrict.alertStatusLabelEn}
                      </div>
                      <div className="text-sm font-semibold mt-0.5">
                        {selectedDistrict.primarySyndrome}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Surveillance Numbers / Metrics */}
                <div className="grid grid-cols-3 gap-2.5 my-4">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-[10px] text-slate-400 uppercase font-medium">
                      {currentLang === 'tn' ? 'Dipalo (7 Days)' : '7-Day Volume'}
                    </div>
                    <div className="text-lg font-black text-white mt-1">
                      {selectedDistrict.sevenDayCases}
                    </div>
                    <div className="text-[10px] text-slate-400">cases logged</div>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <div className="text-[10px] text-slate-400 uppercase font-medium">
                      {currentLang === 'tn' ? 'Seelo sa Gale' : 'Expected Baseline'}
                    </div>
                    <div className="text-lg font-black text-slate-300 mt-1">
                      {selectedDistrict.expectedBaseline}
                    </div>
                    <div className="text-[10px] text-slate-400">seasonal threshold</div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border ${
                      selectedDistrict.deltaPercent > 20
                        ? 'bg-rose-950/40 border-rose-800/50 text-rose-300'
                        : selectedDistrict.deltaPercent > 0
                        ? 'bg-amber-950/40 border-amber-800/50 text-amber-300'
                        : 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-semibold">
                      {currentLang === 'tn' ? 'Phetogo vs Baseline' : 'Delta vs Baseline'}
                    </div>
                    <div className="text-lg font-black mt-1 flex items-center gap-0.5">
                      {selectedDistrict.deltaPercent > 0 ? `+${selectedDistrict.deltaPercent}%` : `${selectedDistrict.deltaPercent}%`}
                    </div>
                    <div className="text-[10px]">
                      {selectedDistrict.deltaPercent > 0 ? 'above moving avg' : 'below threshold'}
                    </div>
                  </div>
                </div>

                {/* Active DHMT Field Action */}
                <div className="p-3.5 bg-slate-800/70 rounded-xl border border-slate-700/70 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
                    <Activity className="w-3.5 h-3.5" />
                    <span>
                      {currentLang === 'tn' ? 'Tiro ya Potlako ya DHMT' : 'DHMT Intervention & Field Strategy'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentLang === 'tn'
                      ? selectedDistrict.dhmtActionTn
                      : selectedDistrict.dhmtActionEn}
                  </p>
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-700 flex items-center justify-between">
                    <span>Officer Lead:</span>
                    <strong className="text-slate-300">{selectedDistrict.dhmtLead}</strong>
                  </div>
                </div>

                {/* Monitored Settlements Tags */}
                <div className="mt-4">
                  <div className="text-[11px] font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-400" />
                    <span>
                      {currentLang === 'tn' ? 'Metse le Dikgotla tse di Beilweng Leitlho:' : 'Active Settlements Under Surveillance:'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedDistrict.settlementsMonitored.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] border border-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Seamless Deep-Link Routing into Other Modules */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col gap-2">
                  {/* View Regional Lifestyle Feed */}
                  <button
                    onClick={() => {
                      if (onNavigateToLifestyleFeed) {
                        onNavigateToLifestyleFeed(selectedDistrict.nameEn);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>
                      {currentLang === 'tn'
                        ? `Bona Dikaelo tsa Botshelo tsa ${selectedDistrict.nameEn}`
                        : `Open Lifestyle Habits Feed for ${selectedDistrict.nameEn}`}
                    </span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>

                  {/* View Detailed Surveillance Matrix */}
                  <button
                    onClick={() => {
                      if (onNavigateToSurveillance) {
                        onNavigateToSurveillance(selectedDistrict.nameEn);
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Activity className="w-4 h-4 text-slate-950" />
                    <span>
                      {currentLang === 'tn'
                        ? `Bula Dipalo tsa IDSR tsa ${selectedDistrict.nameEn}`
                        : `View Full Surveillance Matrix for ${selectedDistrict.nameEn}`}
                    </span>
                    <ArrowUpRight className="w-4 h-4 ml-auto" />
                  </button>

                  {/* Find District Facilities */}
                  <button
                    onClick={() => {
                      if (onNavigateToFacilities) {
                        onNavigateToFacilities(selectedDistrict.nameEn);
                      }
                    }}
                    className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>
                      {currentLang === 'tn'
                        ? `Ditleliniki le Dipatela mo ${selectedDistrict.nameEn}`
                        : `Healthcare Facilities in ${selectedDistrict.nameEn}`}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Grid View Mode: High-density comparison cards across all districts */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDistricts.map((dist) => {
              const isAlert = dist.alertLevel === 'active_alert';
              const isMonitoring = dist.alertLevel === 'monitoring';

              return (
                <div
                  key={dist.id}
                  onClick={() => {
                    setSelectedDistrictId(dist.id);
                    setViewMode('map');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer hover:border-teal-400 flex flex-col justify-between ${
                    isAlert
                      ? 'bg-rose-950/30 border-rose-800/60'
                      : isMonitoring
                      ? 'bg-amber-950/30 border-amber-800/60'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] text-slate-400 font-mono uppercase">
                        Seat: {dist.adminSeat}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getAlertBadgeColor(
                          dist.alertLevel
                        )}`}
                      >
                        {dist.alertLevel === 'active_alert'
                          ? 'Active Alert'
                          : dist.alertLevel === 'monitoring'
                          ? 'Monitoring'
                          : 'Stable'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {dist.nameEn}
                    </h4>
                    <div className="text-xs text-teal-300 font-medium">
                      {dist.nameTn}
                    </div>

                    <div className="mt-3 p-2.5 bg-slate-800/70 rounded-xl border border-slate-700/60 text-xs">
                      <div className="text-[10px] text-slate-400 uppercase font-medium">
                        Primary Signal
                      </div>
                      <div className="font-semibold text-slate-200 mt-0.5">
                        {dist.primarySyndrome}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 text-center text-xs">
                      <div className="bg-slate-800/50 p-2 rounded-lg">
                        <div className="text-[10px] text-slate-400">7-Day Cases</div>
                        <div className="font-bold text-white text-sm">{dist.sevenDayCases}</div>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded-lg">
                        <div className="text-[10px] text-slate-400">Baseline Delta</div>
                        <div
                          className={`font-bold text-sm ${
                            dist.deltaPercent > 0 ? 'text-rose-300' : 'text-emerald-300'
                          }`}
                        >
                          {dist.deltaPercent > 0 ? `+${dist.deltaPercent}%` : `${dist.deltaPercent}%`}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-teal-400 font-semibold">
                    <span>Inspect on Map</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Assurance Banner */}
      <div className="px-6 py-3.5 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            {currentLang === 'tn'
              ? 'Tshireletso ya Tshedimosetso: Dipalo tsotlhe tsa mmapa ga di na maina a batho. Di dumalana le maemo a IDSR a Lephata la Botsogo.'
              : 'Governance Standard: Data strictly de-identified and compliant with Botswana MoH Integrated Disease Surveillance & Response (IDSR) protocols.'}
          </span>
        </div>
        <div className="text-slate-400 font-mono text-[10px]">
          Live Refresh · DHMT Signal Sync v2.4
        </div>
      </div>
    </div>
  );
};
