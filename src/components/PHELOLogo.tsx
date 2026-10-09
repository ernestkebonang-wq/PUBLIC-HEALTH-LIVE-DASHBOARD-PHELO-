import React from 'react';

export type LogoVariant = 'primary' | 'horizontal' | 'stacked' | 'icon' | 'monochrome-dark' | 'monochrome-light';
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface PHELOLogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  showTagline?: boolean;
  taglineText?: string;
  onClick?: () => void;
}

/**
 * PHELOLogo:
 * The official signature visual identity for PHELO (Botswana Digital Health Platform).
 *
 * Design Semiotics:
 * 1. Pula Droplet / Shield Silhouette: Life-giving water, vitality, and protective care.
 * 2. Community Embrace (Kgotla Arc): Two interconnected curves representing person & community.
 * 3. Clinical ECG Cardiac Signal: Horizontal vital sign pulse crossing the heart of the symbol.
 * 4. Intelligence Nexus: Central data node connecting primary care to national public health.
 */
export const PHELOLogo: React.FC<PHELOLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline = true,
  taglineText = 'Botswana Health Intelligence',
  onClick,
}) => {
  // Dimensions mapping
  const sizeMap = {
    xs: { iconSize: 22, textHeight: 'text-base', subText: 'text-[9px]', gap: 'gap-2' },
    sm: { iconSize: 28, textHeight: 'text-lg', subText: 'text-[10px]', gap: 'gap-2.5' },
    md: { iconSize: 36, textHeight: 'text-xl', subText: 'text-[11px]', gap: 'gap-3' },
    lg: { iconSize: 48, textHeight: 'text-2xl', subText: 'text-xs', gap: 'gap-3.5' },
    xl: { iconSize: 64, textHeight: 'text-3xl', subText: 'text-sm', gap: 'gap-4' },
    '2xl': { iconSize: 84, textHeight: 'text-4xl', subText: 'text-base', gap: 'gap-5' },
  };

  const { iconSize, textHeight, subText, gap } = sizeMap[size] || sizeMap.md;

  const isDarkMono = variant === 'monochrome-dark';
  const isLightMono = variant === 'monochrome-light';

  // Primary Symbol Vector
  const renderSymbol = (dim: number) => {
    // Colors based on variant
    const outerGradStart = isDarkMono ? '#0f172a' : isLightMono ? '#ffffff' : '#0f766e';
    const outerGradEnd = isDarkMono ? '#1e293b' : isLightMono ? '#f8fafc' : '#0e7490';
    const ecgStroke = isDarkMono ? '#0f172a' : isLightMono ? '#ffffff' : '#14b8a6';
    const pulseHighlight = isDarkMono ? '#334155' : isLightMono ? '#e2e8f0' : '#38bdf8';
    const nodeFill = isDarkMono ? '#0f172a' : isLightMono ? '#ffffff' : '#10b981';

    return (
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
        aria-label="PHELO Logo Symbol"
      >
        <defs>
          {/* Main Shield / Droplet Gradient */}
          <linearGradient id={`pheloGrad_${variant}`} x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={outerGradStart} />
            <stop offset="100%" stopColor={outerGradEnd} />
          </linearGradient>

          {/* Cardiac ECG Line Glow */}
          <linearGradient id={`pheloEcg_${variant}`} x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={ecgStroke} stopOpacity="0.4" />
            <stop offset="45%" stopColor={ecgStroke} stopOpacity="1" />
            <stop offset="60%" stopColor={pulseHighlight} stopOpacity="1" />
            <stop offset="100%" stopColor={ecgStroke} stopOpacity="0.4" />
          </linearGradient>

          {/* Soft Shadow for App Icon / High-Res presentations */}
          <filter id={`pheloSoftGlow_${variant}`} x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={isLightMono ? '#ffffff' : '#0d9488'} floodOpacity={isLightMono ? 0.2 : 0.25} />
          </filter>
        </defs>

        {/* 1. Base Droplet / Health Shield Contour (Pula & Protection) */}
        {/* Harmonious teardrop / heart-shield hybrid geometry */}
        <path
          d="
            M 50 10
            C 72 10 88 28 88 52
            C 88 74 68 88 50 94
            C 32 88 12 74 12 52
            C 12 28 28 10 50 10 Z
          "
          fill={`url(#pheloGrad_${variant})`}
          fillOpacity={isLightMono ? '0.15' : isDarkMono ? '0.08' : '0.12'}
          stroke={`url(#pheloGrad_${variant})`}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 2. Communal Embrace Arcs (Human-to-Human Care Loop) */}
        {/* Left arc (Person & Community) */}
        <path
          d="
            M 36 28
            C 26 36 22 46 24 60
            C 26 70 36 78 50 84
          "
          stroke={`url(#pheloGrad_${variant})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeOpacity={isLightMono || isDarkMono ? '0.8' : '0.9'}
        />

        {/* Right arc (Healthcare & Public Health Support) */}
        <path
          d="
            M 64 28
            C 74 36 78 46 76 60
            C 74 70 64 78 50 84
          "
          stroke={`url(#pheloGrad_${variant})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeOpacity={isLightMono || isDarkMono ? '0.8' : '0.9'}
        />

        {/* 3. Clinical Cardiac Waveform (ECG Pulse & Vital Rhythm) */}
        {/* Crossing from left isopotential -> QRS Spike -> ST wave -> right */}
        <path
          d="
            M 16 52
            L 34 52
            L 38 48
            L 42 56
            L 48 24
            L 55 76
            L 60 52
            L 66 52
            Q 71 44 76 52
            L 84 52
          "
          stroke={`url(#pheloEcg_${variant})`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#pheloSoftGlow_${variant})`}
        />

        {/* 4. Public Health Intelligence Node (The Botswana Vitality Anchor) */}
        {/* Apex pulse node at (48, 24) */}
        <circle
          cx="48"
          cy="24"
          r="4.5"
          fill={nodeFill}
          stroke={isLightMono ? '#000000' : '#ffffff'}
          strokeWidth="2"
        />

        {/* 5. Center Core Heart Dot (Empathy & Community) */}
        <circle
          cx="50"
          cy="52"
          r="3"
          fill={pulseHighlight}
        />
      </svg>
    );
  };

  // Icon-only presentation
  if (variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        title="PHELO — Botswana Digital Health"
      >
        {renderSymbol(iconSize)}
      </div>
    );
  }

  // Stacked vertical presentation
  if (variant === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        <div className="mb-2">
          {renderSymbol(iconSize * 1.3)}
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`font-black tracking-tight font-sans leading-none ${
              isLightMono ? 'text-white' : isDarkMono ? 'text-slate-950' : 'text-slate-950'
            } ${textHeight}`}
          >
            PHELO
          </span>
          {showTagline && (
            <span
              className={`font-semibold uppercase tracking-widest mt-1.5 ${
                isLightMono ? 'text-slate-300' : isDarkMono ? 'text-slate-500' : 'text-teal-700'
              } ${subText}`}
            >
              {taglineText}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Horizontal presentation (Standard Primary Header & Materials mark)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${gap} group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {renderSymbol(iconSize)}
      <div className="flex flex-col justify-center select-none text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-extrabold tracking-tight font-sans ${
              isLightMono ? 'text-white' : isDarkMono ? 'text-slate-950' : 'text-slate-950'
            } ${textHeight}`}
          >
            PHELO
          </span>
          {!isLightMono && !isDarkMono && (
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block mb-0.5" />
          )}
        </div>
        {showTagline && (
          <span
            className={`font-medium tracking-wide leading-tight mt-0.5 ${
              isLightMono ? 'text-slate-300' : isDarkMono ? 'text-slate-600' : 'text-slate-500'
            } ${subText}`}
          >
            {taglineText}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * PHELOAppBadge:
 * Renders an app icon / square tile presentation suitable for
 * App store badges, favicons, mobile homescreen PWA icons, and avatar stamps.
 */
export const PHELOAppBadge: React.FC<{
  size?: number;
  rounded?: 'full' | '2xl' | '3xl' | 'xl';
  variant?: 'medical' | 'dark' | 'white';
  className?: string;
  onClick?: () => void;
}> = ({
  size = 64,
  rounded = '2xl',
  variant = 'medical',
  className = '',
  onClick,
}) => {
  const bgStyles = {
    medical: 'bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 border border-teal-700/50 shadow-md text-white',
    dark: 'bg-slate-950 border border-slate-800 shadow-md text-white',
    white: 'bg-white border border-slate-200 shadow-sm text-slate-950',
  };

  const roundedClasses = {
    full: 'rounded-full',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center p-2.5 overflow-hidden transition-all duration-300 hover:scale-105 ${bgStyles[variant]} ${roundedClasses[rounded]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      title="PHELO Application Icon"
    >
      <PHELOLogo
        variant={variant === 'white' ? 'monochrome-dark' : 'primary'}
        size="md"
        showTagline={false}
      />
    </div>
  );
};
