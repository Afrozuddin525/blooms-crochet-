import React from 'react';
import { CATEGORIES } from '../data/products';
import { ProductCategory } from '../types';
import { SmartImage } from './SmartImage';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (categoryId: ProductCategory) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 bg-[#FAF7F2] border-t border-[#EAE2D3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#6F8A72] font-semibold mb-1">
              Curated Collections
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C2523] tracking-tight">
              Explore by Craft Category
            </h2>
          </div>
          <p className="text-sm text-[#6E655F] max-w-md">
            Every collection is hand-stitched stitch by stitch with combed milk cotton yarn,
            guaranteeing tactile beauty and enduring heirloom charm.
          </p>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                const shopEl = document.getElementById('shop');
                if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group text-left rounded-2xl overflow-hidden bg-white border border-[#EAE2D3] hover:border-[#CB536B]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden aspect-4/3 w-full">
                <SmartImage
                  src={cat.image}
                  alt={cat.label}
                  categoryLabel={cat.label}
                  aspectRatioClass="aspect-4/3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#2C2523] opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4 text-[#CB536B]" />
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#2C2523] group-hover:text-[#CB536B] transition-colors leading-snug">
                    {cat.label}
                  </h3>
                  <p className="mt-1 text-xs text-[#6E655F] line-clamp-2 leading-relaxed">
                    {cat.shortDesc}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#F4EFE6] flex items-center justify-between text-xs text-[#6F8A72] font-medium">
                  <span>Explore items</span>
                  <span className="text-[10px] text-[#CB536B]">Handmade</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
