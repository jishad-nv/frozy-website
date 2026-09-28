import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { FrozyProduct } from '../data/frozyData.ts';
import { useCart } from '../context/CartContext.tsx';

interface QuickViewModalProps {
  product: FrozyProduct | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddAndClose = () => {
    addToCart(product);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden z-10 text-neutral-900 border border-pink-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Left Col: Pint Image with background color highlight */}
            <div
              className="sm:col-span-5 rounded-2xl p-6 flex items-center justify-center"
              style={{ backgroundColor: `${product.bgColor}22` }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-xl"
              />
            </div>

            {/* Right Col: Details */}
            <div className="sm:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-700">
                    {product.subtitle}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-creamy text-neutral-900 mb-2">
                  {product.name}
                </h3>

                <div className="text-xl font-bold text-neutral-900 mb-4 tabular-nums">
                  ₹{product.price}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Nutritional highlights */}
                <div className="grid grid-cols-4 gap-2 p-3 bg-pink-50/50 border border-pink-100/60 rounded-2xl mb-4 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Calories</span>
                    <span className="text-xs font-extrabold text-neutral-900">{product.calories.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Net Carbs</span>
                    <span className="text-xs font-extrabold text-neutral-900">{product.netCarbs}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Protein</span>
                    <span className="text-xs font-extrabold text-neutral-900">{product.protein}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">Fat</span>
                    <span className="text-xs font-extrabold text-neutral-900">{product.fat}</span>
                  </div>
                </div>

                {/* Real ingredients */}
                <div className="mb-6">
                  <span className="text-xs font-bold text-neutral-800 block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                    Fresh Natural Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={handleAddAndClose}
                className="w-full py-3.5 px-6 rounded-full bg-neutral-900 text-white text-xs font-bold tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-pink-300" />
                <span>ADD TO BAG — ₹{product.price}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
