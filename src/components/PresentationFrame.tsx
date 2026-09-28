import React, { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface PresentationFrameProps {
  children: React.ReactNode;
}

export const PresentationFrame: React.FC<PresentationFrameProps> = ({ children }) => {
  const [isFramed, setIsFramed] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isFramed ? 'bg-[#EAC4CE] py-6 sm:py-10 px-2 sm:px-6' : 'bg-[#FFF8F5]'}`}>
      {/* View Mode Switcher floating toggle button */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full shadow-2xl border border-pink-200/30 text-xs font-semibold">
        <button
          onClick={() => setIsFramed(!isFramed)}
          className="flex items-center gap-1.5 hover:text-pink-300 transition-colors"
          title={isFramed ? 'Switch to Full Browser Mode' : 'Switch to Showcase Mockup Frame (from Video)'}
        >
          {isFramed ? (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Browser Mode</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Video Mockup Frame</span>
            </>
          )}
        </button>
      </div>

      {isFramed ? (
        <div className="max-w-[1360px] mx-auto flex flex-col items-center">
          {/* Top Video Presentation Header Pills */}
          <div className="w-full flex items-center justify-between mb-4 sm:mb-6 px-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {['FROZY', 'Indian Artisanal', 'Real Fruit', 'Cold Express'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-pink-950 text-xs font-semibold shadow-sm border border-pink-200/50"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-pink-950 text-xs font-semibold shadow-sm border border-pink-200/50">
              @frozy.india
            </span>
          </div>

          {/* Browser / Design Mockup Card Frame */}
          <div className="w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_60px_rgba(142,39,70,0.22)] border border-pink-100 bg-[#FFF8F5]">
            {children}
          </div>

          {/* Bottom Video Presentation Footer */}
          <div className="w-full flex items-center justify-between mt-4 sm:mt-6 px-4 text-xs font-semibold text-pink-950">
            <span>© 2026 FROZY Indian Ice Cream Co.</span>
            <span className="px-4 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm">
              Crafted with 100% Vegetarian Love
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {children}
        </div>
      )}
    </div>
  );
};
