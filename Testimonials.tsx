import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#6F8A72] font-semibold mb-2">
            Loved By Crochet Enthusiasts
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C2523] tracking-tight">
            Stories From Our Lovely Customers
          </h2>
          <p className="mt-3 text-sm text-[#6E655F]">
            Read how our handcrafted creations have brightened homes, weddings, and gift moments across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-[#EAE2D3] flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating stars & Quote mark */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#CB536B]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#EAE2D3]" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#2C2523] leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="mt-6 pt-4 border-t border-[#F4EFE6]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-semibold text-[#2C2523]">
                    {t.author}
                  </span>
                  <span className="text-[11px] text-[#6E655F]">{t.city}</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#6F8A72]">
                  <CheckCircle2 className="w-3 h-3 text-[#6F8A72]" />
                  <span className="truncate">{t.productPurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
