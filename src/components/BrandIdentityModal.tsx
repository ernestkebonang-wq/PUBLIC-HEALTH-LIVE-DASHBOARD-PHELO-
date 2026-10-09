import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  Heart, 
  Activity, 
  Network, 
  Sparkles,
  Layers,
  Palette
} from 'lucide-react';
import { PHELOLogo, PHELOAppBadge } from './PHELOLogo';
import { LanguageCode } from '../types';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
}

export const BrandIdentityModal: React.FC<BrandIdentityModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const BRAND_COLORS = [
    {
      id: 'kalahari-navy',
      name: 'Kalahari Deep Medical Navy',
      role: 'Authority, Trust & Clinical Governance',
      hex: '#0F2942',
      text: 'text-white',
      border: 'border-slate-800',
    },
    {
      id: 'vitality-teal',
      name: 'Vitality Health Teal',
      role: 'Primary Care, Wellbeing & Healing',
      hex: '#0D9488',
      text: 'text-white',
      border: 'border-teal-700',
    },
    {
      id: 'pula-cyan',
      name: 'Pula Innovation Cyan',
      role: 'Life-giving Rain, Digital Connectivity & Speed',
      hex: '#06B6D4',
      text: 'text-slate-950',
      border: 'border-cyan-600',
    },
    {
      id: 'botanic-emerald',
      name: 'Botanic Emerald',
      role: 'Environmental Health & Community Resilience',
      hex: '#10B981',
      text: 'text-white',
      border: 'border-emerald-600',
    },
    {
      id: 'clean-slate',
      name: 'Clinical Neutral Slate',
      role: 'Readability, Clean White Space & Calm',
      hex: '#F8FAFC',
      text: 'text-slate-900',
      border: 'border-slate-300',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-between border-b border-teal-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                Official Brand System & Visual Identity
              </div>
              <h2 className="text-xl font-extrabold tracking-tight">
                PHELO Identity Guidelines
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close brand modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-slate-100">
          {/* Section 1: Logo Showcase Matrix */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Core Brand Configurations
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Primary, App Icon & Monochrome Systems
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Engineered to scale from a 16px browser favicon to high-visibility public hospital signage and national digital health documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. Primary Horizontal */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between items-center text-center">
                <div className="text-[11px] font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                  Primary Horizontal Mark
                </div>
                <div className="my-auto py-2">
                  <PHELOLogo variant="horizontal" size="lg" />
                </div>
                <div className="text-[10px] text-slate-500 mt-4 border-t border-slate-200 pt-2 w-full">
                  Primary web headers, documentation & letterheads
                </div>
              </div>

              {/* 2. Stacked Presentation */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between items-center text-center">
                <div className="text-[11px] font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                  Stacked Vertical Mark
                </div>
                <div className="my-auto py-2">
                  <PHELOLogo variant="stacked" size="md" />
                </div>
                <div className="text-[10px] text-slate-500 mt-4 border-t border-slate-200 pt-2 w-full">
                  Splash screens, annual reports & mobile login
                </div>
              </div>

              {/* 3. Mobile App Icon & Avatar */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between items-center text-center">
                <div className="text-[11px] font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                  Digital App Icon (PWA / iOS / Android)
                </div>
                <div className="my-auto flex items-center justify-center gap-3">
                  <PHELOAppBadge size={54} rounded="2xl" variant="medical" />
                  <PHELOAppBadge size={54} rounded="full" variant="dark" />
                </div>
                <div className="text-[10px] text-slate-500 mt-4 border-t border-slate-200 pt-2 w-full">
                  Homescreen icon, favicon & social avatar
                </div>
              </div>

              {/* 4. Dark Background Inversion */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between items-center text-center text-white">
                <div className="text-[11px] font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                  Dark Inversion Mark
                </div>
                <div className="my-auto py-2">
                  <PHELOLogo variant="monochrome-light" size="lg" />
                </div>
                <div className="text-[10px] text-slate-400 mt-4 border-t border-slate-800 pt-2 w-full">
                  Emergency night UI, dark mode & outdoor billboards
                </div>
              </div>

              {/* 5. Monochrome Single-Color Dark */}
              <div className="bg-white p-6 rounded-2xl border border-slate-300 flex flex-col justify-between items-center text-center">
                <div className="text-[11px] font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                  Formal Monochrome (Single-Color)
                </div>
                <div className="my-auto py-2">
                  <PHELOLogo variant="monochrome-dark" size="lg" />
                </div>
                <div className="text-[10px] text-slate-500 mt-4 border-t border-slate-200 pt-2 w-full">
                  Black-and-white printing, faxes, clinical receipts
                </div>
              </div>

              {/* 6. Seal / Stamp Emblem */}
              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 flex flex-col justify-between items-center text-center">
                <div className="text-[11px] font-semibold text-emerald-800 mb-4 uppercase tracking-wider">
                  Clinical Verification Stamp
                </div>
                <div className="my-auto">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-600 flex items-center justify-center p-2 bg-white shadow-2xs">
                    <PHELOLogo variant="icon" size="sm" />
                  </div>
                </div>
                <div className="text-[10px] text-emerald-800 font-medium mt-4 border-t border-emerald-200 pt-2 w-full">
                  MoH alignment stamps & verified clinic badges
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Design Semiotics & Anatomy */}
          <div className="pt-6 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Design Semiotics & Meaning
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                How Health, People, Community & Botswana Fuse Together
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80">
                <div className="w-8 h-8 rounded-xl bg-teal-800 text-white flex items-center justify-center mb-2.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Clinical ECG Wave</div>
                <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  A modern cardiac rhythm running through the center communicates clinical precision, vital signs, and acute response.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80">
                <div className="w-8 h-8 rounded-xl bg-sky-800 text-white flex items-center justify-center mb-2.5">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Communal Embrace</div>
                <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Two protective interlocking human arcs (inspired by the Kgotla gathering) reflect compassionate care between person and clinic.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200/80">
                <div className="w-8 h-8 rounded-xl bg-cyan-800 text-white flex items-center justify-center mb-2.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Pula Droplet & Shield</div>
                <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  The harmonic outer silhouette references the life-giving Pula raindrop and a protective healthcare shield.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center mb-2.5">
                  <Network className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-900">Intelligence Node</div>
                <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  The focal green vertex represents public health data intelligence, linking community symptoms to national surveillance.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Official Colour Swatches */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Colour Palette Specifications
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Healthcare + Technology + Botswana Palette
                </h3>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-teal-700" />
                <span>Click swatch to copy HEX</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {BRAND_COLORS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => handleCopy(col.hex, col.id)}
                  style={{ backgroundColor: col.hex }}
                  className={`p-4 rounded-2xl ${col.text} border ${col.border} text-left flex flex-col justify-between h-32 transition-all hover:scale-[1.03] shadow-xs relative group`}
                >
                  <div>
                    <div className="text-xs font-bold font-mono">{col.hex}</div>
                    <div className="text-[11px] font-semibold opacity-90 mt-0.5">{col.name}</div>
                  </div>
                  <div className="text-[10px] opacity-75 leading-tight">
                    {col.role}
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copiedColor === col.id ? (
                      <Check className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-80" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Typography Standard */}
          <div className="pt-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Typography Standard
            </span>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-500">Logotype Font</div>
                <div className="text-xl font-extrabold text-slate-950 mt-1 font-sans">
                  Cabinet Grotesk / Plus Jakarta Sans
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Weight 800 (ExtraBold/Black)</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">Sub-brand Tagline</div>
                <div className="text-sm font-bold uppercase tracking-widest text-teal-800 mt-1">
                  Botswana Health Intelligence
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Weight 600, All Caps, Letter-spacing +0.05em</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">International Credibility</div>
                <div className="text-xs text-slate-700 mt-1 leading-relaxed">
                  Complies with clinical accessibility (WCAG AAA contrast), high-DPI retina sharpness, and zero visual gimmicks.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Official Protected Mark · Republic of Botswana Health Framework Aligned</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors"
          >
            Close Identity Guide
          </button>
        </div>
      </div>
    </div>
  );
};
