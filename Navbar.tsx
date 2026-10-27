import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/products';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { totalCount, setIsCartOpen, setIsCustomOrderOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE2D3]/80 transition-colors">
      {/* Delicate Announcement Ribbon */}
      <div className="bg-[#6F8A72] text-[#FAF7F2] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span>🌸 Free Pan-India Delivery on orders above ₹1499</span>
        <span className="hidden md:inline" aria-hidden="true">·</span>
        <span className="hidden md:inline">Handmade with love in Hyderabad</span>
        <span className="hidden md:inline" aria-hidden="true">·</span>
        <a
          href={BRAND_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors ml-1"
        >
          Chat on WhatsApp
        </a>
      </div>

      {/* Main 3-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand Wordmark with Minimal Emblem */}
        <a href="#home" className="shrink-0 flex items-center focus:outline-hidden">
          <Logo size="md" />
        </a>

        {/* Zone 2: 4-5 Clean single-line text links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E655F]">
          <a
            href="#home"
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#shop"
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0"
          >
            Shop Collection
          </a>
          <button
            onClick={() => setIsCustomOrderOpen(true)}
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            Custom Orders
          </button>
          <a
            href="#about"
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="hover:text-[#2C2523] transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action & Cart Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick WhatsApp chat pill */}
          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#2C2523] bg-white border border-[#EAE2D3] rounded-full hover:border-[#6F8A72] hover:text-[#6F8A72] transition-colors shadow-2xs whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>+91 6281508874</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping Cart with ${totalCount} items`}
            className="relative flex items-center justify-center p-2.5 rounded-full bg-[#E2788D] text-white hover:bg-[#CB536B] transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2C2523] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs tabular-nums">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded-lg text-[#2C2523] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-Down */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAE2D3] bg-[#FAF7F2] px-6 py-5 shadow-lg space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#2C2523]">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#CB536B] transition-colors"
            >
              Home
            </a>
            <a
              href="#shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#CB536B] transition-colors"
            >
              Shop Collection
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCustomOrderOpen(true);
              }}
              className="py-1 text-left hover:text-[#CB536B] transition-colors cursor-pointer"
            >
              Custom Orders
            </button>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#CB536B] transition-colors"
            >
              About Us
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#CB536B] transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="pt-3 border-t border-[#EAE2D3] flex flex-col gap-2.5">
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#20ba5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp (+91 6281508874)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
