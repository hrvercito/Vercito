/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface VercitoLogoProps {
  variant?: 'full' | 'icon' | 'horizontal' | 'compact';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isDarkBg?: boolean;
  className?: string;
  showTagline?: boolean;
}

export const VercitoLogo: React.FC<VercitoLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  isDarkBg = false,
  className = '',
  showTagline = true,
}) => {
  // Height sizing
  const heightClasses = {
    xs: 'h-7',
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  }[size];

  // SVG Emblem Mark
  const Emblem = (
    <svg
      viewBox="0 0 500 500"
      className="h-full w-auto aspect-square shrink-0 overflow-visible drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Navy Gradients */}
        <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1F3A" />
          <stop offset="50%" stopColor="#08162A" />
          <stop offset="100%" stopColor="#040C18" />
        </linearGradient>

        {/* Gold Gradients */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9E29C" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor="#AA820A" />
          <stop offset="100%" stopColor="#E5C158" />
        </linearGradient>

        {/* Globe Gradient */}
        <radialGradient id="globeGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1E4D8C" />
          <stop offset="60%" stopColor="#0B2A5B" />
          <stop offset="100%" stopColor="#051430" />
        </radialGradient>

        {/* Gloss Overlay */}
        <linearGradient id="glossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* --- GLOBE CENTER --- */}
      <circle cx="250" cy="230" r="105" fill="url(#globeGrad)" stroke="url(#goldGrad)" strokeWidth="3" />
      {/* Globe Lat/Long grid lines */}
      <ellipse cx="250" cy="230" rx="105" ry="40" fill="none" stroke="#64B5F6" strokeWidth="1.2" strokeOpacity="0.3" />
      <ellipse cx="250" cy="230" rx="60" ry="105" fill="none" stroke="#64B5F6" strokeWidth="1.2" strokeOpacity="0.3" />
      <line x1="145" y1="230" x2="355" y2="230" stroke="#64B5F6" strokeWidth="1.2" strokeOpacity="0.3" />
      <line x1="250" y1="125" x2="250" y2="335" stroke="#64B5F6" strokeWidth="1.2" strokeOpacity="0.3" />

      {/* Stylized Continents (Europe / Africa / Americas) */}
      <path
        d="M210,165 Q230,155 250,160 T270,185 Q260,205 240,210 Q225,225 215,200 Z M235,220 Q265,225 275,255 Q260,290 230,295 Q210,280 220,250 Z"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />
      <path
        d="M165,180 Q180,175 190,195 Q175,220 160,200 Z"
        fill="#FFFFFF"
        fillOpacity="0.85"
      />

      {/* --- BIG STYLIZED 'V' --- */}
      {/* Left Stroke of V (Navy Blue) */}
      <path
        d="M135,110 L195,110 L250,320 L220,320 Z"
        fill="url(#navyGrad)"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
      />
      {/* Right Stroke of V (Metallic Gold) */}
      <path
        d="M365,110 L305,110 L250,320 L280,320 Z"
        fill="url(#goldGrad)"
        stroke="#0B1F3A"
        strokeWidth="1.5"
      />

      {/* --- MORTARBOARD / GRADUATION CAP --- */}
      {/* Cap Diamond Top */}
      <polygon points="250,25 380,68 250,110 120,68" fill="url(#navyGrad)" stroke="url(#goldGrad)" strokeWidth="3" />
      <polygon points="250,32 360,68 250,102 140,68" fill="url(#navyGrad)" />

      {/* Cap Skull Base */}
      <path d="M185,82 L185,115 Q250,145 315,115 L315,82 Q250,110 185,82 Z" fill="url(#navyGrad)" stroke="url(#goldGrad)" strokeWidth="2" />

      {/* Cap Tassel */}
      <path d="M250,68 Q210,75 198,125" fill="none" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="250" cy="68" r="4" fill="url(#goldGrad)" />
      {/* Tassel Fringe */}
      <polygon points="193,125 203,125 200,155 196,155" fill="url(#goldGrad)" />

      {/* --- FIVE STARS ARC --- */}
      {[
        { cx: 325, cy: 60, r: 9, rot: -20 },
        { cx: 350, cy: 75, r: 9, rot: -10 },
        { cx: 375, cy: 95, r: 9, rot: 0 },
        { cx: 395, cy: 120, r: 9, rot: 15 },
        { cx: 410, cy: 150, r: 9, rot: 30 },
      ].map((star, i) => (
        <path
          key={i}
          d="M0,-8 L2,-2 L8,-2 L3,2 L5,8 L0,4 L-5,8 L-3,2 L-8,-2 L-2,-2 Z"
          transform={`translate(${star.cx}, ${star.cy}) rotate(${star.rot}) scale(1.1)`}
          fill="url(#goldGrad)"
          stroke="#0B1F3A"
          strokeWidth="0.5"
        />
      ))}

      {/* --- ORBITING SWOOSH RINGS & AIRPLANE --- */}
      {/* Back Swoosh Arc */}
      <path
        d="M140,260 Q120,220 220,180 Q320,140 400,120"
        fill="none"
        stroke="url(#navyGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Front Gold Swoosh Arc */}
      <path
        d="M130,270 Q200,320 340,260 Q430,210 420,130"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Airplane Icon Flying High Right */}
      <g transform="translate(415, 125) rotate(-35) scale(1.1)">
        {/* Jet Fuselage & Wings */}
        <path
          d="M0,-22 L5,-5 L22,5 L22,10 L5,2 L4,18 L10,23 L10,27 L0,23 L-10,27 L-10,23 L-4,18 L-5,2 L-22,10 L-22,5 L-5,-5 Z"
          fill="url(#navyGrad)"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );

  // Typography color resolution with dark mode support
  const primaryTextColor = isDarkBg ? 'text-white' : 'text-[#0B1F3A] dark:text-white';
  const taglineTextColor = isDarkBg ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300';

  if (variant === 'icon') {
    return <div className={`${heightClasses} aspect-square ${className}`}>{Emblem}</div>;
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2.5 ${heightClasses} ${className}`}>
        {Emblem}
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-serif font-extrabold tracking-tight text-lg sm:text-xl ${primaryTextColor}`}>
            VERCITO
          </span>
          {showTagline && (
            <span className="text-[9px] font-bold tracking-widest text-[#D4AF37] uppercase">
              STUDY ABROAD
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-3 ${heightClasses} ${className}`}>
        {Emblem}
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-baseline gap-1.5">
            <span className={`font-serif font-extrabold tracking-tight text-xl sm:text-2xl ${primaryTextColor}`}>
              VERCITO
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#0B1F3A] text-[9px] font-black uppercase tracking-wider">
              EST. 2026
            </span>
          </div>
          {showTagline && (
            <span className={`text-[10px] font-semibold tracking-wider uppercase ${taglineTextColor} opacity-90`}>
              SHAPING FUTURES BEYOND BORDERS
            </span>
          )}
        </div>
      </div>
    );
  }

  // Full stacked logo variant (like logo in Image 2)
  return (
    <div className={`flex flex-col items-center text-center p-2 ${className}`}>
      <div className={`${heightClasses} aspect-square mb-2`}>{Emblem}</div>

      <h1 className={`font-serif font-extrabold text-3xl sm:text-4xl tracking-tight leading-none ${primaryTextColor}`}>
        VERCITO
      </h1>

      {showTagline && (
        <div className="w-full space-y-1.5 mt-2">
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${taglineTextColor}`}>
              SHAPING FUTURES BEYOND BORDERS
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>

          <div className="inline-block px-3 py-1 rounded-md bg-[#0B1F3A] border border-[#D4AF37] text-[#D4AF37] font-mono text-[11px] font-black tracking-widest uppercase my-1">
            EST. 2026
          </div>

          <p className="text-[11px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
            STUDY ABROAD CONSULTANCY
          </p>
        </div>
      )}
    </div>
  );
};
