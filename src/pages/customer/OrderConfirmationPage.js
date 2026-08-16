import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export default function OrderConfirmationPage({ orderDetails, onContinue }) {
  return html`
    <div className="min-h-screen bg-[#121214] text-white p-6 sm:p-12 font-['SF_Pro_Display',-apple-system,sans-serif] flex flex-col justify-between items-center">
      
      <!-- Main Confirmation Message -->
      <div className="w-full max-w-xl text-center space-y-8 my-auto py-8">
        
        <!-- Order Success Heading -->
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-500 tracking-tight mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Thank you for your purchase, ${orderDetails?.name || 'Customer'}!<br />
            We've received your order and are getting your audio gear ready. A confirmation email with your details has been logged.
          </p>
        </div>

        <!-- Detail Key-Value List -->
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-6 text-xs sm:text-sm space-y-3 text-left">
          <div className="flex justify-between"><span className="text-zinc-400">Order ID:</span><span className="font-bold">${orderDetails?.orderId || '#00-080492-2026'}</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Order Date:</span><span>${orderDetails?.date || '8/5/2026'}</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Order Time:</span><span>${orderDetails?.time || '08:42:15 AM PHT'}</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Payment:</span><span>${orderDetails?.paymentMethod || 'COD'}</span></div>
          
          <div className="border-t border-zinc-800 pt-3 flex justify-between"><span className="text-zinc-400">Item:</span><span className="font-bold">Heady Studio Monitor 50</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Delivery Address:</span><span className="text-right max-w-xs">${orderDetails?.address || 'Sanciangko St., Cebu City'}</span></div>
          <div className="flex justify-between"><span className="text-zinc-400">Contact Number:</span><span>${orderDetails?.contact || '+6391234567890'}</span></div>
          <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-bold"><span className="text-zinc-300">Total Amount:</span><span>Php ${orderDetails?.total?.toFixed(2) || '900.00'}</span></div>
        </div>

        <!-- Bottom Action Buttons -->
        <div className="flex items-center justify-center gap-4 pt-4">
          <button 
            onClick=${onContinue}
            className="px-8 py-3 bg-white text-black font-extrabold text-sm rounded-full hover:bg-zinc-200 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            Continue
          </button>
          <button 
            className="px-8 py-3 bg-zinc-800 text-white font-extrabold text-sm rounded-full hover:bg-zinc-700 transition-all active:scale-95 cursor-pointer"
          >
            Order Status
          </button>
        </div>

      </div>

      <div className="text-zinc-600 text-xs">© 2026 Heady. All rights reserved.</div>
    </div>
  `;
}
