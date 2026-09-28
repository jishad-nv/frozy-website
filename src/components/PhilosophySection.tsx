import React from 'react';
import { motion } from 'motion/react';
import { FROZY_CONFIG } from '../data/frozyData.ts';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="about" className="relative bg-[#FFF8F5] pt-14 sm:pt-20 pb-20 sm:pb-28 overflow-hidden">
      {/* Center Statement Text */}
      <div className="max-w-4xl mx-auto px-8 sm:px-12 text-center relative z-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold font-creamy text-[#5C2333] leading-[1.3] sm:leading-[1.35] tracking-tight"
        >
          {FROZY_CONFIG.philosophyQuote}
        </motion.p>
      </div>

      {/* Wavy Rose Pink Drip Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-10 sm:h-14 text-[#E87D98]"
          viewBox="0 0 1440 60"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C120,40 240,60 360,40 C480,20 600,55 720,45 C840,35 960,60 1080,45 C1200,30 1320,50 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
};
