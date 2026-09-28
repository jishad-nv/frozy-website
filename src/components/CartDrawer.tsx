import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { FROZY_CONFIG } from '../data/frozyData.ts';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalCount,
    deliveryFee,
    grandTotal,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: 'Ananya Sharma',
    address: 'Flat 402, Sunshine Heights, 12th Main, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: '+91 98450 12345',
    email: 'ananya@example.com',
    paymentMethod: 'UPI',
  });
  const [createdOrderId, setCreatedOrderId] = useState<string>('FRZ-89214');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const progressToFree = Math.min(
    100,
    (subtotal / FROZY_CONFIG.freeDeliveryThreshold) * 100
  );

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCheckoutError('');

    try {
      const payload = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image
        })),
        total: grandTotal,
        paymentMethod: formData.paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        setCreatedOrderId(data.id);
        setCheckoutStep('success');
      } else {
        setCheckoutError(data.error || 'Failed to place order. Please check stock or details.');
      }
    } catch (err) {
      setCheckoutError('Network error connecting to backend.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    clearCart();
    setCheckoutStep('cart');
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#FFF8F5] text-neutral-900 shadow-2xl flex flex-col justify-between"
            >
              {/* Cart Drawer Header */}
              <div className="p-6 border-b border-pink-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-creamy text-neutral-900">Your FROZY Bag</h2>
                    <p className="text-xs text-neutral-500">{totalCount} {totalCount === 1 ? 'pint' : 'pints'} selected</p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="w-8 h-8 rounded-full hover:bg-pink-50 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {checkoutStep === 'cart' && (
                  <>
                    {/* Free shipping bar in INR ₹ */}
                    {subtotal > 0 && (
                      <div className="bg-pink-50/80 border border-pink-200 rounded-2xl p-3 text-xs">
                        <div className="flex items-center justify-between text-pink-900 font-semibold mb-1.5">
                          <span className="flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-pink-700" />
                            {subtotal >= FROZY_CONFIG.freeDeliveryThreshold
                              ? 'You unlocked FREE dry-ice express courier delivery! 🍧'
                              : `Add ₹${FROZY_CONFIG.freeDeliveryThreshold - subtotal} more for FREE dry-ice delivery`}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-pink-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-pink-600 rounded-full transition-all duration-300"
                            style={{ width: `${progressToFree}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {items.length === 0 ? (
                      <div className="py-16 text-center">
                        <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto mb-4 text-pink-300">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h3 className="text-base font-bold font-creamy text-neutral-800">Your bag is empty</h3>
                        <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                          Treat yourself to FROZY's fresh handcrafted scoops.
                        </p>
                        <button
                          onClick={closeCart}
                          className="mt-5 px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-black"
                        >
                          Explore Flavours
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {items.map(({ product, quantity }) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-pink-100 shadow-sm"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-contain rounded-xl bg-pink-50/40 p-1"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-neutral-900 truncate">
                                {product.name}
                              </h4>
                              <p className="text-xs text-neutral-500 mb-1.5">
                                ₹{product.price} each
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(product.id, -1)}
                                  className="w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold tabular-nums px-1">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(product.id, 1)}
                                  className="w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-neutral-900 tabular-nums block">
                                ₹{product.price * quantity}
                              </span>
                              <button
                                onClick={() => removeFromCart(product.id)}
                                aria-label="Remove item"
                                className="text-neutral-400 hover:text-red-500 mt-2 p-1 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'checkout' && (
                  <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4 pt-1">
                    <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3 text-xs text-pink-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0 text-pink-600" />
                      <span>Express courier with thermal dry-ice tote dispatched in 30 minutes!</span>
                    </div>

                    {checkoutError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                        {checkoutError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 mb-1">PIN Code</label>
                        <input
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Payment Method
                      </label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                      >
                        <option value="UPI">UPI / Google Pay / PhonePe</option>
                        <option value="Card">Credit / Debit Card</option>
                        <option value="COD">Cash on Delivery (COD)</option>
                      </select>
                    </div>
                  </form>
                )}

                {checkoutStep === 'success' && (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold font-creamy text-neutral-900">
                      Order Confirmed!
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed max-w-xs mx-auto">
                      Thank you, <strong>{formData.name}</strong>! Your FROZY ice creams are packed in an insulated dry-ice box and will arrive at <strong>{formData.address}</strong> within 30-40 minutes.
                    </p>
                    <div className="p-4 bg-white rounded-2xl border border-pink-100 text-xs text-left space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>Order Number</span>
                        <span className="font-mono text-pink-700">#{createdOrderId}</span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>Cold Express Dispatch</span>
                        <span>30 - 40 Mins</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-neutral-100">
                        <span>Total Payable at Doorstep</span>
                        <span>₹{grandTotal}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Drawer Footer */}
              <div className="p-6 border-t border-pink-100 bg-white">
                {checkoutStep === 'cart' && items.length > 0 && (
                  <div className="space-y-3">
                    <div className="space-y-1.5 text-xs text-neutral-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-bold text-neutral-900 tabular-nums">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thermal Dry-Ice Courier</span>
                        <span className="font-bold text-neutral-900">
                          {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-100">
                        <span>Total Payable</span>
                        <span className="tabular-nums">₹{grandTotal}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCheckoutStep('checkout')}
                      className="w-full py-3.5 px-6 rounded-full bg-neutral-900 text-white text-xs font-bold tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                    >
                      <span>PROCEED TO CHECKOUT</span>
                      <ArrowRight className="w-4 h-4 text-pink-300" />
                    </button>
                  </div>
                )}

                {checkoutStep === 'checkout' && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="py-3 px-4 rounded-full border border-neutral-300 text-neutral-700 text-xs font-bold hover:bg-neutral-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      className="flex-1 py-3 px-6 rounded-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold tracking-wider transition-all shadow-md active:scale-95"
                    >
                      CONFIRM ORDER (₹{grandTotal})
                    </button>
                  </div>
                )}

                {checkoutStep === 'success' && (
                  <button
                    onClick={handleResetAndClose}
                    className="w-full py-3 px-6 rounded-full bg-neutral-900 text-white text-xs font-bold tracking-wider hover:bg-black"
                  >
                    Done & Return to Menu
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
