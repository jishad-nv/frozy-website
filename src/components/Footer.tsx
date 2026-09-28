import React, { useState } from 'react';
import { FROZY_CONFIG } from '../data/frozyData.ts';
import { Instagram, Facebook, MessageCircle, MapPin, Clock, Send, Check } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenTracking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenTracking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer id="contact" className="relative bg-[#8F2746] text-white pt-8 pb-12 overflow-hidden">
      {/* Top Wave Drip in Cream (transitioning from reviews section) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none -mt-1">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#FFF8F5]"
          viewBox="0 0 1440 60"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,30 C1320,55 1200,20 1080,45 C960,70 840,35 720,50 C600,65 480,25 360,50 C240,75 120,30 0,40 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-12 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/20">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <a href="#home" className="inline-block mb-3">
              <span className="text-3xl sm:text-4xl font-black font-creamy tracking-tight text-white">
                {FROZY_CONFIG.brandName}
              </span>
            </a>
            <p className="text-pink-100 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              Modern Indian handcrafted ice cream. Made with fresh Malai dairy, hand-picked fruits, and 100% vegetarian love.
            </p>

            {/* Newsletter perks */}
            <form onSubmit={handleSubscribe} className="flex max-w-sm items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Get ₹100 off your first scoop"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-white/15 placeholder-pink-200 text-white text-xs border border-pink-300/30 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-full bg-white text-[#8F2746] text-xs font-bold hover:bg-pink-100 transition-colors shrink-0 flex items-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Unlocked!</span>
                  </>
                ) : (
                  <>
                    <span>Join</span>
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Address Col */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-pink-200 mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Flagship Parlour
            </h4>
            <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
              {FROZY_CONFIG.contact.address}
              <br />
              {FROZY_CONFIG.contact.city}
            </p>
          </div>

          {/* Opening Hours Col */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-pink-200 mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Scoop Hours
            </h4>
            <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
              {FROZY_CONFIG.contact.hoursWeekday}
              <br />
              {FROZY_CONFIG.contact.hoursWeekend}
            </p>
          </div>

          {/* Social Media & Links Col */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-pink-200 mb-3">
              Social Media
            </h4>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-pink-100">
              <a
                href="#contact"
                className="hover:text-pink-300 transition-colors flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="#contact"
                className="hover:text-pink-300 transition-colors flex items-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href={`https://wa.me/919845078921?text=Namaste%20FROZY!`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-300 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-pink-200/80 gap-3">
          <p>© 2026 {FROZY_CONFIG.brandName} Indian Ice Cream Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={onOpenTracking} className="hover:underline text-left text-pink-200">Track Order</button>
            <button onClick={onOpenAdmin} className="hover:underline text-left text-pink-200">Admin Dashboard</button>
            <a href="#about" className="hover:underline">Privacy Policy</a>
            <a href="#about" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
