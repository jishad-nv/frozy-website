import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircle, Instagram, Facebook, Phone } from 'lucide-react';
import { FROZY_FAQS, FROZY_CONFIG } from '../data/frozyData.ts';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative bg-[#FFF8F5] py-14 sm:py-20 px-4 sm:px-8">
      {/* Curved Container with Luxurious Rose Wine / Deep Pink Background */}
      <div className="max-w-6xl mx-auto bg-[#8F2746] text-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
        {/* Organic background wave shape */}
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-black/15 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
          {/* Left Column: FAQ Headline & Social Proof */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-creamy tracking-tight text-white mt-1 mb-4">
              {FROZY_CONFIG.faqHeadline}
            </h2>
            <p className="text-pink-100 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
              {FROZY_CONFIG.faqSubtitle}
            </p>

            {/* Social Icons row (WhatsApp, Instagram, Facebook, Phone) */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/919845078921?text=Namaste%20FROZY!`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Support"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/30"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/30"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#contact"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/30"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`tel:${FROZY_CONFIG.contact.phone}`}
                aria-label="Call Customer Line"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/30"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Accordion Questions */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {FROZY_FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#7A1F3B]/80 hover:bg-[#7A1F3B] transition-colors border border-white/15 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                      {faq.question}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-white text-[#8F2746] rotate-90' : 'bg-white/20 text-white'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-pink-100 leading-relaxed border-t border-white/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
