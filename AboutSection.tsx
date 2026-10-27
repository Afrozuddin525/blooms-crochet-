import React from 'react';
import { SmartImage } from './SmartImage';
import { Sparkles, Heart, Feather, Droplets, Sun, Wind } from 'lucide-react';
import { BRAND_INFO } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-t border-[#EAE2D3] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#EAE2D3] shadow-md p-3">
              <div className="rounded-2xl overflow-hidden aspect-4/5 relative">
                <SmartImage
                  src="/src/assets/images/regenerated_image_1792937642119.png"
                  alt="Blooms Crochet Artisan Crafting Handmade Stitches"
                  aspectRatioClass="aspect-4/5"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#F8CFD7] block mb-1">
                      Our Philosophy
                    </span>
                    <p className="font-serif text-lg font-medium leading-snug">
                      "Flowers that never fade, made with hands that never rush."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="absolute -bottom-5 -right-5 bg-[#6F8A72] text-white p-4 rounded-2xl shadow-lg max-w-[200px] hidden sm:block">
              <span className="text-xs font-semibold block uppercase tracking-wider">
                Slow Crafted
              </span>
              <span className="text-[11px] opacity-90 mt-0.5 block">
                Pure combed milk cotton for everlasting soft blooms.
              </span>
            </div>
          </div>

          {/* Story Content Column */}
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-widest text-[#CB536B] font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Blooms Crochet</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C2523] tracking-tight leading-tight">
              Where Cozy Yarn Transforms Into Blooming Art
            </h2>

            <div className="mt-6 space-y-4 text-sm text-[#6E655F] leading-relaxed">
              <p>
                Welcome to <strong className="text-[#2C2523] font-medium">Blooms Crochet</strong>.
                Founded with a heartfelt love for the therapeutic art of crochet and the gentle beauty of nature,
                our small studio creates delicate, everlasting treasures that bring warmth and joy to your life.
              </p>
              <p>
                Each creation — from our fragrant-look jasmine bridal gajras and vibrant sunflower bouquets to
                dainty cottagecore bandanas and miniature amigurumi desserts — is individually crafted by hand
                with immense care, creativity, and attention to detail. We never use mechanized knitting
                or bulk shortcuts.
              </p>
              <p>
                Whether you are treating yourself to a floral companion for your study desk or surprising someone
                cherished with a personalized anniversary bouquet, each piece makes a thoughtful, heirloom gift
                destined to be treasured for years to come.
              </p>
            </div>

            {/* Craftsmanship Highlights & Care Tips */}
            <div className="mt-8 pt-6 border-t border-[#EAE2D3]">
              <h3 className="font-serif text-base font-semibold text-[#2C2523] mb-3">
                How to Care for Your Handmade Crochet Treasures
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#6E655F]">
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2D3]">
                  <div className="flex items-center gap-1.5 text-[#CB536B] font-medium mb-1">
                    <Droplets className="w-4 h-4" /> Gentle Spot Clean
                  </div>
                  <span>Use mild detergent in cold water. Do not twist or wring roughly.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2D3]">
                  <div className="flex items-center gap-1.5 text-[#6F8A72] font-medium mb-1">
                    <Wind className="w-4 h-4" /> Flat Dry in Shade
                  </div>
                  <span>Lay flat on a towel away from direct harsh sunlight to preserve colors.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE2D3]">
                  <div className="flex items-center gap-1.5 text-[#CB536B] font-medium mb-1">
                    <Feather className="w-4 h-4" /> Gentle Reshaping
                  </div>
                  <span>Lightly reshape petals or leaves with your fingers once dry.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
