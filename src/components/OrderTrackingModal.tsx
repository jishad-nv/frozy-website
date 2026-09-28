import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('');
  const [orderResult, setOrderResult] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError('');
    setOrderResult(null);

    try {
      const res = await fetch(`/api/orders/track/${orderId.trim()}`);
      const data = await res.json();
      if (res.ok) {
        setOrderResult(data);
      } else {
        setError(data.error || 'Order not found');
      }
    } catch (err) {
      setError('Network error tracking order');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#FFF8F5] text-neutral-900 rounded-3xl shadow-2xl border border-pink-200 overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold font-creamy text-neutral-900">Track FROZY Order</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-pink-50 flex items-center justify-center text-neutral-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            required
            placeholder="Enter Order ID (e.g. FRZ-89214)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-pink-600 font-mono"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black transition-all flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{loading ? 'Searching...' : 'Track'}</span>
          </button>
        </form>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {orderResult && (
          <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm space-y-4 text-xs">
            <div className="flex justify-between items-start border-b border-neutral-100 pb-3">
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Order ID</span>
                <span className="font-mono font-bold text-pink-700 text-sm">{orderResult.id}</span>
              </div>
              <div className="text-right">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Current Status</span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-100 text-pink-800">
                  {orderResult.orderStatus}
                </span>
              </div>
            </div>

            <div>
              <span className="text-neutral-400 block text-[10px] uppercase font-bold mb-2">Delivery Timeline</span>
              <div className="space-y-2 pl-2 border-l-2 border-pink-200">
                {orderResult.timeline?.map((step: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 relative">
                    <div className={`w-3 h-3 rounded-full -ml-[17px] ${step.completed ? 'bg-pink-600' : 'bg-neutral-300'}`} />
                    <div className="flex-1 flex justify-between items-center">
                      <span className={`font-bold ${step.completed ? 'text-neutral-900' : 'text-neutral-400'}`}>{step.status}</span>
                      <span className="text-[10px] text-neutral-500">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 space-y-1 text-neutral-600">
              <div className="flex justify-between">
                <span>Customer:</span>
                <strong className="text-neutral-900">{orderResult.customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <strong className="text-neutral-900">{orderResult.address}, {orderResult.city}</strong>
              </div>
              <div className="flex justify-between font-bold text-neutral-900 pt-1">
                <span>Total Amount:</span>
                <span>₹{orderResult.total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
