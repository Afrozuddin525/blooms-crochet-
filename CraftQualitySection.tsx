import React from 'react';
import { Heart, Sparkles, Gift, Feather, Clock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CraftQualitySection: React.FC = () => {
  const { setIsCustomOrderOpen } = useCart();

  return (
    <section className="py-20 bg-white border-y border-[#EAE2D3]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#CB536B] font-semibold mb-2 flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>The Blooms Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C2523] tracking-tight">
            Crafted Stitched by Hand, Designed to Last Forever
          </h2>
          <p className="mt-3 text-sm text-[#6E655F] leading-relaxed">
            In a world of mass production and plastic trinkets, we choose slow fashion. Every single petal,
            stitch, and knot carries the warmth and undivided attention of our artisan.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Pillar 1: Slow Craft */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE2D3] flex flex-col justify-between hover:border-[#E2788D]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-[#CB536B] flex items-center justify-center mb-6 shadow-2xs border border-[#EAE2D3]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2C2523] mb-3">
                Mindful Slow Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                No factory machines, no rushed assembly lines. A single floral bouquet takes between 4
                to 9 hours of patient, fine-gauge crochet hook work. The result is unmatched texture,
                durability, and soulful character.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE2D3] flex items-center gap-2 text-xs text-[#6F8A72] font-medium">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Premium 5-ply combed milk cotton</span>
            </div>
          </div>

          {/* Pillar 2: Custom Orders */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE2D3] flex flex-col justify-between hover:border-[#6F8A72]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-[#6F8A72] flex items-center justify-center mb-6 shadow-2xs border border-[#EAE2D3]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2C2523] mb-3">
                Custom Colors & Bespoke Designs
              </h3>
              <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                Every customer has a unique aesthetic. From matching wedding lehengas and bridesmaids' hair
                venis to personal monogram letters and baby nursery palettes, we happily customize colors,
                stems, and dimensions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE2D3] flex items-center justify-between">
              <button
                onClick={() => setIsCustomOrderOpen(true)}
                className="text-xs text-[#CB536B] font-semibold hover:underline cursor-pointer"
              >
                Request custom piece →
              </button>
              <span className="text-[11px] text-[#6E655F]">WhatsApp direct</span>
            </div>
          </div>

          {/* Pillar 3: Thoughtful Gifting */}
          <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EAE2D3] flex flex-col justify-between hover:border-[#CB536B]/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white text-[#CB536B] flex items-center justify-center mb-6 shadow-2xs border border-[#EAE2D3]">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2C2523] mb-3">
                Thoughtful Gifting Ready
              </h3>
              <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                A bouquet that never wilts is the most heartfelt symbol of enduring friendship, love, or
                celebration. Every piece arrives lovingly nestled in eco-friendly kraft packaging, tied with
                satin ribbon, with an optional handwritten note.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#EAE2D3] flex items-center gap-2 text-xs text-[#6F8A72] font-medium">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Complimentary handwritten gift card</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
