import React from 'react';
import { Logo } from './Logo';
import { BRAND_INFO, CATEGORIES } from '../data/products';
import { MessageCircle, Mail, Instagram, Heart, ArrowUp } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C2523] text-[#FAF7F2] pt-16 pb-12 border-t border-[#4A3E3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4A3E3A]">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" light={true} />
            <p className="text-xs sm:text-sm text-[#FAF7F2]/75 max-w-sm leading-relaxed mt-2">
              Unique crochet creations, carefully handmade just for you. From bridal hair gajras and
              everlasting blossom bouquets to cottagecore accessories and personalized handmade gifts.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Blooms Crochet on WhatsApp"
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#25D366] text-[#FAF7F2] hover:text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                aria-label="Send email to Blooms Crochet"
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#CB536B] text-[#FAF7F2] hover:text-white flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href={BRAND_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Blooms Crochet on Instagram"
                className="w-9 h-9 rounded-full bg-[#FAF7F2]/10 hover:bg-[#E1306C] text-[#FAF7F2] hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#F8CFD7]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/75">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  Shop Collection
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Our Studio
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#F8CFD7]">
              Shop Categories
            </div>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/75">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      const shopEl = document.getElementById('shop');
                      if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-[#F8CFD7]">
              Connect
            </div>
            <div className="space-y-2 text-xs text-[#FAF7F2]/75">
              <div>
                <span className="block text-[11px] text-[#FAF7F2]/50">WhatsApp / Phone:</span>
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-[#FAF7F2]/50">Email:</span>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="hover:text-[#F8CFD7] transition-colors break-all"
                >
                  {BRAND_INFO.email}
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-[#FAF7F2]/50">Instagram:</span>
                <a
                  href={BRAND_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F8CFD7] transition-colors"
                >
                  @bloomscrochet
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Blooms Crochet. Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#CB536B] fill-current" />
            <span>in Hyderabad, India.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>All creations made to order</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
