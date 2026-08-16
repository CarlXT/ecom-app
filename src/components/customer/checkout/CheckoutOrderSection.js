import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export function CheckoutOrderSection({ formData, onSubmit }) {
  return html`
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Checkout Order</h2>
      <p className="text-zinc-400 text-xs">Please finalize the details below before completing your order.</p>

      <div className="flex justify-between items-baseline border-b border-zinc-800 pb-3">
        <span className="text-xl font-bold">Customer:</span>
        <span className="text-2xl font-black">${formData.name}</span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-zinc-400">Email Address:</span><span>${formData.email}</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Delivery Address:</span><span className="text-right max-w-xs">${formData.address}</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Contact Number:</span><span>${formData.contact}</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Note:</span><span>${formData.note || 'None'}</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Payment Method:</span><span>${formData.paymentMethod}</span></div>
      </div>

      <button 
        type="button"
        onClick=${onSubmit} 
        className="w-full py-4 bg-white text-black font-extrabold rounded-full hover:bg-zinc-200 transition-all cursor-pointer active:scale-98"
      >
        Checkout Order
      </button>
    </div>
  `;
}

export default CheckoutOrderSection;
