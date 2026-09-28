/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext.tsx';
import { PresentationFrame } from './components/PresentationFrame.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { PhilosophySection } from './components/PhilosophySection.tsx';
import { ProductShowcase } from './components/ProductShowcase.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { QuickViewModal } from './components/QuickViewModal.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { OrderTrackingModal } from './components/OrderTrackingModal.tsx';
import { FrozyProduct } from './data/frozyData.ts';
import { Shield, Truck } from 'lucide-react';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<FrozyProduct | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    handleNavigate('explore');
  };

  return (
    <CartProvider>
      <PresentationFrame>
        <div className="relative min-h-screen flex flex-col bg-[#FFF8F5] selection:bg-pink-300 selection:text-pink-950">
          {/* Top navigation overlaying hero */}
          <div className="absolute top-0 left-0 right-0 z-40">
            <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
          </div>

          <main className="flex-1">
            {/* 1. Hero Section with Dynamic Flavor Transitions */}
            <HeroSection
              onQuickView={(product) => setSelectedProduct(product)}
              onExploreClick={handleExploreClick}
            />

            {/* 2. Philosophy & Summer Scoop Quote Section */}
            <PhilosophySection />

            {/* 3. Explore Our Flavours (Products Grid & Carousel) */}
            <ProductShowcase
              onQuickView={(product) => setSelectedProduct(product)}
            />

            {/* 4. FAQ's Section with Expandable Accordion */}
            <FaqSection />

            {/* 5. Customer Reviews Carousel */}
            <ReviewsSection />
          </main>

          {/* 6. Footer */}
          <Footer
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenTracking={() => setIsTrackingOpen(true)}
          />

          {/* Floating Backend Access Buttons */}
          <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-2">
            <button
              onClick={() => setIsTrackingOpen(true)}
              className="flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 rounded-full shadow-lg border border-pink-200 text-xs font-bold hover:bg-pink-50 transition-all hover:scale-105"
            >
              <Truck className="w-4 h-4 text-pink-600" />
              <span>Track Order</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg border border-neutral-800 text-xs font-bold hover:bg-black transition-all hover:scale-105"
            >
              <Shield className="w-4 h-4 text-pink-300" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Overlays: Slide-over Cart, Quick View, Admin Portal, Order Tracking */}
          <CartDrawer />
          <QuickViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
          <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
          <OrderTrackingModal isOpen={isTrackingOpen} onClose={() => setIsTrackingOpen(false)} />
        </div>
      </PresentationFrame>
    </CartProvider>
  );
}
