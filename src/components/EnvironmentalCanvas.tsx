import React, { memo } from 'react';

interface EnvironmentalCanvasProps {
  isLivingMode?: boolean;
}

export const EnvironmentalCanvas: React.FC<EnvironmentalCanvasProps> = memo(({ isLivingMode = true }) => {
  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Primary Ambient Ecological Gradient Blobs */}
      <div 
        className={`absolute -top-40 -left-40 w-96 sm:w-[540px] h-96 sm:h-[540px] rounded-full bg-emerald-100/40 blur-3xl transition-opacity duration-1000 ${
          isLivingMode ? 'opacity-70 animate-wave' : 'opacity-30'
        }`} 
      />

      <div 
        className={`absolute top-1/4 -right-32 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-teal-100/35 blur-3xl transition-opacity duration-1000 ${
          isLivingMode ? 'opacity-60 animate-vitality' : 'opacity-20'
        }`} 
      />

      <div 
        className={`absolute top-2/3 left-1/5 w-72 sm:w-[450px] h-72 sm:h-[450px] rounded-full bg-sky-100/30 blur-3xl transition-opacity duration-1000 ${
          isLivingMode ? 'opacity-50 animate-wave' : 'opacity-20'
        }`} 
      />

      {/* Warm Botswana Sand / Sunset earth accent blob */}
      <div 
        className={`absolute bottom-20 -right-20 w-80 sm:w-[400px] h-80 sm:h-[400px] rounded-full bg-amber-100/25 blur-3xl transition-opacity duration-1000 ${
          isLivingMode ? 'opacity-40' : 'opacity-10'
        }`} 
      />

      {/* Floating Vitality Health Nodes (Subtle visual indicators of life and public health connectivity) */}
      {isLivingMode && (
        <>
          <div className="absolute top-36 left-12 w-2.5 h-2.5 rounded-full bg-teal-400/40 blur-[1px] animate-drift-slow" />
          <div className="absolute top-64 right-1/4 w-3.5 h-3.5 rounded-full bg-emerald-400/35 blur-[1px] animate-drift-slow [animation-delay:2s]" />
          <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-sky-400/40 blur-[1px] animate-drift-slow [animation-delay:4s]" />
          <div className="absolute top-3/4 right-16 w-3 h-3 rounded-full bg-teal-300/30 blur-[1px] animate-drift-slow [animation-delay:6s]" />
        </>
      )}

      {/* Subtle organic contour line (Represents Pula / Okavango waterways and ECG life rhythm) */}
      <svg
        className="absolute bottom-0 left-0 w-full h-48 opacity-[0.035] text-teal-900 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120C240 60 480 180 720 120C960 60 1200 180 1440 120V240H0V120Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
});

EnvironmentalCanvas.displayName = 'EnvironmentalCanvas';
