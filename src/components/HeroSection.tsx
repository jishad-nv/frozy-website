import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { FROZY_PRODUCTS, FROZY_CONFIG, FrozyProduct } from '../data/frozyData.ts';
import { FROZY_ASSETS } from '../assets/products.ts';
import { useCart } from '../context/CartContext.tsx';

interface HeroSectionProps {
  onQuickView?: (product: FrozyProduct) => void;
  onExploreClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onQuickView, onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { addToCart } = useCart();

  const currentFlavor = FROZY_PRODUCTS[currentIndex];

  // Single active animation controller / timer
  // Cycles automatically through all six products continuously without clicking
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FROZY_PRODUCTS.length);
    }, 2650); // ~0.85s forward motion + ~1.8s dwell time

    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? FROZY_PRODUCTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FROZY_PRODUCTS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  // Helper to compute persistent 3D transform, scale, opacity, and blur for each product
  // All 6 elements remain continuously mounted in the DOM to eliminate any blinking or blank frames
  const getProductStageStyle = (index: number) => {
    const total = FROZY_PRODUCTS.length;
    // Normalized offset: 0 = active foreground, 1 = upcoming in background right, 5 = just exited left
    const offset = (index - currentIndex + total) % total;

    if (offset === 0) {
      // ACTIVE FOREGROUND: Large, sharp, prominent in center
      return {
        transform: 'translate3d(0px, 0px, 0px) scale(1) rotate(0deg)',
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 30,
        pointerEvents: 'auto' as const,
      };
    } else if (offset === 1) {
      // NEXT IN QUEUE: Waiting in background right, smaller, slightly blurred, lower opacity
      return {
        transform: 'translate3d(115px, -10px, -240px) scale(0.60) rotate(5deg)',
        opacity: 0.45,
        filter: 'blur(2px)',
        zIndex: 15,
        pointerEvents: 'none' as const,
      };
    } else if (offset === total - 1) {
      // JUST EXITED: Smoothly moving away and back to the left
      return {
        transform: 'translate3d(-130px, -18px, -290px) scale(0.52) rotate(-6deg)',
        opacity: 0,
        filter: 'blur(4px)',
        zIndex: 10,
        pointerEvents: 'none' as const,
      };
    } else if (offset === 2) {
      // QUEUED DEEP: Ready to slide into next-in-queue slot
      return {
        transform: 'translate3d(170px, -18px, -360px) scale(0.42) rotate(8deg)',
        opacity: 0,
        filter: 'blur(5px)',
        zIndex: 5,
        pointerEvents: 'none' as const,
      };
    } else {
      // RESTING IN DEEP DEPTH
      return {
        transform: 'translate3d(0px, 0px, -450px) scale(0.35) rotate(0deg)',
        opacity: 0,
        filter: 'blur(6px)',
        zIndex: 1,
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <div
      id="home"
      className="relative min-h-[600px] lg:min-h-[690px] transition-colors duration-700 ease-out overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: currentFlavor.backgroundColor }}
    >
      {/* Subtle organic background ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-pink-950/20 blur-2xl" />
      </div>

      {/* Main Hero Content Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 pb-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        
        {/* Left Column: Synchronized Product Text (Permanently mounted with silky cross-transition) */}
        <div className="lg:col-span-5 text-white flex flex-col justify-center">
          
          {/* Brand Header */}
          <div className="mb-4">
            <span className="text-[11px] uppercase tracking-widest text-pink-100 font-bold block mb-1">
              {FROZY_CONFIG.brandSubtext}
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[11px] font-semibold tracking-wide text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-200 animate-ping" />
              <span>{currentFlavor.subtitle}</span>
            </div>
          </div>

          {/* Synchronized Product Headlines & Short Copy (All 6 mounted in grid stack to prevent unmount flashing) */}
          <div className="min-h-[140px] sm:min-h-[160px] grid grid-cols-1 items-center">
            {FROZY_PRODUCTS.map((prod, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={`text-${prod.id}`}
                  style={{
                    gridArea: '1 / 1',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0px)' : 'translateY(12px)',
                    transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  className="flex flex-col justify-center"
                >
                  {/* Product-Specific Short Headline */}
                  <h1 className="text-[clamp(26px,7.5vw,42px)] font-black tracking-tight font-creamy leading-[1.15] text-white drop-shadow-sm mb-2">
                    {prod.headline}
                  </h1>

                  {/* Flavour Name */}
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold font-creamy text-pink-100 mb-2">
                    {prod.name}
                  </h2>

                  {/* Short Supporting Sentence */}
                  <p className="text-white/95 text-xs sm:text-sm leading-relaxed max-w-sm drop-shadow-xs">
                    {prod.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-3 mb-4">
            <button
              onClick={() => addToCart(currentFlavor)}
              className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-bold tracking-wider hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <ShoppingBag className="w-4 h-4 text-pink-300" />
              <span>{FROZY_CONFIG.heroCtaText} — ₹{currentFlavor.price}</span>
            </button>

            {onExploreClick && (
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold backdrop-blur-sm transition-all border border-white/40 hover:scale-105"
              >
                <span>{FROZY_CONFIG.secondaryCtaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 pt-2 border-t border-white/20 max-w-xs">
            <div className="flex -space-x-2">
              <img
                src={FROZY_ASSETS.avatarAisha}
                alt="FROZY customer"
                className="w-7 h-7 rounded-full border border-white object-cover shadow-sm"
              />
              <img
                src={FROZY_ASSETS.avatarMarcus}
                alt="FROZY customer"
                className="w-7 h-7 rounded-full border border-white object-cover shadow-sm"
              />
              <div className="w-7 h-7 rounded-full border border-white bg-pink-200 text-neutral-900 text-[9px] font-bold flex items-center justify-center shadow-sm">
                +25k
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-white">
                <span>{FROZY_CONFIG.reviewsCountText}</span>
                <div className="flex text-amber-300">
                  <Star className="w-2.5 h-2.5 fill-amber-300" />
                  <Star className="w-2.5 h-2.5 fill-amber-300" />
                  <Star className="w-2.5 h-2.5 fill-amber-300" />
                  <Star className="w-2.5 h-2.5 fill-amber-300" />
                  <Star className="w-2.5 h-2.5 fill-amber-300" />
                </div>
              </div>
              <p className="text-[10px] text-white/80">{FROZY_CONFIG.reviewsSubtext}</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Forward-Push Camera Animation Stage */}
        <div
          className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          
          {/* Main 3D Perspective Viewport */}
          <div
            style={{
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full max-w-[520px] h-[340px] sm:h-[420px] flex items-center justify-center"
          >
            {/* Soft grounded contact shadow under the active foreground position */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-52 sm:w-68 h-7 bg-black/25 rounded-full blur-xl pointer-events-none z-10" />

            {/* ALL SIX PRODUCTS PERMANENTLY MOUNTED IN DOM (Zero unmounting, zero blank frames, zero blinking) */}
            {FROZY_PRODUCTS.map((prod, index) => {
              const stageStyle = getProductStageStyle(index);
              const isActive = index === currentIndex;

              return (
                <div
                  key={`stage-product-wrapper-${prod.id}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center pointer-events-none"
                  style={{
                    zIndex: stageStyle.zIndex,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      transform: stageStyle.transform,
                      opacity: stageStyle.opacity,
                      filter: stageStyle.filter,
                      pointerEvents: stageStyle.pointerEvents,
                      transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                      willChange: 'transform, opacity, filter',
                    }}
                    className="flex items-center justify-center cursor-pointer select-none"
                    onClick={() => isActive && onQuickView && onQuickView(prod)}
                  >
                    <div className="relative group w-full h-full flex items-center justify-center">
                      {/* The exact uploaded image file */}
                      <img
                        src={prod.image}
                        alt={`${prod.name} - FROZY Ice Cream`}
                        className="w-full h-full object-contain drop-shadow-[0_22px_36px_rgba(0,0,0,0.30)] pointer-events-none"
                        draggable={false}
                      />

                      {/* Subtle info pill on active tub hover */}
                      {isActive && (
                        <div className="absolute top-2 right-4 bg-white/95 text-pink-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity border border-pink-100 pointer-events-none">
                          {prod.calories.split('/')[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls: Circular Arrows & Dot Indicators */}
          <div className="relative z-30 flex items-center gap-3 mt-4">
            <button
              onClick={handlePrev}
              aria-label="Previous flavour"
              className="w-9 h-9 rounded-full bg-white/95 text-neutral-800 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Pagination dots for all 6 flavours */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-full">
              {FROZY_PRODUCTS.map((flavor, idx) => (
                <button
                  key={flavor.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to ${flavor.name}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next flavour"
              className="w-9 h-9 rounded-full bg-white/95 text-neutral-800 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[10px] text-white/70 mt-1.5 font-medium">
            Continuous auto-loop • 6 flavours
          </span>
        </div>
      </div>

      {/* Bottom Cream Wave Transition (Clean SVG wave ONLY) */}
      <div className="relative w-full leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-14 sm:h-20 text-[#FFF8F5]"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,45 C150,95 320,15 480,60 C640,105 800,25 960,70 C1120,115 1300,30 1440,55 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
};
