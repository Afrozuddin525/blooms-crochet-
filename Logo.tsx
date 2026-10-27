import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  light = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl md:text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Handcrafted Flower & Yarn SVG Emblem */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center shrink-0 rounded-full transition-transform hover:rotate-6 duration-300`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Outer gentle flower petals */}
          <circle cx="24" cy="14" r="8" fill="#F8CFD7" fillOpacity="0.75" />
          <circle cx="34" cy="24" r="8" fill="#F8CFD7" fillOpacity="0.75" />
          <circle cx="24" cy="34" r="8" fill="#F8CFD7" fillOpacity="0.75" />
          <circle cx="14" cy="24" r="8" fill="#F8CFD7" fillOpacity="0.75" />
          
          {/* Diagonal softer accent petals */}
          <circle cx="31" cy="17" r="7" fill="#FCE8EB" fillOpacity="0.9" />
          <circle cx="31" cy="31" r="7" fill="#FCE8EB" fillOpacity="0.9" />
          <circle cx="17" cy="31" r="7" fill="#FCE8EB" fillOpacity="0.9" />
          <circle cx="17" cy="17" r="7" fill="#FCE8EB" fillOpacity="0.9" />

          {/* Central cozy yarn ball with texture wraps */}
          <circle cx="24" cy="24" r="10" fill="#E2788D" />
          
          {/* Yarn strand winding curves */}
          <path
            d="M17 21 C20 18, 27 18, 30 22"
            stroke="#FAF7F2"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M16 26 C19 30, 27 30, 31 25"
            stroke="#FAF7F2"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path
            d="M21 16 C26 20, 25 28, 20 31"
            stroke="#FAF7F2"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* Slender golden crochet hook resting gracefully */}
          <path
            d="M12 37 L34 13 C35.5 11.5, 37.5 13, 36.5 14.5 L34.5 16.5"
            stroke="#6F8A72"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Small gentle leaf bud */}
          <path
            d="M33 33 C37 32, 40 35, 39 39 C35 40, 32 37, 33 33 Z"
            fill="#8EA890"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif tracking-tight font-medium ${textSizes[size]} ${
            light ? 'text-[#FAF7F2]' : 'text-[#2C2523]'
          } leading-none`}
        >
          Blooms Crochet
        </span>
        {showSubtitle && (
          <span
            className={`text-[10px] sm:text-[11px] tracking-widest uppercase mt-0.5 font-medium ${
              light ? 'text-[#FAF7F2]/75' : 'text-[#6F8A72]'
            }`}
          >
            Handmade with Love
          </span>
        )}
      </div>
    </div>
  );
};
