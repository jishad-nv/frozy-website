import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { FROZY_CONFIG } from '../data/frozyData.ts';
import { useCart } from '../context/CartContext.tsx';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home', onNavigate }) => {
  const { totalCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="relative z-40 w-full px-4 sm:px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Modular Wordmark "FROZY" */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="group flex items-center gap-1.5 focus:outline-none"
        >
          <span className="text-2xl sm:text-3xl font-black tracking-tight font-creamy text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-105">
            {FROZY_CONFIG.brandName}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-pink-200 inline-block animate-pulse shadow-sm" />
        </a>

        {/* Centered Floating Pill Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-full shadow-lg border border-pink-100 text-xs font-bold tracking-wider">
          {FROZY_CONFIG.navigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-700 hover:text-pink-600 hover:bg-pink-50/70'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right Actions: Cart & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="View Shopping Cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-neutral-900 shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 border border-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-800" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-pink-600 rounded-full border-2 border-white shadow-sm animate-bounce">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/95 text-neutral-900 shadow-md hover:bg-white border border-pink-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-100 flex flex-col gap-2">
          {FROZY_CONFIG.navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                activeSection === item.id
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
