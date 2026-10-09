import React, { memo } from 'react';

interface ECGHeartbeatBackgroundProps {
  isLivingMode?: boolean;
}

/**
 * ECGHeartbeatBackground:
 * Renders a subtle, calm, authentic clinical electrocardiogram (ECG) waveform
 * in continuous, gentle motion across the background of PHELO.
 *
 * Characteristics:
 * - Medically inspired P-Q-R-S-T cardiac cycle waveform
 * - Extremely gentle opacity and soft healthcare-inspired motion so text,
 *   buttons, cards, emergency triggers, and navigation maintain 100% legibility
 * - Soft teal/cyan luminescence with subtle warm Botswana twilight balance
 * - Lightweight SVG paths with pure CSS translateX translations for flawless 60fps performance
 * - Full compliance with prefers-reduced-motion (freezes animation cleanly into a static, calm trace)
 * - Strict pointer-events-none and z-0 positioning to never block interaction
 */
export const ECGHeartbeatBackground: React.FC<ECGHeartbeatBackgroundProps> = memo(({ isLivingMode = true }) => {
  return (
    <div 
      aria-hidden="true" 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* Upper Subtle Clinical ECG Stream (Hero Zone) */}
      <div 
        className={`absolute top-24 sm:top-28 left-0 w-[200%] h-36 sm:h-48 transition-opacity duration-1000 ${
          isLivingMode ? 'opacity-85' : 'opacity-25'
        }`}
      >
        <svg 
          className={`w-full h-full ${isLivingMode ? 'animate-ecg-scroll' : ''}`}
          preserveAspectRatio="none"
          viewBox="0 0 2000 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Medical Teal ECG Gradient with soft fadeout at bounds */}
            <linearGradient id="ecgGlowTeal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f766e" stopOpacity="0.08" />
              <stop offset="20%" stopColor="#0d9488" stopOpacity="0.30" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.55" />
              <stop offset="80%" stopColor="#0d9488" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.08" />
            </linearGradient>

            {/* Soft biological luminescence filter */}
            <filter id="ecgSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Repeatable Clinical P-Q-R-S-T Cardiac Waveform across 2000px */}
          {/* Wave pattern: Isopotential -> P wave -> PR segment -> Q wave -> R wave spike -> S wave -> ST segment -> T wave */}
          <path
            d="
              M 0 60
              L 120 60
              Q 135 52 145 60
              L 170 60
              L 178 68
              L 190 12
              L 204 88
              L 212 60
              L 245 60
              Q 265 46 290 60
              L 500 60

              L 620 60
              Q 635 52 645 60
              L 670 60
              L 678 68
              L 690 12
              L 704 88
              L 712 60
              L 745 60
              Q 765 46 790 60
              L 1000 60

              L 1120 60
              Q 1135 52 1145 60
              L 1170 60
              L 1178 68
              L 1190 12
              L 1204 88
              L 1212 60
              L 1245 60
              Q 1265 46 1290 60
              L 1500 60

              L 1620 60
              Q 1635 52 1645 60
              L 1670 60
              L 1678 68
              L 1690 12
              L 1704 88
              L 1712 60
              L 1745 60
              Q 1765 46 1790 60
              L 2000 60
            "
            stroke="url(#ecgGlowTeal)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ecgSoftGlow)"
          />

          {/* Gentle baseline isoelectric grid guide */}
          <line 
            x1="0" 
            y1="60" 
            x2="2000" 
            y2="60" 
            stroke="#0d9488" 
            strokeWidth="0.75" 
            strokeOpacity="0.08" 
            strokeDasharray="4 10"
          />

          {/* Subtle cardiac pulse nodes at R-wave peaks */}
          <circle cx="190" cy="12" r="2.5" fill="#14b8a6" fillOpacity="0.4" />
          <circle cx="690" cy="12" r="2.5" fill="#14b8a6" fillOpacity="0.4" />
          <circle cx="1190" cy="12" r="2.5" fill="#14b8a6" fillOpacity="0.4" />
          <circle cx="1690" cy="12" r="2.5" fill="#14b8a6" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Mid-Page Ambient Cardiac Rhythm (behind National Corridors & Visualizer) */}
      <div 
        className={`absolute top-[960px] sm:top-[900px] -left-1/4 w-[220%] h-32 transition-opacity duration-1000 ${
          isLivingMode ? 'opacity-70' : 'opacity-20'
        }`}
      >
        <svg 
          className={`w-full h-full ${isLivingMode ? 'animate-ecg-scroll-reverse' : ''}`}
          preserveAspectRatio="none"
          viewBox="0 0 2000 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
              M 0 50
              L 220 50
              Q 235 44 245 50
              L 265 50
              L 272 56
              L 282 15
              L 294 75
              L 302 50
              L 330 50
              Q 350 40 370 50
              L 700 50

              L 920 50
              Q 935 44 945 50
              L 965 50
              L 972 56
              L 982 15
              L 994 75
              L 1002 50
              L 1030 50
              Q 1050 40 1070 50
              L 1400 50

              L 1620 50
              Q 1635 44 1645 50
              L 1665 50
              L 1672 56
              L 1682 15
              L 1694 75
              L 1702 50
              L 1730 50
              Q 1750 40 1770 50
              L 2000 50
            "
            stroke="#059669"
            strokeWidth="1.2"
            strokeOpacity="0.18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
});

ECGHeartbeatBackground.displayName = 'ECGHeartbeatBackground';
