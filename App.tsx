import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { CraftQualitySection } from './components/CraftQualitySection';
import { Testimonials } from './components/Testimonials';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomOrderModal } from './components/CustomOrderModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductCategory } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const handleCategorySelect = (cat: ProductCategory) => {
    setSelectedCategory(cat);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#2C2523] flex flex-col font-sans selection:bg-[#F8CFD7] selection:text-[#AB3A51]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. Categories Showcase */}
          <CategorySection onSelectCategory={handleCategorySelect} />

          {/* 3. Shop Catalog & Product Cards */}
          <ProductGrid
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* 4. Quality, Bespoke & Gifting Highlights */}
          <CraftQualitySection />

          {/* 5. Customer Testimonials */}
          <Testimonials />

          {/* 6. About Blooms Crochet & Care Guide */}
          <AboutSection />

          {/* 7. Contact Details, Direct Links & FAQs */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onSelectCategory={handleCategorySelect} />

        {/* Slide-Over Shopping Cart Drawer */}
        <CartDrawer />

        {/* Product Quick-View Modal */}
        <ProductModal />

        {/* Checkout & Direct Order Modal */}
        <CheckoutModal />

        {/* Custom Order Request Modal */}
        <CustomOrderModal />

        {/* Floating WhatsApp Chat Button */}
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
