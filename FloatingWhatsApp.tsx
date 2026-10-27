import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const greetingUrl = `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(
    "Hello Blooms Crochet! 🌸 I'm browsing your website and have a question about your handmade creations."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 pointer-events-auto">
      {/* Friendly Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-[#EAE2D3] animate-in fade-in slide-in-from-right-4 duration-300">
          <span className="text-xs text-[#2C2523] font-medium whitespace-nowrap">
            Chat with our artisan? 🌸
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss chat tip"
            className="text-[#6E655F] hover:text-[#2C2523] p-0.5 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={greetingUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with Blooms Crochet"
        className="group relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
};
