import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatioClass?: string;
  categoryLabel?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatioClass = 'aspect-4/3',
  categoryLabel,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#F4EFE6] ${aspectRatioClass} ${className}`}
    >
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F4EFE6] via-[#FAF7F2] to-[#FCE8EB] animate-pulse" />
          )}
        </>
      ) : (
        /* Aesthetic Handmade Craft Card Fallback */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FDF5F6] via-[#FAF7F2] to-[#F3F6F3]">
          <div className="w-14 h-14 rounded-full bg-white shadow-xs flex items-center justify-center mb-3 text-[#E2788D] border border-[#F8CFD7]/60">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12a4 4 0 0 1 8 0" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          {categoryLabel && (
            <span className="text-[11px] uppercase tracking-wider text-[#6F8A72] font-medium mb-1">
              {categoryLabel}
            </span>
          )}
          <span className="font-serif text-sm font-medium text-[#2C2523] line-clamp-1">
            {alt}
          </span>
          <span className="text-[11px] text-[#6E655F] mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#E2788D]" /> 100% Handcrafted
          </span>
        </div>
      )}
    </div>
  );
};
