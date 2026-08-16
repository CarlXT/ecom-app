import React from 'react';
import htm from 'htm';
import { useLocation, useNavigate } from 'react-router-dom';

const html = htm.bind(React.createElement);

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return html`<div className="min-h-screen bg-[#121214] text-white flex items-center justify-center">Order not found.</div>`;
  }

  const handleContinue = () => {
    navigate('/shop');
  };

  return html`
    <div className="min-h-screen bg-[#121214] text-white p-6 sm:p-12 font-['SF_Pro_Display',-apple-system,sans-serif] flex flex-col justify-between items-center">
      
      <div className="w-full max-w-xl text-center space-y-8 my-auto py-8">
        
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-500 tracking-tight mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Thank you for your purchase, ${order.customer_name || 'Customer'}!<br />
            We've received your order and are getting your audio gear ready.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 text-xs sm:text-sm space-y-3 text-left">
          <div className="flex justify-between"><span className="text-zinc-400">Order ID:</span><span className="font-bold">#${order.id}</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Order Date:</span><span>${new Date(order.created_at).toLocaleDateString()}</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Payment:</span><span>${order.payment_method}</span></div>
          
          <div className="flex justify-between"><span className="text-zinc-400">Delivery Address:</span><span className="text-right max-w-xs">${order.address}</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Contact Number:</span><span>${order.phone}</span></div>
          <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-bold"><span className="text-zinc-300">Total Amount:</span><span>Php ${Number(order.total).toFixed(2)}</span></div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button 
            onClick=${handleContinue}
            className="px-8 py-3 bg-white text-black font-extrabold text-sm rounded-full hover:bg-zinc-200 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            Continue Shopping
          </button>
        </div>

      </div>

      <div className="text-zinc-600 text-xs">© 2026 Heady. All rights reserved.</div>
    </div>
  `;
}
