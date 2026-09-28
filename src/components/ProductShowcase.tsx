import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { FROZY_PRODUCTS, FROZY_CONFIG, FrozyProduct } from '../data/frozyData.ts';
import { useCart } from '../context/CartContext.tsx';

interface ProductShowcaseProps {
  onQuickView: (product: FrozyProduct) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onQuickView }) => {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState<'all' | 'signature' | 'fruit' | 'indulgent'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredFlavors = activeFilter === 'all'
    ? FROZY_PRODUCTS
    : FROZY_PRODUCTS.filter((f) => f.category === activeFilter);

  const handleBuy = (product: FrozyProduct) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="explore" className="relative bg-[#E87D98] pt-14 sm:pt-20 pb-20 sm:pb-28 text-white overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-950/20 rounded-full blur-2xl pointer-events-none" />

      {/* Narrower balanced container with ample breathing room */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Header with Title & Compact Subtitle */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-100 block mb-1">
            Artisanal Pint Collection
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-creamy tracking-tight text-white">
            {FROZY_CONFIG.exploreHeadline}
          </h2>
          <p className="text-pink-100 text-xs sm:text-sm mt-2">
            {FROZY_CONFIG.exploreSubtitle}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-center gap-2 mb-14 overflow-x-auto no-scrollbar pb-2">
          {(
            [
              { key: 'all', label: 'All Scoops' },
              { key: 'signature', label: 'Signature & Velvet' },
              { key: 'fruit', label: 'Real Alphonso & Berries' },
              { key: 'indulgent', label: 'Belgian Choco & Fudge' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                activeFilter === filter.key
                  ? 'bg-white text-pink-900 shadow-md scale-105'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Pure Cutout Showcase Grid — No Rectangular Card Backgrounds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 items-center justify-center">
          {filteredFlavors.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center justify-between text-center group"
              >
                {/* Isolated Transparent Pint Cutout directly within scene (NO card, NO white box) */}
                <div
                  className="relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} - FROZY`}
                    className="w-full h-full object-contain drop-shadow-[0_18px_25px_rgba(0,0,0,0.25)]"
                  />
                  
                  {/* Subtle soft grounding shadow */}
                  <div className="w-36 sm:w-44 h-4 bg-black/25 rounded-full blur-md -mt-2 pointer-events-none" />

                  {/* Calorie badge */}
                  <div className="absolute top-1 right-2 bg-neutral-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {product.calories.split('/')[0]}
                  </div>
                </div>

                {/* Product Information directly floating on the surface */}
                <div className="w-full mt-6 flex flex-col items-center max-w-xs">
                  {/* Product Specific Short Headline */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pink-100 mb-0.5">
                    {product.headline}
                  </span>

                  {/* Product Name */}
                  <h3
                    onClick={() => onQuickView(product)}
                    className="text-xl font-bold font-creamy text-white hover:text-pink-100 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  {/* Short Supporting Sentence */}
                  <p className="text-xs text-white/85 mt-1 mb-2 line-clamp-1">
                    {product.shortDescription}
                  </p>

                  {/* Price in INR ₹ */}
                  <div className="text-lg font-extrabold text-white tracking-tight mb-4 tabular-nums">
                    ₹{product.price}
                  </div>

                  {/* Actions: Buy Now & Quick View */}
                  <div className="w-full flex items-center justify-center gap-2 max-w-[220px]">
                    <button
                      onClick={() => handleBuy(product)}
                      className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-900 text-white hover:bg-black'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-pink-300" />
                          <span>BUY NOW</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onQuickView(product)}
                      aria-label={`View details for ${product.name}`}
                      className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0 border border-white/25"
                      title="Quick details & ingredients"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
