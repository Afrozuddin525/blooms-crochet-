import React from 'react';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { SmartImage } from './SmartImage';
import { BRAND_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

export const Hero: React.FC = () => {
  const { setIsCustomOrderOpen } = useCart();

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle organic background tint circles */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#FCE8EB]/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Quiet handcrafted kicker */}
            <div className="inline-flex items-center gap-2 self-center lg:self-start text-xs font-medium text-[#6F8A72] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8EA890]" />
              <span className="tracking-wider uppercase">Artisanal Crochet Studio</span>
              <span aria-hidden="true">·</span>
              <span>100% Hand-Stitched</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2C2523] leading-[1.15] text-balance">
              Handmade with Love, <br />
              <span className="italic font-normal text-[#CB536B]">Bloomed with Care</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-[#6E655F] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Unique crochet creations, carefully handmade just for you. From everlasting floral
              bouquets and traditional bridal gajras to cottagecore bandanas and charming keepsakes.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white bg-[#CB536B] hover:bg-[#AB3A51] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-[#2C2523] bg-white border border-[#EAE2D3] hover:border-[#6F8A72] hover:bg-[#F4EFE6] transition-all cursor-pointer"
              >
                <span>Contact Us</span>
              </a>

              <button
                onClick={() => setIsCustomOrderOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-[#6F8A72] hover:text-[#556E58] transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#CB536B]" />
                <span>Custom Order Request</span>
              </button>
            </div>

            {/* 4 Trust Points */}
            <div className="mt-12 pt-8 border-t border-[#EAE2D3] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-[#CB536B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#2C2523]">100% Handcrafted</div>
                  <div className="text-[11px] text-[#6E655F]">Slow, mindful craft</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#6F8A72] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#2C2523]">Premium Milk Cotton</div>
                  <div className="text-[11px] text-[#6E655F]">Soft & colorfast yarn</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#E2788D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#2C2523]">Custom Orders</div>
                  <div className="text-[11px] text-[#6E655F]">Colors & initials tailored</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#6F8A72] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#2C2523]">Pan-India Shipping</div>
                  <div className="text-[11px] text-[#6E655F]">Safe & gift-boxed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Real Crochet Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Focal Card */}
              <div className="rounded-3xl overflow-hidden bg-white shadow-xl shadow-[#2C2523]/5 border border-[#EAE2D3] p-3 transition-transform hover:scale-[1.01] duration-500">
                <div className="rounded-2xl overflow-hidden aspect-4/3 relative">
                  <SmartImage
                    src="/src/assets/images/regenerated_image_1792937568525.png"
                    alt="Handmade Pastel Crochet Tulip and Daisy Bouquet"
                    aspectRatioClass="aspect-4/3"
                  />
                  {/* Subtle caption overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-white">
                    <span className="text-[11px] uppercase tracking-wider text-[#F8CFD7] font-medium block">
                      Featured Creation
                    </span>
                    <span className="font-serif text-lg font-medium leading-tight">
                      Blushing French Tulip Bouquet
                    </span>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#6E655F] block">Starting at</span>
                    <span className="font-serif text-xl font-medium text-[#2C2523] tabular-nums">
                      ₹899
                    </span>
                  </div>
                  <a
                    href="#shop"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#CB536B] bg-[#FCE8EB] rounded-full hover:bg-[#F8CFD7] transition-colors"
                  >
                    View in Shop <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Floating Mini Accent Card 1: Gajra */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl p-3 shadow-lg border border-[#EAE2D3] items-center gap-3 max-w-xs">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <SmartImage
                    src="/src/assets/images/regenerated_image_1792937573369.png"
                    alt="Crochet Mogra Gajra"
                    aspectRatioClass="aspect-square"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6F8A72] font-semibold block">
                    Festive Favorite
                  </span>
                  <span className="font-serif text-xs font-medium text-[#2C2523] block leading-tight">
                    Mogra Jasmine Gajra
                  </span>
                  <span className="text-xs font-semibold text-[#CB536B] tabular-nums">₹499</span>
                </div>
              </div>

              {/* Floating Mini Accent Card 2: Quick WhatsApp */}
              <div className="hidden sm:flex absolute -top-5 -right-5 bg-white/95 backdrop-blur-xs rounded-2xl py-2 px-3.5 shadow-lg border border-[#EAE2D3] items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-[#6E655F]">Order directly via</div>
                  <div className="text-xs font-medium text-[#2C2523]">WhatsApp Chat</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
